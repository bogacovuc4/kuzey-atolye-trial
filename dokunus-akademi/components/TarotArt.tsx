/**
 * Dokunuş Akademi'ye özgü tarot kartı çizimleri.
 * Her kart; ortak bir çerçeve ve kartın arketipine özel, altın çizgilerle
 * çizilmiş sembolik bir motiften oluşur. Tamamı SVG — görsel dosyası gerekmez.
 */
import type { TarotCard } from "@/content/tarot";
import type { ReactNode } from "react";
const f = (n: number) => Math.round(n * 100) / 100;


const G = "var(--card-gold, #d9bf8c)";
const L = "var(--card-lav, #c7b8e6)";

function starPath(cx: number, cy: number, r: number, points = 5, inner = 0.45) {
  const pts: string[] = [];
  for (let i = 0; i < points * 2; i++) {
    const rad = i % 2 === 0 ? r : r * inner;
    const a = (Math.PI * i) / points - Math.PI / 2;
    pts.push(`${(cx + rad * Math.cos(a)).toFixed(2)},${(cy + rad * Math.sin(a)).toFixed(2)}`);
  }
  return `M${pts.join("L")}Z`;
}

const Star = ({ x, y, r, p = 5, i = 0.45, fill = G }: { x: number; y: number; r: number; p?: number; i?: number; fill?: string }) => (
  <path d={starPath(x, y, r, p, i)} fill={fill} />
);

function Rays({ cx, cy, r1, r2, n, w = 1 }: { cx: number; cy: number; r1: number; r2: number; n: number; w?: number }) {
  return (
    <g stroke={G} strokeWidth={w} strokeLinecap="round">
      {Array.from({ length: n }, (_, k) => {
        const a = (2 * Math.PI * k) / n;
        return <line key={k} x1={f(cx + r1 * Math.cos(a))} y1={f(cy + r1 * Math.sin(a))} x2={f(cx + r2 * Math.cos(a))} y2={f(cy + r2 * Math.sin(a))} />;
      })}
    </g>
  );
}

const Waves = ({ y, n = 3 }: { y: number; n?: number }) => (
  <g fill="none" stroke={L} strokeWidth="1.2" opacity="0.8">
    {Array.from({ length: n }, (_, k) => (
      <path key={k} d={`M40 ${y + k * 9} q10 -6 20 0 t20 0 t20 0 t20 0 t20 0 t20 0`} />
    ))}
  </g>
);

const Infinity = ({ x, y, s = 1 }: { x: number; y: number; s?: number }) => (
  <path transform={`translate(${x} ${y}) scale(${s})`} d="M0 0 c-6 -8 -18 -8 -18 0 s12 8 18 0 s18 -8 18 0 s-12 8 -18 0" fill="none" stroke={G} strokeWidth="1.6" />
);

const motifs: Record<number, ReactNode> = {
  0: (
    <g>
      <path d="M100 210 m-46 0 a46 46 0 0 1 92 0" fill="none" stroke={G} strokeWidth="1.6" />
      <Rays cx={100} cy={210} r1={52} r2={66} n={24} />
      <rect x="40" y="210" width="120" height="0.1" stroke={G} />
      <path d="M40 210 L40 250 L95 250 L120 228 L160 228" fill="none" stroke={G} strokeWidth="1.4" />
      <circle cx="132" cy="196" r="6" fill="none" stroke={L} strokeWidth="1.3" />
      <path d="M132 202 v18" stroke={L} strokeWidth="1.2" />
      <path d="M118 140 l14 -26 l14 26" fill="none" stroke={G} strokeWidth="1.2" />
      <Star x={132} y={104} r={6} />
    </g>
  ),
  1: (
    <g>
      <Infinity x={100} y={106} s={1.4} />
      <line x1="100" y1="128" x2="100" y2="218" stroke={G} strokeWidth="2" strokeLinecap="round" />
      <circle cx="100" cy="128" r="4" fill={G} />
      <line x1="44" y1="232" x2="156" y2="232" stroke={G} strokeWidth="1.4" />
      <path d="M52 222 h16 l-3 9 h-10z" fill="none" stroke={L} strokeWidth="1.2" />
      <path d="M82 230 v-18 M78 216 h8" stroke={L} strokeWidth="1.2" />
      <circle cx="122" cy="223" r="7" fill="none" stroke={L} strokeWidth="1.2" />
      <path d={starPath(122, 223, 5, 5, 0.4)} fill="none" stroke={L} strokeWidth="0.8" />
      <path d="M145 230 v-20" stroke={L} strokeWidth="1.4" />
      <Rays cx={100} cy={170} r1={22} r2={30} n={12} w={0.8} />
    </g>
  ),
  2: (
    <g>
      <rect x="46" y="110" width="16" height="130" fill="none" stroke={G} strokeWidth="1.4" />
      <rect x="138" y="110" width="16" height="130" fill={G} opacity="0.85" />
      <text x="54" y="104" fontSize="11" fill={G} textAnchor="middle" fontFamily="serif">B</text>
      <text x="146" y="104" fontSize="11" fill={G} textAnchor="middle" fontFamily="serif">J</text>
      <path d="M62 120 q38 30 76 0 v110 q-38 20 -76 0z" fill={L} opacity="0.12" />
      <path d="M112 150 a26 26 0 1 1 0 44 a20 20 0 1 0 0 -44z" fill={G} />
      <path d="M78 214 q22 18 44 0" fill="none" stroke={L} strokeWidth="1.2" />
    </g>
  ),
  3: (
    <g>
      {Array.from({ length: 12 }, (_, k) => {
        const a = Math.PI + (Math.PI * k) / 11;
        return <Star key={k} x={f(100 + 50 * Math.cos(a))} y={f(150 + 40 * Math.sin(a))} r={4} />;
      })}
      <circle cx="100" cy="168" r="22" fill="none" stroke={G} strokeWidth="1.6" />
      <path d="M100 190 v28 M88 206 h24" stroke={G} strokeWidth="1.6" />
      {[56, 144].map((x) => (
        <g key={x} stroke={L} strokeWidth="1.1" fill="none">
          <path d={`M${x} 250 v-50`} />
          {[0, 1, 2, 3].map((k) => (
            <path key={k} d={`M${x} ${210 + k * 9} q-7 -6 -6 -12 M${x} ${210 + k * 9} q7 -6 6 -12`} />
          ))}
        </g>
      ))}
    </g>
  ),
  4: (
    <g>
      <path d="M36 240 L70 170 L92 205 L118 150 L164 240z" fill={L} opacity="0.14" stroke={L} strokeWidth="1" />
      <rect x="70" y="150" width="60" height="70" fill="none" stroke={G} strokeWidth="1.6" />
      <path d="M70 150 q-14 -18 -2 -30 q8 10 2 30 M130 150 q14 -18 2 -30 q-8 10 -2 30" fill="none" stroke={G} strokeWidth="1.3" />
      <circle cx="100" cy="118" r="8" fill="none" stroke={G} strokeWidth="1.5" />
      <path d="M100 126 v68 M90 140 h20" stroke={G} strokeWidth="1.6" />
      <path d="M78 228 h44" stroke={G} strokeWidth="1.4" />
    </g>
  ),
  5: (
    <g>
      <path d="M86 120 h28 M82 132 h36 M78 144 h44" stroke={G} strokeWidth="1.6" />
      <path d="M100 100 v10" stroke={G} strokeWidth="1.6" />
      <Star x={100} y={96} r={5} />
      <g transform="rotate(35 100 200)" stroke={G} strokeWidth="1.6" fill="none">
        <circle cx="100" cy="166" r="9" />
        <path d="M100 175 v62 M100 222 h10 M100 232 h8" />
      </g>
      <g transform="rotate(-35 100 200)" stroke={L} strokeWidth="1.6" fill="none">
        <circle cx="100" cy="166" r="9" />
        <path d="M100 175 v62 M100 222 h-10 M100 232 h-8" />
      </g>
    </g>
  ),
  6: (
    <g>
      <circle cx="100" cy="112" r="16" fill={G} />
      <Rays cx={100} cy={112} r1={20} r2={30} n={16} />
      <circle cx="84" cy="190" r="30" fill="none" stroke={G} strokeWidth="1.5" />
      <circle cx="116" cy="190" r="30" fill="none" stroke={L} strokeWidth="1.5" />
      <path d="M100 166 a30 30 0 0 1 0 48 a30 30 0 0 1 0 -48z" fill={G} opacity="0.3" />
      <path d="M92 238 q8 -8 16 0 q-8 10 -8 14 q0 -4 -8 -14z" fill={G} />
    </g>
  ),
  7: (
    <g>
      <path d="M58 120 h84 v12 h-84z" fill="none" stroke={G} strokeWidth="1.4" />
      {[70, 86, 100, 114, 130].map((x) => <Star key={x} x={x} y={126} r={3} />)}
      <rect x="66" y="132" width="68" height="62" fill="none" stroke={G} strokeWidth="1.6" />
      <path d="M100 150 l10 10 l-10 10 l-10 -10z" fill={G} />
      <circle cx="66" cy="214" r="16" fill="none" stroke={G} strokeWidth="1.4" />
      <circle cx="134" cy="214" r="16" fill="none" stroke={G} strokeWidth="1.4" />
      <Rays cx={66} cy={214} r1={0} r2={16} n={8} w={0.8} />
      <Rays cx={134} cy={214} r1={0} r2={16} n={8} w={0.8} />
      <circle cx="80" cy="246" r="7" fill="#0b0d22" stroke={G} />
      <circle cx="120" cy="246" r="7" fill={L} />
    </g>
  ),
  8: (
    <g>
      <Infinity x={100} y={108} s={1.2} />
      <circle cx="100" cy="186" r="26" fill="none" stroke={G} strokeWidth="1.6" />
      <Rays cx={100} cy={186} r1={30} r2={46} n={28} w={1.1} />
      <circle cx="91" cy="180" r="2.4" fill={G} />
      <circle cx="109" cy="180" r="2.4" fill={G} />
      <path d="M94 194 q6 6 12 0 M100 186 v8" fill="none" stroke={G} strokeWidth="1.3" />
      <path d="M60 246 q40 -20 80 0" fill="none" stroke={L} strokeWidth="1.3" />
    </g>
  ),
  9: (
    <g>
      <path d="M30 250 L100 120 L170 250" fill={L} opacity="0.1" stroke={L} strokeWidth="1" />
      <path d="M100 120 q22 -6 22 -26" fill="none" stroke={G} strokeWidth="1.4" />
      <path d="M110 128 h24 l-4 44 h-16z" fill="none" stroke={G} strokeWidth="1.5" />
      <path d="M114 128 l8 -10 l8 10" fill="none" stroke={G} strokeWidth="1.3" />
      <Star x={122} y={150} r={9} p={6} i={0.5} />
      <Rays cx={122} cy={150} r1={24} r2={32} n={12} w={0.7} />
      <path d="M76 250 v-90" stroke={G} strokeWidth="2" strokeLinecap="round" />
    </g>
  ),
  10: (
    <g>
      <circle cx="100" cy="180" r="56" fill="none" stroke={G} strokeWidth="1.6" />
      <circle cx="100" cy="180" r="40" fill="none" stroke={G} strokeWidth="1" />
      <circle cx="100" cy="180" r="12" fill="none" stroke={G} strokeWidth="1.4" />
      <Rays cx={100} cy={180} r1={12} r2={56} n={8} w={1} />
      {Array.from({ length: 8 }, (_, k) => {
        const a = (2 * Math.PI * k) / 8 + Math.PI / 8;
        return <circle key={k} cx={f(100 + 48 * Math.cos(a))} cy={f(180 + 48 * Math.sin(a))} r="2.5" fill={L} />;
      })}
      {[[40, 112], [160, 112], [40, 252], [160, 252]].map(([x, y]) => <Star key={`${x}${y}`} x={x} y={y} r={5} p={4} i={0.35} />)}
    </g>
  ),
  11: (
    <g>
      <path d="M100 100 v150" stroke={G} strokeWidth="2.2" strokeLinecap="round" />
      <path d="M90 118 h20" stroke={G} strokeWidth="2" />
      <path d="M100 100 l-5 -10 h10z" fill={G} />
      <path d="M50 150 h100" stroke={G} strokeWidth="1.5" />
      <path d="M50 150 l-14 36 h28z M150 150 l-14 36 h28z" fill="none" stroke={L} strokeWidth="1.2" />
      <path d="M36 186 q14 12 28 0 M136 186 q14 12 28 0" fill={L} opacity="0.4" />
      <rect x="70" y="236" width="60" height="10" fill="none" stroke={G} strokeWidth="1.2" />
    </g>
  ),
  12: (
    <g>
      <path d="M50 104 h100 M64 104 v146 M136 104 v146" stroke={L} strokeWidth="2" strokeLinecap="round" />
      <path d="M58 98 l6 -8 l6 8 M130 98 l6 -8 l6 8" fill="none" stroke={L} strokeWidth="1" />
      <path d="M100 104 v34" stroke={G} strokeWidth="1.3" />
      <path d="M100 138 l-18 40 h36z" fill="none" stroke={G} strokeWidth="1.6" />
      <circle cx="100" cy="196" r="10" fill="none" stroke={G} strokeWidth="1.5" />
      <Rays cx={100} cy={196} r1={14} r2={24} n={14} w={0.9} />
    </g>
  ),
  13: (
    <g>
      <path d="M40 218 h120" stroke={G} strokeWidth="1.3" />
      <path d="M78 218 a22 22 0 0 1 44 0" fill={G} />
      <Rays cx={100} cy={218} r1={28} r2={40} n={18} w={0.9} />
      <rect x="44" y="160" width="14" height="58" fill="none" stroke={L} strokeWidth="1.2" />
      <rect x="142" y="160" width="14" height="58" fill="none" stroke={L} strokeWidth="1.2" />
      <Waves y={230} n={2} />
      <g transform="translate(100 128)" fill="none" stroke={G} strokeWidth="1.3">
        {[0, 72, 144, 216, 288].map((r) => <ellipse key={r} cx="0" cy="-8" rx="6" ry="9" transform={`rotate(${r})`} />)}
        <circle r="3.5" fill={G} />
      </g>
    </g>
  ),
  14: (
    <g>
      <path d="M100 104 l20 34 h-40z" fill="none" stroke={G} strokeWidth="1.5" />
      <circle cx="100" cy="128" r="3" fill={G} />
      <path d="M56 160 h28 l-4 22 h-20z" fill="none" stroke={G} strokeWidth="1.5" />
      <path d="M116 200 h28 l-4 22 h-20z" fill="none" stroke={L} strokeWidth="1.5" />
      <path d="M78 164 C110 160 120 176 124 200" fill="none" stroke={L} strokeWidth="2" strokeDasharray="3 4" />
      <Waves y={240} n={2} />
      <path d="M40 236 q30 -6 60 4" fill="none" stroke={G} strokeWidth="1" />
    </g>
  ),
  15: (
    <g>
      <path d={starPath(100, 140, 32, 5, 0.38)} transform="rotate(180 100 140)" fill="none" stroke={G} strokeWidth="1.5" />
      <circle cx="100" cy="140" r="38" fill="none" stroke={G} strokeWidth="1" />
      <g fill="none" stroke={L} strokeWidth="1.4">
        {[0, 1, 2, 3].map((k) => <ellipse key={`l${k}`} cx={70 - k * 2} cy={196 + k * 12} rx="5" ry="7" transform={`rotate(${k % 2 ? 90 : 0} ${70 - k * 2} ${196 + k * 12})`} />)}
        {[0, 1, 2, 3].map((k) => <ellipse key={`r${k}`} cx={130 + k * 2} cy={196 + k * 12} rx="5" ry="7" transform={`rotate(${k % 2 ? 90 : 0} ${130 + k * 2} ${196 + k * 12})`} />)}
      </g>
      <path d="M62 248 h76" stroke={G} strokeWidth="1.3" />
      <path d="M134 238 l10 -6" stroke={L} strokeWidth="1.4" />
    </g>
  ),
  16: (
    <g>
      <path d="M78 250 V146 h44 V250" fill="none" stroke={G} strokeWidth="1.6" />
      <path d="M72 146 l8 -14 h40 l8 14z" fill="none" stroke={G} strokeWidth="1.4" />
      <path d="M86 132 l4 -10 l6 6 l4 -10 l4 10 l6 -6 l4 10" fill="none" stroke={L} strokeWidth="1.2" transform="rotate(-24 100 120) translate(18 -6)" />
      <path d="M150 96 l-24 34 h14 l-22 36" fill="none" stroke={G} strokeWidth="2.2" strokeLinejoin="round" />
      <rect x="92" y="170" width="16" height="22" fill="none" stroke={G} strokeWidth="1.1" />
      {[[60, 170], [148, 188], [54, 210], [150, 220], [66, 140]].map(([x, y]) => <Star key={`${x}${y}`} x={x} y={y} r={3.5} p={4} i={0.3} />)}
    </g>
  ),
  17: (
    <g>
      <Star x={100} y={136} r={30} p={8} i={0.38} />
      <path d={starPath(100, 136, 20, 8, 0.5)} fill="#0e1230" />
      {[[52, 108], [148, 108], [44, 150], [156, 150], [62, 186], [138, 186], [100, 92]].map(([x, y]) => (
        <Star key={`${x}${y}`} x={x} y={y} r={5} p={8} i={0.4} fill={L} />
      ))}
      <Waves y={226} n={3} />
      <path d="M72 206 c10 -6 18 6 30 0 c12 -6 18 6 28 0" fill="none" stroke={G} strokeWidth="1.2" />
    </g>
  ),
  18: (
    <g>
      <circle cx="100" cy="126" r="28" fill={L} opacity="0.25" />
      <path d="M112 100 a28 28 0 1 0 0 52 a22 22 0 1 1 0 -52z" fill={G} />
      <Rays cx={100} cy={126} r1={34} r2={44} n={20} w={0.7} />
      <rect x="40" y="168" width="16" height="44" fill="none" stroke={L} strokeWidth="1.2" />
      <rect x="144" y="168" width="16" height="44" fill="none" stroke={L} strokeWidth="1.2" />
      <path d="M100 212 C80 196 120 186 100 168" fill="none" stroke={G} strokeWidth="1.3" strokeDasharray="2 4" />
      <Waves y={226} n={3} />
      <path d="M92 238 q8 -10 16 0" fill="none" stroke={G} strokeWidth="1.5" />
    </g>
  ),
  19: (
    <g>
      <circle cx="100" cy="150" r="30" fill={G} />
      <g fill="none" stroke={G} strokeWidth="1.4">
        {Array.from({ length: 16 }, (_, k) => {
          const a = (2 * Math.PI * k) / 16;
          const x1 = f(100 + 36 * Math.cos(a)), y1 = f(150 + 36 * Math.sin(a));
          const x2 = f(100 + 56 * Math.cos(a)), y2 = f(150 + 56 * Math.sin(a));
          const mx = f(100 + 46 * Math.cos(a + 0.12)), my = f(150 + 46 * Math.sin(a + 0.12));
          return k % 2 ? <line key={k} x1={x1} y1={y1} x2={x2} y2={y2} /> : <path key={k} d={`M${x1} ${y1} Q${mx} ${my} ${x2} ${y2}`} />;
        })}
      </g>
      <path d="M40 236 h120" stroke={G} strokeWidth="1.2" />
      {[56, 80, 120, 144].map((x) => (
        <g key={x}>
          <path d={`M${x} 236 v-20`} stroke={L} strokeWidth="1.1" />
          <circle cx={x} cy={212} r="6" fill="none" stroke={G} strokeWidth="1.1" />
          <circle cx={x} cy={212} r="2.2" fill={G} />
        </g>
      ))}
    </g>
  ),
  20: (
    <g>
      <Rays cx={100} cy={96} r1={6} r2={70} n={20} w={0.5} />
      <path d="M66 128 L128 108 l6 -10 l4 22 l-10 -6 L70 136z" fill="none" stroke={G} strokeWidth="1.5" />
      <path d="M104 120 h12 v14 h-12z M110 120 v14 M104 127 h12" stroke={L} strokeWidth="0.9" fill="none" />
      {[64, 100, 136].map((x) => (
        <g key={x} fill="none" stroke={G} strokeWidth="1.4">
          <circle cx={x} cy={196} r="7" />
          <path d={`M${x} 203 v22 M${x - 12} 196 l12 12 l12 -12`} />
        </g>
      ))}
      <Waves y={238} n={2} />
    </g>
  ),
  21: (
    <g>
      <ellipse cx="100" cy="176" rx="40" ry="62" fill="none" stroke={G} strokeWidth="1.8" />
      <g stroke={L} strokeWidth="1" fill="none">
        {Array.from({ length: 14 }, (_, k) => {
          const a = (2 * Math.PI * k) / 14;
          const x = f(100 + 40 * Math.cos(a)), y = f(176 + 62 * Math.sin(a));
          return <ellipse key={k} cx={x} cy={y} rx="3" ry="6" transform={`rotate(${f((a * 180) / Math.PI)} ${x} ${y})`} />;
        })}
      </g>
      <Star x={100} y={170} r={18} p={5} i={0.42} />
      <path d="M100 190 v20" stroke={G} strokeWidth="1.2" />
      {[[42, 108], [158, 108], [42, 250], [158, 250]].map(([x, y]) => (
        <circle key={`${x}${y}`} cx={x} cy={y} r="7" fill="none" stroke={G} strokeWidth="1.2" />
      ))}
    </g>
  ),
};

export function TarotFace({ card, className }: { card: TarotCard; className?: string }) {
  const id = `c${card.id}`;
  return (
    <svg viewBox="0 0 200 340" className={className} role="img" aria-label={`${card.name} kartı`}>
      <defs>
        <linearGradient id={`${id}bg`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#151a3f" />
          <stop offset="0.6" stopColor="#24164a" />
          <stop offset="1" stopColor="#0c0e26" />
        </linearGradient>
        <radialGradient id={`${id}glow`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#d9bf8c" stopOpacity="0.22" />
          <stop offset="1" stopColor="#d9bf8c" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="200" height="340" rx="12" fill={`url(#${id}bg)`} />
      <circle cx="100" cy="176" r="96" fill={`url(#${id}glow)`} />
      {[[30, 40], [170, 52], [24, 300], [176, 290], [150, 80], [52, 76], [160, 270], [40, 270]].map(([x, y], k) => (
        <circle key={k} cx={x} cy={y} r={k % 3 ? 0.8 : 1.3} fill="#f5ecd7" opacity="0.7" />
      ))}
      <rect x="8" y="8" width="184" height="324" rx="8" fill="none" stroke={G} strokeWidth="1.2" />
      <rect x="14" y="14" width="172" height="312" rx="5" fill="none" stroke={G} strokeWidth="0.5" opacity="0.6" />
      {[[14, 14], [186, 14], [14, 326], [186, 326]].map(([x, y]) => (
        <path key={`${x}${y}`} d={starPath(x, y, 5, 4, 0.3)} fill={G} />
      ))}
      <text x="100" y="50" textAnchor="middle" fill={G} fontSize="20" fontFamily="var(--font-display), serif" letterSpacing="2">
        {card.numeral}
      </text>
      <path d="M70 60 h60" stroke={G} strokeWidth="0.6" opacity="0.7" />
      {motifs[card.id]}
      <path d="M50 282 h100" stroke={G} strokeWidth="0.6" opacity="0.7" />
      <text x="100" y="306" textAnchor="middle" fill="#f5ecd7" fontSize="17" fontFamily="var(--font-display), serif" letterSpacing="1.5">
        {card.name.toLocaleUpperCase("tr-TR")}
      </text>
    </svg>
  );
}

export function TarotBack({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 340" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="backbg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1a1446" />
          <stop offset="1" stopColor="#0b0d24" />
        </linearGradient>
      </defs>
      <rect width="200" height="340" rx="12" fill="url(#backbg)" />
      <rect x="8" y="8" width="184" height="324" rx="8" fill="none" stroke={G} strokeWidth="1.2" />
      <rect x="16" y="16" width="168" height="308" rx="5" fill="none" stroke={G} strokeWidth="0.5" opacity="0.6" />
      <g fill="none" stroke={G} strokeWidth="0.8" opacity="0.9">
        {[0, 60, 120, 180, 240, 300].map((r) => (
          <circle key={r} cx={f(100 + 26 * Math.cos((r * Math.PI) / 180))} cy={f(170 + 26 * Math.sin((r * Math.PI) / 180))} r="26" />
        ))}
        <circle cx="100" cy="170" r="26" />
        <circle cx="100" cy="170" r="52" />
        <circle cx="100" cy="170" r="60" strokeDasharray="1 3" />
      </g>
      <path d="M106 158 a13 13 0 1 0 0 24 a10 10 0 1 1 0 -24z" fill={G} opacity="0.95" />
      <path d={starPath(100, 62, 6, 8, 0.4)} fill={G} />
      <path d={starPath(100, 278, 6, 8, 0.4)} fill={G} />
      <text x="100" y="304" textAnchor="middle" fill={G} fontSize="9" letterSpacing="4" fontFamily="var(--font-body), sans-serif">
        DOKUNUŞ
      </text>
    </svg>
  );
}
