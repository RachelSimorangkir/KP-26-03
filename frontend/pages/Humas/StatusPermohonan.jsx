import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./StatusPermohonan.css";

export default function StatusPermohonan() {
  const navigate = useNavigate();

  // Mock data - nanti diganti dengan data dari API
  const [permohonanList, setPermohonanList] = useState([
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
      fileSurat: {
        nama: "Surat_Tanggapan_REG-2024-001.pdf",
        url: "#",
        ukuran: "450 KB",
      },
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
      fileSurat: {
        nama: "Surat_Penolakan_REG-2024-004.pdf",
        url: "#",
        ukuran: "320 KB",
      },
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
    {
      id: "REG-2024-006",
      jenisPermohonan: "Permintaan Dokumen",
      uraian: "Permintaan salinan peraturan internal tahun 2024",
      tanggalPengajuan: "2024-06-05",
      tanggalPutusan: "2024-06-08",
      statusAtasan: "Disetujui",
      statusPPID: "Selesai",
      petugasPPID: "Budi Santoso, S.Kom",
      tanggapan: "Dokumen peraturan internal telah dikirim melalui email resmi. Silakan cek inbox Anda.",
      fileSurat: {
        nama: "Surat_Tanggapan_REG-2024-006.pdf",
        url: "#",
        ukuran: "580 KB",
      },
    },
  ]);

  // Fungsi untuk menentukan class badge status atasan
  const getStatusAtasanClass = (status) => {
    const statusMap = {
      "Menunggu": "badge-menunggu",
      "Disetujui": "badge-disetujui",
      "Ditolak": "badge-ditolak",
    };
    return statusMap[status] || "badge-menunggu";
  };

  // Fungsi untuk menentukan class badge status PPID
  const getStatusPPIDClass = (status) => {
    const statusMap = {
      "Diajukan": "badge-diajukan",
      "Diproses": "badge-diproses",
      "Mediasi": "badge-mediasi",
      "Selesai": "badge-selesai",
      "Ditolak": "badge-ditolak",
    };
    return statusMap[status] || "badge-diajukan";
  };

  // Fungsi untuk handle download file
  const handleDownload = (file) => {
    alert(`Mengunduh file: ${file.nama}\n\n(Untuk demo, link belum aktif)`);
    // window.open(file.url, '_blank');
  };

  // Fungsi untuk format tanggal
  const formatTanggal = (dateStr) => {
    if (!dateStr) return "-";
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
          onClick={() => navigate("/humasdata/PPID")}
        >
          ← Kembali
        </button>
      </div>

      {/* BANNER */}
      <section className="service-banner">
        <div className="banner-icon">🔍</div>
        <div className="service-banner-content">
          <h1>Status Permohonan Saya</h1>
          <p>
            Pantau status permohonan/keberatan informasi yang pernah Anda ajukan.
          </p>
        </div>
      </section>

      {/* ACTION BUTTON */}
      <div className="action-header">
        <button
          className="btn-primary"
          onClick={() => navigate("/humasdata/PPID/Permohonan")}
        >
          + Ajukan Permohonan Baru
        </button>
      </div>

      {/* DAFTAR PERMOHONAN */}
      {permohonanList.length === 0 ? (
        <section className="description-card empty-state">
          <h2>Belum Ada Permohonan</h2>
          <p>Anda belum pernah mengajukan permohonan/keberatan. Klik tombol di atas untuk memulai.</p>
        </section>
      ) : (
        <div className="permohonan-list">
          {permohonanList.map((item) => (
            <div key={item.id} className="permohonan-card">
              {/* Header Card */}
              <div className="permohonan-header">
                <div className="permohonan-title-section">
                  <div className="permohonan-id-row">
                    <span className="permohonan-id">{item.id}</span>
                    <span className={`badge ${getStatusPPIDClass(item.statusPPID)}`}>
                      {item.statusPPID}
                    </span>
                  </div>
                  <h3>{item.uraian}</h3>
                  <div className="permohonan-meta">
                    <span className="meta-item">
                      <span className="meta-label">Jenis:</span>
                      <span>{item.jenisPermohonan}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Timeline Section */}
              <div className="timeline-section">
                <div className="timeline-item">
                  <span className="timeline-icon">📅</span>
                  <div className="timeline-content">
                    <span className="timeline-label">Tanggal Pengajuan:</span>
                    <span className="timeline-value">{formatTanggal(item.tanggalPengajuan)}</span>
                  </div>
                </div>
                <div className="timeline-item">
                  <span className="timeline-icon"></span>
                  <div className="timeline-content">
                    <span className="timeline-label">Tanggal Putusan:</span>
                    <span className="timeline-value">{formatTanggal(item.tanggalPutusan)}</span>
                  </div>
                </div>
              </div>

              {/* Status Section */}
              <div className="status-section">
                <div className="status-item">
                  <span className="status-label">Status Persetujuan Atasan:</span>
                  <span className={`badge ${getStatusAtasanClass(item.statusAtasan)}`}>
                    {item.statusAtasan}
                  </span>
                </div>
                <div className="status-item">
                  <span className="status-label">Status Permohonan PPID:</span>
                  <span className={`badge ${getStatusPPIDClass(item.statusPPID)}`}>
                    {item.statusPPID}
                  </span>
                </div>
              </div>

              {/* Petugas PPID */}
              {item.petugasPPID !== "-" && (
                <div className="info-row">
                  <span className="info-label">👤 Petugas PPID:</span>
                  <span className="info-value">{item.petugasPPID}</span>
                </div>
              )}

              {/* Tanggapan/Putusan */}
              {item.tanggapan && (
                <div className="tanggapan-section">
                  <div className="tanggapan-header">
                    <span className="tanggapan-icon">💬</span>
                    <span className="tanggapan-title">Tanggapan/Putusan:</span>
                  </div>
                  <p className="tanggapan-content">{item.tanggapan}</p>
                </div>
              )}

              {/* File Surat Tanggapan - Hanya muncul saat status Selesai atau Ditolak */}
              {(item.statusPPID === "Selesai" || item.statusPPID === "Ditolak") && item.fileSurat && (
                <div className="file-result-section">
                  <div className="file-result-header">
                    <span className="file-result-icon"></span>
                    <span className="file-result-title">File Surat Tanggapan</span>
                  </div>
                  <div className="file-result-content">
                    <div className="file-info">
                      <span className="file-name">{item.fileSurat.nama}</span>
                      <span className="file-size">({item.fileSurat.ukuran})</span>
                    </div>
                    <button
                      className="btn-download"
                      onClick={() => handleDownload(item.fileSurat)}
                    >
                      ️ Unduh Surat
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}