import { useNavigate } from "react-router-dom";
import "./Rekomendasi.css";

export default function Rekomendasi() {
  const navigate = useNavigate();

  const layanan = [
    {
      icon: "🔄",
      title: "Pengaktifan Kembali",
      desc: "Pengaktifan kembali jabatan fungsional setelah pemberhentian sementara.",
      path: "/kepegawaian/rekomendasi/pengaktifan-kembali",
    },
    {
      icon: "📈",
      title: "Kenaikan Jenjang & Perpindahan Jabatan",
      desc: "Pengajuan kenaikan jenjang jabatan fungsional atau perpindahan dari jabatan lain.",
      path: "/kepegawaian/rekomendasi/kenaikan-jenjang",
    },
    {
      icon: "🚀",
      title: "Mutasi / Promosi",
      desc: "Pengajuan mutasi pegawai maupun promosi jabatan.",
      path: "/kepegawaian/rekomendasi/mutasi-promosi",
    },
    {
      icon: "🧩",
      title: "Alih Fungsi",
      desc: "Pengajuan alih fungsi sesuai kebutuhan organisasi.",
      path: "/kepegawaian/rekomendasi/alih-fungsi",
    },
  ];

  return (
    <div className="rekom-page">

      <button
        className="back-button"
        onClick={() => navigate("/kepegawaian")}
      >
        ← Kembali ke Menu
      </button>

      {/* BANNER */}
      <div className="service-banner">

        <div className="banner-icon">
          📄
        </div>

        <div>
          <h1>Layanan Rekomendasi</h1>

          <p>
            Pilih jenis rekomendasi yang akan diajukan melalui
            Portal Layanan Internal BMBPSDM.
          </p>
        </div>

      </div>

      {/* DESKRIPSI */}
      <div className="description-card">

        <h2>Tentang Layanan</h2>

        <p>
          Layanan rekomendasi digunakan untuk mendukung proses
          administrasi kepegawaian sesuai ketentuan yang berlaku.
          Pilih jenis layanan rekomendasi sesuai kebutuhan Anda.
        </p>

      </div>

      {/* DAFTAR LAYANAN */}
      <div className="layanan-grid">

        {layanan.map((item, index) => (
          <div
            key={index}
            className="layanan-card"
            onClick={() => navigate(item.path)}
          >

            <div className="layanan-icon">
              {item.icon}
            </div>

            <h3>{item.title}</h3>

            <p>{item.desc}</p>

            <span>
              Ajukan Permohonan →
            </span>

          </div>
        ))}

      </div>

    </div>
  );
}