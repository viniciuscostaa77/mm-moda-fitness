import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { getProduct } from "@/lib/catalog";
import { money, quote } from "@/lib/commerce";
import { useShop, type Order } from "@/lib/shop-store";

export const Route = createFileRoute("/checkout")({
  component: CheckoutPage,
});

const ufs = ["AC","AL","AM","AP","BA","CE","DF","ES","GO","MA","MG","MS","MT","PA","PB","PE","PI","PR","RJ","RN","RO","RR","RS","SC","SE","SP","TO"];

function CheckoutPage() {
  const cart = useShop((s) => s.cart);
  const placeOrder = useShop((s) => s.placeOrder);
  const navigate = useNavigate();
  const [ship, setShip] = useState<"pac" | "sedex">("pac");
  const [pay, setPay] = useState<"pix" | "cartao" | "whatsapp">("pix");
  const [coupon, setCoupon] = useState("");
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    cep: "",
    address: "",
    city: "",
    uf: "PE",
  });

  const subtotal = cart.reduce((sum, line) => sum + (getProduct(line.slug)?.price ?? 0) * line.qty, 0);
  const totals = quote({ subtotal, coupon, pay, ship });

  function set<K extends keyof typeof form>(key: K, value: string) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    if (!cart.length) return;
    if (!form.name.trim() || form.phone.trim().length < 8 || !form.address.trim() || !form.city.trim()) {
      setError("Preenche nome, telefone, endereço e cidade para a gente enviar.");
      return;
    }
    if (!totals.known) {
      setError("Cupom inválido. Usa MM10 ou deixa em branco.");
      return;
    }
    const order: Order = {
      id: `MM${Date.now().toString().slice(-6)}`,
      createdAt: new Date().toISOString(),
      lines: cart.map((line) => ({ ...line })),
      ...form,
      ship,
      pay,
      coupon: totals.code,
      subtotal,
      discount: totals.couponOff,
      pixOff: totals.pixOff,
      freight: totals.ship,
      total: totals.total,
    };
    placeOrder(order);
    void navigate({ to: "/pedido/$id", params: { id: order.id } });
  }

  if (!cart.length) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16">
        <h1 className="font-display text-4xl">Nada para fechar</h1>
        <Link to="/loja" className="mt-6 inline-flex h-12 items-center rounded-2xl bg-teal px-6 font-semibold text-paper">
          Escolher peças
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-5xl gap-8 px-4 py-8 md:grid-cols-[1fr_300px]">
      <form onSubmit={submit} className="space-y-6">
        <h1 className="font-display text-4xl">Fechar pedido</h1>
        <fieldset className="grid gap-3 rounded-2xl border border-line bg-paper p-5 sm:grid-cols-2">
          <legend className="px-1 font-display text-2xl">Entrega</legend>
          <Field label="Nome" value={form.name} onChange={(value) => set("name", value)} />
          <Field label="WhatsApp" value={form.phone} onChange={(value) => set("phone", value)} />
          <Field label="E-mail" value={form.email} onChange={(value) => set("email", value)} className="sm:col-span-2" />
          <Field label="CEP" value={form.cep} onChange={(value) => set("cep", value)} />
          <label className="text-sm">
            UF
            <select value={form.uf} onChange={(event) => set("uf", event.target.value)} className="mt-1 h-12 w-full rounded-xl border border-line px-3">
              {ufs.map((uf) => (
                <option key={uf}>{uf}</option>
              ))}
            </select>
          </label>
          <Field label="Cidade" value={form.city} onChange={(value) => set("city", value)} />
          <Field label="Endereço" value={form.address} onChange={(value) => set("address", value)} className="sm:col-span-2" />
        </fieldset>

        <fieldset className="rounded-2xl border border-line bg-paper p-5">
          <legend className="px-1 font-display text-2xl">Frete</legend>
          <Radio name="ship" checked={ship === "pac"} onChange={() => setShip("pac")} title="PAC" detail={totals.ship === 0 && ship === "pac" ? "Grátis" : "6 a 12 dias úteis"} />
          <Radio name="ship" checked={ship === "sedex"} onChange={() => setShip("sedex")} title="SEDEX" detail="2 a 5 dias úteis" />
        </fieldset>

        <fieldset className="rounded-2xl border border-line bg-paper p-5">
          <legend className="px-1 font-display text-2xl">Pagamento</legend>
          <Radio name="pay" checked={pay === "pix"} onChange={() => setPay("pix")} title="Pix" detail="5% de desconto. A vendedora manda a chave." />
          <Radio name="pay" checked={pay === "cartao"} onChange={() => setPay("cartao")} title="Cartão" detail="A vendedora envia o link de pagamento." />
          <Radio name="pay" checked={pay === "whatsapp"} onChange={() => setPay("whatsapp")} title="Combinar no WhatsApp" detail="Você fecha cor, prazo e pagamento com o atendimento." />
          <label className="mt-3 block text-sm">
            Cupom
            <input value={coupon} onChange={(event) => setCoupon(event.target.value)} placeholder="MM10" className="mt-1 h-12 w-full rounded-xl border border-line px-3 uppercase" />
          </label>
        </fieldset>
        {error ? <p className="text-sm font-medium">{error}</p> : null}
        <button type="submit" className="h-12 w-full rounded-2xl bg-teal font-semibold text-paper">
          Confirmar pedido · {money(totals.total)}
        </button>
        <p className="text-xs text-mist">
          O pedido fica salvo neste aparelho e a equipe confirma pagamento e prazo no WhatsApp. Não é uma cobrança automática.
        </p>
      </form>

      <aside className="h-fit rounded-2xl border border-line bg-paper p-5">
        <h2 className="font-display text-2xl">Resumo</h2>
        <ul className="mt-3 space-y-2 text-sm">
          {cart.map((line) => {
            const product = getProduct(line.slug);
            if (!product) return null;
            return (
              <li key={`${line.slug}-${line.size}-${line.color}`} className="flex justify-between gap-3">
                <span>
                  {line.qty}× {product.name}
                </span>
                <span className="tabular-nums">{money(product.price * line.qty)}</span>
              </li>
            );
          })}
        </ul>
        <dl className="mt-4 space-y-1 border-t border-line pt-3 text-sm">
          <Row label="Subtotal" value={money(subtotal)} />
          {totals.couponOff > 0 ? <Row label="Cupom" value={`−${money(totals.couponOff)}`} /> : null}
          {totals.pixOff > 0 ? <Row label="Pix" value={`−${money(totals.pixOff)}`} /> : null}
          <Row label="Frete" value={totals.ship === 0 ? "Grátis" : money(totals.ship)} />
          <div className="flex justify-between pt-2 font-semibold">
            <dt>Total</dt>
            <dd className="tabular-nums">{money(totals.total)}</dd>
          </div>
        </dl>
      </aside>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  className = "",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}) {
  return (
    <label className={`block text-sm ${className}`}>
      {label}
      <input value={value} onChange={(event) => onChange(event.target.value)} className="mt-1 h-12 w-full rounded-xl border border-line px-3" />
    </label>
  );
}

function Radio({
  name,
  checked,
  onChange,
  title,
  detail,
}: {
  name: string;
  checked: boolean;
  onChange: () => void;
  title: string;
  detail: string;
}) {
  return (
    <label className={`mt-2 flex cursor-pointer gap-3 rounded-xl border p-3 ${checked ? "border-ink" : "border-line"}`}>
      <input type="radio" name={name} checked={checked} onChange={onChange} className="mt-1" />
      <span>
        <span className="block font-medium">{title}</span>
        <span className="text-sm text-mist">{detail}</span>
      </span>
    </label>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <dt className="text-mist">{label}</dt>
      <dd className="tabular-nums">{value}</dd>
    </div>
  );
}
