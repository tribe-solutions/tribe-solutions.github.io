import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

type CaseItem = {
  name: string;
  href: string;
  domain: string;
  tag: string;
  image?: string;
  imageAlt?: string;
  mockup?: "boralicitar";
};

const cases: CaseItem[] = [
  {
    name: "Bora Licitar",
    href: "https://kanban.boralicitar.com",
    domain: "kanban.boralicitar.com",
    tag: "SaaS · GovTech",
    mockup: "boralicitar",
  },
  {
    name: "Mundo Vivido",
    href: "https://psimundovivido.com.br",
    domain: "psimundovivido.com.br",
    tag: "Site institucional",
    image: "/cases/mundovivido.webp",
    imageAlt: "Site da psicóloga Paula Vitória",
  },
  {
    name: "Anmar",
    href: "https://anmar.agr.br",
    domain: "anmar.agr.br",
    tag: "Marca · Agro",
    image: "/cases/anmar.webp",
    imageAlt: "Site da marca Anmar de queijo coalho artesanal",
  },
];

export function Cases() {
  return (
    <section id="cases" className="py-20 md:py-28">
      <div className="container-tight">
        <div data-reveal className="mb-12 flex items-end justify-between gap-6">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-forest-500">
              Cases
            </p>
            <h2 className="mt-2 text-3xl tracking-tight text-ink md:text-4xl">
              No ar agora.
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {cases.map((c, i) => (
            <a
              key={c.name}
              href={c.href}
              target="_blank"
              rel="noopener"
              data-reveal
              style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}
              className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-bg-elevated transition-all duration-300 ease-out-quart hover:-translate-y-1 hover:border-forest-500 hover:shadow-[0_24px_60px_-30px_rgba(15,27,21,0.3)]"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-forest-50">
                {c.image ? (
                  <Image
                    src={c.image}
                    alt={c.imageAlt ?? c.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                ) : c.mockup === "boralicitar" ? (
                  <BoraLicitarMockup />
                ) : null}
              </div>

              <div className="flex items-center justify-between gap-3 p-5">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-ink-faint">
                    {c.tag}
                  </span>
                  <span className="font-display text-xl tracking-tight text-ink">
                    {c.name}
                  </span>
                  <span className="text-xs text-ink-muted">{c.domain}</span>
                </div>
                <ArrowUpRight className="h-5 w-5 shrink-0 text-ink-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-forest-700" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function BoraLicitarMockup() {
  const columns = [
    { title: "Novas", count: 6, accent: "bg-forest-300/40" },
    { title: "Avaliando", count: 3, accent: "bg-gold-300/60" },
    { title: "Assinar", count: 2, accent: "bg-gold-500/70" },
    { title: "Ganhas", count: 12, accent: "bg-forest-500/70" },
  ];
  return (
    <div className="absolute inset-0 flex flex-col gap-2 bg-gradient-to-br from-forest-900 to-forest-700 p-4">
      <div className="flex items-center gap-1.5">
        <span className="h-2 w-2 rounded-full bg-red-400/70" />
        <span className="h-2 w-2 rounded-full bg-yellow-300/70" />
        <span className="h-2 w-2 rounded-full bg-green-300/70" />
        <span className="ml-2 truncate text-[10px] text-bg/40">
          kanban.boralicitar.com
        </span>
      </div>
      <div className="grid flex-1 grid-cols-4 gap-1.5">
        {columns.map((col, ci) => (
          <div
            key={col.title}
            className="flex flex-col gap-1.5 rounded-md bg-bg/[0.04] p-1.5"
          >
            <div className="flex items-center justify-between">
              <span className="text-[8px] font-medium uppercase tracking-wider text-bg/55">
                {col.title}
              </span>
              <span className="rounded bg-bg/10 px-1 text-[8px] font-medium text-bg/55">
                {col.count}
              </span>
            </div>
            {Array.from({ length: Math.min(col.count, 3) }).map((_, i) => (
              <div
                key={i}
                className="cascade flex flex-col gap-1 rounded-sm bg-bg/[0.08] p-1.5"
                style={{ "--cascade-i": ci + i * 2 } as React.CSSProperties}
              >
                <div className={`h-0.5 w-2/3 rounded ${col.accent}`} />
                <div className="h-0.5 w-full rounded bg-bg/15" />
                <div className="h-0.5 w-1/2 rounded bg-bg/15" />
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between text-[9px] text-bg/50">
        <span className="inline-flex items-center gap-1">
          <span className="h-1 w-1 animate-pulse rounded-full bg-gold-300" />
          IA triando
        </span>
        <span>ICP-Brasil ✓</span>
      </div>
    </div>
  );
}
