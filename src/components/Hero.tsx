import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Plus } from "lucide-react";
import { smoothies, cfa } from "@/data/menu";
import mango from "@/assets/real/smoothie-mango.webp";
import strawberry from "@/assets/real/smoothie-strawberry.webp";
import pineapple from "@/assets/real/smoothie-pineapple.webp";
import watermelon from "@/assets/real/smoothie-watermelon.webp";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";

const looks = [
  { cut: mango, word: "MANGO", bg: "#FFC857", deep: "#6E3F00", chip: "#FFE3A3" },
  { cut: strawberry, word: "BERRY", bg: "#FBC0CB", deep: "#7D1730", chip: "#FFD9DF" },
  { cut: pineapple, word: "PINEAPPLE", bg: "#FFEB8A", deep: "#5E4E06", chip: "#FFF4BC" },
  { cut: watermelon, word: "MELON", bg: "#FFB8B0", deep: "#7A1A22", chip: "#FFE0DC" },
];
const flavours = smoothies.map((s, i) => ({ ...s, ...looks[i] }));

const Hero = () => {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();
  const { addItem } = useCart();
  const { toast } = useToast();
  const f = flavours[i];

  useEffect(() => {
    if (reduce) return;
    const t = setTimeout(() => setI((v) => (v + 1) % flavours.length), 2500);
    return () => clearTimeout(t);
  }, [i, reduce]);

  const add = () => {
    addItem({ id: f.name, name: f.name, price: cfa(f.price), image: f.image });
    toast({ title: "Added to cart", description: `${f.name} is in your cart.` });
  };

  return (
    <motion.section
      id="top"
      className="relative overflow-hidden pt-24 md:pt-28"
      animate={{ backgroundColor: f.bg }}
      transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
      aria-roledescription="carousel"
      aria-label="Smoothie flavours"
    >
      {/* giant flavour word */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-[22%] flex justify-center md:top-[16%]">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={f.word}
            className="select-none whitespace-nowrap font-display font-extrabold leading-none text-white/35"
            style={{ fontSize: "min(17vw, 15rem)" }}
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -80, opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {f.word}
          </motion.span>
        </AnimatePresence>
      </div>

      <div className="relative mx-auto grid max-w-6xl items-center gap-6 px-5 pb-36 md:min-h-[78vh] md:grid-cols-[1fr_1.1fr] md:pb-44">
        <div className="order-2 md:order-1">
          <motion.p animate={{ color: f.deep }} className="text-xs font-bold uppercase tracking-[0.25em]">Made fresh in Cotonou</motion.p>
          <div className="relative mt-4 min-h-[8.5rem] sm:min-h-[10rem] lg:min-h-[12rem]">
            <AnimatePresence mode="wait">
              <motion.div key={f.name} initial={{ opacity: 0, y: 24, filter: "blur(8px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} exit={{ opacity: 0, y: -16, filter: "blur(8px)" }} transition={{ duration: 0.45 }}>
                <h1 className="font-display text-5xl font-extrabold leading-[0.92] text-plum sm:text-6xl lg:text-7xl">{f.name}</h1>
                <p className="mt-4 max-w-sm text-lg text-plum/75">{f.description}</p>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button onClick={add} className="inline-flex h-14 items-center gap-2 rounded-full bg-plum px-6 font-bold text-cream transition hover:scale-[1.03]">
              <Plus className="h-5 w-5" aria-hidden="true" /> Add for {cfa(f.price)}
            </button>
            <a href="#menu" className="inline-flex h-14 items-center gap-2 rounded-full bg-white/70 px-6 font-bold text-plum backdrop-blur transition hover:bg-white">
              Full menu <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </a>
          </div>
          <div className="mt-8 flex gap-3" role="tablist" aria-label="Choose a flavour">
            {flavours.map((x, n) => (
              <button key={x.name} role="tab" aria-selected={n === i} aria-label={x.name} onClick={() => setI(n)}
                className={`relative grid h-16 w-16 place-items-center rounded-2xl transition ${n === i ? "bg-white shadow-lg" : "bg-white/40 hover:bg-white/70"}`}>
                <img src={x.cut} alt="" className="h-12 w-auto object-contain" />
                {n === i && !reduce && (
                  <motion.span key={`bar-${i}`} className="absolute -bottom-2 left-2 h-1 rounded-full bg-plum" initial={{ width: 0 }} animate={{ width: "calc(100% - 1rem)" }} transition={{ duration: 2.5, ease: "linear" }} />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="relative order-1 flex h-[22rem] items-end justify-center sm:h-[28rem] md:order-2 md:h-[34rem]">
          <motion.div aria-hidden="true" className="absolute bottom-6 h-10 w-56 rounded-[50%] bg-black/15 blur-xl" animate={{ scaleX: [1, 0.9, 1] }} transition={{ duration: 3, repeat: Infinity }} />
          <AnimatePresence mode="popLayout">
            <motion.div
              key={f.cut}
              role="img"
              aria-label={f.name}
              className="relative h-full"
              initial={reduce ? { opacity: 0 } : { y: -260, rotate: -14, opacity: 0, scale: 0.8 }}
              animate={{ y: 0, rotate: 0, opacity: 1, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { x: 220, rotate: 18, opacity: 0, scale: 0.85 }}
              transition={{ type: "spring", stiffness: 110, damping: 14 }}
            >
              <img src={f.cut} alt="" className="h-full w-auto object-contain drop-shadow-2xl" draggable={false} />
            </motion.div>
          </AnimatePresence>
          <motion.span
            key={`chip-${i}`}
            className="absolute right-0 top-10 rounded-full px-4 py-2 font-display text-lg font-extrabold text-plum shadow-lg md:right-4"
            style={{ backgroundColor: f.chip }}
            initial={{ scale: 0, rotate: -20 }} animate={{ scale: 1, rotate: 8 }} transition={{ delay: 0.35, type: "spring", stiffness: 260, damping: 12 }}
          >
            {cfa(f.price)}
          </motion.span>
        </div>
      </div>

      {/* wavy cream edge */}
      <svg aria-hidden="true" className="absolute inset-x-0 bottom-[-1px] h-20 w-full md:h-28" viewBox="0 0 1440 120" preserveAspectRatio="none">
        <motion.path
          fill="#FFF8F0"
          animate={reduce ? undefined : { d: [
            "M0,60 C160,10 320,110 480,60 C640,10 800,110 960,60 C1120,10 1280,110 1440,60 L1440,120 L0,120 Z",
            "M0,70 C160,110 320,20 480,70 C640,110 800,20 960,70 C1120,110 1280,20 1440,70 L1440,120 L0,120 Z",
            "M0,60 C160,10 320,110 480,60 C640,10 800,110 960,60 C1120,10 1280,110 1440,60 L1440,120 L0,120 Z",
          ] }}
          d="M0,60 C160,10 320,110 480,60 C640,10 800,110 960,60 C1120,10 1280,110 1440,60 L1440,120 L0,120 Z"
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
    </motion.section>
  );
};

export default Hero;
