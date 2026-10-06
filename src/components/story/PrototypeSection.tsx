import { Activity, CircleGauge, Wheat } from "lucide-react";

const layers = [
  {
    title: "Observar o pH",
    description: "Criar uma leitura simples para acompanhar um parâmetro importante do leite.",
    icon: CircleGauge,
  },
  {
    title: "Entender o contexto",
    description: "Relacionar a medição com alimentação, manejo e sinais percebidos na rotina.",
    icon: Wheat,
  },
  {
    title: "Planejar antes da perda",
    description: "Transformar sinais isolados em informação mais útil para a tomada de decisão.",
    icon: Activity,
  },
];

export function PrototypeSection() {
  return (
    <section className="prototype-section" aria-labelledby="prototype-title">
      <div className="site-container prototype-layout">
        <div className="prototype-copy">
          <p className="prototype-kicker">Lacta IA em construção</p>
          <h2 id="prototype-title">O medidor é o começo. O contexto ajuda a decidir.</h2>
          <p>
            Estamos preparando o primeiro case de campo para aprender com quem acompanha o rebanho todos os dias.
          </p>
        </div>

        <div className="prototype-layers" aria-label="Frentes investigadas pelo protótipo">
          {layers.map(({ title, description, icon: Icon }, index) => (
            <article className="prototype-layer" key={title}>
              <span className="prototype-layer-index">0{index + 1}</span>
              <Icon aria-hidden="true" size={24} strokeWidth={1.5} />
              <div>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
