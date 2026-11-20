import { motion, useReducedMotion } from "framer-motion";
import { BananaSlice, MangoCube, MintLeaf, PineappleChunk, Strawberry } from "./pieces";

export type Flavour = "mango" | "strawberry" | "pineapple" | "cucumber";

const palette: Record<Flavour, { top: string; mid: string; bot: string; foam: string; straw: string }> = {
  mango: { top: "#FFB13B", mid: "#FB8C0E", bot: "#DC6A00", foam: "#FFD98A", straw: "#F28B1E" },
  strawberry: { top: "#FFB5C3", mid: "#F2809A", bot: "#D2506F", foam: "#FFE0E5", straw: "#E0344B" },
  pineapple: { top: "#FFE680", mid: "#FBCB2A", bot: "#E3A600", foam: "#FFF8D2", straw: "#3E9B6A" },
  cucumber: { top: "#A6D86E", mid: "#74B33F", bot: "#4C8A27", foam: "#D8F0B8", straw: "#E0344B" },
};

const MangoSlice = () => (
  <g filter="url(#ss-soft)">
    <path d="M-34,6 C-30,-18 0,-30 34,-14 C20,-6 4,4 -34,6Z" fill="#6E9A2E" />
    <path d="M-32,4 C-28,-16 0,-26 31,-13 C18,-6 2,2 -32,4Z" fill="url(#ss-mango-top)" />
    {[-20, -10, 0, 10, 20].map((x) => <path key={x} d={`M${x},${-14 + Math.abs(x) * 0.3} L${x + 4},${-2 + Math.abs(x) * 0.1}`} stroke="#E99400" strokeWidth="1" opacity=".5" />)}
    <path d="M-24,-6 C-14,-16 4,-20 22,-14" stroke="#fff" strokeWidth="2" opacity=".55" fill="none" strokeLinecap="round" />
  </g>
);
const PineWedge = () => (
  <g filter="url(#ss-soft)">
    <path d="M-30,-22 L32,-22 L0,30Z" fill="url(#ss-pine)" />
    <path d="M-34,-26 L36,-26 L32,-20 L-30,-20Z" fill="#B07A2A" />
    {[-24, -12, 0, 12, 24].map((x) => <path key={x} d={`M${x},-24 l2,-3 l2,3`} fill="#6B4A16" />)}
    {[-16, -6, 4, 14].map((x) => <path key={x} d={`M${x},-18 L${x * 0.2},20`} stroke="#E3AE00" strokeWidth="1" opacity=".5" />)}
    <path d="M-6,-4 L4,-4 L0,10Z" fill="#FFF7CC" opacity=".8" />
  </g>
);
const MelonWedge = () => (
  <g filter="url(#ss-soft)">
    <path d="M-34,-10 C-20,22 20,22 34,-10Z" fill="#2E7D3A" />
    <path d="M-31,-9 C-18,17 18,17 31,-9Z" fill="#E6F2C8" />
    <path d="M-28,-8 C-16,13 16,13 28,-8Z" fill="#F0445C" />
    <path d="M-28,-8 L28,-8" stroke="#F86C80" strokeWidth="2" />
    {[[-14, -2], [-4, 3], [8, 0], [16, -4], [2, 8]].map(([x, y], i) => <ellipse key={i} cx={x} cy={y} rx="1.4" ry="2.4" fill="#2A1A1A" transform={`rotate(${x} ${x} ${y})`} />)}
  </g>
);
const CucumberSlice = () => (
  <g filter="url(#ss-soft)">
    <circle r="17" fill="#2F6B2A" />
    <circle r="15" fill="#BFE39A" />
    <circle r="11" fill="#E4F4CF" />
    {[0, 60, 120, 180, 240, 300].map((a) => <ellipse key={a} cx={Math.cos((a * Math.PI) / 180) * 5} cy={Math.sin((a * Math.PI) / 180) * 5} rx="1.4" ry="2.2" fill="#FBFFF2" stroke="#C8E3A8" strokeWidth=".5" transform={`rotate(${a + 90} ${Math.cos((a * Math.PI) / 180) * 5} ${Math.sin((a * Math.PI) / 180) * 5})`} />)}
    <ellipse cx="-6" cy="-8" rx="5" ry="2" fill="#fff" opacity=".45" transform="rotate(-30 -6 -8)" />
  </g>
);

const drops = [[86, 230, 3], [96, 300, 2.2], [214, 260, 2.6], [206, 340, 2], [92, 372, 2.4], [220, 196, 1.8], [104, 190, 1.6]];

export const Smoothie = ({ flavour, small = false }: { flavour: Flavour; small?: boolean }) => {
  const c = palette[flavour];
  const reduce = useReducedMotion();
  const id = `sm-${flavour}${small ? "-s" : ""}`;
  return (
    <svg viewBox="0 0 300 470" className="h-full w-auto overflow-visible" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-liq`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={c.top} /><stop offset=".5" stopColor={c.mid} /><stop offset="1" stopColor={c.bot} /></linearGradient>
        <linearGradient id={`${id}-side`} x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#000" stopOpacity=".18" /><stop offset=".2" stopColor="#000" stopOpacity="0" /><stop offset=".8" stopColor="#000" stopOpacity="0" /><stop offset="1" stopColor="#000" stopOpacity=".22" /></linearGradient>
        <clipPath id={`${id}-in`}><path d="M66,128 L234,128 L218,430 Q216,440 206,440 L94,440 Q84,440 82,430 Z" /></clipPath>
      </defs>
      {!small && <ellipse cx="150" cy="458" rx="104" ry="10" fill="#000" opacity=".22" filter="url(#ss-blur)" />}
      {/* straw behind */}
      <g transform="rotate(14 190 150) translate(0,-10)">
        <rect x="183" y="16" width="14" height="190" rx="7" fill="#fff" />
        {[0, 1, 2, 3, 4, 5, 6].map((i) => <path key={i} d={`M183,${26 + i * 26} L197,${16 + i * 26} L197,${28 + i * 26} L183,${38 + i * 26}Z`} fill={c.straw} />)}
        <rect x="183" y="16" width="5" height="190" rx="2.5" fill="#fff" opacity=".35" />
      </g>
      {/* drink */}
      <g clipPath={`url(#${id}-in)`}>
        <rect x="60" y="120" width="190" height="330" fill={`url(#${id}-liq)`} filter="url(#ss-tex)" />
        <rect x="60" y="120" width="190" height="330" fill={`url(#${id}-side)`} />
        <motion.path
          fill={c.foam}
          d="M60,150 C100,138 130,160 160,148 C190,136 220,156 250,146 L250,120 L60,120Z"
          animate={reduce || small ? undefined : { d: ["M60,150 C100,138 130,160 160,148 C190,136 220,156 250,146 L250,120 L60,120Z", "M60,146 C100,158 130,138 160,150 C190,160 220,140 250,150 L250,120 L60,120Z", "M60,150 C100,138 130,160 160,148 C190,136 220,156 250,146 L250,120 L60,120Z"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        {[[96, 140, 3], [128, 146, 2], [176, 142, 2.6], [206, 138, 1.8], [150, 136, 1.5]].map(([x, y, r], i) => <circle key={i} cx={x} cy={y} r={r} fill="#fff" opacity=".55" />)}
        <path d="M100,170 C96,240 110,300 104,420 M150,180 C156,250 144,330 152,430 M196,170 C190,250 204,320 196,420" stroke="#fff" strokeWidth="10" opacity=".08" fill="none" strokeLinecap="round" />
        <path d="M60,410 L250,410 L250,450 L60,450Z" fill="#fff" opacity=".18" />
      </g>
      {/* glass */}
      <path d="M58,110 L242,110 L224,436 Q222,452 206,452 L94,452 Q78,452 76,436 Z" fill="#fff" fillOpacity=".08" stroke="#fff" strokeOpacity=".9" strokeWidth="4" strokeLinejoin="round" />
      <path d="M74,128 L92,420" stroke="#fff" strokeWidth="8" strokeLinecap="round" opacity=".38" />
      <path d="M88,132 L100,300" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" opacity=".5" />
      <path d="M228,132 L214,400" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity=".3" />
      <path d="M80,420 Q150,436 220,420 L218,438 Q216,450 204,450 L96,450 Q84,450 82,438Z" fill="#fff" opacity=".35" />
      <path d="M82,428 Q150,446 218,428" stroke="#fff" strokeWidth="5" fill="none" opacity=".6" />
      <path d="M54,110 L246,110" stroke="#fff" strokeWidth="6" strokeLinecap="round" />
      <path d="M60,112 C64,86 100,78 150,80 C200,78 236,86 240,112 Z" fill={c.foam} />
      <path d="M60,112 C64,86 100,78 150,80 C200,78 236,86 240,112 Z" fill={`url(#${id}-liq)`} opacity=".35" />
      <path d="M84,96 C110,86 140,88 170,86 M100,104 C130,98 160,100 200,96" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity=".5" fill="none" />
      {[[92, 100, 3], [128, 92, 2.2], [182, 90, 2.6], [214, 100, 2], [156, 98, 1.6]].map(([x, y, r], i) => <circle key={`f${i}`} cx={x} cy={y} r={r} fill="#fff" opacity=".6" />)}
      {!small && drops.map(([x, y, r], i) => (
        <g key={i}><ellipse cx={x} cy={y} rx={r} ry={r * 1.25} fill="#fff" opacity=".35" /><circle cx={x - r * 0.3} cy={y - r * 0.4} r={r * 0.35} fill="#fff" opacity=".8" /></g>
      ))}
      {/* garnish */}
      {flavour === "mango" && (<><g transform="translate(70,98) rotate(-28) scale(1.5)"><MangoSlice /></g><g transform="translate(120,84) scale(1.9) rotate(-10)"><MangoCube /></g><g transform="translate(160,80) scale(1.6) rotate(15)"><MangoCube /></g><g transform="translate(150,76) scale(1.7)"><MintLeaf /></g></>)}
      {flavour === "strawberry" && (<><g transform="translate(132,84) scale(2.2) rotate(-10)"><BananaSlice /></g><g transform="translate(172,86) scale(1.8) rotate(20)"><BananaSlice /></g><g transform="translate(70,96) scale(3) rotate(-24)"><Strawberry /></g></>)}
      {flavour === "pineapple" && (<><g transform="translate(72,84) rotate(-24) scale(1.7)"><PineWedge /></g><g transform="translate(150,82) scale(1.8) rotate(12)"><PineappleChunk /></g><g transform="translate(168,72) scale(1.5)"><MintLeaf /></g></>)}
      {flavour === "cucumber" && (<><g transform="translate(76,92) rotate(-30) scale(1.7)"><MelonWedge /></g><g transform="translate(214,96) rotate(70) scale(1.8)"><CucumberSlice /></g><g transform="translate(150,78) scale(1.7)"><MintLeaf /></g></>)}
    </svg>
  );
};
