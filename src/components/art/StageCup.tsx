import { motion, MotionValue, useTransform } from "framer-motion";
import s0 from "@/assets/real/stage-0.webp";
import s1 from "@/assets/real/stage-1.webp";
import s2 from "@/assets/real/stage-2.webp";
import s3 from "@/assets/real/stage-3.webp";
import s4 from "@/assets/real/stage-4.webp";
import s5 from "@/assets/real/stage-5.webp";

/** Photos of the same parfait at each stage: empty, yogurt, granola, berries, mango, full. */
const STAGES = [s0, s1, s2, s3, s4, s5];
export const LAST_STAGE = STAGES.length - 1;

/**
 * One stage photo. Each stage cross-fades with the one before it over a short window,
 * so two glasses are never fully on screen at the same time.
 */
const FADE = 0.3;
const Layer = ({ src, index, stage }: { src: string; index: number; stage: MotionValue<number> }) => {
  const opacity = useTransform(stage, (v) => {
    const t = v - index + FADE / 2;
    const fadeIn = index === 0 ? 1 : Math.min(1, Math.max(0, t / FADE));
    const fadeOut = index === LAST_STAGE ? 0 : Math.min(1, Math.max(0, (t - 1) / FADE));
    return fadeIn * (1 - fadeOut);
  });
  return <motion.img src={src} alt="" draggable={false} className="absolute inset-0 h-full w-full" style={{ opacity }} />;
};

/** The parfait: pass a stage from 0 (empty glass) to LAST_STAGE (full). Fractions blend. */
export const StageCup = ({ stage, label }: { stage: MotionValue<number>; label: string }) => (
  <div className="relative aspect-[520/1358] w-full select-none" role="img" aria-label={label}>
    <div aria-hidden="true" className="absolute inset-x-[14%] bottom-[-2%] h-[6%] rounded-[50%] bg-black/30 blur-xl" />
    {STAGES.map((src, i) => <Layer key={src} src={src} index={i} stage={stage} />)}
  </div>
);
