import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./StatusData.css";

export default function StatusData() {
  const navigate = useNavigate();

  // Mock data
  const [permintaanList] = useState([
    {
      id: 1,
      judulPermintaan: "Data Kepegawaian Tahun 2024",
      jenisData: "Data Kepegawaian",
      tanggalPengajuan: "2024-06-20",
      statusAtasan: "Disetujui",
      statusBagianData: "Selesai",
      petugasPengolah: "Budi Santoso, S.Kom",
      fileHasil: { nama: "Data_Kepegawaian_2024.pdf", url: "#", ukuran: "2.5 MB" },
      catatanPengolah: "Data telah diverifikasi dan siap digunakan.",
    },
    {
      id: 2,
      judulPermintaan: "Statistik Pelatihan Semester 1",
      jenisData: "Data Pelatihan",
      tanggalPengajuan: "2024-06-18",
      statusAtasan: "Disetujui",
      statusBagianData: "Diproses",
      petugasPengolah: "Siti Aminah, M.Pd",
      fileHasil: null,
      catatanPengolah: "Sedang dalam proses kompilasi data dari seluruh regional.",
    },
    {
      id: 3,
      judulPermintaan: "Laporan Keuangan Q2 2024",
      jenisData: "Data Keuangan",
      tanggalPengajuan: "2024-06-15",
      statusAtasan: "Menunggu",
      statusBagianData: "Diajukan",
      petugasPengolah: "-",
      fileHasil: null,
      catatanPengolah: "",
    },
    {
      id: 4,
      judulPermintaan: "Data Aset BMN Regional",
      jenisData: "Data Aset/BMN",
      tanggalPengajuan: "2024-06-10",
      statusAtasan: "Ditolak",
      statusBagianData: "Ditolak",
      petugasPengolah: "-",
      fileHasil: null,
      catatanPengolah: "Permintaan ditolak karena data bersifat rahasia. Silakan ajukan surat izin khusus dari pimpinan.",
    },
  ]);

  const getStatusAtasanClass = (status) => {
    const map = { Menunggu: "badge-menunggu", Disetujui: "badge-disetujui", Ditolak: "badge-ditolak" };
    return map[status] || "badge-menunggu";
  };

  const getStatusBagianDataClass = (status) => {
    const map = { Diajukan: "badge-diajukan", Diproses: "badge-diproses", Selesai: "badge-selesai", Ditolak: "badge-ditolak" };
    return map[status] || "badge-diajukan";
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
  };

  const handleDownload = (file) => {
    alert(`Mengunduh file: ${file.nama}\n(Untuk demo, link belum aktif)`);
  };

  return (
    <div className="rekom-page status-data-page">
      {/* BACK BUTTON */}
      <button className="btn-back" onClick={() => navigate("/humasdata/PermintaanData")}>
        ← Kembali ke Layanan Permintaan Data
      </button>

      {/* BANNER */}
      <section className="service-banner">
        <div className="service-banner-content">
          <h1>Status Permintaan Data Saya</h1>
          <p>Pantau progres dan hasil permintaan data internal Anda secara real-time di sini.</p>
        </div>
      </section>

      {/* ACTION HEADER */}
      <div className="action-header">
        <h2>Riwayat Permintaan</h2>
        <button className="btn-primary" onClick={() => navigate("/humasdata/PermintaanData/DataInternal")}>
          + Ajukan Permintaan Data Baru
        </button>
      </div>

      {/* DAFTAR PERMINTAAN */}
      {permintaanList.length === 0 ? (
        <section className="empty-state-card">
          <div className="empty-icon">📭</div>
          <h3>Belum Ada Permintaan Data</h3>
          <p>Anda belum membuat permintaan data. Klik tombol di atas untuk memulai.</p>
        </section>
      ) : (
        <div className="permintaan-list">
          {permintaanList.map((item) => (
            <div key={item.id} className="permintaan-card">
              
              {/* 1. Card Header: Judul & Meta */}
              <div className="card-header">
                <h3 className="card-title">{item.judulPermintaan}</h3>
                <div className="card-meta">
                  <span className="meta-item">
                    <span className="meta-label">Jenis:</span> {item.jenisData}
                  </span>
                  <span className="meta-item">
                    <span className="meta-label">Diajukan:</span> {formatDate(item.tanggalPengajuan)}
                  </span>
                </div>
              </div>

              {/* 2. Card Body: Status & Info */}
              <div className="card-body">
                <div className="status-grid">
                  <div className="status-box">
                    <span className="status-label">Persetujuan Atasan</span>
                    <span className={`badge ${getStatusAtasanClass(item.statusAtasan)}`}>
                      {item.statusAtasan}
                    </span>
                  </div>
                  <div className="status-box">
                    <span className="status-label">Proses Bagian Data</span>
                    <span className={`badge ${getStatusBagianDataClass(item.statusBagianData)}`}>
                      {item.statusBagianData}
                    </span>
                  </div>
                </div>

                {item.petugasPengolah !== "-" && (
                  <div className="info-row">
                    <span className="info-icon">👤</span>
                    <div>
                      <span className="info-label">Petugas Pengolah:</span>
                      <span className="info-value">{item.petugasPengolah}</span>
                    </div>
                  </div>
                )}

                {/* File Hasil (Muncul jika Selesai) */}
                {item.statusBagianData === "Selesai" && item.fileHasil && (
                  <div className="file-result-box">
                    <div className="file-icon-large">📄</div>
                    <div className="file-details">
                      <span className="file-name">{item.fileHasil.nama}</span>
                      <span className="file-size">{item.fileHasil.ukuran}</span>
                    </div>
                    <button className="btn-download" onClick={() => handleDownload(item.fileHasil)}>
                      ⬇️ Unduh
                    </button>
                  </div>
                )}

                {/* Catatan Pengolah (Muncul jika ada) */}
                {item.catatanPengolah && (
                  <div className={`catatan-box ${item.statusBagianData === "Ditolak" ? "catatan-danger" : "catatan-info"}`}>
                    <div className="catatan-header">
                      <span className="catatan-icon">📝</span>
                      <strong>Catatan dari Pengolah</strong>
                    </div>
                    <p>{item.catatanPengolah}</p>
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