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
  layout.tsx          # fontes, metadata (og/twitter images), favicons
  page.tsx            # compõe as seções
  not-found.tsx       # 404 customizada (vira out/404.html no Pages)
  globals.css         # tokens de tema, utilitários, animações (rise/reveal)
components/
  Nav.tsx
  Hero.tsx            # entrada em stagger + input → WhatsApp
  Services.tsx        # chips clicáveis com prefill por serviço
  Cases.tsx           # cases (com backlinks pros clientes)
  Licitacoes.tsx      # seção dedicada de licitação
  About.tsx
  Contact.tsx
  Footer.tsx
  JungleBackdrop.tsx  # folhas SVG em sway lento
  ScrollReveal.tsx    # IntersectionObserver p/ [data-reveal]
  Fireflies.tsx       # vagalumes da seção licitações
lib/
  site.ts             # número do WhatsApp + waLink() (fonte única)
public/
  CNAME               # tribesolutions.com.br
  logo.webp           # símbolo, versão de tela (o que Nav/Hero carregam)
  wordmark.webp       # "TRIBE" com o símbolo no R (Nav)
  lockup.webp         # "TRIBE SOLUTIONS" (Footer)
  brand/              # kit completo: símbolo, wordmark e lockup, on-light e on-dark
  og-banner.png       # preview de link 1200×630 (gerado por scripts/generate-og.mjs)
  favicon_io/
scripts/
  brand-src/          # MESTRES da marca (fonte de verdade) + artes originais
  optimize-logo.mjs   # gera todos os rasters a partir dos mestres
  generate-og.mjs     # gera og-banner.png a partir de public/og-logo.png
  brand-kit.mjs       # empacota o kit pra uso fora do site
```

## A marca

A fonte de verdade são os dois PNGs transparentes em `scripts/brand-src/`
(`symbol.png` e `lockup.png`), recortados das artes originais guardadas em
`scripts/brand-src/original/`. Todo o resto é derivado:

```bash
npm run brand                       # rasters do site (public/)
node scripts/brand-kit.mjs          # kit pra fora do site (~/Downloads/tribe-marca)
```

A arte nasceu para fundo escuro (a massa do tucano e das letras é branca).
`optimize-logo.mjs` deriva a versão **on-light**, que troca essa massa por
verde-floresta e inverte o volume do gradiente — é ela que entra no site, que é
papel. A versão **on-dark** fica em `public/brand/` para quem precisar aplicar a
marca sobre fundo escuro.

Trocar a arte = substituir os dois mestres e rodar os dois comandos. Nenhum
raster deve ser editado à mão.
