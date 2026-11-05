import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { money } from "@/lib/commerce";
import type { Product } from "@/lib/catalog";
import { useShop } from "@/lib/shop-store";

export function ProductCard({ product }: { product: Product }) {
  const wished = useShop((s) => s.wish.includes(product.slug));
  const toggleWish = useShop((s) => s.toggleWish);
  const hydrated = useShop((s) => s.hydrated);
  const on = hydrated && wished;

  return (
    <article className="group min-w-0">
      <div className="shot-frame relative rounded-2xl">
        <Link to="/produto/$slug" params={{ slug: product.slug }} className="block h-full">
          <img src={product.images[0]} alt={product.name} className="shot transition duration-300 group-hover:scale-105" />
        </Link>
        {product.badge ? (
          <span className="absolute top-3 left-3 rounded-full bg-paper px-3 py-1 text-xs font-semibold tracking-wide text-ink uppercase">
            {product.badge}
          </span>
        ) : null}
        <button
          type="button"
          aria-label={on ? "Remover dos favoritos" : "Salvar nos favoritos"}
          aria-pressed={on}
          onClick={() => toggleWish(product.slug)}
          className="absolute top-3 right-3 grid h-11 w-11 place-items-center rounded-full bg-paper/90 text-ink"
        >
          <Heart className={on ? "size-5 fill-teal text-teal" : "size-5"} />
        </button>
      </div>
      <div className="mt-3 min-w-0">
        <p className="text-xs font-medium tracking-widest text-mist uppercase">{product.line}</p>
        <Link
          to="/produto/$slug"
          params={{ slug: product.slug }}
          className="mt-1 block font-display text-lg leading-tight"
        >
          {product.name}
        </Link>
        <p className="mt-1 text-sm font-semibold tabular-nums">{money(product.price)}</p>
      </div>
    </article>
  );
}
