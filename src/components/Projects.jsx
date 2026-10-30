import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { FiExternalLink, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import SectionTitle from "./SectionTitle";
import SpotlightCard from "./SpotlightCard";
import { projects } from "../data/content";

const getPerView = () =>
  window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1;

function usePerView() {
  const [n, setN] = useState(getPerView);
  useEffect(() => {
    const onResize = () => setN(getPerView());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return n;
}

const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  );

const slide = {
  enter: (d) => ({ x: d * 70, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (d) => ({ x: d * -70, opacity: 0 }),
};

function ProjectCard({ p, index }) {
  return (
    <SpotlightCard className="group flex h-full flex-col rounded-3xl hover:-translate-y-2 hover:!border-accent/70">
      {/* gambar / placeholder gradient */}
      <div className="relative h-48 overflow-hidden">
        {p.image ? (
          <img
            src={p.image}
            alt={p.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div
            className="h-full w-full transition-transform duration-700 group-hover:scale-110"
            style={{ backgroundImage: `linear-gradient(135deg, ${p.colors[0]}, ${p.colors[1]})` }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_15%,rgba(255,255,255,0.3),transparent_55%)]" />
            {/* tiruan jendela browser */}
            <div className="absolute inset-x-8 bottom-0 top-9 rounded-t-xl border border-snow/20 bg-black/30 p-3 backdrop-blur-sm">
              <div className="flex gap-1.5">
                <span className="h-2 w-2 rounded-full bg-snow/50" />
                <span className="h-2 w-2 rounded-full bg-snow/30" />
                <span className="h-2 w-2 rounded-full bg-snow/30" />
              </div>
              <div className="mt-3 h-2 w-2/3 rounded bg-snow/25" />
              <div className="mt-2 h-2 w-1/2 rounded bg-snow/15" />
            </div>
            <span className="absolute bottom-2 right-4 text-5xl font-bold text-snow/25">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
        )}

        <div className="absolute right-3 top-3 flex gap-2">
          <a
            href={p.github}
            target="_blank"
            rel="noreferrer"
            aria-label="Source code"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-snow backdrop-blur-md transition hover:scale-110 hover:bg-accent hover:text-on-accent"
          >
            <FaGithub size={17} />
          </a>
          <a
            href={p.demo}
            target="_blank"
            rel="noreferrer"
            aria-label="Live demo"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-snow backdrop-blur-md transition hover:scale-110 hover:bg-accent hover:text-on-accent"
          >
            <FiExternalLink size={17} />
          </a>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl font-bold text-white transition-colors group-hover:text-accent">
          {p.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">{p.desc}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {p.tags.map((t) => (
            <span key={t} className="rounded-full bg-white/[0.07] px-3 py-1 text-xs text-slate-200">
              {t}
            </span>
          ))}
        </div>
      </div>
    </SpotlightCard>
  );
}

export default function Projects() {
  const perView = usePerView();
  const pages = chunk(projects, perView);
  const [[page, dir], setPage] = useState([0, 1]);
  const current = Math.min(page, pages.length - 1);

  const go = (next) => {
    if (next < 0 || next >= pages.length) return;
    setPage([next, next > current ? 1 : -1]);
  };

  return (
    <section id="projects" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24">
      <SectionTitle eyebrow="Portofolio Saya" title="Proyek" highlight="Pilihan" />

      <div className="relative">
        <AnimatePresence mode="wait" custom={dir} initial={false}>
          <motion.div
            key={`${current}-${perView}`}
            custom={dir}
            variants={slide}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: "easeOut" }}
            drag={pages.length > 1 ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={(_, info) => {
              if (info.offset.x < -80) go(current + 1);
              else if (info.offset.x > 80) go(current - 1);
            }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {pages[current].map((p, i) => (
              <ProjectCard key={p.title} p={p} index={current * perView + i} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {pages.length > 1 && (
        <div className="mt-10 flex items-center justify-center gap-5">
          <button
            onClick={() => go(current - 1)}
            disabled={current === 0}
            aria-label="Sebelumnya"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white transition hover:border-accent hover:text-accent disabled:opacity-30 disabled:hover:border-white/10 disabled:hover:text-white"
          >
            <FiChevronLeft size={20} />
          </button>

          <div className="flex items-center gap-2">
            {pages.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                aria-label={`Halaman ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === current ? "w-8 bg-accent" : "w-2 bg-white/25 hover:bg-white/50"
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => go(current + 1)}
            disabled={current === pages.length - 1}
            aria-label="Berikutnya"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white transition hover:border-accent hover:text-accent disabled:opacity-30 disabled:hover:border-white/10 disabled:hover:text-white"
          >
            <FiChevronRight size={20} />
          </button>
        </div>
      )}
    </section>
  );
}