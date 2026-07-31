/**
 * Funil de triagem representado 1:1 — 476 quadrados, dez acesos.
 *
 * Escolha deliberada: gráfico de barras com 8.257 e 10 na mesma escala ou
 * mente (log/raiz) ou some com o 10. Um quadrado por card não distorce nada,
 * e a proporção "dez em quatrocentos e setenta e seis" se lê sem legenda.
 */

const TOTAL = 476;
const NA_MESA = 10;

// Espalha os dez acesos em vez de agrupar no fim: o olho precisa procurar,
// e procurar é exatamente o trabalho que os agentes fazem.
const ACESOS = new Set([37, 64, 119, 158, 203, 261, 305, 388, 421, 468]);

export function Funil() {
  return (
    <div className="grid gap-x-16 gap-y-12 lg:grid-cols-[auto_minmax(0,1fr)] lg:items-start">
      <div className="max-w-[34rem]">
        {/* 28 colunas × 17 linhas = 476 exatos. Bloco, não faixa. */}
        <div
          className="grid grid-cols-[repeat(17,minmax(0,1fr))] gap-1 sm:grid-cols-[repeat(28,minmax(0,1fr))]"
          role="img"
          aria-label={`Representação de ${TOTAL} licitações analisadas, das quais ${NA_MESA} exigiram decisão humana`}
        >
          {Array.from({ length: TOTAL }, (_, i) => (
            <span
              key={i}
              aria-hidden
              className={
                ACESOS.has(i)
                  ? "aspect-square rounded-[2px] bg-gold-500 shadow-[0_0_0_3px_rgba(184,146,58,0.18),0_0_14px_3px_rgba(184,146,58,0.5)]"
                  : "aspect-square rounded-[2px] bg-forest-500/15"
              }
            />
          ))}
        </div>
        <p className="mt-7 max-w-md text-sm leading-relaxed text-ink-faint">
          Cada quadrado é uma licitação que virou card entre 16/04 e 31/07/2026. Os dourados
          são os dez que chegaram a exigir uma decisão.
        </p>
      </div>

      <dl className="space-y-7">
        <div>
          <dt className="text-xs font-medium uppercase tracking-[0.18em] text-ink-faint">
            Varridos num só scan
          </dt>
          <dd className="mt-1 font-display text-4xl tracking-tight text-ink">8.257</dd>
          <dd className="mt-1 text-sm leading-relaxed text-ink-muted">
            registros do PNCP, numa única passada de manhã. O Curupira faz duas por dia.
          </dd>
        </div>
        <div className="border-t border-line pt-7">
          <dt className="text-xs font-medium uppercase tracking-[0.18em] text-ink-faint">
            Viraram card
          </dt>
          <dd className="mt-1 font-display text-4xl tracking-tight text-ink">476</dd>
          <dd className="mt-1 text-sm leading-relaxed text-ink-muted">
            em 106 dias, somando PNCP e os portais de dez fundações de apoio.
          </dd>
        </div>
        <div className="border-t border-line pt-7">
          <dt className="text-xs font-medium uppercase tracking-[0.18em] text-gold-700">
            Chegaram na mesa
          </dt>
          <dd className="mt-1 font-display text-4xl tracking-tight text-gold-700">10</dd>
          <dd className="mt-1 text-sm leading-relaxed text-ink-muted">
            2,1%. Os outros 466 foram descartados sem ninguém abrir.
          </dd>
        </div>
      </dl>
    </div>
  );
}
