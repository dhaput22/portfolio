import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { FiArrowUp } from "react-icons/fi";
import { easeOut } from "../lib/motion";

// muncul setelah halaman di-scroll lebih dari 60% tinggi layar
const passed = (y) => y > window.innerHeight * 0.6;

// Tombol di pojok kanan bawah untuk kembali ke paling atas.
export default function BackToTop() {
  const { scrollY } = useScroll();
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(() => passed(window.scrollY));

  useMotionValueEvent(scrollY, "change", (y) => setVisible(passed(y)));

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: reduce ? "instant" : "smooth" })}
          aria-label="Kembali ke atas"
          title="Kembali ke atas"
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.9 }}
          transition={{ duration: 0.35, ease: easeOut }}
          className="group fixed bottom-5 right-5 z-40 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-charcoal text-on-accent shadow-float transition-colors duration-300 hover:bg-lime hover:text-on-lime focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime focus-visible:ring-offset-2 focus-visible:ring-offset-canvas lg:bottom-8 lg:right-8"
        >
          <FiArrowUp
            size={20}
            className="transition-transform duration-300 ease-out group-hover:-translate-y-0.5"
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
