import { useState } from "react";
import { stokHabisPakai, currentUser } from "./dummyData";
import { StokCard, inputStyle, FormGroup, IconPlus, IconTrash } from "./components";

const generateNomor = () => {
  const now = new Date();
  return `${String(Math.floor(Math.random() * 900) + 100)}/PPB/${now.getFullYear()}`;
};

const emptyItem = { nama: "", jumlahMinta: 1, jumlahAkhir: "", keterangan: "" };

const PermintaanUser = () => {
  const [items, setItems] = useState([{ ...emptyItem }]);
  const [submitted, setSubmitted] = useState(false);
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
      // Auto hitung jumlah akhir berdasarkan stok
      if (field === "nama") {
        const stok = stokHabisPakai.find(s => s.nama === value);
        newItem.jumlahAkhir = stok ? stok.stok - (parseInt(newItem.jumlahMinta) || 0) : "";
      }
      if (field === "jumlahMinta") {
        const stok = stokHabisPakai.find(s => s.nama === item.nama);
        newItem.jumlahAkhir = stok ? stok.stok - (parseInt(value) || 0) : "";
      }
      return newItem;
    });
    setItems(updated);
  };

  const canSubmit = items.some(i => i.nama && i.jumlahMinta);

  if (submitted) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 400 }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
        <div style={{ fontSize: 20, fontWeight: 700, color: "#1e3a5f", marginBottom: 8 }}>Permintaan Berhasil Dikirim!</div>
        <div style={{ color: "#64748b", marginBottom: 24 }}>Permintaan barang sedang diproses oleh Admin BMN.</div>
        <button onClick={() => { setSubmitted(false); setItems([{ ...emptyItem }]); }}
          style={{ padding: "10px 24px", background: "#1d4ed8", color: "#fff", border: "none", borderRadius: 8, fontWeight: 600, cursor: "pointer" }}>
          Buat Permintaan Baru
        </button>
      </div>
    );
  }

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: "#1e3a5f" }}>Permintaan Barang</h2>
        <p style={{ margin: "4px 0 0", color: "#64748b", fontSize: 14 }}>Formulir permintaan/pemesanan barang habis pakai</p>
      </div>

      {/* Stok Info */}
      <StokCard items={stokHabisPakai} title="Stok Barang Habis Pakai" />

      {/* Form Surat */}
      <div style={{ background: "#fff", borderRadius: 10, border: "1px solid #e2e8f0", padding: 28 }}>
        {/* Kop */}
        <div style={{ textAlign: "center", borderBottom: "2px solid #1e3a5f", paddingBottom: 12, marginBottom: 20 }}>
          <div style={{ fontWeight: 800, fontSize: 14 }}>KEMENTERIAN AGAMA REPUBLIK INDONESIA</div>
          <div style={{ fontSize: 12, color: "#64748b" }}>DIREKTORAT JENDERAL BIMBINGAN MASYARAKAT KRISTEN</div>
          <div style={{ fontSize: 12, color: "#64748b" }}>Jalan M.H Thamrin Nomor 6 Jakarta 10340</div>
          <div style={{ fontWeight: 800, fontSize: 15, marginTop: 10, letterSpacing: 1 }}>PEMESANAN/PERMINTAAN BARANG</div>
          <div style={{ fontSize: 13 }}>Nomor : {nomorSurat}</div>
        </div>

        {/* Bagian / Subdit */}
        <div style={{ marginBottom: 16, fontSize: 13 }}>
          <span style={{ fontWeight: 600 }}>Bagian / Subdit : </span>
          <span style={{ borderBottom: "1px solid #94a3b8", paddingBottom: 2, minWidth: 200, display: "inline-block" }}>{currentUser.unitKerja}</span>
        </div>

        {/* Tabel Barang */}
        <div style={{ overflowX: "auto", marginBottom: 20 }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, border: "1px solid #cbd5e1" }}>
            <thead>
              <tr style={{ background: "#f8fafc" }}>
                {["No.", "Nama / Jenis Barang", "Jumlah Permintaan", "Jumlah Akhir", "Keterangan", ""].map((h, i) => (
                  <th key={i} style={{ padding: "10px 12px", fontWeight: 700, color: "#374151", border: "1px solid #cbd5e1", textAlign: "center", whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map((item, i) => (
                <tr key={i}>
                  <td style={{ padding: "8px 10px", border: "1px solid #cbd5e1", textAlign: "center", fontWeight: 700, color: "#64748b" }}>{i + 1}.</td>
                  <td style={{ padding: "6px 8px", border: "1px solid #cbd5e1", minWidth: 220 }}>
                    <select
                      style={{ ...inputStyle, border: "none", padding: "6px 8px", background: "transparent" }}
                      value={item.nama}
                      onChange={e => updateItem(i, "nama", e.target.value)}
                    >
                      <option value="">-- Pilih Barang --</option>
                      {stokHabisPakai.map(s => (
                        <option key={s.id} value={s.nama}>{s.nama}</option>
                      ))}
                    </select>
                  </td>
                  <td style={{ padding: "6px 8px", border: "1px solid #cbd5e1", width: 120 }}>
                    <input
                      type="number" min="1"
                      style={{ ...inputStyle, border: "none", textAlign: "center", padding: "6px 8px", background: "transparent" }}
                      value={item.jumlahMinta}
                      onChange={e => updateItem(i, "jumlahMinta", e.target.value)}
                    />
                  </td>
                  <td style={{ padding: "6px 8px", border: "1px solid #cbd5e1", width: 100, textAlign: "center" }}>
                    <span style={{ fontWeight: 700, color: item.jumlahAkhir < 0 ? "#dc2626" : "#16a34a" }}>
                      {item.jumlahAkhir !== "" ? item.jumlahAkhir : "-"}
                    </span>
                  </td>
                  <td style={{ padding: "6px 8px", border: "1px solid #cbd5e1" }}>
                    <input
                      style={{ ...inputStyle, border: "none", padding: "6px 8px", background: "transparent" }}
                      value={item.keterangan}
                      placeholder="Keterangan..."
                      onChange={e => updateItem(i, "keterangan", e.target.value)}
                    />
                  </td>
                  <td style={{ padding: "6px 8px", border: "1px solid #cbd5e1", textAlign: "center" }}>
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

        <button onClick={addItem} style={{ display: "flex", alignItems: "center", gap: 6, border: "1.5px dashed #1d4ed8", borderRadius: 8, background: "#eff6ff", color: "#1d4ed8", padding: "7px 16px", fontWeight: 600, fontSize: 13, cursor: "pointer", marginBottom: 28 }}>
          <IconPlus /> Tambah Barang
        </button>

        {/* TTD Section */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, fontSize: 13 }}>
          {/* Petugas Gudang */}
          <div style={{ textAlign: "center" }}>
            <div style={{ fontWeight: 600, marginBottom: 4 }}>Petugas Gudang</div>
            <div style={{ height: 50 }} />
            <div style={{ borderTop: "1.5px solid #1e293b", paddingTop: 6 }}>
              <div style={{ fontWeight: 700 }}>{petugasGudang.nama}</div>
              <div style={{ color: "#64748b" }}>NIP. {petugasGudang.nip}</div>
            </div>
          </div>

          {/* Mengetahui */}
          <div style={{ textAlign: "center" }}>
            <div style={{ fontWeight: 600, marginBottom: 2 }}>Mengetahui :</div>
            <div style={{ fontSize: 12, color: "#64748b", marginBottom: 4 }}>Kasubbag Perlengkapan dan BMN</div>
            <div style={{ height: 50 }} />
            <div style={{ borderTop: "1.5px solid #1e293b", paddingTop: 6 }}>
              <div style={{ color: "#94a3b8", fontSize: 12 }}>(________________________)</div>
              <div style={{ color: "#64748b" }}>NIP. .............................</div>
            </div>
          </div>

          {/* Yang Menerima */}
          <div style={{ textAlign: "center" }}>
            <div style={{ fontWeight: 600, marginBottom: 2 }}>Jakarta, {today}</div>
            <div style={{ fontSize: 12, color: "#64748b", marginBottom: 4 }}>Yang Menerima,</div>
            <div style={{ height: 50 }} />
            <div style={{ borderTop: "1.5px solid #1e293b", paddingTop: 6 }}>
              <div style={{ fontWeight: 700 }}>{currentUser.nama}</div>
              <div style={{ color: "#64748b" }}>NIP. {currentUser.nip}</div>
            </div>
          </div>
        </div>

        <div style={{ fontSize: 11, color: "#94a3b8", fontStyle: "italic", marginTop: 12 }}>*) Coret yang tidak perlu</div>

        {/* Submit */}
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 24, borderTop: "1px solid #e2e8f0", paddingTop: 20 }}>
          <button onClick={() => window.print()} style={{ padding: "10px 20px", border: "1.5px solid #1d4ed8", borderRadius: 8, background: "#fff", cursor: "pointer", fontWeight: 600, color: "#1d4ed8" }}>
            🖨 Cetak Formulir
          </button>
          <button onClick={() => canSubmit && setSubmitted(true)} disabled={!canSubmit}
            style={{ padding: "10px 24px", background: canSubmit ? "#1d4ed8" : "#94a3b8", color: "#fff", border: "none", borderRadius: 8, fontWeight: 700, cursor: canSubmit ? "pointer" : "not-allowed" }}>
            Kirim Permintaan
          </button>
        </div>
      </div>
    </div>
  );
};

export default PermintaanUser;