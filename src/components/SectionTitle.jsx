import { motion } from "framer-motion";
import { FiCircle } from "react-icons/fi";
import { blurIn } from "../lib/motion";

// Judul section: label pill kecil + judul besar tipis; kata sorotan berwarna redup.
export default function SectionTitle({ eyebrow, title, highlight, invert = false }) {
  return (
    <div className="mb-14 flex flex-col items-center text-center">
      <motion.span {...blurIn(0)} className="pill">
        <span className="dot"><FiCircle size={9} strokeWidth={3} /></span>
        {eyebrow}
      </motion.span>
      <motion.h2
        {...blurIn(0.08)}
        className={`title mt-5 text-[clamp(2.25rem,5vw,3.5rem)] ${invert ? "text-[#f2f3f5]" : "text-fg"}`}
      >
        {title}{" "}
        <span className={invert ? "text-[#f2f3f5]/50" : "text-shine"}>{highlight}</span>
      </motion.h2>
    </div>
  );
}
