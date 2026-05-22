const stats = [
  { value: "11+", label: "Fundações de Pesquisa atendidas" },
  { value: "40+", label: "Licitações ganhas" },
  { value: "ICP-Brasil", label: "Assinatura digital certificada" },
  { value: "Manaus / BR", label: "Atuação nacional" },
];

export function TrustBar() {
  return (
    <section className="border-b border-line/60 bg-bg-elevated">
      <div className="container-tight grid grid-cols-2 divide-x divide-line/60 md:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="flex flex-col gap-1 px-4 py-7 first:pl-0 last:pr-0 md:px-8"
          >
            <span className="font-display text-2xl font-medium tracking-tight text-ink md:text-3xl">
              {s.value}
            </span>
            <span className="text-xs leading-relaxed text-ink-muted md:text-sm">
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
