import { useEffect, useState } from "react";
import "./HumasPublish.css";

const USER_PROFILE = {
  nip: "197001011990031001",
  nama: "Nama Pengusul",
  satuanKerja: "Kanwil",
};

export default function HumasPublish() {
  const [form, setForm] = useState({
    nip: USER_PROFILE.nip,
    namaPengusul: USER_PROFILE.nama,
    satuanKerja: USER_PROFILE.satuanKerja,
    judul: "",
    asalInstansi: "Kanwil",
    provinsi: "",
    kabupaten: "",
    kategori: "Pendidikan",
    tanggalKegiatan: "",
    waktuKegiatan: "",
    lokasiKegiatan: "",
    isiBerita: "",
    foto: [],
    fotoPreviews: [],
    videoLink: "",
    penulis: USER_PROFILE.nama,
    kontak: "",
    atasan: "",
    status: "Draft",
    tanggalPengajuan: "",
    tanggalTerbit: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const now = new Date().toISOString().slice(0, 16);
    setForm((s) => ({ ...s, tanggalPengajuan: now }));
    return () => {
      // revoke any object URLs
      form.fotoPreviews.forEach((p) => p && p.url && URL.revokeObjectURL(p.url));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (form.status === "Terbit") {
      const now = new Date().toISOString();
      setForm((s) => ({ ...s, tanggalTerbit: now }));
    }
  }, [form.status]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  }

  function handleFile(e) {
    const files = Array.from(e.target.files || []);
    const previews = files.map((f) => ({ name: f.name, url: URL.createObjectURL(f), file: f }));
    // revoke previous previews
    form.fotoPreviews.forEach((p) => p && p.url && URL.revokeObjectURL(p.url));
    setForm((s) => ({ ...s, foto: files, fotoPreviews: previews }));
  }

  function removePreview(index) {
    const fp = [...form.fotoPreviews];
    const ff = [...form.foto];
    const removed = fp.splice(index, 1)[0];
    ff.splice(index, 1);
    if (removed && removed.url) URL.revokeObjectURL(removed.url);
    setForm((s) => ({ ...s, fotoPreviews: fp, foto: ff }));
  }

  function validate() {
    const err = {};
    if (!form.nip) err.nip = "NIP pengusul wajib";
    if (!form.namaPengusul) err.namaPengusul = "Nama pengusul wajib";
    if (!form.satuanKerja) err.satuanKerja = "Satuan kerja wajib";
    if (!form.judul) err.judul = "Judul berita wajib";
    if (!form.kategori) err.kategori = "Kategori wajib";
    if (!form.tanggalKegiatan) err.tanggalKegiatan = "Tanggal kegiatan wajib";
    if (!form.lokasiKegiatan) err.lokasiKegiatan = "Lokasi kegiatan wajib";
    if (!form.isiBerita) err.isiBerita = "Isi berita wajib";
    if (!form.foto || form.foto.length === 0) err.foto = "Minimal 1 file pendukung";
    if (!form.atasan) err.atasan = "Atasan penyetuju wajib";
    return err;
  }

  function handleSubmit(e, action = "submit") {
    e.preventDefault();
    const err = validate();
    setErrors(err);
    if (Object.keys(err).length > 0) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => {
      if (k === 'foto' || k === 'fotoPreviews') return;
      if (v !== undefined && v !== null) fd.append(k, v);
    });
    form.foto.forEach((f) => fd.append('foto[]', f));

    console.log('Submitting Humas form, action=', action);
    for (const pair of fd.entries()) console.log(pair[0], pair[1]);
    alert('Form dikirim: ' + action + '. Periksa console untuk detail.');
  }

  return (
    <div className="humas-publish-layout">
      <header className="hp-header">
        <h1>Pengajuan Publikasi Berita Kegiatan</h1>
        <p>Isi data pengajuan sesuai format untuk proses editorial dan verifikasi</p>
      </header>

      <form className="hp-form" onSubmit={(e) => handleSubmit(e, "submit") }>
        {Object.keys(errors).length > 0 && (
          <div className="hp-errors">
            {Object.values(errors).map((er, i) => (
              <div key={i} className="hp-error">{er}</div>
            ))}
          </div>
        )}

        <div className="hp-grid">
          <div className="section fullwidth">
            <h3 className="section-title">Informasi Pengusul</h3>
          </div>

          <label>
            <div className="field-title">NIP Pengusul <span className="required">*</span></div>
            <input name="nip" value={form.nip} readOnly />
            {errors.nip && <small className="error">{errors.nip}</small>}
          </label>

          <label>
            <div className="field-title">Nama Pengusul <span className="required">*</span></div>
            <input name="namaPengusul" value={form.namaPengusul} readOnly />
            {errors.namaPengusul && <small className="error">{errors.namaPengusul}</small>}
          </label>

          <label>
            <div className="field-title">Satuan Kerja Pengusul <span className="required">*</span></div>
            <select name="satuanKerja" value={form.satuanKerja} onChange={handleChange} required>
              <option>Kanwil</option>
              <option>Kab-Kota</option>
              <option>PTKK</option>
              <option>SPKK</option>
              <option>Pusat</option>
            </select>
            {errors.satuanKerja && <small className="error">{errors.satuanKerja}</small>}
          </label>

          <div className="section fullwidth">
            <h3 className="section-title">Detail Kegiatan</h3>
          </div>

          <label>
            <div className="field-title">Judul Berita <span className="required">*</span></div>
            <input name="judul" value={form.judul} onChange={handleChange} required />
            {errors.judul && <small className="error">{errors.judul}</small>}
          </label>

          <label>
            <div className="field-title">Kategori Kegiatan <span className="required">*</span></div>
            <select name="kategori" value={form.kategori} onChange={handleChange} required>
              <option>Keagamaan</option>
              <option>Pendidikan</option>
              <option>Sosial</option>
              <option>Kelembagaan</option>
              <option>Lainnya</option>
            </select>
            {errors.kategori && <small className="error">{errors.kategori}</small>}
          </label>

          <label>
            <div className="field-title">Tanggal Kegiatan <span className="required">*</span></div>
            <input type="date" name="tanggalKegiatan" value={form.tanggalKegiatan} onChange={handleChange} required />
            {errors.tanggalKegiatan && <small className="error">{errors.tanggalKegiatan}</small>}
          </label>

          <label>
            <div className="field-title">Waktu Kegiatan</div>
            <input type="time" name="waktuKegiatan" value={form.waktuKegiatan} onChange={handleChange} />
          </label>

          <label>
            <div className="field-title">Lokasi Kegiatan <span className="required">*</span></div>
            <input name="lokasiKegiatan" value={form.lokasiKegiatan} onChange={handleChange} required />
            {errors.lokasiKegiatan && <small className="error">{errors.lokasiKegiatan}</small>}
          </label>

          <div className="section fullwidth">
            <h3 className="section-title">Konten Berita</h3>
          </div>

          <label className="fullwidth">
            <div className="field-title">Isi Berita / Narasi <span className="required">*</span></div>
            <textarea name="isiBerita" value={form.isiBerita} onChange={handleChange} required rows={8} />
            {errors.isiBerita && <small className="error">{errors.isiBerita}</small>}
          </label>

          <div className="section fullwidth">
            <h3 className="section-title">Media & Lampiran</h3>
          </div>

          <label className="fullwidth">
            <div className="field-title">Foto/Video Dokumentasi <span className="required">*</span></div>
            <input type="file" accept="image/*,video/*" multiple onChange={handleFile} />
            <small>Minimal 1 file pendukung (gambar atau video).</small>
            {errors.foto && <small className="error">{errors.foto}</small>}
            <div className="preview">
              {form.fotoPreviews.map((p, i) => (
                <div key={i} className="thumb">
                  {p.file.type.startsWith('image') ? (
                    <img src={p.url} alt={p.name} />
                  ) : (
                    <div className="video-placeholder">{p.name}</div>
                  )}
                  <div className="thumb-meta">
                    <div className="thumb-name">{p.name}</div>
                    <button type="button" className="thumb-remove" onClick={() => removePreview(i)}>Hapus</button>
                  </div>
                </div>
              ))}
            </div>
          </label>

          <div className="section fullwidth">
            <h3 className="section-title">Persetujuan</h3>
          </div>

          <label>
            <div className="field-title">Atasan Langsung Penyetuju <span className="required">*</span></div>
            <select name="atasan" value={form.atasan} onChange={handleChange} required>
              <option value="">Pilih atasan</option>
              <option value="Dr. Budi">Dr. Budi</option>
              <option value="Ibu Sari">Ibu Sari</option>
              <option value="Kepala Satker">Kepala Satker</option>
            </select>
            {errors.atasan && <small className="error">{errors.atasan}</small>}
          </label>

          <div className="section fullwidth">
            <h3 className="section-title">Kontak & Tanggal</h3>
          </div>

          <label>
            <div className="field-title">Nama Penulis / Kontributor</div>
            <input name="penulis" value={form.penulis} onChange={handleChange} />
          </label>

          <label>
            <div className="field-title">Kontak Penulis (HP/Email)</div>
            <input name="kontak" value={form.kontak} onChange={handleChange} />
          </label>

          <label>
            <div className="field-title">Tanggal Pengajuan</div>
            <input name="tanggalPengajuan" value={form.tanggalPengajuan} readOnly />
          </label>

          <label>
            <div className="field-title">Tanggal Terbit</div>
            <input name="tanggalTerbit" value={form.tanggalTerbit} readOnly />
          </label>
        </div>

        <div className="hp-actions">
          <button type="button" className="btn-secondary" onClick={(e) => handleSubmit(e, "draft")}>
            Simpan Draft
          </button>
          <button type="submit" className="btn-primary">
            Ajukan Publikasi
          </button>
        </div>
      </form>
    </div>
  );
}
