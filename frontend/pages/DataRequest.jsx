import { useEffect, useState } from "react";


const USER_PROFILE = {
  nip: "197001011990031001",
  nama: "Nama Pemohon",
  jabatan: "Staf",
  satuanKerja: "Kanwil",
};

export default function DataRequest() {
  const [form, setForm] = useState({
    nip: USER_PROFILE.nip,
    namaJabatan: `${USER_PROFILE.nama} — ${USER_PROFILE.jabatan}`,
    satuanKerja: USER_PROFILE.satuanKerja,
    jenisData: [],
    cakupanWilayah: "Nasional",
    provinsi: "",
    kabupaten: "",
    periodeMulai: "",
    periodeSampai: "",
    tujuanJenis: "",
    tujuanDetail: "",
    tingkatUrgensi: "Normal",
    atasan: "",
    statusAtasan: "Menunggu",
    memoFile: null,
    petugasPengolah: "Bagian Data",
    statusPermintaan: "Diajukan",
    hasilFile: null,
    catatanPengolah: "",
    tanggalPengajuan: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const now = new Date().toISOString().slice(0, 16);
    setForm((s) => ({ ...s, tanggalPengajuan: now }));
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  }

  function handleToggleJenis(jenis) {
    setForm((s) => {
      const exists = s.jenisData.includes(jenis);
      const next = exists ? s.jenisData.filter((j) => j !== jenis) : [...s.jenisData, jenis];
      return { ...s, jenisData: next };
    });
  }

  // mock provinces/kabupaten
  const PROVINSI = ["Jawa Barat", "Jawa Tengah", "DKI Jakarta"];
  const KABUPATEN = {
    "Jawa Barat": ["Bandung", "Bekasi", "Bogor"],
    "Jawa Tengah": ["Semarang", "Kudus", "Magelang"],
    "DKI Jakarta": ["Jakarta Pusat", "Jakarta Selatan"],
  };

  const [memoPreview, setMemoPreview] = useState(null);
  const [hasilPreview, setHasilPreview] = useState(null);
  const MAX_FILE_BYTES = 5 * 1024 * 1024; // 5MB

  function handleFile(name, files) {
    const f = files && files[0] ? files[0] : null;
    // validate type & size
    setErrors((prev) => {
      const next = { ...prev };
      if (name === 'memoFile') delete next.memoFile;
      if (name === 'hasilFile') delete next.hasilFile;
      return next;
    });

    if (f) {
      if (f.size > MAX_FILE_BYTES) {
        setErrors((prev) => ({ ...prev, [name === 'memoFile' ? 'memoFile' : 'hasilFile']: 'Ukuran file melebihi 5MB' }));
        setForm((s) => ({ ...s, [name]: null }));
        // clear preview if any
        if (name === 'memoFile' && memoPreview) { URL.revokeObjectURL(memoPreview); setMemoPreview(null); }
        if (name === 'hasilFile' && hasilPreview) { URL.revokeObjectURL(hasilPreview); setHasilPreview(null); }
        return;
      }
      if (f.type !== 'application/pdf') {
        setErrors((prev) => ({ ...prev, [name === 'memoFile' ? 'memoFile' : 'hasilFile']: 'Tipe file harus PDF' }));
        setForm((s) => ({ ...s, [name]: null }));
        if (name === 'memoFile' && memoPreview) { URL.revokeObjectURL(memoPreview); setMemoPreview(null); }
        if (name === 'hasilFile' && hasilPreview) { URL.revokeObjectURL(hasilPreview); setHasilPreview(null); }
        return;
      }
    }

    setForm((s) => ({ ...s, [name]: f }));
    // create preview for pdfs
    if (name === 'memoFile') {
      if (memoPreview) URL.revokeObjectURL(memoPreview);
      if (f && f.type === 'application/pdf') setMemoPreview(URL.createObjectURL(f));
      else setMemoPreview(null);
    }
    if (name === 'hasilFile') {
      if (hasilPreview) URL.revokeObjectURL(hasilPreview);
      if (f && f.type === 'application/pdf') setHasilPreview(URL.createObjectURL(f));
      else setHasilPreview(null);
    }
  }

  function validate() {
    const err = {};
    if (!form.nip) err.nip = "NIP wajib";
    if (!form.namaJabatan) err.namaJabatan = "Nama & jabatan wajib";
    if (!form.satuanKerja) err.satuanKerja = "Satuan kerja wajib";
    if (!form.jenisData || form.jenisData.length === 0) err.jenisData = "Pilih minimal 1 jenis data";
    if (!form.cakupanWilayah) err.cakupanWilayah = "Cakupan wilayah wajib";
    if (form.cakupanWilayah === 'Provinsi' && !form.provinsi) err.provinsi = 'Pilih provinsi';
    if (form.cakupanWilayah === 'Kab-Kota' && (!form.provinsi || !form.kabupaten)) err.kabupaten = 'Pilih provinsi dan kabupaten';
    if (!form.periodeMulai || !form.periodeSampai) err.periode = "Periode data wajib";
    if (!form.tujuanJenis) err.tujuanJenis = "Pilih tujuan penggunaan";
    if (!form.tingkatUrgensi) err.tingkatUrgensi = "Tingkat urgensi wajib";
    if (!form.atasan) err.atasan = "Pilih atasan penyetuju";
    // file validations (if files present)
    if (form.memoFile && form.memoFile.size > MAX_FILE_BYTES) err.memoFile = 'Ukuran memo melebihi 5MB';
    if (form.memoFile && form.memoFile.type !== 'application/pdf') err.memoFile = 'Memo harus berformat PDF';
    if (form.hasilFile && form.hasilFile.size > MAX_FILE_BYTES) err.hasilFile = 'Ukuran hasil melebihi 5MB';
    if (form.hasilFile && form.hasilFile.type !== 'application/pdf') err.hasilFile = 'File hasil harus berformat PDF';
    return err;
  }

  function handleSubmit(e, action = "submit") {
    e.preventDefault();
    const err = validate();
    setErrors(err);
    if (Object.keys(err).length > 0) return window.scrollTo({ top: 0, behavior: 'smooth' });

    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => {
      if (v === null || v === undefined) return;
      if (k === 'hasilFile' || k === 'memoFile') return; // handled below
      if (Array.isArray(v)) fd.append(k, JSON.stringify(v));
      else fd.append(k, v);
    });
    if (form.memoFile) fd.append('memoFile', form.memoFile);
    if (form.hasilFile) fd.append('hasilFile', form.hasilFile);

    console.log('Data request submit', action);
    for (const pair of fd.entries()) console.log(pair[0], pair[1]);
    alert('Permintaan data ' + action + ' — cek console.');
  }

  return (
    <div className="humas-publish-layout">
      <header className="hp-header">
        <h1>Permintaan Penyediaan Data & Informasi</h1>
        <p>Lengkapi form permintaan data berikut untuk proses internal.</p>
      </header>

      <form className="hp-form" onSubmit={(e) => handleSubmit(e, 'submit')}>
        {Object.keys(errors).length > 0 && (
          <div className="hp-errors">
            {Object.values(errors).map((er, i) => (
              <div key={i} className="hp-error">{er}</div>
            ))}
          </div>
        )}

        <div className="hp-grid">
          <div className="section fullwidth"><h3 className="section-title">Identitas Pemohon</h3></div>

          <label>
            <div className="field-title">NIP Pemohon <span className="required">*</span></div>
            <input name="nip" value={form.nip} readOnly />
          </label>

          <label>
            <div className="field-title">Nama & Jabatan Pemohon <span className="required">*</span></div>
            <input name="namaJabatan" value={form.namaJabatan} onChange={handleChange} />
          </label>

          <label>
            <div className="field-title">Unit Kerja / Satker <span className="required">*</span></div>
            <input name="satuanKerja" value={form.satuanKerja} onChange={handleChange} />
          </label>

          <div className="section fullwidth"><h3 className="section-title">Rincian Permintaan</h3></div>

          <label className="fullwidth">
            <div className="field-title">Jenis Data yang Diminta <span className="required">*</span></div>
            <div className="checkbox-grid">
              {['Data Lembaga Keagamaan','Penyuluh','Rohaniwan','Sarana Ibadah','Statistik Anggaran','Lainnya'].map((j) => (
                <label key={j} className="checkbox-inline"><input type="checkbox" checked={form.jenisData.includes(j)} onChange={() => handleToggleJenis(j)} /> {j}</label>
              ))}
            </div>
            {errors.jenisData && <small className="error">{errors.jenisData}</small>}
          </label>

          <label>
            <div className="field-title">Cakupan Wilayah <span className="required">*</span></div>
            <select name="cakupanWilayah" value={form.cakupanWilayah} onChange={handleChange}>
              <option>Nasional</option>
              <option>Provinsi</option>
              <option>Kab-Kota</option>
            </select>
            {form.cakupanWilayah === 'Provinsi' && (
              <select name="provinsi" value={form.provinsi} onChange={handleChange} style={{marginTop:8}}>
                <option value="">Pilih provinsi</option>
                {PROVINSI.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            )}
            {form.cakupanWilayah === 'Kab-Kota' && (
              <div style={{marginTop:8}}>
                <select name="provinsi" value={form.provinsi} onChange={handleChange}>
                  <option value="">Pilih provinsi</option>
                  {PROVINSI.map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
                <select name="kabupaten" value={form.kabupaten} onChange={handleChange} style={{marginTop:8}}>
                  <option value="">Pilih kabupaten</option>
                  {(KABUPATEN[form.provinsi] || []).map((k) => <option key={k} value={k}>{k}</option>)}
                </select>
              </div>
            )}
            {errors.provinsi && <small className="error">{errors.provinsi}</small>}
            {errors.kabupaten && <small className="error">{errors.kabupaten}</small>}
          </label>

          <label>
            <div className="field-title">Periode Data (Mulai) <span className="required">*</span></div>
            <input type="date" name="periodeMulai" value={form.periodeMulai} onChange={handleChange} />
          </label>

          <label>
            <div className="field-title">Periode Data (Sampai) <span className="required">*</span></div>
            <input type="date" name="periodeSampai" value={form.periodeSampai} onChange={handleChange} />
          </label>

          <label className="fullwidth">
            <div className="field-title">Tujuan Penggunaan <span className="required">*</span></div>
            <select name="tujuanJenis" value={form.tujuanJenis} onChange={handleChange}>
              <option value="">Pilih tujuan</option>
              <option>Rapat</option>
              <option>Laporan</option>
              <option>Evaluasi</option>
              <option>Perencanaan</option>
              <option>Lainnya</option>
            </select>
            <textarea name="tujuanDetail" value={form.tujuanDetail} onChange={handleChange} rows={3} placeholder="Jelaskan tujuan penggunaan (opsional)" />
          </label>

          <label>
            <div className="field-title">Tingkat Urgensi <span className="required">*</span></div>
            <select name="tingkatUrgensi" value={form.tingkatUrgensi} onChange={handleChange}>
              <option>Normal</option>
              <option>Segera</option>
              <option>Sangat Segera</option>
            </select>
          </label>

          <label>
            <div className="field-title">Persetujuan Atasan Pemohon <span className="required">*</span></div>
            <select name="atasan" value={form.atasan} onChange={handleChange}>
              <option value="">Pilih atasan</option>
              <option>Dr. Budi</option>
              <option>Ibu Sari</option>
              <option>Kepala Satker</option>
            </select>
          </label>

          <label className="fullwidth">
            <div className="field-title">Memo / Disposisi Pendukung (PDF)</div>
            <input type="file" accept="application/pdf" onChange={(e) => handleFile('memoFile', e.target.files)} />
            {form.memoFile && <small className="pdf-meta">{form.memoFile.name} — {(form.memoFile.size/1024/1024).toFixed(2)} MB</small>}
            {errors.memoFile && <small className="error">{errors.memoFile}</small>}
            {memoPreview && (
              <div className="pdf-preview-wrap">
                <iframe src={memoPreview} className="pdf-preview" title="memo-preview" />
                <div className="pdf-actions">
                  <button type="button" className="btn-secondary" onClick={() => { setForm(s => ({...s, memoFile: null})); URL.revokeObjectURL(memoPreview); setMemoPreview(null); setErrors(prev=>{ const n={...prev}; delete n.memoFile; return n; }); }}>Hapus Preview</button>
                </div>
              </div>
            )}
          </label>

          <label>
            <div className="field-title">Petugas Pengolah Data</div>
            <select name="petugasPengolah" value={form.petugasPengolah} onChange={handleChange}>
              <option>Bagian Data</option>
              <option>Tim Statistik</option>
            </select>
          </label>

          <label>
            <div className="field-title">Status Permintaan</div>
            <select name="statusPermintaan" value={form.statusPermintaan} onChange={handleChange}>
              <option>Diajukan</option>
              <option>Diproses</option>
              <option>Selesai</option>
              <option>Ditolak</option>
            </select>
          </label>

          <label className="fullwidth">
            <div className="field-title">File Hasil Data (opsional)</div>
            <input type="file" accept="application/pdf" onChange={(e) => handleFile('hasilFile', e.target.files)} />
            {form.hasilFile && <small className="pdf-meta">{form.hasilFile.name} — {(form.hasilFile.size/1024/1024).toFixed(2)} MB</small>}
            {errors.hasilFile && <small className="error">{errors.hasilFile}</small>}
            {hasilPreview && (
              <div className="pdf-preview-wrap">
                <iframe src={hasilPreview} className="pdf-preview" title="hasil-preview" />
                <div className="pdf-actions">
                  <button type="button" className="btn-secondary" onClick={() => { setForm(s => ({...s, hasilFile: null})); URL.revokeObjectURL(hasilPreview); setHasilPreview(null); setErrors(prev=>{ const n={...prev}; delete n.hasilFile; return n; }); }}>Hapus Preview</button>
                </div>
              </div>
            )}
          </label>

          <label className="fullwidth">
            <div className="field-title">Catatan Pengolah</div>
            <textarea name="catatanPengolah" value={form.catatanPengolah} onChange={handleChange} rows={3} />
          </label>

          <label>
            <div className="field-title">Tanggal Pengajuan</div>
            <input name="tanggalPengajuan" value={form.tanggalPengajuan} readOnly />
          </label>

        </div>

        <div className="hp-actions">
          <button type="button" className="btn-secondary" onClick={(e) => handleSubmit(e, 'draft')}>Simpan Draft</button>
          <button type="submit" className="btn-primary">Ajukan Permintaan</button>
        </div>
      </form>
    </div>
  );
}
