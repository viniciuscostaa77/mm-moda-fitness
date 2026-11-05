# MM Moda Fitness

Loja da MM Moda Fitness. Catálogo, sacola, checkout, favoritos e pedido no WhatsApp.

## Rodar no computador

Precisa do [Node.js 22+](https://nodejs.org).

```bash
npm install
npm run dev
```

Abre em http://localhost:8080

## Onde está cada coisa

| Pasta / arquivo | O que é |
| --- | --- |
| `src/routes` | Páginas: home, loja, produto, sacola, checkout, pedido, favoritos, sobre, ajuda, contato |
| `src/lib/catalog.ts` | Peças, preços, tamanhos, cores e fotos |
| `src/lib/shop-store.ts` | Sacola, favoritos e pedidos (ficam no navegador) |
| `src/lib/commerce.ts` | Frete, cupom MM10, Pix e link do WhatsApp |
| `src/components` | Cabeçalho, menu, busca e sacola |
| `public/looks` | Fotos das peças |

## GitHub

```bash
git init
git add .
git commit -m "Loja MM Moda Fitness"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/mm-moda-fitness.git
git push -u origin main
```

Troque `SEU-USUARIO` pelo seu usuário do GitHub. Crie o repositório vazio antes, sem README.
