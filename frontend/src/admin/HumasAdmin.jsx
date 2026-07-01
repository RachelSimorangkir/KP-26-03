import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HumasAdmin.css";

export default function HumasAdmin() {
  const navigate = useNavigate();

  // Data untuk metric cards
  const metrics = {
    beritaMenunggu: 5,
    permintaanData: 3,
    tiketKritis: 3,
    keberatanPPID: 2,
  };

  // Data tiket helpdesk per status
  const tiketPerStatus = [
    { status: "Baru", jumlah: 4 },
    { status: "Diproses", jumlah: 6 },
    { status: "Selesai (7 hari)", jumlah: 21 },
  ];

  // Data upload DIP tahunan
  const uploadDIP = {
    total: 9,
    sudahUpload: 6,
    belumUpload: [
      "Data",
      "Ortala Kepegawaian",
      "BMN",
    ],
  };

  // Aktivitas terbaru (feed gabungan)
  const aktivitasTerbaru = [
    {
      id: 1,
      tipe: "berita",
      icon: "📰",
      judul: 'Berita "Pembinaan Rohaniwan Kab. Sleman" menunggu verifikasi',
      waktu: "10 menit lalu",
    },
    {
      id: 2,
      tipe: "tiket",
      icon: "🛠️",
      judul: "Tiket #SI-2026-0042 (Kritis) belum ditugaskan",
      waktu: "25 menit lalu",
    },
    {
      id: 3,
      tipe: "ppid",
      icon: "⚖️",
      judul: "Keberatan PPID #PPID-2026-0009 mendekati batas waktu 30 hari",
      waktu: "1 jam lalu",
    },
    {
      id: 4,
      tipe: "data",
      icon: "📊",
      judul: "Permintaan data dari Bidang Pendidikan menunggu diproses",
      waktu: "2 jam lalu",
    },
    {
      id: 5,
      tipe: "berita",
      icon: "📰",
      judul: 'Berita "Rapat Koordinasi" telah diterbitkan',
      waktu: "3 jam lalu",
    },
  ];

  // Data menu sidebar
  const menuItems = [
    {
      group: "Ringkasan",
      items: [
        { label: "Ringkasan", path: "/admin", active: true, icon: "📊" },
      ],
    },
    {
      group: "HUMAS",
      items: [
        { label: "Berita masuk", path: "/admin/berita-masuk", badge: 5, icon: "📥" },
        { label: "Berita terbit", path: "/admin/berita-terbit", icon: "📤" },
      ],
    },
    {
      group: "DATA",
      items: [
        { label: "Permintaan data", path: "/admin/permintaan-data", badge: 3, icon: "📋" },
        { label: "Upload DIP tahunan", path: "/admin/upload-dip", icon: "📁" },
      ],
    },
    {
      group: "SISTEM INFORMASI",
      items: [
        { label: "Tiket helpdesk", path: "/admin/tiket-helpdesk", badge: 8, icon: "🛠️" },
      ],
    },
    {
      group: "PPID",
      items: [
        { label: "Keberatan informasi", path: "/admin/keberatan-ppid", badge: 2, icon: "⚖️" },
      ],
    },
    {
      group: "LAINNYA",
      items: [
        { label: "Laporan & rekap", path: "/admin/laporan", icon: "📈" },
        { label: "Pengaturan", path: "/admin/pengaturan", icon: "⚙️" },
      ],
    },
  ];

  // Format tanggal Indonesia
  const formatDate = () => {
    const options = { 
      weekday: "long", 
      year: "numeric", 
      month: "long", 
      day: "numeric" 
    };
    return new Date().toLocaleDateString("id-ID", options);
  };

  return (
    <div className="dashboard-admin">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h1 className="portal-title">Bimas Kristen</h1>
          <p className="user-role">Admin terpusat</p>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((group, groupIdx) => (
            <div key={groupIdx} className="menu-group">
              <h3 className="menu-group-title">{group.group}</h3>
              {group.items.map((item, itemIdx) => (
                <button
                  key={itemIdx}
                  className={`menu-item ${item.active ? "active" : ""}`}
                  onClick={() => navigate(item.path)}
                >
                  <span className="menu-icon">{item.icon}</span>
                  <span className="menu-label">{item.label}</span>
                  {item.badge && (
                    <span className={`menu-badge ${item.badge > 5 ? "badge-urgent" : "badge-warning"}`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>
          ))}
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="main-content">
        {/* Header */}
        <header className="content-header">
          <div className="header-left">
            <h2 className="page-title">Ringkasan hari ini</h2>
            <p className="current-date">{formatDate()}</p>
          </div>
          <button className="header-menu-btn">⋮</button>
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
          {/* Tiket Helpdesk per Status */}
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
                    <div
                      className={`status-bar ${item.status.toLowerCase().replace(" ", "-")}`}
                      style={{ width: `${(item.jumlah / 31) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upload DIP Tahunan */}
          <div className="panel">
            <h3 className="panel-title">Upload DIP tahunan 2026</h3>
            <div className="dip-progress">
              <div className="progress-bar-container">
                <div
                  className="progress-bar"
                  style={{ width: `${(uploadDIP.sudahUpload / uploadDIP.total) * 100}%` }}
                ></div>
              </div>
              <div className="progress-info">
                <span className="progress-text">
                  {uploadDIP.sudahUpload}/{uploadDIP.total} bidang
                </span>
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
      </main>
    </div>
  );
}