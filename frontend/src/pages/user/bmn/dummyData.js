// ─── USER LOGIN ───────────────────────────────────────────────────────────────
// currentUser ini akan otomatis diisi dengan data hasil login (lewat
// setCurrentUserOverride). Nilai default di bawah hanya dipakai sebagai
// fallback kalau halaman dibuka tanpa proses login (misal saat development).
export const currentUser = {
  nama: "Pegawai",
  nip: "",
  jabatan: "",
  unitKerja: "Bimas Kristen",
};

export const setCurrentUserOverride = (userData) => {
  currentUser.nama = userData.nama;
  currentUser.nip = userData.nip;
  currentUser.jabatan = userData.jabatan;
  currentUser.unitKerja = userData.unitKerja || "Bimas Kristen";
};

// ─── STOK BARANG ─────────────────────────────────────────────────────────────
export const stokBarang = [
  { id: 1, kategori: "Alat Tulis Kantor", nama: "Kertas HVS", kode: "PRN-001", stok: 3 },
  { id: 2, kategori: "Peralatan Kantor", nama: "Lapyop", kode: "PRY-001", stok: 2 },
  { id: 3, kategori: "Meubelier", nama: "Kursi Kantor", kode: "LPT-001", stok: 5 },
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
  { id: 1, noPengadaan: "PBJ-2026-001", namaBarang: "Laptop Dell Latitude 5540", kategori: "Peralatan Kantor", jumlah: 5, kondisi: "Baik", nilaiUnit: "Rp 15.000.000", pj: "Ahmad Fauzi", nipPj: "198505102010011003", tanggal: "2026-05-28" },
  { id: 2, noPengadaan: "PBJ-2026-002", namaBarang: "Kursi Kerja Ergonomis", kategori: "Meubelier", jumlah: 10, kondisi: "Baik", nilaiUnit: "Rp 3.500.000", pj: "Dewi Kusuma", nipPj: "199001012015032003", tanggal: "2026-05-29" },
  { id: 3, noPengadaan: "PBJ-2026-003", namaBarang: "Proyektor Epson EB-X41", kategori: "Peralatan Kantor", jumlah: 2, kondisi: "Baik", nilaiUnit: "Rp 8.000.000", pj: "Ahmad Fauzi", nipPj: "198505102010011003", tanggal: "2026-06-02" },
];

// ─── DATA DBR (Struktur: Unit Eselon 2 → Divisi/Bagian → Ruangan → Barang) ────
// Setiap barang punya field `pegawai` & `nip` untuk menandai siapa pemegang/
// penanggung jawab barang tersebut (dipakai oleh DBRUser untuk menampilkan
// "DBR Saya" milik pegawai yang login), tapi tampilannya di level ruangan
// tetap berupa SATU daftar barang gabungan (tidak dikelompokkan per pegawai).
export const dbrStruktur = [
  {
    id: "direktorat",
    nama: "Direktorat",
    divisi: [
      {
        id: "direktorat-tu",
        nama: "Tata Usaha Direktorat",
        ruangan: [
          {
            id: "ruang-direktur",
            nama: "Ruang Direktur",
            barang: [
              { id: 1, no: 1, nama: "Meja Kerja Direktur", nup: "3.05.02.01.002.401", kondisi: "Baik", pegawai: "Drs. Hasanuddin, M.Pd", nip: "196503121990031001" },
              { id: 2, no: 2, nama: "Kursi Kerja Direktur", nup: "3.05.02.01.003.402", kondisi: "Baik", pegawai: "Drs. Hasanuddin, M.Pd", nip: "196503121990031001" },
              { id: 3, no: 3, nama: "Sofa Tamu Set", nup: "3.05.02.01.004.403", kondisi: "Baik", pegawai: "Drs. Hasanuddin, M.Pd", nip: "196503121990031001" },
              { id: 4, no: 4, nama: "Laptop Lenovo ThinkPad", nup: "3.10.01.02.002.404", kondisi: "Baik", pegawai: "Drs. Hasanuddin, M.Pd", nip: "196503121990031001" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "sekretariat",
    nama: "Sekretariat",
    divisi: [
      {
        id: "kepegawaian",
        nama: "Kepegawaian",
        ruangan: [
          {
            id: "ruang-kepegawaian",
            nama: "Ruang Kepegawaian",
            barang: [],
          },
        ],
      },
      {
        id: "data",
        nama: "Data",
        ruangan: [
          {
            id: "ruang-data",
            nama: "Ruang Pengolahan Data",
            barang: [],
          },
        ],
      },
      {
        id: "umum",
        nama: "Umum",
        ruangan: [
          {
            id: "ruang-keuangan",
            nama: "Ruang Keuangan",
            barang: [
              { id: 5, no: 1, nama: "Kursi Besi/Metal", nup: "3.05.02.01.003.290", kondisi: "Baik", pegawai: "Ros", nip: "198801012015032010" },
              { id: 6, no: 2, nama: "Printer", nup: "3.10.02.03.003.117", kondisi: "Baik", pegawai: "Ros", nip: "198801012015032010" },
              { id: 7, no: 3, nama: "Desktop PC", nup: "3.10.01.02.001.258", kondisi: "Baik", pegawai: "Ros", nip: "198801012015032010" },
              { id: 8, no: 4, nama: "Meja Kerja Kayu", nup: "3.05.02.01.002.303", kondisi: "Baik", pegawai: "Ros", nip: "198801012015032010" },
              { id: 9, no: 5, nama: "Filling Cabinet Besi", nup: "3.05.01.04.005.81", kondisi: "Baik", pegawai: "Ros", nip: "198801012015032010" },
              { id: 10, no: 6, nama: "Kursi Besi/Metal", nup: "3.05.02.01.003.744", kondisi: "Baik", pegawai: "Artha", nip: "198902022016032011" },
              { id: 11, no: 7, nama: "Filling Cabinet Besi (3)", nup: "", kondisi: "Baik", pegawai: "Artha", nip: "198902022016032011" },
              { id: 12, no: 8, nama: "Printer", nup: "3.10.02.03.003.175", kondisi: "Baik", pegawai: "Artha", nip: "198902022016032011" },
              { id: 13, no: 9, nama: "Meja Kerja Kayu Persegi", nup: "3.05.02.01.002.308", kondisi: "Baik", pegawai: "Artha", nip: "198902022016032011" },
              { id: 14, no: 10, nama: "Kursi Besi/Metal", nup: "3.05.02.01.003.744", kondisi: "Baik", pegawai: "Junita", nip: "199003032017032012" },
              { id: 15, no: 11, nama: "Printer", nup: "3.10.02.03.003.160", kondisi: "Baik", pegawai: "Junita", nip: "199003032017032012" },
              { id: 16, no: 12, nama: "Desktop PC + Keyboard + Mouse", nup: "3.10.01.02.001.274", kondisi: "Baik", pegawai: "Junita", nip: "199003032017032012" },
              { id: 17, no: 13, nama: "Filling Cabinet Kecil", nup: "", kondisi: "Baik", pegawai: "Junita", nip: "199003032017032012" },
              { id: 18, no: 14, nama: "Desktop PC + Keyboard + Mouse", nup: "3.10.01.02.001.275", kondisi: "Baik", pegawai: "Edel", nip: "199104042018032013" },
              { id: 19, no: 15, nama: "Kursi Besi/Metal", nup: "", kondisi: "Baik", pegawai: "Edel", nip: "199104042018032013" },
              { id: 20, no: 16, nama: "Filling Cabinet Kecil (2)", nup: "", kondisi: "Baik", pegawai: "Edel", nip: "199104042018032013" },
              { id: 21, no: 17, nama: "Desktop PC HP + Keyboard + Mouse", nup: "3.10.01.02.001.352", kondisi: "Baik", pegawai: "Andrei", nip: "199205052019032014" },
              { id: 22, no: 18, nama: "Kursi Besi/Metal", nup: "3.05.02.01.003.295", kondisi: "Baik", pegawai: "Andrei", nip: "199205052019032014" },
              { id: 23, no: 19, nama: "Printer", nup: "3.10.02.03.003.153", kondisi: "Baik", pegawai: "Andrei", nip: "199205052019032014" },
              { id: 24, no: 20, nama: "Lemari Besi/Metal", nup: "3.05.01.04.001.114", kondisi: "Baik", pegawai: "Pojok Keuangan", nip: "" },
              { id: 25, no: 21, nama: "Meja Kerja Kayu", nup: "3.05.02.01.002.278", kondisi: "Baik", pegawai: "Pojok Keuangan", nip: "" },
              { id: 26, no: 22, nama: "Filling Cabinet", nup: "3.05.01.04.001.112", kondisi: "Baik", pegawai: "Pojok Keuangan", nip: "" },
            ],
          },
          {
            id: "ruang-humas",
            nama: "Ruang Humas",
            barang: [
              { id: 27, no: 1, nama: "Kursi Besi/Metal", nup: "3.05.02.01.003.369", kondisi: "Baik", pegawai: "Ryan Jose", nip: "199306062019031015" },
              { id: 28, no: 2, nama: "Monitor HP LE 185 1W + Mouse M205", nup: "", kondisi: "Baik", pegawai: "Gracia Thefani", nip: "199407072020032016" },
              { id: 29, no: 3, nama: "Kursi Besi/Metal", nup: "3.05.02.01.003.577", kondisi: "Baik", pegawai: "Gracia Thefani", nip: "199407072020032016" },
              { id: 30, no: 4, nama: "Desktop PC DELL", nup: "3.10.01.02.002.208", kondisi: "Baik", pegawai: "Rosa", nip: "199508082021032017" },
              { id: 31, no: 5, nama: "Laptop Thinkpad Lenovo", nup: "3.10.01.02.002.197", kondisi: "Baik", pegawai: "Harryson", nip: "199609092021031018" },
              { id: 32, no: 6, nama: "Laptop DELL Latitude 3480", nup: "3.10.01.02.002.175", kondisi: "Baik", pegawai: "Mulatua", nip: "199710102022031019" },
              { id: 33, no: 7, nama: "Printer HP LaserJet Pro 4003 dn", nup: "3.10.02.03.003.176", kondisi: "Baik", pegawai: "Mulatua", nip: "199710102022031019" },
            ],
          },
        ],
      },
      {
        id: "bmn",
        nama: "BMN",
        ruangan: [
          {
            id: "ruang-bmn",
            nama: "Ruang BMN",
            barang: [
              { id: 34, no: 1, nama: "Desktop PC DELL + Keyboard + Mouse", nup: "3.10.01.02.001.320", kondisi: "Baik", pegawai: "Roynardo", nip: "199801012023031001" },
              { id: 35, no: 2, nama: "Printer Canon G 3010", nup: "3.10.02.03.003.163", kondisi: "Baik", pegawai: "Roynardo", nip: "199801012023031001" },
              { id: 36, no: 3, nama: "Meja Kerja Kayu", nup: "3.05.02.01.002.320", kondisi: "Baik", pegawai: "Roynardo", nip: "199801012023031001" },
              { id: 37, no: 4, nama: "Kursi Besi/Metal", nup: "3.05.02.01.003.265", kondisi: "Baik", pegawai: "Roynardo", nip: "199801012023031001" },
              { id: 38, no: 5, nama: "Meja Kerja Kayu", nup: "3.05.02.01.002.317", kondisi: "Baik", pegawai: "Tabita Marselia Silaen", nip: "199902022023032002" },
              { id: 39, no: 6, nama: "Desktop PC HP + Keyboard + Mouse", nup: "3.10.01.02.001.270", kondisi: "Baik", pegawai: "Tabita Marselia Silaen", nip: "199902022023032002" },
              { id: 40, no: 7, nama: "Scanner Plustek Smart Office PS283", nup: "3.10.02.03.004.50", kondisi: "Baik", pegawai: "Tabita Marselia Silaen", nip: "199902022023032002" },
              { id: 41, no: 8, nama: "Kursi Besi/Metal", nup: "3.05.02.01.003.373", kondisi: "Baik", pegawai: "Tabita Marselia Silaen", nip: "199902022023032002" },
              { id: 42, no: 9, nama: "Desktop PC HP + Keyboard + Mouse", nup: "3.10.01.02.001.279", kondisi: "Baik", pegawai: "Martha Fransiska Manalu", nip: "199003032023032003" },
              { id: 43, no: 10, nama: "Meja Kerja Kayu", nup: "3.05.02.01.002.318", kondisi: "Baik", pegawai: "Martha Fransiska Manalu", nip: "199003032023032003" },
              { id: 44, no: 11, nama: "Scanner KODAK S2050", nup: "3.10.02.03.004.42", kondisi: "Baik", pegawai: "Martha Fransiska Manalu", nip: "199003032023032003" },
              { id: 45, no: 12, nama: "Kursi Besi/Metal", nup: "3.05.02.01.003.390", kondisi: "Baik", pegawai: "Martha Fransiska Manalu", nip: "199003032023032003" },
              { id: 46, no: 13, nama: "Desktop PC HP 200 Pro + Keyboard + Mouse", nup: "3.10.01.02.001.335", kondisi: "Baik", pegawai: "Lidya Septaria Sinurat", nip: "199104042023032004" },
              { id: 47, no: 14, nama: "Meja Kerja Kayu", nup: "3.05.02.01.002.316", kondisi: "Baik", pegawai: "Lidya Septaria Sinurat", nip: "199104042023032004" },
              { id: 48, no: 15, nama: "Kursi Besi/Metal", nup: "3.05.02.01.003.370", kondisi: "Baik", pegawai: "Lidya Septaria Sinurat", nip: "199104042023032004" },
              { id: 49, no: 16, nama: "Desktop PC HP 200 Pro + Keyboard + Mouse", nup: "3.10.01.02.001.334", kondisi: "Baik", pegawai: "Niar Ningsih Sabara", nip: "199205052023032005" },
              { id: 50, no: 17, nama: "Meja Kerja Kayu", nup: "3.05.02.01.002.321", kondisi: "Baik", pegawai: "Niar Ningsih Sabara", nip: "199205052023032005" },
              { id: 51, no: 18, nama: "Kursi Besi/Metal", nup: "3.05.02.01.003.676", kondisi: "Baik", pegawai: "Niar Ningsih Sabara", nip: "199205052023032005" },
              { id: 52, no: 19, nama: "Desktop PC HP Touchmart + Keyboard + Mouse", nup: "3.10.01.02.001.228", kondisi: "Baik", pegawai: "Martin Hasiholan Siagian", nip: "199306062023031006" },
              { id: 53, no: 20, nama: "Printer HP Laser Jet Pro 400 M40114", nup: "", kondisi: "Baik", pegawai: "Martin Hasiholan Siagian", nip: "199306062023031006" },
              { id: 54, no: 21, nama: "Meja Kerja Kayu", nup: "3.05.02.01.002.319", kondisi: "Baik", pegawai: "Martin Hasiholan Siagian", nip: "199306062023031006" },
              { id: 55, no: 22, nama: "Kursi Besi/Metal", nup: "3.05.02.01.003.400", kondisi: "Baik", pegawai: "Martin Hasiholan Siagian", nip: "199306062023031006" },
              { id: 56, no: 23, nama: "Desktop PC HP + Keyboard + Mouse", nup: "3.10.01.02.001.263", kondisi: "Baik", pegawai: "Olin Mawar Kristianty", nip: "199407072023032007" },
              { id: 57, no: 24, nama: "Meja Kerja Kayu", nup: "3.05.02.01.002.322", kondisi: "Baik", pegawai: "Olin Mawar Kristianty", nip: "199407072023032007" },
              { id: 58, no: 25, nama: "Kursi Besi/Metal", nup: "3.05.02.01.003.368", kondisi: "Baik", pegawai: "Olin Mawar Kristianty", nip: "199407072023032007" },
              { id: 59, no: 26, nama: "Desktop PC DELL + Keyboard + Mouse", nup: "3.10.01.02.001.318", kondisi: "Baik", pegawai: "Maria Saragih", nip: "199508082023032008" },
              { id: 60, no: 27, nama: "Printer Laser Jet M1132 MFP", nup: "3.10.02.03.003.93", kondisi: "Baik", pegawai: "Maria Saragih", nip: "199508082023032008" },
              { id: 61, no: 28, nama: "Scanner KODAK S2050", nup: "3.10.02.03.004.43", kondisi: "Baik", pegawai: "Maria Saragih", nip: "199508082023032008" },
              { id: 62, no: 29, nama: "Kursi Besi/Metal", nup: "3.05.02.01.003.366", kondisi: "Baik", pegawai: "Maria Saragih", nip: "199508082023032008" },
              { id: 63, no: 30, nama: "Desktop PC DELL + Keyboard + Mouse", nup: "3.10.01.02.001.323", kondisi: "Baik", pegawai: "Carles", nip: "199609092023031009" },
              { id: 64, no: 31, nama: "Kursi Besi/Metal", nup: "3.05.02.01.003.582", kondisi: "Baik", pegawai: "Carles", nip: "199609092023031009" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "urusan-agama",
    nama: "Urusan Agama",
    divisi: [
      {
        id: "urusan-agama-tu",
        nama: "Tata Usaha",
        ruangan: [
          { id: "ruang-urusan-agama", nama: "Ruang Urusan Agama", barang: [] },
        ],
      },
    ],
  },
  {
    id: "pendidikan-agama",
    nama: "Pendidikan Agama",
    divisi: [
      {
        id: "pendidikan-agama-tu",
        nama: "Tata Usaha",
        ruangan: [
          { id: "ruang-pendidikan-agama", nama: "Ruang Pendidikan Agama", barang: [] },
        ],
      },
    ],
  },
  {
    id: "eselon-2",
    nama: "Eselon 2",
    divisi: [
      {
        id: "eselon-2-tu",
        nama: "Tata Usaha",
        ruangan: [
          { id: "ruang-eselon-2", nama: "Ruang Eselon 2", barang: [] },
        ],
      },
    ],
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