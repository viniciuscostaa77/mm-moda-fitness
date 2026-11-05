import { createFileRoute, Link } from "@tanstack/react-router";
import { waLink } from "@/lib/commerce";

export const Route = createFileRoute("/sobre")({
  head: () => ({ meta: [{ title: "Sobre · MM Moda Fitness" }] }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div>
      <section className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-12 md:grid-cols-2">
        <div>
          <p className="text-xs font-semibold tracking-widest text-teal uppercase">A marca</p>
          <h1 className="mt-3 font-display text-5xl leading-none">Pré-treino não se toma, se veste.</h1>
          <p className="mt-5 text-lg text-mist">
            A MM Moda Fitness nasceu para quem quer entrar na academia já arrumada e sair de lá sem trocar de
            roupa. Poliamida de alta compressão, canelado que não marca e modelagem do P ao GG.
          </p>
          <p className="mt-4 text-mist">
            A loja é online e o atendimento é de gente: a vendedora confirma cor, tamanho e prazo no WhatsApp.
            Enviamos para todo o Brasil.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/loja" className="inline-flex h-12 items-center rounded-2xl bg-teal px-6 font-semibold text-paper">
              Ver peças
            </Link>
            <a href={waLink("Olá! Quero conhecer a MM Moda Fitness.")} className="inline-flex h-12 items-center rounded-2xl border border-ink px-6 font-semibold">
              Chamar no WhatsApp
            </a>
          </div>
        </div>
        <img src="/looks/gola.jpg" alt="Conjunto calça gola alta off-white" className="w-full rounded-2xl object-cover" />
      </section>
      <section className="border-t border-line bg-paper">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-3">
          {[
            ["Tecido", "Poliamida 320 e microcanelado com zero transparência. O bojo sai para lavar."],
            ["Modelagem", "Cós alto, short duplo, short-saia, macaquito e calça. Tem tamanho único e do P ao GG."],
            ["Atendimento", "Você monta o pedido aqui e a vendedora fecha cor, pagamento e rastreio no WhatsApp."],
          ].map(([title, text]) => (
            <div key={title}>
              <h2 className="font-display text-3xl">{title}</h2>
              <p className="mt-2 text-mist">{text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
