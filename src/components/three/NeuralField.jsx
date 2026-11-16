import { useEffect, useRef } from "react";
import * as THREE from "three";
import { createRenderer, glowTexture, isLight, reducedMotion, watchTheme } from "./utils";

const B = { x: 16, y: 10, z: 6 }; // batas ruang tempat titik melayang
const LINK = 4.2; // jarak maksimum dua titik tersambung

const PAL = {
  dark: { color: "#f2f3f5", blending: THREE.AdditiveBlending, nodeOpacity: 0.35, lineAlpha: 0.1 },
  light: { color: "#35363b", blending: THREE.NormalBlending, nodeOpacity: 0.28, lineAlpha: 0.09 },
};

// Latar kedalaman yang tenang: sedikit titik, garis tipis, gerak sangat lambat.
// Hanya sebagai suasana, tidak mengganggu teks.
export default function NeuralField() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const renderer = createRenderer(canvas);
    if (!renderer) return;

    const small = window.innerWidth < 768;
    const N = small ? 22 : 42;
    const MAX_LINKS = N * 3;
    const still = reducedMotion();
    const LINK2 = LINK * LINK;

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
    camera.position.z = 13;
    const world = new THREE.Group();
    scene.add(world);
    const glow = glowTexture();

    const pos = new Float32Array(N * 3);
    const vel = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      pos[i * 3] = (Math.random() * 2 - 1) * B.x;
      pos[i * 3 + 1] = (Math.random() * 2 - 1) * B.y;
      pos[i * 3 + 2] = (Math.random() * 2 - 1) * B.z;
      vel[i * 3] = (Math.random() - 0.5) * 0.25;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.25;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.15;
    }

    const nodeGeo = new THREE.BufferGeometry();
    nodeGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    const nodeMat = new THREE.PointsMaterial({
      size: 0.32, map: glow, transparent: true, depthWrite: false,
    });
    world.add(new THREE.Points(nodeGeo, nodeMat));

    const linePos = new Float32Array(MAX_LINKS * 6);
    const lineCol = new Float32Array(MAX_LINKS * 8);
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute("position", new THREE.BufferAttribute(linePos, 3));
    lineGeo.setAttribute("color", new THREE.BufferAttribute(lineCol, 4));
    lineGeo.setDrawRange(0, 0);
    const lineMat = new THREE.LineBasicMaterial({
      vertexColors: true, transparent: true, depthWrite: false,
    });
    const lines = new THREE.LineSegments(lineGeo, lineMat);
    lines.frustumCulled = false;
    world.add(lines);

    let pal = PAL.dark;
    const base = new THREE.Color();
    const applyTheme = (light) => {
      pal = light ? PAL.light : PAL.dark;
      base.set(pal.color);
      nodeMat.color.set(pal.color);
      nodeMat.opacity = pal.nodeOpacity;
      [nodeMat, lineMat].forEach((m) => { m.blending = pal.blending; m.needsUpdate = true; });
    };
    applyTheme(isLight());
    const stopTheme = watchTheme((light) => { applyTheme(light); if (still) render(); });

    const mouse = { x: 0, y: 0 };
    const onMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove);
    const scrollProgress = () =>
      window.scrollY / Math.max(1, document.documentElement.scrollHeight - window.innerHeight);

    const onResize = () => {
      const w = window.innerWidth, h = window.innerHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      if (still) render();
    };
    window.addEventListener("resize", onResize);

    const update = (dt) => {
      for (let i = 0; i < N; i++) {
        for (let a = 0; a < 3; a++) {
          const k = i * 3 + a;
          pos[k] += vel[k] * dt;
          const lim = a === 0 ? B.x : a === 1 ? B.y : B.z;
          if (pos[k] > lim || pos[k] < -lim) vel[k] *= -1;
        }
      }
      nodeGeo.attributes.position.needsUpdate = true;

      let n = 0;
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N && n < MAX_LINKS; j++) {
          const dx = pos[i * 3] - pos[j * 3];
          const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
          const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
          const dd = dx * dx + dy * dy + dz * dz;
          if (dd >= LINK2) continue;
          const alpha = (1 - Math.sqrt(dd) / LINK) * pal.lineAlpha;
          const o = n * 6, c = n * 8;
          linePos[o] = pos[i * 3]; linePos[o + 1] = pos[i * 3 + 1]; linePos[o + 2] = pos[i * 3 + 2];
          linePos[o + 3] = pos[j * 3]; linePos[o + 4] = pos[j * 3 + 1]; linePos[o + 5] = pos[j * 3 + 2];
          for (const v of [0, 4]) {
            lineCol[c + v] = base.r; lineCol[c + v + 1] = base.g; lineCol[c + v + 2] = base.b;
            lineCol[c + v + 3] = alpha;
          }
          n++;
        }
      }
      lineGeo.setDrawRange(0, n * 2);
      lineGeo.attributes.position.needsUpdate = true;
      lineGeo.attributes.color.needsUpdate = true;

      // parallax halus mengikuti mouse + sedikit bergeser saat scroll
      camera.position.x += (mouse.x * 0.6 - camera.position.x) * 0.03;
      camera.position.y += (-mouse.y * 0.4 - camera.position.y) * 0.03;
      camera.lookAt(0, 0, 0);
      world.rotation.y += (scrollProgress() * 0.5 - world.rotation.y) * 0.03;
    };

    const render = () => renderer.render(scene, camera);

    onResize();
    let last = performance.now();
    let raf = 0;
    const loop = () => {
      const now = performance.now();
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      update(dt);
      render();
      raf = requestAnimationFrame(loop);
    };
    if (still) { update(0); render(); } else loop();

    return () => {
      cancelAnimationFrame(raf);
      stopTheme();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", onResize);
      [nodeGeo, lineGeo].forEach((g) => g.dispose());
      [nodeMat, lineMat].forEach((m) => m.dispose());
      glow.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
    />
  );
}