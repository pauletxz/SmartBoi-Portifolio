"use client";

import React from "react";
import { motion } from "motion/react";

interface BentoCardProps {
  className?: string;
  children: React.ReactNode;
  delay?: number;
}

export function BentoCard({ className = "", children, delay = 0 }: BentoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`rounded-3xl bg-[var(--bg-secondary)] border border-[var(--border-soft)] overflow-hidden ${className}`}
    >
      {children}
    </motion.div>
  );
}
