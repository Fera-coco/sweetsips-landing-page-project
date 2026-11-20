import { useRef } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { BananaSlice, Blackberry, Blueberry, Granola, HoneyPath, MangoCube, PineappleChunk, Raspberry, Strawberry, StrawberryHalf } from "./pieces";

type P = { x: number; y: number; r?: number; s?: number; el: JSX.Element };
const g = (v: number) => <Granola v={v} />;

// Where each topping lands on top of the yogurt. Order here = drawing order.
export const toppingArt: Record<string, P[]> = {
  Granola: [
    { x: 92, y: 244, r: 10, el: g(0) }, { x: 142, y: 250, r: -20, el: g(1) }, { x: 194, y: 242, r: 30, el: g(2) },
    { x: 246, y: 250, r: -5, el: g(0) }, { x: 298, y: 242, r: 15, el: g(1) }, { x: 334, y: 236, r: 40, s: 1.3, el: g(2) },
  ],
  Banana: [{ x: 84, y: 228, r: -10, el: <BananaSlice /> }, { x: 204, y: 226, r: 15, el: <BananaSlice /> }, { x: 322, y: 222, r: 5, el: <BananaSlice /> }],
  Pineapple: [{ x: 142, y: 224, r: -12, el: <PineappleChunk /> }, { x: 264, y: 226, r: 10, el: <PineappleChunk /> }],
  "Fresh Mango": [{ x: 108, y: 210, r: 8, el: <MangoCube /> }, { x: 174, y: 214, r: -14, el: <MangoCube /> }, { x: 240, y: 206, r: 18, el: <MangoCube /> }, { x: 306, y: 212, r: -6, el: <MangoCube /> }],
  "Mixed Berries": [{ x: 84, y: 194, el: <Raspberry /> }, { x: 208, y: 190, el: <Blackberry /> }, { x: 322, y: 192, el: <Raspberry /> }, { x: 146, y: 186, s: 1.4, el: <Blackberry /> }],
  Strawberries: [{ x: 120, y: 180, r: -18, el: <StrawberryHalf /> }, { x: 288, y: 178, r: 16, el: <StrawberryHalf /> }, { x: 206, y: 160, r: -4, s: 1.8, el: <Strawberry /> }],
  Blueberries: [
    { x: 92, y: 172, el: <Blueberry /> }, { x: 164, y: 184, el: <Blueberry /> }, { x: 252, y: 176, el: <Blueberry /> },
    { x: 330, y: 172, el: <Blueberry /> }, { x: 176, y: 156, s: 1.4, el: <Blueberry /> }, { x: 244, y: 150, s: 1.4, el: <Blueberry /> },
  ],
};

const HONEY = "M80,196 C104,170 128,214 154,186 C178,160 196,208 222,180 C246,156 266,204 292,178 C308,164 324,186 336,192";
const DRIPS = "M154,188 C155,206 153,222 154,240 M292,180 C293,198 291,214 292,232";

export const ParfaitCup = ({ selected }: { selected: string[] }) => {
  const reduce = useReducedMotion();
  const ref = useRef<SVGSVGElement>(null);
  const seen = useInView(ref, { once: true, amount: 0.3 });
  const order = Object.keys(toppingArt).filter((k) => selected.includes(k));
  return (
    <svg ref={ref} viewBox="0 30 400 450" className="h-full w-full" role="img" aria-label={selected.length ? `Parfait with ${selected.join(", ")}` : "Plain yogurt parfait"}>
      <defs>
        <clipPath id="cup-in"><path d="M50,40 L350,40 L324,430 Q322,442 308,442 L92,442 Q78,442 76,430 Z" /></clipPath>
      </defs>
      <ellipse cx="200" cy="456" rx="150" ry="12" fill="#000" opacity=".25" filter="url(#ss-blur)" />
      <path d="M40,70 L360,70 L330,430 Q328,448 310,448 L90,448 Q72,448 70,430 Z" fill="#fff" opacity=".07" />
      <g clipPath="url(#cup-in)">
        {/* yogurt base */}
        <motion.g initial={reduce ? false : { y: 200 }} animate={{ y: seen || reduce ? 0 : 200 }} transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}>
          <path d="M40,250 C90,236 130,262 190,248 C250,234 300,262 360,244 L360,460 L40,460Z" fill="url(#ss-yog)" />
          <path d="M40,250 C90,236 130,262 190,248 C250,234 300,262 360,244 L360,262 C300,276 250,250 190,264 C130,276 90,252 40,266Z" fill="#fff" opacity=".7" />
          <path d="M70,258 C120,248 160,266 210,256 C250,248 290,262 330,252" stroke="#E9E0CE" strokeWidth="2.5" fill="none" opacity=".8" />
          <path d="M120,300 C150,292 190,306 230,298" stroke="#EFE8DA" strokeWidth="2" fill="none" opacity=".6" />
        </motion.g>
        {/* toppings */}
        <AnimatePresence>
          {order.flatMap((k) =>
            toppingArt[k].map((p, i) => (
              <g key={`${k}-${i}`} transform={`translate(${p.x},${p.y}) scale(${p.s ?? 1.65})`}>
                <motion.g
                  initial={reduce ? { opacity: 0 } : { y: -260, rotate: (p.r ?? 0) - 120, opacity: 0 }}
                  animate={{ y: 0, rotate: p.r ?? 0, opacity: 1 }}
                  exit={reduce ? { opacity: 0 } : { y: -40, opacity: 0, scale: 0.6, transition: { duration: 0.25 } }}
                  transition={{ type: "spring", stiffness: 170, damping: 13, delay: i * 0.06 }}
                >
                  {p.el}
                </motion.g>
              </g>
            )),
          )}
        </AnimatePresence>
      </g>
      {/* honey sits on top of everything */}
      <AnimatePresence>
        {selected.includes("Honey Drizzle") && (
          <motion.g key="honey" exit={{ opacity: 0 }}>
            <HoneyPath d={HONEY} draw={!reduce} />
            <HoneyPath d={DRIPS} w={4.5} draw={!reduce} delay={1} dur={0.8} />
          </motion.g>
        )}
      </AnimatePresence>
      {/* glass in front */}
      <path d="M40,70 L360,70 L330,430 Q328,448 310,448 L90,448 Q72,448 70,430 Z" fill="url(#ss-glass)" stroke="#fff" strokeOpacity=".85" strokeWidth="4" strokeLinejoin="round" />
      <path d="M62,92 L88,410" stroke="#fff" strokeWidth="9" strokeLinecap="round" opacity=".28" />
      <path d="M76,96 L96,330" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity=".35" />
      <path d="M336,100 L318,380" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity=".25" />
      <path d="M36,70 L364,70" stroke="#fff" strokeWidth="7" strokeLinecap="round" />
      <path d="M76,436 Q200,452 324,436" stroke="#fff" strokeWidth="5" fill="none" opacity=".5" />
    </svg>
  );
};
