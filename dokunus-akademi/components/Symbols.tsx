import type { Symbol } from "@/content/services";
const f = (n: number) => Math.round(n * 100) / 100;


type P = { className?: string; size?: number };

const paths: Record<Symbol, React.ReactNode> = {
  sun: (
    <>
      <circle cx="32" cy="32" r="10" />
      {Array.from({ length: 12 }, (_, k) => {
        const a = (Math.PI * 2 * k) / 12;
        const r1 = k % 2 ? 15 : 14, r2 = k % 2 ? 20 : 25;
        return <line key={k} x1={f(32 + r1 * Math.cos(a))} y1={f(32 + r1 * Math.sin(a))} x2={f(32 + r2 * Math.cos(a))} y2={f(32 + r2 * Math.sin(a))} />;
      })}
    </>
  ),
  atom: (
    <>
      <ellipse cx="32" cy="32" rx="24" ry="9" />
      <ellipse cx="32" cy="32" rx="24" ry="9" transform="rotate(60 32 32)" />
      <ellipse cx="32" cy="32" rx="24" ry="9" transform="rotate(-60 32 32)" />
      <circle cx="32" cy="32" r="3" fill="currentColor" />
    </>
  ),
  eye: (
    <>
      <path d="M6 32 Q32 8 58 32 Q32 56 6 32Z" />
      <circle cx="32" cy="32" r="8" />
      <circle cx="32" cy="32" r="3" fill="currentColor" />
      <path d="M32 6 v6 M32 52 v6 M14 14 l4 4 M50 14 l-4 4" />
    </>
  ),
  moon: (
    <>
      <path d="M38 10 a22 22 0 1 0 0 44 a17 17 0 1 1 0 -44Z" />
      <path d="M48 18 l1.5 3.5 l3.5 1.5 l-3.5 1.5 l-1.5 3.5 l-1.5 -3.5 l-3.5 -1.5 l3.5 -1.5Z" fill="currentColor" />
    </>
  ),
  lotus: (
    <>
      <path d="M32 50 C24 40 24 26 32 14 C40 26 40 40 32 50Z" />
      <path d="M32 50 C22 46 14 36 12 24 C22 28 30 36 32 50Z" />
      <path d="M32 50 C42 46 50 36 52 24 C42 28 34 36 32 50Z" />
      <path d="M10 52 Q32 60 54 52" />
    </>
  ),
  spiral: (
    <>
      <path d="M32 32 m0 -2 a2 2 0 1 1 -2 2 a4 4 0 0 1 4 -4 a6 6 0 0 1 6 6 a8 8 0 0 1 -8 8 a10 10 0 0 1 -10 -10 a12 12 0 0 1 12 -12 a14 14 0 0 1 14 14 a16 16 0 0 1 -16 16 a18 18 0 0 1 -18 -18" />
    </>
  ),
};

export function SymbolIcon({ name, className, size = 48 }: P & { name: Symbol }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} className={className} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

export function LogoMark({ className, size = 40 }: P) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} className={className} fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
      <circle cx="32" cy="32" r="29" />
      <circle cx="32" cy="32" r="24" strokeWidth="0.6" />
      {[0, 60, 120, 180, 240, 300].map((r) => (
        <circle key={r} cx={f(32 + 9 * Math.cos((r * Math.PI) / 180))} cy={f(32 + 9 * Math.sin((r * Math.PI) / 180))} r="9" strokeWidth="0.7" />
      ))}
      <path d="M36 20 a12 12 0 1 0 0 24 a9 9 0 1 1 0 -24Z" fill="currentColor" stroke="none" />
      <path d="M32 2 l1 3 l3 1 l-3 1 l-1 3 l-1 -3 l-3 -1 l3 -1Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Kutsal geometri / mandala dekoru (Hayat Çiçeği + yıldız halkaları). */
export function Mandala({ className }: { className?: string }) {
  const petals = [0, 60, 120, 180, 240, 300];
  return (
    <svg viewBox="0 0 400 400" className={className} fill="none" stroke="currentColor" aria-hidden="true">
      <g strokeWidth="0.6">
        <circle cx="200" cy="200" r="190" />
        <circle cx="200" cy="200" r="182" strokeDasharray="1 5" />
        <circle cx="200" cy="200" r="150" />
        <circle cx="200" cy="200" r="40" />
        {petals.map((r) => (
          <circle key={r} cx={f(200 + 40 * Math.cos((r * Math.PI) / 180))} cy={f(200 + 40 * Math.sin((r * Math.PI) / 180))} r="40" />
        ))}
        {petals.map((r) => (
          <circle key={`o${r}`} cx={f(200 + 80 * Math.cos(((r + 30) * Math.PI) / 180))} cy={f(200 + 80 * Math.sin(((r + 30) * Math.PI) / 180))} r="40" opacity="0.6" />
        ))}
        {petals.map((r) => (
          <circle key={`p${r}`} cx={f(200 + 80 * Math.cos((r * Math.PI) / 180))} cy={f(200 + 80 * Math.sin((r * Math.PI) / 180))} r="40" opacity="0.4" />
        ))}
        <path d="M200 50 L330 275 L70 275Z" opacity="0.5" />
        <path d="M200 350 L70 125 L330 125Z" opacity="0.5" />
        {Array.from({ length: 48 }, (_, k) => {
          const a = (Math.PI * 2 * k) / 48;
          return <line key={k} x1={f(200 + 150 * Math.cos(a))} y1={f(200 + 150 * Math.sin(a))} x2={f(200 + (k % 2 ? 160 : 176) * Math.cos(a))} y2={f(200 + (k % 2 ? 160 : 176) * Math.sin(a))} />;
        })}
      </g>
    </svg>
  );
}
