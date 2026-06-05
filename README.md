# QR-One Argosari - Template Portal KKN

Template ini dibuat untuk GitHub Pages. Tampilannya dibuat seperti portal informasi desa: ada cover, logo, kartu menu, pencarian, dan satu tombol Google Form untuk semua jenis pendaftaran/pembaruan data.

## File yang paling sering diedit

- `data.js` untuk mengganti teks, link, menu, Google Form, dan Google Maps.
- `assets/logo-kkn.svg` untuk mengganti logo KKN.
- `assets/logo-desa.svg` untuk mengganti logo desa/QR-One.
- `assets/logo-kampus.svg` untuk mengganti logo kampus.
- `assets/cover.svg` untuk mengganti foto sampul.

## Cara mengganti logo KKN

1. Siapkan file logo, misalnya `logo-kkn.png`.
2. Upload ke folder `assets`.
3. Buka `data.js`.
4. Ubah bagian berikut:

```js
kknLogo: "assets/logo-kkn.png"
```

## Cara mengganti link Google Form

Buka `data.js`, cari bagian:

```js
form: {
  url: "https://forms.gle/ISI_LINK_GOOGLE_FORM_DI_SINI",
```

Ganti dengan link Google Form asli.

## Rekomendasi isi Google Form

Buat satu Google Form saja, lalu tambahkan pertanyaan pilihan:

- UMKM
- Wisata
- Fasilitas umum
- Jalur evakuasi/titik kumpul
- Kontak darurat
- Pembaruan data lainnya

Kolom lain yang disarankan:

- Nama tempat/usaha
- Deskripsi singkat
- Alamat
- Link Google Maps
- Nomor HP/WhatsApp
- Foto pendukung
- Persetujuan untuk ditampilkan di portal

## Sinkron Google Sheet opsional

Di `data.js`, ada bagian:

```js
googleSheetCsvUrl: "",
showOnlyApprovedSheetRows: true
```

Jika ingin data dari Google Form otomatis tampil, hubungkan Google Form ke Google Sheet, publish Google Sheet sebagai CSV, lalu tempel link CSV ke `googleSheetCsvUrl`.

Agar aman, tambahkan kolom `status_tayang` di Google Sheet. Isi `Disetujui` untuk data yang boleh tampil.
