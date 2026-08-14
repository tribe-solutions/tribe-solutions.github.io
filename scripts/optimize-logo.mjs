import sharp from "sharp";
import { mkdirSync, statSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// Gera todos os rasters da marca a partir dos SVGs vetorizados em
// public/brand/ (fonte: scripts/brand-src/logo-original.png, vetorizado
// com potrace). tree = só a árvore; lockup-v = árvore + "Tribe SOLUTIONS".

const TREE = "public/brand/tree.svg";
const LOCKUP_V = "public/brand/lockup-v.svg";
const BG = { r: 248, g: 246, b: 240, alpha: 1 }; // --color-bg #f8f6f0
const DENSITY = 300;

const TRANSPARENT = { r: 0, g: 0, b: 0, alpha: 0 };

async function fromSvg(src, size) {
  return sharp(src, { density: DENSITY })
    .resize({ width: size, height: size, fit: "contain", background: TRANSPARENT })
    .png()
    .toBuffer();
}

async function writePng(out, buffer, opts = {}) {
  mkdirSync(dirname(out), { recursive: true });
  let p = sharp(buffer);
  if (opts.webp) p = p.webp({ quality: opts.quality ?? 92 });
  else p = p.png({ compressionLevel: 9, palette: opts.palette ?? false });
  await p.toFile(out);
  console.log(`  -> ${out} (${(statSync(out).size / 1024).toFixed(1)} KB)`);
}

// Ícone em "tile": fundo papel opaco, árvore centrada — favicons
// transparentes com verde-floresta somem em aba escura.
async function tile(size, treeScale = 0.76) {
  const inner = Math.round(size * treeScale);
  const tree = await fromSvg(TREE, inner);
  return sharp({ create: { width: size, height: size, channels: 4, background: BG } })
    .composite([{ input: tree, gravity: "centre" }])
    .flatten({ background: BG })
    .png({ compressionLevel: 9 })
    .toBuffer();
}

// .ico com PNGs embutidos (16/32/48) — suportado por todo browser moderno.
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

console.log("[símbolo — árvore, fundo transparente]");
await writePng("public/logo.png", await fromSvg(TREE, 512));
await writePng("public/logo.webp", await fromSvg(TREE, 512), { webp: true });
await writePng("public/logo-64.png", await fromSvg(TREE, 64), { palette: true });
await writePng("public/logo-32.png", await fromSvg(TREE, 32), { palette: true });

console.log("\n[lockup vertical — árvore + tipo, fundo transparente]");
await writePng("public/logo-full.png", await fromSvg(LOCKUP_V, 512));
await writePng("public/og-logo.png", await fromSvg(LOCKUP_V, 1200));

console.log("\n[favicons — tile papel + árvore]");
await writePng("public/favicon_io/favicon-16x16.png", await tile(16, 0.88));
await writePng("public/favicon_io/favicon-32x32.png", await tile(32, 0.84));
await writePng("public/favicon_io/apple-touch-icon.png", await tile(180));
await writePng("public/favicon_io/android-chrome-192x192.png", await tile(192));
await writePng("public/favicon_io/android-chrome-512x512.png", await tile(512));

const ico = buildIco([
  { size: 16, data: await tile(16, 0.88) },
  { size: 32, data: await tile(32, 0.84) },
  { size: 48, data: await tile(48, 0.8) },
]);
writeFileSync("public/favicon_io/favicon.ico", ico);
writeFileSync("app/favicon.ico", ico);
console.log(`  -> favicon.ico x2 (${(ico.length / 1024).toFixed(1)} KB)`);
