import { useNavigate } from "react-router-dom";
import "./TugasBelajar.css";

export default function TugasBelajar() {
  const navigate = useNavigate();

  return (
    <div className="kp-page">

      <div className="kp-header">
        <button
          className="back-button"
          onClick={() => navigate("/kepegawaian")}
        >
          ← Kembali
        </button>

        <h1>Tugas Belajar</h1>

        <p>
          Pengajuan usul tugas belajar pegawai
          secara digital melalui Portal Layanan Internal.
        </p>
      </div>

      <div className="kp-card">

        <h2>Data Pegawai</h2>

        <div className="form-grid">

          <div className="form-group">
            <label>NIP</label>
            <input
              type="text"
              placeholder="Masukkan NIP"
            />
          </div>

          <div className="form-group">
            <label>Nama Pegawai</label>
            <input
              type="text"
              placeholder="Masukkan Nama Pegawai"
            />
          </div>

          <div className="form-group">
            <label>Pangkat Lama</label>
            <input
              type="text"
              placeholder="Pangkat Lama"
            />
          </div>

          <div className="form-group">
            <label>Pangkat Baru</label>
            <input
              type="text"
              placeholder="Pangkat Baru"
            />
          </div>

          <div className="form-group">
            <label>Unit Kerja</label>
            <input
              type="text"
              placeholder="Unit Kerja"
            />
          </div>

          <div className="form-group">
            <label>TMT Pangkat Baru</label>
            <input type="date" />
          </div>

        </div>

        <div className="upload-section">

          <h3>Upload Dokumen</h3>

          <input type="file" />

        </div>

        <button className="submit-button">
          Kirim Pengajuan
        </button>

      </div>

    </div>
  );
}