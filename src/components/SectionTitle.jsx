import { motion } from "framer-motion";
import { blurIn } from "../lib/motion";

// Judul section: judul besar tipis; kata sorotan berwarna redup.
// `intro` (opsional): satu-dua kalimat pengantar di bawah judul.
export default function SectionTitle({ title, highlight, intro, invert = false }) {
  return (
    <div className="mb-14 flex flex-col items-center text-center">
      <motion.h2
        {...blurIn(0)}
        className={`title text-[clamp(2.25rem,5vw,3.5rem)] ${invert ? "text-[#f2f3f5]" : "text-fg"}`}
      >
        {title}{" "}
        <span className={invert ? "text-[#f2f3f5]/50" : "text-shine"}>{highlight}</span>
      </motion.h2>
      {intro && (
        <motion.p {...blurIn(0.1)} className="mt-5 max-w-xl text-balance text-lg leading-relaxed text-fg-muted">
          {intro}
        </motion.p>
      )}
    </div>
  );
}
