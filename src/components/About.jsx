import { motion } from "framer-motion";
import SectionTitle from "./SectionTitle";
import ScrambleNumber from "./ScrambleNumber";
import { about } from "../data/content";
import { blurIn, cascade } from "../lib/motion";

export default function About() {
  const [lead, ...rest] = about.paragraphs;

  return (
    <section id="about" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-28">
      <SectionTitle title="Mengenal" highlight="Lebih Dekat" />

      {/* paragraf pertama sebagai pernyataan besar, sisanya teks pendukung */}
      <div className="mx-auto max-w-3xl text-center">
        <motion.p {...blurIn(0)} className="title text-[clamp(1.5rem,3vw,2.25rem)] text-fg">
          {lead}
        </motion.p>
        {rest.map((p, i) => (
          <motion.p key={i} {...blurIn(0.1 + i * 0.08)} className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-fg-muted">
            {p}
          </motion.p>
        ))}
      </div>

      <div className="mx-auto mt-16 grid max-w-4xl grid-cols-1 divide-y divide-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {about.stats.map((s, i) => (
          <motion.div key={s.label} {...cascade(i)} className="px-2 py-6 text-center sm:px-8 sm:py-2">
            <p className="display text-[3.5rem] leading-none text-fg">
              <ScrambleNumber value={s.value} delay={0.2 + i * 0.15} />
            </p>
            <p className="mt-3 text-sm text-fg-muted">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
