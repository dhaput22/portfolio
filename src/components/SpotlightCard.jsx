import { useRef } from "react";

const canTilt = () =>
  window.matchMedia("(pointer: fine)").matches &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Kartu dengan cahaya yang mengikuti mouse + kemiringan 3D halus saat di-hover.
export default function SpotlightCard({ children, className = "", tilt = 2.5, ...rest }) {
  const ref = useRef(null);

  const onMove = (e) => {
    const el = ref.current;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);
    if (tilt && canTilt()) {
      const rx = (y / r.height - 0.5) * -2 * tilt;
      const ry = (x / r.width - 0.5) * 2 * tilt;
      el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    }
  };

  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`spot-card ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}