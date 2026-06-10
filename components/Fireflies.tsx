type Firefly = {
  left: string;
  top: string;
  size: number;
  dur: number;
  glow: number;
  delay: number;
  mobileHidden?: boolean;
};

// Posições concentradas nas bordas e na metade direita — a coluna de
// texto da seção fica à esquerda em lg e não pode receber vagalumes.
const FIREFLIES: Firefly[] = [
  { left: "3%", top: "14%", size: 4, dur: 12, glow: 3.1, delay: -2 },
  { left: "7%", top: "78%", size: 3, dur: 14, glow: 2.6, delay: -7 },
  { left: "16%", top: "8%", size: 3, dur: 11, glow: 3.6, delay: -4, mobileHidden: true },
  { left: "30%", top: "88%", size: 4, dur: 13, glow: 2.9, delay: -9, mobileHidden: true },
  { left: "44%", top: "6%", size: 3, dur: 15, glow: 3.3, delay: -1, mobileHidden: true },
  { left: "52%", top: "82%", size: 4, dur: 10, glow: 2.4, delay: -6 },
  { left: "60%", top: "30%", size: 4, dur: 12, glow: 3.8, delay: -3 },
  { left: "66%", top: "64%", size: 3, dur: 16, glow: 2.7, delay: -11, mobileHidden: true },
  { left: "73%", top: "12%", size: 5, dur: 13, glow: 3.0, delay: -5 },
  { left: "79%", top: "46%", size: 3, dur: 11, glow: 2.5, delay: -8, mobileHidden: true },
  { left: "85%", top: "76%", size: 4, dur: 14, glow: 3.4, delay: -2.5 },
  { left: "90%", top: "22%", size: 3, dur: 12, glow: 2.8, delay: -10, mobileHidden: true },
  { left: "94%", top: "58%", size: 4, dur: 15, glow: 3.2, delay: -6.5 },
  { left: "97%", top: "85%", size: 3, dur: 10, glow: 2.6, delay: -1.5 },
];

export function Fireflies() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {FIREFLIES.map((f, i) => (
        <span
          key={i}
          className={`firefly absolute rounded-full bg-gold-300 shadow-[0_0_8px_2px_rgba(216,185,107,0.55)] ${
            f.mobileHidden ? "hidden md:block" : ""
          }`}
          style={
            {
              left: f.left,
              top: f.top,
              width: `${f.size}px`,
              height: `${f.size}px`,
              "--ff-dur": `${f.dur}s`,
              "--ff-glow": `${f.glow}s`,
              "--ff-delay": `${f.delay}s`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
