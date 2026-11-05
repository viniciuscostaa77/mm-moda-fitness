import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useShop } from "@/lib/shop-store";

export const Route = createFileRoute("/ajuda")({
  head: () => ({ meta: [{ title: "Ajuda · MM Moda Fitness" }] }),
  component: HelpPage,
});

const rows = [
  ["P", "36–38", "Busto até 88", "Cintura até 68", "Quadril até 96"],
  ["M", "38–40", "Busto até 94", "Cintura até 74", "Quadril até 102"],
  ["G", "40–42", "Busto até 100", "Cintura até 80", "Quadril até 108"],
  ["GG", "44–46", "Busto até 108", "Cintura até 88", "Quadril até 116"],
];

function HelpPage() {
  const orders = useShop((s) => s.orders);
  const hydrated = useShop((s) => s.hydrated);
  const [code, setCode] = useState("");
  const found = hydrated ? orders.find((order) => order.id.toLowerCase() === code.trim().toLowerCase()) : undefined;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="font-display text-5xl">Ajuda</h1>
      <p className="mt-3 text-mist">Frete, troca, medidas e o código do pedido que você fez neste aparelho.</p>

      <section className="mt-10">
        <h2 className="font-display text-3xl">Frete</h2>
        <p className="mt-2 text-mist">
          PAC de R$ 22,90 em 6 a 12 dias úteis, grátis acima de R$ 249. SEDEX de R$ 39,90 em 2 a 5 dias úteis.
          O prazo começa depois que a vendedora confirma o pagamento.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-3xl">Troca e arrependimento</h2>
        <p className="mt-2 text-mist">
          Compras online têm 7 dias para arrependimento, pelo Código de Defesa do Consumidor. A peça precisa
          voltar sem uso, com etiqueta. Chama no WhatsApp com o número do pedido que a gente combina a coleta
          ou o envio.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-3xl">Pagamento</h2>
        <p className="mt-2 text-mist">
          Pix tem 5% de desconto neste site. Cartão e o fechamento direto com a vendedora também estão no
          checkout. O cupom MM10 tira 10% do subtotal. A cobrança em si é confirmada no atendimento — o site
          guarda o pedido neste navegador.
        </p>
      </section>

      <section id="medidas" className="mt-10 scroll-mt-24">
        <h2 className="font-display text-3xl">Guia de medidas</h2>
        <p className="mt-2 text-sm text-mist">Medidas do corpo em centímetros, não da peça. Na dúvida entre dois, fica com o maior.</p>
        <div className="mt-4 overflow-x-auto rounded-2xl border border-line">
          <table className="w-full min-w-[32rem] text-left text-sm">
            <thead className="bg-paper text-mist">
              <tr>
                {["Tamanho", "BR", "Busto", "Cintura", "Quadril"].map((head) => (
                  <th key={head} className="px-3 py-3 font-medium">{head}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row[0]} className="border-t border-line">
                  {row.map((cell) => (
                    <td key={cell} className="px-3 py-3">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-sm text-mist">
          Tamanho único veste do P ao M, conforme a elasticidade da peça. Numéricos 36 ao 42 seguem a coluna BR.
          Glow usa numeração; a maioria dos conjuntos usa letra.
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-line bg-paper p-5">
        <h2 className="font-display text-3xl">Achar um pedido</h2>
        <form
          className="mt-3 flex gap-2"
          onSubmit={(event) => {
            event.preventDefault();
            if (found) window.location.assign(`/pedido/${found.id}`);
          }}
        >
          <input
            value={code}
            onChange={(event) => setCode(event.target.value)}
            placeholder="MM000000"
            className="h-12 flex-1 rounded-xl border border-line px-3 uppercase"
          />
          <button type="submit" className="h-12 rounded-xl bg-ink px-4 font-semibold text-foam">
            Buscar
          </button>
        </form>
        {code && hydrated && !found ? <p className="mt-3 text-sm text-mist">Não achei esse código neste aparelho.</p> : null}
        {found ? (
          <Link to="/pedido/$id" params={{ id: found.id }} className="mt-3 inline-block text-sm font-semibold text-teal">
            Abrir {found.id}
          </Link>
        ) : null}
      </section>
    </div>
  );
}
