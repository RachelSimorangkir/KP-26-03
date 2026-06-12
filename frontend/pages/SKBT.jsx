import "./SKBT.css";
import { useNavigate } from "react-router-dom";

function SKBT() {
  const navigate = useNavigate();

  return (
    <div className="skbt-page">

      <div className="skbt-header">
        <h1>Pengajuan SKBT</h1>
        <p>
          Pilih jenis pengajuan Surat Keterangan Bebas Temuan (SKBT)
        </p>
      </div>

      <div className="skbt-card-container">

        <div
          className="skbt-card"
          onClick={() => navigate("/kepegawaian/skbt/mandiri")}
        >
          <div className="skbt-icon">
            👤
          </div>

          <h2>SKBT Mandiri</h2>

          <p>
            Pengajuan SKBT yang dilakukan oleh pegawai
            untuk kebutuhan pribadi.
          </p>

          <button>
            Pilih Layanan
          </button>
        </div>

        <div
          className="skbt-card"
          onClick={() => navigate("/kepegawaian/skbt/organisasi")}
        >
          <div className="skbt-icon">
            🏢
          </div>

          <h2>SKBT Organisasi</h2>

          <p>
            Pengajuan SKBT yang diajukan atas nama
            unit kerja atau organisasi.
          </p>

          <button>
            Pilih Layanan
          </button>
        </div>

      </div>

    </div>
  );
}

export default SKBT;