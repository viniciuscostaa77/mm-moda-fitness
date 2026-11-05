import { createFileRoute, Link } from "@tanstack/react-router";
import { getProduct } from "@/lib/catalog";
import { money, waLink } from "@/lib/commerce";
import { useShop } from "@/lib/shop-store";

export const Route = createFileRoute("/pedido/$id")({
  component: OrderPage,
});

const payLabel = { pix: "Pix", cartao: "Cartão", whatsapp: "WhatsApp" };
const shipLabel = { pac: "PAC", sedex: "SEDEX" };

function OrderPage() {
  const { id } = Route.useParams();
  const order = useShop((s) => s.orders.find((item) => item.id === id));
  const hydrated = useShop((s) => s.hydrated);

  if (!hydrated) {
    return <p className="px-4 py-16 text-center text-mist">Buscando o pedido…</p>;
  }
  if (!order) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16">
        <h1 className="font-display text-4xl">Pedido não encontrado</h1>
        <p className="mt-3 text-mist">Os pedidos ficam salvos neste navegador. Confere o código ou fala com a vendedora.</p>
        <Link to="/contato" className="mt-6 inline-flex h-12 items-center rounded-2xl bg-teal px-6 font-semibold text-paper">
          Falar com a vendedora
        </Link>
      </div>
    );
  }

  const lines = order.lines
    .map((line) => {
      const product = getProduct(line.slug);
      return product ? `${line.qty}× ${product.name} (${line.size}, ${product.colors.find((c) => c.id === line.color)?.name ?? line.color})` : line.slug;
    })
    .join("\n");
  const message = `Olá! Acabei de fazer o pedido ${order.id} no site.\n${lines}\nTotal ${money(order.total)} · ${payLabel[order.pay]} · ${shipLabel[order.ship]}\n${order.name} · ${order.city}/${order.uf}`;

  return (
    <div className="mx-auto max-w-xl px-4 py-12">
      <p className="text-xs font-semibold tracking-widest text-teal uppercase">Pedido confirmado</p>
      <h1 className="mt-2 font-display text-5xl">{order.id}</h1>
      <p className="mt-3 text-mist">
        {order.name}, a sacola foi reservada neste aparelho. Manda o código para a vendedora confirmar o pagamento.
      </p>
      <ul className="mt-6 divide-y divide-line rounded-2xl border border-line bg-paper px-4">
        {order.lines.map((line) => {
          const product = getProduct(line.slug);
          return (
            <li key={`${line.slug}-${line.size}-${line.color}`} className="flex justify-between gap-3 py-3 text-sm">
              <span>
                {line.qty}× {product?.name ?? line.slug}
                <span className="block text-mist">{line.size}</span>
              </span>
              <span className="tabular-nums">{product ? money(product.price * line.qty) : ""}</span>
            </li>
          );
        })}
      </ul>
      <dl className="mt-4 space-y-1 text-sm">
        <div className="flex justify-between"><dt className="text-mist">Entrega</dt><dd>{shipLabel[order.ship]} · {order.city}/{order.uf}</dd></div>
        <div className="flex justify-between"><dt className="text-mist">Pagamento</dt><dd>{payLabel[order.pay]}</dd></div>
        <div className="flex justify-between font-semibold"><dt>Total</dt><dd className="tabular-nums">{money(order.total)}</dd></div>
      </dl>
      <a href={waLink(message)} target="_blank" rel="noreferrer" className="mt-6 flex h-12 items-center justify-center rounded-2xl bg-teal font-semibold text-paper">
        Enviar pedido no WhatsApp
      </a>
      <Link to="/loja" className="mt-3 flex h-12 items-center justify-center rounded-2xl border border-line font-semibold">
        Continuar na loja
      </Link>
    </div>
  );
}
