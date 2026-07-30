import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./DataInternal.css";
import Swal from "sweetalert2";

export default function DataInternal() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nip: "",
    namaPemohon: "",
    jabatan: "",
    unitKerja: "",

    // Field form
    jenisData: [],
    cakupanWilayah: "",
    periodeDari: "",
    periodeSampai: "",
    tujuanPenggunaanKategori: "",
    tujuanPenggunaanDetail: "",
    tingkatUrgensi: "",
    atasanPemohon: "",
    memoFile: null,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser") || "{}");

    setForm((prev) => ({
      ...prev,
      nip: user.nip || "",
      namaPemohon: user.nama || "",
      jabatan: user.jabatan || "",
      unitKerja: user.unit_organisasi || "",
    }));
  }, []);

  // Opsi untuk dropdown
  const jenisDataOptions = [
    "Data Kepegawaian",
    "Data Keuangan",
    "Data Aset/BMN",
    "Data Pendidikan",
    "Data Pelatihan",
    "Data Statistik",
    "Data Laporan Kinerja",
    "Data Lainnya",
  ];

  const cakupanOptions = [
    { value: "nasional", label: "Nasional" },
    { value: "provinsi", label: "Provinsi" },
    { value: "kab-kota", label: "Kabupaten/Kota" },
  ];

  const tujuanOptions = [
    "Penyusunan Laporan",
    "Analisis Kebijakan",
    "Evaluasi Program",
    "Penelitian Internal",
    "Keperluan Administrasi",
    "Lainnya",
  ];

  const urgensiOptions = [
    { value: "normal", label: "Normal (≤ 7 hari kerja)" },
    { value: "segera", label: "Segera (≤ 3 hari kerja)" },
    { value: "sangat-segera", label: "Sangat Segera (≤ 1 hari kerja)" },
  ];

  const atasanOptions = [
    "Dr. Budi - Kepala Bagian",
    "Ibu Sari - Kepala Sub Bagian",
    "Kepala Satker",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleMultiSelect = (e) => {
    const options = Array.from(e.target.selectedOptions, (opt) => opt.value);
    setForm((prev) => ({ ...prev, jenisData: options }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type !== "application/pdf") {
      setErrors((prev) => ({ ...prev, memoFile: "File harus berformat PDF" }));
      return;
    }
    setErrors((prev) => ({ ...prev, memoFile: null }));
    setForm((prev) => ({ ...prev, memoFile: file }));
  };

  const validate = () => {
    const err = {};
    if (form.jenisData.length === 0) {
      err.jenisData = "Jenis data wajib dipilih";
    }
    if (!form.cakupanWilayah) {
      err.cakupanWilayah = "Cakupan wilayah wajib dipilih";
    }
    if (!form.periodeDari) {
      err.periodeDari = "Tanggal awal periode wajib";
    }
    if (!form.periodeSampai) {
      err.periodeSampai = "Tanggal akhir periode wajib";
    }
    if (
      form.periodeDari &&
      form.periodeSampai &&
      form.periodeDari > form.periodeSampai
    ) {
      err.periodeSampai = "Tanggal akhir harus setelah tanggal awal";
    }
    if (!form.tujuanPenggunaanKategori) {
      err.tujuanPenggunaanKategori = "Kategori tujuan wajib dipilih";
    }
    if (!form.tujuanPenggunaanDetail) {
      err.tujuanPenggunaanDetail = "Detail tujuan wajib diisi";
    }
    if (!form.tingkatUrgensi) {
      err.tingkatUrgensi = "Tingkat urgensi wajib dipilih";
    }
    return err;
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  const err = validate();
  setErrors(err);

  if (Object.keys(err).length === 0) {

    await Swal.fire({
      icon: "success",
      title: "Permintaan Berhasil Dikirim",
      html: `
        <div style="font-size:15px; line-height:1.8">
          Permintaan data internal berhasil diajukan.<br>
          <strong>Pengajuan Anda sedang menunggu proses verifikasi.</strong>
        </div>
      `,
      confirmButtonText: "Lihat Status",
      confirmButtonColor: "#2563eb",
      width: "430px",
      padding: "2rem",
      timer: 3000,
      timerProgressBar: true,
    });

    navigate("/humasdata/PermintaanData/StatusData");
  } else {

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    Swal.fire({
      icon: "warning",
      title: "Form Belum Lengkap",
      text: "Masih ada data yang harus dilengkapi sebelum dikirim.",
      confirmButtonColor: "#f59e0b",
      confirmButtonText: "Periksa Kembali",
    });

  }
};

  return (
    <div className="rekom-page">
      {/* BACK BUTTON */}
      <div className="rekom-header">
        <button
          className="back-button"
          onClick={() => navigate("/humasdata/PermintaanData")}
        >
          ← Kembali
        </button>
      </div>

      {/* BANNER */}
      <section className="service-banner">
        <div className="service-banner-content">
          <h1>Permintaan Data Internal</h1>
          <p>
            Lengkapi formulir di bawah ini untuk mengajukan permintaan data
            internal.
          </p>
        </div>
      </section>

      {/* FORM */}
      <form className="form-pengajuan" onSubmit={handleSubmit}>
        {/* Error Summary */}
        {Object.keys(errors).length > 0 && (
          <div className="error-summary">
            <strong>
              ⚠️ Terdapat {Object.keys(errors).length} kesalahan:
            </strong>
            <ul>
              {Object.values(errors).map((err, idx) => (
                <li key={idx}>{err}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Info Pemohon */}
        <section className="description-card">
          <h2>Data Pemohon</h2>
          <div className="form-grid">
            <div className="form-group">
              <label>NIP Pemohon</label>
              <input
                type="text"
                value={form.nip}
                readOnly
                className="readonly-input"
              />
            </div>
            <div className="form-group">
              <label>Nama Pemohon</label>
              <input
                type="text"
                value={form.namaPemohon}
                readOnly
                className="readonly-input"
              />
            </div>
            <div className="form-group">
              <label>Jabatan</label>
              <input
                type="text"
                value={form.jabatan}
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

        {/* Detail Permintaan Data */}
        <section className="description-card">
          <h2>Detail Permintaan Data</h2>
          <div className="form-grid">
            {/* Jenis Data - Multi Select */}
            <div className="form-group full-width">
              <label>
                Jenis Data yang Diminta <span className="required">*</span>
              </label>
              <select
                name="jenisData"
                multiple
                value={form.jenisData}
                onChange={handleMultiSelect}
                className={`multi-select ${
                  errors.jenisData ? "input-error" : ""
                }`}
                size={5}
              >
                {jenisDataOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              <small>Tekan Ctrl/Cmd + klik untuk memilih lebih dari satu</small>
              {errors.jenisData && (
                <span className="error-text">{errors.jenisData}</span>
              )}
            </div>

            {/* Cakupan Wilayah */}
            <div className="form-group">
              <label>
                Cakupan Wilayah Data <span className="required">*</span>
              </label>
              <select
                name="cakupanWilayah"
                value={form.cakupanWilayah}
                onChange={handleChange}
                className={errors.cakupanWilayah ? "input-error" : ""}
              >
                <option value="">-- Pilih Cakupan Wilayah --</option>
                {cakupanOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              {errors.cakupanWilayah && (
                <span className="error-text">{errors.cakupanWilayah}</span>
              )}
            </div>

            {/* Periode Data - Date Range */}
            <div className="form-group">
              <label>
                Periode Data <span className="required">*</span>
              </label>
              <div className="date-range">
                <div className="date-range-item">
                  <label className="date-label">Dari</label>
                  <input
                    type="date"
                    name="periodeDari"
                    value={form.periodeDari}
                    onChange={handleChange}
                    className={errors.periodeDari ? "input-error" : ""}
                  />
                  {errors.periodeDari && (
                    <span className="error-text">{errors.periodeDari}</span>
                  )}
                </div>
                <div className="date-range-item">
                  <label className="date-label">Sampai</label>
                  <input
                    type="date"
                    name="periodeSampai"
                    value={form.periodeSampai}
                    onChange={handleChange}
                    className={errors.periodeSampai ? "input-error" : ""}
                  />
                  {errors.periodeSampai && (
                    <span className="error-text">{errors.periodeSampai}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tujuan & Urgensi */}
        <section className="description-card">
          <h2>Tujuan & Urgensi</h2>
          <div className="form-grid">
            {/* Tujuan Penggunaan - Dropdown + Text Area */}
            <div className="form-group full-width">
              <label>
                Tujuan Penggunaan <span className="required">*</span>
              </label>
              <select
                name="tujuanPenggunaanKategori"
                value={form.tujuanPenggunaanKategori}
                onChange={handleChange}
                className={
                  errors.tujuanPenggunaanKategori ? "input-error" : ""
                }
              >
                <option value="">-- Pilih Kategori Tujuan --</option>
                {tujuanOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              {errors.tujuanPenggunaanKategori && (
                <span className="error-text">
                  {errors.tujuanPenggunaanKategori}
                </span>
              )}

              <textarea
                name="tujuanPenggunaanDetail"
                value={form.tujuanPenggunaanDetail}
                onChange={handleChange}
                rows={4}
                placeholder="Jelaskan secara detail tujuan penggunaan data..."
                className={`mt-10 ${
                  errors.tujuanPenggunaanDetail ? "input-error" : ""
                }`}
              />
              {errors.tujuanPenggunaanDetail && (
                <span className="error-text">
                  {errors.tujuanPenggunaanDetail}
                </span>
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
            <label>Memo / Disposisi Pendukung</label>
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className={errors.memoFile ? "input-error" : ""}
            />
            <small>Opsional. Format: PDF. Maksimal 5MB.</small>
            {errors.memoFile && (
              <span className="error-text">{errors.memoFile}</span>
            )}
            {form.memoFile && (
              <div className="file-list">
                <div className="file-item">
                  📎 {form.memoFile.name} (
                  {Math.round(form.memoFile.size / 1024)} KB)
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Submit Buttons */}
        <div className="form-actions">
          <button
            type="button"
            className="btn-secondary"
            onClick={() => navigate("/humasdata/PermintaanData")}
          >
            Batal
          </button>
          <button type="submit" className="btn-primary">
            Ajukan Permintaan Data
          </button>
        </div>
      </form>
    </div>
  );
}