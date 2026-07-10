import { useState } from "react";
import { stokHabisPakai, currentUser } from "./dummyData";
import { Modal, inputStyle, IconPlus, downloadAsPDF, AdminHeaderCard, AdminCard, AdminButton } from "./components";
import { useNavigate } from "react-router-dom";
import "./PermintaanUser.css";

const generateNomor = () => {
  const now = new Date();
  return `${String(Math.floor(Math.random() * 900) + 100)}/PPB/${now.getFullYear()}`;
};

const emptyItem = { nama: "", stokAwal: "", jumlahMinta: 1, stokAkhir: "", keterangan: "" };

const PreviewSurat = ({ items, nomorSurat, petugasGudang, today, onClose, onSubmit }) => (
  <Modal title="Preview Formulir Permintaan Barang" onClose={onClose} wide>
    <div id="surat-permintaan-print" style={{ border: "1.5px solid #e2e8f0", borderRadius: 8, padding: 24, background: "#fff", fontSize: 13 }}>
      <div style={{ textAlign: "center", borderBottom: "2px solid #1e293b", paddingBottom: 10, marginBottom: 16 }}>
        <div style={{ fontWeight: 800, fontSize: 13 }}>KEMENTERIAN AGAMA REPUBLIK INDONESIA</div>
        <div style={{ fontSize: 11, color: "#64748b" }}>DIREKTORAT JENDERAL BIMBINGAN MASYARAKAT KRISTEN</div>
        <div style={{ fontSize: 11, color: "#64748b" }}>Jalan M.H Thamrin Nomor 6 Jakarta 10340</div>
        <div style={{ fontWeight: 800, fontSize: 14, marginTop: 8, letterSpacing: 1 }}>PEMESANAN/PERMINTAAN BARANG</div>
        <div style={{ fontSize: 12 }}>Nomor : {nomorSurat}</div>
      </div>

      <div style={{ marginBottom: 14, fontSize: 12 }}>
        <span style={{ fontWeight: 600 }}>Bagian / Subdit : </span>
        <span style={{ borderBottom: "1px solid #94a3b8", paddingBottom: 2, minWidth: 180, display: "inline-block" }}>{currentUser.unitKerja}</span>
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, border: "1px solid #cbd5e1", marginBottom: 16 }}>
        <thead>
          <tr style={{ background: "#f8fafc" }}>
            {["No", "Nama/Jenis Barang", "Stok Awal", "Jumlah Permintaan", "Stok Akhir", "Keterangan"].map((h, i) => (
              <th key={i} style={{ padding: "8px 10px", fontWeight: 700, color: "#374151", border: "1px solid #cbd5e1", textAlign: "left", whiteSpace: "nowrap" }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => (
            <tr key={i}>
              <td style={{ padding: "6px 8px", border: "1px solid #cbd5e1", textAlign: "left" }}>{i + 1}</td>
              <td style={{ padding: "6px 8px", border: "1px solid #cbd5e1", textAlign: "left" }}>{item.nama || "-"}</td>
              <td style={{ padding: "6px 8px", border: "1px solid #cbd5e1", textAlign: "left" }}>{item.stokAwal !== "" ? item.stokAwal : "-"}</td>
              <td style={{ padding: "6px 8px", border: "1px solid #cbd5e1", textAlign: "left" }}>{item.jumlahMinta}</td>
              <td style={{ padding: "6px 8px", border: "1px solid #cbd5e1", textAlign: "left", fontWeight: 700, color: item.stokAkhir < 0 ? "#dc2626" : "#16a34a" }}>
                {item.stokAkhir !== "" ? item.stokAkhir : "-"}
              </td>
              <td style={{ padding: "6px 8px", border: "1px solid #cbd5e1", textAlign: "left" }}>{item.keterangan || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, fontSize: 12 }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontWeight: 600, marginBottom: 4 }}>Petugas Gudang</div>
          <div style={{ height: 40 }} />
          <div style={{ borderTop: "1.5px solid #1e293b", paddingTop: 6 }}>
            <div style={{ fontWeight: 700 }}>{petugasGudang.nama}</div>
            <div style={{ color: "#64748b" }}>NIP. {petugasGudang.nip}</div>
          </div>
        </div>

        <div style={{ textAlign: "center" }}>
          <div style={{ fontWeight: 600, marginBottom: 2 }}>Mengetahui :</div>
          <div style={{ fontSize: 11, color: "#64748b", marginBottom: 4 }}>Kasubbag Perlengkapan dan BMN</div>
          <div style={{ height: 40 }} />
          <div style={{ borderTop: "1.5px solid #1e293b", paddingTop: 6 }}>
            <div style={{ color: "#94a3b8", fontSize: 11 }}>(________________________)</div>
            <div style={{ color: "#64748b" }}>NIP. .............................</div>
          </div>
        </div>

        <div style={{ textAlign: "center" }}>
          <div style={{ fontWeight: 600, marginBottom: 2 }}>Jakarta, {today}</div>
          <div style={{ fontSize: 11, color: "#64748b", marginBottom: 4 }}>Yang Menerima,</div>
          <div style={{ height: 40 }} />
          <div style={{ borderTop: "1.5px solid #1e293b", paddingTop: 6 }}>
            <div style={{ fontWeight: 700 }}>{currentUser.nama}</div>
            <div style={{ color: "#64748b" }}>NIP. {currentUser.nip}</div>
          </div>
        </div>
      </div>

      <div style={{ fontSize: 10, color: "#94a3b8", fontStyle: "italic", marginTop: 10 }}>*) Coret yang tidak perlu</div>
    </div>

    <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 16, flexWrap: "wrap" }}>
      <AdminButton variant="outline" onClick={onClose}>Kembali Edit</AdminButton>
      <AdminButton variant="outline" onClick={() => window.print()}>🖨 Print</AdminButton>
      <AdminButton variant="success" onClick={() => downloadAsPDF("surat-permintaan-print", "permintaan-barang")}>💾 Save PDF</AdminButton>
      <AdminButton onClick={onSubmit}>Kirim Permintaan</AdminButton>
    </div>
  </Modal>
);

const PermintaanUser = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([{ ...emptyItem }]);
  const [submitted, setSubmitted] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [nomorSurat] = useState(generateNomor());
  const [petugasGudang] = useState({ nama: "Dewi Kusuma", nip: "199001012015032003" });
  const today = new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });

  const addItem = () => setItems([...items, { ...emptyItem }]);

  const removeItem = (i) => {
    if (items.length === 1) return;
    setItems(items.filter((_, idx) => idx !== i));
  };

  const updateItem = (i, field, value) => {
    const updated = items.map((item, idx) => {
      if (idx !== i) return item;
      const newItem = { ...item, [field]: value };
      if (field === "nama") {
        const stok = stokHabisPakai.find(s => s.nama === value);
        newItem.stokAwal = stok ? stok.stok : "";
        newItem.stokAkhir = stok ? stok.stok - (parseInt(newItem.jumlahMinta) || 0) : "";
      }
      if (field === "jumlahMinta") {
        const stok = stokHabisPakai.find(s => s.nama === item.nama);
        newItem.stokAkhir = stok ? stok.stok - (parseInt(value) || 0) : "";
      }
      return newItem;
    });
    setItems(updated);
  };

  const canSubmit = items.some(i => i.nama && i.jumlahMinta);

  const handleSubmit = () => {
    setShowPreview(false);
    setSubmitted(true);
  };

  if (submitted) {
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

        <h1>Permintaan Barang</h1>

        <p>
          Ajukan permintaan barang habis pakai
          secara online melalui Portal Internal
          BMBPSDM.
        </p>

      </div>

    </div>

    <div className="description-card">

      <h2>Tentang Layanan</h2>

      <p>
        Layanan ini digunakan untuk mengajukan
        permintaan barang habis pakai seperti
        ATK, perlengkapan kantor, dan kebutuhan
        operasional lainnya. Seluruh permintaan
        akan diverifikasi oleh Admin BMN sebelum
        diproses.
      </p>

    </div>
        <div style={{ fontSize: 36, marginBottom: 12 }}>✅</div>
        <div style={{ fontSize: 16, fontWeight: 700, color: "#1e293b", marginBottom: 6 }}>Permintaan Berhasil Dikirim!</div>
        <div style={{ color: "#64748b", marginBottom: 18, fontSize: 12 }}>Permintaan barang sedang diproses oleh Admin BMN.</div>
        <AdminButton onClick={() => { setSubmitted(false); setItems([{ ...emptyItem }]); }}>
          Buat Permintaan Baru
        </AdminButton>
      </div>
    );
  }

  return (
    <div>
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

        <h1>Permintaan Barang</h1>

        <p>
            Ajukan permintaan barang habis pakai secara online
            melalui Portal Internal BMBPSDM.
        </p>

    </div>
</div>

<div className="description-card">

    <h2>Tentang Layanan</h2>

    <p>
        Layanan ini digunakan untuk mengajukan permintaan
        barang habis pakai seperti ATK, perlengkapan kantor,
        dan kebutuhan operasional lainnya.
    </p>

</div>

      {/* Stok Info */}
      <div className="rekom-card">
        <h2>Stok Barang Habis Pakai</h2>
        <div className="stok-grid">
          {stokHabisPakai.map((s, i) => (
            <div key={i} className="stok-item">

    <div className="stok-nama">
        {s.nama}
    </div>

    <div
        className={
            s.stok === 0
                ? "stok-angka merah"
                : s.stok <= 2
                ? "stok-angka kuning"
                : "stok-angka"
        }
    >
        {s.stok}
    </div>

    <div className="stok-satuan">
        {s.satuan}
    </div>

</div>
          ))}
        </div>
      </div>

      {/* Form Input */}
      <div className="rekom-card">
        <h2>Form Permintaan Barang</h2>
        <div className="table-card">
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, border: "1px solid #cbd5e1" }}>
            <thead>
              <tr style={{ background: "#f8fafc" }}>
                {["No", "Nama/Jenis Barang", "Stok Awal", "Jumlah Permintaan", "Stok Akhir", "Keterangan", ""].map((h, i) => (
                  <th key={i} style={{ padding: "8px 10px", fontWeight: 700, color: "#374151", border: "1px solid #cbd5e1", textAlign: "left", whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map((item, i) => (
                <tr key={i}>
                  <td style={{ padding: "6px 8px", border: "1px solid #cbd5e1", textAlign: "left", fontWeight: 700, color: "#64748b" }}>{i + 1}</td>
                  <td style={{ padding: "4px 6px", border: "1px solid #cbd5e1", minWidth: 200 }}>
                    <select
                      style={{ ...inputStyle, border: "none", padding: "5px 6px", background: "transparent" }}
                      value={item.nama}
                      onChange={e => updateItem(i, "nama", e.target.value)}
                    >
                      <option value="">-- Pilih Barang --</option>
                      {stokHabisPakai.map(s => (
                        <option key={s.id} value={s.nama}>{s.nama}</option>
                      ))}
                    </select>
                  </td>
                  <td style={{ padding: "4px 6px", border: "1px solid #cbd5e1", width: 80, textAlign: "left" }}>
                    <span style={{ fontWeight: 600, color: "#1e293b", paddingLeft: 6 }}>{item.stokAwal !== "" ? item.stokAwal : "-"}</span>
                  </td>
                  <td style={{ padding: "4px 6px", border: "1px solid #cbd5e1", width: 110 }}>
                    <input
                      type="number" min="1"
                      style={{ ...inputStyle, border: "none", textAlign: "left", padding: "5px 6px", background: "transparent" }}
                      value={item.jumlahMinta}
                      onChange={e => updateItem(i, "jumlahMinta", e.target.value)}
                    />
                  </td>
                  <td style={{ padding: "4px 6px", border: "1px solid #cbd5e1", width: 90, textAlign: "left" }}>
                    <span style={{ fontWeight: 700, color: item.stokAkhir < 0 ? "#dc2626" : "#16a34a", paddingLeft: 6 }}>
                      {item.stokAkhir !== "" ? item.stokAkhir : "-"}
                    </span>
                  </td>
                  <td style={{ padding: "4px 6px", border: "1px solid #cbd5e1" }}>
                    <input
                      style={{ ...inputStyle, border: "none", padding: "5px 6px", background: "transparent" }}
                      value={item.keterangan}
                      placeholder="Keterangan (Opsional)..."
                      onChange={e => updateItem(i, "keterangan", e.target.value)}
                    />
                  </td>
                  <td style={{ padding: "4px 6px", border: "1px solid #cbd5e1", textAlign: "center" }}>
                    <button onClick={() => removeItem(i)} disabled={items.length === 1}
                      style={{ background: "none", border: "none", cursor: items.length === 1 ? "not-allowed" : "pointer", color: "#dc2626", opacity: items.length === 1 ? 0.3 : 1 }}>
                      ✕
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>

        <button onClick={addItem} style={{ display: "flex", alignItems: "center", gap: 5, border: "1.5px dashed #2563eb", borderRadius: 6, background: "#eff6ff", color: "#2563eb", padding: "6px 14px", fontWeight: 600, fontSize: 12, cursor: "pointer" }}>
          <IconPlus /> Tambah Barang
        </button>

        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 16, borderTop: "1px solid #f1f5f9", paddingTop: 14 }}>
          <button
            onClick={() => canSubmit && setShowPreview(true)}
            disabled={!canSubmit}
            style={{ padding: "9px 22px", background: canSubmit ? "#2563eb" : "#94a3b8", color: "#fff", border: "none", borderRadius: 6, fontWeight: 700, fontSize: 12, cursor: canSubmit ? "pointer" : "not-allowed" }}>
            👁 Preview & Kirim Permintaan
          </button>
        </div>

      {showPreview && (
        <PreviewSurat
          items={items}
          nomorSurat={nomorSurat}
          petugasGudang={petugasGudang}
          today={today}
          onClose={() => setShowPreview(false)}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default PermintaanUser;