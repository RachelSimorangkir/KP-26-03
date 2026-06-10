import { useState } from "react";
import { dummyPermintaan } from "./dummyData";
import { Modal, StatusBadge, inputStyle, FormGroup, IconDoc, IconPlus, IconSearch } from "./components";

const PermintaanBarang = () => {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState(dummyPermintaan);
  const [form, setForm] = useState({ nip: "", nama: "", tipe: "PNS", barang: "", keterangan: "" });

  const pending   = data.filter(d => d.status === "Pending").length;
  const disetujui = data.filter(d => d.status === "Disetujui").length;
  const ditolak   = data.filter(d => d.status === "Ditolak").length;

  const filtered = data.filter(d =>
    d.nip.includes(search) ||
    d.nama.toLowerCase().includes(search.toLowerCase()) ||
    d.barang.toLowerCase().includes(search.toLowerCase())
  );

  const handleAction = (id, action) => {
    setData(data.map(d => d.id === id ? { ...d, status: action } : d));
  };

  const handleSubmit = () => {
    if (!form.nip || !form.nama || !form.barang) return;
    setData([...data, { ...form, id: data.length + 1, tanggal: new Date().toISOString().slice(0, 10), status: "Pending" }]);
    setShowModal(false);
    setForm({ nip: "", nama: "", tipe: "PNS", barang: "", keterangan: "" });
  };

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: "#1e3a5f" }}>Permintaan Barang</h2>
          <p style={{ margin: "4px 0 0", color: "#64748b", fontSize: 14 }}>Kelola permintaan pengadaan barang dari pegawai</p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button style={{ display: "flex", alignItems: "center", gap: 6, background: "#16a34a", color: "#fff", border: "none", borderRadius: 8, padding: "10px 16px", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>
            <IconDoc /> Export Excel
          </button>
          <button style={{ display: "flex", alignItems: "center", gap: 6, background: "#dc2626", color: "#fff", border: "none", borderRadius: 8, padding: "10px 16px", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>
            <IconDoc /> Export PDF
          </button>
          <button onClick={() => setShowModal(true)} style={{ display: "flex", alignItems: "center", gap: 6, background: "#92400e", color: "#fff", border: "none", borderRadius: 8, padding: "10px 16px", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>
            <IconPlus /> Buat Permintaan
          </button>
        </div>
      </div>

      {/* Status Summary */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginBottom: 20 }}>
        {[
          { label: "Pending",   value: pending,   bg: "#fef9c3", color: "#a16207" },
          { label: "Disetujui", value: disetujui, bg: "#dcfce7", color: "#16a34a" },
          { label: "Ditolak",   value: ditolak,   bg: "#fee2e2", color: "#dc2626" },
        ].map(s => (
          <div key={s.label} style={{ background: s.bg, borderRadius: 10, padding: "18px 20px" }}>
            <div style={{ fontSize: 28, fontWeight: 800, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 14, color: s.color, fontWeight: 600 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div style={{ background: "#fff", borderRadius: 10, border: "1px solid #e2e8f0", padding: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
          <div style={{ position: "relative", flex: 1 }}>
            <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }}><IconSearch /></span>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Cari NIP, nama, atau barang..." style={{ ...inputStyle, paddingLeft: 36 }} />
          </div>
          <span style={{ fontSize: 13, color: "#64748b" }}>{filtered.length} data ditampilkan · {data.length} total</span>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ background: "#f8fafc" }}>
                {["NIP", "Nama Pegawai", "Tipe", "Barang Diminta", "Keterangan", "Tanggal", "Status", "Aksi"].map(h => (
                  <th key={h} style={{ padding: "10px 12px", textAlign: "left", fontWeight: 700, color: "#374151", borderBottom: "1.5px solid #e2e8f0", whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(d => (
                <tr key={d.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                  <td style={{ padding: "10px 12px", color: "#64748b", fontFamily: "monospace", fontSize: 12 }}>{d.nip}</td>
                  <td style={{ padding: "10px 12px", fontWeight: 600, color: "#1e293b" }}>{d.nama}</td>
                  <td style={{ padding: "10px 12px" }}>
                    <span style={{ background: "#dbeafe", color: "#1d4ed8", padding: "2px 8px", borderRadius: 12, fontSize: 11, fontWeight: 600 }}>{d.tipe}</span>
                  </td>
                  <td style={{ padding: "10px 12px", color: "#1e293b" }}>{d.barang}</td>
                  <td style={{ padding: "10px 12px", color: "#64748b" }}>{d.keterangan || "-"}</td>
                  <td style={{ padding: "10px 12px", color: "#64748b" }}>{d.tanggal}</td>
                  <td style={{ padding: "10px 12px" }}><StatusBadge status={d.status} /></td>
                  <td style={{ padding: "10px 12px" }}>
                    {d.status === "Pending" && (
                      <div style={{ display: "flex", gap: 6 }}>
                        <button onClick={() => handleAction(d.id, "Disetujui")} style={{ background: "#16a34a", color: "#fff", border: "none", borderRadius: 6, padding: "4px 10px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Setuju</button>
                        <button onClick={() => handleAction(d.id, "Ditolak")} style={{ background: "#dc2626", color: "#fff", border: "none", borderRadius: 6, padding: "4px 10px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Tolak</button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <Modal title="Buat Permintaan Barang" onClose={() => setShowModal(false)}>
          <FormGroup label="NIP">
            <input style={inputStyle} value={form.nip} onChange={e => setForm({ ...form, nip: e.target.value })} placeholder="Nomor Induk Pegawai" />
          </FormGroup>
          <FormGroup label="Nama Pegawai">
            <input style={inputStyle} value={form.nama} onChange={e => setForm({ ...form, nama: e.target.value })} placeholder="Nama lengkap" />
          </FormGroup>
          <FormGroup label="Tipe Pegawai">
            <select style={inputStyle} value={form.tipe} onChange={e => setForm({ ...form, tipe: e.target.value })}>
              <option>PNS</option><option>PPPK</option><option>Non-ASN</option>
            </select>
          </FormGroup>
          <FormGroup label="Barang yang Diminta">
            <input style={inputStyle} value={form.barang} onChange={e => setForm({ ...form, barang: e.target.value })} placeholder="Nama barang" />
          </FormGroup>
          <FormGroup label="Keterangan">
            <input style={inputStyle} value={form.keterangan} onChange={e => setForm({ ...form, keterangan: e.target.value })} placeholder="Keterangan tambahan (opsional)" />
          </FormGroup>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 8 }}>
            <button onClick={() => setShowModal(false)} style={{ padding: "10px 20px", border: "1.5px solid #e2e8f0", borderRadius: 8, background: "#fff", cursor: "pointer", fontWeight: 600, color: "#64748b" }}>Batal</button>
            <button onClick={handleSubmit} style={{ padding: "10px 20px", background: "#92400e", color: "#fff", border: "none", borderRadius: 8, fontWeight: 600, cursor: "pointer" }}>Kirim Permintaan</button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default PermintaanBarang;