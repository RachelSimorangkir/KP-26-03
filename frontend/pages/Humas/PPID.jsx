import { useNavigate } from "react-router-dom";
import "./PPID.css";

export default function Permohonan() {
  const navigate = useNavigate();

  const layanan = [
    {
      title: "Form Pengajuan Permohonan",
      desc: "Ajukan permintaan informasi atau layanan.",
      path: "/humasdata/PPID/Permohonan",
    },
    {
      title: "Daftar & Status Pengajuan",
      desc: "Lihat status pengajuan permohonan Anda.",
      path: "/humasdata/PPID/StatusPermohonan",
    },
  ];

  return (
    <div className="rekom-page">
      {/* BANNER */}
      <section className="service-banner">

        <div className="service-banner-content">
          <h1>Layanan PPID Internal</h1>

          <p>
            Pilih jenis layanan PPID Internal yang akan diajukan melalui Jendela Layanan
            Internal BMBPSDM.
          </p>
        </div>
      </section>

      {/* DESKRIPSI */}
      <section className="description-card">
        <h2>Tentang Layanan</h2>

        <p>
          Layanan PPID Internal digunakan untuk mendukung proses administrasi
          kepegawaian sesuai ketentuan yang berlaku. Pilih jenis layanan
          PPID Internal sesuai kebutuhan Anda.
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