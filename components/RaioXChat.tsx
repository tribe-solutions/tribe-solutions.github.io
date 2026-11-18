/**
 * Reconstrução da conversa do raio-x no WhatsApp.
 *
 * Os números são os do ramo de material de construção no Amazonas (PNCP,
 * jan a out/2026, base do raio-x de 18/11/2026); o nome da empresa é de
 * exemplo. Visual do WhatsApp de verdade: bolha comum com negrito e "•",
 * sem cabeçalho colorido, badge ou cartão-tabela. Botões só porque o
 * WhatsApp Business tem resposta rápida nativa (até 3).
 */

type Msg = { de: "cliente" | "atena"; hora: string; corpo: React.ReactNode };

const conversa: Msg[] = [
  { de: "cliente", hora: "09:41", corpo: "Quero meu raio-x" },
  {
    de: "atena",
    hora: "09:41",
    corpo: "Oi! Pra montar o seu raio-x de licitação, me manda o CNPJ da empresa ou uma foto do cartão CNPJ.",
  },
  { de: "cliente", hora: "09:42", corpo: "12.345.678/0001-90" },
  {
    de: "atena",
    hora: "09:42",
    corpo: (
      <>
        <strong>Raio-x da Construmax Materiais</strong>
        {"\n"}Ramo: material de construção, elétrico e hidráulico
        {"\n\n"}
        <strong>No Amazonas, jan a out/2026:</strong>
        {"\n"}• 2.711 itens comprados por órgãos públicos
        {"\n"}• R$ 66,1 mi homologados
        {"\n"}• 771 itens por dispensa
        {"\n"}• 7% ficaram sem fornecedor
        {"\n\n"}Sua empresa aparece em <strong>0 contratos</strong> desse ramo. 👀
        {"\n\n"}
        <em>Fonte: PNCP e Receita Federal.</em>
      </>
    ),
  },
  { de: "atena", hora: "09:42", corpo: "Quer que alguém da Tribe te mostre como participar?" },
];

function Bolha({ m }: { m: Msg }) {
  const cliente = m.de === "cliente";
  return (
    <div className={`flex ${cliente ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] whitespace-pre-wrap rounded-lg px-3 py-1.5 text-[13.5px] leading-snug text-[#111b21] shadow-[0_1px_0.5px_rgba(11,20,26,0.13)] ${
          cliente ? "rounded-tr-none bg-[#d9fdd3]" : "rounded-tl-none bg-white"
        }`}
      >
        {m.corpo}
        <span className="float-right ml-2 mt-1.5 text-[11px] leading-none text-[#667781]">
          {m.hora}
          {cliente && <span className="ml-1 text-[#53bdeb]">✓✓</span>}
        </span>
      </div>
    </div>
  );
}

export function RaioXChat() {
  return (
    <div className="mx-auto w-full max-w-[400px] overflow-hidden rounded-[2rem] border-[10px] border-ink bg-[#efeae2] shadow-[0_40px_90px_-40px_rgba(15,27,21,0.45)]">
      <div className="flex items-center gap-3 bg-[#f0f2f5] px-4 py-2.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-forest-500 text-sm font-medium text-bg">
          T
        </div>
        <div className="leading-tight">
          <p className="text-sm font-medium text-[#111b21]">Tribe Solutions</p>
          <p className="text-xs text-[#667781]">online</p>
        </div>
      </div>
      <div className="flex flex-col gap-1.5 px-3 py-4">
        {conversa.map((m, i) => (
          <Bolha key={i} m={m} />
        ))}
        <div className="flex gap-1.5 pl-1 pt-0.5">
          {["Sim", "Agora não"].map((b) => (
            <span
              key={b}
              className="flex-1 rounded-lg bg-white py-1.5 text-center text-[13.5px] text-[#027eb5] shadow-[0_1px_0.5px_rgba(11,20,26,0.13)]"
            >
              {b}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
