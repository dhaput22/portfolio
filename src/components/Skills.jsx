import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import SectionTitle from "./SectionTitle";
import SkillMarquee, { SkillCard } from "./SkillMarquee";
import { skillTabs } from "../data/content";
import { BACK, VIEW, easeIn, easeOut } from "../lib/motion";

// tanpa filter blur: filter (walau 0px) memaksa seluruh baris berjalan digambar ulang tiap frame
const panel = {
  hidden: { opacity: 0, y: 28, transition: BACK },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } },
  exit: { opacity: 0, transition: { duration: 0.2, ease: easeIn } },
};

export default function Skills() {
  const [tab, setTab] = useState(skillTabs[0].id);
  const current = skillTabs.find((t) => t.id === tab);
  const reduce = useReducedMotion();

  return (
    <section id="skills" className="mx-auto max-w-6xl scroll-mt-24 px-6 pb-10 pt-28">
      <SectionTitle title="Skill &" highlight="Teknologi" />

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
                  className="tab-on absolute inset-0 rounded-xl shadow-[var(--shadow-soft)]"
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
            variants={panel}
            initial="hidden"
            animate="hidden"
            whileInView="show"
            viewport={VIEW}
            exit="exit"
          >
            {reduce ? (
              // pengguna yang meminta gerak dikurangi: tampil diam dalam grid
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {current.items.map((item) => (
                  <SkillCard key={item.name} {...item} />
                ))}
              </div>
            ) : (
              <SkillMarquee items={current.items} label={current.label} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
