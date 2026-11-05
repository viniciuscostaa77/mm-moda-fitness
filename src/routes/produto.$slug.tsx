import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ProductCard } from "@/components/product-card";
import { categoryLabel, getProduct, relatedTo } from "@/lib/catalog";
import { money, waLink } from "@/lib/commerce";
import { useShop } from "@/lib/shop-store";

export const Route = createFileRoute("/produto/$slug")({
  component: ProductPage,
});

function ProductPage() {
  const { slug } = Route.useParams();
  const product = getProduct(slug);
  if (!product) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20">
        <h1 className="font-display text-4xl">Essa peça saiu da arara</h1>
        <Link to="/loja" className="mt-6 inline-flex h-12 items-center rounded-2xl bg-teal px-6 font-semibold text-paper">
          Voltar ao catálogo
        </Link>
      </div>
    );
  }
  return <ProductView key={product.slug} slug={product.slug} />;
}

function ProductView({ slug }: { slug: string }) {
  const product = getProduct(slug)!;
  const add = useShop((s) => s.add);
  const wished = useShop((s) => s.hydrated && s.wish.includes(product.slug));
  const toggleWish = useShop((s) => s.toggleWish);
  const [size, setSize] = useState(product.sizes.length === 1 ? product.sizes[0] : "");
  const [color, setColor] = useState(product.colors[0].id);
  const [photo, setPhoto] = useState(0);
  const [note, setNote] = useState("");
  const colorName = product.colors.find((item) => item.id === color)?.name ?? color;

  useEffect(() => {
    setSize(product.sizes.length === 1 ? product.sizes[0] : "");
    setColor(product.colors[0].id);
    setPhoto(0);
    setNote("");
  }, [product]);

  function addToBag() {
    if (!size) {
      setNote("Escolhe um tamanho para reservar.");
      return;
    }
    add({ slug: product.slug, size, color });
    setNote("Entrou na sacola.");
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <p className="text-sm text-mist">
        <Link to="/loja">Loja</Link>
        <span> / </span>
        <Link to="/loja" search={{ cat: product.category }}>
          {categoryLabel(product.category)}
        </Link>
      </p>
      <div className="mt-4 grid gap-8 md:grid-cols-2">
        <div>
          <img src={product.images[photo]} alt={product.name} className="w-full rounded-2xl object-cover" />
          {product.images.length > 1 ? (
            <div className="mt-3 flex gap-2">
              {product.images.map((src, index) => (
                <button key={src} type="button" onClick={() => setPhoto(index)} className={`shot-frame w-20 rounded-xl ${photo === index ? "ring-2 ring-teal" : ""}`}>
                  <img src={src} alt="" className="shot" />
                </button>
              ))}
            </div>
          ) : null}
        </div>
        <div>
          <p className="text-xs font-semibold tracking-widest text-teal uppercase">{product.line}</p>
          <h1 className="mt-2 font-display text-4xl leading-none md:text-5xl">{product.name}</h1>
          <p className="mt-4 font-display text-3xl tabular-nums">{money(product.price)}</p>
          <p className="mt-4 text-mist">{product.blurb}</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {product.features.map((feature) => (
              <li key={feature} className="rounded-full border border-line bg-paper px-3 py-1 text-sm">
                {feature}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-mist">Tecido: {product.fabric}</p>

          <p className="mt-8 text-sm font-semibold">Cor · {colorName}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {product.colors.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-label={item.name}
                aria-pressed={color === item.id}
                onClick={() => setColor(item.id)}
                className={`h-11 rounded-full border px-3 text-sm ${color === item.id ? "border-ink" : "border-line"}`}
              >
                <span className="mr-2 inline-block size-3 rounded-full border border-line align-middle" style={{ background: item.hex }} />
                {item.name}
              </button>
            ))}
          </div>
          <p className="mt-2 text-xs text-mist">Outras cores sob consulta no WhatsApp. A foto mostra a cor em destaque.</p>

          <p className="mt-6 text-sm font-semibold">Tamanho</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {product.sizes.map((item) => (
              <button
                key={item}
                type="button"
                aria-pressed={size === item}
                onClick={() => {
                  setSize(item);
                  setNote("");
                }}
                className={`h-11 min-w-11 rounded-xl px-3 text-sm font-semibold ${size === item ? "bg-ink text-foam" : "border border-line bg-paper"}`}
              >
                {item}
              </button>
            ))}
          </div>
          <Link to="/ajuda" hash="medidas" className="mt-2 inline-block text-sm text-teal">
            Ver guia de medidas
          </Link>

          {note ? <p className="mt-4 text-sm font-medium">{note}</p> : null}
          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <button type="button" onClick={addToBag} className="h-12 flex-1 rounded-2xl bg-teal font-semibold text-paper">
              Adicionar à sacola
            </button>
            <a
              href={waLink(
                `Olá! Quero o ${product.name}${size ? `, tamanho ${size}` : ""}, cor ${colorName}. Vim pelo site.`,
              )}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 flex-1 items-center justify-center rounded-2xl border border-ink font-semibold"
            >
              Reservar no WhatsApp
            </a>
          </div>
          <button type="button" onClick={() => toggleWish(product.slug)} className="mt-3 text-sm font-medium text-mist underline">
            {wished ? "Salvo nos favoritos" : "Salvar nos favoritos"}
          </button>

          <details className="mt-8 border-t border-line pt-4">
            <summary className="text-sm font-semibold">Troca, prazo e pagamento</summary>
            <p className="mt-2 text-sm text-mist">
              PAC grátis acima de R$ 249. Pix com 5% neste site, ou feche direto com a vendedora. Troca em 7 dias
              para peça sem uso, conforme o Código de Defesa do Consumidor.
            </p>
          </details>
        </div>
      </div>

      <h2 className="mt-16 font-display text-3xl">Combina com</h2>
      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        {relatedTo(product.slug).map((item) => (
          <ProductCard key={item.slug} product={item} />
        ))}
      </div>
    </div>
  );
}
