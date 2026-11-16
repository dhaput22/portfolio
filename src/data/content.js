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
  cvUrl: "/cv.pdf", // taruh file CV di folder public/ dengan nama cv.pdf
  photo: "/daput.png", // contoh: "/profile.jpg" (taruh di folder public/). Kosong = pakai inisial
  socials: {
    github: "https://github.com/dhaput22",
    linkedin: "https://www.linkedin.com/in/muhammad-dafa-putra-897970432/",
    instagram: "https://www.instagram.com/dhaput_22/",
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
    { value: "6+", label: "Proyek selesai" },
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
    desc: "WMS berbasis web untuk PT. Epson Batam: mencatat receiving, delivery, return, dan dispose lewat scan barcode, dengan dashboard stok dan kapasitas gudang yang diperbarui real-time. Proyek Tugas Akhir.",
    tags: ["Laravel 12", "MySQL", "Tailwind", "Alpine.js"],
    image: "/projects/wms-dashboard.webp",
    github: "https://github.com/dhaput22/Gapuroapps",
    demo: "https://www.youtube.com/watch?v=XM-A_bNibDM",
    colors: ["#003366", "#e18029"],
    // slug + detail = kartu bisa diklik dan membuka halaman detail (#proyek/<slug>).
    slug: "warehouse-management-system",
    detail: {
      subtitle: "Otomatisasi receiving, delivery, dan monitoring stok real-time",
      meta: [
        { label: "Klien", value: "PT. Epson Batam" },
        { label: "Peran", value: "Full-Stack Developer" },
        { label: "Periode", value: "2025 - 2026" },
        { label: "Jenis", value: "Proyek Tugas Akhir" },
      ],
      overview:
        "Aplikasi Warehouse Management System berbasis web untuk gudang barang jadi (Finished Goods) di PT. Epson Batam. Sistem ini mencatat barang masuk, barang keluar, pengembalian, dan pembuangan lewat scan barcode, lalu menampilkan stok serta kapasitas gudang secara real-time melalui dashboard, grafik, dan peta area penyimpanan 2D.",
      problem: [
        "Pencatatan gudang masih memadukan formulir fisik dan Excel, sehingga data stok sering terlambat diperbarui.",
        "Input manual rawan salah catat: data ganda, salah jumlah, atau informasi yang hilang.",
        "Tidak ada gambaran area penyimpanan, jadi staf sulit tahu area mana yang masih kosong dan mana yang sudah penuh.",
        "Data penerimaan dan pengiriman tersimpan di berkas terpisah, sehingga pergerakan barang sulit dilihat secara utuh dan bagian lain tidak bisa memantau stok secara langsung.",
      ],
      solution:
        "Satu aplikasi web terpadu yang mengikuti alur kerja gudang: rencana penerimaan (SWA Plan), receiving, stok, delivery, return, dan dispose. Setiap scan barcode yang berhasil langsung memperbarui stok dan kapasitas di database (event-driven), lalu dashboard menyegarkan datanya secara berkala sehingga semua pengguna melihat kondisi gudang terbaru tanpa memuat ulang halaman.",
      features: [
        { title: "Dashboard Live Monitoring", desc: "Kartu Receive, Delivery, Current Stock, dan Available Capacity, grafik tren 7 hari, serta bar pemakaian kapasitas gudang." },
        { title: "Peta Area Penyimpanan 2D", desc: "Denah gudang dengan indikator warna untuk status kapasitas tiap area." },
        { title: "SWA Plan & Receiving", desc: "Rencana penerimaan per kode part dan rentang lot, lalu pencatatan barang masuk yang divalidasi terhadap rencana." },
        { title: "Delivery, Return & Dispose", desc: "Pencatatan barang keluar ke produksi, pengembalian, dan pembuangan, dengan stok yang otomatis menyesuaikan." },
        { title: "Laporan & Export Excel", desc: "Summary Stock dan Summary Delivery dengan filter tanggal, pencarian, dan unduh ke Excel." },
        { title: "User & Hak Akses", desc: "Manajemen pengguna dan operator, dengan Role-Based Access Control untuk Admin dan User." },
      ],
      contribution: [
        "Menggali kebutuhan lewat wawancara dan observasi langsung bersama supervisor gudang, lalu menyusun dokumen kebutuhan (SRS).",
        "Merancang sistem: Use Case, Activity Diagram, ERD, dan wireframe antarmuka.",
        "Membangun backend dan frontend secara penuh dengan Laravel 12, MySQL, Blade, Tailwind CSS, dan Alpine.js.",
        "Merancang skema database dengan relasi foreign key dan jejak audit (ID label, lot, waktu scan, operator) di setiap transaksi.",
        "Menguji seluruh modul dengan black box testing (10 kelompok pengujian, semua skenario lulus) dan memperbaiki sistem berdasarkan masukan pengguna.",
      ],
      techStack: [
        { group: "Backend", items: ["Laravel 12", "PHP 8.2", "Laravel Breeze"] },
        { group: "Frontend", items: ["Blade", "Tailwind CSS", "Alpine.js", "Vite"] },
        { group: "Database", items: ["MySQL"] },
        { group: "Metode", items: ["Waterfall", "UML", "Black Box Testing"] },
      ],
      challenges: [
        {
          title: "Real-time tanpa perangkat IoT atau RFID",
          desc: "Perangkat sensor mahal dan belum tersedia. Solusinya pendekatan event-driven: setiap scan barcode langsung memperbarui database, dan dashboard menarik data terbaru secara berkala (polling) sehingga hasilnya near real-time.",
        },
        {
          title: "Menjaga stok tetap konsisten",
          desc: "Stok dan kapasitas harus selalu cocok setelah setiap transaksi. Pembaruan dijalankan dalam satu transaksi database yang atomik, dan pengiriman yang melebihi stok tersedia otomatis ditolak.",
        },
        {
          title: "Mencegah data rencana yang bentrok",
          desc: "Rencana penerimaan bisa saling tumpang tindih nomor lot. Sistem memvalidasi kelengkapan data dan mengecek tumpang tindih lot sebelum rencana disimpan.",
        },
      ],
      gallery: [
        { src: "/projects/wms/dashboard.webp", caption: "Dashboard FG Storage Live Monitoring dan Realtime Trend Monitor" },
        { src: "/projects/wms/storage-map.webp", caption: "Peta area penyimpanan 2D dengan indikator kapasitas" },
        { src: "/projects/wms/capacity.webp", caption: "Available Capacity per area penyimpanan" },
        { src: "/projects/wms/swa-plan.webp", caption: "SWA Plan: rencana penerimaan barang" },
        { src: "/projects/wms/receiving.webp", caption: "FG Receiving: pencatatan barang masuk" },
        { src: "/projects/wms/delivery.webp", caption: "FG Delivery: pencatatan barang keluar" },
        { src: "/projects/wms/summary-stock.webp", caption: "Summary Stock dengan export Excel" },
        { src: "/projects/wms/user-management.webp", caption: "User Management dan hak akses" },
        { src: "/projects/wms/login.webp", caption: "Halaman login" },
      ],
    },
  },
  {
    title: "Portofolio Pribadi",
    desc: "Website portofolio one-page dengan animasi halus, latar 3D interaktif, dan mode terang/gelap. Dibuat memakai React, Vite, Tailwind CSS, dan Three.js.",
    tags: ["React", "Vite", "Tailwind", "Three.js"],
    image: "",
    github: "https://github.com/dhaput22/portfolio",
    demo: "",
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
    period: "2023 - 2026",
    title: "D3 Teknik Informatika",
    place: "Politeknik Negeri Batam",
    desc: "Mempelajari pemrograman web, basis data, jaringan, dan rekayasa perangkat lunak.",
  },
  {
    period: "2025 - 2026",
    title: "Proyek Tugas Akhir · Full-Stack Developer",
    place: "PT. Epson Batam",
    desc: "Membangun Warehouse Management System berbasis web (Laravel 12, MySQL) untuk gudang barang jadi, mulai dari wawancara kebutuhan dengan supervisor gudang, perancangan UML dan ERD, implementasi, sampai black box testing.",
  },
  {
    period: "2024",
    title: "Organisasi / Pelatihan / Sertifikasi",
    place: "Nama Institusi",
    desc: "Ganti dengan pengalaman organisasi, kursus, atau sertifikat yang relevan.",
  },
];
