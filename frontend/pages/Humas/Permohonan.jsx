import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Permohonan.css";

export default function Permohonan() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    // Data auto-fill (read-only)
    nip: "197001011990031001",
    namaPengaju: "Nama Pengaju",
    unitKerja: "Kanwil",
    
    // Field form
    jenisPermohonan: "",
    referensiPermohonan: "",
    uraian: "",
    unitKerjaTujuan: "",
    tingkatUrgensi: "",
    dokumen: [],
    atasanPengaju: "",
  });

  const [errors, setErrors] = useState({});

  // Opsi untuk dropdown
  const jenisPermohonanOptions = [
    { value: "dokumen", label: "Permintaan Dokumen" },
    { value: "informasi", label: "Permintaan Informasi" },
    { value: "keberatan", label: "Keberatan atas Respon Sebelumnya" },
  ];

  const unitTujuanOptions = [
    "Bagian Hukum & Organisasi",
    "Bagian Keuangan",
    "Bagian Kepegawaian",
    "Bagian Umum",
    "Bidang Bimas Kristen",
    "Bidang Pendidikan Kristen",
    "Bidang Pelayanan Sosial",
    "Bidang Informasi & Komunikasi",
    "Bagian Data & Statistik",
    "Pimpinan / Kepala Kantor",
  ];

  const urgensiOptions = [
    { value: "normal", label: "Normal (diproses dalam 5-7 hari kerja)" },
    { value: "segera", label: "Segera (diproses dalam 1-3 hari kerja)" },
  ];

  const atasanOptions = [
    "Dr. Budi - Kepala Bagian",
    "Ibu Sari - Kepala Sub Bagian",
    "Kepala Satker",
    "Kepala Bidang",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    
    // Reset error referensi jika jenis permohonan berubah dari keberatan
    if (name === "jenisPermohonan") {
      setErrors((prev) => ({ ...prev, referensiPermohonan: null }));
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const errs = {};
    
    files.forEach((f) => {
      const isValidType = ["application/pdf", "image/jpeg", "image/png", "image/jpg"].includes(f.type);
      if (!isValidType) {
        errs.dokumen = "Hanya file PDF atau Image (JPG/PNG) yang diperbolehkan";
      }
      if (f.size > 5 * 1024 * 1024) {
        errs.dokumen = "Satu atau lebih file melebihi 5MB";
      }
    });
    
    setErrors((prev) => ({ ...prev, ...errs }));
    setForm((prev) => ({ ...prev, dokumen: files }));
  };

  const removeFile = (index) => {
    const newFiles = [...form.dokumen];
    newFiles.splice(index, 1);
    setForm((prev) => ({ ...prev, dokumen: newFiles }));
  };

  const validate = () => {
    const err = {};
    if (!form.jenisPermohonan) err.jenisPermohonan = "Jenis permohonan wajib dipilih";
    
    // Referensi wajib jika jenis = keberatan
    if (form.jenisPermohonan === "keberatan" && !form.referensiPermohonan) {
      err.referensiPermohonan = "Nomor permohonan sebelumnya wajib diisi untuk keberatan";
    }
    
    if (!form.uraian) err.uraian = "Uraian permohonan/keberatan wajib diisi";
    if (!form.unitKerjaTujuan) err.unitKerjaTujuan = "Unit kerja tujuan wajib dipilih";
    if (!form.tingkatUrgensi) err.tingkatUrgensi = "Tingkat urgensi wajib dipilih";
    if (!form.atasanPengaju) err.atasanPengaju = "Atasan penyetuju wajib dipilih";
    
    return err;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validate();
    setErrors(err);

    if (Object.keys(err).length === 0) {
      alert("Permohonan berhasil dikirim!");
      navigate("/humasdata/permohonan");
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
          onClick={() => navigate("/humasdata/PPID")}
        >
          ← Kembali
        </button>
      </div>

      {/* BANNER */}
      <section className="service-banner">
        <div className="service-banner-content">
          <h1>Permohonan / Keberatan Informasi</h1>
          <p>
            Lengkapi formulir di bawah ini untuk mengajukan permohonan atau keberatan informasi antar-unit.
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

        {/* Info Pengaju */}
        <section className="description-card">
          <h2>Data Pengaju</h2>
          <div className="form-grid">
            <div className="form-group">
              <label>NIP Pengaju</label>
              <input
                type="text"
                value={form.nip}
                readOnly
                className="readonly-input"
              />
            </div>
            <div className="form-group">
              <label>Nama Pengaju</label>
              <input
                type="text"
                value={form.namaPengaju}
                readOnly
                className="readonly-input"
              />
            </div>
            <div className="form-group full-width">
              <label>Unit Kerja Pengaju</label>
              <input
                type="text"
                value={form.unitKerja}
                readOnly
                className="readonly-input"
              />
            </div>
          </div>
        </section>

        {/* Detail Permohonan */}
        <section className="description-card">
          <h2>Detail Permohonan / Keberatan</h2>
          <div className="form-grid">
            {/* Jenis Permohonan */}
            <div className="form-group">
              <label>
                Jenis Permohonan <span className="required">*</span>
              </label>
              <select
                name="jenisPermohonan"
                value={form.jenisPermohonan}
                onChange={handleChange}
                className={errors.jenisPermohonan ? "input-error" : ""}
              >
                <option value="">-- Pilih Jenis Permohonan --</option>
                {jenisPermohonanOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              {errors.jenisPermohonan && (
                <span className="error-text">{errors.jenisPermohonan}</span>
              )}
            </div>

            {/* Referensi Permohonan Awal - Conditional */}
            <div className="form-group">
              <label>
                Referensi Permohonan Awal
                {form.jenisPermohonan === "keberatan" && (
                  <span className="required"> *</span>
                )}
              </label>
              <input
                type="text"
                name="referensiPermohonan"
                value={form.referensiPermohonan}
                onChange={handleChange}
                placeholder={
                  form.jenisPermohonan === "keberatan"
                    ? "Nomor permohonan sebelumnya (wajib)"
                    : "Nomor permohonan sebelumnya (opsional)"
                }
                className={errors.referensiPermohonan ? "input-error" : ""}
              />
              {errors.referensiPermohonan && (
                <span className="error-text">{errors.referensiPermohonan}</span>
              )}
              {form.jenisPermohonan === "keberatan" && (
                <small className="hint-warning">
                  ⚠️ Wajib diisi untuk jenis "Keberatan atas Respon Sebelumnya"
                </small>
              )}
            </div>

            {/* Uraian Permohonan */}
            <div className="form-group full-width">
              <label>
                Uraian Permohonan / Keberatan <span className="required">*</span>
              </label>
              <textarea
                name="uraian"
                value={form.uraian}
                onChange={handleChange}
                rows="8"
                placeholder="Jelaskan secara detail kebutuhan informasi atau alasan keberatan Anda..."
                className={errors.uraian ? "input-error" : ""}
              />
              {errors.uraian && (
                <span className="error-text">{errors.uraian}</span>
              )}
            </div>

            {/* Unit Kerja Tujuan */}
            <div className="form-group">
              <label>
                Unit Kerja Tujuan <span className="required">*</span>
              </label>
              <select
                name="unitKerjaTujuan"
                value={form.unitKerjaTujuan}
                onChange={handleChange}
                className={errors.unitKerjaTujuan ? "input-error" : ""}
              >
                <option value="">-- Pilih Unit Kerja Tujuan --</option>
                {unitTujuanOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              {errors.unitKerjaTujuan && (
                <span className="error-text">{errors.unitKerjaTujuan}</span>
              )}
            </div>

            {/* Tingkat Urgensi */}
            <div className="form-group">
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
          </div>
        </section>

        {/* Dokumen Pendukung */}
        <section className="description-card">
          <h2>Dokumen Pendukung</h2>
          <div className="form-group full-width">
            <label>Lampiran Dokumen</label>
            <input
              type="file"
              multiple
              accept=".pdf,image/jpeg,image/png,image/jpg"
              onChange={handleFileChange}
              className={errors.dokumen ? "input-error" : ""}
            />
            <small>
              Opsional. Format: PDF, JPG, PNG. Maksimal 5MB per file.
            </small>
            {errors.dokumen && (
              <span className="error-text">{errors.dokumen}</span>
            )}
            
            {form.dokumen.length > 0 && (
              <div className="file-list">
                {form.dokumen.map((file, idx) => (
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
            onClick={() => navigate("/humasdata/PPID")}
          >
            Batal
          </button>
          <button type="submit" className="btn-primary">
            Ajukan Permohonan
          </button>
        </div>
      </form>
    </div>
  );
}