import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import smartboiLogo from "@/assets/logosmartboi.svg";
import { AnimalDemo } from "./animal-demo";
import styles from "./portal.module.css";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Teste o protótipo | SmartBoi",
  robots: { index: false, follow: false },
};

export default function PrototypePage() {
  return <main id="main-content" className={styles.portal}>
    <header className={styles.header}>
      <Link href="/" className={styles.brand} aria-label="SmartBoi, página inicial">
        <Image src={smartboiLogo} alt="SmartBoi" width={200} height={60} className={styles.logo} priority />
      </Link>
      <Link href="/" className="nav-cta">Voltar ao site</Link>
    </header>
    <section className={styles.dashboard} aria-labelledby="demo-title">
      <p className={styles.eyebrow}>TESTE O PROTÓTIPO</p>
      <h1 id="demo-title">Meu rebanho</h1>
      <p className={styles.badge}>Modo demonstração · Dados fictícios, sem conexão com dispositivos reais.</p>
      <p className={styles.note}>Explore os animais, indicadores e períodos sem criar uma conta. Produção e resultados laboratoriais ilustram integrações futuras.</p>
      <AnimalDemo />
    </section>
    <footer className={styles.footer}>
      <span>SmartBoi · Tecnologia próxima do campo</span>
      {process.env.PROTOTYPE_PORTAL_ENABLED === "true" && <Link href="/prototipo/acesso">Acessar meus dispositivos</Link>}
      <Link href="/colaborar">Quero participar do piloto</Link>
    </footer>
  </main>;
}
