"use client";

import { useEffect } from "react";

/**
 * Revela elementos marcados com [data-reveal] quando entram no viewport.
 * Progressive enhancement: o CSS de ocultação só vale sob `.reveal-ready`,
 * adicionada aqui — sem JS a página fica 100% visível.
 */
export function ScrollReveal() {
  useEffect(() => {
    const root = document.documentElement;
    const els = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );

    if (!("IntersectionObserver" in window) || els.length === 0) return;

    root.classList.add("reveal-ready");

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.1 },
    );

    els.forEach((el) => io.observe(el));

    return () => {
      io.disconnect();
      root.classList.remove("reveal-ready");
    };
  }, []);

  return null;
}
