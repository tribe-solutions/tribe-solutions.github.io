type LeafProps = {
  className?: string;
  variant?: "palm" | "monstera" | "frond";
};

function Leaf({ className = "", variant = "palm" }: LeafProps) {
  if (variant === "monstera") {
    return (
      <svg
        viewBox="0 0 200 200"
        fill="currentColor"
        aria-hidden
        className={className}
      >
        <path d="M100 8c44 12 78 46 84 96 4 36-18 64-50 76-30 12-58-2-66-32-6-22 4-44 24-54 12-6 14-18 8-26-10-12-28-14-44-8-14 6-22 22-18 38 4 14 14 22 26 24 6 0 8 8 2 12-22 14-50 4-58-22C2 86 28 36 78 18c8-2 14-6 22-10z" />
        <path
          d="M100 50c0 18-6 32-18 44-10 10-14 22-10 36"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          opacity="0.4"
        />
        <circle cx="78" cy="92" r="6" fill="var(--color-bg)" opacity="0.6" />
        <circle cx="116" cy="82" r="5" fill="var(--color-bg)" opacity="0.6" />
        <circle cx="100" cy="118" r="7" fill="var(--color-bg)" opacity="0.6" />
        <circle cx="138" cy="120" r="4" fill="var(--color-bg)" opacity="0.6" />
      </svg>
    );
  }
  if (variant === "frond") {
    return (
      <svg
        viewBox="0 0 240 80"
        fill="currentColor"
        aria-hidden
        className={className}
      >
        <path d="M4 40c40-28 100-36 156-26 32 6 56 18 76 32-22 4-44 4-66 0-44-8-88-10-130-2-12 2-24 2-36-4z" />
        <path
          d="M10 40c40-22 90-30 144-22"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          opacity="0.35"
        />
        {Array.from({ length: 10 }).map((_, i) => {
          const x = 24 + i * 18;
          const len = 12 + (i % 3) * 4;
          return (
            <line
              key={i}
              x1={x}
              y1="40"
              x2={x + 6}
              y2={40 - len}
              stroke="currentColor"
              strokeWidth="2"
              opacity="0.35"
            />
          );
        })}
      </svg>
    );
  }
  // palm (default)
  return (
    <svg
      viewBox="0 0 200 220"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M100 220c-4-30-2-60 4-90 8-36 24-66 50-90-12 4-22 12-32 22 4-22 12-42 24-60-18 8-32 22-44 38 0-22 4-42 14-60-18 14-30 32-38 52-6-22-16-40-28-56 4 22 6 42 4 60-14-16-30-28-50-36 14 16 24 32 30 50-22-4-42-2-60 6 22 0 42 6 60 18-20 2-40 8-58 18 22-2 42-2 60 4-12 14-22 30-26 50 14-18 30-30 50-38-2 22 0 42 4 62-2 1-4 8-4 10z" />
    </svg>
  );
}

export function JungleBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      {/* Top-left: large monstera */}
      <Leaf
        variant="monstera"
        className="leaf-sway-1 absolute -left-24 -top-16 h-[28rem] w-[28rem] text-forest-700/[0.07] md:-left-16 md:h-[34rem] md:w-[34rem]"
      />

      {/* Bottom-right: large palm */}
      <Leaf
        variant="palm"
        className="leaf-sway-2 absolute -bottom-24 -right-24 h-[30rem] w-[30rem] text-forest-500/[0.06] md:-bottom-16 md:-right-16 md:h-[40rem] md:w-[40rem]"
      />

      {/* Top-right: small frond */}
      <Leaf
        variant="frond"
        className="leaf-sway-3 absolute right-[-4rem] top-24 hidden h-32 w-[26rem] -rotate-[18deg] text-forest-700/[0.08] md:block"
      />

      {/* Bottom-left: medium monstera */}
      <Leaf
        variant="monstera"
        className="leaf-sway-4 absolute -bottom-20 left-[-4rem] hidden h-72 w-72 rotate-[35deg] text-forest-500/[0.06] md:block"
      />

      <style>{`
        @keyframes leaf-sway-a { 0%, 100% { transform: translate(0,0) rotate(0); } 50% { transform: translate(8px, -6px) rotate(2deg); } }
        @keyframes leaf-sway-b { 0%, 100% { transform: translate(0,0) rotate(0); } 50% { transform: translate(-10px, 4px) rotate(-2.5deg); } }
        @keyframes leaf-sway-c { 0%, 100% { transform: rotate(-18deg) translateX(0); } 50% { transform: rotate(-15deg) translateX(-6px); } }
        @keyframes leaf-sway-d { 0%, 100% { transform: rotate(35deg) translate(0,0); } 50% { transform: rotate(38deg) translate(4px, -4px); } }
        .leaf-sway-1 { animation: leaf-sway-a 14s ease-in-out infinite; transform-origin: center; }
        .leaf-sway-2 { animation: leaf-sway-b 18s ease-in-out infinite; transform-origin: center; }
        .leaf-sway-3 { animation: leaf-sway-c 12s ease-in-out infinite; }
        .leaf-sway-4 { animation: leaf-sway-d 16s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .leaf-sway-1, .leaf-sway-2, .leaf-sway-3, .leaf-sway-4 { animation: none; }
        }
      `}</style>
    </div>
  );
}
