import React from "react";
import Link from "next/link";
import { Activity } from "lucide-react";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-container site-footer-layout">
        <Link className="footer-brand" href="/" aria-label="SmartBoi, página inicial">
          <div className="flex h-6 w-6 items-center justify-center rounded bg-[var(--action-cta)] text-[var(--bg-primary)]">
            <Activity size={16} strokeWidth={2.5} aria-hidden="true" />
          </div>
          <span className="text-lg font-bold tracking-tight text-[var(--text-primary)]">
            SmartBoi
          </span>
        </Link>
        <div className="footer-purpose">
          Informação para uma produção com mais confiança.
        </div>
        <div className="footer-meta">
          <span>&copy; {new Date().getFullYear()} SmartBoi</span>
          <Link href="/colaborar">Colaborar</Link>
        </div>
      </div>
    </footer>
  );
}
