import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DataPermintaan.css";

export default function DataPermintaan() {
  const navigate = useNavigate();

  // Mock data permintaan data
  const [permintaanList, setPermintaanList] = useState([
    {
      id: 1,
      nip: "198701012010011001",
      namaPemohon: "John Doe",
      jabatan: "Kepala Sub Bagian",
      unitKerja: "Kanwil",
      jenisData: ["Data Kepegawaian", "Data Statistik"],
      cakupanWilayah: "Nasional",
      periodeDari: "2024-01-01",
      periodeSampai: "2024-06-30",
      tujuanPenggunaan: "Penyusunan laporan tahunan",
      tingkatUrgensi: "Segera",
      statusAtasan: "Disetujui",
      statusPermintaan: "Diproses",
      petugasPengolah: "Budi Santoso, S.Kom",
      tanggalPengajuan: "2024-06-20",
      memoFile: "memo_001.pdf",
      fileHasil: null,
      catatanPemohon: "",
      tanggalSelesai: null,
      riwayatPersetujuan: [
        { tanggal: "2024-06-20", status: "Diajukan", keterangan: "Permintaan diajukan" },
        { tanggal: "2024-06-21", status: "Disetujui Atasan", keterangan: "Disetujui oleh Dr. Budi" },
        { tanggal: "2024-06-22", status: "Diproses", keterangan: "Ditugaskan ke Budi Santoso" },
      ],
    },
    {
      id: 2,
      nip: "198702022011011002",
      namaPemohon: "Jane Smith",
      jabatan: "Staf",
      unitKerja: "Kab-Kota",
      jenisData: ["Data Pendidikan"],
      cakupanWilayah: "Provinsi",
      periodeDari: "2024-01-01",
      periodeSampai: "2024-12-31",
      tujuanPenggunaan: "Analisis kebijakan pendidikan",
      tingkatUrgensi: "Normal",
      statusAtasan: "Disetujui",
      statusPermintaan: "Selesai",
      petugasPengolah: "Siti Aminah, M.Pd",
      tanggalPengajuan: "2024-06-15",
      memoFile: "memo_002.pdf",
      fileHasil: "data_pendidikan_2024.xlsx",
      catatanPemohon: "Data telah dikirim via email",
      tanggalSelesai: "2024-06-18",
      riwayatPersetujuan: [
        { tanggal: "2024-06-15", status: "Diajukan", keterangan: "Permintaan diajukan" },
        { tanggal: "2024-06-16", status: "Disetujui Atasan", keterangan: "Disetujui oleh Ibu Sari" },
        { tanggal: "2024-06-17", status: "Diproses", keterangan: "Diproses oleh Siti Aminah" },
        { tanggal: "2024-06-18", status: "Selesai", keterangan: "Data telah dikirim" },
      ],
    },
    {
      id: 3,
      nip: "198703032012011003",
      namaPemohon: "Bob Anderson",
      jabatan: "Kepala Bidang",
      unitKerja: "Kanwil",
      jenisData: ["Data Keuangan", "Data Aset"],
      cakupanWilayah: "Kab-Kota",
      periodeDari: "2023-01-01",
      periodeSampai: "2023-12-31",
      tujuanPenggunaan: "Audit internal",
      tingkatUrgensi: "Sangat Segera",
      statusAtasan: "Menunggu",
      statusPermintaan: "Diajukan",
      petugasPengolah: "-",
      tanggalPengajuan: "2024-06-22",
      memoFile: null,
      fileHasil: null,
      catatanPemohon: "",
      tanggalSelesai: null,
      riwayatPersetujuan: [
        { tanggal: "2024-06-22", status: "Diajukan", keterangan: "Menunggu persetujuan atasan" },
      ],
    },
    {
      id: 4,
      nip: "198704042013011004",
      namaPemohon: "Siti Rahayu",
      jabatan: "Analis Data",
      unitKerja: "PTK",
      jenisData: ["Data Pelatihan"],
      cakupanWilayah: "Nasional",
      periodeDari: "2024-01-01",
      periodeSampai: "2024-06-30",
      tujuanPenggunaan: "Evaluasi program pelatihan",
      tingkatUrgensi: "Normal",
      statusAtasan: "Ditolak",
      statusPermintaan: "Ditolak",
      petugasPengolah: "-",
      tanggalPengajuan: "2024-06-10",
      memoFile: "memo_004.pdf",
      fileHasil: null,
      catatanPemohon: "Permintaan ditolak karena data bersifat rahasia",
      tanggalSelesai: "2024-06-12",
      riwayatPersetujuan: [
        { tanggal: "2024-06-10", status: "Diajukan", keterangan: "Permintaan diajukan" },
        { tanggal: "2024-06-11", status: "Ditolak Atasan", keterangan: "Ditolak karena data rahasia" },
        { tanggal: "2024-06-12", status: "Ditolak", keterangan: "Permintaan ditutup" },
      ],
    },
  ]);

  // State untuk filter dan search
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTahun, setFilterTahun] = useState("2024");
  const [filterJenisData, setFilterJenisData] = useState("");
  const [filterUrgensi, setFilterUrgensi] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  // State untuk modal
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(""); // 'detail', 'proses'
  const [selectedPermintaan, setSelectedPermintaan] = useState(null);

  // State untuk form proses
  const [prosesForm, setProsesForm] = useState({
    petugasPengolah: "",
    statusPermintaan: "",
    fileHasil: null,
    catatanPemohon: "",
  });

  // Filter data
  const filteredData = permintaanList.filter((item) => {
    const matchSearch =
      item.namaPemohon.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.unitKerja.toLowerCase().includes(searchTerm.toLowerCase());
    const matchTahun = new Date(item.tanggalPengajuan).getFullYear().toString() === filterTahun;
    const matchJenisData = filterJenisData ? item.jenisData.includes(filterJenisData) : true;
    const matchUrgensi = filterUrgensi ? item.tingkatUrgensi === filterUrgensi : true;
    const matchStatus = filterStatus ? item.statusPermintaan === filterStatus : true;

    return matchSearch && matchTahun && matchJenisData && matchUrgensi && matchStatus;
  });

  // Handle buka modal detail
  const handleOpenDetail = (permintaan) => {
    setSelectedPermintaan(permintaan);
    setModalType("detail");
    setShowModal(true);
  };

  // Handle buka form proses
  const handleOpenProses = (permintaan) => {
    setSelectedPermintaan(permintaan);
    setProsesForm({
      petugasPengolah: permintaan.petugasPengolah !== "-" ? permintaan.petugasPengolah : "",
      statusPermintaan: permintaan.statusPermintaan,
      fileHasil: null,
      catatanPemohon: permintaan.catatanPemohon,
    });
    setModalType("proses");
    setShowModal(true);
  };

  // Handle submit proses
  const handleSubmitProses = (e) => {
    e.preventDefault();

    if (!prosesForm.petugasPengolah) {
      alert("Petugas pengolah wajib dipilih!");
      return;
    }

    if (!prosesForm.statusPermintaan) {
      alert("Status permintaan wajib dipilih!");
      return;
    }

    if (prosesForm.statusPermintaan === "Selesai" && !prosesForm.fileHasil) {
      alert("File hasil data wajib diupload jika status Selesai!");
      return;
    }

    if (window.confirm("Simpan perubahan pada permintaan data ini?")) {
      alert("Permintaan data berhasil diupdate!");
      setShowModal(false);
    }
  };

  // Handle file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProsesForm({ ...prosesForm, fileHasil: file });
    }
  };

  // Badge status helper
  const getStatusBadgeClass = (status, type) => {
    const statusMap = {
      urgensi: {
        Normal: "badge-normal",
        Segera: "badge-segera",
        "Sangat Segera": "badge-sangat-segera",
      },
      atasan: {
        Menunggu: "badge-menunggu",
        Disetujui: "badge-disetujui",
        Ditolak: "badge-ditolak",
      },
      permintaan: {
        Diajukan: "badge-diajukan",
        Diproses: "badge-diproses",
        Selesai: "badge-selesai",
        Ditolak: "badge-ditolak",
      },
    };
    return statusMap[type][status] || "badge-menunggu";
  };

  // Format tanggal
  const formatTanggal = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="data-permintaan-page">
      {/* BACK BUTTON */}
      <div className="page-header">
        <button className="back-button" onClick={() => navigate("/humasdata")}>
          ← Kembali
        </button>
        <h1>Permintaan Data</h1>
        <p>Daftar permintaan data internal dari satuan kerja</p>
      </div>

      {/* FILTER & SEARCH */}
      <div className="filter-section">
        <div className="filter-row">
          <div className="filter-group">
            <label>Tahun</label>
            <select value={filterTahun} onChange={(e) => setFilterTahun(e.target.value)}>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Jenis Data</label>
            <select value={filterJenisData} onChange={(e) => setFilterJenisData(e.target.value)}>
              <option value="">Semua</option>
              <option value="Data Kepegawaian">Data Kepegawaian</option>
              <option value="Data Pendidikan">Data Pendidikan</option>
              <option value="Data Keuangan">Data Keuangan</option>
              <option value="Data Aset">Data Aset</option>
              <option value="Data Statistik">Data Statistik</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Tingkat Urgensi</label>
            <select value={filterUrgensi} onChange={(e) => setFilterUrgensi(e.target.value)}>
              <option value="">Semua</option>
              <option value="Normal">Normal</option>
              <option value="Segera">Segera</option>
              <option value="Sangat Segera">Sangat Segera</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Status</label>
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
              <option value="">Semua</option>
              <option value="Diajukan">Diajukan</option>
              <option value="Diproses">Diproses</option>
              <option value="Selesai">Selesai</option>
              <option value="Ditolak">Ditolak</option>
            </select>
          </div>
        </div>

        <div className="search-box">
          <input
            type="text"
            placeholder="Cari berdasarkan nama pemohon atau unit kerja..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* TABEL PERMINTAAN DATA */}
      <div className="table-container">
        <table className="permintaan-table">
          <thead>
            <tr>
              <th>Nama & Unit Kerja</th>
              <th>Jenis Data</th>
              <th>Cakupan Wilayah</th>
              <th>Periode Data</th>
              <th>Urgensi</th>
              <th>Status Atasan</th>
              <th>Status Permintaan</th>
              <th>Petugas</th>
              <th>Tanggal Pengajuan</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item.id}>
                <td>
                  <div className="pemohon-info">
                    <div className="pemohon-name">{item.namaPemohon}</div>
                    <div className="pemohon-unit">{item.unitKerja}</div>
                  </div>
                </td>
                <td>
                  <div className="jenis-data-tags">
                    {item.jenisData.map((data, idx) => (
                      <span key={idx} className="badge badge-jenis-data">
                        {data}
                      </span>
                    ))}
                  </div>
                </td>
                <td>{item.cakupanWilayah}</td>
                <td>
                  {formatTanggal(item.periodeDari)} - {formatTanggal(item.periodeSampai)}
                </td>
                <td>
                  <span className={`badge ${getStatusBadgeClass(item.tingkatUrgensi, "urgensi")}`}>
                    {item.tingkatUrgensi}
                  </span>
                </td>
                <td>
                  <span className={`badge ${getStatusBadgeClass(item.statusAtasan, "atasan")}`}>
                    {item.statusAtasan}
                  </span>
                </td>
                <td>
                  <span className={`badge ${getStatusBadgeClass(item.statusPermintaan, "permintaan")}`}>
                    {item.statusPermintaan}
                  </span>
                </td>
                <td>
                  {item.petugasPengolah !== "-" ? (
                    <div className="petugas-info">
                      <span className="petugas-avatar">👤</span>
                      <span>{item.petugasPengolah}</span>
                    </div>
                  ) : (
                    <span className="belum-diassign">-</span>
                  )}
                </td>
                <td>{formatTanggal(item.tanggalPengajuan)}</td>
                <td className="aksi-cell">
                  <button className="btn-detail" onClick={() => handleOpenDetail(item)}>
                    Detail
                  </button>
                  <button
                    className="btn-proses"
                    onClick={() => handleOpenProses(item)}
                    disabled={item.statusPermintaan === "Selesai" || item.statusPermintaan === "Ditolak"}
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
      {showModal && modalType === "detail" && selectedPermintaan && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content modal-large" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Detail Permintaan Data</h2>
              <button className="modal-close" onClick={() => setShowModal(false)}>
                ✕
              </button>
            </div>
            <div className="modal-body">
              {/* Data Pemohon */}
              <div className="detail-section">
                <h3>Data Pemohon</h3>
                <div className="detail-grid">
                  <div className="detail-item">
                    <label>NIP</label>
                    <p>{selectedPermintaan.nip}</p>
                  </div>
                  <div className="detail-item">
                    <label>Nama Pemohon</label>
                    <p>{selectedPermintaan.namaPemohon}</p>
                  </div>
                  <div className="detail-item">
                    <label>Jabatan</label>
                    <p>{selectedPermintaan.jabatan}</p>
                  </div>
                  <div className="detail-item">
                    <label>Unit Kerja</label>
                    <p>{selectedPermintaan.unitKerja}</p>
                  </div>
                </div>
              </div>

              {/* Detail Permintaan */}
              <div className="detail-section">
                <h3>Detail Permintaan</h3>
                <div className="detail-grid">
                  <div className="detail-item full-width">
                    <label>Jenis Data Diminta</label>
                    <div className="jenis-data-tags">
                      {selectedPermintaan.jenisData.map((data, idx) => (
                        <span key={idx} className="badge badge-jenis-data">
                          {data}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="detail-item">
                    <label>Cakupan Wilayah</label>
                    <p>{selectedPermintaan.cakupanWilayah}</p>
                  </div>
                  <div className="detail-item">
                    <label>Periode Data</label>
                    <p>
                      {formatTanggal(selectedPermintaan.periodeDari)} -{" "}
                      {formatTanggal(selectedPermintaan.periodeSampai)}
                    </p>
                  </div>
                  <div className="detail-item full-width">
                    <label>Tujuan Penggunaan</label>
                    <p className="tujuan-text">{selectedPermintaan.tujuanPenggunaan}</p>
                  </div>
                </div>
              </div>

              {/* Memo & Riwayat */}
              <div className="detail-section">
                <h3>Dokumen & Riwayat</h3>
                {selectedPermintaan.memoFile && (
                  <div className="memo-section">
                    <label>Memo/Disposisi Pendukung</label>
                    <div className="file-download">
                      <span className="file-icon">📎</span>
                      <span className="file-name">{selectedPermintaan.memoFile}</span>
                      <button className="btn-download-file">Unduh</button>
                    </div>
                  </div>
                )}

                <div className="riwayat-section">
                  <label>Riwayat Persetujuan</label>
                  <div className="timeline">
                    {selectedPermintaan.riwayatPersetujuan.map((item, idx) => (
                      <div key={idx} className="timeline-item">
                        <div className="timeline-date">{formatTanggal(item.tanggal)}</div>
                        <div className="timeline-status">{item.status}</div>
                        <div className="timeline-keterangan">{item.keterangan}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Status & Petugas */}
              <div className="detail-section">
                <h3>Status Saat Ini</h3>
                <div className="status-grid">
                  <div className="status-item">
                    <label>Status Persetujuan Atasan</label>
                    <span className={`badge ${getStatusBadgeClass(selectedPermintaan.statusAtasan, "atasan")}`}>
                      {selectedPermintaan.statusAtasan}
                    </span>
                  </div>
                  <div className="status-item">
                    <label>Status Permintaan</label>
                    <span className={`badge ${getStatusBadgeClass(selectedPermintaan.statusPermintaan, "permintaan")}`}>
                      {selectedPermintaan.statusPermintaan}
                    </span>
                  </div>
                  <div className="status-item">
                    <label>Petugas Pengolah</label>
                    <p>{selectedPermintaan.petugasPengolah}</p>
                  </div>
                  {selectedPermintaan.fileHasil && (
                    <div className="status-item full-width">
                      <label>File Hasil Data</label>
                      <div className="file-download">
                        <span className="file-icon">📎</span>
                        <span className="file-name">{selectedPermintaan.fileHasil}</span>
                        <button className="btn-download-file">Unduh</button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setShowModal(false)}>
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL PROSES */}
      {showModal && modalType === "proses" && selectedPermintaan && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Proses Permintaan Data</h2>
              <button className="modal-close" onClick={() => setShowModal(false)}>
                ✕
              </button>
            </div>
            <form onSubmit={handleSubmitProses}>
              <div className="modal-body">
                <div className="form-section">
                  <div className="form-group">
                    <label>Petugas Pengolah *</label>
                    <select
                      value={prosesForm.petugasPengolah}
                      onChange={(e) => setProsesForm({ ...prosesForm, petugasPengolah: e.target.value })}
                      required
                    >
                      <option value="">-- Pilih Petugas --</option>
                      <option value="Budi Santoso, S.Kom">Budi Santoso, S.Kom</option>
                      <option value="Siti Aminah, M.Pd">Siti Aminah, M.Pd</option>
                      <option value="Ahmad Fauzi, S.Pd">Ahmad Fauzi, S.Pd</option>
                      <option value="Dewi Lestari, S.Kom">Dewi Lestari, S.Kom</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Status Permintaan *</label>
                    <select
                      value={prosesForm.statusPermintaan}
                      onChange={(e) => setProsesForm({ ...prosesForm, statusPermintaan: e.target.value })}
                      required
                    >
                      <option value="">-- Pilih Status --</option>
                      <option value="Diproses">Diproses</option>
                      <option value="Selesai">Selesai</option>
                      <option value="Ditolak">Ditolak</option>
                    </select>
                  </div>

                  {prosesForm.statusPermintaan === "Selesai" && (
                    <div className="form-group">
                      <label>Upload File Hasil Data *</label>
                      <input
                        type="file"
                        accept=".pdf,.xlsx,.xls,.doc,.docx"
                        onChange={handleFileChange}
                        required={!prosesForm.fileHasil}
                      />
                      <small>Format: PDF, Excel, Word. Maksimal 10MB.</small>
                      {prosesForm.fileHasil && (
                        <div className="file-preview">
                          📎 {prosesForm.fileHasil.name} ({Math.round(prosesForm.fileHasil.size / 1024)} KB)
                        </div>
                      )}
                    </div>
                  )}

                  <div className="form-group">
                    <label>Catatan untuk Pemohon</label>
                    <textarea
                      value={prosesForm.catatanPemohon}
                      onChange={(e) => setProsesForm({ ...prosesForm, catatanPemohon: e.target.value })}
                      rows="4"
                      placeholder="Tambahkan catatan atau instruksi untuk pemohon..."
                    />
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