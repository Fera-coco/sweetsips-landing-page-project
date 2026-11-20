import { useRef } from "react";
import { AnimatePresence, motion, MotionValue, useInView, useReducedMotion, useTransform } from "framer-motion";
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
import honey from "@/assets/real/honey.webp";

/** A piece placed in % of the cup box: x/y are the centre, w is the width. */
export type Piece = { src: string; x: number; y: number; w: number; r?: number };

const YOGURT_TOP = 53; // % from the top where the yogurt surface sits
const LAYER = 5.3; // how much each topping layer raises the fill
const looks: Record<string, { src: string[]; w: number; n: number }> = {
  Granola: { src: [granola], w: 31, n: 4 },
  Banana: { src: [banana], w: 27, n: 4 },
  Pineapple: { src: [pineapple], w: 27, n: 4 },
  "Fresh Mango": { src: [mango], w: 25, n: 4 },
  "Mixed Berries": { src: [raspberry, blackberry], w: 22, n: 4 },
  Strawberries: { src: [strawberryHalf, strawberry], w: 25, n: 4 },
  Blueberries: { src: [blueberry], w: 17, n: 5 },
};

/** The pieces for one topping when it is the `level`-th layer from the bottom. */
export const layer = (name: string, level: number): Piece[] => {
  const l = looks[name];
  const xs = l.n === 5 ? [16, 33, 50, 67, 84] : [19, 40, 61, 82];
  const shift = level % 2 ? 4 : -3;
  const jit = (i: number, k: number) => (((i + 1) * 7919 * (level + 3) * k) % 100) / 100 - 0.5;
  return xs.map((x, i) => ({
    src: l.src[(i + level) % l.src.length],
    x: Math.min(86, Math.max(14, x + shift + jit(i, 3) * 8)),
    y: YOGURT_TOP - level * LAYER + jit(i, 7) * 3,
    w: l.w * (0.9 + (jit(i, 11) + 0.5) * 0.2),
    r: ((i * 53 + level * 31) % 50) - 25,
  }));
};
export const honeyY = (layers: number) => YOGURT_TOP - layers * LAYER + 1.5;
export const HONEY = { src: honey, x: 50, w: 90 };

const place = (p: Piece) => ({ left: `${p.x}%`, top: `${p.y}%`, width: `${p.w}%` });
const inside = "polygon(-20% -400%, 120% -400%, 100% 0%, 97% 15%, 92% 90%, 8% 90%, 3% 15%, 0% 0%)";

/** Builder cup: toppings drop in when picked and lift out when removed. */
export const RealCup = ({ selected }: { selected: string[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, amount: 0.3 });
  const reduce = useReducedMotion();
  const order = selected.filter((k) => looks[k]);
  return (
    <div ref={ref} role="img" aria-label={selected.length ? `Parfait with ${selected.join(", ")}` : "Plain Greek yogurt parfait"}>
        <YogurtRise on={seen || !!reduce}>
          <AnimatePresence>
            {order.flatMap((k, level) =>
              layer(k, level).map((p, i) => (
                <motion.img
                  key={`${k}-${i}`}
                  src={p.src}
                  alt=""
                  draggable={false}
                  className="absolute drop-shadow-[0_3px_3px_rgba(60,20,10,.35)]"
                  style={{ left: `${p.x}%`, width: `${p.w}%`, x: "-50%" }}
                  initial={reduce ? { opacity: 0, y: "-50%", top: `${p.y}%` } : { y: "-470%", top: `${p.y}%`, rotate: (p.r ?? 0) - 90, opacity: 0 }}
                  animate={{ y: "-50%", top: `${p.y}%`, rotate: p.r ?? 0, opacity: 1 }}
                  exit={reduce ? { opacity: 0 } : { y: "-110%", opacity: 0, scale: 0.6, transition: { duration: 0.25 } }}
                  transition={{ type: "spring", stiffness: 160, damping: 15, delay: i * 0.06 }}
                />
              )),
            )}
            {selected.includes("Honey Drizzle") && (
              <motion.img
                key="honey"
                src={HONEY.src}
                alt=""
                draggable={false}
                className="absolute"
                style={{ left: `${HONEY.x}%`, width: `${HONEY.w}%`, top: `${honeyY(order.length)}%`, x: "-50%", y: "-50%", scaleY: 0.32 }}
                initial={reduce ? { opacity: 0 } : { clipPath: "inset(0 100% 0 0)" }}
                animate={{ clipPath: "inset(0 0% 0 0)", opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.1, ease: "easeInOut" }}
              />
            )}
          </AnimatePresence>
        </YogurtRise>
    </div>
  );
};

const YogurtRise = ({ on, children }: { on: boolean; children: React.ReactNode }) => (
  <div className="relative aspect-[520/1164] w-full select-none">
    <div aria-hidden="true" className="absolute inset-x-[12%] bottom-[-3%] h-[8%] rounded-[50%] bg-black/30 blur-xl" />
    <img src={glass} alt="" className="absolute inset-0 h-full w-full" draggable={false} />
    <motion.img src={glassYogurt} alt="" className="absolute inset-0 h-full w-full" initial={{ clipPath: "inset(100% 0 0 0)" }} animate={{ clipPath: on ? "inset(0% 0 0 0)" : "inset(100% 0 0 0)" }} transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }} draggable={false} />
    <div className="absolute inset-0" style={{ clipPath: inside }}>{children}</div>
    <img src={glass} alt="" aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full opacity-[.15] mix-blend-screen" draggable={false} />
  </div>
);

/** Scroll story: every layer is driven by one progress value from 0 to 1. */
const Drop = ({ p, from, to, piece }: { p: MotionValue<number>; from: number; to: number; piece: Piece }) => {
  const y = useTransform(p, [from, to], ["-550%", "-50%"]);
  const rotate = useTransform(p, [from, to], [(piece.r ?? 0) - 120, piece.r ?? 0]);
  const opacity = useTransform(p, [from, from + 0.01], [0, 1]);
  return <motion.img src={piece.src} alt="" draggable={false} className="absolute drop-shadow-[0_3px_3px_rgba(60,20,10,.35)]" style={{ ...place(piece), x: "-50%", y, rotate, opacity }} />;
};

const STORY = ["Granola", "Banana", "Fresh Mango", "Strawberries", "Blueberries", "Mixed Berries", "Pineapple"];

export const StoryCup = ({ p }: { p: MotionValue<number> }) => {
  const yogClip = useTransform(p, [0.04, 0.2], ["inset(100% 0 0 0)", "inset(0% 0 0 0)"]);
  const honeyClip = useTransform(p, [0.82, 0.95], ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]);
  const start = (level: number) => (level === 0 ? 0.27 : 0.46 + (level - 1) * 0.038);
  return (
    <div className="relative aspect-[520/1164] w-full select-none" role="img" aria-label="A parfait glass filling up layer by layer">
      <div aria-hidden="true" className="absolute inset-x-[12%] bottom-[-3%] h-[8%] rounded-[50%] bg-black/25 blur-xl" />
      <img src={glass} alt="" className="absolute inset-0 h-full w-full" draggable={false} />
      <motion.img src={glassYogurt} alt="" className="absolute inset-0 h-full w-full" style={{ clipPath: yogClip }} draggable={false} />
      <div className="absolute inset-0" style={{ clipPath: inside }}>
        {STORY.flatMap((k, level) => layer(k, level).map((piece, i) => <Drop key={`${k}${i}`} p={p} from={start(level) + i * 0.012} to={start(level) + 0.08 + i * 0.012} piece={piece} />))}
        <motion.img src={HONEY.src} alt="" draggable={false} className="absolute" style={{ left: `${HONEY.x - HONEY.w / 2}%`, top: `${honeyY(STORY.length)}%`, width: `${HONEY.w}%`, translateY: "-50%", scaleY: 0.32, clipPath: honeyClip }} />
      </div>
      <img src={glass} alt="" aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full opacity-[.15] mix-blend-screen" draggable={false} />
    </div>
  );
};
