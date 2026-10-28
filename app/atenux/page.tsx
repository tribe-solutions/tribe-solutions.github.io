import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Inbox,
  MapPin,
  Sparkles,
  Tags,
  UserCheck,
  Users,
} from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { AtenuxInbox } from "@/components/AtenuxInbox";
import { ATENUX_WHATSAPP_NUMBER, waLink } from "@/lib/site";

const TITULO = "Atenux: o time inteiro atendendo no mesmo WhatsApp";
const DESCRICAO =
  "Plataforma de atendimento da Tribe Solutions: WhatsApp, Instagram e chat do site numa caixa de entrada só, com responsável por conversa e IA opcional. Suporte em Manaus.";

export const metadata: Metadata = {
  title: "Atenux: plataforma de atendimento no WhatsApp para equipes",
  description: DESCRICAO,
  alternates: { canonical: "/atenux" },
  openGraph: {
    type: "website",
    url: "/atenux",
    title: TITULO,
    description: DESCRICAO,
    // Repetido de propósito: no Next o openGraph do filho SUBSTITUI o do pai.
    images: [{ url: "/og-banner.png", width: 1200, height: 630, alt: "Tribe Solutions" }],
  },
};

/** Mensagem própria da página: na chegada dá pra saber que veio daqui e não da home. */
const WHATSAPP = waLink(
  "Vi a página da Atenux no site e queria ver como ficaria o atendimento aqui.",
  ATENUX_WHATSAPP_NUMBER,
);

const dores = [
  "O WhatsApp está num celular só, e quem não está com ele não atende.",
  "Várias pessoas no mesmo WhatsApp Web, e ninguém sabe quem respondeu.",
  "O cliente volta no dia seguinte e precisa explicar tudo de novo.",
  "Fora do horário, a mensagem espera até alguém abrir o celular.",
];

const recursos = [
  {
    icon: Inbox,
    titulo: "Uma caixa de entrada só",
    texto:
      "WhatsApp, Instagram e o chat do site caem no mesmo lugar. A equipe não troca de aplicativo para atender.",
  },
  {
    icon: Users,
    titulo: "Atendentes ilimitados",
    texto:
      "Entra quem precisar atender, no mesmo número. O preço não sobe a cada pessoa nova na equipe.",
  },
  {
    icon: UserCheck,
    titulo: "Responsável por conversa",
    texto:
      "Cada conversa tem dono. Quem chega depois vê o histórico inteiro e as notas internas.",
  },
  {
    icon: Tags,
    titulo: "Etiquetas e funil",
    texto:
      "Marque orçamento, entrega, pós-venda. Quem veio de anúncio já chega etiquetado, sem ninguém marcar à mão.",
  },
  {
    icon: Sparkles,
    titulo: "IA quando fizer sentido",
    texto:
      "Módulo opcional: a Atena responde com o conhecimento da sua empresa e transfere para uma pessoa com o resumo da conversa.",
  },
  {
    icon: MapPin,
    titulo: "Suporte daqui de Manaus",
    texto:
      "Implantação feita com o seu time e, se precisar, a gente vai até a empresa. As grandes plataformas não fazem isso.",
  },
];

const passos = [
  {
    n: "01",
    titulo: "Entendemos a operação",
    texto: "Quais números entram, quem atende, o horário e as dúvidas que mais chegam.",
  },
  {
    n: "02",
    titulo: "Montamos a Atenux com vocês",
    texto: "Canais conectados, equipe cadastrada, etiquetas e respostas prontas. Sem custo de implantação.",
  },
  {
    n: "03",
    titulo: "O time começa atendendo",
    texto: "Uma conversa de 45 minutos com quem atende e o atendimento já roda no mesmo dia.",
  },
];

const faq = [
  {
    p: "Preciso trocar meu número de WhatsApp?",
    r: "Não. O número atual pode migrar para a API oficial do WhatsApp e passar a atender pela Atenux. Se preferir manter esse número no celular, a gente fornece um número novo gerenciado.",
  },
  {
    p: "A IA substitui a minha equipe?",
    r: "Não. Ela é um módulo opcional para acolher, tirar dúvidas simples e organizar o pedido. Quando é hora de uma pessoa, transfere com o resumo e a equipe pode pausar a IA a qualquer momento.",
  },
  {
    p: "Quanto custa?",
    r: "Mensalidade fixa, sem custo de implantação e com atendentes ilimitados. O valor depende de quantos números e módulos entram; na conversa a gente mostra qual plano encaixa.",
  },
];

export default function AtenuxPage() {
  return (
    <>
      <ScrollReveal />
      <Nav />
      <main className="flex-1">
        {/* ---------- Abertura ---------- */}
        <section className="py-16 md:py-24">
          <div className="container-tight">
            <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
              <div data-reveal>
                <Link
                  href="/#atenux"
                  className="inline-flex items-center gap-1.5 text-sm text-ink-muted transition-colors hover:text-ink"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Início
                </Link>
                <p className="mt-6 text-xs font-medium uppercase tracking-[0.18em] text-forest-500">
                  Atendimento · Produto próprio
                </p>
                <h1 className="mt-3 text-balance text-4xl leading-[1.08] tracking-tight text-ink md:text-5xl">
                  Um número. A equipe inteira atendendo.
                </h1>
                <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-muted">
                  A Atenux junta o WhatsApp, o Instagram e o chat do site da sua empresa numa
                  caixa de entrada só. Cada conversa tem responsável, nada se perde, e uma IA
                  pode acolher o cliente fora do horário.
                </p>
                <a
                  href={WHATSAPP}
                  target="_blank"
                  rel="noopener"
                  data-umami-event="atenux-whatsapp"
                  data-umami-event-origem="pagina-topo"
                  className="mt-9 inline-flex items-center gap-2 rounded-full bg-forest-500 px-7 py-3.5 text-sm font-medium text-bg transition-all duration-300 ease-out-quart hover:-translate-y-0.5 hover:bg-forest-700"
                >
                  Ver como ficaria aqui
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
              <figure data-reveal style={{ "--reveal-delay": "150ms" } as React.CSSProperties}>
                <AtenuxInbox />
                <figcaption className="mt-3 text-sm text-ink-faint">
                  Reconstrução da caixa de entrada. Os recursos são os do produto; nomes e
                  conversas são de exemplo.
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* ---------- O problema ---------- */}
        <section className="border-y border-line bg-bg-elevated py-16 md:py-24">
          <div className="container-tight">
            <div data-reveal className="max-w-xl">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-forest-500">
                O problema
              </p>
              <h2 className="mt-3 text-3xl tracking-tight text-ink md:text-4xl">
                O cliente não some. Ele fica esperando.
              </h2>
            </div>
            <ul className="mt-10 grid gap-4 sm:grid-cols-2">
              {dores.map((d, i) => (
                <li
                  key={d}
                  data-reveal
                  style={{ "--reveal-delay": `${i * 70}ms` } as React.CSSProperties}
                  className="rounded-xl border border-line bg-bg p-5 text-ink-muted"
                >
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ---------- Recursos ---------- */}
        <section className="py-16 md:py-24">
          <div className="container-tight">
            <div data-reveal className="max-w-xl">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-forest-500">
                O que vem na Atenux
              </p>
              <h2 className="mt-3 text-3xl tracking-tight text-ink md:text-4xl">
                Organização sem complicar a rotina.
              </h2>
            </div>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {recursos.map(({ icon: Icon, titulo, texto }, i) => (
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

        {/* ---------- Implantação ---------- */}
        <section className="border-y border-line bg-forest-900 py-16 text-bg md:py-24">
          <div className="container-tight">
            <div data-reveal className="max-w-xl">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-forest-300">
                Implantação
              </p>
              <h2 className="mt-3 text-3xl tracking-tight text-bg md:text-4xl">
                A ferramenta entra. O processo acompanha.
              </h2>
            </div>
            <ol className="mt-12 grid gap-8 md:grid-cols-3">
              {passos.map((p, i) => (
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
                  {faq.map((f) => (
                    <div key={f.p}>
                      <dt className="font-display text-xl tracking-tight text-ink">{f.p}</dt>
                      <dd className="mt-2 leading-relaxed text-ink-muted">{f.r}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div data-reveal className="lg:pt-10">
                <h2 className="text-balance text-3xl leading-[1.15] tracking-tight text-ink md:text-4xl">
                  Em 20 minutos a gente mostra como ficaria aí.
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-ink-muted">
                  Conversa por vídeo, com o caso da sua empresa. Se puder, chame quem também
                  responde o WhatsApp: fica mais fácil de ver o que muda na rotina.
                </p>
                <a
                  href={WHATSAPP}
                  target="_blank"
                  rel="noopener"
                  data-umami-event="atenux-whatsapp"
                  data-umami-event-origem="pagina-fim"
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-forest-500 px-7 py-3.5 text-sm font-medium text-bg transition-all duration-300 ease-out-quart hover:-translate-y-0.5 hover:bg-forest-700"
                >
                  Marcar a conversa
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
