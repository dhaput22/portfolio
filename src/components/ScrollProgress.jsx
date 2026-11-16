import { motion, useScroll } from "framer-motion";

// Garis tipis posisi baca di paling atas.
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      style={{ scaleX: scrollYProgress }}
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-fg/70"
    />
  );
}
