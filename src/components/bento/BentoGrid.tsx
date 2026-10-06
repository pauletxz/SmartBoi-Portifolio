import { Droplets, Leaf, ScanSearch } from "lucide-react";

const steps = [
  {
    index: "01",
    title: "O sinal chega tarde",
    description: "Na rotina, parte das informações só aparece quando o animal já demonstra um problema ou quando a produção já sofreu o impacto.",
    icon: ScanSearch,
  },
  {
    index: "02",
    title: "O prejuízo não avisa",
    description: "Quando a qualidade do leite é comprometida, uma decisão tardia pode afetar uma produção inteira.",
    icon: Droplets,
  },
  {
    index: "03",
    title: "A alimentação também fala",
    description: "Entender relações entre manejo, alimentação e qualidade abre espaço para decisões mais conscientes no campo.",
    icon: Leaf,
  },
];

export function BentoGrid() {
  return (
    <section id="problema" className="problem-section" aria-labelledby="problema-title">
      <div className="site-container">
        <div className="problem-heading">
          <p className="problem-intro">O custo invisível</p>
          <h2 id="problema-title">O problema não começa quando aparece.</h2>
          <p>Ele começa quando um sinal útil ainda não encontrou atenção suficiente.</p>
        </div>

        <div className="problem-story">
          {steps.map(({ index, title, description, icon: Icon }) => (
            <article className="problem-step" key={index}>
              <div className="problem-step-top">
                <span>{index}</span>
                <Icon aria-hidden="true" size={23} strokeWidth={1.5} />
              </div>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
