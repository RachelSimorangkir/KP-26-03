import { useState } from "react";
import { dummyDBR } from "../user/bmn/dummyData";
import { Modal, StatusBadge, inputStyle, FormGroup, IconPlus, IconSearch, IconDoc, IconTrash, downloadAsPDF } from "../user/bmn/components";

const DBRAdmin = () => {
  const [data, setData] = useState(dummyDBR);
  const [search, setSearch] = useState("");
  const [showBuatModal, setShowBuatModal] = useState(false);
  const [detailPegawai, setDetailPegawai] = useState(null);
  const [form, setForm] = useState({
    nama: "", nip: "", jabatan: "", ruangan: "",
    barang: [{ nama: "", nup: "", kondisi: "Baik" }],
  });

  const filtered = data.filter(d =>
    d.nama.toLowerCase().includes(search.toLowerCase()) ||
    d.nip.includes(search) ||
    d.ruangan.toLowerCase().includes(search.toLowerCase())
  );

  const tambahBarang = () => setForm({ ...form, barang: [...form.barang, { nama: "", nup: "", kondisi: "Baik" }] });

  const hapusBarang = (i) => {
    if (form.barang.length === 1) return;
    setForm({ ...form, barang: form.barang.filter((_, idx) => idx !== i) });
  };

  const updateBarang = (i, field, value) => {
    setForm({ ...form, barang: form.barang.map((b, idx) => idx === i ? { ...b, [field]: value } : b) });
  };

  const handleSubmit = () => {
    if (!form.nama || !form.nip || !form.jabatan || !form.ruangan) return;
    const barangValid = form.barang.filter(b => b.nama && b.nup);
    if (barangValid.length === 0) return;
    const newDBR = {
      ...form,
      id: data.length + 1,
      barang: barangValid.map((b, i) => ({ ...b, no: i + 1 })),
    };
    setData([...data, newDBR]);
    setShowBuatModal(false);
    setForm({ nama: "", nip: "", jabatan: "", ruangan: "", barang: [{ nama: "", nup: "", kondisi: "Baik" }] });
  };

  const today = new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: "#1e3a5f" }}>DBR — Daftar Barang Ruang</h2>
          <p style={{ margin: "4px 0 0", color: "#64748b", fontSize: 14 }}>Kelola inventaris barang milik negara per pegawai</p>
        </div>
        <button onClick={() => setShowBuatModal(true)} style={{ display: "flex", alignItems: "center", gap: 6, background: "#7c3aed", color: "#fff", border: "none", borderRadius: 8, padding: "10px 18px", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>
          <IconPlus /> Buat DBR Baru
        </button>
      </div>

      {/* Summary */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginBottom: 20 }}>
        {[
          { label: "Total Pegawai", value: data.length, color: "#7c3aed", bg: "#f3e8ff" },
          { label: "Total Barang Terdaftar", value: data.reduce((acc, d) => acc + d.barang.length, 0), color: "#1d4ed8", bg: "#dbeafe" },
          { label: "Kondisi Perlu Perhatian", value: data.reduce((acc, d) => acc + d.barang.filter(b => b.kondisi !== "Baik").length, 0), color: "#dc2626", bg: "#fee2e2" },
        ].map(s => (
          <div key={s.label} style={{ background: s.bg, borderRadius: 10, padding: "16px 20px" }}>
            <div style={{ fontSize: 26, fontWeight: 800, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 13, color: s.color, fontWeight: 600 }}>{s.label}</div>
          </div>
        ))}
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
                <li key={i} style={{ fontSize: 13, color: "#475569", padding: "2px 0", display: "flex", justifyContent: "space-between" }}>
                  <span><span style={{ color: "#7c3aed", marginRight: 6 }}>•</span>{b.nama}</span>
                  <StatusBadge status={b.kondisi} />
                </li>
              ))}
              {d.barang.length > 3 && <li style={{ fontSize: 12, color: "#94a3b8" }}>+{d.barang.length - 3} barang lainnya...</li>}
            </ul>
            <button onClick={() => setDetailPegawai(d)} style={{ width: "100%", padding: "8px 0", border: "1.5px solid #7c3aed", borderRadius: 8, background: "#fff", color: "#7c3aed", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>
              Lihat Detail & Cetak
            </button>
          </div>
        ))}
      </div>

      {/* Modal Detail */}
      {detailPegawai && (
        <Modal title={`DBR — ${detailPegawai.nama}`} onClose={() => setDetailPegawai(null)} wide>
          <div id="dbr-detail-print">
          <div style={{ background: "#f8fafc", borderRadius: 8, padding: 16, marginBottom: 20 }}>
            {[["NIP", detailPegawai.nip], ["Jabatan", detailPegawai.jabatan], ["Ruangan", detailPegawai.ruangan]].map(([k, v]) => (
              <div key={k} style={{ fontSize: 13, color: "#64748b", marginBottom: 4 }}>
                {k}: <span style={{ color: "#1e293b", fontWeight: 600 }}>{v}</span>
              </div>
            ))}
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, marginBottom: 20 }}>
            <thead>
              <tr style={{ background: "#f8fafc" }}>
                {["No", "Nama Barang", "NUP", "Kondisi"].map(h => (
                  <th key={h} style={{ padding: "8px 12px", textAlign: "left", fontWeight: 700, color: "#374151", borderBottom: "1.5px solid #e2e8f0" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {detailPegawai.barang.map((b, i) => (
                <tr key={i} style={{ borderBottom: "1px solid #f1f5f9" }}>
                  <td style={{ padding: "8px 12px", color: "#64748b" }}>{b.no || i + 1}</td>
                  <td style={{ padding: "8px 12px", color: "#1e293b", fontWeight: 600 }}>{b.nama}</td>
                  <td style={{ padding: "8px 12px", fontFamily: "monospace", fontSize: 12, color: "#64748b" }}>{b.nup}</td>
                  <td style={{ padding: "8px 12px" }}><StatusBadge status={b.kondisi} /></td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* TTD */}
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 20 }}>
            <div style={{ textAlign: "center", width: 200 }}>
              <div style={{ fontWeight: 600 }}>Mengetahui,</div>
              <div style={{ fontSize: 12, color: "#64748b" }}>Kasubbag Perlengkapan dan BMN</div>
              <div style={{ height: 48 }} />
              <div style={{ borderTop: "1.5px solid #1e293b", paddingTop: 6 }}>
                <div style={{ color: "#94a3b8" }}>(________________________)</div>
                <div style={{ color: "#64748b" }}>NIP. .............................</div>
              </div>
            </div>
            <div style={{ textAlign: "center", width: 220 }}>
              <div>Jakarta, {today}</div>
              <div style={{ fontWeight: 600 }}>Yang Bertanggung Jawab,</div>
              <div style={{ height: 48 }} />
              <div style={{ borderTop: "1.5px solid #1e293b", paddingTop: 6 }}>
                <div style={{ fontWeight: 700 }}>{detailPegawai.nama}</div>
                <div style={{ color: "#64748b" }}>NIP. {detailPegawai.nip}</div>
              </div>
            </div>
          </div>
          </div>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", flexWrap: "wrap" }}>
            <button onClick={() => setDetailPegawai(null)} style={{ padding: "10px 18px", border: "1.5px solid #e2e8f0", borderRadius: 8, background: "#fff", cursor: "pointer", fontWeight: 600, color: "#64748b", fontSize: 13 }}>Tutup</button>
            <button onClick={() => window.print()} style={{ padding: "10px 18px", border: "1.5px solid #7c3aed", borderRadius: 8, background: "#fff", cursor: "pointer", fontWeight: 600, color: "#7c3aed", fontSize: 13 }}>🖨 Print</button>
            <button onClick={() => downloadAsPDF("dbr-detail-print", `DBR-${detailPegawai.nama}`)} style={{ padding: "10px 18px", border: "1.5px solid #16a34a", borderRadius: 8, background: "#fff", cursor: "pointer", fontWeight: 600, color: "#16a34a", fontSize: 13 }}>💾 Save PDF</button>
          </div>
        </Modal>
      )}

      {/* Modal Buat DBR */}
      {showBuatModal && (
        <Modal title="Buat DBR Baru" onClose={() => setShowBuatModal(false)} wide>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#7c3aed", marginBottom: 12, paddingBottom: 8, borderBottom: "1px solid #e2e8f0" }}>Data Pegawai</div>
          <div style={{ display: "flex", gap: 12 }}>
            <FormGroup label="Nama Pegawai" half>
              <input style={inputStyle} value={form.nama} onChange={e => setForm({ ...form, nama: e.target.value })} placeholder="Nama lengkap" />
            </FormGroup>
            <FormGroup label="NIP" half>
              <input style={inputStyle} value={form.nip} onChange={e => setForm({ ...form, nip: e.target.value })} placeholder="Nomor Induk Pegawai" />
            </FormGroup>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <FormGroup label="Jabatan" half>
              <input style={inputStyle} value={form.jabatan} onChange={e => setForm({ ...form, jabatan: e.target.value })} placeholder="Jabatan pegawai" />
            </FormGroup>
            <FormGroup label="Ruangan" half>
              <input style={inputStyle} value={form.ruangan} onChange={e => setForm({ ...form, ruangan: e.target.value })} placeholder="Nama ruangan" />
            </FormGroup>
          </div>

          <div style={{ fontSize: 13, fontWeight: 700, color: "#7c3aed", margin: "16px 0 12px", paddingBottom: 8, borderBottom: "1px solid #e2e8f0" }}>Daftar Barang</div>

          {/* Header kolom */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 140px 36px", gap: 8, marginBottom: 6 }}>
            {["Nama Barang", "NUP", "Kondisi", ""].map((h, i) => (
              <div key={i} style={{ fontSize: 12, fontWeight: 700, color: "#374151" }}>{h}</div>
            ))}
          </div>

          {form.barang.map((b, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 140px 36px", gap: 8, marginBottom: 8, alignItems: "center" }}>
              <input style={inputStyle} value={b.nama} onChange={e => updateBarang(i, "nama", e.target.value)} placeholder="Nama barang" />
              <input style={inputStyle} value={b.nup} onChange={e => updateBarang(i, "nup", e.target.value)} placeholder="BMN-XXX-XXXX" />
              <select style={inputStyle} value={b.kondisi} onChange={e => updateBarang(i, "kondisi", e.target.value)}>
                <option>Baik</option>
                <option>Rusak Ringan</option>
                <option>Rusak Berat</option>
              </select>
              <button onClick={() => hapusBarang(i)} disabled={form.barang.length === 1}
                style={{ padding: "8px", border: "1.5px solid #fee2e2", borderRadius: 8, background: "#fff", cursor: form.barang.length === 1 ? "not-allowed" : "pointer", color: "#dc2626", opacity: form.barang.length === 1 ? 0.3 : 1 }}>
                <IconTrash />
              </button>
            </div>
          ))}

          <button onClick={tambahBarang} style={{ display: "flex", alignItems: "center", gap: 6, border: "1.5px dashed #7c3aed", borderRadius: 8, background: "#faf5ff", color: "#7c3aed", padding: "8px 16px", fontWeight: 600, fontSize: 13, cursor: "pointer", width: "100%", justifyContent: "center", marginTop: 4, marginBottom: 20 }}>
            <IconPlus /> Tambah Barang
          </button>

          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <button onClick={() => setShowBuatModal(false)} style={{ padding: "10px 20px", border: "1.5px solid #e2e8f0", borderRadius: 8, background: "#fff", cursor: "pointer", fontWeight: 600, color: "#64748b" }}>Batal</button>
            <button onClick={handleSubmit} style={{ padding: "10px 24px", background: "#7c3aed", color: "#fff", border: "none", borderRadius: 8, fontWeight: 700, cursor: "pointer" }}>Simpan DBR</button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default DBRAdmin;