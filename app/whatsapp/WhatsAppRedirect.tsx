"use client";

import { useEffect } from "react";

/**
 * Espera o script do Umami (defer no layout) por até 1,5 s, dispara
 * `whatsapp-atalho` com a origem e só então troca de página. Sem Umami
 * (bloqueador, ID vazio) redireciona do mesmo jeito.
 */
export default function WhatsAppRedirect({ href }: { href: string }) {
  useEffect(() => {
    const origem = new URLSearchParams(window.location.search).get("src") || "instagram";
    const inicio = Date.now();
    let feito = false;

    const ir = () => {
      if (feito) return;
      feito = true;
      window.location.replace(href);
    };

    const tentar = () => {
      if (window.umami) {
        window.umami.track("whatsapp-atalho", { origem });
        setTimeout(ir, 300);
      } else if (Date.now() - inicio > 1500) {
        ir();
      } else {
        setTimeout(tentar, 100);
      }
    };
    tentar();
  }, [href]);

  return null;
}
