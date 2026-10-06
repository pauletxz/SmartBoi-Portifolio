"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

const signals = [
  { label: "Alimentação", detail: "o que chega ao cocho", className: "signal-feed" },
  { label: "Rebanho", detail: "sinais na rotina", className: "signal-herd" },
  { label: "pH", detail: "uma leitura a observar", className: "signal-ph" },
  { label: "Qualidade", detail: "a decisão antes do tanque", className: "signal-quality" },
];

export function ConfidenceMap() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const feedOpacity = useTransform(scrollYProgress, [0.08, 0.2], [0.12, 1]);
  const herdOpacity = useTransform(scrollYProgress, [0.24, 0.36], [0.12, 1]);
  const phOpacity = useTransform(scrollYProgress, [0.4, 0.52], [0.12, 1]);
  const qualityOpacity = useTransform(scrollYProgress, [0.56, 0.68], [0.12, 1]);
  const orbitRotate = useTransform(scrollYProgress, [0, 1], [-8, 12]);
  const sampleScale = useTransform(scrollYProgress, [0, 0.18, 0.72, 1], [0.9, 1, 1, 1.06]);
  const stageOpacity = useTransform(scrollYProgress, [0, 0.08], [0.55, 1]);
  const signalOpacities = [feedOpacity, herdOpacity, phOpacity, qualityOpacity];

  return (
    <section ref={sectionRef} className="confidence-section" aria-labelledby="mapa-confianca">
      <div className="confidence-sticky">
        <div className="confidence-copy">
          <p className="eyebrow">O mapa da confiança</p>
          <h2 id="mapa-confianca">Antes da perda, existem sinais.</h2>
          <p>
            O Lacta IA nasce para ajudar a dar contexto a parâmetros que hoje podem passar despercebidos na rotina.
          </p>
        </div>

        <div className="confidence-stage" aria-label="Representação conceitual dos sinais acompanhados pelo Lacta IA">
          <motion.div
            className="map-connections"
            aria-hidden="true"
            style={prefersReducedMotion ? undefined : { rotate: orbitRotate, opacity: stageOpacity }}
          />
          <motion.div
            className="milk-sample"
            style={prefersReducedMotion ? undefined : { scale: sampleScale }}
          >
            <span>leitura<br />em contexto</span>
          </motion.div>

          {signals.map((signal, index) => (
            <motion.article
              className={`map-signal ${signal.className}`}
              key={signal.label}
              style={prefersReducedMotion ? undefined : { opacity: signalOpacities[index] }}
            >
              <span className="map-signal-index">0{index + 1}</span>
              <h3>{signal.label}</h3>
              <p>{signal.detail}</p>
            </motion.article>
          ))}
        </div>

        <p className="confidence-disclaimer">
          Representação conceitual. O protótipo e o case de campo estão em desenvolvimento.
        </p>
      </div>
    </section>
  );
}
