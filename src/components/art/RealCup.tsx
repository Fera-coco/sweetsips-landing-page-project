import { useRef } from "react";
import { AnimatePresence, motion, MotionValue, useInView, useReducedMotion, useTransform } from "framer-motion";
import glass from "@/assets/real/glass.webp";
import glassYogurt from "@/assets/real/glass-yogurt.webp";
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

// Order = stacking order (first is lowest in the cup).
export const toppingPieces: Record<string, Piece[]> = {
  Granola: [{ x: 22, y: 50, w: 21, r: 0 }, { x: 40, y: 51, w: 22, r: 70 }, { x: 58, y: 50, w: 21, r: 140 }, { x: 76, y: 50, w: 21, r: 200 }, { x: 50, y: 47, w: 18, r: 300 }].map((g) => ({ src: granola, ...g })),
  Banana: [{ src: banana, x: 19, y: 47, w: 18, r: -8 }, { src: banana, x: 55, y: 48, w: 18, r: 10 }, { src: banana, x: 82, y: 46, w: 17, r: 4 }],
  Pineapple: [{ src: pineapple, x: 35, y: 46, w: 18, r: -10 }, { src: pineapple, x: 70, y: 46, w: 18, r: 12 }],
  "Fresh Mango": [{ src: mango, x: 25, y: 44, w: 16, r: 6 }, { src: mango, x: 46, y: 45, w: 16, r: -12 }, { src: mango, x: 63, y: 43, w: 15, r: 16 }, { src: mango, x: 80, y: 43, w: 16, r: -4 }],
  "Mixed Berries": [{ src: raspberry, x: 15, y: 42, w: 14 }, { src: blackberry, x: 38, y: 41, w: 13, r: 20 }, { src: raspberry, x: 86, y: 41, w: 14, r: -10 }, { src: blackberry, x: 62, y: 40, w: 13, r: -15 }],
  Strawberries: [{ src: strawberryHalf, x: 29, y: 39, w: 14, r: -18 }, { src: strawberryHalf, x: 72, y: 38, w: 14, r: 16 }, { src: strawberry, x: 51, y: 34, w: 17, r: -4 }],
  Blueberries: [
    { src: blueberry, x: 19, y: 40, w: 10 }, { src: blueberry, x: 42, y: 40, w: 10, r: 40 }, { src: blueberry, x: 59, y: 39, w: 10, r: 90 },
    { src: blueberry, x: 85, y: 38, w: 10, r: 10 }, { src: blueberry, x: 37, y: 35, w: 9, r: 60 }, { src: blueberry, x: 66, y: 33, w: 9 },
  ],
};
export const HONEY = { src: honey, x: 50, y: 40, w: 70 };

const place = (p: Piece) => ({ left: `${p.x}%`, top: `${p.y}%`, width: `${p.w}%` });
const inside = "polygon(-20% -400%, 120% -400%, 100% 0%, 97% 21%, 88% 80%, 12% 80%, 3% 21%, 0% 0%)";

/** Builder cup: toppings drop in when picked and lift out when removed. */
export const RealCup = ({ selected }: { selected: string[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, amount: 0.3 });
  const reduce = useReducedMotion();
  const order = Object.keys(toppingPieces).filter((k) => selected.includes(k));
  return (
    <div ref={ref} role="img" aria-label={selected.length ? `Parfait with ${selected.join(", ")}` : "Plain Greek yogurt parfait"}>
        <YogurtRise on={seen || !!reduce}>
          <AnimatePresence>
            {order.flatMap((k) =>
              toppingPieces[k].map((p, i) => (
                <motion.img
                  key={`${k}-${i}`}
                  src={p.src}
                  alt=""
                  draggable={false}
                  className="absolute drop-shadow-[0_3px_3px_rgba(60,20,10,.35)]"
                  style={{ ...place(p), x: "-50%" }}
                  initial={reduce ? { opacity: 0, y: "-50%" } : { y: "-470%", rotate: (p.r ?? 0) - 90, opacity: 0 }}
                  animate={{ y: "-50%", rotate: p.r ?? 0, opacity: 1 }}
                  exit={reduce ? { opacity: 0 } : { y: "-110%", opacity: 0, scale: 0.6, transition: { duration: 0.25 } }}
                  transition={{ type: "spring", stiffness: 160, damping: 14, delay: i * 0.06 }}
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
                style={{ ...place(HONEY as Piece), x: "-50%", y: "-50%", scaleY: 0.3 }}
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
  <div className="relative aspect-[900/979] w-full select-none">
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

export const StoryCup = ({ p }: { p: MotionValue<number> }) => {
  const yogClip = useTransform(p, [0.04, 0.2], ["inset(100% 0 0 0)", "inset(0% 0 0 0)"]);
  const honeyClip = useTransform(p, [0.8, 0.95], ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]);
  const fruit = [...toppingPieces["Fresh Mango"], ...toppingPieces.Strawberries, ...toppingPieces.Blueberries];
  return (
    <div className="relative aspect-[900/979] w-full select-none" role="img" aria-label="A parfait glass filling up layer by layer">
      <div aria-hidden="true" className="absolute inset-x-[12%] bottom-[-3%] h-[8%] rounded-[50%] bg-black/25 blur-xl" />
      <img src={glass} alt="" className="absolute inset-0 h-full w-full" draggable={false} />
      <motion.img src={glassYogurt} alt="" className="absolute inset-0 h-full w-full" style={{ clipPath: yogClip }} draggable={false} />
      <div className="absolute inset-0" style={{ clipPath: inside }}>
        {toppingPieces.Granola.map((g, i) => <Drop key={`g${i}`} p={p} from={0.26 + i * 0.025} to={0.36 + i * 0.025} piece={g} />)}
        {fruit.map((f, i) => <Drop key={`f${i}`} p={p} from={0.5 + i * 0.016} to={0.6 + i * 0.016} piece={f} />)}
        <motion.img src={HONEY.src} alt="" draggable={false} className="absolute" style={{ left: `${HONEY.x - HONEY.w / 2}%`, top: `${HONEY.y}%`, width: `${HONEY.w}%`, translateY: "-50%", scaleY: 0.3, clipPath: honeyClip }} />
      </div>
      <img src={glass} alt="" aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full opacity-[.15] mix-blend-screen" draggable={false} />
    </div>
  );
};
