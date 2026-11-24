// =====================================================================
//  Token animasi bersama (gaya "Soft Canvas", mengikuti referensi):
//  - judul muncul dari blur 8px + fade
//  - kartu naik bertingkat: tiap kartu mulai sedikit lebih rendah dari sebelumnya
// =====================================================================

// Mode ringan untuk HP / layar sentuh / hemat data / kurangi gerakan:
// efek mahal (blur, backdrop blur) dimatikan supaya tetap lancar.
const mq = (q) => typeof window !== "undefined" && window.matchMedia(q).matches;
export const LITE =
  mq("(max-width: 767px)") ||
  mq("(pointer: coarse)") ||
  mq("(prefers-reduced-motion: reduce)") ||
  (typeof navigator !== "undefined" && navigator.connection?.saveData === true);

// Nilai filter blur, atau tidak ada sama sekali di mode ringan.
export const blur = (px) => (LITE ? {} : { filter: `blur(${px}px)` });

export const easeOut = [0.22, 1, 0.36, 1];
export const easeIn = [0.4, 0, 1, 1];

export const dur = { fast: 0.2, base: 0.7, exit: 0.3 };
export const RISE = 24;
export const STAGGER = 0.08;

// Animasi bolak-balik: muncul saat di-scroll turun, dan diputar mundur saat di-scroll naik lagi.
// Batas atas layar diperluas jauh ke atas, jadi elemen yang sudah lewat ke atas dianggap tetap terlihat;
// hanya elemen yang kembali turun melewati tepi bawah layar yang diputar mundur.
export const VIEW = { once: false, margin: "100000px 0px -14% 0px" };
export const BACK = { duration: 0.7, ease: [0.45, 0, 0.25, 1] }; // gerak mundur: pelan di awal dan akhir

const twoWay = (hidden, shown, duration, delay) => ({
  initial: hidden,
  animate: hidden,
  whileInView: { ...shown, transition: { duration, ease: easeOut, delay } },
  viewport: VIEW,
  transition: BACK,
});

// Teks/judul: blur -> tajam.
export const blurIn = (delay = 0) =>
  twoWay({ opacity: 0, ...blur(8), y: 12 }, { opacity: 1, ...blur(0), y: 0 }, dur.base, delay);

// Blok biasa: naik + fade.
export const reveal = (delay = 0) => twoWay({ opacity: 0, y: RISE }, { opacity: 1, y: 0 }, dur.base, delay);

// Kartu ke-i dalam satu grup: makin ke kanan/bawah, makin jauh titik awalnya (48, 72, 96px...).
export const cascade = (i = 0) =>
  twoWay({ opacity: 0, y: 48 + Math.min(i, 4) * 24 }, { opacity: 1, y: 0 }, 0.9, Math.min(i, 6) * STAGGER);
