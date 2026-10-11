"use client";

import { useState } from "react";
import styles from "./portal.module.css";

const animals = [
  { id: "001", name: "Mimosa", breed: "Girolando", group: "Lote 1", days: 92 },
  { id: "002", name: "Estrela", breed: "Holandesa", group: "Lote 1", days: 124 },
  { id: "003", name: "Luna", breed: "Jersey", group: "Lote 2", days: 68 },
  { id: "004", name: "Flor", breed: "Girolando", group: "Lote 2", days: 156 },
  { id: "005", name: "Aurora", breed: "Holandesa", group: "Lote 1", days: 105 },
  { id: "006", name: "Amora", breed: "Jersey", group: "Lote 2", days: 81 },
];
const metrics = {
  liters: { label: "Produção diária", unit: "L", source: "Registro de ordenha simulado" },
  ph: { label: "pH do leite", unit: "pH", source: "Medição simulada de amostra de leite" },
  fat: { label: "Gordura", unit: "%", source: "Resultado laboratorial simulado" },
  protein: { label: "Proteína", unit: "%", source: "Resultado laboratorial simulado" },
  scc: { label: "CCS", unit: "mil células/mL", source: "Resultado laboratorial simulado" },
};
type Metric = keyof typeof metrics;
const round = (value: number) => Math.round(value * 100) / 100;
const format = (value: number) => value.toLocaleString("pt-BR", { maximumFractionDigits: 2 });
const rows = animals.map((animal, animalIndex) => Array.from({ length: 30 }, (_, day) => {
  const wave = Math.sin(day * 0.7 + animalIndex);
  return {
    animal: animal.id,
    date: new Date(Date.UTC(2026, 8, 9 + day)).toISOString().slice(0, 10),
    liters: round(23 + animalIndex * 1.4 + wave * 1.6 + day * 0.06 - (animalIndex === 3 && day > 24 ? (day - 24) * 0.9 : 0)),
    ph: round(6.65 + Math.sin(day * 0.4 + animalIndex) * 0.09),
    fat: round(3.6 + animalIndex * 0.12 + wave * 0.15),
    protein: round(3.15 + animalIndex * 0.04 + wave * 0.08),
    scc: Math.round(120 + animalIndex * 22 + wave * 18 + (animalIndex === 3 && day > 24 ? (day - 24) * 22 : 0)),
  };
}));
const shortDate = (value: string) => value.slice(8) + "/" + value.slice(5, 7);

export function AnimalDemo() {
  const [animalId, setAnimalId] = useState("001");
  const [period, setPeriod] = useState(14);
  const [metric, setMetric] = useState<Metric>("liters");
  const [compare, setCompare] = useState(true);
  const [point, setPoint] = useState<number | null>(null);
  const animalIndex = animals.findIndex(animal => animal.id === animalId);
  const animal = animals[animalIndex];
  const history = rows[animalIndex].slice(-period);
  const latest = history[history.length - 1];
  const previous = history[history.length - 2];
  const activeIndex = point ?? history.length - 1;
  const active = history[activeIndex];
  const config = metrics[metric];
  const values = history.map(row => row[metric]);
  const average = values.reduce((sum, value) => sum + value, 0) / values.length;
  const herd = history.map((_, index) => rows.reduce((sum, data) => sum + data[30 - period + index][metric], 0) / animals.length);
  const allValues = compare ? [...values, ...herd] : values;
  const padding = Math.max((Math.max(...allValues) - Math.min(...allValues)) * 0.2, metric === "ph" ? 0.04 : 0.2);
  const min = Math.min(...allValues) - padding;
  const max = Math.max(...allValues) + padding;
  const x = (index: number) => 72 + index * 770 / (history.length - 1);
  const y = (value: number) => 232 - (value - min) / (max - min) * 196;
  const line = (data: number[]) => data.map((value, index) => `${x(index)},${y(value)}`).join(" ");
  const delta = latest[metric] - previous[metric];

  return <div className={styles.animalDemo}>
    <div className={styles.sectionHeading}><div><p className={styles.eyebrow}>ACOMPANHAMENTO INDIVIDUAL</p><h2>Conheça cada animal do rebanho</h2><p>Selecione um animal para acompanhar seu leite ao longo dos dias.</p></div><span className={styles.badge}>6 animais · 30 dias simulados</span></div>
    <div className={styles.animalGrid} role="group" aria-label="Selecionar animal">
      {animals.map((item, index) => <button key={item.id} className={styles.animalButton} aria-pressed={animalId === item.id} onClick={() => { setAnimalId(item.id); setPoint(null); }}>
        <span className={styles.animalAvatar}>{item.name.slice(0, 1)}</span><span><strong>{item.name}</strong><small>Brinco {item.id} · {item.breed}</small><small>{format(rows[index][29].liters)} L no último dia</small></span>
      </button>)}
    </div>
    <div className={styles.animalProfile}><div><p className={styles.eyebrow}>BRINCO {animal.id} / {animal.group}</p><h2>{animal.name}</h2><p>{animal.breed} · {animal.days} dias em lactação · Dispositivo DEMO-{animal.id}</p></div><div><strong>Indicadores do leite</strong><p>Avaliação de qualidade: não realizada</p><small>Dados ilustrativos; não representam laudo ou diagnóstico.</small></div></div>
    <div className={styles.milkMetrics}>
      {(Object.keys(metrics) as Metric[]).map(key => <button key={key} className={styles.metricButton} aria-pressed={metric === key} onClick={() => { setMetric(key); setPoint(null); }}>
        <span>{metrics[key].label}</span><strong>{format(latest[key])} <small>{metrics[key].unit}</small></strong><small>{metrics[key].source}</small>
      </button>)}
    </div>
    <section className={styles.card} aria-label="Evolução diária">
      <div className={styles.sectionHeading}><div><h2>{config.label} ao longo dos dias</h2><p>{shortDate(history[0].date)} a {shortDate(latest.date)}/2026 · {animal.name}</p></div><div className={styles.periodControl}><label htmlFor="history-period">Período</label><select id="history-period" value={period} onChange={event => { setPeriod(Number(event.target.value)); setPoint(null); }}><option value={7}>Últimos 7 dias</option><option value={14}>Últimos 14 dias</option><option value={30}>Últimos 30 dias</option></select></div></div>
      <div className={styles.chartSummary}><span>Último dia <strong>{format(latest[metric])} {config.unit}</strong></span><span>Diferença para o dia anterior <strong>{delta > 0 ? "+" : ""}{format(delta)} {config.unit}</strong></span><span>Média do período <strong>{format(average)} {config.unit}</strong></span></div>
      <label className={styles.compareToggle}><input type="checkbox" checked={compare} onChange={event => setCompare(event.target.checked)} /> Comparar com a média dos 6 animais</label>
      <div className={styles.chartWrap}>
        <svg viewBox="0 0 880 280" className={styles.historyChart} role="img" aria-label={`${config.label} de ${animal.name}, últimos ${period} dias. Valores disponíveis no histórico abaixo.`}>
          {[0, 1, 2, 3, 4].map(tick => { const value = min + (max - min) * tick / 4; return <g key={tick}><line x1="72" x2="842" y1={y(value)} y2={y(value)} stroke="#e0e9e5" /><text x="62" y={y(value) + 4} textAnchor="end" fill="#587076" fontSize="12">{format(value)}</text></g>; })}
          {compare && <polyline points={line(herd)} fill="none" stroke="#b47724" strokeWidth="2" strokeDasharray="7 5" />}
          <polyline points={line(values)} fill="none" stroke="#126454" strokeWidth="3" />
          {history.map((row, index) => <g key={row.date}><circle cx={x(index)} cy={y(row[metric])} r={activeIndex === index ? 6 : 4} fill="#126454" /><circle cx={x(index)} cy={y(row[metric])} r="12" fill="transparent" onMouseEnter={() => setPoint(index)} onClick={() => setPoint(index)}><title>{shortDate(row.date)}: {format(row[metric])} {config.unit}</title></circle>{(index === 0 || index === history.length - 1 || index === Math.floor(history.length / 2)) && <text x={x(index)} y="264" textAnchor="middle" fill="#587076" fontSize="12">{shortDate(row.date)}</text>}</g>)}
        </svg>
      </div>
      <div className={styles.chartLegend}><span>● {animal.name}</span>{compare && <span>┄ Média do rebanho simulado</span>}<small>Escala vertical ajustada ao período · {config.unit}</small></div>
      <label htmlFor="history-day">Explorar dia: {shortDate(active.date)} — {format(active[metric])} {config.unit}{compare ? ` · Rebanho: ${format(herd[activeIndex])} ${config.unit}` : ""}</label>
      <input id="history-day" className={styles.daySlider} type="range" min="0" max={history.length - 1} value={activeIndex} onChange={event => setPoint(Number(event.target.value))} aria-valuetext={`${shortDate(active.date)}: ${format(active[metric])} ${config.unit}`} />
      <p className={styles.note}>A média do rebanho é uma comparação descritiva, não uma faixa ideal. Os indicadores não classificam automaticamente a qualidade do leite.</p>
    </section>
    <section className={styles.card}>
      <div className={styles.sectionHeading}><div><h2>Histórico de {animal.name}</h2><p>Um registro ilustrativo por dia · medições e resultados simulados</p></div><span className={styles.badge}>{history.length} registros</span></div>
      <div className={styles.tableWrap}><table><caption className={styles.srOnly}>Histórico diário de leite de {animal.name}</caption><thead><tr><th scope="col">Dia</th><th scope="col">Produção (L)</th><th scope="col">pH do leite</th><th scope="col">Gordura (%)</th><th scope="col">Proteína (%)</th><th scope="col">CCS (mil células/mL)</th></tr></thead><tbody>{[...history].reverse().map(row => <tr key={row.date}><td>{shortDate(row.date)}/2026</td><td>{format(row.liters)}</td><td>{format(row.ph)}</td><td>{format(row.fat)}</td><td>{format(row.protein)}</td><td>{format(row.scc)}</td></tr>)}</tbody></table></div>
    </section>
  </div>;
}
