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

const INTEIRO = new Intl.NumberFormat("pt-BR");
const REAIS = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 0,
});

/** 3973 -> "3.973"; 7890000 em reais -> "R$ 7.890.000". */
export function formatarNumero(valor: number, formato: "inteiro" | "reais"): string {
  return formato === "reais" ? REAIS.format(valor) : INTEIRO.format(valor);
}
