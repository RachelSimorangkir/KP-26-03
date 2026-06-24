import { useEffect, useState } from "react";

const USER_PROFILE = {
  nip: "197001011990031001",
  nama: "Nama Pengaju",
  satuanKerja: "Kanwil",
};

export default function PPIDRequest() {
  const [form, setForm] = useState({
    nipNama: `${USER_PROFILE.nip} — ${USER_PROFILE.nama}`,
    satuanKerja: USER_PROFILE.satuanKerja,
    jenisPermohonan: "",
    referensi: "",
    uraian: "",
    unitTujuan: "",
    tingkatUrgensi: "Normal",
    dokumenPendukung: null,
    dokumenPreview: null,
    atasan: "",
    statusPermohonan: "Diajukan",
    petugasPPID: "",
    tanggapanPutusan: "",
    fileSurat: null,
    fileSuratPreview: null,
    tanggalPengajuan: "",
    tanggalPutusan: "",
  });

  const [errors, setErrors] = useState({});
  const MAX_FILE_BYTES = 5 * 1024 * 1024;

  useEffect(() => {
    const now = new Date().toISOString().slice(0, 16);
    setForm((s) => ({ ...s, tanggalPengajuan: now }));
    return () => {
      if (form.dokumenPreview) URL.revokeObjectURL(form.dokumenPreview);
      if (form.fileSuratPreview) URL.revokeObjectURL(form.fileSuratPreview);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (form.statusPermohonan === 'Selesai' || form.statusPermohonan === 'Ditolak') {
      const now = new Date().toISOString();
      setForm((s) => ({ ...s, tanggalPutusan: now }));
    }
  }, [form.statusPermohonan]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  }

  function handleFile(name, files) {
    const f = files && files[0] ? files[0] : null;
    // validate
    if (f) {
      if (f.size > MAX_FILE_BYTES) {
        setErrors((p) => ({ ...p, [name]: 'Ukuran file melebihi 5MB' }));
        return;
      }
      if (!(f.type === 'application/pdf' || f.type.startsWith('image'))) {
        setErrors((p) => ({ ...p, [name]: 'Tipe file harus PDF atau gambar' }));
        return;
      }
    }

    setErrors((p) => { const n = { ...p }; delete n[name]; return n; });
    setForm((s) => ({ ...s, [name]: f }));
    // preview
    if (name === 'dokumenPendukung') {
      if (form.dokumenPreview) URL.revokeObjectURL(form.dokumenPreview);
      setForm((s) => ({ ...s, dokumenPreview: f ? URL.createObjectURL(f) : null }));
    }
    if (name === 'fileSurat') {
      if (form.fileSuratPreview) URL.revokeObjectURL(form.fileSuratPreview);
      setForm((s) => ({ ...s, fileSuratPreview: f ? URL.createObjectURL(f) : null }));
    }
  }

  function removePreview(name) {
    if (name === 'dokumenPendukung' && form.dokumenPreview) {
      URL.revokeObjectURL(form.dokumenPreview);
      setForm((s) => ({ ...s, dokumenPendukung: null, dokumenPreview: null }));
      setErrors((p) => { const n = { ...p }; delete n.dokumenPendukung; return n; });
    }
    if (name === 'fileSurat' && form.fileSuratPreview) {
      URL.revokeObjectURL(form.fileSuratPreview);
      setForm((s) => ({ ...s, fileSurat: null, fileSuratPreview: null }));
      setErrors((p) => { const n = { ...p }; delete n.fileSurat; return n; });
    }
  }

  function validate() {
    const err = {};
    if (!form.nipNama) err.nipNama = 'Identitas pengaju wajib';
    if (!form.satuanKerja) err.satuanKerja = 'Satuan kerja wajib';
    if (!form.jenisPermohonan) err.jenisPermohonan = 'Jenis permohonan wajib';
    if (!form.uraian) err.uraian = 'Uraian permohonan wajib';
    if (!form.unitTujuan) err.unitTujuan = 'Unit tujuan wajib';
    if (!form.tingkatUrgensi) err.tingkatUrgensi = 'Tingkat urgensi wajib';
    if (!form.atasan) err.atasan = 'Persetujuan atasan wajib';
    if (form.dokumenPendukung && form.dokumenPendukung.size > MAX_FILE_BYTES) err.dokumenPendukung = 'Dokumen > 5MB';
    if (form.fileSurat && form.fileSurat.size > MAX_FILE_BYTES) err.fileSurat = 'File surat > 5MB';
    return err;
  }

  function handleSubmit(e, action = 'submit') {
    e.preventDefault();
    const err = validate();
    setErrors(err);
    if (Object.keys(err).length > 0) return window.scrollTo({ top: 0, behavior: 'smooth' });

    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => {
      if (k === 'dokumenPreview' || k === 'fileSuratPreview') return;
      if (v !== undefined && v !== null) fd.append(k, v);
    });
    if (form.dokumenPendukung) fd.append('dokumenPendukung', form.dokumenPendukung);
    if (form.fileSurat) fd.append('fileSurat', form.fileSurat);

    console.log('PPID submit', action);
    for (const p of fd.entries()) console.log(p[0], p[1]);
    alert('Permohonan PPID ' + action + ' — cek console.');
  }

  return (
    <div className="humas-publish-layout">
      <header className="hp-header">
        <h1>Permohonan PPID — Keberatan Informasi Publik</h1>
        <p>Isi formulir berikut untuk mengajukan permohonan atau keberatan informasi publik.</p>
      </header>

      <form className="hp-form" onSubmit={(e) => handleSubmit(e, 'submit')}>
        {Object.keys(errors).length > 0 && (
          <div className="hp-errors">
            {Object.values(errors).map((er, i) => <div key={i} className="hp-error">{er}</div>)}
          </div>
        )}

        <div className="hp-grid">
          <div className="section fullwidth"><h3 className="section-title">Identitas Pengaju</h3></div>

          <label>
            <div className="field-title">NIP & Nama Pengaju</div>
            <input name="nipNama" value={form.nipNama} readOnly />
          </label>

          <label>
            <div className="field-title">Unit Kerja Pengaju</div>
            <input name="satuanKerja" value={form.satuanKerja} readOnly />
          </label>

          <div className="section fullwidth"><h3 className="section-title">Detail Permohonan</h3></div>

          <label>
            <div className="field-title">Jenis Permohonan <span className="required">*</span></div>
            <select name="jenisPermohonan" value={form.jenisPermohonan} onChange={handleChange}>
              <option value="">Pilih jenis</option>
              <option>Permintaan Dokumen</option>
              <option>Permintaan Informasi</option>
              <option>Keberatan atas Respon Sebelumnya</option>
            </select>
            {errors.jenisPermohonan && <small className="error">{errors.jenisPermohonan}</small>}
          </label>

          <label>
            <div className="field-title">Referensi Permohonan Awal (opsional)</div>
            <input name="referensi" value={form.referensi} onChange={handleChange} />
          </label>

          <label className="fullwidth">
            <div className="field-title">Uraian Permohonan / Keberatan <span className="required">*</span></div>
            <textarea name="uraian" value={form.uraian} onChange={handleChange} rows={6} />
            {errors.uraian && <small className="error">{errors.uraian}</small>}
          </label>

          <label>
            <div className="field-title">Unit Kerja Tujuan <span className="required">*</span></div>
            <select name="unitTujuan" value={form.unitTujuan} onChange={handleChange}>
              <option value="">Pilih unit</option>
              <option>Bagian Data</option>
              <option>Bagian Humas</option>
            </select>
            {errors.unitTujuan && <small className="error">{errors.unitTujuan}</small>}
          </label>

          <label>
            <div className="field-title">Tingkat Urgensi <span className="required">*</span></div>
            <select name="tingkatUrgensi" value={form.tingkatUrgensi} onChange={handleChange}>
              <option>Normal</option>
              <option>Segera</option>
            </select>
          </label>

          <label className="fullwidth">
            <div className="field-title">Dokumen Pendukung (PDF/Image)</div>
            <input type="file" accept="application/pdf,image/*" onChange={(e) => handleFile('dokumenPendukung', e.target.files)} />
            {form.dokumenPendukung && <small className="pdf-meta">{form.dokumenPendukung.name} — {(form.dokumenPendukung.size/1024/1024).toFixed(2)} MB</small>}
            {errors.dokumenPendukung && <small className="error">{errors.dokumenPendukung}</small>}
            {form.dokumenPreview && (
              <div className="pdf-preview-wrap">
                {form.dokumenPendukung && form.dokumenPendukung.type === 'application/pdf' ? (
                  <iframe src={form.dokumenPreview} className="pdf-preview" title="dokumen-preview" />
                ) : (
                  <img src={form.dokumenPreview} alt="preview" style={{width:'100%',height:'320px',objectFit:'contain'}} />
                )}
                <div className="pdf-actions">
                  <button type="button" className="btn-secondary" onClick={() => removePreview('dokumenPendukung')}>Hapus Preview</button>
                </div>
              </div>
            )}
          </label>

          <label>
            <div className="field-title">Persetujuan Atasan Pengaju <span className="required">*</span></div>
            <select name="atasan" value={form.atasan} onChange={handleChange}>
              <option value="">Pilih atasan</option>
              <option>Dr. Budi</option>
              <option>Ibu Sari</option>
            </select>
            {errors.atasan && <small className="error">{errors.atasan}</small>}
          </label>

          <label>
            <div className="field-title">Status Permohonan</div>
            <select name="statusPermohonan" value={form.statusPermohonan} onChange={handleChange}>
              <option>Diajukan</option>
              <option>Diproses</option>
              <option>Mediasi</option>
              <option>Selesai</option>
              <option>Ditolak</option>
            </select>
          </label>

          <label>
            <div className="field-title">Petugas PPID Penanggung Jawab</div>
            <select name="petugasPPID" value={form.petugasPPID} onChange={handleChange}>
              <option value="">Auto-assign</option>
              <option>PPID A</option>
              <option>PPID B</option>
            </select>
          </label>

          <label className="fullwidth">
            <div className="field-title">Tanggapan / Putusan (opsional)</div>
            <textarea name="tanggapanPutusan" value={form.tanggapanPutusan} onChange={handleChange} rows={4} />
          </label>

          <label className="fullwidth">
            <div className="field-title">File Surat Tanggapan (PDF)</div>
            <input type="file" accept="application/pdf" onChange={(e) => handleFile('fileSurat', e.target.files)} />
            {form.fileSurat && <small className="pdf-meta">{form.fileSurat.name} — {(form.fileSurat.size/1024/1024).toFixed(2)} MB</small>}
            {errors.fileSurat && <small className="error">{errors.fileSurat}</small>}
            {form.fileSuratPreview && (
              <div className="pdf-preview-wrap">
                <iframe src={form.fileSuratPreview} className="pdf-preview" title="surat-preview" />
                <div className="pdf-actions">
                  <button type="button" className="btn-secondary" onClick={() => removePreview('fileSurat')}>Hapus Preview</button>
                </div>
              </div>
            )}
          </label>

          <label>
            <div className="field-title">Tanggal Pengajuan</div>
            <input name="tanggalPengajuan" value={form.tanggalPengajuan} readOnly />
          </label>

          <label>
            <div className="field-title">Tanggal Putusan</div>
            <input name="tanggalPutusan" value={form.tanggalPutusan} readOnly />
          </label>

        </div>

        <div className="hp-actions">
          <button type="button" className="btn-secondary" onClick={(e) => handleSubmit(e, 'draft')}>Simpan Draft</button>
          <button type="submit" className="btn-primary">Ajukan Permohonan</button>
        </div>
      </form>
    </div>
  );
}
