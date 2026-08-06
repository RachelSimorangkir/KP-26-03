import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./UploadDip.css";

export default function UploadDip() {
  const navigate = useNavigate();

  const [uploadList, setUploadList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false); // ✅ REV 5: State terpisah untuk proses simpan

  // ✅ REV 1: Filter tahun dinamis (default tahun sekarang)
  const currentYear = String(new Date().getFullYear());
  const [filterTahun, setFilterTahun] = useState(currentYear);
  const [filterStatus, setFilterStatus] = useState("Semua");
  const [keyword, setKeyword] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(""); 
  const [selectedItem, setSelectedItem] = useState(null);

  const [validasiForm, setValidasiForm] = useState({
    status: "",
    catatan_admin: "",
  });

  const [reminderForm, setReminderForm] = useState({
    bidangTerpilih: [],
    pesan: "Dengan hormat,\n\nKami mengingatkan bahwa batas waktu upload DIP Tahunan ini segera berakhir. Mohon segera mengunggah dokumen DIP unit Anda.\n\nTerima kasih.",
  });

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:8080/api/dip");
      setUploadList(res.data.data || []);
    } catch (err) {
      console.error("Gagal memuat data DIP:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // ✅ REV 1: Buat daftar tahun dinamis dari data yang ada
  const tahunList = [...new Set(uploadList.map((i) => i.tahun).filter(Boolean))];

  // ✅ REV 2: Progress berdasarkan target total unit kerja (misal: 20), bukan panjang array uploadList
  const TOTAL_TARGET_UNITS = 20; 
  const selesaiCount = uploadList.filter((d) => d.status === "Selesai").length;
  const progressPersentase = (selesaiCount / TOTAL_TARGET_UNITS) * 100;

  const filteredData = uploadList.filter((item) => {
    const cocokTahun = filterTahun === "" || String(item.tahun) === filterTahun;
    const cocokStatus = filterStatus === "Semua" || item.status === filterStatus;
    const cocokKeyword =
      (item.nomor_upload || "").toLowerCase().includes(keyword.toLowerCase()) ||
      (item.nama_pengaju || "").toLowerCase().includes(keyword.toLowerCase());

    return cocokTahun && cocokStatus && cocokKeyword;
  });

  const handleOpenLihat = (item) => {
    setSelectedItem(item);
    setModalType("lihat");
    setShowModal(true);
  };

  const handleOpenValidasi = (item) => {
    setSelectedItem(item);
    setValidasiForm({
      status: "",
      catatan_admin: "",
    });
    setModalType("validasi");
    setShowModal(true);
  };

  const handleOpenReminder = () => {
    const unitBelumSelesai = [...new Set(
      uploadList
        .filter((d) => d.status !== "Selesai")
        .map((d) => d.unit_pengaju)
    )];
    
    setReminderForm({
      bidangTerpilih: unitBelumSelesai,
      pesan: reminderForm.pesan,
    });
    setModalType("reminder");
    setShowModal(true);
  };

  const handleSubmitValidasi = async (e) => {
    e.preventDefault();

    if (!validasiForm.status) {
      alert("Hasil validasi wajib dipilih!");
      return;
    }

    // ✅ REV 3: Hanya cek "Revisi" karena "Ditolak" sudah dihapus
    if (validasiForm.status === "Revisi" && !validasiForm.catatan_admin) {
      alert("Catatan validasi wajib diisi jika status Revisi!");
      return;
    }

    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
    const validatedBy = currentUser.nama || "Admin PPID";

    try {
      setSaving(true); // ✅ REV 5: Aktifkan state saving
      const response = await axios.put(
        `http://localhost:8080/api/dip/${selectedItem.id}`,
        {
          status: validasiForm.status,
          catatan_admin: validasiForm.catatan_admin,
          validated_by: validatedBy,
        }
      );

      if (response.data.status) {
        alert("Validasi berhasil disimpan!");
        setShowModal(false);
        await loadData(); // Refresh otomatis
      } else {
        alert(response.data.message || "Gagal menyimpan validasi.");
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan jaringan saat menyimpan validasi.");
    } finally {
      setSaving(false); // ✅ REV 5: Matikan state saving
    }
  };

  const handleSubmitReminder = (e) => {
    e.preventDefault();
    if (reminderForm.bidangTerpilih.length === 0) {
      alert("Minimal pilih 1 unit untuk dikirim reminder!");
      return;
    }
    alert(`Reminder berhasil dikirim ke ${reminderForm.bidangTerpilih.length} unit! (Simulasi)`);
    setShowModal(false);
  };

  const handleBidangChange = (unit) => {
    const newBidang = reminderForm.bidangTerpilih.includes(unit)
      ? reminderForm.bidangTerpilih.filter((b) => b !== unit)
      : [...reminderForm.bidangTerpilih, unit];
    setReminderForm({ ...reminderForm, bidangTerpilih: newBidang });
  };

  const handleSelectAll = () => {
    const uniqueUnits = [...new Set(uploadList.map((d) => d.unit_pengaju))];
    if (reminderForm.bidangTerpilih.length === uniqueUnits.length) {
      setReminderForm({ ...reminderForm, bidangTerpilih: [] });
    } else {
      setReminderForm({ ...reminderForm, bidangTerpilih: uniqueUnits });
    }
  };

  // ✅ REV 6: Fallback badge menggunakan nullish coalescing (??)
  const getStatusBadgeClass = (status) => {
    const statusMap = {
      "Selesai": "badge-selesai",
      "Menunggu Validasi": "badge-menunggu",
      "Revisi": "badge-revisi",
      "Belum Upload": "badge-belum",
    };
    return statusMap[status] ?? "badge-menunggu";
  };

  const formatTanggal = (dateStr) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  if (loading && uploadList.length === 0) {
    return (
      <div className="upload-dip-page">
        <div className="page-header">
          <div className="page-header-content">
            <h1>Upload DIP Tahunan</h1>
            <p>Monitoring upload Dokumen Informasi Publik (DIP)</p>
          </div>
        </div>
        <div className="table-container" style={{ textAlign: "center", padding: "3rem" }}>
          <h3>Memuat data...</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="upload-dip-page">
      {/* HEADER */}
      <div className="page-header">
        <div className="page-header-content">
          <h1>Upload DIP Tahunan</h1>
          <p>Monitoring upload Dokumen Informasi Publik (DIP) dari seluruh unit kerja</p>
        </div>
      </div>

      {/* PROGRESS BAR */}
      <div className="progress-section">
        <div className="progress-header">
          <h3>Progress Upload DIP {currentYear}</h3>
          {/* ✅ REV 2: Menggunakan TOTAL_TARGET_UNITS */}
          <span className="progress-text">
            {selesaiCount} dari {TOTAL_TARGET_UNITS} unit kerja ({Math.min(100, Math.round(progressPersentase))}%)
          </span>
        </div>
        <div className="progress-bar-container">
          <div
            className="progress-bar"
            style={{ width: `${Math.min(100, progressPersentase)}%` }}
          ></div>
        </div>
        <div className="progress-stats">
          <div className="stat-item">
            <span className="stat-icon">✅</span>
            <span className="stat-label">Selesai</span>
            <span className="stat-value">{selesaiCount}</span>
          </div>
          <div className="stat-item">
            <span className="stat-icon">⏳</span>
            <span className="stat-label">Menunggu Validasi</span>
            <span className="stat-value">{uploadList.filter((d) => d.status === "Menunggu Validasi").length}</span>
          </div>
          <div className="stat-item">
            <span className="stat-icon">🟡</span>
            <span className="stat-label">Revisi</span>
            <span className="stat-value">{uploadList.filter((d) => d.status === "Revisi").length}</span>
          </div>
        </div>
      </div>

      {/* FILTER & ACTION */}
      <div className="filter-section">
        <div className="filter-row" style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          <div className="filter-group">
            <label>Tahun</label>
            {/* ✅ REV 1: Dropdown tahun dinamis */}
            <select value={filterTahun} onChange={(e) => setFilterTahun(e.target.value)}>
              <option value="">Semua</option>
              {tahunList.map((tahun) => (
                <option key={tahun} value={tahun}>
                  {tahun}
                </option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <label>Status</label>
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
              <option value="Semua">Semua</option>
              <option value="Menunggu Validasi">Menunggu Validasi</option>
              <option value="Revisi">Revisi</option>
              <option value="Selesai">Selesai</option>
            </select>
          </div>
          <div className="filter-group" style={{ flex: 1, minWidth: "250px" }}>
            <label>Pencarian</label>
            <input 
              type="text" 
              placeholder="Cari nomor upload atau nama..." 
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              style={{ width: "100%", padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
            />
          </div>
        </div>
        <button className="btn-reminder" onClick={handleOpenReminder}>
          📧 Kirim Reminder
        </button>
      </div>

      {/* MATRIKS STATUS / TABEL */}
      <div className="table-container">
        <table className="dip-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Nomor Upload</th>
              <th>Nama Pengaju</th>
              <th>Unit Kerja</th>
              <th>Tahun</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: "center", padding: "2rem", color: "#64748b" }}>
                  Tidak ada data yang ditemukan.
                </td>
              </tr>
            ) : (
              filteredData.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td className="bidang-name" style={{ fontWeight: "600", color: "#2563eb" }}>
                    {item.nomor_upload || `DIP-${item.id}`}
                  </td>
                  <td>{item.nama_pengaju}</td>
                  <td>{item.unit_pengaju}</td>
                  <td>{item.tahun}</td>
                  <td>
                    <span className={`badge ${getStatusBadgeClass(item.status)}`}>
                      {item.status === "Selesai" && "✅ "}
                      {item.status === "Menunggu Validasi" && "⏳ "}
                      {item.status === "Revisi" && "🟡 "}
                      {item.status}
                    </span>
                  </td>
                  <td className="aksi-cell">
                    {item.file_path && (
                      <button
                        className="btn-action btn-lihat"
                        onClick={() => handleOpenLihat(item)}
                        title="Lihat Dokumen"
                      >
                        👁️
                      </button>
                    )}
                    {(item.status === "Menunggu Validasi" || item.status === "Revisi") && (
                      <button
                        className="btn-action btn-validasi"
                        onClick={() => handleOpenValidasi(item)}
                        title="Validasi"
                      >
                        ✓
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL LIHAT DOKUMEN */}
      {showModal && modalType === "lihat" && selectedItem && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>📄 Dokumen DIP - {selectedItem.unit_pengaju}</h2>
              <button className="modal-close" onClick={() => setShowModal(false)}>
                ✕
              </button>
            </div>
            <div className="modal-body">
              <div className="document-info">
                <div className="info-item">
                  <label>Nomor Upload</label>
                  <p>{selectedItem.nomor_upload || "-"}</p>
                </div>
                <div className="info-item">
                  <label>Nama Pengaju</label>
                  <p>{selectedItem.nama_pengaju}</p>
                </div>
                <div className="info-item">
                  <label>Unit Kerja</label>
                  <p>{selectedItem.unit_pengaju}</p>
                </div>
                <div className="info-item">
                  <label>Tahun</label>
                  <p>{selectedItem.tahun}</p>
                </div>
                <div className="info-item" style={{ gridColumn: "1 / -1" }}>
                  <label>Catatan Pengirim</label>
                  <p>{selectedItem.catatan_pengirim || "-"}</p>
                </div>
              </div>

              <div className="document-preview" style={{ marginTop: "20px", textAlign: "center", padding: "20px", background: "#f8fafc", borderRadius: "8px" }}>
                <span className="preview-icon" style={{ fontSize: "48px" }}>📄</span>
                <p style={{ fontWeight: "600", marginTop: "10px" }}>{selectedItem.nama_file}</p>
                <p style={{ color: "#64748b", fontSize: "14px" }}>
                  Diunggah pada: {formatTanggal(selectedItem.created_at)}
                </p>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setShowModal(false)}>
                Tutup
              </button>
              {/* ✅ REV 4: replace(/^\/+/, '') untuk mencegah double slash pada URL */}
              <a 
                href={`http://localhost:8080/${selectedItem.file_path?.replace(/^\/+/, '')}`}
                target="_blank"
                rel="noreferrer"
                className="btn-primary"
                style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", justifyContent: "center" }}
              >
                ⬇️ Download Dokumen
              </a>
            </div>
          </div>
        </div>
      )}

      {/* MODAL VALIDASI */}
      {showModal && modalType === "validasi" && selectedItem && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>✓ Validasi Dokumen DIP</h2>
              <button className="modal-close" onClick={() => setShowModal(false)}>
                ✕
              </button>
            </div>
            <form onSubmit={handleSubmitValidasi}>
              <div className="modal-body">
                <div className="document-info" style={{ marginBottom: "20px", paddingBottom: "15px", borderBottom: "1px solid #e2e8f0" }}>
                  <div className="info-item">
                    <label>Nomor Upload</label>
                    <p>{selectedItem.nomor_upload || "-"}</p>
                  </div>
                  <div className="info-item">
                    <label>Nama File</label>
                    <p>{selectedItem.nama_file}</p>
                  </div>
                </div>

                <div className="form-section">
                  <div className="form-group">
                    <label>Hasil Validasi *</label>
                    <select
                      value={validasiForm.status}
                      onChange={(e) => setValidasiForm({ ...validasiForm, status: e.target.value })}
                      required
                    >
                      <option value="">-- Pilih Hasil Validasi --</option>
                      <option value="Menunggu Validasi">⏳ Menunggu Validasi</option>
                      <option value="Revisi">🟡 Revisi</option>
                      <option value="Selesai">✅ Selesai</option>
                      {/* ✅ REV 3: Opsi "Ditolak" dihapus agar sesuai backend */}
                    </select>
                  </div>

                  {validasiForm.status === "Revisi" && (
                    <div className="form-group">
                      <label>Catatan Validasi *</label>
                      <textarea
                        value={validasiForm.catatan_admin}
                        onChange={(e) => setValidasiForm({ ...validasiForm, catatan_admin: e.target.value })}
                        rows="4"
                        placeholder="Jelaskan alasan revisi..."
                        required
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>
                  Batal
                </button>
                {/* ✅ REV 5: Menggunakan state saving, bukan loading */}
                <button type="submit" className="btn-primary" disabled={saving}>
                  {saving ? "Menyimpan..." : "Simpan Validasi"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL REMINDER */}
      {showModal && modalType === "reminder" && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content modal-large" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>📧 Kirim Reminder Upload DIP</h2>
              <button className="modal-close" onClick={() => setShowModal(false)}>
                ✕
              </button>
            </div>
            <form onSubmit={handleSubmitReminder}>
              <div className="modal-body">
                <div className="form-section">
                  <h3>Pilih Unit Kerja</h3>
                  
                  <div className="checkbox-header">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={reminderForm.bidangTerpilih.length > 0 && reminderForm.bidangTerpilih.length === [...new Set(uploadList.map((d) => d.unit_pengaju))].length}
                        onChange={handleSelectAll}
                      />
                      <strong>Pilih Semua Unit</strong>
                    </label>
                  </div>

                  <div className="checkbox-list" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginTop: "10px" }}>
                    {[...new Set(uploadList.map((d) => d.unit_pengaju))].map((unit, idx) => (
                      <label key={idx} className="checkbox-label" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <input
                          type="checkbox"
                          checked={reminderForm.bidangTerpilih.includes(unit)}
                          onChange={() => handleBidangChange(unit)}
                        />
                        {unit}
                      </label>
                    ))}
                  </div>

                  {reminderForm.bidangTerpilih.length === 0 && (
                    <p className="warning-text" style={{ color: "#dc2626", marginTop: "10px" }}>⚠️ Tidak ada unit yang dipilih</p>
                  )}
                </div>

                <div className="form-section">
                  <h3>Pesan Reminder</h3>
                  <div className="form-group">
                    <textarea
                      value={reminderForm.pesan}
                      onChange={(e) => setReminderForm({ ...reminderForm, pesan: e.target.value })}
                      rows="6"
                      placeholder="Tulis pesan reminder..."
                      required
                      style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>
                  Batal
                </button>
                <button type="submit" className="btn-primary">
                  Kirim Reminder
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}