import type { Metadata } from "next";
import { HERMES_WHATSAPP_NUMBER, waLink } from "@/lib/site";
import WhatsAppRedirect from "./WhatsAppRedirect";

/**
 * Atalho tribesolutions.com.br/whatsapp: cai direto no WhatsApp do Hermes.
 * O site é export estático (GitHub Pages), então não há redirect de servidor;
 * o redirect sai pelo client depois de registrar o evento no Umami. A origem
 * vem de ?src= (ex.: /whatsapp?src=story), padrão "instagram".
 */
export const metadata: Metadata = {
  title: "WhatsApp",
  description: "Converse com a Tribe Solutions no WhatsApp.",
  robots: { index: false, follow: false },
};

const HREF = waLink("Vim pelo Instagram.", HERMES_WHATSAPP_NUMBER);

export default function WhatsAppPage() {
  return (
    <main className="mx-auto flex min-h-[60vh] w-full max-w-md flex-col items-center justify-center px-4 py-12 text-center">
      <noscript>
        <meta httpEquiv="refresh" content={`0;url=${HREF}`} />
      </noscript>
      <p className="text-ink-muted">Abrindo o WhatsApp da Tribe…</p>
      <a
        href={HREF}
        className="mt-6 rounded-full bg-ink px-6 py-4 font-medium text-bg transition-colors hover:bg-forest-700"
      >
        Abrir conversa
      </a>
      <WhatsAppRedirect href={HREF} />
    </main>
  );
}
