import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { LeadCaptureForm } from "@/components/hero/LeadCaptureForm";

export default function CollaboratePage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="collaborate-page">
        <div className="collaborate-orbit collaborate-orbit-one" aria-hidden="true" />
        <div className="collaborate-orbit collaborate-orbit-two" aria-hidden="true" />
        <div className="site-container collaborate-layout">
          <section className="collaborate-copy" aria-labelledby="colaborar-title">
            <p className="eyebrow">Lacta IA em prototipação</p>
            <h1 id="colaborar-title">Vamos construir com quem vive o campo.</h1>
            <p>
              Procuramos produtores, técnicos e parceiros interessados em contribuir para o primeiro case real de medição de pH e qualidade do leite.
            </p>
            <Link className="back-link" href="/">
              <ArrowLeft size={17} strokeWidth={1.75} aria-hidden="true" /> Voltar à apresentação
            </Link>
          </section>
          <section className="collaborate-form" aria-label="Formulário de colaboração">
            <LeadCaptureForm />
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
