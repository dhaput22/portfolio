// =====================================================================
//  Token animasi bersama (gaya "Soft Canvas", mengikuti referensi):
//  - judul muncul dari blur 8px + fade
//  - kartu naik bertingkat: tiap kartu mulai sedikit lebih rendah dari sebelumnya
// =====================================================================

// Mode ringan untuk HP / layar sentuh / hemat data / kurangi gerakan:
// efek mahal (blur, latar 3D, backdrop blur) dimatikan supaya tetap lancar.
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

const VIEW = { once: true, margin: "0px 0px -10% 0px" };

// Teks/judul: blur -> tajam.
export const blurIn = (delay = 0) => ({
  initial: { opacity: 0, ...blur(8), y: 12 },
  whileInView: { opacity: 1, ...blur(0), y: 0 },
  viewport: VIEW,
  transition: { duration: dur.base, ease: easeOut, delay },
});

// Blok biasa: naik + fade.
export const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: RISE },
  whileInView: { opacity: 1, y: 0 },
  viewport: VIEW,
  transition: { duration: dur.base, ease: easeOut, delay },
});

// Kartu ke-i dalam satu grup: makin ke kanan/bawah, makin jauh titik awalnya (48, 72, 96px...).
export const cascade = (i = 0) => ({
  initial: { opacity: 0, y: 48 + Math.min(i, 4) * 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: VIEW,
  transition: { duration: 0.9, ease: easeOut, delay: Math.min(i, 6) * STAGGER },
});
