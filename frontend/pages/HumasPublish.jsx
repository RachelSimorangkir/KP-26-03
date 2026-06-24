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
    kategori: "Pendidikan",
    tanggalKegiatan: "",
    lokasiKegiatan: "",
    isiBerita: "",
    foto: [],
    fotoPreviews: [],
    atasan: "",
  });

  const [errors, setErrors] = useState({});
  const editorRef = useRef(null);

  useEffect(() => {
    return () => {
      // revoke any object URLs
      form.fotoPreviews.forEach((p) => p && p.url && URL.revokeObjectURL(p.url));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  }

  function handleEditorInput() {
    if (editorRef.current) {
      setForm((s) => ({ ...s, isiBerita: editorRef.current.innerHTML }));
    }
  }

  function exec(command, value = null) {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    handleEditorInput();
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
    const text = (editorRef.current?.innerText || "").trim();
    if (!text) err.isiBerita = "Isi berita wajib";
    if (!form.foto || form.foto.length === 0) err.foto = "Minimal 1 file pendukung";
    if (!form.atasan) err.atasan = "Atasan penyetuju wajib";
    return err;
  }

  function handleSubmit(e, action = "submit") {
    e.preventDefault();
    const err = validate();
    setErrors(err);
    if (Object.keys(err).length > 0) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => {
      if (k === "foto" || k === "fotoPreviews") return;
      if (v !== undefined && v !== null) fd.append(k, v);
    });
    form.foto.forEach((f) => fd.append("foto[]", f));

    console.log("Submitting Humas form, action=", action);
    for (const pair of fd.entries()) console.log(pair[0], pair[1]);
    alert("Form dikirim: " + action + ". Periksa console untuk detail.");
  }

  return (
    <div className="humas-publish-layout">
      <header className="hp-header">
        <h1>Pengajuan Publikasi Berita Kegiatan</h1>
        <p>Isi data pengajuan sesuai format untuk proses editorial dan verifikasi</p>
      </header>

      <form className="hp-form" onSubmit={(e) => handleSubmit(e, "submit")}>
        {Object.keys(errors).length > 0 && (
          <div className="hp-errors">
            {Object.values(errors).map((er, i) => (
              <div key={i} className="hp-error">{er}</div>
            ))}
          </div>
        )}

        <div className="hp-grid">
          {/* ===== Informasi Pengusul ===== */}
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
            <input name="satuanKerja" value={form.satuanKerja} readOnly />
            {errors.satuanKerja && <small className="error">{errors.satuanKerja}</small>}
          </label>

          {/* ===== Detail Kegiatan ===== */}
          <div className="section fullwidth">
            <h3 className="section-title">Detail Kegiatan</h3>
          </div>

          <label className="fullwidth">
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
            <input
              type="date"
              name="tanggalKegiatan"
              value={form.tanggalKegiatan}
              onChange={handleChange}
              required
            />
            {errors.tanggalKegiatan && <small className="error">{errors.tanggalKegiatan}</small>}
          </label>

          <label className="fullwidth">
            <div className="field-title">Lokasi Kegiatan <span className="required">*</span></div>
            <input
              name="lokasiKegiatan"
              value={form.lokasiKegiatan}
              onChange={handleChange}
              required
            />
            {errors.lokasiKegiatan && <small className="error">{errors.lokasiKegiatan}</small>}
          </label>

          {/* ===== Konten Berita (Rich Text Editor) ===== */}
          <div className="section fullwidth">
            <h3 className="section-title">Konten Berita</h3>
          </div>

          <label className="fullwidth">
            <div className="field-title">Isi Berita / Narasi <span className="required">*</span></div>
            <div className="rte-toolbar">
              <button type="button" onClick={() => exec("bold")} title="Bold"><b>B</b></button>
              <button type="button" onClick={() => exec("italic")} title="Italic"><i>I</i></button>
              <button type="button" onClick={() => exec("underline")} title="Underline"><u>U</u></button>
              <button type="button" onClick={() => exec("insertUnorderedList")} title="Bullet List">• List</button>
              <button type="button" onClick={() => exec("insertOrderedList")} title="Numbered List">1. List</button>
              <button type="button" onClick={() => exec("formatBlock", "h2")} title="Heading">H2</button>
              <button type="button" onClick={() => exec("formatBlock", "p")} title="Paragraph">P</button>
            </div>
            <div
              ref={editorRef}
              className="rte-editor"
              contentEditable
              suppressContentEditableWarning
              onInput={handleEditorInput}
              style={{
                minHeight: "180px",
                border: "1px solid #d0d7de",
                borderRadius: "6px",
                padding: "10px 12px",
                outline: "none",
                backgroundColor: "#fff",
              }}
            />
            {errors.isiBerita && <small className="error">{errors.isiBerita}</small>}
          </label>

          {/* ===== Media & Lampiran ===== */}
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
                  {p.file.type.startsWith("image") ? (
                    <img src={p.url} alt={p.name} />
                  ) : (
                    <div className="video-placeholder">{p.name}</div>
                  )}
                  <div className="thumb-meta">
                    <div className="thumb-name">{p.name}</div>
                    <button
                      type="button"
                      className="thumb-remove"
                      onClick={() => removePreview(i)}
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </label>

          {/* ===== Persetujuan ===== */}
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
        </div>

        <div className="hp-actions">
          <button
            type="button"
            className="btn-secondary"
            onClick={(e) => handleSubmit(e, "draft")}
          >
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