import sharp from "sharp";
import { statSync } from "node:fs";

const SOURCES = [
  { src: "public/cases/mundovivido.png", out: "public/cases/mundovivido.webp" },
  { src: "public/cases/anmar.png", out: "public/cases/anmar.webp" },
];

for (const cfg of SOURCES) {
  const before = statSync(cfg.src);
  await sharp(cfg.src)
    .resize({ width: 1600, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(cfg.out);
  const after = statSync(cfg.out);
  console.log(
    `${cfg.src} (${(before.size / 1024).toFixed(0)} KB) -> ${cfg.out} (${(after.size / 1024).toFixed(0)} KB)`,
  );
}
