export function About() {
  return (
    <section id="sobre" className="border-y border-line/60 bg-bg-elevated py-16 md:py-20">
      <div className="container-tight">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-medium uppercase tracking-[0.18em] text-forest-500">
            Sobre a Tribe
          </span>
          <h2 className="mt-3 text-balance text-3xl leading-[1.15] tracking-tight text-ink md:text-4xl">
            Engenharia séria, feita no calor da floresta.
          </h2>
          <p className="mt-5 text-pretty text-base leading-relaxed text-ink-muted md:text-lg">
            Time multidisciplinar em Manaus, atuando em projetos pelo Brasil
            todo. Nascemos atendendo Fundações de Amparo à Pesquisa e crescemos
            para um portfólio que vai de plataformas SaaS com IA a sites
            institucionais e apps mobile.
          </p>
          <div className="mt-8 inline-flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-ink-faint">
            <span>
              <span className="text-ink-muted">Diretor:</span>{" "}
              <span className="text-ink">Anderson Pimentel</span>
            </span>
            <span className="hidden h-1 w-1 rounded-full bg-line-strong md:inline-block" />
            <span>
              <span className="text-ink-muted">Sede:</span>{" "}
              <span className="text-ink">Manaus / AM</span>
            </span>
            <span className="hidden h-1 w-1 rounded-full bg-line-strong md:inline-block" />
            <span>
              <span className="text-ink-muted">Atuação:</span>{" "}
              <span className="text-ink">Brasil todo</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
