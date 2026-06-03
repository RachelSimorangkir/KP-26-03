import "./App.css";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import KenaikanPangkat from "../pages/KenaikanPangkat";

const services = [
  { name: "Kenaikan Pangkat", icon: "📈" },
  { name: "Tugas Belajar", icon: "🎓" },
  { name: "Pencantuman Gelar Akademik", icon: "📜" },
  { name: "Pensiun", icon: "⏳" },
  { name: "Satya Lencana", icon: "🏅" },
  { name: "Perubahan Jabatan Pelaksana", icon: "👔" },
  { name: "Daftar Pelantikan", icon: "🏆" },
  { name: "Peninjauan Masa Kerja (PMK)", icon: "⌛" },
  { name: "Usul Ujikom JF", icon: "📋" },
  { name: "Mutasi Dalam Internal Kemenag", icon: "🔄" },
  { name: "Mutasi Antar Instansi", icon: "🔁" },
  { name: "Pengajuan Cuti Pegawai", icon: "🏖️" },
];

function Home() {
  const navigate = useNavigate();

  const handleClick = (serviceName) => {
    if (serviceName === "Kenaikan Pangkat") {
      navigate("/kenaikan-pangkat");
    }
  };

  return (
    <div className="app">

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="logo-section">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Logo_Kementerian_Agama.svg/512px-Logo_Kementerian_Agama.svg.png"
            alt="logo"
          />

          <h2>Layanan Kepegawaian</h2>
        </div>

        <div className="menu">
          <a href="/">Beranda</a>
          <a href="/">Kontak</a>

          <button className="login-btn">
            🔐 Login Admin
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero-banner">
        <div className="hero-logo">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Logo_Kementerian_Agama.svg/512px-Logo_Kementerian_Agama.svg.png"
            alt="logo"
          />
        </div>

        <div className="hero-text">
          <h1>LAYANAN KEPEGAWAIAN</h1>
          <h2>BMBPSDM</h2>
          <p>KEMENTERIAN AGAMA RI</p>
        </div>
      </section>

      {/* SERVICES */}
      <section className="services">
        <h2>Pilih Layanan Kepegawaian</h2>

        <div className="grid">
          {services.map((item, index) => (
            <div
              className="card"
              key={index}
              onClick={() => handleClick(item.name)}
              style={{ cursor: "pointer" }}
            >
              <div className="icon">{item.icon}</div>
              <h3>{item.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <h2>Ada pertanyaan?</h2>

        <p>
          Informasi selengkapnya hubungi PIC Layanan Kepegawaian
        </p>

        <h3>Sudirman Abdullah, S.Pd., M.Pd</h3>

        <button className="wa-btn">
          Ada kendala pada web? Laporkan via WhatsApp
        </button>

        <p className="address">
          Gedung Kementerian Agama Lantai 18,
          Jalan M.H. Thamrin No.6 Jakarta Pusat
        </p>
      </footer>

    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route
          path="/kenaikan-pangkat"
          element={<KenaikanPangkat />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;