import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { LuAward, LuMaximize2, LuX } from "react-icons/lu";
import SectionTitle from "./SectionTitle";
import { certificates } from "../data/content";
import { cascade, easeOut, reveal } from "../lib/motion";

const ratio = "aspect-[1.414/1]"; // A4 mendatar, sama dengan sertifikatnya

// Pengganti saat gambar sertifikat belum ada: hanya nama dan penerbit, bukan tiruan sertifikat.
function NoImage({ c }) {
  return (
    <div className={`flex ${ratio} w-full flex-col justify-between bg-fill p-6 sm:p-9`}>
      <LuAward aria-hidden size={34} className="text-fg-subtle" />
      <div>
        <p className="text-xl font-medium leading-snug tracking-[-0.03em] text-fg sm:text-2xl">{c.title}</p>
        <p className="mt-2 text-sm text-fg-muted">
          {c.issuer} · {c.date}
        </p>
      </div>
    </div>
  );
}

const Preview = ({ c, className = "" }) =>
  c.image ? (
    <img src={c.image} alt={`Sertifikat ${c.title}`} loading="lazy" decoding="async" className={`block ${ratio} w-full object-cover ${className}`} />
  ) : (
    <NoImage c={c} />
  );

// Tampilan besar satu sertifikat. Esc, klik latar, atau tombol X menutupnya.
function Lightbox({ c, onClose }) {
  const closeRef = useRef(null);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      // satu-satunya tombol di dialog: fokus ditahan di sini
      if (e.key === "Tab") {
        e.preventDefault();
        closeRef.current?.focus();
      }
    };
    const { overflow } = document.documentElement.style;
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus({ preventScroll: true });
    return () => {
      document.documentElement.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return createPortal(
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`Sertifikat ${c.title}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      className="fixed inset-0 z-[90] flex items-center justify-center bg-[rgba(18,19,21,0.86)] p-4 sm:p-10"
    >
      <motion.img
        src={c.image}
        alt={`Sertifikat ${c.title} dari ${c.issuer}`}
        initial={{ scale: 0.95, y: 12 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.97 }}
        transition={{ duration: 0.4, ease: easeOut }}
        onClick={(e) => e.stopPropagation()}
        className="max-h-full max-w-full rounded-xl shadow-2xl"
      />
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Tutup"
        className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-xl bg-lime text-on-lime sm:right-6 sm:top-6"
      >
        <LuX size={22} aria-hidden />
      </button>
    </motion.div>,
    document.body
  );
}

export default function Certificates() {
  // pratinjau awal: sertifikat terbaru yang punya gambar
  const [active, setActive] = useState(() => Math.max(0, certificates.findIndex((c) => c.image)));
  const [open, setOpen] = useState(null);
  const opener = useRef(null);

  const show = (c, el) => {
    if (!c.image) return;
    opener.current = el;
    setOpen(c);
  };
  const close = useCallback(() => {
    setOpen(null);
    opener.current?.focus({ preventScroll: true });
  }, []);

  const current = certificates[active];

  return (
    <section id="certificates" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-28">
      <SectionTitle title="Sertifikasi &" highlight="Lisensi" />

      <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-16">
        <ul className="border-b border-line">
          {certificates.map((c, i) => {
            const on = i === active;
            return (
              <motion.li key={c.title} {...cascade(i)} className="relative border-t border-line">
                {on && (
                  <motion.span
                    layoutId="cert-mark"
                    aria-hidden
                    transition={{ type: "spring", stiffness: 360, damping: 34 }}
                    className="absolute -top-px left-0 hidden h-[3px] w-14 bg-fg lg:block cert-mark"
                  />
                )}
                <button
                  type="button"
                  onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={(e) => show(c, e.currentTarget)}
                  aria-label={c.image ? `Lihat sertifikat ${c.title}` : undefined}
                  className={`group block w-full py-7 text-left ${c.image ? "cursor-pointer" : "cursor-default"}`}
                >
                  <span className={`block transition-opacity duration-300 ${on ? "" : "lg:opacity-50"}`}>
                    <span className="flex items-baseline justify-between gap-6">
                      <span className="text-xl font-medium leading-snug tracking-[-0.03em] text-fg sm:text-2xl">{c.title}</span>
                      <span className="shrink-0 text-sm tabular-nums text-fg">{c.date}</span>
                    </span>
                    {c.topic && <span className="mt-1.5 block text-[15px] text-fg">{c.topic}</span>}
                    <span className="mt-2 block text-[15px] leading-snug text-fg-muted">{c.issuer}</span>
                    <span className="mt-1 block text-sm leading-relaxed text-fg-muted">
                      {c.role}
                      {c.skills?.length > 0 && ` · Keahlian: ${c.skills.join(", ")}`}
                    </span>
                  </span>

                  {/* layar kecil: gambar langsung di bawah keterangannya */}
                  {c.image && (
                    <span className="mt-5 block overflow-hidden rounded-2xl border border-line lg:hidden">
                      <Preview c={c} />
                    </span>
                  )}
                </button>
              </motion.li>
            );
          })}
        </ul>

        {/* layar lebar: satu pratinjau besar yang berganti mengikuti baris aktif */}
        <motion.div {...reveal(0.15)} className="hidden lg:block">
          <button
            type="button"
            tabIndex={-1}
            onClick={(e) => show(current, e.currentTarget)}
            aria-label={current.image ? `Perbesar sertifikat ${current.title}` : undefined}
            className={`group relative block w-full overflow-hidden rounded-[20px] border border-line bg-fill shadow-[var(--shadow-float)] ${ratio} ${
              current.image ? "cursor-zoom-in" : "cursor-default"
            }`}
          >
            <AnimatePresence initial={false}>
              <motion.span
                key={current.title}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: easeOut }}
                className="absolute inset-0 block text-left"
              >
                <Preview c={current} className="h-full" />
              </motion.span>
            </AnimatePresence>
            {current.image && (
              <span aria-hidden className="absolute bottom-4 right-4 flex h-11 w-11 scale-90 items-center justify-center rounded-xl bg-lime text-on-lime opacity-0 transition-[opacity,transform] duration-300 group-hover:scale-100 group-hover:opacity-100">
                <LuMaximize2 size={18} />
              </span>
            )}
          </button>
        </motion.div>
      </div>

      <AnimatePresence>{open && <Lightbox key={open.title} c={open} onClose={close} />}</AnimatePresence>
    </section>
  );
}
