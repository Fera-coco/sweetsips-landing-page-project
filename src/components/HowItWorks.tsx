import { Bike, ClipboardList, ShoppingBag } from "lucide-react";
const steps = [
  { icon: ShoppingBag, t: "Pick your treat", d: "Choose from the menu or build your own parfait." },
  { icon: ClipboardList, t: "Checkout", d: "Add your name, phone number and delivery address." },
  { icon: Bike, t: "We deliver", d: "Regular delivery for 1,000 CFA, or shared delivery for 500 CFA." },
];
import { Reveal } from "./Reveal";
const HowItWorks = () => (
  <section id="how" className="bg-cream py-20 md:py-28">
    <div className="mx-auto max-w-6xl px-5">
      <p className="text-sm font-bold uppercase tracking-widest text-berry">How to order</p>
      <h2 className="mt-3 max-w-xl font-display text-4xl font-extrabold text-plum md:text-6xl">Three steps to something sweet.</h2>
      <ol className="mt-12 grid gap-5 md:grid-cols-3">
        {steps.map(({ icon: I, t, d }, i) => (
          <li key={t}><Reveal delay={i * 0.12} className={`h-full rounded-[2rem] p-7 transition hover:-rotate-1 ${["bg-blush", "bg-lemon", "bg-mint"][i]}`}>
            <div className="flex items-center justify-between">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white"><I className="h-6 w-6 text-plum" aria-hidden="true" /></span>
              <span className="font-display text-6xl font-extrabold text-plum/15">0{i + 1}</span>
            </div>
            <h3 className="mt-6 font-display text-2xl font-bold text-plum">{t}</h3>
            <p className="mt-2 text-plum/70">{d}</p>
          </Reveal></li>
        ))}
      </ol>
    </div>
  </section>
);
export default HowItWorks;
