import "./KenaikanJenjang.css";
import { useNavigate } from "react-router-dom";

function KenaikanJenjang() {
  const navigate = useNavigate();

  return (
    <div className="kenaikan-page">

      {/* BACK BUTTON */}
      <button
        className="back-button"
        onClick={() => navigate("/kepegawaian/rekomendasi")}
      >
        ← Kembali
      </button>

      {/* HEADER */}
      <div className="page-header">

        <div className="header-icon">
          📈
        </div>

        <div className="header-content">
          <h1>
            Kenaikan Jenjang Jabatan &
            Perpindahan Dari Jabatan Lain
          </h1>

          <p>
            Pengajuan kenaikan jenjang jabatan fungsional
            dan perpindahan dari jabatan lain secara elektronik.
          </p>
        </div>

      </div>

      {/* PERSYARATAN */}
      <div className="requirement-card">

        <h2>📋 Persyaratan Umum</h2>

        <ol>
          <li>Surat Pengantar dari Pimpinan Unit Kerja.</li>
          <li>Sertifikat Uji Kompetensi Kenaikan Jenjang Jabatan.</li>
          <li>SPTJM (Surat Pernyataan Pertanggungjawaban Mutlak) dari Pimpinan.</li>
          <li>PAK Konversi.</li>
          <li>SKP 1 (Satu) Tahun Terakhir.</li>
          <li>Surat Pernyataan Tidak Sedang Hukuman Disiplin.</li>
          <li>Surat Pernyataan Tidak Sedang Tugas Belajar.</li>
          <li>Surat Rekomendasi Persetujuan dari Unit Pembina.</li>
          <li>SK Pangkat Terakhir.</li>
          <li>SK Jabatan Terakhir.</li>
        </ol>

      </div>

      {/* FORM */}
      <div className="form-card">

        <h2>Formulir Pengajuan</h2>

        <div className="form-grid">

          {/* NIP */}
          <div className="form-group full">
            <label>NIP *</label>

            <div className="nip-search">
              <input
                type="text"
                placeholder="Masukkan NIP"
              />
            </div>
          </div>

          {/* DATA PEGAWAI */}
          <div className="form-group">
            <label>Nama *</label>
            <input type="text" />
          </div>

          <div className="form-group">
            <label>Nama + Gelar Akademik *</label>
            <input type="text" />
          </div>

          <div className="form-group">
            <label>Jabatan Terakhir *</label>
            <input type="text" />
          </div>

          <div className="form-group">
            <label>Klasifikasi Jabatan *</label>

            <select>
              <option>Pilih Klasifikasi Jabatan</option>
              <option>Jabatan Struktural</option>
              <option>Jabatan Fungsional</option>
              <option>Jabatan Fungsional Umum / Pelaksana</option>
            </select>
          </div>

          <div className="form-group">
            <label>Pangkat / Golongan *</label>
            <input type="text" />
          </div>

          <div className="form-group">
            <label>Tempat Lahir *</label>
            <input type="text" />
          </div>

          <div className="form-group">
            <label>Tanggal Lahir *</label>
            <input type="date" />
          </div>

          <div className="form-group">
            <label>Pendidikan Terakhir *</label>

            <input
              type="text"
              placeholder="Contoh: S1 Sistem Informasi"
            />
          </div>

          <div className="form-group">
            <label>Predikat SKP *</label>

            <input
              type="text"
              placeholder="Baik / Sangat Baik"
            />
          </div>

          <div className="form-group">
            <label>Jabatan Fungsional Yang Dituju *</label>

            <select>
              <option>Pilih Jabatan Fungsional</option>
              <option>JF Widyaiswara</option>
              <option>JF Pranata Komputer</option>
              <option>JF Perencana</option>
              <option>JF Analis Kebijakan</option>
              <option>JF Pustakawan</option>
              <option>JF Auditor</option>
              <option>JF Pranata Humas</option>
              <option>Lainnya</option>
            </select>
          </div>

          <div className="form-group">
            <label>Jenjang Yang Diusulkan *</label>

            <input
              type="text"
              placeholder="Ahli Pertama / Ahli Muda / Ahli Madya"
            />
          </div>

          <div className="form-group">
            <label>Unit Kerja *</label>
            <input type="text" />
          </div>

          <div className="form-group">
            <label>Nomor WhatsApp *</label>

            <input
              type="text"
              placeholder="08xxxxxxxxxx"
            />
          </div>

        </div>

      </div>

      {/* UPLOAD */}
      <div className="upload-card">

  <div className="upload-header">
    <span className="upload-folder">📁</span>
    <h2>Upload Berkas Persyaratan</h2>
  </div>

  <input
    type="text"
    placeholder="https://drive.google.com/drive/folders/..."
    className="drive-input"
  />

  <div className="upload-info">
    <p>
      Tempel link Google Drive yang berisi seluruh berkas persyaratan.
    </p>

    <p>
      Pastikan akses folder diatur menjadi
      <strong> "Siapa saja yang memiliki link dapat melihat"</strong>.
    </p>
  </div>

</div>

      {/* SUBMIT */}
      <button
        type="button"
        className="submit-btn"
      >
        Ajukan Permohonan
      </button>

    </div>
  );
}

export default KenaikanJenjang;