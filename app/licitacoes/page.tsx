import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { listarPaginas } from "@/lib/licitacoes";
import { waLink } from "@/lib/site";

const DESCRICAO =
  "O que o governo compra do seu ramo no Amazonas e em Roraima, com número, período e fonte. Para pequena empresa que quer vender para o governo.";

export const metadata: Metadata = {
  title: "Licitação para pequenas empresas",
  description: DESCRICAO,
  alternates: { canonical: "/licitacoes" },
  openGraph: {
    type: "website",
    url: "/licitacoes",
    title: "Licitação para pequenas empresas · Tribe Solutions",
    description: DESCRICAO,
  },
};

export default function LicitacoesPage() {
  const paginas = listarPaginas();

  return (
    <>
      <Nav />
      <main className="flex-1 py-20 md:py-28">
        <div className="container-tight">
          <header className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-forest-500">
              Licitações
            </span>
            <h1 className="mt-3 text-balance text-3xl leading-[1.1] tracking-tight text-ink md:text-5xl">
              O governo compra o que você vende.
            </h1>
            <p className="mt-5 text-pretty text-base leading-relaxed text-ink-muted md:text-lg">
              Prefeituras, secretarias e universidades compram todo dia de empresas pequenas. Escolha o seu ramo e veja
              quanto foi comprado, de quem e o que está aberto agora.
            </p>
          </header>

          {paginas.length > 0 && (
            <ul className="mx-auto mt-14 grid max-w-3xl gap-4 sm:grid-cols-2">
              {paginas.map((p) => (
                <li key={`${p.ramo}/${p.uf}`}>
                  <Link
                    href={`/licitacoes/${p.ramo}/${p.uf}`}
                    className="group flex h-full items-center justify-between rounded-2xl border border-line bg-bg-elevated p-5 transition-colors hover:border-forest-500"
                  >
                    <span className="text-ink">
                      {p.ramo_nome} <span className="text-ink-faint">· {p.uf.toUpperCase()}</span>
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-forest-500" />
                  </Link>
                </li>
              ))}
            </ul>
          )}

          <section className="mx-auto mt-14 max-w-2xl rounded-2xl border border-forest-500 p-6 text-center md:p-8">
            <h2 className="text-xl text-ink">Quanto a sua empresa deixou na mesa?</h2>
            <p className="mt-2 text-ink-muted">
              Mande o CNPJ no WhatsApp e receba o raio-x do seu ramo.{" "}
              <Link href="/licitacoes/raio-x" className="underline">
                Como funciona
              </Link>
            </p>
            <a
              href={waLink("Quero meu raio-x")}
              target="_blank"
              rel="noopener"
              data-umami-event="licitacoes-cta-raiox"
              data-umami-event-pagina="licitacoes"
              className="mt-5 inline-flex items-center gap-1 font-medium text-forest-500"
            >
              Quero meu raio-x
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
