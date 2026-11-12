import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1];

// Judul section: label kecil yang merapat, judul naik dari balik "topeng", garis memanjang.
export default function SectionTitle({ eyebrow, title, highlight }) {
  return (
    <div className="mb-14 text-center">
      <motion.p
        initial={{ opacity: 0, letterSpacing: "0.55em" }}
        whileInView={{ opacity: 1, letterSpacing: "0.3em" }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease }}
        className="mb-3 text-sm font-bold uppercase text-accent"
      >
        {eyebrow}
      </motion.p>

      <h2 className="overflow-hidden pb-2 text-4xl font-bold text-white sm:text-5xl">
        <motion.span
          initial={{ y: "115%" }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, delay: 0.1, ease }}
          className="block"
        >
          {title} <span className="text-shine">{highlight}</span>
        </motion.span>
      </h2>

      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4, ease }}
        className="mx-auto mt-5 h-1 w-24 origin-center rounded-full bg-accent"
      />
    </div>
  );
}