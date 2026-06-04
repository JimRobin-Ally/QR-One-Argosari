/*
  CARA EDIT DATA:
  1. Ganti teks di bagian site.
  2. Ganti/tambah kategori di bagian categories.
  3. Ganti/tambah daftar informasi di bagian items.
  4. Untuk Google Maps, buka lokasi di Google Maps, klik Bagikan, lalu salin linknya.
*/

const PORTAL_DATA = {
  site: {
    title: "Desa/Kelurahan Anda",
    subtitle: "Portal cepat untuk UMKM, fasilitas umum, jalur evakuasi, dan kontak penting.",
    notice: "Contoh template. Silakan ganti data sesuai wilayahmu sebelum dipublikasikan.",
    lastUpdated: "4 Juni 2026"
  },

  categories: [
    {
      id: "umkm",
      title: "UMKM",
      icon: "🛍️",
      description: "Produk, kuliner, dan jasa warga."
    },
    {
      id: "fasum",
      title: "Fasilitas Umum",
      icon: "🏥",
      description: "Kantor, sekolah, puskesmas, dan lainnya."
    },
    {
      id: "evakuasi",
      title: "Jalur Evakuasi",
      icon: "🧭",
      description: "Rute dan titik kumpul darurat."
    },
    {
      id: "kontak",
      title: "Kontak Penting",
      icon: "☎️",
      description: "Nomor darurat dan layanan warga."
    }
  ],

  items: [
    {
      category: "umkm",
      name: "Warung Kopi Bu Sari",
      icon: "☕",
      description: "Kopi, gorengan, dan makanan ringan.",
      address: "Jl. Contoh No. 1",
      mapsUrl: "https://maps.google.com/",
      phone: "081234567890",
      whatsapp: "6281234567890"
    },
    {
      category: "umkm",
      name: "Keripik Singkong Pak Budi",
      icon: "🍠",
      description: "Keripik singkong aneka rasa, cocok untuk oleh-oleh.",
      address: "RT 02/RW 03",
      mapsUrl: "https://maps.google.com/",
      phone: "081298765432",
      whatsapp: "6281298765432"
    },
    {
      category: "fasum",
      name: "Kantor Desa/Kelurahan",
      icon: "🏛️",
      description: "Layanan administrasi warga.",
      address: "Jl. Kantor Desa No. 10",
      mapsUrl: "https://maps.google.com/",
      phone: "0211234567"
    },
    {
      category: "fasum",
      name: "Puskesmas Pembantu",
      icon: "🏥",
      description: "Layanan kesehatan dasar masyarakat.",
      address: "Dekat balai warga",
      mapsUrl: "https://maps.google.com/",
      phone: "0217654321"
    },
    {
      category: "evakuasi",
      name: "Titik Kumpul Lapangan Utama",
      icon: "📍",
      description: "Titik kumpul saat keadaan darurat. Ikuti arahan petugas setempat.",
      address: "Lapangan utama desa/kelurahan",
      mapsUrl: "https://maps.google.com/"
    },
    {
      category: "evakuasi",
      name: "Rute Evakuasi ke Balai Warga",
      icon: "➡️",
      description: "Rute aman sementara menuju balai warga. Sesuaikan dengan peta resmi setempat.",
      address: "Rute dari permukiman ke balai warga",
      mapsUrl: "https://maps.google.com/"
    },
    {
      category: "kontak",
      name: "Ketua RT/RW",
      icon: "👤",
      description: "Kontak koordinator lingkungan.",
      address: "Wilayah setempat",
      phone: "081111111111",
      whatsapp: "6281111111111"
    },
    {
      category: "kontak",
      name: "Nomor Darurat Lokal",
      icon: "🚨",
      description: "Gunakan hanya untuk keadaan darurat.",
      address: "-",
      phone: "112"
    }
  ]
};
