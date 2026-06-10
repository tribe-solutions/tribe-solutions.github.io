import sharp from "sharp";
import { statSync } from "node:fs";

// Gera public/og-banner.png (1200×630) a partir do logo completo.
// Fundo chapado na cor de papel do site — PNG transparente vira fundo
// preto no preview do WhatsApp/Telegram, então o banner precisa ser opaco.

const SRC = "public/og-logo.png";
const OUT = "public/og-banner.png";
const BG = { r: 248, g: 246, b: 240, alpha: 1 }; // --color-bg #f8f6f0

const LOGO_HEIGHT = 460;

const logo = await sharp(SRC)
  .trim()
  .resize({ height: LOGO_HEIGHT, fit: "inside" })
  .png()
  .toBuffer();

const { width: lw, height: lh } = await sharp(logo).metadata();

await sharp({
  create: { width: 1200, height: 630, channels: 4, background: BG },
})
  .composite([
    {
      input: logo,
      left: Math.round((1200 - lw) / 2),
      top: Math.round((630 - lh) / 2),
    },
  ])
  .flatten({ background: BG })
  .png({ compressionLevel: 9 })
  .toFile(OUT);

const size = statSync(OUT).size;
console.log(`-> ${OUT} (${(size / 1024).toFixed(1)} KB, 1200×630)`);
