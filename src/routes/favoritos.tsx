import { createFileRoute, Link } from "@tanstack/react-router";
import { ProductCard } from "@/components/product-card";
import { getProduct } from "@/lib/catalog";
import { useShop } from "@/lib/shop-store";

export const Route = createFileRoute("/favoritos")({
  component: WishPage,
});

function WishPage() {
  const wish = useShop((s) => s.wish);
  const hydrated = useShop((s) => s.hydrated);
  const items = wish.map((slug) => getProduct(slug)).filter((item) => item != null);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="font-display text-4xl">Favoritos</h1>
      {!hydrated ? <p className="mt-6 text-mist">Abrindo sua lista…</p> : null}
      {hydrated && items.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-line bg-paper p-8">
          <p className="text-mist">Você ainda não salvou nenhuma peça.</p>
          <Link to="/loja" className="mt-6 inline-flex h-12 items-center rounded-2xl bg-teal px-6 font-semibold text-paper">
            Ver a arara
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          {items.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
