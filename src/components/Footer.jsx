import { motion } from "framer-motion";
import { profile } from "../data/content";
import { easeOut } from "../lib/motion";

export default function Footer() {
  return (
    <footer className="overflow-hidden px-6 pt-16">
      <div className="mx-auto max-w-6xl border-t border-line pt-8 text-center text-sm text-fg-muted">
        © {new Date().getFullYear()} {profile.name}
        <span className="text-fg-subtle">.</span> Dibuat dengan React, Vite & Tailwind CSS.
      </div>

      {/* nama besar sebagai penutup (dekoratif, seperti referensi) */}
      <motion.p
        aria-hidden
        initial={{ opacity: 0, y: "30%" }}
        whileInView={{ opacity: 1, y: "0%" }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease: easeOut }}
        className="mx-auto mt-6 max-w-[88rem] select-none whitespace-nowrap text-center text-[clamp(2.5rem,9.4vw,9.5rem)] font-semibold leading-[0.8] tracking-[-0.065em] text-fg"
      >
      </motion.p>
    </footer>
  );
}
