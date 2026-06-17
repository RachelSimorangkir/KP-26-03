// ─── USER LOGIN DUMMY ─────────────────────────────────────────────────────────
export const currentUser = {
  nama: "Nana Suryana",
  nip: "199203152018032001",
  jabatan: "Staf Administrasi",
  unitKerja: "Sub Bagian Umum",
};

// ─── STOK BARANG ─────────────────────────────────────────────────────────────
export const stokBarang = [
  { id: 1, kategori: "Elektronik", nama: "Printer HP LaserJet Pro M404n", kode: "PRN-001", stok: 3 },
  { id: 2, kategori: "Elektronik", nama: "Proyektor Epson EB-X41", kode: "PRY-001", stok: 2 },
  { id: 3, kategori: "Elektronik", nama: "Laptop Dell Latitude 5540", kode: "LPT-001", stok: 5 },
  { id: 4, kategori: "Elektronik", nama: "LCD Monitor LG 24 inch", kode: "MON-001", stok: 4 },
  { id: 5, kategori: "Elektronik", nama: "Kamera Canon EOS M50", kode: "KMR-001", stok: 1 },
  { id: 6, kategori: "Furnitur", nama: "Kursi Kerja Ergonomis", kode: "KRS-001", stok: 8 },
  { id: 7, kategori: "Furnitur", nama: "Meja Lipat Portable", kode: "MJL-001", stok: 6 },
  { id: 8, kategori: "Ruangan", nama: "Ruang Meeting Lt. 2", kode: "RMT-001", stok: 1 },
  { id: 9, kategori: "Ruangan", nama: "Aula Serbaguna", kode: "AUL-001", stok: 1 },
];

// Kata kunci pencarian → hasil dropdown
export const kategoriBarang = ["Printer", "Proyektor", "Laptop", "Monitor", "Kamera", "Kursi", "Meja", "Ruang Meeting", "Aula"];

// ─── STOK BARANG HABIS PAKAI ──────────────────────────────────────────────────
export const stokHabisPakai = [
  { id: 1, nama: "Kertas HVS A4 80gr", satuan: "Rim", stok: 45 },
  { id: 2, nama: "Pulpen Pilot G2", satuan: "Lusin", stok: 12 },
  { id: 3, nama: "Tinta Printer HP 678", satuan: "Botol", stok: 8 },
  { id: 4, nama: "Baterai AA Energizer", satuan: "Pack", stok: 20 },
  { id: 5, nama: "Amplop Coklat Folio", satuan: "Pack", stok: 15 },
  { id: 6, nama: "Staples Besar", satuan: "Box", stok: 10 },
  { id: 7, nama: "Map Plastik", satuan: "Lusin", stok: 6 },
  { id: 8, nama: "Spidol Whiteboard", satuan: "Lusin", stok: 4 },
  { id: 9, nama: "Post-it Note", satuan: "Pack", stok: 18 },
  { id: 10, nama: "Isolasi Bening", satuan: "Buah", stok: 24 },
];

// ─── DATA PEMINJAMAN ──────────────────────────────────────────────────────────
export const dummyPeminjaman = [
  {
    id: 1, nomorSurat: "PJM-2026-001",
    peminjam: { nama: "Nana Suryana", nip: "199203152018032001", jabatan: "Staf Administrasi", unitKerja: "Sub Bagian Umum" },
    barang: { id: 2, nama: "Proyektor Epson EB-X41", kode: "PRY-001" },
    lokasi: "Ruang Rapat Lt. 3", tglPinjam: "2026-06-10", tglKembali: "2026-06-12",
    keperluan: "Presentasi laporan bulanan",
    status: "Dipinjam", kondisiKembali: null,
  },
  {
    id: 2, nomorSurat: "PJM-2026-002",
    peminjam: { nama: "Ahmad Fauzi", nip: "198505102010011003", jabatan: "Kepala Sub Bagian", unitKerja: "Sub Bagian Umum" },
    barang: { id: 1, nama: "Printer HP LaserJet Pro M404n", kode: "PRN-001" },
    lokasi: "Ruang Kerja Lt. 2", tglPinjam: "2026-06-08", tglKembali: "2026-06-09",
    keperluan: "Cetak dokumen SKP",
    status: "Dikembalikan", kondisiKembali: "Baik",
  },
  {
    id: 3, nomorSurat: "PJM-2026-003",
    peminjam: { nama: "Budi Santoso", nip: "198012252005011002", jabatan: "Analis Kebijakan", unitKerja: "Bidang Bimas Kristen" },
    barang: { id: 8, nama: "Ruang Meeting Lt. 2", kode: "RMT-001" },
    lokasi: "Gedung Utama", tglPinjam: "2026-06-15", tglKembali: "2026-06-15",
    keperluan: "Rapat koordinasi internal",
    status: "Diajukan", kondisiKembali: null,
  },
];

// ─── DATA PERMINTAAN ──────────────────────────────────────────────────────────
export const dummyPermintaan = [
  {
    id: 1, nomorSurat: "PPB-2026-001",
    pemohon: { nama: "Nana Suryana", nip: "199203152018032001", unitKerja: "Sub Bagian Umum" },
    tanggal: "2026-06-10",
    items: [
      { no: 1, nama: "Kertas HVS A4 80gr", jumlahMinta: 5, jumlahAkhir: 5, keterangan: "Untuk cetak laporan" },
      { no: 2, nama: "Pulpen Pilot G2", jumlahMinta: 2, jumlahAkhir: 2, keterangan: "" },
    ],
    status: "Pending",
    petugasGudang: { nama: "", nip: "" },
    penerima: { nama: "Nana Suryana", nip: "199203152018032001" },
  },
  {
    id: 2, nomorSurat: "PPB-2026-002",
    pemohon: { nama: "Siti Rahayu", nip: "197803142006042001", unitKerja: "Bidang Pelayanan" },
    tanggal: "2026-06-08",
    items: [
      { no: 1, nama: "Tinta Printer HP 678", jumlahMinta: 3, jumlahAkhir: 3, keterangan: "Habis" },
    ],
    status: "Disetujui",
    petugasGudang: { nama: "Dewi Kusuma", nip: "199001012015032003" },
    penerima: { nama: "Siti Rahayu", nip: "197803142006042001" },
  },
];

// ─── DATA BARANG MASUK ────────────────────────────────────────────────────────
export const dummyBarangMasuk = [
  { id: 1, noPengadaan: "PBJ-2026-001", namaBarang: "Laptop Dell Latitude 5540", kategori: "Peralatan IT", jumlah: 5, kondisi: "Baik", nilaiUnit: "Rp 15.000.000", pj: "Ahmad Fauzi", nipPj: "198505102010011003", tanggal: "2026-05-28" },
  { id: 2, noPengadaan: "PBJ-2026-002", namaBarang: "Kursi Kerja Ergonomis", kategori: "Perabot", jumlah: 10, kondisi: "Baik", nilaiUnit: "Rp 3.500.000", pj: "Dewi Kusuma", nipPj: "199001012015032003", tanggal: "2026-05-29" },
  { id: 3, noPengadaan: "PBJ-2026-003", namaBarang: "Proyektor Epson EB-X41", kategori: "Peralatan IT", jumlah: 2, kondisi: "Baik", nilaiUnit: "Rp 8.000.000", pj: "Ahmad Fauzi", nipPj: "198505102010011003", tanggal: "2026-06-02" },
];

// ─── DATA DBR ─────────────────────────────────────────────────────────────────
export const dummyDBR = [
  {
    id: 1, nama: "Nana Suryana", nip: "199203152018032001", jabatan: "Staf Administrasi", ruangan: "Ruang Administrasi Lt. 1",
    barang: [
      { no: 1, nama: "Meja Kerja Standar", nup: "BMN-006-2020", kondisi: "Baik" },
      { no: 2, nama: "Kursi Kerja", nup: "BMN-007-2021", kondisi: "Baik" },
      { no: 3, nama: "PC Desktop", nup: "BMN-008-2022", kondisi: "Baik" },
      { no: 4, nama: "Lemari Arsip", nup: "BMN-009-2023", kondisi: "Baik" },
    ]
  },
  {
    id: 2, nama: "Ahmad Fauzi", nip: "198505102010011003", jabatan: "Kepala Sub Bagian Umum", ruangan: "Ruang Kepala Sub Bagian Lt. 2",
    barang: [
      { no: 1, nama: "Meja Kerja Kayu Jati", nup: "BMN-001-2020", kondisi: "Baik" },
      { no: 2, nama: "Kursi Kerja Ergonomis", nup: "BMN-002-2021", kondisi: "Baik" },
      { no: 3, nama: "Laptop Dell Latitude", nup: "BMN-003-2022", kondisi: "Baik" },
      { no: 4, nama: "LCD Monitor 24 inch", nup: "BMN-004-2022", kondisi: "Baik" },
      { no: 5, nama: "Printer HP Laserjet", nup: "BMN-005-2023", kondisi: "Rusak Ringan" },
    ]
  },
  {
    id: 3, nama: "Budi Santoso", nip: "198012252005011002", jabatan: "Analis Kebijakan", ruangan: "Ruang Analis Lt. 3",
    barang: [
      { no: 1, nama: "Meja Kerja Standar", nup: "BMN-010-2020", kondisi: "Baik" },
      { no: 2, nama: "Kursi Kerja Ergonomis", nup: "BMN-011-2021", kondisi: "Baik" },
      { no: 3, nama: "Laptop Dell Latitude", nup: "BMN-012-2023", kondisi: "Baik" },
    ]
  },
];

// ─── DATA PEMELIHARAAN ────────────────────────────────────────────────────────
export const dummyPemeliharaan = [
  {
    id: 1, nomorSurat: "PML-2026-001",
    pemohon: { nama: "Ahmad Fauzi", nip: "198505102010011003" },
    barang: [
      { nama: "Printer HP Laserjet", nup: "BMN-005-2023" },
    ],
    keterangan: "Printer sering macet saat mencetak dan hasil cetak bergaris.",
    tanggal: "2026-06-10",
    status: "Diajukan",
    catatanAdmin: "",
  },
  {
    id: 2, nomorSurat: "PML-2026-002",
    pemohon: { nama: "Budi Santoso", nip: "198012252005011002" },
    barang: [
      { nama: "Laptop Dell Latitude", nup: "BMN-012-2023" },
    ],
    keterangan: "Laptop sering hang dan baterai cepat habis.",
    tanggal: "2026-06-05",
    status: "Selesai",
    catatanAdmin: "Sudah diganti baterai dan dibersihkan kipas internal.",
  },
];