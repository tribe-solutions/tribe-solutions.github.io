import sharp from "sharp";
import { mkdirSync, statSync } from "node:fs";
import { dirname } from "node:path";

const SRC = "public/logo-original.png";

const FULL_OUTPUTS = [
  { out: "public/logo-full.png", size: 512, format: "png" },
  { out: "public/og-logo.png", size: 1200, format: "png" },
];

const SYMBOL_CROP = { left: 360, top: 0, width: 1280, height: 1280 };
const SYMBOL_OUTPUTS = [
  { out: "public/logo.png", size: 512, format: "png" },
  { out: "public/logo.webp", size: 512, format: "webp", quality: 92 },
  { out: "public/logo-32.png", size: 32, format: "png" },
  { out: "public/logo-64.png", size: 64, format: "png" },
];

const src = statSync(SRC);
console.log(`source: ${SRC} (${(src.size / 1024).toFixed(0)} KB)`);

async function writeVariant(cfg, basePipeline) {
  mkdirSync(dirname(cfg.out), { recursive: true });
  let p = basePipeline.clone().resize({
    width: cfg.size,
    height: cfg.size,
    fit: "contain",
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  });
  if (cfg.format === "webp") p = p.webp({ quality: cfg.quality });
  else p = p.png({ compressionLevel: 9, palette: cfg.size <= 64 });
  await p.toFile(cfg.out);
  const after = statSync(cfg.out);
  console.log(`  -> ${cfg.out} (${(after.size / 1024).toFixed(1)} KB, ${cfg.size}px)`);
}

console.log("\n[full logo - gear + text]");
const fullPipeline = sharp(SRC);
for (const cfg of FULL_OUTPUTS) await writeVariant(cfg, fullPipeline);

console.log("\n[symbol only - gear + leaves]");
const SYMBOL_TMP = "/tmp/tribe-symbol-source.png";
await sharp(SRC).extract(SYMBOL_CROP).png().toFile(SYMBOL_TMP);
const symbolPipeline = sharp(SYMBOL_TMP);
for (const cfg of SYMBOL_OUTPUTS) await writeVariant(cfg, symbolPipeline);
