import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ProductCard } from "@/components/product-card";
import { categories, filterProducts, letterSizes } from "@/lib/catalog";

type LojaSearch = {
  cat?: string;
  q?: string;
  ordem?: "menor" | "maior";
  tam?: string;
};

export const Route = createFileRoute("/loja")({
  validateSearch: (search: Record<string, unknown>): LojaSearch => ({
    cat: typeof search.cat === "string" ? search.cat : undefined,
    q: typeof search.q === "string" ? search.q : undefined,
    ordem: search.ordem === "menor" || search.ordem === "maior" ? search.ordem : undefined,
    tam: typeof search.tam === "string" ? search.tam : undefined,
  }),
  component: LojaPage,
});

function LojaPage() {
  const search = Route.useSearch();
  const navigate = useNavigate();
  const list = filterProducts(search);
  const title = categories.find((item) => item.id === search.cat)?.label ?? "Catálogo";

  function update(next: Partial<LojaSearch>) {
    const merged = { ...search, ...next };
    void navigate({
      to: "/loja",
      search: {
        cat: merged.cat || undefined,
        q: merged.q || undefined,
        ordem: merged.ordem,
        tam: merged.tam || undefined,
      },
    });
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <p className="text-xs font-semibold tracking-widest text-teal uppercase">Arara</p>
      <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
        <h1 className="font-display text-4xl md:text-5xl">{title}</h1>
        <label className="text-sm text-mist">
          Ordenar
          <select
            value={search.ordem ?? "destaque"}
            onChange={(event) =>
              update({ ordem: event.target.value === "destaque" ? undefined : (event.target.value as "menor" | "maior") })
            }
            className="ml-2 h-11 rounded-xl border border-line bg-paper px-3 text-ink"
          >
            <option value="destaque">Destaque</option>
            <option value="menor">Menor preço</option>
            <option value="maior">Maior preço</option>
          </select>
        </label>
      </div>
      {search.q ? (
        <p className="mt-3 text-sm text-mist">
          Resultados para “{search.q}” · {list.length} {list.length === 1 ? "peça" : "peças"}
        </p>
      ) : (
        <p className="mt-3 text-sm text-mist">{list.length} peças · cores sob consulta com a vendedora</p>
      )}

      <div className="mt-6 flex flex-wrap gap-2">
        <Chip active={!search.cat} onClick={() => update({ cat: undefined })}>
          Tudo
        </Chip>
        {categories.map((category) => (
          <Chip key={category.id} active={search.cat === category.id} onClick={() => update({ cat: category.id })}>
            {category.label}
          </Chip>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        <Chip active={!search.tam} onClick={() => update({ tam: undefined })}>
          Todos os tamanhos
        </Chip>
        {letterSizes.map((size) => (
          <Chip key={size} active={search.tam === size} onClick={() => update({ tam: size })}>
            {size}
          </Chip>
        ))}
      </div>

      {list.length === 0 ? (
        <div className="mt-12 rounded-2xl border border-line bg-paper p-8">
          <h2 className="font-display text-3xl">Nada nessa combinação</h2>
          <p className="mt-2 text-mist">Tira o tamanho ou a busca e a arara volta inteira.</p>
          <button type="button" className="mt-6 h-12 rounded-2xl bg-ink px-5 font-semibold text-foam" onClick={() => update({ cat: undefined, q: undefined, tam: undefined })}>
            Limpar filtros
          </button>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3">
          {list.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`h-11 rounded-full px-4 text-sm font-medium ${active ? "bg-ink text-foam" : "border border-line bg-paper"}`}
    >
      {children}
    </button>
  );
}
