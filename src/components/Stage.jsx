import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

// Pembungkus tiap section. Saat section bergeser keluar layar, ia mundur pelan
// (mengecil sedikit + memudar), memberi kesan kedalaman ke section berikutnya.
// Opsional: garis pemisah tipis yang "tergambar" di atas section.
export default function Stage({ children, divider = false }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  // 0 = section baru muncul di bawah layar, 1 = section sudah keluar di atas layar
  const opacity = useTransform(scrollYProgress, [0.78, 1], [1, 0.35]);
  const scale = useTransform(scrollYProgress, [0.78, 1], [1, 0.97]);
  const y = useTransform(scrollYProgress, [0.78, 1], [0, -28]);

  return (
    <motion.div
      ref={ref}
      style={reduce ? undefined : { opacity, scale, y, transformOrigin: "50% 0%" }}
    >
      {divider && (
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-20% 0px" }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="h-px origin-center bg-gradient-to-r from-transparent via-white/20 to-transparent"
          />
        </div>
      )}
      {children}
    </motion.div>
  );
}