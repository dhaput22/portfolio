import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { nav, profile } from "../data/content";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = [...nav.map((n) => n.id), "contact"];
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <motion.header
      initial={{ y: -90, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-5"
    >
      <nav
        className={`mx-auto flex max-w-5xl items-center justify-between rounded-full border border-white/10 px-3 py-2.5 pl-6 backdrop-blur-xl transition-all duration-500 ${
          scrolled
            ? "bg-ink/80 shadow-[0_12px_40px_rgba(0,20,60,0.3)]"
            : "bg-white/[0.04]"
        }`}
      >
        <a href="#home" className="whitespace-nowrap text-lg font-bold tracking-wide text-white sm:text-xl">
          {profile.name}
          <span className="text-accent">.</span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {nav.map((n) => (
            <li key={n.id}>
              <a
                href={`#${n.id}`}
                className="relative block rounded-full px-4 py-2 text-sm font-medium text-slate-200 transition-colors hover:text-white"
              >
                {active === n.id && (
                  <motion.span
                    layoutId="nav-pill"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    className="absolute inset-0 rounded-full bg-white/10"
                  />
                )}
                <span className="relative">{n.label}</span>
              </a>
            </li>
          ))}
        </ul>

        {/* desktop: tombol tema + CTA */}
        <div className="hidden items-center gap-2 lg:flex">
          <ThemeToggle />
          <a
            href="#contact"
            className="rounded-full bg-accent px-6 py-2.5 text-sm font-bold text-on-accent shadow-[0_6px_24px_rgba(225,128,41,0.4)] transition hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(225,128,41,0.6)]"
          >
            Hubungi Saya
          </a>
        </div>

        {/* mobile: tombol tema + hamburger */}
        <div className="flex items-center gap-1 lg:hidden">
          <ThemeToggle />
          <button
            onClick={() => setOpen((v) => !v)}
            className="rounded-full p-2.5 text-slate-100"
            aria-label="Buka menu"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.97 }}
            transition={{ duration: 0.25 }}
            className="mx-auto mt-3 max-w-5xl rounded-3xl border border-white/10 bg-ink/90 p-3 backdrop-blur-xl lg:hidden"
          >
            {[...nav, { id: "contact", label: "Kontak" }].map((n) => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  onClick={() => setOpen(false)}
                  className="block rounded-2xl px-5 py-3 text-slate-200 hover:bg-white/10"
                >
                  {n.label}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.header>
  );
}