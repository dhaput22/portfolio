import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import Reveal from "./Reveal";
import SectionTitle from "./SectionTitle";
import SpotlightCard from "./SpotlightCard";
import { experience } from "../data/content";

export default function Experience() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 28 });

  return (
    <section id="experience" className="mx-auto max-w-4xl scroll-mt-24 px-6 py-24">
      <SectionTitle eyebrow="Perjalanan Saya" title="Pendidikan &" highlight="Pengalaman" />

      <div ref={ref} className="relative ml-4 pl-10 sm:ml-6 sm:pl-12">
        {/* garis dasar + garis yang terisi mengikuti scroll */}
        <div className="absolute left-0 top-2 h-[calc(100%-1rem)] w-px bg-white/10" />
        <motion.div
          style={{ scaleY }}
          className="absolute left-0 top-2 h-[calc(100%-1rem)] w-px origin-top bg-gradient-to-b from-brand to-accent"
        />

        {experience.map((e, i) => (
          <Reveal key={e.title} delay={0.05} x={30} y={0} className="relative mb-8 last:mb-0">
            <span className="absolute -left-[3.2rem] top-7 flex h-5 w-5 items-center justify-center rounded-full bg-ink ring-2 ring-accent sm:-left-[3.7rem]">
              <span className="h-2 w-2 animate-pulse rounded-full bg-accent" />
            </span>
            <SpotlightCard className="rounded-3xl p-6 sm:p-7 hover:translate-x-1">
              <p className="text-sm font-bold uppercase tracking-wider text-brand">{e.period}</p>
              <h3 className="mt-1 text-xl font-bold text-white">{e.title}</h3>
              <p className="text-slate-300">{e.place}</p>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">{e.desc}</p>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
