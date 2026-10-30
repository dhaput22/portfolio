import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Background() {
  const x = useMotionValue(-800);
  const y = useMotionValue(-800);
  const sx = useSpring(x, { stiffness: 60, damping: 22 });
  const sy = useSpring(y, { stiffness: 60, damping: 22 });

  useEffect(() => {
    const move = (e) => {
      x.set(e.clientX - 250);
      y.set(e.clientY - 250);
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, [x, y]);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink">
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />
      <div className="grid-overlay" />
      {/* cahaya yang mengikuti mouse */}
      <motion.div
        style={{ x: sx, y: sy }}
        className="absolute left-0 top-0 hidden h-[500px] w-[500px] rounded-full bg-brand/10 blur-3xl md:block"
      />
    </div>
  );
}
