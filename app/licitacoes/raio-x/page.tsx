import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
const SITE_URL = "https://tribesolutions.com.br";
import { waLink } from "@/lib/site";

/**
 * Página do raio-x (PRD-raiox R7). Enquanto a API pública do R6
 * (raiox.tribesolutions.com.br/api/raiox) não estiver no ar, a página só
 * explica e leva pro WhatsApp, onde o bot faz a mesma conta pelo CNPJ.
 * A saudação do waLink cita o site: é por ela que o lead entra com origem "site".
 */
const DESCRICAO =
  "Consulte pelo CNPJ quanto o governo comprou do seu ramo no Amazonas e em Roraima, quantas compras ficaram sem fornecedor e quem ganhou. Grátis, pelo WhatsApp.";

export const metadata: Metadata = {
  title: "Raio-x de licitação pelo CNPJ",
  description: DESCRICAO,
  alternates: { canonical: "/licitacoes/raio-x" },
  openGraph: {
    type: "website",
    url: "/licitacoes/raio-x",
    title: "Raio-x de licitação pelo CNPJ · Tribe Solutions",
    description: DESCRICAO,
  },
};

const MOSTRA = [
  "Quantos itens do seu ramo os órgãos públicos compraram no período",
  "Quanto foi homologado em reais",
  "Quantos itens saíram por dispensa (compra rápida, ganha quem vê primeiro)",
  "Quantas compras ficaram sem fornecedor",
  "Quem mais vendeu para o governo no seu ramo",
  "Se a sua empresa aparece nesses contratos",
];

const PASSOS = [
  { titulo: "Chame no WhatsApp", texto: "O botão abre a conversa com a mensagem pronta. É só enviar." },
  { titulo: "Mande o CNPJ", texto: "Digite o número ou envie a foto ou o PDF do cartão CNPJ." },
  { titulo: "Receba o raio-x", texto: "Os números do seu ramo chegam ali mesmo, com período e fonte de cada um." },
];

const PERGUNTAS = [
  {
    pergunta: "O raio-x é pago?",
    resposta: "Não. O raio-x é grátis e não obriga a nada. Se quiser, alguém da Tribe mostra depois como participar das compras.",
  },
  {
    pergunta: "De onde vêm os números?",
    resposta:
      "Das compras publicadas no PNCP (Portal Nacional de Contratações Públicas) e dos dados públicos de CNPJ da Receita Federal. Cada número vem com o período e a data da leitura.",
  },
  {
    pergunta: "Minha empresa não é do Amazonas nem de Roraima. Funciona?",
    resposta:
      "Funciona com o número nacional do seu ramo. O detalhe por estado, com órgãos e fornecedores, por enquanto é só do Amazonas e de Roraima.",
  },
  {
    pergunta: "Que dados da minha empresa vocês usam?",
    resposta: "Só o CNPJ e o que já é público na Receita Federal: razão social, endereço e atividade (CNAE).",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${SITE_URL}/licitacoes/raio-x/#faq`,
  mainEntity: PERGUNTAS.map((q) => ({
    "@type": "Question",
    name: q.pergunta,
    acceptedAnswer: { "@type": "Answer", text: q.resposta },
  })),
};

function CtaWhatsApp({ local }: { local: string }) {
  return (
    <a
      href={waLink("Quero meu raio-x")}
      target="_blank"
      rel="noopener"
      data-umami-event="raiox-cta-whatsapp"
      data-umami-event-local={local}
      className="inline-flex items-center gap-2 rounded-full bg-forest-500 px-6 py-3 text-sm font-medium text-bg transition-all duration-300 ease-out-quart hover:-translate-y-0.5 hover:bg-forest-700"
    >
      Quero meu raio-x no WhatsApp
      <ArrowUpRight className="h-4 w-4" />
    </a>
  );
}

export default function RaioXPage() {
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
            Quanto a sua empresa deixou na mesa em licitação este ano?
          </h1>
          <p className="mt-5 text-pretty text-base leading-relaxed text-ink-muted md:text-lg">
            Mande o CNPJ no WhatsApp e receba o raio-x do seu ramo: o que o governo comprou, o que ficou sem fornecedor e
            quem ganhou. Grátis.
          </p>
          <div className="mt-8">
            <CtaWhatsApp local="topo" />
          </div>

          <section className="mt-14">
            <h2 className="text-xl text-ink md:text-2xl">O que o raio-x mostra</h2>
            <ul className="mt-4 flex flex-col gap-2 text-ink-muted">
              {MOSTRA.map((m) => (
                <li key={m} className="flex gap-2">
                  <span className="text-forest-500">✓</span>
                  {m}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-ink-faint">
              O ramo sai da atividade (CNAE) do seu CNPJ. Sem promessa de ganho: são as compras que já aconteceram.
            </p>
          </section>

          <section className="mt-12">
            <h2 className="text-xl text-ink md:text-2xl">Como funciona</h2>
            <ol className="mt-4 grid gap-4 sm:grid-cols-3">
              {PASSOS.map((p, i) => (
                <li key={p.titulo} className="rounded-2xl border border-line bg-bg-elevated p-5">
                  <span className="text-sm text-forest-500">{i + 1}</span>
                  <h3 className="mt-1 font-medium text-ink">{p.titulo}</h3>
                  <p className="mt-1 text-sm text-ink-muted">{p.texto}</p>
                </li>
              ))}
            </ol>
          </section>

          <section className="mt-12">
            <h2 className="text-xl text-ink md:text-2xl">Perguntas frequentes</h2>
            {PERGUNTAS.map((q) => (
              <div key={q.pergunta} className="mt-5">
                <h3 className="font-medium text-ink">{q.pergunta}</h3>
                <p className="mt-1 text-ink-muted">{q.resposta}</p>
              </div>
            ))}
          </section>

          <section className="mt-14 rounded-2xl border border-forest-500 p-6 text-center md:p-8">
            <h2 className="text-xl text-ink">O governo compra o que você vende.</h2>
            <p className="mt-2 text-ink-muted">Veja quanto, pelo seu CNPJ.</p>
            <div className="mt-5">
              <CtaWhatsApp local="rodape" />
            </div>
          </section>
        </article>
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
