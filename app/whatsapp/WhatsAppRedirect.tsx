"use client";

import { useEffect } from "react";

/** Registra a origem do atalho e abre o hub de links preservando a query. */
export default function WhatsAppRedirect() {
  useEffect(() => {
    const origem = new URLSearchParams(window.location.search).get("src") || "instagram";
    const inicio = Date.now();
    let feito = false;

    const ir = () => {
      if (feito) return;
      feito = true;
      window.location.replace(`/links/${window.location.search}`);
    };

    const tentar = () => {
      if (window.umami) {
        window.umami.track("links-atalho", { origem });
        setTimeout(ir, 300);
      } else if (Date.now() - inicio > 1500) {
        ir();
      } else {
        setTimeout(tentar, 100);
      }
    };
    tentar();
  }, []);

  return null;
}
