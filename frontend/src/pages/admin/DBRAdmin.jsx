import { useState } from "react";
import { dummyDBR } from "../user/bmn/dummyData";
import { Modal, StatusBadge, inputStyle, FormGroup, IconPlus, IconDoc, IconTrash, downloadAsPDF, AdminHeaderCard, AdminButton } from "../user/bmn/components";

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

  const tambahBarang = () => {
    setForm({ ...form, barang: [...form.barang, { nama: "", nup: "", kondisi: "Baik" }] });
  };

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
    const newEntry = {
      ...form,
      id: data.length + 1,
      barang: barangValid.map((b, i) => ({ ...b, no: i + 1 })),
    };
    setData([...data, newEntry]);
    setShowBuatModal(false);
    setForm({ nama: "", nip: "", jabatan: "", ruangan: "", barang: [{ nama: "", nup: "", kondisi: "Baik" }] });
  };

  const today = new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });

  return (
    <div>
      <AdminHeaderCard
        title="DBR — Daftar Barang Ruang"
        subtitle="Kelola inventaris barang ruang seluruh pegawai"
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Cari nama, NIP, ruangan..."
        rightAction={
          <AdminButton onClick={() => setShowBuatModal(true)} style={{ background: "#fff", color: "#2563eb", whiteSpace: "nowrap" }}>
            + Tambah DBR
          </AdminButton>
        }
      />

      {/* Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {filtered.map(d => (
          <div key={d.id} style={{ background: "#fff", border: "1px solid #f1f5f9", boxShadow: "0 1px 3px rgba(0,0,0,0.06)", borderRadius: 14, padding: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15, color: "#1e293b" }}>{d.nama}</div>
                <div style={{ fontSize: 12, color: "#64748b", fontFamily: "monospace" }}>{d.nip}</div>
                <div style={{ fontSize: 13, color: "#64748b" }}>{d.jabatan}</div>
              </div>
              <div style={{ color: "#2563eb" }}><IconDoc /></div>
            </div>
            <div style={{ background: "#eff6ff", color: "#2563eb", padding: "4px 10px", borderRadius: 6, fontSize: 12, fontWeight: 600, display: "inline-block", marginBottom: 12 }}>
              {d.ruangan}
            </div>
            <div style={{ fontSize: 12, color: "#64748b", marginBottom: 8 }}>{d.barang.length} barang terdaftar</div>
            <ul style={{ margin: "0 0 12px", padding: 0, listStyle: "none" }}>
              {d.barang.slice(0, 3).map((b, i) => (
                <li key={i} style={{ fontSize: 13, color: "#475569", padding: "2px 0" }}>
                  <span style={{ color: "#2563eb", marginRight: 6 }}>•</span>{b.nama}{" "}
                  {b.kondisi !== "Baik" && <StatusBadge status={b.kondisi} />}
                </li>
              ))}
              {d.barang.length > 3 && <li style={{ fontSize: 12, color: "#94a3b8" }}>+{d.barang.length - 3} barang lainnya...</li>}
            </ul>
            <AdminButton variant="outline" onClick={() => setDetailPegawai(d)} style={{ width: "100%", justifyContent: "center" }}>
              Lihat Detail & Cetak
            </AdminButton>
          </div>
        ))}
      </div>

      {/* Modal Detail */}
      {detailPegawai && (
        <Modal title={`DBR — ${detailPegawai.nama}`} onClose={() => setDetailPegawai(null)} wide>
          <div id="dbr-detail-print">
            <div style={{ background: "#f8fafc", borderRadius: 8, padding: 16, marginBottom: 14 }}>
              {[["NIP", detailPegawai.nip], ["Jabatan", detailPegawai.jabatan], ["Ruangan", detailPegawai.ruangan]].map(([k, v]) => (
                <div key={k} style={{ fontSize: 13, color: "#64748b", marginBottom: 4 }}>
                  {k}: <span style={{ color: "#1e293b", fontWeight: 600 }}>{v}</span>
                </div>
              ))}
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, marginBottom: 14 }}>
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
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 14 }}>
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
            <AdminButton variant="outline" onClick={() => setDetailPegawai(null)}>Tutup</AdminButton>
            <AdminButton variant="outline" onClick={() => window.print()}>🖨 Print</AdminButton>
            <AdminButton variant="success" onClick={() => downloadAsPDF("dbr-detail-print", `DBR-${detailPegawai.nama}`)}>💾 Save PDF</AdminButton>
          </div>
        </Modal>
      )}

      {/* Modal Buat DBR */}
      {showBuatModal && (
        <Modal title="Tambah DBR Pegawai" onClose={() => setShowBuatModal(false)} wide>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#2563eb", marginBottom: 12, paddingBottom: 8, borderBottom: "1px solid #e2e8f0" }}>Data Pegawai</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            <FormGroup label="Nama Pegawai">
              <input style={inputStyle} value={form.nama} onChange={e => setForm({ ...form, nama: e.target.value })} placeholder="Nama lengkap" />
            </FormGroup>
            <FormGroup label="NIP">
              <input style={inputStyle} value={form.nip} onChange={e => setForm({ ...form, nip: e.target.value })} placeholder="Nomor Induk Pegawai" />
            </FormGroup>
            <FormGroup label="Jabatan">
              <input style={inputStyle} value={form.jabatan} onChange={e => setForm({ ...form, jabatan: e.target.value })} placeholder="Jabatan" />
            </FormGroup>
            <FormGroup label="Ruangan">
              <input style={inputStyle} value={form.ruangan} onChange={e => setForm({ ...form, ruangan: e.target.value })} placeholder="Nama ruangan" />
            </FormGroup>
          </div>

          <div style={{ fontSize: 13, fontWeight: 700, color: "#2563eb", margin: "16px 0 12px", paddingBottom: 8, borderBottom: "1px solid #e2e8f0" }}>Daftar Barang</div>

          {form.barang.map((b, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "2fr 1.5fr 1fr auto", gap: 10, marginBottom: 10, alignItems: "flex-end" }}>
              <FormGroup label={i === 0 ? "Nama Barang" : ""}>
                <input style={inputStyle} value={b.nama} onChange={e => updateBarang(i, "nama", e.target.value)} placeholder="Nama barang" />
              </FormGroup>
              <FormGroup label={i === 0 ? "NUP" : ""}>
                <input style={inputStyle} value={b.nup} onChange={e => updateBarang(i, "nup", e.target.value)} placeholder="BMN-XXX-XXXX" />
              </FormGroup>
              <FormGroup label={i === 0 ? "Kondisi" : ""}>
                <select style={inputStyle} value={b.kondisi} onChange={e => updateBarang(i, "kondisi", e.target.value)}>
                  <option>Baik</option>
                  <option>Rusak Ringan</option>
                  <option>Rusak Berat</option>
                </select>
              </FormGroup>
              <button onClick={() => hapusBarang(i)} disabled={form.barang.length === 1}
                style={{ padding: "9px 10px", border: "1.5px solid #fee2e2", borderRadius: 8, background: "#fff", cursor: form.barang.length === 1 ? "not-allowed" : "pointer", color: "#dc2626", opacity: form.barang.length === 1 ? 0.3 : 1, marginBottom: 14 }}>
                <IconTrash />
              </button>
            </div>
          ))}

          <button onClick={tambahBarang} style={{ display: "flex", alignItems: "center", gap: 6, border: "1.5px dashed #2563eb", borderRadius: 8, background: "#eff6ff", color: "#2563eb", padding: "8px 16px", fontWeight: 600, fontSize: 13, cursor: "pointer", width: "100%", justifyContent: "center", marginBottom: 14 }}>
            <IconPlus /> Tambah Barang
          </button>

          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <AdminButton variant="outline" onClick={() => setShowBuatModal(false)}>Batal</AdminButton>
            <AdminButton onClick={handleSubmit}>Simpan DBR</AdminButton>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default DBRAdmin;