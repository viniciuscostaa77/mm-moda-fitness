import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ProductCard } from "@/components/product-card";
import { categories, products } from "@/lib/catalog";
import { waLink } from "@/lib/commerce";

export const Route = createFileRoute("/")({
  component: Home,
});

const phrases = ["se veste.", "se vive.", "se sente."];
const ticker = [
  "Zero transparência",
  "Cós alto",
  "Bojo removível",
  "Poliamida",
  "Envio para todo o Brasil",
  "Troca em 7 dias",
];

function Home() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setIndex((value) => (value + 1) % phrases.length), 2200);
    return () => clearInterval(timer);
  }, []);
  const featured = products.slice(0, 8);

  return (
    <div>
      <section className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-10 md:grid-cols-2 md:py-16">
        <div>
          <p className="text-xs font-semibold tracking-widest text-teal uppercase">MM Moda Fitness</p>
          <h1 className="mt-3 font-display text-5xl leading-none md:text-7xl">
            Pré-treino não se toma, <span className="text-teal">{phrases[index]}</span>
          </h1>
          <p className="mt-5 max-w-md text-lg text-mist">
            Conjuntos, leggings e shorts em poliamida e canelado. Zero transparência, bojo removível e modelagem
            que acompanha o treino — e o que vem depois.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/loja" className="inline-flex h-12 items-center rounded-2xl bg-teal px-6 font-semibold text-paper">
              Ver a arara
            </Link>
            <a
              href={waLink("Olá! Quero ver os conjuntos disponíveis.")}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 items-center rounded-2xl border border-ink px-6 font-semibold"
            >
              Falar com a vendedora
            </a>
          </div>
          <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-line pt-6 text-sm">
            <div>
              <dt className="text-mist">Tamanhos</dt>
              <dd className="font-display text-2xl">P ao GG</dd>
            </div>
            <div>
              <dt className="text-mist">Tecido</dt>
              <dd className="font-display text-2xl">320</dd>
            </div>
            <div>
              <dt className="text-mist">Envio</dt>
              <dd className="font-display text-2xl">Brasil</dd>
            </div>
          </dl>
        </div>
        <div className="shot-frame relative rounded-2xl">
          <img
            src="/looks/hero.jpg"
            alt="Conjunto Short Corredora areia, top de costa aberta e short de cós alto"
            className="shot"
          />
          <Link
            to="/produto/$slug"
            params={{ slug: "conjunto-short-corredora" }}
            className="absolute right-4 bottom-4 left-4 rounded-2xl bg-paper/95 p-4"
          >
            <p className="text-xs tracking-widest text-mist uppercase">Em destaque</p>
            <p className="font-display text-xl">Conjunto Short Corredora</p>
            <p className="text-sm">Poliamida 320 · R$ 129,99</p>
          </Link>
        </div>
      </section>

      <div className="overflow-hidden border-y border-line bg-paper">
        <div className="ticker flex w-max gap-10 py-3">
          {[...ticker, ...ticker].map((item, i) => (
            <span key={`${item}-${i}`} className="text-xs font-semibold tracking-widest uppercase">
              {item}
            </span>
          ))}
        </div>
      </div>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-display text-4xl">Na arara</h2>
          <Link to="/loja" className="text-sm font-semibold text-teal">
            Ver tudo
          </Link>
        </div>
        <div className="mt-6 flex max-w-full gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Link
              key={category.id}
              to="/loja"
              search={{ cat: category.id }}
              className="shrink-0 rounded-full border border-line bg-paper px-4 py-2 text-sm font-medium"
            >
              {category.label}
            </Link>
          ))}
        </div>
        <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      <section className="bg-ink text-foam">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-xs font-semibold tracking-widest text-teal uppercase">Três modelagens</p>
            <h2 className="mt-3 font-display text-4xl leading-none md:text-5xl">
              Short-saia Elite, macaquito e a calça de gola alta.
            </h2>
            <p className="mt-4 max-w-md text-foam/75">
              O mesmo critério em todas: compressão que não marca, bojo que sai para lavar e um corte que vale
              dentro e fora da academia.
            </p>
            <Link
              to="/loja"
              className="mt-8 inline-flex h-12 items-center rounded-2xl bg-teal px-6 font-semibold text-paper"
            >
              Escolher a peça
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <img src="/looks/elite.jpg" alt="Conjunto short-saia Elite off-white" className="shot rounded-2xl" />
            <img src="/looks/macaquito.jpg" alt="Macaquito lilás de poliamida" className="shot mt-8 rounded-2xl" />
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-14 md:grid-cols-4">
        {[
          ["Zero transparência", "Poliamida e canelado que aguentam o agachamento sem marcar."],
          ["Bojo removível", "Sustentação no treino e facilidade na lavagem."],
          ["Do P ao GG", "Tem peça em tamanho único, numérico e letra. A tabela está na ajuda."],
          ["Todo o Brasil", "PAC grátis acima de R$ 249. A vendedora confirma o prazo no WhatsApp."],
        ].map(([title, text]) => (
          <div key={title} className="rounded-2xl border border-line bg-paper p-5">
            <h3 className="font-display text-2xl leading-tight">{title}</h3>
            <p className="mt-2 text-sm text-mist">{text}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
