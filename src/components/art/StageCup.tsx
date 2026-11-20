import { useEffect } from "react";
import { motion, MotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import s0 from "@/assets/real/stage-0.webp";
import s1 from "@/assets/real/stage-1.webp";
import s2 from "@/assets/real/stage-2.webp";
import s3 from "@/assets/real/stage-3.webp";
import s4 from "@/assets/real/stage-4.webp";
import s5 from "@/assets/real/stage-5.webp";

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

/** Builder version: springs to the stage that matches how many toppings are picked. */
export const BuilderCup = ({ toppings, show }: { toppings: string[]; show: boolean }) => {
  const reduce = useReducedMotion();
  const n = toppings.length;
  const target = !show ? 0 : n === 0 ? 1 : n === 1 ? 2 : n <= 3 ? 3 : n <= 5 ? 4 : 5;
  const stage = useSpring(0, reduce ? { duration: 0 } : { stiffness: 45, damping: 16 });
  useEffect(() => stage.set(target), [target, stage]);
  return <StageCup stage={stage} label={n ? `Parfait with ${toppings.join(", ")}` : "Greek yogurt parfait base"} />;
};
