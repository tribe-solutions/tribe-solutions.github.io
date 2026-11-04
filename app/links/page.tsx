import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowUpRight,
  BookOpen,
  Globe,
  Landmark,
  Layers,
  Mail,
  MapPin,
  MessageCircle,
} from "lucide-react";
import { waLink } from "@/lib/site";
import { listarArtigos } from "@/lib/artigos";

/**
 * Hub de links da bio do Instagram (@tribesolutions_), no molde do /links do
 * Bora Correr. O pageview já sai pelo script do Umami no layout; cada clique
 * dispara `links-clique` com o `alvo`, então dá pra ver no painel de eventos
 * qual link da bio converte.
 *
 * noindex: é uma lista de atalhos sem conteúdo próprio, não deve competir com
 * a home no Google. O follow mantém os links valendo.
 */
export const metadata: Metadata = {
  title: "Links",
  description:
    "Fale com a Tribe Solutions, veja nossos cases e artigos. Software sob medida e licitações, de Manaus para o Brasil.",
  alternates: { canonical: "/links" },
  robots: { index: false, follow: true },
};

/** Mensagem distinta da do site: na chegada do WhatsApp dá pra saber que veio da bio. */
const WHATSAPP_HREF = waLink("Vim pelo link da bio do Instagram.");

type Item = {
  alvo: string;
  href: string;
  titulo: string;
  sub: string;
  Icon?: LucideIcon;
  externo?: boolean;
};

const PRINCIPAIS: Item[] = [
  {
    alvo: "site",
    href: "/",
    titulo: "Conheça a Tribe",
    sub: "Software sob medida, apps e plataformas SaaS",
    Icon: Globe,
  },
  {
    alvo: "licitacoes",
    href: "/#licitacoes",
    titulo: "Licitações",
    sub: "Licenças, software e serviços para órgãos públicos",
    Icon: Landmark,
  },
  {
    alvo: "case-bora-licitar",
    href: "/cases/bora-licitar",
    titulo: "Case: Bora Licitar",
    sub: "11 agentes de IA operando licitação pública",
    Icon: Layers,
  },
  {
    alvo: "case-consultorio",
    href: "/cases/consultorio-digital",
    titulo: "Case: Consultório Digital",
    sub: "Agenda, prontuário e valor social",
    Icon: Layers,
  },
];

/** Sites de cliente: link limpo, sem UTM (o rastreio deles é por referrer). */
const CLIENTES: Item[] = [
  { alvo: "cliente-mundovivido", href: "https://psimundovivido.com.br", titulo: "Mundo Vivido", sub: "psimundovivido.com.br", externo: true },
  { alvo: "cliente-anmar", href: "https://anmar.agr.br", titulo: "Anmar", sub: "anmar.agr.br", externo: true },
  { alvo: "cliente-boracorrer", href: "https://www.boracorrerbrasil.com.br", titulo: "Bora Correr", sub: "boracorrerbrasil.com.br", externo: true },
];

const CARD =
  "group flex items-center gap-4 rounded-2xl border border-line bg-bg-elevated px-5 py-4 transition-all duration-200 ease-out-quart hover:-translate-y-0.5 hover:border-forest-500";

function Linha({ item }: { item: Item }) {
  const { Icon } = item;
  const corpo = (
    <>
      {Icon && (
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-forest-50 text-forest-500">
          <Icon className="h-5 w-5" strokeWidth={1.75} />
        </span>
      )}
      <span className="min-w-0 flex-1">
        <span className="block font-medium text-ink">{item.titulo}</span>
        <span className="block truncate text-sm text-ink-muted">{item.sub}</span>
      </span>
      <ArrowUpRight
        className="h-4 w-4 shrink-0 text-ink-faint transition-colors group-hover:text-forest-500"
        strokeWidth={1.75}
      />
    </>
  );
  const evento = { "data-umami-event": "links-clique", "data-umami-event-alvo": item.alvo };
  return item.externo ? (
    <a href={item.href} target="_blank" rel="noopener" className={CARD} {...evento}>
      {corpo}
    </a>
  ) : (
    <Link href={item.href} className={CARD} {...evento}>
      {corpo}
    </Link>
  );
}

function Rotulo({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-3 mt-10 font-sans text-xs font-medium uppercase tracking-[0.18em] text-forest-500">
      {children}
    </h2>
  );
}

export default function LinksPage() {
  const artigos: Item[] = listarArtigos()
    .slice(0, 3)
    .map((a) => ({
      alvo: `artigo-${a.slug}`,
      href: `/artigos/${a.slug}`,
      titulo: a.title,
      sub: `${a.minutos} min de leitura`,
      Icon: BookOpen,
    }));

  return (
    <main className="mx-auto w-full max-w-md px-4 py-12">
      <header className="flex flex-col items-center text-center">
        <Image
          src="/brand/symbol-on-light.webp"
          alt=""
          width={512}
          height={512}
          priority
          className="h-20 w-20"
        />
        <h1 className="mt-4 text-3xl text-ink">Tribe Solutions</h1>
        <p className="mt-2 text-balance text-ink-muted">
          Software sob medida e licitações. Da Amazônia para o Brasil.
        </p>
      </header>

      <a
        href={WHATSAPP_HREF}
        target="_blank"
        rel="noopener"
        data-umami-event="links-clique"
        data-umami-event-alvo="whatsapp"
        className="mt-8 flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-4 font-medium text-bg transition-colors hover:bg-forest-700"
      >
        <MessageCircle className="h-5 w-5" strokeWidth={1.75} />
        Conversar no WhatsApp
      </a>

      <div className="mt-4 flex flex-col gap-3">
        {PRINCIPAIS.map((item) => (
          <Linha key={item.alvo} item={item} />
        ))}
      </div>

      {artigos.length > 0 && (
        <>
          <Rotulo>Artigos</Rotulo>
          <div className="flex flex-col gap-3">
            {artigos.map((item) => (
              <Linha key={item.alvo} item={item} />
            ))}
          </div>
        </>
      )}

      <Rotulo>Sites que fizemos</Rotulo>
      <div className="flex flex-col gap-3">
        {CLIENTES.map((item) => (
          <Linha key={item.alvo} item={item} />
        ))}
      </div>

      <a
        href="mailto:contato@tribesolutions.com.br"
        data-umami-event="links-clique"
        data-umami-event-alvo="email"
        className="mt-10 flex items-center justify-center gap-2 text-sm text-ink-muted transition-colors hover:text-ink"
      >
        <Mail className="h-4 w-4" strokeWidth={1.75} />
        contato@tribesolutions.com.br
      </a>
      <p className="mt-3 flex items-center justify-center gap-2 text-xs text-ink-faint">
        <MapPin className="h-3.5 w-3.5" strokeWidth={1.75} />
        Chapada · Manaus / AM
      </p>
    </main>
  );
}
