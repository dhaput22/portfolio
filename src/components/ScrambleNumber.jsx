import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

const rand = () => String(Math.floor(Math.random() * 10));

// Angka yang "diacak" dulu (digit berganti cepat) lalu terkunci satu per satu ke nilai aslinya.
// Contoh: "15+" -> 83+ -> 27+ -> 1?+ -> 15+. Teks di luar angka (mis. "+") tidak diacak.
export default function ScrambleNumber({ value, delay = 0, duration = 1400 }) {
  const text = String(value);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(() => (reduce ? text : text.replace(/\d/g, "0")));

  useEffect(() => {
    if (!inView || reduce) {
      if (reduce) setShown(text);
      return;
    }
    const digitIdx = [...text].map((c, i) => (/\d/.test(c) ? i : -1)).filter((i) => i >= 0);
    // pakai timer (bukan requestAnimationFrame) supaya tetap selesai walau tab sedang di latar
    const begin = Date.now() + delay * 1000;
    const id = setInterval(() => {
      const elapsed = Date.now() - begin;
      if (elapsed < 0) return;
      const t = elapsed / duration;
      if (t >= 1) {
        setShown(text);
        clearInterval(id);
        return;
      }
      // digit ke-k terkunci setelah porsi waktunya lewat (kiri dulu)
      const locked = Math.floor(t * (digitIdx.length + 1));
      setShown(
        [...text]
          .map((c, i) => {
            const k = digitIdx.indexOf(i);
            return k === -1 || k < locked ? c : rand();
          })
          .join("")
      );
    }, 45);
    return () => clearInterval(id);
  }, [inView, reduce, text, delay, duration]);

  return (
    <span ref={ref} className="relative inline-block tabular-nums">
      {/* nilai asli menjaga lebar supaya tata letak tidak bergeser */}
      <span className="invisible">{text}</span>
      <span aria-hidden className="absolute inset-0">{shown}</span>
      <span className="sr-only">{text}</span>
    </span>
  );
}
