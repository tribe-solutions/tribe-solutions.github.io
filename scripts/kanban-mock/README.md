# Mock dos boards do Kanboard

Gera as duas imagens de `public/cases/bora-licitar/` usadas na página do case:
`board-licitacoes.webp` e `board-delivery.webp`.

**São reconstruções, não capturas de tela.** As colunas, o fluxo, a nomenclatura
`[auto]`/`[manual]` e os agentes são os reais; o conteúdo dos cards é de exemplo.
Isso é deliberado: o board de entrega real expõe cliente, número de processo e
valor contratado — a tabela de preços da Tribe para quem disputa a mesma
licitação. A legenda na página diz que é reconstrução; **manter essa ressalva**.

As cores foram amostradas pixel a pixel do print real do board, para o mock não
parecer outro produto.

## Rodar

```bash
cd scripts/kanban-mock
cp /mnt/c/Windows/Fonts/seguiemj.ttf .   # ver "Fonte" abaixo
node gerar.mjs                            # → kanban-mock.html
```

Depois screenshot dos elementos `#licitacoes` e `#delivery` com Playwright em
`deviceScaleFactor: 2`, e conversão para WebP com `sharp` (`width: 1920`,
`quality: 88`).

## Fonte

O Chromium headless não traz fonte de emoji: sem ela todo `🏆 🔵 ✋` vira caixa
vazia. O `@font-face` do HTML aponta para `seguiemj.ttf` **no mesmo diretório** —
copie o arquivo antes de gerar. Ele não é versionado (12 MB, e é fonte da
Microsoft).

Alguns glifos (`⚙ 👁 🔔 👤`) não renderizam nem com ela; por isso a barra usa
`☰ ◎ △ ◉`, que existem nas fontes do sistema.

## Editar

Os arrays `LICITACOES` e `DELIVERY` no topo do `gerar.mjs` definem colunas e
cards. `avatares.json` traz os 8 personagens recortados dos cards de pixel art
em base64 — faltam Uirapuru, Harpia e Tucuxi, que entraram na frota depois da
leva de arte.
