import { useId, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from "framer-motion";
import { LuBriefcase, LuChevronDown, LuGraduationCap } from "react-icons/lu";
import SectionTitle from "./SectionTitle";
import { experience } from "../data/content";
import { blur, cascade, easeIn, easeOut } from "../lib/motion";

const TABS = [
  { id: "work", label: "Pengalaman", icon: LuBriefcase },
  { id: "education", label: "Pendidikan", icon: LuGraduationCap },
];

// "IT Intern · Magang" -> judul utama + keterangan (digabung dengan tempat)
const splitTitle = (title) => {
  const [main, ...rest] = title.split(" · ");
  return [main, rest.join(" · ")];
};

// Satu baris: judul & tempat | periode | garis waktu | deskripsi. Rincian tugas dibuka lewat tombol.
function Row({ e, i, open, onToggle }) {
  const [title, kind] = splitTitle(e.title);
  const [from, to] = e.period.split(" – ");
  const id = useId();

  return (
    <motion.li
      {...cascade(i)}
      className="relative grid gap-3 pl-9 lg:grid-cols-[minmax(0,19rem)_10rem_5.5rem_minmax(0,1fr)] lg:gap-0 lg:pl-0"
    >
      <div className="lg:pr-6">
        <h3 className="text-2xl font-medium leading-tight tracking-[-0.03em] text-fg">{title}</h3>
        <p className="mt-2 text-[15px] leading-snug text-fg-muted">{[kind, e.place].filter(Boolean).join(" · ")}</p>
      </div>

      {/* periode: di layar lebar dua baris rata kanan, menempel ke garis waktu */}
      <p className="text-lg font-medium tabular-nums tracking-[-0.02em] text-fg lg:text-right lg:text-xl lg:leading-snug">
        <span className="lg:block">{from}</span>
        <span className="lg:hidden"> – </span>
        <span className="lg:block">
          <span aria-hidden className="hidden text-fg-subtle lg:inline">– </span>
          {to}
        </span>
      </p>

      <div className="lg:col-start-4">
        <p className="text-[15px] leading-relaxed text-fg-muted">{e.desc}</p>

        {e.points?.length > 0 && (
          <>
            <button
              type="button"
              onClick={onToggle}
              aria-expanded={open}
              aria-controls={id}
              className="-ml-2 mt-2 inline-flex min-h-11 items-center gap-2 rounded-lg px-2 text-sm font-medium text-fg transition-colors hover:text-fg-muted"
            >
              {open ? "Tutup rincian" : "Lihat rincian"}
              <LuChevronDown aria-hidden size={16} className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  id={id}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease: easeOut }}
                  className="overflow-hidden"
                >
                  <ul className="space-y-2 pt-1 text-sm leading-relaxed text-fg-muted">
                    {e.points.map((pt) => (
                      <li key={pt} className="flex gap-3">
                        <span aria-hidden className="mt-[0.6em] h-1 w-1 shrink-0 rounded-full bg-fg-subtle" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>
    </motion.li>
  );
}

// Daftar satu tab dengan garis waktu yang terisi mengikuti scroll (mundur lagi saat scroll naik).
function Timeline({ items }) {
  const ref = useRef(null);
  const [openIndex, setOpenIndex] = useState(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.7", "end 0.72"] });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.5 });
  const top = useTransform(p, (v) => `${Math.min(1, Math.max(0, v)) * 100}%`);

  return (
    <div ref={ref} className="relative">
      {/* garis waktu: di kiri pada layar kecil, di antara periode dan deskripsi pada layar lebar */}
      <div aria-hidden className="absolute bottom-1 left-[7px] top-1 w-0.5 lg:left-[calc(19rem+10rem+2.75rem)] lg:-translate-x-1/2">
        <span className="absolute inset-0 rounded-full bg-gradient-to-b from-transparent via-fg/12 via-20% to-fg/12" />
        <motion.span
          style={{ scaleY: p }}
          className="timeline-fill absolute inset-0 origin-top rounded-full"
        />
        <motion.span
          style={{ top }}
          className="timeline-dot absolute left-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime"
        />
      </div>

      <ol className="space-y-12 lg:space-y-14">
        {items.map((e, i) => (
          <Row key={e.title} e={e} i={i} open={openIndex === i} onToggle={() => setOpenIndex((o) => (o === i ? null : i))} />
        ))}
      </ol>
    </div>
  );
}

export default function Experience() {
  const [tab, setTab] = useState(TABS[0].id);
  const tabRefs = useRef({});

  // panah kiri/kanan berpindah tab
  const onKeyDown = (ev) => {
    if (ev.key !== "ArrowRight" && ev.key !== "ArrowLeft") return;
    ev.preventDefault();
    const k = TABS.findIndex((t) => t.id === tab);
    const next = TABS[(k + (ev.key === "ArrowRight" ? 1 : -1) + TABS.length) % TABS.length].id;
    setTab(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section id="experience" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-28">
      <SectionTitle title="Pendidikan &" highlight="Pengalaman" />

      <div className="mb-14 flex justify-center lg:mb-16">
        <div role="tablist" aria-label="Pendidikan dan pengalaman" onKeyDown={onKeyDown} className="frame flex gap-1 rounded-2xl">
          {TABS.map(({ id, label, icon: Icon }) => {
            const on = tab === id;
            return (
              <button
                key={id}
                ref={(el) => (tabRefs.current[id] = el)}
                type="button"
                role="tab"
                id={`exp-tab-${id}`}
                aria-selected={on}
                aria-controls="exp-panel"
                tabIndex={on ? 0 : -1}
                onClick={() => setTab(id)}
                className={`relative rounded-xl px-4 py-2.5 text-sm transition-colors sm:px-6 ${on ? "text-fg" : "text-fg-muted hover:text-fg"}`}
              >
                {on && (
                  <motion.span
                    layoutId="exp-tab"
                    transition={{ type: "spring", stiffness: 420, damping: 36 }}
                    className="tab-on absolute inset-0 rounded-xl shadow-[var(--shadow-soft)]"
                  />
                )}
                <span className="relative flex items-center gap-2">
                  {label}
                  <Icon aria-hidden size={17} />
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div role="tabpanel" id="exp-panel" aria-labelledby={`exp-tab-${tab}`}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={tab} exit={{ opacity: 0, ...blur(6), transition: { duration: 0.2, ease: easeIn } }}>
            <Timeline items={experience.filter((e) => e.type === tab)} />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
