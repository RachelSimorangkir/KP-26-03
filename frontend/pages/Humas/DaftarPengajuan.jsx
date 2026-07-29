import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./DaftarPengajuan.css";

export default function DaftarPengajuan() {
  const navigate = useNavigate();

  // Mock data
   const [pengajuanList, setPengajuanList] = useState([]);
   const [loading, setLoading] = useState(true);

   const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  
  
   const loadPengajuan = async () => {
  try {
    if (!currentUser?.nip) return;

    const res = await axios.get(
      `http://localhost:8080/api/berita/user/${currentUser.nip}`
    );

    setPengajuanList(res.data.data || []);
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  loadPengajuan();
}, []);

const getStatusBadgeClass = (status) => {
  const statusMap = {
    menunggu: "badge-menunggu",
    disetujui: "badge-disetujui",
    revisi: "badge-revisi",
    ditolak: "badge-ditolak",
    terbit: "badge-terbit",
  };

  return statusMap[status?.toLowerCase()] || "badge-menunggu";
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
                    <span className="meta-label">Diajukan:</span> {formatDate(item.submitted_at)}
                  </span>
{item.tanggal_terbit && (
  <span className="meta-item highlight">
    <span className="meta-label">Terbit:</span>
    {formatDate(item.tanggal_terbit)}
  </span>
)}
                </div>
              </div>

              {/* Card Body: Status */}
              <div className="card-body">
                <div className="status-grid">
                 <div className="status-box">
                  <span className="status-label">Status Pengajuan</span>
                  <span className={`badge ${getStatusBadgeClass(item.status)}`}>
                   {item.status
                    ? item.status.charAt(0).toUpperCase() + item.status.slice(1)
                    : "-"}
                  </span>
                </div>
              </div>

                {/* Catatan Revisi (Muncul hanya jika ada) */}
                {item.catatan_admin && (
                  <div className="catatan-revisi-box">
                    <div className="revisi-header">
                      <span className="revisi-icon">📝</span>
                      <strong>Catatan Revisi dari Admin</strong>
                    </div>
                    <p>{item.catatan_admin}</p>
                  </div>
                )}
              </div>

              {/* Card Footer: Actions */}
              <div className="card-footer">
{item.status === "revisi" && (
    <button
        className="btn-edit"
        onClick={() =>
            navigate(`/humasdata/publikasi/form-pengajuan/${item.id}`)
        }
    >
        ✏️ Edit & Ajukan Ulang
    </button>
)}
<button
    className="btn-detail"
    onClick={() => navigate(`/humasdata/publikasi/detail-berita/${item.id}`)}
>
    Lihat Detail Lengkap →
</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}