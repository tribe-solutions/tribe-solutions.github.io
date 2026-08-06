import type { MetadataRoute } from "next";
import { listarArtigos } from "@/lib/artigos";

export const dynamic = "force-static";

const SITE = "https://tribesolutions.com.br";

/**
 * Home e índice sem lastModified de propósito: com `new Date()` toda build
 * anunciaria alteração que não houve, e lastmod mentiroso é ignorado.
 * Nos artigos ele é real — vem do frontmatter.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const artigos = listarArtigos().map((a) => ({
    url: `${SITE}/artigos/${a.slug}/`,
    lastModified: a.updated ?? a.date,
  }));

  return [
    { url: SITE },
    { url: `${SITE}/cases/bora-licitar/` },
    { url: `${SITE}/cases/consultorio-digital/` },
    { url: `${SITE}/artigos/` },
    ...artigos,
  ];
}
