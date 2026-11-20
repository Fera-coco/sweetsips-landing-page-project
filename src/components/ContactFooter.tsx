import { useState } from "react";
import { Mail, MapPin, Send } from "lucide-react";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(1, "Please add your name").max(100),
  message: z.string().trim().min(1, "Please write a message").max(1000),
});

export const Contact = () => {
  const [form, setForm] = useState({ name: "", message: "" });
  const [error, setError] = useState("");
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const r = schema.safeParse(form);
    if (!r.success) return setError(r.error.issues[0].message);
    setError("");
    const subject = encodeURIComponent(`Message from ${r.data.name}`);
    const body = encodeURIComponent(r.data.message);
    window.location.href = `mailto:sweetsips@gmail.com?subject=${subject}&body=${body}`;
  };
  const field = "w-full rounded-2xl border-0 bg-white px-5 py-4 text-plum ring-1 ring-border placeholder:text-plum/40 focus:outline-none focus:ring-2 focus:ring-berry";

  return (
    <section id="contact" className="bg-berry py-20 text-white md:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 md:grid-cols-2">
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-lemon">Say hello</p>
          <h2 className="mt-3 font-display text-4xl font-extrabold md:text-6xl">Questions, bulk orders or events?</h2>
          <p className="mt-5 max-w-md text-lg text-white/80">We would love to hear from you. Send us a note and we will reply as soon as we can.</p>
          <ul className="mt-8 space-y-4 text-lg font-semibold">
            <li className="flex items-center gap-3"><Mail className="h-5 w-5" aria-hidden="true" /><a href="mailto:sweetsips@gmail.com" className="underline-offset-4 hover:underline">sweetsips@gmail.com</a></li>
            <li className="flex items-center gap-3"><MapPin className="h-5 w-5" aria-hidden="true" />Cotonou, Benin</li>
          </ul>
        </div>
        <form onSubmit={submit} className="rounded-[2rem] bg-cream p-6 md:p-8" noValidate>
          <label className="block text-sm font-bold text-plum" htmlFor="c-name">Name</label>
          <input id="c-name" className={`${field} mt-2`} maxLength={100} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" />
          <label className="mt-5 block text-sm font-bold text-plum" htmlFor="c-msg">Message</label>
          <textarea id="c-msg" rows={5} className={`${field} mt-2 resize-none`} maxLength={1000} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="How can we help?" />
          {error && <p className="mt-3 text-sm font-semibold text-berry" role="alert">{error}</p>}
          <button className="mt-6 inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-plum font-bold text-cream hover:bg-berry">
            Send message <Send className="h-4 w-4" aria-hidden="true" />
          </button>
          <p className="mt-3 text-center text-xs text-plum/60">This opens your email app with your message ready to send.</p>
        </form>
      </div>
    </section>
  );
};

export const Footer = () => (
  <footer className="bg-plum py-12 text-cream">
    <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-5 md:flex-row md:items-center">
      <div>
        <p className="font-display text-3xl font-extrabold">Sweet<span className="text-mango">Sips</span></p>
        <p className="mt-1 text-sm text-cream/60">Fresh parfaits and smoothies, made in Cotonou.</p>
      </div>
      <nav aria-label="Footer" className="flex flex-wrap gap-6 text-sm font-semibold text-cream/80">
        <a href="#menu" className="hover:text-mango">Menu</a>
        <a href="#build" className="hover:text-mango">Build your own</a>
        <a href="#about" className="hover:text-mango">About</a>
        <a href="#contact" className="hover:text-mango">Contact</a>
      </nav>
      <p className="text-sm text-cream/50">© {new Date().getFullYear()} SweetSips</p>
    </div>
  </footer>
);
