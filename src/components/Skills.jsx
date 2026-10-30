import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionTitle from "./SectionTitle";
import SpotlightCard from "./SpotlightCard";
import { skillTabs } from "../data/content";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.2 } },
};
const item = {
  hidden: { opacity: 0, y: 28, scale: 0.92 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export default function Skills() {
  const [tab, setTab] = useState(skillTabs[0].id);
  const current = skillTabs.find((t) => t.id === tab);

  return (
    <section id="skills" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24">
      <SectionTitle eyebrow="Keahlian Saya" title="Skill &" highlight="Teknologi" />

      {/* tab */}
      <div className="mb-12 flex justify-center">
        <div className="flex gap-1.5 rounded-full border border-white/10 bg-white/[0.04] p-1.5 backdrop-blur-md">
          {skillTabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`relative rounded-full px-6 py-2.5 text-sm font-bold transition-colors ${
                tab === t.id ? "text-on-accent" : "text-slate-300 hover:text-white"
              }`}
            >
              {tab === t.id && (
                <motion.span
                  layoutId="skill-tab"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  className="absolute inset-0 rounded-full bg-accent shadow-[0_6px_22px_rgba(225,128,41,0.45)]"
                />
              )}
              <span className="relative">{t.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* kartu skill */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          variants={container}
          initial="hidden"
          animate="show"
          exit="exit"
          className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4"
        >
          {current.items.map(({ name, icon: Icon, color }) => (
            <motion.div key={name} variants={item}>
              <SpotlightCard className="group flex flex-col items-center gap-5 rounded-3xl px-4 py-10 hover:-translate-y-2">
                <motion.div
                  whileHover={{ scale: 1.2, rotate: -6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 14 }}
                  className="relative"
                >
                  <div
                    className="absolute inset-0 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-60"
                    style={{ background: color }}
                  />
                  <Icon size={52} color={color} className="relative" />
                </motion.div>
                <p className="font-medium text-white">{name}</p>
              </SpotlightCard>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
