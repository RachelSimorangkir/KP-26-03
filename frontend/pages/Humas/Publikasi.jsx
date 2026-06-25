import { useNavigate } from "react-router-dom";
import "./Publikasi.css";

export default function Publikasi() {
  const navigate = useNavigate();

  const layanan = [
  {
    icon: "📝",
    title: "Form Pengajuan Publikasi",
    desc: "Ajukan publikasi berita kegiatan baru.",
    path: "/humasdata/publikasi/form-pengajuan",  // ✅ Tanpa dash
  },
  {
    icon: "📋",
    title: "Daftar & Status Pengajuan",
    desc: "Lihat status pengajuan publikasi Anda.",
    path: "/humasdata/publikasi/daftar-pengajuan",  // ✅ Tanpa dash
  },
];

  return (
    <div className="rekom-page">
      {/* BANNER */}
      <section className="service-banner">
        <div className="banner-icon">📰</div>

        <div className="service-banner-content">
          <h1>Layanan Publikasi</h1>

          <p>
            Pilih jenis layanan publikasi yang akan diajukan melalui Portal Layanan
            Internal BMBPSDM.
          </p>
        </div>
      </section>

      {/* DESKRIPSI */}
      <section className="description-card">
        <h2>Tentang Layanan</h2>

        <p>
          Layanan publikasi digunakan untuk mendukung proses administrasi
          kepegawaian sesuai ketentuan yang berlaku. Pilih jenis layanan
          publikasi sesuai kebutuhan Anda.
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