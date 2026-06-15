import "./AlihFungsi.css";
import { useNavigate } from "react-router-dom";

function AhliFungsi() {
  const navigate = useNavigate();

  return (
    <div className="ahlifungsi-page">

      <button
        className="back-button"
        onClick={() => navigate("/kepegawaian/rekomendasi")}
      >
        ← Kembali
      </button>

      {/* HEADER */}
      <div className="page-header">

        <div className="header-icon">
          🧩
        </div>

        <div>
          <h1>Alih Fungsi</h1>

          <p>
            Pengajuan alih fungsi jabatan pegawai sesuai
            kebutuhan organisasi dan ketentuan yang berlaku.
          </p>
        </div>

      </div>

      {/* FORM */}
      <div className="form-card">

        <h2>🧩 Formulir Pengajuan Alih Fungsi</h2>

        <div className="form-grid">

          <div className="form-group">
            <label>NIP *</label>

            <input
              type="text"
              placeholder="Masukkan NIP"
            />
          </div>

          <div className="form-group">
            <label>Nama + Gelar Akademik *</label>

            <input
              type="text"
              placeholder="Contoh: Rachel C.P Simorangkir, S.Kom."
            />
          </div>

          <div className="form-group">
            <label>Jabatan Saat Ini *</label>

            <input
              type="text"
              placeholder="Masukkan Jabatan Saat Ini"
            />
          </div>

          <div className="form-group">
            <label>Unit Kerja *</label>

            <input
              type="text"
              placeholder="Masukkan Unit Kerja"
            />
          </div>

          <div className="form-group">
            <label>Pendidikan Terakhir *</label>

            <input
              type="text"
              placeholder="Contoh: S1 Sistem Informasi"
            />
          </div>

          <div className="form-group">
            <label>Nomor WhatsApp *</label>

            <input
              type="text"
              placeholder="08xxxxxxxxxx"
            />
          </div>

          <div className="form-group full-width">
            <label>Jabatan / Fungsi Yang Dituju *</label>

            <input
              type="text"
              placeholder="Masukkan Jabatan atau Fungsi Yang Dituju"
            />
          </div>

          <div className="form-group full-width">
            <label>Alasan Pengajuan Alih Fungsi *</label>

            <textarea
              rows="5"
              placeholder="Jelaskan alasan pengajuan alih fungsi..."
            />
          </div>

        </div>

      </div>

      {/* UPLOAD */}
      <div className="upload-card">

        <div className="upload-header">
          <span>📁</span>
          <h2>Upload Berkas Persyaratan</h2>
        </div>

        <input
          type="text"
          className="drive-input"
          placeholder="https://drive.google.com/drive/folders/..."
        />

        <div className="upload-info">

          <p>
            Tempel link Google Drive yang berisi seluruh
            dokumen persyaratan alih fungsi.
          </p>

          <p>
            Pastikan akses folder diatur menjadi
            <strong>
              {" "}
              "Siapa saja yang memiliki link dapat melihat"
            </strong>
          </p>

        </div>

      </div>

      {/* SUBMIT */}
      <div className="submit-wrapper">

        <button className="submit-btn">
          🧩 Kirim Pengajuan Alih Fungsi
        </button>

      </div>

    </div>
  );
}

export default AhliFungsi;