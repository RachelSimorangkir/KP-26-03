import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./StatusHelpdesk.css";

export default function StatusHelpdesk() {
  const navigate = useNavigate();

  // Mock data - nanti diganti dengan data dari API
  const [tiketList, setTiketList] = useState([
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

  // Fungsi untuk menentukan class badge status
  const getStatusClass = (status) => {
    const statusMap = {
      "Baru": "badge-baru",
      "Diproses": "badge-diproses",
      "Menunggu Respon": "badge-menunggu-respon",
      "Selesai": "badge-selesai",
      "Ditutup": "badge-ditutup",
    };
    return statusMap[status] || "badge-baru";
  };

  // Fungsi untuk format tanggal
  const formatTanggal = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="rekom-page">
      {/* BACK BUTTON */}
      <div className="rekom-header">
        <button
          className="back-button"
          onClick={() => navigate("/humasdata/helpdesk")}
        >
          ← Kembali
        </button>
      </div>

      {/* BANNER */}
      <section className="service-banner">
        <div className="banner-icon">📑</div>
        <div className="service-banner-content">
          <h1>Daftar & Detail Tiket Saya</h1>
          <p>
            Pantau status tiket bantuan teknis yang pernah Anda ajukan.
          </p>
        </div>
      </section>

      {/* ACTION BUTTON */}
      <div className="action-header">
        <button
          className="btn-primary"
          onClick={() => navigate("/humasdata/helpdesk/FormHelpdesk")}
        >
          + Buat Tiket Baru
        </button>
      </div>

      {/* DAFTAR TIKET */}
      {tiketList.length === 0 ? (
        <section className="description-card empty-state">
          <h2>Belum Ada Tiket</h2>
          <p>Anda belum pernah mengajukan tiket bantuan. Klik tombol di atas untuk membuat tiket baru.</p>
        </section>
      ) : (
        <div className="tiket-list">
          {tiketList.map((tiket) => (
            <div key={tiket.id} className="tiket-card">
              {/* Header Card */}
              <div className="tiket-header">
                <div className="tiket-title-section">
                  <div className="tiket-id-row">
                    <span className="tiket-id">{tiket.id}</span>
                    <span className={`badge ${getStatusClass(tiket.statusTiket)}`}>
                      {tiket.statusTiket}
                    </span>
                  </div>
                  <h3>{tiket.judulMasalah}</h3>
                  <div className="tiket-meta">
                    <span className="meta-item">
                      <span className="meta-label">Aplikasi:</span>
                      <span>{tiket.namaAplikasi}</span>
                    </span>
                    <span className="meta-item">
                      <span className="meta-label">Kategori:</span>
                      <span>{tiket.kategori}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Info Timeline */}
              <div className="timeline-section">
                <div className="timeline-item">
                  <span className="timeline-icon">📅</span>
                  <div className="timeline-content">
                    <span className="timeline-label">Tanggal Lapor:</span>
                    <span className="timeline-value">{formatTanggal(tiket.tanggalLapor)}</span>
                  </div>
                </div>
                <div className="timeline-item">
                  <span className="timeline-icon">🔄</span>
                  <div className="timeline-content">
                    <span className="timeline-label">Update Terakhir:</span>
                    <span className="timeline-value">{formatTanggal(tiket.tanggalUpdate)}</span>
                  </div>
                </div>
              </div>

              {/* Petugas Penanggung Jawab */}
              {tiket.petugasPJ !== "-" && (
                <div className="info-row">
                  <span className="info-label">👤 Petugas Penanggung Jawab:</span>
                  <span className="info-value">{tiket.petugasPJ}</span>
                </div>
              )}

              {/* Tanggapan/Solusi dari Petugas */}
              {tiket.tanggapanSolusi && (
                <div className="tanggapan-section">
                  <div className="tanggapan-header">
                    <span className="tanggapan-icon">💬</span>
                    <span className="tanggapan-title">Tanggapan/Solusi dari Petugas:</span>
                  </div>
                  <p className="tanggapan-content">{tiket.tanggapanSolusi}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}