"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import fieldMeasurement from "@/assets/parte-inicial.png";
import countryside from "@/assets/hero-campo.png";

export function HeroSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="hero-shell" aria-labelledby="hero-title">
      <div className="hero-countryside" aria-hidden="true">
        <Image src={countryside} alt="" fill sizes="100vw" className="hero-countryside-image" />
      </div>
      <div className="hero-grid" aria-hidden="true" />
      <svg className="hero-data-network" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
        <g className="hero-data-lines">
          <path d="M40 780 260 690 500 760 760 660 1020 720 1400 590" />
          <path d="M760 660 880 440 1110 350 1370 410" />
        </g>
        <g className="hero-data-flow">
          <path d="M40 780 260 690 500 760 760 660 1020 720 1400 590" />
          <path d="M760 660 880 440 1110 350 1370 410" />
        </g>
        <g className="hero-data-points">
          <circle cx="260" cy="690" r="4" />
          <circle cx="500" cy="760" r="4" />
          <circle cx="760" cy="660" r="5" />
          <circle cx="1020" cy="720" r="4" />
          <circle cx="880" cy="440" r="4" />
          <circle cx="1110" cy="350" r="4" />
        </g>
      </svg>
      <div className="site-container hero-layout">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
          className="hero-copy"
        >
          <p className="eyebrow">SmartBoi apresenta Lacta IA</p>
          <h1 id="hero-title">Produção com<br /><em>confiança.</em></h1>
          <p className="hero-lead">
            Um protótipo para tornar mais visíveis os sinais que importam na qualidade do leite e na saúde do rebanho.
          </p>
          <a className="text-link" href="#problema">Entenda o problema <span aria-hidden="true">↓</span></a>
        </motion.div>

        <motion.figure
          initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.85, delay: 0.12, ease: [0.2, 0.8, 0.2, 1] }}
          className="hero-visual"
        >
          <Image
            src={fieldMeasurement}
            alt="Sensor mergulhado em uma amostra de leite, com o visor do protótipo Lacta IA ao fundo."
            fill
            sizes="(max-width: 739px) 100vw, (max-width: 1472px) 52vw, 680px"
            quality={90}
            priority
            placeholder="blur"
            className="hero-photo"
          />
          <figcaption className="hero-photo-caption">
            <span>Lacta IA · protótipo</span>
            <strong>Da ideia à leitura do leite.</strong>
          </figcaption>
        </motion.figure>
      </div>
    </section>
  );
}
