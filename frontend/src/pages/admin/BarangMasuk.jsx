import { useState } from "react";
import { dummyBarangMasuk } from "../user/bmn/dummyData";
import { Modal, inputStyle, FormGroup, AdminHeaderCard, AdminCard, AdminStatCard, AdminTable, AdminButton } from "../user/bmn/components";

const BarangMasukAdmin = () => {
  const [data, setData] = useState(dummyBarangMasuk);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    noPengadaan: "", namaBarang: "", kategori: "Peralatan IT",
    jumlah: 1, kondisi: "Baik", nilaiUnit: "", pj: "", nipPj: "",
  });

  const filtered = data.filter(d =>
    d.namaBarang.toLowerCase().includes(search.toLowerCase()) ||
    d.pj.toLowerCase().includes(search.toLowerCase()) ||
    d.noPengadaan.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = () => {
    if (!form.noPengadaan || !form.namaBarang) return;
    setData([...data, { ...form, id: data.length + 1, tanggal: new Date().toISOString().slice(0, 10) }]);
    setShowModal(false);
    setForm({ noPengadaan: "", namaBarang: "", kategori: "Peralatan IT", jumlah: 1, kondisi: "Baik", nilaiUnit: "", pj: "", nipPj: "" });
  };

  const kategoriColor = {
    "Peralatan IT": { bg: "#eff6ff", color: "#2563eb" },
    "Perabot":      { bg: "#faf5ff", color: "#7c3aed" },
    "Kendaraan":    { bg: "#fffbeb", color: "#d97706" },
    "Lainnya":      { bg: "#f8fafc", color: "#475569" },
  };

  const summary = {
    total: data.length,
    totalUnit: data.reduce((acc, d) => acc + Number(d.jumlah), 0),
  };

  return (
    <div>
      <AdminHeaderCard
        title="Proses Barang Masuk"
        subtitle="Pengecekan dan penerimaan barang pengadaan ke gudang"
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Cari barang, no. pengadaan..."
        rightAction={
          <AdminButton onClick={() => setShowModal(true)} style={{ background: "#fff", color: "#2563eb", whiteSpace: "nowrap" }}>
            + Catat Barang Masuk
          </AdminButton>
        }
      />

      <div style={{ display: "flex", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
        <AdminStatCard value={summary.total} label="Total Pengadaan" color="#2563eb" bg="#eff6ff" />
        <AdminStatCard value={summary.totalUnit} label="Total Unit Masuk" color="#16a34a" bg="#f0fdf4" />
        <AdminStatCard value={0} label="Ditolak" color="#dc2626" bg="#fef2f2" />
      </div>

      <AdminCard>
        <AdminTable headers={["No. Pengadaan", "Nama Barang", "Kategori", "Jml", "Kondisi", "Nilai/Unit", "Penanggung Jawab", "NIP PJ", "Tanggal"]}>
          {filtered.map(d => {
            const kc = kategoriColor[d.kategori] || kategoriColor["Lainnya"];
            return (
              <tr key={d.id} style={{ borderBottom: "1px solid #f8fafc" }}>
                <td style={{ padding: "12px 16px", fontFamily: "monospace", fontSize: 12, color: "#64748b" }}>{d.noPengadaan}</td>
                <td style={{ padding: "12px 16px", fontWeight: 600, color: "#1e293b" }}>{d.namaBarang}</td>
                <td style={{ padding: "12px 16px" }}>
                  <span style={{ background: kc.bg, color: kc.color, padding: "3px 10px", borderRadius: 12, fontSize: 11, fontWeight: 600 }}>{d.kategori}</span>
                </td>
                <td style={{ padding: "12px 16px", textAlign: "center", color: "#1e293b" }}>{d.jumlah}</td>
                <td style={{ padding: "12px 16px", color: "#16a34a", fontWeight: 600 }}>{d.kondisi}</td>
                <td style={{ padding: "12px 16px", color: "#1e293b" }}>{d.nilaiUnit}</td>
                <td style={{ padding: "12px 16px", color: "#1e293b" }}>{d.pj}</td>
                <td style={{ padding: "12px 16px", fontFamily: "monospace", fontSize: 12, color: "#64748b" }}>{d.nipPj}</td>
                <td style={{ padding: "12px 16px", color: "#64748b" }}>{d.tanggal}</td>
              </tr>
            );
          })}
        </AdminTable>
      </AdminCard>

      {showModal && (
        <Modal title="Catat Barang Masuk" onClose={() => setShowModal(false)}>
          <FormGroup label="Nomor Pengadaan">
            <input style={inputStyle} value={form.noPengadaan} onChange={e => setForm({ ...form, noPengadaan: e.target.value })} placeholder="PBJ-2026-XXX" />
          </FormGroup>
          <FormGroup label="Nama Barang">
            <input style={inputStyle} value={form.namaBarang} onChange={e => setForm({ ...form, namaBarang: e.target.value })} placeholder="Nama barang pengadaan" />
          </FormGroup>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
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
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
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
            <input style={inputStyle} value={form.nipPj} onChange={e => setForm({ ...form, nipPj: e.target.value })} placeholder="NIP" />
          </FormGroup>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 8 }}>
            <AdminButton variant="outline" onClick={() => setShowModal(false)}>Batal</AdminButton>
            <AdminButton variant="success" onClick={handleSubmit}>Simpan</AdminButton>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default BarangMasukAdmin;