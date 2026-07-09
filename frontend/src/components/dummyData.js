export const stokBarang = [
  { nama: "Laptop Dell Latitude", jumlah: 12 },
  { nama: "Proyektor Epson EB-X41", jumlah: 5 },
  { nama: "Kamera Canon EOS M50", jumlah: 3 },
  { nama: "Printer HP Laserjet", jumlah: 8 },
  { nama: "LCD Monitor 24 inch", jumlah: 15 },
  { nama: "Kursi Kerja Ergonomis", jumlah: 20 },
];

export const dummyPeminjaman = [
  { id: 1, nama: "Ahmad Fauzi", nip: "198505102010011003", jabatan: "Kepala Sub Bagian Umum", barang: "Laptop Dell Latitude", jumlah: 1, tglPinjam: "2026-06-01", tglKembali: "2026-06-15", status: "Dipinjam" },
  { id: 2, nama: "Siti Rahayu", nip: "197803142006042001", jabatan: "Staf Administrasi", barang: "Proyektor Epson EB-X41", jumlah: 1, tglPinjam: "2026-06-03", tglKembali: "2026-06-10", status: "Dikembalikan" },
  { id: 3, nama: "Budi Santoso", nip: "198012252005011002", jabatan: "Analis Kebijakan", barang: "Kamera Canon EOS M50", jumlah: 1, tglPinjam: "2026-06-05", tglKembali: "2026-06-20", status: "Dipinjam" },
];

export const dummyPermintaan = [
  { id: 1, nip: "197803142006042001", nama: "Siti Rahayu", tipe: "PNS", barang: "Kursi Kerja Ergonomis", keterangan: "-", tanggal: "2026-06-01", status: "Pending" },
  { id: 2, nip: "198012252005011002", nama: "Budi Santoso", tipe: "PNS", barang: "Laptop", keterangan: "Tersedia", tanggal: "2026-05-30", status: "Disetujui" },
  { id: 3, nip: "199001012015032003", nama: "Maria Selviana", tipe: "PPPK", barang: "Monitor", keterangan: "Stok kosong", tanggal: "2026-05-28", status: "Ditolak" },
  { id: 4, nip: "198505102010011003", nama: "Ahmad Fauzi", tipe: "PNS", barang: "Printer HP Laserjet", keterangan: "-", tanggal: "2026-06-08", status: "Pending" },
  { id: 5, nip: "197803142006042001", nama: "Dewi Kusuma", tipe: "PNS", barang: "LCD Monitor", keterangan: "-", tanggal: "2026-06-09", status: "Disetujui" },
];

export const dummyBarangMasuk = [
  { id: 1, noPengadaan: "PBJ-2026-001", namaBarang: "Laptop Dell Latitude 5540", kategori: "Peralatan IT", jumlah: 5, kondisi: "Baik", nilaiUnit: "Rp 15.000.000", pj: "Ahmad Fauzi", nipPj: "198505102010011003", tanggal: "2026-05-28" },
  { id: 2, noPengadaan: "PBJ-2026-002", namaBarang: "Kursi Kerja Ergonomis", kategori: "Perabot", jumlah: 10, kondisi: "Baik", nilaiUnit: "Rp 3.500.000", pj: "Dewi Kusuma", nipPj: "199203152018032001", tanggal: "2026-05-29" },
  { id: 3, noPengadaan: "PBJ-2026-003", namaBarang: "Proyektor Epson EB-X41", kategori: "Peralatan IT", jumlah: 2, kondisi: "Baik", nilaiUnit: "Rp 8.000.000", pj: "Ahmad Fauzi", nipPj: "198505102010011003", tanggal: "2026-06-02" },
];

export const dummyDBR = [
  {
    id: 1, nama: "Ahmad Fauzi", nip: "198505102010011003", jabatan: "Kepala Sub Bagian Umum", ruangan: "Ruang Kepala Sub Bagian Lt. 2",
    barang: [
      { nama: "Meja Kerja Kayu Jati", nup: "BMN-001-2020" },
      { nama: "Kursi Kerja Ergonomis", nup: "BMN-002-2021" },
      { nama: "Laptop Dell Latitude", nup: "BMN-003-2022" },
      { nama: "LCD Monitor 24 inch", nup: "BMN-004-2022" },
      { nama: "Printer HP Laserjet", nup: "BMN-005-2023" },
    ]
  },
  {
    id: 2, nama: "Siti Rahayu", nip: "197803142006042001", jabatan: "Staf Administrasi", ruangan: "Ruang Administrasi Lt. 1",
    barang: [
      { nama: "Meja Kerja Standar", nup: "BMN-006-2020" },
      { nama: "Kursi Kerja", nup: "BMN-007-2021" },
      { nama: "PC Desktop", nup: "BMN-008-2022" },
      { nama: "Lemari Arsip", nup: "BMN-009-2023" },
    ]
  },
  {
    id: 3, nama: "Budi Santoso", nip: "198012252005011002", jabatan: "Analis Kebijakan", ruangan: "Ruang Analis Lt. 3",
    barang: [
      { nama: "Meja Kerja Standar", nup: "BMN-010-2020" },
      { nama: "Kursi Kerja Ergonomis", nup: "BMN-011-2021" },
      { nama: "Laptop Dell Latitude", nup: "BMN-012-2023" },
    ]
  },
];