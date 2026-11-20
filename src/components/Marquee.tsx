const words = ["Tropical Parfait", "Mango Burst", "Granola & Berry", "Pineapple Paradise", "Strawberry Banana", "Watermelon Cucumber", "Build your own"];
const Marquee = () => (
  <div className="overflow-hidden border-y-2 border-plum bg-mango py-4" aria-hidden="true">
    <div className="marquee flex w-max gap-10 whitespace-nowrap font-display text-2xl font-extrabold text-plum">
      {[...words, ...words].map((w, i) => (
        <span key={i} className="flex items-center gap-10">{w}<span className="text-berry">✦</span></span>
      ))}
    </div>
  </div>
);
export default Marquee;
