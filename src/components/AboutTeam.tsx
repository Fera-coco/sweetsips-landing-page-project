import mixed from "@/assets/mixed-parfait.jpg";
import pineapple from "@/assets/pineapple-smoothie.jpg";

const team = [
  { name: "Oratokhai Emmanuel", role: "CEO" },
  { name: "Segun-Babs Peace Oluwaferanmi", role: "COO" },
  { name: "Odedele Chidera", role: "Production Manager" },
  { name: "Adesanoye Elizabeth", role: "Finance Manager" },
  { name: "Afolabi Olamilekan", role: "Marketing Manager" },
  { name: "Erute Eucharia", role: "Customer Service & Sales" },
  { name: "Daniella Aigbokhan", role: "Production" },
  { name: "Chukwuemeka Precious", role: "Delivery" },
];
const initials = (n: string) => n.split(" ").map((w) => w[0]).slice(0, 2).join("");
const tints = ["bg-blush", "bg-lemon", "bg-mint"];

const AboutTeam = () => (
  <section id="about" className="bg-white py-20 md:py-28">
    <div className="mx-auto max-w-6xl px-5">
      <div className="grid items-center gap-12 md:grid-cols-2">
        <div className="grid grid-cols-2 gap-4">
          <img src={mixed} alt="Mixed fruit parfait" loading="lazy" className="aspect-[3/4] w-full rounded-[2rem] object-cover" />
          <img src={pineapple} alt="Pineapple smoothie" loading="lazy" className="mt-12 aspect-[3/4] w-full rounded-[2rem] object-cover" />
        </div>
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-berry">Our story</p>
          <h2 className="mt-3 font-display text-4xl font-extrabold text-plum md:text-5xl">Healthy eating should be simple.</h2>
          <p className="mt-5 text-lg leading-relaxed text-plum/75">
            SweetSips is a health-centric parfait and smoothie brand based in Cotonou. We make every cup with fresh fruit, creamy yogurt and wholesome toppings, so eating well feels like a treat and not a chore.
          </p>
          <ul className="mt-8 grid grid-cols-3 gap-3 text-center">
            {[["Fresh", "Fruit cut daily"], ["Clean", "Hygienic prep"], ["Local", "Made in Cotonou"]].map(([t, s], i) => (
              <li key={t} className={`rounded-2xl p-4 ${tints[i]}`}>
                <p className="font-display text-xl font-extrabold text-plum">{t}</p>
                <p className="mt-1 text-xs text-plum/70">{s}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-24">
        <h3 className="font-display text-3xl font-extrabold text-plum md:text-4xl">The people behind your cup.</h3>
        <ul className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          {team.map((m, i) => (
            <li key={m.name} className="rounded-[1.5rem] border border-border bg-cream p-5">
              <span className={`grid h-14 w-14 place-items-center rounded-full font-display text-lg font-extrabold text-plum ${tints[i % 3]}`} aria-hidden="true">{initials(m.name)}</span>
              <p className="mt-4 font-bold leading-snug text-plum">{m.name}</p>
              <p className="mt-1 text-sm text-plum/60">{m.role}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);
export default AboutTeam;
