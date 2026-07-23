import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Keberatan.css";

export default function Keberatan() {
  const navigate = useNavigate();

  const [keberatanList] = useState([
    {
      id: 1,
      nomorRegistrasi: "PPID-2024-001",
      nip: "198701012010011001",
      namaPengaju: "John Doe",
      unitKerja: "Kanwil",
      jenisPermohonan: "Permintaan Dokumen",
      unitKerjaTujuan: "Bagian Hukum & Organisasi",
      tingkatUrgensi: "Normal",
      statusAtasan: "Disetujui",
      statusPermohonan: "Selesai",
      petugasPPID: "Hendra Wijaya, S.H",
      tanggalPengajuan: "2024-05-20",
      batasWaktu: "2024-07-01",
      uraian: "Permintaan salinan SK Kepala Kantor tahun 2023",
      dokumenPendukung: "surat_permohonan_001.pdf",
      tanggapan: "Permohonan dikabulkan. Dokumen telah dikirim melalui email resmi.",
      suratTanggapan: "Surat_Tanggapan_PPID-2024-001.pdf",
      riwayat: [
        { tanggal: "2024-05-20", status: "Diajukan", keterangan: "Permintaan diajukan" },
        { tanggal: "2024-05-21", status: "Disetujui Atasan", keterangan: "Disetujui oleh Dr. Budi" },
        { tanggal: "2024-05-22", status: "Diproses", keterangan: "Ditugaskan ke Hendra Wijaya" },
        { tanggal: "2024-05-25", status: "Selesai", keterangan: "Dokumen telah dikirim" },
      ],
    },
    {
      id: 2,
      nomorRegistrasi: "PPID-2024-002",
      nip: "198702022011011002",
      namaPengaju: "Jane Smith",
      unitKerja: "Kab-Kota",
      jenisPermohonan: "Permintaan Informasi",
      unitKerjaTujuan: "Bagian Keuangan",
      tingkatUrgensi: "Segera",
      statusAtasan: "Disetujui",
      statusPermohonan: "Mediasi",
      petugasPPID: "Siti Rahayu, M.AP",
      tanggalPengajuan: "2024-06-10",
      batasWaktu: "2024-07-22",
      uraian: "Informasi anggaran pelatihan pegawai semester 1 tahun 2024",
      dokumenPendukung: null,
      tanggapan: "Permohonan sedang dalam tahap mediasi.",
      suratTanggapan: null,
      riwayat: [
        { tanggal: "2024-06-10", status: "Diajukan", keterangan: "Permintaan diajukan" },
        { tanggal: "2024-06-11", status: "Disetujui Atasan", keterangan: "Disetujui oleh Ibu Sari" },
        { tanggal: "2024-06-12", status: "Diproses", keterangan: "Ditugaskan ke Siti Rahayu" },
        { tanggal: "2024-06-15", status: "Mediasi", keterangan: "Memerlukan klarifikasi tambahan" },
      ],
    },
    {
      id: 3,
      nomorRegistrasi: "PPID-2024-003",
      nip: "198703032012011003",
      namaPengaju: "Bob Anderson",
      unitKerja: "PTK",
      jenisPermohonan: "Keberatan",
      unitKerjaTujuan: "Bagian Data & Statistik",
      tingkatUrgensi: "Segera",
      statusAtasan: "Disetujui",
      statusPermohonan: "Diproses",
      petugasPPID: "Dr. Ahmad Fauzi, M.Pd",
      tanggalPengajuan: "2024-06-18",
      batasWaktu: "2024-07-30",
      uraian: "Keberatan atas penolakan permintaan data statistik pendidikan tahun 2023.",
      dokumenPendukung: "surat_keberatan_003.pdf",
      tanggapan: "Sedang ditinjau ulang oleh tim PPID.",
      suratTanggapan: null,
      riwayat: [
        { tanggal: "2024-06-18", status: "Diajukan", keterangan: "Keberatan diajukan" },
        { tanggal: "2024-06-19", status: "Disetujui Atasan", keterangan: "Disetujui oleh Kepala Satker" },
        { tanggal: "2024-06-20", status: "Diproses", keterangan: "Ditugaskan ke Dr. Ahmad Fauzi" },
      ],
    },
    {
      id: 4,
      nomorRegistrasi: "PPID-2024-004",
      nip: "198704042013011004",
      namaPengaju: "Siti Rahayu",
      unitKerja: "Kanwil",
      jenisPermohonan: "Permintaan Dokumen",
      unitKerjaTujuan: "Bagian Umum",
      tingkatUrgensi: "Normal",
      statusAtasan: "Ditolak",
      statusPermohonan: "Ditolak",
      petugasPPID: "-",
      tanggalPengajuan: "2024-06-05",
      batasWaktu: "2024-07-17",
      uraian: "Permintaan copy berita acara rapat pimpinan bulan Mei 2024",
      dokumenPendukung: null,
      tanggapan: "Permohonan ditolak karena dokumen bersifat rahasia.",
      suratTanggapan: "Surat_Penolakan_PPID-2024-004.pdf",
      riwayat: [
        { tanggal: "2024-06-05", status: "Diajukan", keterangan: "Permintaan diajukan" },
        { tanggal: "2024-06-06", status: "Ditolak Atasan", keterangan: "Ditolak karena bersifat rahasia" },
        { tanggal: "2024-06-07", status: "Ditolak", keterangan: "Permohonan ditutup" },
      ],
    },
    {
      id: 5,
      nomorRegistrasi: "PPID-2024-005",
      nip: "198705052014011005",
      namaPengaju: "Dewi Lestari",
      unitKerja: "SPK",
      jenisPermohonan: "Permintaan Informasi",
      unitKerjaTujuan: "Bidang Pendidikan Kristen",
      tingkatUrgensi: "Normal",
      statusAtasan: "Menunggu",
      statusPermohonan: "Diajukan",
      petugasPPID: "-",
      tanggalPengajuan: "2024-06-22",
      batasWaktu: "2024-08-03",
      uraian: "Informasi jumlah guru aktif per kabupaten/kota tahun ajaran 2024/2025",
      dokumenPendukung: "surat_permohonan_005.pdf",
      tanggapan: "",
      suratTanggapan: null,
      riwayat: [
        { tanggal: "2024-06-22", status: "Diajukan", keterangan: "Menunggu persetujuan atasan" },
      ],
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterJenis, setFilterJenis] = useState("");
  const [filterUrgensi, setFilterUrgensi] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  const hitungSisaHari = (batasWaktu) => {
    const today = new Date();
    const batas = new Date(batasWaktu);
    const diffTime = batas - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const filteredData = keberatanList.filter((item) => {
    const matchSearch =
      item.nomorRegistrasi.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.namaPengaju.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.uraian.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = filterStatus ? item.statusPermohonan === filterStatus : true;
    const matchJenis = filterJenis ? item.jenisPermohonan === filterJenis : true;
    const matchUrgensi = filterUrgensi ? item.tingkatUrgensi === filterUrgensi : true;
    return matchSearch && matchStatus && matchJenis && matchUrgensi;
  });

  const handleOpenDetail = (item) => {
    setSelectedItem(item);
    setModalType("detail");
    setShowModal(true);
  };

  const handleOpenProses = (item) => {
    setSelectedItem(item);
    setModalType("proses");
    setShowModal(true);
  };

  const getStatusBadge = (status, type) => {
    const map = {
      atasan: { Menunggu: "badge-menunggu", Disetujui: "badge-disetujui", Ditolak: "badge-ditolak" },
      permohonan: { Diajukan: "badge-diajukan", Diproses: "badge-diproses", Mediasi: "badge-mediasi", Selesai: "badge-selesai", Ditolak: "badge-ditolak" },
      urgensi: { Normal: "badge-normal", Segera: "badge-segera" },
    };
    return map[type]?.[status] || "badge-menunggu";
  };

  const getSisaHariClass = (hari) => {
    if (hari <= 0) return "badge-sla-danger";
    if (hari <= 7) return "badge-sla-warning";
    return "badge-sla-normal";
  };

  const formatTanggal = (dateStr) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
  };

  return (
    <div className="keberatan-page">
      {/* HEADER */}
      <div className="page-header">
  <div className="page-header-content">
    <h1>Keberatan Informasi</h1>
    <p>Monitoring permohonan dan keberatan informasi antar-unit (PPID Internal)</p>
  </div>
</div>

      {/* FILTER CARD - 4 KOLOM + SEARCH */}
      <div className="filter-card">
        <div className="filter-grid">
          <div className="filter-item">
            <label>Status Permohonan</label>
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
              <option value="">Semua</option>
              <option value="Diajukan">Diajukan</option>
              <option value="Diproses">Diproses</option>
              <option value="Mediasi">Mediasi</option>
              <option value="Selesai">Selesai</option>
              <option value="Ditolak">Ditolak</option>
            </select>
          </div>
          <div className="filter-item">
            <label>Jenis Permohonan</label>
            <select value={filterJenis} onChange={(e) => setFilterJenis(e.target.value)}>
              <option value="">Semua</option>
              <option value="Permintaan Dokumen">Permintaan Dokumen</option>
              <option value="Permintaan Informasi">Permintaan Informasi</option>
              <option value="Keberatan">Keberatan</option>
            </select>
          </div>
          <div className="filter-item">
            <label>Tingkat Urgensi</label>
            <select value={filterUrgensi} onChange={(e) => setFilterUrgensi(e.target.value)}>
              <option value="">Semua</option>
              <option value="Normal">Normal</option>
              <option value="Segera">Segera</option>
            </select>
          </div>
          <div className="filter-item">
            <label>Petugas PPID</label>
            <select>
              <option value="">Semua</option>
              <option value="-">Belum Ditugaskan</option>
              <option value="Hendra Wijaya, S.H">Hendra Wijaya, S.H</option>
              <option value="Siti Rahayu, M.AP">Siti Rahayu, M.AP</option>
              <option value="Dr. Ahmad Fauzi, M.Pd">Dr. Ahmad Fauzi, M.Pd</option>
            </select>
          </div>
        </div>
        <div className="search-row">
          <input
            type="text"
            placeholder="Cari nomor registrasi, nama pengaju, atau uraian..."
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
                <th>No. Registrasi</th>
                <th>Pengaju & Unit</th>
                <th>Jenis</th>
                <th>Unit Tujuan</th>
                <th>Urgensi</th>
                <th>Status Permohonan</th>
                <th>Petugas PPID</th>
                <th>Tgl Pengajuan</th>
                <th>Sisa Hari</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item) => {
                const sisaHari = hitungSisaHari(item.batasWaktu);
                return (
                  <tr key={item.id} className={sisaHari <= 0 ? "row-sla-danger" : sisaHari <= 7 ? "row-sla-warning" : ""}>
                    <td className="col-reg-id">{item.nomorRegistrasi}</td>
                    <td>
                      <div className="pengaju-info">
                        <div className="pengaju-name">{item.namaPengaju}</div>
                        <div className="pengaju-unit">{item.unitKerja}</div>
                      </div>
                    </td>
                    <td><span className="badge badge-jenis">{item.jenisPermohonan}</span></td>
                    <td>{item.unitKerjaTujuan}</td>
                    <td><span className={`badge ${getStatusBadge(item.tingkatUrgensi, "urgensi")}`}>{item.tingkatUrgensi}</span></td>
                    <td><span className={`badge ${getStatusBadge(item.statusAtasan, "atasan")}`}>{item.statusAtasan}</span></td>
                    <td><span className={`badge ${getStatusBadge(item.statusPermohonan, "permohonan")}`}>{item.statusPermohonan}</span></td>
                    <td>
                      {item.petugasPPID !== "-" ? (
                        <div className="petugas-info">
                          <span className="petugas-avatar">👤</span>
                          <span>{item.petugasPPID}</span>
                        </div>
                      ) : (
                        <span className="belum-diassign">-</span>
                      )}
                    </td>
                    <td>{formatTanggal(item.tanggalPengajuan)}</td>
                    <td>
                      {item.statusPermohonan !== "Selesai" && item.statusPermohonan !== "Ditolak" ? (
                        <span className={`badge ${getSisaHariClass(sisaHari)}`}>
                          {sisaHari <= 0 ? `Terlambat ${Math.abs(sisaHari)} hari` : `${sisaHari} hari`}
                        </span>
                      ) : (
                        <span className="badge badge-selesai">Selesai</span>
                      )}
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button className="btn btn-detail" onClick={() => handleOpenDetail(item)}>Detail</button>
                        <button className="btn btn-proses" onClick={() => handleOpenProses(item)} disabled={item.statusPermohonan === "Selesai" || item.statusPermohonan === "Ditolak"}>Proses</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL */}
      {showModal && selectedItem && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content modal-large" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{modalType === "detail" ? `Detail Permohonan #${selectedItem.nomorRegistrasi}` : `Proses Permohonan #${selectedItem.nomorRegistrasi}`}</h2>
              <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <div className="modal-body">
              {modalType === "detail" && (
                <div>
                  <div className="detail-section">
                    <h3>Data Pengaju</h3>
                    <div className="detail-grid">
                      <div className="detail-item"><label>NIP</label><p>{selectedItem.nip}</p></div>
                      <div className="detail-item"><label>Nama Pengaju</label><p>{selectedItem.namaPengaju}</p></div>
                      <div className="detail-item"><label>Unit Kerja</label><p>{selectedItem.unitKerja}</p></div>
                      <div className="detail-item"><label>Jenis Permohonan</label><p><span className="badge badge-jenis">{selectedItem.jenisPermohonan}</span></p></div>
                    </div>
                  </div>
                  <div className="detail-section">
                    <h3>Detail Permohonan</h3>
                    <div className="detail-grid">
                      <div className="detail-item"><label>Unit Kerja Tujuan</label><p>{selectedItem.unitKerjaTujuan}</p></div>
                      <div className="detail-item"><label>Tanggal Pengajuan</label><p>{formatTanggal(selectedItem.tanggalPengajuan)}</p></div>
                      <div className="detail-item full-width"><label>Uraian</label><p className="uraian-text">{selectedItem.uraian}</p></div>
                    </div>
                  </div>
                  {selectedItem.tanggapan && (
                    <div className="detail-section">
                      <h3>Tanggapan / Putusan</h3>
                      <div className="tanggapan-box"><p>{selectedItem.tanggapan}</p></div>
                    </div>
                  )}
                  <div className="detail-section">
                    <h3>Riwayat Persetujuan</h3>
                    <div className="timeline">
                      {selectedItem.riwayat.map((r, idx) => (
                        <div key={idx} className="timeline-item">
                          <div className="timeline-date">{formatTanggal(r.tanggal)}</div>
                          <div className="timeline-status">{r.status}</div>
                          <div className="timeline-keterangan">{r.keterangan}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              {modalType === "proses" && (
                <div className="form-section">
                  <div className="form-group">
                    <label>Petugas Penanggung Jawab *</label>
                    <select>
                      <option value="">-- Pilih Petugas PPID --</option>
                      <option value="Hendra Wijaya, S.H">Hendra Wijaya, S.H</option>
                      <option value="Siti Rahayu, M.AP">Siti Rahayu, M.AP</option>
                      <option value="Dr. Ahmad Fauzi, M.Pd">Dr. Ahmad Fauzi, M.Pd</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Status Permohonan *</label>
                    <select>
                      <option value="">-- Pilih Status --</option>
                      <option value="Diproses">Diproses</option>
                      <option value="Mediasi">Mediasi</option>
                      <option value="Selesai">Selesai</option>
                      <option value="Ditolak">Ditolak</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Catatan Proses / Mediasi</label>
                    <textarea rows="3" placeholder="Catatan proses..."></textarea>
                  </div>
                  <div className="form-group">
                    <label>Tanggapan / Putusan</label>
                    <textarea rows="4" placeholder="Tulis tanggapan atau putusan..."></textarea>
                  </div>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Tutup</button>
              {modalType === "proses" && <button className="btn btn-primary">Simpan</button>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}