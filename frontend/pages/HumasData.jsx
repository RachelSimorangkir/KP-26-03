import { useState } from "react";
import { Link } from "react-router-dom";
import "./HumasData.css";

// Data Layanan dari Dokumen
const menuItems = [
      {
    id: "humas",
    title: "Layanan Humas",
    icon: "📢",
    services: [
          { title: "Publikasi Berita Kegiatan", desc: "Publikasi berita kegiatan dari Kantor Wilayah, Kabupaten/Kota, PTKK dan SPKK.", path: "/humas/publikasi" },
          { title: "Daftar & Status Pengajuan Saya", desc: "Lihat status dan riwayat pengajuan publikasi Anda.", path: "/humas/my-submissions" },
    ]
  },
  {
    id: "data",
    title: "Layanan Data",
    icon: "📊",
    services: [
      { title: "Penyediaan Data & Informasi", desc: "Penyediaan data dan informasi Bimas Kristen sesuai kebutuhan pemangku kepentingan.", path: "/humas/data-request" },
      { title: "Daftar & Status Pengajuan Saya", desc: "Lihat status dan riwayat pengajuan publikasi Anda.", path: "/humas/my-submissions" },
    ]
  },
  {
    id: "sistem",
    title: "Sistem Informasi",
    icon: "🖥️",
    services: [
      { title: "Helpdesk & Pendampingan", desc: "Layanan bantuan teknis (helpdesk) dan pendampingan penggunaan aplikasi.", path: "/helpdesk" },
      { title: "Daftar & Status Pengajuan Saya", desc: "Lihat status dan riwayat pengajuan publikasi Anda.", path: "/humas/my-submissions" },
    ]
  },
  {
    id: "ppid",
    title: "Layanan PPID",
    icon: "📝",
    services: [
      { title: "Upload DIP Tahunan", desc: "Unggah Dokumen Daftar Informasi Publik (DIP) per bidang.", path: "/ppid/dip/upload" },
      { title: "Daftar & Status Pengajuan Saya", desc: "Lihat status dan riwayat pengajuan publikasi Anda.", path: "/humas/my-submissions" },
    ]
  }
];

export default function HumasData() {
  const [activeMenu, setActiveMenu] = useState("humas");

  // Cari data menu yang aktif
  const activeData = menuItems.find(item => item.id === activeMenu);

  return (
    <div className="humas-data-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h3>Menu Layanan</h3>
        </div>
        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={activeMenu === item.id ? "nav-item active" : "nav-item"}
              onClick={() => setActiveMenu(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-text">{item.title}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="page-title">
          <h1>Humas & Data</h1>
          <p className="page-subtitle">Pilih layanan di sidebar untuk melihat fitur terkait</p>
        </header>
        <div className="content-header">
          <div className="breadcrumb">
            <span>Home</span>
            <span>/</span>
            <span>Humas & Data</span>
            <span>/</span>
            <span className="active">{activeData?.title}</span>
          </div>
          <div className="current-time">
            {new Date().toLocaleString("id-ID", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit"
            })}
          </div>
        </div>

        <div className="content-body">
          <div className="section-title">
            <span className="section-icon">{activeData?.icon}</span>
            <h2>{activeData?.title}</h2>
          </div>

          <div className="services-grid wide">
            {activeData?.services.map((service, index) => (
              <div key={index} className="service-card wide-card">
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
                <Link to={service.path || "/humas/publikasi"} className="btn-primary">
                  Akses Layanan
                </Link>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
