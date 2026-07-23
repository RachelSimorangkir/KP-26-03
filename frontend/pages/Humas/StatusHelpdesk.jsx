import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./StatusHelpdesk.css";

export default function StatusHelpdesk() {
  const navigate = useNavigate();

  // Mock data
  const [tiketList] = useState([
    {
      id: "TKT-2024-001",
      namaAplikasi: "SIMPEG - Sistem Informasi Kepegawaian",
      kategori: "Error Sistem",
      judulMasalah: "Tidak bisa login ke SIMPEG",
      tanggalLapor: "2024-06-20",
      tanggalUpdate: "2024-06-21",
      statusTiket: "Selesai",
      petugasPJ: "Budi Santoso, S.Kom",
      tanggapanSolusi: "Masalah telah diperbaiki. Silakan clear cache browser dan coba login kembali. Jika masih bermasalah, hubungi kami kembali.",
    },
    {
      id: "TKT-2024-002",
      namaAplikasi: "SIKA - Sistem Informasi Keuangan",
      kategori: "Reset Password",
      judulMasalah: "Lupa password SIKA",
      tanggalLapor: "2024-06-18",
      tanggalUpdate: "2024-06-19",
      statusTiket: "Diproses",
      petugasPJ: "Siti Aminah, M.Pd",
      tanggapanSolusi: "Password reset sedang dalam proses. Kami akan mengirimkan link reset ke email Anda dalam 1x24 jam.",
    },
    {
      id: "TKT-2024-003",
      namaAplikasi: "Portal Internal Bimas Kristen",
      kategori: "Permintaan Akses",
      judulMasalah: "Meminta akses modul laporan",
      tanggalLapor: "2024-06-15",
      tanggalUpdate: "2024-06-16",
      statusTiket: "Menunggu Respon",
      petugasPJ: "Ahmad Fauzi, S.Pd",
      tanggapanSolusi: "Mohon konfirmasi apakah Anda sudah memiliki izin dari atasan untuk akses modul ini?",
    },
    {
      id: "TKT-2024-004",
      namaAplikasi: "E-Office - Aplikasi Persuratan",
      kategori: "Bug",
      judulMasalah: "File PDF tidak bisa di-download",
      tanggalLapor: "2024-06-10",
      tanggalUpdate: "2024-06-12",
      statusTiket: "Ditutup",
      petugasPJ: "Dewi Lestari, S.Kom",
      tanggapanSolusi: "Bug telah diperbaiki pada versi terbaru. Silakan update aplikasi Anda.",
    },
    {
      id: "TKT-2024-005",
      namaAplikasi: "Sistem Informasi BMN",
      kategori: "Pelatihan",
      judulMasalah: "Meminta panduan penggunaan aplikasi BMN",
      tanggalLapor: "2024-06-22",
      tanggalUpdate: "2024-06-22",
      statusTiket: "Baru",
      petugasPJ: "-",
      tanggapanSolusi: "",
    },
  ]);

  const getStatusClass = (status) => {
    // Memetakan status ke class badge yang konsisten dengan halaman lain
    const statusMap = {
      "Baru": "badge-menunggu",
      "Menunggu Respon": "badge-menunggu",
      "Diproses": "badge-diproses",
      "Selesai": "badge-selesai",
      "Ditutup": "badge-ditolak",
    };
    return statusMap[status] || "badge-menunggu";
  };

  const formatTanggal = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

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
            <div key={tiket.id} className="tiket-card">
              
              {/* 1. Card Header: ID, Judul & Meta */}
              <div className="card-header">
                <div className="header-left">
                  <span className="tiket-id">{tiket.id}</span>
                  <h3 className="card-title">{tiket.judulMasalah}</h3>
                </div>
                <div className="card-meta">
                  <span className="meta-item">
                    <span className="meta-label">Aplikasi:</span> {tiket.namaAplikasi}
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
                    <span className={`badge ${getStatusClass(tiket.statusTiket)}`}>
                      {tiket.statusTiket}
                    </span>
                  </div>
                  {tiket.petugasPJ !== "-" && (
                    <div className="status-box">
                      <span className="status-label">Petugas Penanggung Jawab</span>
                      <span className="info-value">👤 {tiket.petugasPJ}</span>
                    </div>
                  )}
                </div>

                <div className="timeline-compact">
                  <span>📅 Lapor: {formatTanggal(tiket.tanggalLapor)}</span>
                  <span>🔄 Update Terakhir: {formatTanggal(tiket.tanggalUpdate)}</span>
                </div>

                {/* 3. Tanggapan/Solusi (Muncul jika ada) */}
                {tiket.tanggapanSolusi && (
                  <div className={`catatan-box ${tiket.statusTiket === "Selesai" ? "catatan-success" : "catatan-info"}`}>
                    <div className="catatan-header">
                      <span className="catatan-icon">💬</span>
                      <strong>Tanggapan / Solusi dari Petugas</strong>
                    </div>
                    <p>{tiket.tanggapanSolusi}</p>
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