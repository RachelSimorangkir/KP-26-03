import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Tiket.css";

export default function Tiket() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [tiketList, setTiketList] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterUrgensi, setFilterUrgensi] = useState("");
  const [filterAplikasi, setFilterAplikasi] = useState("");
  const [filterPetugas, setFilterPetugas] = useState("");
  
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedTiket, setSelectedTiket] = useState(null);

  const [formProses, setFormProses] = useState({
    petugas_pj: "",
    status: "",
    tanggapan: "",
    catatan_internal: "",
  });

  // ✅ Fungsi hitungSLA yang sudah benar
  const hitungSLA = (tiket) => {
    if (tiket.status === "selesai" || tiket.status === "ditutup") {
      return { text: "Selesai", className: "sla-selesai" };
    }

    let batasHari = 3;
    switch (tiket.tingkat_urgensi?.toLowerCase()) {
      case "kritis": batasHari = 1; break;
      case "tinggi": batasHari = 2; break;
      case "sedang": batasHari = 3; break;
      case "rendah": batasHari = 5; break;
      default: batasHari = 3;
    }

    const created = new Date(tiket.created_at);
    const sekarang = new Date();
    const selisihHari = Math.floor((sekarang - created) / (1000 * 60 * 60 * 24));
    const sisa = batasHari - selisihHari;

    if (sisa > 0) {
      return { text: `Tersisa ${sisa} hari`, className: "sla-aman" };
    }
    if (sisa === 0) {
      return { text: "Hari ini", className: "sla-warning" };
    }
    return { text: `Terlambat ${Math.abs(sisa)} hari`, className: "sla-terlambat" };
  };

  const loadTiket = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:8080/api/helpdesk");
      setTiketList(res.data.data || []);
    } catch (err) {
      console.error("Gagal memuat tiket:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTiket();
  }, []);

  const filteredData = tiketList.filter((item) => {
    const matchSearch =
      String(item.nomor_tiket || item.id || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.judul_masalah || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.nama_pelapor || "").toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchStatus = filterStatus ? (item.status || "").toLowerCase() === filterStatus.toLowerCase() : true;
    const matchUrgensi = filterUrgensi ? (item.tingkat_urgensi || "").toLowerCase() === filterUrgensi.toLowerCase() : true;
    const matchAplikasi = filterAplikasi ? (item.nama_aplikasi || "").toLowerCase().includes(filterAplikasi.toLowerCase()) : true;
    const matchPetugas = filterPetugas ? (item.petugas_pj || "").toLowerCase().includes(filterPetugas.toLowerCase()) : true;
    
    return matchSearch && matchStatus && matchUrgensi && matchAplikasi && matchPetugas;
  });

  const handleOpenDetail = (tiket) => {
    setSelectedTiket(tiket);
    setModalType("detail");
    setShowModal(true);
  };

  const handleOpenProses = (tiket) => {
    setSelectedTiket(tiket);
    setFormProses({
      petugas_pj: tiket.petugas_pj || "",
      status: tiket.status || "",
      tanggapan: tiket.tanggapan || "",
      catatan_internal: tiket.catatan_internal || "",
    });
    setModalType("proses");
    setShowModal(true);
  };

  const handleSaveProses = async () => {
    if (!formProses.petugas_pj || !formProses.petugas_pj.trim()) {
      alert("Isi nama petugas penanggung jawab terlebih dahulu.");
      return;
    }
    if (!formProses.status) {
      alert("Pilih status tiket terlebih dahulu.");
      return;
    }

    setSaving(true);
    try {
      const formData = new FormData();
      formData.append("_method", "PUT");
      formData.append("petugas_pj", formProses.petugas_pj);
      formData.append("status", formProses.status);
      formData.append("tanggapan", formProses.tanggapan);
      formData.append("catatan_internal", formProses.catatan_internal);

      const response = await axios.post(
        `http://localhost:8080/api/helpdesk/${selectedTiket.id}`,
        formData
      );

      if (response.data.status) {
        await loadTiket();
        setShowModal(false);
        setFormProses({
          petugas_pj: "",
          status: "",
          tanggapan: "",
          catatan_internal: "",
        });
        alert("Tiket berhasil diperbarui.");
      } else {
        alert(response.data.message || "Gagal memperbarui tiket.");
      }
    } catch (err) {
      console.error("ERROR:", err);
      if (err.response) {
        alert(err.response.data.message || JSON.stringify(err.response.data));
      } else {
        alert(err.message);
      }
    } finally {
      setSaving(false);
    }
  };

  const getStatusBadge = (status, type) => {
    if (!status) return "badge-baru";
    const s = status.toLowerCase();
    const map = {
      urgensi: { 
        rendah: "badge-rendah", sedang: "badge-sedang", tinggi: "badge-tinggi", kritis: "badge-kritis" 
      },
      status: { 
        baru: "badge-baru", diproses: "badge-diproses", "menunggu respon": "badge-menunggu-respon", selesai: "badge-selesai", ditutup: "badge-ditutup"
      }
    };
    return map[type]?.[s] || "badge-baru";
  };

  const formatTanggal = (dateStr) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
  };

  if (loading) {
    return (
      <div className="tiket-page">
        <div className="page-header">
          <div className="page-header-content">
            <h1>Tiket Helpdesk</h1>
            <p>Daftar tiket bantuan teknis dari pengguna sistem</p>
          </div>
        </div>
        <div className="table-card">
          <h3 style={{ textAlign: "center", padding: "3rem", color: "#6b7280" }}>Sedang memuat tiket...</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="tiket-page">
      {/* HEADER */}
      <div className="page-header">
        <div className="page-header-content">
          <h1>Tiket Helpdesk</h1>
          <p>Daftar tiket bantuan teknis dari pengguna sistem</p>
        </div>
      </div>

      {/* FILTER CARD */}
      <div className="filter-card">
        <div className="filter-grid">
          <div className="filter-item">
            <label>Status</label>
            {/* ✅ REV: Value option diubah menjadi lowercase agar konsisten dengan database */}
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
              <option value="">Semua</option>
              <option value="baru">Baru</option>
              <option value="diproses">Diproses</option>
              <option value="menunggu respon">Menunggu Respon</option>
              <option value="selesai">Selesai</option>
              <option value="ditutup">Ditutup</option>
            </select>
          </div>
          <div className="filter-item">
            <label>Tingkat Urgensi</label>
            {/* ✅ REV: Value option diubah menjadi lowercase, teks tampilan tetap kapital */}
            <select value={filterUrgensi} onChange={(e) => setFilterUrgensi(e.target.value)}>
              <option value="">Semua</option>
              <option value="rendah">Rendah</option>
              <option value="sedang">Sedang</option>
              <option value="tinggi">Tinggi</option>
              <option value="kritis">Kritis</option>
            </select>
          </div>
          <div className="filter-item">
            <label>Aplikasi</label>
            <input
              type="text"
              placeholder="Cari nama aplikasi..."
              value={filterAplikasi}
              onChange={(e) => setFilterAplikasi(e.target.value)}
            />
          </div>
          <div className="filter-item">
            <label>Petugas</label>
            <input
              type="text"
              placeholder="Cari nama petugas..."
              value={filterPetugas}
              onChange={(e) => setFilterPetugas(e.target.value)}
            />
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
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan="10" style={{ textAlign: "center", padding: "2rem", color: "#6b7280" }}>
                    Tidak ada tiket yang ditemukan sesuai dengan pencarian atau filter.
                  </td>
                </tr>
              ) : (
                filteredData.map((item) => {
                  // ✅ REV: Hitung SLA secara dinamis per item
                  const sla = hitungSLA(item);

                  return (
                    <tr
                      key={item.id}
                      // ✅ REV: Gunakan hasil hitungSLA untuk menentukan class baris
                      className={sla.className === "sla-terlambat" ? "row-sla-danger" : ""}
                    >
                      <td className="col-tiket-id">{item.nomor_tiket || item.id}</td>
                      <td>
                        <div className="pelapor-info">
                          <div className="pelapor-name">{item.nama_pelapor || "-"}</div>
                          <div className="pelapor-unit">{item.unit_kerja || "-"}</div>
                        </div>
                      </td>
                      <td><span className="badge badge-aplikasi">{item.nama_aplikasi || "-"}</span></td>
                      <td>{item.kategori || "-"}</td>
                      <td><span className={`badge ${getStatusBadge(item.tingkat_urgensi, "urgensi")}`}>{item.tingkat_urgensi || "-"}</span></td>
                      <td><span className={`badge ${getStatusBadge(item.status, "status")}`}>{item.status || "-"}</span></td>
                      <td>
                        {item.petugas_pj && item.petugas_pj !== "-" ? (
                          <div className="petugas-info">
                            <span className="petugas-avatar">👤</span>
                            <span>{item.petugas_pj}</span>
                          </div>
                        ) : (
                          <span className="belum-diassign">Belum ditugaskan</span>
                        )}
                      </td>
                      <td>{formatTanggal(item.created_at)}</td>
                      
                      {/* ✅ REV: Tampilkan text dan className dari hasil hitungSLA */}
                      <td>
                        <span className={sla.className}>
                          {sla.text}
                        </span>
                      </td>
                      
                      <td>
                        <div className="action-buttons">
                          {["selesai", "ditutup"].includes((item.status || "").toLowerCase()) ? (
                            <button className="btn btn-detail" onClick={() => handleOpenDetail(item)}>
                              Lihat Detail
                            </button>
                          ) : (
                            <>
                              <button className="btn btn-detail" onClick={() => handleOpenDetail(item)}>Detail</button>
                              <button className="btn btn-proses" onClick={() => handleOpenProses(item)}>
                                Proses
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL */}
      {showModal && selectedTiket && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content modal-large" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>
                {modalType === "detail" 
                  ? `Detail Tiket #${selectedTiket.nomor_tiket || selectedTiket.id}` 
                  : `Proses Tiket #${selectedTiket.nomor_tiket || selectedTiket.id}`}
              </h2>
              <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <div className="modal-body">
              {modalType === "detail" && (
                <div>
                  <div className="detail-section">
                    <h3>Informasi Tiket</h3>
                    <div className="detail-grid">
                      <div className="detail-item"><label>Nomor Tiket</label><p className="tiket-id-large">{selectedTiket.nomor_tiket || selectedTiket.id}</p></div>
                      <div className="detail-item"><label>Status</label><span className={`badge ${getStatusBadge(selectedTiket.status, "status")}`}>{selectedTiket.status}</span></div>
                      <div className="detail-item"><label>Aplikasi</label><p>{selectedTiket.nama_aplikasi || "-"}</p></div>
                      <div className="detail-item"><label>Kategori</label><p>{selectedTiket.kategori || "-"}</p></div>
                      <div className="detail-item"><label>Urgensi</label><span className={`badge ${getStatusBadge(selectedTiket.tingkat_urgensi, "urgensi")}`}>{selectedTiket.tingkat_urgensi || "-"}</span></div>
                      <div className="detail-item"><label>Tanggal Lapor</label><p>{formatTanggal(selectedTiket.created_at)}</p></div>
                    </div>
                  </div>
                  <div className="detail-section">
                    <h3>Data Pelapor</h3>
                    <div className="detail-grid">
                      <div className="detail-item"><label>NIP</label><p>{selectedTiket.nip_pelapor || "-"}</p></div>
                      <div className="detail-item"><label>Nama</label><p>{selectedTiket.nama_pelapor || "-"}</p></div>
                      <div className="detail-item"><label>Unit Kerja</label><p>{selectedTiket.unit_kerja || "-"}</p></div>
                      <div className="detail-item"><label>Email</label><p>{selectedTiket.email || "-"}</p></div>
                      <div className="detail-item"><label>No. HP</label><p>{selectedTiket.no_hp || "-"}</p></div>
                    </div>
                  </div>
                  <div className="detail-section">
                    <h3>Detail Masalah</h3>
                    <div className="detail-item full-width"><label>Judul</label><p className="judul-masalah">{selectedTiket.judul_masalah || "-"}</p></div>
                    <div className="detail-item full-width"><label>Deskripsi</label><p className="deskripsi-masalah">{selectedTiket.deskripsi_masalah || "-"}</p></div>
                  </div>
                  
                  {selectedTiket.lampiran && (
                    <div className="detail-section">
                      <h3>Lampiran</h3>
                      {(() => {
                        const ext = selectedTiket.lampiran.split('.').pop().toLowerCase();
                        const fileUrl = `http://localhost:8080/${selectedTiket.lampiran}`;
                        
                        if (['jpg', 'jpeg', 'png', 'gif'].includes(ext)) {
                          return (
                            <img 
                              loading="lazy"
                              src={fileUrl} 
                              alt="Lampiran" 
                              style={{ maxWidth: "100%", borderRadius: "8px", border: "1px solid #e5e7eb", marginTop: "0.5rem" }} 
                            />
                          );
                        } else if (ext === 'pdf') {
                          return (
                            <a href={fileUrl} target="_blank" rel="noreferrer" style={{ color: "#2563eb", textDecoration: "underline", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                              📄 Lihat PDF
                            </a>
                          );
                        } else {
                          return (
                            <a href={fileUrl} target="_blank" rel="noreferrer" style={{ color: "#2563eb", textDecoration: "underline", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                              📎 Download Dokumen
                            </a>
                          );
                        }
                      })()}
                    </div>
                  )}

                  {selectedTiket.tanggapan && (
                    <div className="detail-section">
                      <h3>Tanggapan/Solusi</h3>
                      <div className="tanggapan-box"><p>{selectedTiket.tanggapan}</p></div>
                    </div>
                  )}
                </div>
              )}
              
              {/* Form Proses */}
              {modalType === "proses" && (
                <div className="form-section">
                  <div className="form-group">
                    <label>Petugas Penanggung Jawab *</label>
                    <input
                      type="text"
                      placeholder="Masukkan nama petugas"
                      value={formProses.petugas_pj}
                      onChange={(e) => setFormProses({ ...formProses, petugas_pj: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Status Tiket *</label>
                    <select 
                      value={formProses.status}
                      onChange={(e) => setFormProses({ ...formProses, status: e.target.value })}
                    >
                      <option value="">-- Pilih Status --</option>
                      <option value="diproses">Diproses</option>
                      <option value="menunggu respon">Menunggu Respon</option>
                      <option value="selesai">Selesai</option>
                      <option value="ditutup">Ditutup</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Tanggapan/Solusi</label>
                    <textarea 
                      rows="4" 
                      placeholder="Tulis tanggapan..."
                      value={formProses.tanggapan}
                      onChange={(e) => setFormProses({ ...formProses, tanggapan: e.target.value })}
                    ></textarea>
                  </div>
                  <div className="form-group">
                    <label>Catatan Internal</label>
                    <textarea 
                      rows="3" 
                      placeholder="Catatan internal (tidak terlihat user)..."
                      value={formProses.catatan_internal}
                      onChange={(e) => setFormProses({ ...formProses, catatan_internal: e.target.value })}
                    ></textarea>
                  </div>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Tutup</button>
              {modalType === "proses" && (
                <button 
                  className="btn btn-primary" 
                  disabled={saving} 
                  onClick={handleSaveProses}
                >
                  {saving ? "Menyimpan..." : "Simpan"}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}