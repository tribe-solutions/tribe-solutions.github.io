import { readFileSync, writeFileSync } from "node:fs";

const AV = JSON.parse(readFileSync("avatares.json", "utf8"));

/* Cores amostradas do board real (board-licitacoes.webp) para o mock não
   parecer outro produto. */
const C = {
  pagina: "#141a1f",
  header: "#192730",
  barra: "#243037",
  coluna: "#192225",
  card: "#252c2c",
  borda: "#2c3841",
  texto: "#adb9c3",
  tituloCol: "#8ab4d0",
  id: "#7d8a92",
  fraco: "#5f6d76",
};

/* Objetos plausíveis, nenhum órgão real nomeado — é ilustração, não captura. */
const LICITACOES = [
  {
    titulo: "Novas [auto]",
    icone: "🟦",
    cards: [
      { id: 612, ag: "curupira", txt: "DISPENSA 06/08 09h00 · Contratação de empresa para desenvolvimento de portal institucional com hospedagem, treinamen..." },
      { id: 611, ag: "boitata", txt: "Fundação de apoio — 41277/2026 — Contratação direta" },
      { id: 609, ag: "curupira", txt: "🔵 PREGÃO-E 18/08 08h30 · Registro de preços para licenciamento de solução de gestão documental com migração de acer..." },
      { id: 607, ag: "curupira", txt: "DISPENSA · Aquisição de licenças de software de produtividade para equipe administrativa" },
    ],
  },
  {
    titulo: "Vale Participar [auto]",
    icone: "🟩",
    cards: [
      { id: 604, ag: "iara", txt: "🔵 PREGÃO-E 20/08 09h00 · Sistema de ordem de serviço com aplicativo móvel para equipes de campo, incluindo implanta..." },
      { id: 601, ag: "iara", txt: "DISPENSA 12/08 14h00 · Desenvolvimento de site institucional com registro de domínio, hospedagem e suporte técnico" },
      { id: 598, ag: "iara", txt: "🔵 PREGÃO-E 25/08 07h30 · Solução de agendamento online integrada ao sistema de gestão já existente" },
      { id: 596, ag: "iara", txt: "Fundação de apoio — 40118/2026 — Seleção de fornecedores" },
    ],
  },
  {
    titulo: "Orçamento Pronto [auto]",
    icone: "🟨",
    cards: [
      { id: 592, ag: "muiraquita", txt: "🔵 PREGÃO-E 20/08 09h00 · Sistema de ordem de serviço com aplicativo móvel — orçamento montado, 14 itens" },
      { id: 590, ag: "muiraquita", txt: "DISPENSA 12/08 14h00 · Desenvolvimento de site institucional — orçamento montado, 6 itens" },
    ],
  },
  {
    titulo: "Go/No-Go [manual]",
    icone: "✋",
    humano: true,
    cards: [
      { id: 587, ag: "tucunare", cor: "humano", txt: "DISPENSA 12/08 14h00 · Desenvolvimento de site institucional — aguardando decisão" },
      { id: 585, ag: "tucunare", cor: "humano", txt: "🔵 PREGÃO-E 20/08 09h00 · Sistema de ordem de serviço — aguardando decisão" },
      { id: 583, ag: "tucunare", cor: "humano", txt: "Fundação de apoio — 40118/2026 — aguardando decisão" },
    ],
  },
  {
    titulo: "Gerando Documento [auto]",
    icone: "🟧",
    cards: [
      { id: 579, ag: "mapinguari", txt: "🔵 PREGÃO-E 20/08 09h00 · Sistema de ordem de serviço — montando proposta técnica e anexos" },
    ],
  },
  {
    titulo: "Documento Pronto [auto]",
    icone: "🟪",
    cards: [
      { id: 574, ag: "mapinguari", txt: "DISPENSA 12/08 14h00 · Desenvolvimento de site institucional — proposta + 9 anexos" },
      { id: 571, ag: "mapinguari", txt: "Fundação de apoio — 40118/2026 — proposta + declarações" },
    ],
  },
  {
    titulo: "Assinar [auto]",
    icone: "🖊",
    cards: [{ id: 568, ag: "boto", txt: "DISPENSA 12/08 14h00 · Desenvolvimento de site institucional — assinando ICP-Brasil A1" }],
  },
  {
    titulo: "Assinadas [auto]",
    icone: "✅",
    cards: [
      { id: 565, ag: "boto", txt: "Fundação de apoio — 40118/2026 — proposta_assinada.pdf" },
      { id: 562, ag: "boto", txt: "DISPENSA 04/08 08h14 · Hotsite institucional — proposta_assinada.pdf" },
    ],
  },
  {
    titulo: "Enviadas [manual]",
    icone: "✋",
    humano: true,
    cards: [
      { id: 558, cor: "humano", txt: "DISPENSA 04/08 08h14 · Hotsite institucional — rascunho salvo, aguardando liberação" },
      { id: 554, txt: "Fundação de apoio — 39804/2026 — enviada 29/07 16h12" },
    ],
  },
  {
    titulo: "Ganhas",
    icone: "🏆",
    cards: [
      { id: 541, cor: "ganha", txt: "🏆 Fundação de apoio — 38979/2026 — Contratação direta" },
      { id: 528, cor: "ganha", txt: "🏆 DISPENSA · Portal institucional com hospedagem" },
      { id: 509, cor: "ganha", txt: "🏆 Fundação de apoio — 37204/2026 — Compra direta" },
    ],
  },
];

const DELIVERY = [
  {
    titulo: "AF Recebida",
    icone: "📥",
    cards: [{ id: 618, cor: "ganha", txt: "🏆 Portal institucional — proc. 38979/2026 · comprar insumos e iniciar" }],
  },
  {
    titulo: "Fazendo o Serviço",
    icone: "🔨",
    cards: [
      { id: 615, txt: "🔨 Sistema de ordem de serviço — proc. 37204/2026 · sprint 2 de 4" },
      { id: 610, txt: "🔨 Portal institucional — proc. 38979/2026 · migração de conteúdo" },
    ],
  },
  {
    titulo: "Disponível pro Cliente",
    icone: "✅",
    cards: [{ id: 603, txt: "✅ Hotsite institucional — proc. 36550/2026 · homologação com o órgão" }],
  },
  {
    titulo: "NF Emitida",
    icone: "🧾",
    cards: [
      { id: 597, txt: "🧾 Solução de agendamento — proc. 35911/2026 · aguardando depósito" },
      { id: 588, txt: "🧾 Portal institucional — proc. 35402/2026 · aguardando depósito" },
    ],
  },
  {
    titulo: "Pago",
    icone: "💰",
    cards: [{ id: 576, cor: "ganha", txt: "💰 Site institucional — proc. 34877/2026 · quitado" }],
  },
  {
    titulo: "Vigência ativa (monitorar)",
    icone: "🔭",
    cards: [
      { id: 561, txt: "🔭 Suporte e manutenção — proc. 33120/2026 · renovar mar/27" },
      { id: 549, txt: "🔭 Hospedagem e e-mail — proc. 32744/2026 · renovar jan/27" },
      { id: 537, txt: "🔭 Portal institucional — proc. 31980/2026 · encerrar set/27" },
    ],
  },
  {
    titulo: "Encerrado",
    icone: "✅",
    cards: [{ id: 502, cor: "ganha", txt: "✅ Site institucional — proc. 29455/2025 · entregue e quitado" }],
  },
];

const card = (c) => {
  const fundo =
    c.cor === "ganha" ? "#2a3a2d" : c.cor === "humano" ? "#3a2a24" : C.card;
  const borda =
    c.cor === "ganha" ? "#3d5442" : c.cor === "humano" ? "#57392e" : C.borda;
  return `<div class="card" style="background:${fundo};border-color:${borda}">
    <div class="card-top">
      <span class="cid">#${c.id} <i>▾</i></span>
      ${c.ag ? `<img class="av" src="${AV[c.ag]}" alt="">` : `<span class="av-vazio"></span>`}
    </div>
    <p class="ctxt">${c.txt}</p>
  </div>`;
};

const coluna = (col) => `<div class="col">
  <div class="colhead">
    <span class="coltit">${col.icone} ${col.titulo} <i>▾</i></span>
  </div>
  <div class="colbody">${col.cards.map(card).join("")}</div>
</div>`;

const board = (nome, colunas, id, h = 640) => `<div class="board" id="${id}" style="--h:${h}px">
  <div class="topo">
    <div class="proj"><span class="projicon">▤</span> ${nome}</div>
    <div class="topo-dir"><span class="sel">Exibir outro projeto ▾</span><span class="ico">△</span><span class="ico">+</span><span class="ico">◉</span></div>
  </div>
  <div class="subbar">
    <span class="sb">☰ ▾</span><span class="sb">◎ Visão global</span>
    <span class="sb ativo">▤ Quadro</span><span class="sb">☰ Lista</span>
    <span class="filtro">status:open</span>
  </div>
  <div class="colunas">${colunas.map(coluna).join("")}</div>
</div>`;

const html = `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8">
<style>
  /* O headless não tem fonte de emoji: sem isto tudo vira caixa vazia. */
  @font-face{font-family:"Emoji";src:url("seguiemj.ttf") format("truetype")}
  *{box-sizing:border-box;margin:0;padding:0}
  body{background:${C.pagina};font-family:"Segoe UI",system-ui,-apple-system,sans-serif,"Emoji";color:${C.texto}}
  .board{width:1920px;background:${C.pagina};padding-bottom:14px}
  .board + .board{margin-top:60px}
  .topo{display:flex;align-items:center;justify-content:space-between;background:${C.header};padding:12px 22px}
  .proj{font-size:21px;font-weight:600;color:#e6ecef;display:flex;align-items:center;gap:11px}
  .projicon{display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:7px;background:#6fae7d;color:#12201a;font-size:16px}
  .topo-dir{display:flex;align-items:center;gap:16px;font-size:13px;color:${C.fraco}}
  .sel{background:${C.barra};border:1px solid ${C.borda};border-radius:5px;padding:6px 13px;color:#93a2ac}
  .ico{font-size:15px;opacity:.65}
  .subbar{display:flex;align-items:center;gap:20px;background:${C.barra};padding:9px 22px;font-size:13px;color:#93a2ac}
  .sb.ativo{color:#e6ecef;border-bottom:2px solid #8ab4d0;padding-bottom:3px}
  .filtro{flex:1;margin-left:10px;background:${C.pagina};border:1px solid ${C.borda};border-radius:4px;padding:6px 12px;color:#8d9aa3;font-family:ui-monospace,monospace;font-size:12px}
  .colunas{display:flex;gap:1px;padding:0 6px;align-items:flex-start}
  .col{flex:1;min-width:0}
  /* Altura fixa: sem isto os títulos de duas linhas desalinham os corpos. */
  .colhead{padding:13px 10px 11px;height:52px;display:flex;align-items:flex-start}
  .coltit{font-size:12.5px;color:${C.tituloCol};font-weight:500;line-height:1.35;display:inline-block}
  .coltit i{font-style:normal;opacity:.55}
  .colbody{background:${C.coluna};min-height:var(--h,640px);padding:7px;display:flex;flex-direction:column;gap:7px}
  .card{border:1px solid ${C.borda};border-radius:5px;padding:8px 9px 10px}
  .card-top{display:flex;align-items:flex-start;justify-content:space-between;gap:6px;margin-bottom:5px}
  .cid{font-size:11px;color:${C.id}}
  .cid i{font-style:normal;opacity:.6}
  .av{width:23px;height:23px;border-radius:4px;background:#1d2a22;image-rendering:pixelated;object-fit:contain}
  .av-vazio{width:23px;height:23px}
  .ctxt{font-size:12px;line-height:1.45;color:#c3ced6;font-weight:500}
</style></head><body>
${board("Licitações", LICITACOES, "licitacoes")}
${board("Delivery", DELIVERY, "delivery", 300)}
</body></html>`;

writeFileSync("kanban-mock.html", html);
console.log("kanban-mock.html gerado —", (html.length / 1024).toFixed(0) + "KB");
