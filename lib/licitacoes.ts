import fs from "node:fs";
import path from "node:path";

/**
 * Páginas de dados `/licitacoes/<ramo>/<uf>` (PRD-marketing-seo M4).
 *
 * Um JSON por página em `marketing-data/licitacoes/`, escrito pelo exportador
 * (M5) a partir da base do raio-x. O site não calcula número nenhum: só
 * mostra o que veio com período e fonte. `LICITACOES_DIR` troca a pasta
 * (o build de prova usa `docs/licitacoes-exemplo`, que nunca vai pro ar).
 */
const DIR = process.env.LICITACOES_DIR
  ? path.resolve(/*turbopackIgnore: true*/ process.env.LICITACOES_DIR)
  : path.join(process.cwd(), "marketing-data/licitacoes");

/** Regra anti-spam do PRD: abaixo disso a página não é publicada. */
export const MINIMO_ITENS = 30;

export type Numero = {
  rotulo: string;
  valor: number;
  formato: "inteiro" | "reais";
};

export type CompraAberta = {
  orgao: string;
  objeto: string;
  /** ISO (AAAA-MM-DD). */
  prazo: string;
  url: string;
};

export type Pergunta = { pergunta: string; resposta: string };

export type PaginaLicitacao = {
  /** Slug do ramo, ex.: "material-de-construcao". */
  ramo: string;
  /** Nome do ramo como aparece no texto, ex.: "Material de construção". */
  ramo_nome: string;
  /** Sigla em minúsculas, ex.: "am". */
  uf: string;
  uf_nome: string;
  /** Meta description (até ~160 caracteres). */
  descricao: string;
  /** Texto de abertura do Bem-te-vi, parágrafos separados por linha em branco. */
  abertura: string;
  /** ISO. Data da coleta; vira lastmod no sitemap e dateModified no JSON-LD. */
  atualizado: string;
  periodo: { inicio: string; fim: string };
  fonte: { nome: string; url: string };
  /** Itens do ramo no período: é o número que passa (ou não) pela regra anti-spam. */
  total_itens: number;
  numeros: Numero[];
  compras_abertas: CompraAberta[];
  perguntas: Pergunta[];
};

const OBRIGATORIOS = [
  "ramo",
  "ramo_nome",
  "uf",
  "uf_nome",
  "descricao",
  "abertura",
  "atualizado",
  "periodo",
  "fonte",
  "total_itens",
] as const;

const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/;

/** Lê e valida um arquivo. JSON quebrado derruba o build: melhor que página torta no ar. */
function ler(arquivo: string): PaginaLicitacao {
  const dados = JSON.parse(
    fs.readFileSync(path.join(DIR, arquivo), "utf8"),
  ) as Partial<PaginaLicitacao>;

  for (const campo of OBRIGATORIOS) {
    if (dados[campo] === undefined || dados[campo] === "") {
      throw new Error(`Licitações "${arquivo}": falta "${campo}".`);
    }
  }
  if (!SLUG.test(dados.ramo!) || !/^[a-z]{2}$/.test(dados.uf!)) {
    throw new Error(`Licitações "${arquivo}": ramo ou uf fora do formato.`);
  }

  return {
    ...(dados as PaginaLicitacao),
    numeros: dados.numeros ?? [],
    compras_abertas: dados.compras_abertas ?? [],
    perguntas: dados.perguntas ?? [],
  };
}

/** Páginas publicáveis (passam na regra anti-spam), ordenadas por ramo e UF. */
export function listarPaginas(): PaginaLicitacao[] {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".json"))
    .map(ler)
    .filter((p) => p.total_itens >= MINIMO_ITENS)
    .sort((a, b) => `${a.ramo}/${a.uf}`.localeCompare(`${b.ramo}/${b.uf}`));
}

export function buscarPagina(
  ramo: string,
  uf: string,
): PaginaLicitacao | undefined {
  return listarPaginas().find((p) => p.ramo === ramo && p.uf === uf);
}
