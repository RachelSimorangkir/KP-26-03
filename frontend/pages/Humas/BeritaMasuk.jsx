import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BeritaMasuk.css";

export default function BeritaMasuk() {
  const navigate = useNavigate();

  // Mock data berita masuk
  const [beritaList, setBeritaList] = useState([
    {
      id: 1,
      judul: "Pembinaan Rohaniwan Kab. Sleman",
      satuanKerja: "Kanwil",
      kategori: "Keagamaan",
      tanggalKegiatan: "2024-06-20",
      statusAtasan: "Disetujui",
      statusVerifikasi: "Diterima",
      tanggalPengajuan: "2024-06-18",
      nip: "198701012010011001",
      namaPengusul: "John Doe",
      lokasiKegiatan: "Sleman, Yogyakarta",
      isiBerita: "Kegiatan pembinaan rohaniwan se-Kabupaten Sleman...",
      foto: ["foto1.jpg", "foto2.jpg"],
      namaAtasan: "Dr. Budi - Kepala Bagian",
      catatanRevisi: [],
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
      nip: "198702022011011002",
      namaPengusul: "Jane Smith",
      lokasiKegiatan: "Jakarta",
      isiBerita: "Rapat koordinasi bidang pendidikan Kristen...",
      foto: [],
      namaAtasan: "-",
      catatanRevisi: [],
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
      nip: "198703032012011003",
      namaPengusul: "Bob Anderson",
      lokasiKegiatan: "Bandung",
      isiBerita: "Kegiatan bakti sosial di panti asuhan...",
      foto: ["foto1.jpg"],
      namaAtasan: "Ibu Sari - Kepala Sub Bagian",
      catatanRevisi: [
        { tanggal: "2024-06-14", catatan: "Tambahkan foto kegiatan lebih banyak" },
      ],
    },
  ]);

  // State untuk filter dan search
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTahun, setFilterTahun] = useState("2024");
  const [filterSatker, setFilterSatker] = useState("");
  const [filterKategori, setFilterKategori] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  // State untuk modal detail
  const [showDetail, setShowDetail] = useState(false);
  const [selectedBerita, setSelectedBerita] = useState(null);

  // State untuk modal verifikasi
  const [showVerifikasi, setShowVerifikasi] = useState(false);
  const [verifikasiForm, setVerifikasiForm] = useState({
    statusVerifikasi: "",
    catatan: "",
    tanggalPublikasi: "",
    kanalPublikasi: [],
    editKonten: "",
  });

  // Filter data
  const filteredData = beritaList.filter((item) => {
    const matchSearch =
      item.judul.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.namaPengusul.toLowerCase().includes(searchTerm.toLowerCase());
    const matchTahun = new Date(item.tanggalPengajuan).getFullYear().toString() === filterTahun;
    const matchSatker = filterSatker ? item.satuanKerja === filterSatker : true;
    const matchKategori = filterKategori ? item.kategori === filterKategori : true;
    const matchStatus = filterStatus ? item.statusVerifikasi === filterStatus : true;

    return matchSearch && matchTahun && matchSatker && matchKategori && matchStatus;
  });

  // Handle buka detail
  const handleOpenDetail = (berita) => {
    setSelectedBerita(berita);
    setShowDetail(true);
  };

  // Handle buka form verifikasi
  const handleOpenVerifikasi = (berita) => {
    setSelectedBerita(berita);
    setVerifikasiForm({
      statusVerifikasi: "",
      catatan: "",
      tanggalPublikasi: "",
      kanalPublikasi: [],
      editKonten: berita.isiBerita,
    });
    setShowVerifikasi(true);
  };

  // Handle submit verifikasi
  const handleSubmitVerifikasi = (e) => {
    e.preventDefault();
    
    if (!verifikasiForm.statusVerifikasi) {
      alert("Status verifikasi wajib dipilih!");
      return;
    }

    if ((verifikasiForm.statusVerifikasi === "Revisi" || verifikasiForm.statusVerifikasi === "Ditolak") && !verifikasiForm.catatan) {
      alert("Catatan revisi/penolakan wajib diisi!");
      return;
    }

    if (verifikasiForm.statusVerifikasi === "Terbit" && (!verifikasiForm.tanggalPublikasi || verifikasiForm.kanalPublikasi.length === 0)) {
      alert("Tanggal publikasi dan kanal publikasi wajib dipilih jika status Terbit!");
      return;
    }

    alert(`Verifikasi berhasil!\nStatus: ${verifikasiForm.statusVerifikasi}`);
    setShowVerifikasi(false);
  };

  // Badge status helper
  const getStatusBadgeClass = (status, type) => {
    const statusMap = {
      atasan: {
        Menunggu: "badge-menunggu",
        Disetujui: "badge-disetujui",
        Ditolak: "badge-ditolak",
        Revisi: "badge-revisi",
      },
      verifikasi: {
        Diterima: "badge-disetujui",
        Revisi: "badge-revisi",
        Ditolak: "badge-ditolak",
        Terbit: "badge-terbit",
        Menunggu: "badge-menunggu",
      },
    };
    return statusMap[type][status] || "badge-menunggu";
  };

  return (
    <div className="berita-masuk-page">
      {/* BACK BUTTON */}
      <div className="page-header">
        <button className="back-button" onClick={() => navigate("/humasdata")}>
          ← Kembali
        </button>
        <h1>Berita Masuk</h1>
        <p>Daftar berita yang menunggu verifikasi dari satuan kerja</p>
      </div>

      {/* FILTER & SEARCH */}
      <div className="filter-section">
        <div className="filter-row">
          <div className="filter-group">
            <label>Tahun</label>
            <select value={filterTahun} onChange={(e) => setFilterTahun(e.target.value)}>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Satuan Kerja</label>
            <select value={filterSatker} onChange={(e) => setFilterSatker(e.target.value)}>
              <option value="">Semua</option>
              <option value="Kanwil">Kanwil</option>
              <option value="Kab-Kota">Kab/Kota</option>
              <option value="PTK">PTK</option>
              <option value="SPK">SPK</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Kategori</label>
            <select value={filterKategori} onChange={(e) => setFilterKategori(e.target.value)}>
              <option value="">Semua</option>
              <option value="Keagamaan">Keagamaan</option>
              <option value="Pendidikan">Pendidikan</option>
              <option value="Sosial">Sosial</option>
              <option value="Kelembagaan">Kelembagaan</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Status Verifikasi</label>
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
              <option value="">Semua</option>
              <option value="Menunggu">Menunggu</option>
              <option value="Diterima">Diterima</option>
              <option value="Revisi">Revisi</option>
              <option value="Ditolak">Ditolak</option>
              <option value="Terbit">Terbit</option>
            </select>
          </div>
        </div>

        <div className="search-box">
          <input
            type="text"
            placeholder="Cari berdasarkan judul atau nama pengusul..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* TABEL BERITA MASUK */}
      <div className="table-container">
        <table className="berita-table">
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
                <td className="judul-cell">{item.judul}</td>
                <td>
                  <span className="badge badge-satker">{item.satuanKerja}</span>
                </td>
                <td>{item.kategori}</td>
                <td>{new Date(item.tanggalKegiatan).toLocaleDateString("id-ID")}</td>
                <td>
                  <span className={`badge ${getStatusBadgeClass(item.statusAtasan, "atasan")}`}>
                    {item.statusAtasan}
                  </span>
                </td>
                <td>
                  <span className={`badge ${getStatusBadgeClass(item.statusVerifikasi, "verifikasi")}`}>
                    {item.statusVerifikasi}
                  </span>
                </td>
                <td>{new Date(item.tanggalPengajuan).toLocaleDateString("id-ID")}</td>
                <td className="aksi-cell">
                  <button className="btn-detail" onClick={() => handleOpenDetail(item)}>
                    Detail
                  </button>
                  <button
                    className="btn-verifikasi"
                    onClick={() => handleOpenVerifikasi(item)}
                    disabled={item.statusVerifikasi !== "Diterima"}
                  >
                    Verifikasi
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL DETAIL */}
      {showDetail && selectedBerita && (
        <div className="modal-overlay" onClick={() => setShowDetail(false)}>
          <div className="modal-content modal-large" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Detail Berita</h2>
              <button className="modal-close" onClick={() => setShowDetail(false)}>
                ✕
              </button>
            </div>
            <div className="modal-body">
              <div className="detail-section">
                <h3>Data Pengusul</h3>
                <div className="detail-grid">
                  <div className="detail-item">
                    <label>NIP Pengusul</label>
                    <p>{selectedBerita.nip}</p>
                  </div>
                  <div className="detail-item">
                    <label>Nama Pengusul</label>
                    <p>{selectedBerita.namaPengusul}</p>
                  </div>
                  <div className="detail-item full-width">
                    <label>Satuan Kerja</label>
                    <p>{selectedBerita.satuanKerja}</p>
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h3>Detail Berita</h3>
                <div className="detail-grid">
                  <div className="detail-item">
                    <label>Judul Berita</label>
                    <p>{selectedBerita.judul}</p>
                  </div>
                  <div className="detail-item">
                    <label>Kategori Kegiatan</label>
                    <p>{selectedBerita.kategori}</p>
                  </div>
                  <div className="detail-item">
                    <label>Tanggal Kegiatan</label>
                    <p>{new Date(selectedBerita.tanggalKegiatan).toLocaleDateString("id-ID")}</p>
                  </div>
                  <div className="detail-item">
                    <label>Lokasi Kegiatan</label>
                    <p>{selectedBerita.lokasiKegiatan}</p>
                  </div>
                  <div className="detail-item full-width">
                    <label>Isi Berita</label>
                    <p className="isi-berita">{selectedBerita.isiBerita}</p>
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h3>Status & Riwayat</h3>
                <div className="detail-grid">
                  <div className="detail-item">
                    <label>Status Persetujuan Atasan</label>
                    <p>
                      <span className={`badge ${getStatusBadgeClass(selectedBerita.statusAtasan, "atasan")}`}>
                        {selectedBerita.statusAtasan}
                      </span>
                      {selectedBerita.namaAtasan !== "-" && (
                        <span className="atasan-info">({selectedBerita.namaAtasan})</span>
                      )}
                    </p>
                  </div>
                  <div className="detail-item">
                    <label>Status Verifikasi Pusat</label>
                    <p>
                      <span className={`badge ${getStatusBadgeClass(selectedBerita.statusVerifikasi, "verifikasi")}`}>
                        {selectedBerita.statusVerifikasi}
                      </span>
                    </p>
                  </div>
                </div>

                {selectedBerita.catatanRevisi.length > 0 && (
                  <div className="catatan-revisi-section">
                    <h4>Riwayat Catatan Revisi</h4>
                    <div className="catatan-list">
                      {selectedBerita.catatanRevisi.map((catatan, idx) => (
                        <div key={idx} className="catatan-item">
                          <span className="catatan-tanggal">{catatan.tanggal}</span>
                          <p>{catatan.catatan}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setShowDetail(false)}>
                Tutup
              </button>
              {selectedBerita.statusVerifikasi === "Diterima" && (
                <button
                  className="btn-primary"
                  onClick={() => {
                    setShowDetail(false);
                    handleOpenVerifikasi(selectedBerita);
                  }}
                >
                  Verifikasi Berita
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODAL VERIFIKASI */}
      {showVerifikasi && selectedBerita && (
        <div className="modal-overlay" onClick={() => setShowVerifikasi(false)}>
          <div className="modal-content modal-large" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Verifikasi Berita</h2>
              <button className="modal-close" onClick={() => setShowVerifikasi(false)}>
                ✕
              </button>
            </div>
            <form onSubmit={handleSubmitVerifikasi}>
              <div className="modal-body">
                <div className="form-section">
                  <h3>Edit Konten (Opsional)</h3>
                  <textarea
                    value={verifikasiForm.editKonten}
                    onChange={(e) => setVerifikasiForm({ ...verifikasiForm, editKonten: e.target.value })}
                    rows="6"
                    placeholder="Edit isi berita jika diperlukan..."
                  />
                </div>

                <div className="form-section">
                  <h3>Status Verifikasi</h3>
                  <div className="form-group">
                    <label>Status Verifikasi *</label>
                    <select
                      value={verifikasiForm.statusVerifikasi}
                      onChange={(e) => setVerifikasiForm({ ...verifikasiForm, statusVerifikasi: e.target.value })}
                      required
                    >
                      <option value="">-- Pilih Status --</option>
                      <option value="Diterima">Diterima</option>
                      <option value="Revisi">Revisi</option>
                      <option value="Ditolak">Ditolak</option>
                      <option value="Terbit">Terbit</option>
                    </select>
                  </div>

                  {(verifikasiForm.statusVerifikasi === "Revisi" || verifikasiForm.statusVerifikasi === "Ditolak") && (
                    <div className="form-group">
                      <label>Catatan Revisi/Penolakan *</label>
                      <textarea
                        value={verifikasiForm.catatan}
                        onChange={(e) => setVerifikasiForm({ ...verifikasiForm, catatan: e.target.value })}
                        rows="4"
                        placeholder="Jelaskan alasan revisi/penolakan..."
                        required
                      />
                    </div>
                  )}

                  {verifikasiForm.statusVerifikasi === "Terbit" && (
                    <>
                      <div className="form-group">
                        <label>Tanggal Publikasi *</label>
                        <input
                          type="date"
                          value={verifikasiForm.tanggalPublikasi}
                          onChange={(e) => setVerifikasiForm({ ...verifikasiForm, tanggalPublikasi: e.target.value })}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label>Kanal Publikasi *</label>
                        <div className="checkbox-group">
                          <label>
                            <input
                              type="checkbox"
                              value="Website"
                              checked={verifikasiForm.kanalPublikasi.includes("Website")}
                              onChange={(e) => {
                                const value = e.target.value;
                                const newKanal = verifikasiForm.kanalPublikasi.includes(value)
                                  ? verifikasiForm.kanalPublikasi.filter((k) => k !== value)
                                  : [...verifikasiForm.kanalPublikasi, value];
                                setVerifikasiForm({ ...verifikasiForm, kanalPublikasi: newKanal });
                              }}
                            />
                            Website
                          </label>
                          <label>
                            <input
                              type="checkbox"
                              value="Instagram"
                              checked={verifikasiForm.kanalPublikasi.includes("Instagram")}
                              onChange={(e) => {
                                const value = e.target.value;
                                const newKanal = verifikasiForm.kanalPublikasi.includes(value)
                                  ? verifikasiForm.kanalPublikasi.filter((k) => k !== value)
                                  : [...verifikasiForm.kanalPublikasi, value];
                                setVerifikasiForm({ ...verifikasiForm, kanalPublikasi: newKanal });
                              }}
                            />
                            Instagram
                          </label>
                          <label>
                            <input
                              type="checkbox"
                              value="Facebook"
                              checked={verifikasiForm.kanalPublikasi.includes("Facebook")}
                              onChange={(e) => {
                                const value = e.target.value;
                                const newKanal = verifikasiForm.kanalPublikasi.includes(value)
                                  ? verifikasiForm.kanalPublikasi.filter((k) => k !== value)
                                  : [...verifikasiForm.kanalPublikasi, value];
                                setVerifikasiForm({ ...verifikasiForm, kanalPublikasi: newKanal });
                              }}
                            />
                            Facebook
                          </label>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={() => setShowVerifikasi(false)}>
                  Batal
                </button>
                <button type="submit" className="btn-primary">
                  Simpan Verifikasi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}