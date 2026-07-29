import { useNavigate } from "react-router-dom";
import "./PermintaanData.css";

export default function PermintaanData() {
  const navigate = useNavigate();

  const layanan = [
    {
      title: "Permintaan Data Internal",
      desc: "Ajukan permintaan data yang diperlukan.",
      path: "/humasdata/PermintaanData/DataInternal",
    },
    {
      title: "Status Permintaan Data Internal",
      desc: "Lihat status pengajuan permintaan data Anda.",
      path: "/humasdata/PermintaanData/StatusData",
    },
  ];

  return (
    <div className="rekom-page">
      {/* BANNER */}
      <section className="service-banner">

        <div className="service-banner-content">
          <h1>Layanan Permintaan Data</h1>

          <p>
            Pilih jenis layanan permintaan data yang akan diajukan melalui Jendela Layanan
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