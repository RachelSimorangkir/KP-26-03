import { useState } from "react";
import { dummyPermintaan, stokHabisPakai } from "../user/bmn/dummyData";
import { Modal, StatusBadge, StokCard, inputStyle, FormGroup, IconSearch, IconEye, downloadAsPDF } from "../user/bmn/components";

const PermintaanAdmin = () => {
  const [data, setData] = useState(dummyPermintaan);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Semua");
  const [detailItem, setDetailItem] = useState(null);
  const [showTolakModal, setShowTolakModal] = useState(null);
  const [alasanTolak, setAlasanTolak] = useState("");

  const filtered = data.filter(d => {
    const matchSearch = d.pemohon.nama.toLowerCase().includes(search.toLowerCase()) || d.pemohon.nip.includes(search);
    const matchFilter = filter === "Semua" || d.status === filter;
    return matchSearch && matchFilter;
  });

  const handleSetujui = (id) => {
    setData(data.map(d => d.id === id ? { ...d, status: "Disetujui" } : d));
  };

  const handleTolak = () => {
    setData(data.map(d => d.id === showTolakModal.id ? { ...d, status: "Ditolak", alasanTolak } : d));
    setShowTolakModal(null);
    setAlasanTolak("");
  };

  const summary = {
    pending: data.filter(d => d.status === "Pending").length,
    disetujui: data.filter(d => d.status === "Disetujui").length,
    ditolak: data.filter(d => d.status === "Ditolak").length,
  };

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: "#1e3a5f" }}>Permintaan Barang</h2>
        <p style={{ margin: "4px 0 0", color: "#64748b", fontSize: 14 }}>Kelola permintaan pengadaan barang habis pakai dari pegawai</p>
      </div>

      {/* Stok */}
      <StokCard items={stokHabisPakai} title="Stok Barang Habis Pakai" />

      {/* Summary */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginBottom: 20 }}>
        {[
          { label: "Menunggu Proses", value: summary.pending, bg: "#fef9c3", color: "#a16207" },
          { label: "Disetujui", value: summary.disetujui, bg: "#dcfce7", color: "#16a34a" },
          { label: "Ditolak", value: summary.ditolak, bg: "#fee2e2", color: "#dc2626" },
        ].map(s => (
          <div key={s.label} style={{ background: s.bg, borderRadius: 10, padding: "16px 20px" }}>
            <div style={{ fontSize: 26, fontWeight: 800, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 13, color: s.color, fontWeight: 600 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div style={{ background: "#fff", borderRadius: 10, border: "1px solid #e2e8f0", padding: 20 }}>
        <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
          <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
            <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }}><IconSearch /></span>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Cari nama atau NIP..." style={{ ...inputStyle, paddingLeft: 34 }} />
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            {["Semua", "Pending", "Disetujui", "Ditolak"].map(f => (
              <button key={f} onClick={() => setFilter(f)}
                style={{ padding: "8px 14px", border: "1.5px solid", borderRadius: 8, cursor: "pointer", fontSize: 12, fontWeight: 600,
                  borderColor: filter === f ? "#1d4ed8" : "#e2e8f0",
                  background: filter === f ? "#eff6ff" : "#fff",
                  color: filter === f ? "#1d4ed8" : "#64748b" }}>
                {f}
              </button>
            ))}
          </div>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ background: "#f8fafc" }}>
                {["No. Surat", "Pemohon", "Unit Kerja", "Jumlah Item", "Tanggal", "Status", "Aksi"].map(h => (
                  <th key={h} style={{ padding: "10px 12px", textAlign: "left", fontWeight: 700, color: "#374151", borderBottom: "1.5px solid #e2e8f0", whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(d => (
                <tr key={d.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                  <td style={{ padding: "10px 12px", fontFamily: "monospace", fontSize: 12, color: "#64748b" }}>{d.nomorSurat}</td>
                  <td style={{ padding: "10px 12px" }}>
                    <div style={{ fontWeight: 600, color: "#1e293b" }}>{d.pemohon.nama}</div>
                    <div style={{ fontSize: 11, color: "#94a3b8" }}>{d.pemohon.nip}</div>
                  </td>
                  <td style={{ padding: "10px 12px", color: "#64748b" }}>{d.pemohon.unitKerja}</td>
                  <td style={{ padding: "10px 12px", color: "#1e293b", textAlign: "center" }}>{d.items.length} item</td>
                  <td style={{ padding: "10px 12px", color: "#64748b" }}>{d.tanggal}</td>
                  <td style={{ padding: "10px 12px" }}><StatusBadge status={d.status} /></td>
                  <td style={{ padding: "10px 12px" }}>
                    <div style={{ display: "flex", gap: 6 }}>
                      <button onClick={() => setDetailItem(d)} style={{ display: "flex", alignItems: "center", gap: 4, background: "#f1f5f9", border: "none", borderRadius: 6, padding: "5px 10px", fontSize: 12, cursor: "pointer", color: "#475569" }}>
                        <IconEye /> Detail
                      </button>
                      {d.status === "Pending" && (
                        <>
                          <button onClick={() => handleSetujui(d.id)} style={{ background: "#16a34a", color: "#fff", border: "none", borderRadius: 6, padding: "5px 10px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Setujui</button>
                          <button onClick={() => setShowTolakModal(d)} style={{ background: "#dc2626", color: "#fff", border: "none", borderRadius: 6, padding: "5px 10px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Tolak</button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Detail */}
      {detailItem && (
        <Modal title={`Detail Permintaan — ${detailItem.nomorSurat}`} onClose={() => setDetailItem(null)} wide>
          <div id="permintaan-detail-print">
          <div style={{ background: "#f8fafc", borderRadius: 8, padding: 14, marginBottom: 16, fontSize: 13 }}>
            <div style={{ fontWeight: 700, color: "#1e3a5f", marginBottom: 6 }}>Pemohon</div>
            <div><strong>{detailItem.pemohon.nama}</strong> · NIP {detailItem.pemohon.nip} · {detailItem.pemohon.unitKerja}</div>
            <div style={{ color: "#64748b", marginTop: 4 }}>Tanggal: {detailItem.tanggal} · Status: <StatusBadge status={detailItem.status} /></div>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, marginBottom: 16 }}>
            <thead>
              <tr style={{ background: "#f8fafc" }}>
                {["No.", "Nama Barang", "Jumlah Minta", "Jumlah Akhir", "Keterangan"].map(h => (
                  <th key={h} style={{ padding: "8px 12px", fontWeight: 700, color: "#374151", border: "1px solid #e2e8f0", textAlign: "left" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {detailItem.items.map((item, i) => (
                <tr key={i}>
                  <td style={{ padding: "8px 12px", border: "1px solid #e2e8f0", textAlign: "center", color: "#64748b" }}>{item.no}</td>
                  <td style={{ padding: "8px 12px", border: "1px solid #e2e8f0", fontWeight: 600, color: "#1e293b" }}>{item.nama}</td>
                  <td style={{ padding: "8px 12px", border: "1px solid #e2e8f0", textAlign: "center" }}>{item.jumlahMinta}</td>
                  <td style={{ padding: "8px 12px", border: "1px solid #e2e8f0", textAlign: "center", fontWeight: 700, color: "#16a34a" }}>{item.jumlahAkhir}</td>
                  <td style={{ padding: "8px 12px", border: "1px solid #e2e8f0", color: "#64748b" }}>{item.keterangan || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", flexWrap: "wrap" }}>
            <button onClick={() => setDetailItem(null)} style={{ padding: "10px 18px", border: "1.5px solid #e2e8f0", borderRadius: 8, background: "#fff", cursor: "pointer", fontWeight: 600, color: "#64748b", fontSize: 13 }}>Tutup</button>
            <button onClick={() => window.print()} style={{ padding: "10px 18px", border: "1.5px solid #1d4ed8", borderRadius: 8, background: "#fff", cursor: "pointer", fontWeight: 600, color: "#1d4ed8", fontSize: 13 }}>🖨 Print</button>
            <button onClick={() => downloadAsPDF("permintaan-detail-print", `Permintaan-${detailItem.nomorSurat}`)} style={{ padding: "10px 18px", border: "1.5px solid #16a34a", borderRadius: 8, background: "#fff", cursor: "pointer", fontWeight: 600, color: "#16a34a", fontSize: 13 }}>💾 Save PDF</button>
            {detailItem.status === "Pending" && (
              <>
                <button onClick={() => { handleSetujui(detailItem.id); setDetailItem(null); }} style={{ padding: "10px 18px", background: "#16a34a", color: "#fff", border: "none", borderRadius: 8, fontWeight: 700, cursor: "pointer", fontSize: 13 }}>Setujui</button>
                <button onClick={() => { setShowTolakModal(detailItem); setDetailItem(null); }} style={{ padding: "10px 18px", background: "#dc2626", color: "#fff", border: "none", borderRadius: 8, fontWeight: 700, cursor: "pointer", fontSize: 13 }}>Tolak</button>
              </>
            )}
          </div>
        </Modal>
      )}

      {/* Modal Tolak */}
      {showTolakModal && (
        <Modal title="Tolak Permintaan Barang" onClose={() => setShowTolakModal(null)}>
          <div style={{ background: "#fee2e2", borderRadius: 8, padding: "10px 14px", marginBottom: 16, fontSize: 13, color: "#dc2626" }}>
            Permintaan dari <strong>{showTolakModal.pemohon.nama}</strong> akan ditolak.
          </div>
          <FormGroup label="Alasan Penolakan">
            <textarea style={{ ...inputStyle, minHeight: 80, resize: "vertical" }} value={alasanTolak} onChange={e => setAlasanTolak(e.target.value)} placeholder="Contoh: Stok tidak tersedia, anggaran tidak mencukupi..." />
          </FormGroup>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <button onClick={() => setShowTolakModal(null)} style={{ padding: "10px 20px", border: "1.5px solid #e2e8f0", borderRadius: 8, background: "#fff", cursor: "pointer", fontWeight: 600, color: "#64748b" }}>Batal</button>
            <button onClick={handleTolak} style={{ padding: "10px 20px", background: "#dc2626", color: "#fff", border: "none", borderRadius: 8, fontWeight: 700, cursor: "pointer" }}>Konfirmasi Tolak</button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default PermintaanAdmin;