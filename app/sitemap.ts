import type { MetadataRoute } from "next";

export const dynamic = "force-static";

/**
 * Hoje só existe a home. Ao criar páginas novas (ex.: /cases/<slug>),
 * adicionar aqui — o Google não descobre o que não está linkado nem listado.
 *
 * Sem lastModified de propósito: com `new Date()` toda build anunciaria
 * alteração de conteúdo que não houve, e lastmod mentiroso é ignorado.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: "https://tribesolutions.com.br" }];
}
