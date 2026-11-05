import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { INSTAGRAM, waLink, WHATSAPP_PRETTY } from "@/lib/commerce";

export const Route = createFileRoute("/contato")({
  head: () => ({ meta: [{ title: "Contato · MM Moda Fitness" }] }),
  component: ContactPage,
});

function ContactPage() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("Oi! Quero saber cor e tamanho de uma peça.");

  return (
    <div className="mx-auto grid max-w-5xl gap-10 px-4 py-12 md:grid-cols-2">
      <div>
        <p className="text-xs font-semibold tracking-widest text-teal uppercase">Atendimento</p>
        <h1 className="mt-2 font-display text-5xl leading-none">Fala com a vendedora.</h1>
        <p className="mt-4 text-mist">
          Cor, reposição e prazo saem mais rápido no WhatsApp. O horário de resposta é em horário comercial,
          de segunda a sábado.
        </p>
        <dl className="mt-8 space-y-4">
          <div>
            <dt className="text-xs tracking-widest text-mist uppercase">WhatsApp</dt>
            <dd className="font-display text-3xl">{WHATSAPP_PRETTY}</dd>
          </div>
          <div>
            <dt className="text-xs tracking-widest text-mist uppercase">Instagram</dt>
            <dd>
              <a href={INSTAGRAM} className="font-medium text-teal" target="_blank" rel="noreferrer">
                @mmmodafitnes__
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-xs tracking-widest text-mist uppercase">Envio</dt>
            <dd>Todo o Brasil, a partir da confirmação do pagamento.</dd>
          </div>
        </dl>
      </div>
      <form
        className="rounded-2xl border border-line bg-paper p-5"
        onSubmit={(event) => {
          event.preventDefault();
          const text = `${name ? `${name}: ` : ""}${message}`;
          window.open(waLink(text), "_blank", "noopener,noreferrer");
        }}
      >
        <label className="block text-sm">
          Seu nome
          <input value={name} onChange={(event) => setName(event.target.value)} className="mt-1 h-12 w-full rounded-xl border border-line px-3" />
        </label>
        <label className="mt-4 block text-sm">
          Mensagem
          <textarea value={message} onChange={(event) => setMessage(event.target.value)} rows={5} className="mt-1 w-full rounded-xl border border-line px-3 py-3" />
        </label>
        <button type="submit" className="mt-4 h-12 w-full rounded-2xl bg-teal font-semibold text-paper">
          Abrir no WhatsApp
        </button>
      </form>
    </div>
  );
}
