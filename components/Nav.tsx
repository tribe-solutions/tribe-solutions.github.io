import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { waLink } from "@/lib/site";

const links = [
  { href: "#servicos", label: "Serviços" },
  { href: "#cases", label: "Cases" },
  { href: "#licitacoes", label: "Licitações" },
  { href: "#sobre", label: "Sobre" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/60 bg-bg/85 backdrop-blur-md">
      <div className="container-tight flex h-16 items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2.5 font-display text-lg tracking-tight text-ink"
        >
          <Image
            src="/logo.png"
            alt="Tribe Solutions"
            width={36}
            height={36}
            priority
            className="h-9 w-9"
          />
          <span>
            Tribe<span className="text-forest-500">.</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-ink-muted transition-colors hover:text-ink"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="#licitacoes"
            className="text-sm text-ink-muted transition-colors hover:text-ink md:hidden"
          >
            Licitações
          </Link>
          <a
            href={waLink()}
            target="_blank"
            rel="noopener"
            className="group inline-flex items-center gap-1.5 rounded-full border border-ink bg-ink px-4 py-2 text-sm font-medium text-bg transition-colors hover:bg-forest-700 hover:border-forest-700"
          >
            Conversar
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </header>
  );
}
