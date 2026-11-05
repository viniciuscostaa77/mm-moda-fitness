export const categories = [
  { id: "conjuntos", label: "Conjuntos" },
  { id: "leggings", label: "Leggings" },
  { id: "shorts", label: "Shorts" },
  { id: "saias", label: "Saias" },
  { id: "macaquitos", label: "Macaquitos" },
] as const;

export type CategoryId = (typeof categories)[number]["id"];

export type Colorway = { id: string; name: string; hex: string };

export type Product = {
  slug: string;
  name: string;
  line: string;
  price: number;
  category: CategoryId;
  sizes: string[];
  colors: Colorway[];
  features: string[];
  fabric: string;
  images: string[];
  blurb: string;
  badge?: string;
};

export const products: Product[] = [
  {
    slug: "conjunto-short-duplo-importado",
    name: "Conjunto Short Duplo Importado",
    line: "Duplo importado",
    price: 13999,
    category: "conjuntos",
    sizes: ["P", "M", "G"],
    colors: [
      { id: "chocolate", name: "Chocolate", hex: "#5c4033" },
      { id: "off", name: "Off-white", hex: "#f3efe6" },
    ],
    features: ["01 bolso interno", "Cós alto", "Bojo removível", "Top de alta sustentação"],
    fabric: "Poliamida importada com short duplo",
    images: ["/looks/duplo.jpg"],
    blurb:
      "Top de alta sustentação e short duplo com cós alto. O bolso interno segura a chave do treino sem marcar o tecido.",
    badge: "Queridinho",
  },
  {
    slug: "conjunto-bicolor",
    name: "Conjunto Bicolor",
    line: "Poliamida",
    price: 11999,
    category: "conjuntos",
    sizes: ["Único"],
    colors: [
      { id: "rosa", name: "Rosa", hex: "#e7b2a8" },
      { id: "marinho", name: "Marinho", hex: "#1c2430" },
      { id: "pink", name: "Pink", hex: "#e23d8a" },
    ],
    features: ["Alta compressão", "Bojo removível", "Zero transparência", "Vivo contrastante"],
    fabric: "Poliamida de alta compressão",
    images: ["/looks/bicolor.jpg"],
    blurb:
      "Top e short com vivo claro na borda. Compressão firme, zero transparência e bojo que sai na hora de lavar.",
  },
  {
    slug: "conjunto-calca-lista",
    name: "Conjunto Calça Lista",
    line: "Canelado premium",
    price: 13599,
    category: "leggings",
    sizes: ["M", "G"],
    colors: [{ id: "azul", name: "Azul royal", hex: "#2f5fe0" }],
    features: ["Canelado premium", "Alça regulável", "Alta compressão", "Bojo removível"],
    fabric: "Canelado premium",
    images: ["/looks/lista.jpg", "/looks/lista-2.jpg"],
    blurb:
      "Calça canelada com recorte em vivo e top de alça regulável. A compressão segura sem apertar a cintura.",
    badge: "Novo",
  },
  {
    slug: "conjunto-short-tactel",
    name: "Conjunto Short Duplo Tactel",
    line: "Poliamida e tactel",
    price: 12499,
    category: "conjuntos",
    sizes: ["M", "G"],
    colors: [{ id: "lilas", name: "Lilás e preto", hex: "#7a4cc4" }],
    features: ["Top de alta sustentação", "02 bolsos", "Bojo removível", "Short duplo"],
    fabric: "Poliamida com sobreposição em tactel",
    images: ["/looks/tactel.jpg"],
    blurb:
      "O short de fora é tactel leve, o de dentro é a poliamida que comprime. Dois bolsos e top que segura o treino pesado.",
  },
  {
    slug: "conjunto-manga-longa",
    name: "Conjunto Short Manga Longa",
    line: "Microcanelado",
    price: 12999,
    category: "conjuntos",
    sizes: ["Único"],
    colors: [
      { id: "pink", name: "Pink", hex: "#e21878" },
      { id: "marrom", name: "Marrom", hex: "#8a6a52" },
      { id: "marinho", name: "Marinho", hex: "#24345a" },
      { id: "rose", name: "Rosê", hex: "#c4898c" },
    ],
    features: ["Microcanelado", "Bolsos laterais", "Cós alto", "Zero transparência", "Costa aberta"],
    fabric: "Microcanelado de alta compressão",
    images: ["/looks/manga.jpg"],
    blurb:
      "Manga longa com costa aberta, short de cós alto e bolso lateral. Serve o treino e a rua no mesmo conjunto.",
  },
  {
    slug: "conjunto-canelado-importado",
    name: "Conjunto Canelado Importado",
    line: "Alça regulável",
    price: 11990,
    category: "conjuntos",
    sizes: ["P", "M", "G", "GG"],
    colors: [
      { id: "azul", name: "Azul", hex: "#3c74d6" },
      { id: "preto", name: "Preto", hex: "#1a1a1a" },
    ],
    features: ["Canelado", "Alça regulável", "Cós alto", "Alta compressão"],
    fabric: "Canelado importado",
    images: ["/looks/canelado.jpg", "/looks/canelado-2.jpg"],
    blurb:
      "O canelado com vivo branco e alça que regula no ombro. Do P ao GG, sem abrir no agachamento.",
    badge: "P ao GG",
  },
  {
    slug: "conjunto-short-letras",
    name: "Conjunto Short Letras",
    line: "Alça larga",
    price: 10999,
    category: "conjuntos",
    sizes: ["G", "GG"],
    colors: [
      { id: "rose", name: "Rosê", hex: "#b07c82" },
      { id: "grafite", name: "Grafite", hex: "#3e4248" },
    ],
    features: ["Poliamida", "Top de alça larga", "Cós alto", "Bojo removível", "Zero transparência"],
    fabric: "Poliamida jacquard",
    images: ["/looks/letras.jpg"],
    blurb:
      "Jacquard de letras em tom sobre tom, alça larga e cós alto. Modelagem pensada para G e GG.",
  },
  {
    slug: "conjunto-legging-glow",
    name: "Conjunto Legging Glow",
    line: "Microcanelado",
    price: 12999,
    category: "leggings",
    sizes: ["36", "38", "40", "42"],
    colors: [
      { id: "verde", name: "Verde", hex: "#6f8f45" },
      { id: "lilas", name: "Lilás", hex: "#c5b4de" },
      { id: "off", name: "Off-white", hex: "#f4f1ea" },
    ],
    features: ["Microcanelado", "Top de alta sustentação", "Alça larga", "Bojo removível", "Zero transparência"],
    fabric: "Microcanelado com brilho suave",
    images: ["/looks/glow.jpg", "/looks/glow-2.jpg"],
    blurb:
      "Legging e top de alça larga com brilho discreto. Alta sustentação e tecido que não marca.",
  },
  {
    slug: "conjunto-legging-luiza",
    name: "Conjunto Legging Luiza",
    line: "Microcanelado",
    price: 12999,
    category: "leggings",
    sizes: ["M", "G", "GG"],
    colors: [
      { id: "bebe", name: "Azul bebê", hex: "#b7d3ea" },
      { id: "vinho", name: "Vinho", hex: "#6e3144" },
    ],
    features: ["Microcanelado", "Top de alta sustentação", "Alça larga", "Bojo removível", "Zero transparência"],
    fabric: "Microcanelado",
    images: ["/looks/luiza.jpg", "/looks/luiza-2.jpg"],
    blurb:
      "Decote quadrado, alça larga e legging que acompanha o corpo sem ficar transparente no agachamento.",
  },
  {
    slug: "conjunto-short-corredora",
    name: "Conjunto Short Corredora",
    line: "Poliamida 320",
    price: 12999,
    category: "conjuntos",
    sizes: ["M", "G"],
    colors: [
      { id: "areia", name: "Areia", hex: "#d8d2c6" },
      { id: "preto", name: "Preto", hex: "#1a1a1a" },
    ],
    features: ["Poliamida 320", "Cós alto", "02 bolsos", "Top com costa aberta", "Bojo removível"],
    fabric: "Poliamida 320",
    images: ["/looks/corredora.jpg"],
    blurb:
      "Short de corrida com dois bolsos e top de costa vazada. Compressão alta, caimento limpo.",
    badge: "Corrida",
  },
  {
    slug: "conjunto-short-saia-elite",
    name: "Conjunto Short-Saia Elite",
    line: "Poliamida 320",
    price: 12999,
    category: "saias",
    sizes: ["M", "G"],
    colors: [{ id: "off", name: "Off-white", hex: "#f6f3ee" }],
    features: ["Poliamida 320", "Cós alto", "Bojo removível", "Zero transparência", "Fenda frontal"],
    fabric: "Poliamida 320",
    images: ["/looks/elite.jpg"],
    blurb:
      "A saia que é short por baixo. Alça cruzada, fenda curta e o mesmo tecido que não marca.",
    badge: "Elite",
  },
  {
    slug: "conjunto-short-letras-320",
    name: "Conjunto Short Letras 320",
    line: "Poliamida 320",
    price: 10999,
    category: "conjuntos",
    sizes: ["M", "G"],
    colors: [{ id: "taupe", name: "Taupe", hex: "#b5a89a" }],
    features: ["Poliamida 320", "Cós alto", "Bojo removível", "Zero transparência"],
    fabric: "Poliamida 320 jacquard",
    images: ["/looks/letras320.jpg"],
    blurb:
      "Letras em tom sobre tom no taupe. Short de cós alto e top de alça fina, zero transparência.",
  },
  {
    slug: "conjunto-calca-gola-alta",
    name: "Conjunto Calça Gola Alta",
    line: "Poliamida premium",
    price: 14499,
    category: "leggings",
    sizes: ["M", "G"],
    colors: [{ id: "off", name: "Off-white", hex: "#f4f0e8" }],
    features: ["Poliamida premium", "02 bolsos", "Cós alto", "Bojo removível", "Zero transparência", "Gola alta"],
    fabric: "Poliamida premium",
    images: ["/looks/gola.jpg"],
    blurb:
      "Gola alta, dois bolsos na calça e um caimento que funciona dentro e fora da academia.",
    badge: "Mais pedido",
  },
  {
    slug: "macaquito-poliamida",
    name: "Macaquito Poliamida",
    line: "Poliamida premium",
    price: 12499,
    category: "macaquitos",
    sizes: ["M", "G"],
    colors: [{ id: "lilas", name: "Lilás", hex: "#8d7cf6" }],
    features: ["Poliamida 320", "Alta compressão", "Zero transparência", "Modelagem que valoriza"],
    fabric: "Poliamida 320",
    images: ["/looks/macaquito.jpg", "/looks/macaquito-2.jpg"],
    blurb:
      "Uma peça só, do treino ao compromisso. Compressão alta e alça fina, sem transparência.",
  },
  {
    slug: "short-com-bolso",
    name: "Short com Bolso",
    line: "Alta compressão",
    price: 4999,
    category: "shorts",
    sizes: ["G", "GG"],
    colors: [
      { id: "turquesa", name: "Turquesa", hex: "#2bbbb8" },
      { id: "cinza", name: "Cinza", hex: "#b9b9b9" },
      { id: "preto", name: "Preto", hex: "#222222" },
      { id: "roxo", name: "Roxo", hex: "#5c3d78" },
    ],
    features: ["Bolso lateral", "Poliamida", "Zero transparência", "Alta compressão"],
    fabric: "Poliamida",
    images: ["/looks/short-bolso.jpg"],
    blurb: "O short avulso de bolso lateral. Compressão alta para usar com o top que você já tem.",
  },
  {
    slug: "short-duplo-importado",
    name: "Short Duplo Importado",
    line: "Bolso interno",
    price: 8999,
    category: "shorts",
    sizes: ["P", "M", "G"],
    colors: [
      { id: "marrom", name: "Marrom", hex: "#8d5646" },
      { id: "chumbo", name: "Chumbo", hex: "#8d9096" },
      { id: "preto", name: "Preto", hex: "#222222" },
      { id: "areia", name: "Areia", hex: "#e6d7c4" },
    ],
    features: ["Short duplo", "Bolso interno", "Cós com elástico", "Detalhe vazado"],
    fabric: "Tecido importado com forro",
    images: ["/looks/short-duplo.jpg"],
    blurb:
      "Camada de fora leve, forro por dentro e bolso interno. O short que fecha o conjunto sem comprar o top de novo.",
  },
];

export const letterSizes = ["P", "M", "G", "GG", "Único", "36", "38", "40", "42"];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function categoryLabel(id: string) {
  return categories.find((c) => c.id === id)?.label ?? id;
}

function fold(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function filterProducts(opts: {
  cat?: string;
  q?: string;
  tam?: string;
  ordem?: string;
}) {
  let list = products.slice();
  if (opts.cat && categories.some((c) => c.id === opts.cat)) {
    list = list.filter((p) => p.category === opts.cat);
  }
  if (opts.tam) list = list.filter((p) => p.sizes.includes(opts.tam as string));
  if (opts.q?.trim()) {
    const q = fold(opts.q.trim());
    list = list.filter((p) =>
      fold([p.name, p.line, p.fabric, p.category, ...p.features, ...p.colors.map((c) => c.name)].join(" ")).includes(q),
    );
  }
  if (opts.ordem === "menor") list.sort((a, b) => a.price - b.price);
  if (opts.ordem === "maior") list.sort((a, b) => b.price - a.price);
  return list;
}

export function relatedTo(slug: string) {
  const current = getProduct(slug);
  if (!current) return products.slice(0, 4);
  const same = products.filter((p) => p.slug !== slug && p.category === current.category);
  const rest = products.filter((p) => p.slug !== slug && p.category !== current.category);
  return [...same, ...rest].slice(0, 4);
}
