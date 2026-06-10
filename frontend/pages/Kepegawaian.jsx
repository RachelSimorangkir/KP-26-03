import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "./Kepegawaian.css";

function Kepegawaian() {
  const [collapsed, setCollapsed] = useState(false);

  const menus = [
    {
      icon: "📈",
      title: "Kenaikan Pangkat",
      path: "/kepegawaian/kenaikan-pangkat",
    },
    {
      icon: "🎓",
      title: "Tugas Belajar",
      path: "/kepegawaian/tugas-belajar",
    },
    {
      icon: "📜",
      title: "Gelar Akademik",
      path: "/kepegawaian/gelar-akademik",
    },
    {
      icon: "⏳",
      title: "Pensiun",
      path: "/kepegawaian/pensiun",
    },
    {
      icon: "🏅",
      title: "Satya Lencana",
      path: "/kepegawaian/satya-lencana",
    },
    {
      icon: "👔",
      title: "Perubahan Jabatan",
      path: "/kepegawaian/perubahan-jabatan",
    },
    {
      icon: "🏆",
      title: "Daftar Pelantikan",
      path: "/kepegawaian/daftar-pelantikan",
    },
    {
      icon: "⌛",
      title: "PMK",
      path: "/kepegawaian/pmk",
    },
    {
      icon: "📋",
      title: "Ujikom JF",
      path: "/kepegawaian/ujikom-jf",
    },
    {
      icon: "🔄",
      title: "Mutasi Internal",
      path: "/kepegawaian/mutasi-internal",
    },
    {
      icon: "🔁",
      title: "Mutasi Antar Instansi",
      path: "/kepegawaian/mutasi-antar-instansi",
    },
    {
      icon: "🏖️",
      title: "Cuti Pegawai",
      path: "/kepegawaian/cuti-pegawai",
    },
  ];

  return (
    <div className="dashboard">
      <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
        
        <div className="sidebar-header">
          {!collapsed && (
            <div className="logo-text">
              <h2>Portal</h2>
              <span>Layanan Internal</span>
            </div>
          )}

          <button
            className="toggle-btn"
            onClick={() => setCollapsed(!collapsed)}
          >
            ☰
          </button>
        </div>

        <div className="menu-title">
          {!collapsed && "MENU KEPEGAWAIAN"}
        </div>

        <nav className="menu-list">
          {menus.map((menu, index) => (
            <Link key={index} to={menu.path}>
              <span className="icon">{menu.icon}</span>

              {!collapsed && (
                <span className="text">
                  {menu.title}
                </span>
              )}
            </Link>
          ))}
        </nav>

      </aside>

      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}

export default Kepegawaian;