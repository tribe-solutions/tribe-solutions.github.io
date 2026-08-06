/**
 * Reconstrução das telas do Consultório Digital (consultorio.psimundovivido.com.br).
 *
 * Por que não é captura de tela: o sistema é prontuário de psicologia. Toda tela
 * útil mostra nome de paciente, telefone, valor cobrado e anotação de sessão, que
 * é dado de saúde. Nenhum recorte de print sobrevive a isso, então as telas foram
 * remontadas em componente a partir do código do produto, com pacientes fictícios.
 *
 * A estrutura é a real: os quatro indicadores, as quatro ações rápidas, os badges
 * de status e de modalidade e as cores saem de `components/dashboard-stats.tsx`,
 * `quick-actions.tsx` e `recent-appointments.tsx` do repositório psychology-appointment.
 */

/** Roxo da marca do produto, o mesmo do underline ativo no header real. */
const ROXO = "#5a4387";

type Consulta = {
  paciente: string;
  hora: string;
  modalidade: "online" | "presencial";
  status: "agendada" | "confirmada";
};

const CONSULTAS: Consulta[] = [
  { paciente: "Helena M.", hora: "Seg, 09:00", modalidade: "online", status: "confirmada" },
  { paciente: "Rafael T.", hora: "Seg, 10:00", modalidade: "presencial", status: "confirmada" },
  { paciente: "Júlia A.", hora: "Ter, 14:00", modalidade: "online", status: "agendada" },
  { paciente: "Marcos V.", hora: "Qua, 08:00", modalidade: "presencial", status: "agendada" },
  { paciente: "Beatriz L.", hora: "Qui, 16:00", modalidade: "online", status: "agendada" },
];

/** Classes iguais às do produto, para o mockup não inventar uma paleta própria. */
const BADGE_STATUS = {
  agendada: "bg-blue-100 text-blue-800",
  confirmada: "bg-green-100 text-green-800",
} as const;

const BADGE_MODALIDADE = {
  online: "bg-purple-100 text-purple-800",
  presencial: "bg-indigo-100 text-indigo-800",
} as const;

const INDICADORES = [
  { titulo: "Total de Pacientes", valor: "18", cor: "text-blue-600", icone: IconeUsuarios },
  { titulo: "Consultas Hoje", valor: "4", cor: "text-green-600", icone: IconeCalendario },
  { titulo: "Consultas Esta Semana", valor: "16", cor: "text-orange-600", icone: IconeRelogio },
  { titulo: "Receita do Mês", valor: "R$ 4.320,00", cor: "text-emerald-600", icone: IconeCifra },
];

const ACOES = [
  { emoji: "✨", titulo: "Nova Consulta", texto: "Agende uma nova sessão para um paciente." },
  { emoji: "👥", titulo: "Novo Paciente", texto: "Cadastre um novo paciente na sua base." },
  { emoji: "📅", titulo: "Ver Agenda", texto: "Visualize todas as suas consultas agendadas." },
  { emoji: "⚠️", titulo: "Consultas Pendentes", texto: "Atualize o status de consultas passadas." },
];

/** Barra de endereço falsa. Enquadra o mockup como tela de sistema, não como arte. */
function Cromo({ url }: { url: string }) {
  return (
    <div className="flex items-center gap-1.5 border-b border-slate-200 bg-slate-100 px-4 py-2.5">
      <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
      <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
      <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
      <span className="ml-3 truncate text-[11px] text-slate-500">{url}</span>
    </div>
  );
}

function Cabecalho() {
  return (
    <div className="flex items-center justify-between border-b border-slate-200 bg-white px-5 py-3">
      <div>
        <p className="flex items-baseline gap-1.5 text-sm font-semibold" style={{ color: ROXO }}>
          Consultório Digital
          <span className="text-xs font-normal text-slate-500">| Paula Vitória</span>
        </p>
        <p className="-mt-0.5 text-[10px] text-slate-400">by psimundovivido</p>
      </div>

      <nav className="hidden items-center gap-7 text-xs font-medium sm:flex">
        <span
          className="underline decoration-2 underline-offset-4"
          style={{ color: ROXO, textDecorationColor: ROXO }}
        >
          Dashboard
        </span>
        <span className="text-slate-500">Pacientes</span>
        <span className="text-slate-500">Consultas</span>
      </nav>

      <span
        className="flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-medium text-white"
        style={{ backgroundColor: ROXO }}
      >
        PV
      </span>
    </div>
  );
}

/**
 * Tela cheia do dashboard, para a página do case.
 * `text-[...]` fixo em vez de escala responsiva: o mockup encolhe junto com o
 * container e precisa manter a proporção de tela de sistema em qualquer largura.
 */
export function ConsultorioDashboard() {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <Cromo url="consultorio.psimundovivido.com.br/dashboard" />
      <Cabecalho />

      <div className="space-y-5 bg-slate-50 p-5">
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {INDICADORES.map((ind) => {
            const Icone = ind.icone;
            return (
              <div key={ind.titulo} className="rounded-lg border border-slate-200 bg-white p-4">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-[11px] font-medium leading-tight text-slate-600">
                    {ind.titulo}
                  </p>
                  <Icone className={`h-4 w-4 shrink-0 ${ind.cor}`} />
                </div>
                <p className="mt-2 text-xl font-bold text-slate-900">{ind.valor}</p>
              </div>
            );
          })}
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <p className="text-sm font-semibold text-slate-900">Ações Rápidas</p>
          <div className="mt-3 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {ACOES.map((a) => (
              <div key={a.titulo} className="rounded-lg border border-slate-200 p-3">
                <p className="text-lg leading-none">{a.emoji}</p>
                <p className="mt-2 text-xs font-semibold text-slate-900">{a.titulo}</p>
                <p className="mt-1 hidden text-[10px] leading-snug text-slate-500 sm:block">
                  {a.texto}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <p className="text-sm font-semibold text-slate-900">Próximas Consultas</p>
          <div className="mt-3 divide-y divide-slate-100">
            {CONSULTAS.map((c) => (
              <div key={c.paciente} className="flex items-center justify-between gap-3 py-2.5">
                <div className="min-w-0">
                  <p className="truncate text-xs font-medium text-slate-900">{c.paciente}</p>
                  <p className="text-[10px] text-slate-500">{c.hora}</p>
                </div>
                <div className="flex shrink-0 items-center gap-1.5">
                  <span
                    className={`rounded-full px-2 py-0.5 text-[9px] font-medium ${BADGE_MODALIDADE[c.modalidade]}`}
                  >
                    {c.modalidade}
                  </span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[9px] font-medium ${BADGE_STATUS[c.status]}`}
                  >
                    {c.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Recorte do link público de agendamento. É a peça que fecha o ciclo com o site
 * institucional, então aparece sozinha na página do case em vez de diluída no
 * dashboard inteiro.
 */
export function ConsultorioFormulario() {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <Cromo url="consultorio.psimundovivido.com.br/dashboard" />
      <div className="p-5">
        <p className="text-sm font-semibold text-slate-900">Formulário de Agendamento</p>
        <p className="mt-1 text-xs text-slate-500">
          Agendamento de sessões com Paula Vitória
        </p>

        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center">
          <code className="min-w-0 flex-1 truncate rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-[11px] text-slate-700">
            consultorio.psimundovivido.com.br/agenda-de-atendimentos
          </code>
          <span className="shrink-0 rounded-md border border-slate-300 px-3 py-2 text-[11px] font-medium text-slate-700">
            Copiar link
          </span>
        </div>

        <p className="mt-3 text-[11px] text-slate-500">
          Compartilhe esse link com as pacientes para elas preencherem o formulário.
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          <span className="rounded-md bg-slate-100 px-3 py-2 text-[11px] font-medium text-slate-700">
            Abrir formulário
          </span>
          <span
            className="rounded-md px-3 py-2 text-[11px] font-medium text-white"
            style={{ backgroundColor: ROXO }}
          >
            Ver respostas
          </span>
        </div>
      </div>
    </div>
  );
}

/**
 * Versão reduzida para o card da grade de cases, lido a ~300px de largura.
 * Mostra quatro indicadores em 2x2 e a fila inteira de sessões: com menos que
 * isso sobra área branca no pé do card, que a essa escala lê como tela vazia.
 */
export function ConsultorioMiniatura() {
  return (
    <div className="absolute inset-0 flex flex-col bg-slate-100">
      <div className="flex items-center gap-1 bg-slate-200/70 px-2 py-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-red-400/70" />
        <span className="h-1.5 w-1.5 rounded-full bg-yellow-400/70" />
        <span className="h-1.5 w-1.5 rounded-full bg-green-400/70" />
        <span className="ml-1.5 truncate text-[7px] text-slate-500">
          consultorio.psimundovivido.com.br
        </span>
      </div>

      <div className="flex items-center justify-between bg-white px-2 py-1.5">
        <span className="text-[9px] font-semibold" style={{ color: ROXO }}>
          Consultório Digital
        </span>
        <span
          className="flex h-4 w-4 items-center justify-center rounded-full text-[6px] font-medium text-white"
          style={{ backgroundColor: ROXO }}
        >
          PV
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-1.5 p-1.5">
        <div className="grid grid-cols-2 gap-1.5">
          {INDICADORES.map((ind, i) => (
            <div
              key={ind.titulo}
              className="cascade rounded bg-white px-1.5 py-1"
              style={{ "--cascade-i": i } as React.CSSProperties}
            >
              <p className="truncate text-[6px] leading-tight text-slate-500">{ind.titulo}</p>
              <p className="text-[10px] font-bold leading-tight text-slate-900">{ind.valor}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-1 flex-col rounded bg-white px-1.5 py-1">
          <p className="text-[6px] font-semibold text-slate-700">Próximas Consultas</p>
          <div className="flex flex-1 flex-col justify-around">
            {CONSULTAS.map((c, i) => (
              <div
                key={c.paciente}
                className="cascade flex items-center justify-between gap-1"
                style={{ "--cascade-i": i + 4 } as React.CSSProperties}
              >
                <span className="truncate text-[7px] text-slate-600">{c.paciente}</span>
                <span
                  className={`shrink-0 rounded-full px-1 text-[5px] leading-[1.6] ${BADGE_MODALIDADE[c.modalidade]}`}
                >
                  {c.modalidade}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------------
 * Ícones.
 * Redesenhados aqui, e não importados do lucide-react, porque são quatro glifos
 * usados só neste mockup: importar o pacote inteiro na home custa mais que isto.
 * Correspondem a Users, Calendar, Clock e DollarSign do dashboard real.
 * ------------------------------------------------------------------------- */

const SVG = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  viewBox: "0 0 24 24",
  "aria-hidden": true,
} as const;

function IconeUsuarios({ className }: { className?: string }) {
  return (
    <svg {...SVG} className={className}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function IconeCalendario({ className }: { className?: string }) {
  return (
    <svg {...SVG} className={className}>
      <path d="M8 2v4M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}

function IconeRelogio({ className }: { className?: string }) {
  return (
    <svg {...SVG} className={className}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}

function IconeCifra({ className }: { className?: string }) {
  return (
    <svg {...SVG} className={className}>
      <path d="M12 2v20" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}
