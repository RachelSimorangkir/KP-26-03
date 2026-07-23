import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FormPengajuan.css";

export default function FormPengajuan() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nip: "197001011990031001",
    namaPengusul: "Nama Pengusul",
    satuanKerja: "Kanwil",
    judul: "",
    kategori: "",
    tanggalKegiatan: "",
    waktuKegiatan: "",
    lokasiKegiatan: "",
    isiBerita: "",
    foto: [],
    atasan: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setForm((prev) => ({ ...prev, foto: files }));
  };

  const validate = () => {
    const err = {};
    if (!form.judul) err.judul = "Judul berita wajib diisi";
    if (!form.kategori) err.kategori = "Kategori wajib dipilih";
    if (!form.tanggalKegiatan) err.tanggalKegiatan = "Tanggal kegiatan wajib";
    if (!form.lokasiKegiatan) err.lokasiKegiatan = "Lokasi kegiatan wajib";
    if (!form.isiBerita) err.isiBerita = "Isi berita wajib diisi";
    if (form.foto.length === 0) err.foto = "Minimal 1 file dokumentasi";
    if (!form.atasan) err.atasan = "Atasan penyetuju wajib dipilih";
    return err;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validate();
    setErrors(err);
    
    if (Object.keys(err).length === 0) {
      alert("Pengajuan berhasil dikirim!");
      navigate("/humas/daftar-pengajuan");
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
          onClick={() => navigate("/humasdata/publikasi")}
        >
          ← Kembali
        </button>
      </div>

      {/* BANNER */}
      <section className="service-banner">
        <div className="service-banner-content">
          <h1>Form Pengajuan Publikasi</h1>
          <p>
            Lengkapi formulir di bawah ini untuk mengajukan publikasi berita kegiatan.
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

        {/* Info Pengusul */}
        <section className="description-card">
          <h2>Data Pengusul</h2>
          <div className="form-grid">
            <div className="form-group">
              <label>NIP Pengusul</label>
              <input
                type="text"
                value={form.nip}
                readOnly
                className="readonly-input"
              />
            </div>
            <div className="form-group">
              <label>Nama Pengusul</label>
              <input
                type="text"
                value={form.namaPengusul}
                readOnly
                className="readonly-input"
              />
            </div>
            <div className="form-group">
              <label>Satuan Kerja</label>
              <input
                type="text"
                value={form.satuanKerja}
                readOnly
                className="readonly-input"
              />
            </div>
          </div>
        </section>

        {/* Detail Berita */}
        <section className="description-card">
          <h2>Detail Berita</h2>
          <div className="form-grid">
            <div className="form-group full-width">
              <label>
                Judul Berita <span className="required">*</span>
              </label>
              <input
                type="text"
                name="judul"
                value={form.judul}
                onChange={handleChange}
                placeholder="Masukkan judul berita"
                className={errors.judul ? "input-error" : ""}
              />
              {errors.judul && <span className="error-text">{errors.judul}</span>}
            </div>

            <div className="form-group">
              <label>
                Kategori Kegiatan <span className="required">*</span>
              </label>
              <select
                name="kategori"
                value={form.kategori}
                onChange={handleChange}
                className={errors.kategori ? "input-error" : ""}
              >
                <option value="">-- Pilih Kategori --</option>
                <option value="Keagamaan">Keagamaan</option>
                <option value="Pendidikan">Pendidikan</option>
                <option value="Sosial">Sosial</option>
                <option value="Kelembagaan">Kelembagaan</option>
                <option value="Lainnya">Lainnya</option>
              </select>
              {errors.kategori && (
                <span className="error-text">{errors.kategori}</span>
              )}
            </div>

            <div className="form-group">
              <label>
                Tanggal Kegiatan <span className="required">*</span>
              </label>
              <input
                type="date"
                name="tanggalKegiatan"
                value={form.tanggalKegiatan}
                onChange={handleChange}
                className={errors.tanggalKegiatan ? "input-error" : ""}
              />
              {errors.tanggalKegiatan && (
                <span className="error-text">{errors.tanggalKegiatan}</span>
              )}
            </div>

            <div className="form-group">
              <label>Waktu Kegiatan</label>
              <input
                type="time"
                name="waktuKegiatan"
                value={form.waktuKegiatan}
                onChange={handleChange}
              />
            </div>

            <div className="form-group full-width">
              <label>
                Lokasi Kegiatan <span className="required">*</span>
              </label>
              <input
                type="text"
                name="lokasiKegiatan"
                value={form.lokasiKegiatan}
                onChange={handleChange}
                placeholder="Masukkan lokasi kegiatan"
                className={errors.lokasiKegiatan ? "input-error" : ""}
              />
              {errors.lokasiKegiatan && (
                <span className="error-text">{errors.lokasiKegiatan}</span>
              )}
            </div>
          </div>
        </section>

        {/* Konten Berita */}
        <section className="description-card">
          <h2>Konten Berita</h2>
          <div className="form-group full-width">
            <label>
              Isi Berita / Narasi <span className="required">*</span>
            </label>
            <textarea
              name="isiBerita"
              value={form.isiBerita}
              onChange={handleChange}
              rows="10"
              placeholder="Tulis isi berita dengan lengkap..."
              className={errors.isiBerita ? "input-error" : ""}
            />
            {errors.isiBerita && (
              <span className="error-text">{errors.isiBerita}</span>
            )}
          </div>

          <div className="form-group full-width">
            <label>
              Foto/Video Dokumentasi <span className="required">*</span>
            </label>
            <input
              type="file"
              multiple
              accept="image/*,video/*"
              onChange={handleFileChange}
              className={errors.foto ? "input-error" : ""}
            />
            <small>Minimal 1 file (gambar atau video). Maksimal 8MB per file.</small>
            {errors.foto && <span className="error-text">{errors.foto}</span>}
            {form.foto.length > 0 && (
              <div className="file-list">
                {form.foto.map((file, idx) => (
                  <div key={idx} className="file-item">
                    📎 {file.name} ({Math.round(file.size / 1024)} KB)
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>


        {/* Submit Buttons */}
        <div className="form-actions">
          <button type="button" className="btn-secondary" onClick={() => navigate("/humas")}>
            Batal
          </button>
          <button type="submit" className="btn-primary">
            Ajukan Publikasi
          </button>
        </div>
      </form>
    </div>
  );
}