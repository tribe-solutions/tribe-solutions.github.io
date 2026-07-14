const DATA = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

/**
 * "2026-07-14" -> "14 de julho de 2026".
 * timeZone UTC de propósito: sem isso a data ISO pura volta um dia
 * em fuso negativo, e Manaus é UTC-4.
 */
export function formatarData(iso: string): string {
  return DATA.format(new Date(`${iso}T00:00:00Z`));
}
