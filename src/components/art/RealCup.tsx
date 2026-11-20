import { useEffect, useRef } from "react";
import { AnimatePresence, motion, MotionValue, useInView, useReducedMotion, useSpring, useTransform } from "framer-motion";
import glass from "@/assets/real/glass-tall.webp";
import glassYogurt from "@/assets/real/glass-tall-yogurt.webp";
import strawberryHalf from "@/assets/real/strawberry-half.webp";
import strawberry from "@/assets/real/strawberry.webp";
import blueberry from "@/assets/real/blueberry.webp";
import mango from "@/assets/real/mango.webp";
import blackberry from "@/assets/real/blackberry.webp";
import raspberry from "@/assets/real/raspberry.webp";
import pineapple from "@/assets/real/pineapple.webp";
import banana from "@/assets/real/banana.webp";
import granola from "@/assets/real/granola.webp";
import yogurtFill from "@/assets/real/yogurt-fill.webp";
import yogurtCap from "@/assets/real/yogurt-cap.webp";
import yogurtRibbon from "@/assets/real/yogurt-ribbon.webp";

/** A piece placed in % of the cup box: x/y are the centre, w is the width. */
export type Piece = { src: string; x: number; y: number; w: number; r?: number; shade?: boolean };

const YOGURT_TOP = 53; // % from the top where the yogurt surface sits
const FILL = 43; // how much of the glass height the layers can use
const looks: Record<string, { src: string[]; k: number }> = {
  Granola: { src: [granola], k: 1.1 },
  Banana: { src: [banana], k: 1 },
  Pineapple: { src: [pineapple], k: 0.95 },
  "Fresh Mango": { src: [mango], k: 0.9 },
  "Mixed Berries": { src: [raspberry, blackberry], k: 0.85 },
  Strawberries: { src: [strawberryHalf, strawberry, strawberryHalf], k: 1.05 },
  Blueberries: { src: [blueberry], k: 0.62 },
};

/** Height of one layer when `count` toppings share the glass. */
export const segment = (count: number) => Math.min(8, FILL / Math.max(1, count));
/** Where the yogurt column reaches when `count` layers are in. */
export const yogurtTop = (count: number) => (count ? YOGURT_TOP - count * segment(count) + 0.2 * segment(count) : YOGURT_TOP);

/** The yogurt layer laid between layer `level - 1` and layer `level`. */
export const ribbon = (level: number, count: number) => {
  const seg = segment(count);
  return { top: YOGURT_TOP - level * seg - 0.3 * seg, height: 0.55 * seg };
};

/**
 * The pieces for one topping when it is the `level`-th layer from the bottom.
 * A back row (a little smaller and shaded, as if deeper in the glass) and a dense
 * front row pressed against the glass, overlapping so the layer reads as one band.
 */
export const layer = (name: string, level: number, count: number): Piece[] => {
  const l = looks[name];
  const seg = segment(count);
  const top = level === count - 1;
  const w = Math.min(28, 2.3 * seg * l.k);
  const jit = (i: number, k: number) => (((i + 1) * 7919 * (level + 3) * k) % 100) / 100 - 0.5;
  const centre = YOGURT_TOP - level * seg - 0.55 * seg;
  const rows = [
    { dy: -0.18, size: 0.82, shade: true, gap: 0.62, off: 0.5 },
    { dy: 0.12, size: 1, shade: false, gap: 0.7, off: 0 },
    ...(top ? [{ dy: -0.55, size: 0.9, shade: false, gap: 0.75, off: 0.3 }] : []),
  ];
  if (name === "Granola") rows.push({ dy: -0.05, size: 0.95, shade: false, gap: 0.65, off: 0.75 });
  const out: Piece[] = [];
  rows.forEach((row, r) => {
    const pw = w * row.size;
    const n = Math.max(3, Math.ceil(92 / (pw * row.gap)));
    for (let i = 0; i < n; i++) {
      const k = r * 20 + i;
      const x = 4 + ((i + row.off) * 92) / n + jit(k, 3) * 4;
      const crown = r === 2 ? (1 - Math.abs(x - 50) / 50) * seg * 0.35 : 0;
      out.push({
        src: l.src[(k + level) % l.src.length],
        x,
        y: centre + row.dy * seg + jit(k, 7) * seg * 0.18 - crown,
        w: pw * (0.88 + (jit(k, 11) + 0.5) * 0.24),
        r: ((k * 53 + level * 31) % 70) - 35,
        shade: row.shade,
      } as Piece);
    }
  });
  return out;
};

const SLAB = 25.5; // % height of one yogurt slab cut from the photo
const CAP = 11; // % height of the yogurt surface cut from the photo
/** Raises the yogurt in the glass so its surface sits at `surface` (% from the top of the cup). */
const YogurtRiser = ({ surface, show }: { surface: MotionValue<number>; show: MotionValue<number> | number }) => {
  const mask = useTransform(surface, (v) => `linear-gradient(to bottom, transparent ${v + 4}%, black ${v + 7.5}%, black 58%, transparent 61%)`);
  const capTop = useTransform(surface, (v) => `${v - 1.5}%`);
  return (
    <motion.div className="pointer-events-none absolute inset-0" style={{ opacity: show }}>
      <motion.div className="absolute inset-0" style={{ maskImage: mask, WebkitMaskImage: mask }}>
        {[60 - SLAB, 60 - 2 * SLAB + 3.5, 60 - 3 * SLAB + 7].map((t) => (
          <img key={t} src={yogurtFill} alt="" draggable={false} className="absolute left-0 w-full" style={{ top: `${t}%`, height: `${SLAB}%` }} />
        ))}
      </motion.div>
      <motion.img src={yogurtCap} alt="" draggable={false} className="absolute left-0 w-full" style={{ top: capTop, height: `${CAP}%` }} />
    </motion.div>
  );
};

const place = (p: Piece) => ({ left: `${p.x}%`, top: `${p.y}%`, width: `${p.w}%` });
const inside = "polygon(-20% -400%, 120% -400%, 100% 0%, 97% 15%, 92% 90%, 8% 90%, 3% 15%, 0% 0%)";

/** Builder cup: toppings drop in when picked and lift out when removed. */
export const RealCup = ({ selected }: { selected: string[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, amount: 0.3 });
  const reduce = useReducedMotion();
  const order = selected.filter((k) => looks[k]);
  const surface = useSpring(yogurtTop(order.length), { stiffness: 90, damping: 20 });
  useEffect(() => surface.set(yogurtTop(order.length)), [order.length, surface]);
  return (
    <div ref={ref} role="img" aria-label={selected.length ? `Parfait with ${selected.join(", ")}` : "Plain Greek yogurt parfait"}>
        <YogurtRise on={seen || !!reduce} under={<YogurtRiser surface={surface} show={order.length ? 1 : 0} />}>
          <AnimatePresence>
            {order.flatMap((k, level) => [
              ...layer(k, level, order.length).map((p, i) => (
                <motion.img
                  key={`${k}-${i}`}
                  src={p.src}
                  alt=""
                  draggable={false}
                  className="absolute drop-shadow-[0_2px_2px_rgba(60,20,10,.3)]"
                  style={{ left: `${p.x}%`, width: `${p.w}%`, x: "-50%", filter: p.shade ? "brightness(.82) saturate(.9)" : undefined }}
                  initial={reduce ? { opacity: 0, y: "-50%", top: `${p.y}%` } : { y: "-470%", top: `${p.y}%`, rotate: (p.r ?? 0) - 90, opacity: 0 }}
                  animate={{ y: "-50%", top: `${p.y}%`, rotate: p.r ?? 0, opacity: 1 }}
                  exit={reduce ? { opacity: 0 } : { y: "-110%", opacity: 0, scale: 0.6, transition: { duration: 0.25 } }}
                  transition={{ type: "spring", stiffness: 160, damping: 15, delay: 0.25 + i * 0.05 }}
                />
              )),
            ])}
            {order.map((k, level) => level > 0 && (
                <motion.img
                  key={`${k}-yog`}
                  src={yogurtRibbon}
                  alt=""
                  draggable={false}
                  className="absolute left-[2%] w-[96%]"
                  initial={{ opacity: 0, scaleX: 0.6, top: `${ribbon(level, order.length).top}%`, height: `${ribbon(level, order.length).height}%` }}
                  animate={{ opacity: 1, scaleX: 1, top: `${ribbon(level, order.length).top}%`, height: `${ribbon(level, order.length).height}%` }}
                  exit={{ opacity: 0, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                />
            ))}
          </AnimatePresence>
        </YogurtRise>
    </div>
  );
};

const YogurtRise = ({ on, under, children }: { on: boolean; under?: React.ReactNode; children: React.ReactNode }) => (
  <div className="relative aspect-[520/1164] w-full select-none">
    <div aria-hidden="true" className="absolute inset-x-[12%] bottom-[-3%] h-[8%] rounded-[50%] bg-black/30 blur-xl" />
    <img src={glass} alt="" className="absolute inset-0 h-full w-full" draggable={false} />
    <motion.img src={glassYogurt} alt="" className="absolute inset-0 h-full w-full" initial={{ clipPath: "inset(100% 0 0 0)" }} animate={{ clipPath: on ? "inset(0% 0 0 0)" : "inset(100% 0 0 0)" }} transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }} draggable={false} />
    {under}
    <div className="absolute inset-0" style={{ clipPath: inside }}>{children}</div>
    <img src={glass} alt="" aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full opacity-[.15] mix-blend-screen" draggable={false} />
  </div>
);

/** Scroll story: every layer is driven by one progress value from 0 to 1. */
const Drop = ({ p, from, to, piece }: { p: MotionValue<number>; from: number; to: number; piece: Piece }) => {
  const y = useTransform(p, [from, to], ["-550%", "-50%"]);
  const rotate = useTransform(p, [from, to], [(piece.r ?? 0) - 120, piece.r ?? 0]);
  const opacity = useTransform(p, [from, from + 0.01], [0, 1]);
  return <motion.img src={piece.src} alt="" draggable={false} className="absolute drop-shadow-[0_3px_3px_rgba(60,20,10,.35)]" style={{ ...place(piece), x: "-50%", y, rotate, opacity, filter: piece.shade ? "brightness(.82) saturate(.9)" : undefined }} />;
};

const Ribbon = ({ p, at, level }: { p: MotionValue<number>; at: number; level: number }) => {
  const opacity = useTransform(p, [at, at + 0.025], [0, 1]);
  const scaleX = useTransform(p, [at, at + 0.025], [0.6, 1]);
  const r = ribbon(level, STORY.length);
  return <motion.img src={yogurtRibbon} alt="" draggable={false} className="absolute left-[2%] w-[96%]" style={{ top: `${r.top}%`, height: `${r.height}%`, opacity, scaleX }} />;
};

const STORY = ["Granola", "Banana", "Fresh Mango", "Strawberries", "Blueberries", "Mixed Berries", "Pineapple"];

export const StoryCup = ({ p }: { p: MotionValue<number> }) => {
  const yogClip = useTransform(p, [0.04, 0.2], ["inset(100% 0 0 0)", "inset(0% 0 0 0)"]);
  const start = (level: number) => (level === 0 ? 0.27 : 0.46 + (level - 1) * 0.045);
  const yTop = useTransform(p, [0.27, start(STORY.length - 1) + 0.05], [YOGURT_TOP, yogurtTop(STORY.length)]);
  const capO = useTransform(p, [0.27, 0.3], [0, 1]);
  return (
    <div className="relative aspect-[520/1164] w-full select-none" role="img" aria-label="A parfait glass filling up layer by layer">
      <div aria-hidden="true" className="absolute inset-x-[12%] bottom-[-3%] h-[8%] rounded-[50%] bg-black/25 blur-xl" />
      <img src={glass} alt="" className="absolute inset-0 h-full w-full" draggable={false} />
      <motion.img src={glassYogurt} alt="" className="absolute inset-0 h-full w-full" style={{ clipPath: yogClip }} draggable={false} />
      <YogurtRiser surface={yTop} show={capO} />
      <div className="absolute inset-0" style={{ clipPath: inside }}>
        {STORY.flatMap((k, level) => [
          ...layer(k, level, STORY.length).map((piece, i) => <Drop key={`${k}${i}`} p={p} from={start(level) + i * 0.01} to={start(level) + 0.07 + i * 0.01} piece={piece} />),
        ])}
        {STORY.map((k, level) => (level > 0 ? <Ribbon key={`y${k}`} p={p} at={start(level) - 0.01} level={level} /> : null))}
      </div>
      <img src={glass} alt="" aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full opacity-[.15] mix-blend-screen" draggable={false} />
    </div>
  );
};
