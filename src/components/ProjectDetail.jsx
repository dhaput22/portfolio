import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import {
  FiArrowLeft, FiExternalLink, FiCheck, FiAlertCircle, FiX,
  FiChevronLeft, FiChevronRight, FiMaximize2,
} from "react-icons/fi";

const hasLink = (url) => Boolean(url) && url !== "#";

// Judul tiap bagian, mengikuti struktur studi kasus.
function Section({ id, label, title, children }) {
  return (
    <section aria-labelledby={id} className="border-t border-white/10 py-10 sm:py-12">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">{label}</p>
      <h2 id={id} className="mt-2 text-2xl font-bold text-white sm:text-3xl">{title}</h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

function Lightbox({ items, index, onClose, onMove }) {
  const item = items[index];
  const closeRef = useRef(null);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onMove(1);
      if (e.key === "ArrowLeft") onMove(-1);
    };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [onClose, onMove]);

  const navBtn =
    "flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-snow/20 bg-black/60 text-snow transition hover:border-accent hover:text-accent";

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`Screenshot: ${item.caption}`}
      className="fixed inset-0 z-[90] flex flex-col items-center justify-center gap-4 bg-black/90 p-4 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      <button ref={closeRef} onClick={onClose} aria-label="Tutup gambar" className={`${navBtn} absolute right-4 top-4`}>
        <FiX size={20} />
      </button>

      <img
        key={item.src}
        src={item.src}
        alt={item.caption}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[78vh] max-w-full rounded-lg bg-white object-contain shadow-2xl"
      />

      <div className="flex w-full max-w-3xl items-center justify-between gap-4" onClick={(e) => e.stopPropagation()}>
        <button onClick={() => onMove(-1)} aria-label="Gambar sebelumnya" className={navBtn}>
          <FiChevronLeft size={20} />
        </button>
        <p className="text-center text-sm text-snow/85">
          {item.caption}
          <span className="ml-2 text-snow/50">{index + 1} / {items.length}</span>
        </p>
        <button onClick={() => onMove(1)} aria-label="Gambar berikutnya" className={navBtn}>
          <FiChevronRight size={20} />
        </button>
      </div>
    </motion.div>
  );
}

export default function ProjectDetail({ project: p, onClose }) {
  const d = p.detail;
  const panelRef = useRef(null);
  const backRef = useRef(null);
  const [shot, setShot] = useState(null);
  const shotOpen = useRef(false);
  shotOpen.current = shot !== null;

  const moveShot = useCallback(
    (step) => setShot((i) => (i + step + d.gallery.length) % d.gallery.length),
    [d.gallery.length]
  );
  const closeShot = useCallback(() => setShot(null), []);

  // Kunci scroll halaman di belakang, fokus ke tombol kembali, tutup dengan Esc.
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    backRef.current?.focus();
    panelRef.current?.scrollTo(0, 0);
    // Esc saat lightbox terbuka hanya menutup gambar, bukan halaman detail.
    const onKey = (e) => e.key === "Escape" && !shotOpen.current && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const btnPrimary =
    "inline-flex min-h-11 items-center gap-2 rounded-full bg-accent px-5 text-sm font-semibold text-on-accent transition hover:-translate-y-0.5 hover:brightness-110";
  const btnGhost =
    "inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 px-5 text-sm font-semibold text-white transition hover:border-accent hover:text-accent";

  return createPortal(
    <motion.div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-detail-title"
      className="fixed inset-0 z-[80] overflow-y-auto overscroll-contain bg-ink/95 backdrop-blur-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      {/* bar atas */}
      <div className="sticky top-0 z-10 border-b border-white/10 bg-ink/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <button
            ref={backRef}
            onClick={onClose}
            className="inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-sm font-medium text-slate-200 transition hover:text-accent"
          >
            <FiArrowLeft size={18} /> Kembali ke Proyek
          </button>
        </div>
      </div>

      <motion.article
        className="mx-auto max-w-5xl px-4 pb-24 pt-10 sm:px-6"
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
      >
        {/* header */}
        <header>
          <div className="flex flex-wrap gap-2">
            {p.tags.map((t) => (
              <span key={t} className="rounded-full bg-white/[0.07] px-3 py-1 text-xs text-slate-200">{t}</span>
            ))}
          </div>
          <h1 id="project-detail-title" className="mt-5 text-3xl font-bold text-white sm:text-5xl">{p.title}</h1>
          <p className="mt-3 text-lg text-brand">{d.subtitle}</p>

          <dl className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {d.meta.map((m) => (
              <div key={m.label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <dt className="text-xs uppercase tracking-wider text-slate-400">{m.label}</dt>
                <dd className="mt-1 text-sm font-semibold text-white">{m.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex flex-wrap gap-3">
            {hasLink(p.demo) && (
              <a href={p.demo} target="_blank" rel="noreferrer" className={btnPrimary}>
                <FiExternalLink size={17} /> Lihat Demo
              </a>
            )}
            {hasLink(p.github) && (
              <a href={p.github} target="_blank" rel="noreferrer" className={hasLink(p.demo) ? btnGhost : btnPrimary}>
                <FaGithub size={17} /> Source Code
              </a>
            )}
          </div>

          <button
            onClick={() => setShot(0)}
            className="group relative mt-10 block w-full overflow-hidden rounded-2xl border border-white/10 shadow-2xl"
            aria-label={`Perbesar screenshot: ${d.gallery[0].caption}`}
          >
            <img
              src={d.gallery[0].src}
              alt={d.gallery[0].caption}
              width="1600"
              height="738"
              className="block aspect-[1600/738] w-full bg-white object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
            />
          </button>
        </header>

        <div className="mt-12">
          <Section id="pd-overview" label="Project Overview" title="Ringkasan Proyek">
            <p className="max-w-3xl text-base leading-relaxed text-slate-300 sm:text-lg">{d.overview}</p>
          </Section>

          <div className="grid gap-x-10 border-t border-white/10 lg:grid-cols-2">
            <section aria-labelledby="pd-problem" className="py-10 sm:py-12">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Problem</p>
              <h2 id="pd-problem" className="mt-2 text-2xl font-bold text-white sm:text-3xl">Masalah</h2>
              <ul className="mt-6 space-y-3">
                {d.problem.map((x) => (
                  <li key={x} className="flex gap-3 text-[15px] leading-relaxed text-slate-300">
                    <FiAlertCircle aria-hidden className="mt-1 shrink-0 text-accent" />
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
            </section>
            <section aria-labelledby="pd-solution" className="border-t border-white/10 py-10 sm:py-12 lg:border-t-0">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Solution</p>
              <h2 id="pd-solution" className="mt-2 text-2xl font-bold text-white sm:text-3xl">Solusi</h2>
              <p className="mt-6 text-[15px] leading-relaxed text-slate-300">{d.solution}</p>
            </section>
          </div>

          <Section id="pd-features" label="Key Features" title="Fitur Utama">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {d.features.map((f, i) => (
                <div key={f.title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                  <span className="text-sm font-bold text-brand">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-2 font-semibold text-white">{f.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{f.desc}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section id="pd-contribution" label="My Contribution" title="Kontribusi Saya">
            <ul className="grid gap-3">
              {d.contribution.map((x) => (
                <li key={x} className="flex gap-3 text-[15px] leading-relaxed text-slate-300">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                    <FiCheck aria-hidden size={14} />
                  </span>
                  <span>{x}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section id="pd-stack" label="Tech Stack" title="Teknologi yang Digunakan">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {d.techStack.map((g) => (
                <div key={g.group} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">{g.group}</h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {g.items.map((t) => (
                      <span key={t} className="rounded-full bg-white/[0.07] px-3 py-1 text-xs text-slate-200">{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <Section id="pd-challenges" label="Challenges" title="Tantangan & Cara Mengatasinya">
            <div className="grid gap-4 lg:grid-cols-3">
              {d.challenges.map((c) => (
                <div key={c.title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                  <h3 className="font-semibold text-white">{c.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{c.desc}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section id="pd-gallery" label="Gallery" title="Screenshot Aplikasi">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {d.gallery.map((g, i) => (
                <figure key={g.src}>
                  <button
                    onClick={() => setShot(i)}
                    aria-label={`Perbesar: ${g.caption}`}
                    className="group relative block w-full overflow-hidden rounded-xl border border-white/10"
                  >
                    <img
                      src={g.src}
                      alt={g.caption}
                      loading="lazy"
                      decoding="async"
                      className="block aspect-video w-full bg-white object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute inset-0 flex items-center justify-center bg-black/0 text-snow opacity-0 transition group-hover:bg-black/40 group-hover:opacity-100">
                      <FiMaximize2 size={22} aria-hidden />
                    </span>
                  </button>
                  <figcaption className="mt-2 text-xs leading-snug text-slate-400">{g.caption}</figcaption>
                </figure>
              ))}
            </div>
          </Section>

          <div className="flex justify-center border-t border-white/10 pt-10">
            <button onClick={onClose} className={btnGhost}>
              <FiArrowLeft size={17} /> Kembali ke Proyek
            </button>
          </div>
        </div>
      </motion.article>

      <AnimatePresence>
        {shot !== null && (
          <Lightbox items={d.gallery} index={shot} onClose={closeShot} onMove={moveShot} />
        )}
      </AnimatePresence>
    </motion.div>,
    document.body
  );
}
