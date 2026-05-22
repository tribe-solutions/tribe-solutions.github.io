import {
  Code2,
  Cloud,
  Smartphone,
  MessageSquare,
  Gavel,
  ShoppingBag,
} from "lucide-react";

const services = [
  { icon: Code2, label: "Web" },
  { icon: Smartphone, label: "Mobile" },
  { icon: Cloud, label: "Cloud" },
  { icon: MessageSquare, label: "Bots" },
  { icon: Gavel, label: "Licitação" },
  { icon: ShoppingBag, label: "Licenças" },
];

export function Services() {
  return (
    <section id="servicos" className="border-y border-line/60 bg-bg-elevated py-16 md:py-20">
      <div className="container-tight">
        <p className="text-center text-xs font-medium uppercase tracking-[0.18em] text-forest-500">
          O que fazemos
        </p>
        <div className="mt-8 grid grid-cols-3 gap-2 md:grid-cols-6 md:gap-3">
          {services.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-3 rounded-xl border border-line/60 bg-bg p-5 transition-colors hover:border-forest-500 hover:bg-forest-50"
            >
              <Icon className="h-6 w-6 text-forest-700" strokeWidth={1.5} />
              <span className="text-sm font-medium text-ink">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
