import { useEffect, useRef } from "react";
import { AnimatePresence, motion, MotionValue, useInView, useReducedMotion, useSpring, useTransform } from "framer-motion";
import s0 from "@/assets/real/stage-0.webp";
import s1 from "@/assets/real/stage-1.webp";
import s2 from "@/assets/real/stage-2.webp";
import s3 from "@/assets/real/stage-3.webp";
import s4 from "@/assets/real/stage-4.webp";
import s5 from "@/assets/real/stage-5.webp";
import lBase from "@/assets/real/layer-base.webp";
import lGranola from "@/assets/real/layer-granola.webp";
import lYogurt from "@/assets/real/layer-yogurt.webp";
import lBerries from "@/assets/real/layer-berries.webp";
import lTropical from "@/assets/real/layer-tropical.webp";
import lCrown from "@/assets/real/layer-crown.webp";

/** Photos of the same parfait at each stage: empty, yogurt, granola, berries, mango, full. */
const STAGES = [s0, s1, s2, s3, s4, s5];
export const LAST_STAGE = STAGES.length - 1;

/** One stage photo, poured in from the top down as `stage` passes its index, so the glass base stays put. */
const Layer = ({ src, index, stage }: { src: string; index: number; stage: MotionValue<number> }) => {
  const r = useTransform(stage, (v) => Math.min(1, Math.max(0, v - (index - 1))));
  const mask = useTransform(r, (v) => `linear-gradient(to bottom, #000 ${v * 140 - 40}%, transparent ${v * 140}%)`);
  // fade in as it arrives, fade out once the next stage has fully covered it (glasses differ a touch)
  const opacity = useTransform(stage, (v) => {
    const inA = Math.min(1, Math.max(0, (v - (index - 1)) / 0.15));
    const out = index === LAST_STAGE ? 1 : 1 - Math.min(1, Math.max(0, v - index - 0.85) / 0.15);
    return inA * out;
  });
  return <motion.img src={src} alt="" draggable={false} className="absolute inset-0 h-full w-full" style={{ maskImage: mask, WebkitMaskImage: mask, opacity }} />;
};

/** The parfait: pass a stage from 0 (empty glass) to LAST_STAGE (full). Fractions blend. */
export const StageCup = ({ stage, label }: { stage: MotionValue<number>; label: string }) => (
  <div className="relative aspect-[520/1358] w-full select-none" role="img" aria-label={label}>
    <div aria-hidden="true" className="absolute inset-x-[14%] bottom-[-2%] h-[6%] rounded-[50%] bg-black/30 blur-xl" />
    <motion.img src={STAGES[0]} alt="" draggable={false} className="absolute inset-0 h-full w-full" style={{ opacity: useTransform(stage, [0.85, 1], [1, 0]) }} />
    {STAGES.slice(1).map((src, i) => <Layer key={src} src={src} index={i + 1} stage={stage} />)}
  </div>
);

/* Builder: real layers cut from the full parfait photo, stacked to match what was picked. */
// h: strip height and c: where its centre sat in the photo (both % of the cup height)
const STRIPS = {
  granola: { src: lGranola, h: 15, c: 63.5 },
  yogurt: { src: lYogurt, h: 10, c: 53.5 },
  berries: { src: lBerries, h: 13.5, c: 44.3 },
  tropical: { src: lTropical, h: 12, c: 28.5 },
  crown: { src: lCrown, h: 25.5, c: 12.7 },
};
// The glass narrows towards the base, so a strip moved down is squeezed a touch to fit.
const taper = (from: number, to: number) => 1 - 0.0016 * (to - from);
type Strip = keyof typeof STRIPS;
const BERRIES = ["Strawberries", "Blueberries", "Mixed Berries"];
const TROPICAL = ["Fresh Mango", "Pineapple", "Banana"];

/** Which layers to show, bottom to top, and where each one sits (% from the top of the cup). */
export const stackFor = (toppings: string[]) => {
  const kinds: Strip[] = [];
  const add = (k: Strip) => {
    if (kinds.length) kinds.push("yogurt");
    kinds.push(k);
  };
  if (toppings.includes("Granola")) add("granola");
  if (toppings.some((t) => BERRIES.includes(t))) add("berries");
  if (toppings.some((t) => TROPICAL.includes(t))) add("tropical");
  if (toppings.includes("Mixed Berries") && kinds.length) kinds.push("crown");
  let bottom = 74; // the base yogurt surface
  const seen: Record<string, number> = {};
  return kinds.map((k) => {
    const { src, h, c } = STRIPS[k];
    const top = bottom - h;
    seen[k] = (seen[k] ?? 0) + 1;
    const item = { key: `${k}-${seen[k]}`, src, top, h, sx: taper(c, top + h / 2) * (k === "yogurt" && seen[k] > 1 ? -1 : 1) };
    bottom = top + (k === "tropical" ? 3.5 : 2.5);
    return item;
  });
};

export const BuilderCup = ({ toppings }: { toppings: string[] }) => {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, amount: 0.3 });
  const stack = stackFor(toppings);
  return (
    <div ref={ref} className="relative aspect-[520/1358] w-full select-none" role="img" aria-label={toppings.length ? `Parfait with ${toppings.join(", ")}` : "Greek yogurt parfait base"}>
      <div aria-hidden="true" className="absolute inset-x-[14%] bottom-[-2%] h-[6%] rounded-[50%] bg-black/30 blur-xl" />
      <img src={STAGES[0]} alt="" draggable={false} className="absolute inset-0 h-full w-full" />
      <motion.img
        src={lBase}
        alt=""
        draggable={false}
        className="absolute left-0 w-full"
        style={{ top: "71.5%", height: "28.5%" }}
        initial={reduce ? false : { clipPath: "inset(100% 0 0 0)" }}
        animate={{ clipPath: seen || reduce ? "inset(0% 0 0 0)" : "inset(100% 0 0 0)" }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      />
      <AnimatePresence initial={false}>
        {stack.map((l, i) => (
          <motion.img
            key={l.key}
            src={l.src}
            alt=""
            draggable={false}
            className="absolute left-0 w-full"
            style={{ height: `${l.h}%`, zIndex: i + 1, scaleX: l.sx }}
            initial={reduce ? { opacity: 0, top: `${l.top}%` } : { opacity: 0, top: `${l.top - 14}%` }}
            animate={{ opacity: 1, top: `${l.top}%` }}
            exit={{ opacity: 0, top: `${l.top - 6}%`, transition: { duration: 0.25 } }}
            transition={{ type: "spring", stiffness: 140, damping: 18 }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};
