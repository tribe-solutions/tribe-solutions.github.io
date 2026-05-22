import Image from "next/image";
import Link from "next/link";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line/60 bg-bg py-12">
      <div className="container-tight flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2.5 font-display text-base tracking-tight text-ink">
          <Image
            src="/logo.png"
            alt="Tribe Solutions"
            width={28}
            height={28}
            className="h-7 w-7"
          />
          <span>Tribe Solutions</span>
        </div>

        <nav className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-ink-muted">
          <Link href="#servicos" className="hover:text-ink">
            Serviços
          </Link>
          <Link href="#cases" className="hover:text-ink">
            Cases
          </Link>
          <Link href="#licitacoes" className="hover:text-ink">
            Licitações
          </Link>
          <Link href="#sobre" className="hover:text-ink">
            Sobre
          </Link>
          <Link href="#contato" className="hover:text-ink">
            Contato
          </Link>
        </nav>

        <p className="text-xs text-ink-faint">
          © {year} Tribe Solutions · Manaus / AM
        </p>
      </div>
    </footer>
  );
}
