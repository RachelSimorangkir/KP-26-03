import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Tiket.css";

export default function Tiket() {
  const navigate = useNavigate();

  // Mock data tiket helpdesk
  const [tiketList, setTiketList] = useState([
    {
      id: "SI-2024-001",
      nip: "198701012010011001",
      namaPelapor: "John Doe",
      unitKerja: "Kanwil",
      email: "john.doe@kemenag.go.id",
      noHp: "081234567890",
      namaAplikasi: "SIMPEG",
      kategori: "Error Sistem",
      tingkatUrgensi: "Kritis",
      judulMasalah: "Tidak bisa login ke SIMPEG",
      deskripsiMasalah: "Sistem menampilkan error 500 saat mencoba login. Sudah mencoba clear cache dan restart browser.",
      lampiran: ["screenshot1.png", "screenshot2.png"],
      statusTiket: "Baru",
      petugasPJ: "-",
      tanggalLapor: "2024-06-22",
      tanggalMulai: null,
      tanggalSelesai: null,
      tanggapan: "",
      lampiranSolusi: [],
      catatanInternal: "",
      indikatorSLA: "Lewat Batas",
      riwayatStatus: [
        { tanggal: "2024-06-22 09:00", status: "Baru", keterangan: "Tiket dibuat oleh John Doe" },
      ],
    },
    {
      id: "SI-2024-002",
      nip: "198702022011011002",
      namaPelapor: "Jane Smith",
      unitKerja: "Kab-Kota",
      email: "jane.smith@kemenag.go.id",
      noHp: "081234567891",
      namaAplikasi: "SIKA",
      kategori: "Reset Password",
      tingkatUrgensi: "Sedang",
      judulMasalah: "Lupa password SIKA",
      deskripsiMasalah: "Tidak bisa login karena lupa password. Mohon bantuan reset password.",
      lampiran: [],
      statusTiket: "Diproses",
      petugasPJ: "Budi Santoso, S.Kom",
      tanggalLapor: "2024-06-20",
      tanggalMulai: "2024-06-21",
      tanggalSelesai: null,
      tanggapan: "Password reset sedang dalam proses. Kami akan mengirimkan link reset ke email Anda.",
      lampiranSolusi: [],
      catatanInternal: "User sudah dikonfirmasi via telepon",
      indikatorSLA: "Mendekati Batas",
      riwayatStatus: [
        { tanggal: "2024-06-20 10:30", status: "Baru", keterangan: "Tiket dibuat" },
        { tanggal: "2024-06-21 09:00", status: "Diproses", keterangan: "Ditugaskan ke Budi Santoso" },
      ],
    },
    {
      id: "SI-2024-003",
      nip: "198703032012011003",
      namaPelapor: "Bob Anderson",
      unitKerja: "PTK",
      email: "bob.anderson@kemenag.go.id",
      noHp: "081234567892",
      namaAplikasi: "Portal Internal",
      kategori: "Permintaan Akses",
      tingkatUrgensi: "Rendah",
      judulMasalah: "Meminta akses modul laporan",
      deskripsiMasalah: "Membutuhkan akses ke modul laporan untuk keperluan monitoring.",
      lampiran: ["surat_permohonan.pdf"],
      statusTiket: "Menunggu Respon",
      petugasPJ: "Siti Aminah, M.Pd",
      tanggalLapor: "2024-06-18",
      tanggalMulai: "2024-06-19",
      tanggalSelesai: null,
      tanggapan: "Mohon konfirmasi apakah Anda sudah memiliki izin dari atasan untuk akses modul ini?",
      lampiranSolusi: [],
      catatanInternal: "",
      indikatorSLA: "Normal",
      riwayatStatus: [
        { tanggal: "2024-06-18 14:00", status: "Baru", keterangan: "Tiket dibuat" },
        { tanggal: "2024-06-19 10:00", status: "Diproses", keterangan: "Ditugaskan ke Siti Aminah" },
        { tanggal: "2024-06-19 15:00", status: "Menunggu Respon", keterangan: "Menunggu konfirmasi dari user" },
      ],
    },
    {
      id: "SI-2024-004",
      nip: "198704042013011004",
      namaPelapor: "Siti Rahayu",
      unitKerja: "Kanwil",
      email: "siti.rahayu@kemenag.go.id",
      noHp: "081234567893",
      namaAplikasi: "E-Office",
      kategori: "Bug",
      tingkatUrgensi: "Tinggi",
      judulMasalah: "File PDF tidak bisa di-download",
      deskripsiMasalah: "Saat mencoba download file PDF dari aplikasi E-Office, muncul error 'File not found'.",
      lampiran: ["error_screenshot.png"],
      statusTiket: "Selesai",
      petugasPJ: "Ahmad Fauzi, S.Pd",
      tanggalLapor: "2024-06-15",
      tanggalMulai: "2024-06-16",
      tanggalSelesai: "2024-06-17",
      tanggapan: "Bug telah diperbaiki pada versi terbaru. Silakan update aplikasi Anda.",
      lampiranSolusi: ["patch_notes.pdf"],
      catatanInternal: "Bug disebabkan oleh path yang salah di server",
      indikatorSLA: "Normal",
      riwayatStatus: [
        { tanggal: "2024-06-15 08:00", status: "Baru", keterangan: "Tiket dibuat" },
        { tanggal: "2024-06-16 09:00", status: "Diproses", keterangan: "Ditugaskan ke Ahmad Fauzi" },
        { tanggal: "2024-06-17 16:00", status: "Selesai", keterangan: "Bug diperbaiki" },
      ],
    },
    {
      id: "SI-2024-005",
      nip: "198705052014011005",
      namaPelapor: "Dewi Lestari",
      unitKerja: "Kab-Kota",
      email: "dewi.lestari@kemenag.go.id",
      noHp: "081234567894",
      namaAplikasi: "Sistem BMN",
      kategori: "Pelatihan",
      tingkatUrgensi: "Rendah",
      judulMasalah: "Meminta panduan penggunaan aplikasi BMN",
      deskripsiMasalah: "Membutuhkan panduan atau training untuk menggunakan aplikasi Sistem BMN.",
      lampiran: [],
      statusTiket: "Ditutup",
      petugasPJ: "Dewi Lestari, S.Kom",
      tanggalLapor: "2024-06-10",
      tanggalMulai: "2024-06-11",
      tanggalSelesai: "2024-06-12",
      tanggapan: "Panduan telah dikirim via email. Silakan cek inbox Anda.",
      lampiranSolusi: ["panduan_bmn.pdf"],
      catatanInternal: "",
      indikatorSLA: "Normal",
      riwayatStatus: [
        { tanggal: "2024-06-10 11:00", status: "Baru", keterangan: "Tiket dibuat" },
        { tanggal: "2024-06-11 10:00", status: "Diproses", keterangan: "Ditugaskan" },
        { tanggal: "2024-06-12 14:00", status: "Selesai", keterangan: "Panduan dikirim" },
        { tanggal: "2024-06-12 15:00", status: "Ditutup", keterangan: "Tiket ditutup" },
      ],
    },
  ]);

  // State untuk filter dan search
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterUrgensi, setFilterUrgensi] = useState("");
  const [filterAplikasi, setFilterAplikasi] = useState("");
  const [filterPetugas, setFilterPetugas] = useState("");

  // State untuk modal
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(""); // 'detail', 'proses'
  const [selectedTiket, setSelectedTiket] = useState(null);

  // State untuk form proses
  const [prosesForm, setProsesForm] = useState({
    petugasPJ: "",
    overrideUrgensi: "",
    statusTiket: "",
    tanggapan: "",
    lampiranSolusi: null,
    catatanInternal: "",
    eskalasiKe: "",
  });

  // Filter data
  const filteredData = tiketList.filter((item) => {
    const matchSearch =
      item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.judulMasalah.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.namaPelapor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = filterStatus ? item.statusTiket === filterStatus : true;
    const matchUrgensi = filterUrgensi ? item.tingkatUrgensi === filterUrgensi : true;
    const matchAplikasi = filterAplikasi ? item.namaAplikasi === filterAplikasi : true;
    const matchPetugas = filterPetugas ? item.petugasPJ === filterPetugas : true;

    return matchSearch && matchStatus && matchUrgensi && matchAplikasi && matchPetugas;
  });

  // Handle buka modal detail
  const handleOpenDetail = (tiket) => {
    setSelectedTiket(tiket);
    setModalType("detail");
    setShowModal(true);
  };

  // Handle buka form proses
  const handleOpenProses = (tiket) => {
    setSelectedTiket(tiket);
    setProsesForm({
      petugasPJ: tiket.petugasPJ !== "-" ? tiket.petugasPJ : "",
      overrideUrgensi: tiket.tingkatUrgensi,
      statusTiket: tiket.statusTiket,
      tanggapan: tiket.tanggapan,
      lampiranSolusi: null,
      catatanInternal: tiket.catatanInternal,
      eskalasiKe: "",
    });
    setModalType("proses");
    setShowModal(true);
  };

  // Handle submit proses
  const handleSubmitProses = (e) => {
    e.preventDefault();

    if (!prosesForm.petugasPJ) {
      alert("Petugas penanggung jawab wajib dipilih!");
      return;
    }

    if (!prosesForm.statusTiket) {
      alert("Status tiket wajib dipilih!");
      return;
    }

    if (prosesForm.statusTiket === "Selesai" && !prosesForm.tanggapan) {
      alert("Tanggapan/solusi wajib diisi sebelum status Selesai!");
      return;
    }

    if (window.confirm("Simpan perubahan pada tiket ini?")) {
      alert("Tiket berhasil diupdate!");
      setShowModal(false);
    }
  };

  // Handle file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProsesForm({ ...prosesForm, lampiranSolusi: file });
    }
  };

  // Handle ambil tiket
  const handleAmbilTiket = () => {
    const userName = "Admin Humas"; // Ganti dengan nama user yang login
    setProsesForm({ ...prosesForm, petugasPJ: userName });
    alert(`Tiket berhasil diambil oleh ${userName}`);
  };

  // Badge status helper
  const getStatusBadgeClass = (status, type) => {
    const statusMap = {
      urgensi: {
        Rendah: "badge-rendah",
        Sedang: "badge-sedang",
        Tinggi: "badge-tinggi",
        Kritis: "badge-kritis",
      },
      status: {
        Baru: "badge-baru",
        Diproses: "badge-diproses",
        "Menunggu Respon": "badge-menunggu-respon",
        Selesai: "badge-selesai",
        Ditutup: "badge-ditutup",
      },
      sla: {
        Normal: "badge-sla-normal",
        "Mendekati Batas": "badge-sla-warning",
        "Lewat Batas": "badge-sla-danger",
      },
    };
    return statusMap[type][status] || "badge-baru";
  };

  // Format tanggal
  const formatTanggal = (dateStr) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="tiket-page">
      {/* BACK BUTTON */}
      <div className="page-header">
        <button className="back-button" onClick={() => navigate("/humasdata")}>
          ← Kembali
        </button>
        <h1>Tiket Helpdesk</h1>
        <p>Daftar tiket bantuan teknis dari pengguna sistem</p>
      </div>

      {/* FILTER & SEARCH */}
      <div className="filter-section">
        <div className="filter-row">
          <div className="filter-group">
            <label>Status</label>
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
              <option value="">Semua</option>
              <option value="Baru">Baru</option>
              <option value="Diproses">Diproses</option>
              <option value="Menunggu Respon">Menunggu Respon</option>
              <option value="Selesai">Selesai</option>
              <option value="Ditutup">Ditutup</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Tingkat Urgensi</label>
            <select value={filterUrgensi} onChange={(e) => setFilterUrgensi(e.target.value)}>
              <option value="">Semua</option>
              <option value="Rendah">Rendah</option>
              <option value="Sedang">Sedang</option>
              <option value="Tinggi">Tinggi</option>
              <option value="Kritis">Kritis</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Aplikasi</label>
            <select value={filterAplikasi} onChange={(e) => setFilterAplikasi(e.target.value)}>
              <option value="">Semua</option>
              <option value="SIMPEG">SIMPEG</option>
              <option value="SIKA">SIKA</option>
              <option value="Portal Internal">Portal Internal</option>
              <option value="E-Office">E-Office</option>
              <option value="Sistem BMN">Sistem BMN</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Petugas</label>
            <select value={filterPetugas} onChange={(e) => setFilterPetugas(e.target.value)}>
              <option value="">Semua</option>
              <option value="-">Belum Ditugaskan</option>
              <option value="Budi Santoso, S.Kom">Budi Santoso, S.Kom</option>
              <option value="Siti Aminah, M.Pd">Siti Aminah, M.Pd</option>
              <option value="Ahmad Fauzi, S.Pd">Ahmad Fauzi, S.Pd</option>
            </select>
          </div>
        </div>

        <div className="search-box">
          <input
            type="text"
            placeholder="Cari nomor tiket, judul, atau nama pelapor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* TABEL TIKET */}
      <div className="table-container">
        <table className="tiket-table">
          <thead>
            <tr>
              <th>Nomor Tiket</th>
              <th>Pelapor & Unit</th>
              <th>Aplikasi</th>
              <th>Kategori</th>
              <th>Urgensi</th>
              <th>Status</th>
              <th>Petugas PJ</th>
              <th>Tanggal Lapor</th>
              <th>SLA</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item.id} className={item.indikatorSLA === "Lewat Batas" ? "row-sla-danger" : ""}>
                <td className="tiket-id">{item.id}</td>
                <td>
                  <div className="pelapor-info">
                    <div className="pelapor-name">{item.namaPelapor}</div>
                    <div className="pelapor-unit">{item.unitKerja}</div>
                  </div>
                </td>
                <td>
                  <span className="badge badge-aplikasi">{item.namaAplikasi}</span>
                </td>
                <td>{item.kategori}</td>
                <td>
                  <span className={`badge ${getStatusBadgeClass(item.tingkatUrgensi, "urgensi")}`}>
                    {item.tingkatUrgensi}
                  </span>
                </td>
                <td>
                  <span className={`badge ${getStatusBadgeClass(item.statusTiket, "status")}`}>
                    {item.statusTiket}
                  </span>
                </td>
                <td>
                  {item.petugasPJ !== "-" ? (
                    <div className="petugas-info">
                      <span className="petugas-avatar">👤</span>
                      <span>{item.petugasPJ}</span>
                    </div>
                  ) : (
                    <span className="belum-diassign">Belum ditugaskan</span>
                  )}
                </td>
                <td>{formatTanggal(item.tanggalLapor)}</td>
                <td>
                  <span className={`badge ${getStatusBadgeClass(item.indikatorSLA, "sla")}`}>
                    {item.indikatorSLA === "Normal" && "✅"}
                    {item.indikatorSLA === "Mendekati Batas" && "⚠️"}
                    {item.indikatorSLA === "Lewat Batas" && "🔴"}
                    {" "}{item.indikatorSLA}
                  </span>
                </td>
                <td className="aksi-cell">
                  <button className="btn-detail" onClick={() => handleOpenDetail(item)}>
                    Detail
                  </button>
                  <button
                    className="btn-proses"
                    onClick={() => handleOpenProses(item)}
                    disabled={item.statusTiket === "Ditutup"}
                  >
                    Proses
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL DETAIL */}
      {showModal && modalType === "detail" && selectedTiket && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content modal-large" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Detail Tiket #{selectedTiket.id}</h2>
              <button className="modal-close" onClick={() => setShowModal(false)}>
                ✕
              </button>
            </div>
            <div className="modal-body">
              {/* Info Tiket */}
              <div className="detail-section">
                <h3>Informasi Tiket</h3>
                <div className="detail-grid">
                  <div className="detail-item">
                    <label>Nomor Tiket</label>
                    <p className="tiket-id-large">{selectedTiket.id}</p>
                  </div>
                  <div className="detail-item">
                    <label>Status Tiket</label>
                    <span className={`badge ${getStatusBadgeClass(selectedTiket.statusTiket, "status")}`}>
                      {selectedTiket.statusTiket}
                    </span>
                  </div>
                  <div className="detail-item">
                    <label>Nama Aplikasi</label>
                    <p>{selectedTiket.namaAplikasi}</p>
                  </div>
                  <div className="detail-item">
                    <label>Kategori Kendala</label>
                    <p>{selectedTiket.kategori}</p>
                  </div>
                  <div className="detail-item">
                    <label>Tingkat Urgensi</label>
                    <span className={`badge ${getStatusBadgeClass(selectedTiket.tingkatUrgensi, "urgensi")}`}>
                      {selectedTiket.tingkatUrgensi}
                    </span>
                  </div>
                  <div className="detail-item">
                    <label>Tanggal Lapor</label>
                    <p>{formatTanggal(selectedTiket.tanggalLapor)}</p>
                  </div>
                </div>
              </div>

              {/* Data Pelapor */}
              <div className="detail-section">
                <h3>Data Pelapor</h3>
                <div className="detail-grid">
                  <div className="detail-item">
                    <label>NIP</label>
                    <p>{selectedTiket.nip}</p>
                  </div>
                  <div className="detail-item">
                    <label>Nama</label>
                    <p>{selectedTiket.namaPelapor}</p>
                  </div>
                  <div className="detail-item">
                    <label>Unit Kerja</label>
                    <p>{selectedTiket.unitKerja}</p>
                  </div>
                  <div className="detail-item">
                    <label>Email</label>
                    <p>{selectedTiket.email}</p>
                  </div>
                  <div className="detail-item">
                    <label>No. HP</label>
                    <p>{selectedTiket.noHp}</p>
                  </div>
                </div>
              </div>

              {/* Detail Masalah */}
              <div className="detail-section">
                <h3>Detail Masalah</h3>
                <div className="detail-item full-width">
                  <label>Judul Masalah</label>
                  <p className="judul-masalah">{selectedTiket.judulMasalah}</p>
                </div>
                <div className="detail-item full-width">
                  <label>Deskripsi Masalah</label>
                  <p className="deskripsi-masalah">{selectedTiket.deskripsiMasalah}</p>
                </div>

                {selectedTiket.lampiran.length > 0 && (
                  <div className="detail-item full-width">
                    <label>Lampiran Screenshot/Bukti</label>
                    <div className="lampiran-list">
                      {selectedTiket.lampiran.map((file, idx) => (
                        <div key={idx} className="lampiran-item">
                          <span className="file-icon"></span>
                          <span className="file-name">{file}</span>
                          <button className="btn-download-file">Unduh</button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Tanggapan/Solusi */}
              {selectedTiket.tanggapan && (
                <div className="detail-section">
                  <h3>Tanggapan/Solusi</h3>
                  <div className="tanggapan-box">
                    <p>{selectedTiket.tanggapan}</p>
                  </div>
                  {selectedTiket.lampiranSolusi.length > 0 && (
                    <div className="lampiran-list">
                      {selectedTiket.lampiranSolusi.map((file, idx) => (
                        <div key={idx} className="lampiran-item">
                          <span className="file-icon">📎</span>
                          <span className="file-name">{file}</span>
                          <button className="btn-download-file">Unduh</button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Riwayat Status */}
              <div className="detail-section">
                <h3>Riwayat Status</h3>
                <div className="timeline">
                  {selectedTiket.riwayatStatus.map((item, idx) => (
                    <div key={idx} className="timeline-item">
                      <div className="timeline-date">{item.tanggal}</div>
                      <div className="timeline-status">{item.status}</div>
                      <div className="timeline-keterangan">{item.keterangan}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setShowModal(false)}>
                Tutup
              </button>
              {selectedTiket.statusTiket !== "Ditutup" && (
                <button
                  className="btn-primary"
                  onClick={() => {
                    setShowModal(false);
                    handleOpenProses(selectedTiket);
                  }}
                >
                  Proses Tiket
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODAL PROSES */}
      {showModal && modalType === "proses" && selectedTiket && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content modal-large" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Proses Tiket #{selectedTiket.id}</h2>
              <button className="modal-close" onClick={() => setShowModal(false)}>
                ✕
              </button>
            </div>
            <form onSubmit={handleSubmitProses}>
              <div className="modal-body">
                {/* Info Tiket */}
                <div className="tiket-info-box">
                  <div className="info-row">
                    <span className="info-label">Judul:</span>
                    <span className="info-value">{selectedTiket.judulMasalah}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Pelapor:</span>
                    <span className="info-value">{selectedTiket.namaPelapor} ({selectedTiket.unitKerja})</span>
                  </div>
                </div>

                <div className="form-section">
                  <div className="form-group">
                    <label>Petugas Penanggung Jawab *</label>
                    <div className="petugas-selector">
                      <select
                        value={prosesForm.petugasPJ}
                        onChange={(e) => setProsesForm({ ...prosesForm, petugasPJ: e.target.value })}
                        required
                      >
                        <option value="">-- Pilih Petugas --</option>
                        <option value="Budi Santoso, S.Kom">Budi Santoso, S.Kom</option>
                        <option value="Siti Aminah, M.Pd">Siti Aminah, M.Pd</option>
                        <option value="Ahmad Fauzi, S.Pd">Ahmad Fauzi, S.Pd</option>
                        <option value="Dewi Lestari, S.Kom">Dewi Lestari, S.Kom</option>
                      </select>
                      <button
                        type="button"
                        className="btn-ambil-tiket"
                        onClick={handleAmbilTiket}
                      >
                        Ambil Tiket
                      </button>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Override Tingkat Urgensi</label>
                      <select
                        value={prosesForm.overrideUrgensi}
                        onChange={(e) => setProsesForm({ ...prosesForm, overrideUrgensi: e.target.value })}
                      >
                        <option value="Rendah">Rendah</option>
                        <option value="Sedang">Sedang</option>
                        <option value="Tinggi">Tinggi</option>
                        <option value="Kritis">Kritis</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Status Tiket *</label>
                      <select
                        value={prosesForm.statusTiket}
                        onChange={(e) => setProsesForm({ ...prosesForm, statusTiket: e.target.value })}
                        required
                      >
                        <option value="">-- Pilih Status --</option>
                        <option value="Diproses">Diproses</option>
                        <option value="Menunggu Respon">Menunggu Respon</option>
                        <option value="Selesai">Selesai</option>
                        <option value="Ditutup">Ditutup</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Tanggapan/Solusi {prosesForm.statusTiket === "Selesai" && "*"}</label>
                    <textarea
                      value={prosesForm.tanggapan}
                      onChange={(e) => setProsesForm({ ...prosesForm, tanggapan: e.target.value })}
                      rows="5"
                      placeholder="Tulis tanggapan atau solusi untuk masalah ini..."
                      required={prosesForm.statusTiket === "Selesai"}
                    />
                  </div>

                  <div className="form-group">
                    <label>Lampiran Solusi</label>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,.jpg,.png"
                      onChange={handleFileChange}
                    />
                    <small>Format: PDF, Word, Image. Maksimal 5MB.</small>
                    {prosesForm.lampiranSolusi && (
                      <div className="file-preview">
                        📎 {prosesForm.lampiranSolusi.name} ({Math.round(prosesForm.lampiranSolusi.size / 1024)} KB)
                      </div>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Catatan Internal (tidak terlihat user)</label>
                    <textarea
                      value={prosesForm.catatanInternal}
                      onChange={(e) => setProsesForm({ ...prosesForm, catatanInternal: e.target.value })}
                      rows="3"
                      placeholder="Catatan internal untuk tim..."
                    />
                  </div>

                  <div className="form-group">
                    <label>Eskalasi Ke (Tim/Petugas lain)</label>
                    <select
                      value={prosesForm.eskalasiKe}
                      onChange={(e) => setProsesForm({ ...prosesForm, eskalasiKe: e.target.value })}
                    >
                      <option value="">-- Tidak Eskalasi --</option>
                      <option value="Tim Infrastruktur">Tim Infrastruktur</option>
                      <option value="Tim Aplikasi">Tim Aplikasi</option>
                      <option value="Tim Keamanan">Tim Keamanan</option>
                      <option value="Manajer IT">Manajer IT</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>
                  Batal
                </button>
                <button type="submit" className="btn-primary">
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}