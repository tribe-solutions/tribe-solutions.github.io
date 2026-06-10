export const WHATSAPP_NUMBER = "5592993531716";

const GREETING = "Olá! Vim do site da Tribe.";

/** Monta o link wa.me com a saudação padrão + mensagem opcional. */
export function waLink(message?: string) {
  const text = message?.trim() ? `${GREETING}\n\n${message.trim()}` : GREETING;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
