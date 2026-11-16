import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { nav, profile } from "../data/content";
import ThemeToggle from "./ThemeToggle";
import { blur, easeOut } from "../lib/motion";

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
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: easeOut }}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-3"
    >
      <nav
        className={`mx-auto grid max-w-6xl grid-cols-[1fr_auto] items-center rounded-2xl px-3 py-2 pl-5 transition-[background-color,box-shadow,border-color] duration-300 lg:grid-cols-[1fr_auto_1fr] ${
          scrolled
            ? "border border-line bg-surface/97 shadow-[var(--shadow-soft)] md:bg-surface/92 md:backdrop-blur-md"
            : "border border-transparent"
        }`}
      >
        <a href="#home" className="whitespace-nowrap text-lg font-semibold tracking-[-0.02em] text-fg">
          {profile.name}
          <span className="text-fg-subtle">.</span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {nav.map((n) => (
            <li key={n.id}>
              <a
                href={`#${n.id}`}
                className={`block rounded-lg px-3.5 py-2 text-sm transition-colors ${
                  active === n.id ? "text-fg" : "text-fg-muted hover:text-fg"
                }`}
              >
                {n.label}
              </a>
            </li>
          ))}
        </ul>

        {/* desktop: tombol tema + CTA */}
        <div className="hidden items-center justify-end gap-2 lg:flex">
          <ThemeToggle />
          <a
            href="#contact"
            className="group inline-flex h-11 items-center gap-2.5 rounded-xl border border-line bg-surface py-1 pl-1 pr-4 text-sm font-medium text-fg shadow-[var(--shadow-soft)]"
          >
            <span className="icon-box !h-9 !w-9 !rounded-[10px] bg-fill" aria-hidden>
              <FiArrowRight size={15} className="arr arr-1" />
              <FiArrowRight size={15} className="arr arr-2" />
            </span>
            Hubungi Saya
          </a>
        </div>

        {/* mobile: tombol tema + hamburger */}
        <div className="flex items-center justify-end gap-1 lg:hidden">
          <ThemeToggle />
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-fg"
            aria-label="Buka menu"
            aria-expanded={open}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 8h16M4 16h16" />}
            </svg>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -8, ...blur(6) }}
            animate={{ opacity: 1, y: 0, ...blur(0), transition: { duration: 0.3, ease: easeOut } }}
            exit={{ opacity: 0, y: -8, transition: { duration: 0.18 } }}
            className="mx-auto mt-2 max-w-6xl rounded-2xl border border-line bg-surface p-2 shadow-[var(--shadow-float)] lg:hidden"
          >
            {[...nav, { id: "contact", label: "Kontak" }].map((n) => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-4 py-3 text-fg hover:bg-fill"
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
