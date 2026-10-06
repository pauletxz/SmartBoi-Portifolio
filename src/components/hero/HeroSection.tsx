"use client";

import { motion, useReducedMotion } from "motion/react";

export function HeroSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="hero-shell" aria-labelledby="hero-title">
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-orbit hero-orbit-one" aria-hidden="true" />
      <div className="hero-orbit hero-orbit-two" aria-hidden="true" />
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

        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.85, delay: 0.12, ease: [0.2, 0.8, 0.2, 1] }}
          className="hero-visual"
          aria-label="Representação conceitual de uma leitura de qualidade do leite"
        >
          <div className="reading-card reading-card-top">
            <span>leite</span><strong>em observação</strong>
          </div>
          <div className="reading-card reading-card-bottom">
            <span>mais contexto</span><strong>antes da decisão</strong>
          </div>
          <div className="hero-sample">
            <div className="hero-sample-ring" />
            <p>qualidade<br />em leitura</p>
          </div>
          <span className="hero-coordinate coordinate-a">07°</span>
          <span className="hero-coordinate coordinate-b">NE</span>
        </motion.div>
      </div>
    </section>
  );
}
