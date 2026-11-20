import { useEffect, useState } from "react";
import { Menu as MenuIcon, ShoppingBag, X } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

export const openCart = () => window.dispatchEvent(new Event("sweetsips:open-cart"));

const links = [
  { href: "#menu", label: "Menu" },
  { href: "#build", label: "Build your own" },
  { href: "#how", label: "How to order" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

const Navbar = () => {
  const { totalItems } = useCart();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-40 transition-all ${scrolled ? "bg-cream/90 backdrop-blur border-b border-border" : ""}`}>
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4" aria-label="Main">
        <a href="#top" className="font-display text-2xl font-extrabold tracking-tight text-plum">
          Sweet<span className="text-berry">Sips</span>
        </a>
        <ul className="hidden items-center gap-7 text-sm font-semibold text-plum/80 md:flex">
          {links.map((l) => (
            <li key={l.href}><a className="hover:text-berry" href={l.href}>{l.label}</a></li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <button onClick={openCart} className="relative inline-flex h-11 items-center gap-2 rounded-full bg-plum px-4 text-sm font-bold text-cream hover:bg-berry" aria-label={`Open cart, ${totalItems} items`}>
            <ShoppingBag className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">Cart</span>
            <span className="grid h-6 min-w-6 place-items-center rounded-full bg-mango px-1 text-xs text-plum">{totalItems}</span>
          </button>
          <button className="grid h-11 w-11 place-items-center rounded-full border border-border bg-white md:hidden" onClick={() => setOpen((v) => !v)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>
            {open ? <X className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </nav>
      {open && (
        <ul className="mx-5 mb-4 grid gap-1 rounded-3xl border border-border bg-white p-3 text-base font-semibold md:hidden">
          {links.map((l) => (
            <li key={l.href}><a onClick={() => setOpen(false)} className="block rounded-2xl px-4 py-3 hover:bg-muted" href={l.href}>{l.label}</a></li>
          ))}
        </ul>
      )}
    </header>
  );
};

export default Navbar;
