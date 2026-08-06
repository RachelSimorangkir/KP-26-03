import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Dip.css";

export default function Dip() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  
  // ✅ TAHAP 2: State baru (Mock data dihapus)
  const [uploadFile, setUploadFile] = useState(null);
  const [catatan, setCatatan] = useState("");
  const [currentStatus, setCurrentStatus] = useState(null);
  const [riwayatUpload, setRiwayatUpload] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ TAHAP 3: Ambil data dari backend
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
    if (!currentUser || !currentUser.nip) return;

    axios
      .get(`http://localhost:8080/api/dip/user/${currentUser.nip}`)
      .then((res) => {
        const data = res.data.data || [];
        setRiwayatUpload(data);
        if (data.length > 0) {
          setCurrentStatus(data[0]); // Asumsi index 0 adalah upload terbaru
          setActiveTab("dashboard");
        } else {
          setCurrentStatus({ status: "belum_upload" });
          setActiveTab("dashboard");
        }
      })
      .catch((err) => {
        console.error("Gagal memuat data DIP:", err);
        setCurrentStatus({ status: "belum_upload" });
        setActiveTab("dashboard");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

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

  // ✅ TAHAP 4: Upload file ke backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!uploadFile) {
      alert("Pilih file terlebih dahulu!");
      return;
    }

    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
    console.log(currentUser);
    const formData = new FormData();

    formData.append("nip_pengaju", currentUser.nip);
    formData.append("nama_pengaju", currentUser.nama);
    formData.append("unit_pengaju", currentUser.unit_organisasi);
    formData.append("tahun", new Date().getFullYear());
    formData.append("catatan_pengirim", catatan);
    formData.append("file", uploadFile);

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:8080/api/dip",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.status) {
        alert("File berhasil diupload!");
        setUploadFile(null);
        setCatatan("");
        setActiveTab("dashboard");
        
        // Refresh data setelah upload sukses
        const res = await axios.get(`http://localhost:8080/api/dip/user/${currentUser.nip}`);
        const data = res.data.data || [];
        setRiwayatUpload(data);
        if (data.length > 0) setCurrentStatus(data[0]);
        setActiveTab("dashboard");
      } else {
        alert(response.data.message || "Gagal mengupload file.");
      }
    } catch(err){

console.log(err);alert(err.response?.data?.message ||"Gagal upload.");

}
  };

  const getStatusBadge = (status) => {

  const normalizedStatus = (status || "belum_upload")
    .toLowerCase()
    .replace(/\s+/g, "_");

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

  return (
    <span className={`status-badge ${styles[normalizedStatus] || "badge-gray"}`}>
      {labels[normalizedStatus] || status}
    </span>
  );
};

  // Helper untuk format tanggal agar konsisten
  const formatTanggal = (dateStr) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
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
                  {/* ✅ TAHAP 5: Gunakan optional chaining */}
                  {getStatusBadge(currentStatus?.status)}
                </div>
                {/* ✅ TAHAP 6 & 7: Ganti field ke nama_file dan created_at */}
                <p className="info-detail">File: {currentStatus?.nama_file || "-"}</p>
                <p className="info-detail">Upload: {formatTanggal(currentStatus?.created_at)}</p>
                <p>Nomor Upload:<strong>{currentStatus?.nomor_upload}</strong></p>
              </div>
            </div>

            {/* ✅ Menampilkan catatan revisi dari backend jika ada */}
            {currentStatus?.status === "revisi" && currentStatus?.catatan_admin && (
              <div className="catatan-revisi-card">
                <h4>📝 Catatan Revisi dari Admin</h4>
                <p>"{currentStatus.catatan_admin}"</p>
                <small>- Admin PPID, {formatTanggal(currentStatus.updated_at || currentStatus.created_at)}</small>
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
                <button type="button" className="btn-secondary" onClick={() => setActiveTab("dashboard")} disabled={loading}>Batal</button>
                <button type="submit" className="btn-primary" disabled={!uploadFile ||loading ||currentStatus?.status === "menunggu_validasi"}>
                  {loading ? "Mengirim..." : "📤 Kirim Dokumen"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* === TAB 3: RIWAYAT === */}
        {activeTab === "riwayat" && (
          <div className="dip-section">
            <h3>Riwayat Upload & Versi</h3>
            <div className="timeline">
              {/* ✅ TAHAP 8: Sesuaikan field dengan data dari API */}
              {riwayatUpload.length === 0 ? (
                <p style={{ color: "#64748b", textAlign: "center", padding: "2rem" }}>Belum ada riwayat upload.</p>
              ) : (
                riwayatUpload.map((item, index) => (
                  <div key={item.id || index} className="timeline-item">
                    <div className="timeline-marker"></div>
                    <div className="timeline-content">
                      <div className="timeline-header">
                        {/* Menggunakan nomor_upload atau fallback ke index/versi */}
                        <h4>{item.nomor_upload}</h4><p>{item.nama_file}</p>
                        {getStatusBadge(item.status)}
                      </div>
                      <p className="timeline-date">{formatTanggal(item.created_at)}</p>
                      <a 
                        href={`http://localhost:8080/${item.file_path}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn-download"
                        style={{ textDecoration: "none", display: "inline-block", marginTop: "8px" }}
                      >
                        ⬇️ Download File
                      </a>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}