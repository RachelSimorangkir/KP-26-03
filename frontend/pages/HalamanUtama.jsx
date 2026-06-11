import { useNavigate } from "react-router-dom";
import "./HalamanUtama.css";

export default function HalamanUtama() {
  const navigate = useNavigate();

  return (
    <div className="home-page">

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="logo-section">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Logo_Kementerian_Agama.svg/512px-Logo_Kementerian_Agama.svg.png"
            alt="logo"
          />

          <h2>Portal Layanan Internal</h2>
        </div>

        <div className="menu">
          <a href="/">Beranda</a>
          <a href="/">Kontak</a>

          <button className="login-btn">
            Login Admin
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-content">

          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Logo_Kementerian_Agama.svg/512px-Logo_Kementerian_Agama.svg.png"
            alt="logo"
          />

          <h1>PORTAL LAYANAN INTERNAL</h1>

          <p>
            Sistem Informasi Terintegrasi
            Kementerian Agama Republik Indonesia
          </p>

          <span>
            Pilih bidang layanan yang ingin diakses
          </span>

        </div>
      </section>

      {/* MENU */}
      <section className="services">

        <h2>Pilih Menu Layanan</h2>

        <div className="service-grid">

          {/* KEPEGAWAIAN */}
          <div
            className="service-card"
            onClick={() => navigate("/kepegawaian")}
          >
            <div className="service-icon"></div>

            <h3>Kepegawaian & SDM</h3>

            <p>
              Layanan Rekomendasi,
              Cuti Pegawai,
              dan SKBT.
            </p>
          </div>

          {/* BMN */}
          <div
            className="service-card"
            onClick={() => navigate("/bmn")}
          >
            <div className="service-icon"></div>

            <h3>Barang Milik Negara</h3>

            <p>
              Inventaris Barang,
              Peminjaman,
              dan Pengelolaan Aset.
            </p>
          </div>

          {/* HUMAS */}
          <div
            className="service-card"
            onClick={() => navigate("/humas-data")}
          >
            <div className="service-icon"></div>

            <h3>Humas & Data</h3>

            <p>
              Publikasi,
              Dokumentasi,
              dan Statistik Data.
            </p>
          </div>

        </div>

      </section>

      <footer className="footer">
        <h3>Portal Layanan Internal</h3>

        <p>Kementerian Agama Republik Indonesia</p>

        <p>Sistem Informasi Terintegrasi</p>
      </footer>

    </div>
  );
}