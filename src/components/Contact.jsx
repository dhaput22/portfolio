import { useState } from "react";
import { FaEnvelope, FaPhone, FaLocationDot, FaGithub, FaLinkedinIn, FaInstagram } from "react-icons/fa6";
import Reveal from "./Reveal";
import SectionTitle from "./SectionTitle";
import SpotlightCard from "./SpotlightCard";
import { profile } from "../data/content";

const info = [
  { label: "Email", value: profile.email, icon: FaEnvelope, href: `mailto:${profile.email}` },
  { label: "Telepon", value: profile.phone, icon: FaPhone, href: `tel:${profile.phone.replace(/[^+\d]/g, "")}` },
  { label: "Lokasi", value: profile.location, icon: FaLocationDot },
];

const socials = [
  { label: "GitHub", icon: FaGithub, href: profile.socials.github },
  { label: "LinkedIn", icon: FaLinkedinIn, href: profile.socials.linkedin },
  { label: "Instagram", icon: FaInstagram, href: profile.socials.instagram },
];

const field =
  "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white placeholder-slate-500 outline-none transition focus:border-accent/70 focus:bg-white/[0.07] focus:shadow-[0_0_0_4px_rgba(225,128,41,0.12)]";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Form ini membuka aplikasi email. Untuk kirim langsung tanpa membuka email,
  // bisa diganti dengan layanan seperti EmailJS atau Formspree.
  const onSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Pesan dari ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n${form.name} (${form.email})`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24">
      <SectionTitle eyebrow="Hubungi Saya" title="Mari" highlight="Berkolaborasi" />

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          {info.map(({ label, value, icon: Icon, href }, i) => {
            const Wrap = href ? "a" : "div";
            return (
              <Reveal key={label} delay={i * 0.1} x={-40} y={0}>
                <Wrap href={href} className="block">
                  <SpotlightCard className="flex items-center gap-5 rounded-2xl p-5 hover:translate-x-1">
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-xl text-accent">
                      <Icon />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs text-slate-500">{label}</span>
                      <span className="block truncate font-medium text-white">{value}</span>
                    </span>
                  </SpotlightCard>
                </Wrap>
              </Reveal>
            );
          })}

          <Reveal delay={0.35} x={-40} y={0}>
            <p className="mb-3 mt-8 text-sm text-slate-400">Temukan saya di:</p>
            <div className="flex gap-3">
              {socials.map(({ label, icon: Icon, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-lg text-white transition hover:-translate-y-1 hover:border-accent hover:bg-accent hover:text-on-accent"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1} x={40} y={0}>
          <form onSubmit={onSubmit} className="spot-card space-y-5 rounded-3xl p-7 sm:p-8">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-200">Nama</span>
              <input name="name" required placeholder="Nama kamu" value={form.name} onChange={onChange} className={field} />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-200">Email</span>
              <input name="email" type="email" required placeholder="email@contoh.com" value={form.email} onChange={onChange} className={field} />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-200">Pesan</span>
              <textarea name="message" required rows={5} placeholder="Ceritakan tentang peluang atau proyeknya..." value={form.message} onChange={onChange} className={`${field} resize-none`} />
            </label>
            <button
              type="submit"
              className="w-full rounded-xl bg-accent py-3.5 font-bold text-on-accent shadow-[0_8px_28px_rgba(225,128,41,0.4)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_36px_rgba(225,128,41,0.6)]"
            >
              Kirim Pesan
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
