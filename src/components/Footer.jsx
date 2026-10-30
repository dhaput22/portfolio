import { profile } from "../data/content";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-8 text-center text-sm text-slate-500">
      © {new Date().getFullYear()} {profile.name}
      <span className="text-accent">.</span> Dibuat dengan React, Vite & Tailwind CSS.
    </footer>
  );
}
