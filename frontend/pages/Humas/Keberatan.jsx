import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Keberatan.css";
import Swal from "sweetalert2";

export default function Keberatan() {
  const navigate = useNavigate();

  const [keberatanList, setKeberatanList] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterJenis, setFilterJenis] = useState("");
  const [filterUrgensi, setFilterUrgensi] = useState("");
  const [filterPetugas, setFilterPetugas] = useState("");
  
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  // ✅ LANGKAH 1: State disesuaikan persis dengan revisi
  const [formProses, setFormProses] = useState({
    petugas_ppid: "",
    status: "",
    tanggapan: "",
    catatan_internal: "",
    surat_balasan: null,
  });
  const [saving, setSaving] = useState(false);

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:8080/api/ppid");
      setKeberatanList(res.data.data || []);
    } catch (err) {
      console.error("Gagal memuat data PPID:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const hitungSisaHari = (item) => {
    if (item.status === "selesai" || item.status === "ditolak") return "Selesai";
    
    let batasHari = 5;
    const urgensi = (item.tingkat_urgensi || "").toLowerCase();
    if (urgensi === "kritis") batasHari = 1;
    else if (urgensi === "tinggi" || urgensi === "segera") batasHari = 2;
    else if (urgensi === "sedang") batasHari = 3;
    else if (urgensi === "rendah" || urgensi === "normal") batasHari = 5;

    const created = new Date(item.created_at);
    const sekarang = new Date();
    const selisihHari = Math.floor((sekarang - created) / (1000 * 60 * 60 * 24));
    const sisa = batasHari - selisihHari;
    
    return sisa;
  };

  const filteredData = keberatanList.filter((item) => {
    const matchSearch =
      String(item.nomor_registrasi || item.id || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.nama_pengaju || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.uraian_permohonan || "").toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchStatus = filterStatus ? (item.status || "").toLowerCase() === filterStatus.toLowerCase() : true;
    const matchJenis = filterJenis ? (item.jenis_permohonan || "").toLowerCase().includes(filterJenis.toLowerCase()) : true;
    const matchUrgensi = filterUrgensi ? (item.tingkat_urgensi || "").toLowerCase() === filterUrgensi.toLowerCase() : true;
    const matchPetugas = filterPetugas ? (item.petugas_ppid || "").toLowerCase().includes(filterPetugas.toLowerCase()) : true;
    
    return matchSearch && matchStatus && matchJenis && matchUrgensi && matchPetugas;
  });

  const handleOpenDetail = (item) => {
    setSelectedItem(item);
    setModalType("detail");
    setShowModal(true);
  };

  const handleOpenProses = (item) => {
    setSelectedItem(item);
    // ✅ LANGKAH 1: Reset surat_balasan saat membuka modal proses
    setFormProses({
      petugas_ppid: item.petugas_ppid || "",
      status: item.status || "",
      tanggapan: item.tanggapan || "",
      catatan_internal: "",
      surat_balasan: null,
    });
    setModalType("proses");
    setShowModal(true);
  };

  const handleSimpan = async () => {
    if (!formProses.petugas_ppid || !formProses.status) {
      Swal.fire({
        icon: "warning",
        title: "Validasi Gagal",
        text: "Petugas PPID dan Status Permohonan wajib diisi!",
        confirmButtonColor: "#2563eb",
      });
      return;
    }

    // ✅ LANGKAH 3: Validasi wajib upload surat balasan jika status selesai/ditolak
    if (
      (formProses.status === "selesai" || formProses.status === "ditolak") &&
      !formProses.surat_balasan
    ) {
      Swal.fire({
        icon: "warning",
        title: "Validasi Gagal",
        text: "Surat balasan wajib diupload.",
        confirmButtonColor: "#2563eb",
      });
      return;
    }

    setSaving(true);
    try {
      const formData = new FormData();
      formData.append("_method", "PUT");
      formData.append("petugas_ppid", formProses.petugas_ppid);
      formData.append("status", formProses.status);
      formData.append("catatan_internal", formProses.catatan_internal);
      formData.append("tanggapan", formProses.tanggapan);

      // ✅ LANGKAH 4: Tambahkan surat balasan ke FormData jika ada file
      if (formProses.surat_balasan) {
        formData.append("surat_balasan", formProses.surat_balasan);
      }

      const response = await axios.post(
        `http://localhost:8080/api/ppid/${selectedItem.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.status) {
        await loadData();
        setShowModal(false);
        // Reset form setelah sukses
        setFormProses({
          petugas_ppid: "",
          status: "",
          tanggapan: "",
          catatan_internal: "",
          surat_balasan: null,
        });
        Swal.fire({
          icon: "success",
          title: "Perubahan Berhasil Disimpan",
          html: `<div style="font-size:15px;line-height:1.8">Status permohonan berhasil diperbarui.<br><strong>Perubahan telah tersimpan pada sistem.</strong></div>`,
          confirmButtonText: "Selesai",
          confirmButtonColor: "#2563eb",
          width: "430px",
          padding: "2rem",
          timer: 2500,
          timerProgressBar: true,
        });
      } else {
        Swal.fire({ icon: "error", title: "Gagal", text: response.data.message });
      }
    } catch (err) {
      console.error("ERROR:", err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.response?.data?.message || "Terjadi kesalahan jaringan.",
      });
    } finally {
      setSaving(false);
    }
  };

  const getStatusBadge = (status, type) => {
    const s = (status || "").toLowerCase();
    const map = {
      permohonan: { 
        baru: "badge-diajukan", 
        diproses: "badge-diproses", 
        mediasi: "badge-mediasi", 
        selesai: "badge-selesai", 
        ditolak: "badge-ditolak" 
      },
      urgensi: { 
        normal: "badge-normal", 
        segera: "badge-segera",
        rendah: "badge-normal",
        sedang: "badge-segera",
        tinggi: "badge-segera",
        kritis: "badge-ditolak" 
      },
    };
    return map[type]?.[s] || "badge-menunggu";
  };

  const getSisaHariClass = (hari) => {
    if (hari === "Selesai") return "badge-selesai";
    if (hari <= 0) return "badge-sla-danger";
    if (hari <= 7) return "badge-sla-warning";
    return "badge-sla-normal";
  };

  const formatTanggal = (dateStr) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
  };

  const isImage = (file) => {
    if (!file) return false;
    return /\.(jpg|jpeg|png)$/i.test(file);
  };

  const isPdf = (file) => {
    if (!file) return false;
    return /\.pdf$/i.test(file);
  };

  if (loading) {
    return (
      <div className="keberatan-page">
        <div className="page-header">
          <div className="page-header-content">
            <h1>Keberatan Informasi</h1>
            <p>Monitoring permohonan dan keberatan informasi antar-unit (PPID Internal)</p>
          </div>
        </div>
        <div className="table-card">
          <h3 style={{ textAlign: "center", padding: "3rem", color: "#6b7280" }}>Sedang memuat data...</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="keberatan-page">
      <div className="page-header">
        <div className="page-header-content">
          <h1>Keberatan Informasi</h1>
          <p>Monitoring permohonan dan keberatan informasi antar-unit (PPID Internal)</p>
        </div>
      </div>

      <div className="filter-card">
        <div className="filter-grid">
          <div className="filter-item">
            <label>Status Permohonan</label>
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
              <option value="">Semua</option>
              <option value="baru">Baru</option>
              <option value="diproses">Diproses</option>
              <option value="mediasi">Mediasi</option>
              <option value="selesai">Selesai</option>
              <option value="ditolak">Ditolak</option>
            </select>
          </div>
          <div className="filter-item">
            <label>Jenis Permohonan</label>
            <input
              type="text"
              placeholder="Cari jenis permohonan..."
              value={filterJenis}
              onChange={(e) => setFilterJenis(e.target.value)}
            />
          </div>
          <div className="filter-item">
            <label>Tingkat Urgensi</label>
            <select value={filterUrgensi} onChange={(e) => setFilterUrgensi(e.target.value)}>
              <option value="">Semua</option>
              <option value="normal">Normal</option>
              <option value="segera">Segera</option>
              <option value="tinggi">Tinggi</option>
              <option value="kritis">Kritis</option>
            </select>
          </div>
          <div className="filter-item">
            <label>Petugas PPID</label>
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
            placeholder="Cari nomor registrasi, nama pengaju, atau uraian..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="table-card">
        <div className="table-scroll">
          <table className="data-table">
            <thead>
              <tr>
                <th>No. Registrasi</th>
                <th>Pengaju & Unit</th>
                <th>Jenis</th>
                <th>Unit Tujuan</th>
                <th>Urgensi</th>
                <th>Status Permohonan</th>
                <th>Petugas PPID</th>
                <th>Tgl Pengajuan</th>
                <th>Sisa Hari</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan="10" style={{ textAlign: "center", padding: "2rem", color: "#6b7280" }}>
                    Tidak ada data permohonan yang ditemukan.
                  </td>
                </tr>
              ) : (
                filteredData.map((item) => {
                  const sisaHari = hitungSisaHari(item);
                  return (
                    <tr 
                      key={item.id} 
                      className={
                        sisaHari === "Selesai" ? "" : 
                        sisaHari <= 0 ? "row-sla-danger" : 
                        sisaHari <= 7 ? "row-sla-warning" : ""
                      }
                    >
                      <td className="col-reg-id">{item.nomor_registrasi || `PPID-${item.id}`}</td>
                      <td>
                        <div className="pengaju-info">
                          <div className="pengaju-name">{item.nama_pengaju || "-"}</div>
                          <div className="pengaju-unit">{item.unit_pengaju || "-"}</div>
                        </div>
                      </td>
                      <td><span className="badge badge-jenis">{item.jenis_permohonan || "-"}</span></td>
                      <td>{item.unit_tujuan || "-"}</td>
                      <td><span className={`badge ${getStatusBadge(item.tingkat_urgensi, "urgensi")}`}>{item.tingkat_urgensi || "-"}</span></td>
                      <td><span className={`badge ${getStatusBadge(item.status, "permohonan")}`}>{item.status || "-"}</span></td>
                      <td>
                        {item.petugas_ppid ? (
                          <div className="petugas-info">
                            <span className="petugas-avatar">👤</span>
                            <span>{item.petugas_ppid}</span>
                          </div>
                        ) : (
                          <span className="belum-diassign">Belum ditugaskan</span>
                        )}
                      </td>
                      <td>{formatTanggal(item.created_at)}</td>
                      <td>
                        <span className={`badge ${getSisaHariClass(sisaHari)}`}>
                          {sisaHari === "Selesai" ? "Selesai" : sisaHari <= 0 ? `Terlambat ${Math.abs(sisaHari)} hari` : `${sisaHari} hari`}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button className="btn btn-detail" onClick={() => handleOpenDetail(item)}>Detail</button>
                          <button 
                            className="btn btn-proses" 
                            onClick={() => handleOpenProses(item)} 
                            disabled={item.status === "selesai" || item.status === "ditolak"}
                          >
                            Proses
                          </button>
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
      {showModal && selectedItem && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content modal-large" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>
                {modalType === "detail" 
                  ? `Detail Permohonan #${selectedItem.nomor_registrasi || selectedItem.id}` 
                  : `Proses Permohonan #${selectedItem.nomor_registrasi || selectedItem.id}`}
              </h2>
              <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <div className="modal-body">
              {modalType === "detail" && (
                <div>
                  <div className="detail-section">
                    <h3>Data Pengaju</h3>
                    <div className="detail-grid">
                      <div className="detail-item"><label>NIP</label><p>{selectedItem.nip_pengaju || "-"}</p></div>
                      <div className="detail-item"><label>Nama Pengaju</label><p>{selectedItem.nama_pengaju || "-"}</p></div>
                      <div className="detail-item"><label>Unit Kerja</label><p>{selectedItem.unit_pengaju || "-"}</p></div>
                      <div className="detail-item"><label>Jenis Permohonan</label><p><span className="badge badge-jenis">{selectedItem.jenis_permohonan || "-"}</span></p></div>
                    </div>
                  </div>

                  <div className="detail-section">
                    <h3>Detail Permohonan</h3>
                    <div className="detail-grid">
                      <div className="detail-item"><label>Unit Kerja Tujuan</label><p>{selectedItem.unit_tujuan || "-"}</p></div>
                      <div className="detail-item"><label>Tanggal Pengajuan</label><p>{formatTanggal(selectedItem.created_at)}</p></div>
                      <div className="detail-item full-width"><label>Uraian</label><p className="uraian-text">{selectedItem.uraian_permohonan || "-"}</p></div>
                    </div>
                  </div>

                  <div className="detail-section">
                    <h3>Dokumen Pendukung</h3>
                    {selectedItem.lampiran ? (
                      <div className="lampiran-card">
                        <div className="lampiran-info">
                          <div className="lampiran-icon">📄</div>
                          <div>
                            <strong>
                              {selectedItem.lampiran.split("/").pop()}
                            </strong>
                            <p>Dokumen pendukung permohonan</p>
                          </div>
                        </div>
                        <div className="lampiran-actions">
                          <a
                            href={`http://localhost:8080/${selectedItem.lampiran}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-detail"
                          >
                            👁 Lihat
                          </a>
                          <a
                            href={`http://localhost:8080/${selectedItem.lampiran}`}
                            download
                            className="btn btn-primary"
                          >
                            ⬇ Download
                          </a>
                        </div>
                      </div>
                    ) : (
                      <div className="lampiran-empty">
                        Tidak ada dokumen pendukung.
                      </div>
                    )}
                  </div>

                  {selectedItem.lampiran && (
                    <div className="detail-section">
                      <h3>Preview Dokumen</h3>
                      {isPdf(selectedItem.lampiran) && (
                        <iframe
                          src={`http://localhost:8080/${selectedItem.lampiran}`}
                          title="Preview PDF"
                          className="pdf-preview"
                        />
                      )}
                      {isImage(selectedItem.lampiran) && (
                        <img
                          src={`http://localhost:8080/${selectedItem.lampiran}`}
                          className="image-preview"
                          alt="Preview Dokumen"
                        />
                      )}
                    </div>
                  )}

                  {selectedItem.surat_balasan && (
                    <div className="detail-section">
                      <h3>Surat Balasan</h3>
                      <div className="lampiran-card">
                        <div className="lampiran-info">
                          <div className="lampiran-icon">📄</div>
                          <div>
                            <strong>
                              {selectedItem.surat_balasan.split("/").pop()}
                            </strong>
                            <p>Surat balasan resmi PPID</p>
                          </div>
                        </div>
                        <div className="lampiran-actions">
                          <a
                            href={`http://localhost:8080/${selectedItem.surat_balasan}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-detail"
                          >
                            👁 Lihat
                          </a>
                          <a
                            href={`http://localhost:8080/${selectedItem.surat_balasan}`}
                            download
                            className="btn btn-primary"
                          >
                            ⬇ Download
                          </a>
                        </div>
                      </div>

                      {isPdf(selectedItem.surat_balasan) && (
                        <iframe
                          src={`http://localhost:8080/${selectedItem.surat_balasan}`}
                          title="Preview Surat Balasan"
                          className="pdf-preview"
                        />
                      )}
                      {isImage(selectedItem.surat_balasan) && (
                        <img
                          src={`http://localhost:8080/${selectedItem.surat_balasan}`}
                          className="image-preview"
                          alt="Preview Surat Balasan"
                        />
                      )}
                    </div>
                  )}

                  {selectedItem.tanggapan && (
                    <div className="detail-section">
                      <h3>Tanggapan / Putusan</h3>
                      <div className="tanggapan-box"><p>{selectedItem.tanggapan}</p></div>
                    </div>
                  )}
                </div>
              )}
              
              {modalType === "proses" && (
                <div className="form-section">
                  <div className="form-group">
                    <label>Petugas Penanggung Jawab *</label>
                    <input
                      type="text"
                      placeholder="Masukkan nama petugas PPID"
                      value={formProses.petugas_ppid}
                      onChange={(e) => setFormProses({ ...formProses, petugas_ppid: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Status Permohonan *</label>
                    <select
                      value={formProses.status}
                      onChange={(e) => setFormProses({ ...formProses, status: e.target.value })}
                    >
                      <option value="">-- Pilih Status --</option>
                      <option value="diproses">Diproses</option>
                      <option value="mediasi">Mediasi</option>
                      <option value="selesai">Selesai</option>
                      <option value="ditolak">Ditolak</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Catatan Proses / Mediasi</label>
                    <textarea 
                      rows="3" 
                      placeholder="Catatan proses internal..."
                      value={formProses.catatan_internal}
                      onChange={(e) => setFormProses({ ...formProses, catatan_internal: e.target.value })}
                    ></textarea>
                  </div>
                  <div className="form-group">
                    <label>Tanggapan / Putusan</label>
                    <textarea 
                      rows="4" 
                      placeholder="Tulis tanggapan atau putusan untuk pemohon..."
                      value={formProses.tanggapan}
                      onChange={(e) => setFormProses({ ...formProses, tanggapan: e.target.value })}
                    ></textarea>
                  </div>

                  {/* ✅ LANGKAH 2: Upload Surat Balasan hanya muncul jika status selesai atau ditolak */}
                  {(formProses.status === "selesai" || formProses.status === "ditolak") && (
                    <div className="form-group">
                      <label>
                        Surat Balasan *
                      </label>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => {
                          setFormProses({
                            ...formProses,
                            surat_balasan: e.target.files[0],
                          });
                        }}
                      />
                      {/* Preview nama file yang dipilih */}
                      {formProses.surat_balasan && (
                        <div className="selected-file">
                          📄 {formProses.surat_balasan.name}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Tutup</button>
              {modalType === "proses" && (
                <button
                  className="btn btn-primary"
                  onClick={handleSimpan}
                  disabled={saving}
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