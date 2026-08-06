import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./StatusHelpdesk.css";

export default function StatusHelpdesk() {
  const navigate = useNavigate();

  // ✅ REVISI 1: Hapus mock data, gunakan array kosong
  const [tiketList, setTiketList] = useState([]);

  // ✅ REVISI 2: Ambil nip dari localStorage dengan aman
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const nip = user?.nip;

  // ✅ REVISI 3: getStatusClass menggunakan lowercase sesuai database
  const getStatusClass = (status) => {
    const statusMap = {
      baru: "badge-menunggu",
      diproses: "badge-diproses",
      selesai: "badge-selesai",
      ditolak: "badge-ditolak",
    };
    return statusMap[status] || "badge-menunggu";
  };

  const formatTanggal = (dateStr) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // ✅ REVISI 2 & 3: Floating 'await' dihapus, hanya ada di dalam fungsi async ini
  const loadTiket = async () => {
    if (!nip) return; // Mencegah request jika nip tidak ditemukan
    
    try {
      const res = await axios.get(
        `http://localhost:8080/api/helpdesk/user/${nip}`
      );
      setTiketList(res.data.data || []);
    } catch (err) {
      console.error("Gagal memuat tiket:", err);
    }
  };

  useEffect(() => {
    if (nip) {
      loadTiket();
    }
  }, [nip]);

  return (
    <div className="rekom-page status-helpdesk-page">
      {/* BACK BUTTON */}
      <button className="btn-back" onClick={() => navigate("/humasdata/helpdesk")}>
        ← Kembali ke Layanan Helpdesk
      </button>

      {/* BANNER */}
      <section className="service-banner">
        <div className="service-banner-content">
          <h1>Daftar & Detail Tiket Saya</h1>
          <p>Pantau status dan tanggapan untuk setiap tiket bantuan teknis yang pernah Anda ajukan.</p>
        </div>
      </section>

      {/* ACTION HEADER */}
      <div className="action-header">
        <h2>Riwayat Tiket Bantuan</h2>
        <button className="btn-primary" onClick={() => navigate("/humasdata/helpdesk/FormHelpdesk")}>
          + Buat Tiket Baru
        </button>
      </div>

      {/* DAFTAR TIKET */}
      {tiketList.length === 0 ? (
        <section className="empty-state-card">
          <div className="empty-icon">📭</div>
          <h3>Belum Ada Tiket</h3>
          <p>Anda belum pernah mengajukan tiket bantuan. Klik tombol di atas untuk membuat tiket baru.</p>
        </section>
      ) : (
        <div className="tiket-list">
          {tiketList.map((tiket) => (
            <div key={tiket.nomor_tiket} className="tiket-card">
              
              {/* 1. Card Header: ID, Judul & Meta */}
              <div className="card-header">
                <div className="header-left">
                  <span className="tiket-id">TKT-{new Date(tiket.created_at).getFullYear()}-{String(tiket.id).padStart(4, "0")}</span>
                  <h3 className="card-title">{tiket.judul_masalah}</h3>
                </div>
                <div className="card-meta">
                  <span className="meta-item">
                    <span className="meta-label">Aplikasi:</span> {tiket.nama_aplikasi}
                  </span>
                  <span className="meta-item">
                    <span className="meta-label">Kategori:</span> {tiket.kategori}
                  </span>
                </div>
              </div>

              {/* 2. Card Body: Status, Petugas & Timeline */}
              <div className="card-body">
                <div className="status-grid">
                  <div className="status-box">
                    <span className="status-label">Status Tiket</span>
                    <span className={`badge ${getStatusClass(tiket.status)}`}>
                      {tiket.status.toUpperCase()}
                    </span>
                  </div>
                  {tiket.petugas_pj && (
                    <div className="status-box">
                    <span className="status-label">Petugas Penanggung Jawab</span>
                    <span className="info-value">👤 {tiket.petugas_pj}</span>
                    </div>
                 )}
                </div>

                <div className="timeline-compact">
                  <span>📅 Lapor: {formatTanggal(tiket.created_at)}</span>
                  <span>🔄 Update Terakhir: {formatTanggal(tiket.updated_at)}</span>
                </div>

                {/* 3. Tanggapan/Solusi (Muncul jika ada) */}
                {tiket.tanggapan && (
                  <div className={`catatan-box ${tiket.status === "selesai" ? "catatan-success" : "catatan-info"}`}>
                    <div className="catatan-header">
                      <span className="catatan-icon">💬</span>
                      <strong>Tanggapan / Solusi dari Petugas</strong>
                    </div>
                    <p>{tiket.tanggapan}</p>
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