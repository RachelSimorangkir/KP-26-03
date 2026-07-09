import { useNavigate } from "react-router-dom";
import "./Publikasi.css";

export default function Publikasi() {
  const navigate = useNavigate();

  const layanan = [
    {
      icon: "📝",
      title: "Form Pengajuan Publikasi",
      desc: "Ajukan publikasi berita kegiatan baru.",
      path: "/humasdata/publikasi/form-pengajuan",
    },
    {
      icon: "📋",
      title: "Daftar & Status Pengajuan",
      desc: "Lihat status pengajuan publikasi Anda.",
      path: "/humasdata/publikasi/daftar-pengajuan",
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
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              padding: "25px 30px",
              cursor: "pointer",
            }}
          >
            <div
              className="layanan-icon"
              style={{
                width: "60px",
                height: "60px",
                minWidth: "60px",
                marginBottom: "0",
              }}
            >
              {item.icon}
            </div>

            <div
              className="layanan-content"
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <h3 style={{ margin: 0, fontSize: "1.15rem", fontWeight: 600 }}>
                {item.title}
              </h3>

              <p style={{ margin: 0, fontSize: "0.9rem", color: "#64748b" }}>
                {item.desc}
              </p>

              <span
                style={{
                  fontSize: "0.9rem",
                  color: "#2563eb",
                  fontWeight: 500,
                  marginTop: "4px",
                }}
              >
                Ajukan Permohonan →
              </span>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}