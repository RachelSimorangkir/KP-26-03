import { useState } from "react";
import "./App.css";
import BMN from "./pages/user/bmn/BMNUser.jsx";
import BMNAdmin from "./pages/admin/BMNAdmin.jsx";

const cards = [
  {
    title: "Kepegawaian & SDM",
    description: "Kenaikan Pangkat, Mutasi, Cuti, Pensiun, dan Pengembangan SDM.",
    icon: "👥",
  },
  {
    title: "Barang Milik Negara",
    description: "Inventaris Barang, Peminjaman, Mutasi, dan Pengelolaan Aset.",
    icon: "📦",
    action: "bmn",
  },
  {
    title: "Humas & Data",
    description: "Berita, Publikasi, Statistik, Dokumentasi dan Pelaporan Data.",
    icon: "📊",
  },
];

function App() {
  const [page, setPage] = useState("home");

  if (page === "admin") {
    return (
      <div className="app">
        <BMNAdmin />
      </div>
    );
  }

  if (page === "bmn") {
    return (
      <div className="app">
        <BMN />
      </div>
    );
  }

  return (
    <div className="app">
      <nav className="navbar">
        <div className="logo-section">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Logo_Kementerian_Agama.svg/512px-Logo_Kementerian_Agama.svg.png"
            alt="Logo"
          />
          <h2>Portal Layanan Internal</h2>
        </div>

        <div className="menu">
          <a href="#">Beranda</a>
          <a href="#">Kontak</a>
          <button className="login-btn" onClick={() => setPage("admin")}>🔐 Login Admin</button>
        </div>
      </nav>

      <section className="hero hero-home">
        <div className="hero-left">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Logo_Kementerian_Agama.svg/512px-Logo_Kementerian_Agama.svg.png"
            alt="Logo"
          />
        </div>

        <div className="hero-right">
          <h1>PORTAL LAYANAN INTERNAL</h1>
          <p className="hero-subtitle">Sistem Informasi Terintegrasi Kementerian Agama Republik Indonesia</p>
          <p className="hero-description">Pilih bidang layanan yang ingin diakses</p>
        </div>
      </section>

      <section className="services home-services">
        <h2>Pilih Menu Layanan</h2>

        <div className="grid home-grid">
          {cards.map((card, index) => (
            <button
              type="button"
              className="card"
              key={index}
              onClick={card.action ? () => setPage(card.action) : undefined}
              disabled={!card.action}
              aria-label={card.action ? `Buka ${card.title}` : card.title}
            >
              <div className="icon">{card.icon}</div>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;
