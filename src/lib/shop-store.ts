import { useEffect } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartLine = {
  slug: string;
  size: string;
  color: string;
  qty: number;
};

export type Order = {
  id: string;
  createdAt: string;
  lines: CartLine[];
  name: string;
  phone: string;
  email: string;
  cep: string;
  address: string;
  city: string;
  uf: string;
  ship: "pac" | "sedex";
  pay: "pix" | "cartao" | "whatsapp";
  coupon: string;
  subtotal: number;
  discount: number;
  pixOff: number;
  freight: number;
  total: number;
};

type State = {
  cart: CartLine[];
  wish: string[];
  orders: Order[];
  drawer: boolean;
  searchOpen: boolean;
  menuOpen: boolean;
  hydrated: boolean;
  setHydrated: (value: boolean) => void;
  setDrawer: (value: boolean) => void;
  setSearchOpen: (value: boolean) => void;
  setMenuOpen: (value: boolean) => void;
  add: (line: Omit<CartLine, "qty">, qty?: number) => void;
  setQty: (slug: string, size: string, color: string, qty: number) => void;
  remove: (slug: string, size: string, color: string) => void;
  toggleWish: (slug: string) => void;
  clear: () => void;
  placeOrder: (order: Order) => void;
};

const lineKey = (line: { slug: string; size: string; color: string }) =>
  `${line.slug}|${line.size}|${line.color}`;

export const useShop = create<State>()(
  persist(
    (set, get) => ({
      cart: [],
      wish: [],
      orders: [],
      drawer: false,
      searchOpen: false,
      menuOpen: false,
      hydrated: false,
      setHydrated: (hydrated) => set({ hydrated }),
      setDrawer: (drawer) => set({ drawer }),
      setSearchOpen: (searchOpen) => set({ searchOpen }),
      setMenuOpen: (menuOpen) => set({ menuOpen }),
      add: (line, qty = 1) => {
        const cart = get().cart.map((item) => ({ ...item }));
        const index = cart.findIndex((item) => lineKey(item) === lineKey(line));
        if (index >= 0) cart[index].qty += qty;
        else cart.push({ ...line, qty });
        set({ cart, drawer: true });
      },
      setQty: (slug, size, color, qty) => {
        set({
          cart: get()
            .cart.map((item) => (lineKey(item) === lineKey({ slug, size, color }) ? { ...item, qty } : item))
            .filter((item) => item.qty > 0),
        });
      },
      remove: (slug, size, color) => {
        set({ cart: get().cart.filter((item) => lineKey(item) !== lineKey({ slug, size, color })) });
      },
      toggleWish: (slug) => {
        const wish = get().wish;
        set({ wish: wish.includes(slug) ? wish.filter((item) => item !== slug) : [...wish, slug] });
      },
      clear: () => set({ cart: [] }),
      placeOrder: (order) => set({ orders: [order, ...get().orders], cart: [], drawer: false }),
    }),
    {
      name: "mm-moda-fitness",
      skipHydration: true,
      partialize: (state) => ({ cart: state.cart, wish: state.wish, orders: state.orders }),
    },
  ),
);

export function useHydrateShop() {
  const setHydrated = useShop((s) => s.setHydrated);
  useEffect(() => {
    void Promise.resolve(useShop.persist.rehydrate()).finally(() => setHydrated(true));
  }, [setHydrated]);
}

export function useCartCount() {
  const hydrated = useShop((s) => s.hydrated);
  const cart = useShop((s) => s.cart);
  if (!hydrated) return 0;
  return cart.reduce((sum, line) => sum + line.qty, 0);
}
