import heroImage from "@/assets/hero-parfaits.jpg";
import mango from "@/assets/mango-smoothie.jpg";
import strawberry from "@/assets/strawberry-smoothie.jpg";
import { ArrowRight, Bike, Leaf, Sparkles } from "lucide-react";

const Hero = () => (
  <section id="top" className="relative overflow-hidden bg-cream pt-28 md:pt-32">
    <div aria-hidden="true" className="pointer-events-none absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-blush" />
    <div aria-hidden="true" className="pointer-events-none absolute -bottom-48 -left-32 h-[26rem] w-[26rem] rounded-full bg-lemon" />
    <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 pb-16 md:grid-cols-[1.05fr_1fr] md:pb-24">
      <div>
        <p className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-widest text-berry shadow-sm">
          <Sparkles className="h-3.5 w-3.5" aria-hidden="true" /> Made fresh in Cotonou
        </p>
        <h1 className="mt-6 font-display text-5xl font-extrabold leading-[0.95] text-plum sm:text-6xl lg:text-7xl">
          Fresh fruit, <span className="text-berry">layered</span> with love.
        </h1>
        <p className="mt-6 max-w-md text-lg leading-relaxed text-plum/75">
          Parfaits and smoothies made from real fruit, creamy yogurt and crunchy granola. Healthy, hygienic and delivered to your door.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#menu" className="inline-flex h-14 items-center gap-2 rounded-full bg-berry px-7 font-bold text-white shadow-lg shadow-berry/25 hover:bg-plum">
            Order now <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </a>
          <a href="#build" className="inline-flex h-14 items-center rounded-full border-2 border-plum px-7 font-bold text-plum hover:bg-plum hover:text-cream">
            Build your own
          </a>
        </div>
        <ul className="mt-10 grid max-w-md grid-cols-3 gap-3 text-sm">
          {[
            { icon: Leaf, t: "Real fruit", s: "Nothing artificial" },
            { icon: Bike, t: "Delivered", s: "Across Cotonou" },
            { icon: Sparkles, t: "From 1,000", s: "CFA" },
          ].map(({ icon: I, t, s }) => (
            <li key={t} className="rounded-2xl bg-white/80 p-3 shadow-sm">
              <I className="h-5 w-5 text-leaf" aria-hidden="true" />
              <p className="mt-2 font-bold text-plum">{t}</p>
              <p className="text-plum/60">{s}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="relative mx-auto w-full max-w-md md:max-w-none">
        <div className="aspect-[4/5] overflow-hidden rounded-[2.5rem] shadow-2xl shadow-plum/20">
          <img src={heroImage} alt="Fruit parfaits with yogurt, granola and fresh berries" className="h-full w-full object-cover" />
        </div>
        <div className="float-slow absolute -left-2 top-10 sm:-left-6 w-28 overflow-hidden rounded-3xl border-4 border-white shadow-xl sm:w-36" style={{ ["--r" as string]: "-6deg" }}>
          <img src={mango} alt="" className="aspect-square w-full object-cover" />
        </div>
        <div className="float-slow absolute -right-4 bottom-16 w-24 overflow-hidden rounded-3xl border-4 border-white shadow-xl sm:w-32" style={{ ["--r" as string]: "8deg", animationDelay: "1.5s" }}>
          <img src={strawberry} alt="" className="aspect-square w-full object-cover" />
        </div>
        <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-plum px-5 py-3 text-sm font-bold text-cream shadow-xl">
          🥭 Try the Mango Burst
        </div>
      </div>
    </div>
  </section>
);

export default Hero;
