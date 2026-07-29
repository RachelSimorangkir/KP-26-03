import { useState, useEffect } from "react";
import axios from "axios";
import { FaChartBar } from 'react-icons/fa'
import "./HumasAdmin.css"; 

export default function AdminHumas() {

  const [jumlahBerita, setJumlahBerita] = useState(0);

  const metrics = {
  beritaMenunggu: jumlahBerita,
  permintaanData: 3,
  tiketKritis: 3,
  keberatanPPID: 2,
};

  const loadJumlahBerita = async () => {
  try {
    const res = await axios.get(
      "http://localhost:8080/api/berita/count/menunggu"
    );

    setJumlahBerita(res.data.jumlah);
  } catch (err) {
    console.error("Gagal mengambil jumlah berita:", err);
  }
};

useEffect(() => {
  loadJumlahBerita();
}, []);


  const tiketPerStatus = [
    { status: "Baru", jumlah: 4, color: "baru" },
    { status: "Diproses", jumlah: 6, color: "diproses" },
    { status: "Selesai (7 hari)", jumlah: 21, color: "selesai" },
  ];

  const uploadDIP = {
    total: 9,
    sudahUpload: 6,
    belumUpload: ["Data", "Ortala Kepegawaian", "BMN"],
  };

  const aktivitasTerbaru = [
    { id: 1, tipe: "berita", icon: "📰", judul: 'Berita "Pembinaan Rohaniwan Kab. Sleman" menunggu verifikasi', waktu: "10 menit lalu" },
    { id: 2, tipe: "tiket", icon: "️", judul: "Tiket #SI-2026-0042 (Kritis) belum ditugaskan", waktu: "25 menit lalu" },
    { id: 3, tipe: "ppid", icon: "⚖️", judul: "Keberatan PPID #PPID-2026-0009 mendekati batas waktu 30 hari", waktu: "1 jam lalu" },
    { id: 4, tipe: "data", icon: "📊", judul: "Permintaan data dari Bidang Pendidikan menunggu diproses", waktu: "2 jam lalu" },
    { id: 5, tipe: "berita", icon: "📰", judul: 'Berita "Rapat Koordinasi" telah diterbitkan', waktu: "3 jam lalu" },
  ];

  const formatDate = () => {
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
    return new Date().toLocaleDateString("id-ID", options);
  };

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
            <span className="metric-label">Tiket kritis</span>
            <span className="metric-value">{metrics.tiketKritis}</span>
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
                  <div className={`status-bar ${item.color}`} style={{ width: `${(item.jumlah / 31) * 100}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="panel">
          <h3 className="panel-title">Upload DIP tahunan 2026</h3>
          <div className="dip-progress">
            <div className="progress-bar-container">
              <div className="progress-bar" style={{ width: `${(uploadDIP.sudahUpload / uploadDIP.total) * 100}%` }}></div>
            </div>
            <div className="progress-info">
              <span className="progress-text">{uploadDIP.sudahUpload}/{uploadDIP.total} bidang</span>
            </div>
            {uploadDIP.belumUpload.length > 0 && (
              <div className="belum-upload-list">
                <div className="warning-icon">⚠️</div>
                <div className="belum-upload-text">
                  {uploadDIP.belumUpload.join(", ")}
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
              <span className="aktivitas-waktu">{aktivitas.waktu}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}