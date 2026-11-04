import type { Metadata } from "next";
import WhatsAppRedirect from "./WhatsAppRedirect";

/**
 * Atalho legado usado em materiais impressos: direciona para o hub de links.
 * O site é export estático (GitHub Pages), então o redirect acontece no client.
 */
export const metadata: Metadata = {
  title: "Links",
  description: "Conheça os links da Tribe Solutions.",
  robots: { index: false, follow: false },
};

export default function WhatsAppPage() {
  return (
    <main className="mx-auto flex min-h-[60vh] w-full max-w-md flex-col items-center justify-center px-4 py-12 text-center">
      <noscript>
        <meta httpEquiv="refresh" content="0;url=/links/" />
      </noscript>
      <p className="text-ink-muted">Abrindo os links da Tribe…</p>
      <a
        href="/links/"
        className="mt-6 rounded-full bg-ink px-6 py-4 font-medium text-bg transition-colors hover:bg-forest-700"
      >
        Abrir links
      </a>
      <WhatsAppRedirect />
    </main>
  );
}
