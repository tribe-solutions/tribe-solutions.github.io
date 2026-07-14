import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { listarArtigos } from "@/lib/artigos";
import { formatarData } from "@/lib/formatar";

export const metadata: Metadata = {
  title: "Artigos",
  description:
    "O que aprendemos operando licitação pública e automação com IA, escrito por quem está deste lado do balcão todo dia.",
  alternates: { canonical: "/artigos" },
  openGraph: {
    type: "website",
    url: "/artigos",
    title: "Artigos · Tribe Solutions",
    description:
      "O que aprendemos operando licitação pública e automação com IA, escrito por quem está deste lado do balcão todo dia.",
  },
};

export default function ArtigosPage() {
  const artigos = listarArtigos();

  return (
    <>
      <Nav />
      <main className="flex-1 py-20 md:py-28">
        <div className="container-tight">
          <header className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-forest-500">
              Artigos
            </span>
            <h1 className="mt-3 text-balance text-3xl leading-[1.1] tracking-tight text-ink md:text-5xl">
              O que a gente aprende operando.
            </h1>
            <p className="mt-5 text-pretty text-base leading-relaxed text-ink-muted md:text-lg">
              Licitação pública e automação com IA, escritos por quem está deste
              lado do balcão todo dia — não por quem leu sobre o assunto.
            </p>
          </header>

          <div className="mx-auto mt-14 flex max-w-3xl flex-col gap-4">
            {artigos.map((a) => (
              <Link
                key={a.slug}
                href={`/artigos/${a.slug}`}
                className="group rounded-2xl border border-line bg-bg-elevated p-6 transition-all duration-300 ease-out-quart hover:-translate-y-0.5 hover:border-forest-500 hover:shadow-[0_24px_60px_-30px_rgba(15,27,21,0.3)] md:p-8"
              >
                <div className="flex items-center gap-3 text-xs text-ink-faint">
                  <time dateTime={a.date}>{formatarData(a.date)}</time>
                  <span aria-hidden>·</span>
                  <span>{a.minutos} min de leitura</span>
                </div>
                <h2 className="mt-3 text-xl leading-snug text-ink md:text-2xl">
                  {a.title}
                </h2>
                <p className="mt-2 text-pretty text-sm leading-relaxed text-ink-muted md:text-base">
                  {a.resumo ?? a.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-forest-500">
                  Ler
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
