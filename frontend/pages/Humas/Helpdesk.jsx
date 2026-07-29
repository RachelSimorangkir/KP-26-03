import { useNavigate } from "react-router-dom";
import "./Helpdesk.css";

export default function Helpdesk() {
  const navigate = useNavigate();

  const layanan = [
    {
      title: "Form Pengajuan Helpdesk",
      desc: "Ajukan permintaan bantuan atau keluhan.",
      path: "/humasdata/helpdesk/FormHelpdesk",
    },
    {
      title: "Daftar & Status Pengajuan",
      desc: "Lihat status pengajuan helpdesk Anda.",
      path: "/humasdata/helpdesk/StatusHelpdesk",
    },
  ];

  return (
    <div className="rekom-page">
      {/* BANNER */}
      <section className="service-banner">

        <div className="service-banner-content">
          <h1>Layanan Helpdesk</h1>

          <p>
            Pilih jenis layanan helpdesk yang akan diajukan melalui Jendela Layanan
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
                Ajukan Permohonan
              </span>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}