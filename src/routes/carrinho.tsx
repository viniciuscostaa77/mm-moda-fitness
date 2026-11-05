import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus } from "lucide-react";
import { getProduct } from "@/lib/catalog";
import { money, quote, waLink } from "@/lib/commerce";
import { useShop } from "@/lib/shop-store";
import { useState } from "react";

export const Route = createFileRoute("/carrinho")({
  component: CartPage,
});

function CartPage() {
  const cart = useShop((s) => s.cart);
  const setQty = useShop((s) => s.setQty);
  const remove = useShop((s) => s.remove);
  const [coupon, setCoupon] = useState("");
  const [applied, setApplied] = useState("");
  const subtotal = cart.reduce((sum, line) => sum + (getProduct(line.slug)?.price ?? 0) * line.qty, 0);
  const totals = quote({ subtotal, coupon: applied, pay: "cartao", ship: "pac" });

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="font-display text-4xl">Sacola</h1>
      {cart.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-line bg-paper p-8">
          <p className="text-mist">Nada por aqui ainda.</p>
          <Link to="/loja" className="mt-6 inline-flex h-12 items-center rounded-2xl bg-teal px-6 font-semibold text-paper">
            Ir para a loja
          </Link>
        </div>
      ) : (
        <div className="mt-6 grid gap-8 md:grid-cols-[1fr_280px]">
          <ul className="divide-y divide-line rounded-2xl border border-line bg-paper px-4">
            {cart.map((line) => {
              const product = getProduct(line.slug);
              if (!product) return null;
              const color = product.colors.find((item) => item.id === line.color)?.name ?? line.color;
              return (
                <li key={`${line.slug}-${line.size}-${line.color}`} className="flex gap-4 py-4">
                  <img src={product.images[0]} alt="" className="h-28 w-20 rounded-xl object-cover" />
                  <div className="flex-1">
                    <Link to="/produto/$slug" params={{ slug: product.slug }} className="font-medium">
                      {product.name}
                    </Link>
                    <p className="text-sm text-mist">
                      {color} · {line.size}
                    </p>
                    <div className="mt-3 flex items-center gap-3">
                      <div className="flex items-center rounded-full border border-line">
                        <button type="button" aria-label="Diminuir" className="grid h-11 w-11 place-items-center" onClick={() => setQty(line.slug, line.size, line.color, line.qty - 1)}>
                          <Minus className="size-4" />
                        </button>
                        <span className="w-6 text-center tabular-nums">{line.qty}</span>
                        <button type="button" aria-label="Aumentar" className="grid h-11 w-11 place-items-center" onClick={() => setQty(line.slug, line.size, line.color, line.qty + 1)}>
                          <Plus className="size-4" />
                        </button>
                      </div>
                      <button type="button" className="text-sm text-mist underline" onClick={() => remove(line.slug, line.size, line.color)}>
                        Remover
                      </button>
                    </div>
                  </div>
                  <p className="font-semibold tabular-nums">{money(product.price * line.qty)}</p>
                </li>
              );
            })}
          </ul>
          <aside className="h-fit rounded-2xl border border-line bg-paper p-5">
            <form
              className="flex gap-2"
              onSubmit={(event) => {
                event.preventDefault();
                setApplied(coupon.trim());
              }}
            >
              <input
                value={coupon}
                onChange={(event) => setCoupon(event.target.value)}
                placeholder="Cupom"
                className="h-11 w-full rounded-xl border border-line px-3"
              />
              <button type="submit" className="h-11 rounded-xl bg-ink px-4 text-sm font-semibold text-foam">
                Ok
              </button>
            </form>
            {applied && !totals.known ? <p className="mt-2 text-sm text-teal">Cupom não reconhecido. Tenta MM10.</p> : null}
            {totals.couponOff > 0 ? <p className="mt-2 text-sm">MM10 aplicado: −{money(totals.couponOff)}</p> : null}
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-mist">Subtotal</dt>
                <dd className="tabular-nums">{money(subtotal)}</dd>
              </div>
              <div className="flex justify-between font-semibold">
                <dt>Estimado</dt>
                <dd className="tabular-nums">{money(totals.total)}</dd>
              </div>
            </dl>
            <p className="mt-2 text-xs text-mist">Frete PAC entra no fechamento. Grátis acima de R$ 249.</p>
            <Link to="/checkout" className="mt-4 flex h-12 items-center justify-center rounded-2xl bg-teal font-semibold text-paper">
              Fechar pedido
            </Link>
            <a
              href={waLink("Olá! Quero fechar um pedido que montei no site.")}
              className="mt-2 flex h-12 items-center justify-center text-sm font-medium text-teal"
            >
              Ou chamar a vendedora
            </a>
          </aside>
        </div>
      )}
    </div>
  );
}
