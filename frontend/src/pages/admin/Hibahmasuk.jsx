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
const parseRupiah = (str) => parseInt(String(str || "").replace(/[^0-9]/g, "")) || 0;
const formatRupiah = (num) => "Rp " + Number(num).toLocaleString("id-ID");

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
const tdTop = { ...tdBase, verticalAlign: "top" };

// ─────────────────────────────────────────────────────────────────────────────
// HIBAH MASUK
// ─────────────────────────────────────────────────────────────────────────────
const emptyMasukItem = { nama: "", kategori: "Perlengkapan Kantor", jumlah: 1, kondisi: "Baik", hargaUnit: "" };

const HibahMasukAdmin = () => {
  const [data, setData]             = useState([]);
  const [loading, setLoading]       = useState(true);
  const [search, setSearch]         = useState("");
  const [showModal, setShowModal]   = useState(false);
  const [detailItem, setDetailItem] = useState(null);
  const [editId, setEditId]         = useState(null);

  const loadData = () => {
    setLoading(true);
    fetch(`${API_URL}/hibah-masuk`)
      .then(res => res.json())
      .then(json => setData(Array.isArray(json) ? json : []))
      .catch(err => console.error("Gagal ambil data hibah masuk:", err))
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
    noPengadaan: "",
    tanggal:     new Date().toISOString().slice(0, 10),
    pemeriksa:   defaultPemeriksa,
    asalHibah:   "",
    items:       [{ ...emptyMasukItem }],
  });

  const [form, setForm] = useState(emptyForm());

  // adminBMN awalnya kosong (masih fetch), update pemeriksa begitu datanya sudah ada
  useEffect(() => {
    if (defaultPemeriksa && !form.pemeriksa) {
      setForm(prev => ({ ...prev, pemeriksa: defaultPemeriksa }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultPemeriksa]);


  const filtered = data.filter(d =>
    d.noPengadaan.toLowerCase().includes(search.toLowerCase()) ||
    d.pemeriksa.toLowerCase().includes(search.toLowerCase()) ||
    d.asalHibah.toLowerCase().includes(search.toLowerCase()) ||
    d.items.some(it => it.nama.toLowerCase().includes(search.toLowerCase()))
  );

  const hitungTotal = (items) =>
    items.reduce((acc, it) => acc + parseRupiah(it.hargaUnit) * Number(it.jumlah), 0);
  const hitungUnit = (items) =>
    items.reduce((acc, it) => acc + Number(it.jumlah), 0);

  const addItem = () =>
    setForm(prev => ({ ...prev, items: [...prev.items, { ...emptyMasukItem }] }));

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
      noPengadaan: d.noPengadaan,
      tanggal:     d.tanggal,
      pemeriksa:   d.pemeriksa,
      asalHibah:   d.asalHibah,
      items:       d.items.map(it => ({ ...it })),
    });
    setEditId(d.id);
    setShowModal(true);
  };

  const handleDelete = async (d) => {
    if (!window.confirm(`Hapus data hibah masuk "${d.noPengadaan}"? Tindakan ini tidak dapat dibatalkan.`)) return;
    try {
      const res = await fetch(`${API_URL}/hibah-masuk/${d.id}`, { method: "DELETE" });
      const result = await res.json();
      if (!result.success) {
        alert(result.error || "Gagal menghapus hibah masuk.");
        return;
      }
      loadData();
    } catch (err) {
      console.error(err);
      alert("Gagal menghapus hibah masuk.");
    }
  };

  const handleSubmit = async () => {
    if (!form.noPengadaan || !form.asalHibah || form.items.some(it => !it.nama)) return;

    try {
      const isEdit = Boolean(editId);
      const res = await fetch(`${API_URL}/hibah-masuk${isEdit ? `/${editId}` : ""}`, {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const result = await res.json();

      if (!result.success) {
        alert(result.error || "Gagal menyimpan hibah masuk.");
        return;
      }

      setShowModal(false);
      resetForm();
      loadData();
    } catch (err) {
      console.error(err);
      alert("Gagal menyimpan hibah masuk.");
    }
  };

  const summary = {
    total:      data.length,
    totalUnit:  data.reduce((acc, d) => acc + hitungUnit(d.items), 0),
    totalNilai: data.reduce((acc, d) => acc + hitungTotal(d.items), 0),
  };

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: 300 }}>
        <div style={{ fontSize: 12, color: "#64748b" }}>Memuat data hibah masuk...</div>
      </div>
    );
  }

  return (
    <div>
      <AdminHeaderCard
        title="Hibah Masuk"
        subtitle="Pencatatan barang masuk melalui hibah dari instansi atau lembaga lain"
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Cari no. pengadaan, asal hibah, barang..."
        rightAction={
          <AdminButton onClick={openAddModal} style={{ background: "#fff", color: "#2563eb", whiteSpace: "nowrap" }}>
            + Catat Hibah Masuk
          </AdminButton>
        }
      />

      <div style={{ display: "flex", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
        <AdminStatCard value={summary.total}                    label="Total Hibah Masuk"  color="#2563eb" bg="#eff6ff" />
        <AdminStatCard value={summary.totalUnit}                label="Total Unit Masuk"   color="#16a34a" bg="#f0fdf4" />
        <AdminStatCard value={formatRupiah(summary.totalNilai)} label="Total Nilai Hibah"  color="#7c3aed" bg="#faf5ff" />
      </div>

      {/* ── Tabel utama ── */}
      <AdminCard>
        <div style={{ overflowX: "auto" }}>
        <AdminTable headers={[
          "No. Pengadaan", "Tanggal", "Asal Hibah", "Nama Barang",
          "Kategori", "Jumlah", "Kondisi", "Harga Total", "Pemeriksa Hibah", "Aksi",
        ]}>
          {filtered.map(d =>
            d.items.map((it, idx) => {
              const kc = kategoriColor[it.kategori] || { bg: "#f8fafc", color: "#475569" };
              const hargaTotal = parseRupiah(it.hargaUnit) * Number(it.jumlah);
              return (
                <tr key={`${d.id}-${idx}`} style={{ borderBottom: "1px solid #f8fafc" }}>
                  {idx === 0 && (
                    <td style={{ ...tdTop, fontFamily: "monospace", fontSize: 14, color: "#64748b" }} rowSpan={d.items.length}>
                      {d.noPengadaan}
                    </td>
                  )}
                  {idx === 0 && (
                    <td style={{ ...tdTop, color: "#64748b", whiteSpace: "nowrap", fontSize: 14, }} rowSpan={d.items.length}>
                      {d.tanggal}
                    </td>
                  )}
                  {idx === 0 && (
                    <td style={{ ...tdTop, color: "#374151", fontWeight: 600, fontSize: 14, }} rowSpan={d.items.length}>
                      {d.asalHibah}
                    </td>
                  )}
                  <td style={{ ...tdBase, fontWeight: 600, color: "#1e293b" }}>{it.nama}</td>
                  <td style={tdBase}>
                    <span style={{ background: kc.bg, color: kc.color, padding: "3px 10px", borderRadius: 20, fontSize: 14, fontWeight: 600 }}>
                      {it.kategori}
                    </span>
                  </td>
                  <td style={{ ...tdBase, color: "#374151" }}>{it.jumlah} unit</td>
                  <td style={tdBase}>
                    <span style={{
                      background: it.kondisi === "Baik" ? "#dcfce7" : it.kondisi === "Rusak Ringan" ? "#fef9c3" : "#fee2e2",
                      color:      it.kondisi === "Baik" ? "#16a34a" : it.kondisi === "Rusak Ringan" ? "#a16207" : "#dc2626",
                      padding: "3px 10px", borderRadius: 20, fontSize: 16, fontWeight: 600,
                    }}>{it.kondisi}</span>
                  </td>
                  <td style={{ ...tdBase, fontWeight: 700, color: "#1e293b" }}>{formatRupiah(hargaTotal)}</td>
                  {idx === 0 && (
                    <td style={{ ...tdTop, color: "#374151" }} rowSpan={d.items.length}>{d.pemeriksa}</td>
                  )}
                  {idx === 0 && (
                    <td style={{ ...tdTop }} rowSpan={d.items.length}>
                      <div style={{ display: "flex", gap: 6, whiteSpace: "nowrap" }}>
                        <AdminButton variant="info" onClick={() => setDetailItem(d)}>Detail</AdminButton>
                        <AdminButton variant="primary" onClick={() => openEditModal(d)}>Edit</AdminButton>
                        <AdminButton variant="danger" onClick={() => handleDelete(d)}>Hapus</AdminButton>
                      </div>
                    </td>
                  )}
                </tr>
              );
            })
          )}
        </AdminTable>
        </div>
      </AdminCard>

      {/* ── Modal Detail ── */}
      {detailItem && (
        <Modal title={`Detail Hibah Masuk — ${detailItem.noPengadaan}`} onClose={() => setDetailItem(null)} wide>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
            <div style={{ background: "#f8fafc", borderRadius: 8, padding: 14, fontSize: 13 }}>
              <div style={{ fontWeight: 700, color: "#1e293b", marginBottom: 8 }}>Info Hibah</div>
              {[
                ["No. Pengadaan", detailItem.noPengadaan],
                ["Tanggal",       detailItem.tanggal],
                ["Asal Hibah",    detailItem.asalHibah],
                ["Pemeriksa Hibah", detailItem.pemeriksa],
              ].map(([k, v]) => (
                <div key={k} style={{ display: "flex", gap: 8, marginBottom: 4 }}>
                  <span style={{ fontWeight: 600, width: 120, flexShrink: 0 }}>{k}</span>
                  <span style={{ flexShrink: 0 }}>:</span>
                  <span>{v}</span>
                </div>
              ))}
            </div>
            <div style={{ background: "#eff6ff", borderRadius: 8, padding: 14, fontSize: 13 }}>
              <div style={{ fontWeight: 700, color: "#1e293b", marginBottom: 8 }}>Ringkasan</div>
              <div style={{ display: "flex", gap: 8, marginBottom: 4 }}>
                <span style={{ fontWeight: 600, width: 120, flexShrink: 0 }}>Total Barang</span>
                <span>: {detailItem.items.length} jenis</span>
              </div>
              <div style={{ display: "flex", gap: 8, marginBottom: 4 }}>
                <span style={{ fontWeight: 600, width: 120, flexShrink: 0 }}>Total Unit</span>
                <span>: {hitungUnit(detailItem.items)} unit</span>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ fontWeight: 600, width: 120, flexShrink: 0 }}>Total Nilai</span>
                <span style={{ fontWeight: 700, color: "#2563eb" }}>: {formatRupiah(hitungTotal(detailItem.items))}</span>
              </div>
            </div>
          </div>

          <div style={{ fontWeight: 700, color: "#1e293b", marginBottom: 8, fontSize: 13 }}>Daftar Barang Hibah</div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, border: "1px solid #e2e8f0" }}>
              <thead>
                <tr style={{ background: "#f8fafc" }}>
                  {["No", "Nama Barang", "Kategori", "Jumlah", "Kondisi", "Harga/Unit", "Harga Total"].map(h => (
                    <th key={h} style={{ padding: "8px 12px", fontWeight: 700, color: "#374151", border: "1px solid #e2e8f0", textAlign: "left" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {detailItem.items.map((it, i) => {
                  const hargaTotal = parseRupiah(it.hargaUnit) * Number(it.jumlah);
                  return (
                    <tr key={i}>
                      <td style={{ padding: "8px 12px", border: "1px solid #e2e8f0", color: "#64748b" }}>{i + 1}</td>
                      <td style={{ padding: "8px 12px", border: "1px solid #e2e8f0", fontWeight: 600, color: "#1e293b" }}>{it.nama}</td>
                      <td style={{ padding: "8px 12px", border: "1px solid #e2e8f0" }}>{it.kategori}</td>
                      <td style={{ padding: "8px 12px", border: "1px solid #e2e8f0" }}>{it.jumlah} unit</td>
                      <td style={{ padding: "8px 12px", border: "1px solid #e2e8f0", fontWeight: 600, color: it.kondisi === "Baik" ? "#16a34a" : "#a16207" }}>{it.kondisi}</td>
                      <td style={{ padding: "8px 12px", border: "1px solid #e2e8f0" }}>{it.hargaUnit || "-"}</td>
                      <td style={{ padding: "8px 12px", border: "1px solid #e2e8f0", fontWeight: 700, color: "#1e293b" }}>{formatRupiah(hargaTotal)}</td>
                    </tr>
                  );
                })}
                <tr style={{ background: "#f8fafc" }}>
                  <td colSpan={6} style={{ padding: "8px 12px", border: "1px solid #e2e8f0", fontWeight: 700, textAlign: "right", color: "#1e293b" }}>Total Nilai Hibah</td>
                  <td style={{ padding: "8px 12px", border: "1px solid #e2e8f0", fontWeight: 800, color: "#2563eb" }}>{formatRupiah(hitungTotal(detailItem.items))}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 16 }}>
            <AdminButton variant="outline" onClick={() => setDetailItem(null)}>Tutup</AdminButton>
          </div>
        </Modal>
      )}

      {/* ── Modal Catat Hibah Masuk ── */}
      {showModal && (
        <Modal title={editId ? "Edit Hibah Masuk" : "Catat Hibah Masuk"} onClose={() => { setShowModal(false); resetForm(); }} wide>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            <FormGroup label="Nomor Pengadaan">
              <input
                style={inputStyle}
                value={form.noPengadaan}
                onChange={e => setForm(prev => ({ ...prev, noPengadaan: e.target.value }))}
                placeholder="HBM-2026-XXX"
              />
            </FormGroup>
            <FormGroup label="Tanggal">
              <input
                style={inputStyle}
                type="date"
                value={form.tanggal}
                onChange={e => setForm(prev => ({ ...prev, tanggal: e.target.value }))}
              />
            </FormGroup>
          </div>

          <FormGroup label="Asal Hibah">
            <input
              style={inputStyle}
              value={form.asalHibah}
              onChange={e => setForm(prev => ({ ...prev, asalHibah: e.target.value }))}
              placeholder="Contoh: Kementerian Keuangan RI"
            />
          </FormGroup>

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

          <div style={{ fontWeight: 700, color: "#1e293b", fontSize: 13, margin: "12px 0 8px" }}>Daftar Barang</div>
          <div style={{ overflowX: "auto", marginBottom: 10 }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, border: "1px solid #cbd5e1" }}>
              <thead>
                <tr style={{ background: "#f8fafc" }}>
                  {["No", "Nama Barang", "Kategori", "Jumlah", "Kondisi", "Harga/Unit", ""].map(h => (
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
                    <td style={{ padding: "4px 6px", border: "1px solid #cbd5e1", minWidth: 120 }}>
                      <input
                        style={{ ...inputStyle, border: "none", padding: "5px 6px", background: "transparent" }}
                        value={it.hargaUnit}
                        onChange={e => updateItem(idx, "hargaUnit", e.target.value)}
                        placeholder="Rp 0"
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

export default HibahMasukAdmin;