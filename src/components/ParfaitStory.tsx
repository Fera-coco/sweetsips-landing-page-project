import { StoryCup } from "./art/RealCup";
import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";

const steps = [
  { t: "Start with creamy yogurt.", d: "Thick Greek yogurt is the base of every parfait.", bg: "#FFD9DF" },
  { t: "Add the crunch.", d: "A layer of golden granola for that bite.", bg: "#FFF1C2" },
  { t: "Pile on fresh fruit.", d: "Mango, strawberries and blueberries, cut fresh every day.", bg: "#D7F0E2" },
  { t: "Finish with honey.", d: "A drizzle on top, and it's ready for you.", bg: "#FFE3A3" },
];

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
        <div className="order-1 flex h-[40svh] items-center justify-center md:order-2 md:h-[70vh]">
          <div className="flex aspect-[520/1164] h-full max-h-[36rem] max-w-full items-center self-center"><StoryCup p={p} /></div>
        </div>
      </div>
    </motion.section>
  );
};

export default ParfaitStory;
