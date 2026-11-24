import { useState } from "react";
import { FaEnvelope, FaLocationDot, FaGithub, FaLinkedinIn, FaInstagram } from "react-icons/fa6";
import SectionTitle from "./SectionTitle";
import ArrowBox from "./ArrowBox";
import { motion } from "framer-motion";
import { cascade, reveal } from "../lib/motion";
import { contactIntro, profile } from "../data/content";

const info = [
  { label: "Email", value: profile.email, icon: FaEnvelope, href: `mailto:${profile.email}` },
  { label: "Lokasi", value: profile.location, icon: FaLocationDot },
];

const socials = [
  { label: "GitHub", icon: FaGithub, href: profile.socials.github },
  { label: "LinkedIn", icon: FaLinkedinIn, href: profile.socials.linkedin },
  { label: "Instagram", icon: FaInstagram, href: profile.socials.instagram },
];

const field =
  "w-full rounded-xl border border-transparent bg-fill px-4 py-3 text-fg placeholder:text-fg-subtle outline-none transition focus:border-line focus:bg-surface focus:shadow-[0_0_0_4px_var(--color-line)]";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Form ini membuka aplikasi email. Untuk kirim langsung tanpa membuka email,
  // bisa diganti dengan layanan seperti EmailJS atau Formspree.
  const onSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Pesan dari ${form.name}`);
    const body = encodeURIComponent(`${form.message}

${form.name} (${form.email})`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-28">
      <SectionTitle title="Mari" highlight="Berkolaborasi" intro={contactIntro} />

      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <div className="border-b border-line">
            {info.map(({ label, value, icon: Icon, href }, i) => {
              const Wrap = href ? "a" : "div";
              return (
                <motion.div key={label} {...cascade(i)}>
                  <Wrap
                    href={href}
                    className="group flex items-center gap-4 border-t border-line py-5"
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-lime text-lg text-on-lime">
                      <Icon />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs text-fg-subtle">{label}</span>
                      <span className="block truncate text-fg transition-colors group-hover:text-fg-muted">{value}</span>
                    </span>
                  </Wrap>
                </motion.div>
              );
            })}
          </div>

          <motion.div {...reveal(0.2)}>
            <p className="mb-3 mt-8 text-sm text-fg-muted">Temukan saya di:</p>
            <div className="flex gap-2">
              {socials.map(({ label, icon: Icon, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex h-12 w-12 items-center justify-center rounded-xl border border-line bg-surface text-lg text-fg shadow-[var(--shadow-soft)] transition-colors hover:bg-lime hover:text-on-lime"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div {...cascade(1)}>
          <form onSubmit={onSubmit} className="space-y-5 rounded-3xl border border-line bg-surface p-6 shadow-[var(--shadow-soft)] sm:p-8">
            <label className="block">
              <span className="mb-2 block text-sm text-fg">Nama</span>
              <input name="name" required placeholder="Nama kamu" value={form.name} onChange={onChange} className={field} />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm text-fg">Email</span>
              <input name="email" type="email" required placeholder="email@contoh.com" value={form.email} onChange={onChange} className={field} />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm text-fg">Pesan</span>
              <textarea name="message" required rows={5} placeholder="Ceritakan tentang peluang atau proyeknya..." value={form.message} onChange={onChange} className={`${field} resize-none`} />
            </label>
            <button type="submit" className="btn-arrow w-full">
              <ArrowBox />
              Kirim Pesan
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
