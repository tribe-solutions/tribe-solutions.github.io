import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Funil } from "@/components/case/Funil";
import { Fluxo } from "@/components/case/Fluxo";
import { waLink } from "@/lib/site";

const TITULO = "Bora Licitar — 8.257 registros varridos, 10 chegaram na mesa";
const DESCRICAO =
  "Onze agentes de IA com nome de lenda amazônica varrem, triam, orçam, assinam e aprendem. Dois portões humanos. Três pessoas operam.";

export const metadata: Metadata = {
  title: "Bora Licitar — 11 agentes de IA em licitação pública",
  description: DESCRICAO,
  alternates: { canonical: "/cases/bora-licitar" },
  openGraph: {
    type: "article",
    url: "/cases/bora-licitar",
    title: TITULO,
    description: DESCRICAO,
    // Repetido de propósito: no Next o openGraph do filho SUBSTITUI o do pai,
    // não faz merge. Sem esta linha a página vai pro WhatsApp sem imagem.
    images: [{ url: "/og-banner.png", width: 1200, height: 630, alt: "Tribe Solutions" }],
  },
};

/**
 * Cards dos agentes — arte que já existe no Escritório da Floresta.
 * Faltam Uirapuru, Harpia e Tucuxi: entraram na frota depois da leva de arte.
 */
const CARDS = [
  { slug: "curupira", nome: "Curupira" },
  { slug: "boitata", nome: "Boitatá" },
  { slug: "iara", nome: "Iara" },
  { slug: "muiraquita", nome: "Muiraquitã" },
  { slug: "tucunare", nome: "Tucunaré" },
  { slug: "mapinguari", nome: "Mapinguari" },
  { slug: "boto", nome: "Boto" },
  { slug: "saci", nome: "Saci" },
];

/**
 * Reconstruções fiéis dos dois boards, com dados de exemplo.
 *
 * Por que não a captura de tela real: o board de entrega expõe cliente, número
 * de processo e valor contratado — a tabela de preços da Tribe para quem disputa
 * a mesma licitação. As colunas, o fluxo e os agentes são os de verdade; o
 * conteúdo dos cards é ilustrativo, e a legenda diz isso.
 * Gerador em `scratchpad/mock/gerar.mjs` (cores amostradas do board real).
 */
const PRINTS = [
  {
    src: "/cases/bora-licitar/board-licitacoes.webp",
    alt: "Reconstrução do board de licitações da Tribe, com as colunas do pipeline e cards de exemplo",
    legenda:
      "As dez colunas do pipeline de licitação, do rastreio ao contrato ganho. Cada card mostra o agente que está com ele naquele momento. Colunas [auto] andam sozinhas; [manual] esperam uma pessoa.",
    largura: 1920,
    altura: 806,
  },
  {
    src: "/cases/bora-licitar/board-delivery.webp",
    alt: "Reconstrução do board de entrega da Tribe, com cards de exemplo",
    legenda:
      "Ganhou, e a entrega nasce sozinha do outro lado — da ordem de fornecimento até o pagamento e o monitoramento da vigência. Reconstrução com dados de exemplo: os cards reais trazem cliente, processo e valor contratado.",
    largura: 1920,
    altura: 466,
  },
];

export default function BoraLicitarCase() {
  return (
    <>
      <ScrollReveal />
      <Nav />
      <main className="flex-1">
        {/* ---------- Abertura ---------- */}
        <section className="py-16 md:py-24">
          <div className="container-tight">
            <div data-reveal className="max-w-3xl">
              <Link
                href="/#cases"
                className="inline-flex items-center gap-1.5 text-sm text-ink-muted transition-colors hover:text-ink"
              >
                <ArrowLeft className="h-4 w-4" />
                Cases
              </Link>

              <p className="mt-6 text-xs font-medium uppercase tracking-[0.18em] text-forest-500">
                SaaS · GovTech · Produto próprio
              </p>
              <h1 className="mt-3 text-balance text-4xl leading-[1.08] tracking-tight text-ink md:text-6xl">
                8.257 registros varridos. <br className="hidden sm:block" />
                Dez chegaram na mesa.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-muted">
                A operação de licitações da própria Tribe: onze agentes de IA com nome de
                lenda amazônica, dois portões humanos e uma equipe de três pessoas.
              </p>
            </div>
          </div>

          {/* Faixa sangrada: a cena estabelece o mundo antes de a página explicá-lo.
              `object-cover` recorta o céu conforme a altura — a linha dos agentes
              fica sempre visível porque a âncora está abaixo do centro. */}
          <figure data-reveal className="mt-14 md:mt-20">
            <Image
              src="/cases/bora-licitar/escritorio-da-floresta.webp"
              alt="Escritório da Floresta: cena em pixel art com os agentes da Tribe reunidos sob um céu estrelado, à beira do rio"
              width={2200}
              height={1237}
              priority
              sizes="100vw"
              className="h-[16rem] w-full bg-[#0b1020] object-cover object-[center_84%] sm:h-[20rem] lg:h-[27rem]"
            />
            <figcaption className="container-tight mt-3 text-sm text-ink-faint">
              O Escritório da Floresta — a tela que a equipe usa para ver a frota inteira de
              uma vez.{" "}
              <a
                href="https://kanban.boralicitar.com/agentes/escritorio.html"
                target="_blank"
                rel="noopener"
                data-umami-event="case-escritorio"
                className="text-forest-500 underline decoration-line-strong underline-offset-4 transition-colors hover:text-forest-700"
              >
                Está no ar, aberta
              </a>
              .
            </figcaption>
          </figure>
        </section>

        {/* ---------- Funil ---------- */}
        <section className="border-y border-line bg-bg-elevated py-16 md:py-24">
          <div className="container-tight">
            <div data-reveal className="mb-12 max-w-xl">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-forest-500">
                O problema
              </p>
              <h2 className="mt-3 text-3xl tracking-tight text-ink md:text-4xl">
                O gargalo não é decidir. É ler.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-ink-muted">
                Para cada licitação que vale a pena passam centenas que não valem, e você só
                sabe qual é qual depois de abrir o edital. Ou contrata gente para ler o dia
                inteiro, ou deixa passar.
              </p>
            </div>
            <div data-reveal>
              <Funil />
            </div>
          </div>
        </section>

        {/* ---------- A frota ---------- */}
        <section className="py-16 md:py-24">
          <div className="container-tight">
            <div data-reveal className="max-w-xl">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-forest-500">
                O Escritório da Floresta
              </p>
              <h2 className="mt-3 text-3xl tracking-tight text-ink md:text-4xl">
                Onze agentes, uma responsabilidade cada.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-ink-muted">
                Nenhum é esperto sozinho. O ganho vem de a saída de um ser a entrada do
                seguinte, e de cada um poder quebrar sem derrubar os outros.
              </p>
            </div>

            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {CARDS.map((c, i) => (
                <Image
                  key={c.slug}
                  src={`/cases/bora-licitar/agentes/${c.slug}.webp`}
                  alt={`Card do agente ${c.nome}`}
                  width={640}
                  height={384}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  data-reveal
                  style={{ "--reveal-delay": `${(i % 4) * 70}ms` } as React.CSSProperties}
                  className="h-auto w-full rounded-xl"
                />
              ))}
            </div>
          </div>
        </section>

        {/* ---------- Fluxo + portões ---------- */}
        <section className="border-y border-line bg-forest-900 py-16 text-bg md:py-24">
          <div className="container-tight">
            <div data-reveal className="mx-auto mb-14 max-w-2xl text-center">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-gold-300">
                O fluxo
              </p>
              <h2 className="mt-3 text-balance text-3xl tracking-tight text-bg md:text-4xl">
                Dois portões. Nem um a mais, nem um a menos.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-bg/70">
                A pergunta que todo mundo faz sobre automação é onde a pessoa continua
                necessária. Aqui a resposta está desenhada no sistema, não na boa vontade de
                quem opera.
              </p>
            </div>
            <Fluxo />
          </div>
        </section>

        {/* ---------- Prints ---------- */}
        <section className="py-16 md:py-24">
          <div className="container-tight">
            <div data-reveal className="max-w-xl">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-forest-500">
                Por dentro
              </p>
              <h2 className="mt-3 text-3xl tracking-tight text-ink md:text-4xl">
                O sistema rodando.
              </h2>
            </div>
            <div className="mt-12 grid gap-12">
              {PRINTS.map((p, i) => (
                <figure
                  key={p.src}
                  data-reveal
                  style={{ "--reveal-delay": `${i * 70}ms` } as React.CSSProperties}
                >
                  <div className="overflow-hidden rounded-2xl border border-line bg-forest-900">
                    <Image
                      src={p.src}
                      alt={p.alt}
                      width={p.largura}
                      height={p.altura}
                      sizes="(max-width: 1024px) 100vw, 72rem"
                      className="h-auto w-full"
                    />
                  </div>
                  <figcaption className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-faint">
                    {p.legenda}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- O ganho + chamada ---------- */}
        <section className="border-t border-line bg-forest-50 py-16 md:py-24">
          <div className="container-tight">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
              <div data-reveal>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-forest-500">
                  O ganho
                </p>
                <h2 className="mt-3 text-3xl tracking-tight text-ink md:text-4xl">
                  Três pessoas. Esse volume.
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-ink-muted">
                  Uma operação de licitação convencional resolve isso com equipe de triagem:
                  gente lendo edital, montando planilha, conferindo prazo. É a razão de a
                  maior parte das empresas pequenas simplesmente não participar — a folha não
                  fecha antes da primeira licitação ganha.
                </p>
                <p className="mt-4 text-lg leading-relaxed text-ink-muted">
                  O que mudou não foi a velocidade de cada tarefa. Foi o humano só aparecer
                  nos dois pontos onde a decisão é dele.
                </p>
              </div>

              <div data-reveal className="lg:pt-16">
                <h2 className="text-balance text-3xl leading-[1.15] tracking-tight text-ink md:text-4xl">
                  Licitação foi o nosso problema. Qual é o seu?
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-ink-muted">
                  A mecânica não tem nada de específico de licitação: chega volume, alguém
                  lê, calcula e decide, e o resultado precisa voltar para melhorar a próxima.
                  Pedido que chega por WhatsApp e é digitado à mão, ordem de serviço em papel,
                  orçamento que depende de uma pessoa só — é o mesmo desenho com outro nome.
                </p>
                <a
                  href={waLink(
                    "Vi o case do Bora Licitar e queria conversar sobre automatizar um processo aqui.",
                  )}
                  target="_blank"
                  rel="noopener"
                  data-umami-event="case-whatsapp"
                  data-umami-event-case="bora-licitar"
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-forest-500 px-7 py-3.5 text-sm font-medium text-bg transition-all duration-300 ease-out-quart hover:-translate-y-0.5 hover:bg-forest-700"
                >
                  Falar sobre o meu processo
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
