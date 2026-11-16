import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { FiCode, FiDownload } from "react-icons/fi";
import { profile } from "../data/content";
import useTypewriter from "../hooks/useTypewriter";
import ArrowBox from "./ArrowBox";
import { blur, easeOut } from "../lib/motion";

// Masuk berurutan: blur -> tajam, sedikit naik.
const enter = (i) => ({
  initial: { opacity: 0, ...blur(8), y: 16 },
  animate: { opacity: 1, ...blur(0), y: 0 },
  transition: { duration: 0.9, ease: easeOut, delay: 0.15 + i * 0.1 },
});


export default function Hero() {
  const typed = useTypewriter(profile.roles);
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  // parallax halus: foto turun pelan saat di-scroll
  const photoY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 60]);

  const photo = profile.photo || "";
  const webp = /\.png$/i.test(photo) ? photo.replace(/\.png$/i, ".webp") : null;

  return (
    <section
      id="home"
      ref={ref}
      className="relative mx-auto max-w-6xl overflow-x-clip px-6 pt-28 lg:min-h-screen lg:pt-24"
    >
      <div className="grid items-end gap-6 lg:min-h-[calc(100vh-6rem)] lg:grid-cols-[1.2fr_0.8fr]">
        {/* ---------- Teks ---------- */}
        <div className="relative z-10 pb-10 lg:self-center lg:pb-24">
          <motion.p {...enter(0)} className="pill">
            <span className="dot"><FiCode size={11} /></span>
            <span className="font-medium">
              {profile.titlePrefix}
              <span className="caret">{typed}</span>
            </span>
          </motion.p>

          <h1 className="display mt-6 text-[clamp(2.6rem,5.2vw,4.4rem)] text-fg">
            <motion.span {...enter(1)} className="block">
              {profile.greeting}
            </motion.span>
            <motion.span {...enter(2)} className="block lg:whitespace-nowrap">
              {profile.name}
            </motion.span>
          </h1>

          <motion.p {...enter(3)} className="mt-6 max-w-md text-lg leading-relaxed text-fg-muted">
            {profile.description}
          </motion.p>

          <motion.div {...enter(4)} className="mt-9 flex flex-wrap items-center gap-3">
            <a href={profile.cvUrl} download className="btn-arrow">
              <ArrowBox icon={FiDownload} direction="down" />
              Unduh CV
            </a>
            <a href="#projects" className="btn-soft">
              <ArrowBox />
              Lihat Proyek
            </a>
          </motion.div>
        </div>

        {/* ---------- Foto ---------- */}
        <div className="relative mx-auto h-[min(34rem,120vw)] w-full max-w-lg lg:-ml-[6%] lg:-translate-y-20 lg:h-[calc(100vh-4.5rem)] lg:w-[132%] lg:max-w-none">
          <motion.div
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: easeOut }}
            style={{ y: photoY }}
            className="absolute inset-0"
          >
            
            {photo ? (
              <picture className="relative">
                {webp && <source srcSet={webp} type="image/webp" />}
                <img
                  src={photo}
                  alt={profile.name}
                  fetchPriority="high"
                  className="h-full w-full object-contain object-bottom [mask-image:linear-gradient(to_bottom,black_72%,transparent_98%)]"
                />
              </picture>
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <span className="display text-8xl text-fg-subtle">{profile.initials}</span>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
