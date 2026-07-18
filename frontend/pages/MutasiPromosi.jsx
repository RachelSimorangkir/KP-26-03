import "./MutasiPromosi.css";
import { useNavigate } from "react-router-dom";

function MutasiPromosi() {
  const navigate = useNavigate();

  return (
    <div className="mutasi-page">

      <button
  className="back-button"
  onClick={() => navigate("/kepegawaian/rekomendasi")}
>
  <img
    src="/logo-back.png"
    alt="Back"
    className="back-icon"
  />
  <span>Kembali</span>
</button>

      {/* HEADER */}
      <div className="mutasi-header">

        <div>
          <h1>Mutasi & Promosi</h1>

          <p>
            Pilih jenis layanan mutasi atau
            promosi yang akan diajukan.
          </p>
        </div>

      </div>

      {/* PILIHAN */}
      <div className="mutasi-grid">

        <div
          className="mutasi-card"
          onClick={() =>
            navigate(
              "/kepegawaian/rekomendasi/mutasi-internal"
            )
          }
        >

          <div className="card-icon">
            🏢
          </div>

          <h3>
            Mutasi Internal
            Kementerian Agama
          </h3>

          <p>
            Perpindahan pegawai antar unit
            kerja dalam lingkungan Kemenag.
          </p>

          <span>
            Ajukan Permohonan →
          </span>

        </div>

        <div
          className="mutasi-card"
          onClick={() =>
            navigate(
              "/kepegawaian/rekomendasi/mutasi-antar-instansi"
            )
          }
        >

          <div className="card-icon">
            🔄
          </div>

          <h3>
            Mutasi Antar Instansi
          </h3>

          <p>
            Perpindahan pegawai dari atau
            ke instansi pemerintah lainnya.
          </p>

          <span>
            Ajukan Permohonan →
          </span>

        </div>

      </div>

    </div>
  );
}

export default MutasiPromosi;