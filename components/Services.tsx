import {
  Code2,
  Cloud,
  Smartphone,
  MessageSquare,
  Gavel,
  ShoppingBag,
} from "lucide-react";
import { waLink } from "@/lib/site";

const services = [
  {
    icon: Code2,
    label: "Web",
    message: "Tenho interesse em desenvolver um sistema web sob medida.",
  },
  {
    icon: Smartphone,
    label: "Mobile",
    message:
      "Tenho uma ideia de aplicativo mobile e queria conversar sobre o projeto.",
  },
  {
    icon: Cloud,
    label: "Cloud",
    message: "Quero conversar sobre infraestrutura cloud para meu projeto.",
  },
  {
    icon: MessageSquare,
    label: "Bots",
    message: "Quero automatizar atendimento ou processos via WhatsApp.",
  },
  {
    icon: Gavel,
    label: "Licitação",
    message:
      "Quero conversar sobre vender software/licenças por licitação pública.",
  },
  {
    icon: ShoppingBag,
    label: "Licenças",
    message:
      "Quero conversar sobre fornecimento de licenças de software via licitação.",
  },
];

export function Services() {
  return (
    <section id="servicos" className="border-y border-line/60 bg-bg-elevated py-16 md:py-20">
      <div className="container-tight">
        <h2
          data-reveal
          className="text-center font-sans text-xs font-medium uppercase tracking-[0.18em] text-forest-500"
        >
          O que fazemos
        </h2>
        <div className="mt-8 grid grid-cols-3 gap-2 md:grid-cols-6 md:gap-3">
          {services.map(({ icon: Icon, label, message }, i) => (
            <a
              key={label}
              href={waLink(message)}
              target="_blank"
              rel="noopener"
              data-reveal
              style={{ "--reveal-delay": `${i * 60}ms` } as React.CSSProperties}
              className="flex flex-col items-center gap-3 rounded-xl border border-line/60 bg-bg p-5 transition-all duration-300 ease-out-quart hover:-translate-y-0.5 hover:border-forest-500 hover:bg-forest-50 hover:shadow-[0_16px_40px_-24px_rgba(15,27,21,0.35)]"
            >
              <Icon className="h-6 w-6 text-forest-700" strokeWidth={1.5} />
              <span className="text-sm font-medium text-ink">{label}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
