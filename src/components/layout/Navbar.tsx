import React from "react";
import Link from "next/link";
import { StatusBadge } from "@/components/ui/StatusBadge";
import Image from "next/image";
import smartboiLogo from "@/assets/logosmartboi.svg";

export function Navbar() {
  return (
    <nav className="site-nav" aria-label="Navegação principal">
      <div className="site-nav-inner">
        <Link className="brand-link" href="/" aria-label="SmartBoi, página inicial">
          <Image src={smartboiLogo} alt="SmartBoi" width={200} height={60} className="brand-logo" />
          <StatusBadge className="ml-4 hidden sm:inline-flex">
            Lacta IA em prototipação
          </StatusBadge>
        </Link>
        <Link href="/colaborar" className="nav-cta">Participar</Link>
      </div>
    </nav>
  );
}
