import "./DetailPengajuan.css";
import {
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useState } from "react";

export default function DetailPengajuan() {
  const navigate = useNavigate();
  const location = useLocation();

  const data = location.state;

  const dokumen = [
  {
    nama: "Surat Permohonan.pdf",
    file:
      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  },
  {
    nama: "SK Terakhir.pdf",
    file:
      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  },
  {
    nama: "KTP.pdf",
    file:
      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  },
];

  const [status, setStatus] = useState(
    data?.status || "Menunggu"
  );

  const [catatanAdmin, setCatatanAdmin] =
    useState("");

  if (!data) {
    return (
      <div className="detail-page">

        <div className="detail-card">

          <h2>
            Data pengajuan tidak ditemukan
          </h2>

          <button
            className="back-btn"
            onClick={() => navigate("/admin")}
          >
            Kembali
          </button>

        </div>

      </div>
    );
  }

  const handleApprove = () => {
    if (
      window.confirm(
        `Setujui pengajuan ${data.nama}?`
      )
    ) {
      setStatus("Disetujui");

      setCatatanAdmin(
        "Pengajuan telah disetujui oleh admin."
      );
    }
  };

  const handleProcess = () => {
    setStatus("Diproses");

    setCatatanAdmin(
      "Pengajuan sedang diproses oleh admin."
    );
  };

  const handleReject = () => {
    const alasan = prompt(
      "Masukkan alasan penolakan:"
    );

    if (alasan) {
      setStatus("Ditolak");
      setCatatanAdmin(alasan);
    }
  };

  return (
    <div className="detail-page">

      <div className="detail-card">

        {/* HEADER */}
<div className="detail-header">

  <button
    className="back-btn"
    onClick={() => navigate("/admin")}
  >
    ← Kembali
  </button>

  <div className="header-profile">

    <div className="avatar">
      {data.nama?.charAt(0)}
    </div>

    <div className="profile-info">

      <div className="profile-top">

        <div>

          <h1>
            Detail Pengajuan
          </h1>

          <h2>
            {data.nama}
          </h2>

          <p>
            {data.unitKerja || "-"} • {data.tanggal}
          </p>

        </div>

        <span
          className={`status-badge ${
            status === "Menunggu"
              ? "pending"
              : status === "Diproses"
              ? "process"
              : status === "Disetujui"
              ? "approved"
              : "rejected"
          }`}
        >
          {status}
        </span>

      </div>

    </div>

  </div>

</div>

{/* TIMELINE */}
<div className="detail-section">

  <h3>📌 Status Pengajuan</h3>

  <div className="timeline">

    <div className="timeline-item">
      <div className="timeline-dot"></div>

      <div className="timeline-content">
        <h4>Pengajuan Dikirim</h4>
        <p>
          Pengajuan telah masuk ke sistem.
        </p>
      </div>
    </div>

    {(status === "Diproses" ||
      status === "Disetujui") && (
      <div className="timeline-item">
        <div className="timeline-dot"></div>

        <div className="timeline-content">
          <h4>Diproses Admin</h4>
          <p>
            Pengajuan sedang diverifikasi.
          </p>
        </div>
      </div>
    )}

    {status === "Disetujui" && (
      <div className="timeline-item">
        <div className="timeline-dot"></div>

        <div className="timeline-content">
          <h4>Disetujui</h4>
          <p>
            Pengajuan telah disetujui.
          </p>
        </div>
      </div>
    )}

    {status === "Ditolak" && (
      <div className="timeline-item">
        <div
          className="timeline-dot"
          style={{
            background: "#dc2626",
          }}
        ></div>

        <div className="timeline-content">
          <h4>Ditolak</h4>
          <p>
            Pengajuan ditolak oleh admin.
          </p>
        </div>
      </div>
    )}

  </div>

</div>

        {/* DATA PEGAWAI */}
        <div className="detail-section">

          <h3>👤 Data Pegawai</h3>

          <div className="detail-grid">

            <div>
              <label>Nama Pegawai</label>
              <p>{data.nama}</p>
            </div>

            <div>
              <label>NIP</label>
              <p>
                {data.nip || "-"}
              </p>
            </div>

            <div>
              <label>Unit Kerja</label>
              <p>
                {data.unitKerja || "-"}
              </p>
            </div>

            <div>
              <label>Jabatan</label>
              <p>
                {data.jabatan || "-"}
              </p>
            </div>

          </div>

        </div>

        {/* PENGAJUAN */}
        <div className="detail-section">

          <h3>📋 Informasi Pengajuan</h3>

          <div className="detail-grid">

            <div>
              <label>Jenis Layanan</label>
              <p>{data.layanan}</p>
            </div>

            <div>
              <label>Tanggal Pengajuan</label>
              <p>{data.tanggal}</p>
            </div>

          </div>

        </div>

        {/* DOKUMEN */}
<div className="detail-section">

  <h3>📂 Dokumen Pendukung</h3>

  <div className="document-list">

    {dokumen.map((doc, index) => (
      <div
        key={index}
        className="document-card"
      >

        <div className="document-info">

          <div className="document-icon">
            📄
          </div>

          <div>

            <h4>{doc.nama}</h4>

            <p>
              Dokumen pendukung pengajuan
            </p>

          </div>

        </div>

        <div className="document-actions">

          <a
            href={doc.file}
            target="_blank"
            rel="noreferrer"
            className="view-doc-btn"
          >
            👁 Lihat
          </a>

          <a
            href={doc.file}
            download
            className="download-doc-btn"
          >
            ⬇ Download
          </a>

        </div>

      </div>
    ))}

  </div>

</div>

        {/* CATATAN PEMOHON */}
<div className="detail-section">

  <h3>📝 Catatan Pemohon</h3>

  <div className="note-box">

    <strong>
      Keterangan:
    </strong>

    <br />

    Pengajuan layanan
    {" "}
    {data.layanan}
    {" "}
    untuk kebutuhan administrasi
    kepegawaian.

  </div>

</div>

        {/* CATATAN ADMIN */}
        {catatanAdmin && (
          <div className="detail-section">

            <h3>💬 Catatan Admin</h3>

            <div className="admin-note">
              {catatanAdmin}
            </div>

          </div>
        )}

        {/* AKSI */}
<div className="action-buttons">

  <button
    className="reject-btn"
    onClick={handleReject}
    disabled={status === "Ditolak"}
  >
    ❌ Tolak
  </button>

  <button
    className="process-btn"
    onClick={handleProcess}
    disabled={status === "Diproses"}
  >
    ⏳ Proses
  </button>

  <button
    className="approve-btn"
    onClick={handleApprove}
    disabled={status === "Disetujui"}
  >
    ✅ Setujui
  </button>

</div>

      </div>

    </div>
  );
}