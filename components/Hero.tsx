"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";
import {
  ArrowUp,
  Code2,
  Smartphone,
  MessageSquare,
  Gavel,
} from "lucide-react";
import { JungleBackdrop } from "./JungleBackdrop";

const WHATSAPP_NUMBER = "5592993531716";

const prompts: { icon: typeof Code2; label: string; message: string }[] = [
  {
    icon: Code2,
    label: "Quero um sistema web",
    message:
      "Olá! Vim do site da Tribe. Tenho interesse em desenvolver um sistema web sob medida.",
  },
  {
    icon: Smartphone,
    label: "Tenho ideia de app",
    message:
      "Olá! Vim do site da Tribe. Tenho uma ideia de aplicativo mobile e queria conversar sobre o projeto.",
  },
  {
    icon: MessageSquare,
    label: "Automação no WhatsApp",
    message:
      "Olá! Vim do site da Tribe. Quero automatizar atendimento ou processos via WhatsApp.",
  },
  {
    icon: Gavel,
    label: "Vender por licitação",
    message:
      "Olá! Vim do site da Tribe. Quero conversar sobre vender software/licenças por licitação pública.",
  },
];

function openWhatsApp(text: string) {
  const message = text.trim()
    ? `Olá! Vim do site da Tribe.\n\n${text.trim()}`
    : "Olá! Vim do site da Tribe.";
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

export function Hero() {
  const [value, setValue] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    openWhatsApp(value);
  }

  return (
    <section className="relative grain overflow-hidden">
      <JungleBackdrop />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-[5]"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 60% 50% at 50% 30%, var(--color-forest-50), transparent 70%)",
        }}
      />

      <div className="container-tight relative flex min-h-[88vh] flex-col items-center justify-center py-20 text-center md:min-h-[80vh]">
        <Image
          src="/logo.png"
          alt="Tribe Solutions"
          width={88}
          height={88}
          priority
          className="h-20 w-20 md:h-22 md:w-22"
        />

        <h1 className="mt-8 max-w-3xl text-balance text-4xl leading-[1.1] tracking-tight text-ink sm:text-5xl md:text-6xl">
          Como podemos te ajudar?
        </h1>

        <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-ink-muted md:text-lg">
          Software sob medida e licitações inteligentes, feitos da Amazônia
          para o Brasil.
        </p>

        <form onSubmit={handleSubmit} className="mt-10 w-full max-w-2xl">
          <div className="group flex items-center gap-2 rounded-2xl border border-line-strong bg-bg-elevated p-2 shadow-[0_24px_80px_-32px_rgba(15,27,21,0.18)] transition-shadow focus-within:border-forest-500 focus-within:shadow-[0_24px_80px_-24px_rgba(15,27,21,0.25)]">
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Conte rapidinho sobre seu projeto…"
              aria-label="Conte sobre seu projeto"
              className="flex-1 bg-transparent px-4 py-3 text-base text-ink outline-none placeholder:text-ink-faint"
            />
            <button
              type="submit"
              aria-label="Enviar via WhatsApp"
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-ink text-bg transition-colors hover:bg-forest-700 disabled:opacity-40"
            >
              <ArrowUp className="h-5 w-5" strokeWidth={2} />
            </button>
          </div>
          <p className="mt-2 text-[11px] text-ink-faint">
            Abre uma conversa no WhatsApp com sua mensagem.
          </p>
        </form>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          {prompts.map(({ icon: Icon, label, message }) => (
            <button
              key={label}
              type="button"
              onClick={() => openWhatsApp(message)}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-bg-elevated px-3.5 py-2 text-sm text-ink-muted transition-colors hover:border-forest-500 hover:bg-forest-50 hover:text-ink"
            >
              <Icon className="h-3.5 w-3.5" strokeWidth={1.75} />
              {label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
