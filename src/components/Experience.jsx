import { motion } from "framer-motion";
import SectionTitle from "./SectionTitle";
import { experience } from "../data/content";
import { cascade } from "../lib/motion";

export default function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-4xl scroll-mt-24 px-6 py-28">
      <SectionTitle eyebrow="Perjalanan Saya" title="Pendidikan &" highlight="Pengalaman" />

      <div className="border-b border-line">
        {experience.map((e, i) => (
          <motion.article
            key={e.title}
            {...cascade(i)}
            className="grid gap-3 border-t border-line py-8 sm:grid-cols-[11rem_1fr] sm:gap-8"
          >
            {/* tahun: lebih besar dan kontras penuh supaya jelas di mode terang maupun gelap */}
            <p className="text-lg font-medium tabular-nums tracking-[-0.01em] text-fg sm:pt-0.5">
              {e.period}
            </p>
            <div>
              <h3 className="text-xl font-medium tracking-[-0.02em] text-fg">{e.title}</h3>
              <p className="mt-0.5 text-fg-muted">{e.place}</p>
              <p className="mt-3 text-sm leading-relaxed text-fg-muted">{e.desc}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
