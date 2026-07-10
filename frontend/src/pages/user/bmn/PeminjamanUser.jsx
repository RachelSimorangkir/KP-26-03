import {
  Modal,
  inputStyle,
  FormGroup,
  IconSearch,
  downloadAsPDF,
  AdminButton
} from "./components";
import { useState, useEffect } from "react";
import { stokBarang } from "./dummyData";
import { useNavigate } from "react-router-dom";

// Generate nomor surat otomatis
const generateNomor = () => {
  const now = new Date();
  return `${String(Math.floor(Math.random() * 900) + 100)}/PPB/${now.getFullYear()}`;
};

// Preview surat peminjaman
const PreviewSurat = ({ form, barangDipilih, onClose, onSubmit }) => {
  const tglPinjam = new Date(form.tglPinjam).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
  const tglKembali = new Date(form.tglKembali).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
  const today = new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });

  return (
    <Modal title="Preview Surat Peminjaman" onClose={onClose} wide>
      <div id="surat-peminjaman-print" style={{ border: "1.5px solid #e2e8f0", borderRadius: 8, padding: 24, background: "#fff", fontFamily: "serif", fontSize: 13, lineHeight: 1.7, color: "#1e293b" }}>
        {/* Kop Surat */}
        <div style={{ textAlign: "center", borderBottom: "3px double #1e293b", paddingBottom: 10, marginBottom: 16 }}>
          <div style={{ fontWeight: 800, fontSize: 14, letterSpacing: 1 }}>KEMENTERIAN AGAMA REPUBLIK INDONESIA</div>
          <div style={{ fontSize: 11 }}>DIREKTORAT JENDERAL BIMBINGAN MASYARAKAT KRISTEN</div>
          <div style={{ fontSize: 11 }}>Jalan M.H. Thamrin Nomor 6 Jakarta 10340</div>
        </div>

        {/* Judul */}
        <div style={{ textAlign: "center", marginBottom: 16 }}>
          <div style={{ fontWeight: 700, fontSize: 14, textDecoration: "underline", letterSpacing: 1 }}>SURAT PEMINJAMAN BARANG</div>
          <div style={{ fontSize: 12 }}>Nomor: {generateNomor()}</div>
        </div>

        {/* Isi surat */}
        <p style={{ textAlign: "justify" }}>Yang bertanda tangan di bawah ini:</p>
        <table style={{ marginLeft: 16, marginBottom: 10, fontSize: 13, textAlign: "left" }}>
          <tbody>
            {[
              ["Nama", currentUser.nama],
              ["NIP", currentUser.nip],
              ["Jabatan", form.jabatan || currentUser.jabatan],
              ["Unit Kerja", form.unitKerja || currentUser.unitKerja],
            ].map(([k, v]) => (
              <tr key={k}>
                <td style={{ paddingRight: 10, width: 110, textAlign: "left", verticalAlign: "top" }}>{k}</td>
                <td style={{ paddingRight: 6, textAlign: "left", verticalAlign: "top" }}>:</td>
                <td style={{ textAlign: "left" }}><strong>{v}</strong></td>
              </tr>
            ))}
          </tbody>
        </table>

        <p style={{ textAlign: "justify" }}>Dengan ini mengajukan permohonan peminjaman barang milik negara sebagai berikut:</p>
        <table style={{ marginLeft: 16, marginBottom: 10, fontSize: 13, textAlign: "left" }}>
          <tbody>
            {[
              ["Nama Barang", barangDipilih?.nama || "-"],
              ["Kode Barang", barangDipilih?.kode || "-"],
              ["Lokasi Penggunaan", form.lokasi],
              ["Tanggal Pinjam", tglPinjam],
              ["Tanggal Kembali", tglKembali],
              ["Keperluan", form.keperluan],
            ].map(([k, v]) => (
              <tr key={k}>
                <td style={{ paddingRight: 10, width: 140, textAlign: "left", verticalAlign: "top" }}>{k}</td>
                <td style={{ paddingRight: 6, textAlign: "left", verticalAlign: "top" }}>:</td>
                <td style={{ textAlign: "left" }}><strong>{v}</strong></td>
              </tr>
            ))}
          </tbody>
        </table>

        <p style={{ textAlign: "justify" }}>
          Demikian surat peminjaman barang ini saya buat dengan sebenar-benarnya dan saya bertanggung jawab
          penuh atas keamanan dan kondisi barang yang dipinjam. Barang akan dikembalikan dalam kondisi baik
          sesuai batas waktu yang telah ditentukan.
        </p>

        {/* TTD */}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 24 }}>
          <div style={{ textAlign: "center", width: 180 }}>
            <div>Mengetahui,</div>
            <div>Kasubbag Perlengkapan dan BMN</div>
            <div style={{ marginTop: 40, borderTop: "1px solid #000", paddingTop: 4 }}>
              <div>(__________________________)</div>
              <div>NIP. ................................</div>
            </div>
          </div>
          <div style={{ textAlign: "center", width: 180 }}>
            <div>Jakarta, {today}</div>
            <div>Yang Meminjam,</div>
            <div style={{ marginTop: 40, borderTop: "1px solid #000", paddingTop: 4 }}>
              <div><strong>{currentUser.nama}</strong></div>
              <div>NIP. {currentUser.nip}</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 16, flexWrap: "wrap" }}>
        <AdminButton variant="outline" onClick={onClose}>Kembali Edit</AdminButton>
        <AdminButton variant="outline" onClick={() => window.print()}>🖨 Print</AdminButton>
        <AdminButton variant="success" onClick={() => downloadAsPDF("surat-peminjaman-print", "surat-peminjaman")}>💾 Save PDF</AdminButton>
        <AdminButton onClick={onSubmit}>Kirim Permohonan</AdminButton>
      </div>
    </Modal>
  );
};

// ─── MAIN ─────────────────────────────────────────────────────────────────────
const PeminjamanUser = () => {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState({
    nama: "",
    nip: "",
    jabatan: "",
    unitKerja: "",
  });
useEffect(() => {
  const loginUser = JSON.parse(
    localStorage.getItem("currentUser")
  );

  if (!loginUser) return;

  fetch(`http://localhost:8080/api/pegawai/${loginUser.nip}`)
    .then((res) => res.json())
    .then((data) => {
      setCurrentUser({
        nama: data.nama,
        nip: data.nip,
        jabatan: data.jabatan,
        unitKerja: data.unit_organisasi,
      });

      setForm((prev) => ({
        ...prev,
        jabatan: data.jabatan,
        unitKerja: data.unit_organisasi,
      }));
    })
    .catch((err) => console.error(err));
}, []);
  const [keyword, setKeyword] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [barangDipilih, setBarangDipilih] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
  unitKerja: "",
  jabatan: "",
    lokasi: "",
    tglPinjam: "",
    tglKembali: "",
    keperluan: "",
  });

  const barangFiltered = stokBarang.filter(b =>
    b.nama.toLowerCase().includes(keyword.toLowerCase()) ||
    b.kategori.toLowerCase().includes(keyword.toLowerCase())
  );

  const handlePilihBarang = (barang) => {
    setBarangDipilih(barang);
    setKeyword(barang.nama);
    setShowDropdown(false);
  };

  const handleSubmit = () => {
    setShowPreview(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="rekomendasi-page">
        <div style={{ fontSize: 36, marginBottom: 12 }}>✅</div>
        <div style={{ fontSize: 16, fontWeight: 700, color: "#1e293b", marginBottom: 6 }}>Permohonan Berhasil Dikirim!</div>
        <div style={{ color: "#64748b", marginBottom: 18, fontSize: 12 }}>Permohonan peminjaman sedang diproses oleh Admin BMN.</div>
        <AdminButton onClick={() => { setSubmitted(false); setBarangDipilih(null); setKeyword(""); setForm({ unitKerja: currentUser.unitKerja, jabatan: currentUser.jabatan, lokasi: "", tglPinjam: "", tglKembali: "", keperluan: "" }); }}>
          Ajukan Peminjaman Baru
        </AdminButton>
      </div>
    );
  }

  

  return (
  <div className="rekomendasi-page">

    <button
      className="back-button"
      onClick={() => navigate("/bmn")}
    >
      <img
        src="/logo-back.png"
        alt="Back"
        className="back-icon"
      />
    </button>

    <div className="service-banner">

    <div className="service-banner-content">
        <h1>Peminjaman Barang</h1>

        <p>
            Ajukan permohonan peminjaman Barang Milik Negara
            secara online melalui Portal Internal BMBPSDM.
        </p>
    </div>

</div>

<div className="description-card">

    <h2>Tentang Layanan</h2>

    <p>
        Layanan ini digunakan oleh pegawai untuk mengajukan
        peminjaman Barang Milik Negara yang tersedia di
        lingkungan BMBPSDM.
        Seluruh permohonan akan diverifikasi oleh Admin BMN
        sebelum barang dapat dipinjam.
    </p>

</div>

<div className="bmn-grid">


        {/* Form */}
        <div className="rekom-card">
          <div className="section-title">
    Data Pemohon
</div>

          <div style={{ display: "flex", gap: 10 }}>
            <FormGroup label="Unit Kerja" half>
              <input style={inputStyle} value={form.unitKerja} onChange={e => setForm({ ...form, unitKerja: e.target.value })} />
            </FormGroup>
            <FormGroup label="Jabatan" half>
              <input style={inputStyle} value={form.jabatan} onChange={e => setForm({ ...form, jabatan: e.target.value })} />
            </FormGroup>
          </div>

          <div className="section-title">
    Detail Peminjaman
</div>

          <FormGroup label="Cari Barang yang Dipinjam">
            <div style={{ position: "relative" }}>
              <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }}><IconSearch /></span>
              <input
                style={{ ...inputStyle, paddingLeft: 32 }}
                value={keyword}
                placeholder="Ketik nama barang (contoh: printer, proyektor...)"
                onChange={e => { setKeyword(e.target.value); setShowDropdown(true); setBarangDipilih(null); }}
                onFocus={() => setShowDropdown(true)}
              />
              {showDropdown && keyword && (
                <div style={{ position: "absolute", top: "100%", left: 0, right: 0, background: "#fff", border: "1.5px solid #e2e8f0", borderRadius: 8, zIndex: 10, maxHeight: 200, overflowY: "auto", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
                  {barangFiltered.length === 0 ? (
                    <div style={{ padding: "10px 12px", color: "#94a3b8", fontSize: 12 }}>Barang tidak ditemukan</div>
                  ) : barangFiltered.map(b => (
                    <div key={b.id} onClick={() => handlePilihBarang(b)}
                      style={{ padding: "8px 12px", cursor: "pointer", borderBottom: "1px solid #f1f5f9", display: "flex", justifyContent: "space-between", alignItems: "center", textAlign: "left" }}
                      onMouseEnter={e => e.currentTarget.style.background = "#f8fafc"}
                      onMouseLeave={e => e.currentTarget.style.background = "#fff"}
                    >
                      <div style={{ textAlign: "left" }}>
                        <div style={{ fontSize: 12, fontWeight: 600, color: "#1e293b", textAlign: "left" }}>{b.nama}</div>
                        <div style={{ fontSize: 10, color: "#64748b", textAlign: "left" }}>{b.kode} · {b.kategori}</div>
                      </div>
                      <span style={{
                        fontSize: 11, fontWeight: 700, padding: "2px 7px", borderRadius: 10, flexShrink: 0, marginLeft: 10,
                        background: b.stok === 0 ? "#fef2f2" : b.stok <= 2 ? "#fffbeb" : "#f0fdf4",
                        color: b.stok === 0 ? "#dc2626" : b.stok <= 2 ? "#d97706" : "#16a34a",
                      }}>
                        {b.stok === 0 ? "Habis" : `${b.stok} unit`}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </FormGroup>

          {barangDipilih && (
            <div style={{ background: "#eff6ff", border: "1.5px solid #bfdbfe", borderRadius: 8, padding: "8px 12px", marginBottom: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#2563eb" }}>{barangDipilih.nama}</div>
                <div style={{ fontSize: 11, color: "#3b82f6" }}>Kode: {barangDipilih.kode} · Stok tersedia: {barangDipilih.stok} unit</div>
              </div>
              <button onClick={() => { setBarangDipilih(null); setKeyword(""); }} style={{ background: "none", border: "none", cursor: "pointer", color: "#64748b", fontSize: 16 }}>×</button>
            </div>
          )}

          <FormGroup label="Lokasi Penggunaan">
            <input style={inputStyle} value={form.lokasi} onChange={e => setForm({ ...form, lokasi: e.target.value })} placeholder="Contoh: Ruang Rapat Lt. 3" />
          </FormGroup>

          <div style={{ display: "flex", gap: 10 }}>
            <FormGroup label="Tanggal Pinjam" half>
              <input style={inputStyle} type="date" value={form.tglPinjam} onChange={e => setForm({ ...form, tglPinjam: e.target.value })} />
            </FormGroup>
            <FormGroup label="Tanggal Kembali" half>
              <input style={inputStyle} type="date" value={form.tglKembali} onChange={e => setForm({ ...form, tglKembali: e.target.value })} />
            </FormGroup>
          </div>

          <FormGroup label="Keperluan / Keterangan">
            <textarea style={{ ...inputStyle, minHeight: 60, resize: "vertical" }} value={form.keperluan} onChange={e => setForm({ ...form, keperluan: e.target.value })} placeholder="Jelaskan keperluan peminjaman..." />
          </FormGroup>

          <button
            onClick={() => { if (barangDipilih && form.lokasi && form.tglPinjam && form.tglKembali) setShowPreview(true); }}
            disabled={!barangDipilih || !form.lokasi || !form.tglPinjam || !form.tglKembali}
            style={{ width: "100%", padding: "9px 0", background: (!barangDipilih || !form.lokasi || !form.tglPinjam || !form.tglKembali) ? "#94a3b8" : "#2563eb", color: "#fff", border: "none", borderRadius: 6, fontWeight: 700, fontSize: 12, cursor: (!barangDipilih || !form.lokasi || !form.tglPinjam || !form.tglKembali) ? "not-allowed" : "pointer" }}>
            👁 Preview & Kirim Surat
          </button>
        </div>

        {/* Stok Panel */}
        <div className="rekom-card">
          <div style={{ fontWeight: 700, color: "#1e293b", fontSize: 12, marginBottom: 10, textAlign: "left" }}>Ketersediaan Barang</div>
          {stokBarang.map(b => (
            <div key={b.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 0", borderBottom: "1px solid #f8fafc", textAlign: "left" }}>
              <div style={{ textAlign: "left" }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: "#1e293b", textAlign: "left" }}>{b.nama}</div>
                <div style={{ fontSize: 10, color: "#94a3b8", textAlign: "left" }}>{b.kategori}</div>
              </div>
              <span style={{
                fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 10, flexShrink: 0, marginLeft: 10,
                background: b.stok === 0 ? "#fef2f2" : b.stok <= 2 ? "#fffbeb" : "#f0fdf4",
                color: b.stok === 0 ? "#dc2626" : b.stok <= 2 ? "#d97706" : "#16a34a",
              }}>
                {b.stok === 0 ? "Habis" : `${b.stok} unit`}
              </span>
            </div>
          ))}
        </div>
      </div>

            {showPreview && (
        <PreviewSurat
          form={form}
          barangDipilih={barangDipilih}
          onClose={() => setShowPreview(false)}
          onSubmit={handleSubmit}
        />
      )}

    </div>
  );
};

export default PeminjamanUser;