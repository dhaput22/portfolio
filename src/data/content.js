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
  roles: ["Web Developer", "Laravel Developer", "React Developer", "Back-End Developer"],
  description:
    "Lulusan D3 Teknik Informatika yang suka membangun aplikasi web yang rapi, cepat, dan berguna. Saat ini sedang mencari kesempatan kerja di bidang IT.",
  email: "muhammaddavaputra@gmail.com",
  location: "Batam, Kepulauan Riau",
  // pilihan bahasa di tombol Unduh CV (file di folder public/)
  cv: [
    { lang: "id", label: "Bahasa Indonesia", note: "PDF, 1 halaman", file: "/CV_Muhammad_Dafa_Putra_ID.pdf" },
    { lang: "en", label: "English", note: "PDF, 1 page", file: "/CV_Muhammad_Dafa_Putra_EN.pdf" },
  ],
  photo: "/daput.png", // contoh: "/profile.jpg" (taruh di folder public/). Kosong = pakai inisial
  socials: {
    github: "https://github.com/dhaput22",
    linkedin: "https://www.linkedin.com/in/muhammad-dafa-putra/",
    instagram: "https://www.instagram.com/dhaput_22/",
  },
};

export const nav = [
  { id: "home", label: "Beranda" },
  { id: "about", label: "Tentang" },
  { id: "skills", label: "Skill" },
  { id: "projects", label: "Proyek" },
  { id: "experience", label: "Pengalaman" },
  { id: "certificates", label: "Sertifikat" },
];

// kata pengantar singkat di bawah judul "Mari Berkolaborasi"
export const contactIntro =
  "Punya lowongan, proyek, atau ide yang ingin diwujudkan? Ceritakan kebutuhanmu, dan mari kita cari cara menjadikannya aplikasi yang benar-benar terpakai.";

export const about = {
  paragraphs: [
    "Saya lulusan D3 Teknik Informatika Politeknik Negeri Batam (IPK 3,83/4,00) yang berfokus pada pengembangan back-end web dengan Laravel, PHP, dan MySQL.",
    "Untuk PT Epson Batam, saya membangun Warehouse Management System yang menangani penerimaan dan pengiriman barang, pemantauan stok, hingga dashboard inventaris. Di perusahaan yang sama, saya juga punya tiga tahun pengalaman manufaktur di produksi SMT dan material handling, jadi saya tahu langsung bagaimana sistem gudang dan produksi dipakai di lapangan.",
    "Saya terbiasa mengerjakan proyek dari analisis kebutuhan, perancangan, sampai implementasi. Saya cepat belajar teknologi baru, nyaman bekerja dalam tim, dan siap terus berkembang di bidang software engineering.",
  ],
  stats: [
    { value: "5", label: "Proyek selesai" },
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
// Urutan: proyek tim dan profesional dulu (terbaru ke terlama), lalu Portofolio Pribadi sebagai proyek terakhir.
export const projects = [
  {
    title: "Warehouse Management System",
    desc: "WMS berbasis web untuk PT. Epson Batam: mencatat receiving, delivery, return, dan dispose lewat scan barcode, dengan dashboard stok dan kapasitas gudang yang diperbarui real-time. Proyek Tugas Akhir.",
    tags: ["Laravel 12", "MySQL", "Tailwind", "Alpine.js"],
    image: "/projects/wms/hd-dashboard.webp",
    thumb: "/projects/wms/thumb.webp",
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
        { src: "/projects/wms/hd-dashboard.webp", caption: "Dashboard FG Storage Live Monitoring: barang masuk, barang keluar, stok, dan kapasitas hari ini" },
        { src: "/projects/wms/hd-daily-flow.webp", caption: "Pemakaian kapasitas gudang dan arus barang masuk-keluar 7 hari terakhir" },
        { src: "/projects/wms/hd-storage-map.webp", caption: "Peta area penyimpanan 2D dengan indikator kapasitas" },
        { src: "/projects/wms/hd-capacity.webp", caption: "Available Capacity per area penyimpanan" },
        { src: "/projects/wms/hd-swa-plan.webp", caption: "SWA Plan: rencana penerimaan barang" },
        { src: "/projects/wms/hd-receiving.webp", caption: "FG Receiving: pencatatan barang masuk" },
        { src: "/projects/wms/hd-delivery.webp", caption: "FG Delivery: pencatatan barang keluar" },
        { src: "/projects/wms/hd-stock.webp", caption: "FG Stock: stok barang jadi per lot" },
        { src: "/projects/wms/hd-return.webp", caption: "FG Return: pencatatan barang kembali" },
        { src: "/projects/wms/hd-summary-stock.webp", caption: "Summary Stock dengan export Excel" },
        { src: "/projects/wms/hd-summary-delivery.webp", caption: "Summary Delivery dengan export Excel" },
        { src: "/projects/wms/hd-user-management.webp", caption: "User Management dan hak akses" },
        { src: "/projects/wms/hd-login.webp", caption: "Halaman login" },
      ],
    },
  },
  {
    title: "Smart Gate berbasis RFID",
    desc: "Gerbang otomatis yang membaca tag RFID kendaraan dari jarak hingga 5 meter, lalu meminta persetujuan pemilik lewat aplikasi mobile sebelum gate terbuka. Dilengkapi web officer untuk kelola data dan log akses. Proyek PBL tim.",
    tags: ["Laravel", "Flutter", "MySQL", "IoT / RFID"],
    image: "/projects/smartgate/cover.webp",
    thumb: "/projects/smartgate/thumb.webp",
    github: "https://github.com/anangsy29/PBL-47-RFIDBasedSmartGate",
    demo: "https://www.youtube.com/watch?v=QB9Qst6s_oc",
    colors: ["#1e1f23", "#d9ff5c"],
    // slug + detail = kartu bisa diklik dan membuka halaman detail (#proyek/<slug>).
    slug: "smart-gate-rfid",
    detail: {
      subtitle: "Kontrol akses kendaraan dengan RFID UHF dan verifikasi lewat smartphone",
      meta: [
        { label: "Program", value: "PBL 47 · Politeknik Negeri Batam" },
        { label: "Peran", value: "Full-Stack Web Developer" },
        { label: "Periode", value: "2025 (Semester 4)" },
        { label: "Tim", value: "3 orang" },
      ],
      overview:
        "Smart Gate adalah sistem gerbang otomatis untuk kendaraan. RFID reader UHF membaca tag pada kendaraan dari jarak 0 sampai 5 meter, lalu sistem mengirim permintaan verifikasi ke aplikasi mobile pemilik tag. Gate baru terbuka setelah pemilik menyetujui, dan setiap akses tercatat di database. Sistem ini menggabungkan perangkat IoT, backend dan web officer berbasis Laravel, serta aplikasi mobile Flutter.",
      problem: [
        "Gerbang konvensional lambat karena masih memakai kartu dan input manual.",
        "Sistem RFID biasa tidak punya verifikasi tambahan, jadi tag yang hilang atau dipakai orang lain tetap bisa membuka gerbang.",
        "Pemilik tidak mendapat pemberitahuan atau diminta konfirmasi saat aksesnya dipakai.",
        "Tidak ada log akses yang tersimpan real-time untuk keperluan audit keamanan.",
      ],
      solution:
        "Verifikasi dua langkah tanpa sentuhan. Saat kendaraan mendekat, tag RFID terbaca dan dicocokkan dengan data kendaraan di database. Jika valid, sistem mengirim notifikasi ke aplikasi mobile pemilik. Setelah pemilik menekan Yes, mikrokontroler menggerakkan servo untuk membuka gate, dan aksesnya dicatat. Officer mengelola user, kendaraan, tag RFID, dan memantau log lewat aplikasi web.",
      features: [
        { title: "Deteksi RFID UHF 0–5 m", desc: "Tag pada kendaraan terbaca otomatis dari kejauhan, tanpa perlu menempelkan kartu." },
        { title: "Verifikasi lewat Smartphone", desc: "Pemilik tag menerima permintaan akses di aplikasi mobile dan memilih Yes atau No." },
        { title: "Gate Otomatis", desc: "Mikrokontroler menggerakkan servo untuk membuka gate setelah akses disetujui." },
        { title: "Dashboard Officer", desc: "Ringkasan jumlah user, tag RFID, dan kendaraan terdaftar dalam satu tampilan." },
        { title: "Kelola Data & Log Akses", desc: "Officer mengelola data user, kendaraan, dan tag RFID, serta memantau riwayat akses yang tercatat." },
        { title: "Aplikasi Mobile User", desc: "Riwayat akses, notifikasi verifikasi, dan halaman profil untuk mengganti password." },
      ],
      contribution: [
        "Membangun aplikasi web officer secara full-stack dengan Laravel: login, dashboard, access logs, serta kelola data user, kendaraan, dan tag RFID.",
        "Merancang Class Diagram, Entity Relationship Diagram, dan skema relasional sistem.",
        "Menyusun struktur database MySQL untuk tabel officers, users, vehicles, rfid_tags, dan access_logs.",
        "Ikut menyusun jadwal pengerjaan proyek dalam sprint bersama tim (metode Agile).",
      ],
      techStack: [
        { group: "Web", items: ["Laravel", "PHP", "JavaScript"] },
        { group: "Mobile", items: ["Flutter", "Dart", "Kotlin"] },
        { group: "IoT", items: ["Arduino (C++)", "RFID UHF", "Servo", "ESP8266"] },
        { group: "Data & Metode", items: ["MySQL", "UML", "Agile"] },
      ],
      challenges: [
        {
          title: "Tag RFID bisa disalahgunakan",
          desc: "RFID saja tidak cukup aman jika tag hilang atau dipinjam. Solusinya verifikasi kedua lewat smartphone pemilik, sehingga gate hanya terbuka jika pemilik menyetujui secara sadar.",
        },
        {
          title: "Menghubungkan perangkat keras dengan sistem",
          desc: "Tim perlu menyambungkan pembaca RFID dan servo ke database dan aplikasi. Mikrokontroler terhubung ke server melalui modul Wi-Fi, lalu backend Laravel menjadi penghubung antara perangkat, web officer, dan aplikasi mobile.",
        },
        {
          title: "Respons cepat saat kendaraan mendekat",
          desc: "Targetnya, pemindaian dan verifikasi selesai kurang dari 2 detik. Alurnya dibuat ringkas: tag terbaca, data dicek, notifikasi terkirim, lalu gate langsung digerakkan setelah konfirmasi.",
        },
      ],
      gallery: [
        { src: "/projects/smartgate/cover.webp", caption: "Web officer dan permintaan verifikasi di aplikasi mobile" },
        { src: "/projects/smartgate/iot-prototype.webp", caption: "Prototipe IoT: kendaraan mini dengan tag RFID, RFID reader, dan gate servo" },
        { src: "/projects/smartgate/mobile.webp", caption: "Aplikasi mobile: login, verifikasi akses, dan profil pengguna" },
        { src: "/projects/smartgate/dashboard.webp", caption: "Dashboard officer: total user, tag RFID, dan kendaraan" },
        { src: "/projects/smartgate/hd-access-logs.webp", caption: "Access Logs: riwayat akses diizinkan dan ditolak (data contoh)" },
        { src: "/projects/smartgate/hd-rfid-tags.webp", caption: "Kelola tag RFID (data contoh)" },
        { src: "/projects/smartgate/hd-vehicles.webp", caption: "Kelola kendaraan (data contoh)" },
        { src: "/projects/smartgate/hd-users.webp", caption: "Kelola user (data contoh)" },
        { src: "/projects/smartgate/hd-login.webp", caption: "Login web officer" },
        { src: "/projects/smartgate/database.webp", caption: "Relasi database: officers, users, vehicles, rfid_tags, access_logs" },
      ],
    },
  },
  {
    title: "Anang Ferry — Tiket Kapal",
    desc: "Website pemesanan tiket kapal: cari jadwal, isi data penumpang, bayar lewat Midtrans, lalu terima e-tiket ber-QR. Admin mengelola kapal, rute, jadwal, harga, pesanan, dan check-in penumpang. Proyek PBL tim.",
    tags: ["Laravel", "Livewire", "MySQL", "Midtrans"],
    image: "/projects/kapal/cover.webp",
    thumb: "/projects/kapal/thumb.webp",
    github: "https://github.com/yunitatinuy/jual-beli-tiket-kapal",
    demo: "#",
    colors: ["#7d0f3b", "#c8175d"],
    slug: "tiket-kapal",
    detail: {
      subtitle: "Pemesanan tiket kapal online dengan pembayaran digital, e-tiket ber-QR, dan panel admin",
      meta: [
        { label: "Program", value: "PBL IF207 · Politeknik Negeri Batam" },
        { label: "Peran", value: "Web Developer | Backend Developer" },
        { label: "Periode", value: "2024 (Semester 2), diperbarui 2026" },
        { label: "Tim", value: "5 orang" },
      ],
      overview:
        "Anang Ferry adalah website untuk memesan tiket kapal tanpa harus datang ke loket. Penumpang mencari jadwal, memilih kelas, mengisi data penumpang, membayar, lalu menerima e-tiket ber-QR. Admin mengelola kapal, pelabuhan, rute, jadwal, harga, dan pesanan, serta melakukan check-in penumpang. Versi awal dibuat sebagai proyek PBL semester 2, lalu diperbarui pada 2026 dengan pembayaran Midtrans, e-tiket, check-in, jadwal berulang, dan tampilan baru.",
      problem: [
        "Penumpang harus datang ke loket dan mengantre lama untuk membeli tiket.",
        "Pembelian langsung di loket membuka celah praktik percaloan.",
        "Informasi jadwal, kelas, harga, dan ketersediaan kursi sulit dicek sebelum berangkat.",
        "Admin perlu satu tempat untuk mengelola ketersediaan tiket dan memantau pesanan.",
      ],
      solution:
        "Website dengan dua peran, penumpang dan admin. Penumpang menjalani alur cari jadwal, pilih kelas, isi data penumpang, bayar, lalu e-tiket. Pembayaran memakai Midtrans Snap (mode Sandbox), dan status pesanan mengikuti status dari Midtrans. Setelah lunas, e-tiket ber-QR terbit dan bisa diunduh sebagai PDF. Pesanan yang melewati batas bayar dibatalkan terjadwal dan kuota kursinya dikembalikan.",
      features: [
        { title: "Pencarian Jadwal", desc: "Cari berdasarkan pelabuhan asal, tujuan, tanggal, dan jumlah penumpang, dengan filter waktu, kelas, dan harga." },
        { title: "Pemesanan Multi-Penumpang", desc: "Satu pesanan untuk beberapa penumpang dewasa dan anak, dengan rincian harga per kelas." },
        { title: "Pembayaran Midtrans", desc: "Invoice dengan batas waktu bayar, cek status, dan pembatalan pesanan." },
        { title: "E-tiket QR & PDF", desc: "E-tiket terbit setelah lunas, berisi kode booking dan QR yang membuka halaman check-in, serta bisa diunduh PDF." },
        { title: "Check-in Penumpang", desc: "Petugas mencari kode booking dan mencatat check-in tiap penumpang, hanya untuk tiket lunas pada hari keberangkatan." },
        { title: "Panel Admin", desc: "Dashboard operasional, kelola kapal, pelabuhan, rute, tiket, harga, pengguna, dan pesanan, serta pembuatan jadwal berulang sekaligus." },
      ],
      contribution: [
        "Membuat use case, user stories, dan ERD, serta merancang basis data MySQL.",
        "Membangun seluruh tampilan admin dan CRUD admin (antara lain kapal, pelabuhan, rute, dan harga).",
        "Ikut merancang desain website, mengimplementasikan tampilan, merevisi verifikasi email, dan menyusun laporan.",
        "Pada pembaruan 2026, mengembangkan layanan pemesanan dan pembayaran Midtrans, e-tiket ber-QR, check-in, serta pembuatan jadwal berulang.",
      ],
      techStack: [
        { group: "Backend", items: ["Laravel 10", "PHP", "Livewire 3", "MySQL"] },
        { group: "Frontend", items: ["Blade", "Tailwind CSS", "Flowbite", "Vite"] },
        { group: "Integrasi", items: ["Midtrans Snap (Sandbox)", "DomPDF", "QR Code"] },
        { group: "Metode", items: ["UML (Use Case)", "ERD"] },
      ],
      challenges: [
        {
          title: "Dua orang membeli kursi terakhir",
          desc: "Kuota dicek dan dikurangi di dalam satu transaksi database dengan baris tiket yang dikunci, sehingga pemesanan bersamaan tidak bisa mengambil kursi yang sama. Harga selalu dihitung dari database.",
        },
        {
          title: "Notifikasi pembayaran yang bisa dipalsukan",
          desc: "Signature notifikasi Midtrans diverifikasi, lalu status diambil ulang langsung dari API Midtrans. Notifikasi yang dikirim ulang tidak memproses pesanan dua kali.",
        },
        {
          title: "Kursi tertahan pesanan yang tidak dibayar",
          desc: "Perintah terjadwal membatalkan pesanan yang melewati batas bayar dan mengembalikan kuotanya. Ada jeda beberapa menit supaya notifikasi pembayaran yang terlambat tetap sempat diproses.",
        },
      ],
      gallery: [
        { src: "/projects/kapal/cover.webp", caption: "Beranda penumpang dan e-tiket ber-QR (data contoh)" },
        { src: "/projects/kapal/beranda.webp", caption: "Beranda dan pencarian tiket" },
        { src: "/projects/kapal/cari.webp", caption: "Hasil pencarian jadwal dengan filter waktu, kelas, dan harga" },
        { src: "/projects/kapal/pesan.webp", caption: "Pengisian data pemesan dan penumpang" },
        { src: "/projects/kapal/invoice-menunggu.webp", caption: "Halaman pembayaran dengan batas waktu (data contoh)" },
        { src: "/projects/kapal/eticket.webp", caption: "E-tiket dengan QR dan daftar penumpang (data contoh)" },
        { src: "/projects/kapal/transaksi.webp", caption: "Tiket saya: pesanan aktif, selesai, dan dibatalkan" },
        { src: "/projects/kapal/beranda-login.webp", caption: "Beranda setelah login dengan perjalanan mendatang" },
        { src: "/projects/kapal/admin-dashboard.webp", caption: "Dashboard operasional admin" },
        { src: "/projects/kapal/admin-checkin.webp", caption: "Check-in: tiket ditolak karena belum hari keberangkatan" },
        { src: "/projects/kapal/admin-jadwal-berulang.webp", caption: "Pembuatan jadwal berulang lengkap dengan harga dan kuota" },
        { src: "/projects/kapal/admin-pesanan.webp", caption: "Data pesanan dan status pembayaran" },
        { src: "/projects/kapal/admin-rute.webp", caption: "Kelola rute perjalanan" },
        { src: "/projects/kapal/admin-harga.webp", caption: "Kelola tarif per rute, kelas, dan tipe penumpang" },
        { src: "/projects/kapal/admin-kapal.webp", caption: "Kelola data kapal" },
        { src: "/projects/kapal/admin-pelabuhan.webp", caption: "Kelola data pelabuhan" },
        { src: "/projects/kapal/login.webp", caption: "Halaman login" },
      ],
    },
  },
  {
    title: "QUICK.TOP — Jual Beli Pulsa",
    desc: "Website jual beli pulsa semua operator: pilih nominal, isi nomor tujuan, bayar lewat Midtrans (QRIS, e-wallet, VA), lalu terima invoice. Dilengkapi panel admin untuk produk, transaksi, dan pengguna. Proyek PBL tim.",
    tags: ["PHP", "MySQL", "Midtrans", "Bootstrap"],
    image: "/projects/pulsa/cover.webp",
    thumb: "/projects/pulsa/thumb.webp",
    github: "https://github.com/yunitatinuy/jual-beli-pulsa",
    demo: "#",
    colors: ["#0f7a3d", "#71e398"],
    slug: "jual-beli-pulsa",
    detail: {
      subtitle: "Platform beli pulsa online 24 jam dengan pembayaran digital dan panel admin",
      meta: [
        { label: "Program", value: "PBL Kelompok 4 · Politeknik Negeri Batam" },
        { label: "Peran", value: "Web Developer & System Analyst | Backend Developer" },
        { label: "Periode", value: "2023 (Semester 1), diperbarui 2026" },
        { label: "Tim", value: "5 orang" },
      ],
      overview:
        "QUICK.TOP adalah website untuk membeli pulsa secara online tanpa harus datang ke konter. Pembeli memilih operator dan nominal, memasukkan nomor tujuan, lalu membayar. Admin mengelola katalog provider, memantau transaksi, dan mengatur akun pengguna. Versi awal dibuat sebagai proyek PBL semester 1, lalu diperbarui dengan tampilan baru, pembayaran Midtrans, status pengisian pulsa, dan invoice yang bisa dicetak.",
      problem: [
        "Pembeli harus datang ke konter, padahal pulsa sering dibutuhkan mendadak saat konter sudah tutup.",
        "Tidak ada riwayat dan bukti pembelian yang bisa dicek kembali oleh pembeli.",
        "Penjual perlu cara mudah untuk mengelola produk (provider, nominal, harga) dan melihat transaksi yang masuk.",
        "Kesalahan input nomor handphone harus dicegah sebelum transaksi diproses.",
      ],
      solution:
        "Website dengan dua peran, pembeli dan admin. Pembeli menjalani alur katalog, keranjang, nomor tujuan, checkout, pembayaran, lalu invoice. Pembayaran memakai Midtrans Snap (mode Sandbox), sehingga status lunas, kedaluwarsa, atau gagal tersinkron otomatis. Setelah lunas, sistem meneruskan pengisian pulsa ke modul supplier (masih simulasi) dan menampilkan nomor SN. Admin mengelola provider, transaksi, dan pengguna dari satu panel.",
      features: [
        { title: "Katalog Semua Operator", desc: "Produk Telkomsel, XL, Axis, Indosat, dan Tri lengkap dengan nominal, harga, dan detail masa aktif." },
        { title: "Keranjang & Validasi Nomor", desc: "Produk masuk keranjang, lalu nomor tujuan dicek formatnya (08xx, 10–13 digit) sebelum checkout." },
        { title: "Pembayaran Midtrans", desc: "QRIS, GoPay, ShopeePay, Virtual Account, dan kartu, dengan batas waktu bayar dan tombol cek status." },
        { title: "Invoice & Riwayat", desc: "Invoice berisi status pembayaran dan pengisian pulsa, bisa dicetak ke PDF, serta riwayat seluruh transaksi." },
        { title: "Panel Admin", desc: "Dashboard pendapatan dan transaksi, kelola kategori dan provider, rekap transaksi, serta manajemen pengguna." },
        { title: "Akun & Tema", desc: "Registrasi, login dengan Remember me, ubah profil dan password, serta mode terang dan gelap." },
      ],
      contribution: [
        "Menyusun kebutuhan fungsional dan non-fungsional serta identifikasi pengguna (use case) bersama tim.",
        "Merancang wireframe dan desain antarmuka halaman aplikasi.",
        "Mengimplementasikan aplikasi dan basis data: halaman login, halaman utama, katalog, alur pemesanan pulsa, dan struktur tabel MySQL.",
        "Menguji fitur registrasi dan login, serta ikut memperbaiki fitur update user dan panel admin pada versi terbaru.",
      ],
      techStack: [
        { group: "Backend", items: ["PHP (native)", "MySQL"] },
        { group: "Frontend", items: ["HTML", "CSS", "JavaScript", "Bootstrap"] },
        { group: "Integrasi", items: ["Midtrans Snap (Sandbox)", "FPDF"] },
      ],
      challenges: [
        {
          title: "Status pembayaran harus akurat",
          desc: "Status dari Midtrans dipetakan ke status aplikasi (menunggu, lunas, kedaluwarsa, gagal). Nominal yang dibayar dicek sama dengan tagihan, dan update hanya berlaku sekali agar pulsa tidak terkirim dua kali.",
        },
        {
          title: "Pembayaran lunas tapi pulsa gagal",
          desc: "Status pembayaran dan status pengisian pulsa dipisah. Pembeli tetap melihat bahwa pembayaran diterima, sementara invoice menandai pengisian gagal sehingga bisa ditindaklanjuti.",
        },
        {
          title: "Keamanan data pengguna",
          desc: "Query memakai prepared statement untuk mencegah SQL injection, output di-escape untuk mencegah XSS, password di-hash, dan cookie Remember me ditandatangani.",
        },
      ],
      gallery: [
        { src: "/projects/pulsa/cover.webp", caption: "Dashboard pembeli dan halaman pembayaran" },
        { src: "/projects/pulsa/beranda.webp", caption: "Landing page QUICK.TOP" },
        { src: "/projects/pulsa/dashboard.webp", caption: "Katalog produk pulsa semua operator" },
        { src: "/projects/pulsa/detail-produk.webp", caption: "Detail produk sebelum masuk keranjang" },
        { src: "/projects/pulsa/keranjang.webp", caption: "Keranjang belanja" },
        { src: "/projects/pulsa/konfirmasi.webp", caption: "Input dan validasi nomor handphone tujuan" },
        { src: "/projects/pulsa/pembayaran.webp", caption: "Gerbang pembayaran Midtrans dengan batas waktu" },
        { src: "/projects/pulsa/nota-berhasil.webp", caption: "Invoice: pembayaran lunas dan pulsa terkirim" },
        { src: "/projects/pulsa/nota-gagal.webp", caption: "Invoice: pembayaran lunas tetapi pengisian gagal" },
        { src: "/projects/pulsa/riwayat.webp", caption: "Riwayat transaksi pembeli" },
        { src: "/projects/pulsa/admin-dashboard.webp", caption: "Dashboard admin: pendapatan, transaksi, dan produk" },
        { src: "/projects/pulsa/admin-transaksi.webp", caption: "Rekap seluruh transaksi penjualan" },
        { src: "/projects/pulsa/admin-provider.webp", caption: "Kelola provider dan nominal pulsa" },
        { src: "/projects/pulsa/admin-user.webp", caption: "Manajemen akun pengguna" },
        { src: "/projects/pulsa/login.webp", caption: "Halaman login" },
      ],
    },
  },
  {
    title: "Portofolio Pribadi",
    desc: "Website portofolio one-page dengan animasi halus serta mode terang/gelap. Dibuat memakai React, Vite, dan Tailwind CSS.",
    tags: ["React", "Vite", "Tailwind", "Framer Motion"],
    image: "/projects/portfolio/cover.webp",
    thumb: "/projects/portfolio/thumb.webp",
    github: "https://github.com/dhaput22/portfolio",
    demo: "",
    colors: ["#0a63c9", "#7cdbfd"],
    slug: "portofolio-pribadi",
    detail: {
      subtitle: "Website portofolio satu halaman untuk menampilkan proyek, pengalaman, dan sertifikat",
      meta: [
        { label: "Program", value: "Proyek pribadi" },
        { label: "Peran", value: "Full-Stack Developer" },
        { label: "Periode", value: "Okt - Nov 2026" },
        { label: "Tim", value: "Individu" },
      ],
      overview:
        "Website ini adalah portofolio satu halaman yang merangkum profil, skill, proyek, pengalaman, pendidikan, dan sertifikat. Setiap proyek punya halaman detail berisi masalah, solusi, fitur, kontribusi, tantangan, dan galeri. Semua isi tersimpan di satu file data, jadi proyek atau pengalaman baru bisa ditambahkan tanpa mengubah komponen.",
      problem: [
        "CV hanya memuat ringkasan, sehingga sulit menunjukkan cara kerja dan hasil sebuah proyek.",
        "Proyek tersebar di beberapa repositori dan laporan, tanpa satu tempat yang mudah dibaca recruiter.",
        "Tampilan harus nyaman dilihat di laptop maupun HP, dalam mode terang maupun gelap.",
      ],
      solution:
        "Satu halaman dengan alur dari profil ke proyek, pengalaman, sertifikat, lalu kontak. Recruiter cukup melihat carousel untuk gambaran umum, lalu membuka detail proyek yang ingin dibaca. Detail proyek punya tautan sendiri, sehingga bisa dibagikan langsung dan tombol kembali di browser tetap berfungsi.",
      features: [
        { title: "Carousel Proyek", desc: "Bisa digeser, diklik, atau dikendalikan keyboard, dengan daftar yang berputar tanpa ujung." },
        { title: "Halaman Detail Proyek", desc: "Ringkasan sampai galeri dalam satu tampilan, dengan tautan yang bisa dibagikan." },
        { title: "Mode Terang & Gelap", desc: "Pergantian mode memudar halus di seluruh halaman, dan pilihannya tersimpan di browser." },
        { title: "Animasi Scroll Dua Arah", desc: "Konten muncul saat scroll turun dan diputar mundur saat scroll naik." },
        { title: "Linimasa Bertab", desc: "Pengalaman dan pendidikan dipisah dalam tab, dengan garis waktu yang terisi mengikuti scroll." },
        { title: "Responsif & Ringan", desc: "Tata letak menyesuaikan layar, dan efek berat dimatikan di HP serta untuk pengguna yang mengurangi gerakan." },
      ],
      contribution: [
        "Menentukan konsep, gaya visual, dan alur isi website.",
        "Menyusun konten proyek, pengalaman, dan sertifikat beserta tangkapan layarnya.",
        "Mengembangkan dan menyempurnakan antarmuka, animasi, dan mode terang/gelap secara bertahap.",
        "Menguji tampilan di berbagai ukuran layar dan memperbaiki masalah yang ditemukan.",
      ],
      techStack: [
        { group: "Frontend", items: ["React 19", "JavaScript", "Tailwind CSS 4"] },
        { group: "Animasi", items: ["Framer Motion", "View Transitions API"] },
        { group: "Tooling", items: ["Vite 7", "Git", "GitHub"] },
      ],
      challenges: [
        {
          title: "Carousel skill yang berkedip saat di-hover",
          desc: "Perekaman per frame menunjukkan semua kartu sempat terang lagi saat mouse melewati celah antar kartu, dan filter blur membuat baris digambar ulang terus. Kartu aktif lalu dipertahankan sampai mouse pindah, blur dihapus, dan posisi dihitung sendiri tiap frame.",
        },
        {
          title: "Ganti mode yang terasa mendadak",
          desc: "Transisi warna biasa tidak berlaku pada latar gradasi. Seluruh halaman kini memudar silang dengan View Transitions API, dengan transisi warna sebagai cadangan di browser yang belum mendukung.",
        },
        {
          title: "Garis putih di sekitar foto pada mode gelap",
          desc: "Sisa warna dinding studio menempel di tepi potongan foto. Potongan dibuat ulang dari foto asli dengan memisahkan warna kulit dan warna gelap rambut serta jas dari warna dinding.",
        },
      ],
      gallery: [
        { src: "/projects/portfolio/cover.webp", caption: "Hero mode terang di desktop dan mode gelap di HP" },
        { src: "/projects/portfolio/hero-dark.webp", caption: "Hero mode gelap" },
        { src: "/projects/portfolio/about.webp", caption: "Mengenal Lebih Dekat: ringkasan profil" },
        { src: "/projects/portfolio/skills.webp", caption: "Carousel skill dan proyek pilihan" },
        { src: "/projects/portfolio/projects-dark.webp", caption: "Proyek pilihan dengan overlay saat di-hover" },
        { src: "/projects/portfolio/detail.webp", caption: "Halaman detail proyek" },
        { src: "/projects/portfolio/experience.webp", caption: "Linimasa pengalaman dengan tab" },
        { src: "/projects/portfolio/certificates.webp", caption: "Sertifikasi dengan pratinjau gambar" },
        { src: "/projects/portfolio/mobile.webp", caption: "Tampilan di HP" },
      ],
    },
  },
];

// type: "work" = tab Pengalaman, "education" = tab Pendidikan
export const experience = [
  {
    type: "work",
    period: "Okt 2025 – Mar 2026",
    title: "IT Intern · Magang",
    place: "PT Epson Batam · Batam",
    desc: "Mengembangkan Gapuro System, Warehouse Management System berbasis web untuk mendukung operasional gudang, visibilitas stok, dan pengelolaan barang di perusahaan.",
    points: [
      "Membangun WMS dengan Laravel 12, PHP, MySQL, dan Tailwind CSS.",
      "Mengembangkan fitur penerimaan barang, pengiriman, monitoring stok, dan dashboard kapasitas gudang.",
      "Menganalisis alur kerja gudang, merancang struktur database, dan melakukan pengujian fungsional.",
    ],
  },
  {
    type: "work",
    period: "Agt 2025 – Agt 2026",
    title: "Molding Production & Material Handler · Kontrak",
    place: "PT Epson Batam · Batam",
    desc: "Mengantarkan dan mengisi ulang material dari gudang ke lini produksi agar proses manufaktur berjalan tanpa hambatan.",
    points: [
      "Mengelola stok material serta mencatat barang masuk dan keluar memakai scanner dan sistem inventaris.",
      "Memeriksa jumlah dan kondisi material sebelum didistribusikan untuk menjaga akurasi inventaris.",
      "Berkoordinasi dengan tim gudang dan produksi agar aliran material lancar dan produksi tidak tertunda.",
    ],
  },
  {
    type: "education",
    period: "Sep 2023 – Agt 2026",
    title: "D3 Teknik Informatika · Ahli Madya Komputer",
    place: "Politeknik Negeri Batam",
    desc: "IPK 3,83. Mempelajari pemrograman web, basis data, dan rekayasa perangkat lunak, serta mengerjakan proyek PBL dan Tugas Akhir berbasis Laravel dan PHP.",
  },
  {
    type: "work",
    period: "Jul 2021 – Jul 2023",
    title: "Production Operator · Kontrak",
    place: "PT Epson Batam · Batam",
    desc: "Mengoperasikan peralatan produksi sesuai instruksi kerja dan SOP, memantau proses produksi, serta memeriksa produk untuk menemukan cacat atau kelainan.",
    points: [
      "Ikut mencapai target produksi harian dengan tetap menjaga standar operasional.",
      "Menjaga kualitas produk dengan mengikuti prosedur inspeksi dan melaporkan kelainan kepada tim terkait.",
    ],
  },
  {
    type: "work",
    period: "Nov 2019 – Mei 2021",
    title: "Front Office Receptionist · Kontrak",
    place: "PT. Aulia Nurdin Makruf Sejahtera · Padang Panjang",
    desc: "Menyambut tamu, menangani check-in dan check-out, reservasi, serta pertanyaan dan keluhan tamu secara profesional.",
    points: [
      "Berkoordinasi dengan departemen lain untuk mendukung operasional harian dan kepuasan tamu.",
      "Mengelola tugas administrasi dan menjaga keakuratan data tamu.",
    ],
  },
  {
    type: "education",
    period: "Jul 2016 – Mei 2019",
    title: "SMA · Ilmu Pengetahuan Alam",
    place: "SMA Negeri 2 Padang Panjang",
    desc: "Jurusan IPA. Aktif dalam kegiatan basket.",
  },
];

// Sertifikasi & lisensi (dari LinkedIn). image: taruh di public/certificates/. Kosong = tampil tanpa gambar.
export const certificates = [
  {
    title: "Microsoft Excel for Warehouse Administration",
    issuer: "Amanexcel",
    date: "Nov 2026",
    role: "Peserta",
    skills: ["Microsoft Excel", "System Administration"],
    image: "/certificates/excel-warehouse.webp",
  },
  {
    title: "Program Penguatan Fisika Dasar",
    issuer: "Politeknik Negeri Batam",
    date: "Mar 2026",
    role: "Peserta",
    skills: [],
    image: "/certificates/fisika-dasar.webp",
  },
  {
    title: "Roadshow IdFest 2024",
    topic: "DNS & Tata Kelola Internet",
    issuer: "PANDI | Pengelola Nama Domain Internet Indonesia",
    date: "Nov 2024",
    role: "Peserta",
    skills: ["Canva"],
    image: "/certificates/idfest-2024.webp",
  },
];
