import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./StatusPermohonan.css";

export default function StatusPermohonan() {
  const navigate = useNavigate();

  // ✅ REV 9: Hapus mock data, gunakan array kosong
  const [permohonanList, setPermohonanList] = useState([]);

  useEffect(() => {

    const currentUser =
        JSON.parse(localStorage.getItem("currentUser") || "{}");

    console.log(currentUser);

    axios
        .get(
            `http://localhost:8080/api/ppid/user/${currentUser.nip}`
        )
        .then((res) => {

            console.log("DATA DARI API");

            console.log(res.data);

            setPermohonanList(res.data.data || []);

        })
        .catch((err) => {

            console.log(err);

        });

}, []);

  const getStatusText = (status) => {
    switch ((status || "").toLowerCase()) {
      case "baru":
        return "BARU";
      case "diproses":
        return "DIPROSES";
      case "selesai":
        return "SELESAI";
      case "ditolak":
        return "DITOLAK";
      case "mediasi":
        return "MEDIASI";
      default:
        return "-";
    }
  }; // ✅ REV 1 & 2: Hapus } ekstra di sini agar fungsi berikutnya tetap di dalam komponen

  const getStatusPPIDClass = (status) => {
    switch ((status || "").toLowerCase()) {
      case "baru":
        return "badge-diajukan";
      case "diproses":
        return "badge-diproses";
      case "mediasi":
        return "badge-mediasi";
      case "selesai":
        return "badge-selesai";
      case "ditolak":
        return "badge-ditolak";
      default:
        return "badge-diajukan";
    }
  };

  // ✅ REV 3: getCatatanBoxClass memakai status lowercase
  const getCatatanBoxClass = (status) => {
    switch ((status || "").toLowerCase()) {
      case "selesai":
        return "catatan-success";
      case "ditolak":
        return "catatan-danger";
      default:
        return "catatan-info";
    }
  };

  const formatTanggal = (dateStr) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="rekom-page status-permohonan-page">
      {/* BACK BUTTON */}
      <button className="btn-back" onClick={() => navigate("/humasdata/PPID")}>
        ← Kembali ke Layanan PPID
      </button>

      {/* BANNER */}
      <section className="service-banner">
        <div className="service-banner-content">
          <h1>Status Permohonan Saya</h1>
          <p>Pantau status permohonan atau keberatan informasi publik yang pernah Anda ajukan.</p>
        </div>
      </section>

      {/* ACTION HEADER */}
      <div className="action-header">
        <h2>Riwayat Permohonan</h2>
        <button
          className="btn-primary"
          onClick={() => navigate("/humasdata/PPID/Permohonan")}
        >
          + Ajukan Permohonan Baru
        </button>
      </div>

      {/* DAFTAR PERMOHONAN */}
      {permohonanList.length === 0 ? (
        <section className="empty-state-card">
          <div className="empty-icon">📭</div>
          <h3>Belum Ada Permohonan</h3>
          <p>
            Anda belum pernah mengajukan permohonan/keberatan. Klik tombol di
            atas untuk memulai.
          </p>
        </section>
      ) : (
        <div className="permohonan-list">
          {permohonanList.map((item) => (
            <div key={item.id || item.nomor_registrasi} className="permohonan-card">
              
              {/* 1. Card Header: ID, Jenis & Uraian */}
              <div className="card-header">
                <div className="header-left">
                  <span className="permohonan-id">
                    {item.nomor_registrasi || `REG-${item.id}`}
                  </span>
                  {/* ✅ REV 10: Judul Card menjadi jenis_permohonan, uraian jadi paragraf */}
                  <h3 className="card-title">{item.jenis_permohonan}</h3>
                  <p
                    className="uraian-preview"
                    style={{
                      fontSize: "14px",
                      color: "#64748b",
                      marginTop: "4px",
                      fontWeight: "400",
                      lineHeight: "1.5",
                    }}
                  >
                    {item.uraian_permohonan}
                  </p>
                </div>
              </div>

              {/* 2. Card Body: Status & Timeline */}
              <div className="card-body">
                <div className="status-grid">
                  <div className="status-box">
                    <span className="status-label">Status Permohonan PPID</span>
                    <span className={`badge ${getStatusPPIDClass(item.status)}`}>
                      {getStatusText(item.status)}
                    </span>
                  </div>
                </div>

                <div className="timeline-compact">
                  <span>📅 Diajukan: {formatTanggal(item.created_at)}</span>
                  {/* ✅ REV 7: Ganti tanggalPutusan menjadi processed_at */}
                  <span>⚖️ Putusan: {formatTanggal(item.processed_at)}</span>
                </div>

                {/* ✅ REV 6: Kondisi petugas disederhanakan, selalu tampil */}
                <div className="info-row">
                  <span className="info-icon">👤</span>
                  <div>
                    <span className="info-label">Petugas PPID:</span>
                    <span className="info-value">
                      {item.petugas_ppid || "Belum ditugaskan"}
                    </span>
                  </div>
                </div>

                {/* 3. Tanggapan/Putusan */}
                {/* ✅ REV 4: Ganti item.statusPPID menjadi item.status */}
                {item.tanggapan && (
                  <div className={`catatan-box ${getCatatanBoxClass(item.status)}`}>
                    <div className="catatan-header">
                      <span className="catatan-icon">💬</span>
                      <strong>Tanggapan / Putusan PPID</strong>
                    </div>
                    <p>{item.tanggapan}</p>
                  </div>
                )}

                {/* 4. File Lampiran */}
                {/* ✅ REV 5 & 8: Ganti fileSurat mock menjadi lampiran dengan link langsung */}
                {item.lampiran && (
                  <div className="file-result-box">
                    <div className="file-icon-large">📄</div>
                    <div className="file-details">
                      <span className="file-name">Lampiran Permohonan</span>
                    </div>
                    <a
                      href={`http://localhost:8080/${item.lampiran}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-download"
                    >
                      ⬇️ Lihat Lampiran
                    </a>
                  </div>
                )}
                {/* Surat Balasan */}
{item.surat_balasan &&
  (item.status === "selesai" || item.status === "ditolak") && (
    <div className="file-result-box">
      <div className="file-icon-large">📄</div>

      <div className="file-details">
        <span className="file-name">Surat Balasan PPID</span>
      </div>

      <a
        href={`http://localhost:8080/${item.surat_balasan}`}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-download"
      >
        ⬇️ Unduh Surat Balasan
      </a>
    </div>
)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}