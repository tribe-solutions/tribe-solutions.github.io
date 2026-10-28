import { Camera, Globe, MessageCircle, Sparkles } from "lucide-react";

/**
 * Reconstrução da caixa de entrada da Atenux com dados de exemplo.
 *
 * Por que não captura de tela: as contas reais têm conversa de cliente de
 * verdade. Os elementos (fila por canal, responsável por conversa, etiqueta,
 * IA que transfere com resumo) são os do produto; nomes e textos são
 * ilustrativos, e a legenda de quem usa o componente diz isso.
 */

const CANAL = {
  whatsapp: { icon: MessageCircle, nome: "WhatsApp" },
  instagram: { icon: Camera, nome: "Instagram" },
  site: { icon: Globe, nome: "Chat do site" },
} as const;

const conversas: {
  nome: string;
  canal: keyof typeof CANAL;
  previa: string;
  dono: string;
  etiqueta?: string;
  ativa?: boolean;
}[] = [
  {
    nome: "Marina Costa",
    canal: "whatsapp",
    previa: "Preciso de 20 unidades pra semana que vem",
    dono: "Carlos",
    etiqueta: "orçamento",
    ativa: true,
  },
  {
    nome: "Rafael Lima",
    canal: "instagram",
    previa: "Vocês entregam hoje?",
    dono: "Ana",
    etiqueta: "entrega",
  },
  {
    nome: "Patrícia",
    canal: "site",
    previa: "Quem me atendeu ontem?",
    dono: "Júlia",
  },
  {
    nome: "Bruno Souza",
    canal: "whatsapp",
    previa: "Ainda tem o modelo azul?",
    dono: "Atena",
  },
];

export function AtenuxInbox({ compacto = false }: { compacto?: boolean }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-bg-elevated shadow-[0_32px_80px_-40px_rgba(15,27,21,0.35)]">
      <div className="flex items-center gap-1.5 border-b border-line bg-bg px-4 py-2.5">
        <span className="h-2 w-2 rounded-full bg-line-strong" />
        <span className="h-2 w-2 rounded-full bg-line-strong" />
        <span className="h-2 w-2 rounded-full bg-line-strong" />
        <span className="ml-2 truncate text-[11px] text-ink-faint">
          Atenux · Caixa de entrada
        </span>
      </div>

      <div className="grid md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        {/* Fila */}
        <ul className="divide-y divide-line border-b border-line md:border-r md:border-b-0">
          {conversas.map((c, i) => {
            const Canal = CANAL[c.canal].icon;
            const ehIa = c.dono === "Atena";
            return (
              <li
                key={c.nome}
                className={`cascade flex gap-3 px-4 py-3 ${c.ativa ? "bg-forest-50" : ""} ${compacto && i > 2 ? "hidden md:flex" : ""}`}
                style={{ "--cascade-i": i } as React.CSSProperties}
              >
                <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-forest-100 text-[11px] font-medium text-forest-700">
                  {c.nome
                    .split(" ")
                    .map((p) => p[0])
                    .slice(0, 2)
                    .join("")}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-sm font-medium text-ink">{c.nome}</span>
                    <Canal
                      className="h-3.5 w-3.5 shrink-0 text-ink-faint"
                      strokeWidth={1.75}
                      aria-label={CANAL[c.canal].nome}
                    />
                  </div>
                  <p className="truncate text-xs text-ink-muted">{c.previa}</p>
                  <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ${ehIa ? "bg-gold-300/25 text-gold-700" : "bg-bg text-ink-muted ring-1 ring-line"}`}
                    >
                      {ehIa && <Sparkles className="h-2.5 w-2.5" strokeWidth={2} />}
                      {ehIa ? "Atena (IA)" : c.dono}
                    </span>
                    {c.etiqueta && (
                      <span className="rounded-full bg-forest-100 px-2 py-0.5 text-[10px] text-forest-700">
                        {c.etiqueta}
                      </span>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        {/* Conversa aberta */}
        <div className="flex flex-col gap-2.5 bg-bg/60 p-4 text-[13px] leading-snug">
          <Balao lado="cliente">Oi! Queria um orçamento pra minha empresa.</Balao>
          <Balao lado="ia">
            Olá, Marina! Posso te ajudar. Me conta o que você precisa e para quando?
          </Balao>
          <Balao lado="cliente">Preciso de 20 unidades pra semana que vem.</Balao>
          <div className="cascade my-1 rounded-lg border border-dashed border-gold-500/50 bg-gold-300/10 px-3 py-2 text-[11px] text-gold-700"
            style={{ "--cascade-i": 3 } as React.CSSProperties}
          >
            <span className="font-medium">Atena transferiu para Carlos.</span> Resumo: 20
            unidades, entrega na próxima semana, pediu orçamento formal.
          </div>
          <Balao lado="equipe">
            Oi, Marina, aqui é o Carlos. Já separei as 20 e te mando o orçamento em 10 min.
          </Balao>
        </div>
      </div>
    </div>
  );
}

function Balao({
  lado,
  children,
}: {
  lado: "cliente" | "ia" | "equipe";
  children: React.ReactNode;
}) {
  const estilos = {
    cliente: "self-start bg-bg-elevated text-ink ring-1 ring-line",
    ia: "self-end bg-forest-100 text-forest-900",
    equipe: "self-end bg-forest-500 text-bg",
  }[lado];
  const autor = { cliente: null, ia: "Atena · IA", equipe: "Carlos" }[lado];
  return (
    <div className={`flex max-w-[85%] flex-col gap-0.5 ${lado === "cliente" ? "self-start" : "self-end items-end"}`}>
      {autor && <span className="px-1 text-[10px] text-ink-faint">{autor}</span>}
      <p className={`rounded-xl px-3 py-2 ${estilos}`}>{children}</p>
    </div>
  );
}
