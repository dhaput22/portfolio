import { useRef } from "react";

// Kartu dengan cahaya yang mengikuti posisi mouse (lihat .spot-card di index.css).
export default function SpotlightCard({ children, className = "", ...rest }) {
  const ref = useRef(null);

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--mx", `${e.clientX - r.left}px`);
    ref.current.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <div ref={ref} onMouseMove={onMove} className={`spot-card ${className}`} {...rest}>
      {children}
    </div>
  );
}
