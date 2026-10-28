/**
 * WhatsApp que recebe os CTAs do site. É o número direto do Roberto, diferente
 * do telefone institucional em `structured-data.ts` — trocar um não troca o outro.
 */
export const WHATSAPP_NUMBER = "5592991873520";

/**
 * Número comercial do Hermes (+55 92 94687-8747, aberto no WhatsApp Web). Recebe
 * os contatos que vêm do Instagram: o /links e o atalho /whatsapp da bio.
 */
export const HERMES_WHATSAPP_NUMBER = "5592946878747";

/**
 * Número oficial da Tribe na Cloud API (+55 11 93618-1302, WABA "Tech Tribe
 * Solutions"). Não abre em celular: as mensagens caem na caixa de entrada da
 * Atenux. Recebe os CTAs da seção e da página /atenux.
 */
export const ATENUX_WHATSAPP_NUMBER = "5511936181302";

/**
 * Umami Cloud. O ID vai no HTML servido, então é público — não é segredo.
 * Vazio desliga o tracking (o script nem é injetado).
 */
export const UMAMI_WEBSITE_ID = "3f86e85e-0fd7-42be-a4bc-66cb2aaebec8";

/**
 * Primeira linha de toda conversa aberta pelo site. Nomeia a origem de propósito:
 * é por ela que se sabe, na chegada da mensagem, que o lead veio da landing e
 * não de indicação, licitação ou prospecção.
 */
const GREETING =
  "Olá! Cheguei pelo site da Tribe Solutions (tribesolutions.com.br).";

declare global {
  interface Window {
    umami?: { track: (event: string, data?: Record<string, unknown>) => void };
  }
}

/**
 * Evento Umami disparado por código — para CTAs que não são <a>, onde o
 * atributo data-umami-event não se aplica. No-op se o script não carregou.
 */
export function trackEvent(event: string, data?: Record<string, unknown>) {
  window.umami?.track(event, data);
}

/** Monta o link wa.me com a saudação padrão + mensagem opcional. */
export function waLink(message?: string, numero: string = WHATSAPP_NUMBER) {
  const text = message?.trim() ? `${GREETING}\n\n${message.trim()}` : GREETING;
  return `https://wa.me/${numero}?text=${encodeURIComponent(text)}`;
}
