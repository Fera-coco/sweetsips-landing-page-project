import { StageCup } from "./art/StageCup";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";

const steps = [
  { t: "Start with creamy yogurt.", d: "Thick Greek yogurt is the base of every parfait.", bg: "#FFD9DF" },
  { t: "Add the crunch.", d: "A layer of golden granola for that bite.", bg: "#FFF1C2" },
  { t: "Pile on fresh berries.", d: "Strawberries and blueberries, cut fresh every day, on more creamy yogurt.", bg: "#D7F0E2" },
  { t: "Go tropical.", d: "Another layer of yogurt, then juicy mango and pineapple.", bg: "#FFE3A3" },
  { t: "Crown it.", d: "A swirl of yogurt and a pile of fresh berries on top. Ready for you.", bg: "#FBC0CB" },
]

const ParfaitStory = () => {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [step, setStep] = useState(reduce ? steps.length - 1 : 0);
  useMotionValueEvent(scrollYProgress, "change", (v) => { if (!reduce) setStep(Math.min(steps.length - 1, Math.round(v * (steps.length - 1)))); });
  // The cup follows the step, so the picture always matches the words.
  const stageP = useSpring(1, { stiffness: 70, damping: 18 });
  useEffect(() => stageP.set(step + 1), [step, stageP]);
  // One scroll = one step.
  // Mouse and trackpad: one wheel flick moves exactly one step.
  // Phones and tablets keep their own native scrolling (smooth momentum, nothing held back);
  // the step still changes as you pass each screen, and the cup and words change together.
  const touch = typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;
  useEffect(() => {
    if (reduce || touch) return;
    let locked = false;
    let last = 0;
    let free = 0; // last time the page scrolled normally (outside the pinned steps)
    const pinned = () => {
      const r = ref.current?.getBoundingClientRect();
      return r && r.top <= 1 && r.bottom >= window.innerHeight - 1 ? r : null;
    };
    const target = (dir: number) => {
      const r = pinned();
      if (!r) {
        free = Date.now();
        return null;
      }
      // arriving from outside mid-gesture: settle on the step you reached instead of skipping one
      const here = -r.top / window.innerHeight;
      const next = Date.now() - free < 450 ? (dir > 0 ? Math.floor(here) : Math.ceil(here)) : Math.round(here) + dir;
      if (next < 0 || next > steps.length - 1) return null;
      return window.scrollY + r.top + next * window.innerHeight;
    };
    const go = (y: number) => {
      locked = true;
      window.scrollTo({ top: y, behavior: "smooth" });
      const release = () => (Date.now() - last > 260 ? (locked = false) : setTimeout(release, 120));
      setTimeout(release, 650);
    };
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 2) return;
      const y = target(Math.sign(e.deltaY));
      if (y === null) return;
      e.preventDefault();
      last = Date.now();
      if (!locked) go(y);
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [reduce, touch]);
  const bar = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const s = steps[step];
  const height = useMemo(() => (reduce ? "auto" : "500svh"), [reduce]);

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
            <span className="font-display text-xl font-extrabold text-plum">0{step + 1}<span className="text-plum/30"> / 0{steps.length}</span></span>
            <div className="h-1.5 w-40 overflow-hidden rounded-full bg-plum/10"><motion.div className="h-full rounded-full bg-plum" style={{ width: reduce ? "100%" : bar }} /></div>
          </div>
          <motion.a href="#build" animate={{ opacity: step === steps.length - 1 ? 1 : 0, y: step === steps.length - 1 ? 0 : 10 }} className="mt-8 inline-flex h-14 items-center rounded-full bg-berry px-7 font-bold text-white hover:bg-plum" tabIndex={step === steps.length - 1 ? 0 : -1}>
            Build yours now
          </motion.a>
        </div>
        <div className="order-1 flex h-[40svh] items-center justify-center md:order-2 md:h-[70vh]">
          <div className="flex aspect-[520/1358] h-full max-h-[38rem] max-w-full items-center self-center"><StageCup stage={stageP} label="A parfait glass filling up layer by layer" /></div>
        </div>
      </div>
    </motion.section>
  );
};

export default ParfaitStory;
