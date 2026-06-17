import { useEffect, useState } from "react";
import "./HumasPublish.css";

const USER_PROFILE = {
  nip: "197001011990031001",
  nama: "Nama Pelapor",
  satuanKerja: "Kanwil",
};

export default function Helpdesk() {
  const [form, setForm] = useState({
    nipNama: `${USER_PROFILE.nip} — ${USER_PROFILE.nama}`,
    satuanKerja: USER_PROFILE.satuanKerja,
    email: "",
    telepon: "",
    aplikasi: "",
    kategori: "",
    tingkatUrgensi: "Rendah",
    judul: "",
    deskripsi: "",
    lampiran: [],
    lampiranPreviews: [],
    statusTiket: "Baru",
    petugas: "",
    tanggapan: "",
    tanggalLapor: "",
    tanggalSelesai: "",
    rating: 0,
  });

  const [errors, setErrors] = useState({});
  const MAX_FILE_BYTES = 5 * 1024 * 1024;

  useEffect(() => {
    const now = new Date().toISOString().slice(0, 16);
    setForm((s) => ({ ...s, tanggalLapor: now }));
    return () => {
      form.lampiranPreviews.forEach((p) => p && p.url && URL.revokeObjectURL(p.url));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (form.statusTiket === "Selesai") {
      const now = new Date().toISOString();
      setForm((s) => ({ ...s, tanggalSelesai: now }));
    }
  }, [form.statusTiket]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  }

  function handleFiles(e) {
    const files = Array.from(e.target.files || []);
    // validate
    const errs = {};
    const previews = files.map((f) => ({ name: f.name, url: URL.createObjectURL(f), file: f }));
    files.forEach((f) => {
      if (f.size > MAX_FILE_BYTES) errs.lampiran = 'Satu atau lebih file melebihi 5MB';
    });
    setErrors((s) => ({ ...s, ...errs }));
    // revoke previous
    form.lampiranPreviews.forEach((p) => p && p.url && URL.revokeObjectURL(p.url));
    setForm((s) => ({ ...s, lampiran: files, lampiranPreviews: previews }));
  }

  function removeAttachment(index) {
    const lp = [...form.lampiranPreviews];
    const lf = [...form.lampiran];
    const removed = lp.splice(index, 1)[0];
    lf.splice(index, 1);
    if (removed && removed.url) URL.revokeObjectURL(removed.url);
    setForm((s) => ({ ...s, lampiranPreviews: lp, lampiran: lf }));
  }

  function validate() {
    const err = {};
    if (!form.nipNama) err.nipNama = "Identitas pelapor wajib";
    if (!form.satuanKerja) err.satuanKerja = "Satuan kerja wajib";
    if (!form.email) err.email = "Email/username wajib";
    if (!form.telepon) err.telepon = "Nomor telepon wajib";
    if (!form.aplikasi) err.aplikasi = "Pilih aplikasi/sistem";
    if (!form.kategori) err.kategori = "Pilih kategori kendala";
    if (!form.judul) err.judul = "Judul masalah wajib";
    if (!form.deskripsi) err.deskripsi = "Deskripsi masalah wajib";
    // attachments size
    form.lampiran.forEach((f, i) => {
      if (f.size > MAX_FILE_BYTES) err.lampiran = 'Ada file lampiran > 5MB';
    });
    return err;
  }

  function handleSubmit(e, action = 'submit') {
    e.preventDefault();
    const err = validate();
    setErrors(err);
    if (Object.keys(err).length > 0) return window.scrollTo({ top: 0, behavior: 'smooth' });

    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => {
      if (k === 'lampiran' || k === 'lampiranPreviews') return;
      if (v !== undefined && v !== null) fd.append(k, v);
    });
    form.lampiran.forEach((f) => fd.append('lampiran[]', f));
    console.log('Submit helpdesk', action);
    for (const p of fd.entries()) console.log(p[0], p[1]);
    alert('Tiket ' + action + ' — cek console');
  }

  return (
    <div className="humas-publish-layout">
      <header className="hp-header">
        <h1>Helpdesk & Pendampingan</h1>
        <p>Lapor masalah sistem atau minta pendampingan teknis melalui form ini.</p>
      </header>

      <form className="hp-form" onSubmit={(e) => handleSubmit(e, 'submit')}>
        {Object.keys(errors).length > 0 && (
          <div className="hp-errors">
            {Object.values(errors).map((er, i) => <div key={i} className="hp-error">{er}</div>)}
          </div>
        )}

        <div className="hp-grid">
          <div className="section fullwidth"><h3 className="section-title">Identitas Pelapor</h3></div>

          <label>
            <div className="field-title">NIP & Nama Pelapor</div>
            <input name="nipNama" value={form.nipNama} readOnly />
          </label>

          <label>
            <div className="field-title">Unit Kerja / Satker</div>
            <input name="satuanKerja" value={form.satuanKerja} readOnly />
          </label>

          <label>
            <div className="field-title">Email / Username Aplikasi <span className="required">*</span></div>
            <input name="email" value={form.email} onChange={handleChange} />
            {errors.email && <small className="error">{errors.email}</small>}
          </label>

          <label>
            <div className="field-title">Nomor Telepon / WA <span className="required">*</span></div>
            <input name="telepon" value={form.telepon} onChange={handleChange} />
            {errors.telepon && <small className="error">{errors.telepon}</small>}
          </label>

          <div className="section fullwidth"><h3 className="section-title">Detail Sistem & Kendala</h3></div>

          <label>
            <div className="field-title">Nama Aplikasi / Sistem <span className="required">*</span></div>
            <select name="aplikasi" value={form.aplikasi} onChange={handleChange}>
              <option value="">Pilih sistem</option>
              <option>Portal Utama</option>
              <option>Modul Kepegawaian</option>
              <option>Modul Humas</option>
            </select>
            {errors.aplikasi && <small className="error">{errors.aplikasi}</small>}
          </label>

          <label>
            <div className="field-title">Kategori Kendala <span className="required">*</span></div>
            <select name="kategori" value={form.kategori} onChange={handleChange}>
              <option value="">Pilih kategori</option>
              <option>Error Sistem</option>
              <option>Reset Password</option>
              <option>Permintaan Akses</option>
              <option>Pelatihan</option>
              <option>Bug</option>
              <option>Lainnya</option>
            </select>
            {errors.kategori && <small className="error">{errors.kategori}</small>}
          </label>

          <label>
            <div className="field-title">Tingkat Urgensi <span className="required">*</span></div>
            <select name="tingkatUrgensi" value={form.tingkatUrgensi} onChange={handleChange}>
              <option>Rendah</option>
              <option>Sedang</option>
              <option>Tinggi</option>
              <option>Kritis</option>
            </select>
          </label>

          <label className="fullwidth">
            <div className="field-title">Judul Masalah <span className="required">*</span></div>
            <input name="judul" value={form.judul} onChange={handleChange} />
            {errors.judul && <small className="error">{errors.judul}</small>}
          </label>

          <label className="fullwidth">
            <div className="field-title">Deskripsi Masalah <span className="required">*</span></div>
            <textarea name="deskripsi" value={form.deskripsi} onChange={handleChange} rows={6} />
            {errors.deskripsi && <small className="error">{errors.deskripsi}</small>}
          </label>

          <label className="fullwidth">
            <div className="field-title">Lampiran Screenshot / Bukti (opsional)</div>
            <input type="file" accept="image/*,application/pdf" multiple onChange={handleFiles} />
            {errors.lampiran && <small className="error">{errors.lampiran}</small>}
            <div className="preview">
              {form.lampiranPreviews.map((p, i) => (
                <div key={i} className="thumb">
                  {p.file.type.startsWith('image') ? (
                    <img src={p.url} alt={p.name} />
                  ) : (
                    <div className="video-placeholder">{p.name}</div>
                  )}
                  <div className="thumb-meta">
                    <div className="thumb-name">{p.name} — {(p.file.size/1024/1024).toFixed(2)} MB</div>
                    <button type="button" className="thumb-remove" onClick={() => removeAttachment(i)}>Hapus</button>
                  </div>
                </div>
              ))}
            </div>
          </label>

          <label>
            <div className="field-title">Status Tiket</div>
            <select name="statusTiket" value={form.statusTiket} onChange={handleChange}>
              <option>Baru</option>
              <option>Diproses</option>
              <option>Menunggu Respon</option>
              <option>Selesai</option>
              <option>Ditutup</option>
            </select>
          </label>

          <label>
            <div className="field-title">Petugas Penanggung Jawab</div>
            <select name="petugas" value={form.petugas} onChange={handleChange}>
              <option value="">Auto-assign</option>
              <option>Tim IT A</option>
              <option>Tim IT B</option>
            </select>
          </label>

          <label className="fullwidth">
            <div className="field-title">Tanggapan / Solusi (diisi petugas)</div>
            <textarea name="tanggapan" value={form.tanggapan} onChange={handleChange} rows={4} />
          </label>

          <label>
            <div className="field-title">Tanggal Lapor</div>
            <input name="tanggalLapor" value={form.tanggalLapor} readOnly />
          </label>

          <label>
            <div className="field-title">Tanggal Selesai</div>
            <input name="tanggalSelesai" value={form.tanggalSelesai} readOnly />
          </label>

          <label>
            <div className="field-title">Rating Kepuasan (opsional)</div>
            <select name="rating" value={form.rating} onChange={handleChange}>
              <option value={0}>-</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
          </label>

        </div>

        <div className="hp-actions">
          <button type="button" className="btn-secondary" onClick={(e) => handleSubmit(e, 'draft')}>Simpan Draft</button>
          <button type="submit" className="btn-primary">Kirim Tiket</button>
        </div>
      </form>
    </div>
  );
}
