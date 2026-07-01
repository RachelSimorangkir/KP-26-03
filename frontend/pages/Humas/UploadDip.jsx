import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UploadDip.css";

export default function UploadDip() {
  const navigate = useNavigate();

  // Mock data DIP 9 bidang
  const [dipData, setDipData] = useState([
    {
      id: 1,
      bidang: "Keuangan",
      status: "Selesai",
      namaFile: "DIP_Keuangan_2024.pdf",
      tanggalUpload: "2024-06-15",
      fileSize: "2.5 MB",
      catatan: "",
    },
    {
      id: 2,
      bidang: "Perencanaan",
      status: "Selesai",
      namaFile: "DIP_Perencanaan_2024.pdf",
      tanggalUpload: "2024-06-18",
      fileSize: "1.8 MB",
      catatan: "",
    },
    {
      id: 3,
      bidang: "Humas",
      status: "Selesai",
      namaFile: "DIP_Humas_2024.pdf",
      tanggalUpload: "2024-06-20",
      fileSize: "3.2 MB",
      catatan: "",
    },
    {
      id: 4,
      bidang: "Data",
      status: "Menunggu Validasi",
      namaFile: "DIP_Data_2024.pdf",
      tanggalUpload: "2024-06-22",
      fileSize: "4.1 MB",
      catatan: "",
    },
    {
      id: 5,
      bidang: "Evaluasi",
      status: "Revisi",
      namaFile: "DIP_Evaluasi_2024.pdf",
      tanggalUpload: "2024-06-19",
      fileSize: "2.9 MB",
      catatan: "Data evaluasi belum lengkap, mohon dilengkapi",
    },
    {
      id: 6,
      bidang: "Sistem Informasi",
      status: "Selesai",
      namaFile: "DIP_SI_2024.pdf",
      tanggalUpload: "2024-06-17",
      fileSize: "1.5 MB",
      catatan: "",
    },
    {
      id: 7,
      bidang: "Ortala Kepegawaian",
      status: "Belum Upload",
      namaFile: null,
      tanggalUpload: null,
      fileSize: null,
      catatan: "",
    },
    {
      id: 8,
      bidang: "Umum",
      status: "Selesai",
      namaFile: "DIP_Umum_2024.pdf",
      tanggalUpload: "2024-06-16",
      fileSize: "2.1 MB",
      catatan: "",
    },
    {
      id: 9,
      bidang: "BMN",
      status: "Belum Upload",
      namaFile: null,
      tanggalUpload: null,
      fileSize: null,
      catatan: "",
    },
  ]);

  // State untuk filter tahun
  const [filterTahun, setFilterTahun] = useState("2024");

  // State untuk modal
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(""); // 'validasi', 'reminder', 'lihat'
  const [selectedBidang, setSelectedBidang] = useState(null);

  // State untuk form validasi
  const [validasiForm, setValidasiForm] = useState({
    hasilValidasi: "",
    catatan: "",
  });

  // State untuk form reminder
  const [reminderForm, setReminderForm] = useState({
    bidangTerpilih: [],
    pesan: "Dengan hormat,\n\nKami mengingatkan bahwa batas waktu upload DIP Tahunan 2024 adalah 30 Juni 2024. Mohon segera mengunggah dokumen DIP bidang Anda.\n\nTerima kasih.",
  });

  // State untuk riwayat reminder
  const [riwayatReminder, setRiwayatReminder] = useState([
    { tanggal: "2024-06-20", bidang: ["Ortala Kepegawaian", "BMN"], jumlah: 2 },
    { tanggal: "2024-06-15", bidang: ["Evaluasi"], jumlah: 1 },
  ]);

  // Hitung progress
  const totalBidang = dipData.length;
  const selesaiCount = dipData.filter((d) => d.status === "Selesai").length;
  const progressPersentase = (selesaiCount / totalBidang) * 100;

  // Filter data berdasarkan tahun
  const filteredData = dipData; // Untuk demo, tidak ada filter tahun yang berbeda

  // Handle buka modal validasi
  const handleOpenValidasi = (bidang) => {
    setSelectedBidang(bidang);
    setValidasiForm({
      hasilValidasi: "",
      catatan: "",
    });
    setModalType("validasi");
    setShowModal(true);
  };

  // Handle buka modal reminder
  const handleOpenReminder = () => {
    const belumUpload = dipData.filter((d) => d.status === "Belum Upload");
    setReminderForm({
      bidangTerpilih: belumUpload.map((d) => d.bidang),
      pesan: "Dengan hormat,\n\nKami mengingatkan bahwa batas waktu upload DIP Tahunan 2024 adalah 30 Juni 2024. Mohon segera mengunggah dokumen DIP bidang Anda.\n\nTerima kasih.",
    });
    setModalType("reminder");
    setShowModal(true);
  };

  // Handle buka modal lihat
  const handleOpenLihat = (bidang) => {
    setSelectedBidang(bidang);
    setModalType("lihat");
    setShowModal(true);
  };

  // Handle submit validasi
  const handleSubmitValidasi = (e) => {
    e.preventDefault();

    if (!validasiForm.hasilValidasi) {
      alert("Hasil validasi wajib dipilih!");
      return;
    }

    if ((validasiForm.hasilValidasi === "Revisi" || validasiForm.hasilValidasi === "Ditolak") && !validasiForm.catatan) {
      alert("Catatan validasi wajib diisi jika status Revisi atau Ditolak!");
      return;
    }

    if (window.confirm("Simpan hasil validasi?")) {
      // Update data
      const updatedData = dipData.map((d) =>
        d.id === selectedBidang.id
          ? { ...d, status: validasiForm.hasilValidasi, catatan: validasiForm.catatan }
          : d
      );
      setDipData(updatedData);
      alert("Validasi berhasil disimpan!");
      setShowModal(false);
    }
  };

  // Handle submit reminder
  const handleSubmitReminder = (e) => {
    e.preventDefault();

    if (reminderForm.bidangTerpilih.length === 0) {
      alert("Minimal pilih 1 bidang untuk dikirim reminder!");
      return;
    }

    if (window.confirm(`Kirim reminder ke ${reminderForm.bidangTerpilih.length} bidang?`)) {
      // Tambah ke riwayat
      const newRiwayat = {
        tanggal: new Date().toISOString().split("T")[0],
        bidang: reminderForm.bidangTerpilih,
        jumlah: reminderForm.bidangTerpilih.length,
      };
      setRiwayatReminder([newRiwayat, ...riwayatReminder]);
      alert("Reminder berhasil dikirim!");
      setShowModal(false);
    }
  };

  // Handle checkbox bidang
  const handleBidangChange = (bidang) => {
    const newBidang = reminderForm.bidangTerpilih.includes(bidang)
      ? reminderForm.bidangTerpilih.filter((b) => b !== bidang)
      : [...reminderForm.bidangTerpilih, bidang];
    setReminderForm({ ...reminderForm, bidangTerpilih: newBidang });
  };

  // Handle select all
  const handleSelectAll = () => {
    const belumUpload = dipData.filter((d) => d.status === "Belum Upload");
    if (reminderForm.bidangTerpilih.length === belumUpload.length) {
      setReminderForm({ ...reminderForm, bidangTerpilih: [] });
    } else {
      setReminderForm({ ...reminderForm, bidangTerpilih: belumUpload.map((d) => d.bidang) });
    }
  };

  // Badge status helper
  const getStatusBadgeClass = (status) => {
    const statusMap = {
      Selesai: "badge-selesai",
      "Menunggu Validasi": "badge-menunggu",
      Revisi: "badge-revisi",
      "Belum Upload": "badge-belum",
    };
    return statusMap[status] || "badge-menunggu";
  };

  // Format tanggal
  const formatTanggal = (dateStr) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="upload-dip-page">
      {/* BACK BUTTON */}
      <div className="page-header">
        <button className="back-button" onClick={() => navigate("/humasdata")}>
          ← Kembali
        </button>
        <h1>Upload DIP Tahunan</h1>
        <p>Monitoring upload Dokumen Informasi Publik (DIP) dari 9 bidang</p>
      </div>

      {/* PROGRESS BAR */}
      <div className="progress-section">
        <div className="progress-header">
          <h3>Progress Upload DIP {filterTahun}</h3>
          <span className="progress-text">
            {selesaiCount} dari {totalBidang} bidang ({Math.round(progressPersentase)}%)
          </span>
        </div>
        <div className="progress-bar-container">
          <div
            className="progress-bar"
            style={{ width: `${progressPersentase}%` }}
          ></div>
        </div>
        <div className="progress-stats">
          <div className="stat-item">
            <span className="stat-icon">✅</span>
            <span className="stat-label">Selesai</span>
            <span className="stat-value">{selesaiCount}</span>
          </div>
          <div className="stat-item">
            <span className="stat-icon">⏳</span>
            <span className="stat-label">Menunggu Validasi</span>
            <span className="stat-value">{dipData.filter((d) => d.status === "Menunggu Validasi").length}</span>
          </div>
          <div className="stat-item">
            <span className="stat-icon">🟡</span>
            <span className="stat-label">Revisi</span>
            <span className="stat-value">{dipData.filter((d) => d.status === "Revisi").length}</span>
          </div>
          <div className="stat-item">
            <span className="stat-icon">🔴</span>
            <span className="stat-label">Belum Upload</span>
            <span className="stat-value">{dipData.filter((d) => d.status === "Belum Upload").length}</span>
          </div>
        </div>
      </div>

      {/* FILTER & ACTION */}
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
        </div>
        <button className="btn-reminder" onClick={handleOpenReminder}>
           Kirim Reminder
        </button>
      </div>

      {/* MATRIKS STATUS */}
      <div className="table-container">
        <table className="dip-table">
          <thead>
            <tr>
              <th>Nama Bidang</th>
              <th>Status Upload</th>
              <th>Nama File</th>
              <th>Tanggal Upload</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item.id}>
                <td className="bidang-name">{item.bidang}</td>
                <td>
                  <span className={`badge ${getStatusBadgeClass(item.status)}`}>
                    {item.status === "Selesai" && "✅ "}
                    {item.status === "Menunggu Validasi" && " "}
                    {item.status === "Revisi" && "🟡 "}
                    {item.status === "Belum Upload" && "🔴 "}
                    {item.status}
                  </span>
                </td>
                <td>
                  {item.namaFile ? (
                    <span className="file-link">{item.namaFile}</span>
                  ) : (
                    <span className="no-file">-</span>
                  )}
                </td>
                <td>{formatTanggal(item.tanggalUpload)}</td>
                <td className="aksi-cell">
                  {item.namaFile && (
                    <button
                      className="btn-action btn-lihat"
                      onClick={() => handleOpenLihat(item)}
                      title="Lihat Dokumen"
                    >
                      👁️
                    </button>
                  )}
                  {item.status === "Menunggu Validasi" && (
                    <button
                      className="btn-action btn-validasi"
                      onClick={() => handleOpenValidasi(item)}
                      title="Validasi"
                    >
                      ✓
                    </button>
                  )}
                  {item.status === "Belum Upload" && (
                    <button
                      className="btn-action btn-reminder-small"
                      onClick={handleOpenReminder}
                      title="Kirim Reminder"
                    >
                      📧
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* RIWAYAT REMINDER */}
      {riwayatReminder.length > 0 && (
        <div className="riwayat-section">
          <h3>Riwayat Reminder Terkirim</h3>
          <div className="riwayat-list">
            {riwayatReminder.map((item, idx) => (
              <div key={idx} className="riwayat-item">
                <div className="riwayat-date">{formatTanggal(item.tanggal)}</div>
                <div className="riwayat-bidang">
                  {item.bidang.join(", ")}
                </div>
                <div className="riwayat-jumlah">{item.jumlah} bidang</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODAL LIHAT DOKUMEN */}
      {showModal && modalType === "lihat" && selectedBidang && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>📄 Dokumen DIP - {selectedBidang.bidang}</h2>
              <button className="modal-close" onClick={() => setShowModal(false)}>
                ✕
              </button>
            </div>
            <div className="modal-body">
              <div className="document-info">
                <div className="info-item">
                  <label>Nama File</label>
                  <p>{selectedBidang.namaFile}</p>
                </div>
                <div className="info-item">
                  <label>Ukuran File</label>
                  <p>{selectedBidang.fileSize}</p>
                </div>
                <div className="info-item">
                  <label>Tanggal Upload</label>
                  <p>{formatTanggal(selectedBidang.tanggalUpload)}</p>
                </div>
                <div className="info-item">
                  <label>Status</label>
                  <span className={`badge ${getStatusBadgeClass(selectedBidang.status)}`}>
                    {selectedBidang.status}
                  </span>
                </div>
              </div>

              <div className="document-preview">
                <div className="preview-placeholder">
                  <span className="preview-icon">📄</span>
                  <p>Preview dokumen PDF</p>
                  <p className="preview-note">
                    (Untuk demo, preview tidak tersedia. Silakan download file untuk melihat isi dokumen.)
                  </p>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setShowModal(false)}>
                Tutup
              </button>
              <button className="btn-primary">
                ️ Download Dokumen
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL VALIDASI */}
      {showModal && modalType === "validasi" && selectedBidang && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>✓ Validasi Dokumen DIP - {selectedBidang.bidang}</h2>
              <button className="modal-close" onClick={() => setShowModal(false)}>
                ✕
              </button>
            </div>
            <form onSubmit={handleSubmitValidasi}>
              <div className="modal-body">
                <div className="document-info">
                  <div className="info-item">
                    <label>Nama File</label>
                    <p>{selectedBidang.namaFile}</p>
                  </div>
                  <div className="info-item">
                    <label>Tanggal Upload</label>
                    <p>{formatTanggal(selectedBidang.tanggalUpload)}</p>
                  </div>
                </div>

                <div className="form-section">
                  <div className="form-group">
                    <label>Hasil Validasi *</label>
                    <select
                      value={validasiForm.hasilValidasi}
                      onChange={(e) => setValidasiForm({ ...validasiForm, hasilValidasi: e.target.value })}
                      required
                    >
                      <option value="">-- Pilih Hasil Validasi --</option>
                      <option value="Selesai">✅ Selesai</option>
                      <option value="Revisi"> Revisi</option>
                      <option value="Ditolak">❌ Ditolak</option>
                    </select>
                  </div>

                  {(validasiForm.hasilValidasi === "Revisi" || validasiForm.hasilValidasi === "Ditolak") && (
                    <div className="form-group">
                      <label>Catatan Validasi *</label>
                      <textarea
                        value={validasiForm.catatan}
                        onChange={(e) => setValidasiForm({ ...validasiForm, catatan: e.target.value })}
                        rows="4"
                        placeholder="Jelaskan alasan revisi/penolakan..."
                        required
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>
                  Batal
                </button>
                <button type="submit" className="btn-primary">
                  Simpan Validasi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL REMINDER */}
      {showModal && modalType === "reminder" && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content modal-large" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>📧 Kirim Reminder Upload DIP</h2>
              <button className="modal-close" onClick={() => setShowModal(false)}>
                ✕
              </button>
            </div>
            <form onSubmit={handleSubmitReminder}>
              <div className="modal-body">
                <div className="form-section">
                  <h3>Pilih Bidang</h3>
                  <div className="checkbox-header">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={reminderForm.bidangTerpilih.length === dipData.filter((d) => d.status === "Belum Upload").length}
                        onChange={handleSelectAll}
                      />
                      <strong>Pilih Semua yang Belum Upload</strong>
                    </label>
                  </div>
                  <div className="checkbox-list">
                    {dipData
                      .filter((d) => d.status === "Belum Upload")
                      .map((item) => (
                        <label key={item.id} className="checkbox-label">
                          <input
                            type="checkbox"
                            checked={reminderForm.bidangTerpilih.includes(item.bidang)}
                            onChange={() => handleBidangChange(item.bidang)}
                          />
                          {item.bidang}
                        </label>
                      ))}
                  </div>
                  {reminderForm.bidangTerpilih.length === 0 && (
                    <p className="warning-text">⚠️ Tidak ada bidang yang dipilih</p>
                  )}
                </div>

                <div className="form-section">
                  <h3>Pesan Reminder</h3>
                  <div className="form-group">
                    <textarea
                      value={reminderForm.pesan}
                      onChange={(e) => setReminderForm({ ...reminderForm, pesan: e.target.value })}
                      rows="6"
                      placeholder="Tulis pesan reminder..."
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>
                  Batal
                </button>
                <button type="submit" className="btn-primary">
                  Kirim Reminder
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}