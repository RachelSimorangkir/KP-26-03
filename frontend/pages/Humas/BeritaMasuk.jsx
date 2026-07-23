import { useState } from "react";
import "./BeritaMasuk.css";

const mockBerita = [
  {
    id: 1,
    nip: "198501012010011001",
    namaPengusul: "Rachek Simorangkir, S.Ag.",
    satker: "Kanwil Kemenag DKI Jakarta",
    judul: "Pelaksanaan Bimbingan Umat Kristen",
    kategori: "Keagamaan",
    tglKegiatan: "10 Juli 2026",
    lokasi: "Jakarta Timur",
    isi: "Kegiatan bimbingan Umat Kristen berjalan lancar dengan diikuti oleh 500 jamaah dari berbagai wilayah DKI Jakarta...",
    tglPengajuan: "12 Juli 2026",
    status: "Menunggu",
    media: "https://via.placeholder.com/400x200?text=Preview+Foto",
  },
  {
    id: 2,
    nip: "199002022015022002",
    namaPengusul: "Nana Nanulung, M.Pd.",
    satker: "Kab-Kota Bandung",
    judul: "Workshop Digitalisasi Sekolah Kristen",
    kategori: "Pendidikan",
    tglKegiatan: "15 Juli 2026",
    lokasi: "Bandung",
    isi: "Workshop diikuti oleh 50 kepala sekolah untuk meningkatkan literasi digital...",
    tglPengajuan: "16 Juli 2026",
    status: "Disetujui",
    media: "https://via.placeholder.com/400x200?text=Preview+Video",
  },
  {
    id: 3,
    nip: "197805052008011003",
    namaPengusul: "Budi Santoso, M.Ag.",
    satker: "PTKK Jakarta",
    judul: "Lomba Cerdas Cermat Alkitab",
    kategori: "Keagamaan",
    tglKegiatan: "20 Juli 2026",
    lokasi: "Jakarta Pusat",
    isi: "Lomba cerdas cermat Alkitab diikuti oleh 100 peserta dari seluruh Indonesia...",
    tglPengajuan: "18 Juli 2026",
    status: "Terbit",
    media: "https://via.placeholder.com/400x200?text=Preview+Foto",
  },
  {
    id: 4,
    nip: "198212122011012004",
    namaPengusul: "Dewi Lestari, S.Pd.",
    satker: "SPKK Surabaya",
    judul: "Bakti Sosial di Panti Asuhan",
    kategori: "Sosial",
    tglKegiatan: "25 Juli 2026",
    lokasi: "Surabaya",
    isi: "Kegiatan bakti sosial memberikan bantuan kepada 200 anak yatim piatu...",
    tglPengajuan: "22 Juli 2026",
    status: "Revisi",
    media: "https://via.placeholder.com/400x200?text=Preview+Foto",
  },
];

export default function BeritaMasuk() {
  const [view, setView] = useState("list");
  const [selectedItem, setSelectedItem] = useState(null);

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

  const handleViewDetail = (item) => {
    setSelectedItem(item);
    setActionForm({
      statusVerifikasi: item.status,
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
    switch (status) {
      case "Menunggu": return "badge-menunggu";
      case "Disetujui": return "badge-disetujui";
      case "Revisi": return "badge-revisi";
      case "Ditolak": return "badge-ditolak";
      case "Terbit": return "badge-terbit";
      default: return "";
    }
  };

  const getSatkerClass = (satker) => {
    if (satker.includes("Kanwil")) return "badge-kanwil";
    if (satker.includes("Kab-Kota")) return "badge-kabkota";
    if (satker.includes("PTKK")) return "badge-ptkk";
    return "badge-spkk";
  };

  const getKategoriClass = (kategori) => {
    switch (kategori) {
      case "Keagamaan": return "badge-keagamaan";
      case "Pendidikan": return "badge-pendidikan";
      case "Sosial": return "badge-sosial";
      case "Kelembagaan": return "badge-kelembagaan";
      default: return "";
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

            {/* Search Row - TERPISAH di bawah grid */}
            <div className="search-row">
              <input
                type="text"
                placeholder="Cari berdasarkan nama pemohon atau unit kerja..."
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              />
            </div>
          </div>

          {/* Table Section */}
          <div className="table-section">
            <div className="table-scroll">
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
                  {mockBerita.map((item, index) => (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td className="col-judul">{item.judul}</td>
                      <td>
                        <span className={`badge ${getSatkerClass(item.satker)}`}>
                          {item.satker}
                        </span>
                      </td>
                      <td>
                        <span className={`badge ${getKategoriClass(item.kategori)}`}>
                          {item.kategori}
                        </span>
                      </td>
                      <td>{item.tglKegiatan}</td>
                      <td>{item.tglPengajuan}</td>
                      <td>
                        <span className={`badge ${getStatusClass(item.status)}`}>
                          {item.status}
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
                <p className="info-value">{selectedItem.nip} - {selectedItem.namaPengusul}</p>
              </div>
              <div className="info-item">
                <label>Satuan Kerja</label>
                <p className="info-value">{selectedItem.satker}</p>
              </div>
              <div className="info-item full-width">
                <label>Judul Berita</label>
                <p className="info-value highlight">{selectedItem.judul}</p>
              </div>
              <div className="info-item">
                <label>Kategori Kegiatan</label>
                <p className="info-value">{selectedItem.kategori}</p>
              </div>
              <div className="info-item">
                <label>Tanggal Kegiatan</label>
                <p className="info-value">{selectedItem.tglKegiatan}</p>
              </div>
              <div className="info-item">
                <label>Lokasi Kegiatan</label>
                <p className="info-value">{selectedItem.lokasi}</p>
              </div>
              <div className="info-item">
                <label>Tanggal Pengajuan</label>
                <p className="info-value">{selectedItem.tglPengajuan}</p>
              </div>
              <div className="info-item full-width">
                <label>Isi Berita</label>
                <p className="info-value text-justify">{selectedItem.isi}</p>
              </div>
              <div className="info-item full-width">
                <label>Foto / Video</label>
                <div className="media-preview">
                  <img src={selectedItem.media} alt="Preview Media" />
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
              <button className="btn btn-secondary" onClick={handleBack}>
                Batal
              </button>
              <button
                className="btn btn-verify"
                onClick={() => alert("Status berhasil diperbarui!")}
              >
                Simpan Perubahan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
