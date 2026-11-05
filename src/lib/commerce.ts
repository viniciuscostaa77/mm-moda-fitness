export const WHATSAPP = "5581989698299";
export const WHATSAPP_PRETTY = "(81) 98969-8299";
export const INSTAGRAM = "https://www.instagram.com/mmmodafitnes__/";
export const FREE_FROM = 24900;

export function money(cents: number) {
  return (cents / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function waLink(text: string) {
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;
}

export function freight(method: "pac" | "sedex", subtotal: number) {
  if (method === "pac" && subtotal >= FREE_FROM) return 0;
  return method === "pac" ? 2290 : 3990;
}

export function quote(opts: {
  subtotal: number;
  coupon: string;
  pay: "pix" | "cartao" | "whatsapp";
  ship: "pac" | "sedex";
}) {
  const code = opts.coupon.trim().toUpperCase();
  const known = code === "" || code === "MM10";
  const couponOff = code === "MM10" ? Math.round(opts.subtotal * 0.1) : 0;
  const after = opts.subtotal - couponOff;
  const pixOff = opts.pay === "pix" ? Math.round(after * 0.05) : 0;
  const ship = freight(opts.ship, opts.subtotal);
  return {
    known,
    code,
    couponOff,
    pixOff,
    ship,
    total: Math.max(0, after - pixOff) + ship,
  };
}
