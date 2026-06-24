import "./MutasiInternal.css";
import { useNavigate } from "react-router-dom";

function MutasiInternal() {
  const navigate = useNavigate();

  return (
    <div className="mutasiinternal-page">

      <button
        className="back-button"
        onClick={() =>
          navigate("/kepegawaian/rekomendasi/mutasi-promosi")
        }
      >
        ← Kembali
      </button>

      {/* HEADER */}

      <div className="page-header">

        <div className="header-icon">
          🏢
        </div>

        <div>
          <h1>Mutasi Antar Instansi</h1>

          <p>
            Pengajuan perpindahan pegawai antar unit kerja
            dalam lingkungan Kementerian Agama.
          </p>
        </div>

      </div>

      {/* PERSYARATAN */}
<div className="info-card">

  <h2>Persyaratan Umum</h2>

<ol className="number-list">
  <li>
    Surat Pengantar dari Pimpinan Unit Kerja Tujuan
    ke Kepala Badan Litbang dan Diklat.
  </li>

  <li>
    Surat Permohonan dari Pegawai yang mutasi ke
    Pimpinan Unit Kerja Penerima dengan menyebutkan
    jabatan dan alasan usul mutasi.
  </li>

  <li>
    ANJAB dan ABK yang ditandatangani oleh
    Pimpinan Unit Kerja Penerima.
  </li>

  <li>
    SPTJM yang ditandatangani oleh
    Pimpinan Unit Kerja Penerima.
  </li>

  <li>
    Surat Pernyataan Persetujuan dari Pimpinan.
  </li>

  <li>
    ANJAB dan ABK dari Pimpinan Unit Kerja Yang Melepas
    (Minimal Eselon 2).
  </li>

  <li>
    SPTJM dari Kanwil Riau.
  </li>

  <li>
    Surat Pernyataan Persetujuan dari Pimpinan Unit Kerja
    Yang Melepas (Minimal Eselon 2).
  </li>

  <li>
    Surat Keterangan Bebas Temuan yang diterbitkan
    Inspektorat Jenderal dimana PNS berasal.
  </li>

  <li>
    SK Pangkat Terakhir.
  </li>

  <li>
    SK Jabatan Terakhir.
  </li>

  <li>
    SKP 2 (dua) Tahun Terakhir dari e-Kinerja BKN.
  </li>

  <li>
    Surat Pernyataan Tidak Sedang Proses atau Menjalani
    Hukuman Disiplin dan atau Proses Peradilan yang
    ditandatangani oleh Pimpinan Unit Kerja Yang Melepas
    (Minimal Eselon 2).
  </li>

  <li>
    Surat Pernyataan Tidak Sedang Menjalani Tugas Belajar
    atau Ikatan Dinas yang ditandatangani oleh Pimpinan
    Unit Kerja Yang Melepas (Minimal Eselon 2).
  </li>

  <li>
    Surat Keterangan Bebas Temuan yang diterbitkan
    Inspektorat Jenderal dimana PNS berasal.
  </li>
</ol>

</div>

      {/* FORM DATA PEGAWAI */}
<div className="form-card">

  <h2>Data Pegawai</h2>

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
      <label>Jabatan *</label>

      <input
        type="text"
        placeholder="Masukkan Jabatan"
      />
    </div>

    <div className="form-group">
      <label>Unit / Satuan Kerja Asal *</label>

      <input
        type="text"
        placeholder="Masukkan Unit Kerja"
      />
    </div>

  </div>

</div>
      {/* UPLOAD */}

      <div className="upload-card">

        <div className="upload-header">
          <span></span>
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
            dokumen persyaratan mutasi.
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

      <div className="submit-wrapper">

        <button className="submit-btn">
          Ajukan Permohonan
        </button>

      </div>

    </div>
  );
}

export default MutasiInternal;