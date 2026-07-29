import { useState, useEffect } from "react";
import axios from "axios";
import "./BeritaMasuk.css";

export default function BeritaMasuk() {
  // State Utama
  const [view, setView] = useState("list");
  const [beritaList, setBeritaList] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  
  // State UI & Proses
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // State Filter & Form
  const [filters, setFilters] = useState({
    status: "Semua",
    satker: "Semua",
    kategori: "Semua",
    tahun: "2026",
    search: "",
  });

  const [actionForm, setActionForm] = useState({
    statusVerifikasi: "Menunggu",
    catatanRevisi: "",
    tanggalTerbit: "",
    kanalPublikasi: "Website",
  });

  // ✅ PERBAIKAN 6: Loading state saat mengambil data
  const loadBerita = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:8080/api/berita");
      setBeritaList(res.data.data || []);
    } catch (err) {
      console.error("Gagal memuat data berita:", err);
      alert(err.response?.data?.message || "Gagal memuat data dari server");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBerita();
  }, []);

  // ✅ PERBAIKAN 3: Helper untuk format tanggal menjadi "24 Juli 2026"
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    try {
      return new Date(dateString).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    } catch (e) {
      return dateString; // Fallback jika format tidak dikenali
    }
  };

  // ✅ PERBAIKAN 4 & 5: Logika Filter dan Search terpusat
  const filteredBerita = beritaList.filter((item) => {
    const matchStatus =
      filters.status === "Semua" ||
      item.status?.toLowerCase() === filters.status.toLowerCase();

    const matchSatker =
      filters.satker === "Semua" ||
      (item.satuan_kerja && item.satuan_kerja.includes(filters.satker));

    const matchKategori =
      filters.kategori === "Semua" ||
      (item.nama_kategori && item.nama_kategori.includes(filters.kategori));

    const matchTahun =
      filters.tahun === "Semua" ||
      (item.tanggal_kegiatan && item.tanggal_kegiatan.includes(filters.tahun));

    const searchLower = filters.search.toLowerCase();
    const matchSearch =
      !filters.search ||
      (item.nama_pengusul && item.nama_pengusul.toLowerCase().includes(searchLower)) ||
      (item.satuan_kerja && item.satuan_kerja.toLowerCase().includes(searchLower)) ||
      (item.judul && item.judul.toLowerCase().includes(searchLower));

    return matchStatus && matchSatker && matchKategori && matchTahun && matchSearch;
  });

  const handleViewDetail = (item) => {
    setSelectedItem(item);
    setActionForm({
      statusVerifikasi: item.status ? item.status.charAt(0).toUpperCase() + item.status.slice(1) : "Menunggu",
      catatanRevisi: "",
      tanggalTerbit: "",
      kanalPublikasi: "Website",
    });
    setView("detail");
  };

  const handleBack = () => {
    setView("list");
    setSelectedItem(null);
  };

  const getStatusClass = (status) => {
    if (!status) return "";
    const s = status.toLowerCase();
    switch (s) {
      case "menunggu": return "badge-menunggu";
      case "disetujui": return "badge-disetujui";
      case "revisi": return "badge-revisi";
      case "ditolak": return "badge-ditolak";
      case "terbit": return "badge-terbit";
      default: return "";
    }
  };

  const getSatkerClass = (satker) => {
    if (!satker) return "";
    if (satker.includes("Kanwil")) return "badge-kanwil";
    if (satker.includes("Kab-Kota")) return "badge-kabkota";
    if (satker.includes("PTKK")) return "badge-ptkk";
    return "badge-spkk";
  };

  const getKategoriClass = (kategori) => {
    if (!kategori) return "";
    switch (kategori) {
      case "Keagamaan": return "badge-keagamaan";
      case "Pendidikan": return "badge-pendidikan";
      case "Sosial": return "badge-sosial";
      case "Kelembagaan": return "badge-kelembagaan";
      default: return "";
    }
  };

  // ✅ PERBAIKAN 8 & 9: Saving state & Error handling yang lebih baik
  const handleUpdateStatus = async () => {
    setSaving(true);
    try {
      await axios.put(
        `http://localhost:8080/api/berita/${selectedItem.id}`,
        {
          // ✅ PERBAIKAN 2: Kirim status dalam huruf kecil untuk konsistensi backend
          status: actionForm.statusVerifikasi.toLowerCase(),
          catatan_admin: actionForm.catatanRevisi,
          tanggal_terbit: actionForm.tanggalTerbit,
          kanal_publikasi: actionForm.kanalPublikasi,
        }
      );

      alert("Status berhasil diperbarui");
      await loadBerita(); // Refresh data
      handleBack();
    } catch (err) {
      console.error(err);
      // ✅ PERBAIKAN 9: Tampilkan pesan error spesifik dari backend jika ada
      alert(err.response?.data?.message || "Gagal memperbarui status. Silakan coba lagi.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="berita-masuk-page">
      {/* Header */}
      <div className="page-header">
        <div className="header-text">
          <h1>{view === "list" ? "Berita Masuk" : "Detail & Aksi Berita"}</h1>
          <p>
            {view === "list"
              ? "Daftar berita kegiatan dari satuan kerja"
              : "Verifikasi dan proses berita yang diajukan"}
          </p>
        </div>
        {view === "detail" && (
          <button className="btn-back" onClick={handleBack}>
            ← Kembali
          </button>
        )}
      </div>

      {/* VIEW 1: DAFTAR BERITA */}
      {view === "list" && (
        <>
          {/* Filter Section */}
          <div className="filter-section">
            <div className="filter-grid">
              <div className="filter-item">
                <label>Tahun</label>
                <select
                  value={filters.tahun}
                  onChange={(e) => setFilters({ ...filters, tahun: e.target.value })}
                >
                  <option value="Semua">Semua Tahun</option>
                  <option>2026</option>
                  <option>2025</option>
                  <option>2024</option>
                </select>
              </div>

              <div className="filter-item">
                <label>Status</label>
                <select
                  value={filters.status}
                  onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                >
                  <option>Semua</option>
                  <option>Menunggu</option>
                  <option>Disetujui</option>
                  <option>Revisi</option>
                  <option>Ditolak</option>
                  <option>Terbit</option>
                </select>
              </div>

              <div className="filter-item">
                <label>Satuan Kerja</label>
                <select
                  value={filters.satker}
                  onChange={(e) => setFilters({ ...filters, satker: e.target.value })}
                >
                  <option>Semua</option>
                  <option>Kanwil</option>
                  <option>Kab-Kota</option>
                  <option>PTKK</option>
                  <option>SPKK</option>
                </select>
              </div>

              <div className="filter-item">
                <label>Kategori</label>
                <select
                  value={filters.kategori}
                  onChange={(e) => setFilters({ ...filters, kategori: e.target.value })}
                >
                  <option>Semua</option>
                  <option>Keagamaan</option>
                  <option>Pendidikan</option>
                  <option>Sosial</option>
                  <option>Kelembagaan</option>
                </select>
              </div>
            </div>

            <div className="search-row">
              <input
                type="text"
                placeholder="Cari berdasarkan nama pengusul, unit kerja, atau judul..."
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              />
            </div>
          </div>

          {/* Table Section */}
          <div className="table-section">
            <div className="table-scroll">
              {loading ? (
                <div className="loading-state">
                  <p>⏳ Memuat data berita...</p>
                </div>
              ) : filteredBerita.length === 0 ? (
                <div className="empty-state">
                  <p>Tidak ada data berita yang sesuai dengan filter/pencarian.</p>
                </div>
              ) : (
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>NO</th>
                      <th>JUDUL BERITA</th>
                      <th>SATUAN KERJA</th>
                      <th>KATEGORI</th>
                      <th>TGL KEGIATAN</th>
                      <th>TGL PENGAJUAN</th>
                      <th>STATUS</th>
                      <th>AKSI</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* ✅ PERBAIKAN 4 & 5: Menggunakan filteredBerita, bukan beritaList langsung */}
                    {filteredBerita.map((item, index) => (
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td className="col-judul">{item.judul}</td>
                        <td>
                          <span className={`badge ${getSatkerClass(item.satuan_kerja)}`}>
                            {item.satuan_kerja}
                          </span>
                        </td>
                        <td>
                          <span className={`badge ${getKategoriClass(item.nama_kategori)}`}>
                            {item.nama_kategori}
                          </span>
                        </td>
                        <td>{formatDate(item.tanggal_kegiatan)}</td>
                        <td>{formatDate(item.submitted_at)}</td>
                        <td>
                          <span className={`badge ${getStatusClass(item.status)}`}>
                            {item.status ? item.status.charAt(0).toUpperCase() + item.status.slice(1) : "-"}
                          </span>
                        </td>
                        <td>
                          <div className="action-buttons">
                            <button
                              className="btn btn-detail"
                              onClick={() => handleViewDetail(item)}
                            >
                              Lihat / Proses
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </>
      )}

      {/* VIEW 2: DETAIL & AKSI */}
      {view === "detail" && selectedItem && (
        <div className="detail-layout">
          {/* Informasi Pengajuan */}
          <div className="detail-card">
            <h3>Informasi Pengajuan</h3>
            <div className="info-grid">
              <div className="info-item">
                <label>NIP & Nama Pengusul</label>
                <p className="info-value">{selectedItem.nip_pengusul || "-"} - {selectedItem.nama_pengusul}</p>
              </div>
              <div className="info-item">
                <label>Satuan Kerja</label>
                <p className="info-value">{selectedItem.satuan_kerja}</p>
              </div>
              <div className="info-item full-width">
                <label>Judul Berita</label>
                <p className="info-value highlight">{selectedItem.judul}</p>
              </div>
              <div className="info-item">
                <label>Kategori Kegiatan</label>
                <p className="info-value">{selectedItem.nama_kategori}</p>
              </div>
              <div className="info-item">
                <label>Tanggal Kegiatan</label>
                <p className="info-value">{formatDate(selectedItem.tanggal_kegiatan)}</p>
              </div>
              <div className="info-item">
                <label>Lokasi Kegiatan</label>
                <p className="info-value">{selectedItem.lokasi_kegiatan}</p>
              </div>
              <div className="info-item">
                <label>Tanggal Pengajuan</label>
                <p className="info-value">{formatDate(selectedItem.submitted_at)}</p>
              </div>
              <div className="info-item full-width">
                <label>Isi Berita</label>
                <p className="info-value text-justify">{selectedItem.isi_berita}</p>
              </div>
              
              <div className="info-item full-width">
                <label>Foto / Video</label>
                <div className="media-preview">
                  {/* ✅ PERBAIKAN 1 & 7: Handling aman untuk gambar/video/null */}
                  {selectedItem.foto_utama ? (
                    selectedItem.foto_utama.toLowerCase().endsWith(".mp4") || 
                    selectedItem.foto_utama.toLowerCase().endsWith(".webm") ? (
                      <video controls width="100%">
                        <source src={`http://localhost:8080/${selectedItem.foto_utama}`} />
                        Browser Anda tidak mendukung tag video.
                      </video>
                    ) : (
                      <img 
                        src={`http://localhost:8080/${selectedItem.foto_utama}`} 
                        alt="Preview Media" 
                      />
                    )
                  ) : (
                    <p className="text-muted">Tidak ada gambar atau video yang diunggah.</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Form Verifikasi */}
          <div className="action-card">
            <h3>Verifikasi & Tindakan Admin</h3>
            <div className="form-grid">
              <div className="form-item full-width">
                <label>Status Verifikasi <span className="required">*</span></label>
                <select
                  value={actionForm.statusVerifikasi}
                  onChange={(e) => setActionForm({ ...actionForm, statusVerifikasi: e.target.value })}
                >
                  <option value="Menunggu">Menunggu</option>
                  <option value="Disetujui">Disetujui</option>
                  <option value="Revisi">Revisi</option>
                  <option value="Ditolak">Ditolak</option>
                  <option value="Terbit">Terbit</option>
                </select>
              </div>

              {(actionForm.statusVerifikasi === "Revisi" || actionForm.statusVerifikasi === "Ditolak") && (
                <div className="form-item full-width">
                  <label>Catatan Revisi / Penolakan <span className="required">*</span></label>
                  <textarea
                    rows="4"
                    placeholder="Berikan feedback kepada pengusul..."
                    value={actionForm.catatanRevisi}
                    onChange={(e) => setActionForm({ ...actionForm, catatanRevisi: e.target.value })}
                  ></textarea>
                </div>
              )}

              {actionForm.statusVerifikasi === "Terbit" && (
                <>
                  <div className="form-item">
                    <label>Tanggal Terbit <span className="required">*</span></label>
                    <input
                      type="date"
                      value={actionForm.tanggalTerbit}
                      onChange={(e) => setActionForm({ ...actionForm, tanggalTerbit: e.target.value })}
                    />
                  </div>
                  <div className="form-item">
                    <label>Kanal Publikasi <span className="required">*</span></label>
                    <select
                      value={actionForm.kanalPublikasi}
                      onChange={(e) => setActionForm({ ...actionForm, kanalPublikasi: e.target.value })}
                    >
                      <option value="Website">Website</option>
                      <option value="Instagram">Instagram</option>
                      <option value="Facebook">Facebook</option>
                      <option value="Twitter/X">Twitter/X</option>
                    </select>
                  </div>
                </>
              )}
            </div>

            <div className="form-actions">
              <button className="btn btn-secondary" onClick={handleBack} disabled={saving}>
                Batal
              </button>
              {/* ✅ PERBAIKAN 8: Tombol disabled saat proses saving */}
              <button 
                className="btn btn-verify" 
                onClick={handleUpdateStatus}
                disabled={saving}
              >
                {saving ? "Menyimpan..." : "Simpan Perubahan"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}