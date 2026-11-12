import * as THREE from "three";

export const isLight = () => document.documentElement.dataset.theme === "light";

export const reducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Panggil cb(isLight) setiap tema berganti. Mengembalikan fungsi untuk berhenti.
export function watchTheme(cb) {
  const mo = new MutationObserver(() => cb(isLight()));
  mo.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => mo.disconnect();
}

// Panggil cb(true/false) saat elemen masuk/keluar layar (hemat baterai).
export function observeVisible(el, cb) {
  const io = new IntersectionObserver(([e]) => cb(e.isIntersecting));
  io.observe(el);
  return () => io.disconnect();
}

// Renderer transparan. Mengembalikan null kalau WebGL tidak tersedia.
export function createRenderer(canvas) {
  try {
    return new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
  } catch {
    return null;
  }
}

// Tekstur titik bercahaya (lingkaran lembut).
export function glowTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const g = c.getContext("2d");
  const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, "rgba(255,255,255,1)");
  grad.addColorStop(0.25, "rgba(255,255,255,0.8)");
  grad.addColorStop(0.6, "rgba(255,255,255,0.15)");
  grad.addColorStop(1, "rgba(255,255,255,0)");
  g.fillStyle = grad;
  g.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(c);
}