import { ArrowDownRight } from "lucide-react";
import Link from "next/link";

export function FinalCtaSection() {
  return (
    <section className="final-cta" aria-labelledby="colabore-title">
      <div className="site-container final-cta-layout">
        <p className="final-cta-kicker">O próximo passo é coletivo</p>
        <div>
          <h2 id="colabore-title">O protótipo precisa de quem conhece o campo.</h2>
          <p>
            Estamos construindo o Lacta IA e procurando produtores, técnicos e pessoas que queiram contribuir para um case real de medição de pH.
          </p>
        </div>
        <Link className="cta-button" href="/colaborar">
          Quero colaborar <ArrowDownRight size={20} strokeWidth={1.75} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
