"use client";

import { createClient, type Session } from "@supabase/supabase-js";
import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import smartboiLogo from "@/assets/logosmartboi.svg";
import styles from "./portal.module.css";
import { AnimalDemo } from "./animal-demo";

type Device = { id: string; name: string; serial_number: string };
type Reading = { id: string; device_id: string; recorded_at: string; ph: number | null; temperature_c: number | null };

export function PrototypePortal({ url, apiKey, demoEnabled = false }: { url?: string; apiKey?: string; demoEnabled?: boolean }) {
  const [demo, setDemo] = useState(false);
  const client = useMemo(() => url && apiKey ? createClient(url, apiKey, {
    auth: { storageKey: "smartboi-prototype-auth", persistSession: false, detectSessionInUrl: false },
  }) : null, [url, apiKey]);
  const [session, setSession] = useState<Session | null>(null);
  const [devices, setDevices] = useState<Device[]>([]);
  const [readings, setReadings] = useState<Reading[]>([]);
  const [selected, setSelected] = useState("");
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [revision, setRevision] = useState(0);
  const generation = useRef(0);
  const userId = useRef<string | undefined>(undefined);

  useEffect(() => {
    if (!client || demo) return;
    const { data } = client.auth.onAuthStateChange((_event, next) => {
      if (userId.current === next?.user.id) return;
      userId.current = next?.user.id;
      generation.current++;
      setSession(next);
      setDevices([]);
      setReadings([]);
      setSelected("");
      setError("");
    });
    return () => { data.subscription.unsubscribe(); };
  }, [client, demo]);

  useEffect(() => {
    if (!client || !session || demo) return;
    let active = true;
    const current = generation.current;
    setLoading(true);
    setError("");
    async function load() {
      try {
        let query = client!.from("prototype_readings").select("id,device_id,recorded_at,ph,temperature_c").order("recorded_at", { ascending: false }).limit(100);
        if (selected) query = query.eq("device_id", selected);
        const [deviceResult, readingResult] = await Promise.all([
          client!.from("prototype_devices").select("id,name,serial_number").order("name"),
          query,
        ]);
        if (!active || current !== generation.current) return;
        if (deviceResult.error || readingResult.error) throw new Error("load");
        setDevices(deviceResult.data ?? []);
        setReadings(readingResult.data ?? []);
      } catch {
        if (active && current === generation.current) {
          setDevices([]);
          setReadings([]);
          setError("Não foi possível carregar os dados. Tente atualizar novamente.");
        }
      } finally {
        if (active && current === generation.current) setLoading(false);
      }
    }
    void load();
    return () => { active = false; };
  }, [client, session, revision, selected, demo]);

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    if (!client) {
      setError("O login ainda não está configurado neste ambiente. A equipe SmartBoi precisa habilitar o acesso para você entrar.");
      return;
    }
    const form = new FormData(event.currentTarget);
    setBusy(true);
    setError("");
    try {
      const { error } = await client.auth.signInWithPassword({
        email: String(form.get("email")).trim(),
        password: String(form.get("password")),
      });
      if (error) setError("Não foi possível entrar. Confira suas credenciais ou fale com a equipe SmartBoi.");
    } catch {
      setError("Conexão indisponível. Tente novamente.");
    } finally { setBusy(false); }
  }

  async function logout() {
    if (demo) {
      setDemo(false);
      setSelected("");
      setError("");
      return;
    }
    if (!client) return;
    setBusy(true);
    try {
      const { error } = await client.auth.signOut({ scope: "local" });
      if (error) throw error;
      generation.current++;
      setSession(null);
      setDevices([]);
      setReadings([]);
      setSelected("");
      setError("");
    } catch { setError("Não foi possível sair. Tente novamente."); }
    finally { setBusy(false); }
  }

  const shownDevices = devices;
  const visible = readings.filter(item => !selected || item.device_id === selected);
  const latest = visible[0];
  const format = (value: number | null | undefined, unit = "") =>
    value == null ? "—" : value.toLocaleString("pt-BR", { maximumFractionDigits: 2 }) + unit;
  const date = (value: string) => new Date(value).toLocaleString("pt-BR");

  return <div className={styles.portal}>
    <header className={styles.header}>
      <Link href="/" className={styles.brand} aria-label="SmartBoi, página inicial">
        <Image src={smartboiLogo} alt="SmartBoi" width={200} height={60} className={styles.logo} priority />
      </Link>
      <span className={styles.badge}>Programa piloto</span>
    </header>
    {!session && !demo ? <section className={styles.login}>
      <div>
        <p className={styles.eyebrow}>ÁREA DO PRODUTOR</p>
        <h1>Seu protótipo.<br />Seus dados, por perto.</h1>
        <p>Acompanhe as leituras dos dispositivos vinculados à sua conta em um só lugar.</p>
        <p className={styles.note}>Acesso exclusivo para participantes cadastrados pela equipe SmartBoi.</p>
      </div>
      <form onSubmit={login} className={styles.card}>
        <h2>Entrar na sua conta</h2>
        <p>Use o e-mail e a senha fornecidos no cadastro.</p>
        {!client && <p role="status">O acesso está em preparação. Entre em contato com a equipe SmartBoi.</p>}
        <label htmlFor="email">E-mail</label>
        <input id="email" name="email" type="email" autoComplete="username" required disabled={busy} />
        <label htmlFor="password">Senha</label>
        <input id="password" name="password" type="password" autoComplete="current-password" required disabled={busy} />
        {error && <p role="alert" className={styles.error}>{error}</p>}
        <button disabled={busy}>{busy ? "Entrando…" : "Acessar meus dados"}</button>
        {demoEnabled && <button type="button" disabled={busy} onClick={() => { setError(""); setSelected(""); setDemo(true); }}>Ver demonstração sem login</button>}
        {demoEnabled && <small>A demonstração usa apenas dados fictícios para você explorar o painel.</small>}
        <small>Precisa de acesso ou esqueceu a senha? Fale com a equipe responsável pelo seu protótipo.</small>
      </form>
    </section> : <section className={styles.dashboard}>
      <div className={styles.toolbar}>
        <div><p className={styles.eyebrow}>ÁREA DO PRODUTOR</p><h1>{demo ? "Meu rebanho" : "Visão do protótipo"}</h1><p className={styles.account}>{demo ? "Fazenda de demonstração" : session?.user.email}</p></div>
        <div className={styles.actions}>
          {!demo && <button onClick={() => setRevision(value => value + 1)} disabled={loading || busy}>Atualizar dados</button>}
          <button onClick={logout} disabled={busy}>Sair</button>
        </div>
      </div>
      {demo && <p role="status" className={styles.badge}>Modo demonstração · Dados fictícios, sem conexão com dispositivos reais.</p>}
      <p className={styles.note}>Leituras experimentais do programa piloto. A interpretação deve ser acompanhada pela equipe técnica.</p>
      {error && <p role="alert" className={styles.error}>{error}</p>}
      {demo ? <AnimalDemo /> : loading ? <p role="status">Carregando seus dados…</p> : <>
        {!error && shownDevices.length === 0 ? <div className={styles.card}><h2>Nenhum protótipo vinculado</h2><p>Sua conta está conectada. A equipe SmartBoi precisa vincular seu dispositivo para que as leituras apareçam aqui.</p></div> : shownDevices.length > 0 && <>
          <label htmlFor="device">Dispositivo</label>
          <select id="device" value={selected} onChange={event => setSelected(event.target.value)}>
            <option value="">Todos os dispositivos</option>
            {shownDevices.map(device => <option key={device.id} value={device.id}>{device.name} · {device.serial_number}</option>)}
          </select>
          <div className={styles.metrics}>
            <article className={styles.card}><p>Dispositivos vinculados</p><strong>{shownDevices.length}</strong></article>
            <article className={styles.card}><p>Último pH recebido</p><strong>{format(latest?.ph)}</strong></article>
            <article className={styles.card}><p>Última temperatura</p><strong>{format(latest?.temperature_c, " °C")}</strong></article>
          </div>
          <div className={styles.card}>
            <h2>Histórico de leituras</h2>
            <p>{latest ? "Última leitura: " + date(latest.recorded_at) : "Aguardando a primeira leitura do dispositivo."}</p>
            <p>Até 100 leituras mais recentes da seleção. Horários no fuso do seu navegador.</p>
            {visible.length > 0 && <div className={styles.tableWrap}><table>
              <caption className={styles.srOnly}>Leituras dos protótipos vinculados à sua conta</caption>
              <thead><tr><th scope="col">Data e hora</th><th scope="col">Dispositivo</th><th scope="col">pH</th><th scope="col">Temperatura</th></tr></thead>
              <tbody>{visible.map(reading => <tr key={reading.id}><td>{date(reading.recorded_at)}</td><td>{shownDevices.find(device => device.id === reading.device_id)?.name ?? "Dispositivo"}</td><td>{format(reading.ph)}</td><td>{format(reading.temperature_c, " °C")}</td></tr>)}</tbody>
            </table></div>}
          </div>
        </>}
      </>}
    </section>}
    <footer className={styles.footer}>SmartBoi · Tecnologia próxima do campo <Link href="/">Voltar ao site</Link></footer>
  </div>;
}
