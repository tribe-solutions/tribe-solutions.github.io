import { Mail, Phone, MapPin } from "lucide-react";

const WHATSAPP_HREF =
  "https://wa.me/5592993531716?text=Ol%C3%A1%2C%20vim%20do%20site%20da%20Tribe%20Solutions.";

export function Contact() {
  return (
    <section id="contato" className="py-20 md:py-28">
      <div className="container-tight">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <span className="text-xs font-medium uppercase tracking-[0.18em] text-forest-500">
            Contato
          </span>
          <h2 className="mt-3 text-balance text-3xl leading-[1.1] tracking-tight text-ink md:text-5xl">
            Conte o problema. <br className="hidden sm:block" />
            A gente devolve um plano.
          </h2>

          <div className="mt-10 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-bg transition-colors hover:bg-forest-700"
            >
              <Phone className="h-4 w-4" strokeWidth={1.75} />
              WhatsApp
            </a>
            <a
              href="mailto:contato@tribesolutions.com.br"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-line-strong bg-bg-elevated px-6 py-3.5 text-sm font-medium text-ink transition-colors hover:border-ink"
            >
              <Mail className="h-4 w-4" strokeWidth={1.75} />
              contato@tribesolutions.com.br
            </a>
          </div>

          <div className="mt-10 flex items-start gap-3 text-sm text-ink-muted">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-ink-faint" strokeWidth={1.75} />
            <span className="text-left">
              Av. Dr. Theomario Pinto da Costa, 811 — Sala 802
              <br />
              Skye Platinum Offices, Chapada · Manaus / AM
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
