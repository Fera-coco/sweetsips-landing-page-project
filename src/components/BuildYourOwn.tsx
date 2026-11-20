import { useRef, useState } from "react";
import { Check } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { BuilderCup } from "./art/StageCup";
import mangoImg from "@/assets/real/mango.webp";
import pineImg from "@/assets/real/pineapple.webp";
import bananaImg from "@/assets/real/banana.webp";
import strawImg from "@/assets/real/strawberry-half.webp";
import blueImg from "@/assets/real/blueberry.webp";
import granolaImg from "@/assets/real/granola.webp";
import honeyImg from "@/assets/real/honey.webp";
import raspImg from "@/assets/real/raspberry.webp";

const thumbs: Record<string, string> = {
  "Fresh Mango": mangoImg, Pineapple: pineImg, Banana: bananaImg, Strawberries: strawImg,
  Blueberries: blueImg, Granola: granolaImg, "Honey Drizzle": honeyImg, "Mixed Berries": raspImg,
};
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { cfa, parfaits, toppings, TOPPING_PRICE } from "@/data/menu";

const base = parfaits.find((p) => p.customizable)!;
const colours = ["bg-lemon", "bg-blush", "bg-mint"];

const BuildYourOwn = () => {
  const [picked, setPicked] = useState<string[]>([]);
  const cupRef = useRef<HTMLDivElement>(null);
  const cupSeen = useInView(cupRef, { once: true, amount: 0.3 });
  const { addItem } = useCart();
  const { toast } = useToast();
  const total = base.price + picked.length * TOPPING_PRICE;

  const toggle = (t: string) => setPicked((p) => (p.includes(t) ? p.filter((x) => x !== t) : [...p, t]));
  const add = () => {
    addItem({ id: `${base.name}-${[...picked].sort().join("+")}`, name: base.name, price: cfa(base.price), image: base.image, toppings: picked.length ? picked : undefined });
    toast({ title: "Your parfait is in the cart", description: picked.length ? picked.join(", ") : "Plain, just the way you like it." });
    setPicked([]);
  };

  return (
    <section id="build" className="bg-plum py-20 text-cream md:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 md:grid-cols-2">
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-mango">Build your own</p>
          <h2 className="mt-3 font-display text-4xl font-extrabold md:text-6xl">Your parfait, <span className="text-mango">your rules.</span></h2>
          <p className="mt-5 max-w-md text-lg text-cream/75">Start with our creamy Greek yogurt base for {cfa(base.price)}, then add as many toppings as you like at {cfa(TOPPING_PRICE)} each.</p>
          <div className="relative mx-auto mt-6 w-full max-w-[8rem] md:mt-8 md:max-w-[13rem]">
            <div aria-hidden="true" className="absolute inset-[12%] rounded-full bg-mango/25 blur-3xl" />
            <div className="relative" ref={cupRef}><BuilderCup toppings={picked} show={cupSeen} /></div>
          </div>
        </div>
        <div className="rounded-[2rem] bg-cream p-6 text-plum md:p-8">
          <p className="font-display text-xl font-bold">1. Yogurt base <span className="float-right text-berry">{cfa(base.price)}</span></p>
          <p className="mt-6 font-display text-xl font-bold">2. Choose toppings</p>
          <ul className="mt-4 grid grid-cols-2 gap-2 md:gap-3">
            {toppings.map((t, i) => {
              const on = picked.includes(t);
              return (
                <li key={t}>
                  <button onClick={() => toggle(t)} aria-pressed={on}
                    className={`flex h-12 w-full items-center justify-between rounded-2xl px-3 md:h-14 md:px-4 text-left text-sm font-bold transition ${on ? "bg-plum text-cream" : `${colours[i % 3]} hover:ring-2 hover:ring-plum`}`}>
                    <span className="flex items-center gap-2"><img src={thumbs[t]} alt="" className="h-7 w-7 object-contain" />{t}</span>
                    <span className={`grid h-6 w-6 place-items-center rounded-full ${on ? "bg-mango text-plum" : "bg-white/70"}`}>{on && <Check className="h-4 w-4" aria-hidden="true" />}</span>
                  </button>
                </li>
              );
            })}
          </ul>
          <div className="mt-8 flex items-center justify-between border-t border-plum/10 pt-6">
            <div>
              <p className="text-sm text-plum/60">{picked.length} topping{picked.length === 1 ? "" : "s"}</p>
              <motion.p key={total} initial={{ scale: 1.25 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 400, damping: 15 }} className="origin-left font-display text-3xl font-extrabold text-berry" aria-live="polite">{cfa(total)}</motion.p>
            </div>
            <button onClick={add} className="h-14 rounded-full bg-berry px-7 font-bold text-white hover:bg-plum">Add to cart</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuildYourOwn;
