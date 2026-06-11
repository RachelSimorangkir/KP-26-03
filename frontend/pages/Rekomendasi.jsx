import { useNavigate } from "react-router-dom";
import "./Rekomendasi.css";

export default function Rekomendasi() {
  const navigate = useNavigate();

  return (
    <div className="rekom-page">

      <button
        className="back-button"
        onClick={() => navigate("/kepegawaian")}
      >
        ← Kembali ke Menu
      </button>

      {/* BANNER */}
      <div className="service-banner">

        <div className="banner-icon">
          📄
        </div>

        <div>
          <h1>Layanan Rekomendasi</h1>

          <p>
            Pengajuan surat rekomendasi pegawai secara digital
            melalui Portal Layanan Internal BMBPSDM.
          </p>
        </div>

      </div>

      {/* PANDUAN */}
      <div className="guide-card">

        <h3>📋 Panduan Pengajuan</h3>

        <ol>
          <li>Pastikan seluruh data pegawai telah sesuai.</li>
          <li>Siapkan dokumen pendukung yang diperlukan.</li>
          <li>Isi formulir pengajuan dengan lengkap.</li>
          <li>Upload dokumen persyaratan.</li>
          <li>Kirim pengajuan untuk diproses.</li>
        </ol>

      </div>

      {/* DESKRIPSI */}
      <div className="description-card">

        <h2>Tentang Layanan</h2>

        <p>
          Layanan rekomendasi digunakan untuk membantu pegawai
          memperoleh surat rekomendasi resmi dari instansi sesuai
          kebutuhan administrasi yang berlaku.
        </p>

      </div>

      {/* PERSYARATAN */}
      <div className="requirement-card">

        <h2>Persyaratan</h2>

        <ul>
          <li>Surat Permohonan.</li>
          <li>Fotokopi KTP.</li>
          <li>Fotokopi SK Terakhir.</li>
          <li>Dokumen pendukung sesuai kebutuhan rekomendasi.</li>
        </ul>

      </div>

      {/* FORM */}
      <div className="rekom-card">

        <h2>Form Pengajuan</h2>

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
            <label>Unit Kerja</label>
            <input
              type="text"
              placeholder="Masukkan Unit Kerja"
            />
          </div>

          <div className="form-group">
            <label>Jenis Rekomendasi</label>

            <select>
              <option>Pilih Jenis Rekomendasi</option>
              <option>Rekomendasi Pendidikan</option>
              <option>Rekomendasi Mutasi</option>
              <option>Rekomendasi Kegiatan</option>
            </select>
          </div>

        </div>

        <div className="upload-section">

          <h3>Upload Dokumen</h3>

          <div className="upload-box">
            <input type="file" />
            <p>Format PDF maksimal 10 MB</p>
          </div>

        </div>

        <button className="submit-button">
          Kirim Pengajuan
        </button>

      </div>

    </div>
  );
}