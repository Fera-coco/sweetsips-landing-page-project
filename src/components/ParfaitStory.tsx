import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, MotionValue, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";

const steps = [
  { t: "Start with creamy yogurt.", d: "Thick Greek yogurt is the base of every parfait.", bg: "#FFD9DF" },
  { t: "Add the crunch.", d: "A layer of golden granola for that bite.", bg: "#FFF1C2" },
  { t: "Pile on fresh fruit.", d: "Mango, strawberries and blueberries, cut fresh every day.", bg: "#D7F0E2" },
  { t: "Finish with honey.", d: "A drizzle on top, and it's ready for you.", bg: "#FFE3A3" },
];

const Drop = ({ p, from, to, x, y, r = 0, children }: { p: MotionValue<number>; from: number; to: number; x: number; y: number; r?: number; children: React.ReactNode }) => {
  const ty = useTransform(p, [from, to], [y - 460, y]);
  const rot = useTransform(p, [from, to], [r - 90, r]);
  const o = useTransform(p, [from, from + 0.01], [0, 1]);
  return <motion.g style={{ x, y: ty, rotate: rot, opacity: o }}>{children}</motion.g>;
};

const Blueberry = () => (<g><circle r="11" fill="#34407A" /><circle cx="-4" cy="-4" r="3.5" fill="#7484C9" opacity=".8" /><path d="M-3,-10 L0,-7 L3,-10" stroke="#1E2650" strokeWidth="1.6" fill="none" /></g>);
const Strawberry = ({ leaf = false }: { leaf?: boolean }) => (
  <g>
    <path d="M0,-15 C13,-16 19,-4 15,6 C11,15 3,20 0,22 C-3,20 -11,15 -15,6 C-19,-4 -13,-16 0,-15Z" fill="#E0344B" />
    {leaf ? (
      <>
        {[-8, 0, 8].map((s, i) => <circle key={i} cx={s * 0.8} cy={i % 2 ? 4 : 10} r="1.3" fill="#FFE7A0" />)}
        <path d="M-10,-14 L-3,-12 L0,-20 L3,-12 L10,-14 L4,-9 L-4,-9Z" fill="#3E9B6A" />
      </>
    ) : (
      <path d="M0,-8 C7,-8 10,-1 8,5 C6,10 2,13 0,14 C-2,13 -6,10 -8,5 C-10,-1 -7,-8 0,-8Z" fill="#FF97A6" />
    )}
  </g>
);
const Mango = () => <rect x="-11" y="-11" width="22" height="22" rx="5" fill="#FFB627" stroke="#F29A00" strokeWidth="1.5" />;

const granola = Array.from({ length: 34 }, (_, i) => ({
  x: 92 + ((i * 37) % 140), y: 312 + ((i * 13) % 26), rx: 6 + (i % 3) * 1.5, ry: 4 + (i % 2) * 1.5, c: ["#C98A3E", "#A86A2A", "#E0A85A"][i % 3], r: (i * 47) % 180,
}));

const fruit = [
  // band pressed against the glass inside the second yogurt layer
  { k: "s", x: 96, y: 262, r: -20 }, { k: "b", x: 136, y: 282 }, { k: "m", x: 172, y: 258, r: 12 }, { k: "s", x: 216, y: 268, r: 25 },
  { k: "b", x: 118, y: 222 }, { k: "m", x: 150, y: 212, r: -10 }, { k: "b", x: 196, y: 226 }, { k: "s", x: 226, y: 208, r: -18 }, { k: "b", x: 94, y: 196 },
  // pile on top
  { k: "m", x: 98, y: 150, r: -8 }, { k: "b", x: 128, y: 156 }, { k: "m", x: 196, y: 152, r: -15 }, { k: "b", x: 224, y: 150 },
  { k: "S", x: 124, y: 128, r: -14 }, { k: "m", x: 162, y: 140, r: 20 }, { k: "S", x: 200, y: 124, r: 16 },
  { k: "b", x: 148, y: 116 }, { k: "b", x: 176, y: 112 }, { k: "m", x: 108, y: 122, r: 30 }, { k: "b", x: 222, y: 124 }, { k: "S", x: 162, y: 92, r: -4 },
];

const Glass = ({ p }: { p: MotionValue<number> }) => {
  const y1 = useTransform(p, [0.04, 0.2], [416, 340]);
  const g1 = useTransform(p, [0.28, 0.44], [340, 298]);
  const y2 = useTransform(p, [0.5, 0.62], [298, 168]);
  const h1 = useTransform(y1, (v) => 416 - v);
  const gh = useTransform(g1, (v) => 340 - v);
  const h2 = useTransform(y2, (v) => 298 - v);
  const pour = useTransform(p, [0.78, 0.84, 0.92, 0.97], [0, 1, 1, 0]);
  const honey = useTransform(p, [0.82, 0.95], [0, 1]);
  const dollop = useTransform(p, [0.58, 0.64], [0, 1]);
  const mint = useTransform(p, [0.94, 1], [0, 1]);
  return (
    <svg viewBox="0 -70 320 520" className="h-full w-auto max-w-full overflow-visible" role="img" aria-label="A parfait glass filling up layer by layer">
      <defs>
        <clipPath id="inside"><path d="M62,118 L258,118 L240,416 L80,416 Z" /></clipPath>
        <linearGradient id="shine" x1="0" x2="1"><stop offset="0" stopColor="#fff" stopOpacity=".55" /><stop offset=".25" stopColor="#fff" stopOpacity="0" /><stop offset=".85" stopColor="#fff" stopOpacity="0" /><stop offset="1" stopColor="#fff" stopOpacity=".35" /></linearGradient>
      </defs>
      <ellipse cx="160" cy="440" rx="110" ry="9" fill="#2B1620" opacity=".12" />
      <g clipPath="url(#inside)">
        <rect x="0" y="0" width="320" height="450" fill="#fff" opacity=".35" />
        <motion.rect x="0" width="320" fill="#FFFDF6" style={{ y: y1, height: h1 }} />
        <motion.rect x="0" width="320" fill="#B97A35" style={{ y: g1, height: gh }} />
        <motion.rect x="0" width="320" fill="#FFFDF6" style={{ y: y2, height: h2 }} />
        {granola.map((c, i) => (
          <Drop key={i} p={p} from={0.26 + (i % 10) * 0.012} to={0.36 + (i % 10) * 0.012} x={c.x} y={c.y} r={c.r}>
            <ellipse rx={c.rx} ry={c.ry} fill={c.c} />
          </Drop>
        ))}
        {fruit.slice(0, 9).map((f, i) => (
          <Drop key={i} p={p} from={0.48 + i * 0.01} to={0.58 + i * 0.01} x={f.x} y={f.y} r={f.r ?? 0}>
            {f.k === "b" ? <Blueberry /> : f.k === "m" ? <Mango /> : <Strawberry />}
          </Drop>
        ))}
      </g>
      <path d="M50,110 L270,110 L248,420 Q246,432 234,432 L86,432 Q74,432 72,420 Z" fill="url(#shine)" stroke="#fff" strokeWidth="5" strokeLinejoin="round" opacity=".95" />
      <path d="M70,126 L88,410" stroke="#fff" strokeWidth="7" strokeLinecap="round" opacity=".45" />
      <path d="M48,110 L272,110" stroke="#fff" strokeWidth="8" strokeLinecap="round" />
      <motion.g style={{ opacity: dollop, scaleY: dollop, originY: 1 }}>
        <path d="M66,172 C70,150 92,146 104,156 C110,138 136,134 148,150 C156,132 186,132 194,150 C206,136 236,142 238,160 C250,158 256,166 256,172 Z" fill="#FFFDF6" />
        <path d="M100,160 C116,152 132,156 146,160 M170,152 C186,146 202,150 214,156" stroke="#F3E9D6" strokeWidth="3" fill="none" strokeLinecap="round" />
      </motion.g>
      {fruit.slice(9).map((f, i) => (
        <Drop key={i} p={p} from={0.62 + i * 0.011} to={0.72 + i * 0.011} x={f.x} y={f.y} r={f.r ?? 0}>
          {f.k === "b" ? <g transform="scale(1.2)"><Blueberry /></g> : f.k === "m" ? <g transform="scale(1.2)"><Mango /></g> : <g transform="scale(1.25)"><Strawberry leaf={f.k === "S"} /></g>}
        </Drop>
      ))}
      <motion.path d="M166,-60 L166,96" stroke="#F5A623" strokeWidth="6" strokeLinecap="round" style={{ pathLength: pour, opacity: useTransform(pour, [0, 0.02], [0, 1]) }} />
      <motion.path d="M96,140 C110,124 122,150 136,132 C148,116 156,146 170,124 C182,106 192,140 206,124 C216,112 226,136 236,140" fill="none" stroke="#F5A623" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" style={{ pathLength: honey, opacity: useTransform(honey, [0, 0.02], [0, 0.95]) }} />
      <motion.path d="M136,134 C136,150 138,160 137,170 M206,126 C206,146 204,156 205,166" fill="none" stroke="#F5A623" strokeWidth="4.5" strokeLinecap="round" style={{ pathLength: useTransform(p, [0.92, 1], [0, 1]), opacity: useTransform(p, [0.92, 0.93], [0, 0.9]) }} />
      <motion.g style={{ scale: mint, x: 168, y: 78, rotate: -20 }}>
        <path d="M0,0 C10,-22 32,-24 40,-18 C30,-6 14,2 0,0Z" fill="#3E9B6A" />
        <path d="M0,0 C-6,-22 -24,-30 -32,-26 C-26,-12 -12,-2 0,0Z" fill="#57B583" />
      </motion.g>
    </svg>
  );
};

const ParfaitStory = () => {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.4 });
  const done = useMotionValue(1);
  const p = reduce ? done : smooth;
  const [step, setStep] = useState(reduce ? 3 : 0);
  useMotionValueEvent(scrollYProgress, "change", (v) => { if (!reduce) setStep(Math.min(3, Math.floor(v * 4.4))); });
  const bar = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const s = steps[step];
  const height = useMemo(() => (reduce ? "auto" : "420vh"), [reduce]);

  return (
    <motion.section ref={ref} aria-label="How a parfait is made" style={{ height }} animate={{ backgroundColor: s.bg }} transition={{ duration: 0.6 }} className="relative">
      <div className={`${reduce ? "" : "sticky top-0 h-[100svh]"} mx-auto grid max-w-6xl items-center gap-4 px-5 py-16 md:grid-cols-2 md:py-0`}>
        <div className="order-2 md:order-1">
          <p className="text-sm font-bold uppercase tracking-widest text-berry">Built layer by layer</p>
          <div className="mt-4 min-h-[9.5rem] md:min-h-[13rem]">
            <AnimatePresence mode="wait">
              <motion.div key={step} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.35 }}>
                <h2 className="font-display text-4xl font-extrabold leading-[0.95] text-plum md:text-7xl">{s.t}</h2>
                <p className="mt-4 max-w-sm text-lg text-plum/70">{s.d}</p>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="mt-6 flex items-center gap-4">
            <span className="font-display text-xl font-extrabold text-plum">0{step + 1}<span className="text-plum/30"> / 04</span></span>
            <div className="h-1.5 w-40 overflow-hidden rounded-full bg-plum/10"><motion.div className="h-full rounded-full bg-plum" style={{ width: reduce ? "100%" : bar }} /></div>
          </div>
          <motion.a href="#build" animate={{ opacity: step === 3 ? 1 : 0, y: step === 3 ? 0 : 10 }} className="mt-8 inline-flex h-14 items-center rounded-full bg-berry px-7 font-bold text-white hover:bg-plum" tabIndex={step === 3 ? 0 : -1}>
            Build yours now
          </motion.a>
        </div>
        <div className="order-1 flex h-[44svh] justify-center md:order-2 md:h-[78vh]">
          <Glass p={p} />
        </div>
      </div>
    </motion.section>
  );
};

export default ParfaitStory;
