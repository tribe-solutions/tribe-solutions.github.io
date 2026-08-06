import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import {
  ConsultorioDashboard,
  ConsultorioFormulario,
} from "@/components/case/ConsultorioMockup";
import { waLink } from "@/lib/site";

const TITULO =
  "Consultório Digital: um sistema desenhado pelo consultório, não pelo CRUD";
const DESCRICAO =
  "Sistema de agenda, prontuário e faturamento para consultório de psicologia. Valor social como campo de primeira classe, sessão de 50 minutos, falta separada de cancelamento e sigilo garantido no banco.";

export const metadata: Metadata = {
  title: "Consultório Digital: sistema para consultório de psicologia",
  description: DESCRICAO,
  alternates: { canonical: "/cases/consultorio-digital" },
  openGraph: {
    type: "article",
    url: "/cases/consultorio-digital",
    title: TITULO,
    description: DESCRICAO,
    // Repetido de propósito: no Next o openGraph do filho SUBSTITUI o do pai,
    // não faz merge. Sem esta linha a página vai pro WhatsApp sem imagem.
    images: [{ url: "/og-banner.png", width: 1200, height: 630, alt: "Tribe Solutions" }],
  },
};

/**
 * As três decisões de modelagem que vieram da clínica, não do software.
 * Todas saem do schema real (`scripts/*.sql` do psychology-appointment):
 * o enum price_type, o duration_minutes DEFAULT 50 e o enum appointment_status.
 */
const DECISOES = [
  {
    titulo: "Valor social não é desconto",
    texto:
      "Quase todo sistema de agendamento trata preço como um número com um cupom em cima. Em psicologia clínica o valor social é outra coisa: é uma faixa combinada com a pessoa, que vale para ela por tempo indeterminado. Aqui ele é tipo de preço, ao lado de valor cheio e pagamento adiantado, e cada um tem tabela própria para presencial e para online. Seis valores configuráveis, nenhum cupom.",
  },
  {
    titulo: "A sessão tem 50 minutos",
    texto:
      "A hora clínica não é uma hora. O padrão de duração já nasce em 50 minutos, e a agenda é montada em cima disso em vez de obrigar quem atende a corrigir o campo em toda marcação.",
  },
  {
    titulo: "Faltar é diferente de cancelar",
    texto:
      "Os status da consulta são agendada, confirmada, realizada, cancelada e faltou. Separar as duas últimas parece detalhe até a hora de cobrar: cancelamento avisado e falta sem aviso têm consequências distintas no combinado com o paciente, e um sistema que junta os dois num status só apaga essa informação para sempre.",
  },
];

export default function ConsultorioDigitalCase() {
  return (
    <>
      <ScrollReveal />
      <Nav />
      <main className="flex-1">
        {/* ---------- Abertura ---------- */}
        <section className="py-16 md:py-24">
          <div className="container-tight">
            <div data-reveal className="max-w-3xl">
              <Link
                href="/#cases"
                className="inline-flex items-center gap-1.5 text-sm text-ink-muted transition-colors hover:text-ink"
              >
                <ArrowLeft className="h-4 w-4" />
                Cases
              </Link>

              <p className="mt-6 text-xs font-medium uppercase tracking-[0.18em] text-forest-500">
                Sistema sob medida · Saúde
              </p>
              <h1 className="mt-3 text-balance text-4xl leading-[1.08] tracking-tight text-ink md:text-6xl">
                Quem desenhou o sistema foi o consultório.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-muted">
                Agenda, prontuário e faturamento de um consultório de psicologia num
                lugar só. O que dá o formato do software não é o CRUD: é como a clínica
                funciona de verdade.
              </p>
            </div>

            <figure data-reveal className="mt-14 md:mt-20">
              <ConsultorioDashboard />
              <figcaption className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-faint">
                O painel de abertura: os quatro indicadores, as ações rápidas e a fila das
                próximas sessões. Reconstrução do sistema com pacientes fictícios. É
                prontuário de psicologia, então nenhuma tela real pode virar imagem
                pública: as telas foram remontadas a partir do próprio código.
              </figcaption>
            </figure>
          </div>
        </section>

        {/* ---------- Decisões de modelagem ---------- */}
        <section className="border-y border-line bg-bg-elevated py-16 md:py-24">
          <div className="container-tight">
            <div data-reveal className="max-w-xl">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-forest-500">
                O problema
              </p>
              <h2 className="mt-3 text-3xl tracking-tight text-ink md:text-4xl">
                Software genérico erra nos detalhes que importam.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-ink-muted">
                Existe agenda online de sobra, e ainda assim quem atende continua
                mantendo a planilha do lado. O motivo aparece sempre nos mesmos três
                pontos, e os três são decisão de banco de dados, não de tela.
              </p>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {DECISOES.map((d, i) => (
                <div
                  key={d.titulo}
                  data-reveal
                  style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}
                  className="rounded-2xl border border-line bg-bg p-7"
                >
                  <h3 className="font-display text-xl tracking-tight text-ink">
                    {d.titulo}
                  </h3>
                  <p className="mt-4 leading-relaxed text-ink-muted">{d.texto}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- Sigilo ---------- */}
        <section className="border-b border-line bg-forest-900 py-16 text-bg md:py-24">
          <div className="container-tight">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
              <div data-reveal>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-gold-300">
                  Sigilo
                </p>
                <h2 className="mt-3 text-balance text-3xl tracking-tight text-bg md:text-4xl">
                  O banco recusa, não a tela.
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-bg/70">
                  Prontuário de psicologia é dado de saúde: o sigilo é obrigação do
                  Código de Ética da profissão antes de ser requisito de sistema. A forma
                  errada de resolver isso é filtrar por dono na consulta que a tela faz,
                  porque aí basta uma tela nova esquecer o filtro para vazar a base
                  inteira.
                </p>
              </div>

              <div data-reveal className="lg:pt-16">
                <p className="text-lg leading-relaxed text-bg/70">
                  Aqui a regra está uma camada abaixo, ligada em cada tabela de paciente,
                  consulta, valor e perfil. Quem pede o dado é sempre a pessoa
                  autenticada, e o banco só devolve linha que pertence a ela. Tela nova,
                  relatório novo, integração nova: todos herdam a mesma recusa, sem
                  precisar lembrar dela.
                </p>
                <p className="mt-4 text-lg leading-relaxed text-bg/70">
                  O efeito colateral é que o sistema já nasce servindo mais de um
                  profissional sem que um enxergue o outro.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- Formulário público ---------- */}
        <section className="py-16 md:py-24">
          <div className="container-tight">
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
              <div data-reveal>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-forest-500">
                  A ponta aberta
                </p>
                <h2 className="mt-3 text-3xl tracking-tight text-ink md:text-4xl">
                  Um link fecha o ciclo com o site.
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-ink-muted">
                  De um lado o site que apresenta o trabalho e recebe quem procura
                  terapia. Do outro o sistema que administra quem já é paciente. No meio,
                  um endereço público de agendamento que sai do próprio sistema, pronto
                  para colar no Instagram ou responder no WhatsApp.
                </p>
                <p className="mt-4 text-lg leading-relaxed text-ink-muted">
                  Quem preenche não cria conta, não instala nada e não vê o painel. As
                  respostas chegam do lado de dentro.
                </p>
                <a
                  href="https://psimundovivido.com.br"
                  target="_blank"
                  rel="noopener"
                  data-umami-event="case-consultorio-site"
                  className="mt-7 inline-flex items-center gap-1.5 text-forest-500 underline decoration-line-strong underline-offset-4 transition-colors hover:text-forest-700"
                >
                  Ver o site que abre esse ciclo
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>

              {/* min-w-0: sem isto o item de grid herda min-width:auto, e o
                  endereço longo dentro do mockup estica a coluna para além da
                  tela no celular. O truncate do <code> não resolve sozinho. */}
              <figure data-reveal className="min-w-0">
                <ConsultorioFormulario />
                <figcaption className="mt-3 text-sm leading-relaxed text-ink-faint">
                  O endereço de agendamento vive dentro do painel, com o botão de copiar
                  junto. Reconstrução da tela.
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* ---------- Fechamento ---------- */}
        <section className="border-t border-line bg-forest-50 py-16 md:py-24">
          <div className="container-tight">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
              <div data-reveal>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-forest-500">
                  O ganho
                </p>
                <h2 className="mt-3 text-3xl tracking-tight text-ink md:text-4xl">
                  Sob medida ficou barato.
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-ink-muted">
                  A escolha entre assinar um sistema pronto e mandar fazer um do zero era
                  decidida pelo preço, e o pronto ganhava quase sempre. Hoje a distância
                  entre os dois é pequena o bastante para a pergunta voltar a ser a certa:
                  quanto custa conviver com um software que não entende o seu negócio?
                </p>
                <p className="mt-4 text-lg leading-relaxed text-ink-muted">
                  Neste caso, o que estava em jogo eram três campos que nenhuma agenda de
                  prateleira tem.
                </p>
              </div>

              <div data-reveal className="lg:pt-16">
                <h2 className="text-balance text-3xl leading-[1.15] tracking-tight text-ink md:text-4xl">
                  Onde o seu sistema te obriga a fazer gambiarra?
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-ink-muted">
                  Costuma ter nome: a planilha paralela, o caderno, o campo de observação
                  que virou banco de dados informal. É ali que o software genérico não
                  chegou, e é ali que dá para começar.
                </p>
                <a
                  href={waLink(
                    "Vi o case do Consultório Digital e queria conversar sobre um sistema sob medida.",
                  )}
                  target="_blank"
                  rel="noopener"
                  data-umami-event="case-whatsapp"
                  data-umami-event-case="consultorio-digital"
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-forest-500 px-7 py-3.5 text-sm font-medium text-bg transition-all duration-300 ease-out-quart hover:-translate-y-0.5 hover:bg-forest-700"
                >
                  Falar sobre o meu sistema
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
