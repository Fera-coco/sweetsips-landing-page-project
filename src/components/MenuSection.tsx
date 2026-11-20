import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "./Reveal";
import { Plus } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { cfa, parfaits, smoothies, type MenuItem } from "@/data/menu";

const tabs = [
  { id: "parfaits", label: "Parfaits", items: parfaits },
  { id: "smoothies", label: "Smoothies", items: smoothies },
] as const;

const MenuSection = () => {
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("parfaits");
  const { addItem } = useCart();
  const { toast } = useToast();
  const items = tabs.find((t) => t.id === tab)!.items;

  const add = (item: MenuItem) => {
    if (item.customizable) {
      document.getElementById("build")?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    addItem({ id: item.name, name: item.name, price: cfa(item.price), image: item.image });
    toast({ title: "Added to cart", description: `${item.name} is in your cart.` });
  };

  return (
    <section id="menu" className="bg-cream py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-berry">The menu</p>
            <h2 className="mt-3 font-display text-4xl font-extrabold text-plum md:text-6xl">Pick your treat.</h2>
          </div>
          <div role="tablist" aria-label="Menu categories" className="flex rounded-full bg-white p-1.5 shadow-sm">
            {tabs.map((t) => (
              <button key={t.id} role="tab" aria-selected={tab === t.id} onClick={() => setTab(t.id)}
                className={`h-11 rounded-full px-6 text-sm font-bold transition ${tab === t.id ? "bg-plum text-cream" : "text-plum/70 hover:text-plum"}`}>
                {t.label}
              </button>
            ))}
          </div>
        </Reveal>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
          {items.map((item, n) => (
            <motion.li layout key={item.name} initial={{ opacity: 0, y: 50, rotate: n % 2 ? 2 : -2 }} whileInView={{ opacity: 1, y: 0, rotate: 0 }} exit={{ opacity: 0, scale: 0.9 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.55, delay: (n % 3) * 0.08 }} className="group flex flex-col overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-border transition hover:-translate-y-1 hover:shadow-xl">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={item.image} alt={item.name} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                {item.tag && <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-plum shadow">{item.tag}</span>}
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-xl font-bold text-plum">{item.name}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-plum/65">{item.description}</p>
                <div className="mt-5 flex items-center justify-between">
                  <span className="font-display text-xl font-extrabold text-berry">{item.customizable ? `From ${cfa(item.price)}` : cfa(item.price)}</span>
                  <button onClick={() => add(item)} className="inline-flex h-11 items-center gap-1.5 rounded-full bg-plum px-5 text-sm font-bold text-cream hover:bg-berry">
                    <Plus className="h-4 w-4" aria-hidden="true" /> {item.customizable ? "Build it" : "Add"}
                  </button>
                </div>
              </div>
            </motion.li>
          ))}
          </AnimatePresence>
        </ul>
      </div>
    </section>
  );
};

export default MenuSection;
