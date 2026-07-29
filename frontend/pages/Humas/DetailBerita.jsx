import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./DetailBerita.css";

export default function DetailBerita() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);
        // Sesuaikan URL ini dengan endpoint backend CodeIgniter Anda
        const response = await axios.get(`http://localhost:8080/api/berita/${id}`);
        
        // Asumsi backend mengembalikan format: { status: true, data: {...} }
        setData(response.data.data || response.data);
      } catch (err) {
        console.error("Gagal mengambil detail berita:", err);
        setError("Gagal memuat data detail pengajuan.");
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  // Helper untuk format tanggal
  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // Helper untuk class badge status
const getStatusClass = (status) => {
    switch ((status || "").toLowerCase()) {
        case "terbit":
            return "badge-terbit";
        case "disetujui":
            return "badge-disetujui";
        case "revisi":
            return "badge-revisi";
        case "ditolak":
            return "badge-ditolak";
        default:
            return "badge-menunggu";
    }
};

  if (loading) {
    return (
      <div className="rekom-page loading-container">
        <p>Memuat detail pengajuan...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="rekom-page error-container">
        <button className="btn-back" onClick={() => navigate(-1)}>← Kembali</button>
        <h2>{error || "Data tidak ditemukan"}</h2>
      </div>
    );
  }

  return (
    <div className="rekom-page detail-berita-page">
      {/* 1. HEADER & NAVIGASI */}
      <button className="btn-back" onClick={() => navigate(-1)}>
        ← Kembali
      </button>

      <div className="detail-header">
        <h2>DETAIL PENGAJUAN BERITA</h2>
        <span className={`badge ${getStatusClass(data.status)}`}>
          {data.status
               ? data.status.charAt(0).toUpperCase() + data.status.slice(1)
               : "Menunggu"}
        </span>
      </div>

      {/* 2. KARTU DETAIL UTAMA */}
      <div className="detail-card">
        
        {/* Bagian A: Informasi Dasar (Grid) */}
        <div className="info-grid">
          <div className="info-item full-width">
            <label>Judul</label>
            <p className="value highlight">{data.judul}</p>
          </div>
          
          <div className="info-item">
            <label>Nama Pengusul</label>
            <p className="value">{data.nama_pengusul || data.nama || "-"}</p>
          </div>
          
          <div className="info-item">
            <label>NIP</label>
            <p className="value">{data.nip_pengusul || "-"}</p>
          </div>
          
          <div className="info-item">
            <label>Satuan Kerja</label>
            <p className="value">{data.satuan_kerja || "-"}</p>
          </div>
          
          <div className="info-item">
            <label>Kategori</label>
            <p className="value">{data.nama_kategori || "-"}</p>
          </div>
          
          <div className="info-item">
            <label>Tanggal Kegiatan</label>
            <p className="value">{formatDate(data.tanggal_kegiatan)}</p>
          </div>
          
          <div className="info-item">
            <label>Lokasi</label>
            <p className="value">{data.lokasi_kegiatan || "-"}</p>
          </div>
          
          <div className="info-item">
            <label>Tanggal Pengajuan</label>
            <p className="value">{formatDate(data.submitted_at)}</p>
          </div>
          
          {data.tanggal_terbit && (
            <div className="info-item">
              <label>Tanggal Terbit</label>
              <p className="value">{formatDate(data.tanggal_terbit)}</p>
            </div>
          )}
        </div>

        <hr className="divider" />

        {/* Bagian B: Isi Berita */}
        <div className="detail-section">
          <h3>Isi Berita</h3>
          <div className="text-content">
            {data.isi_berita || "Tidak ada isi berita."}
          </div>
        </div>

        <hr className="divider" />

        {/* Bagian C: Foto Dokumentasi */}
        <div className="detail-section">
          <h3>Foto Dokumentasi</h3>
          <div className="foto-container">
{data.foto_utama ? (
    <img
        src={`http://localhost:8080/${data.foto_utama}`}
        alt="Dokumentasi"
        className="detail-image"
    />
) : (
    <p>Tidak ada foto yang diunggah.</p>
)}
          </div>
        </div>

        <hr className="divider" />

        {/* Bagian D: Catatan Admin */}
        <div className="detail-section">
          <h3>Catatan Admin</h3>
          <div className={`catatan-box ${data.status === 'Revisi' || data.status === 'Ditolak' ? 'catatan-warning' : 'catatan-info'}`}>
            {data.catatan_admin ? (
              <p>{data.catatan_admin}</p>
            ) : (
              <p className="no-data">-</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}