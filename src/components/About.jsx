import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";
import Reveal from "./Reveal";
import SectionTitle from "./SectionTitle";
import SpotlightCard from "./SpotlightCard";
import { about } from "../data/content";

// Angka yang menghitung naik saat terlihat di layar (mis. "10+" -> 0...10+)
function Counter({ value }) {
  const num = parseInt(value, 10);
  const suffix = String(value).replace(/[0-9]/g, "");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView || Number.isNaN(num)) return;
    const controls = animate(0, num, {
      duration: 1.8,
      ease: "easeOut",
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, num]);

  if (Number.isNaN(num)) return <span>{value}</span>;
  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24">
      <SectionTitle eyebrow="Tentang Saya" title="Mengenal" highlight="Lebih Dekat" />

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <Reveal x={-40} y={0}>
          <SpotlightCard className="h-full rounded-3xl p-8 sm:p-10">
            {about.paragraphs.map((p, i) => (
              <p key={i} className="mb-5 text-lg leading-relaxed text-slate-300 last:mb-0">
                {p}
              </p>
            ))}
          </SpotlightCard>
        </Reveal>

        <div className="grid grid-cols-3 gap-4 lg:grid-cols-1">
          {about.stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.12} x={40} y={0}>
              <SpotlightCard className="rounded-3xl p-5 text-center sm:p-6 lg:text-left">
                <p className="text-shine text-4xl font-bold sm:text-5xl">
                  <Counter value={s.value} />
                </p>
                <p className="mt-1 text-sm text-slate-400">{s.label}</p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
