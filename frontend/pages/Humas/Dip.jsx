import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dip.css";

export default function Dip() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [uploadFile, setUploadFile] = useState(null);
  const [catatan, setCatatan] = useState("");

  // Mock Data (Nanti diganti dengan API)
  const currentStatus = {
    status: "menunggu_validasi", // belum_upload, menunggu_validasi, revisi, selesai
    fileTerakhir: "DIP_Humas_2026_Semester2.pdf",
    tanggalUpload: "15 Juli 2026, 14:30",
    divalidasiOleh: "Admin PPID - Budi Santoso",
    isTerlambat: false,
  };

  const deadlineInfo = {
    tanggal: "31 Agustus 2026",
    sisaHari: 38,
  };

  const riwayatUpload = [
    { versi: 2, tanggal: "15 Juli 2026", file: "DIP_Humas_2026_v2.pdf", status: "Menunggu Validasi" },
    { versi: 1, tanggal: "01 Juli 2026", file: "DIP_Humas_2026_v1.pdf", status: "Revisi" },
  ];

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Ukuran file maksimal 5MB!");
        return;
      }
      setUploadFile(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!uploadFile) {
      alert("Pilih file terlebih dahulu!");
      return;
    }
    alert("File berhasil diupload! (Simulasi)");
    setUploadFile(null);
    setCatatan("");
    setActiveTab("dashboard");
  };

  const getStatusBadge = (status) => {
    const styles = {
      belum_upload: "badge-gray",
      menunggu_validasi: "badge-yellow",
      revisi: "badge-orange",
      selesai: "badge-green",
    };
    const labels = {
      belum_upload: "Belum Upload",
      menunggu_validasi: "Menunggu Validasi",
      revisi: "Revisi",
      selesai: "Selesai",
    };
    return <span className={`status-badge ${styles[status]}`}>{labels[status]}</span>;
  };

  return (
    <div className="rekom-page dip-page">
      {/* BANNER */}
      <section className="service-banner">
        <div className="service-banner-content">
          <h1>Daftar Informasi Publik (DIP)</h1>
          <p>Kelola dan upload dokumen DIP Bidang Anda sesuai periode yang ditentukan.</p>
        </div>
      </section>

      {/* TAB NAVIGATION */}
      <div className="dip-tabs">
        <button className={`tab-btn ${activeTab === "dashboard" ? "active" : ""}`} onClick={() => setActiveTab("dashboard")}>
          📊 Dashboard Status
        </button>
        <button className={`tab-btn ${activeTab === "upload" ? "active" : ""}`} onClick={() => setActiveTab("upload")}>
           Upload Dokumen
        </button>
        <button className={`tab-btn ${activeTab === "riwayat" ? "active" : ""}`} onClick={() => setActiveTab("riwayat")}>
          📜 Riwayat
        </button>
      </div>

      {/* TAB CONTENT */}
      <div className="tab-content">
        
        {/* === TAB 1: DASHBOARD === */}
        {activeTab === "dashboard" && (
          <div className="dip-section">
            <div className="info-grid">
              <div className="info-card status-card">
                <h4>Status DIP Saat Ini</h4>
                <div className="status-display">
                  {getStatusBadge(currentStatus.status)}
                </div>
                <p className="info-detail">File: {currentStatus.fileTerakhir}</p>
                <p className="info-detail">Upload: {currentStatus.tanggalUpload}</p>
              </div>

              <div className="info-card deadline-card">
                <h4>Deadline Periode Ini</h4>
                <div className="deadline-display">
                  <span className="big-number">{deadlineInfo.sisaHari}</span>
                  <span className="day-text">Hari Lagi</span>
                </div>
                <p className="info-detail">Jatuh tempo: {deadlineInfo.tanggal}</p>
              </div>
            </div>

            {currentStatus.status === "revisi" && (
              <div className="catatan-revisi-card">
                <h4>📝 Catatan Revisi dari Admin</h4>
                <p>"Format tabel pada halaman 3 tidak sesuai template. Mohon gunakan template v2 terbaru."</p>
                <small>- Admin PPID, 10 Juli 2026</small>
              </div>
            )}
          </div>
        )}

        {/* === TAB 2: UPLOAD === */}
        {activeTab === "upload" && (
          <div className="dip-section upload-section">
            <h3>Upload Dokumen DIP</h3>
            <form onSubmit={handleSubmit} className="upload-form">
              <div className="form-group">
                <label>Pilih File DIP *</label>
                <div className="file-drop-zone">
                  <input type="file" onChange={handleFileChange} accept=".pdf,.doc,.docx,.xlsx" id="file-input" hidden />
                  <label htmlFor="file-input" className="upload-label">
                    {uploadFile ? (
                      <div className="file-preview">
                        <div className="file-details">
                          <p className="file-name">{uploadFile.name}</p>
                          <p className="file-size">{(uploadFile.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                        <button type="button" className="btn-remove" onClick={() => setUploadFile(null)}>✕</button>
                      </div>
                    ) : (
                      <div className="upload-placeholder">
                        <span className="upload-icon">☁️</span>
                        <p>Klik untuk memilih file</p>
                        <small>Format: PDF, DOC, DOCX, XLSX (Maks. 5MB)</small>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label>Catatan Pengirim (Opsional)</label>
                <textarea 
                  value={catatan} 
                  onChange={(e) => setCatatan(e.target.value)} 
                  placeholder="Tulis catatan untuk admin (misal: penjelasan revisi)..."
                  rows="3"
                ></textarea>
              </div>

              <div className="form-actions">
                <button type="button" className="btn-secondary" onClick={() => setActiveTab("dashboard")}>Batal</button>
                <button type="submit" className="btn-primary" disabled={!uploadFile}>📤 Kirim Dokumen</button>
              </div>
            </form>
          </div>
        )}

        {/* === TAB 3: RIWAYAT === */}
        {activeTab === "riwayat" && (
          <div className="dip-section">
            <h3>Riwayat Upload & Versi</h3>
            <div className="timeline">
              {riwayatUpload.map((item) => (
                <div key={item.versi} className="timeline-item">
                  <div className="timeline-marker"></div>
                  <div className="timeline-content">
                    <div className="timeline-header">
                      <h4>Versi {item.versi} - {item.file}</h4>
                      {getStatusBadge(item.status.toLowerCase().replace(" ", "_"))}
                    </div>
                    <p className="timeline-date">{item.tanggal}</p>
                    <button className="btn-download">️ Download File</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}