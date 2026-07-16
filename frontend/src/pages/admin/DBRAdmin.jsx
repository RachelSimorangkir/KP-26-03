import { useState } from "react";
import {
  Modal, StatusBadge, inputStyle, FormGroup, IconPlus, IconDoc, IconTrash,
  downloadAsPDF, AdminHeaderCard, AdminButton,
} from "../user/bmn/components";

// ─── KONFIGURASI API ───────────────────────────────────────────────────────────
// Saat ini komponen masih pakai data contoh (seed) hasil import CSV.
// Kalau backend CodeIgniter sudah siap, tinggal ganti initialStruktur di bawah
// dengan fetch ke endpoint ini, misalnya:
//   const res = await fetch(`${API_URL}/dbr/struktur`);
//   const data = await res.json();
const API_URL = "http://localhost:8080/api";

// ─── STRUKTUR ORGANISASI BIMAS KRISTEN ────────────────────────────────────────
// Level 1: Eselon I  — Pimpinan (Dirjen)
// Level 2: Eselon II — Sekretariat, Direktorat Urusan Agama, Direktorat Pendidikan
// Level 3: Bagian / Subdit — tiap bagian punya daftar barang (DBR)
//
// Data di bawah adalah hasil olah dari DBR_Data_lt_10_FIX.csv (data barang milik
// pribadi per-pegawai). Baris "Fungsi" (Ruang Meeting, dsb — barang bersama per
// ruangan/fungsi) SENGAJA belum dimasukkan karena datanya belum final, sesuai
// arahan. Tinggal tambah field/level "fungsi" di setiap bagian kalau nanti siap.
const initialStruktur = [
  {
    "id": "dirjen",
    "nama": "Pimpinan Direktorat Jenderal Bimbingan Masyarakat Kristen",
    "label": "Eselon I",
    "warna": "#b91c1c",
    "warnaBg": "#fef2f2",
    "bagian": [
      {
        "id": "ruang-dirjen",
        "nama": "Ruang Kerja Direktur Jenderal",
        "barang": [
          {
            "id": 1,
            "nama": "Alat Musik Modern/Band",
            "nup": "6.02.01.01.002.22",
            "kondisi": "Baik",
            "pegawai": "Dr. Jeane Marie Tulung, S.Th, M.Pd.",
            "nip": "197101152001122001",
            "jabatan": "Direktur Jenderal Bimbingan Masyarakat Kristen",
            "no": 1
          },
          {
            "id": 2,
            "nama": "Partisi",
            "nup": "3.05.02.01.002.29",
            "kondisi": "Baik",
            "pegawai": "Dr. Jeane Marie Tulung, S.Th, M.Pd.",
            "nip": "197101152001122001",
            "jabatan": "Direktur Jenderal Bimbingan Masyarakat Kristen",
            "no": 2
          },
          {
            "id": 3,
            "nama": "Meja Rapat Modul",
            "nup": "3.05.02.01.008.9",
            "kondisi": "Baik",
            "pegawai": "Dr. Jeane Marie Tulung, S.Th, M.Pd.",
            "nip": "197101152001122001",
            "jabatan": "Direktur Jenderal Bimbingan Masyarakat Kristen",
            "no": 3
          },
          {
            "id": 4,
            "nama": "Kursi Besi/Metal",
            "nup": "3.05.02.01.003.732",
            "kondisi": "Baik",
            "pegawai": "Dr. Jeane Marie Tulung, S.Th, M.Pd.",
            "nip": "197101152001122001",
            "jabatan": "Direktur Jenderal Bimbingan Masyarakat Kristen",
            "no": 4
          },
          {
            "id": 5,
            "nama": "Kursi Besi/Metal",
            "nup": "3.05.02.01.003.731",
            "kondisi": "Baik",
            "pegawai": "Dr. Jeane Marie Tulung, S.Th, M.Pd.",
            "nip": "197101152001122001",
            "jabatan": "Direktur Jenderal Bimbingan Masyarakat Kristen",
            "no": 5
          },
          {
            "id": 6,
            "nama": "Kursi Besi/Metal",
            "nup": "3.05.02.01.003.734",
            "kondisi": "Baik",
            "pegawai": "Dr. Jeane Marie Tulung, S.Th, M.Pd.",
            "nip": "197101152001122001",
            "jabatan": "Direktur Jenderal Bimbingan Masyarakat Kristen",
            "no": 6
          },
          {
            "id": 7,
            "nama": "Kursi Besi/Metal",
            "nup": "3.05.02.01.003.739",
            "kondisi": "Baik",
            "pegawai": "Dr. Jeane Marie Tulung, S.Th, M.Pd.",
            "nip": "197101152001122001",
            "jabatan": "Direktur Jenderal Bimbingan Masyarakat Kristen",
            "no": 7
          },
          {
            "id": 8,
            "nama": "Kursi Besi/Metal",
            "nup": "3.05.02.01.003.735",
            "kondisi": "Baik",
            "pegawai": "Dr. Jeane Marie Tulung, S.Th, M.Pd.",
            "nip": "197101152001122001",
            "jabatan": "Direktur Jenderal Bimbingan Masyarakat Kristen",
            "no": 8
          },
          {
            "id": 9,
            "nama": "Kursi Besi/Metal",
            "nup": "3.05.02.01.003.730",
            "kondisi": "Baik",
            "pegawai": "Dr. Jeane Marie Tulung, S.Th, M.Pd.",
            "nip": "197101152001122001",
            "jabatan": "Direktur Jenderal Bimbingan Masyarakat Kristen",
            "no": 9
          },
          {
            "id": 10,
            "nama": "Kursi Besi/Metal",
            "nup": "3.05.02.01.003.738",
            "kondisi": "Baik",
            "pegawai": "Dr. Jeane Marie Tulung, S.Th, M.Pd.",
            "nip": "197101152001122001",
            "jabatan": "Direktur Jenderal Bimbingan Masyarakat Kristen",
            "no": 10
          },
          {
            "id": 11,
            "nama": "Kursi Besi/Metal",
            "nup": "3.05.02.01.003.736",
            "kondisi": "Baik",
            "pegawai": "Dr. Jeane Marie Tulung, S.Th, M.Pd.",
            "nip": "197101152001122001",
            "jabatan": "Direktur Jenderal Bimbingan Masyarakat Kristen",
            "no": 11
          },
          {
            "id": 12,
            "nama": "Kursi Besi/Metal",
            "nup": "3.05.02.01.003.733",
            "kondisi": "Baik",
            "pegawai": "Dr. Jeane Marie Tulung, S.Th, M.Pd.",
            "nip": "197101152001122001",
            "jabatan": "Direktur Jenderal Bimbingan Masyarakat Kristen",
            "no": 12
          },
          {
            "id": 13,
            "nama": "Kursi Besi/Metal",
            "nup": "3.05.02.01.003.728",
            "kondisi": "Baik",
            "pegawai": "Dr. Jeane Marie Tulung, S.Th, M.Pd.",
            "nip": "197101152001122001",
            "jabatan": "Direktur Jenderal Bimbingan Masyarakat Kristen",
            "no": 13
          },
          {
            "id": 14,
            "nama": "Kursi Besi/Metal",
            "nup": "3.05.02.01.003.737",
            "kondisi": "Baik",
            "pegawai": "Dr. Jeane Marie Tulung, S.Th, M.Pd.",
            "nip": "197101152001122001",
            "jabatan": "Direktur Jenderal Bimbingan Masyarakat Kristen",
            "no": 14
          },
          {
            "id": 15,
            "nama": "Kursi Besi/Metal",
            "nup": "3.05.02.01.003.282",
            "kondisi": "Baik",
            "pegawai": "Dr. Jeane Marie Tulung, S.Th, M.Pd.",
            "nip": "197101152001122001",
            "jabatan": "Direktur Jenderal Bimbingan Masyarakat Kristen",
            "no": 15
          },
          {
            "id": 16,
            "nama": "Bufet",
            "nup": "3.05.01.04.013.1",
            "kondisi": "Baik",
            "pegawai": "Dr. Jeane Marie Tulung, S.Th, M.Pd.",
            "nip": "197101152001122001",
            "jabatan": "Direktur Jenderal Bimbingan Masyarakat Kristen",
            "no": 16
          },
          {
            "id": 17,
            "nama": "Televisi",
            "nup": "3.05.02.06.002.24",
            "kondisi": "Baik",
            "pegawai": "Dr. Jeane Marie Tulung, S.Th, M.Pd.",
            "nip": "197101152001122001",
            "jabatan": "Direktur Jenderal Bimbingan Masyarakat Kristen",
            "no": 17
          },
          {
            "id": 18,
            "nama": "Kursi Besi/Metal",
            "nup": "3.05.02.01.003.262",
            "kondisi": "Baik",
            "pegawai": "Dr. Jeane Marie Tulung, S.Th, M.Pd.",
            "nip": "197101152001122001",
            "jabatan": "Direktur Jenderal Bimbingan Masyarakat Kristen",
            "no": 18
          },
          {
            "id": 19,
            "nama": "Kursi Besi/Metal",
            "nup": "3.05.02.01.003.263",
            "kondisi": "Baik",
            "pegawai": "Dr. Jeane Marie Tulung, S.Th, M.Pd.",
            "nip": "197101152001122001",
            "jabatan": "Direktur Jenderal Bimbingan Masyarakat Kristen",
            "no": 19
          },
          {
            "id": 20,
            "nama": "Lemari ES",
            "nup": "3.05.02.04.001.3",
            "kondisi": "Baik",
            "pegawai": "Dr. Jeane Marie Tulung, S.Th, M.Pd.",
            "nip": "197101152001122001",
            "jabatan": "Direktur Jenderal Bimbingan Masyarakat Kristen",
            "no": 20
          },
          {
            "id": 21,
            "nama": "Meja Kerja Kayu",
            "nup": "3.05.02.01.002.246",
            "kondisi": "Baik",
            "pegawai": "Dr. Jeane Marie Tulung, S.Th, M.Pd.",
            "nip": "197101152001122001",
            "jabatan": "Direktur Jenderal Bimbingan Masyarakat Kristen",
            "no": 21
          },
          {
            "id": 22,
            "nama": "Jam Mekanis Merk Junghans",
            "nup": "3.05.02.02.001.4",
            "kondisi": "Baik",
            "pegawai": "Dr. Jeane Marie Tulung, S.Th, M.Pd.",
            "nip": "197101152001122001",
            "jabatan": "Direktur Jenderal Bimbingan Masyarakat Kristen",
            "no": 22
          },
          {
            "id": 23,
            "nama": "Portable Air Conditioner (Alat Pendingin) Merk 1,5 PK",
            "nup": "3.05.02.04.005.1",
            "kondisi": "Baik",
            "pegawai": "Dr. Jeane Marie Tulung, S.Th, M.Pd.",
            "nip": "197101152001122001",
            "jabatan": "Direktur Jenderal Bimbingan Masyarakat Kristen",
            "no": 23
          },
          {
            "id": 24,
            "nama": "Televisi LG",
            "nup": "3.05.02.06.002.31",
            "kondisi": "Baik",
            "pegawai": "Dr. Jeane Marie Tulung, S.Th, M.Pd.",
            "nip": "197101152001122001",
            "jabatan": "Direktur Jenderal Bimbingan Masyarakat Kristen",
            "no": 24
          },
          {
            "id": 25,
            "nama": "Meja Kerja Kayu",
            "nup": "3.05.02.01.002.260",
            "kondisi": "Baik",
            "pegawai": "Dr. Jeane Marie Tulung, S.Th, M.Pd.",
            "nip": "197101152001122001",
            "jabatan": "Direktur Jenderal Bimbingan Masyarakat Kristen",
            "no": 25
          },
          {
            "id": 26,
            "nama": "Kursi Besi/Metal",
            "nup": "3.05.02.01.003.627",
            "kondisi": "Baik",
            "pegawai": "Dr. Jeane Marie Tulung, S.Th, M.Pd.",
            "nip": "197101152001122001",
            "jabatan": "Direktur Jenderal Bimbingan Masyarakat Kristen",
            "no": 26
          },
          {
            "id": 27,
            "nama": "Kursi Besi/Metal",
            "nup": "3.05.02.01.003.626",
            "kondisi": "Baik",
            "pegawai": "Dr. Jeane Marie Tulung, S.Th, M.Pd.",
            "nip": "197101152001122001",
            "jabatan": "Direktur Jenderal Bimbingan Masyarakat Kristen",
            "no": 27
          },
          {
            "id": 28,
            "nama": "CCTV",
            "nup": "0",
            "kondisi": "Baik",
            "pegawai": "Dr. Jeane Marie Tulung, S.Th, M.Pd.",
            "nip": "197101152001122001",
            "jabatan": "Direktur Jenderal Bimbingan Masyarakat Kristen",
            "no": 28
          },
          {
            "id": 29,
            "nama": "Rumah Dinas Ciputat",
            "nup": "3.05.01.05.007.3",
            "kondisi": "Baik",
            "pegawai": "Dr. Jeane Marie Tulung, S.Th, M.Pd.",
            "nip": "197101152001122001",
            "jabatan": "Direktur Jenderal Bimbingan Masyarakat Kristen",
            "no": 29
          },
          {
            "id": 30,
            "nama": "Meja Kerja Kayu",
            "nup": "3.05.02.01.002.259",
            "kondisi": "Baik",
            "pegawai": "Dr. Jeane Marie Tulung, S.Th, M.Pd.",
            "nip": "197101152001122001",
            "jabatan": "Direktur Jenderal Bimbingan Masyarakat Kristen",
            "no": 30
          },
          {
            "id": 31,
            "nama": "Kursi Besi/Metal",
            "nup": "3.05.02.01.003.752",
            "kondisi": "Baik",
            "pegawai": "Dr. Jeane Marie Tulung, S.Th, M.Pd.",
            "nip": "197101152001122001",
            "jabatan": "Direktur Jenderal Bimbingan Masyarakat Kristen",
            "no": 31
          },
          {
            "id": 32,
            "nama": "Lemari Besi Metal Lion",
            "nup": "3.05.01.04.001.94",
            "kondisi": "Baik",
            "pegawai": "Dr. Jeane Marie Tulung, S.Th, M.Pd.",
            "nip": "197101152001122001",
            "jabatan": "Direktur Jenderal Bimbingan Masyarakat Kristen",
            "no": 32
          },
          {
            "id": 33,
            "nama": "Lemari Kayu",
            "nup": "3.05.01.04.002.86",
            "kondisi": "Baik",
            "pegawai": "Dr. Jeane Marie Tulung, S.Th, M.Pd.",
            "nip": "197101152001122001",
            "jabatan": "Direktur Jenderal Bimbingan Masyarakat Kristen",
            "no": 33
          },
          {
            "id": 34,
            "nama": "Tempat Tidur Kayu 120 x 120",
            "nup": "3.05.02.01.011.5",
            "kondisi": "Baik",
            "pegawai": "Dr. Jeane Marie Tulung, S.Th, M.Pd.",
            "nip": "197101152001122001",
            "jabatan": "Direktur Jenderal Bimbingan Masyarakat Kristen",
            "no": 34
          },
          {
            "id": 35,
            "nama": "Heater",
            "nup": "3.05.06.055.2",
            "kondisi": "Baik",
            "pegawai": "Dr. Jeane Marie Tulung, S.Th, M.Pd.",
            "nip": "197101152001122001",
            "jabatan": "Direktur Jenderal Bimbingan Masyarakat Kristen",
            "no": 35
          },
          {
            "id": 36,
            "nama": "Printer Merk HP Laserjet Pro 4003 dn",
            "nup": "3.10.02.03.003.208",
            "kondisi": "Baik",
            "pegawai": "Dr. Jeane Marie Tulung, S.Th, M.Pd.",
            "nip": "197101152001122001",
            "jabatan": "Direktur Jenderal Bimbingan Masyarakat Kristen",
            "no": 36
          },
          {
            "id": 37,
            "nama": "Printer Merk HP Laserjet Pro 4003 dn",
            "nup": "3.10.02.03.003.209",
            "kondisi": "Baik",
            "pegawai": "Dr. Jeane Marie Tulung, S.Th, M.Pd.",
            "nip": "197101152001122001",
            "jabatan": "Direktur Jenderal Bimbingan Masyarakat Kristen",
            "no": 37
          },
          {
            "id": 38,
            "nama": "Kursi Zis",
            "nup": "3.07.01.04.108.6",
            "kondisi": "Baik",
            "pegawai": "Dr. Jeane Marie Tulung, S.Th, M.Pd.",
            "nip": "197101152001122001",
            "jabatan": "Direktur Jenderal Bimbingan Masyarakat Kristen",
            "no": 38
          },
          {
            "id": 39,
            "nama": "Meja Kerja Kayu",
            "nup": "3.05.02.01.002.256",
            "kondisi": "Baik",
            "pegawai": "Dr. Jeane Marie Tulung, S.Th, M.Pd.",
            "nip": "197101152001122001",
            "jabatan": "Direktur Jenderal Bimbingan Masyarakat Kristen",
            "no": 39
          },
          {
            "id": 40,
            "nama": "Scanner",
            "nup": "3.10.02.03.004.33",
            "kondisi": "Baik",
            "pegawai": "Dr. Jeane Marie Tulung, S.Th, M.Pd.",
            "nip": "197101152001122001",
            "jabatan": "Direktur Jenderal Bimbingan Masyarakat Kristen",
            "no": 40
          },
          {
            "id": 41,
            "nama": "Lemari Kayu",
            "nup": "3.05.01.04.002.39",
            "kondisi": "Baik",
            "pegawai": "Dr. Jeane Marie Tulung, S.Th, M.Pd.",
            "nip": "197101152001122001",
            "jabatan": "Direktur Jenderal Bimbingan Masyarakat Kristen",
            "no": 41
          },
          {
            "id": 42,
            "nama": "Pengering Tangan",
            "nup": "0",
            "kondisi": "Baik",
            "pegawai": "Dr. Jeane Marie Tulung, S.Th, M.Pd.",
            "nip": "197101152001122001",
            "jabatan": "Direktur Jenderal Bimbingan Masyarakat Kristen",
            "no": 42
          },
          {
            "id": 43,
            "nama": "Meja Kerja Kayu",
            "nup": "0",
            "kondisi": "Baik",
            "pegawai": "Dr. Jeane Marie Tulung, S.Th, M.Pd.",
            "nip": "197101152001122001",
            "jabatan": "Direktur Jenderal Bimbingan Masyarakat Kristen",
            "no": 43
          },
          {
            "id": 44,
            "nama": "Sofa",
            "nup": "3.05.02.01.003.1",
            "kondisi": "Baik",
            "pegawai": "Dr. Jeane Marie Tulung, S.Th, M.Pd.",
            "nip": "197101152001122001",
            "jabatan": "Direktur Jenderal Bimbingan Masyarakat Kristen",
            "no": 44
          }
        ]
      }
    ]
  },
  {
    "id": "sekretariat",
    "nama": "Sekretariat Ditjen Bimas Kristen",
    "label": "Eselon II",
    "warna": "#1d4ed8",
    "warnaBg": "#eff6ff",
    "bagian": [
      {
        "id": "umum-bmn",
        "nama": "Umum dan Barang Milik Negara",
        "barang": [
          {
            "id": 221,
            "nama": "Desktop PC DELL + Keyboard + Mouse *",
            "nup": "0",
            "kondisi": "Baik",
            "pegawai": "Evangel Noelia Sondakh Kawatu SE",
            "nip": "197612112005011004",
            "jabatan": "Arsiparis Ahli Muda",
            "no": 1
          },
          {
            "id": 222,
            "nama": "Kursi Besi/Metal",
            "nup": "3.05.02.01.003.683",
            "kondisi": "Baik",
            "pegawai": "Evangel Noelia Sondakh Kawatu SE",
            "nip": "197612112005011004",
            "jabatan": "Arsiparis Ahli Muda",
            "no": 2
          },
          {
            "id": 223,
            "nama": "Meja Kerja Kayu",
            "nup": "0",
            "kondisi": "Baik",
            "pegawai": "Evangel Noelia Sondakh Kawatu SE",
            "nip": "197612112005011004",
            "jabatan": "Arsiparis Ahli Muda",
            "no": 3
          },
          {
            "id": 224,
            "nama": "Desktop PC DELL + Keyboard + Mouse",
            "nup": "3.10.01.02.001.320",
            "kondisi": "Baik",
            "pegawai": "Roynardo S. Kom., M.Ti.",
            "nip": "197906152009011015",
            "jabatan": "Penata Kelola Sistem dan Teknologi Informasi",
            "no": 4
          },
          {
            "id": 225,
            "nama": "Printer Canon G 3010",
            "nup": "3.10.02.03.003.163",
            "kondisi": "Baik",
            "pegawai": "Roynardo S. Kom., M.Ti.",
            "nip": "197906152009011015",
            "jabatan": "Penata Kelola Sistem dan Teknologi Informasi",
            "no": 5
          },
          {
            "id": 226,
            "nama": "Meja Kerja Kayu",
            "nup": "3.05.02.01.002.320",
            "kondisi": "Baik",
            "pegawai": "Roynardo S. Kom., M.Ti.",
            "nip": "197906152009011015",
            "jabatan": "Penata Kelola Sistem dan Teknologi Informasi",
            "no": 6
          },
          {
            "id": 227,
            "nama": "Kursi Besi/Metal",
            "nup": "3.05.02.01.003.265",
            "kondisi": "Baik",
            "pegawai": "Roynardo S. Kom., M.Ti.",
            "nip": "197906152009011015",
            "jabatan": "Penata Kelola Sistem dan Teknologi Informasi",
            "no": 7
          },
          {
            "id": 228,
            "nama": "0",
            "nup": "0",
            "kondisi": "0",
            "pegawai": "Lefty Nataria Thoro S.Psi.",
            "nip": "198412152011012010",
            "jabatan": "Penata Layanan Operasional",
            "no": 8
          },
          {
            "id": 229,
            "nama": "P.C Unit HP + Keyboard + Mouse",
            "nup": "3.10.01.02.001.275",
            "kondisi": "Baik",
            "pegawai": "Delfion N J Hutabarat S.Th",
            "nip": "198012122009011013",
            "jabatan": "Penata Layanan Operasional",
            "no": 9
          },
          {
            "id": 230,
            "nama": "Printer Merk HP",
            "nup": "3.10.02.03.003.127",
            "kondisi": "Baik",
            "pegawai": "Delfion N J Hutabarat S.Th",
            "nip": "198012122009011013",
            "jabatan": "Penata Layanan Operasional",
            "no": 10
          },
          {
            "id": 231,
            "nama": "Kursi Besi/Metal",
            "nup": "3.05.02.01.003.399",
            "kondisi": "Baik",
            "pegawai": "Delfion N J Hutabarat S.Th",
            "nip": "198012122009011013",
            "jabatan": "Penata Layanan Operasional",
            "no": 11
          },
          {
            "id": 232,
            "nama": "Meja Kerja Kayu",
            "nup": "3.05.02.01.002.282",
            "kondisi": "Baik",
            "pegawai": "Delfion N J Hutabarat S.Th",
            "nip": "198012122009011013",
            "jabatan": "Penata Layanan Operasional",
            "no": 12
          },
          {
            "id": 233,
            "nama": "Meja Kerja Kayu",
            "nup": "3.05.02.01.002.281",
            "kondisi": "Baik",
            "pegawai": "Delfion N J Hutabarat S.Th",
            "nip": "198012122009011013",
            "jabatan": "Penata Layanan Operasional",
            "no": 13
          },
          {
            "id": 234,
            "nama": "Meja Kerja Kayu",
            "nup": "3.05.02.01.002.283",
            "kondisi": "Baik",
            "pegawai": "Delfion N J Hutabarat S.Th",
            "nip": "198012122009011013",
            "jabatan": "Penata Layanan Operasional",
            "no": 14
          },
          {
            "id": 235,
            "nama": "Sice (Sofa)",
            "nup": "3.05.02.01.005.67",
            "kondisi": "Baik",
            "pegawai": "Delfion N J Hutabarat S.Th",
            "nip": "198012122009011013",
            "jabatan": "Penata Layanan Operasional",
            "no": 15
          },
          {
            "id": 236,
            "nama": "Sice (Sofa Seater)",
            "nup": "3.05.02.01.005.31",
            "kondisi": "Baik",
            "pegawai": "Delfion N J Hutabarat S.Th",
            "nip": "198012122009011013",
            "jabatan": "Penata Layanan Operasional",
            "no": 16
          },
          {
            "id": 237,
            "nama": "Sice (Sofa Seater)",
            "nup": "3.05.02.01.005.30",
            "kondisi": "Baik",
            "pegawai": "Delfion N J Hutabarat S.Th",
            "nip": "198012122009011013",
            "jabatan": "Penata Layanan Operasional",
            "no": 17
          },
          {
            "id": 238,
            "nama": "Sice (Sofa Seater)",
            "nup": "3.05.02.01.005.87",
            "kondisi": "Baik",
            "pegawai": "Delfion N J Hutabarat S.Th",
            "nip": "198012122009011013",
            "jabatan": "Penata Layanan Operasional",
            "no": 18
          },
          {
            "id": 239,
            "nama": "Tempat Sampah",
            "nup": "",
            "kondisi": "Baik",
            "pegawai": "Delfion N J Hutabarat S.Th",
            "nip": "198012122009011013",
            "jabatan": "Penata Layanan Operasional",
            "no": 19
          },
          {
            "id": 240,
            "nama": "Dispenser Air Maspion",
            "nup": "",
            "kondisi": "Baik",
            "pegawai": "Delfion N J Hutabarat S.Th",
            "nip": "198012122009011013",
            "jabatan": "Penata Layanan Operasional",
            "no": 20
          },
          {
            "id": 241,
            "nama": "Lemari & Meja Komputer",
            "nup": "3.05.02.01.009.43",
            "kondisi": "Baik",
            "pegawai": "Delfion N J Hutabarat S.Th",
            "nip": "198012122009011013",
            "jabatan": "Penata Layanan Operasional",
            "no": 21
          },
          {
            "id": 242,
            "nama": "Meja Kerja Kayu",
            "nup": "3.05.02.01.002.245",
            "kondisi": "Baik",
            "pegawai": "Delfion N J Hutabarat S.Th",
            "nip": "198012122009011013",
            "jabatan": "Penata Layanan Operasional",
            "no": 22
          },
          {
            "id": 243,
            "nama": "Lemari Besi/Metal Merk Modera",
            "nup": "3.05.01.04.001.102",
            "kondisi": "Baik",
            "pegawai": "Delfion N J Hutabarat S.Th",
            "nip": "198012122009011013",
            "jabatan": "Penata Layanan Operasional",
            "no": 23
          },
          {
            "id": 244,
            "nama": "Sice Merk Meja Tamu",
            "nup": "3.05.02.01.005.66",
            "kondisi": "Baik",
            "pegawai": "Delfion N J Hutabarat S.Th",
            "nip": "198012122009011013",
            "jabatan": "Penata Layanan Operasional",
            "no": 24
          },
          {
            "id": 245,
            "nama": "Kursi Besi/Metal",
            "nup": "3.05.02.01.003.359",
            "kondisi": "Baik",
            "pegawai": "Delfion N J Hutabarat S.Th",
            "nip": "198012122009011013",
            "jabatan": "Penata Layanan Operasional",
            "no": 25
          },
          {
            "id": 246,
            "nama": "Meja Kerja/Kayu",
            "nup": "3.05.02.01.002.280",
            "kondisi": "Baik",
            "pegawai": "Arie Wibowo ,S.Pd.K",
            "nip": "197507242005011004",
            "jabatan": "Penata Layanan Operasional",
            "no": 26
          },
          {
            "id": 247,
            "nama": "Printer HP Laserjet Pro 100 Color",
            "nup": "3.10.02.03.003.139",
            "kondisi": "Baik",
            "pegawai": "Arie Wibowo ,S.Pd.K",
            "nip": "197507242005011004",
            "jabatan": "Penata Layanan Operasional",
            "no": 27
          },
          {
            "id": 248,
            "nama": "Kursi Besi/Metal",
            "nup": "3.05.02.01.003.369",
            "kondisi": "Baik",
            "pegawai": "Arie Wibowo ,S.Pd.K",
            "nip": "197507242005011004",
            "jabatan": "Penata Layanan Operasional",
            "no": 28
          },
          {
            "id": 249,
            "nama": "Desktop PC DELL + Keyboard + Mouse",
            "nup": "3.10.01.02.001.318",
            "kondisi": "Baik",
            "pegawai": "Maria Natalina Saragih S.Tp.",
            "nip": "199012102024212047",
            "jabatan": "Arsiparis Ahli Pertama",
            "no": 29
          },
          {
            "id": 250,
            "nama": "Printer Laser Jet M1132 MFP",
            "nup": "3.10.02.03.003.93",
            "kondisi": "Baik",
            "pegawai": "Maria Natalina Saragih S.Tp.",
            "nip": "199012102024212047",
            "jabatan": "Arsiparis Ahli Pertama",
            "no": 30
          },
          {
            "id": 251,
            "nama": "Scanner KODAK S2050",
            "nup": "3.10.02.03.004.43",
            "kondisi": "Baik",
            "pegawai": "Maria Natalina Saragih S.Tp.",
            "nip": "199012102024212047",
            "jabatan": "Arsiparis Ahli Pertama",
            "no": 31
          },
          {
            "id": 252,
            "nama": "Kursi Besi/Metal",
            "nup": "3.05.02.01.003.366",
            "kondisi": "Baik",
            "pegawai": "Maria Natalina Saragih S.Tp.",
            "nip": "199012102024212047",
            "jabatan": "Arsiparis Ahli Pertama",
            "no": 32
          },
          {
            "id": 253,
            "nama": "Desktop PC DELL + Keyboard + Mouse",
            "nup": "3.10.01.02.001.323",
            "kondisi": "Baik",
            "pegawai": "Carles Halawa S.Th",
            "nip": "199009092025211008",
            "jabatan": "Arsiparis Ahli Pertama",
            "no": 33
          },
          {
            "id": 254,
            "nama": "Kursi Besi/Metal",
            "nup": "3.05.02.01.003.582",
            "kondisi": "Baik",
            "pegawai": "Carles Halawa S.Th",
            "nip": "199009092025211008",
            "jabatan": "Arsiparis Ahli Pertama",
            "no": 34
          },
          {
            "id": 255,
            "nama": "Desktop PC HP + Keyboard + Mouse",
            "nup": "3.10.01.02.001.263",
            "kondisi": "Baik",
            "pegawai": "Olin Mawar Kristianty S.Ak",
            "nip": "200005102025052009",
            "jabatan": "Pengelola Pengadaan Barang/Jasa Ahli Pertama",
            "no": 35
          },
          {
            "id": 256,
            "nama": "Meja Kerja Kayu",
            "nup": "3.05.02.01.002.322",
            "kondisi": "Baik",
            "pegawai": "Olin Mawar Kristianty S.Ak",
            "nip": "200005102025052009",
            "jabatan": "Pengelola Pengadaan Barang/Jasa Ahli Pertama",
            "no": 36
          },
          {
            "id": 257,
            "nama": "Kursi Besi/Metal",
            "nup": "3.05.02.01.003.368",
            "kondisi": "Baik",
            "pegawai": "Olin Mawar Kristianty S.Ak",
            "nip": "200005102025052009",
            "jabatan": "Pengelola Pengadaan Barang/Jasa Ahli Pertama",
            "no": 37
          },
          {
            "id": 258,
            "nama": "Desktop PC HP 200 Pro + Keyboard + Mouse",
            "nup": "3.10.01.02.001.334",
            "kondisi": "Baik",
            "pegawai": "Niar Ningsih Sabara S.P.",
            "nip": "199704232025052002",
            "jabatan": "Pengelola Pengadaan Barang/Jasa Ahli Pertama",
            "no": 38
          },
          {
            "id": 259,
            "nama": "Meja Kerja Kayu",
            "nup": "3.05.02.01.002.321",
            "kondisi": "Baik",
            "pegawai": "Niar Ningsih Sabara S.P.",
            "nip": "199704232025052002",
            "jabatan": "Pengelola Pengadaan Barang/Jasa Ahli Pertama",
            "no": 39
          },
          {
            "id": 260,
            "nama": "Kursi Besi/Metal",
            "nup": "3.05.02.01.003.676",
            "kondisi": "Baik",
            "pegawai": "Niar Ningsih Sabara S.P.",
            "nip": "199704232025052002",
            "jabatan": "Pengelola Pengadaan Barang/Jasa Ahli Pertama",
            "no": 40
          },
          {
            "id": 261,
            "nama": "Desktop PC HP 200 Pro + Keyboard + Mouse",
            "nup": "3.10.01.02.001.335",
            "kondisi": "Baik",
            "pegawai": "Lidya Septaria Sinurat S.Si.",
            "nip": "200009202025052009",
            "jabatan": "Pengelola Pengadaan Barang/Jasa Ahli Pertama",
            "no": 41
          },
          {
            "id": 262,
            "nama": "Meja Kerja Kayu",
            "nup": "3.05.02.01.002.316",
            "kondisi": "Baik",
            "pegawai": "Lidya Septaria Sinurat S.Si.",
            "nip": "200009202025052009",
            "jabatan": "Pengelola Pengadaan Barang/Jasa Ahli Pertama",
            "no": 42
          },
          {
            "id": 263,
            "nama": "Kursi Besi/Metal",
            "nup": "3.05.02.01.003.370",
            "kondisi": "Baik",
            "pegawai": "Lidya Septaria Sinurat S.Si.",
            "nip": "200009202025052009",
            "jabatan": "Pengelola Pengadaan Barang/Jasa Ahli Pertama",
            "no": 43
          },
          {
            "id": 264,
            "nama": "Meja Kerja Kayu",
            "nup": "3.05.02.01.002.317",
            "kondisi": "Baik",
            "pegawai": "Tabita Marsella Silaen S.P.",
            "nip": "200207072025052004",
            "jabatan": "Pengelola Pengadaan Barang/Jasa Ahli Pertama",
            "no": 44
          },
          {
            "id": 265,
            "nama": "Desktop PC HP + Keyboard + Mouse",
            "nup": "3.10.01.02.001.270",
            "kondisi": "Baik",
            "pegawai": "Tabita Marsella Silaen S.P.",
            "nip": "200207072025052004",
            "jabatan": "Pengelola Pengadaan Barang/Jasa Ahli Pertama",
            "no": 45
          },
          {
            "id": 266,
            "nama": "Scanner Plustek Smart Office PS283",
            "nup": "3.10.02.03.004.50",
            "kondisi": "Baik",
            "pegawai": "Tabita Marsella Silaen S.P.",
            "nip": "200207072025052004",
            "jabatan": "Pengelola Pengadaan Barang/Jasa Ahli Pertama",
            "no": 46
          },
          {
            "id": 267,
            "nama": "Kursi Besi/Metal",
            "nup": "3.05.02.01.003.373",
            "kondisi": "Baik",
            "pegawai": "Tabita Marsella Silaen S.P.",
            "nip": "200207072025052004",
            "jabatan": "Pengelola Pengadaan Barang/Jasa Ahli Pertama",
            "no": 47
          },
          {
            "id": 268,
            "nama": "0",
            "nup": "0",
            "kondisi": "0",
            "pegawai": "Rondonuwu Ester Faleria S.E",
            "nip": "199605282025052004",
            "jabatan": "Pengelola Pengadaan Barang/Jasa Ahli Pertama",
            "no": 48
          },
          {
            "id": 269,
            "nama": "Desktop PC HP + Keyboard + Mouse",
            "nup": "3.10.01.02.001.279",
            "kondisi": "Baik",
            "pegawai": "Martha Fransiska Manalu S.E.",
            "nip": "199705192025052002",
            "jabatan": "Pengelola Pengadaan Barang/Jasa Ahli Pertama",
            "no": 49
          },
          {
            "id": 270,
            "nama": "Meja Kerja Kayu",
            "nup": "3.05.02.01.002.318",
            "kondisi": "Baik",
            "pegawai": "Martha Fransiska Manalu S.E.",
            "nip": "199705192025052002",
            "jabatan": "Pengelola Pengadaan Barang/Jasa Ahli Pertama",
            "no": 50
          },
          {
            "id": 271,
            "nama": "Scanner KODAK S2050",
            "nup": "3.10.02.03.004.42",
            "kondisi": "Baik",
            "pegawai": "Martha Fransiska Manalu S.E.",
            "nip": "199705192025052002",
            "jabatan": "Pengelola Pengadaan Barang/Jasa Ahli Pertama",
            "no": 51
          },
          {
            "id": 272,
            "nama": "Kursi Besi/Metal",
            "nup": "3.05.02.01.003.390",
            "kondisi": "Baik",
            "pegawai": "Martha Fransiska Manalu S.E.",
            "nip": "199705192025052002",
            "jabatan": "Pengelola Pengadaan Barang/Jasa Ahli Pertama",
            "no": 52
          }
        ]
      },
      {
        "id": "tu-pimpinan",
        "nama": "Tata Usaha Pimpinan",
        "barang": [
          {
            "id": 45,
            "nama": "Kursi Besi/Metal",
            "nup": "3.05.02.01.003.543",
            "kondisi": "Baik",
            "pegawai": "Johni Tilaar S.Th, M.Si.",
            "nip": "196901181989021001",
            "jabatan": "Sekretaris",
            "no": 1
          },
          {
            "id": 46,
            "nama": "Kursi Besi/Metal",
            "nup": "3.05.02.01.003.551",
            "kondisi": "Baik",
            "pegawai": "Johni Tilaar S.Th, M.Si.",
            "nip": "196901181989021001",
            "jabatan": "Sekretaris",
            "no": 2
          },
          {
            "id": 47,
            "nama": "Kursi Besi/Metal",
            "nup": "3.05.02.01.003.548",
            "kondisi": "Baik",
            "pegawai": "Johni Tilaar S.Th, M.Si.",
            "nip": "196901181989021001",
            "jabatan": "Sekretaris",
            "no": 3
          },
          {
            "id": 48,
            "nama": "Kursi Besi/Metal",
            "nup": "3.05.02.01.003.545",
            "kondisi": "Baik",
            "pegawai": "Johni Tilaar S.Th, M.Si.",
            "nip": "196901181989021001",
            "jabatan": "Sekretaris",
            "no": 4
          },
          {
            "id": 49,
            "nama": "Kursi Besi/Metal",
            "nup": "3.05.02.01.003.550",
            "kondisi": "Baik",
            "pegawai": "Johni Tilaar S.Th, M.Si.",
            "nip": "196901181989021001",
            "jabatan": "Sekretaris",
            "no": 5
          },
          {
            "id": 50,
            "nama": "Kursi Besi/Metal",
            "nup": "3.05.02.01.003.549",
            "kondisi": "Baik",
            "pegawai": "Johni Tilaar S.Th, M.Si.",
            "nip": "196901181989021001",
            "jabatan": "Sekretaris",
            "no": 6
          },
          {
            "id": 51,
            "nama": "Kursi Besi/Metal",
            "nup": "3.05.02.01.003.543",
            "kondisi": "Baik",
            "pegawai": "Johni Tilaar S.Th, M.Si.",
            "nip": "196901181989021001",
            "jabatan": "Sekretaris",
            "no": 7
          },
          {
            "id": 52,
            "nama": "Meja Rapat",
            "nup": "3.15.02.01.008. 10",
            "kondisi": "Baik",
            "pegawai": "Johni Tilaar S.Th, M.Si.",
            "nip": "196901181989021001",
            "jabatan": "Sekretaris",
            "no": 8
          },
          {
            "id": 53,
            "nama": "Sice Meja Tamu",
            "nup": "3.05.02.01.005.11",
            "kondisi": "Baik",
            "pegawai": "Johni Tilaar S.Th, M.Si.",
            "nip": "196901181989021001",
            "jabatan": "Sekretaris",
            "no": 9
          },
          {
            "id": 54,
            "nama": "Sice Sofa Tamu",
            "nup": "3.05.02.01.005.83",
            "kondisi": "Baik",
            "pegawai": "Johni Tilaar S.Th, M.Si.",
            "nip": "196901181989021001",
            "jabatan": "Sekretaris",
            "no": 10
          },
          {
            "id": 55,
            "nama": "Foto Presiden 2024",
            "nup": "0",
            "kondisi": "Baik",
            "pegawai": "Johni Tilaar S.Th, M.Si.",
            "nip": "196901181989021001",
            "jabatan": "Sekretaris",
            "no": 11
          },
          {
            "id": 56,
            "nama": "Foto Wapres 2024",
            "nup": "0",
            "kondisi": "Baik",
            "pegawai": "Johni Tilaar S.Th, M.Si.",
            "nip": "196901181989021001",
            "jabatan": "Sekretaris",
            "no": 12
          },
          {
            "id": 57,
            "nama": "Lambang Burung Garuda",
            "nup": "0",
            "kondisi": "Baik",
            "pegawai": "Johni Tilaar S.Th, M.Si.",
            "nip": "196901181989021001",
            "jabatan": "Sekretaris",
            "no": 13
          },
          {
            "id": 71,
            "nama": "0",
            "nup": "0",
            "kondisi": "0",
            "pegawai": "Netaniel S.Kom",
            "nip": "197911022009011005",
            "jabatan": "Penata Layanan Operasional",
            "no": 14
          },
          {
            "id": 72,
            "nama": "Kursi Besi/Metal",
            "nup": "3.05.02.01.003.621",
            "kondisi": "Baik",
            "pegawai": "Eva Christa Waworuntu S.Ak",
            "nip": "199612192020122013",
            "jabatan": "Penata Layanan Operasional",
            "no": 15
          },
          {
            "id": 73,
            "nama": "Meja Kerja Kayu",
            "nup": "3.05.02.01.002.312",
            "kondisi": "Baik",
            "pegawai": "Eva Christa Waworuntu S.Ak",
            "nip": "199612192020122013",
            "jabatan": "Penata Layanan Operasional",
            "no": 16
          },
          {
            "id": 74,
            "nama": "PC unit",
            "nup": "3.10.01.02.001.261",
            "kondisi": "Baik",
            "pegawai": "Eva Christa Waworuntu S.Ak",
            "nip": "199612192020122013",
            "jabatan": "Penata Layanan Operasional",
            "no": 17
          },
          {
            "id": 75,
            "nama": "Filling Cabinet Kecil",
            "nup": "0",
            "kondisi": "Baik",
            "pegawai": "Eva Christa Waworuntu S.Ak",
            "nip": "199612192020122013",
            "jabatan": "Penata Layanan Operasional",
            "no": 18
          },
          {
            "id": 76,
            "nama": "Kursi Besi/Metal",
            "nup": "3.05.02.01.003.540",
            "kondisi": "Baik",
            "pegawai": "Desy Zusuy Sianipar S.E",
            "nip": "199512232022032003",
            "jabatan": "Penata Layanan Operasional",
            "no": 19
          },
          {
            "id": 77,
            "nama": "Meja Kerja Kayu",
            "nup": "3.05.02.01.002.315",
            "kondisi": "Baik",
            "pegawai": "Desy Zusuy Sianipar S.E",
            "nip": "199512232022032003",
            "jabatan": "Penata Layanan Operasional",
            "no": 20
          },
          {
            "id": 78,
            "nama": "PC unit",
            "nup": "3.10.01.02.001.271",
            "kondisi": "Baik",
            "pegawai": "Desy Zusuy Sianipar S.E",
            "nip": "199512232022032003",
            "jabatan": "Penata Layanan Operasional",
            "no": 21
          },
          {
            "id": 79,
            "nama": "Filling Cabinet Kecil",
            "nup": "0",
            "kondisi": "Baik",
            "pegawai": "Desy Zusuy Sianipar S.E",
            "nip": "199512232022032003",
            "jabatan": "Penata Layanan Operasional",
            "no": 22
          },
          {
            "id": 139,
            "nama": "0",
            "nup": "0",
            "kondisi": "0",
            "pegawai": "Marlina Puspasiskania, S.E.",
            "nip": "198309012008012014",
            "jabatan": "Penata Layanan Operasional",
            "no": 23
          },
          {
            "id": 140,
            "nama": "0",
            "nup": "0",
            "kondisi": "0",
            "pegawai": "Betty, S.E.",
            "nip": "197810172009012007",
            "jabatan": "Penata Layanan Operasional",
            "no": 24
          },
          {
            "id": 141,
            "nama": "0",
            "nup": "0",
            "kondisi": "0",
            "pegawai": "Susanti, S.T.",
            "nip": "198304202009012009",
            "jabatan": "Penata Layanan Operasional",
            "no": 25
          },
          {
            "id": 142,
            "nama": "0",
            "nup": "0",
            "kondisi": "0",
            "pegawai": "Lestari Noviany , S.E.",
            "nip": "198005092005012003",
            "jabatan": "Penata Layanan Operasional",
            "no": 26
          },
          {
            "id": 143,
            "nama": "Printer HP",
            "nup": "3.10.02.03.003.102",
            "kondisi": "Baik",
            "pegawai": "Silvia R. Panjaitan S.E",
            "nip": "199003202022032001",
            "jabatan": "Penata Layanan Operasional",
            "no": 27
          },
          {
            "id": 144,
            "nama": "Filling Cabine Kecil",
            "nup": "0",
            "kondisi": "Baik",
            "pegawai": "Silvia R. Panjaitan S.E",
            "nip": "199003202022032001",
            "jabatan": "Penata Layanan Operasional",
            "no": 28
          },
          {
            "id": 145,
            "nama": "Laptop axioo mybook Pro N",
            "nup": "3.10.01.02.002.255",
            "kondisi": "Baik",
            "pegawai": "Silvia R. Panjaitan S.E",
            "nip": "199003202022032001",
            "jabatan": "Penata Layanan Operasional",
            "no": 29
          },
          {
            "id": 146,
            "nama": "Kursi Besi/Metal",
            "nup": "3.05.02.01.003.542",
            "kondisi": "Baik",
            "pegawai": "Silvia R. Panjaitan S.E",
            "nip": "199003202022032001",
            "jabatan": "Penata Layanan Operasional",
            "no": 30
          },
          {
            "id": 187,
            "nama": "Kursi Besi/Metal",
            "nup": "3.05.02.01.003.375",
            "kondisi": "Baik",
            "pegawai": "Joseph Zacharias, S.E.",
            "nip": "197409252005011004",
            "jabatan": "Penata Layanan Operasional",
            "no": 31
          },
          {
            "id": 188,
            "nama": "Meja Kerja Kayu",
            "nup": "3.05.02.01.002.287",
            "kondisi": "Baik",
            "pegawai": "Joseph Zacharias, S.E.",
            "nip": "197409252005011004",
            "jabatan": "Penata Layanan Operasional",
            "no": 32
          }
        ]
      },
      {
        "id": "evaluasi",
        "nama": "Evaluasi dan Pelaporan",
        "barang": [
          {
            "id": 87,
            "nama": "Desktop PC HP + Keyboard +Mouse",
            "nup": "3.10.01.02.001.286",
            "kondisi": "Baik",
            "pegawai": "Kristendo Damanik S.Th",
            "nip": "198804072020121005",
            "jabatan": "Penelaah Teknis Kebijakan",
            "no": 1
          },
          {
            "id": 88,
            "nama": "Kursi Besi/Metal",
            "nup": "3.05.02.01.003.573",
            "kondisi": "Baik",
            "pegawai": "Kristendo Damanik S.Th",
            "nip": "198804072020121005",
            "jabatan": "Penelaah Teknis Kebijakan",
            "no": 2
          },
          {
            "id": 89,
            "nama": "Printer",
            "nup": "3.10.02.03.003.153",
            "kondisi": "Baik",
            "pegawai": "Kristendo Damanik S.Th",
            "nip": "198804072020121005",
            "jabatan": "Penelaah Teknis Kebijakan",
            "no": 3
          },
          {
            "id": 90,
            "nama": "Desktop PC HP + Keyboard +Mouse",
            "nup": "0",
            "kondisi": "Baik",
            "pegawai": "Aufar Suldora Putra S.Pd.",
            "nip": "199609172023211008",
            "jabatan": "Statistisi Ahli Pertama",
            "no": 4
          },
          {
            "id": 91,
            "nama": "Kursi Besi/Metal",
            "nup": "3.05.02.01.003.536",
            "kondisi": "Baik",
            "pegawai": "Aufar Suldora Putra S.Pd.",
            "nip": "199609172023211008",
            "jabatan": "Statistisi Ahli Pertama",
            "no": 5
          },
          {
            "id": 92,
            "nama": "Kursi Besi/Metal",
            "nup": "3.05.02.01.003.553",
            "kondisi": "Baik",
            "pegawai": "Krismawati S.Pd",
            "nip": "199810162025052007",
            "jabatan": "Statistisi Ahli Pertama",
            "no": 6
          },
          {
            "id": 93,
            "nama": "Meja Kerja Kayu untuk 4 orang",
            "nup": "0",
            "kondisi": "Baik",
            "pegawai": "Krismawati S.Pd",
            "nip": "199810162025052007",
            "jabatan": "Statistisi Ahli Pertama",
            "no": 7
          },
          {
            "id": 94,
            "nama": "0",
            "nup": "0",
            "kondisi": "0",
            "pegawai": "Sara Gracia Manurung S.Pd",
            "nip": "199511242025052002",
            "jabatan": "Statistisi Ahli Pertama",
            "no": 8
          },
          {
            "id": 135,
            "nama": "Kursi Besi/Metal",
            "nup": "3.05.02.01.003.589",
            "kondisi": "Baik",
            "pegawai": "Mulatua ,S.Sos., M.Si.",
            "nip": "197407232005011006",
            "jabatan": "Penelaah Teknis Kebijakan",
            "no": 9
          },
          {
            "id": 136,
            "nama": "Laptop DELL Latitude 3480",
            "nup": "3.10.01.02.002.175",
            "kondisi": "Baik",
            "pegawai": "Mulatua ,S.Sos., M.Si.",
            "nip": "197407232005011006",
            "jabatan": "Penelaah Teknis Kebijakan",
            "no": 10
          },
          {
            "id": 137,
            "nama": "Printer HP LaserJet Pro 4003 dn",
            "nup": "3.10.02.03.003.176",
            "kondisi": "Baik",
            "pegawai": "Mulatua ,S.Sos., M.Si.",
            "nip": "197407232005011006",
            "jabatan": "Penelaah Teknis Kebijakan",
            "no": 11
          },
          {
            "id": 138,
            "nama": "Filling Cabine Kecil",
            "nup": "0",
            "kondisi": "Baik",
            "pegawai": "Mulatua ,S.Sos., M.Si.",
            "nip": "197407232005011006",
            "jabatan": "Penelaah Teknis Kebijakan",
            "no": 12
          },
          {
            "id": 169,
            "nama": "P.C Desktop HP Touchmart 6.1.0 + Keyboard + Mouse",
            "nup": "3.10.01.02.001.228",
            "kondisi": "Baik",
            "pegawai": "Martin Hasiholan Siagian S.Sos, M.Ap",
            "nip": "198603112009011003",
            "jabatan": "Penelaah Teknis Kebijakan",
            "no": 13
          },
          {
            "id": 170,
            "nama": "Printer HP LaserJet Pro 400 M401M",
            "nup": "0",
            "kondisi": "Baik",
            "pegawai": "Martin Hasiholan Siagian S.Sos, M.Ap",
            "nip": "198603112009011003",
            "jabatan": "Penelaah Teknis Kebijakan",
            "no": 14
          },
          {
            "id": 171,
            "nama": "Kursi Besi/Metal",
            "nup": "3.05.02.01.003.400",
            "kondisi": "Baik",
            "pegawai": "Martin Hasiholan Siagian S.Sos, M.Ap",
            "nip": "198603112009011003",
            "jabatan": "Penelaah Teknis Kebijakan",
            "no": 15
          },
          {
            "id": 172,
            "nama": "Meja Kerja Kayu",
            "nup": "3.05.02.01.002.319",
            "kondisi": "Baik",
            "pegawai": "Martin Hasiholan Siagian S.Sos, M.Ap",
            "nip": "198603112009011003",
            "jabatan": "Penelaah Teknis Kebijakan",
            "no": 16
          },
          {
            "id": 173,
            "nama": "Kursi Besi/Metal",
            "nup": "3.05.02.01.003.754",
            "kondisi": "Baik",
            "pegawai": "Veranita S.E., M.M",
            "nip": "198107102009012010",
            "jabatan": "Penelaah Teknis Kebijakan",
            "no": 17
          },
          {
            "id": 174,
            "nama": "P.C Desktop HP 200 Pro + Keyboard + Mouse",
            "nup": "3.10.01.02.001.332",
            "kondisi": "Baik",
            "pegawai": "Veranita S.E., M.M",
            "nip": "198107102009012010",
            "jabatan": "Penelaah Teknis Kebijakan",
            "no": 18
          },
          {
            "id": 175,
            "nama": "Printer",
            "nup": "3.10.02.03.003.206",
            "kondisi": "Baik",
            "pegawai": "Veranita S.E., M.M",
            "nip": "198107102009012010",
            "jabatan": "Penelaah Teknis Kebijakan",
            "no": 19
          },
          {
            "id": 184,
            "nama": "Kursi Besi/Metal",
            "nup": "3.05.02.01.003.693",
            "kondisi": "Baik",
            "pegawai": "Victoria Hannalthonf, S.Th.",
            "nip": "198506212009012003",
            "jabatan": "Penelaah Teknis Kebijakan",
            "no": 20
          },
          {
            "id": 185,
            "nama": "Meja Kerja Kayu",
            "nup": "3.05.02.01.002.284",
            "kondisi": "Baik",
            "pegawai": "Victoria Hannalthonf, S.Th.",
            "nip": "198506212009012003",
            "jabatan": "Penelaah Teknis Kebijakan",
            "no": 21
          },
          {
            "id": 186,
            "nama": "P.C Desktop + Keyboard + Mouse",
            "nup": "3.10.01.02.001.269",
            "kondisi": "Baik",
            "pegawai": "Victoria Hannalthonf, S.Th.",
            "nip": "198506212009012003",
            "jabatan": "Penelaah Teknis Kebijakan",
            "no": 22
          },
          {
            "id": 192,
            "nama": "Kursi Besi/Metal",
            "nup": "3.05.02.01.003.289",
            "kondisi": "Baik",
            "pegawai": "Natalia Damar Bedolah S.Sos",
            "nip": "199712232023212012",
            "jabatan": "Analis Kebijakan Ahli Pertama",
            "no": 23
          },
          {
            "id": 193,
            "nama": "Meja Kerja Kayu",
            "nup": "3.05.02.01.002.285",
            "kondisi": "Baik",
            "pegawai": "Natalia Damar Bedolah S.Sos",
            "nip": "199712232023212012",
            "jabatan": "Analis Kebijakan Ahli Pertama",
            "no": 24
          },
          {
            "id": 194,
            "nama": "Printer HP LaserJet Pro",
            "nup": "3.10.02.03.003.152",
            "kondisi": "Baik",
            "pegawai": "Natalia Damar Bedolah S.Sos",
            "nip": "199712232023212012",
            "jabatan": "Analis Kebijakan Ahli Pertama",
            "no": 25
          },
          {
            "id": 204,
            "nama": "Kursi Besi/Metal",
            "nup": "3.05.02.01.003.573",
            "kondisi": "Baik",
            "pegawai": "Ita Ernala Kaban S.Kom",
            "nip": "197201082008012009",
            "jabatan": "Penelaah Teknis Kebijakan",
            "no": 26
          },
          {
            "id": 205,
            "nama": "P.C HP Desktop",
            "nup": "3.10.01.02.001.291",
            "kondisi": "Baik",
            "pegawai": "Ita Ernala Kaban S.Kom",
            "nip": "197201082008012009",
            "jabatan": "Penelaah Teknis Kebijakan",
            "no": 27
          },
          {
            "id": 206,
            "nama": "Kursi Besi/Metal",
            "nup": "3.05.02.01.003.571",
            "kondisi": "Baik",
            "pegawai": "Astrid Tomasoa S.Pd",
            "nip": "199509172020122018",
            "jabatan": "Penelaah Teknis Kebijakan",
            "no": 28
          },
          {
            "id": 212,
            "nama": "Kursi Besi/Metal",
            "nup": "3.05.02.01.003.457",
            "kondisi": "Baik",
            "pegawai": "Margaretha Micelle Tilaar S.Si.Teol.",
            "nip": "199404082024212051",
            "jabatan": "Analis Kebijakan Ahli Pertama",
            "no": 29
          },
          {
            "id": 213,
            "nama": "Meja Kerja Kayu",
            "nup": "3.05.02.01.002.299",
            "kondisi": "Baik",
            "pegawai": "Margaretha Micelle Tilaar S.Si.Teol.",
            "nip": "199404082024212051",
            "jabatan": "Analis Kebijakan Ahli Pertama",
            "no": 30
          },
          {
            "id": 214,
            "nama": "P.C Desktop HP + Keyboard + Mouse",
            "nup": "3.10.01.02.001.333",
            "kondisi": "Baik",
            "pegawai": "Margaretha Micelle Tilaar S.Si.Teol.",
            "nip": "199404082024212051",
            "jabatan": "Analis Kebijakan Ahli Pertama",
            "no": 31
          }
        ]
      },
      {
        "id": "ortala",
        "nama": "Ortala",
        "barang": [
          {
            "id": 124,
            "nama": "Desktop PC + Keyboard +Mouse",
            "nup": "3.10.01.02.001.275",
            "kondisi": "Baik",
            "pegawai": "Edelena Manullang S.Pak., M.Pd.K",
            "nip": "197210072006042002",
            "jabatan": "Arsiparis Ahli Muda",
            "no": 1
          },
          {
            "id": 125,
            "nama": "Kursi Besi/Metal",
            "nup": "0",
            "kondisi": "Baik",
            "pegawai": "Edelena Manullang S.Pak., M.Pd.K",
            "nip": "197210072006042002",
            "jabatan": "Arsiparis Ahli Muda",
            "no": 2
          },
          {
            "id": 126,
            "nama": "Filling Cabinet Kecil (2)",
            "nup": "0",
            "kondisi": "Baik",
            "pegawai": "Edelena Manullang S.Pak., M.Pd.K",
            "nip": "197210072006042002",
            "jabatan": "Arsiparis Ahli Muda",
            "no": 3
          },
          {
            "id": 219,
            "nama": "0",
            "nup": "0",
            "kondisi": "0",
            "pegawai": "Dr. Parlin Simamora S.T., M.Th.",
            "nip": "197607272009121002",
            "jabatan": "Arsiparis Ahli Madya",
            "no": 4
          },
          {
            "id": 220,
            "nama": "0",
            "nup": "0",
            "kondisi": "0",
            "pegawai": "Dr. Parlin Simamora S.T., M.Th.",
            "nip": "197607272009121002",
            "jabatan": "Arsiparis Ahli Madya",
            "no": 5
          }
        ]
      },
      {
        "id": "perencanaan",
        "nama": "Perencanaan",
        "barang": [
          {
            "id": 58,
            "nama": "Unit PC HP 200 Pro",
            "nup": "3.10.01.02.001.328",
            "kondisi": "Baik",
            "pegawai": "Melda Ery Rusmawi S.Th, M.Pd",
            "nip": "197511202005012007",
            "jabatan": "Perencana Ahli Madya",
            "no": 1
          },
          {
            "id": 59,
            "nama": "Kursi Besi/Metal",
            "nup": "3.05.02.01.003.445",
            "kondisi": "Baik",
            "pegawai": "Melda Ery Rusmawi S.Th, M.Pd",
            "nip": "197511202005012007",
            "jabatan": "Perencana Ahli Madya",
            "no": 2
          },
          {
            "id": 60,
            "nama": "Meja Kerja Kayu",
            "nup": "0",
            "kondisi": "Baik",
            "pegawai": "Melda Ery Rusmawi S.Th, M.Pd",
            "nip": "197511202005012007",
            "jabatan": "Perencana Ahli Madya",
            "no": 3
          },
          {
            "id": 61,
            "nama": "Filling Cabinet Kecil",
            "nup": "0",
            "kondisi": "Baik",
            "pegawai": "Melda Ery Rusmawi S.Th, M.Pd",
            "nip": "197511202005012007",
            "jabatan": "Perencana Ahli Madya",
            "no": 4
          },
          {
            "id": 62,
            "nama": "Printer Cannon Bxma 6-3010",
            "nup": "3.10.02.03.003.162",
            "kondisi": "Baik",
            "pegawai": "Melda Ery Rusmawi S.Th, M.Pd",
            "nip": "197511202005012007",
            "jabatan": "Perencana Ahli Madya",
            "no": 5
          },
          {
            "id": 63,
            "nama": "Printer HP Laserjet Pro 4003 Dn",
            "nup": "3.10.02.03.003.172",
            "kondisi": "Baik",
            "pegawai": "Perwira Sitepu, Ss.",
            "nip": "198202132011011011",
            "jabatan": "Perencana Ahli Pertama",
            "no": 6
          },
          {
            "id": 64,
            "nama": "Lemari Besi/Metal",
            "nup": "3.05.01.04.001.81",
            "kondisi": "Baik",
            "pegawai": "Perwira Sitepu, Ss.",
            "nip": "198202132011011011",
            "jabatan": "Perencana Ahli Pertama",
            "no": 7
          },
          {
            "id": 65,
            "nama": "Meja Kerja Kayu",
            "nup": "3.05.02.01.002.304",
            "kondisi": "Baik",
            "pegawai": "Perwira Sitepu, Ss.",
            "nip": "198202132011011011",
            "jabatan": "Perencana Ahli Pertama",
            "no": 8
          },
          {
            "id": 66,
            "nama": "P.C Unit DELL Preasian Tower",
            "nup": "3.10.01.02.001.302",
            "kondisi": "Baik",
            "pegawai": "Perwira Sitepu, Ss.",
            "nip": "198202132011011011",
            "jabatan": "Perencana Ahli Pertama",
            "no": 9
          },
          {
            "id": 67,
            "nama": "Kursi Besi/Metal",
            "nup": "3.05.02.01.003.625",
            "kondisi": "Baik",
            "pegawai": "Perwira Sitepu, Ss.",
            "nip": "198202132011011011",
            "jabatan": "Perencana Ahli Pertama",
            "no": 10
          },
          {
            "id": 68,
            "nama": "Filling Cabinet Kecil",
            "nup": "0",
            "kondisi": "Baik",
            "pegawai": "Perwira Sitepu, Ss.",
            "nip": "198202132011011011",
            "jabatan": "Perencana Ahli Pertama",
            "no": 11
          },
          {
            "id": 69,
            "nama": "Filling Cabinet Kecil",
            "nup": "0",
            "kondisi": "Baik",
            "pegawai": "Perwira Sitepu, Ss.",
            "nip": "198202132011011011",
            "jabatan": "Perencana Ahli Pertama",
            "no": 12
          },
          {
            "id": 70,
            "nama": "Filling Cabinet Kecil",
            "nup": "0",
            "kondisi": "Baik",
            "pegawai": "Perwira Sitepu, Ss.",
            "nip": "198202132011011011",
            "jabatan": "Perencana Ahli Pertama",
            "no": 13
          },
          {
            "id": 80,
            "nama": "Kursi Besi/Metal",
            "nup": "3.05.02.01.003.578",
            "kondisi": "Baik",
            "pegawai": "Yemima Simbolon S.M.",
            "nip": "200006202025052005",
            "jabatan": "Perencana Ahli Pertama",
            "no": 14
          },
          {
            "id": 81,
            "nama": "Meja Kerja Kayu",
            "nup": "3.05.02.01.002.313",
            "kondisi": "Baik",
            "pegawai": "Yemima Simbolon S.M.",
            "nip": "200006202025052005",
            "jabatan": "Perencana Ahli Pertama",
            "no": 15
          },
          {
            "id": 82,
            "nama": "PC unit",
            "nup": "3.10.01.02.001.272",
            "kondisi": "Baik",
            "pegawai": "Yemima Simbolon S.M.",
            "nip": "200006202025052005",
            "jabatan": "Perencana Ahli Pertama",
            "no": 16
          },
          {
            "id": 83,
            "nama": "Filling Cabinet Kecil",
            "nup": "0",
            "kondisi": "Baik",
            "pegawai": "Yemima Simbolon S.M.",
            "nip": "200006202025052005",
            "jabatan": "Perencana Ahli Pertama",
            "no": 17
          },
          {
            "id": 84,
            "nama": "Kursi Besi/Metal",
            "nup": "3.05.02.01.003.453",
            "kondisi": "Baik",
            "pegawai": "Deivy Donna Ingrid Supit ,Se.,M.E.",
            "nip": "198104052008012018",
            "jabatan": "Perencana Ahli Madya",
            "no": 18
          },
          {
            "id": 85,
            "nama": "Printer",
            "nup": "3.10.02.03.003.173",
            "kondisi": "Baik",
            "pegawai": "Deivy Donna Ingrid Supit ,Se.,M.E.",
            "nip": "198104052008012018",
            "jabatan": "Perencana Ahli Madya",
            "no": 19
          },
          {
            "id": 86,
            "nama": "Laci",
            "nup": "0",
            "kondisi": "Baik",
            "pegawai": "Deivy Donna Ingrid Supit ,Se.,M.E.",
            "nip": "198104052008012018",
            "jabatan": "Perencana Ahli Madya",
            "no": 20
          }
        ]
      },
      {
        "id": "keuangan",
        "nama": "Keuangan",
        "barang": [
          {
            "id": 108,
            "nama": "Kursi Besi/Metal",
            "nup": "3.05.02.01.003.290",
            "kondisi": "Baik",
            "pegawai": "Rosianna S.Pak, M.Th",
            "nip": "196705151994032005",
            "jabatan": "Analis Pengelolaan Keuangan APBN Ahli Madya",
            "no": 1
          },
          {
            "id": 109,
            "nama": "Printer",
            "nup": "3.10.02.03.003.117",
            "kondisi": "Baik",
            "pegawai": "Rosianna S.Pak, M.Th",
            "nip": "196705151994032005",
            "jabatan": "Analis Pengelolaan Keuangan APBN Ahli Madya",
            "no": 2
          },
          {
            "id": 110,
            "nama": "Kursi Besi/Metal",
            "nup": "3.05.02.01.003.266",
            "kondisi": "Baik",
            "pegawai": "Rosianna S.Pak, M.Th",
            "nip": "196705151994032005",
            "jabatan": "Analis Pengelolaan Keuangan APBN Ahli Madya",
            "no": 3
          },
          {
            "id": 111,
            "nama": "Desktop PC",
            "nup": "3.10.01.02.001.258",
            "kondisi": "Baik",
            "pegawai": "Rosianna S.Pak, M.Th",
            "nip": "196705151994032005",
            "jabatan": "Analis Pengelolaan Keuangan APBN Ahli Madya",
            "no": 4
          },
          {
            "id": 112,
            "nama": "Meja Kerja Kayu",
            "nup": "3.05.02.01.002.303",
            "kondisi": "Baik",
            "pegawai": "Rosianna S.Pak, M.Th",
            "nip": "196705151994032005",
            "jabatan": "Analis Pengelolaan Keuangan APBN Ahli Madya",
            "no": 5
          },
          {
            "id": 113,
            "nama": "Filling Cabinet Besi",
            "nup": "3.05.01.04.005.81",
            "kondisi": "Baik",
            "pegawai": "Rosianna S.Pak, M.Th",
            "nip": "196705151994032005",
            "jabatan": "Analis Pengelolaan Keuangan APBN Ahli Madya",
            "no": 6
          },
          {
            "id": 114,
            "nama": "Filling Cabinet Besi",
            "nup": "3.05.01.04.005.95",
            "kondisi": "Baik",
            "pegawai": "Rosianna S.Pak, M.Th",
            "nip": "196705151994032005",
            "jabatan": "Analis Pengelolaan Keuangan APBN Ahli Madya",
            "no": 7
          },
          {
            "id": 115,
            "nama": "Kursi Besi/Metal",
            "nup": "3.05.02.01.003.744",
            "kondisi": "Baik",
            "pegawai": "Artha Aprilia Rozaline, S.E.",
            "nip": "198104092006042002",
            "jabatan": "Analis Pengelolaan Keuangan APBN Ahli Muda",
            "no": 8
          },
          {
            "id": 116,
            "nama": "Filling Cabinet Besi (3)",
            "nup": "0",
            "kondisi": "Baik",
            "pegawai": "Artha Aprilia Rozaline, S.E.",
            "nip": "198104092006042002",
            "jabatan": "Analis Pengelolaan Keuangan APBN Ahli Muda",
            "no": 9
          },
          {
            "id": 117,
            "nama": "Printer",
            "nup": "3.10.02.03.003.175",
            "kondisi": "Baik",
            "pegawai": "Artha Aprilia Rozaline, S.E.",
            "nip": "198104092006042002",
            "jabatan": "Analis Pengelolaan Keuangan APBN Ahli Muda",
            "no": 10
          },
          {
            "id": 118,
            "nama": "Meja Kerja Kayu Persegi",
            "nup": "3.05.02.01.002.308",
            "kondisi": "Baik",
            "pegawai": "Artha Aprilia Rozaline, S.E.",
            "nip": "198104092006042002",
            "jabatan": "Analis Pengelolaan Keuangan APBN Ahli Muda",
            "no": 11
          },
          {
            "id": 119,
            "nama": "0",
            "nup": "0",
            "kondisi": "0",
            "pegawai": "Torusma Marbun S.Kom., M.Ap.",
            "nip": "197611252008011006",
            "jabatan": "Analis Pengelolaan Keuangan APBN Ahli Muda",
            "no": 12
          },
          {
            "id": 120,
            "nama": "Kursi Besi/Metal",
            "nup": "3.05.02.01.003.744",
            "kondisi": "Baik",
            "pegawai": "Junita Arisandi S.E. Map.",
            "nip": "198606152011012028",
            "jabatan": "Analis Pengelolaan Keuangan APBN Ahli Muda",
            "no": 13
          },
          {
            "id": 121,
            "nama": "Printer",
            "nup": "3.10.02.03.003.160",
            "kondisi": "Baik",
            "pegawai": "Junita Arisandi S.E. Map.",
            "nip": "198606152011012028",
            "jabatan": "Analis Pengelolaan Keuangan APBN Ahli Muda",
            "no": 14
          },
          {
            "id": 122,
            "nama": "Desktop PC + Keyboard +Mouse",
            "nup": "3.10.01.02.001.274",
            "kondisi": "Baik",
            "pegawai": "Junita Arisandi S.E. Map.",
            "nip": "198606152011012028",
            "jabatan": "Analis Pengelolaan Keuangan APBN Ahli Muda",
            "no": 15
          },
          {
            "id": 123,
            "nama": "Filling Cabinet Kecil",
            "nup": "0",
            "kondisi": "Baik",
            "pegawai": "Junita Arisandi S.E. Map.",
            "nip": "198606152011012028",
            "jabatan": "Analis Pengelolaan Keuangan APBN Ahli Muda",
            "no": 16
          },
          {
            "id": 127,
            "nama": "0",
            "nup": "0",
            "kondisi": "0",
            "pegawai": "Tamba Uli Noriva S.E., M.Ap.",
            "nip": "198102262008012009",
            "jabatan": "Pranata Keuangan APBN Penyelia",
            "no": 17
          },
          {
            "id": 128,
            "nama": "Desktop PC DELL + Keyboard +Mouse",
            "nup": "3.10.01.02.001.327",
            "kondisi": "Baik",
            "pegawai": "Selvyana S.Sos",
            "nip": "198302092011012009",
            "jabatan": "Pranata Keuangan APBN Penyelia",
            "no": 18
          },
          {
            "id": 129,
            "nama": "Kursi Besi/Metal",
            "nup": "3.05.02.01.003.545",
            "kondisi": "Baik",
            "pegawai": "Selvyana S.Sos",
            "nip": "198302092011012009",
            "jabatan": "Pranata Keuangan APBN Penyelia",
            "no": 19
          },
          {
            "id": 130,
            "nama": "Printer",
            "nup": "3.10.02.03.003.154",
            "kondisi": "Baik",
            "pegawai": "Selvyana S.Sos",
            "nip": "198302092011012009",
            "jabatan": "Pranata Keuangan APBN Penyelia",
            "no": 20
          },
          {
            "id": 131,
            "nama": "Filling Cabinet Kecil",
            "nup": "0",
            "kondisi": "Baik",
            "pegawai": "Selvyana S.Sos",
            "nip": "198302092011012009",
            "jabatan": "Pranata Keuangan APBN Penyelia",
            "no": 21
          },
          {
            "id": 132,
            "nama": "Desktop PC HP + Keyboard +Mouse",
            "nup": "3.10.01.02.001.352",
            "kondisi": "Baik",
            "pegawai": "Andrei Josua Ginting, S.E.",
            "nip": "198810152020121005",
            "jabatan": "Analis Pengelolaan Keuangan APBN Ahli Pertama",
            "no": 22
          },
          {
            "id": 133,
            "nama": "Kursi Besi/Metal",
            "nup": "3.05.02.01.003.295",
            "kondisi": "Baik",
            "pegawai": "Andrei Josua Ginting, S.E.",
            "nip": "198810152020121005",
            "jabatan": "Analis Pengelolaan Keuangan APBN Ahli Pertama",
            "no": 23
          },
          {
            "id": 134,
            "nama": "Printer",
            "nup": "3.10.02.03.003.153",
            "kondisi": "Baik",
            "pegawai": "Andrei Josua Ginting, S.E.",
            "nip": "198810152020121005",
            "jabatan": "Analis Pengelolaan Keuangan APBN Ahli Pertama",
            "no": 24
          },
          {
            "id": 147,
            "nama": "P.C Unit HP 200",
            "nup": "3.10..01.02.201.330",
            "kondisi": "Baik",
            "pegawai": "Beltsa Bertianti S.M.",
            "nip": "199906042025052007",
            "jabatan": "Analis Pengelolaan Keuangan APBN Ahli Pertama",
            "no": 25
          },
          {
            "id": 148,
            "nama": "Printer",
            "nup": "3.10.02.03.003.89",
            "kondisi": "Baik",
            "pegawai": "Beltsa Bertianti S.M.",
            "nip": "199906042025052007",
            "jabatan": "Analis Pengelolaan Keuangan APBN Ahli Pertama",
            "no": 26
          },
          {
            "id": 149,
            "nama": "Kursi Besi/Metal",
            "nup": "3.05.02.01.003.574",
            "kondisi": "Baik",
            "pegawai": "Beltsa Bertianti S.M.",
            "nip": "199906042025052007",
            "jabatan": "Analis Pengelolaan Keuangan APBN Ahli Pertama",
            "no": 27
          },
          {
            "id": 150,
            "nama": "Kursi Besi/Metal",
            "nup": "3.05.02.01.003.447",
            "kondisi": "Baik",
            "pegawai": "Beltsa Bertianti S.M.",
            "nip": "199906042025052007",
            "jabatan": "Analis Pengelolaan Keuangan APBN Ahli Pertama",
            "no": 28
          },
          {
            "id": 151,
            "nama": "Kursi Besi/Metal",
            "nup": "3.05.02.01.003.745",
            "kondisi": "Baik",
            "pegawai": "Beltsa Bertianti S.M.",
            "nip": "199906042025052007",
            "jabatan": "Analis Pengelolaan Keuangan APBN Ahli Pertama",
            "no": 29
          },
          {
            "id": 152,
            "nama": "Kursi Besi/Metal",
            "nup": "3.05.02.01.003.296",
            "kondisi": "Baik",
            "pegawai": "Beltsa Bertianti S.M.",
            "nip": "199906042025052007",
            "jabatan": "Analis Pengelolaan Keuangan APBN Ahli Pertama",
            "no": 30
          },
          {
            "id": 153,
            "nama": "Kursi Besi/Metal",
            "nup": "3.05.02.01.003.580",
            "kondisi": "Baik",
            "pegawai": "Beltsa Bertianti S.M.",
            "nip": "199906042025052007",
            "jabatan": "Analis Pengelolaan Keuangan APBN Ahli Pertama",
            "no": 31
          },
          {
            "id": 154,
            "nama": "P.C Unit HP Envy",
            "nup": "3.10.01.02.001.240",
            "kondisi": "Baik",
            "pegawai": "Beltsa Bertianti S.M.",
            "nip": "199906042025052007",
            "jabatan": "Analis Pengelolaan Keuangan APBN Ahli Pertama",
            "no": 32
          },
          {
            "id": 155,
            "nama": "Printer HP",
            "nup": "3.10.02.03.003.118",
            "kondisi": "Baik",
            "pegawai": "Beltsa Bertianti S.M.",
            "nip": "199906042025052007",
            "jabatan": "Analis Pengelolaan Keuangan APBN Ahli Pertama",
            "no": 33
          },
          {
            "id": 156,
            "nama": "P.C Unit HP",
            "nup": "3.10.01.02.001.331",
            "kondisi": "Baik",
            "pegawai": "Beltsa Bertianti S.M.",
            "nip": "199906042025052007",
            "jabatan": "Analis Pengelolaan Keuangan APBN Ahli Pertama",
            "no": 34
          },
          {
            "id": 157,
            "nama": "Filling Cabinet Besi",
            "nup": "3.05.01.04.005.86",
            "kondisi": "Baik",
            "pegawai": "Beltsa Bertianti S.M.",
            "nip": "199906042025052007",
            "jabatan": "Analis Pengelolaan Keuangan APBN Ahli Pertama",
            "no": 35
          },
          {
            "id": 158,
            "nama": "Filling Cabinet Besi",
            "nup": "3.05.01.04.005.85",
            "kondisi": "Baik",
            "pegawai": "Beltsa Bertianti S.M.",
            "nip": "199906042025052007",
            "jabatan": "Analis Pengelolaan Keuangan APBN Ahli Pertama",
            "no": 36
          },
          {
            "id": 159,
            "nama": "Filling Cabinet Besi",
            "nup": "3.05.01.04.005.80",
            "kondisi": "Baik",
            "pegawai": "Beltsa Bertianti S.M.",
            "nip": "199906042025052007",
            "jabatan": "Analis Pengelolaan Keuangan APBN Ahli Pertama",
            "no": 37
          },
          {
            "id": 160,
            "nama": "Filling Cabinet Besi",
            "nup": "3.05.01.04.005.67",
            "kondisi": "Baik",
            "pegawai": "Beltsa Bertianti S.M.",
            "nip": "199906042025052007",
            "jabatan": "Analis Pengelolaan Keuangan APBN Ahli Pertama",
            "no": 38
          },
          {
            "id": 161,
            "nama": "Filling Cabinet Besi",
            "nup": "3.05.01.04.005.84",
            "kondisi": "Baik",
            "pegawai": "Beltsa Bertianti S.M.",
            "nip": "199906042025052007",
            "jabatan": "Analis Pengelolaan Keuangan APBN Ahli Pertama",
            "no": 39
          },
          {
            "id": 162,
            "nama": "Filling Cabinet Besi",
            "nup": "3.05.01.04.005.110",
            "kondisi": "Baik",
            "pegawai": "Beltsa Bertianti S.M.",
            "nip": "199906042025052007",
            "jabatan": "Analis Pengelolaan Keuangan APBN Ahli Pertama",
            "no": 40
          },
          {
            "id": 163,
            "nama": "Lemari Kayu",
            "nup": "3.05.01.04.002.67",
            "kondisi": "Baik",
            "pegawai": "Beltsa Bertianti S.M.",
            "nip": "199906042025052007",
            "jabatan": "Analis Pengelolaan Keuangan APBN Ahli Pertama",
            "no": 41
          },
          {
            "id": 164,
            "nama": "Lemari Kayu",
            "nup": "3.05.01.04.002.59",
            "kondisi": "Baik",
            "pegawai": "Beltsa Bertianti S.M.",
            "nip": "199906042025052007",
            "jabatan": "Analis Pengelolaan Keuangan APBN Ahli Pertama",
            "no": 42
          },
          {
            "id": 165,
            "nama": "Meja Kerja Kayu",
            "nup": "3.05.02.01.002.302",
            "kondisi": "Baik",
            "pegawai": "Beltsa Bertianti S.M.",
            "nip": "199906042025052007",
            "jabatan": "Analis Pengelolaan Keuangan APBN Ahli Pertama",
            "no": 43
          },
          {
            "id": 166,
            "nama": "Kursi Besi/Metal",
            "nup": "0",
            "kondisi": "Baik",
            "pegawai": "Freddi Daniel S.E",
            "nip": "199803262025051002",
            "jabatan": "Analis Pengelolaan Keuangan APBN Ahli Pertama",
            "no": 44
          },
          {
            "id": 167,
            "nama": "Filling Cabine Kecil",
            "nup": "0",
            "kondisi": "Baik",
            "pegawai": "Freddi Daniel S.E",
            "nip": "199803262025051002",
            "jabatan": "Analis Pengelolaan Keuangan APBN Ahli Pertama",
            "no": 45
          },
          {
            "id": 168,
            "nama": "Scanner MICROTEK ASDI 7200S",
            "nup": "3.10.02.03.004.30",
            "kondisi": "Baik",
            "pegawai": "Freddi Daniel S.E",
            "nip": "199803262025051002",
            "jabatan": "Analis Pengelolaan Keuangan APBN Ahli Pertama",
            "no": 46
          }
        ]
      },
      {
        "id": "hukum",
        "nama": "Hukum",
        "barang": [
          {
            "id": 203,
            "nama": "0",
            "nup": "0",
            "kondisi": "0",
            "pegawai": "Ria Widyatiningsih, S.H.",
            "nip": "197908242011012005",
            "jabatan": "Perancang Peraturan Perundang-Undangan Ahli Pertama",
            "no": 1
          },
          {
            "id": 207,
            "nama": "Kursi Besi/Metal",
            "nup": "3.05.02.01.003.466",
            "kondisi": "Baik",
            "pegawai": "Mawar Br Simanjuntak S.Th",
            "nip": "199206052022032001",
            "jabatan": "Penyuluh Hukum Ahli Pertama",
            "no": 2
          },
          {
            "id": 208,
            "nama": "Meja Kerja Kayu",
            "nup": "3.05.02.01.002.292",
            "kondisi": "Baik",
            "pegawai": "Mawar Br Simanjuntak S.Th",
            "nip": "199206052022032001",
            "jabatan": "Penyuluh Hukum Ahli Pertama",
            "no": 3
          },
          {
            "id": 209,
            "nama": "P.C Desktop + Keyboard + Mouse",
            "nup": "0",
            "kondisi": "Baik",
            "pegawai": "Mawar Br Simanjuntak S.Th",
            "nip": "199206052022032001",
            "jabatan": "Penyuluh Hukum Ahli Pertama",
            "no": 4
          },
          {
            "id": 210,
            "nama": "Kursi Besi/Metal",
            "nup": "3.05.02.01.003.456",
            "kondisi": "Baik",
            "pegawai": "Reka Sofia S.H.",
            "nip": "199805192024212037",
            "jabatan": "Analis Hukum Ahli Pertama",
            "no": 5
          },
          {
            "id": 211,
            "nama": "P.C Desktop DELL + Keyboard + Mouse",
            "nup": "3.10.01.02.001.303",
            "kondisi": "Baik",
            "pegawai": "Reka Sofia S.H.",
            "nip": "199805192024212037",
            "jabatan": "Analis Hukum Ahli Pertama",
            "no": 6
          },
          {
            "id": 215,
            "nama": "Printer Canon",
            "nup": "3.10.02.03.004.18",
            "kondisi": "Baik",
            "pegawai": "Oska Elsada Lautt S.H",
            "nip": "200004242025051003",
            "jabatan": "Analis Hukum Ahli Pertama",
            "no": 7
          },
          {
            "id": 216,
            "nama": "Meja Kerja Kayu",
            "nup": "3.05.02.01.002.290",
            "kondisi": "Baik",
            "pegawai": "Oska Elsada Lautt S.H",
            "nip": "200004242025051003",
            "jabatan": "Analis Hukum Ahli Pertama",
            "no": 8
          },
          {
            "id": 217,
            "nama": "Kursi Besi/Metal",
            "nup": "3.05.02.01.003.740",
            "kondisi": "Baik",
            "pegawai": "Oska Elsada Lautt S.H",
            "nip": "200004242025051003",
            "jabatan": "Analis Hukum Ahli Pertama",
            "no": 9
          },
          {
            "id": 218,
            "nama": "Kursi Besi/Metal",
            "nup": "3.05.02.01.003.572",
            "kondisi": "Baik",
            "pegawai": "Yunita Paranoan S. H",
            "nip": "199206242025052002",
            "jabatan": "Analis Hukum Ahli Pertama",
            "no": 10
          }
        ]
      },
      {
        "id": "sdm",
        "nama": "SDM",
        "barang": [
          {
            "id": 176,
            "nama": "Kursi Besi/Metal",
            "nup": "3.05.02.01.003.287",
            "kondisi": "Baik",
            "pegawai": "Mawar M.L Sitorus S.Kom",
            "nip": "199902102025052002",
            "jabatan": "Analis Sumber Daya Manusia Aparatur Ahli Pertama",
            "no": 1
          },
          {
            "id": 177,
            "nama": "Meja Kerja Kayu",
            "nup": "3.05.02.01.002.300",
            "kondisi": "Baik",
            "pegawai": "Mawar M.L Sitorus S.Kom",
            "nip": "199902102025052002",
            "jabatan": "Analis Sumber Daya Manusia Aparatur Ahli Pertama",
            "no": 2
          },
          {
            "id": 178,
            "nama": "Printer HP LaserJet Pro",
            "nup": "3.10.02.03.003.111",
            "kondisi": "Baik",
            "pegawai": "Mawar M.L Sitorus S.Kom",
            "nip": "199902102025052002",
            "jabatan": "Analis Sumber Daya Manusia Aparatur Ahli Pertama",
            "no": 3
          },
          {
            "id": 179,
            "nama": "0",
            "nup": "0",
            "kondisi": "0",
            "pegawai": "Febrina Ayunani S.E.",
            "nip": "199402132025052005",
            "jabatan": "Analis Sumber Daya Manusia Aparatur Ahli Pertama",
            "no": 4
          },
          {
            "id": 180,
            "nama": "Kursi Besi/Metal",
            "nup": "3.05.02.01.003.580",
            "kondisi": "Baik",
            "pegawai": "Anro Sinurat Amd",
            "nip": "199004202025051001",
            "jabatan": "Pranata Sumber Daya Manusia Aparatur Terampil",
            "no": 5
          },
          {
            "id": 181,
            "nama": "Printer",
            "nup": "0",
            "kondisi": "Baik",
            "pegawai": "Anro Sinurat Amd",
            "nip": "199004202025051001",
            "jabatan": "Pranata Sumber Daya Manusia Aparatur Terampil",
            "no": 6
          },
          {
            "id": 182,
            "nama": "Kursi Besi/Metal",
            "nup": "3.05.02.01.003.583",
            "kondisi": "Baik",
            "pegawai": "Delta Friska Purba A.Md",
            "nip": "200006052025052007",
            "jabatan": "Pranata Sumber Daya Manusia Aparatur Terampil",
            "no": 7
          },
          {
            "id": 183,
            "nama": "Kursi Besi/Metal",
            "nup": "3.05.02.01.003.588",
            "kondisi": "Baik",
            "pegawai": "Septiany Princess Silalahi A.Md.T.",
            "nip": "200209092025052003",
            "jabatan": "Pranata Sumber Daya Manusia Aparatur Terampil",
            "no": 8
          },
          {
            "id": 189,
            "nama": "Kursi Besi/Metal",
            "nup": "3.05.02.01.003.395",
            "kondisi": "Baik",
            "pegawai": "Wandhana Handythio Sudihanto, S.I.P.",
            "nip": "199305102023211030",
            "jabatan": "Analis Sumber Daya Manusia Aparatur Ahli Pertama",
            "no": 9
          },
          {
            "id": 190,
            "nama": "Meja Kerja Kayu",
            "nup": "3.05.02.01.002.289",
            "kondisi": "Baik",
            "pegawai": "Wandhana Handythio Sudihanto, S.I.P.",
            "nip": "199305102023211030",
            "jabatan": "Analis Sumber Daya Manusia Aparatur Ahli Pertama",
            "no": 10
          },
          {
            "id": 191,
            "nama": "Printer HP LaserJet Pro",
            "nup": "3.10.02.03.003.180",
            "kondisi": "Baik",
            "pegawai": "Wandhana Handythio Sudihanto, S.I.P.",
            "nip": "199305102023211030",
            "jabatan": "Analis Sumber Daya Manusia Aparatur Ahli Pertama",
            "no": 11
          },
          {
            "id": 195,
            "nama": "Meja Kerja Kayu",
            "nup": "",
            "kondisi": "Baik",
            "pegawai": "Mario Fernando Rumahorbo S.Psi.",
            "nip": "200009122024211002",
            "jabatan": "Asesor Sumber Daya Manusia Aparatur Ahli Pertama",
            "no": 12
          },
          {
            "id": 196,
            "nama": "Kursi Besi/Metal",
            "nup": "3.05.02.01.003.938",
            "kondisi": "Baik",
            "pegawai": "Mario Fernando Rumahorbo S.Psi.",
            "nip": "200009122024211002",
            "jabatan": "Asesor Sumber Daya Manusia Aparatur Ahli Pertama",
            "no": 13
          },
          {
            "id": 197,
            "nama": "Kursi Besi/Metal",
            "nup": "3.05.02.01.003.653",
            "kondisi": "Baik",
            "pegawai": "Mario Fernando Rumahorbo S.Psi.",
            "nip": "200009122024211002",
            "jabatan": "Asesor Sumber Daya Manusia Aparatur Ahli Pertama",
            "no": 14
          },
          {
            "id": 198,
            "nama": "Kursi Besi/Metal",
            "nup": "3.05.02.01.003.701",
            "kondisi": "Baik",
            "pegawai": "Valderian Adhitya Damar Kumara, S.M",
            "nip": "199707262025051001",
            "jabatan": "Asesor Sumber Daya Manusia Aparatur Ahli Pertama",
            "no": 15
          },
          {
            "id": 199,
            "nama": "Meja Kerja Kayu",
            "nup": "3.05.02.01.002.286",
            "kondisi": "Baik",
            "pegawai": "Valderian Adhitya Damar Kumara, S.M",
            "nip": "199707262025051001",
            "jabatan": "Asesor Sumber Daya Manusia Aparatur Ahli Pertama",
            "no": 16
          },
          {
            "id": 200,
            "nama": "P.C Desktop HP + Keyboard + Mouse",
            "nup": "3.10.01.02.001.258",
            "kondisi": "Baik",
            "pegawai": "Valderian Adhitya Damar Kumara, S.M",
            "nip": "199707262025051001",
            "jabatan": "Asesor Sumber Daya Manusia Aparatur Ahli Pertama",
            "no": 17
          },
          {
            "id": 201,
            "nama": "Meja Kerja Kayu",
            "nup": "3.05.02.01.002.288",
            "kondisi": "Baik",
            "pegawai": "Martini Efriyanti Manurung A.Md",
            "nip": "199203242025052001",
            "jabatan": "Pranata Sumber Daya Manusia Aparatur Terampil",
            "no": 18
          },
          {
            "id": 202,
            "nama": "Kursi Besi/Metal",
            "nup": "3.05.02.01.003.664",
            "kondisi": "Baik",
            "pegawai": "Martini Efriyanti Manurung A.Md",
            "nip": "199203242025052001",
            "jabatan": "Pranata Sumber Daya Manusia Aparatur Terampil",
            "no": 19
          }
        ]
      },
      {
        "id": "humas-si",
        "nama": "Humas dan Sistem Informasi",
        "barang": [
          {
            "id": 95,
            "nama": "Laptop Thinkpad Lenovo",
            "nup": "3.10.01.02.002.197",
            "kondisi": "Baik",
            "pegawai": "Harryson Eddy Chandra S S.Sos., M.Pd.",
            "nip": "198303152009121003",
            "jabatan": "Pranata Hubungan Masyarakat Ahli Muda",
            "no": 1
          },
          {
            "id": 96,
            "nama": "Kursi Besi/Metal",
            "nup": "3.05.02.01.003.576",
            "kondisi": "Baik",
            "pegawai": "Harryson Eddy Chandra S S.Sos., M.Pd.",
            "nip": "198303152009121003",
            "jabatan": "Pranata Hubungan Masyarakat Ahli Muda",
            "no": 2
          },
          {
            "id": 97,
            "nama": "0",
            "nup": "0",
            "kondisi": "0",
            "pegawai": "Gloria Christine Yohanna De Fretes, S.Sos.",
            "nip": "198807302019032008",
            "jabatan": "Pranata Hubungan Masyarakat Ahli Pertama",
            "no": 3
          },
          {
            "id": 98,
            "nama": "0",
            "nup": "0",
            "kondisi": "0",
            "pegawai": "Reinhart Arthur Siahaan S.Kom.",
            "nip": "198704292019031002",
            "jabatan": "Pranata Hubungan Masyarakat Ahli Pertama",
            "no": 4
          },
          {
            "id": 99,
            "nama": "0",
            "nup": "0",
            "kondisi": "0",
            "pegawai": "Kurnia Palamaraska Surbakti S.Kom.",
            "nip": "199111102019031009",
            "jabatan": "Pranata Komputer Ahli Pertama",
            "no": 5
          },
          {
            "id": 100,
            "nama": "0",
            "nup": "0",
            "kondisi": "0",
            "pegawai": "Evanglie Risje Miraicel Manarisip, S.Th, M.Pd.K.",
            "nip": "198202062009011008",
            "jabatan": "Pranata Hubungan Masyarakat Ahli Pertama",
            "no": 6
          },
          {
            "id": 101,
            "nama": "Laptop DELL",
            "nup": "3.10.01.2.002.208",
            "kondisi": "Baik",
            "pegawai": "Rosalia Ade Dwiyanti Mekar S.Kom.",
            "nip": "199205212023212045",
            "jabatan": "Pranata Komputer Ahli Pertama",
            "no": 7
          },
          {
            "id": 102,
            "nama": "Kursi Rapat",
            "nup": "3.05.02.01.003.546",
            "kondisi": "Baik",
            "pegawai": "Rosalia Ade Dwiyanti Mekar S.Kom.",
            "nip": "199205212023212045",
            "jabatan": "Pranata Komputer Ahli Pertama",
            "no": 8
          },
          {
            "id": 103,
            "nama": "Kursi Besi/Metal",
            "nup": "3.05.02.01.003.371",
            "kondisi": "Baik",
            "pegawai": "Joane Amanda Sumbung S.Ds.",
            "nip": "199407122025212031",
            "jabatan": "Pranata Komputer Ahli Pertama",
            "no": 9
          },
          {
            "id": 104,
            "nama": "Kursi Besi/Metal",
            "nup": "3.05.02.01.003.369",
            "kondisi": "Baik",
            "pegawai": "Ryan Jose Dickson S.Kom",
            "nip": "200010232025051007",
            "jabatan": "Pranata Komputer Ahli Pertama",
            "no": 10
          },
          {
            "id": 105,
            "nama": "Monitor HP LE 185 1W +Mouse M205",
            "nup": "0",
            "kondisi": "Baik",
            "pegawai": "Gracia Theofani S.Kom.",
            "nip": "200004062025052007",
            "jabatan": "Pranata Komputer Ahli Pertama",
            "no": 11
          },
          {
            "id": 106,
            "nama": "Kursi Besi/Metal",
            "nup": "3.05.02.01.003.577",
            "kondisi": "Baik",
            "pegawai": "Gracia Theofani S.Kom.",
            "nip": "200004062025052007",
            "jabatan": "Pranata Komputer Ahli Pertama",
            "no": 12
          },
          {
            "id": 107,
            "nama": "Kursi Besi/Metal",
            "nup": "0",
            "kondisi": "Baik",
            "pegawai": "Aditya Mireykel Saroinsong, S.Kom.",
            "nip": "200106032025051004",
            "jabatan": "Pranata Komputer Ahli Pertama",
            "no": 13
          }
        ]
      }
    ]
  },
  {
    "id": "urusan-agama",
    "nama": "Direktorat Urusan Agama Kristen",
    "label": "Eselon II",
    "warna": "#16a34a",
    "warnaBg": "#f0fdf4",
    "bagian": [
      {
        "id": "kelembagaan",
        "nama": "Kelembagaan",
        "barang": []
      },
      {
        "id": "pupb",
        "nama": "PUPB (Pemberdayaan Umat & Pelayanan Bimbingan)",
        "barang": []
      },
      {
        "id": "penyuluh",
        "nama": "Penyuluh",
        "barang": []
      }
    ]
  },
  {
    "id": "pendidikan-kristen",
    "nama": "Direktorat Pendidikan Kristen",
    "label": "Eselon II",
    "warna": "#7c3aed",
    "warnaBg": "#faf5ff",
    "bagian": [
      {
        "id": "subdit-dasar",
        "nama": "Subdit Pendidikan Dasar",
        "barang": []
      },
      {
        "id": "subdit-menengah",
        "nama": "Subdit Pendidikan Menengah",
        "barang": []
      },
      {
        "id": "subdit-tinggi",
        "nama": "Subdit Pendidikan Tinggi",
        "barang": []
      }
    ]
  }
];

// ─── HELPERS ──────────────────────────────────────────────────────────────────
const totalBarangEselon = (es) => es.bagian.reduce((s, b) => s + b.barang.length, 0);

const emptyForm = () => ({
  eselonId: "", bagianId: "",
  pegawai: "", nip: "", jabatan: "",
  barang: [{ nama: "", nup: "", kondisi: "Baik" }],
});

// Kumpulkan semua pegawai unik (berdasarkan NIP) dari seluruh struktur, beserta
// lokasi (eselon/bagian) dan daftar barang yang jadi tanggung jawabnya. Dipakai
// khusus untuk mode pencarian nama/NIP pegawai.
const getAllPegawai = (struktur) => {
  const map = new Map();
  struktur.forEach((es) => {
    es.bagian.forEach((bg) => {
      bg.barang.forEach((b) => {
        if (!b.nip) return;
        const key = b.nip;
        if (!map.has(key)) {
          map.set(key, {
            nip: b.nip,
            nama: b.pegawai,
            jabatan: b.jabatan || "",
            eselonId: es.id, eselonNama: es.nama,
            bagianId: bg.id, bagianNama: bg.nama,
            warna: es.warna, warnaBg: es.warnaBg,
            barang: [],
          });
        }
        map.get(key).barang.push(b);
      });
    });
  });
  return Array.from(map.values());
};

// ─── KOMPONEN UTAMA ───────────────────────────────────────────────────────────
const DBRAdmin = () => {
  const [struktur, setStruktur] = useState(initialStruktur);

  const [activeEselonId, setActiveEselonId] = useState(null); // null = root
  const [detailBagian,   setDetailBagian]   = useState(null); // { eselon, bagian } — lihat/cetak per ruangan
  const [detailPegawai,  setDetailPegawai]  = useState(null); // pegawai object dari getAllPegawai

  const [search,          setSearch]          = useState("");
  const [showTambahModal, setShowTambahModal] = useState(false);
  const [form,            setForm]            = useState(emptyForm());

  const today = new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });

  const activeEselon = struktur.find(e => e.id === activeEselonId) || null;

  // Derived untuk form
  const eselonForm = struktur.find(e => e.id === form.eselonId) || null;
  const bagianForm = eselonForm ? eselonForm.bagian.find(b => b.id === form.bagianId) : null;
  // Daftar pegawai yang sudah pernah ditambahkan di bagian yang sedang dipilih di form —
  // dipakai buat autocomplete supaya tidak perlu ketik ulang nama/NIP yang sama.
  const pegawaiDiBagianForm = bagianForm
    ? Array.from(new Map(bagianForm.barang.map(b => [b.nip, b])).values())
    : [];

  // ── Form helpers ─────────────────────────────────────────────────────────────
  const tambahBarangForm = () => setForm(f => ({ ...f, barang: [...f.barang, { nama: "", nup: "", kondisi: "Baik" }] }));
  const hapusBarangForm  = (i) => { if (form.barang.length === 1) return; setForm(f => ({ ...f, barang: f.barang.filter((_, idx) => idx !== i) })); };
  const updateBarangForm = (i, field, val) => setForm(f => ({ ...f, barang: f.barang.map((b, idx) => idx === i ? { ...b, [field]: val } : b) }));

  // ── Submit ────────────────────────────────────────────────────────────────────
  // Barang baru otomatis masuk ke: (1) ruangan/bagian yang dipilih, dan
  // (2) DBR pegawai yang dipilih sebagai penanggung jawab — karena DBR pegawai
  // di komponen ini cuma "kacamata lain" dari data yang sama (lihat getAllPegawai).
  const handleSubmit = () => {
    if (!form.eselonId || !form.bagianId || !form.pegawai || !form.nip) return;
    const valid = form.barang.filter(b => b.nama && b.nup);
    if (valid.length === 0) return;

    setStruktur(prev => {
      const nextId = Math.max(0, ...prev.flatMap(e => e.bagian.flatMap(b => b.barang.map(br => br.id)))) + 1;
      return prev.map(es => {
        if (es.id !== form.eselonId) return es;
        return {
          ...es,
          bagian: es.bagian.map(bg => {
            if (bg.id !== form.bagianId) return bg;
            const tambahan = valid.map((b, i) => ({
              id: nextId + i,
              no: bg.barang.length + i + 1,
              nama: b.nama, nup: b.nup, kondisi: b.kondisi,
              pegawai: form.pegawai, nip: form.nip, jabatan: form.jabatan,
            }));
            return { ...bg, barang: [...bg.barang, ...tambahan] };
          }),
        };
      });
    });

    setShowTambahModal(false);
    setForm(emptyForm());
  };

  // ── Pencarian ─────────────────────────────────────────────────────────────────
  // Satu search box, DUA jenis hasil, keduanya dihitung independen (bukan fallback):
  //  1) cocok nama/NIP pegawai → tampil kotak-kotak DBR pegawai
  //  2) cocok nama bagian/fungsi (Keuangan, Hukum, SDM, dst) atau nama unit/eselon
  //     → tampil kotak-kotak ruangan/bagian itu
  // Kalau dua-duanya cocok, dua-duanya ditampilkan sekaligus (bertumpuk).
  // Semua ini HANYA muncul saat sedang ada ketikan pencarian (q tidak kosong).
  const q = search.trim().toLowerCase();
  const allPegawai = q ? getAllPegawai(struktur) : [];
  const hasilPegawai = q
    ? allPegawai.filter(p => p.nama.toLowerCase().includes(q) || p.nip.includes(q))
    : [];

  const semuaBagianFlat = struktur.flatMap(es =>
    es.bagian.map(bg => ({ eselon: es, bagian: bg }))
  );
  const hasilFungsi = q
    ? semuaBagianFlat.filter(({ eselon, bagian }) =>
        bagian.nama.toLowerCase().includes(q) || eselon.nama.toLowerCase().includes(q)
      )
    : [];

  // ── Breadcrumb ────────────────────────────────────────────────────────────────
  const Breadcrumb = () => (
    <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#64748b", marginBottom: 14, flexWrap: "wrap" }}>
      <button
        onClick={() => setActiveEselonId(null)}
        style={{ background: "none", border: "none", cursor: "pointer", color: activeEselon ? "#2563eb" : "#1e293b", fontWeight: activeEselon ? 600 : 700, padding: 0, fontSize: 12 }}
      >
        Ditjen Bimas Kristen
      </button>
      {activeEselon && (
        <>
          <span>›</span>
          <span style={{ color: "#1e293b", fontWeight: 700 }}>{activeEselon.nama}</span>
        </>
      )}
    </div>
  );

  // ── KotakCard ─────────────────────────────────────────────────────────────────
  const KotakCard = ({ title, label, subtitle, badge, warna = "#2563eb", warnaBg = "#eff6ff", onClick }) => (
    <div
      onClick={onClick}
      style={{
        background: "#fff", border: "1.5px solid #e2e8f0", borderRadius: 12,
        padding: "18px 20px", cursor: "pointer",
        transition: "box-shadow 0.15s, border-color 0.15s, transform 0.15s",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = `0 4px 16px ${warna}22`;
        e.currentTarget.style.borderColor = warna;
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.borderColor = "#e2e8f0";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {label && (
        <div style={{ fontSize: 10, fontWeight: 700, color: warna, background: warnaBg, padding: "2px 8px", borderRadius: 20, display: "inline-block", marginBottom: 8, letterSpacing: 0.5 }}>
          {label}
        </div>
      )}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: 14, color: "#1e293b", marginBottom: 3 }}>{title}</div>
          {subtitle && <div style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}>{subtitle}</div>}
        </div>
        <div style={{ color: warna, flexShrink: 0, marginLeft: 10 }}><IconDoc /></div>
      </div>
      {badge !== undefined && (
        <div style={{ background: warnaBg, color: warna, padding: "3px 10px", borderRadius: 6, fontSize: 11, fontWeight: 700, display: "inline-block", marginTop: 10 }}>
          {badge}
        </div>
      )}
    </div>
  );

  // ── Tabel barang (dipakai bareng di modal ruangan & modal pegawai) ────────────
  const TabelBarang = ({ barang }) => (
    barang.length === 0 ? (
      <div style={{ textAlign: "center", padding: "24px 0", color: "#94a3b8", fontSize: 13 }}>
        Belum ada barang yang terdaftar.
      </div>
    ) : (
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, marginBottom: 16 }}>
        <thead>
          <tr style={{ background: "#f8fafc" }}>
            {["No", "Nama Barang", "NUP", "Kondisi"].map(h => (
              <th key={h} style={{ padding: "8px 12px", textAlign: "left", fontWeight: 700, color: "#374151", borderBottom: "1.5px solid #e2e8f0" }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {barang.map((b, i) => (
            <tr key={b.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
              {/* Nomor selalu ikut urutan tampil (mulai dari 1), bukan nomor asli di ruangan —
                  supaya DBR per pegawai juga mulai dari 1, bukan ikutan nomor ruangan. */}
              <td style={{ padding: "8px 12px", color: "#64748b" }}>{i + 1}</td>
              <td style={{ padding: "8px 12px", color: "#1e293b", fontWeight: 600 }}>{b.nama}</td>
              <td style={{ padding: "8px 12px", color: "#64748b" }}>{b.nup}</td>
              <td style={{ padding: "8px 12px" }}><StatusBadge status={b.kondisi} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  );

  // ── Modal Detail Bagian (lihat & cetak DBR per ruangan) ───────────────────────
  const renderDetailBagian = () => {
    if (!detailBagian) return null;
    const { eselon, bagian } = detailBagian;
    return (
      <Modal title={`DBR — ${bagian.nama}`} onClose={() => setDetailBagian(null)} wide>
        <div id="dbr-detail-print">
          <div style={{ textAlign: "center", borderBottom: "2px solid #1e293b", paddingBottom: 10, marginBottom: 16 }}>
            <div style={{ fontWeight: 800, fontSize: 13 }}>KEMENTERIAN AGAMA REPUBLIK INDONESIA</div>
            <div style={{ fontSize: 11, color: "#64748b" }}>Direktorat Jenderal Bimbingan Masyarakat Kristen</div>
            <div style={{ fontSize: 11, color: "#64748b", marginTop: 2 }}>{eselon.nama}</div>
            <div style={{ fontWeight: 700, fontSize: 13, marginTop: 8, letterSpacing: 0.5 }}>
              DAFTAR BARANG RUANGAN (DBR)
            </div>
          </div>

          <div style={{ background: "#f8fafc", borderRadius: 8, padding: 14, marginBottom: 14, fontSize: 13 }}>
            {[
              ["Unit (Eselon)",   eselon.nama],
              ["Bagian / Ruang",  bagian.nama],
              ["Tanggal Cetak",   today],
            ].map(([k, v]) => (
              <div key={k} style={{ display: "flex", gap: 8, marginBottom: 4 }}>
                <span style={{ fontWeight: 600, width: 140, flexShrink: 0, color: "#475569" }}>{k}</span>
                <span style={{ flexShrink: 0, color: "#475569" }}>:</span>
                <span style={{ color: "#1e293b", fontWeight: 600 }}>{v}</span>
              </div>
            ))}
          </div>

          <TabelBarang barang={bagian.barang} />

          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginTop: 8, marginBottom: 14 }}>
            <div style={{ textAlign: "center", minWidth: 200 }}>
              <div style={{ fontWeight: 600 }}>Mengetahui,</div>
              <div style={{ fontSize: 12, color: "#64748b" }}>Kasubbag Perlengkapan dan BMN</div>
              <div style={{ height: 52 }} />
              <div style={{ borderTop: "1.5px solid #1e293b", paddingTop: 6 }}>
                <div style={{ color: "#94a3b8" }}>(________________________)</div>
                <div style={{ color: "#64748b", fontSize: 12 }}>NIP. .............................</div>
              </div>
            </div>
            <div style={{ textAlign: "center", minWidth: 220 }}>
              <div>Jakarta, {today}</div>
              <div style={{ fontWeight: 600 }}>Penanggung Jawab Ruangan,</div>
              <div style={{ height: 52 }} />
              <div style={{ borderTop: "1.5px solid #1e293b", paddingTop: 6 }}>
                <div style={{ color: "#94a3b8" }}>(________________________)</div>
                <div style={{ color: "#64748b", fontSize: 12 }}>NIP. .............................</div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", flexWrap: "wrap" }}>
          <AdminButton variant="outline" onClick={() => setDetailBagian(null)}>Tutup</AdminButton>
          <AdminButton variant="outline" onClick={() => window.print()}>🖨 Print</AdminButton>
          <AdminButton variant="success" onClick={() => downloadAsPDF("dbr-detail-print", `DBR-${bagian.nama}`)}>💾 Simpan PDF</AdminButton>
        </div>
      </Modal>
    );
  };

  // ── Modal Detail Pegawai (DBR milik satu pegawai — muncul cuma pas dicari) ────
  const renderDetailPegawai = () => {
    if (!detailPegawai) return null;
    const p = detailPegawai;
    return (
      <Modal title={`DBR Pegawai — ${p.nama}`} onClose={() => setDetailPegawai(null)} wide>
        <div id="dbr-pegawai-print">
          <div style={{ textAlign: "center", borderBottom: "2px solid #1e293b", paddingBottom: 10, marginBottom: 16 }}>
            <div style={{ fontWeight: 800, fontSize: 13 }}>KEMENTERIAN AGAMA REPUBLIK INDONESIA</div>
            <div style={{ fontSize: 11, color: "#64748b" }}>Direktorat Jenderal Bimbingan Masyarakat Kristen</div>
            <div style={{ fontWeight: 700, fontSize: 13, marginTop: 8, letterSpacing: 0.5 }}>
              DAFTAR BARANG RUANGAN (DBR) — REKAP PER PEGAWAI
            </div>
          </div>

          <div style={{ background: "#f8fafc", borderRadius: 8, padding: 14, marginBottom: 14, fontSize: 13 }}>
            {[
              ["Nama Pegawai", p.nama],
              ["NIP",          p.nip],
              ["Jabatan",      p.jabatan || "-"],
              ["Unit / Bagian", `${p.eselonNama} — ${p.bagianNama}`],
              ["Tanggal Cetak", today],
            ].map(([k, v]) => (
              <div key={k} style={{ display: "flex", gap: 8, marginBottom: 4 }}>
                <span style={{ fontWeight: 600, width: 140, flexShrink: 0, color: "#475569" }}>{k}</span>
                <span style={{ flexShrink: 0, color: "#475569" }}>:</span>
                <span style={{ color: "#1e293b", fontWeight: 600 }}>{v}</span>
              </div>
            ))}
          </div>

          <TabelBarang barang={p.barang} />
        </div>

        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", flexWrap: "wrap" }}>
          <AdminButton variant="outline" onClick={() => setDetailPegawai(null)}>Tutup</AdminButton>
          <AdminButton variant="outline" onClick={() => window.print()}>🖨 Print</AdminButton>
          <AdminButton variant="success" onClick={() => downloadAsPDF("dbr-pegawai-print", `DBR-${p.nama}`)}>💾 Simpan PDF</AdminButton>
        </div>
      </Modal>
    );
  };

  // ── Modal Tambah DBR ──────────────────────────────────────────────────────────
  const renderTambahModal = () => (
    <Modal title="Tambah DBR" onClose={() => { setShowTambahModal(false); setForm(emptyForm()); }} wide>
      <div style={{ fontSize: 13, fontWeight: 700, color: "#2563eb", marginBottom: 12, paddingBottom: 8, borderBottom: "1px solid #e2e8f0" }}>
        Lokasi Bagian
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 4 }}>
        <FormGroup label="Unit (Eselon)">
          <select style={inputStyle} value={form.eselonId}
            onChange={e => setForm(f => ({ ...f, eselonId: e.target.value, bagianId: "" }))}>
            <option value="">Pilih unit...</option>
            {struktur.map(es => <option key={es.id} value={es.id}>{es.nama}</option>)}
          </select>
        </FormGroup>
        <FormGroup label="Bagian / Ruang">
          <select style={inputStyle} value={form.bagianId} disabled={!eselonForm}
            onChange={e => setForm(f => ({ ...f, bagianId: e.target.value }))}>
            <option value="">Pilih bagian...</option>
            {eselonForm?.bagian.map(bg => <option key={bg.id} value={bg.id}>{bg.nama}</option>)}
          </select>
        </FormGroup>
      </div>

      <div style={{ fontSize: 13, fontWeight: 700, color: "#2563eb", margin: "16px 0 12px", paddingBottom: 8, borderBottom: "1px solid #e2e8f0" }}>
        Data Pegawai (Penanggung Jawab Barang)
      </div>
      {pegawaiDiBagianForm.length > 0 && (
        <div style={{ marginBottom: 10 }}>
          <FormGroup label="Pegawai yang sudah ada di bagian ini (opsional, klik buat isi otomatis)">
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {pegawaiDiBagianForm.map(p => (
                <button key={p.nip} type="button"
                  onClick={() => setForm(f => ({ ...f, pegawai: p.pegawai, nip: p.nip, jabatan: p.jabatan || "" }))}
                  style={{ fontSize: 11, padding: "4px 10px", borderRadius: 20, border: "1.5px solid #e2e8f0", background: "#f8fafc", color: "#475569", cursor: "pointer" }}>
                  {p.pegawai}
                </button>
              ))}
            </div>
          </FormGroup>
        </div>
      )}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        <FormGroup label="Nama Pegawai">
          <input style={inputStyle} value={form.pegawai}
            onChange={e => setForm(f => ({ ...f, pegawai: e.target.value }))}
            placeholder="Nama lengkap pegawai" />
        </FormGroup>
        <FormGroup label="NIP">
          <input style={inputStyle} value={form.nip}
            onChange={e => setForm(f => ({ ...f, nip: e.target.value }))}
            placeholder="Nomor Induk Pegawai" />
        </FormGroup>
      </div>
      <div style={{ marginTop: 8 }}>
        <FormGroup label="Jabatan (opsional)">
          <input style={inputStyle} value={form.jabatan}
            onChange={e => setForm(f => ({ ...f, jabatan: e.target.value }))}
            placeholder="Jabatan pegawai" />
        </FormGroup>
      </div>

      <div style={{ fontSize: 13, fontWeight: 700, color: "#2563eb", margin: "16px 0 12px", paddingBottom: 8, borderBottom: "1px solid #e2e8f0" }}>
        Daftar Barang
      </div>
      {form.barang.map((b, i) => (
        <div key={i} style={{ display: "grid", gridTemplateColumns: "2fr 1.5fr 1fr auto", gap: 10, marginBottom: 10, alignItems: "flex-end" }}>
          <FormGroup label={i === 0 ? "Nama Barang" : ""}>
            <input style={inputStyle} value={b.nama}
              onChange={e => updateBarangForm(i, "nama", e.target.value)}
              placeholder="Nama barang" />
          </FormGroup>
          <FormGroup label={i === 0 ? "NUP" : ""}>
            <input style={inputStyle} value={b.nup}
              onChange={e => updateBarangForm(i, "nup", e.target.value)}
              placeholder="3.XX.XX.XX.XXX.XXX" />
          </FormGroup>
          <FormGroup label={i === 0 ? "Kondisi" : ""}>
            <select style={inputStyle} value={b.kondisi}
              onChange={e => updateBarangForm(i, "kondisi", e.target.value)}>
              <option>Baik</option>
              <option>Rusak Ringan</option>
              <option>Rusak Berat</option>
            </select>
          </FormGroup>
          <button onClick={() => hapusBarangForm(i)} disabled={form.barang.length === 1}
            style={{ padding: "9px 10px", border: "1.5px solid #fee2e2", borderRadius: 8, background: "#fff", cursor: form.barang.length === 1 ? "not-allowed" : "pointer", color: "#dc2626", opacity: form.barang.length === 1 ? 0.3 : 1, marginBottom: 14 }}>
            <IconTrash />
          </button>
        </div>
      ))}

      <button onClick={tambahBarangForm}
        style={{ display: "flex", alignItems: "center", gap: 6, border: "1.5px dashed #2563eb", borderRadius: 8, background: "#eff6ff", color: "#2563eb", padding: "8px 16px", fontWeight: 600, fontSize: 13, cursor: "pointer", width: "100%", justifyContent: "center", marginBottom: 14 }}>
        <IconPlus /> Tambah Barang
      </button>

      <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
        <AdminButton variant="outline" onClick={() => { setShowTambahModal(false); setForm(emptyForm()); }}>Batal</AdminButton>
        <AdminButton onClick={handleSubmit}>Simpan DBR</AdminButton>
      </div>
    </Modal>
  );

  // ── Header ────────────────────────────────────────────────────────────────────
  const renderHeader = () => (
    <AdminHeaderCard
      title="DBR — Daftar Barang Ruangan"
      subtitle="Inventaris barang per ruangan & per pegawai — Ditjen Bimbingan Masyarakat Kristen"
      search={search}
      onSearchChange={v => { setSearch(v); setActiveEselonId(null); }}
      searchPlaceholder="Cari nama/NIP pegawai, atau nama ruangan/unit..."
      rightAction={
        <AdminButton onClick={() => setShowTambahModal(true)} style={{ background: "#fff", color: "#2563eb", whiteSpace: "nowrap" }}>
          + Tambah DBR
        </AdminButton>
      }
    />
  );

  // ── TAMPILAN: Hasil Pencarian (pegawai + fungsi/bagian, bisa tampil bareng) ──
  if (q) {
    const adaHasil = hasilPegawai.length > 0 || hasilFungsi.length > 0;
    return (
      <div>
        {renderHeader()}

        {hasilPegawai.length > 0 && (
          <div style={{ marginBottom: hasilFungsi.length > 0 ? 26 : 0 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#374151", marginBottom: 10 }}>
              👤 Berdasarkan Pegawai — {hasilPegawai.length} ditemukan
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              {hasilPegawai.map(p => (
                <KotakCard
                  key={p.nip}
                  label={p.jabatan || undefined}
                  title={p.nama}
                  subtitle={`${p.eselonNama} — ${p.bagianNama}`}
                  badge={`${p.barang.length} barang`}
                  warna={p.warna}
                  warnaBg={p.warnaBg}
                  onClick={() => setDetailPegawai(p)}
                />
              ))}
            </div>
          </div>
        )}

        {hasilFungsi.length > 0 && (
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#374151", marginBottom: 10 }}>
              🗂 Berdasarkan Bagian / Fungsi — {hasilFungsi.length} ditemukan
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              {hasilFungsi.map(({ eselon, bagian }) => (
                <KotakCard
                  key={bagian.id}
                  title={bagian.nama}
                  subtitle={eselon.nama}
                  badge={`${bagian.barang.length} barang`}
                  warna={eselon.warna}
                  warnaBg={eselon.warnaBg}
                  onClick={() => setDetailBagian({ eselon, bagian })}
                />
              ))}
            </div>
          </div>
        )}

        {!adaHasil && (
          <div style={{ color: "#94a3b8", fontSize: 13, textAlign: "center", padding: 30 }}>
            Tidak ada pegawai maupun bagian/fungsi yang cocok dengan "{search}".
          </div>
        )}

        {detailPegawai && renderDetailPegawai()}
        {detailBagian && renderDetailBagian()}
        {showTambahModal && renderTambahModal()}
      </div>
    );
  }

  // ── TAMPILAN: Level Bagian (sudah pilih eselon) ───────────────────────────────
  if (activeEselon) {
    return (
      <div>
        {renderHeader()}
        <Breadcrumb />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          {activeEselon.bagian.map(bg => (
            <KotakCard
              key={bg.id}
              title={bg.nama}
              badge={`${bg.barang.length} barang terdaftar`}
              warna={activeEselon.warna}
              warnaBg={activeEselon.warnaBg}
              onClick={() => setDetailBagian({ eselon: activeEselon, bagian: bg })}
            />
          ))}
        </div>
        {detailBagian && renderDetailBagian()}
        {showTambahModal && renderTambahModal()}
      </div>
    );
  }

  // ── TAMPILAN: Root — Eselon I & Eselon II ────────────────────────────────────
  return (
    <div>
      {renderHeader()}
      <div style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", marginBottom: 12, letterSpacing: 0.8 }}>
        DIREKTORAT JENDERAL BIMBINGAN MASYARAKAT KRISTEN — KEMENTERIAN AGAMA RI
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: 14 }}>
        {struktur.map(es => (
          <KotakCard
            key={es.id}
            label={es.label}
            title={es.nama}
            subtitle={`${es.bagian.length} bagian/ruang`}
            badge={`${totalBarangEselon(es)} barang terdaftar`}
            warna={es.warna}
            warnaBg={es.warnaBg}
            onClick={() => setActiveEselonId(es.id)}
          />
        ))}
      </div>
      {detailBagian && renderDetailBagian()}
      {showTambahModal && renderTambahModal()}
    </div>
  );
};

export default DBRAdmin;