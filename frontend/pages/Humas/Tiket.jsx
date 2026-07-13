import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Tiket.css";

export default function Tiket() {
  const navigate = useNavigate();

  const [tiketList] = useState([
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
      deskripsiMasalah: "Sistem menampilkan error 500 saat mencoba login.",
      lampiran: ["screenshot1.png"],
      statusTiket: "Baru",
      petugasPJ: "-",
      tanggalLapor: "2024-06-22",
      tanggapan: "",
      catatanInternal: "",
      indikatorSLA: "Lewat Batas",
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
      deskripsiMasalah: "Tidak bisa login karena lupa password.",
      lampiran: [],
      statusTiket: "Diproses",
      petugasPJ: "Budi Santoso, S.Kom",
      tanggalLapor: "2024-06-20",
      tanggapan: "Password reset sedang dalam proses.",
      catatanInternal: "User sudah dikonfirmasi via telepon",
      indikatorSLA: "Mendekati Batas",
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
      deskripsiMasalah: "Membutuhkan akses ke modul laporan.",
      lampiran: [],
      statusTiket: "Menunggu Respon",
      petugasPJ: "Siti Aminah, M.Pd",
      tanggalLapor: "2024-06-18",
      tanggapan: "Mohon konfirmasi izin dari atasan.",
      catatanInternal: "",
      indikatorSLA: "Normal",
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
      deskripsiMasalah: "Muncul error 'File not found'.",
      lampiran: ["error_screenshot.png"],
      statusTiket: "Selesai",
      petugasPJ: "Ahmad Fauzi, S.Pd",
      tanggalLapor: "2024-06-15",
      tanggapan: "Bug telah diperbaiki.",
      catatanInternal: "Bug disebabkan oleh path yang salah",
      indikatorSLA: "Normal",
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
      deskripsiMasalah: "Membutuhkan panduan aplikasi BMN.",
      lampiran: [],
      statusTiket: "Ditutup",
      petugasPJ: "Dewi Lestari, S.Kom",
      tanggalLapor: "2024-06-10",
      tanggapan: "Panduan telah dikirim via email.",
      catatanInternal: "",
      indikatorSLA: "Normal",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterUrgensi, setFilterUrgensi] = useState("");
  const [filterAplikasi, setFilterAplikasi] = useState("");
  const [filterPetugas, setFilterPetugas] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedTiket, setSelectedTiket] = useState(null);

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

  const handleOpenDetail = (tiket) => {
    setSelectedTiket(tiket);
    setModalType("detail");
    setShowModal(true);
  };

  const handleOpenProses = (tiket) => {
    setSelectedTiket(tiket);
    setModalType("proses");
    setShowModal(true);
  };

  const getStatusBadge = (status, type) => {
    const map = {
      urgensi: { Rendah: "badge-rendah", Sedang: "badge-sedang", Tinggi: "badge-tinggi", Kritis: "badge-kritis" },
      status: { Baru: "badge-baru", Diproses: "badge-diproses", "Menunggu Respon": "badge-menunggu-respon", Selesai: "badge-selesai", Ditutup: "badge-ditutup" },
      sla: { Normal: "badge-sla-normal", "Mendekati Batas": "badge-sla-warning", "Lewat Batas": "badge-sla-danger" },
    };
    return map[type]?.[status] || "badge-baru";
  };

  const formatTanggal = (dateStr) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
  };

  return (
    <div className="tiket-page">
      {/* HEADER */}
      <div className="page-header">
        <button className="back-button" onClick={() => navigate("/admin-humas")}>
          ← Kembali
        </button>
        <div className="header-text">
          <h1>Tiket Helpdesk</h1>
          <p>Daftar tiket bantuan teknis dari pengguna sistem</p>
        </div>
      </div>

      {/* FILTER CARD - 4 KOLOM + SEARCH */}
      <div className="filter-card">
        <div className="filter-grid">
          <div className="filter-item">
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
          <div className="filter-item">
            <label>Tingkat Urgensi</label>
            <select value={filterUrgensi} onChange={(e) => setFilterUrgensi(e.target.value)}>
              <option value="">Semua</option>
              <option value="Rendah">Rendah</option>
              <option value="Sedang">Sedang</option>
              <option value="Tinggi">Tinggi</option>
              <option value="Kritis">Kritis</option>
            </select>
          </div>
          <div className="filter-item">
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
          <div className="filter-item">
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
        <div className="search-row">
          <input
            type="text"
            placeholder="Cari nomor tiket, judul, atau nama pelapor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* TABEL */}
      <div className="table-card">
        <div className="table-scroll">
          <table className="data-table">
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
                  <td className="col-tiket-id">{item.id}</td>
                  <td>
                    <div className="pelapor-info">
                      <div className="pelapor-name">{item.namaPelapor}</div>
                      <div className="pelapor-unit">{item.unitKerja}</div>
                    </div>
                  </td>
                  <td><span className="badge badge-aplikasi">{item.namaAplikasi}</span></td>
                  <td>{item.kategori}</td>
                  <td><span className={`badge ${getStatusBadge(item.tingkatUrgensi, "urgensi")}`}>{item.tingkatUrgensi}</span></td>
                  <td><span className={`badge ${getStatusBadge(item.statusTiket, "status")}`}>{item.statusTiket}</span></td>
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
                  <td><span className={`badge ${getStatusBadge(item.indikatorSLA, "sla")}`}>{item.indikatorSLA}</span></td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn btn-detail" onClick={() => handleOpenDetail(item)}>Detail</button>
                      <button className="btn btn-proses" onClick={() => handleOpenProses(item)} disabled={item.statusTiket === "Ditutup"}>Proses</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL */}
      {showModal && selectedTiket && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content modal-large" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{modalType === "detail" ? `Detail Tiket #${selectedTiket.id}` : `Proses Tiket #${selectedTiket.id}`}</h2>
              <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <div className="modal-body">
              {modalType === "detail" && (
                <div>
                  <div className="detail-section">
                    <h3>Informasi Tiket</h3>
                    <div className="detail-grid">
                      <div className="detail-item"><label>Nomor Tiket</label><p className="tiket-id-large">{selectedTiket.id}</p></div>
                      <div className="detail-item"><label>Status</label><span className={`badge ${getStatusBadge(selectedTiket.statusTiket, "status")}`}>{selectedTiket.statusTiket}</span></div>
                      <div className="detail-item"><label>Aplikasi</label><p>{selectedTiket.namaAplikasi}</p></div>
                      <div className="detail-item"><label>Kategori</label><p>{selectedTiket.kategori}</p></div>
                      <div className="detail-item"><label>Urgensi</label><span className={`badge ${getStatusBadge(selectedTiket.tingkatUrgensi, "urgensi")}`}>{selectedTiket.tingkatUrgensi}</span></div>
                      <div className="detail-item"><label>Tanggal Lapor</label><p>{formatTanggal(selectedTiket.tanggalLapor)}</p></div>
                    </div>
                  </div>
                  <div className="detail-section">
                    <h3>Data Pelapor</h3>
                    <div className="detail-grid">
                      <div className="detail-item"><label>NIP</label><p>{selectedTiket.nip}</p></div>
                      <div className="detail-item"><label>Nama</label><p>{selectedTiket.namaPelapor}</p></div>
                      <div className="detail-item"><label>Unit Kerja</label><p>{selectedTiket.unitKerja}</p></div>
                      <div className="detail-item"><label>Email</label><p>{selectedTiket.email}</p></div>
                      <div className="detail-item"><label>No. HP</label><p>{selectedTiket.noHp}</p></div>
                    </div>
                  </div>
                  <div className="detail-section">
                    <h3>Detail Masalah</h3>
                    <div className="detail-item full-width"><label>Judul</label><p className="judul-masalah">{selectedTiket.judulMasalah}</p></div>
                    <div className="detail-item full-width"><label>Deskripsi</label><p className="deskripsi-masalah">{selectedTiket.deskripsiMasalah}</p></div>
                  </div>
                  {selectedTiket.tanggapan && (
                    <div className="detail-section">
                      <h3>Tanggapan/Solusi</h3>
                      <div className="tanggapan-box"><p>{selectedTiket.tanggapan}</p></div>
                    </div>
                  )}
                </div>
              )}
              {modalType === "proses" && (
                <div className="form-section">
                  <div className="form-group">
                    <label>Petugas Penanggung Jawab *</label>
                    <select>
                      <option value="">-- Pilih Petugas --</option>
                      <option value="Budi Santoso, S.Kom">Budi Santoso, S.Kom</option>
                      <option value="Siti Aminah, M.Pd">Siti Aminah, M.Pd</option>
                      <option value="Ahmad Fauzi, S.Pd">Ahmad Fauzi, S.Pd</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Status Tiket *</label>
                    <select>
                      <option value="">-- Pilih Status --</option>
                      <option value="Diproses">Diproses</option>
                      <option value="Menunggu Respon">Menunggu Respon</option>
                      <option value="Selesai">Selesai</option>
                      <option value="Ditutup">Ditutup</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Tanggapan/Solusi</label>
                    <textarea rows="4" placeholder="Tulis tanggapan..."></textarea>
                  </div>
                  <div className="form-group">
                    <label>Catatan Internal</label>
                    <textarea rows="3" placeholder="Catatan internal (tidak terlihat user)..."></textarea>
                  </div>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Tutup</button>
              {modalType === "proses" && <button className="btn btn-primary">Simpan</button>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}