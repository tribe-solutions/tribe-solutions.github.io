import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { buscarPagina, listarPaginas } from "@/lib/licitacoes";
import { formatarData, formatarNumero } from "@/lib/formatar";
import { licitacaoJsonLd } from "@/lib/structured-data";
import { waLink } from "@/lib/site";

type Props = { params: Promise<{ ramo: string; uf: string }> };

/** Só existe a página que o JSON trouxe; o resto é 404 no export. */
export const dynamicParams = false;

/**
 * Com `output: "export"` o Next não aceita lista vazia, e sem JSON (o site
 * hoje) a lista é vazia. O par reservado vira só um 404 sem índice.
 */
const VAZIO = { ramo: "_", uf: "_" };

export function generateStaticParams() {
  const params = listarPaginas().map((p) => ({ ramo: p.ramo, uf: p.uf }));
  return params.length ? params : [VAZIO];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { ramo, uf } = await params;
  const p = buscarPagina(ramo, uf);
  if (!p) return { robots: { index: false } };

  const url = `/licitacoes/${p.ramo}/${p.uf}`;
  const title = `Licitação de ${p.ramo_nome.toLowerCase()} no ${p.uf_nome}`;
  return {
    title,
    description: p.descricao,
    alternates: { canonical: url },
    openGraph: { type: "website", url, title, description: p.descricao },
  };
}

export default async function LicitacaoRamoUfPage({ params }: Props) {
  const { ramo, uf } = await params;
  const p = buscarPagina(ramo, uf);
  if (!p) notFound();

  const periodo = `${formatarData(p.periodo.inicio)} a ${formatarData(p.periodo.fim)}`;

  return (
    <>
      <Nav />
      <main className="flex-1 py-16 md:py-24">
        <article className="container-tight mx-auto max-w-2xl">
          <Link
            href="/licitacoes"
            className="inline-flex items-center gap-1.5 text-sm text-ink-muted transition-colors hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4" />
            Licitações por ramo
          </Link>
          <h1 className="mt-6 text-balance text-3xl leading-[1.15] tracking-tight text-ink md:text-4xl">
            Licitação de {p.ramo_nome.toLowerCase()} no {p.uf_nome}
          </h1>
          <p className="mt-4 text-sm text-ink-faint">
            Atualizado em <time dateTime={p.atualizado}>{formatarData(p.atualizado)}</time>
          </p>

          <dl className="mt-10 grid gap-4 sm:grid-cols-3">
            {p.numeros.map((n) => (
              <div key={n.rotulo} className="rounded-2xl border border-line bg-bg-elevated p-5">
                <dd className="text-2xl text-ink">{formatarNumero(n.valor, n.formato)}</dd>
                <dt className="mt-1 text-sm text-ink-muted">{n.rotulo}</dt>
              </div>
            ))}
          </dl>
          <p className="mt-3 text-xs text-ink-faint">
            Período: {periodo}. Fonte:{" "}
            <a href={p.fonte.url} target="_blank" rel="noopener" className="underline">
              {p.fonte.nome}
            </a>
            .
          </p>

          <div className="prose-tribe mt-10">
            {p.abertura.split(/\n\s*\n/).map((par) => (
              <p key={par}>{par}</p>
            ))}
          </div>

          {p.compras_abertas.length > 0 && (
            <section className="mt-12">
              <h2 className="text-xl text-ink md:text-2xl">Compras abertas recentes</h2>
              <ul className="mt-4 flex flex-col gap-3">
                {p.compras_abertas.map((c) => (
                  <li key={c.url + c.objeto} className="rounded-2xl border border-line p-4">
                    <a href={c.url} target="_blank" rel="noopener" className="text-ink hover:underline">
                      {c.objeto}
                    </a>
                    <p className="mt-1 text-sm text-ink-muted">
                      {c.orgao} · prazo {formatarData(c.prazo)}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {p.perguntas.length > 0 && (
            <section className="mt-12">
              <h2 className="text-xl text-ink md:text-2xl">Perguntas frequentes</h2>
              {p.perguntas.map((q) => (
                <div key={q.pergunta} className="mt-5">
                  <h3 className="font-medium text-ink">{q.pergunta}</h3>
                  <p className="mt-1 text-ink-muted">{q.resposta}</p>
                </div>
              ))}
            </section>
          )}

          <section className="mt-14 rounded-2xl border border-forest-500 p-6 md:p-8">
            <h2 className="text-xl text-ink">Quanto a sua empresa deixou na mesa?</h2>
            <p className="mt-2 text-ink-muted">
              Mande o CNPJ no WhatsApp e receba o raio-x do seu ramo: o que o governo comprou e o que está aberto agora.
            </p>
            <a
              href={waLink("Quero meu raio-x")}
              target="_blank"
              rel="noopener"
              data-umami-event="licitacoes-cta-raiox"
              data-umami-event-pagina={`${p.ramo}/${p.uf}`}
              className="mt-5 inline-flex items-center gap-1 font-medium text-forest-500"
            >
              Quero meu raio-x
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </section>
        </article>
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(licitacaoJsonLd(p)).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
