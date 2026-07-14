import type { Artigo } from "./artigos";

const SITE_URL = "https://tribesolutions.com.br";

/**
 * JSON-LD de LocalBusiness. Alimenta o Google com os sinais de negócio local
 * (endereço, telefone, área de atuação) que o HTML sozinho não transmite.
 *
 * Só entra aqui dado conferido: sem geo (não temos lat/long), sem sameAs
 * (não há perfil social), sem openingHours nem priceRange. Campo inventado
 * aqui vira informação errada no resultado de busca.
 */
export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE_URL}/#organization`,
  name: "Tribe Solutions",
  legalName: "Tech Tribe Solutions LTDA",
  taxID: "55.588.759/0001-29",
  url: SITE_URL,
  logo: `${SITE_URL}/logo-full.png`,
  image: `${SITE_URL}/og-banner.png`,
  description:
    "Desenvolvimento de software sob medida em Manaus: sistemas web, aplicativos mobile, infraestrutura cloud e automação via WhatsApp. Também fornecemos software e licenças para o setor público por licitação.",
  telephone: "+55-92-99353-1716",
  email: "contato@tribesolutions.com.br",
  address: {
    "@type": "PostalAddress",
    streetAddress:
      "Avenida Dr. Theomario Pinto da Costa, 811 — Sala 802, Edifício Skye Platinum Offices",
    addressLocality: "Manaus",
    addressRegion: "AM",
    postalCode: "69050-055",
    addressCountry: "BR",
  },
  areaServed: [
    { "@type": "City", name: "Manaus" },
    { "@type": "State", name: "Amazonas" },
    { "@type": "Country", name: "Brasil" },
  ],
  knowsAbout: [
    "Desenvolvimento de software sob medida",
    "Sistemas web",
    "Aplicativos mobile",
    "Infraestrutura cloud",
    "Automação de atendimento via WhatsApp",
    "Licitação pública de software",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Serviços",
    itemListElement: [
      ["Sistemas web", "Sistemas web sob medida, do MVP à plataforma SaaS."],
      ["Aplicativos mobile", "Aplicativos mobile nativos e multiplataforma."],
      ["Infraestrutura cloud", "Arquitetura, deploy e operação em nuvem."],
      [
        "Automação via WhatsApp",
        "Bots e automação de atendimento e processos no WhatsApp.",
      ],
      [
        "Software por licitação",
        "Desenvolvimento e fornecimento de software para o setor público, com assinatura ICP-Brasil.",
      ],
      [
        "Licenças de software",
        "Fornecimento de licenças de software para órgãos públicos via licitação.",
      ],
    ].map(([name, description]) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name, description },
    })),
  },
};

/**
 * JSON-LD do artigo. `publisher`/`author` apontam para o @id da organização
 * acima em vez de repetir os dados — é o mesmo nó do grafo, e duplicar
 * abriria espaço pra os dois divergirem.
 */
export function articleJsonLd(artigo: Artigo) {
  const url = `${SITE_URL}/artigos/${artigo.slug}/`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: artigo.title,
    description: artigo.description,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    datePublished: artigo.date,
    dateModified: artigo.updated ?? artigo.date,
    inLanguage: "pt-BR",
    keywords: artigo.keywords,
    author: { "@id": `${SITE_URL}/#organization` },
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}
