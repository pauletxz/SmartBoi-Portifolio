-- Execute no SQL Editor do projeto Supabase antes de habilitar os envios.
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  phone text not null,
  farm_name text,
  daily_liters numeric check (daily_liters >= 0),
  herd_size integer check (herd_size >= 0),
  status text not null default 'new' check (status in ('new', 'contacted', 'qualified', 'converted', 'archived')),
  utm_source text,
  utm_medium text,
  utm_campaign text
);
alter table public.leads enable row level security;
revoke all on public.leads from anon, authenticated;
grant insert, select, update on public.leads to service_role;
