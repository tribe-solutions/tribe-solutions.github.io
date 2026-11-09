import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

const DESCRICAO =
  "Como a Tech Tribe Solutions trata dados pessoais no site, no atendimento por WhatsApp e chat, na prospecção comercial e nas integrações com Instagram e LinkedIn.";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: DESCRICAO,
  alternates: { canonical: "/privacidade" },
  openGraph: {
    type: "article",
    url: "/privacidade",
    title: "Política de Privacidade · Tribe Solutions",
    description: DESCRICAO,
    // No Next o openGraph do filho substitui o do pai: sem esta linha a página vai sem imagem.
    images: [{ url: "/og-banner.png", width: 1200, height: 630, alt: "Tribe Solutions" }],
  },
};

const ATUALIZADA = "9 de novembro de 2026";
const EMAIL = "roberto.campos@tribesolutions.com.br";

type Secao = { id: string; titulo: string; paragrafos?: string[]; itens?: string[] };

/**
 * Política da Tribe (controladora). Cobre o que o site e a operação comercial
 * realmente fazem: Umami sem cookie, chat do Atenux, WhatsApp, lista de prospecção
 * a partir da base pública de CNPJ e os apps de publicação no Instagram/LinkedIn.
 * A seção #exclusao é a "URL de instruções de exclusão de dados" exigida pela Meta.
 */
const SECOES: Secao[] = [
  {
    id: "quem-somos",
    titulo: "1. Quem é responsável pelos dados",
    paragrafos: [
      "Tech Tribe Solutions LTDA, CNPJ 55.588.759/0001-29, com sede na Av. Dr. Theomario Pinto da Costa, 811, Sala 802, Skye Platinum Offices, Chapada, Manaus/AM, CEP 69050-055 (\"Tribe\").",
      `Para qualquer assunto desta política, inclusive o exercício dos seus direitos, o canal é o e-mail ${EMAIL}.`,
    ],
  },
  {
    id: "o-que-coletamos",
    titulo: "2. Que dados tratamos e para quê",
    itens: [
      "Navegação no site: usamos o Umami para contar visitas e cliques de forma agregada. Ele não usa cookies e não identifica você. Nossa rede de entrega (Cloudflare) registra dados técnicos da conexão, como endereço IP e navegador, para segurança e funcionamento do site.",
      "Chat do site e WhatsApp: quando você fala com a gente, tratamos seu nome, número de telefone e o conteúdo da conversa para responder, fazer orçamento e prestar o serviço. O chat do site roda na nossa própria plataforma de atendimento (Atenux).",
      "Prospecção comercial: podemos entrar em contato com empresas usando dados públicos do Cadastro Nacional da Pessoa Jurídica (Receita Federal) e contatos publicados pela própria empresa. Se não quiser mais receber contato, basta responder pedindo para sair e não voltamos a procurar você.",
      "Clientes e fornecedores: dados de cadastro, contrato, nota fiscal e pagamento, para cumprir o contrato e as obrigações legais e fiscais.",
      "Redes sociais: publicamos conteúdo nas contas da própria Tribe no Instagram e no LinkedIn por meio das APIs oficiais da Meta e do LinkedIn. Esses aplicativos acessam somente as contas da Tribe e métricas agregadas dos nossos próprios posts (alcance, impressões, cliques). Não coletamos dados de perfis de terceiros.",
    ],
  },
  {
    id: "bases-legais",
    titulo: "3. Bases legais",
    paragrafos: [
      "Tratamos dados com base na execução de contrato ou de procedimentos preliminares a pedido do titular (atendimento e orçamento), no cumprimento de obrigação legal ou regulatória (fiscal e contábil), no legítimo interesse (segurança do site, métricas agregadas e prospecção entre empresas com dados públicos) e, quando for o caso, no seu consentimento. Tudo conforme a Lei 13.709/2018 (LGPD).",
    ],
  },
  {
    id: "compartilhamento",
    titulo: "4. Com quem compartilhamos",
    paragrafos: [
      "Não vendemos dados. Compartilhamos apenas com os fornecedores necessários para operar: hospedagem e rede de entrega do site, provedores de nuvem onde rodam nossos sistemas, a Meta (WhatsApp e Instagram), o LinkedIn, o provedor de e-mail e a contabilidade. Também podemos compartilhar quando a lei ou uma autoridade exigir.",
      "Alguns desses fornecedores guardam dados fora do Brasil. Nesses casos a transferência segue o que a LGPD permite para cumprir o contrato com você ou com base nas garantias oferecidas pelo fornecedor.",
    ],
  },
  {
    id: "retencao",
    titulo: "5. Por quanto tempo guardamos",
    paragrafos: [
      "Conversas de atendimento e dados de contato ficam guardados enquanto houver relação comercial ou interesse em retomar o contato, e são apagados quando você pedir. Dados de contrato e fiscais ficam pelo prazo que a lei exige (em geral, 5 anos). Registros técnicos do site ficam pelo tempo definido pelo provedor, normalmente poucos dias.",
    ],
  },
  {
    id: "direitos",
    titulo: "6. Seus direitos",
    paragrafos: [
      "Você pode, a qualquer momento: confirmar se tratamos seus dados, acessar, corrigir, pedir anonimização, bloqueio ou eliminação, pedir portabilidade, saber com quem compartilhamos e revogar o consentimento (art. 18 da LGPD). Também pode reclamar à Autoridade Nacional de Proteção de Dados (ANPD).",
    ],
  },
  {
    id: "exclusao",
    titulo: "7. Como pedir a exclusão dos seus dados",
    itens: [
      `Envie um e-mail para ${EMAIL} com o assunto "Exclusão de dados", informando o número de telefone, e-mail ou perfil usado no contato com a Tribe.`,
      "Se o contato foi pelo WhatsApp, você também pode escrever \"apagar meus dados\" na própria conversa.",
      "Confirmamos o pedido e concluímos a exclusão em até 15 dias, exceto os dados que a lei nos obriga a manter (por exemplo, notas fiscais).",
    ],
  },
  {
    id: "seguranca",
    titulo: "8. Segurança",
    paragrafos: [
      "Usamos conexão criptografada (HTTPS), acesso restrito aos sistemas, credenciais guardadas fora do código e servidores com firewall. Nenhum sistema é infalível; se acontecer um incidente que possa trazer risco a você, avisaremos você e a ANPD conforme a lei.",
    ],
  },
  {
    id: "mudancas",
    titulo: "9. Mudanças nesta política",
    paragrafos: [
      "Esta política pode ser atualizada. A data no topo da página mostra a versão em vigor.",
    ],
  },
];

export default function Privacidade() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <section className="py-16 md:py-24">
          <div className="container-tight">
            <div className="max-w-3xl">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-sm text-ink-muted transition-colors hover:text-ink"
              >
                <ArrowLeft className="h-4 w-4" />
                Início
              </Link>

              <p className="mt-6 text-xs font-medium uppercase tracking-[0.18em] text-forest-500">
                Atualizada em {ATUALIZADA}
              </p>
              <h1 className="mt-3 text-balance text-4xl leading-[1.08] tracking-tight text-ink md:text-5xl">
                Política de Privacidade
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-ink-muted">
                O que a Tribe faz com os seus dados, em linguagem direta.
              </p>

              <div className="mt-12 space-y-12">
                {SECOES.map((s) => (
                  <section key={s.id} id={s.id} className="scroll-mt-24">
                    <h2 className="text-2xl tracking-tight text-ink">{s.titulo}</h2>
                    {s.paragrafos?.map((p, i) => (
                      <p key={i} className="mt-4 leading-relaxed text-ink-muted">
                        {p}
                      </p>
                    ))}
                    {s.itens && (
                      <ul className="mt-4 list-disc space-y-3 pl-5 leading-relaxed text-ink-muted">
                        {s.itens.map((it, i) => (
                          <li key={i}>{it}</li>
                        ))}
                      </ul>
                    )}
                  </section>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
