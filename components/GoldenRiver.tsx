"use client";

import { useEffect, useRef } from "react";

/**
 * Rio dourado experimental: traço que se desenha conforme o scroll,
 * fixo na margem esquerda em telas xl+. O traço passa por baixo das
 * faixas com fundo sólido (Services/About/Licitações) — como um rio
 * sob pontes — e reaparece nas seções abertas.
 * Remoção: deletar este arquivo + a linha no page.tsx.
 */
export function GoldenRiver() {
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length}`;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      path.style.strokeDashoffset = "0";
      return;
    }

    let raf = 0;
    const update = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(window.scrollY / max, 1) : 1;
      path.style.strokeDashoffset = `${length * (1 - progress)}`;
      raf = 0;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <svg
      aria-hidden
      className="pointer-events-none fixed left-6 top-0 hidden h-screen w-16 xl:block"
      viewBox="0 0 64 800"
      preserveAspectRatio="none"
      fill="none"
    >
      <path
        ref={pathRef}
        d="M 32 0 C 10 90, 54 150, 30 240 S 8 380, 34 470 S 56 610, 28 700 S 22 770, 32 800"
        stroke="var(--color-gold-500)"
        strokeOpacity="0.4"
        strokeWidth="2"
        strokeLinecap="round"
        style={{ strokeDasharray: 9999, strokeDashoffset: 9999 }}
      />
      <g fill="var(--color-forest-300)" fillOpacity="0.5">
        <circle cx="30" cy="160" r="3.5" />
        <circle cx="32" cy="330" r="3.5" />
        <circle cx="33" cy="500" r="3.5" />
        <circle cx="29" cy="670" r="3.5" />
      </g>
    </svg>
  );
}
