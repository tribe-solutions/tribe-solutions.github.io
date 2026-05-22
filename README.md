# tribesolutions.com.br

Site institucional da Tribe Solutions, em Next.js 16 + Tailwind v4, exportado como site estático e publicado via GitHub Pages no domínio [tribesolutions.com.br](https://tribesolutions.com.br).

## Stack

- Next.js 16 (App Router, output `export`)
- Tailwind CSS v4 (sem `tailwind.config`, theme via `@theme` em `app/globals.css`)
- TypeScript
- `lucide-react` para ícones
- `next/font` para Inter (corpo) e Fraunces (display)

## Desenvolvimento

```bash
npm install
npm run dev   # http://localhost:3000
```

## Build estático

```bash
npm run build      # gera ./out
```

O diretório `out/` é o artefato publicado pelo GitHub Pages.

## Deploy

Push em `main` dispara o workflow `.github/workflows/deploy.yml`, que faz build e publica em Pages. O domínio custom `tribesolutions.com.br` é definido pelo arquivo `public/CNAME`.

Para testar o deploy manualmente: aba **Actions → Deploy to GitHub Pages → Run workflow**.

## Estrutura

```
app/
  layout.tsx          # fontes, metadata, favicons
  page.tsx            # compõe as seções
  globals.css         # tokens de tema e utilitários
components/
  Nav.tsx
  Hero.tsx
  TrustBar.tsx
  Services.tsx
  Cases.tsx           # cases (com backlinks pros clientes)
  Licitacoes.tsx      # seção dedicada de licitação
  About.tsx
  Contact.tsx
  Footer.tsx
public/
  CNAME               # tribesolutions.com.br
  logo*.png/webp      # variantes do logo (geradas por scripts/optimize-logo.mjs)
  favicon_io/
scripts/
  optimize-logo.mjs   # gera logo otimizado a partir de fonte 2000×2000
```

## Otimizando o logo

Se substituir o logo original, coloque o PNG 2000×2000 (alpha) em `public/logo-original.png` e rode:

```bash
node scripts/optimize-logo.mjs
```

(em seguida apague `logo-original.png` antes de commitar)
