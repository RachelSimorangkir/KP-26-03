import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./StatusData.css";

export default function StatusData() {
  const navigate = useNavigate();

  // Mock data - nanti diganti dengan data dari API
  const [permintaanList, setPermintaanList] = useState([
    {
      id: 1,
      judulPermintaan: "Data Kepegawaian Tahun 2024",
      jenisData: "Data Kepegawaian",
      tanggalPengajuan: "2024-06-20",
      statusAtasan: "Disetujui",
      statusBagianData: "Selesai",
      petugasPengolah: "Budi Santoso, S.Kom",
      fileHasil: {
        nama: "Data_Kepegawaian_2024.pdf",
        url: "#",
        ukuran: "2.5 MB",
      },
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
      catatanPengolah: "Sedang dalam proses kompilasi data.",
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
      catatanPengolah: "Permintaan ditolak karena data bersifat rahasia. Silakan ajukan surat izin khusus.",
    },
    {
      id: 5,
      judulPermintaan: "Data Pendidikan",
      jenisData: "Data Pendidikan",
      tanggalPengajuan: "2024-06-05",
      statusAtasan: "Disetujui",
      statusBagianData: "Selesai",
      petugasPengolah: "Diana Manurung, S.Pd",
      fileHasil: {
        nama: "Data_Pendidikan_2024.xlsx",
        url: "#",
        ukuran: "1.8 MB",
      },
      catatanPengolah: "Data mencakup 150  di wilayah Jawa Barat.",
    },
  ]);

  // Fungsi untuk menentukan class badge status atasan
  const getStatusAtasanClass = (status) => {
    const statusMap = {
      Menunggu: "badge-menunggu",
      Disetujui: "badge-disetujui",
      Ditolak: "badge-ditolak",
    };
    return statusMap[status] || "badge-menunggu";
  };

  // Fungsi untuk menentukan class badge status bagian data
  const getStatusBagianDataClass = (status) => {
    const statusMap = {
      Diajukan: "badge-diajukan",
      Diproses: "badge-diproses",
      Selesai: "badge-selesai",
      Ditolak: "badge-ditolak",
    };
    return statusMap[status] || "badge-diajukan";
  };

  // Fungsi untuk handle download file
  const handleDownload = (file) => {
    alert(`Mengunduh file: ${file.nama}\n(Untuk demo, link belum aktif)`);
    // window.open(file.url, '_blank');
  };

  return (
    <div className="rekom-page">
      {/* BACK BUTTON */}
      <div className="rekom-header">
        <button
          className="back-button"
          onClick={() => navigate("/humasdata/PermintaanData")}
        >
          ← Kembali
        </button>
      </div>

      {/* BANNER */}
      <section className="service-banner">
        <div className="banner-icon">📊</div>
        <div className="service-banner-content">
          <h1>Status Permintaan Data Saya</h1>
          <p>
            Pantau status permintaan data internal Anda di sini.
          </p>
        </div>
      </section>

      {/* ACTION BUTTON */}
      <div className="action-header">
        <button
          className="btn-primary"
          onClick={() => navigate("/humasdata/PermintaanData/DataInternal")}
        >
          + Ajukan Permintaan Data Baru
        </button>
      </div>

      {/* DAFTAR PERMINTAAN */}
      {permintaanList.length === 0 ? (
        <section className="description-card empty-state">
          <h2>Belum Ada Permintaan</h2>
          <p>Anda belum membuat permintaan data. Klik tombol di atas untuk memulai.</p>
        </section>
      ) : (
        <div className="permintaan-list">
          {permintaanList.map((item) => (
            <div key={item.id} className="permintaan-card">
              {/* Header Card */}
              <div className="permintaan-header">
                <div className="permintaan-title-section">
                  <h3>{item.judulPermintaan}</h3>
                  <div className="permintaan-meta">
                    <span className="meta-item">
                      <span className="meta-label">Jenis Data:</span>
                      <span>{item.jenisData}</span>
                    </span>
                    <span className="meta-item">
                      <span className="meta-label">Diajukan:</span>
                      <span>{new Date(item.tanggalPengajuan).toLocaleDateString("id-ID", {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}</span>
                    </span>
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
                  <span className="status-label">Status Permintaan ke Bagian Data:</span>
                  <span className={`badge ${getStatusBagianDataClass(item.statusBagianData)}`}>
                    {item.statusBagianData}
                  </span>
                </div>
              </div>

              {/* Petugas Pengolah */}
              {item.petugasPengolah !== "-" && (
                <div className="info-row">
                  <span className="info-label">👤 Petugas Pengolah:</span>
                  <span className="info-value">{item.petugasPengolah}</span>
                </div>
              )}

              {/* File Hasil Data - Hanya muncul jika status Selesai */}
              {item.statusBagianData === "Selesai" && item.fileHasil && (
                <div className="file-result-section">
                  <div className="file-result-header">
                    <span className="file-result-icon">📁</span>
                    <span className="file-result-title">File Hasil Data</span>
                  </div>
                  <div className="file-result-content">
                    <div className="file-info">
                      <span className="file-name">{item.fileHasil.nama}</span>
                      <span className="file-size">({item.fileHasil.ukuran})</span>
                    </div>
                    <button
                      className="btn-download"
                      onClick={() => handleDownload(item.fileHasil)}
                    >
                      ⬇️ Unduh File
                    </button>
                  </div>
                </div>
              )}

              {/* Catatan dari Pengolah */}
              {item.catatanPengolah && (
                <div className="catatan-pengolah">
                  <strong>📝 Catatan dari Pengolah:</strong>
                  <p>{item.catatanPengolah}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}