import { useState } from "react";
import "./DIP.css";

const USER = {
  nip: "197001011990031001",
  nama: "Nama Pengunggah",
  bidang: "Humas",
};

const YEARS = [2023, 2024, 2025, 2026];

function readFileAsDataURL(file) {
  return new Promise((res, rej) => {
    const fr = new FileReader();
    fr.onload = () => res(fr.result);
    fr.onerror = rej;
    fr.readAsDataURL(file);
  });
}

function getUploads() {
  try {
    return JSON.parse(localStorage.getItem('dip_uploads') || '[]');
  } catch {
    return [];
  }
}

function saveUpload(item) {
  const all = getUploads();
  const idx = all.findIndex(x => x.id === item.id);
  if (idx >= 0) all[idx] = item; else all.push(item);
  localStorage.setItem('dip_uploads', JSON.stringify(all));
}

export default function DIPUpload() {
  const [form, setForm] = useState({
    nipNama: `${USER.nip} — ${USER.nama}`,
    bidang: USER.bidang,
    tahun: new Date().getFullYear(),
    judul: '',
    file: null,
    tanggalDokumen: '',
    keterangan: '',
  });
  const [errors, setErrors] = useState({});
  const MAX_BYTES = 10 * 1024 * 1024;

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  }

  async function handleFile(e) {
    const f = e.target.files && e.target.files[0];
    if (!f) return setForm(s => ({ ...s, file: null }));
    if (f.type !== 'application/pdf') return setErrors({ file: 'File harus PDF' });
    if (f.size > MAX_BYTES) return setErrors({ file: 'Ukuran file maksimal 10MB' });
    setErrors({});
    const dataUrl = await readFileAsDataURL(f);
    setForm(s => ({ ...s, file: { name: f.name, size: f.size, dataUrl } }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const err = {};
    if (!form.tahun) err.tahun = 'Pilih tahun';
    if (!form.judul) err.judul = 'Judul wajib';
    if (!form.file) err.file = 'File PDF wajib';
    if (!form.tanggalDokumen) err.tanggalDokumen = 'Tanggal dokumen wajib';
    setErrors(err);
    if (Object.keys(err).length) return;

    const id = `${form.bidang}_${form.tahun}`;
    const item = {
      id,
      bidang: form.bidang,
      tahun: form.tahun,
      judul: form.judul,
      fileName: form.file.name,
      fileData: form.file.dataUrl,
      tanggalDokumen: form.tanggalDokumen,
      keterangan: form.keterangan,
      status: 'menunggu',
      uploadedAt: new Date().toISOString(),
      uploader: { nip: USER.nip, nama: USER.nama },
    };
    saveUpload(item);
    alert('Berhasil mengunggah dokument. Status: Menunggu Validasi');
    // reset minimal
    setForm(f => ({ ...f, judul: '', file: null, tanggalDokumen: '', keterangan: '' }));
  }

  return (
    <div className="dip-layout">
      <header className="dip-header">
        <h1>Upload Dokumen DIP Tahunan</h1>
        <p>Form sederhana untuk mengunggah Dokumen Daftar Informasi Publik (DIP) per bidang.</p>
      </header>

      <form className="dip-form" onSubmit={handleSubmit}>
        <label>
          <div className="field-title">NIP & Nama Pengunggah</div>
          <input name="nipNama" value={form.nipNama} readOnly />
        </label>

        <label>
          <div className="field-title">Unit / Bidang</div>
          <input name="bidang" value={form.bidang} readOnly />
        </label>

        <label>
          <div className="field-title">Tahun DIP <span className="required">*</span></div>
          <select name="tahun" value={form.tahun} onChange={handleChange}>
            {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
          </select>
          {errors.tahun && <small className="error">{errors.tahun}</small>}
        </label>

        <label>
          <div className="field-title">Judul Dokumen <span className="required">*</span></div>
          <input name="judul" value={form.judul} onChange={handleChange} />
          {errors.judul && <small className="error">{errors.judul}</small>}
        </label>

        <label>
          <div className="field-title">File Dokumen (PDF, maks. 10MB) <span className="required">*</span></div>
          <input type="file" accept="application/pdf" onChange={handleFile} />
          {form.file && <small className="meta">{form.file.name} — {(form.file.size/1024/1024).toFixed(2)} MB</small>}
          {errors.file && <small className="error">{errors.file}</small>}
        </label>

        <label>
          <div className="field-title">Tanggal Dokumen <span className="required">*</span></div>
          <input type="date" name="tanggalDokumen" value={form.tanggalDokumen} onChange={handleChange} />
          {errors.tanggalDokumen && <small className="error">{errors.tanggalDokumen}</small>}
        </label>

        <label className="fullwidth">
          <div className="field-title">Keterangan Tambahan (opsional)</div>
          <textarea name="keterangan" value={form.keterangan} onChange={handleChange} rows={4} />
        </label>

        <div className="form-actions">
          <button type="submit" className="btn-primary">Unggah Dokumen</button>
        </div>
      </form>
    </div>
  );
}
