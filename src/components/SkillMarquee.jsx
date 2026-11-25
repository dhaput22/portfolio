import { memo, useEffect, useRef } from "react";

const SPEED = 42; // px per detik
const MIN_WIDTH = 2600; // lebar minimum satu putaran, supaya layar lebar pun selalu terisi
const CARD = 250; // lebar kartu terkecil (untuk menghitung pengulangan)
const STOP = 9; // seberapa cepat melambat saat di-hover (makin besar makin cepat berhenti)
const GO = 3.2; // seberapa cepat melaju lagi
const FRICTION = 3.4; // seberapa cepat sisa dorongan setelah digeser habis
const DRAG_START = 5; // px sebelum gerakan dianggap geser

export const SkillCard = memo(function SkillCard({ name, icon: Icon, color }) {
  return (
    <div
      style={{ "--brand-c": color }}
      className="skill-card flex h-28 w-full items-center justify-center rounded-[20px] border border-line bg-surface px-6 sm:h-32"
    >
      <span className="skill-zoom flex items-center gap-4">
        <Icon size={40} aria-hidden className="skill-icon shrink-0 text-fg" />
        <span className="whitespace-nowrap text-xl font-medium tracking-[-0.02em] text-fg">{name}</span>
      </span>
    </div>
  );
});

// Kartu berjalan terus dari kanan ke kiri. Saat mouse masuk, lajunya melambat halus sampai berhenti,
// lalu melaju lagi saat mouse pergi. Posisi dihitung sendiri tiap frame (bukan mengubah laju animasi CSS),
// jadi perubahan lajunya tidak pernah tersentak.
// Bisa juga digeser sendiri: tarik dengan mouse atau jari, scroll mendatar (trackpad), atau tombol panah keyboard.
// Setelah dilepas, baris meluncur sebentar lalu kembali berjalan sendiri.
export default function SkillMarquee({ items, label }) {
  const box = useRef(null);
  const track = useRef(null);
  const paused = useRef(false);
  const activeLi = useRef(null);
  const nudge = useRef(() => {});

  useEffect(() => {
    const el = track.current;
    const wrap = box.current;
    let half = el.scrollWidth / 2;
    let x = 0;
    let rate = paused.current ? 0 : 1;
    let last = 0;
    let raf = 0;
    let vel = 0; // sisa dorongan setelah digeser (px/detik)
    let drag = null;

    const shift = (d) => {
      x = (((x + d) % half) + half) % half;
    };

    const frame = (t) => {
      // jeda panjang (tab di latar, gulir berat) tidak membuat posisi melompat
      const dt = last ? Math.min((t - last) / 1000, 0.05) : 0;
      last = t;
      const target = paused.current || drag || Math.abs(vel) > SPEED ? 0 : 1;
      rate += (target - rate) * (1 - Math.exp(-dt * (target ? GO : STOP)));
      if (Math.abs(target - rate) < 0.004) rate = target;
      if (vel && !drag) {
        shift(vel * dt);
        vel *= Math.exp(-dt * FRICTION);
        if (Math.abs(vel) < 6) vel = 0;
      }
      if (rate > 0 && !drag) shift(SPEED * rate * dt);
      el.style.transform = `translate3d(${-x}px,0,0)`;
      raf = requestAnimationFrame(frame);
    };

    // hanya bergerak selagi terlihat di layar
    const io = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(raf);
      last = 0;
      if (entry.isIntersecting) raf = requestAnimationFrame(frame);
    });
    io.observe(wrap);

    // --- geser manual ---
    const onDown = (e) => {
      if (e.button !== 0 || drag) return;
      drag = { id: e.pointerId, start: e.clientX, px: e.clientX, t: e.timeStamp, v: 0, moved: false };
      vel = 0;
    };
    const onMove = (e) => {
      if (!drag || e.pointerId !== drag.id) return;
      if (!drag.moved) {
        if (Math.abs(e.clientX - drag.start) < DRAG_START) return;
        drag.moved = true;
        drag.px = e.clientX;
        drag.t = e.timeStamp;
        wrap.setPointerCapture(e.pointerId);
        return;
      }
      const d = drag.px - e.clientX;
      const dt = Math.max(1, e.timeStamp - drag.t) / 1000;
      drag.v += (d / dt - drag.v) * 0.35;
      drag.px = e.clientX;
      drag.t = e.timeStamp;
      shift(d);
    };
    const onEnd = (e) => {
      if (!drag || e.pointerId !== drag.id) return;
      // berhenti dulu sebelum dilepas = tidak meluncur
      if (drag.moved && e.type === "pointerup" && e.timeStamp - drag.t < 90) {
        vel = Math.max(-2600, Math.min(2600, drag.v));
      }
      drag = null;
    };
    const onWheel = (e) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return; // scroll halaman biasa
      e.preventDefault();
      vel = 0;
      shift(e.deltaX);
    };
    // satu kartu per tekan panah: jarak = vel / FRICTION
    nudge.current = (dir) => {
      vel = dir * (el.firstElementChild?.offsetWidth ?? CARD) * FRICTION;
    };
    // pointerup/cancel didengar di window: dilepas di luar baris sebelum sempat bergeser pun tetap selesai
    wrap.addEventListener("pointerdown", onDown);
    wrap.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onEnd);
    window.addEventListener("pointercancel", onEnd);
    wrap.addEventListener("wheel", onWheel, { passive: false });

    // lebar kartu berubah di breakpoint lain: pertahankan posisi relatif
    const ro = new ResizeObserver(() => {
      const next = el.scrollWidth / 2;
      if (next && next !== half) {
        x = (x / half) * next;
        half = next;
      }
    });
    ro.observe(el);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      wrap.removeEventListener("pointerdown", onDown);
      wrap.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onEnd);
      window.removeEventListener("pointercancel", onEnd);
      wrap.removeEventListener("wheel", onWheel);
    };
  }, [items]);

  // kartu aktif tetap aktif di celah antar kartu; baru dilepas saat mouse meninggalkan baris
  const setActive = (li) => {
    if (li === activeLi.current) return;
    activeLi.current?.removeAttribute("data-active");
    li?.setAttribute("data-active", "true");
    activeLi.current = li;
    if (li) track.current.setAttribute("data-dim", "true");
    else track.current.removeAttribute("data-dim");
  };
  const onMouse = (e) => {
    if (e.pointerType !== "mouse") return;
    paused.current = true;
    const li = e.target.closest?.("li");
    if (li && track.current.contains(li)) setActive(li);
  };

  // ulangi isi tab secukupnya, lalu gandakan sekali untuk putaran tanpa sambungan
  const repeat = Math.max(1, Math.ceil(MIN_WIDTH / (items.length * CARD)));
  const set = Array.from({ length: repeat }, () => items).flat();

  return (
    <div
      ref={box}
      role="group"
      aria-label={`Daftar ${label}`}
      tabIndex={0}
      onPointerEnter={onMouse}
      onPointerOver={onMouse}
      onPointerLeave={(e) => {
        if (e.pointerType !== "mouse") return;
        paused.current = false;
        setActive(null);
      }}
      onKeyDown={(e) => {
        if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
        e.preventDefault();
        nudge.current(e.key === "ArrowRight" ? 1 : -1);
      }}
      onFocus={(e) => {
        // hanya fokus keyboard; klik mouse/sentuhan tidak menghentikan baris
        if (e.currentTarget.matches(":focus-visible")) paused.current = true;
      }}
      onBlur={() => {
        paused.current = false;
      }}
      className="relative left-1/2 w-screen -translate-x-1/2 touch-pan-y select-none overflow-hidden py-4 outline-none [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-fg/40"
    >
      <ul ref={track} className="skill-track flex w-max will-change-transform">
        {[...set, ...set].map((item, i) => (
          // hanya satu set yang dibacakan pembaca layar
          <li key={i} aria-hidden={i >= items.length || undefined} className="w-[15.5rem] shrink-0 pr-4 sm:w-[19rem] sm:pr-5">
            <SkillCard {...item} />
          </li>
        ))}
      </ul>
    </div>
  );
}
