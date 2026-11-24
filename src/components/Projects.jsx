import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence, animate, motion, useInView, useMotionValue, useMotionValueEvent, useReducedMotion, useTransform,
} from "framer-motion";
import { FiArrowUpRight, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import SectionTitle from "./SectionTitle";
import ProjectDetail from "./ProjectDetail";
import { BACK, VIEW, easeOut } from "../lib/motion";
import { projects } from "../data/content";

// Halaman detail dibuka lewat hash #proyek/<slug>, jadi bisa dibagikan dan tombol Back browser menutupnya.
const HASH_PREFIX = "#proyek/";
const slugFromHash = () =>
  window.location.hash.startsWith(HASH_PREFIX) ? window.location.hash.slice(HASH_PREFIX.length) : null;
const findDetail = (slug) => projects.find((p) => p.detail && p.slug === slug) ?? null;

// link yang belum diisi ("#" atau kosong) dianggap tidak ada
const hasLink = (url) => Boolean(url) && url !== "#";

const RADIUS = "rounded-[14px]";

// Overlay hover mengikuti video referensi (overlay menutup gambar, lalu ikon bulat, judul, dan kategori
// muncul bergantian), dengan warna tema portofolio: charcoal gelap dan aksen lime.
const show = "group-hover:opacity-100 group-focus-within:opacity-100";
const lift = "group-hover:translate-y-0 group-focus-within:translate-y-0";

// Satu tile gambar persegi.
function ProjectTile({ p, onOpen, focusable }) {
  const clickable = Boolean(p.detail) || hasLink(p.github);
  const open = (e) => {
    if (p.detail) onOpen(p, e.currentTarget);
    else window.open(p.github, "_blank", "noopener");
  };
  const src = p.thumb || p.image;

  return (
    <article className={`group relative h-full w-full overflow-hidden ${RADIUS} bg-fill`}>
      {src ? (
        <img
          src={src}
          alt={p.title}
          decoding="async"
          draggable={false}
          className="h-full w-full object-cover object-left-top transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.07]"
        />
      ) : (
        // proyek tanpa gambar: blok warna dengan judul
        <div
          className="flex h-full w-full items-end p-7 transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.07]"
          style={{ backgroundImage: `linear-gradient(135deg, ${p.colors[0]}, ${p.colors[1]})` }}
        >
          <span className="text-2xl font-medium leading-tight tracking-[-0.03em] text-snow/90">{p.title}</span>
        </div>
      )}

      {/* overlay hover (perangkat dengan mouse) */}
      <div
        className={`pointer-events-none absolute inset-0 flex flex-col items-center justify-center bg-[radial-gradient(120%_90%_at_50%_0%,rgba(217,255,92,0.16),transparent_60%),linear-gradient(160deg,rgba(36,36,38,0.94),rgba(22,23,26,0.88))] px-8 text-center opacity-0 transition-opacity duration-[450ms] ease-out ${show} [@media(hover:none)]:hidden`}
      >
        <span
          className={`flex h-16 w-16 scale-0 items-center justify-center rounded-full bg-lime text-on-lime opacity-0 shadow-[0_10px_30px_rgba(217,255,92,0.25)] transition-all delay-100 duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-100 group-focus-within:scale-100 ${show}`}
        >
          <FiArrowUpRight size={26} />
        </span>
        <h3
          className={`mt-6 translate-y-3 text-2xl font-semibold tracking-[-0.02em] text-snow opacity-0 transition-all delay-200 duration-500 ease-out ${show} ${lift}`}
        >
          {p.title}
        </h3>
        <p
          className={`mt-2 translate-y-3 text-sm text-snow/65 opacity-0 transition-all delay-300 duration-500 ease-out ${show} ${lift}`}
        >
          {p.tags.join(", ")}
        </p>
      </div>

      {/* caption tetap untuk layar sentuh (tidak ada hover) */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 hidden bg-gradient-to-t from-charcoal/90 via-charcoal/55 to-transparent px-5 pb-4 pt-12 [@media(hover:none)]:block">
        <h3 className="text-base font-medium tracking-[-0.02em] text-snow">{p.title}</h3>
        <p className="mt-0.5 line-clamp-1 text-xs text-snow/65">{p.tags.join(", ")}</p>
      </div>

      {/* seluruh tile bisa diklik */}
      {clickable && (
        <button
          type="button"
          onClick={open}
          tabIndex={focusable ? undefined : -1}
          aria-label={p.detail ? `Lihat detail proyek ${p.title}` : `Buka repositori ${p.title}`}
          className={`absolute inset-0 cursor-pointer ${RADIUS} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-lime`}
        />
      )}
    </article>
  );
}

// Satu slot di rel. Posisinya dihitung dari `pos` (indeks tengah berupa angka pecahan),
// jadi saat di-drag semua tile bergeser mulus.
function RailItem({ p, i, pos, step, width, half, onOpen, onSelect, wrap, inView }) {
  const offset = useTransform(pos, (v) => wrap(i - v));
  const x = useTransform(offset, (o) => o * step - width / 2);
  // tile di luar area utama sedikit mengecil dan tertutup warna latar
  const edge = (o) => Math.min(1, Math.max(0, Math.abs(o) - half));
  const scale = useTransform(offset, (o) => 1 - edge(o) * 0.08);
  const veil = useTransform(offset, (o) => edge(o) * 0.62);
  const visibility = useTransform(offset, (o) => (Math.abs(o) > half + 1.6 ? "hidden" : "visible"));

  // status "tile utama" hanya di-set saat benar-benar berubah, supaya tidak ada render ulang tiap frame
  const isMain = (o) => Math.abs(o) <= half + 0.01;
  const [main, setMain] = useState(() => isMain(offset.get()));
  const mainRef = useRef(main);
  useMotionValueEvent(offset, "change", (o) => {
    const m = isMain(o);
    if (m !== mainRef.current) {
      mainRef.current = m;
      setMain(m);
    }
  });

  // urutan muncul saat pertama terlihat: dari kiri ke kanan
  const [slot] = useState(() => Math.round(offset.get()) + half + 1);

  return (
    <motion.div
      style={{ x, scale, width, visibility }}
      className="pointer-events-auto absolute left-1/2 top-0 h-full will-change-transform"
    >
      <motion.div
        className="h-full"
        initial={{ opacity: 0, y: 60 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
        transition={inView ? { duration: 0.9, delay: 0.1 + Math.max(0, slot) * 0.09, ease: easeOut } : BACK}
      >
        <ProjectTile p={p} onOpen={onOpen} focusable={main} />
      </motion.div>
      <motion.div
        aria-hidden
        style={{ opacity: veil }}
        className={`pointer-events-none absolute inset-0 ${RADIUS} bg-[var(--section-bg)]`}
      />
      {!main && (
        <button
          type="button"
          onClick={() => onSelect(i)}
          tabIndex={-1}
          aria-label={`Geser ke proyek ${p.title}`}
          className={`absolute inset-0 z-10 cursor-pointer ${RADIUS}`}
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

// panah kecil di sisi kiri/kanan rel seperti referensi; saat di-hover jadi lingkaran lime
const sideBtn =
  "absolute top-1/2 z-20 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full text-fg/70 transition-[background-color,color,box-shadow,transform] duration-300 hover:scale-105 hover:bg-lime hover:text-on-lime hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime disabled:pointer-events-none disabled:opacity-0";

// Carousel datar: 3 tile utuh di desktop (1 di mobile), tile di tepi kiri/kanan mengintip dan memudar.
// Bisa di-drag/geser, klik tile tepi, panah samping, atau tombol panah keyboard.
function ProjectRail({ onOpen }) {
  const n = projects.length;
  const vw = useViewportWidth();
  const reduce = useReducedMotion();
  const cols = vw >= 1024 ? 3 : 1;
  const half = (cols - 1) / 2;
  // tile persegi besar seperti referensi: 3 utuh di tengah, tile tepi mengintip di kiri-kanan layar
  const gap = cols === 3 ? Math.round(Math.min(vw, 1920) * 0.016) : 14;
  const width = cols === 3 ? Math.round(Math.min(vw * 0.26, 460)) : Math.min(vw - 72, 460);
  const step = width + gap;
  const height = width;
  // posisi panah: tepat di luar tile utama paling kiri/kanan, di atas tile yang memudar
  const arrowOffset = half * step + width / 2 + gap / 2 + (cols === 3 ? 30 : 4);

  const loop = n > cols + 1;
  const mod = (v) => ((v % n) + n) % n;
  const wrap = useCallback((o) => (loop ? mod(o + n / 2) - n / 2 : o), [loop, n]); // eslint-disable-line react-hooks/exhaustive-deps

  // mulai dengan proyek pertama di tile paling kiri (bukan di tengah)
  const pos = useMotionValue(half);
  const [center, setCenter] = useState(half);
  const prevHalf = useRef(half);
  useEffect(() => {
    // jumlah kolom berubah (resize): pertahankan proyek paling kiri yang sedang terlihat
    pos.set(Math.round(pos.get()) + half - prevHalf.current);
    prevHalf.current = half;
  }, [half, pos]);
  const first = loop ? mod(center - half) : Math.max(0, center - half);
  const startPos = useRef(0);
  const dragged = useRef(false);
  const railRef = useRef(null);
  const inView = useInView(railRef, VIEW);

  const centerRef = useRef(center);
  useMotionValueEvent(pos, "change", (v) => {
    const r = loop ? mod(Math.round(v)) : Math.max(0, Math.min(n - 1, Math.round(v)));
    if (r !== centerRef.current) {
      centerRef.current = r;
      setCenter(r);
    }
  });

  // geser halus: easing pelan di awal dan akhir, tanpa pantulan
  const go = useCallback(
    (target) => {
      const t = loop ? target : Math.max(0, Math.min(n - 1, target));
      if (reduce) pos.set(t);
      else animate(pos, t, { type: "tween", duration: 0.9, ease: [0.45, 0, 0.15, 1] });
    },
    [loop, n, pos, reduce]
  );

  // tekan panah berkali-kali: lanjut dari tujuan terakhir, bukan dari posisi yang sedang bergerak
  const target = useRef(half);
  const goTo = (t) => {
    target.current = t;
    go(t);
  };
  const move = (dir) => {
    const base = pos.isAnimating() ? target.current : Math.round(pos.get());
    goTo(base + dir);
  };
  // klik tile tepi: geser secukupnya sampai tile itu masuk area utama
  const select = (i) => {
    const base = Math.round(pos.get());
    const o = wrap(i - base);
    goTo(base + (o > 0 ? o - half : o + half));
  };

  const resist = (v) => {
    if (loop) return v;
    if (v < 0) return v * 0.35;
    if (v > n - 1) return n - 1 + (v - (n - 1)) * 0.35;
    return v;
  };

  return (
    <div ref={railRef}>
      <motion.div
        role="region"
        aria-roledescription="carousel"
        aria-label="Daftar proyek"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") {
            e.preventDefault();
            move(1);
          }
          if (e.key === "ArrowLeft") {
            e.preventDefault();
            move(-1);
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
          pos.set(resist(startPos.current - info.offset.x / step));
        }}
        onPanEnd={(_, info) => {
          // lemparan cepat melompat lebih jauh
          const fling = Math.max(-2, Math.min(2, -info.velocity.x / (step * 5)));
          goTo(Math.round(pos.get() + fling));
        }}
        onClickCapture={(e) => {
          // klik yang sebenarnya akhir dari drag tidak dihitung sebagai klik
          if (dragged.current) {
            e.preventDefault();
            e.stopPropagation();
            dragged.current = false;
          }
        }}
        style={{ touchAction: "pan-y", height }}
        // rel selebar layar supaya tile tepi bisa mengintip di luar kolom konten
        className="relative left-1/2 w-screen -translate-x-1/2 select-none overflow-hidden outline-none"
      >
        <div className="pointer-events-none absolute inset-0">
          {projects.map((p, i) => (
            <RailItem
              key={p.title}
              p={p}
              i={i}
              pos={pos}
              step={step}
              width={width}
              half={half}
              onOpen={onOpen}
              onSelect={select}
              wrap={wrap}
              inView={inView}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => move(-1)}
          disabled={!loop && center === 0}
          aria-label="Proyek sebelumnya"
          className={sideBtn}
          style={{ left: `calc(50% - ${arrowOffset}px)` }}
        >
          <FiChevronLeft size={22} />
        </button>
        <button
          type="button"
          onClick={() => move(1)}
          disabled={!loop && center === n - 1}
          aria-label="Proyek berikutnya"
          className={sideBtn}
          style={{ left: `calc(50% + ${arrowOffset}px)` }}
        >
          <FiChevronRight size={22} />
        </button>
      </motion.div>

      {/* pengumuman untuk pembaca layar saat posisi berganti */}
      <p className="sr-only" aria-live="polite">
        Proyek {first + 1} dari {n}: {projects[first]?.title}
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
      <SectionTitle title="Proyek" highlight="Pilihan" />
      <ProjectRail onOpen={openDetail} />

      <AnimatePresence>
        {active && <ProjectDetail key={active.slug} project={active} onClose={closeDetail} />}
      </AnimatePresence>
    </section>
  );
}
