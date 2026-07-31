import { Hand, RotateCcw } from "lucide-react";

/**
 * O pipeline inteiro numa coluna: onze agentes, dois portões humanos.
 *
 * A régua vertical é contínua nas etapas automáticas e é INTERROMPIDA pelos
 * portões — a quebra visual é o argumento da seção, não a decoração dela.
 */

type Etapa = {
  agentes: string;
  titulo: string;
  texto: string;
  /** Alimenta esta etapa por fora do fluxo principal. */
  ramo?: { agente: string; texto: string };
};

const ANTES: Etapa[] = [
  {
    agentes: "Curupira · Boitatá · Uirapuru",
    titulo: "Varredura",
    texto:
      "Três frentes em paralelo: o PNCP duas vezes por dia, os portais de dez fundações de apoio, e os editais de fomento à inovação.",
  },
  {
    agentes: "Iara",
    titulo: "Triagem e score",
    texto:
      "Lê o edital, avalia encaixe e risco, dá nota de 0 a 10. É aqui que 97,9% do volume morre.",
  },
  {
    agentes: "Muiraquitã",
    titulo: "Orçamento",
    texto: "Composição de custo item por item, com a origem de cada valor registrada.",
    ramo: {
      agente: "Harpia",
      texto: "mantém a tabela de preços e o câmbio do dia que servem de âncora",
    },
  },
];

const ENTRE: Etapa[] = [
  {
    agentes: "Mapinguari",
    titulo: "Proposta",
    texto: "Redige a técnica, os anexos, as declarações e as procurações no formato do edital.",
  },
  {
    agentes: "Boto",
    titulo: "Assinatura",
    texto: "ICP-Brasil A1, com validade jurídica.",
  },
];

function Passo({ e, i }: { e: Etapa; i: number }) {
  return (
    <li
      data-reveal
      style={{ "--reveal-delay": `${i * 60}ms` } as React.CSSProperties}
      className="relative pb-10 pl-10 last:pb-0"
    >
      <span className="absolute left-0 top-1 flex h-6 w-6 items-center justify-center rounded-full border border-bg/20 bg-forest-900 text-[10px] font-medium text-bg/50">
        {i + 1}
      </span>
      <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-gold-300">
        {e.agentes}
      </p>
      <h3 className="mt-1 font-display text-2xl tracking-tight text-bg">{e.titulo}</h3>
      <p className="mt-2 max-w-xl leading-relaxed text-bg/65">{e.texto}</p>
      {e.ramo && (
        <p className="mt-3 inline-flex flex-wrap items-baseline gap-x-2 rounded-lg bg-bg/[0.06] px-3 py-2 text-sm text-bg/55">
          <span className="font-medium text-gold-300">↳ {e.ramo.agente}</span>
          {e.ramo.texto}
        </p>
      )}
    </li>
  );
}

function Portao({
  n,
  agente,
  titulo,
  texto,
}: {
  n: number;
  agente: string;
  titulo: string;
  texto: string;
}) {
  return (
    <div data-reveal className="relative my-2 rounded-2xl bg-gold-300/10 p-6 md:p-7">
      <div className="flex flex-wrap items-center gap-3">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-gold-300 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-forest-900">
          <Hand className="h-3 w-3" />
          Portão {n} · humano
        </span>
        <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-gold-300">
          {agente}
        </span>
      </div>
      <h3 className="mt-3 font-display text-2xl tracking-tight text-bg">{titulo}</h3>
      <p className="mt-2 max-w-xl leading-relaxed text-bg/70">{texto}</p>
    </div>
  );
}

export function Fluxo() {
  return (
    <div className="mx-auto max-w-3xl">
      <ol className="relative border-l border-bg/15 [&>li]:ml-3">
        {ANTES.map((e, i) => (
          <Passo key={e.titulo} e={e} i={i} />
        ))}
      </ol>

      <Portao
        n={1}
        agente="Tucunaré"
        titulo="Participar ou não"
        texto="Monta a decisão inteira — retorno, prazo, capacidade de entrega, risco financeiro — e para. Quem aperta Go ou No-Go é uma pessoa. É a decisão que compromete caixa e agenda."
      />

      <ol className="relative border-l border-bg/15 [&>li]:ml-3">
        {ENTRE.map((e, i) => (
          <Passo key={e.titulo} e={e} i={i + ANTES.length} />
        ))}
      </ol>

      <Portao
        n={2}
        agente="Tucuxi"
        titulo="Enviar ou não"
        texto="Preenche a resposta no portal do órgão, anexa o PDF assinado e salva como rascunho. Aí trava. Proposta enviada não volta atrás — então o robô nunca aperta esse botão sozinho."
      />

      <div
        data-reveal
        className="mt-2 flex items-start gap-3 rounded-2xl border border-dashed border-bg/20 p-6"
      >
        <RotateCcw className="mt-0.5 h-4 w-4 shrink-0 text-gold-300" />
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-gold-300">
            Saci · volta ao início
          </p>
          <p className="mt-2 max-w-xl leading-relaxed text-bg/65">
            Lê o que foi ganho, o que foi perdido e o que alguém corrigiu à mão, e transforma
            em regra de filtro. No scan de 31/07, oito licitações foram descartadas por
            regras que ninguém escreveu.
          </p>
        </div>
      </div>
    </div>
  );
}
