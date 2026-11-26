import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { FaGithub, FaInstagram, FaLinkedinIn } from "react-icons/fa6";
import { FiCode } from "react-icons/fi";
import { profile } from "../data/content";
import useTypewriter from "../hooks/useTypewriter";
import ArrowBox from "./ArrowBox";
import CvDownload from "./CvDownload";
import { blur, easeOut } from "../lib/motion";

// Masuk berurutan: blur -> tajam, sedikit naik.
const enter = (i) => ({
  initial: { opacity: 0, ...blur(8), y: 16 },
  animate: { opacity: 1, ...blur(0), y: 0 },
  transition: { duration: 0.9, ease: easeOut, delay: 0.15 + i * 0.1 },
});

const socials = [
  { label: "GitHub", icon: FaGithub, href: profile.socials.github },
  { label: "LinkedIn", icon: FaLinkedinIn, href: profile.socials.linkedin },
  { label: "Instagram", icon: FaInstagram, href: profile.socials.instagram },
];

// Tautan sosial: kolom di tepi kanan hero (layar lebar), baris di bawah tombol (layar lebih kecil).
function Socials({ className, from }) {
  return (
    <ul className={className}>
      {socials.map(({ label, icon: Icon, href }, i) => (
        <motion.li
          key={label}
          initial={{ opacity: 0, ...from }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.8, ease: easeOut, delay: 0.7 + i * 0.1 }}
        >
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={label}
            title={label}
            className="flex h-12 w-12 items-center justify-center rounded-xl border border-line bg-surface text-lg text-fg shadow-[var(--shadow-soft)] transition-[background-color,color,transform] duration-300 hover:-translate-y-0.5 hover:bg-lime hover:text-on-lime"
          >
            <Icon aria-hidden />
          </a>
        </motion.li>
      ))}
    </ul>
  );
}

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
    <>
      <section
        id="home"
        ref={ref}
        className="relative mx-auto max-w-6xl overflow-x-clip px-6 pb-16 pt-28 lg:min-h-screen lg:pb-0 lg:pt-24"
      >
        <div className="grid items-end gap-6 lg:min-h-[calc(100vh-6rem)] lg:grid-cols-[1.2fr_0.8fr]">
          {/* ---------- Teks ---------- */}
          <div className="relative z-10 pb-10 lg:self-center lg:pb-24">
            <motion.p {...enter(0)} className="pill">
              <span className="dot"><FiCode size={11} /></span>
              <span className="font-medium notranslate" translate="no">
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

            <motion.div {...enter(4)} className="relative z-20 mt-9 flex flex-wrap items-center gap-3">
              <CvDownload />
              <a href="#projects" className="btn-soft">
                <ArrowBox />
                Lihat Proyek
              </a>
            </motion.div>

            <Socials className="mt-6 flex gap-3 xl:hidden" from={{ y: 12 }} />
          </div>

          {/* ---------- Foto ---------- */}
          <div className="relative mx-auto h-[min(34rem,120vw)] w-full max-w-lg lg:-ml-[6%] lg:-translate-y-20 lg:h-[calc(100vh-8.75rem)] lg:w-[132%] lg:max-w-none">
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
                    className="h-full w-full object-contain object-bottom [mask-image:linear-gradient(to_bottom,black_84%,transparent_100%)]"
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

      <Socials
        className="absolute right-[max(0.5rem,calc((100vw-72rem)/4-2rem))] top-[47svh] hidden -translate-y-1/2 flex-col gap-4 xl:flex"
        from={{ x: 16 }}
      />
    </>
  );
}
