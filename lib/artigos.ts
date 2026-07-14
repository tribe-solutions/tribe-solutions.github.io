import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import MarkdownIt from "markdown-it";
import { waLink } from "./site";

const DIR = path.join(process.cwd(), "content/artigos");

/**
 * html: false porque o corpo dos artigos é markdown e mais nada. Se um dia
 * a geração for automatizada, o texto vindo do modelo não consegue injetar
 * tag crua na página.
 */
const md = new MarkdownIt({ html: false, linkify: true, typographer: true });

export type Artigo = {
  slug: string;
  title: string;
  description: string;
  /** ISO (AAAA-MM-DD). Data real de publicação, usada no sitemap e no JSON-LD. */
  date: string;
  updated?: string;
  keywords: string[];
  /** Frase curta do card no índice; cai no description se ausente. */
  resumo?: string;
  html: string;
  minutos: number;
};

type Meta = Omit<Artigo, "html" | "minutos">;

function parse(slug: string): Artigo {
  const raw = fs.readFileSync(path.join(DIR, `${slug}.md`), "utf8");
  const { data, content } = matter(raw);
  const meta = data as Partial<Meta>;

  for (const campo of ["title", "description", "date"] as const) {
    if (!meta[campo]) {
      throw new Error(`Artigo "${slug}": frontmatter sem "${campo}".`);
    }
  }

  const palavras = content.trim().split(/\s+/).length;

  return {
    slug,
    title: meta.title!,
    description: meta.description!,
    date: meta.date!,
    updated: meta.updated,
    keywords: meta.keywords ?? [],
    resumo: meta.resumo,
    html: resolverCta(md.render(content), slug, meta.title!),
    minutos: Math.max(1, Math.round(palavras / 200)),
  };
}

/**
 * Troca o `#whatsapp` do markdown pelo link real. Fica aqui, e não no texto,
 * porque assim o artigo continua sendo markdown puro (um agente consegue
 * escrever um sem saber montar link do wa.me) e cada CTA sai rastreável:
 * a mensagem já chega dizendo de qual artigo veio, e o evento no Umami
 * separa qual deles converte.
 */
function resolverCta(html: string, slug: string, titulo: string): string {
  const href = waLink(`Li o artigo "${titulo}" e queria conversar.`);
  return html.replace(
    /href="#whatsapp"/g,
    `href="${href}" target="_blank" rel="noopener" data-umami-event="artigo-cta-whatsapp" data-umami-event-artigo="${slug}"`,
  );
}

/** Todos os artigos, do mais recente para o mais antigo. */
export function listarArtigos(): Artigo[] {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => parse(f.replace(/\.md$/, "")))
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function buscarArtigo(slug: string): Artigo | undefined {
  try {
    return parse(slug);
  } catch {
    return undefined;
  }
}
