import { useNavigate } from "react-router-dom";
import "./Publikasi.css";

export default function Publikasi() {
  const navigate = useNavigate();

  const layanan = [
    {
      title: "Form Pengajuan Publikasi",
      desc: "Ajukan publikasi berita kegiatan baru.",
      path: "/humasdata/publikasi/form-pengajuan",
    },
    {
      title: "Daftar & Status Pengajuan",
      desc: "Lihat status pengajuan publikasi Anda.",
      path: "/humasdata/publikasi/daftar-pengajuan",
    },
  ];

  return (
    <div className="rekom-page">
      {/* BANNER */}
      <section className="service-banner">

        <div className="service-banner-content">
          <h1>Layanan Publikasi</h1>

          <p>
            Pilih jenis layanan publikasi yang akan diajukan melalui Jendela Layanan
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
      <section className="publikasi-grid">
  {layanan.map((item) => (
    <div
      key={item.path}
      className="publikasi-card"
      onClick={() => navigate(item.path)}
    >
      <div className="publikasi-icon">

      </div>

      <div className="publikasi-content">
        <h3>{item.title}</h3>

        <p>{item.desc}</p>

        <span>Ajukan Permohonan</span>
      </div>
    </div>
  ))}
</section>
    </div>
  );
}