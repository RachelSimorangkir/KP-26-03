import { useNavigate } from "react-router-dom";
import "./Helpdesk.css";

export default function Helpdesk() {
  const navigate = useNavigate();

  const layanan = [
  {
    icon: "🎫",
    title: "Form Pengajuan Helpdesk",
    desc: "Ajukan permintaan bantuan atau keluhan.",
    path: "/humasdata/helpdesk/FormHelpdesk",  // ✅ Tanpa dash
  },
  {
    icon: "📑",
    title: "Daftar & Status Pengajuan",
    desc: "Lihat status pengajuan helpdesk Anda.",
    path: "/humasdata/helpdesk/StatusHelpdesk",  // ✅ Tanpa dash
  },
];

  return (
    <div className="rekom-page">
      {/* BANNER */}
      <section className="service-banner">
        <div className="banner-icon">📰</div>

        <div className="service-banner-content">
          <h1>Layanan Helpdesk</h1>

          <p>
            Pilih jenis layanan helpdesk yang akan diajukan melalui Portal Layanan
            Internal BMBPSDM.
          </p>
        </div>
      </section>

      {/* DESKRIPSI */}
      <section className="description-card">
        <h2>Tentang Layanan</h2>

        <p>
          Layanan helpdesk digunakan untuk mendukung proses administrasi
          kepegawaian sesuai ketentuan yang berlaku. Pilih jenis layanan
          helpdesk sesuai kebutuhan Anda.
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