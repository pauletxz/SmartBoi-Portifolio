"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import Image from "next/image";
import prototype from "@/assets/prototipo.png";

const signals = [
  { label: "Alimentação", detail: "o que chega ao cocho", className: "signal-feed" },
  { label: "Rebanho", detail: "sinais na rotina", className: "signal-herd" },
  { label: "pH", detail: "uma leitura a observar", className: "signal-ph" },
  { label: "Qualidade", detail: "a decisão antes do tanque", className: "signal-quality" },
];

function MapSignal({ signal, index, progress }: { signal: typeof signals[number]; index: number; progress: MotionValue<number> }) {
  const reducedMotion = useReducedMotion();
  const start = index * 0.2;
  const opacity = useTransform(progress, [start, start + 0.18], [0, 1]);
  const y = useTransform(progress, [start, start + 0.18], [24, 0]);
  const scale = useTransform(progress, [start, start + 0.18], [0.9, 1]);
  return (
    <motion.article className={`map-signal ${signal.className}`} style={reducedMotion ? undefined : { opacity, y, scale }}>
      <span className="map-signal-index">0{index + 1}</span>
      <h3>{signal.label}</h3>
      <p>{signal.detail}</p>
    </motion.article>
  );
}

export function ConfidenceMap() {
  const stageRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  // Reveal the cards while the entire map is inside the viewport.
  const { scrollYProgress } = useScroll({ target: stageRef, offset: ["end 90%", "start 110px"] });
  const orbitRotate = useTransform(scrollYProgress, [0, 1], [-8, 12]);
  const sampleScale = useTransform(scrollYProgress, [0, 0.18, 0.72, 1], [0.9, 1, 1, 1.06]);
  const stageOpacity = useTransform(scrollYProgress, [0, 0.08], [0.55, 1]);

  return (
    <section className="confidence-section" aria-labelledby="mapa-confianca">
      <header className="confidence-heading">
        <div className="confidence-copy">
          <p className="eyebrow">O mapa da confiança</p>
          <h2 id="mapa-confianca">Antes da perda, existem sinais.</h2>
          <p>
            O Lacta IA nasce para ajudar a dar contexto a parâmetros que hoje podem passar despercebidos na rotina.
          </p>
        </div>
      </header>
      <div className="confidence-panel">
        <div ref={stageRef} className="confidence-stage" aria-label="Representação conceitual dos sinais acompanhados pelo Lacta IA">
          <motion.div
            className="map-connections"
            aria-hidden="true"
            style={prefersReducedMotion ? undefined : { rotate: orbitRotate, opacity: stageOpacity }}
          />
          <motion.div
            className="milk-sample"
            style={prefersReducedMotion ? undefined : { scale: sampleScale }}
          >
            <div className="map-prototype-photo">
              <Image src={prototype} alt="Protótipo Lacta IA com visor, placa eletrônica e sensor de pH." fill sizes="(max-width: 739px) 90vw, 450px" placeholder="blur" />
            </div>
          </motion.div>

          {signals.map((signal, index) => (
            <MapSignal key={signal.label} signal={signal} index={index} progress={scrollYProgress} />
          ))}
        </div>

        <p className="confidence-disclaimer">
          Representação conceitual. O protótipo e o case de campo estão em desenvolvimento.
        </p>
      </div>
    </section>
  );
}
