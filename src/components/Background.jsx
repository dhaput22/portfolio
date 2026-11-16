import { useEffect } from "react";

// 3 nada dari satu keluarga warna (biru keabuan), untuk mode terang & gelap.
const TONES = {
  light: { base: "#ebeff5", soft: "#f4f6fa", deep: "#e2e7ef" },
  dark: { base: "#1b1c1f", soft: "#212226", deep: "#16171a" },
};

// Nada tiap section, berurutan dari atas ke bawah.
const SECTIONS = [
  ["home", "base"],
  ["about", "soft"],
  ["skills", "base"],
  ["projects", "deep"],
  ["experience", "soft"],
  ["contact", "base"],
];

const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const smooth = (t) => t * t * (3 - 2 * t); // percepatan & perlambatan halus

// Latar polos yang warnanya berbaur terus mengikuti scroll: di antara dua section,
// warnanya adalah campuran keduanya sesuai posisi, jadi tidak ada momen "ganti" yang terasa.
export default function Background() {
  useEffect(() => {
    const root = document.documentElement;
    const els = SECTIONS.map(([id]) => document.getElementById(id));
    let frame = 0;

    const update = () => {
      frame = 0;
      const tones = TONES[root.dataset.theme === "dark" ? "dark" : "light"];
      const center = window.innerHeight / 2;
      // titik tengah tiap section relatif terhadap layar
      const mids = els.map((el) => {
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return r.top + r.height / 2;
      });

      let a = 0;
      let b = 0;
      let t = 0;
      if (mids[0] !== null && center <= mids[0]) {
        a = b = 0;
      } else if (center >= mids[mids.length - 1]) {
        a = b = mids.length - 1;
      } else {
        for (let i = 0; i < mids.length - 1; i++) {
          if (center >= mids[i] && center < mids[i + 1]) {
            a = i;
            b = i + 1;
            t = smooth((center - mids[i]) / (mids[i + 1] - mids[i]));
            break;
          }
        }
      }

      const ca = hex(tones[SECTIONS[a][1]]);
      const cb = hex(tones[SECTIONS[b][1]]);
      const mix = ca.map((v, k) => Math.round(v + (cb[k] - v) * t));
      root.style.setProperty("--section-bg", `rgb(${mix.join(",")})`);
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    // ganti tema: hitung ulang dengan palet mode yang baru
    const mo = new MutationObserver(schedule);
    mo.observe(root, { attributes: true, attributeFilter: ["data-theme"] });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      mo.disconnect();
    };
  }, []);

  return <div className="pointer-events-none fixed inset-0 -z-10 bg-[var(--section-bg)]" />;
}
