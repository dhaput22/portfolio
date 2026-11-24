import { useEffect, useState } from "react";
import { flushSync } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FiMoon, FiSun } from "react-icons/fi";

const readTheme = () =>
  document.documentElement.dataset.theme === "dark" ? "dark" : "light";

// Tombol ganti tema gelap <-> terang. Pilihan disimpan di browser.
export default function ThemeToggle({ className = "" }) {
  const [theme, setTheme] = useState(readTheme);

  useEffect(() => {
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", theme === "dark" ? "#1b1c1f" : "#ebeff5");
  }, [theme]);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    const root = document.documentElement;

    const apply = () => {
      root.dataset.theme = next;
      setTheme(next);
    };
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* penyimpanan diblokir: abaikan */
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      apply();
    } else if (document.startViewTransition) {
      // seluruh halaman (termasuk gradasi dan gambar) memudar silang dari mode lama ke mode baru
      root.classList.add("theme-instant");
      const vt = document.startViewTransition(() => flushSync(apply));
      const id = (root.dataset.vt = String(Date.now()));
      vt.finished.finally(() => {
        if (root.dataset.vt === id) root.classList.remove("theme-instant");
      });
    } else {
      root.classList.add("theme-transition");
      apply();
      window.setTimeout(() => root.classList.remove("theme-transition"), 800);
    }
  };

  return (
    <button
      onClick={toggle}
      aria-label={theme === "dark" ? "Ganti ke mode terang" : "Ganti ke mode gelap"}
      title={theme === "dark" ? "Mode terang" : "Mode gelap"}
      className={`relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl text-fg-muted transition-colors hover:bg-fill hover:text-fg ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.25 }}
          className="flex"
        >
          {theme === "dark" ? <FiSun size={17} /> : <FiMoon size={17} />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}