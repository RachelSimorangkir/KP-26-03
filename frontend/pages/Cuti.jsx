import "./Cuti.css";
import { useNavigate } from "react-router-dom";

function Cuti() {
  const navigate = useNavigate();

  return (
    <div className="cuti-page">

      <button
        className="back-button"
        onClick={() => navigate("/kepegawaian")}
      >
        ← Kembali
      </button>

      {/* HEADER */}
      <div className="page-header">

        <div className="header-icon">
          🏖️
        </div>

        <div>
          <h1>Pengajuan Cuti</h1>

          <p>
            Pengajuan cuti pegawai secara elektronik
            melalui Portal Layanan Internal BMBPSDM.
          </p>
        </div>

      </div>

      {/* PANDUAN PENGGUNAAN */}
<div className="guide-card">
  <h2>📋 Panduan Penggunaan Sistem Pengajuan Cuti</h2>

  <ol className="guide-list">
    <li>
      Klik <strong>Download Template</strong> untuk mengunduh
      form cuti dalam format Word.
    </li>

    <li>
      Upload Dokumen Cuti pada
      <strong> Aplikasi Srikandi </strong>
      + Lampiran (jika ada).
    </li>

    <li>
      Isi Data Pegawai pada form cuti.
    </li>

    <li>
      Isi Data Pegawai di form ini,
      ketik <strong>NIP</strong> lalu klik
      <strong> Cari</strong>.
    </li>

    <li>
      Pilih <strong>Jenis Cuti</strong>,
      isi <strong>Tanggal</strong> dan
      <strong> Durasi</strong> (hari kerja).
    </li>

    <li>
      Jika sudah di TTE dari Srikandi,
      <strong> Upload Dokumen + Lampiran</strong>
      lalu klik
      <strong> Kirim Pengajuan Cuti</strong>.
    </li>

    <li>
      Data pengajuan cuti akan diproses oleh
      tim kepegawaian
      <strong> (Muhammad Daffa Daud, S.Sos)</strong>.
    </li>
  </ol>
</div>

      {/* DATA PEGAWAI */}
      <div className="form-card">

        <h2>👤 Data Pegawai</h2>

        <div className="tips-box">
          💡 Isi data pegawai sebelum melakukan pengajuan cuti.
        </div>

        <div className="form-grid">

          <div className="form-group">
            <label>NIP *</label>

            <input
              type="text"
              placeholder="Masukkan NIP"
            />
          </div>

          <div className="form-group">
            <label>Nama Pegawai *</label>

            <input
              type="text"
              placeholder="Nama Lengkap"
            />
          </div>

          <div className="form-group">
            <label>Jabatan *</label>

            <input type="text" />
          </div>

          <div className="form-group">
            <label>Unit Kerja *</label>

            <input type="text" />
          </div>

          <div className="form-group full-width">
            <label>Status Kepegawaian *</label>

            <select>
              <option>Pilih Status Kepegawaian</option>
              <option>PNS</option>
              <option>PPPK</option>
            </select>
          </div>

        </div>

      </div>

      {/* DETAIL CUTI */}
      <div className="form-card">

        <h2>📅 Detail Cuti</h2>

        <div className="form-grid">

          <div className="form-group full-width">
  <label>Jenis Cuti *</label>

  <select>
    <option>Pilih Jenis Cuti</option>
    <option>Cuti Tahunan</option>
    <option>Cuti Besar</option>
    <option>Cuti Sakit</option>
    <option>Cuti Melahirkan</option>
    <option>Cuti Karena Alasan Penting</option>
    <option>Cuti di Luar Tanggungan Negara</option>
  </select>
</div>

          <div className="form-group">
            <label>Tanggal Mulai *</label>

            <input type="date" />
          </div>

          <div className="form-group">
            <label>Tanggal Selesai *</label>

            <input type="date" />
          </div>

          <div className="form-group">
            <label>Durasi Cuti (Hari Kerja) *</label>

            <input
              type="number"
              placeholder="Jumlah Hari"
            />
          </div>

        </div>

      </div>

      {/* DOKUMEN */}
<div className="form-card">

  <h2>📄 Dokumen Pendukung</h2>

  <div className="upload-box">

    <div className="upload-icon">
      📄
    </div>

    <h3>Upload Formulir Cuti (PDF)</h3>

    <p>Format PDF hingga 10 MB</p>

    <label className="upload-btn">
      Pilih File PDF

      <input
        type="file"
        accept=".pdf"
        className="file-input"
      />
    </label>

  </div>

  <div className="upload-box">

    <div className="upload-icon">
      📎
    </div>

    <h3>Upload Lampiran (Opsional)</h3>

    <p>PDF / JPG / PNG</p>

    <label className="upload-btn secondary">

      Tambah Lampiran

      <input
        type="file"
        multiple
        accept=".pdf,.jpg,.jpeg,.png"
        className="file-input"
      />

    </label>

  </div>

</div>

      {/* BUTTON */}
      <div className="cuti-actions">

  <button className="submit-btn">
    📤 Kirim Pengajuan Cuti
  </button>

</div>

    </div>
  );
}

export default Cuti;