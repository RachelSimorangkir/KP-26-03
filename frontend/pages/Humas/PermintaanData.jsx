import { useNavigate } from "react-router-dom";
import "./PermintaanData.css";

export default function PermintaanData() {
  const navigate = useNavigate();

  const layanan = [
  {
    icon: "💾",
    title: "Permintaan Data Internal",
    desc: "Ajukan permintaan data yang diperlukan.",
    path: "/humasdata/PermintaanData/DataInternal",  // ✅ Tanpa dash
  },
  {
    icon: "🕐",
    title: "Status Permintaan Data Internal",
    desc: "Lihat status pengajuan permintaan data Anda.",
    path: "/humasdata/PermintaanData/StatusData",  // ✅ Tanpa dash
  },
];

  return (
    <div className="rekom-page">
      {/* BANNER */}
      <section className="service-banner">
        <div className="banner-icon">📊</div>

        <div className="service-banner-content">
          <h1>Layanan Permintaan Data</h1>

          <p>
            Pilih jenis layanan permintaan data yang akan diajukan melalui Portal Layanan
            Internal BMBPSDM.
          </p>
        </div>
      </section>

      {/* DESKRIPSI */}
      <section className="description-card">
        <h2>Tentang Layanan</h2>

        <p>
          Layanan permintaan data digunakan untuk mendukung proses administrasi
          kepegawaian sesuai ketentuan yang berlaku. Pilih jenis layanan
          permintaan data sesuai kebutuhan Anda.
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