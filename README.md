# QR-One Argosari - Portal GitHub Pages

Template website statis untuk portal informasi desa berbasis QR Code. Cocok untuk peta desa, UMKM, wisata, fasilitas umum, jalur evakuasi, kontak penting, dan formulir pembaruan data.

## Cara edit data manual

Edit file `data.js`, lalu commit changes. Bagian yang paling sering diubah:

- `title`: judul besar halaman.
- `intro`: paragraf pembuka.
- `formUrl`: link Google Form pendaftaran.
- `items`: daftar kartu informasi.

## Cara menambah kartu manual

Tambahkan item baru di array `items`:

```js
{
  category: "wisata-ekonomi",
  name: "Nama UMKM atau Wisata",
  icon: "🛍️",
  description: "Deskripsi singkat.",
  address: "Alamat lokasi",
  mapsUrl: "https://maps.app.goo.gl/...",
  phone: "081234567890",
  whatsapp: "6281234567890",
  status: "Sudah diverifikasi",
  tone: "purple"
},
```

Kategori yang tersedia:

- `informasi`
- `fasum`
- `mitigasi`
- `wisata-ekonomi`
- `pembaruan`

## Cara sync dari Google Form / Google Sheet

Alur yang disarankan:

1. Buat Google Form untuk pendaftaran UMKM/wisata/fasilitas.
2. Hubungkan Google Form ke Google Sheet.
3. Tambahkan kolom `status_tayang` di Google Sheet.
4. Admin hanya mengisi `Disetujui` pada data yang boleh tampil.
5. Publish Google Sheet sebagai CSV.
6. Masukkan link CSV ke `sheetCsvUrl` di file `data.js`.

Kolom Google Sheet yang disarankan:

| Kolom | Contoh isi |
|---|---|
| status_tayang | Disetujui |
| kategori | UMKM |
| nama | Kopi Argosari |
| deskripsi | Produk kopi lokal dan makanan ringan |
| alamat | Dusun Krajan, Argosari |
| link google maps | https://maps.app.goo.gl/... |
| nomor hp | 081234567890 |
| whatsapp | 6281234567890 |
| icon | ☕ |
| catatan | Sudah diverifikasi |

Catatan: data dari Google Sheet hanya akan tampil jika `status_tayang` berisi salah satu dari: `Disetujui`, `Setuju`, `Approved`, `Ya`, `Tayang`, atau `Publish`.

## Link kategori untuk QR berbeda

- Semua: `https://username.github.io/nama-repo/`
- UMKM/Wisata: `https://username.github.io/nama-repo/?kategori=umkm`
- Fasum: `https://username.github.io/nama-repo/?kategori=fasum`
- Evakuasi/Mitigasi: `https://username.github.io/nama-repo/?kategori=evakuasi`
