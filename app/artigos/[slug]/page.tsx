import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { buscarArtigo, listarArtigos } from "@/lib/artigos";
import { formatarData } from "@/lib/formatar";
import { articleJsonLd } from "@/lib/structured-data";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return listarArtigos().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const artigo = buscarArtigo(slug);
  if (!artigo) return {};

  const url = `/artigos/${artigo.slug}`;
  return {
    title: artigo.title,
    description: artigo.description,
    keywords: artigo.keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: artigo.title,
      description: artigo.description,
      publishedTime: artigo.date,
      modifiedTime: artigo.updated ?? artigo.date,
    },
  };
}

export default async function ArtigoPage({ params }: Props) {
  const { slug } = await params;
  const artigo = buscarArtigo(slug);
  if (!artigo) notFound();

  return (
    <>
      <Nav />
      <main className="flex-1 py-16 md:py-24">
        <article className="container-tight">
          <header className="mx-auto max-w-2xl">
            <Link
              href="/artigos"
              className="inline-flex items-center gap-1.5 text-sm text-ink-muted transition-colors hover:text-ink"
            >
              <ArrowLeft className="h-4 w-4" />
              Artigos
            </Link>
            <h1 className="mt-6 text-balance text-3xl leading-[1.15] tracking-tight text-ink md:text-4xl">
              {artigo.title}
            </h1>
            <div className="mt-4 flex items-center gap-3 text-sm text-ink-faint">
              <time dateTime={artigo.date}>{formatarData(artigo.date)}</time>
              <span aria-hidden>·</span>
              <span>{artigo.minutos} min de leitura</span>
            </div>
          </header>

          <div
            className="prose-tribe mx-auto mt-12 max-w-2xl"
            dangerouslySetInnerHTML={{ __html: artigo.html }}
          />
        </article>
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd(artigo)),
        }}
      />
    </>
  );
}
