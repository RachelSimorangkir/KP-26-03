import { useState } from "react";
import { dummyDBR } from "./dummyData";
import { Modal, inputStyle, FormGroup, IconDoc, IconPlus, IconSearch, IconTrash } from "./components";

const DBR = () => {
  const [search, setSearch] = useState("");
  const [showBuatModal, setShowBuatModal] = useState(false);
  const [detailPegawai, setDetailPegawai] = useState(null);
  const [data, setData] = useState(dummyDBR);

  // Form state untuk Buat DBR Baru
  const [form, setForm] = useState({
    nama: "", nip: "", jabatan: "", ruangan: "",
    barang: [{ nama: "", nup: "" }],
  });

  const filtered = data.filter(d =>
    d.nama.toLowerCase().includes(search.toLowerCase()) ||
    d.nip.includes(search) ||
    d.ruangan.toLowerCase().includes(search.toLowerCase())
  );

  // Tambah baris barang di form
  const tambahBarang = () => {
    setForm({ ...form, barang: [...form.barang, { nama: "", nup: "" }] });
  };

  // Hapus baris barang di form
  const hapusBarang = (index) => {
    if (form.barang.length === 1) return;
    setForm({ ...form, barang: form.barang.filter((_, i) => i !== index) });
  };

  // Update baris barang di form
  const updateBarang = (index, field, value) => {
    const updated = form.barang.map((b, i) => i === index ? { ...b, [field]: value } : b);
    setForm({ ...form, barang: updated });
  };

  const handleSubmit = () => {
    if (!form.nama || !form.nip || !form.jabatan || !form.ruangan) return;
    const barangValid = form.barang.filter(b => b.nama && b.nup);
    if (barangValid.length === 0) return;
    setData([...data, { ...form, id: data.length + 1, barang: barangValid }]);
    setShowBuatModal(false);
    setForm({ nama: "", nip: "", jabatan: "", ruangan: "", barang: [{ nama: "", nup: "" }] });
  };

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: "#1e3a5f" }}>DBR — Daftar Barang Ruang</h2>
          <p style={{ margin: "4px 0 0", color: "#64748b", fontSize: 14 }}>Inventaris barang yang dimiliki/digunakan tiap pegawai</p>
        </div>
        <button onClick={() => setShowBuatModal(true)} style={{ display: "flex", alignItems: "center", gap: 6, background: "#7c3aed", color: "#fff", border: "none", borderRadius: 8, padding: "10px 18px", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>
          <IconPlus /> Buat DBR Baru
        </button>
      </div>

      {/* Search */}
      <div style={{ position: "relative", marginBottom: 20 }}>
        <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }}><IconSearch /></span>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Cari nama, NIP, atau ruangan..." style={{ ...inputStyle, paddingLeft: 38 }} />
      </div>

      {/* Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {filtered.map(d => (
          <div key={d.id} style={{ background: "#fff", border: "1.5px solid #e2e8f0", borderRadius: 10, padding: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15, color: "#1e293b" }}>{d.nama}</div>
                <div style={{ fontSize: 12, color: "#64748b", fontFamily: "monospace" }}>{d.nip}</div>
                <div style={{ fontSize: 13, color: "#64748b" }}>{d.jabatan}</div>
              </div>
              <div style={{ color: "#7c3aed" }}><IconDoc /></div>
            </div>
            <div style={{ background: "#f3e8ff", color: "#7c3aed", padding: "4px 10px", borderRadius: 6, fontSize: 12, fontWeight: 600, display: "inline-block", marginBottom: 12 }}>
              {d.ruangan}
            </div>
            <div style={{ fontSize: 12, color: "#64748b", marginBottom: 8 }}>{d.barang.length} barang terdaftar</div>
            <ul style={{ margin: "0 0 12px", padding: 0, listStyle: "none" }}>
              {d.barang.slice(0, 3).map((b, i) => (
                <li key={i} style={{ fontSize: 13, color: "#475569", padding: "2px 0" }}>
                  <span style={{ color: "#7c3aed", marginRight: 6 }}>•</span>{b.nama} (1 unit)
                </li>
              ))}
              {d.barang.length > 3 && (
                <li style={{ fontSize: 12, color: "#94a3b8" }}>+{d.barang.length - 3} barang lainnya...</li>
              )}
            </ul>
            <button onClick={() => setDetailPegawai(d)} style={{ width: "100%", padding: "8px 0", border: "1.5px solid #7c3aed", borderRadius: 8, background: "#fff", color: "#7c3aed", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>
              Lihat Detail & Cetak
            </button>
          </div>
        ))}
      </div>

      {/* Modal: Detail & Cetak */}
      {detailPegawai && (
        <Modal title={`DBR — ${detailPegawai.nama}`} onClose={() => setDetailPegawai(null)}>
          <div style={{ background: "#f8fafc", borderRadius: 8, padding: 16, marginBottom: 20 }}>
            <div style={{ fontSize: 13, color: "#64748b", marginBottom: 4 }}>NIP: <span style={{ fontFamily: "monospace", color: "#1e293b" }}>{detailPegawai.nip}</span></div>
            <div style={{ fontSize: 13, color: "#64748b", marginBottom: 4 }}>Jabatan: <span style={{ color: "#1e293b" }}>{detailPegawai.jabatan}</span></div>
            <div style={{ fontSize: 13, color: "#64748b" }}>Ruangan: <span style={{ color: "#7c3aed", fontWeight: 600 }}>{detailPegawai.ruangan}</span></div>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ background: "#f8fafc" }}>
                {["No", "Nama Barang", "NUP"].map(h => (
                  <th key={h} style={{ padding: "8px 12px", textAlign: "left", fontWeight: 700, color: "#374151", borderBottom: "1.5px solid #e2e8f0" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {detailPegawai.barang.map((b, i) => (
                <tr key={i} style={{ borderBottom: "1px solid #f1f5f9" }}>
                  <td style={{ padding: "8px 12px", color: "#64748b" }}>{i + 1}</td>
                  <td style={{ padding: "8px 12px", color: "#1e293b" }}>{b.nama}</td>
                  <td style={{ padding: "8px 12px", fontFamily: "monospace", fontSize: 12, color: "#64748b" }}>{b.nup}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ marginTop: 20, borderTop: "1px solid #e2e8f0", paddingTop: 16 }}>
            <div style={{ fontSize: 13, color: "#64748b", marginBottom: 8 }}>Tanda Tangan Pemegang:</div>
            <div style={{ border: "1.5px dashed #cbd5e1", borderRadius: 8, height: 64, display: "flex", alignItems: "center", justifyContent: "center", color: "#94a3b8", fontSize: 13 }}>
              {detailPegawai.nama} — NIP {detailPegawai.nip}
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 16 }}>
            <button onClick={() => setDetailPegawai(null)} style={{ padding: "10px 20px", border: "1.5px solid #e2e8f0", borderRadius: 8, background: "#fff", cursor: "pointer", fontWeight: 600, color: "#64748b" }}>Tutup</button>
            <button onClick={() => window.print()} style={{ padding: "10px 20px", background: "#7c3aed", color: "#fff", border: "none", borderRadius: 8, fontWeight: 600, cursor: "pointer" }}>Cetak DBR</button>
          </div>
        </Modal>
      )}

      {/* Modal: Buat DBR Baru */}
      {showBuatModal && (
        <Modal title="Buat DBR Baru" onClose={() => setShowBuatModal(false)}>
          {/* Data Pegawai */}
          <div style={{ fontSize: 13, fontWeight: 700, color: "#7c3aed", marginBottom: 12, paddingBottom: 8, borderBottom: "1px solid #e2e8f0" }}>
            Data Pegawai
          </div>
          <FormGroup label="Nama Pegawai">
            <input style={inputStyle} value={form.nama} onChange={e => setForm({ ...form, nama: e.target.value })} placeholder="Nama lengkap pegawai" />
          </FormGroup>
          <FormGroup label="NIP">
            <input style={inputStyle} value={form.nip} onChange={e => setForm({ ...form, nip: e.target.value })} placeholder="Nomor Induk Pegawai" />
          </FormGroup>
          <FormGroup label="Jabatan">
            <input style={inputStyle} value={form.jabatan} onChange={e => setForm({ ...form, jabatan: e.target.value })} placeholder="Jabatan pegawai" />
          </FormGroup>
          <FormGroup label="Ruangan">
            <input style={inputStyle} value={form.ruangan} onChange={e => setForm({ ...form, ruangan: e.target.value })} placeholder="Contoh: Ruang Kepala Sub Bagian Lt. 2" />
          </FormGroup>

          {/* Daftar Barang */}
          <div style={{ fontSize: 13, fontWeight: 700, color: "#7c3aed", margin: "20px 0 12px", paddingBottom: 8, borderBottom: "1px solid #e2e8f0" }}>
            Daftar Barang
          </div>

          {form.barang.map((b, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr auto", gap: 10, marginBottom: 10, alignItems: "flex-end" }}>
              <FormGroup label={i === 0 ? "Nama Barang" : ""}>
                <input style={inputStyle} value={b.nama} onChange={e => updateBarang(i, "nama", e.target.value)} placeholder="Nama barang" />
              </FormGroup>
              <FormGroup label={i === 0 ? "NUP" : ""}>
                <input style={inputStyle} value={b.nup} onChange={e => updateBarang(i, "nup", e.target.value)} placeholder="BMN-XXX-XXXX" />
              </FormGroup>
              <button onClick={() => hapusBarang(i)} disabled={form.barang.length === 1}
                style={{ padding: "10px 10px", border: "1.5px solid #fee2e2", borderRadius: 8, background: "#fff", cursor: form.barang.length === 1 ? "not-allowed" : "pointer", color: "#dc2626", opacity: form.barang.length === 1 ? 0.4 : 1, marginBottom: 16 }}>
                <IconTrash />
              </button>
            </div>
          ))}

          <button onClick={tambahBarang} style={{ display: "flex", alignItems: "center", gap: 6, border: "1.5px dashed #7c3aed", borderRadius: 8, background: "#faf5ff", color: "#7c3aed", padding: "8px 16px", fontWeight: 600, fontSize: 13, cursor: "pointer", width: "100%", justifyContent: "center", marginBottom: 20 }}>
            <IconPlus /> Tambah Barang
          </button>

          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <button onClick={() => setShowBuatModal(false)} style={{ padding: "10px 20px", border: "1.5px solid #e2e8f0", borderRadius: 8, background: "#fff", cursor: "pointer", fontWeight: 600, color: "#64748b" }}>Batal</button>
            <button onClick={handleSubmit} style={{ padding: "10px 20px", background: "#7c3aed", color: "#fff", border: "none", borderRadius: 8, fontWeight: 600, cursor: "pointer" }}>Simpan DBR</button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default DBR;