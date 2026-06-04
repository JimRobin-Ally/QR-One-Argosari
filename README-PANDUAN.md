# Panduan Portal Informasi Digital GitHub Pages

Template ini adalah halaman seperti Linktree untuk QR Code. Setelah diunggah ke GitHub Pages, warga cukup scan QR dan masuk ke halaman pilihan seperti UMKM, fasilitas umum, jalur evakuasi, dan kontak penting.

## File yang perlu kamu tahu

- `index.html` = struktur halaman. Biasanya tidak perlu diedit.
- `style.css` = tampilan warna, ukuran, dan layout. Bisa diedit kalau ingin ubah desain.
- `script.js` = fungsi pencarian dan filter kategori. Biasanya tidak perlu diedit.
- `data.js` = data utama. File ini yang paling sering diedit.
- `assets/logo-placeholder.svg` = logo sementara. Bisa diganti dengan logo desa/kelurahan.

## Cara edit data

Buka file `data.js`, lalu ganti bagian berikut:

```js
site: {
  title: "Desa/Kelurahan Anda",
  subtitle: "Portal cepat untuk UMKM, fasilitas umum, jalur evakuasi, dan kontak penting.",
  notice: "Contoh template. Silakan ganti data sesuai wilayahmu sebelum dipublikasikan.",
  lastUpdated: "4 Juni 2026"
}
```

Untuk menambah data baru, salin salah satu blok di `items`, lalu ubah isinya.

Contoh UMKM:

```js
{
  category: "umkm",
  name: "Nama UMKM",
  icon: "🛍️",
  description: "Deskripsi singkat usaha.",
  address: "Alamat singkat",
  mapsUrl: "https://maps.google.com/",
  phone: "081234567890",
  whatsapp: "6281234567890"
}
```

Catatan penting untuk WhatsApp: gunakan format kode negara tanpa tanda plus. Contoh `6281234567890`, bukan `081234567890`.

## Cara upload ke GitHub Pages tanpa install aplikasi

1. Buat akun di GitHub jika belum punya.
2. Klik tombol `New repository`.
3. Nama repository harus: `username.github.io`, ganti `username` dengan username GitHub kamu.
4. Pilih `Public`.
5. Klik `Create repository`.
6. Upload semua file template ini ke repository tersebut.
7. Masuk ke `Settings` > `Pages`.
8. Pada bagian `Build and deployment`, pilih branch `main` dan folder `/root`.
9. Buka `https://username.github.io`.

Perubahan biasanya butuh beberapa menit sebelum tampil.

## Cara membuat QR Code

Setelah websitenya aktif, salin link seperti:

```text
https://username.github.io
```

Lalu buat QR Code menggunakan generator QR yang kamu percaya. QR tersebut cukup diarahkan ke satu link utama. Dari halaman utama, pengguna bisa memilih UMKM, fasum, jalur evakuasi, dan lain-lain.

## Tips data jalur evakuasi

Untuk jalur evakuasi, sebaiknya gunakan data resmi dari desa/kelurahan, BPBD, atau peta kebencanaan yang sudah diverifikasi. Jangan menampilkan rute darurat yang belum pasti benar.
