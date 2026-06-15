import "./PengaktifanKembali.css";
import { useNavigate } from "react-router-dom";

function PengaktifanKembali() {
  const navigate = useNavigate();

  return (
    <div className="pengaktifan-page">

      <button
        className="back-button"
        onClick={() => navigate("/kepegawaian/rekomendasi")}
      >
        ← Kembali
      </button>

      {/* HEADER */}

      <div className="page-header">

        <div className="header-icon">
          🔄
        </div>

        <div>
          <h1>Pengaktifan Kembali Jabatan Fungsional</h1>

          <p>
            Pengajuan pengaktifan kembali jabatan fungsional
            bagi pegawai yang telah memenuhi ketentuan sesuai
            peraturan yang berlaku.
          </p>
        </div>

      </div>

      {/* STEPPER */}

      <div className="stepper">

        <div className="step active">
          <div className="step-number">1</div>
          <span>Data Pegawai</span>
        </div>

        <div className="step">
          <div className="step-number">2</div>
          <span>Pengajuan</span>
        </div>

        <div className="step">
          <div className="step-number">3</div>
          <span>Dokumen</span>
        </div>

        <div className="step">
          <div className="step-number">4</div>
          <span>Selesai</span>
        </div>

      </div>

      {/* DATA PEGAWAI */}

      <div className="form-card">

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
            <label>Pangkat / Golongan</label>

            <input
              type="text"
              placeholder="Contoh: Penata Tingkat I (III/d)"
            />
          </div>

          <div className="form-group">
            <label>Jabatan Fungsional</label>

            <input
              type="text"
              placeholder="Masukkan Jabatan Fungsional"
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
            <label>Nomor HP</label>

            <input
              type="text"
              placeholder="Masukkan Nomor HP"
            />
          </div>

        </div>

      </div>

      {/* DATA PENGAJUAN */}

      <div className="form-card">

        <h2>Data Pengajuan</h2>

        <div className="form-grid">

          <div className="form-group">
            <label>Tanggal Pengaktifan Kembali</label>

            <input
              type="date"
              className="modern-input"
            />
          </div>

          <div className="form-group">
            <label>Nomor SK Pemberhentian Sementara</label>

            <input
              type="text"
              placeholder="Masukkan Nomor SK"
            />
          </div>

          <div className="form-group">
            <label>Tanggal SK Pemberhentian</label>

            <input
              type="date"
              className="modern-input"
            />
          </div>

          <div className="form-group">
            <label>Dasar Pengaktifan Kembali</label>

            <select className="modern-select">
              <option>Pilih Dasar Pengaktifan</option>
              <option>Selesai Tugas Belajar</option>
              <option>Selesai CLTN</option>
              <option>Kembali dari Penugasan</option>
              <option>Selesai Hukuman Disiplin</option>
              <option>Lainnya</option>
            </select>

          </div>

        </div>

        <div className="form-group full-width">

          <label>Keterangan Pengajuan</label>

          <textarea
            rows="5"
            placeholder="Jelaskan alasan dan dasar pengajuan pengaktifan kembali"
          />

        </div>

      </div>

      {/* UPLOAD DOKUMEN */}

      <div className="form-card">

        <h2>Upload Dokumen</h2>

        <div className="upload-grid">

          <div className="upload-area">
            <div className="upload-icon">📄</div>

            <label htmlFor="surat">
              Surat Permohonan
            </label>

            <input
              id="surat"
              type="file"
            />

            <span>PDF Maks. 10 MB</span>
          </div>

          <div className="upload-area">
            <div className="upload-icon">📑</div>

            <label htmlFor="sksementara">
              SK Pemberhentian
            </label>

            <input
              id="sksementara"
              type="file"
            />

            <span>PDF Maks. 10 MB</span>
          </div>

          <div className="upload-area">
            <div className="upload-icon">📋</div>

            <label htmlFor="skpangkat">
              SK Pangkat Terakhir
            </label>

            <input
              id="skpangkat"
              type="file"
            />

            <span>PDF Maks. 10 MB</span>
          </div>

          <div className="upload-area">
            <div className="upload-icon">🗂️</div>

            <label htmlFor="skjabatan">
              SK Jabatan Terakhir
            </label>

            <input
              id="skjabatan"
              type="file"
            />

            <span>PDF Maks. 10 MB</span>
          </div>

          <div className="upload-area">
            <div className="upload-icon">📎</div>

            <label htmlFor="pendukung">
              Dokumen Pendukung
            </label>

            <input
              id="pendukung"
              type="file"
            />

            <span>PDF Maks. 10 MB</span>
          </div>

        </div>

      </div>

      {/* PERNYATAAN */}

      <div className="form-card">

        <label className="checkbox-wrapper">

          <input type="checkbox" />

          <span>
            Saya menyatakan bahwa data dan dokumen yang
            diunggah adalah benar dan dapat
            dipertanggungjawabkan.
          </span>

        </label>

      </div>

      {/* BUTTON */}

      <div className="button-group">

        <button className="draft-btn">
          Simpan Draft
        </button>

        <button className="submit-btn">
          Ajukan Permohonan
        </button>

      </div>

    </div>
  );
}

export default PengaktifanKembali;