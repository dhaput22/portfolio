import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring, useTransform, useVelocity,
} from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { nav, profile } from "../data/content";
import ThemeToggle from "./ThemeToggle";
import { blur, easeOut } from "../lib/motion";

const LOCK_MAX = "onscrollend" in window ? 1200 : 350; // ms
const DOT_LEFT = 2; // jarak titik dari tepi kiri menu (px)

const sectionIds = [...nav.map((n) => n.id), "contact"];

// Bagian yang sedang dibaca: yang terakhir melewati garis 35% dari atas layar (paling bawah halaman = kontak).
const currentSection = () => {
  const root = document.documentElement;
  if (window.scrollY > 0 && window.innerHeight + window.scrollY >= root.scrollHeight - 2) return "contact";
  const line = window.innerHeight * 0.35;
  let id = sectionIds[0];
  for (const s of sectionIds) {
    const el = document.getElementById(s);
    if (el && el.getBoundingClientRect().top <= line) id = s;
  }
  return id;
};

// Menu aktif mengikuti scroll. Saat menu diklik, penanda langsung meluncur ke tujuan dan tidak ikut
// berhenti di bagian-bagian yang cuma dilewati selama halaman bergulir.
function useActiveSection() {
  const [active, setActive] = useState("home");
  const locked = useRef(false);
  const timer = useRef(0);

  useEffect(() => {
    let raf = 0;
    const unlock = () => {
      locked.current = false;
      clearTimeout(timer.current);
    };
    const unlockIn = (ms) => {
      clearTimeout(timer.current);
      timer.current = setTimeout(unlock, ms);
    };
    const onScroll = () => {
      if (locked.current) {
        // terkunci sampai gulirannya selesai (scrollend); batas waktu hanya cadangan,
        // cukup panjang supaya tidak terlepas saat halaman sempat tersendat
        unlockIn(LOCK_MAX);
        return;
      }
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setActive(currentSection()));
    };
    const onScrollEnd = () => locked.current && unlockIn(120);
    raf = requestAnimationFrame(() => setActive(currentSection()));
    const opts = { passive: true };
    window.addEventListener("scroll", onScroll, opts);
    document.addEventListener("scrollend", onScrollEnd);
    window.addEventListener("resize", onScroll);
    // pengguna menggulir sendiri di tengah jalan: ikuti lagi posisi sebenarnya
    window.addEventListener("wheel", unlock, opts);
    window.addEventListener("touchmove", unlock, opts);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer.current);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("scrollend", onScrollEnd);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("wheel", unlock);
      window.removeEventListener("touchmove", unlock);
    };
  }, []);

  const jump = (id) => {
    locked.current = true;
    clearTimeout(timer.current);
    timer.current = setTimeout(() => (locked.current = false), LOCK_MAX); // kalau ternyata tidak ada guliran
    setActive(id);
  };

  return [active, jump];
}

// Menu desktop: titik di kiri menu yang aktif. Saat berpindah, titiknya meluncur ke menu tujuan: mulai dan
// berhenti perlahan, sedikit memanjang dan menipis selagi melaju, lalu memancarkan riak kecil saat tiba.
function NavLinks({ active, onJump }) {
  const listRef = useRef(null);
  const placed = useRef(false);
  const reduce = useReducedMotion();
  const index = nav.findIndex((n) => n.id === active);

  const goal = useMotionValue(0);
  // dua pegas berurutan tanpa pantulan: awal dan akhir geraknya sama-sama halus, dan tetap mulus
  // walau tujuannya berganti di tengah jalan
  const lead = useSpring(goal, { stiffness: 150, damping: 25 });
  const x = useSpring(lead, { stiffness: 190, damping: 28 });
  const speed = useSpring(useVelocity(x), { stiffness: 400, damping: 40 });
  const scaleX = useTransform(speed, [-1400, 0, 1400], [2.6, 1, 2.6]);
  const scaleY = useTransform(speed, [-1400, 0, 1400], [0.8, 1, 0.8]);
  const fade = useTransform(speed, [-1400, -150, 0, 150, 1400], [0.5, 0.9, 1, 0.9, 0.5]);

  useLayoutEffect(() => {
    const list = listRef.current;
    const measure = (instant) => {
      const li = list.querySelectorAll("li")[index];
      if (!li?.offsetWidth) return;
      goal.set(li.offsetLeft + DOT_LEFT);
      if (instant) {
        lead.jump(goal.get());
        x.jump(goal.get());
      }
    };
    measure(reduce || !placed.current);
    if (list.offsetWidth) placed.current = true;
    // font selesai dimuat atau lebar layar berubah: pindah tanpa animasi
    let first = true;
    const ro = new ResizeObserver(() => {
      if (!first) measure(true);
      first = false;
      if (list.offsetWidth) placed.current = true;
    });
    ro.observe(list);
    return () => ro.disconnect();
  }, [index, goal, lead, x, reduce]);

  return (
    <div className="relative hidden lg:block">
      <motion.span
        aria-hidden
        style={{ x }}
        initial={false}
        animate={{ opacity: index < 0 ? 0 : 1, scale: index < 0 ? 0.2 : 1 }}
        transition={{ duration: 0.45, ease: easeOut }}
        className="absolute left-0 top-1/2 -mt-[3.5px] h-[7px] w-[7px]"
      >
        {!reduce && index >= 0 && (
          <motion.span
            key={index}
            initial={{ scale: 1, opacity: 0 }}
            animate={{ scale: [1, 1, 3.4], opacity: [0, 0.7, 0] }}
            transition={{ duration: 0.8, delay: 0.5, times: [0, 0.05, 1], ease: "easeOut" }}
            className="absolute inset-0 rounded-full bg-lime"
          />
        )}
        <motion.span style={{ scaleX, scaleY, opacity: fade }} className="nav-dot absolute inset-0" />
      </motion.span>
      <ul ref={listRef} className="relative flex items-center gap-1">
        {nav.map((n) => (
          <li key={n.id}>
            <a
              href={`#${n.id}`}
              onClick={() => onJump(n.id)}
              aria-current={active === n.id ? "location" : undefined}
              className={`block rounded-[10px] px-[1.125rem] py-2 text-sm transition-colors duration-500 ease-out ${
                active === n.id ? "text-fg" : "text-fg-muted hover:text-fg"
              }`}
            >
              {n.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Navbar() {
  const [active, jump] = useActiveSection();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
        <a href="#home" onClick={() => jump("home")} className="whitespace-nowrap text-lg font-semibold tracking-[-0.02em] text-fg">
          {profile.name}
          <span className="text-fg-subtle">.</span>
        </a>

        <NavLinks active={active} onJump={jump} />

        {/* desktop: tombol tema + CTA */}
        <div className="hidden items-center justify-end gap-2 lg:flex">
          <ThemeToggle />
          <a
            href="#contact"
            onClick={() => jump("contact")}
            aria-current={active === "contact" ? "location" : undefined}
            className="group inline-flex h-11 items-center gap-2.5 rounded-xl border border-line bg-surface py-1 pl-1 pr-4 text-sm font-medium text-fg shadow-[var(--shadow-soft)]"
          >
            <span
              className={`icon-box !h-9 !w-9 !rounded-[10px] transition-colors duration-300 ${
                active === "contact" ? "bg-lime text-on-lime" : "bg-fill"
              }`}
              aria-hidden
            >
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
                  onClick={() => {
                    jump(n.id);
                    setOpen(false);
                  }}
                  aria-current={active === n.id ? "location" : undefined}
                  className={`flex items-center rounded-xl px-4 py-3 transition-colors duration-300 hover:bg-fill ${
                    active === n.id ? "text-fg" : "text-fg-muted"
                  }`}
                >
                  {active === n.id && (
                    <motion.span
                      aria-hidden
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.1, ease: easeOut }}
                      className="nav-dot mr-3"
                    />
                  )}
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
