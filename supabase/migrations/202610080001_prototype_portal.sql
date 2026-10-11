-- Apply in a staging Supabase project first. This migration does not touch leads.
begin;
create table public.prototype_devices (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  name text not null check (length(name) between 1 and 100),
  serial_number text not null unique check (length(serial_number) between 1 and 100),
  created_at timestamptz not null default now()
);
create index prototype_devices_owner_idx on public.prototype_devices(owner_id);
create table public.prototype_readings (
  id uuid primary key default gen_random_uuid(),
  device_id uuid not null references public.prototype_devices(id) on delete cascade,
  recorded_at timestamptz not null default now() check (recorded_at <= now() + interval '5 minutes'),
  ph numeric check (ph between 0 and 14),
  temperature_c numeric check (temperature_c between -50 and 150),
  check (ph is not null or temperature_c is not null)
);
create index prototype_readings_device_time_idx on public.prototype_readings(device_id, recorded_at desc);
alter table public.prototype_devices enable row level security;
alter table public.prototype_readings enable row level security;
revoke all on public.prototype_devices, public.prototype_readings from anon, authenticated;
grant select on public.prototype_devices, public.prototype_readings to authenticated;
grant all on public.prototype_devices, public.prototype_readings to service_role;
create policy "Owners read their devices" on public.prototype_devices
  for select to authenticated using (owner_id = (select auth.uid()));
create policy "Owners read their readings" on public.prototype_readings
  for select to authenticated using (
    exists (select 1 from public.prototype_devices d
      where d.id = prototype_readings.device_id and d.owner_id = (select auth.uid()))
  );
-- A device row represents a single ownership period. Prevent history transfer.
create function public.prototype_prevent_owner_change()
returns trigger language plpgsql set search_path = '' as $$
begin
  if new.owner_id is distinct from old.owner_id then
    raise exception 'Device ownership is immutable; archive the previous record before reassignment';
  end if;
  return new;
end;
$$;
create trigger prototype_immutable_owner before update of owner_id
  on public.prototype_devices for each row
  execute function public.prototype_prevent_owner_change();
commit;
