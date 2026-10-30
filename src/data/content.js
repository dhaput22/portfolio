// =====================================================================
//  FILE UTAMA: semua teks, skill, proyek, dan link.
// =====================================================================
import {
  SiHtml5, SiJavascript, SiReact, SiTailwindcss, SiVite,
  SiLaravel, SiPhp, SiMysql, SiNodedotjs, SiLaragon,
  SiGit, SiGithub, SiFigma, SiPostman, SiXampp,
} from "react-icons/si";
import { FaServer, FaCss3Alt } from "react-icons/fa";
import { VscVscode } from "react-icons/vsc";

export const profile = {
  name: "Muhammad Dafa Putra",
  initials: "DF",
  greeting: "Hai! Saya",
  titlePrefix: "",
  roles: ["Web Developer", "Laravel Developer", "React Developer", "IT Intern Candidate"],
  description:
    "Mahasiswa D3 Teknik Informatika yang suka membangun aplikasi web yang rapi, cepat, dan berguna. Saat ini sedang mencari kesempatan magang atau pekerjaan di bidang IT.",
  email: "muhammaddavaputra@gmail.com",
  phone: "+62 831-8153-1047",
  location: "Batam, Kepulauan Riau",
  cvUrl: "", // contoh: "/cv.pdf" (taruh file di folder public/). Kosong = tombol CV disembunyikan
  photo: "/profile.jpeg", // contoh: "/profile.jpg" (taruh di folder public/). Kosong = pakai inisial
  socials: {
    github: "https://github.com/dhaput22",
    linkedin: "https://linkedin.com/in/username",
    instagram: "https://instagram.com/username",
  },
};

export const nav = [
  { id: "home", label: "Beranda" },
  { id: "about", label: "Tentang" },
  { id: "skills", label: "Skill" },
  { id: "projects", label: "Proyek" },
  { id: "experience", label: "Pengalaman" },
];

export const about = {
  paragraphs: [
    "Saya mahasiswa D3 Teknik Informatika di Politeknik Negeri Batam dengan fokus pada pengembangan web. Saya senang mengubah kebutuhan nyata menjadi aplikasi yang bisa langsung dipakai.",
    "Saya terbiasa mengerjakan proyek dari analisis kebutuhan, perancangan, sampai implementasi. Saya cepat belajar teknologi baru dan nyaman bekerja dalam tim.",
  ],
  stats: [
    { value: "10+", label: "Proyek selesai" },
    { value: "3", label: "Tahun belajar coding" },
    { value: "15+", label: "Teknologi dikuasai" },
  ],
};

// Ganti ikon dengan mengimpor ikon lain dari react-icons (lihat react-icons.github.io)
export const skillTabs = [
  {
    id: "frontend",
    label: "Frontend",
    items: [
      { name: "HTML5", icon: SiHtml5, color: "#e34f26" },
      { name: "CSS3", icon: FaCss3Alt, color: "#2d9cf0" },
      { name: "JavaScript", icon: SiJavascript, color: "#f7df1e" },
      { name: "React", icon: SiReact, color: "#61dafb" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#38bdf8" },
      { name: "Vite", icon: SiVite, color: "#bd34fe" },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    items: [
      { name: "Laravel", icon: SiLaravel, color: "#ff2d20" },
      { name: "PHP", icon: SiPhp, color: "#8892bf" },
      { name: "MySQL", icon: SiMysql, color: "#5d9cc2" },
      { name: "Node.js", icon: SiNodedotjs, color: "#5fa04e" },
      { name: "REST API", icon: FaServer, color: "#7cdbfd" },
    ],
  },
  {
    id: "tools",
    label: "Tools",
    items: [
      { name: "GitHub", icon: SiGithub, color: "var(--icon-strong)" },
      { name: "Git", icon: SiGit, color: "#f05032" },
      { name: "VS Code", icon: VscVscode, color: "#3ba3ff" },
      { name: "Figma", icon: SiFigma, color: "#f24e1e" },
      { name: "Postman", icon: SiPostman, color: "#ff6c37" },
      { name: "XAMPP", icon: SiXampp, color: "#fb7a24" },
      { name: "Laragon", icon: SiLaragon, color: "#7cdbfd" },
    ],
  },
];

// image: taruh gambar di public/projects/nama.png lalu isi "/projects/nama.png". Kosong = pakai gradient.
export const projects = [
  {
    title: "Warehouse Management System",
    desc: "Aplikasi web untuk mengelola stok, barang masuk dan keluar, serta pelaporan gudang. Dibuat sebagai proyek tugas akhir.",
    tags: ["Laravel", "MySQL", "Tailwind"],
    image: "",
    github: "https://github.com/dhaput22/Gapuroapps",
    demo: "#",
    colors: ["#003366", "#e18029"],
  },
  {
    title: "Portofolio Pribadi",
    desc: "Website portofolio one-page dengan animasi halus, dibuat memakai React, Vite, dan Tailwind CSS.",
    tags: ["React", "Vite", "Tailwind"],
    image: "",
    github: "https://github.com/username/repo",
    demo: "#",
    colors: ["#0a63c9", "#7cdbfd"],
  },
  {
    title: "Project Ketiga",
    desc: "Ganti dengan deskripsi singkat proyekmu: masalah yang diselesaikan, fitur utama, dan peran kamu.",
    tags: ["PHP", "MySQL", "Bootstrap"],
    image: "",
    github: "https://github.com/username/repo",
    demo: "#",
    colors: ["#e18029", "#f5b366"],
  },
  {
    title: "Project Keempat",
    desc: "Tulis hasil yang terukur kalau ada, misalnya mempercepat proses input data hingga 40%.",
    tags: ["React", "API", "Node.js"],
    image: "",
    github: "https://github.com/username/repo",
    demo: "#",
    colors: ["#004a99", "#2a9bd8"],
  },
  {
    title: "Project Kelima",
    desc: "Deskripsi singkat proyek. Jelaskan teknologi yang dipakai dan apa yang kamu pelajari dari proyek ini.",
    tags: ["Laravel", "Livewire"],
    image: "",
    github: "https://github.com/username/repo",
    demo: "#",
    colors: ["#002244", "#4fb8ef"],
  },
  {
    title: "Project Keenam",
    desc: "Deskripsi singkat proyek. Pilih proyek terbaik dan paling relevan dengan posisi yang kamu lamar.",
    tags: ["JavaScript", "Firebase"],
    image: "",
    github: "https://github.com/username/repo",
    demo: "#",
    colors: ["#b45f12", "#003366"],
  },
];

export const experience = [
  {
    period: "2023 - Sekarang",
    title: "D3 Teknik Informatika",
    place: "Politeknik Negeri Batam",
    desc: "Mempelajari pemrograman web, basis data, jaringan, dan rekayasa perangkat lunak.",
  },
  {
    period: "2025",
    title: "Proyek Tugas Akhir",
    place: "Web-based Warehouse Management System",
    desc: "Merancang dan membangun sistem manajemen gudang berbasis web dari analisis kebutuhan sampai implementasi.",
  },
  {
    period: "2024",
    title: "Organisasi / Pelatihan / Sertifikasi",
    place: "Nama Institusi",
    desc: "Ganti dengan pengalaman organisasi, kursus, atau sertifikat yang relevan.",
  },
];
