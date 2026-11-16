import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence, animate, motion, useMotionValue, useMotionValueEvent, useReducedMotion, useTransform,
} from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { FiChevronLeft, FiChevronRight, FiExternalLink } from "react-icons/fi";
import SectionTitle from "./SectionTitle";
import ProjectDetail from "./ProjectDetail";
import { blur, easeOut } from "../lib/motion";
import { projects } from "../data/content";

// Halaman detail dibuka lewat hash #proyek/<slug>, jadi bisa dibagikan dan tombol Back browser menutupnya.
const HASH_PREFIX = "#proyek/";
const slugFromHash = () =>
  window.location.hash.startsWith(HASH_PREFIX) ? window.location.hash.slice(HASH_PREFIX.length) : null;
const findDetail = (slug) => projects.find((p) => p.detail && p.slug === slug) ?? null;

const iconBtn =
  "flex h-9 w-9 items-center justify-center rounded-[10px] bg-surface text-fg shadow-[var(--shadow-soft)] md:bg-surface/90 md:backdrop-blur-md transition-colors hover:bg-lime hover:text-on-lime";

function ProjectCard({ p, index, onOpen, inactive = false }) {
  return (
    <article className="group spot-card relative flex h-full w-full flex-col rounded-[24px]">
      {/* gambar / placeholder gradient */}
      <div className="relative h-40 shrink-0 overflow-hidden bg-fill sm:h-52">
        {p.image ? (
          <img
            src={p.image}
            alt={p.title}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.05]"
          />
        ) : (
          <div
            className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.05]"
            style={{ backgroundImage: `linear-gradient(135deg, ${p.colors[0]}, ${p.colors[1]})` }}
          >
            {/* tiruan jendela browser */}
            <div className="absolute inset-x-8 bottom-0 top-9 rounded-t-xl border border-snow/25 bg-snow/15 p-3">
              <div className="flex gap-1.5">
                <span className="h-2 w-2 rounded-full bg-snow/60" />
                <span className="h-2 w-2 rounded-full bg-snow/40" />
                <span className="h-2 w-2 rounded-full bg-snow/40" />
              </div>
              <div className="mt-3 h-2 w-2/3 rounded bg-snow/35" />
              <div className="mt-2 h-2 w-1/2 rounded bg-snow/25" />
            </div>
          </div>
        )}

        <div data-cursor="" className="absolute right-3 top-3 z-10 flex gap-1.5">
          <a href={p.github} target="_blank" rel="noreferrer" aria-label="Source code" tabIndex={inactive ? -1 : undefined} className={iconBtn}>
            <FaGithub size={16} />
          </a>
          <a href={p.demo} target="_blank" rel="noreferrer" aria-label="Live demo" tabIndex={inactive ? -1 : undefined} className={iconBtn}>
            <FiExternalLink size={16} />
          </a>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <span className="text-xs tabular-nums text-fg-subtle">{String(index + 1).padStart(2, "0")}</span>
        <h3 className="mt-1 text-lg font-medium tracking-[-0.02em] text-fg">
          {p.detail ? (
            // tombol "stretched": area klik menutupi seluruh kartu
            <button
              type="button"
              onClick={(e) => onOpen(p, e.currentTarget)}
              tabIndex={inactive ? -1 : undefined}
              aria-label={`Lihat detail proyek ${p.title}`}
              className="text-left after:absolute after:inset-0 after:rounded-[24px] after:content-[''] focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-fg"
            >
              {p.title}
            </button>
          ) : (
            p.title
          )}
        </h3>
        <p className="mt-2 line-clamp-4 flex-1 text-sm leading-relaxed text-fg-muted">{p.desc}</p>
        <div className="mt-5 flex flex-wrap gap-1.5">
          {p.tags.map((t) => (
            <span key={t} className="rounded-lg bg-fill px-2.5 py-1 text-xs text-fg-muted">
              {t}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

// Satu kartu di rel melengkung 3D. Posisinya dihitung dari `pos` (indeks aktif berupa angka pecahan),
// jadi saat di-drag semua kartu ikut berputar mulus, bukan melompat.
function CarouselItem({ p, i, pos, spacing, width, active, onOpen, onSelect, wrap }) {
  // jarak kartu ini dari tengah; dengan loop, selalu lewat sisi terdekat
  const offset = useTransform(pos, (v) => wrap(i - v));
  const x = useTransform(offset, (o) => o * spacing);
  const rotateY = useTransform(offset, (o) => Math.max(-62, Math.min(62, -o * 40)));
  const z = useTransform(offset, (o) => -Math.min(Math.abs(o), 3) * 170);
  const scale = useTransform(offset, (o) => 1 - Math.min(Math.abs(o), 2.5) * 0.09);
  const opacity = useTransform(offset, (o) => Math.max(0, 1 - Math.max(0, Math.abs(o) - 1.2) * 0.75));
  const dim = useTransform(offset, (o) => Math.min(Math.abs(o), 1.5) * 0.4);
  const zIndex = useTransform(offset, (o) => 100 - Math.round(Math.abs(o) * 10));
  const inactive = i !== active;

  return (
    <motion.div
      data-cursor={!inactive && p.detail ? "Lihat Detail" : undefined}
      style={{ x, rotateY, z, scale, opacity, zIndex, width, marginLeft: -width / 2 }}
      className="pointer-events-auto absolute left-1/2 top-0 h-full [transform-style:preserve-3d]"
    >
      <ProjectCard p={p} index={i} onOpen={onOpen} inactive={inactive} />
      {/* lapisan peredup untuk kartu samping */}
      <motion.div
        aria-hidden
        style={{ opacity: dim }}
        className="pointer-events-none absolute inset-0 rounded-[24px] bg-[var(--section-bg)]"
      />
      {inactive && (
        <button
          type="button"
          onClick={() => onSelect(i)}
          tabIndex={-1}
          aria-label={`Tampilkan proyek ${p.title}`}
          className="absolute inset-0 z-20 cursor-pointer rounded-[24px]"
        />
      )}
    </motion.div>
  );
}

function useViewportWidth() {
  const [w, setW] = useState(() => window.innerWidth);
  useEffect(() => {
    const on = () => setW(window.innerWidth);
    window.addEventListener("resize", on);
    return () => window.removeEventListener("resize", on);
  }, []);
  return w;
}

// tombol panah bulat bergaris tipis
const ctrlBtn =
  "flex h-14 w-14 items-center justify-center rounded-full border border-fg/20 text-fg transition-colors duration-200 hover:border-fg/50 hover:bg-surface disabled:pointer-events-none disabled:opacity-30";

// Carousel 3D: bisa di-drag/geser, klik kartu samping, tombol panah, atau tombol panah keyboard.
function Carousel3D({ onOpen }) {
  const n = projects.length;
  const vw = useViewportWidth();
  const reduce = useReducedMotion();
  const desktop = vw >= 1024;
  const width = desktop ? 400 : Math.min(Math.round(vw * 0.8), 360);
  const spacing = desktop ? width * 0.86 : width * 0.98;

  // loop tanpa ujung: sisi kiri kartu pertama berisi proyek terakhir, jadi tidak pernah kosong
  const loop = n >= 4;
  const mod = (v) => ((v % n) + n) % n;
  const wrap = useCallback((o) => (loop ? mod(o + n / 2) - n / 2 : o), [loop, n]); // eslint-disable-line react-hooks/exhaustive-deps

  const pos = useMotionValue(0);
  const [active, setActive] = useState(0);
  const startPos = useRef(0);
  const dragged = useRef(false);

  useMotionValueEvent(pos, "change", (v) => {
    const r = loop ? mod(Math.round(v)) : Math.max(0, Math.min(n - 1, Math.round(v)));
    setActive((a) => (a === r ? a : r));
  });

  const go = useCallback(
    (target) => {
      const t = loop ? target : Math.max(0, Math.min(n - 1, target));
      if (reduce) pos.set(t);
      else animate(pos, t, { type: "spring", stiffness: 240, damping: 30, mass: 0.9 });
    },
    [loop, n, pos, reduce]
  );

  const step = (dir) => go(Math.round(pos.get()) + dir);
  // klik kartu samping: geser lewat jalur terpendek ke kartu itu
  const select = (i) => {
    const base = Math.round(pos.get());
    go(base + wrap(i - base));
  };

  // tahanan di ujung: bisa ditarik sedikit melewati kartu pertama/terakhir lalu memantul balik
  const resist = (v) => {
    if (loop) return v;
    if (v < 0) return v * 0.35;
    if (v > n - 1) return n - 1 + (v - (n - 1)) * 0.35;
    return v;
  };

  return (
    <div>
      <motion.div
        role="region"
        aria-roledescription="carousel"
        aria-label="Daftar proyek"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") {
            e.preventDefault();
            step(1);
          }
          if (e.key === "ArrowLeft") {
            e.preventDefault();
            step(-1);
          }
        }}
        onPointerDownCapture={() => {
          // setiap tekanan baru mulai sebagai klik biasa
          dragged.current = false;
        }}
        onPanStart={() => {
          pos.stop();
          startPos.current = pos.get();
          dragged.current = false;
        }}
        onPan={(_, info) => {
          if (Math.abs(info.offset.x) > 6) dragged.current = true;
          pos.set(resist(startPos.current - info.offset.x / spacing));
        }}
        onPanEnd={(_, info) => {
          // lemparan cepat melompat lebih jauh
          const fling = Math.max(-2, Math.min(2, -info.velocity.x / (spacing * 5)));
          go(Math.round(pos.get() + fling));
        }}
        onClickCapture={(e) => {
          // klik yang sebenarnya akhir dari drag tidak dihitung sebagai klik
          if (dragged.current) {
            e.preventDefault();
            e.stopPropagation();
            dragged.current = false;
          }
        }}
        style={{ touchAction: "pan-y" }}
        className="relative mx-auto h-[34rem] cursor-grab select-none overflow-hidden rounded-[28px] [perspective:1400px] [mask-image:linear-gradient(to_right,transparent,black_9%,black_91%,transparent)] active:cursor-grabbing"
      >
        <div className="pointer-events-none absolute inset-x-0 top-6 h-[31rem] [transform-style:preserve-3d]">
          {projects.map((p, i) => (
            <CarouselItem
              key={p.title}
              p={p}
              i={i}
              pos={pos}
              spacing={spacing}
              width={width}
              active={active}
              onOpen={onOpen}
              onSelect={select}
              wrap={wrap}
            />
          ))}
        </div>
      </motion.div>

      {/* kontrol: hanya panah kiri/kanan */}
      <div className="mt-8 flex items-center justify-center gap-4">
        <button type="button" onClick={() => step(-1)} disabled={!loop && active === 0} aria-label="Proyek sebelumnya" className={ctrlBtn}>
          <FiChevronLeft size={22} />
        </button>
        <button type="button" onClick={() => step(1)} disabled={!loop && active === n - 1} aria-label="Proyek berikutnya" className={ctrlBtn}>
          <FiChevronRight size={22} />
        </button>
      </div>
      {/* pengumuman untuk pembaca layar saat kartu aktif berganti */}
      <p className="sr-only" aria-live="polite">
        Proyek {active + 1} dari {n}: {projects[active]?.title}
      </p>
    </div>
  );
}

export default function Projects() {

  // --- halaman detail proyek ---
  const [active, setActive] = useState(() => findDetail(slugFromHash()));
  const returnFocus = useRef(null);
  const pushed = useRef(false);

  useEffect(() => {
    const sync = () => setActive(findDetail(slugFromHash()));
    window.addEventListener("popstate", sync);
    window.addEventListener("hashchange", sync);
    return () => {
      window.removeEventListener("popstate", sync);
      window.removeEventListener("hashchange", sync);
    };
  }, []);

  const openDetail = (p, el) => {
    returnFocus.current = el;
    pushed.current = true;
    window.history.pushState(null, "", HASH_PREFIX + p.slug);
    setActive(p);
  };

  const closeDetail = useCallback(() => {
    if (pushed.current) {
      pushed.current = false;
      window.history.back(); // popstate akan menutup detail
    } else {
      // dibuka langsung dari link: jangan keluar dari situs, cukup ganti hash
      window.history.replaceState(null, "", "#projects");
      setActive(null);
    }
    setTimeout(() => returnFocus.current?.focus({ preventScroll: true }), 0);
  }, []);

  return (
    <section id="projects" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-28">
      <SectionTitle eyebrow="Portofolio Saya" title="Proyek" highlight="Pilihan" />
      <motion.div
        initial={{ opacity: 0, y: 40, ...blur(8) }}
        whileInView={{ opacity: 1, y: 0, ...blur(0) }}
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        transition={{ duration: 0.9, ease: easeOut }}
      >
        <Carousel3D onOpen={openDetail} />
      </motion.div>

      <AnimatePresence>
        {active && <ProjectDetail key={active.slug} project={active} onClose={closeDetail} />}
      </AnimatePresence>
    </section>
  );
}
