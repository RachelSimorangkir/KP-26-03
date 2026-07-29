import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./FormHelpdesk.css";

export default function FormHelpdesk() {
  const navigate = useNavigate();


  const [form, setForm] = useState({
    // Data auto-fill (read-only)
    nip: "",
    namaPelapor: "",
    unitKerja: "",

    // Field form
    emailUsername: "",
    nomorTelepon: "",
    namaAplikasi: "",
    kategoriKendala: "",
    tingkatUrgensi: "",
    judulMasalah: "",
    deskripsiMasalah: "",
    lampiran: [],
});

useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser") || "{}");

    setForm(prev => ({
        ...prev,
        nip: user.nip || "",
        namaPelapor: user.nama || "",
        unitKerja: user.unit_organisasi || ""
    }));
}, []);
  
  


  const [errors, setErrors] = useState({});

  // Opsi untuk dropdown
  const aplikasiOptions = [
    "SIMPEG - Sistem Informasi Kepegawaian",
    "SIKA - Sistem Informasi Keuangan",
    "SIAK - Sistem Informasi Akademik",
    "SIMDA - Sistem Informasi Manajemen Data",
    "E-Office - Aplikasi Persuratan",
    "Jendela Internal Bimas Kristen",
    "Sistem Informasi BMN",
    "Aplikasi Lainnya",
  ];

  const kategoriOptions = [
    { value: "error-sistem", label: "Error Sistem" },
    { value: "reset-password", label: "Reset Password" },
    { value: "permintaan-akses", label: "Permintaan Akses" },
    { value: "pelatihan", label: "Pelatihan/Panduan" },
    { value: "bug", label: "Bug/Perbaikan" },
    { value: "lainnya", label: "Lainnya" },
  ];

  const urgensiOptions = [
    { value: "rendah", label: "Rendah - Tidak mendesak" },
    { value: "sedang", label: "Sedang - Perlu diselesaikan dalam 3-5 hari" },
    { value: "tinggi", label: "Tinggi - Perlu diselesaikan dalam 1-2 hari" },
    { value: "kritis", label: "Kritis - Sangat mendesak, mengganggu pekerjaan" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const errs = {};
    
    files.forEach((f) => {
      if (f.size > 5 * 1024 * 1024) {
        errs.lampiran = "Satu atau lebih file melebihi 5MB";
      }
    });
    
    setErrors((prev) => ({ ...prev, ...errs }));
    setForm((prev) => ({ ...prev, lampiran: files }));
  };

  const removeFile = (index) => {
    const newFiles = [...form.lampiran];
    newFiles.splice(index, 1);
    setForm((prev) => ({ ...prev, lampiran: newFiles }));
  };

  const validate = () => {
    const err = {};
    if (!form.emailUsername) err.emailUsername = "Email/Username wajib diisi";
    if (!form.nomorTelepon) err.nomorTelepon = "Nomor telepon/WA wajib diisi";
    if (!form.namaAplikasi) err.namaAplikasi = "Nama aplikasi wajib dipilih";
    if (!form.kategoriKendala) err.kategoriKendala = "Kategori kendala wajib dipilih";
    if (!form.tingkatUrgensi) err.tingkatUrgensi = "Tingkat urgensi wajib dipilih";
    if (!form.judulMasalah) err.judulMasalah = "Judul masalah wajib diisi";
    if (!form.deskripsiMasalah) err.deskripsiMasalah = "Deskripsi masalah wajib diisi";
    return err;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validate();
    setErrors(err);

    if (Object.keys(err).length === 0) {
      alert("Tiket bantuan berhasil dikirim!");
      navigate("/humasdata/helpdesk");
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="rekom-page">
      {/* BACK BUTTON */}
      <div className="rekom-header">
        <button
          className="back-button"
          onClick={() => navigate("/humasdata/helpdesk")}
        >
          ← Kembali
        </button>
      </div>

      {/* BANNER */}
      <section className="service-banner">
        <div className="service-banner-content">
          <h1>Form Pengajuan Tiket Bantuan</h1>
          <p>
            Lengkapi formulir di bawah ini untuk mengajukan tiket bantuan teknis.
          </p>
        </div>
      </section>

      {/* FORM */}
      <form className="form-pengajuan" onSubmit={handleSubmit}>
        {/* Error Summary */}
        {Object.keys(errors).length > 0 && (
          <div className="error-summary">
            <strong>⚠️ Terdapat {Object.keys(errors).length} kesalahan:</strong>
            <ul>
              {Object.values(errors).map((err, idx) => (
                <li key={idx}>{err}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Info Pelapor */}
        <section className="description-card">
          <h2>Data Pelapor</h2>
          <div className="form-grid">
            <div className="form-group">
              <label>NIP Pelapor</label>
              <input
                type="text"
                value={form.nip}
                readOnly
                className="readonly-input"
              />
            </div>
            <div className="form-group">
              <label>Nama Pelapor</label>
              <input
                type="text"
                value={form.namaPelapor}
                readOnly
                className="readonly-input"
              />
            </div>
            <div className="form-group full-width">
              <label>Unit Kerja / Satker</label>
              <input
                type="text"
                value={form.unitKerja}
                readOnly
                className="readonly-input"
              />
            </div>
          </div>
        </section>

        {/* Kontak & Identitas */}
        <section className="description-card">
          <h2>Informasi Kontak</h2>
          <div className="form-grid">
            <div className="form-group">
              <label>
                Email / Username Aplikasi <span className="required">*</span>
              </label>
              <input
                type="text"
                name="emailUsername"
                value={form.emailUsername}
                onChange={handleChange}
                placeholder="contoh@email.com atau username"
                className={errors.emailUsername ? "input-error" : ""}
              />
              {errors.emailUsername && (
                <span className="error-text">{errors.emailUsername}</span>
              )}
            </div>

            <div className="form-group">
              <label>
                Nomor Telepon / WhatsApp <span className="required">*</span>
              </label>
              <input
                type="tel"
                name="nomorTelepon"
                value={form.nomorTelepon}
                onChange={handleChange}
                placeholder="08xx-xxxx-xxxx"
                className={errors.nomorTelepon ? "input-error" : ""}
              />
              {errors.nomorTelepon && (
                <span className="error-text">{errors.nomorTelepon}</span>
              )}
            </div>
          </div>
        </section>

        {/* Detail Kendala */}
        <section className="description-card">
          <h2>Detail Kendala</h2>
          <div className="form-grid">
            {/* Nama Aplikasi */}
            <div className="form-group">
              <label>
                Nama Aplikasi / Sistem <span className="required">*</span>
              </label>
              <select
                name="namaAplikasi"
                value={form.namaAplikasi}
                onChange={handleChange}
                className={errors.namaAplikasi ? "input-error" : ""}
              >
                <option value="">-- Pilih Aplikasi --</option>
                {aplikasiOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              {errors.namaAplikasi && (
                <span className="error-text">{errors.namaAplikasi}</span>
              )}
            </div>

            {/* Kategori Kendala */}
            <div className="form-group">
              <label>
                Kategori Kendala <span className="required">*</span>
              </label>
              <select
                name="kategoriKendala"
                value={form.kategoriKendala}
                onChange={handleChange}
                className={errors.kategoriKendala ? "input-error" : ""}
              >
                <option value="">-- Pilih Kategori --</option>
                {kategoriOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              {errors.kategoriKendala && (
                <span className="error-text">{errors.kategoriKendala}</span>
              )}
            </div>

            {/* Tingkat Urgensi */}
            <div className="form-group full-width">
              <label>
                Tingkat Urgensi <span className="required">*</span>
              </label>
              <select
                name="tingkatUrgensi"
                value={form.tingkatUrgensi}
                onChange={handleChange}
                className={errors.tingkatUrgensi ? "input-error" : ""}
              >
                <option value="">-- Pilih Urgensi --</option>
                {urgensiOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              {errors.tingkatUrgensi && (
                <span className="error-text">{errors.tingkatUrgensi}</span>
              )}
            </div>

            {/* Judul Masalah */}
            <div className="form-group full-width">
              <label>
                Judul Masalah <span className="required">*</span>
              </label>
              <input
                type="text"
                name="judulMasalah"
                value={form.judulMasalah}
                onChange={handleChange}
                placeholder="Ringkasan singkat masalah yang dialami"
                className={errors.judulMasalah ? "input-error" : ""}
              />
              {errors.judulMasalah && (
                <span className="error-text">{errors.judulMasalah}</span>
              )}
            </div>

            {/* Deskripsi Masalah */}
            <div className="form-group full-width">
              <label>
                Deskripsi Masalah <span className="required">*</span>
              </label>
              <textarea
                name="deskripsiMasalah"
                value={form.deskripsiMasalah}
                onChange={handleChange}
                rows="8"
                placeholder="Jelaskan detail kronologi kendala yang dialami. Sertakan langkah-langkah yang sudah dicoba untuk mengatasi masalah."
                className={errors.deskripsiMasalah ? "input-error" : ""}
              />
              {errors.deskripsiMasalah && (
                <span className="error-text">{errors.deskripsiMasalah}</span>
              )}
            </div>
          </div>
        </section>

        {/* Lampiran */}
        <section className="description-card">
          <h2>Lampiran Pendukung</h2>
          <div className="form-group full-width">
            <label>Screenshot / Bukti Pendukung</label>
            <input
              type="file"
              multiple
              accept="image/*,.pdf"
              onChange={handleFileChange}
              className={errors.lampiran ? "input-error" : ""}
            />
            <small>
              Opsional. Format: JPG, PNG, PDF. Maksimal 5MB per file.
            </small>
            {errors.lampiran && (
              <span className="error-text">{errors.lampiran}</span>
            )}
            
            {form.lampiran.length > 0 && (
              <div className="file-list">
                {form.lampiran.map((file, idx) => (
                  <div key={idx} className="file-item">
                    <span className="file-info">
                      📎 {file.name} ({Math.round(file.size / 1024)} KB)
                    </span>
                    <button
                      type="button"
                      className="btn-remove-file"
                      onClick={() => removeFile(idx)}
                      title="Hapus file"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Submit Buttons */}
        <div className="form-actions">
          <button
            type="button"
            className="btn-secondary"
            onClick={() => navigate("/humasdata/helpdesk")}
          >
            Batal
          </button>
          <button type="submit" className="btn-primary">
            Kirim Tiket Bantuan
          </button>
        </div>
      </form>
    </div>
  );
}