import { useState } from "react";
import { dummyBarangMasuk } from "./dummyData";
import { Modal, inputStyle, FormGroup, IconPlus, IconSearch } from "./components";

const BarangMasuk = () => {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState(dummyBarangMasuk);
  const [form, setForm] = useState({ noPengadaan: "", namaBarang: "", kategori: "Peralatan IT", jumlah: 1, kondisi: "Baik", nilaiUnit: "", pj: "", nipPj: "" });

  const filtered = data.filter(d =>
    d.namaBarang.toLowerCase().includes(search.toLowerCase()) ||
    d.pj.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = () => {
    if (!form.noPengadaan || !form.namaBarang) return;
    setData([...data, { ...form, id: data.length + 1, tanggal: new Date().toISOString().slice(0, 10) }]);
    setShowModal(false);
    setForm({ noPengadaan: "", namaBarang: "", kategori: "Peralatan IT", jumlah: 1, kondisi: "Baik", nilaiUnit: "", pj: "", nipPj: "" });
  };

  const kategoriColor = {
    "Peralatan IT": { bg: "#dbeafe", color: "#1d4ed8" },
    "Perabot":      { bg: "#f3e8ff", color: "#7c3aed" },
    "Kendaraan":    { bg: "#fef9c3", color: "#a16207" },
    "Lainnya":      { bg: "#f1f5f9", color: "#475569" },
  };

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: "#1e3a5f" }}>Proses Barang Masuk</h2>
          <p style={{ margin: "4px 0 0", color: "#64748b", fontSize: 14 }}>Pengecekan dan penerimaan barang pengadaan ke gudang</p>
        </div>
        <button onClick={() => setShowModal(true)} style={{ display: "flex", alignItems: "center", gap: 6, background: "#16a34a", color: "#fff", border: "none", borderRadius: 8, padding: "10px 18px", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>
          <IconPlus /> Catat Barang Masuk
        </button>
      </div>

      {/* Summary */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginBottom: 20 }}>
        {[
          { label: "Total Diterima",    value: data.length, color: "#16a34a", bg: "#dcfce7" },
          { label: "Sebagian Diterima", value: 1,           color: "#a16207", bg: "#fef9c3" },
          { label: "Ditolak",           value: 0,           color: "#dc2626", bg: "#fee2e2" },
        ].map(s => (
          <div key={s.label} style={{ background: s.bg, borderRadius: 10, padding: "18px 20px" }}>
            <div style={{ fontSize: 28, fontWeight: 800, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 14, color: s.color, fontWeight: 600 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div style={{ background: "#fff", borderRadius: 10, border: "1px solid #e2e8f0", padding: 20 }}>
        <div style={{ position: "relative", marginBottom: 16 }}>
          <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }}><IconSearch /></span>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Cari barang atau penanggung jawab..." style={{ ...inputStyle, paddingLeft: 36 }} />
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ background: "#f8fafc" }}>
                {["No. Pengadaan", "Nama Barang", "Kategori", "Jml", "Kondisi", "Nilai/Unit", "Penanggung Jawab", "NIP PJ", "Tanggal"].map(h => (
                  <th key={h} style={{ padding: "10px 12px", textAlign: "left", fontWeight: 700, color: "#374151", borderBottom: "1.5px solid #e2e8f0", whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(d => {
                const kc = kategoriColor[d.kategori] || kategoriColor["Lainnya"];
                return (
                  <tr key={d.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                    <td style={{ padding: "10px 12px", fontFamily: "monospace", fontSize: 12, color: "#64748b" }}>{d.noPengadaan}</td>
                    <td style={{ padding: "10px 12px", fontWeight: 600, color: "#1e293b" }}>{d.namaBarang}</td>
                    <td style={{ padding: "10px 12px" }}>
                      <span style={{ background: kc.bg, color: kc.color, padding: "2px 8px", borderRadius: 12, fontSize: 11, fontWeight: 600 }}>{d.kategori}</span>
                    </td>
                    <td style={{ padding: "10px 12px", color: "#1e293b", textAlign: "center" }}>{d.jumlah}</td>
                    <td style={{ padding: "10px 12px", color: "#16a34a", fontWeight: 600 }}>{d.kondisi}</td>
                    <td style={{ padding: "10px 12px", color: "#1e293b" }}>{d.nilaiUnit}</td>
                    <td style={{ padding: "10px 12px", color: "#1e293b" }}>{d.pj}</td>
                    <td style={{ padding: "10px 12px", color: "#64748b", fontFamily: "monospace", fontSize: 12 }}>{d.nipPj}</td>
                    <td style={{ padding: "10px 12px", color: "#64748b" }}>{d.tanggal}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <Modal title="Catat Barang Masuk" onClose={() => setShowModal(false)}>
          <FormGroup label="Nomor Pengadaan">
            <input style={inputStyle} value={form.noPengadaan} onChange={e => setForm({ ...form, noPengadaan: e.target.value })} placeholder="PBJ-2026-XXX" />
          </FormGroup>
          <FormGroup label="Nama Barang">
            <input style={inputStyle} value={form.namaBarang} onChange={e => setForm({ ...form, namaBarang: e.target.value })} placeholder="Nama barang pengadaan" />
          </FormGroup>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <FormGroup label="Kategori">
              <select style={inputStyle} value={form.kategori} onChange={e => setForm({ ...form, kategori: e.target.value })}>
                <option>Peralatan IT</option><option>Perabot</option><option>Kendaraan</option><option>Lainnya</option>
              </select>
            </FormGroup>
            <FormGroup label="Kondisi">
              <select style={inputStyle} value={form.kondisi} onChange={e => setForm({ ...form, kondisi: e.target.value })}>
                <option>Baik</option><option>Rusak Ringan</option><option>Rusak Berat</option>
              </select>
            </FormGroup>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <FormGroup label="Jumlah">
              <input style={inputStyle} type="number" min="1" value={form.jumlah} onChange={e => setForm({ ...form, jumlah: e.target.value })} />
            </FormGroup>
            <FormGroup label="Nilai/Unit">
              <input style={inputStyle} value={form.nilaiUnit} onChange={e => setForm({ ...form, nilaiUnit: e.target.value })} placeholder="Rp 0" />
            </FormGroup>
          </div>
          <FormGroup label="Penanggung Jawab">
            <input style={inputStyle} value={form.pj} onChange={e => setForm({ ...form, pj: e.target.value })} placeholder="Nama penanggung jawab" />
          </FormGroup>
          <FormGroup label="NIP Penanggung Jawab">
            <input style={inputStyle} value={form.nipPj} onChange={e => setForm({ ...form, nipPj: e.target.value })} placeholder="NIP penanggung jawab" />
          </FormGroup>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 8 }}>
            <button onClick={() => setShowModal(false)} style={{ padding: "10px 20px", border: "1.5px solid #e2e8f0", borderRadius: 8, background: "#fff", cursor: "pointer", fontWeight: 600, color: "#64748b" }}>Batal</button>
            <button onClick={handleSubmit} style={{ padding: "10px 20px", background: "#16a34a", color: "#fff", border: "none", borderRadius: 8, fontWeight: 600, cursor: "pointer" }}>Simpan</button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default BarangMasuk;