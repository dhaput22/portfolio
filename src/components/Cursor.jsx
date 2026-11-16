import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";

// Kursor custom: cincin yang mengikuti dengan halus + titik kecil.
// Di atas elemen ber-atribut data-cursor="Teks", cincin berubah jadi label (mis. "Lihat Detail").
// Otomatis nonaktif di layar sentuh (HP/tablet).
export default function Cursor() {
  const [enabled] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches
  );
  const [hover, setHover] = useState(false);
  const [label, setLabel] = useState(null);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 170, damping: 20, mass: 0.5 });
  const ry = useSpring(y, { stiffness: 170, damping: 20, mass: 0.5 });

  useEffect(() => {
    if (!enabled) return;
    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e) => {
      const t = e.target;
      setLabel(t.closest?.("[data-cursor]")?.getAttribute("data-cursor") || null);
      setHover(!!t.closest?.("a, button, input, textarea, [data-hover]"));
    };
    const leave = () => setLabel(null);

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerover", over);
    document.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      document.removeEventListener("pointerleave", leave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div style={{ x: rx, y: ry }} className="pointer-events-none fixed left-0 top-0 z-[100]">
        <AnimatePresence mode="popLayout" initial={false}>
          {label ? (
            <motion.div
              key="label"
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.4, opacity: 0 }}
              transition={{ type: "spring", stiffness: 380, damping: 26 }}
              className="-translate-x-1/2 -translate-y-1/2 flex items-center gap-1.5 whitespace-nowrap rounded-full bg-lime px-4 py-2.5 text-sm font-medium text-on-lime shadow-[var(--shadow-float)]"
            >
              {label}
              <FiArrowUpRight size={16} aria-hidden />
            </motion.div>
          ) : (
            <motion.div
              key="ring"
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: hover ? 1.7 : 1, opacity: hover ? 0.9 : 0.7 }}
              exit={{ scale: 0.4, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="-translate-x-1/2 -translate-y-1/2 h-8 w-8 rounded-full border border-accent"
            />
          )}
        </AnimatePresence>
      </motion.div>
      <motion.div
        style={{ x, y }}
        animate={{ opacity: label ? 0 : 1 }}
        className="pointer-events-none fixed left-0 top-0 z-[100]"
      >
        <div className="-translate-x-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-accent" />
      </motion.div>
    </>
  );
}
