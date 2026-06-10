import { ArrowUpRight } from "lucide-react";
import { waLink } from "@/lib/site";
import { Fireflies } from "./Fireflies";

const WHATSAPP_LICITACOES = waLink(
  "Quero conversar sobre vender software/licenças por licitação pública.",
);

const partners = [
  {
    acronym: "FAEPI",
    name: "Fundação de Amparo à Pesquisa do Piauí",
    caption: "Teresina / PI",
  },
  {
    acronym: "FUNDECC",
    name: "Fundação de Desenvolvimento Científico e Cultural",
    caption: "Lavras / MG",
  },
];

const facts = [
  { value: "40+", label: "licitações vencidas" },
  { value: "11+", label: "FAPs e órgãos atendidos" },
  { value: "ICP-Brasil", label: "assinatura digital" },
];

export function Licitacoes() {
  return (
    <section
      id="licitacoes"
      className="relative overflow-hidden bg-forest-900 py-20 text-bg md:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, var(--color-gold-500) 0, transparent 35%), radial-gradient(circle at 80% 80%, var(--color-forest-300) 0, transparent 40%)",
        }}
      />
      <Fireflies />
      <div className="container-tight relative">
        <div className="flex flex-col items-start gap-12 lg:flex-row lg:items-center lg:gap-20">
          <div data-reveal className="lg:max-w-md">
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-gold-300">
              Licitações públicas
            </span>
            <h2 className="mt-3 text-3xl leading-[1.1] tracking-tight text-bg md:text-4xl">
              Pipeline próprio com IA + assinatura ICP-Brasil.
            </h2>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
              {facts.map((f) => (
                <div key={f.label} className="flex flex-col">
                  <span className="font-display text-2xl text-bg">
                    {f.value}
                  </span>
                  <span className="text-xs text-bg/55">{f.label}</span>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3">
              <a
                href={WHATSAPP_LICITACOES}
                target="_blank"
                rel="noopener"
                className="group inline-flex items-center gap-1.5 rounded-full border border-gold-500/60 px-5 py-2.5 text-sm font-medium text-gold-300 transition-colors hover:border-gold-300 hover:bg-gold-500/10"
              >
                Falar sobre licitações
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href="mailto:contato@tribesolutions.com.br?subject=Licita%C3%A7%C3%B5es"
                className="text-sm text-bg/70 underline decoration-bg/30 underline-offset-4 transition-colors hover:text-bg hover:decoration-bg/60"
              >
                ou por e-mail
              </a>
            </div>
          </div>

          <div
            data-reveal
            style={{ "--reveal-delay": "150ms" } as React.CSSProperties}
            className="flex-1"
          >
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-bg/60">
              Parceiras de referência
            </p>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {partners.map((p) => (
                <div
                  key={p.acronym}
                  className="flex items-center gap-4 rounded-xl border border-bg/10 bg-bg/[0.03] px-5 py-4 backdrop-blur-sm"
                >
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-gold-500/30 bg-gold-500/10 font-display text-[11px] font-medium tracking-tight text-gold-300">
                    {p.acronym}
                  </span>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-bg">
                      {p.name}
                    </span>
                    <span className="mt-0.5 text-xs text-bg/55">
                      {p.caption}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
