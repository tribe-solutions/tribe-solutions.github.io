import sharp from "sharp";
import { mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

/**
 * Kit da marca para uso FORA do site: Kanboard, panorama financeiro,
 * assinatura de e-mail, avatar de rede social, apresentação, gráfica.
 *
 * Fonte: public/brand/ (gerado antes por `npm run brand`). Este script só
 * empacota — quem define a arte é scripts/optimize-logo.mjs.
 *
 *   node scripts/brand-kit.mjs [destino]
 *   destino padrão: ~/Downloads/tribe-marca
 */

const OUT = process.argv[2] || join(homedir(), "Downloads", "tribe-marca");

const B = "public/brand";
const NIGHT = { r: 15, g: 27, b: 21, alpha: 1 }; // --color-ink
const PAPER = { r: 248, g: 246, b: 240, alpha: 1 }; // --color-bg
const TRANSPARENT = { r: 0, g: 0, b: 0, alpha: 0 };

mkdirSync(OUT, { recursive: true });

async function salvar(nome, buffer) {
  const alvo = join(OUT, nome);
  writeFileSync(alvo, buffer);
  console.log(`  -> ${nome} (${(statSync(alvo).size / 1024).toFixed(1)} KB)`);
}

const png = (p) => sharp(p).png({ compressionLevel: 9 });

/** Símbolo centrado num quadrado chapado — avatar de rede social e favicon. */
async function quadrado(size, bg, escala = 0.72, fonte = `${B}/symbol-on-dark.png`) {
  const arte = await sharp(fonte)
    .resize({ width: Math.round(size * escala), height: Math.round(size * escala), fit: "inside" })
    .toBuffer();
  return sharp({ create: { width: size, height: size, channels: 4, background: bg } })
    .composite([{ input: arte, gravity: "centre" }])
    .flatten({ background: bg })
    .png({ compressionLevel: 9 })
    .toBuffer();
}

/** Arte deitada numa caixa de proporção fixa — assinatura de e-mail, cabeçalho. */
async function caixa(fonte, w, h, bg, margem = 0.9) {
  const arte = await sharp(fonte)
    .resize({ width: Math.round(w * margem), height: Math.round(h * margem), fit: "inside" })
    .toBuffer();
  let p = sharp({ create: { width: w, height: h, channels: 4, background: bg } }).composite([
    { input: arte, gravity: "centre" },
  ]);
  if (bg !== TRANSPARENT) p = p.flatten({ background: bg });
  return p.png({ compressionLevel: 9 }).toBuffer();
}

console.log(`[kit da marca -> ${OUT}]`);

console.log("\n[símbolo]");
for (const fundo of ["light", "dark"]) {
  for (const px of [512, 1024]) {
    await salvar(
      `simbolo-fundo-${fundo === "light" ? "claro" : "escuro"}-${px}.png`,
      await png(`${B}/symbol-on-${fundo}.png`)
        .resize({ width: px, height: px, fit: "contain", background: TRANSPARENT })
        .toBuffer(),
    );
  }
}

console.log("\n[logotipo — TRIBE SOLUTIONS]");
for (const fundo of ["light", "dark"]) {
  const nome = fundo === "light" ? "claro" : "escuro";
  await salvar(
    `logotipo-fundo-${nome}-1600.png`,
    await png(`${B}/lockup-on-${fundo}.png`).resize({ width: 1600 }).toBuffer(),
  );
  await salvar(
    `logotipo-tribe-fundo-${nome}-1200.png`,
    await png(`${B}/wordmark-on-${fundo}.png`).resize({ width: 1200 }).toBuffer(),
  );
}

console.log("\n[avatar quadrado — WhatsApp, LinkedIn, Google]");
await salvar("avatar-quadrado-640.png", await quadrado(640, NIGHT));
await salvar("avatar-quadrado-1024.png", await quadrado(1024, NIGHT));
await salvar("avatar-quadrado-claro-640.png", await quadrado(640, PAPER, 0.72, `${B}/symbol-on-light.png`));

console.log("\n[assinatura de e-mail (Zoho) — 200x60 em fundo claro]");
await salvar("zoho-logo-200x60.png", await caixa(`${B}/lockup-on-light.png`, 200, 60, PAPER));
await salvar(
  "assinatura-email-360x110.png",
  await caixa(`${B}/lockup-on-light.png`, 360, 110, PAPER),
);

console.log("\n[peças prontas de sistema]");
// Kanboard: login em tema claro e escuro (KanbanLicitarTheme)
await salvar("kanboard-logo-full.png", await caixa(`${B}/lockup-on-light.png`, 640, 240, TRANSPARENT));
await salvar(
  "kanboard-logo-full-dark.png",
  await caixa(`${B}/lockup-on-dark.png`, 640, 240, TRANSPARENT),
);
await salvar("kanboard-icon.png", await quadrado(512, NIGHT));
// Panorama financeiro: um só arquivo que funciona em tema claro e escuro
await salvar("panorama-logo-160.png", await quadrado(160, NIGHT, 0.74));
// tribe-labs e qualquer site fora deste repo
await salvar("tribe-labs-favicon-256.png", await quadrado(256, NIGHT, 0.76));
await salvar("favicon.ico", readFileSync("public/favicon_io/favicon.ico"));

console.log("\n[timbre de documento — proposta e contrato]");
// Versão curta: o documento já traz "TECH TRIBE SOLUTIONS" por extenso logo
// abaixo, então repetir "SOLUTIONS" no timbre pesa. Fundo branco chapado e
// paleta reduzida para entrar em base64 no HTML e virar imagem no DOCX sem
// inchar o arquivo.
await salvar(
  "documento-timbre-800.png",
  await sharp(`${B}/wordmark-on-light.png`)
    .resize({ width: 800 })
    .flatten({ background: "#ffffff" })
    .png({ compressionLevel: 9, palette: true, colors: 128 })
    .toBuffer(),
);

console.log("\n[compartilhamento]");
await salvar("og-banner-1200x630.png", await png("public/og-banner.png").toBuffer());

writeFileSync(
  join(OUT, "LEIA-ME.md"),
  `# Marca Tribe Solutions

Gerado por \`scripts/brand-kit.mjs\` no repositório da landing
(tribe-solutions.github.io). Não edite os arquivos daqui: mexa nos mestres em
\`scripts/brand-src/\` e rode \`npm run brand && node scripts/brand-kit.mjs\`.

## Qual arquivo usar

| Situação | Arquivo |
| --- | --- |
| Fundo claro (papel, branco, slide claro) | \`*-fundo-claro-*.png\` |
| Fundo escuro (verde-noite, preto, slide escuro) | \`*-fundo-escuro-*.png\` |
| Só o símbolo (ícone, marca d'água, selo) | \`simbolo-*\` |
| Nome completo, com "SOLUTIONS" | \`logotipo-fundo-*\` |
| Nome curto, sem "SOLUTIONS" (espaço apertado) | \`logotipo-tribe-fundo-*\` |
| Foto de perfil (WhatsApp, LinkedIn, Google) | \`avatar-quadrado-1024.png\` |
| Assinatura de e-mail | \`assinatura-email-360x110.png\` |
| Preview de link (og:image) | \`og-banner-1200x630.png\` |

A arte nasceu para fundo escuro: a massa do tucano e das letras é branca. A
versão "fundo claro" troca essa massa por verde-floresta e inverte o volume do
gradiente, então as duas leem igual em contraste.

## Cores

| Papel | Hex |
| --- | --- |
| Verde-lima (folha da frente) | \`#88DA2D\` |
| Verde-médio | \`#38A021\` |
| Verde-escuro (folha de trás) | \`#0C5E21\` |
| Verde-noite (fundo da arte, texto em fundo claro) | \`#0F1B15\` |
| Verde-floresta (apoio) | \`#2F5A3D\` |
| Papel (fundo claro) | \`#F8F6F0\` |

## Espaço livre

Deixe ao redor da marca, em qualquer aplicação, uma margem igual à altura da
letra "T" do logotipo. Nada de texto, borda ou foto dentro dessa margem.

## Não faça

- Não recolora a arte fora das duas versões deste kit.
- Não coloque a versão de fundo claro sobre fundo escuro (e vice-versa).
- Não distorça: redimensione sempre travando a proporção.
- Não aplique sombra, contorno ou brilho.
`,
);
console.log(`  -> LEIA-ME.md`);
