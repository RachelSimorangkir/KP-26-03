import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./StatusPermohonan.css";

export default function StatusPermohonan() {
  const navigate = useNavigate();

  // Mock data
  const [permohonanList] = useState([
    {
      id: "REG-2024-001",
      jenisPermohonan: "Permintaan Dokumen",
      uraian: "Permintaan salinan SK Kepala Kantor tahun 2023",
      tanggalPengajuan: "2024-06-20",
      tanggalPutusan: "2024-06-25",
      statusAtasan: "Disetujui",
      statusPPID: "Selesai",
      petugasPPID: "Hendra Wijaya, S.H",
      tanggapan: "Permohonan dikabulkan. Dokumen telah dikirim melalui email resmi pemohon pada tanggal 25 Juni 2024.",
      fileSurat: { nama: "Surat_Tanggapan_REG-2024-001.pdf", url: "#", ukuran: "450 KB" },
    },
    {
      id: "REG-2024-002",
      jenisPermohonan: "Permintaan Informasi",
      uraian: "Informasi anggaran pelatihan pegawai semester 1",
      tanggalPengajuan: "2024-06-18",
      tanggalPutusan: null,
      statusAtasan: "Disetujui",
      statusPPID: "Diproses",
      petugasPPID: "Siti Rahayu, M.AP",
      tanggapan: "Permohonan sedang dalam proses verifikasi. Mohon tunggu 2-3 hari kerja.",
      fileSurat: null,
    },
    {
      id: "REG-2024-003",
      jenisPermohonan: "Keberatan atas Respon Sebelumnya",
      uraian: "Keberatan atas penolakan permintaan data statistik",
      tanggalPengajuan: "2024-06-15",
      tanggalPutusan: null,
      statusAtasan: "Disetujui",
      statusPPID: "Mediasi",
      petugasPPID: "Dr. Ahmad Fauzi, M.Pd",
      tanggapan: "Permohonan sedang dalam tahap mediasi. Tim PPID akan menghubungi pemohon untuk klarifikasi.",
      fileSurat: null,
    },
    {
      id: "REG-2024-004",
      jenisPermohonan: "Permintaan Dokumen",
      uraian: "Permintaan copy berita acara rapat pimpinan",
      tanggalPengajuan: "2024-06-10",
      tanggalPutusan: "2024-06-12",
      statusAtasan: "Ditolak",
      statusPPID: "Ditolak",
      petugasPPID: "-",
      tanggapan: "Permohonan ditolak karena dokumen bersifat rahasia dan memerlukan izin khusus dari pimpinan.",
      fileSurat: { nama: "Surat_Penolakan_REG-2024-004.pdf", url: "#", ukuran: "320 KB" },
    },
    {
      id: "REG-2024-005",
      jenisPermohonan: "Permintaan Informasi",
      uraian: "Informasi jumlah pegawai aktif per unit kerja",
      tanggalPengajuan: "2024-06-22",
      tanggalPutusan: null,
      statusAtasan: "Menunggu",
      statusPPID: "Diajukan",
      petugasPPID: "-",
      tanggapan: "",
      fileSurat: null,
    },
  ]);

  const getStatusAtasanClass = (status) => {
    const map = { Menunggu: "badge-menunggu", Disetujui: "badge-disetujui", Ditolak: "badge-ditolak" };
    return map[status] || "badge-menunggu";
  };

  const getStatusPPIDClass = (status) => {
    const map = { Diajukan: "badge-diajukan", Diproses: "badge-diproses", Mediasi: "badge-mediasi", Selesai: "badge-selesai", Ditolak: "badge-ditolak" };
    return map[status] || "badge-diajukan";
  };

  const getCatatanBoxClass = (status) => {
    if (status === "Selesai") return "catatan-success";
    if (status === "Ditolak") return "catatan-danger";
    return "catatan-info";
  };

  const handleDownload = (file) => {
    alert(`Mengunduh file: ${file.nama}\n\n(Untuk demo, link belum aktif)`);
  };

  const formatTanggal = (dateStr) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
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
        <button className="btn-primary" onClick={() => navigate("/humasdata/PPID/Permohonan")}>
          + Ajukan Permohonan Baru
        </button>
      </div>

      {/* DAFTAR PERMOHONAN */}
      {permohonanList.length === 0 ? (
        <section className="empty-state-card">
          <div className="empty-icon">📭</div>
          <h3>Belum Ada Permohonan</h3>
          <p>Anda belum pernah mengajukan permohonan/keberatan. Klik tombol di atas untuk memulai.</p>
        </section>
      ) : (
        <div className="permohonan-list">
          {permohonanList.map((item) => (
            <div key={item.id} className="permohonan-card">
              
              {/* 1. Card Header: ID, Uraian & Meta */}
              <div className="card-header">
                <div className="header-left">
                  <span className="permohonan-id">{item.id}</span>
                  <h3 className="card-title">{item.uraian}</h3>
                </div>
                <div className="card-meta">
                  <span className="meta-item">
                    <span className="meta-label">Jenis:</span> {item.jenisPermohonan}
                  </span>
                </div>
              </div>

              {/* 2. Card Body: Status & Timeline */}
              <div className="card-body">
                <div className="status-grid">
                  <div className="status-box">
                    <span className="status-label">Persetujuan Atasan</span>
                    <span className={`badge ${getStatusAtasanClass(item.statusAtasan)}`}>
                      {item.statusAtasan}
                    </span>
                  </div>
                  <div className="status-box">
                    <span className="status-label">Status Permohonan PPID</span>
                    <span className={`badge ${getStatusPPIDClass(item.statusPPID)}`}>
                      {item.statusPPID}
                    </span>
                  </div>
                </div>

                <div className="timeline-compact">
                  <span>📅 Diajukan: {formatTanggal(item.tanggalPengajuan)}</span>
                  <span>⚖️ Putusan: {formatTanggal(item.tanggalPutusan)}</span>
                </div>

                {/* Petugas PPID */}
                {item.petugasPPID !== "-" && (
                  <div className="info-row">
                    <span className="info-icon">👤</span>
                    <div>
                      <span className="info-label">Petugas PPID:</span>
                      <span className="info-value">{item.petugasPPID}</span>
                    </div>
                  </div>
                )}

                {/* 3. Tanggapan/Putusan (Dinamis berdasarkan status) */}
                {item.tanggapan && (
                  <div className={`catatan-box ${getCatatanBoxClass(item.statusPPID)}`}>
                    <div className="catatan-header">
                      <span className="catatan-icon">💬</span>
                      <strong>Tanggapan / Putusan PPID</strong>
                    </div>
                    <p>{item.tanggapan}</p>
                  </div>
                )}

                {/* 4. File Surat Tanggapan (Hanya jika Selesai/Ditolak & ada file) */}
                {(item.statusPPID === "Selesai" || item.statusPPID === "Ditolak") && item.fileSurat && (
                  <div className="file-result-box">
                    <div className="file-icon-large">📄</div>
                    <div className="file-details">
                      <span className="file-name">{item.fileSurat.nama}</span>
                      <span className="file-size">{item.fileSurat.ukuran}</span>
                    </div>
                    <button className="btn-download" onClick={() => handleDownload(item.fileSurat)}>
                      ⬇️ Unduh Surat
                    </button>
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