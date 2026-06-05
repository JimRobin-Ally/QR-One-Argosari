/*
  CARA EDIT SINGKAT:
  1. Ganti teks pada bagian CONFIG.site.
  2. Ganti link Google Form di CONFIG.form.url.
  3. Ganti link Google Maps pada setiap item di bagian DATA_SECTIONS.
  4. Ganti logo/foto di folder assets, lalu sesuaikan nama file di CONFIG.assets.
*/

const CONFIG = {
  site: {
    title: "QR-One Argosari",
    eyebrow: "PORTAL INFORMASI DIGITAL",
    tagline: "Sistem Integrasi Informasi dan Pemetaan Desa Berbasis QR Code",
    intro: "Selamat datang di pusat informasi digital Desa Argosari, Kecamatan Senduro, Kabupaten Lumajang.",
    notice: "📍 Satu akses untuk informasi desa, wisata, dan mitigasi Argosari.",
    validationText: "Informasi dalam QR-One Argosari akan diperbarui berdasarkan hasil observasi lapangan, pendataan mahasiswa KKN, serta verifikasi bersama perangkat desa dan pihak terkait.",
    footer: "QR-One Argosari - Program Kerja KKN",
    lastUpdated: "16 Mei 2026"
  },

  assets: {
    cover: "assets/cover.svg",
    mainLogo: "assets/Logo KKN.png",
    navLogo: "assets/logo-desa.svg",
    kknLogo: "assets/Logo KKN.png",
    navLogo: "assets/logo-desa.svg",
    campusLogo: "assets/logo-kampus.svg"
  },

  // Satu form saja untuk semua jenis pendaftaran/pembaruan data.
  // Buat pilihan di Google Form: UMKM, Wisata, Fasilitas Umum, Jalur Evakuasi, Kontak Darurat, Lainnya.
  form: {
    url: "https://forms.gle/ISI_LINK_GOOGLE_FORM_DI_SINI",
    buttonText: "Buka Form Pendaftaran",
    description: "Gunakan satu Google Form. Di dalam form, pendaftar memilih keperluannya: UMKM, wisata, fasilitas umum, jalur evakuasi, kontak darurat, atau pembaruan data."
  },

  quickActions: [
    { label: "Peta Desa", href: "#informasi", icon: "🗺️" },
    { label: "UMKM/Wisata", href: "#umkm-wisata", icon: "🛍️" },
    { label: "Mitigasi", href: "#mitigasi", icon: "⚠️" },
    { label: "Daftar Data", href: "#daftar", icon: "📝" }
  ],

  // OPSIONAL: jika nanti ingin data dari Google Sheet tampil otomatis.
  // Untuk tahap awal boleh dikosongkan.
  // Alur aman: Google Form -> Google Sheet -> admin isi status_tayang = Disetujui -> tampil di website.
  googleSheetCsvUrl: "",
  showOnlyApprovedSheetRows: true
};

const DATA_SECTIONS = [
  {
    id: "informasi",
    title: "Informasi Utama",
    columns: 2,
    items: [
      {
        title: "Peta Desa Argosari",
        icon: "🗺️",
        description: "Lokasi Desa Argosari",
        status: "Aktif",
        linkText: "Peta Desa Argosari",
        link: "https://maps.google.com/"
      },
      {
        title: "Profil Desa Argosari",
        icon: "🏡",
        description: "Informasi dan Layanan Desa.",
        status: "Diisi Setelah Observasi Lapangan,
        linkText: "Lihat Profil",
        link: "#"
      }
    ]
  },
  {
    id: "fasum",
    title: "Fasilitas Umum",
    columns: 1,
    items: [
      {
        title: "Peta Fasilitas Umum",
        icon: "🏥",
        description: "Balai desa, sekolah, posyandu, masjid, toilet umum, titik parkir, dan fasilitas lainnya.",
        status: "Diisi setelah observasi lapangan",
        linkText: "Lihat Lokasi",
        link: "https://maps.google.com/"
      }
    ]
  },
  {
    id: "mitigasi",
    title: "Mitigasi dan Keselamatan",
    columns: 1,
    items: [
      {
        title: "Peta Daerah Rawan Bencana",
        icon: "⚠️",
        description: "Informasi wilayah rawan bencana di Desa Argosari.",
        status: "Diisi Setelah Observasi Lapangan",
        linkText: "Lihat Peta",
        link: "#"
      },
      {
        title: "Jalur Evakuasi dan Titik Kumpul",
        icon: "🚶",
        description: "Rute evakuasi dan lokasi titik kumpul terdekat.",
        status: "Perlu validasi BPBD/perangkat desa dan observasi lapangan",
        linkText: "Buka Rute",
        link: "#"
      },
      {
        title: "Nomor Darurat",
        icon: "📞",
        description: "Daftar kontak penting untuk keadaan darurat.",
        status: "Diisi Setelah Observasi Lapangan",
        linkText: "Hubungi",
        link: "tel:112"
      }
    ]
  },
  {
    id: "umkm-wisata",
    title: "Wisata dan Ekonomi Desa",
    columns: 1,
    items: [
      {
        title: "Wisata B29",
        icon: "🌄",
        description: "Informasi daya tarik wisata B29 Argosari.",
        status: "Siap diisi setelah observasi lapangan",
        linkText: "Lihat Informasi",
        link: "https://maps.google.com/"
      },
      {
        title: "Peta UMKM Lokal",
        icon: "🛍️",
        description: "Lokasi dan informasi UMKM di Desa Argosari.",
        status: "Siap diisi setelah pendataan",
        linkText: "Lihat UMKM",
        link: "#"
      }
    ]
  },
  {
    id: "pembaruan",
    title: "Pembaruan Data",
    columns: 1,
    items: [
      {
        title: "Form Update Data",
        icon: "📝",
        description: "Sampaikan data terbaru untuk pembaruan informasi.",
        status: "Satu form untuk semua kebutuhan",
        linkText: "Buka Form",
        useFormUrl: true
      },
      {
        title: "Kontak Admin QR-One",
        icon: "👤",
        description: "Untuk informasi, saran, atau kerja sama.",
        status: "Perlu diisi oleh perangkat desa atau pihak terkait",
        linkText: "Hubungi Admin",
        link: "https://wa.me/6281234567890"
      }
    ]
  }
];
