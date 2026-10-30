import { motion } from "framer-motion";

// Judul section: label kecil oranye, judul putih + kata sorotan, garis animasi.
export default function SectionTitle({ eyebrow, title, highlight }) {
  return (
    <div className="mb-14 text-center">
      <motion.p
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-accent"
      >
        {eyebrow}
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="text-4xl font-bold text-white sm:text-5xl"
      >
        {title} <span className="text-shine">{highlight}</span>
      </motion.h2>
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.35, ease: "easeOut" }}
        className="mx-auto mt-5 h-1 w-24 origin-center rounded-full bg-accent"
      />
    </div>
  );
}
