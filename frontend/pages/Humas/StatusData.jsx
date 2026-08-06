import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./StatusData.css";

export default function StatusData() {
  const navigate = useNavigate();
  const API_URL = "http://localhost:8080/api/data-internal";

  const [permintaanList, setPermintaanList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ REVISI 6: Ekstrak logika fetch ke fungsi terpisah agar bisa dipanggil ulang tanpa reload halaman
  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const user = JSON.parse(localStorage.getItem("currentUser") || "{}");
      const nip = user.nip;

      if (!nip) {
        setError("Data pengguna tidak ditemukan. Silakan login kembali.");
        return;
      }

      const response = await axios.get(`${API_URL}/user/${nip}`);

      if (response.data.status) {
        setPermintaanList(response.data.data || []);
      } else {
        setError(response.data.message || "Gagal memuat data.");
      }
    } catch (err) {
      console.error("Error fetching status data:", err);
      setError("Terjadi kesalahan saat menghubungkan ke server.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ REVISI 1: Dependency array kosong [] karena API_URL adalah konstanta
  useEffect(() => {
    fetchData();
  }, []);

  // ✅ REVISI 2: Format judul lebih informatif dengan menyertakan periode
  const formatJudul = (item) => {
    if (!item.jenis_data) return "Permintaan Data Internal";
    
    const jenis = item.jenis_data.replace(/,/g, ", ");
    let periodeText = "";
    
    if (item.periode_dari && item.periode_sampai) {
      periodeText = ` (Periode: ${formatDate(item.periode_dari)} s/d ${formatDate(item.periode_sampai)})`;
    }
    
    return `Permintaan Data ${jenis}${periodeText}`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("id-ID", { 
      day: "numeric", 
      month: "long", 
      year: "numeric" 
    });
  };

  const getStatusClass = (status) => {
    if (!status) return "badge-menunggu";
    const s = status.toLowerCase();
    switch (s) {
      case "menunggu": return "badge-menunggu";
      case "diproses": return "badge-diproses";
      case "selesai": return "badge-selesai";
      case "ditolak": return "badge-ditolak";
      default: return "badge-menunggu";
    }
  };

  // ✅ REVISI 4: Handler download yang lebih aman untuk berbagai format path di database
const handleDownload = (id) => {
  window.open(
    `http://localhost:8080/api/data-internal/download/${id}`,
    "_blank"
  );
};

  return (
    <div className="rekom-page status-data-page">
      {/* BACK BUTTON */}
      <button className="btn-back" onClick={() => navigate("/humasdata/PermintaanData")}>
        ← Kembali ke Layanan Permintaan Data
      </button>

      {/* BANNER */}
      <section className="service-banner">
        <div className="service-banner-content">
          <h1>Status Permintaan Data Saya</h1>
          <p>Pantau progres dan hasil permintaan data internal Anda secara real-time di sini.</p>
        </div>
      </section>

      {/* ACTION HEADER */}
      <div className="action-header">
        <h2>Riwayat Permintaan</h2>
        <button className="btn-primary" onClick={() => navigate("/humasdata/PermintaanData/DataInternal")}>
          + Ajukan Permintaan Data Baru
        </button>
      </div>

      {/* LOADING STATE */}
      {loading && (
        <section className="empty-state-card">
          <div className="empty-icon">⏳</div>
          <h3>Memuat Data...</h3>
          <p>Mohon tunggu sebentar, sedang mengambil riwayat permintaan Anda.</p>
        </section>
      )}

      {/* ERROR STATE */}
      {!loading && error && (
        <section className="empty-state-card">
          <div className="empty-icon">⚠️</div>
          <h3>Gagal Memuat Data</h3>
          <p>{error}</p>
          {/* ✅ REVISI 6: Memanggil fetchData() alih-alih window.location.reload() */}
          <button className="btn-primary" onClick={fetchData} style={{ marginTop: "1rem" }}>
            Coba Lagi
          </button>
        </section>
      )}

      {/* EMPTY STATE (Data Kosong) */}
      {!loading && !error && permintaanList.length === 0 && (
        <section className="empty-state-card">
          <div className="empty-icon">📭</div>
          <h3>Belum Ada Permintaan Data</h3>
          <p>Anda belum membuat permintaan data. Klik tombol di atas untuk memulai.</p>
        </section>
      )}

      {/* DAFTAR PERMINTAAN */}
      {!loading && !error && permintaanList.length > 0 && (
        <div className="permintaan-list">
          {permintaanList.map((item) => (
            <div key={item.id} className="permintaan-card">
              
              {/* 1. Card Header: Judul & Meta */}
              <div className="card-header">
                <h3 className="card-title">{formatJudul(item)}</h3>
                <div className="card-meta">
                  <span className="meta-item">
                    <span className="meta-label">Diajukan:</span> 
                    {/* ✅ REVISI 3: Fallback ke created_at jika submitted_at kosong */}
                    {formatDate(item.submitted_at || item.created_at)}
                  </span>
                </div>
              </div>

              {/* 2. Card Body: Status & Info */}
              <div className="card-body">
                <div className="status-grid">
                  <div className="status-box" style={{ width: "100%" }}>
                    <span className="status-label">Status Permintaan</span>
                    <span className={`badge ${getStatusClass(item.status)}`}>
                      {item.status ? item.status.charAt(0).toUpperCase() + item.status.slice(1) : "Menunggu"}
                    </span>
                  </div>
                </div>

                {/* File Hasil (Muncul jika status selesai DAN ada response_file) */}
                {item.status === "selesai" && item.response_file && (
                  <div className="file-result-box">
                    <div className="file-icon-large">📄</div>
                    <div className="file-details">
                      {/* Mengambil nama file saja dari path untuk tampilan yang lebih bersih */}
                      <span className="file-name">
                        {item.response_file? item.response_file.split("/").pop(): "-"|| "Belum ada file balasan"}
                      </span>
                      <span className="file-size">Dokumen Balasan</span>
                    </div>
                    <button 
                      className="btn-download" 
                      onClick={() => handleDownload(item.id)}
                    >
                      ⬇️ Unduh
                    </button>
                  </div>
                )}

                {/* ✅ REVISI 5: Menggunakan catatan_admin (sesuai dengan payload di DataInternalController.php) */}
                {item.catatan_admin && (
                  <div className={`catatan-box ${item.status === "ditolak" ? "catatan-danger" : "catatan-info"}`}>
                    <div className="catatan-header">
                      <span className="catatan-icon">📝</span>
                      <strong>Catatan dari Pengolah</strong>
                    </div>
                    <p>{item.catatan_admin}</p>
                  </div>
                )}
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}