import "./KenaikanPangkat.css";

export default function KenaikanPangkat() {
  return (
    <div className="kp-container">

      <button className="back-btn">
        ← Kembali ke Menu
      </button>

      {/* HEADER HIJAU */}
      <div className="header-card">
        <div className="header-icon">📈</div>

        <div>
          <h1>Usul Kenaikan Pangkat</h1>
          <p>
            Sekretariat BMBPSDM Kementerian Agama RI
          </p>
        </div>
      </div>

      {/* PANDUAN */}
      <div className="guide-card">
        <h3>📋 Panduan Pengajuan Kenaikan Pangkat</h3>

        <ol>
          <li>
            Pengajuan dilakukan <b>satu bulan sebelum</b> periode kenaikan
          </li>

          <li>
            Siapkan dokumen persyaratan dalam format PDF lalu jadikan satu file
            RAR
          </li>

          <li>
            Isi form di bawah dengan lengkap lalu upload file RAR
          </li>
        </ol>
      </div>

      {/* INFORMASI */}
      <div className="info-card">
        <p>
          Kenaikan pangkat adalah penghargaan yang diberikan atas prestasi kerja
          dan pengabdian Pegawai Negeri Sipil terhadap Negara.
        </p>

        <a href="#">
          Surat Pemberitahuan Kenaikan Pangkat 2024
        </a>
      </div>

      {/* DATA PEGAWAI */}
      <div className="section-card">
        <h2>👤 Data Pegawai</h2>

        <div className="tips-box">
          💡 Tips: Ketik NIP lalu klik tombol Cari untuk mengambil data pegawai
          otomatis dari SIMPEG
        </div>

        <div className="form-grid">
          <div>
            <label>NIP *</label>
            <div className="nip-group">
              <input placeholder="Ketik NIP pegawai" />
              <button>Cari</button>
            </div>
          </div>

          <div>
            <label>Nama + Gelar Akademik *</label>
            <input placeholder="Nama akan terisi otomatis dari SIMPEG" />
          </div>
        </div>
      </div>

      {/* DETAIL */}
      <div className="section-card">
        <h2>📊 Detail Kenaikan Pangkat</h2>

        <div className="form-grid">
          <div>
            <label>Periode Kenaikan Pangkat *</label>

            <select>
              <option>-- Pilih Periode --</option>
            </select>
          </div>

          <div>
            <label>Jenis Kenaikan Pangkat *</label>

            <select>
              <option>-- Pilih Jenis --</option>
            </select>
          </div>
        </div>
      </div>

      {/* PANGKAT LAMA */}
      <div className="section-card">
        <h2>⬇️ Pangkat / Golongan Lama</h2>

        <div className="form-grid">
          <div>
            <label>Pangkat Lama *</label>

            <select>
              <option>-- Pilih Pangkat Lama --</option>
            </select>
          </div>

          <div>
            <label>TMT Pangkat Lama *</label>

            <input type="date" />
          </div>
        </div>
      </div>

      {/* PANGKAT BARU */}
      <div className="section-card">
        <h2>⬆️ Pangkat / Golongan Baru (Usulan)</h2>

        <div className="form-grid">
          <div>
            <label>Pangkat Baru *</label>

            <select>
              <option>-- Pilih Pangkat Baru --</option>
            </select>
          </div>

          <div>
            <label>TMT Pangkat Baru *</label>

            <input type="date" />
          </div>
        </div>
      </div>

      {/* JABATAN */}
      <div className="section-card">
        <h2>🏢 Jabatan & Unit Kerja</h2>

        <div className="form-grid">
          <div>
            <label>Jabatan *</label>
            <input placeholder="Masukkan jabatan" />
          </div>

          <div>
            <label>Unit Kerja *</label>
            <input placeholder="Masukkan unit kerja" />
          </div>
        </div>
      </div>

      {/* UPLOAD */}
      <div className="section-card">
        <h2>📁 Upload Berkas Persyaratan</h2>

        <label className="upload-box">
          <input type="file" hidden />

          <div className="upload-content">
            📦
            <p>
              Klik untuk upload file <b>RAR</b>
            </p>

            <span>Maksimal 10MB</span>
          </div>
        </label>
      </div>

      <button className="submit-btn">
        📤 Kirim Usul Kenaikan Pangkat
      </button>
    </div>
  );
}