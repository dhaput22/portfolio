import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiChevronDown, FiDownload } from "react-icons/fi";
import ArrowBox from "./ArrowBox";
import { profile } from "../data/content";
import { easeOut } from "../lib/motion";

// perkiraan tinggi panel dan navbar, dengan jaraknya (px)
const PANEL = 170;
const NAVBAR = 84;

// Tombol "Unduh CV": membuka pilihan bahasa dulu, berkas baru diunduh setelah salah satunya dipilih.
// Esc, klik di luar, atau pindah fokus ke luar menutup pilihannya.
export default function CvDownload() {
  const [open, setOpen] = useState(false);
  const [up, setUp] = useState(false);
  const wrapRef = useRef(null);
  const btnRef = useRef(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onPointer = (e) => {
      if (!wrapRef.current?.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      btnRef.current?.focus({ preventScroll: true });
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const toggle = () => {
    if (!open) {
      // ruang di bawah tombol tidak cukup: buka ke atas, selama tidak menabrak navbar
      const { top, bottom } = btnRef.current.getBoundingClientRect();
      setUp(window.innerHeight - bottom < PANEL && top - NAVBAR > PANEL);
    }
    setOpen(!open);
  };

  return (
    <div
      ref={wrapRef}
      className="relative z-10"
      onBlur={(e) => {
        // relatedTarget kosong = klik biasa atau pindah jendela, sudah ditangani di atas
        if (e.relatedTarget && !e.currentTarget.contains(e.relatedTarget)) setOpen(false);
      }}
    >
      <button
        ref={btnRef}
        type="button"
        onClick={toggle}
        aria-expanded={open}
        aria-controls={panelId}
        className="btn-arrow cursor-pointer"
      >
        <ArrowBox icon={FiDownload} direction="down" />
        Unduh CV
        <FiChevronDown
          aria-hidden
          size={18}
          className={`-ml-1.5 -mr-1.5 transition-transform duration-300 ease-out ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            id={panelId}
            aria-label="Pilih bahasa CV"
            initial={{ opacity: 0, y: up ? 8 : -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: up ? 6 : -6, scale: 0.98 }}
            transition={{ duration: 0.25, ease: easeOut }}
            className={`absolute left-0 w-64 rounded-2xl border border-line bg-surface p-1.5 shadow-float ${
              up ? "bottom-full mb-2 origin-bottom-left" : "top-full mt-2 origin-top-left"
            }`}
          >
            {profile.cv.map(({ lang, label, note, file }) => (
              <li key={lang}>
                <a
                  href={file}
                  download
                  hrefLang={lang}
                  onClick={() => setOpen(false)}
                  className="group flex items-center justify-between gap-4 rounded-xl px-4 py-3 text-fg outline-none transition-colors duration-200 hover:bg-fill focus-visible:bg-fill"
                >
                  <span lang={lang}>
                    <span className="block font-medium">{label}</span>
                    <span className="block text-sm text-fg-muted">{note}</span>
                  </span>
                  <FiDownload
                    aria-hidden
                    size={18}
                    className="shrink-0 text-fg-subtle transition-colors duration-200 group-hover:text-fg group-focus-visible:text-fg"
                  />
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
