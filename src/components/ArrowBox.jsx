import { FiArrowRight } from "react-icons/fi";

// Kotak ikon berisi dua ikon: saat hover ikon pertama keluar, ikon kedua masuk.
// direction="down" untuk ikon unduh (bergerak vertikal).
export default function ArrowBox({ icon: Icon = FiArrowRight, size = 18, direction = "right" }) {
  return (
    <span className={`icon-box ${direction === "down" ? "down" : ""}`} aria-hidden>
      <Icon size={size} className="arr arr-1" />
      <Icon size={size} className="arr arr-2" />
    </span>
  );
}
