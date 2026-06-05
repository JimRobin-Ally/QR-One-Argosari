// =============================================================
// DATA QR-ONE ARGOSARI
// Edit file ini untuk mengubah isi website.
// =============================================================

window.PORTAL_CONFIG = {
  site: {
    brand: "QR-One Argosari",
    logo: "🌄",
    eyebrow: "Portal Informasi Digital",
    title: "QR-One Argosari",
    subtitle: "Sistem Integrasi Informasi dan Pemetaan Desa Berbasis QR Code",
    intro: "Selamat datang di pusat informasi digital Desa Argosari, Kecamatan Senduro, Kabupaten Lumajang. Halaman ini digunakan untuk mengakses peta desa, fasilitas umum, wisata, UMKM, jalur evakuasi, nomor darurat, dan informasi penting lainnya.",
    notice: "📍 Satu akses untuk informasi desa, wisata, dan mitigasi Argosari.",
    validationText: "Informasi dalam QR-One Argosari akan diperbarui berdasarkan hasil observasi lapangan, pendataan, serta verifikasi bersama perangkat desa dan pihak terkait.",
    footer: "© QR-One Argosari",
    lastUpdated: "16 Mei 2026",
    formUrl: "https://forms.gle/GANTI_DENGAN_LINK_GOOGLE_FORM",

    // Opsional: ganti dengan URL gambar cover sendiri.
    // Bisa pakai foto yang di-upload ke GitHub repo, misalnya: "assets/cover.jpg"
    coverImage: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=80"
  },

  // OPSI SINKRON GOOGLE FORM/SHEET
  // 1. Buat Google Form.
  // 2. Hubungkan Form ke Google Sheet.
  // 3. Di Google Sheet: File > Share > Publish to web > pilih sheet > format CSV.
  // 4. Paste link CSV ke sheetCsvUrl di bawah ini.
  // 5. Biarkan kosong "" jika ingin memakai data manual di bawah.
  sheetCsvUrl: "",

  // Jika true: data manual di bawah tetap tampil, lalu data dari Google Sheet ditambahkan.
  // Jika false: ketika sheetCsvUrl aktif, website hanya memakai data dari Google Sheet.
  combineManualAndSheet: true,

  categories: [
    { id: "informasi", title: "Informasi Utama", icon: "🗺️", tone: "blue", wide: false },
    { id: "fasum", title: "Fasilitas Umum", icon: "🏥", tone: "green", wide: false },
    { id: "mitigasi", title: "Mitigasi dan Keselamatan", icon: "⚠️", tone: "yellow", wide: false },
    { id: "wisata-ekonomi", title: "Wisata dan Ekonomi Desa", icon: "🛍️", tone: "purple", wide: false },
    { id: "pembaruan", title: "Pembaruan Data", icon: "📝", tone: "blue", wide: false }
  ],

  items: [
    {
      category: "informasi",
      name: "Peta Desa Argosari",
      icon: "🗺️",
      description: "Akses lokasi Desa Argosari melalui Google Maps.",
      address: "Desa Argosari, Kecamatan Senduro, Kabupaten Lumajang",
      mapsUrl: "https://maps.google.com/?q=Desa+Argosari+Senduro+Lumajang",
      status: "Siap digunakan",
      tone: "blue"
    },
    {
      category: "fasum",
      name: "Peta Fasilitas Umum",
      icon: "🏥",
      description: "Balai desa, sekolah, posyandu, masjid, toilet umum, titik parkir, dan fasilitas lainnya.",
      address: "Desa Argosari",
      mapsUrl: "https://maps.google.com/?q=Argosari+Senduro+Lumajang",
      status: "Siap diisi setelah observasi lapangan",
      tone: "green"
    },
    {
      category: "mitigasi",
      name: "Peta Daerah Rawan Bencana",
      icon: "⚠️",
      description: "Informasi wilayah rawan bencana di Desa Argosari.",
      address: "Desa Argosari",
      mapsUrl: "https://maps.google.com/?q=Argosari+Senduro+Lumajang",
      status: "Perlu validasi bersama pihak berwenang",
      tone: "yellow"
    },
    {
      category: "mitigasi",
      name: "Jalur Evakuasi dan Titik Kumpul",
      icon: "🚶",
      description: "Rute evakuasi dan lokasi titik kumpul terdekat.",
      address: "Desa Argosari",
      mapsUrl: "https://maps.google.com/?q=Argosari+Senduro+Lumajang",
      status: "Perlu validasi bersama perangkat desa/BPBD",
      tone: "yellow"
    },
    {
      category: "mitigasi",
      name: "Nomor Darurat",
      icon: "📞",
      description: "Daftar kontak penting untuk keadaan darurat.",
      phone: "112",
      status: "Perlu disesuaikan dengan kontak lokal",
      tone: "yellow"
    },
    {
      category: "wisata-ekonomi",
      name: "Wisata B29",
      icon: "🌄",
      description: "Informasi daya tarik wisata B29 Argosari.",
      address: "B29, Argosari, Senduro, Lumajang",
      mapsUrl: "https://maps.google.com/?q=B29+Argosari+Lumajang",
      status: "Siap diisi setelah observasi lapangan",
      tone: "purple"
    },
    {
      category: "wisata-ekonomi",
      name: "Peta UMKM Lokal",
      icon: "🛍️",
      description: "Lokasi dan informasi UMKM di Desa Argosari.",
      address: "Desa Argosari",
      mapsUrl: "https://maps.google.com/?q=Argosari+Senduro+Lumajang",
      status: "Siap diisi setelah pendataan UMKM",
      tone: "purple"
    },
    {
      category: "pembaruan",
      name: "Form Update Data",
      icon: "📝",
      description: "Sampaikan data terbaru untuk pembaruan informasi.",
      externalUrl: "https://forms.gle/GANTI_DENGAN_LINK_GOOGLE_FORM",
      status: "Hubungkan dengan Google Form",
      tone: "blue"
    },
    {
      category: "pembaruan",
      name: "Kontak Admin QR-One",
      icon: "👤",
      description: "Untuk informasi, saran, atau kerja sama.",
      phone: "081234567890",
      whatsapp: "6281234567890",
      status: "Ganti dengan nomor admin",
      tone: "blue"
    }
  ]
};
