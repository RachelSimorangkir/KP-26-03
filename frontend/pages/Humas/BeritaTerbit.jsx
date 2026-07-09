import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BeritaTerbit.css";

export default function BeritaTerbit() {
  const navigate = useNavigate();

  const [beritaList] = useState([
    {
      id: 1,
      judul: "Pembinaan Rohaniwan Kab. Sleman",
      satuanKerja: "Kanwil",
      kategori: "Keagamaan",
      tanggalTerbit: "2024-06-25",
      kanalPublikasi: ["Website", "Instagram"],
      jumlahDilihat: 1247,
    },
    {
      id: 2,
      judul: "Rapat Koordinasi Bidang Pendidikan",
      satuanKerja: "Kanwil",
      kategori: "Pendidikan",
      tanggalTerbit: "2024-06-22",
      kanalPublikasi: ["Website", "Facebook"],
      jumlahDilihat: 856,
    },
    {
      id: 3,
      judul: "Bakti Sosial Panti Asuhan",
      satuanKerja: "Kab-Kota",
      kategori: "Sosial",
      tanggalTerbit: "2024-06-20",
      kanalPublikasi: ["Website", "Instagram", "Facebook"],
      jumlahDilihat: 2103,
    },
    {
      id: 4,
      judul: "Workshop Peningkatan Kompetensi Guru",
      satuanKerja: "PTK",
      kategori: "Pendidikan",
      tanggalTerbit: "2024-06-18",
      kanalPublikasi: ["Website"],
      jumlahDilihat: 634,
    },
    {
      id: 5,
      judul: "Peringatan Hari Raya Keagamaan",
      satuanKerja: "Kanwil",
      kategori: "Keagamaan",
      tanggalTerbit: "2024-06-15",
      kanalPublikasi: ["Website", "Instagram"],
      jumlahDilihat: 1589,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterTahun, setFilterTahun] = useState("2024");
  const [filterSatker, setFilterSatker] = useState("");
  const [filterKategori, setFilterKategori] = useState("");
  const [filterKanal, setFilterKanal] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedBerita, setSelectedBerita] = useState(null);

  const filteredData = beritaList.filter((item) => {
    const matchSearch = item.judul.toLowerCase().includes(searchTerm.toLowerCase());
    const matchTahun = new Date(item.tanggalTerbit).getFullYear().toString() === filterTahun;
    const matchSatker = filterSatker ? item.satuanKerja === filterSatker : true;
    const matchKategori = filterKategori ? item.kategori === filterKategori : true;
    const matchKanal = filterKanal ? item.kanalPublikasi.includes(filterKanal) : true;
    return matchSearch && matchTahun && matchSatker && matchKategori && matchKanal;
  });

  const handleOpenModal = (berita, type) => {
    setSelectedBerita(berita);
    setModalType(type);
    setShowModal(true);
  };

  const handleTarikPublikasi = () => {
    if (window.confirm(`Apakah Anda yakin ingin menarik publikasi berita "${selectedBerita.judul}"?`)) {
      alert("Publikasi berhasil ditarik!");
      setShowModal(false);
    }
  };

  return (
    <div className="berita-terbit-page">
      {/* HEADER */}
      <div className="page-header">
        <button className="back-button" onClick={() => navigate("/admin")}>
          ← Kembali
        </button>
        <div className="header-text">
          <h1>Berita Terbit</h1>
          <p>Arsip berita yang telah dipublikasikan di berbagai kanal</p>
        </div>
      </div>

      {/* FILTER CARD - 4 KOLOM + SEARCH */}
      <div className="filter-card">
        <div className="filter-grid">
          <div className="filter-item">
            <label>Tahun</label>
            <select value={filterTahun} onChange={(e) => setFilterTahun(e.target.value)}>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
            </select>
          </div>
          <div className="filter-item">
            <label>Satuan Kerja</label>
            <select value={filterSatker} onChange={(e) => setFilterSatker(e.target.value)}>
              <option value="">Semua</option>
              <option value="Kanwil">Kanwil</option>
              <option value="Kab-Kota">Kab-Kota</option>
              <option value="PTK">PTK</option>
              <option value="SPK">SPK</option>
            </select>
          </div>
          <div className="filter-item">
            <label>Kategori</label>
            <select value={filterKategori} onChange={(e) => setFilterKategori(e.target.value)}>
              <option value="">Semua</option>
              <option value="Keagamaan">Keagamaan</option>
              <option value="Pendidikan">Pendidikan</option>
              <option value="Sosial">Sosial</option>
              <option value="Kelembagaan">Kelembagaan</option>
            </select>
          </div>
          <div className="filter-item">
            <label>Kanal Publikasi</label>
            <select value={filterKanal} onChange={(e) => setFilterKanal(e.target.value)}>
              <option value="">Semua</option>
              <option value="Website">Website</option>
              <option value="Instagram">Instagram</option>
              <option value="Facebook">Facebook</option>
            </select>
          </div>
        </div>
        <div className="search-row">
          <input
            type="text"
            placeholder="Cari berdasarkan judul berita..."
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
                <th>Tanggal Terbit</th>
                <th>Kanal Publikasi</th>
                <th>Jumlah Dilihat</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item) => (
                <tr key={item.id}>
                  <td className="col-judul">{item.judul}</td>
                  <td><span className="badge badge-satker">{item.satuanKerja}</span></td>
                  <td><span className="badge badge-kategori">{item.kategori}</span></td>
                  <td>{new Date(item.tanggalTerbit).toLocaleDateString("id-ID")}</td>
                  <td>
                    <div className="kanal-tags">
                      {item.kanalPublikasi.map((kanal, idx) => (
                        <span key={idx} className="badge badge-kanal">{kanal}</span>
                      ))}
                    </div>
                  </td>
                  <td className="col-views">{item.jumlahDilihat.toLocaleString("id-ID")}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn btn-view" onClick={() => handleOpenModal(item, "view")} title="Lihat">👁️</button>
                      <button className="btn btn-edit" onClick={() => handleOpenModal(item, "edit")} title="Edit">✏️</button>
                      <button className="btn btn-tarik" onClick={() => handleOpenModal(item, "tarik")} title="Tarik">🗑️</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL */}
      {showModal && selectedBerita && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>
                {modalType === "view" && "👁️ Detail Berita"}
                {modalType === "edit" && "✏️ Edit Berita"}
                {modalType === "tarik" && "🗑️ Tarik Publikasi"}
              </h2>
              <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <div className="modal-body">
              {modalType === "view" && (
                <div className="detail-grid">
                  <div className="detail-item"><label>Judul</label><p>{selectedBerita.judul}</p></div>
                  <div className="detail-item"><label>Satuan Kerja</label><p><span className="badge badge-satker">{selectedBerita.satuanKerja}</span></p></div>
                  <div className="detail-item"><label>Kategori</label><p><span className="badge badge-kategori">{selectedBerita.kategori}</span></p></div>
                  <div className="detail-item"><label>Tanggal Terbit</label><p>{new Date(selectedBerita.tanggalTerbit).toLocaleDateString("id-ID")}</p></div>
                  <div className="detail-item full-width"><label>Kanal Publikasi</label><div className="kanal-tags">{selectedBerita.kanalPublikasi.map((k, i) => (<span key={i} className="badge badge-kanal">{k}</span>))}</div></div>
                  <div className="detail-item"><label>Jumlah Dilihat</label><p className="stat-number">{selectedBerita.jumlahDilihat.toLocaleString("id-ID")} kali</p></div>
                </div>
              )}
              {modalType === "edit" && (
                <div className="form-group">
                  <label>Judul Berita</label>
                  <input type="text" defaultValue={selectedBerita.judul} readOnly />
                </div>
              )}
              {modalType === "tarik" && (
                <div>
                  <div className="warning-box">
                    <span className="warning-icon">⚠️</span>
                    <p>Anda akan menarik publikasi berita <strong>"{selectedBerita.judul}"</strong>.</p>
                  </div>
                  <div className="form-group">
                    <label>Alasan Penarikan *</label>
                    <textarea rows="4" placeholder="Jelaskan alasan..."></textarea>
                  </div>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                {modalType === "tarik" ? "Batal" : "Tutup"}
              </button>
              {modalType === "tarik" && <button className="btn btn-danger" onClick={handleTarikPublikasi}>Tarik Publikasi</button>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}