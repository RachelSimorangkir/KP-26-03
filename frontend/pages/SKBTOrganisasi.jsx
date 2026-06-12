import "./SKBTOrganisasi.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function SKBTOrganisasi() {
  const navigate = useNavigate();

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <div className="skbt-organisasi-page">

      <button
        className="back-button"
        onClick={() => navigate("/kepegawaian/skbt")}
      >
        ← Kembali
      </button>

      {/* HEADER */}
      <div className="page-header">

        <div className="header-icon">
          📋
        </div>

        <div className="header-text">
          <h1>Pengajuan SKBT Organisasi</h1>

          <p>
            Lengkapi data berikut untuk mengajukan
            Surat Keterangan Bebas Temuan (SKBT).
          </p>
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
            <label>Unit Kerja</label>
            <input
              type="text"
              placeholder="Masukkan Unit Kerja"
            />
          </div>

          <div className="form-group">
            <label>Jabatan</label>
            <input
              type="text"
              placeholder="Masukkan Jabatan"
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Masukkan Email"
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

      {/* KEPERLUAN */}
      <div className="form-card">

        <h2>Keperluan Pengajuan</h2>

        <div className="form-group">

          <label>Keperluan SKBT</label>

          <textarea
            rows="5"
            placeholder="Jelaskan keperluan pengajuan SKBT"
          />

        </div>

      </div>

      {/* UPLOAD */}
      <div className="form-card">

        <h2>Upload Dokumen</h2>

        <div className="upload-grid">

          <div className="upload-box">
            <label>SK Pengangkatan</label>
            <input type="file" />
          </div>

          <div className="upload-box">
            <label>Surat Permohonan</label>
            <input type="file" />
          </div>

          <div className="upload-box">
            <label>Dokumen Pendukung</label>
            <input type="file" />
          </div>

        </div>

      </div>

      {/* BUTTON */}
      <div className="button-group">

        <button className="draft-btn">
          Simpan Draft
        </button>

        <button
          className="submit-btn"
          onClick={handleSubmit}
        >
          Ajukan SKBT
        </button>

      </div>

      {/* TIMELINE */}
      {submitted && (
        <div className="tracking-card">

          <h2>Status Pengajuan SKBT</h2>

          <div className="timeline">

            <div className="timeline-item completed">
              <div className="timeline-dot"></div>

              <div className="timeline-content">
                <h4>Status Diajukan</h4>
                <span>Pengajuan berhasil dibuat</span>
              </div>
            </div>

            <div className="timeline-item pending">
              <div className="timeline-dot"></div>

              <div className="timeline-content">
                <h4>Verifikator 1</h4>
                <span>Menunggu verifikasi</span>
              </div>
            </div>

            <div className="timeline-item pending">
              <div className="timeline-dot"></div>

              <div className="timeline-content">
                <h4>Verifikator 2</h4>
                <span>Menunggu verifikasi</span>
              </div>
            </div>

            <div className="timeline-item pending">
              <div className="timeline-dot"></div>

              <div className="timeline-content">
                <h4>Verifikator Kabag</h4>
                <span>Belum diproses</span>
              </div>
            </div>

            <div className="timeline-item pending">
              <div className="timeline-dot"></div>

              <div className="timeline-content">
                <h4>Penandatangan</h4>
                <span>Belum diproses</span>
              </div>
            </div>

            <div className="timeline-item pending">
              <div className="timeline-dot"></div>

              <div className="timeline-content">
                <h4>Selesai</h4>
                <span>Menunggu penyelesaian</span>
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default SKBTOrganisasi;