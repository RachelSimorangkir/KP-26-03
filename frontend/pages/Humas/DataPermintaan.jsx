import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./DataPermintaan.css";

export default function DataPermintaan() {
  const navigate = useNavigate();
  const API_URL = "http://localhost:8080/api/data-internal";
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");

  const [permintaanList, setPermintaanList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [filterTahun, setFilterTahun] = useState("");
  const [filterJenisData, setFilterJenisData] = useState("");
  const [filterUrgensi, setFilterUrgensi] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedPermintaan, setSelectedPermintaan] = useState(null);

  // ✅ LANGKAH 5: State processed_by dihapus karena tidak diperlukan lagi
  const [formProses, setFormProses] = useState({
    status: "",
    response_note: "",
    response_file: null,
  });

  // ✅ LANGKAH 1: fetchData() dibersihkan dari infinite recursion
  const fetchData = async () => {
    try {
      const response = await axios.get(API_URL);

      if (response.data.status) {
        setPermintaanList(response.data.data);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredData = permintaanList.filter((item) => {
    const matchSearch =
      (item.nama_pemohon || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.unit_kerja || "").toLowerCase().includes(searchTerm.toLowerCase());

    const matchTahun =
      filterTahun === "" ? true : new Date(item.submitted_at || item.created_at).getFullYear().toString() === filterTahun;

    const matchJenisData =
      filterJenisData === "" ? true : (item.jenis_data || "").toLowerCase().includes(filterJenisData.toLowerCase());

    const matchUrgensi =
      filterUrgensi === "" ? true : (item.tingkat_urgensi || "").toLowerCase() === filterUrgensi.toLowerCase();

    const matchStatus =
      filterStatus === "" ? true : (item.status || "").toLowerCase() === filterStatus.toLowerCase();

    return matchSearch && matchTahun && matchJenisData && matchUrgensi && matchStatus;
  });

  const handleOpenDetail = (permintaan) => {
    setSelectedPermintaan(permintaan);
    setModalType("detail");
    setShowModal(true);
  };

  // ✅ LANGKAH 2 & 5: handleOpenProses diperbaiki (koma sudah aman, processed_by dihapus dari state)
  const handleOpenProses = (permintaan) => {
    setSelectedPermintaan(permintaan);
    setFormProses({
      status: permintaan.status || "",
      response_note: permintaan.response_note || permintaan.catatan_admin || "",
      response_file: null,
    });
    setModalType("proses");
    setShowModal(true);
  };

  // ✅ LANGKAH 3 & 4: handleSaveProses dibersihkan (hanya 1 request POST, lalu refresh data)
  const handleSaveProses = async () => {
    try {
      const formData = new FormData();

      formData.append("_method", "PUT");
      formData.append("status", formProses.status);
      formData.append("processed_by", currentUser.id);
      formData.append("catatan_admin", formProses.response_note);

      if (formProses.response_file) {
        formData.append("response_file", formProses.response_file);
      }

      const response = await axios.post(
        `${API_URL}/${selectedPermintaan.id}`,
        formData
      );

      if (response.data.status) {
        await fetchData();
        setShowModal(false);
        alert("Data berhasil diperbarui.");
      } else {
        alert(response.data.message || "Gagal memperbarui data.");
      }

    } catch (err) {
      console.error("ERROR:", err);

      if (err.response) {
        console.log("STATUS:", err.response.status);
        console.log("DATA:", err.response.data);

        alert(
          err.response.data.message ||
          JSON.stringify(err.response.data)
        );
      } else {
        alert(err.message);
      }
    }
  }; // <-- INI ADALAH KURUNG KURAWAL YANG HILANG SEBELUMNYA

  const getStatusBadge = (status, type) => {
    const map = {
      urgensi: {
        normal: "badge-normal",
        segera: "badge-segera",
        "sangat-segera": "badge-sangat-segera",
      },
      permintaan: {
        menunggu: "badge-menunggu",
        diproses: "badge-diproses",
        selesai: "badge-selesai",
        ditolak: "badge-ditolak",
      },
    };
    const normalizedStatus = status ? status.toLowerCase() : "menunggu";
    return map[type]?.[normalizedStatus] || "badge-menunggu";
  };

  const formatTanggal = (dateStr) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="data-permintaan-page">
        <h3>Memuat data...</h3>
      </div>
    );
  }

  if (error) {
    return (
      <div className="data-permintaan-page">
        <h3>{error}</h3>
      </div>
    );
  }

  return (
    <div className="data-permintaan-page">
      {/* HEADER */}
      <div className="page-header">
        <div className="page-header-content">
          <h1>Permintaan Data</h1>
          <p>Daftar permintaan data internal dari satuan kerja</p>
        </div>
      </div>

      {/* FILTER CARD - 4 KOLOM + SEARCH */}
      <div className="filter-card">
        <div className="filter-grid">
          <div className="filter-item">
            <label>Tahun</label>
            <select value={filterTahun} onChange={(e) => setFilterTahun(e.target.value)}>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
            </select>
          </div>
          <div className="filter-item">
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
          <div className="filter-item">
            <label>Tingkat Urgensi</label>
            <select value={filterUrgensi} onChange={(e) => setFilterUrgensi(e.target.value)}>
              <option value="">Semua</option>
              <option value="normal">Normal</option>
              <option value="segera">Segera</option>
              <option value="sangat-segera">Sangat Segera</option>
            </select>
          </div>
          <div className="filter-item">
            <label>Status</label>
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
              <option value="">Semua</option>
              <option value="menunggu">Menunggu</option>
              <option value="diproses">Diproses</option>
              <option value="selesai">Selesai</option>
              <option value="ditolak">Ditolak</option>
            </select>
          </div>
        </div>
        <div className="search-row">
          <input
            type="text"
            placeholder="Cari berdasarkan nama pemohon atau unit kerja..."
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
                <th>Nama & Unit Kerja</th>
                <th>Jenis Data</th>
                <th>Cakupan Wilayah</th>
                <th>Periode Data</th>
                <th>Urgensi</th>
                <th>Status</th>
                <th>Diproses Oleh</th>
                <th>Tanggal Pengajuan</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className="pemohon-info">
                      <div className="pemohon-name">{item.nama_pemohon || "-"}</div>
                      <div className="pemohon-unit">{item.unit_kerja || "-"}</div>
                    </div>
                  </td>
                  <td>
                    <div className="jenis-data-tags">
                      {(item.jenis_data || "")
                        .split(",")
                        .map((data, idx) => (
                          <span key={idx} className="badge badge-jenis-data">
                            {data.trim()}
                          </span>
                        ))}
                    </div>
                  </td>
                  <td>{item.cakupan_wilayah || "-"}</td>
                  <td className="col-periode">
                    {formatTanggal(item.periode_dari)} - {formatTanggal(item.periode_sampai)}
                  </td>
                  <td>
                    <span className={`badge ${getStatusBadge(item.tingkat_urgensi, "urgensi")}`}>
                      {item.tingkat_urgensi ? item.tingkat_urgensi.charAt(0).toUpperCase() + item.tingkat_urgensi.slice(1) : "-"}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${getStatusBadge(item.status, "permintaan")}`}>
                      {item.status ? item.status.charAt(0).toUpperCase() + item.status.slice(1) : "Menunggu"}
                    </span>
                  </td>
                  <td>{item.processed_by ? item.processed_by : "-"}</td>
                  <td>{formatTanggal(item.submitted_at || item.created_at)}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn btn-detail" onClick={() => handleOpenDetail(item)}>Detail</button>
                      <button 
                        className="btn btn-proses" 
                        onClick={() => handleOpenProses(item)} 
                        disabled={(item.status || "").toLowerCase() === "selesai" || (item.status || "").toLowerCase() === "ditolak"}
                      >
                        Proses
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL */}
      {showModal && selectedPermintaan && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content modal-large" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{modalType === "detail" ? "Detail Permintaan Data" : "Proses Permintaan Data"}</h2>
              <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <div className="modal-body">
              {modalType === "detail" && (
                <div>
                  <div className="detail-section">
                    <h3>Data Pemohon</h3>
                    <div className="detail-grid">
                      <div className="detail-item"><label>NIP</label><p>{selectedPermintaan.nip_pemohon || "-"}</p></div>
                      <div className="detail-item"><label>Nama</label><p>{selectedPermintaan.nama_pemohon || "-"}</p></div>
                      <div className="detail-item"><label>Jabatan</label><p>{selectedPermintaan.jabatan || "-"}</p></div>
                      <div className="detail-item"><label>Unit Kerja</label><p>{selectedPermintaan.unit_kerja || "-"}</p></div>
                    </div>
                  </div>
                  <div className="detail-section">
                    <h3>Detail Permintaan</h3>
                    <div className="detail-grid">
                      <div className="detail-item full-width">
                        <label>Jenis Data</label>
                        <div className="jenis-data-tags">
                          {(selectedPermintaan.jenis_data || "")
                            .split(",")
                            .map((d, i) => (
                              <span key={i} className="badge badge-jenis-data">
                                {d.trim()}
                              </span>
                            ))}
                        </div>
                      </div>
                      <div className="detail-item"><label>Cakupan</label><p>{selectedPermintaan.cakupan_wilayah || "-"}</p></div>
                      <div className="detail-item">
                        <label>Periode</label>
                        <p>{formatTanggal(selectedPermintaan.periode_dari)} - {formatTanggal(selectedPermintaan.periode_sampai)}</p>
                      </div>
                      <div className="detail-item full-width">
                        <label>Tujuan</label>
                        <p className="tujuan-text">
                          <strong>{selectedPermintaan.tujuan_kategori || "-"}</strong><br/>
                          {selectedPermintaan.tujuan_detail || "-"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="detail-section">
                    <h3>Riwayat Persetujuan</h3>
                    <div className="timeline">
                      <p style={{ color: "#6b7280", fontStyle: "italic", padding: "0.5rem 0" }}>
                        Riwayat persetujuan detail belum tersedia.
                      </p>
                      {selectedPermintaan.catatan_admin && (
                        <div className="timeline-item" style={{ marginTop: "1rem", borderLeft: "3px solid #f59e0b", paddingLeft: "1rem" }}>
                          <div className="timeline-date">{formatTanggal(selectedPermintaan.processed_at)}</div>
                          <div className="timeline-status">Catatan Admin</div>
                          <div className="timeline-keterangan">{selectedPermintaan.catatan_admin}</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
              
              {/* Form Proses yang terikat ke state formProses */}
              {modalType === "proses" && (
                <div className="form-section">
                  <div className="form-group">
                    <label>Petugas Pengolah *</label>
                  </div>
                  <div className="form-group">
                    <label>Status Permintaan *</label>
                    <select
                      value={formProses.status}
                      onChange={(e) => setFormProses({ ...formProses, status: e.target.value })}
                    >
                      <option value="">-- Pilih Status --</option>
                      <option value="diproses">Diproses</option>
                      <option value="selesai">Selesai</option>
                      <option value="ditolak">Ditolak</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Catatan untuk Pemohon</label>
                    <textarea
                      rows="4"
                      value={formProses.response_note}
                      onChange={(e) => setFormProses({ ...formProses, response_note: e.target.value })}
                      placeholder="Tambahkan catatan..."
                    ></textarea>
                  </div>
                  <div className="form-group">
                    <label>Upload File Balasan</label>
                    <input
                      type="file"
                      onChange={(e) => setFormProses({ ...formProses, response_file: e.target.files[0] })}
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Tutup</button>
              {modalType === "proses" && (
                <button className="btn btn-primary" onClick={handleSaveProses}>
                  Simpan
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}