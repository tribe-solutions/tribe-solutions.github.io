import sharp from "sharp";
import { mkdirSync, statSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

/**
 * Gera todos os rasters da marca a partir dos dois mestres em
 * scripts/brand-src/ (PNG com fundo transparente, recortados das artes
 * originais em scripts/brand-src/original/):
 *
 *   symbol.png  — o símbolo (tucano + folhas)
 *   lockup.png  — TRIBE (com o símbolo no "R") + SOLUTIONS
 *
 * A arte nasceu para fundo escuro: a massa do tucano e das letras é
 * branca. Quem usa fundo claro precisa da variante "on-light", em que
 * essa massa vira verde-floresta e o volume do gradiente se inverte
 * (o que era mais branco fica mais escuro). O site é papel #f8f6f0,
 * então é a on-light que entra em /logo*, /og-logo e nos componentes.
 *
 * O og-banner sai depois, em scripts/generate-og.mjs. Rode os dois com
 * `npm run brand`.
 */

const SRC_SYMBOL = "scripts/brand-src/symbol.png";
const SRC_LOCKUP = "scripts/brand-src/lockup.png";

const NIGHT = { r: 15, g: 27, b: 21, alpha: 1 }; // --color-ink
const TRANSPARENT = { r: 0, g: 0, b: 0, alpha: 0 };

// Alvo da recoloração: forest-500 no ponto de menos luz da massa branca,
// ink no de mais luz. Os dois saem de app/globals.css.
const ALVO_CLARO = [0x2f, 0x5a, 0x3d];
const ALVO_ESCURO = [0x0f, 0x1b, 0x15];

async function raw(input) {
  const img = sharp(input).ensureAlpha();
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  return { data, info };
}

function fromRaw({ data, info }) {
  return sharp(data, {
    raw: { width: info.width, height: info.height, channels: info.channels },
  });
}

/** Massa branca -> verde-floresta, preservando as folhas e o antialiasing. */
async function onLight(input) {
  const { data, info } = await raw(input);
  const out = Buffer.from(data);
  for (let i = 0; i < out.length; i += info.channels) {
    const [r, g, b] = [out[i], out[i + 1], out[i + 2]];
    const mx = Math.max(r, g, b);
    const mn = Math.min(r, g, b);
    const sat = mx > 0 ? (mx - mn) / mx : 0;
    const lum = (r + g + b) / 3;
    // Peso: só pega o que é ao mesmo tempo pouco saturado e claro.
    const w =
      Math.min(Math.max(1 - sat / 0.3, 0), 1) *
      Math.min(Math.max((lum - 95) / 60, 0), 1);
    if (w <= 0) continue;
    const t = Math.min(Math.max((lum - 140) / 115, 0), 1);
    for (let c = 0; c < 3; c++) {
      const alvo = ALVO_CLARO[c] * (1 - t) + ALVO_ESCURO[c] * t;
      out[i + c] = Math.round(out[i + c] * (1 - w) + alvo * w);
    }
  }
  return fromRaw({ data: out, info }).png().toBuffer();
}

/** Só a palavra TRIBE: corta o lockup na faixa vazia acima de SOLUTIONS. */
async function wordmark(input) {
  const { data, info } = await raw(input);
  const cheia = [];
  for (let y = 0; y < info.height; y++) {
    let n = 0;
    for (let x = 0; x < info.width; x++) {
      if (data[(y * info.width + x) * info.channels + 3] > 40) n++;
    }
    cheia.push(n >= 3);
  }
  const primeira = cheia.indexOf(true);
  let fim = primeira;
  while (fim < cheia.length && cheia[fim]) fim++;
  // A faixa vazia entre TRIBE e SOLUTIONS pode ter uma linha solta de
  // antialiasing; só corta de fato depois de 4px seguidos de vazio.
  let vazio = 0;
  for (let y = fim; y < cheia.length; y++) {
    if (cheia[y]) {
      if (vazio < 4) {
        vazio = 0;
        fim = y + 1;
      } else break;
    } else vazio++;
  }
  return sharp(input)
    .extract({ left: 0, top: 0, width: info.width, height: fim })
    .trim({ threshold: 1 })
    .png()
    .toBuffer();
}

async function contain(input, w, h) {
  return sharp(input)
    .resize({ width: w, height: h, fit: "contain", background: TRANSPARENT })
    .png()
    .toBuffer();
}

async function escrever(out, buffer, opts = {}) {
  mkdirSync(dirname(out), { recursive: true });
  let p = sharp(buffer);
  if (opts.webp) p = p.webp({ quality: opts.quality ?? 92 });
  else p = p.png({ compressionLevel: 9, palette: opts.palette ?? false });
  await p.toFile(out);
  console.log(`  -> ${out} (${(statSync(out).size / 1024).toFixed(1)} KB)`);
}

/** Ícone em "tile": a arte original centrada num quadrado noite arredondado. */
async function tile(size, escala = 0.72, bg = NIGHT) {
  const inner = Math.round(size * escala);
  const arte = await sharp(SRC_SYMBOL)
    .resize({ width: inner, height: inner, fit: "inside" })
    .toBuffer();
  return sharp({ create: { width: size, height: size, channels: 4, background: bg } })
    .composite([{ input: arte, gravity: "centre" }])
    .flatten({ background: bg })
    .png({ compressionLevel: 9 })
    .toBuffer();
}

/** .ico com PNGs embutidos (16/32/48) — suportado por todo browser moderno. */
function buildIco(pngs) {
  const count = pngs.length;
  const header = Buffer.alloc(6 + 16 * count);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(count, 4);
  let offset = header.length;
  pngs.forEach(({ size, data }, i) => {
    const e = 6 + 16 * i;
    header.writeUInt8(size >= 256 ? 0 : size, e);
    header.writeUInt8(size >= 256 ? 0 : size, e + 1);
    header.writeUInt8(0, e + 2);
    header.writeUInt8(0, e + 3);
    header.writeUInt16LE(1, e + 4);
    header.writeUInt16LE(32, e + 6);
    header.writeUInt32LE(data.length, e + 8);
    header.writeUInt32LE(offset, e + 12);
    offset += data.length;
  });
  return Buffer.concat([header, ...pngs.map((p) => p.data)]);
}

const symbolLight = await onLight(SRC_SYMBOL);
const lockupLight = await onLight(SRC_LOCKUP);
const wordDark = await wordmark(SRC_LOCKUP);
const wordLight = await onLight(wordDark);

console.log("[public/brand — as duas versões de cada peça]");
for (const [nome, buf] of [
  ["symbol-on-light", symbolLight],
  ["symbol-on-dark", SRC_SYMBOL],
  ["lockup-on-light", lockupLight],
  ["lockup-on-dark", SRC_LOCKUP],
  ["wordmark-on-light", wordLight],
  ["wordmark-on-dark", wordDark],
]) {
  const alvo = nome.startsWith("symbol")
    ? await contain(buf, 512, 512)
    : await sharp(buf).resize({ width: 1024 }).png().toBuffer();
  await escrever(`public/brand/${nome}.png`, alvo);
  await escrever(`public/brand/${nome}.webp`, alvo, { webp: true });
}

// O site exporta estático com images.unoptimized, então o arquivo vai pro
// browser do jeito que sai daqui: /logo.webp é o asset de tela (256px cobre
// @3x da nav e @2.9x do hero por 17 KB), /logo.png fica como fallback e uso
// externo.
console.log("\n[símbolo — o que os componentes carregam]");
await escrever("public/logo.webp", await contain(symbolLight, 256, 256), {
  webp: true,
  quality: 82,
});
await escrever("public/wordmark.webp", await sharp(wordLight).resize({ width: 512 }).toBuffer(), {
  webp: true,
  quality: 82,
});
await escrever("public/lockup.webp", await sharp(lockupLight).resize({ width: 640 }).toBuffer(), {
  webp: true,
  quality: 82,
});
await escrever("public/logo.png", await contain(symbolLight, 512, 512));
await escrever("public/logo-64.png", await contain(symbolLight, 64, 64));
await escrever("public/logo-32.png", await contain(symbolLight, 32, 32));

console.log("\n[lockup — compartilhamento e uso externo]");
await escrever("public/logo-full.png", await sharp(lockupLight).resize({ width: 1024 }).toBuffer());
await escrever("public/og-logo.png", await sharp(lockupLight).resize({ width: 1200 }).toBuffer());

console.log("\n[favicons — tile noite + arte original]");
await escrever("public/favicon_io/favicon-16x16.png", await tile(16, 0.86));
await escrever("public/favicon_io/favicon-32x32.png", await tile(32, 0.82));
await escrever("public/favicon_io/apple-touch-icon.png", await tile(180));
await escrever("public/favicon_io/android-chrome-192x192.png", await tile(192));
await escrever("public/favicon_io/android-chrome-512x512.png", await tile(512));

const ico = buildIco([
  { size: 16, data: await tile(16, 0.86) },
  { size: 32, data: await tile(32, 0.82) },
  { size: 48, data: await tile(48, 0.78) },
]);
writeFileSync("public/favicon_io/favicon.ico", ico);
writeFileSync("app/favicon.ico", ico);
console.log(`  -> favicon.ico x2 (${(ico.length / 1024).toFixed(1)} KB)`);
