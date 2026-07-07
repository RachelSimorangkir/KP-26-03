import { useNavigate } from "react-router-dom";
import "./Rekomendasi.css";

export default function Rekomendasi() {
  const navigate = useNavigate();

  const layanan = [
    {
      title: "Pengaktifan Kembali",
      desc: "Pengaktifan kembali jabatan fungsional setelah pemberhentian sementara.",
      path: "/kepegawaian/rekomendasi/pengaktifan-kembali",
    },
    {
      title: "Kenaikan Jenjang & Perpindahan Jabatan",
      desc: "Pengajuan kenaikan jenjang jabatan fungsional atau perpindahan dari jabatan lain.",
      path: "/kepegawaian/rekomendasi/kenaikan-jenjang",
    },
    {
      title: "Mutasi / Promosi",
      desc: "Pengajuan mutasi pegawai maupun promosi jabatan.",
      path: "/kepegawaian/rekomendasi/mutasi-promosi",
    },
    {
      title: "Alih Fungsi",
      desc: "Pengajuan alih fungsi sesuai kebutuhan organisasi.",
      path: "/kepegawaian/rekomendasi/alih-fungsi",
    },
  ];

  return (
    <div className="rekom-page">
      {/* HEADER */}
      <div className="rekom-header">
        <button
          className="back-button"
          onClick={() => navigate("/kepegawaian")}
        >
          <img
      src="/logo-back.png"
      alt="Back"
      className="back-icon"
    />
        </button>
      </div>

      {/* BANNER */}
      <section className="service-banner">

        <div className="service-banner-content">
          <h1>Layanan Rekomendasi</h1>

          <p>
            Pilih jenis rekomendasi yang akan diajukan melalui Portal Layanan
            Internal BMBPSDM.
          </p>
        </div>
      </section>

      {/* DESKRIPSI */}
      <section className="description-card">
        <h2>Tentang Layanan</h2>

        <p>
          Layanan rekomendasi digunakan untuk mendukung proses administrasi
          kepegawaian sesuai ketentuan yang berlaku. Pilih jenis layanan
          rekomendasi sesuai kebutuhan Anda.
        </p>
      </section>

      {/* DAFTAR LAYANAN */}
      <section className="layanan-grid">
        {layanan.map((item) => (
          <div
            key={item.path}
            className="layanan-card"
            onClick={() => navigate(item.path)}
          >
            <div className="layanan-icon">{item.icon}</div>

            <h3>{item.title}</h3>

            <p>{item.desc}</p>

            <span>Ajukan Permohonan →</span>
          </div>
        ))}
      </section>
    </div>
  );
}