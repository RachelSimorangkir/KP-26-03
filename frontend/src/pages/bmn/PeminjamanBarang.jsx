import { useState } from "react";
import { dummyPeminjaman, stokBarang } from "./dummyData";
import { Modal, StatusBadge, inputStyle, FormGroup, IconBox, IconPlus, IconSearch } from "./components";

const PeminjamanBarang = () => {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState(dummyPeminjaman);
  const [form, setForm] = useState({ nama: "", nip: "", jabatan: "", barang: "", jumlah: 1, tglPinjam: "", tglKembali: "" });

  const filtered = data.filter(d =>
    d.nama.toLowerCase().includes(search.toLowerCase()) ||
    d.nip.includes(search) ||
    d.barang.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = () => {
    if (!form.nama || !form.nip || !form.barang) return;
    setData([...data, { ...form, id: data.length + 1, status: "Dipinjam" }]);
    setShowModal(false);
    setForm({ nama: "", nip: "", jabatan: "", barang: "", jumlah: 1, tglPinjam: "", tglKembali: "" });
  };

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: "#1e3a5f" }}>Proses Peminjaman Barang</h2>
          <p style={{ margin: "4px 0 0", color: "#64748b", fontSize: 14 }}>Kelola data peminjaman barang milik negara</p>
        </div>
        <button onClick={() => setShowModal(true)} style={{ display: "flex", alignItems: "center", gap: 6, background: "#1d4ed8", color: "#fff", border: "none", borderRadius: 8, padding: "10px 18px", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>
          <IconPlus /> Tambah Peminjaman
        </button>
      </div>

      {/* Stok Barang */}
      <div style={{ background: "#fff", borderRadius: 10, border: "1px solid #e2e8f0", padding: 20, marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16, color: "#1d4ed8", fontWeight: 700 }}>
          <IconBox /> <span>Informasi Stok Barang</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
          {stokBarang.map((s, i) => (
            <div key={i} style={{ textAlign: "center", padding: "12px 8px", background: "#f8fafc", borderRadius: 8 }}>
              <div style={{ fontSize: 13, color: "#64748b", marginBottom: 4 }}>{s.nama}</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: "#1d4ed8" }}>{s.jumlah}</div>
              <div style={{ fontSize: 12, color: "#94a3b8" }}>Unit</div>
            </div>
          ))}
        </div>
      </div>

      {/* Table */}
      <div style={{ background: "#fff", borderRadius: 10, border: "1px solid #e2e8f0", padding: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
          <div style={{ position: "relative", flex: 1 }}>
            <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }}><IconSearch /></span>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Cari nama, NIP, atau barang..." style={{ ...inputStyle, paddingLeft: 36 }} />
          </div>
          <span style={{ fontSize: 13, color: "#64748b" }}>{filtered.length} data</span>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ background: "#f8fafc" }}>
                {["Nama Pegawai", "NIP", "Jabatan", "Barang", "Jml", "Tgl Pinjam", "Tgl Kembali", "Status"].map(h => (
                  <th key={h} style={{ padding: "10px 12px", textAlign: "left", fontWeight: 700, color: "#374151", borderBottom: "1.5px solid #e2e8f0", whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(d => (
                <tr key={d.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                  <td style={{ padding: "10px 12px", fontWeight: 600, color: "#1e293b" }}>{d.nama}</td>
                  <td style={{ padding: "10px 12px", color: "#64748b", fontFamily: "monospace" }}>{d.nip}</td>
                  <td style={{ padding: "10px 12px", color: "#64748b" }}>{d.jabatan}</td>
                  <td style={{ padding: "10px 12px", color: "#1e293b" }}>{d.barang}</td>
                  <td style={{ padding: "10px 12px", color: "#1e293b", textAlign: "center" }}>{d.jumlah}</td>
                  <td style={{ padding: "10px 12px", color: "#64748b" }}>{d.tglPinjam}</td>
                  <td style={{ padding: "10px 12px", color: "#64748b" }}>{d.tglKembali}</td>
                  <td style={{ padding: "10px 12px" }}><StatusBadge status={d.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <Modal title="Tambah Peminjaman Barang" onClose={() => setShowModal(false)}>
          <FormGroup label="Nama Pegawai">
            <input style={inputStyle} value={form.nama} onChange={e => setForm({ ...form, nama: e.target.value })} placeholder="Nama lengkap" />
          </FormGroup>
          <FormGroup label="NIP">
            <input style={inputStyle} value={form.nip} onChange={e => setForm({ ...form, nip: e.target.value })} placeholder="Nomor Induk Pegawai" />
          </FormGroup>
          <FormGroup label="Jabatan">
            <input style={inputStyle} value={form.jabatan} onChange={e => setForm({ ...form, jabatan: e.target.value })} placeholder="Jabatan pegawai" />
          </FormGroup>
          <FormGroup label="Barang Dipinjam">
            <select style={inputStyle} value={form.barang} onChange={e => setForm({ ...form, barang: e.target.value })}>
              <option value="">-- Pilih Barang --</option>
              {stokBarang.map(s => <option key={s.nama} value={s.nama}>{s.nama} ({s.jumlah} unit)</option>)}
            </select>
          </FormGroup>
          <FormGroup label="Jumlah">
            <input style={inputStyle} type="number" min="1" value={form.jumlah} onChange={e => setForm({ ...form, jumlah: e.target.value })} />
          </FormGroup>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <FormGroup label="Tanggal Pinjam">
              <input style={inputStyle} type="date" value={form.tglPinjam} onChange={e => setForm({ ...form, tglPinjam: e.target.value })} />
            </FormGroup>
            <FormGroup label="Tanggal Kembali">
              <input style={inputStyle} type="date" value={form.tglKembali} onChange={e => setForm({ ...form, tglKembali: e.target.value })} />
            </FormGroup>
          </div>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 8 }}>
            <button onClick={() => setShowModal(false)} style={{ padding: "10px 20px", border: "1.5px solid #e2e8f0", borderRadius: 8, background: "#fff", cursor: "pointer", fontWeight: 600, color: "#64748b" }}>Batal</button>
            <button onClick={handleSubmit} style={{ padding: "10px 20px", background: "#1d4ed8", color: "#fff", border: "none", borderRadius: 8, fontWeight: 600, cursor: "pointer" }}>Simpan</button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default PeminjamanBarang;