import { useState, useEffect } from "react";
import {
  Modal, inputStyle, FormGroup,
  AdminHeaderCard, AdminCard, AdminStatCard, AdminTable, AdminButton,
  IconPlus,
} from "../user/bmn/components";

const API_URL = "http://localhost:8080/api";

// Daftar admin BMN sekarang diambil dari database (role = admin_bmn),
// bukan hardcode lagi — lihat useEffect di dalam komponen.

// ─── HELPERS ──────────────────────────────────────────────────────────────────
const kategoriList = [
  "Perlengkapan Kantor", "Meubelier", "Lemari Besi/Kayu",
  "Kendaraan Roda Dua", "Kendaraan Roda Empat", "Tanah", "Gedung",
];
const kondisiList  = ["Baik", "Rusak Ringan", "Rusak Berat"];

const kategoriColor = {
  "Perlengkapan Kantor":  { bg: "#eff6ff", color: "#2563eb" },
  "Meubelier":            { bg: "#faf5ff", color: "#7c3aed" },
  "Lemari Besi/Kayu":     { bg: "#fef3c7", color: "#a16207" },
  "Kendaraan Roda Dua":   { bg: "#fffbeb", color: "#d97706" },
  "Kendaraan Roda Empat": { bg: "#fff7ed", color: "#c2410c" },
  "Tanah":                { bg: "#f0fdf4", color: "#16a34a" },
  "Gedung":               { bg: "#f0f9ff", color: "#0284c7" },
};

const tdBase = {
  padding: "10px 14px", textAlign: "left",
  borderBottom: "1px solid #f1f5f9", verticalAlign: "middle",
  whiteSpace: "nowrap",
};

// ─────────────────────────────────────────────────────────────────────────────
// HIBAH KELUAR
// ─────────────────────────────────────────────────────────────────────────────
const emptyKeluarItem = { nama: "", kategori: "Perlengkapan Kantor", jumlah: 1, kondisi: "Baik", keterangan: "" };

const generateNoSurat = () => {
  const now = new Date();
  return `HBK-${now.getFullYear()}-${String(Math.floor(Math.random() * 900) + 100).padStart(3, "0")}`;
};

const statusColor = {
  "Selesai": { bg: "#dcfce7", color: "#16a34a" },
  "Proses":  { bg: "#dbeafe", color: "#1d4ed8" },
  "Batal":   { bg: "#fee2e2", color: "#dc2626" },
};

const HibahKeluarAdmin = () => {
  const [data, setData]             = useState([]);
  const [loading, setLoading]       = useState(true);
  const [search, setSearch]         = useState("");
  const [filter, setFilter]         = useState("Semua");
  const [showModal, setShowModal]   = useState(false);
  const [detailItem, setDetailItem] = useState(null);
  const [editId, setEditId]         = useState(null);

  const loadData = () => {
    setLoading(true);
    fetch(`${API_URL}/hibah-keluar`)
      .then(res => res.json())
      .then(json => setData(Array.isArray(json) ? json : []))
      .catch(err => console.error("Gagal ambil data hibah keluar:", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => { loadData(); }, []);

  const [adminBMN, setAdminBMN] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/admin-bmn`)
      .then(res => res.json())
      .then(data => setAdminBMN(Array.isArray(data) ? data : []))
      .catch(err => console.error("Gagal ambil daftar admin BMN:", err));
  }, []);

  const loginUser = JSON.parse(localStorage.getItem("currentUser")) || {};

  const adminBMNSorted = [...adminBMN].sort((a, b) => {
    if (a.nip === loginUser.nip) return -1;
    if (b.nip === loginUser.nip) return 1;
    return 0;
  });

  const defaultPemeriksa =
    adminBMN.find(a => a.nip === loginUser.nip)?.nama || adminBMN[0]?.nama || "";

  const emptyForm = () => ({
    noSurat:   generateNoSurat(),
    tanggal:   new Date().toISOString().slice(0, 10),
    pemeriksa: defaultPemeriksa,
    penerima:  { nama: "", nip: "", unitKerja: "" },
    tujuan:    "",
    status:    "Selesai",
    items:     [{ ...emptyKeluarItem }],
  });

  const [form, setForm] = useState(emptyForm());

  // adminBMN awalnya kosong (masih fetch), update pemeriksa begitu datanya sudah ada
  useEffect(() => {
    if (defaultPemeriksa && !form.pemeriksa) {
      setForm(prev => ({ ...prev, pemeriksa: defaultPemeriksa }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultPemeriksa]);


  const filtered = data.filter(d => {
    const matchSearch =
      d.noSurat.toLowerCase().includes(search.toLowerCase()) ||
      d.penerima.nama.toLowerCase().includes(search.toLowerCase()) ||
      d.items.some(it => it.nama.toLowerCase().includes(search.toLowerCase()));
    const matchFilter = filter === "Semua" || d.status === filter;
    return matchSearch && matchFilter;
  });

  const addItem = () =>
    setForm(prev => ({ ...prev, items: [...prev.items, { ...emptyKeluarItem }] }));

  const removeItem = (idx) =>
    setForm(prev => {
      if (prev.items.length === 1) return prev;
      return { ...prev, items: prev.items.filter((_, i) => i !== idx) };
    });

  const updateItem = (idx, field, value) =>
    setForm(prev => ({
      ...prev,
      items: prev.items.map((it, i) => i === idx ? { ...it, [field]: value } : it),
    }));

  const resetForm = () => {
    setForm(emptyForm());
    setEditId(null);
  };

  const openAddModal = () => {
    resetForm();
    setShowModal(true);
  };

  const openEditModal = (d) => {
    setForm({
      noSurat:   d.noSurat,
      tanggal:   d.tanggal,
      pemeriksa: d.pemeriksa,
      penerima:  { ...d.penerima },
      tujuan:    d.tujuan,
      status:    d.status,
      items:     d.items.map(it => ({ ...it })),
    });
    setEditId(d.id);
    setShowModal(true);
  };

  const handleDelete = async (d) => {
    if (!window.confirm(`Hapus data hibah keluar "${d.noSurat}"? Tindakan ini tidak dapat dibatalkan.`)) return;
    try {
      const res = await fetch(`${API_URL}/hibah-keluar/${d.id}`, { method: "DELETE" });
      const result = await res.json();
      if (!result.success) {
        alert(result.error || "Gagal menghapus hibah keluar.");
        return;
      }
      loadData();
    } catch (err) {
      console.error(err);
      alert("Gagal menghapus hibah keluar.");
    }
  };

  const handleSubmit = async () => {
    if (!form.penerima.nama || form.items.some(it => !it.nama)) return;

    try {
      const isEdit = Boolean(editId);
      const res = await fetch(`${API_URL}/hibah-keluar${isEdit ? `/${editId}` : ""}`, {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const result = await res.json();

      if (!result.success) {
        alert(result.error || "Gagal menyimpan hibah keluar.");
        return;
      }

      setShowModal(false);
      resetForm();
      loadData();
    } catch (err) {
      console.error(err);
      alert("Gagal menyimpan hibah keluar.");
    }
  };

  const summary = {
    total:     data.length,
    totalItem: data.reduce((acc, d) => acc + d.items.reduce((a, it) => a + Number(it.jumlah), 0), 0),
    bulanIni:  data.filter(d => d.tanggal.startsWith(new Date().toISOString().slice(0, 7))).length,
  };

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: 300 }}>
        <div style={{ fontSize: 12, color: "#64748b" }}>Memuat data hibah keluar...</div>
      </div>
    );
  }

  return (
    <div>
      <AdminHeaderCard
        title="Hibah Keluar"
        subtitle="Pencatatan barang yang dihibahkan keluar ke instansi atau lembaga lain"
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Cari no. surat, penerima, atau barang..."
        rightAction={
          <AdminButton onClick={openAddModal} style={{ background: "#fff", color: "#2563eb", whiteSpace: "nowrap" }}>
            + Catat Hibah Keluar
          </AdminButton>
        }
      />

      <div style={{ display: "flex", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
        <AdminStatCard value={summary.total}     label="Total Hibah Keluar" color="#2563eb" bg="#eff6ff" />
        <AdminStatCard value={summary.totalItem} label="Total Item Keluar"  color="#16a34a" bg="#f0fdf4" />
        <AdminStatCard value={summary.bulanIni}  label="Bulan Ini"          color="#d97706" bg="#fffbeb" />
      </div>

      {/* ── Filter status ── */}
      <div style={{ display: "flex", gap: 6, marginBottom: 12, flexWrap: "wrap" }}>
        {["Semua", "Selesai", "Proses", "Batal"].map(s => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            style={{
              padding: "5px 14px", borderRadius: 20, fontSize: 16, fontWeight: 600, cursor: "pointer", border: "none",
              background: filter === s ? "#2563eb" : "#f1f5f9",
              color:      filter === s ? "#fff"    : "#64748b",
            }}
          >{s}</button>
        ))}
      </div>

      {/* ── Tabel utama ── */}
      <AdminCard>
        <div style={{ overflowX: "auto" }}>
        <AdminTable headers={[
          "No. Surat", "Tanggal", "Penerima Hibah", "Unit / Instansi",
          "Barang", "Pemeriksa Hibah", "Status", "Aksi",
        ]}>
          {filtered.map(d => {
            const sc = statusColor[d.status] || { bg: "#f1f5f9", color: "#475569" };
            return (
              <tr key={d.id} style={{ borderBottom: "1px solid #f8fafc" }}>
                <td style={{ ...tdBase, fontFamily: "monospace", fontSize: 14, color: "#64748b" }}>{d.noSurat}</td>
                <td style={{ ...tdBase, color: "#64748b" }}>{d.tanggal}</td>
                <td style={{ ...tdBase, fontWeight: 600, color: "#1e293b" }}>{d.penerima.nama}</td>
                <td style={{ ...tdBase, color: "#64748b" }}>{d.penerima.unitKerja}</td>
                <td style={tdBase}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    {d.items.map((it, i) => (
                      <span key={i} style={{ fontSize: 14, color: "#374151", whiteSpace: "nowrap" }}>
                        {it.nama} <span style={{ color: "#94a3b8" }}>({it.jumlah} unit)</span>
                      </span>
                    ))}
                  </div>
                </td>
                <td style={{ ...tdBase, color: "#374151" }}>{d.pemeriksa}</td>
                <td style={tdBase}>
                  <span style={{ background: sc.bg, color: sc.color, padding: "3px 10px", borderRadius: 20, fontSize: 14, fontWeight: 600 }}>
                    {d.status}
                  </span>
                </td>
                <td style={tdBase}>
                  <div style={{ display: "flex", gap: 6, whiteSpace: "nowrap" }}>
                    <AdminButton variant="outline" onClick={() => setDetailItem(d)}>Detail</AdminButton>
                    <AdminButton variant="outline" onClick={() => openEditModal(d)}>Edit</AdminButton>
                    <AdminButton variant="outline" onClick={() => handleDelete(d)} style={{ color: "#dc2626", borderColor: "#dc2626" }}>Hapus</AdminButton>
                  </div>
                </td>
              </tr>
            );
          })}
        </AdminTable>
        </div>
      </AdminCard>

      {/* ── Modal Detail ── */}
      {detailItem && (
        <Modal title={`Detail Hibah Keluar — ${detailItem.noSurat}`} onClose={() => setDetailItem(null)} wide>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
            <div style={{ background: "#f8fafc", borderRadius: 8, padding: 14, fontSize: 13 }}>
              <div style={{ fontWeight: 700, color: "#1e293b", marginBottom: 8 }}>Info Hibah Keluar</div>
              {[
                ["No. Surat",       detailItem.noSurat],
                ["Tanggal",         detailItem.tanggal],
                ["Pemeriksa Hibah", detailItem.pemeriksa],
                ["Tujuan",          detailItem.tujuan],
                ["Status",          detailItem.status],
              ].map(([k, v]) => (
                <div key={k} style={{ display: "flex", gap: 8, marginBottom: 4 }}>
                  <span style={{ fontWeight: 600, width: 120, flexShrink: 0 }}>{k}</span>
                  <span style={{ flexShrink: 0 }}>:</span>
                  <span>
                    {k === "Status"
                      ? <span style={{ background: (statusColor[v] || {}).bg, color: (statusColor[v] || {}).color, padding: "2px 8px", borderRadius: 12, fontSize: 14, fontWeight: 600 }}>{v}</span>
                      : v}
                  </span>
                </div>
              ))}
            </div>
            <div style={{ background: "#f8fafc", borderRadius: 8, padding: 14, fontSize: 13 }}>
              <div style={{ fontWeight: 700, color: "#1e293b", marginBottom: 8 }}>Data Penerima Hibah</div>
              {[
                ["Nama / Instansi", detailItem.penerima.nama],
                ["Unit / Bidang",   detailItem.penerima.unitKerja],
              ].map(([k, v]) => (
                <div key={k} style={{ display: "flex", gap: 8, marginBottom: 4 }}>
                  <span style={{ fontWeight: 600, width: 120, flexShrink: 0 }}>{k}</span>
                  <span style={{ flexShrink: 0 }}>:</span>
                  <span>{v}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ fontWeight: 700, color: "#1e293b", marginBottom: 8, fontSize: 13 }}>Daftar Barang Hibah Keluar</div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, border: "1px solid #e2e8f0" }}>
              <thead>
                <tr style={{ background: "#f8fafc" }}>
                  {["No", "Nama Barang", "Kategori", "Jumlah", "Kondisi", "Keterangan"].map(h => (
                    <th key={h} style={{ padding: "8px 12px", fontWeight: 700, color: "#374151", border: "1px solid #e2e8f0", textAlign: "left" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {detailItem.items.map((it, i) => (
                  <tr key={i}>
                    <td style={{ padding: "8px 12px", border: "1px solid #e2e8f0", color: "#64748b" }}>{i + 1}</td>
                    <td style={{ padding: "8px 12px", border: "1px solid #e2e8f0", fontWeight: 600, color: "#1e293b" }}>{it.nama}</td>
                    <td style={{ padding: "8px 12px", border: "1px solid #e2e8f0" }}>
                      {(() => {
                        const kc = kategoriColor[it.kategori] || { bg: "#f8fafc", color: "#475569" };
                        return (
                          <span style={{ background: kc.bg, color: kc.color, padding: "3px 10px", borderRadius: 20, fontSize: 14, fontWeight: 600 }}>
                            {it.kategori}
                          </span>
                        );
                      })()}
                    </td>
                    <td style={{ padding: "8px 12px", border: "1px solid #e2e8f0" }}>{it.jumlah} unit</td>
                    <td style={{ padding: "8px 12px", border: "1px solid #e2e8f0", fontWeight: 600, color: it.kondisi === "Baik" ? "#16a34a" : "#a16207" }}>{it.kondisi}</td>
                    <td style={{ padding: "8px 12px", border: "1px solid #e2e8f0", color: "#64748b" }}>{it.keterangan || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 16 }}>
            <AdminButton variant="outline" onClick={() => setDetailItem(null)}>Tutup</AdminButton>
          </div>
        </Modal>
      )}

      {/* ── Modal Catat Hibah Keluar ── */}
      {showModal && (
        <Modal title={editId ? "Edit Hibah Keluar" : "Catat Hibah Keluar"} onClose={() => { setShowModal(false); resetForm(); }} wide>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            <FormGroup label="No. Surat">
              <input style={{ ...inputStyle, background: "#f8fafc", color: "#94a3b8" }} value={form.noSurat} readOnly />
            </FormGroup>
            <FormGroup label="Tanggal">
              <input style={inputStyle} type="date" value={form.tanggal} onChange={e => setForm(prev => ({ ...prev, tanggal: e.target.value }))} />
            </FormGroup>
          </div>

          <div style={{ fontWeight: 700, color: "#1e293b", fontSize: 13, margin: "4px 0 10px" }}>Data Penerima Hibah</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            <FormGroup label="Nama / Instansi Penerima">
              <input
                style={inputStyle}
                value={form.penerima.nama}
                onChange={e => setForm(prev => ({ ...prev, penerima: { ...prev.penerima, nama: e.target.value } }))}
                placeholder="Nama instansi / lembaga penerima"
              />
            </FormGroup>
            <FormGroup label="Unit / Bidang">
              <input
                style={inputStyle}
                value={form.penerima.unitKerja}
                onChange={e => setForm(prev => ({ ...prev, penerima: { ...prev.penerima, unitKerja: e.target.value } }))}
                placeholder="Contoh: Bidang Pendidikan Agama"
              />
            </FormGroup>
          </div>

          <FormGroup label="Tujuan / Keterangan Hibah">
            <input
              style={inputStyle}
              value={form.tujuan}
              onChange={e => setForm(prev => ({ ...prev, tujuan: e.target.value }))}
              placeholder="Contoh: Hibah sarana pendidikan ke yayasan"
            />
          </FormGroup>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            <FormGroup label="Pemeriksa Hibah">
              <select
                style={inputStyle}
                value={form.pemeriksa}
                onChange={e => setForm(prev => ({ ...prev, pemeriksa: e.target.value }))}
              >
                {adminBMNSorted.map(a => (
                  <option key={a.nip} value={a.nama}>
                    {a.nama}{a.nip === loginUser.nip ? " (Saya)" : ""}
                  </option>
                ))}
              </select>
            </FormGroup>
            <FormGroup label="Status">
              <select
                style={inputStyle}
                value={form.status}
                onChange={e => setForm(prev => ({ ...prev, status: e.target.value }))}
              >
                <option>Selesai</option>
                <option>Proses</option>
                <option>Batal</option>
              </select>
            </FormGroup>
          </div>

          <div style={{ fontWeight: 700, color: "#1e293b", fontSize: 13, margin: "12px 0 8px" }}>Daftar Barang Hibah Keluar</div>
          <div style={{ overflowX: "auto", marginBottom: 10 }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, border: "1px solid #cbd5e1" }}>
              <thead>
                <tr style={{ background: "#f8fafc" }}>
                  {["No", "Nama Barang", "Kategori", "Jumlah", "Kondisi", "Keterangan", ""].map(h => (
                    <th key={h} style={{ padding: "7px 10px", fontWeight: 700, color: "#374151", border: "1px solid #cbd5e1", textAlign: "left", whiteSpace: "nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {form.items.map((it, idx) => (
                  <tr key={idx}>
                    <td style={{ padding: "4px 8px", border: "1px solid #cbd5e1", color: "#64748b", fontWeight: 700, textAlign: "left", width: 32 }}>{idx + 1}</td>
                    <td style={{ padding: "4px 6px", border: "1px solid #cbd5e1", minWidth: 180 }}>
                      <input
                        style={{ ...inputStyle, border: "none", padding: "5px 6px", background: "transparent" }}
                        value={it.nama}
                        onChange={e => updateItem(idx, "nama", e.target.value)}
                        placeholder="Nama barang"
                      />
                    </td>
                    <td style={{ padding: "4px 6px", border: "1px solid #cbd5e1", minWidth: 130 }}>
                      <select
                        style={{ ...inputStyle, border: "none", padding: "5px 6px", background: "transparent" }}
                        value={it.kategori}
                        onChange={e => updateItem(idx, "kategori", e.target.value)}
                      >
                        {kategoriList.map(k => <option key={k}>{k}</option>)}
                      </select>
                    </td>
                    <td style={{ padding: "4px 6px", border: "1px solid #cbd5e1", width: 70 }}>
                      <input
                        type="number" min="1"
                        style={{ ...inputStyle, border: "none", padding: "5px 6px", background: "transparent", width: 60 }}
                        value={it.jumlah}
                        onChange={e => updateItem(idx, "jumlah", e.target.value)}
                      />
                    </td>
                    <td style={{ padding: "4px 6px", border: "1px solid #cbd5e1", minWidth: 120 }}>
                      <select
                        style={{ ...inputStyle, border: "none", padding: "5px 6px", background: "transparent" }}
                        value={it.kondisi}
                        onChange={e => updateItem(idx, "kondisi", e.target.value)}
                      >
                        {kondisiList.map(k => <option key={k}>{k}</option>)}
                      </select>
                    </td>
                    <td style={{ padding: "4px 6px", border: "1px solid #cbd5e1", minWidth: 160 }}>
                      <input
                        style={{ ...inputStyle, border: "none", padding: "5px 6px", background: "transparent" }}
                        value={it.keterangan}
                        onChange={e => updateItem(idx, "keterangan", e.target.value)}
                        placeholder="Keterangan (opsional)"
                      />
                    </td>
                    <td style={{ padding: "4px 6px", border: "1px solid #cbd5e1", textAlign: "center", width: 36 }}>
                      <button
                        onClick={() => removeItem(idx)}
                        disabled={form.items.length === 1}
                        style={{ background: "none", border: "none", cursor: form.items.length === 1 ? "not-allowed" : "pointer", color: "#dc2626", opacity: form.items.length === 1 ? 0.3 : 1, fontSize: 14 }}
                      >✕</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button
            onClick={addItem}
            style={{ display: "flex", alignItems: "center", gap: 5, border: "1.5px dashed #2563eb", borderRadius: 6, background: "#eff6ff", color: "#2563eb", padding: "6px 14px", fontWeight: 600, fontSize: 12, cursor: "pointer", marginBottom: 16 }}
          >
            <IconPlus /> Tambah Barang
          </button>

          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <AdminButton variant="outline" onClick={() => { setShowModal(false); resetForm(); }}>Batal</AdminButton>
            <AdminButton variant="success" onClick={handleSubmit}>{editId ? "Simpan Perubahan" : "Simpan"}</AdminButton>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default HibahKeluarAdmin;