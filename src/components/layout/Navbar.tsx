import React from "react";
import Link from "next/link";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Activity } from "lucide-react";

export function Navbar() {
  return (
    <nav className="site-nav" aria-label="Navegação principal">
      <div className="site-nav-inner">
        <Link className="brand-link" href="/" aria-label="SmartBoi, página inicial">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--action-cta)] text-[var(--bg-primary)]">
            <Activity size={20} strokeWidth={2.5} aria-hidden="true" />
          </div>
          <span className="text-xl font-bold tracking-tight text-[var(--text-primary)]">
            SmartBoi
          </span>
          <StatusBadge className="ml-4 hidden sm:inline-flex">
            Lacta IA em prototipação
          </StatusBadge>
        </Link>
        <Link href="/colaborar" className="nav-cta">Participar</Link>
      </div>
    </nav>
  );
}
