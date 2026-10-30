import { motion } from "framer-motion";
import { profile } from "../data/content";
import useTypewriter from "../hooks/useTypewriter";

const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
});

function Chip({ children, className, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
      transition={{
        opacity: { delay: 1.1 + delay, duration: 0.5 },
        scale: { delay: 1.1 + delay, duration: 0.5 },
        y: { delay: 1.6 + delay, duration: 4.5, repeat: Infinity, ease: "easeInOut" },
      }}
      className={`absolute rounded-2xl border border-white/10 bg-ink/70 px-4 py-2 text-sm font-medium text-white shadow-xl backdrop-blur-md ${className}`}
    >
      {children}
    </motion.div>
  );
}

export default function Hero() {
  const typed = useTypewriter(profile.roles);

  return (
    <section
      id="home"
      className="relative mx-auto flex min-h-screen max-w-6xl items-center px-6 pb-24 pt-36"
    >
      <div className="grid w-full items-center gap-16 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        {/* ---------- Foto dengan bingkai miring ---------- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-[19rem] sm:max-w-sm"
        >
          {/* bingkai garis miring yang bergoyang pelan */}
          <motion.div
            animate={{ rotate: [-7, -10, -7] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 rounded-[1.75rem] border-2 border-brand/50"
          />
          <motion.div
            animate={{ rotate: [5, 8, 5] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 rounded-[1.75rem] border-2 border-accent/50"
          />

          <div className="relative aspect-[3/4] overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-navy via-[#0a63c9] to-[#7cdbfd] shadow-[0_0_80px_rgba(124,219,253,0.35)]">
            {profile.photo ? (
              <img src={profile.photo} alt={profile.name} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <span className="text-8xl font-bold text-snow/90">{profile.initials}</span>
              </div>
            )}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_15%,rgba(255,255,255,0.25),transparent_55%)]" />
          </div>

          {/* <Chip className="-right-4 top-10 sm:-right-10" delay={0}>⚛️ React</Chip>
          <Chip className="-left-4 bottom-24 sm:-left-10" delay={0.3}>🔥 Laravel</Chip>
          <Chip className="-right-2 bottom-6 sm:-right-8" delay={0.6}>
            <span className="mr-2 inline-block h-2 w-2 rounded-full bg-emerald-400" />
            Open to work
          </Chip> */}
        </motion.div>

        {/* ---------- Teks ---------- */}
        <div className="@container min-w-0">
          {/* nama: besar, satu baris */}
          <motion.h1
            {...fadeUp(0.3)}
            className="text-[clamp(1.75rem,5.8cqw,3rem)] font-bold leading-tight text-white sm:whitespace-nowrap"
          >
            {profile.greeting} <span className="text-accent">{profile.name}</span>
          </motion.h1>

          {/* typewriter: satu baris, font monospace */}
          <motion.p
            {...fadeUp(0.45)}
            className="mt-3 whitespace-nowrap font-mono text-[clamp(0.9rem,4.2cqw,1.6rem)] font-medium text-slate-200"
          >
            {profile.titlePrefix}{" "}
            <span className="text-shine caret">{typed}</span>
          </motion.p>

          <motion.p {...fadeUp(0.6)} className="mt-6 max-w-lg text-lg leading-relaxed text-slate-400">
            {profile.description}
          </motion.p>

          <motion.div {...fadeUp(0.75)} className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              className="rounded-full bg-accent px-8 py-3.5 font-bold text-on-accent shadow-[0_8px_28px_rgba(225,128,41,0.45)] transition hover:-translate-y-1 hover:shadow-[0_14px_36px_rgba(225,128,41,0.6)]"
            >
              Hubungi Saya
            </a>
            <a
              href="#projects"
              className="rounded-full border-2 border-accent px-8 py-3 font-bold text-accent transition hover:-translate-y-1 hover:bg-accent/10"
            >
              Lihat Proyek
            </a>
            {profile.cvUrl && (
              <a
                href={profile.cvUrl}
                download
                className="px-3 py-3 font-medium text-slate-300 transition hover:text-white"
              >
                Unduh CV ↓
              </a>
            )}
          </motion.div>
        </div>
      </div>

      {/* indikator scroll */}
      <motion.a
        href="#about"
        {...fadeUp(1.2)}
        aria-label="Scroll ke bawah"
        className="absolute bottom-8 left-1/2 hidden h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border border-accent/60 sm:flex"
      >
        <motion.span
          animate={{ y: [-5, 5, -5] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="h-2 w-2 rounded-full bg-accent"
        />
      </motion.a>
    </section>
  );
}