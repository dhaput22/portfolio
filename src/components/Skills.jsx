import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionTitle from "./SectionTitle";
import { skillTabs } from "../data/content";
import { blur, easeIn, easeOut } from "../lib/motion";

const grid = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
  exit: { opacity: 0, ...blur(6), transition: { duration: 0.2, ease: easeIn } },
};
const tile = {
  hidden: { opacity: 0, y: 28, ...blur(6) },
  show: { opacity: 1, y: 0, ...blur(0), transition: { duration: 0.6, ease: easeOut } },
};

export default function Skills() {
  const [tab, setTab] = useState(skillTabs[0].id);
  const current = skillTabs.find((t) => t.id === tab);

  return (
    <section id="skills" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-28">
      <SectionTitle eyebrow="Keahlian Saya" title="Skill &" highlight="Teknologi" />

      {/* tab bergaya segmented control */}
      <div className="mb-10 flex justify-center">
        <div className="frame flex gap-1 rounded-2xl">
          {skillTabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`relative min-w-24 rounded-xl px-5 py-2.5 text-sm transition-colors ${
                tab === t.id ? "text-fg" : "text-fg-muted hover:text-fg"
              }`}
            >
              {tab === t.id && (
                <motion.span
                  layoutId="skill-tab"
                  transition={{ type: "spring", stiffness: 420, damping: 36 }}
                  className="absolute inset-0 rounded-xl bg-surface shadow-[var(--shadow-soft)]"
                />
              )}
              <span className="relative">{t.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            variants={grid}
            initial="hidden"
            animate="show"
            exit="exit"
            className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4"
          >
            {current.items.map(({ name, icon: Icon, color }) => (
              <motion.div
                key={name}
                variants={tile}
                style={{ "--brand-c": color }}
                className="group flex items-center gap-3.5 rounded-2xl border border-line bg-surface px-5 py-4 transition-shadow duration-300 hover:shadow-[var(--shadow-float)]"
              >
                <Icon size={24} aria-hidden className="shrink-0 text-fg transition-colors duration-300 group-hover:text-[var(--brand-c)]" />
                <span className="text-[15px] text-fg">{name}</span>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
