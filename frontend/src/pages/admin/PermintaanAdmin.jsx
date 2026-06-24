import { useState } from "react";
import { dummyPermintaan, stokHabisPakai } from "../user/bmn/dummyData";
import { Modal, StatusBadge, inputStyle, FormGroup, IconEye, downloadAsPDF, AdminHeaderCard, AdminCard, AdminStatCard, AdminTable, AdminButton } from "../user/bmn/components";

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
      <AdminHeaderCard
        title="Permintaan Barang"
        subtitle="Kelola permintaan pengadaan barang habis pakai dari pegawai"
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Cari nama atau NIP..."
      />

      <AdminCard style={{ marginBottom: 14 }}>
        <div style={{ fontWeight: 700, color: "#1e293b", fontSize: 12, marginBottom: 10 }}>Stok Barang Habis Pakai</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(110px, 1fr))", gap: 8 }}>
          {stokHabisPakai.map((s, i) => (
            <div key={i} style={{ background: s.stok === 0 ? "#fef2f2" : s.stok <= 2 ? "#fffbeb" : "#f8fafc", borderRadius: 8, padding: "8px 10px", textAlign: "center" }}>
              <div style={{ fontSize: 10, color: "#64748b", marginBottom: 3, lineHeight: 1.25 }}>{s.nama}</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: s.stok === 0 ? "#dc2626" : s.stok <= 2 ? "#d97706" : "#2563eb" }}>{s.stok}</div>
              <div style={{ fontSize: 11, color: "#94a3b8" }}>{s.satuan}</div>
            </div>
          ))}
        </div>
      </AdminCard>

      <div style={{ display: "flex", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
        <AdminStatCard value={summary.pending} label="Menunggu Proses" color="#d97706" bg="#fffbeb" />
        <AdminStatCard value={summary.disetujui} label="Disetujui" color="#16a34a" bg="#f0fdf4" />
        <AdminStatCard value={summary.ditolak} label="Ditolak" color="#dc2626" bg="#fef2f2" />
      </div>

      <AdminCard>
        <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
          {["Semua", "Pending", "Disetujui", "Ditolak"].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              style={{ padding: "7px 14px", border: "1.5px solid", borderRadius: 20, cursor: "pointer", fontSize: 12, fontWeight: 600,
                borderColor: filter === f ? "#2563eb" : "#e2e8f0",
                background: filter === f ? "#2563eb" : "#fff",
                color: filter === f ? "#fff" : "#64748b" }}>
              {f}
            </button>
          ))}
        </div>

        <AdminTable headers={["No. Surat", "Pemohon", "Unit Kerja", "Jumlah Item", "Tanggal", "Status", "Aksi"]}>
          {filtered.map(d => (
            <tr key={d.id} style={{ borderBottom: "1px solid #f8fafc" }}>
              <td style={{ padding: "12px 16px", fontFamily: "monospace", fontSize: 12, color: "#64748b" }}>{d.nomorSurat}</td>
              <td style={{ padding: "12px 16px" }}>
                <div style={{ fontWeight: 600, color: "#1e293b" }}>{d.pemohon.nama}</div>
                <div style={{ fontSize: 11, color: "#94a3b8" }}>{d.pemohon.nip}</div>
              </td>
              <td style={{ padding: "12px 16px", color: "#64748b" }}>{d.pemohon.unitKerja}</td>
              <td style={{ padding: "12px 16px", color: "#1e293b", textAlign: "center" }}>{d.items.length} item</td>
              <td style={{ padding: "12px 16px", color: "#64748b" }}>{d.tanggal}</td>
              <td style={{ padding: "12px 16px" }}><StatusBadge status={d.status} /></td>
              <td style={{ padding: "12px 16px" }}>
                <div style={{ display: "flex", gap: 6 }}>
                  <AdminButton variant="outline" onClick={() => setDetailItem(d)}><IconEye /> Detail</AdminButton>
                  {d.status === "Pending" && (
                    <>
                      <AdminButton variant="success" onClick={() => handleSetujui(d.id)}>Setujui</AdminButton>
                      <AdminButton variant="danger" onClick={() => setShowTolakModal(d)}>Tolak</AdminButton>
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </AdminTable>
      </AdminCard>

      {detailItem && (
        <Modal title={`Detail Permintaan — ${detailItem.nomorSurat}`} onClose={() => setDetailItem(null)} wide>
          <div id="permintaan-detail-print">
            <div style={{ background: "#f8fafc", borderRadius: 8, padding: 14, marginBottom: 16, fontSize: 13 }}>
              <div style={{ fontWeight: 700, color: "#1e293b", marginBottom: 6 }}>Pemohon</div>
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
            <AdminButton variant="outline" onClick={() => setDetailItem(null)}>Tutup</AdminButton>
            <AdminButton variant="outline" onClick={() => window.print()}>🖨 Print</AdminButton>
            <AdminButton variant="success" onClick={() => downloadAsPDF("permintaan-detail-print", `Permintaan-${detailItem.nomorSurat}`)}>💾 Save PDF</AdminButton>
            {detailItem.status === "Pending" && (
              <>
                <AdminButton variant="success" onClick={() => { handleSetujui(detailItem.id); setDetailItem(null); }}>Setujui</AdminButton>
                <AdminButton variant="danger" onClick={() => { setShowTolakModal(detailItem); setDetailItem(null); }}>Tolak</AdminButton>
              </>
            )}
          </div>
        </Modal>
      )}

      {showTolakModal && (
        <Modal title="Tolak Permintaan Barang" onClose={() => setShowTolakModal(null)}>
          <div style={{ background: "#fef2f2", borderRadius: 8, padding: "10px 14px", marginBottom: 16, fontSize: 13, color: "#dc2626" }}>
            Permintaan dari <strong>{showTolakModal.pemohon.nama}</strong> akan ditolak.
          </div>
          <FormGroup label="Alasan Penolakan">
            <textarea style={{ ...inputStyle, minHeight: 80, resize: "vertical" }} value={alasanTolak} onChange={e => setAlasanTolak(e.target.value)} placeholder="Contoh: Stok tidak tersedia, anggaran tidak mencukupi..." />
          </FormGroup>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <AdminButton variant="outline" onClick={() => setShowTolakModal(null)}>Batal</AdminButton>
            <AdminButton variant="danger" onClick={handleTolak}>Konfirmasi Tolak</AdminButton>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default PermintaanAdmin;