import React from "react";
import Link from "next/link";
import Image from "next/image";
import smartboiLogo from "@/assets/logosmartboi.svg";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-container site-footer-layout">
        <Link className="footer-brand" href="/" aria-label="SmartBoi, página inicial">
          <Image src={smartboiLogo} alt="SmartBoi" width={200} height={60} className="brand-logo" />
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
