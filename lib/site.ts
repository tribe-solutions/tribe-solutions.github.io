/**
 * WhatsApp comercial da Tribe na Cloud API (+55 11 93618-1302).
 * Todos os CTAs do site recebem atendimento na caixa de entrada da Atenux.
 */
export const WHATSAPP_NUMBER = "5511936181302";

/** A seção e a página /atenux usam o mesmo atendimento comercial. */
export const ATENUX_WHATSAPP_NUMBER = WHATSAPP_NUMBER;

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
