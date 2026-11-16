import { motion } from "framer-motion";
import { RISE, dur, easeOut } from "../lib/motion";

// Membungkus elemen agar naik + memudar masuk saat di-scroll (sekali saja).
// Prop x lama diabaikan supaya semua gerak seragam.
// eslint-disable-next-line no-unused-vars
export default function Reveal({ children, delay = 0, x, y = RISE, className = "" }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: y ? RISE : 0 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: dur.base, delay, ease: easeOut }}
    >
      {children}
    </motion.div>
  );
}
