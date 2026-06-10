# Spec — Assinaturas de motion "UAU" (vagalumes, chegada cinematográfica, rio dourado)

**Data:** 2026-06-09
**Status:** aprovada pelo dono (Ralph) após demos visuais no brainstorm companion
**Contexto:** após os 5 lotes de refinamento (conversão, harden, clarify, animate, polish), o dono quer momentos mais memoráveis. Demos de 4 direções foram apresentadas; escolhidas A (vagalumes), C (cinematográfica) e D (rio dourado, condicionada a avaliação no site real).

## Objetivo

Adicionar três assinaturas visuais à landing (tribesolutions.com.br) que gerem reação "UAU" sem quebrar a identidade (amazônica, editorial, profissional) nem os constraints técnicos (Next.js 16 export estático, zero libs de animação, `prefers-reduced-motion` respeitado).

## Efeito A — Vagalumes na mata

**Onde:** seção `Licitacoes` (`components/Licitacoes.tsx`), fundo `forest-900`.

- Novo componente servidor `components/Fireflies.tsx`: camada `aria-hidden` + `pointer-events-none`, posição `absolute inset-0`, renderizada entre o overlay de gradiente existente e o conteúdo.
- ~14 `<span>` dourados (`--color-gold-300`), 3-5px, `border-radius: 50%`, glow via `box-shadow: 0 0 8px 2px` em dourado translúcido.
- Duas animações compostas por vagalume (CSS, definidas em `globals.css`):
  - `firefly-drift`: caminho orgânico em translate (4 waypoints), 10-16s, `ease-in-out`, infinito; variação por vagalume via `--ff-dur`/`--ff-delay` inline.
  - `firefly-glow`: opacidade 0.1 → 1 → 0.1, 2.5-4s, dessincronizada.
- Posições fixas (estilo inline por item) concentradas nas bordas e no espaço negativo da seção; nenhuma sobre a coluna de texto em desktop.
- Mobile: ~metade dos vagalumes ocultos (`hidden md:block` nos excedentes).
- Reduced-motion: animações não se aplicam (bloco sob `prefers-reduced-motion: no-preference`); os pontos permanecem estáticos com `opacity` baixa fixa (~0.35) — a "constelação" fica, o movimento sai.
- Sem JS.

## Efeito C — Chegada cinematográfica

**Onde:** `components/Hero.tsx` (h1 e cadência de entrada).

- O `<h1>` "Como podemos te ajudar?" é dividido em palavras: `<span class="cine-word">` por palavra, espaços preservados; conteúdo textual idêntico (SEO/leitores de tela inalterados).
- Keyframes `cine-rise` (em `globals.css`): `opacity 0→1`, `translate 0 26px → 0 0`, `filter: blur(4px) → blur(0)`, 700ms, `--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1)` (novo token no `@theme`), `fill-mode: both`; delay incremental de 120ms por palavra (var `--cine-delay` inline).
- A palavra final **"ajudar?"** recebe `font-style: italic` e cor `gold-700` (`#8a6c24`, contraste 4,57:1 sobre `#f8f6f0` — AA ok; texto grande exige só 3:1) — vira a palavra-assinatura.
- Traço dourado sob "ajudar?": pseudo-elemento ou `<span>` decorativo, 2px, `gold-500`, animação `cine-sweep` (scaleX 0→1, transform-origin left, 500ms, ease-out-expo) iniciando ~150ms após a última palavra aterrissar.
- Cadência do restante do hero (classes `rise` existentes) re-escalonada: logo 0ms → título 200-600ms (palavras) → parágrafo ~750ms → form ~850ms → chips ~950ms.
- Reduced-motion: já coberto pelo gate `no-preference` existente — sem blur, sem movimento, itálico dourado e traço permanecem estáticos.
- Sem JS.
- O keyframe usa a propriedade `translate` (não `transform`), seguindo a convenção do projeto para não congelar transforms via fill-mode.

## Efeito D — Rio dourado (EXPERIMENTAL)

**Onde:** página inteira, margem esquerda. **Status experimental:** o dono avalia no site real; remoção = deletar o componente + 1 linha do `page.tsx`.

- Novo client component `components/GoldenRiver.tsx` (~35 linhas):
  - SVG `position: fixed`, coluna esquerda (~`left: 2.5rem`), altura da viewport, `z-index` atrás do conteúdo, `aria-hidden`, `pointer-events-none`.
  - Path orgânico vertical (curvas suaves tipo meandro de rio), `stroke: gold-500` a ~40% de opacidade, `stroke-width: 2`, fill none.
  - Pequenos nós (círculos 4px, `forest-300`) em frações fixas do path correspondendo às seções.
  - JS: listener de scroll passivo + `requestAnimationFrame` atualiza `stroke-dashoffset` proporcional à fração de scroll do documento (`getTotalLength()` no mount). Sem scroll-jacking — o rio apenas acompanha.
- Exibido apenas em `xl:` (≥1280px); `hidden` abaixo (sem espaço lateral em tablet/mobile).
- Reduced-motion: componente detecta `matchMedia("(prefers-reduced-motion: reduce)")` e renderiza a linha completa estática (dashoffset 0, sem listener).
- Progressive enhancement: sem JS o componente não hidrata e nada aparece (camada decorativa — sem perda).

## Não-objetivos

- Nenhuma mudança de estrutura, conteúdo ou copy.
- Nenhuma lib externa (framer-motion etc.).
- Nada de parallax de cursor (direção B foi descartada pelo dono).
- Sem alteração no peso de página perceptível (orçamento: < 3kb somados).

## Critérios de aceite

1. `npm run build` limpo; lint e tsc sem erros/warnings.
2. Com `prefers-reduced-motion: reduce` emulado: nenhum movimento em A, C ou D; conteúdo 100% visível e legível.
3. Texto do `<h1>` continua íntegro no HTML estático (`out/index.html` contém "Como podemos te ajudar?").
4. Vagalumes não sobrepõem texto em 1440/1280/768px.
5. Rio invisível abaixo de 1280px; em xl, desenha proporcionalmente ao scroll e não causa scroll horizontal.
6. 60fps: apenas `opacity`, `translate`, `filter` (uma vez, na entrada) e `stroke-dashoffset` são animados.

## Plano de teste

- Visual manual no dev server (1440 / 768 / 375px).
- DevTools → Rendering → emular reduced-motion.
- `grep` no `out/index.html` pelo texto do h1.
- Lighthouse rápido opcional (CLS deve permanecer ~0; animações de entrada usam opacity/translate, não layout).
