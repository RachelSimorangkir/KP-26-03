# Sistem Informasi Terintegrasi Ditjen Bimas Kristen

## Deskripsi

Sistem Informasi Terintegrasi merupakan aplikasi berbasis web yang dikembangkan untuk mendukung transformasi digital pada Direktorat Jenderal Bimbingan Masyarakat Kristen Kementerian Agama Republik Indonesia.

Sistem ini mengintegrasikan berbagai layanan administrasi dalam satu platform, meliputi layanan kepegawaian, pengelolaan data, serta pengelolaan Barang Milik Negara (BMN), sehingga proses kerja menjadi lebih efektif, efisien, transparan, dan terpusat.

## Tujuan

- Mendukung digitalisasi layanan administrasi.
- Mengintegrasikan data dari berbagai unit kerja.
- Mempermudah pengelolaan data kepegawaian.
- Mempermudah pengelolaan Barang Milik Negara (BMN).
- Meningkatkan efisiensi dan akurasi proses administrasi.
- Menyediakan informasi yang terpusat dan mudah diakses.

## Fitur Utama

### Layanan Kepegawaian
- Kenaikan Pangkat
- Mutasi Pegawai
- Pengajuan Cuti
- Pensiun
- Perubahan Jabatan
- Pengelolaan Data Pegawai

### Pengelolaan Data
- Manajemen Data Pegawai
- Monitoring Data
- Statistik dan Laporan
- Dashboard Informasi

### Barang Milik Negara (BMN)
- Peminjaman barang
- Permintaan barang
- Proses barang masuk
- DBR (Daftar Barang Ruang)

### Manajemen Pengguna
- Login dan Autentikasi
- Hak Akses Berdasarkan Peran (Role Based Access)
- Pengelolaan Akun Pengguna

## Teknologi yang Digunakan

### Frontend
- React.js
- Vite
- CSS3

### Backend
- Laravel / Node.js *(sesuaikan dengan yang digunakan)*

### Database
- MySQL

### Tools
- Git
- GitHub
- Visual Studio Code

## Struktur Proyek

```bash
src/
│
├── assets/
├── components/
│   ├── Navbar
│   ├── Hero
│   ├── ServiceCard
│   ├── Footer
│   └── LoginModal
│
├── pages/
│   ├── Home
│   ├── Dashboard
│   ├── Kepegawaian
│   ├── DataManagement
│   └── BMN
│
├── services/
├── App.jsx
└── main.jsx
```

## 🚀 Instalasi

Clone repository:

```bash
git clone https://github.com/username/nama-repository.git
```

Masuk ke folder project:

```bash
cd nama-repository
```

Install dependency:

```bash
npm install
```

Jalankan aplikasi:

```bash
npm run dev
```

Aplikasi akan berjalan pada:

```bash
http://localhost:5173
```

## Tampilan Sistem

### Beranda
Menampilkan informasi umum sistem dan akses ke seluruh layanan yang tersedia.

### Dashboard
Menampilkan ringkasan data, statistik, dan aktivitas sistem.

### Modul Kepegawaian
Mendukung berbagai proses administrasi kepegawaian secara digital.

### Modul BMN
Mendukung pengelolaan aset dan inventaris Barang Milik Negara.

## Tim Pengembang

Proyek ini dikembangkan sebagai bagian dari implementasi digitalisasi layanan pada Direktorat Jenderal Bimbingan Masyarakat Kristen Kementerian Agama Republik Indonesia.

## Lisensi

Proyek ini dibuat untuk tujuan akademik dan pengembangan sistem informasi pada lingkungan Direktorat Jenderal Bimbingan Masyarakat Kristen Kementerian Agama Republik Indonesia.
