import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import * as Dialog from "@radix-ui/react-dialog";
import { Heart, Menu, MessageCircle, Minus, Plus, Search, ShoppingBag, X } from "lucide-react";
import { useMemo, useState, type ReactNode } from "react";
import { Logo } from "@/components/logo";
import { filterProducts, getProduct } from "@/lib/catalog";
import { money, waLink, WHATSAPP_PRETTY } from "@/lib/commerce";
import { useCartCount, useHydrateShop, useShop } from "@/lib/shop-store";

const shopLinks = [
  { label: "Loja", search: {} as { cat?: string } },
  { label: "Conjuntos", search: { cat: "conjuntos" } },
  { label: "Leggings", search: { cat: "leggings" } },
  { label: "Shorts", search: { cat: "shorts" } },
];

export function ShopShell({ children }: { children: ReactNode }) {
  useHydrateShop();
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div className="flex min-h-screen flex-col bg-foam text-ink">
      <p className="bg-ink px-4 py-2 text-center text-xs tracking-wide text-foam">
        Enviamos para todo o Brasil · Frete PAC grátis acima de R$ 249 · Troca em 7 dias
      </p>
      <header className="sticky top-0 z-30 border-b border-line bg-foam/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4">
          <button
            type="button"
            className="grid h-11 w-11 place-items-center md:hidden"
            aria-label="Abrir menu"
            onClick={() => useShop.getState().setMenuOpen(true)}
          >
            <Menu className="size-5" />
          </button>
          <Logo />
          <nav className="ml-6 hidden items-center gap-6 md:flex">
            {shopLinks.map((item) => (
              <Link key={item.label} to="/loja" search={item.search} className="text-sm font-medium">
                {item.label}
              </Link>
            ))}
            <Link to="/sobre" className={`text-sm font-medium ${path === "/sobre" ? "text-teal" : ""}`}>
              Sobre
            </Link>
          </nav>
          <div className="ml-auto flex items-center">
            <IconButton label="Buscar" onClick={() => useShop.getState().setSearchOpen(true)}>
              <Search className="size-5" />
            </IconButton>
            <Link to="/favoritos" aria-label="Favoritos" className="grid h-11 w-11 place-items-center">
              <Heart className="size-5" />
            </Link>
            <IconButton label="Abrir sacola" onClick={() => useShop.getState().setDrawer(true)}>
              <ShoppingBag className="size-5" />
              <Count />
            </IconButton>
          </div>
        </div>
      </header>
      <MobileMenu />
      <SearchDialog />
      <CartDrawer />
      <main className="flex-1 pb-24">{children}</main>
      <Footer />
      <a
        href={waLink("Olá! Vim pelo site da MM Moda Fitness e quero atendimento.")}
        target="_blank"
        rel="noreferrer"
        className="fixed right-4 bottom-4 z-40 flex h-14 items-center gap-2 rounded-full bg-teal px-4 text-sm font-semibold text-paper shadow-lg"
      >
        <MessageCircle className="size-5" />
        <span className="hidden sm:inline">WhatsApp</span>
      </a>
    </div>
  );
}

function IconButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button type="button" aria-label={label} onClick={onClick} className="relative grid h-11 w-11 place-items-center">
      {children}
    </button>
  );
}

function Count() {
  const count = useCartCount();
  if (!count) return null;
  return (
    <span className="absolute top-1 right-0 grid h-5 min-w-5 place-items-center rounded-full bg-teal px-1 text-xs font-semibold text-paper tabular-nums">
      {count}
    </span>
  );
}

function MobileMenu() {
  const open = useShop((s) => s.menuOpen);
  return (
    <Dialog.Root open={open} onOpenChange={useShop.getState().setMenuOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-ink/50" />
        <Dialog.Content className="fixed inset-y-0 left-0 z-50 flex w-full max-w-sm flex-col bg-foam p-6">
          <div className="flex items-center justify-between">
            <Dialog.Title className="font-display text-2xl">Menu</Dialog.Title>
            <Dialog.Close className="grid h-11 w-11 place-items-center" aria-label="Fechar">
              <X className="size-5" />
            </Dialog.Close>
          </div>
          <nav className="mt-8 flex flex-col gap-2">
            {shopLinks.map((item) => (
              <Link
                key={item.label}
                to="/loja"
                search={item.search}
                onClick={() => useShop.getState().setMenuOpen(false)}
                className="border-b border-line py-4 font-display text-3xl"
              >
                {item.label}
              </Link>
            ))}
            <Link to="/sobre" onClick={() => useShop.getState().setMenuOpen(false)} className="border-b border-line py-4 font-display text-3xl">
              Sobre
            </Link>
            <Link to="/ajuda" onClick={() => useShop.getState().setMenuOpen(false)} className="py-4 text-lg">
              Trocas, frete e medidas
            </Link>
            <Link to="/contato" onClick={() => useShop.getState().setMenuOpen(false)} className="py-4 text-lg">
              Contato
            </Link>
          </nav>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function SearchDialog() {
  const open = useShop((s) => s.searchOpen);
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  const results = useMemo(() => (q.trim() ? filterProducts({ q }).slice(0, 6) : []), [q]);

  return (
    <Dialog.Root open={open} onOpenChange={useShop.getState().setSearchOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-ink/50" />
        <Dialog.Content className="fixed top-0 right-0 left-0 z-50 mx-auto w-full max-w-2xl bg-paper p-4 shadow-xl sm:top-16 sm:rounded-2xl">
          <Dialog.Title className="sr-only">Buscar peças</Dialog.Title>
          <form
            className="flex items-center gap-2"
            onSubmit={(event) => {
              event.preventDefault();
              useShop.getState().setSearchOpen(false);
              void navigate({ to: "/loja", search: { q } });
            }}
          >
            <Search className="size-5 text-mist" />
            <input
              autoFocus
              value={q}
              onChange={(event) => setQ(event.target.value)}
              placeholder="Buscar conjunto, legging, short..."
              className="h-12 w-full bg-transparent text-lg outline-none"
            />
            <Dialog.Close className="grid h-11 w-11 place-items-center" aria-label="Fechar busca">
              <X className="size-5" />
            </Dialog.Close>
          </form>
          <ul className="mt-2 divide-y divide-line">
            {results.map((product) => (
              <li key={product.slug}>
                <Link
                  to="/produto/$slug"
                  params={{ slug: product.slug }}
                  onClick={() => useShop.getState().setSearchOpen(false)}
                  className="flex items-center gap-3 py-3"
                >
                  <img src={product.images[0]} alt="" className="h-16 w-12 rounded-lg object-cover" />
                  <span className="flex-1">
                    <span className="block font-medium">{product.name}</span>
                    <span className="text-sm text-mist">{product.line}</span>
                  </span>
                  <span className="text-sm font-semibold tabular-nums">{money(product.price)}</span>
                </Link>
              </li>
            ))}
          </ul>
          {q.trim() && results.length === 0 ? (
            <p className="py-6 text-sm text-mist">Nenhuma peça com esse nome. Tente “legging” ou “short”.</p>
          ) : null}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export function CartDrawer() {
  const open = useShop((s) => s.drawer);
  const cart = useShop((s) => s.cart);
  const subtotal = cart.reduce((sum, line) => sum + (getProduct(line.slug)?.price ?? 0) * line.qty, 0);

  return (
    <Dialog.Root open={open} onOpenChange={useShop.getState().setDrawer}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-ink/50" />
        <Dialog.Content className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-paper">
          <div className="flex items-center justify-between border-b border-line px-5 py-4">
            <Dialog.Title className="font-display text-2xl">Sacola</Dialog.Title>
            <Dialog.Close className="grid h-11 w-11 place-items-center" aria-label="Fechar sacola">
              <X className="size-5" />
            </Dialog.Close>
          </div>
          <div className="flex-1 overflow-y-auto px-5">
            {cart.length === 0 ? (
              <p className="py-10 text-mist">Sua sacola está vazia. A arara está logo ali.</p>
            ) : (
              <ul className="divide-y divide-line">
                {cart.map((line) => (
                  <CartRow key={`${line.slug}-${line.size}-${line.color}`} line={line} />
                ))}
              </ul>
            )}
          </div>
          <div className="border-t border-line p-5">
            <div className="mb-4 flex items-center justify-between text-sm">
              <span className="text-mist">Subtotal</span>
              <span className="font-semibold tabular-nums">{money(subtotal)}</span>
            </div>
            <Link
              to="/checkout"
              onClick={() => useShop.getState().setDrawer(false)}
              className="flex h-12 items-center justify-center rounded-2xl bg-teal font-semibold text-paper"
            >
              Fechar pedido
            </Link>
            <Link
              to="/carrinho"
              onClick={() => useShop.getState().setDrawer(false)}
              className="mt-2 flex h-12 items-center justify-center rounded-2xl border border-line font-semibold"
            >
              Ver sacola
            </Link>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function CartRow({ line }: { line: { slug: string; size: string; color: string; qty: number } }) {
  const product = getProduct(line.slug);
  const setQty = useShop((s) => s.setQty);
  const remove = useShop((s) => s.remove);
  if (!product) return null;
  const color = product.colors.find((item) => item.id === line.color)?.name ?? line.color;
  return (
    <li className="flex gap-3 py-4">
      <img src={product.images[0]} alt="" className="h-24 w-16 rounded-xl object-cover" />
      <div className="min-w-0 flex-1">
        <p className="font-medium leading-tight">{product.name}</p>
        <p className="mt-1 text-sm text-mist">
          {color} · {line.size}
        </p>
        <div className="mt-3 flex items-center gap-3">
          <div className="flex items-center rounded-full border border-line">
            <button
              type="button"
              className="grid h-11 w-11 place-items-center"
              aria-label="Diminuir"
              onClick={() => setQty(line.slug, line.size, line.color, line.qty - 1)}
            >
              <Minus className="size-4" />
            </button>
            <span className="w-6 text-center text-sm tabular-nums">{line.qty}</span>
            <button
              type="button"
              className="grid h-11 w-11 place-items-center"
              aria-label="Aumentar"
              onClick={() => setQty(line.slug, line.size, line.color, line.qty + 1)}
            >
              <Plus className="size-4" />
            </button>
          </div>
          <button
            type="button"
            className="text-sm text-mist underline"
            onClick={() => remove(line.slug, line.size, line.color)}
          >
            Remover
          </button>
        </div>
      </div>
      <p className="text-sm font-semibold tabular-nums">{money(product.price * line.qty)}</p>
    </li>
  );
}

function Footer() {
  return (
    <footer className="bg-ink text-foam">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-display text-3xl">MM Moda Fitness</p>
          <p className="mt-3 max-w-sm text-foam/80">
            Pré-treino não se toma, se veste. Peças de poliamida e canelado para treinar e seguir o dia.
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold tracking-widest uppercase text-teal">Loja</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link to="/loja">Catálogo</Link></li>
            <li><Link to="/favoritos">Favoritos</Link></li>
            <li><Link to="/carrinho">Sacola</Link></li>
            <li><Link to="/sobre">A marca</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold tracking-widest uppercase text-teal">Ajuda</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link to="/ajuda">Frete, troca e medidas</Link></li>
            <li><Link to="/contato">Falar com a vendedora</Link></li>
            <li><a href={waLink("Olá! Preciso de ajuda com um pedido.")}>{WHATSAPP_PRETTY}</a></li>
          </ul>
        </div>
      </div>
      <p className="border-t border-foam/15 px-4 py-4 text-center text-xs text-foam/60">
        © {new Date().getFullYear()} MM Moda Fitness · Envio para todo o Brasil
      </p>
    </footer>
  );
}
