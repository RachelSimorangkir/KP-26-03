import { useNavigate } from "react-router-dom";
import "./SKBT.css";

function SKBT() {
  const navigate = useNavigate();

  return (
    <div className="skbt-page">

      <button
        className="back-button"
        onClick={() => navigate("/kepegawaian")}
      >
        ← Kembali ke Menu
      </button>

      {/* HEADER */}
      <div className="page-header">

        <div className="header-icon">
          📋
        </div>

        <div>
          <h1>Surat Keterangan Bebas Temuan (SKBT)</h1>

          <p>
            Pilih jenis pengajuan SKBT sesuai kebutuhan
            pegawai maupun organisasi.
          </p>
        </div>

      </div>

      {/* TENTANG */}
      <div className="info-card">

        <h2>Tentang Layanan</h2>

        <p>
          SKBT merupakan surat yang menerangkan bahwa
          pegawai atau organisasi tidak memiliki temuan
          pemeriksaan yang belum diselesaikan.
          Pilih jenis pengajuan sesuai kebutuhan Anda.
        </p>

      </div>

      {/* PILIHAN */}
      <div className="service-grid">

        <div
          className="service-card"
          onClick={() => navigate("/kepegawaian/skbt/mandiri")}
        >
          <div className="service-icon">
            👤
          </div>

          <h3>SKBT Mandiri</h3>

          <p>
            Pengajuan SKBT yang dilakukan oleh pegawai
            untuk kebutuhan pribadi.
          </p>

          <span>
            Pilih Layanan →
          </span>
        </div>

        <div
          className="service-card"
          onClick={() => navigate("/kepegawaian/skbt/organisasi")}
        >
          <div className="service-icon">
            🏢
          </div>

          <h3>SKBT Organisasi</h3>

          <p>
            Pengajuan SKBT yang diajukan atas nama
            unit kerja atau organisasi.
          </p>

          <span>
            Pilih Layanan →
          </span>
        </div>

      </div>

    </div>
  );
}

export default SKBT;