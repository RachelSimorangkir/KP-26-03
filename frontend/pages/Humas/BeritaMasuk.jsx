import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BeritaMasuk.css";

export default function BeritaMasuk() {
  const navigate = useNavigate();

  const [beritaList] = useState([
    {
      id: 1,
      judul: "Pembinaan Rohaniwan Kab. Sleman",
      satuanKerja: "Kanwil",
      kategori: "Keagamaan",
      tanggalKegiatan: "2024-06-20",
      statusAtasan: "Disetujui",
      statusVerifikasi: "Diterima",
      tanggalPengajuan: "2024-06-18",
    },
    {
      id: 2,
      judul: "Rapat Koordinasi Bidang Pendidikan",
      satuanKerja: "Kanwil",
      kategori: "Pendidikan",
      tanggalKegiatan: "2024-06-22",
      statusAtasan: "Menunggu",
      statusVerifikasi: "Menunggu",
      tanggalPengajuan: "2024-06-20",
    },
    {
      id: 3,
      judul: "Bakti Sosial Panti Asuhan",
      satuanKerja: "Kab-Kota",
      kategori: "Sosial",
      tanggalKegiatan: "2024-06-15",
      statusAtasan: "Disetujui",
      statusVerifikasi: "Revisi",
      tanggalPengajuan: "2024-06-13",
    },
  ]);

  const [filterTahun, setFilterTahun] = useState("2024");
  const [filterSatker, setFilterSatker] = useState("");
  const [filterKategori, setFilterKategori] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = beritaList.filter((item) => {
    return (
      item.judul.toLowerCase().includes(searchTerm.toLowerCase()) &&
      new Date(item.tanggalPengajuan).getFullYear().toString() === filterTahun &&
      (filterSatker ? item.satuanKerja === filterSatker : true) &&
      (filterKategori ? item.kategori === filterKategori : true) &&
      (filterStatus ? item.statusVerifikasi === filterStatus : true)
    );
  });

  const getStatusBadge = (status) => {
    const map = {
      "Menunggu": "badge-menunggu",
      "Disetujui": "badge-disetujui",
      "Diterima": "badge-disetujui",
      "Revisi": "badge-revisi",
      "Ditolak": "badge-ditolak",
    };
    return map[status] || "badge-menunggu";
  };

  return (
    <div className="berita-masuk-page">
      {/* HEADER */}
      <div className="page-header">
        <button className="back-button" onClick={() => navigate("/admin-humas")}>
          ← Kembali
        </button>
        <div className="header-text">
          <h1>Berita Masuk</h1>
          <p>Daftar berita yang menunggu verifikasi dari satuan kerja</p>
        </div>
      </div>

      {/* FILTER */}
      <div className="filter-card">
        <div className="filter-grid">
          <div className="filter-item">
            <label>Tahun</label>
            <select value={filterTahun} onChange={(e) => setFilterTahun(e.target.value)}>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
            </select>
          </div>
          <div className="filter-item">
            <label>Satuan Kerja</label>
            <select value={filterSatker} onChange={(e) => setFilterSatker(e.target.value)}>
              <option value="">Semua</option>
              <option value="Kanwil">Kanwil</option>
              <option value="Kab-Kota">Kab-Kota</option>
            </select>
          </div>
          <div className="filter-item">
            <label>Kategori</label>
            <select value={filterKategori} onChange={(e) => setFilterKategori(e.target.value)}>
              <option value="">Semua</option>
              <option value="Keagamaan">Keagamaan</option>
              <option value="Pendidikan">Pendidikan</option>
              <option value="Sosial">Sosial</option>
            </select>
          </div>
          <div className="filter-item">
            <label>Status Verifikasi</label>
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
              <option value="">Semua</option>
              <option value="Menunggu">Menunggu</option>
              <option value="Diterima">Diterima</option>
              <option value="Revisi">Revisi</option>
            </select>
          </div>
        </div>
        <div className="search-row">
          <input
            type="text"
            placeholder="Cari berdasarkan judul atau nama pengusul..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* TABEL */}
      <div className="table-card">
        <div className="table-scroll">
          <table className="data-table">
            <thead>
              <tr>
                <th>Judul Berita</th>
                <th>Satuan Kerja</th>
                <th>Kategori</th>
                <th>Tanggal Kegiatan</th>
                <th>Status Atasan</th>
                <th>Status Verifikasi</th>
                <th>Tanggal Pengajuan</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item) => (
                <tr key={item.id}>
                  <td className="col-judul">{item.judul}</td>
                  <td><span className="badge badge-satker">{item.satuanKerja}</span></td>
                  <td>{item.kategori}</td>
                  <td>{new Date(item.tanggalKegiatan).toLocaleDateString("id-ID")}</td>
                  <td><span className={`badge ${getStatusBadge(item.statusAtasan)}`}>{item.statusAtasan}</span></td>
                  <td><span className={`badge ${getStatusBadge(item.statusVerifikasi)}`}>{item.statusVerifikasi}</span></td>
                  <td>{new Date(item.tanggalPengajuan).toLocaleDateString("id-ID")}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn btn-detail">Detail</button>
                      <button className="btn btn-verify" disabled={item.statusVerifikasi !== "Diterima"}>Verifikasi</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}