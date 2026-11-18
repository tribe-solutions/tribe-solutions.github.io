import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Banknote, Building2, SearchX, ShoppingCart, Trophy, Zap } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { RaioXChat } from "@/components/RaioXChat";
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

const NUMEROS = [
  { n: "52.928", rotulo: "itens comprados por órgãos públicos no Amazonas e em Roraima" },
  { n: "10.570", rotulo: "itens por dispensa: compra rápida, ganha quem vê primeiro" },
  { n: "4.463", rotulo: "itens ficaram sem fornecedor (ninguém apareceu ou ninguém passou)" },
  { n: "126", rotulo: "órgãos compradores: prefeituras, secretarias, universidades" },
];

const MOSTRA = [
  { icon: ShoppingCart, titulo: "O que o governo comprou", texto: "Quantos itens do seu ramo os órgãos públicos compraram no período." },
  { icon: Banknote, titulo: "Quanto foi pago", texto: "O valor homologado, em reais, das compras do seu ramo." },
  { icon: Zap, titulo: "O que saiu por dispensa", texto: "Compra rápida, sem pregão: ganha quem vê primeiro e manda a proposta." },
  { icon: SearchX, titulo: "O que ficou sem fornecedor", texto: "Compras desertas ou fracassadas: o governo quis comprar e ninguém entregou." },
  { icon: Trophy, titulo: "Quem está vendendo", texto: "As empresas que mais venderam para o governo no seu ramo." },
  { icon: Building2, titulo: "Onde a sua empresa aparece", texto: "Se o seu CNPJ já está em algum contrato público desse ramo." },
];

const PASSOS = [
  { n: "01", titulo: "Chame no WhatsApp", texto: "O botão abre a conversa com a mensagem pronta. É só enviar." },
  { n: "02", titulo: "Mande o CNPJ", texto: "Digite o número ou envie a foto ou o PDF do cartão CNPJ." },
  { n: "03", titulo: "Receba o raio-x", texto: "Em cerca de um minuto, com o período e a fonte de cada número." },
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
      className="inline-flex items-center gap-2 rounded-full bg-forest-500 px-7 py-3.5 text-sm font-medium text-bg transition-all duration-300 ease-out-quart hover:-translate-y-0.5 hover:bg-forest-700"
    >
      Quero meu raio-x no WhatsApp
      <ArrowUpRight className="h-4 w-4" />
    </a>
  );
}

export default function RaioXPage() {
  return (
    <>
      <ScrollReveal />
      <Nav />
      <main className="flex-1">
        {/* ---------- Abertura ---------- */}
        <section className="py-16 md:py-24">
          <div className="container-tight">
            <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
              <div data-reveal>
                <Link
                  href="/licitacoes"
                  className="inline-flex items-center gap-1.5 text-sm text-ink-muted transition-colors hover:text-ink"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Licitações por ramo
                </Link>
                <p className="mt-6 text-xs font-medium uppercase tracking-[0.18em] text-forest-500">
                  Raio-x de licitação · grátis
                </p>
                <h1 className="mt-3 text-balance text-4xl leading-[1.08] tracking-tight text-ink md:text-5xl">
                  Quanto a sua empresa deixou na mesa em licitação este ano?
                </h1>
                <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-muted">
                  Mande o CNPJ no WhatsApp e veja o que o governo comprou do seu ramo, o que ficou sem
                  fornecedor e quem está vendendo. Com número, período e fonte.
                </p>
                <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
                  <CtaWhatsApp local="topo" />
                  <span className="text-sm text-ink-faint">Leva um minuto. Só precisa do CNPJ.</span>
                </div>
              </div>
              <figure data-reveal style={{ "--reveal-delay": "150ms" } as React.CSSProperties}>
                <RaioXChat />
                <figcaption className="mx-auto mt-4 max-w-[400px] text-center text-sm text-ink-faint">
                  Raio-x de verdade do ramo de material de construção no Amazonas. O nome da empresa é de
                  exemplo.
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* ---------- Números da base ---------- */}
        <section className="border-y border-line bg-bg-elevated py-14 md:py-20">
          <div className="container-tight">
            <div data-reveal className="max-w-xl">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-forest-500">
                Amazonas e Roraima, jan a out/2026
              </p>
              <h2 className="mt-3 text-3xl tracking-tight text-ink md:text-4xl">
                O governo compra todo dia. Pouca gente aparece.
              </h2>
            </div>
            <dl className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
              {NUMEROS.map((x, i) => (
                <div
                  key={x.n}
                  data-reveal
                  style={{ "--reveal-delay": `${i * 70}ms` } as React.CSSProperties}
                  className="border-t-2 border-forest-500 pt-4"
                >
                  <dt className="font-display text-4xl tracking-tight text-ink md:text-5xl">{x.n}</dt>
                  <dd className="mt-2 leading-relaxed text-ink-muted">{x.rotulo}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-10 text-sm text-ink-faint">
              Fonte: PNCP (Portal Nacional de Contratações Públicas), compras publicadas no Amazonas e em
              Roraima de janeiro a outubro de 2026, situação dos itens lida em 18/11/2026.
            </p>
          </div>
        </section>

        {/* ---------- O que mostra ---------- */}
        <section className="py-16 md:py-24">
          <div className="container-tight">
            <div data-reveal className="max-w-xl">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-forest-500">
                O que o raio-x mostra
              </p>
              <h2 className="mt-3 text-3xl tracking-tight text-ink md:text-4xl">
                O mercado público do seu ramo, pelo seu CNPJ.
              </h2>
              <p className="mt-4 leading-relaxed text-ink-muted">
                O ramo sai da atividade (CNAE) da empresa. Sem promessa de ganho: são compras que já
                aconteceram.
              </p>
            </div>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {MOSTRA.map(({ icon: Icon, titulo, texto }, i) => (
                <div
                  key={titulo}
                  data-reveal
                  style={{ "--reveal-delay": `${(i % 3) * 70}ms` } as React.CSSProperties}
                  className="rounded-2xl border border-line bg-bg-elevated p-6"
                >
                  <Icon className="h-6 w-6 text-forest-700" strokeWidth={1.5} />
                  <h3 className="mt-4 text-xl tracking-tight text-ink">{titulo}</h3>
                  <p className="mt-2 leading-relaxed text-ink-muted">{texto}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- Como funciona ---------- */}
        <section className="border-y border-line bg-forest-900 py-16 text-bg md:py-24">
          <div className="container-tight">
            <div data-reveal className="max-w-xl">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-forest-300">
                Como funciona
              </p>
              <h2 className="mt-3 text-3xl tracking-tight text-bg md:text-4xl">
                Três mensagens e pronto.
              </h2>
            </div>
            <ol className="mt-12 grid gap-8 md:grid-cols-3">
              {PASSOS.map((p, i) => (
                <li
                  key={p.n}
                  data-reveal
                  style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}
                >
                  <span className="font-display text-3xl text-forest-300">{p.n}</span>
                  <h3 className="mt-3 text-xl tracking-tight text-bg">{p.titulo}</h3>
                  <p className="mt-2 leading-relaxed text-bg/70">{p.texto}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ---------- Dúvidas + chamada ---------- */}
        <section className="bg-forest-50 py-16 md:py-24">
          <div className="container-tight">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
              <div data-reveal>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-forest-500">
                  Dúvidas
                </p>
                <dl className="mt-6 flex flex-col gap-6">
                  {PERGUNTAS.map((q) => (
                    <div key={q.pergunta}>
                      <dt className="font-display text-xl tracking-tight text-ink">{q.pergunta}</dt>
                      <dd className="mt-2 leading-relaxed text-ink-muted">{q.resposta}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div data-reveal className="lg:pt-10">
                <h2 className="text-balance text-3xl leading-[1.15] tracking-tight text-ink md:text-4xl">
                  O governo compra o que você vende.
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-ink-muted">
                  Veja quanto pelo seu CNPJ. Se fizer sentido, alguém da Tribe mostra depois como
                  participar das compras, com mensalidade pequena e o resto só quando você ganha.
                </p>
                <div className="mt-8">
                  <CtaWhatsApp local="rodape" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
