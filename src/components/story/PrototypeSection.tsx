import { Activity, CircleGauge, Wheat } from "lucide-react";
import Image from "next/image";
import prototypeSetup from "@/assets/IMG-20261003-WA0017.jpg";
import sensorDetail from "@/assets/IMG-20261003-WA0012.jpg";

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
      <div className="site-container prototype-gallery" aria-label="Registros do protótipo Lacta IA">
        <figure className="prototype-photo">
          <div className="prototype-photo-frame prototype-photo-setup">
            <Image
              src={prototypeSetup}
              alt="Visor e placa do Lacta IA conectados ao notebook durante uma medição com amostra de leite."
              fill
              sizes="(max-width: 739px) 100vw, (max-width: 1472px) 55vw, 780px"
              placeholder="blur"
            />
          </div>
          <figcaption><span>01 / O conjunto</span>Sensor, visor e software no mesmo experimento.</figcaption>
        </figure>
        <figure className="prototype-photo">
          <div className="prototype-photo-frame prototype-photo-detail">
            <Image
              src={sensorDetail}
              alt="Detalhe do sensor azul dentro de um recipiente de leite, com o visor eletrônico nas mãos de uma pessoa."
              fill
              sizes="(max-width: 739px) 100vw, (max-width: 1472px) 40vw, 580px"
              placeholder="blur"
            />
          </div>
          <figcaption><span>02 / A medição</span>Um olhar mais próximo sobre a amostra.</figcaption>
        </figure>
      </div>
    </section>
  );
}
