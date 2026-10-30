import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

// Kursor custom: cincin yang mengikuti dengan halus + titik kecil.
// Otomatis nonaktif di layar sentuh (HP/tablet).
export default function Cursor() {
  const [enabled] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches
  );
  const [hover, setHover] = useState(false);

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
    const over = (e) =>
      setHover(!!e.target.closest?.("a, button, input, textarea, [data-hover]"));

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerover", over);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        style={{ x: rx, y: ry }}
        className="pointer-events-none fixed left-0 top-0 z-[100]"
      >
        <motion.div
          animate={{ scale: hover ? 1.7 : 1, opacity: hover ? 0.9 : 0.7 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="-translate-x-1/2 -translate-y-1/2 h-8 w-8 rounded-full border border-accent"
        />
      </motion.div>
      <motion.div
        style={{ x, y }}
        className="pointer-events-none fixed left-0 top-0 z-[100]"
      >
        <div className="-translate-x-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-accent" />
      </motion.div>
    </>
  );
}
