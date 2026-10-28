import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { AtenuxInbox } from "./AtenuxInbox";
import { ATENUX_WHATSAPP_NUMBER, waLink } from "@/lib/site";

/** Cai no número oficial da Tribe, dentro da própria Atenux: o lead já é atendido pelo produto. */
export const WHATSAPP_ATENUX = waLink(
  "Quero conhecer a Atenux para o atendimento da minha empresa.",
  ATENUX_WHATSAPP_NUMBER,
);

const pontos = [
  "O time inteiro atende pelo mesmo número de WhatsApp",
  "Cada conversa com responsável, histórico e etiqueta",
  "IA opcional que acolhe e passa para uma pessoa com o resumo",
];

export function Atenux() {
  return (
    <section id="atenux" className="py-20 md:py-28">
      <div className="container-tight">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <div data-reveal>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-forest-500">
              Produto próprio · Atenux
            </p>
            <h2 className="mt-3 text-balance text-3xl leading-[1.1] tracking-tight text-ink md:text-4xl">
              O WhatsApp da empresa não cabe mais num celular só.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-muted">
              A Atenux é a nossa plataforma de atendimento: WhatsApp, Instagram e o chat do
              site numa caixa de entrada só, para ninguém mais perguntar quem respondeu o
              cliente.
            </p>
            <ul className="mt-6 flex flex-col gap-2.5">
              {pontos.map((p) => (
                <li key={p} className="flex gap-3 text-ink-muted">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-forest-500" />
                  {p}
                </li>
              ))}
            </ul>
            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
              <a
                href={WHATSAPP_ATENUX}
                target="_blank"
                rel="noopener"
                data-umami-event="atenux-whatsapp"
                data-umami-event-origem="home"
                className="inline-flex items-center gap-2 rounded-full bg-forest-500 px-6 py-3 text-sm font-medium text-bg transition-all duration-300 ease-out-quart hover:-translate-y-0.5 hover:bg-forest-700"
              >
                Quero ver funcionando
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <Link
                href="/atenux"
                className="group inline-flex items-center gap-1.5 text-sm text-ink-muted transition-colors hover:text-ink"
              >
                Como funciona
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>

          <figure data-reveal style={{ "--reveal-delay": "150ms" } as React.CSSProperties}>
            <AtenuxInbox compacto />
            <figcaption className="mt-3 text-sm text-ink-faint">
              Reconstrução da caixa de entrada com dados de exemplo.
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
