import { useState, useEffect } from "react";
import axios from "axios";
import { FaChartBar } from 'react-icons/fa';
import "./HumasAdmin.css"; 

export default function AdminHumas() {

  // =========================================================
  // 1. STATE (Semua useState harus di bagian paling atas)
  // =========================================================
  const [jumlahBerita, setJumlahBerita] = useState(0);
  const [jumlahPermintaan, setJumlahPermintaan] = useState(0);
  const [jumlahKeberatan, setJumlahKeberatan] = useState(0);
  
  const [dashboard, setDashboard] = useState({
    baru: 0,
    diproses: 0,
    terlambat: 0,
    selesai_hari_ini: 0
  });

  const [uploadDIP, setUploadDIP] = useState({
    tahun: new Date().getFullYear(),
    total_bidang: 0,
    sudah_upload: 0,
    belum_upload: [],
  });

  const [aktivitasTerbaru, setAktivitasTerbaru] = useState([]);

  // =========================================================
  // 2. FUNGSI LOAD DATA
  // =========================================================
  const loadDashboardDIP = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/dip/dashboard");
      setUploadDIP(res.data.data);
    } catch (err) {
      console.error("Dashboard DIP gagal:", err);
    }
  };

  const loadJumlahBerita = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/berita/count/menunggu");
      setJumlahBerita(res.data.jumlah);
    } catch (err) {
      console.error("Gagal mengambil jumlah berita:", err);
    }
  };

  const loadJumlahPermintaan = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/data-internal/count/menunggu");
      setJumlahPermintaan(res.data.jumlah);
    } catch (err) {
      console.error("Gagal mengambil jumlah permintaan:", err);
    }
  };

  const loadJumlahKeberatan = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/ppid/count/baru");
      console.log("Jumlah Keberatan:", res.data);
      setJumlahKeberatan(res.data.jumlah);
    } catch (err) {
      console.error("Gagal mengambil jumlah keberatan:", err);
    }
  };

  const loadDashboard = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/helpdesk/dashboard");
      setDashboard(res.data.data);
    } catch (err) {
      console.error("Gagal mengambil dashboard helpdesk:", err);
    }
  };

  const loadAktivitasTerbaru = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/dashboard/aktivitas");
      console.log("DATA AKTIVITAS:", res.data);
      setAktivitasTerbaru(res.data.data);
    } catch (err) {
      console.error("Gagal mengambil aktivitas terbaru:", err);
    }
  };

  // =========================================================
  // 3. USEEFFECT
  // =========================================================
  useEffect(() => {
    loadJumlahBerita();
    loadJumlahPermintaan();
    loadDashboardDIP();
    loadJumlahKeberatan();
    loadDashboard();
    loadAktivitasTerbaru();
  }, []);

  useEffect(() => {
    console.log("aktivitasTerbaru =", aktivitasTerbaru);
  }, [aktivitasTerbaru]);

  // =========================================================
  // 4. VARIABEL TURUNAN (Derived State)
  // =========================================================
  const metrics = {
    beritaMenunggu: jumlahBerita,
    permintaanData: jumlahPermintaan,
    keberatanPPID: jumlahKeberatan,
  };

  const tiketPerStatus = [
    {
      status: "Baru",
      jumlah: dashboard.baru,
      color: "baru",
    },
    {
      status: "Diproses",
      jumlah: dashboard.diproses,
      color: "diproses",
    },
    {
      status: "Selesai Hari Ini",
      jumlah: dashboard.selesai_hari_ini,
      color: "selesai",
    },
  ];

  // ✅ REV 1: Hitung total tiket secara dinamis untuk progress bar
  const totalTiket = (dashboard.baru || 0) + (dashboard.diproses || 0) + (dashboard.selesai_hari_ini || 0);

  const persenUpload = uploadDIP.total_bidang > 0 
    ? (uploadDIP.sudah_upload / uploadDIP.total_bidang) * 100 
    : 0;

  // =========================================================
  // 5. FUNGSI HELPER
  // =========================================================
  const formatDate = () => {
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
    return new Date().toLocaleDateString("id-ID", options);
  };

  // ✅ REV 2: Tambahkan pengecekan null dan invalid date
  const formatRelativeTime = (dateString) => {
    if (!dateString) return "-";

    const now = new Date();
    const date = new Date(dateString);

    if (isNaN(date.getTime())) return "-";

    const diff = Math.floor((now - date) / 1000);

    if (diff < 60) return `${diff} detik lalu`;
    if (diff < 3600) return `${Math.floor(diff / 60)} menit lalu`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} jam lalu`;
    
    return `${Math.floor(diff / 86400)} hari lalu`;
  };

  // =========================================================
  // 6. RETURN (UI - Tidak ada perubahan desain)
  // =========================================================
  return (
    <>
      <header className="content-header">
        <div className="header-left">
          <h2 className="page-title">Ringkasan hari ini</h2>
          <p className="current-date">{formatDate()}</p>
        </div>
        <button className="header-menu-btn"></button>
      </header>

      {/* Metric Cards */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-content">
            <span className="metric-label">Berita menunggu</span>
            <span className="metric-value">{metrics.beritaMenunggu}</span>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-content">
            <span className="metric-label">Permintaan data</span>
            <span className="metric-value">{metrics.permintaanData}</span>
          </div>
        </div>
        <div className="metric-card metric-critical">
          <div className="metric-content">
            <span className="metric-label">SLA Terlambat</span>
            <span className="metric-value">{dashboard.terlambat}</span>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-content">
            <span className="metric-label">Keberatan PPID</span>
            <span className="metric-value">{metrics.keberatanPPID}</span>
          </div>
        </div>
      </div>

      {/* Progress Panels */}
      <div className="progress-panels">
        <div className="panel">
          <h3 className="panel-title">Tiket helpdesk per status</h3>
          <div className="status-list">
            {tiketPerStatus.map((item, idx) => (
              <div key={idx} className="status-item">
                <div className="status-info">
                  <span className="status-name">{item.status}</span>
                  <span className="status-count">{item.jumlah}</span>
                </div>
                <div className="status-bar-container">
                  {/* ✅ REV 1: Gunakan totalTiket dinamis, fallback ke 0% jika total 0 */}
                  <div 
                    className={`status-bar ${item.color}`} 
                    style={{ width: `${totalTiket > 0 ? (item.jumlah / totalTiket) * 100 : 0}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="panel">
          <h3 className="panel-title">Upload DIP tahunan {uploadDIP.tahun}</h3>
          <div className="dip-progress">
            <div className="progress-bar-container">
              <div className="progress-bar" style={{ width: `${persenUpload}%` }}></div>
            </div>
            <div className="progress-info">
              <span className="progress-text">{uploadDIP.sudah_upload}/{uploadDIP.total_bidang} bidang</span>
            </div>
            {uploadDIP.belum_upload.length > 0 && (
              <div className="belum-upload-list">
                <div className="warning-icon">⚠️</div>
                <div className="belum-upload-text">
                  {uploadDIP.belum_upload.join(", ")}
                  <span className="belum-upload-label"> belum upload</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Aktivitas Terbaru */}
      <div className="aktivitas-section">
        <h3 className="section-title">Aktivitas terbaru</h3>
        <div className="aktivitas-list">
          {aktivitasTerbaru.map((aktivitas) => (
            <div key={aktivitas.id} className={`aktivitas-item status-${aktivitas.tipe}`}>
              <div className="aktivitas-icon">{aktivitas.icon}</div>
              <div className="aktivitas-content">
                <p className="aktivitas-text">{aktivitas.judul}</p>
              </div>
              <span className="aktivitas-waktu">{formatRelativeTime(aktivitas.waktu)}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}