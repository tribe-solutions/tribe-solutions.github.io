"use client";

import { useState } from "react";
import { ArrowUpRight, Loader2, Search } from "lucide-react";
import { waLink } from "@/lib/site";

/**
 * Campo de CNPJ da página do raio-x: chama a API pública do R6
 * (raiox.tribesolutions.com.br/api/raiox, CORS só pro site) e mostra o resumo
 * aqui mesmo. O completo, com a conversa com o time, segue no WhatsApp.
 */
const API = "https://raiox.tribesolutions.com.br/api/raiox";
const UF = { AM: "no Amazonas", RR: "em Roraima" } as Record<string, string>;
const MESES = "jan fev mar abr mai jun jul ago set out nov dez".split(" ");

type Regional = {
  uf: string;
  itens: number;
  valor_homologado: number;
  dispensa: number;
  pct_sem_fornecedor: number;
  top3: { nome: string }[];
  contratos_empresa: number;
  itens_periodo: [string, string];
};
type Resultado = {
  status: string;
  razao?: string;
  ramo?: string;
  aviso?: string | null;
  regional?: Regional | null;
  nacional?: { valor_ano: number } | null;
};

const num = (n: number) => Math.round(n).toLocaleString("pt-BR");

function reais(v: number) {
  for (const [lim, nome] of [
    [1e9, "bi"],
    [1e6, "mi"],
    [1e3, "mil"],
  ] as const) {
    if (v >= lim) return `R$ ${(v / lim).toLocaleString("pt-BR", { maximumFractionDigits: 1 })} ${nome}`;
  }
  return `R$ ${num(v)}`;
}

function periodo([de, ate]: [string, string]) {
  const a = de.replace(/-/g, ""),
    b = ate.replace(/-/g, "");
  const ini = MESES[+a.slice(4, 6) - 1] + (a.slice(0, 4) === b.slice(0, 4) ? "" : `/${a.slice(0, 4)}`);
  return `${ini} a ${MESES[+b.slice(4, 6) - 1]}/${b.slice(0, 4)}`;
}

function mascara(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 14);
  return d
    .replace(/^(\d{2})(\d)/, "$1.$2")
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2");
}

function Numero({ n, rotulo }: { n: string; rotulo: string }) {
  return (
    <div className="border-t-2 border-forest-500 pt-3">
      <dt className="font-display text-3xl tracking-tight text-ink">{n}</dt>
      <dd className="mt-1 text-sm leading-snug text-ink-muted">{rotulo}</dd>
    </div>
  );
}

export function RaioXForm() {
  const [cnpj, setCnpj] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");
  const [r, setR] = useState<Resultado | null>(null);

  async function consultar(e: React.FormEvent) {
    e.preventDefault();
    const d = cnpj.replace(/\D/g, "");
    if (d.length !== 14) {
      setErro("O CNPJ tem 14 números. Confere e tenta de novo.");
      return;
    }
    setErro("");
    setR(null);
    setCarregando(true);
    try {
      const resp = await fetch(`${API}?cnpj=${d}`);
      if (resp.status === 429) throw new Error("Muitas consultas seguidas. Espera um minuto e tenta de novo.");
      if (!resp.ok) throw new Error("O raio-x não respondeu agora. Tenta de novo ou peça pelo WhatsApp.");
      const dados: Resultado = await resp.json();
      setR(dados);
      (window as unknown as { umami?: { track: (n: string, d?: object) => void } }).umami?.track("raiox-site-consulta", {
        status: dados.status,
      });
    } catch (x) {
      setErro(x instanceof Error ? x.message : "Algo deu errado. Tenta de novo.");
    } finally {
      setCarregando(false);
    }
  }

  const g = r?.regional;
  const zap = waLink(`Fiz o raio-x no site (CNPJ ${cnpj}). Quero meu raio-x completo`);

  return (
    <div>
      <form onSubmit={consultar} className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor="cnpj" className="sr-only">
          CNPJ da empresa
        </label>
        <input
          id="cnpj"
          inputMode="numeric"
          autoComplete="off"
          placeholder="00.000.000/0000-00"
          value={cnpj}
          onChange={(e) => setCnpj(mascara(e.target.value))}
          className="w-full rounded-full border border-line-strong bg-bg-elevated px-6 py-3.5 text-base text-ink placeholder:text-ink-faint focus:border-forest-500 focus:outline-none sm:max-w-xs"
        />
        <button
          type="submit"
          disabled={carregando}
          data-umami-event="raiox-site-enviar"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-forest-500 px-7 py-3.5 text-sm font-medium text-bg transition-all duration-300 ease-out-quart hover:-translate-y-0.5 hover:bg-forest-700 disabled:opacity-60"
        >
          {carregando ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
          Ver meu raio-x
        </button>
      </form>
      {erro && <p className="mt-3 text-sm text-gold-700">{erro}</p>}

      {r && (
        <div className="mt-8 rounded-2xl border border-line bg-bg-elevated p-6 md:p-8" aria-live="polite">
          {r.status === "ok" || r.status === "fora_amrr" ? (
            <>
              <p className="text-sm text-ink-faint">{r.razao}</p>
              <p className="mt-1 font-display text-xl tracking-tight text-ink">{r.ramo}</p>
              {g ? (
                <>
                  <p className="mt-5 text-sm font-medium text-ink">
                    {UF[g.uf] ? `${UF[g.uf][0].toUpperCase()}${UF[g.uf].slice(1)}` : g.uf}, {periodo(g.itens_periodo)}
                  </p>
                  <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-5">
                    <Numero n={num(g.itens)} rotulo="itens comprados por órgãos públicos" />
                    <Numero n={reais(g.valor_homologado)} rotulo="homologados" />
                    <Numero n={num(g.dispensa)} rotulo="itens por dispensa" />
                    <Numero n={`${num(g.pct_sem_fornecedor)}%`} rotulo="ficaram sem fornecedor" />
                  </dl>
                  {g.top3.length > 0 && (
                    <p className="mt-5 text-sm text-ink-muted">
                      Quem mais vendeu: {g.top3.map((f) => f.nome).join(", ")}
                    </p>
                  )}
                  <p className="mt-3 text-sm text-ink-muted">
                    Sua empresa aparece em <strong className="text-ink">{num(g.contratos_empresa)}</strong> contratos
                    desse ramo.
                  </p>
                </>
              ) : (
                <p className="mt-4 text-sm text-ink-muted">
                  O detalhe por estado é do Amazonas e de Roraima. No resto do país, vai o número nacional:
                </p>
              )}
              {r.nacional && (
                <p className="mt-3 text-sm text-ink-muted">
                  No Brasil, o governo compra cerca de{" "}
                  <strong className="text-ink">{reais(r.nacional.valor_ano)}/ano</strong> desse ramo.
                </p>
              )}
              <p className="mt-5 text-xs text-ink-faint">Fonte: PNCP e Receita Federal.</p>
              <a
                href={zap}
                target="_blank"
                rel="noopener"
                data-umami-event="raiox-cta-whatsapp"
                data-umami-event-local="resultado"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-forest-500 px-7 py-3.5 text-sm font-medium text-bg transition-all duration-300 ease-out-quart hover:-translate-y-0.5 hover:bg-forest-700"
              >
                Quero ver como participar
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </>
          ) : (
            <p className="text-ink-muted">{r.aviso || "Não achei esse CNPJ na base. Confere o número."}</p>
          )}
        </div>
      )}
    </div>
  );
}
