const partners = [
  { acronym: "FAEPI", caption: "Piauí" },
  { acronym: "FUNDECC", caption: "Parceira de referência" },
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
      className="relative overflow-hidden bg-forest-900 py-20 text-bg md:py-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, var(--color-gold-500) 0, transparent 35%), radial-gradient(circle at 80% 80%, var(--color-forest-300) 0, transparent 40%)",
        }}
      />
      <div className="container-tight relative">
        <div className="flex flex-col items-start gap-12 lg:flex-row lg:items-center lg:gap-20">
          <div className="lg:max-w-md">
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
          </div>

          <div className="flex-1">
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-bg/40">
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
                      {p.acronym === "FAEPI"
                        ? "Fundação de Amparo à Pesquisa do Piauí"
                        : "Fundação de Desenvolvimento Científico e Cultural"}
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
