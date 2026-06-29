import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DaftarPengajuan.css";

export default function DaftarPengajuan() {
  const navigate = useNavigate();

  // Mock data - nanti diganti dengan data dari API
  const [pengajuanList, setPengajuanList] = useState([
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
      Diterima: "badge-disetujui",
      Ditolak: "badge-ditolak",
      Revisi: "badge-revisi",
      Terbit: "badge-terbit",
    };
    return statusMap[status] || "badge-menunggu";
  };

  const handleEdit = (id) => {
    navigate(`/humasdata/publikasi/FormPengajuan/${id}`);
  };

  return (
    <div className="rekom-page">
      {/* BACK BUTTON */}
      <div className="rekom-header">
        <button
          className="back-button"
          onClick={() => navigate("/humasdata/publikasi/form-pengajuan")}  // ✅ Perbaiki path-nya
          >
          ← Kembali
        </button>
      </div>

      {/* BANNER */}
      <section className="service-banner">
        <div className="banner-icon">📋</div>
        <div className="service-banner-content">
          <h1>Daftar Pengajuan Saya</h1>
          <p>
            Pantau status pengajuan publikasi berita kegiatan Anda di sini.
          </p>
        </div>
      </section>

      {/* ACTION BUTTON */}
      <div className="action-header">
        <button
          className="btn-primary"
          onClick={() => navigate("/humasdata/publikasi/form-pengajuan")}  // ✅ Huruf kecil semua
       >
        + Ajukan Publikasi Baru
        </button>
      </div>

      {/* DAFTAR PENGAJUAN */}
      {pengajuanList.length === 0 ? (
        <section className="description-card empty-state">
          <h2>Belum Ada Pengajuan</h2>
          <p>Anda belum membuat pengajuan publikasi. Klik tombol di atas untuk memulai.</p>
        </section>
      ) : (
        <div className="pengajuan-list">
          {pengajuanList.map((item) => (
            <div key={item.id} className="pengajuan-card">
              <div className="pengajuan-header">
                <h3>{item.judul}</h3>
                <div className="pengajuan-meta">
                  <span className="meta-label">Diajukan:</span>
                  <span>{new Date(item.tanggalPengajuan).toLocaleDateString("id-ID")}</span>
                  {item.tanggalTerbit && (
                    <>
                      <span className="meta-label">Terbit:</span>
                      <span>{new Date(item.tanggalTerbit).toLocaleDateString("id-ID")}</span>
                    </>
                  )}
                </div>
              </div>

              <div className="pengajuan-status">
                <div className="status-item">
                  <span className="status-label">Status Atasan:</span>
                  <span className={`badge ${getStatusBadgeClass(item.statusAtasan)}`}>
                    {item.statusAtasan}
                  </span>
                </div>
                <div className="status-item">
                  <span className="status-label">Status Humas:</span>
                  <span className={`badge ${getStatusBadgeClass(item.statusHumas)}`}>
                    {item.statusHumas}
                  </span>
                </div>
              </div>

              {item.catatanRevisi && (
                <div className="catatan-revisi">
                  <strong>📝 Catatan Revisi:</strong>
                  <p>{item.catatanRevisi}</p>
                </div>
              )}

              <div className="pengajuan-actions">
                {(item.statusAtasan === "Revisi" || item.statusHumas === "Revisi") && (
                  <button
                   className="btn-edit"
                    onClick={() => navigate("/humasdata/publikasi/form-pengajuan")}  // ✅ Huruf kecil semua
                  >
                  ✏️ Edit & Ajukan Ulang
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}