import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Permohonan.css";

export default function Permohonan() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    // Data auto-fill (read-only)
    nip: "",
    namaPengaju: "",
    unitKerja: "",
    
    // Field kontak
    email: "",
    noHp: "",
    
    // Field form
    jenisPermohonan: "",
    referensiPermohonan: "",
    uraian: "",
    unitKerjaTujuan: "",
    tingkatUrgensi: "",
    dokumen: [], // Tetap array agar UI .map() tidak error, tapi hanya isi 1 file
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser") || "{}");

    setForm(prev => ({
        ...prev,
        nip: user.nip || "",
        namaPengaju: user.nama || "",
        unitKerja: user.unit_organisasi || "",
        // ✅ REV 1: atasanPengaju dihapus total dari sini
    }));
  }, []);

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

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
    
    // ✅ REV 3: Hanya ambil file pertama karena backend hanya menerima 1 file
    if (files.length > 0) {
      const file = files[0];
      const isValidType = ["application/pdf", "image/jpeg", "image/png", "image/jpg"].includes(file.type);
      
      if (!isValidType) {
        errs.dokumen = "Hanya file PDF atau Image (JPG/PNG) yang diperbolehkan";
      }
      if (file.size > 5 * 1024 * 1024) {
        errs.dokumen = "Ukuran file melebihi 5MB";
      }
      
      setErrors((prev) => ({ ...prev, ...errs }));
      
      // Hanya simpan jika valid
      if (isValidType && file.size <= 5 * 1024 * 1024) {
        setForm((prev) => ({ ...prev, dokumen: [file] }));
      }
    }
  };

  const removeFile = () => {
    // ✅ REV 3: Reset dokumen menjadi array kosong
    setForm((prev) => ({ ...prev, dokumen: [] }));
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
    
    // Validasi untuk Email dan Nomor HP
    if (!form.email.trim()) {
      err.email = "Email wajib diisi";
    }
    if (!form.noHp.trim()) {
      err.noHp = "Nomor HP wajib diisi";
    }

    return err;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    setErrors(err);

    if (Object.keys(err).length === 0) {
      setLoading(true);
      try {
        const formData = new FormData();
        
        // Memetakan state form ke nama field yang diharapkan backend (snake_case)
        formData.append("nip_pengaju", form.nip);
        formData.append("nama_pengaju", form.namaPengaju);
        formData.append("unit_pengaju", form.unitKerja);
        formData.append("email", form.email);
        formData.append("no_hp", form.noHp);
        // ✅ REV 1: formData.append("atasan_pengaju", ...) DIHAPUS
        formData.append("jenis_permohonan", form.jenisPermohonan);
        formData.append("referensi_permohonan", form.referensiPermohonan);
        formData.append("uraian_permohonan", form.uraian);
        
        // ✅ REV 2: Syntax error diperbaiki, dipisah menjadi 2 baris
        formData.append("unit_tujuan", form.unitKerjaTujuan);
        formData.append("tingkat_urgensi", form.tingkatUrgensi);

        // Backend menangani 1 file 'lampiran'. Ambil file pertama dari array.
        if (form.dokumen.length > 0) {
          formData.append("lampiran", form.dokumen[0]);
        }

        for (let pair of formData.entries()) {console.log(pair[0], pair[1]);}

        const response = await axios.post(
          "http://localhost:8080/api/ppid",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.data.status) {
          alert(
            `Permohonan berhasil dikirim!\n\nNomor Registrasi: ${response.data.data.nomor_registrasi}`
          );
          navigate("/humasdata/PPID");
        } else {
          alert(response.data.message || "Gagal mengirim permohonan.");
        }
      } catch (err) {

    console.log("Status:", err.response?.status);

    console.log(JSON.stringify(err.response.data, null, 2));

    console.error(err);

} finally {
        setLoading(false);
      }
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
            
            {/* Input Email dan Nomor HP (Editable) */}
            <div className="form-group">
              <label>
                Email <span className="required">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Masukkan alamat email aktif"
                className={errors.email ? "input-error" : ""}
              />
              {errors.email && (
                <span className="error-text">{errors.email}</span>
              )}
            </div>
            <div className="form-group">
              <label>
                Nomor HP <span className="required">*</span>
              </label>
              <input
                type="text"
                name="noHp"
                value={form.noHp}
                onChange={handleChange}
                placeholder="Contoh: 081234567890"
                className={errors.noHp ? "input-error" : ""}
              />
              {errors.noHp && (
                <span className="error-text">{errors.noHp}</span>
              )}
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
            {/* ✅ REV 3: Atribut 'multiple' dihapus */}
            <input
              type="file"
              accept=".pdf,image/jpeg,image/png,image/jpg"
              onChange={handleFileChange}
              className={errors.dokumen ? "input-error" : ""}
            />
            {/* ✅ REV 4: Teks petunjuk diperbarui */}
            <small>
              Opsional. Format: PDF, JPG, PNG. Maksimal 5 MB.
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
                      onClick={removeFile}
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
            onClick={() => navigate("/humasdata/PPID")}
            disabled={loading}
          >
            Batal
          </button>
          <button 
            type="submit" 
            className="btn-primary"
            disabled={loading}
          >
            {loading ? "Mengirim..." : "Ajukan Permohonan"}
          </button>
        </div>
      </form>
    </div>
  );
}