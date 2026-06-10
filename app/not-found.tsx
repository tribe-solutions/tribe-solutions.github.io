import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Footer } from "@/components/Footer";
import { JungleBackdrop } from "@/components/JungleBackdrop";
import { Nav } from "@/components/Nav";

export const metadata: Metadata = {
  title: "Página não encontrada",
};

export default function NotFound() {
  return (
    <>
      <Nav />
      <main className="relative grain flex-1 overflow-hidden">
        <JungleBackdrop />
        <div className="container-tight flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
          <p className="font-display text-7xl tracking-tight text-forest-300 md:text-8xl">
            404
          </p>
          <h1 className="mt-4 max-w-xl text-balance text-3xl leading-[1.15] tracking-tight text-ink md:text-4xl">
            Essa trilha não leva a lugar nenhum.
          </h1>
          <p className="mt-4 max-w-md text-pretty text-base leading-relaxed text-ink-muted">
            A página que você procura não existe ou mudou de endereço.
          </p>
          <Link
            href="/"
            className="group mt-10 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-bg transition-colors hover:bg-forest-700"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            Voltar ao início
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
