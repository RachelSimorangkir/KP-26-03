import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DaftarPengajuan.css";

export default function DaftarPengajuan() {
  const navigate = useNavigate();

  // Mock data
  const [pengajuanList] = useState([
    {
      id: 1,
      judul: "Pelatihan Guru Kristen 2024",
      tanggalPengajuan: "2024-06-20",
      tanggalTerbit: "2024-06-25",
      statusAtasan: "Disetujui",
      statusHumas: "Terbit",
      catatanRevisi: "",
    },
    {
      id: 2,
      judul: "Kegiatan Sosial Bakti Sosial",
      tanggalPengajuan: "2024-06-18",
      tanggalTerbit: null,
      statusAtasan: "Disetujui",
      statusHumas: "Diterima",
      catatanRevisi: "",
    },
    {
      id: 3,
      judul: "Rapat Koordinasi Keagamaan",
      tanggalPengajuan: "2024-06-15",
      tanggalTerbit: null,
      statusAtasan: "Menunggu",
      statusHumas: "Menunggu",
      catatanRevisi: "",
    },
    {
      id: 4,
      judul: "Workshop Pendidikan Kristen",
      tanggalPengajuan: "2024-06-10",
      tanggalTerbit: null,
      statusAtasan: "Revisi",
      statusHumas: "Revisi",
      catatanRevisi: "Judul terlalu panjang, mohon dipersingkat. Tambahkan foto kegiatan lebih banyak.",
    },
  ]);

  const getStatusBadgeClass = (status) => {
    const statusMap = {
      Menunggu: "badge-menunggu",
      Disetujui: "badge-disetujui",
      Diterima: "badge-diterima",
      Ditolak: "badge-ditolak",
      Revisi: "badge-revisi",
      Terbit: "badge-terbit",
    };
    return statusMap[status] || "badge-menunggu";
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="rekom-page daftar-pengajuan-page">
      {/* BACK BUTTON */}
      <button className="btn-back" onClick={() => navigate("/humasdata/publikasi")}>
        ← Kembali ke Layanan Publikasi
      </button>

      {/* BANNER */}
      <section className="service-banner">
        <div className="service-banner-content">
          <h1>Daftar Pengajuan Saya</h1>
          <p>Pantau status pengajuan publikasi berita kegiatan Anda secara real-time di sini.</p>
        </div>
      </section>

      {/* ACTION HEADER */}
      <div className="action-header">
        <h2>Riwayat Pengajuan</h2>
        <button
          className="btn-primary"
          onClick={() => navigate("/humasdata/publikasi/form-pengajuan")}
        >
          + Ajukan Publikasi Baru
        </button>
      </div>

      {/* DAFTAR PENGAJUAN */}
      {pengajuanList.length === 0 ? (
        <section className="empty-state-card">
          <div className="empty-icon">📭</div>
          <h3>Belum Ada Pengajuan</h3>
          <p>Anda belum membuat pengajuan publikasi. Klik tombol di atas untuk memulai.</p>
        </section>
      ) : (
        <div className="pengajuan-list">
          {pengajuanList.map((item) => (
            <div key={item.id} className="pengajuan-card">
              {/* Card Header */}
              <div className="card-header">
                <h3 className="card-title">{item.judul}</h3>
                <div className="card-meta">
                  <span className="meta-item">
                    <span className="meta-label">Diajukan:</span> {formatDate(item.tanggalPengajuan)}
                  </span>
                  {item.tanggalTerbit && (
                    <span className="meta-item highlight">
                      <span className="meta-label">Terbit:</span> {formatDate(item.tanggalTerbit)}
                    </span>
                  )}
                </div>
              </div>

              {/* Card Body: Status */}
              <div className="card-body">
                <div className="status-grid">
                  <div className="status-box">
                    <span className="status-label">Status Atasan</span>
                    <span className={`badge ${getStatusBadgeClass(item.statusAtasan)}`}>
                      {item.statusAtasan}
                    </span>
                  </div>
                  <div className="status-box">
                    <span className="status-label">Status Humas</span>
                    <span className={`badge ${getStatusBadgeClass(item.statusHumas)}`}>
                      {item.statusHumas}
                    </span>
                  </div>
                </div>

                {/* Catatan Revisi (Muncul hanya jika ada) */}
                {item.catatanRevisi && (
                  <div className="catatan-revisi-box">
                    <div className="revisi-header">
                      <span className="revisi-icon">📝</span>
                      <strong>Catatan Revisi dari Admin</strong>
                    </div>
                    <p>{item.catatanRevisi}</p>
                  </div>
                )}
              </div>

              {/* Card Footer: Actions */}
              <div className="card-footer">
                {(item.statusAtasan === "Revisi" || item.statusHumas === "Revisi") && (
                  <button
                    className="btn-edit"
                    onClick={() => navigate(`/humasdata/publikasi/form-pengajuan/${item.id}`)}
                  >
                    ✏️ Edit & Ajukan Ulang
                  </button>
                )}
                <button className="btn-detail">Lihat Detail Lengkap →</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}