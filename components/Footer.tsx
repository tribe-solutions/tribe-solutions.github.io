import Image from "next/image";
import Link from "next/link";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line/60 bg-bg py-12">
      <div className="container-tight flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2.5">
          <Image
            src="/brand/tree.svg"
            alt=""
            width={27}
            height={28}
            className="h-7 w-auto"
          />
          <Image
            src="/brand/type-tribe.svg"
            alt="Tribe Solutions"
            width={69}
            height={19}
            className="h-[19px] w-auto translate-y-px"
          />
        </div>

        <nav className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-ink-muted">
          <Link href="/#servicos" className="transition-colors hover:text-ink">
            Serviços
          </Link>
          <Link href="/#cases" className="transition-colors hover:text-ink">
            Cases
          </Link>
          <Link href="/#licitacoes" className="transition-colors hover:text-ink">
            Licitações
          </Link>
          <Link href="/artigos" className="transition-colors hover:text-ink">
            Artigos
          </Link>
          <Link href="/#sobre" className="transition-colors hover:text-ink">
            Sobre
          </Link>
          <Link href="/#contato" className="transition-colors hover:text-ink">
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
