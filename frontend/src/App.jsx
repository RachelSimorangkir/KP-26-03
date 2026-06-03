import "./App.css";

const services = [
  "Kenaikan Pangkat",
  "Tugas Belajar",
  "Pencantuman Gelar Akademik",
  "Pensiun",
  "Satya Lencana",
  "Perubahan Jabatan Pelaksana",
  "Daftar Pelantikan",
  "Peninjauan Masa Kerja (PMK)",
  "Usul Ujikom JF",
  "Mutasi Dalam Internal Kemenag",
  "Mutasi Antar Instansi",
  "Pengajuan Cuti Pegawai",
];

function App() {
  return (
    <div className="app">
      <nav className="navbar">
        <div className="logo-section">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Logo_Kementerian_Agama.svg/512px-Logo_Kementerian_Agama.svg.png"
            alt=""
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

      <section className="hero">
        <div className="hero-left">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Logo_Kementerian_Agama.svg/512px-Logo_Kementerian_Agama.svg.png"
            alt=""
          />
        </div>

        <div className="hero-right">
          <h1>LAYANAN KEPEGAWAIAN</h1>
          <h2>BMBPSDM</h2>
          <p>Kementerian Agama RI</p>
        </div>
      </section>

      <section className="services">
        <h2>Pilih Layanan Kepegawaian</h2>

        <div className="grid">
          {services.map((item, index) => (
            <div className="card" key={index}>
              <div className="icon">📄</div>
              <h3>{item}</h3>
            </div>
          ))}
        </div>
      </section>

      <footer>
        <h2>Ada pertanyaan?</h2>

        <p>
          Informasi selengkapnya hubungi PIC Layanan Kepegawaian
        </p>

        <h3>Sudirman Abdullah, S.Pd., M.Pd</h3>

        <button className="wa-btn">
          Laporkan Kendala via WhatsApp
        </button>

        <p className="address">
          Gedung Kementerian Agama Lantai 18,
          Jalan M.H. Thamrin No.6 Jakarta Pusat
        </p>
      </footer>
    </div>
  );
}

export default App;