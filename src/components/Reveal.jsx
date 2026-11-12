import { motion } from "framer-motion";

// Membungkus elemen agar muncul halus saat di-scroll.
// Geser samping dibatasi maksimal 16px supaya tetap tenang.
export default function Reveal({ children, delay = 0, x = 0, y = 24, className = "" }) {
  const dx = Math.max(-16, Math.min(16, x));
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x: dx, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}