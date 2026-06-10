# Assinaturas de Motion "UAU" — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implementar os três efeitos aprovados na spec `docs/superpowers/specs/2026-06-09-wow-signature-motion-design.md`: vagalumes na seção Licitações, chegada cinematográfica no hero e rio dourado experimental no scroll.

**Architecture:** Tudo CSS-first com tokens/keyframes em `app/globals.css`; dois componentes novos (`Fireflies` servidor, `GoldenRiver` cliente) e edições pontuais em `Hero.tsx`, `Licitacoes.tsx`, `layout.tsx`, `page.tsx`. Keyframes usam as propriedades `translate`/`scale` (nunca `transform`) — convenção do projeto para `fill-mode: both` não congelar transforms e matar hovers. Estados base são sempre visíveis; ocultação/animação só dentro de `@media (prefers-reduced-motion: no-preference)`.

**Tech Stack:** Next.js 16 (App Router, output export), Tailwind v4 (`@theme` em globals.css), TypeScript, zero libs de animação.

**Verificação:** projeto sem suíte de testes — cada task verifica com `npx tsc --noEmit && npx eslint .`, `npm run build` e greps no `out/`. Validação visual no dev server (assumir já rodando em http://localhost:3000; senão `npm run dev`).

---

### Task 1: Tokens e keyframes em globals.css

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Adicionar token de easing no bloco `@theme`**

Localizar no `@theme` a linha `--ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);` e adicionar logo abaixo:

```css
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
```

- [ ] **Step 2: Adicionar keyframes e classes dos três efeitos no `@layer utilities`**

No `@layer utilities`, logo após o bloco existente `@media (prefers-reduced-motion: no-preference) { ... }` (o que contém `.rise` e `.reveal-ready`), adicionar:

```css
  /* ===== Vagalumes (seção Licitações) ===== */
  @keyframes firefly-drift {
    0%,
    100% {
      translate: 0 0;
    }
    25% {
      translate: 26px -20px;
    }
    50% {
      translate: -12px -34px;
    }
    75% {
      translate: -30px 12px;
    }
  }

  @keyframes firefly-glow {
    0%,
    100% {
      opacity: 0.1;
    }
    50% {
      opacity: 1;
    }
  }

  /* Estado base (reduced-motion / fallback): constelação estática */
  .firefly {
    opacity: 0.35;
  }

  /* ===== Chegada cinematográfica (hero) ===== */
  @keyframes cine-rise {
    from {
      opacity: 0;
      translate: 0 26px;
      filter: blur(4px);
    }
    to {
      opacity: 1;
      translate: 0 0;
      filter: blur(0);
    }
  }

  @keyframes cine-sweep {
    from {
      scale: 0 1;
    }
    to {
      scale: 1 1;
    }
  }

  .cine-underline {
    position: relative;
    display: inline-block;
  }

  .cine-underline::after {
    content: "";
    position: absolute;
    left: 0.04em;
    right: 0.1em;
    bottom: -0.05em;
    height: 0.045em;
    background: var(--color-gold-500);
    transform-origin: left center;
  }

  @media (prefers-reduced-motion: no-preference) {
    .firefly {
      animation:
        firefly-drift var(--ff-dur, 12s) ease-in-out var(--ff-delay, 0s)
          infinite,
        firefly-glow var(--ff-glow, 3s) ease-in-out var(--ff-delay, 0s)
          infinite;
    }

    .cine-word {
      animation: cine-rise 0.7s var(--ease-out-expo) both;
      animation-delay: var(--cine-delay, 0ms);
    }

    .cine-underline::after {
      animation: cine-sweep 0.5s var(--ease-out-expo) both;
      animation-delay: var(--cine-sweep-delay, 900ms);
    }
  }
```

- [ ] **Step 3: Verificar build**

Run: `npx tsc --noEmit && npx eslint . && npm run build 2>&1 | grep -E "error|✓ Compiled" | head -3`
Expected: `lint`/`tsc` silenciosos e `✓ Compiled successfully`.

- [ ] **Step 4: Commit**

```bash
git add app/globals.css
git commit -m "feat: tokens e keyframes dos efeitos firefly e cinematic"
```

---

### Task 2: Componente Fireflies + integração na seção Licitações

**Files:**
- Create: `components/Fireflies.tsx`
- Modify: `components/Licitacoes.tsx` (logo após o div de overlay com radial-gradient)

- [ ] **Step 1: Criar `components/Fireflies.tsx`**

Componente servidor. Posições concentradas nas bordas e na metade direita (a coluna de texto fica à esquerda em lg). 14 vagalumes; 6 escondidos no mobile.

```tsx
type Firefly = {
  left: string;
  top: string;
  size: number;
  dur: number;
  glow: number;
  delay: number;
  mobileHidden?: boolean;
};

const FIREFLIES: Firefly[] = [
  { left: "3%", top: "14%", size: 4, dur: 12, glow: 3.1, delay: -2 },
  { left: "7%", top: "78%", size: 3, dur: 14, glow: 2.6, delay: -7 },
  { left: "16%", top: "8%", size: 3, dur: 11, glow: 3.6, delay: -4, mobileHidden: true },
  { left: "30%", top: "88%", size: 4, dur: 13, glow: 2.9, delay: -9, mobileHidden: true },
  { left: "44%", top: "6%", size: 3, dur: 15, glow: 3.3, delay: -1, mobileHidden: true },
  { left: "52%", top: "82%", size: 4, dur: 10, glow: 2.4, delay: -6 },
  { left: "60%", top: "30%", size: 4, dur: 12, glow: 3.8, delay: -3 },
  { left: "66%", top: "64%", size: 3, dur: 16, glow: 2.7, delay: -11, mobileHidden: true },
  { left: "73%", top: "12%", size: 5, dur: 13, glow: 3.0, delay: -5 },
  { left: "79%", top: "46%", size: 3, dur: 11, glow: 2.5, delay: -8, mobileHidden: true },
  { left: "85%", top: "76%", size: 4, dur: 14, glow: 3.4, delay: -2.5 },
  { left: "90%", top: "22%", size: 3, dur: 12, glow: 2.8, delay: -10, mobileHidden: true },
  { left: "94%", top: "58%", size: 4, dur: 15, glow: 3.2, delay: -6.5 },
  { left: "97%", top: "85%", size: 3, dur: 10, glow: 2.6, delay: -1.5 },
];

export function Fireflies() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {FIREFLIES.map((f, i) => (
        <span
          key={i}
          className={`firefly absolute rounded-full bg-gold-300 shadow-[0_0_8px_2px_rgba(216,185,107,0.55)] ${
            f.mobileHidden ? "hidden md:block" : ""
          }`}
          style={
            {
              left: f.left,
              top: f.top,
              width: `${f.size}px`,
              height: `${f.size}px`,
              "--ff-dur": `${f.dur}s`,
              "--ff-glow": `${f.glow}s`,
              "--ff-delay": `${f.delay}s`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Integrar em `components/Licitacoes.tsx`**

Adicionar o import no topo:

```tsx
import { Fireflies } from "./Fireflies";
```

E renderizar logo APÓS o `<div aria-hidden ... />` do overlay de radial-gradient (antes de `<div className="container-tight relative">`):

```tsx
      <Fireflies />
```

- [ ] **Step 3: Verificar build e presença no HTML**

Run: `npx tsc --noEmit && npx eslint . && npm run build > /dev/null 2>&1 && grep -c "firefly" out/index.html`
Expected: número ≥ 14.

- [ ] **Step 4: Checagem visual (dev server)**

Abrir http://localhost:3000#licitacoes: vagalumes derivando e piscando nas bordas da seção escura, nenhum sobre o texto em ~1440px.

- [ ] **Step 5: Commit**

```bash
git add components/Fireflies.tsx components/Licitacoes.tsx
git commit -m "feat: vagalumes dourados na seção de licitações"
```

---

### Task 3: Chegada cinematográfica no hero

**Files:**
- Modify: `app/layout.tsx` (Fraunces com itálico real)
- Modify: `components/Hero.tsx` (h1 em palavras + cadência)

- [ ] **Step 1: Carregar o itálico verdadeiro do Fraunces**

Em `app/layout.tsx`, no config do Fraunces, adicionar `style`:

```tsx
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT"],
});
```

(Sem isso o `italic` do h1 seria sintetizado pelo browser — itálico falso fica feio em serif.)

- [ ] **Step 2: Reescrever o h1 do Hero em palavras**

Em `components/Hero.tsx`, adicionar `Fragment` ao import de react:

```tsx
import { Fragment, useState, type FormEvent } from "react";
```

Substituir o `<h1 className="rise mt-8 ..." style={...}>Como podemos te ajudar?</h1>` inteiro por:

```tsx
        <h1 className="mt-8 max-w-3xl text-balance text-4xl leading-[1.1] tracking-tight text-ink sm:text-5xl md:text-6xl">
          {["Como", "podemos", "te"].map((word, i) => (
            <Fragment key={word}>
              <span
                className="cine-word inline-block"
                style={
                  { "--cine-delay": `${200 + i * 120}ms` } as React.CSSProperties
                }
              >
                {word}
              </span>{" "}
            </Fragment>
          ))}
          <span
            className="cine-word cine-underline inline-block italic text-gold-700"
            style={
              {
                "--cine-delay": "560ms",
                "--cine-sweep-delay": "1300ms",
              } as React.CSSProperties
            }
          >
            ajudar?
          </span>
        </h1>
```

Notas: spans `inline-block` com espaço textual entre eles preservam a quebra de linha natural e o `text-balance`; o texto completo "Como podemos te ajudar?" continua íntegro no HTML.

- [ ] **Step 3: Re-escalonar a cadência do restante do hero**

No mesmo arquivo, atualizar os delays das classes `rise` existentes (logo permanece sem delay):

- `<p>` do subtítulo: `"--rise-delay": "180ms"` → `"--rise-delay": "750ms"`
- `<form>`: `"--rise-delay": "270ms"` → `"--rise-delay": "850ms"`
- `<div>` dos chips: `"--rise-delay": "360ms"` → `"--rise-delay": "950ms"`

- [ ] **Step 4: Verificar build e integridade do texto**

Run: `npx tsc --noEmit && npx eslint . && npm run build > /dev/null 2>&1 && node -e "const h=require('fs').readFileSync('out/index.html','utf8').replace(/<[^>]+>/g,''); console.log(h.includes('Como podemos te ajudar?') ? 'h1 OK' : 'h1 QUEBRADO')"`
Expected: `h1 OK`.

- [ ] **Step 5: Checagem visual (dev server)**

Recarregar http://localhost:3000: palavras entram em sequência saindo de blur, "ajudar?" em itálico dourado, traço varre embaixo dele ~1.3s, depois parágrafo/form/chips. Verificar quebra de linha do título em 375px.

- [ ] **Step 6: Commit**

```bash
git add app/layout.tsx components/Hero.tsx
git commit -m "feat: chegada cinematográfica no hero com palavra-assinatura dourada"
```

---

### Task 4: GoldenRiver experimental

**Files:**
- Create: `components/GoldenRiver.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Criar `components/GoldenRiver.tsx`**

```tsx
"use client";

import { useEffect, useRef } from "react";

/**
 * Rio dourado experimental: traço que se desenha conforme o scroll,
 * fixo na margem esquerda em telas xl+. O traço passa por baixo das
 * faixas com fundo sólido (Services/About/Licitações) — como um rio
 * sob pontes — e reaparece nas seções abertas.
 * Remoção: deletar este arquivo + a linha no page.tsx.
 */
export function GoldenRiver() {
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length}`;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      path.style.strokeDashoffset = "0";
      return;
    }

    let raf = 0;
    const update = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(window.scrollY / max, 1) : 1;
      path.style.strokeDashoffset = `${length * (1 - progress)}`;
      raf = 0;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <svg
      aria-hidden
      className="pointer-events-none fixed left-6 top-0 hidden h-screen w-16 xl:block"
      viewBox="0 0 64 800"
      preserveAspectRatio="none"
      fill="none"
    >
      <path
        ref={pathRef}
        d="M 32 0 C 10 90, 54 150, 30 240 S 8 380, 34 470 S 56 610, 28 700 S 22 770, 32 800"
        stroke="var(--color-gold-500)"
        strokeOpacity="0.4"
        strokeWidth="2"
        strokeLinecap="round"
        style={{ strokeDasharray: 9999, strokeDashoffset: 9999 }}
      />
      <g fill="var(--color-forest-300)" fillOpacity="0.5">
        <circle cx="30" cy="160" r="3.5" />
        <circle cx="32" cy="330" r="3.5" />
        <circle cx="33" cy="500" r="3.5" />
        <circle cx="29" cy="670" r="3.5" />
      </g>
    </svg>
  );
}
```

Nota: `strokeDasharray/Offset: 9999` inline mantêm o traço invisível antes da hidratação (e sem JS, nada aparece — decorativo puro). O JS recalcula com o comprimento real.

- [ ] **Step 2: Renderizar em `app/page.tsx`**

Adicionar import:

```tsx
import { GoldenRiver } from "@/components/GoldenRiver";
```

E renderizar como primeiro filho do fragment, antes de `<ScrollReveal />`:

```tsx
      <GoldenRiver />
```

(Primeiro no DOM = pinta atrás de tudo que vem depois; não precisa de z-index.)

- [ ] **Step 3: Verificar build**

Run: `npx tsc --noEmit && npx eslint . && npm run build 2>&1 | grep -E "error|✓ Compiled" | head -3`
Expected: `✓ Compiled successfully`, sem erros.

- [ ] **Step 4: Checagem visual (dev server)**

Em janela ≥1280px: rolar a página e ver o traço dourado se desenhando na margem esquerda, sumindo sob as faixas sólidas e reaparecendo; sem scroll horizontal. Em <1280px: invisível.

- [ ] **Step 5: Commit**

```bash
git add components/GoldenRiver.tsx app/page.tsx
git commit -m "feat: rio dourado experimental desenhado pelo scroll (xl+)"
```

---

### Task 5: Passe de aceite da spec

**Files:** nenhum (verificação)

- [ ] **Step 1: Critérios automatizáveis**

Run:
```bash
npx tsc --noEmit && npx eslint . && npm run build > /dev/null 2>&1 \
  && node -e "const h=require('fs').readFileSync('out/index.html','utf8').replace(/<[^>]+>/g,''); console.log(h.includes('Como podemos te ajudar?') ? 'CA3 OK' : 'CA3 FALHOU')" \
  && grep -c "firefly" out/index.html
```
Expected: `CA3 OK` e contagem ≥ 14 (CA1, CA3).

- [ ] **Step 2: Reduced-motion (manual)**

DevTools → Rendering → Emulate `prefers-reduced-motion: reduce` → recarregar: hero estático (itálico dourado e traço visíveis, sem blur/movimento), vagalumes parados a ~35% de opacidade, rio completo estático (CA2).

- [ ] **Step 3: Viewports (manual)**

1440/1280/768/375px: vagalumes fora do texto (CA4), rio só em xl sem scroll horizontal (CA5), título quebra linha sem overflow.

- [ ] **Step 4: Atualizar README (estrutura)**

Em `README.md`, no bloco de estrutura, adicionar após a linha do `ScrollReveal.tsx`:

```
  Fireflies.tsx       # vagalumes da seção licitações
  GoldenRiver.tsx     # rio dourado no scroll (experimental, xl+)
```

- [ ] **Step 5: Commit final**

```bash
git add README.md
git commit -m "docs: estrutura atualizada com Fireflies e GoldenRiver"
```
