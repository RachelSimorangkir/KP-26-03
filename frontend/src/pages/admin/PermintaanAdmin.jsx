import { useState } from "react";
import { dummyPermintaan, stokHabisPakai } from "../user/bmn/dummyData";
import { Modal, StatusBadge, inputStyle, FormGroup, IconEye, downloadAsPDF, AdminHeaderCard, AdminCard, AdminStatCard, AdminTable, AdminButton } from "../user/bmn/components";

// ─── PREVIEW SURAT (Admin view) ───────────────────────────────────────────────
const PreviewSuratAdmin = ({ item, onClose }) => {
  const today = new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
  const petugasGudang = item.petugasGudang?.nama
    ? item.petugasGudang
    : { nama: "Dewi Kusuma", nip: "199001012015032003" };

  return (
    <Modal title="Preview Formulir Permintaan Barang" onClose={onClose} wide>
      <div id={`surat-permintaan-admin-${item.id}`} style={{ border: "1.5px solid #e2e8f0", borderRadius: 8, padding: 24, background: "#fff", fontSize: 13 }}>
        {/* Kop */}
        <div style={{ textAlign: "center", borderBottom: "2px solid #1e293b", paddingBottom: 10, marginBottom: 16 }}>
          <div style={{ fontWeight: 800, fontSize: 13 }}>KEMENTERIAN AGAMA REPUBLIK INDONESIA</div>
          <div style={{ fontSize: 11, color: "#64748b" }}>DIREKTORAT JENDERAL BIMBINGAN MASYARAKAT KRISTEN</div>
          <div style={{ fontSize: 11, color: "#64748b" }}>Jalan M.H Thamrin Nomor 6 Jakarta 10340</div>
          <div style={{ fontWeight: 800, fontSize: 14, marginTop: 8, letterSpacing: 1 }}>PEMESANAN/PERMINTAAN BARANG</div>
          <div style={{ fontSize: 12 }}>Nomor : {item.nomorSurat}</div>
        </div>

        <div style={{ marginBottom: 14, fontSize: 12 }}>
          <span style={{ fontWeight: 600 }}>Bagian / Subdit : </span>
          <span style={{ borderBottom: "1px solid #94a3b8", paddingBottom: 2, minWidth: 180, display: "inline-block" }}>{item.pemohon.unitKerja}</span>
        </div>

        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, border: "1px solid #cbd5e1", marginBottom: 16 }}>
          <thead>
            <tr style={{ background: "#f8fafc" }}>
              {["No", "Nama/Jenis Barang", "Stok Awal", "Jumlah Permintaan", "Stok Akhir", "Keterangan"].map((h, i) => (
                <th key={i} style={{ padding: "8px 10px", fontWeight: 700, color: "#374151", border: "1px solid #cbd5e1", textAlign: "left", whiteSpace: "nowrap" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {item.items.map((it, i) => (
              <tr key={i}>
                <td style={{ padding: "6px 8px", border: "1px solid #cbd5e1", textAlign: "left" }}>{i + 1}</td>
                <td style={{ padding: "6px 8px", border: "1px solid #cbd5e1", textAlign: "left" }}>{it.nama}</td>
                <td style={{ padding: "6px 8px", border: "1px solid #cbd5e1", textAlign: "left" }}>{it.jumlahMinta + it.jumlahAkhir}</td>
                <td style={{ padding: "6px 8px", border: "1px solid #cbd5e1", textAlign: "left" }}>{it.jumlahMinta}</td>
                <td style={{ padding: "6px 8px", border: "1px solid #cbd5e1", textAlign: "left", fontWeight: 700, color: it.jumlahAkhir < 0 ? "#dc2626" : "#16a34a" }}>{it.jumlahAkhir}</td>
                <td style={{ padding: "6px 8px", border: "1px solid #cbd5e1", textAlign: "left" }}>{it.keterangan || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* TTD */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, fontSize: 12 }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontWeight: 600, marginBottom: 4 }}>Petugas Gudang</div>
            <div style={{ height: 40 }} />
            <div style={{ borderTop: "1.5px solid #1e293b", paddingTop: 6 }}>
              <div style={{ fontWeight: 700 }}>{petugasGudang.nama}</div>
              <div style={{ color: "#64748b" }}>NIP. {petugasGudang.nip}</div>
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontWeight: 600, marginBottom: 2 }}>Mengetahui :</div>
            <div style={{ fontSize: 11, color: "#64748b", marginBottom: 4 }}>Kasubbag Perlengkapan dan BMN</div>
            <div style={{ height: 40 }} />
            <div style={{ borderTop: "1.5px solid #1e293b", paddingTop: 6 }}>
              <div style={{ color: "#94a3b8", fontSize: 11 }}>(________________________)</div>
              <div style={{ color: "#64748b" }}>NIP. .............................</div>
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontWeight: 600, marginBottom: 2 }}>Jakarta, {today}</div>
            <div style={{ fontSize: 11, color: "#64748b", marginBottom: 4 }}>Yang Menerima,</div>
            <div style={{ height: 40 }} />
            <div style={{ borderTop: "1.5px solid #1e293b", paddingTop: 6 }}>
              <div style={{ fontWeight: 700 }}>{item.penerima?.nama || item.pemohon.nama}</div>
              <div style={{ color: "#64748b" }}>NIP. {item.penerima?.nip || item.pemohon.nip}</div>
            </div>
          </div>
        </div>

        <div style={{ fontSize: 10, color: "#94a3b8", fontStyle: "italic", marginTop: 10 }}>*) Coret yang tidak perlu</div>
      </div>

      <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 16, flexWrap: "wrap" }}>
        <AdminButton variant="outline" onClick={onClose}>Tutup</AdminButton>
        <AdminButton variant="outline" onClick={() => window.print()}>🖨 Print</AdminButton>
        <AdminButton variant="success" onClick={() => downloadAsPDF(`surat-permintaan-admin-${item.id}`, `Permintaan-${item.nomorSurat}`)}>💾 Save PDF</AdminButton>
      </div>
    </Modal>
  );
};

// ─── MODAL DETAIL + EDIT PER ITEM ────────────────────────────────────────────
const DetailModal = ({ item, onClose, onSetujui, onUpdate, onShowSurat }) => {
  const [editItems, setEditItems] = useState(item.items.map(it => ({ ...it })));

  const updateJumlah = (idx, val) => {
    const stokRef = stokHabisPakai.find(s => s.nama === editItems[idx].nama);
    const stokAwal = stokRef ? stokRef.stok : (editItems[idx].jumlahMinta + editItems[idx].jumlahAkhir);
    const jumlah = Math.max(0, parseInt(val) || 0);
    setEditItems(editItems.map((it, i) =>
      i === idx ? { ...it, jumlahMinta: jumlah, jumlahAkhir: stokAwal - jumlah } : it
    ));
  };

  const updateKeterangan = (idx, val) => {
    setEditItems(editItems.map((it, i) => i === idx ? { ...it, keterangan: val } : it));
  };

  const removeItem = (idx) => {
    setEditItems(editItems.filter((_, i) => i !== idx));
  };

  const handleSetujui = () => {
    onUpdate({ ...item, items: editItems, status: "Disetujui" });
    onClose();
  };

  const handleTolak = () => {
    // Tolak seluruh permintaan yang tersisa
    onUpdate({ ...item, items: editItems, status: "Ditolak" });
    onClose();
  };

  const activeItems = editItems.length;

  return (
    <Modal title={`Detail Permintaan — ${item.nomorSurat}`} onClose={onClose} wide>
      <div id={`permintaan-detail-print-${item.id}`}>
        {/* Info pemohon */}
        <div style={{ background: "#f8fafc", borderRadius: 8, padding: 14, marginBottom: 14, fontSize: 13 }}>
          <div style={{ fontWeight: 700, color: "#1e293b", marginBottom: 8, textAlign: "center" }}>Data Pemohon</div>
          {[
            ["Nama", item.pemohon.nama],
            ["NIP", item.pemohon.nip],
            ["Unit Kerja", item.pemohon.unitKerja],
            ["Tanggal", item.tanggal],
            ["Status", null],
          ].map(([k, v]) => (
            <div key={k} style={{ display: "flex", gap: 8, fontSize: 13, marginBottom: 4, textAlign: "left" }}>
              <span style={{ fontWeight: 600, width: 90, flexShrink: 0 }}>{k}</span>
              <span style={{ flexShrink: 0 }}>:</span>
              <span style={{ flex: 1 }}>{k === "Status" ? <StatusBadge status={item.status} /> : v}</span>
            </div>
          ))}
        </div>

        {/* Tabel item */}
        <div style={{ fontWeight: 700, color: "#1e293b", marginBottom: 8, textAlign: "center", fontSize: 13 }}>Detail Barang</div>
        {activeItems === 0 ? (
          <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 8, padding: "12px 16px", color: "#dc2626", fontSize: 13, marginBottom: 12, textAlign: "left" }}>
            ⚠️ Semua item telah dihapus. Klik <strong>Tolak</strong> untuk menolak seluruh permintaan.
          </div>
        ) : (
          <div style={{ overflowX: "auto", marginBottom: 14 }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, border: "1px solid #cbd5e1" }}>
              <thead>
                <tr style={{ background: "#f8fafc" }}>
                  {["No", "Nama Barang", "Stok Tersedia", "Jumlah Diminta", "Stok Akhir", "Keterangan", "Hapus"].map(h => (
                    <th key={h} style={{ padding: "8px 10px", fontWeight: 700, color: "#374151", border: "1px solid #cbd5e1", textAlign: "left", whiteSpace: "nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {editItems.map((it, idx) => {
                  const stokRef = stokHabisPakai.find(s => s.nama === it.nama);
                  const stokAwal = stokRef ? stokRef.stok : (it.jumlahMinta + it.jumlahAkhir);
                  const kurang = it.jumlahMinta > stokAwal;
                  return (
                    <tr key={idx} style={{ background: kurang ? "#fff7ed" : "#fff" }}>
                      <td style={{ padding: "6px 8px", border: "1px solid #cbd5e1", textAlign: "left", color: "#64748b" }}>{idx + 1}</td>
                      <td style={{ padding: "6px 8px", border: "1px solid #cbd5e1", textAlign: "left", fontWeight: 600, color: "#1e293b" }}>{it.nama}</td>
                      <td style={{ padding: "6px 8px", border: "1px solid #cbd5e1", textAlign: "left" }}>
                        <span style={{ fontWeight: 700, color: stokAwal === 0 ? "#dc2626" : stokAwal <= 2 ? "#d97706" : "#16a34a" }}>{stokAwal}</span>
                      </td>
                      <td style={{ padding: "4px 6px", border: "1px solid #cbd5e1", textAlign: "left", minWidth: 90 }}>
                        <input
                          type="number" min="0" max={stokAwal}
                          value={it.jumlahMinta}
                          onChange={e => updateJumlah(idx, e.target.value)}
                          style={{ ...inputStyle, border: "1px solid #e2e8f0", padding: "4px 8px", width: 70, textAlign: "left" }}
                        />
                        {kurang && (
                          <div style={{ fontSize: 10, color: "#d97706", marginTop: 2 }}>Melebihi stok!</div>
                        )}
                      </td>
                      <td style={{ padding: "6px 8px", border: "1px solid #cbd5e1", textAlign: "left", fontWeight: 700, color: it.jumlahAkhir < 0 ? "#dc2626" : "#16a34a" }}>
                        {stokAwal - it.jumlahMinta}
                      </td>
                      <td style={{ padding: "4px 6px", border: "1px solid #cbd5e1", minWidth: 160 }}>
                        <input
                          value={it.keterangan || ""}
                          placeholder="Tambah keterangan..."
                          onChange={e => updateKeterangan(idx, e.target.value)}
                          style={{ ...inputStyle, border: "1px solid #e2e8f0", padding: "4px 8px" }}
                        />
                      </td>
                      <td style={{ padding: "6px 8px", border: "1px solid #cbd5e1", textAlign: "center" }}>
                        <button
                          onClick={() => removeItem(idx)}
                          title="Hapus item ini"
                          style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 4, cursor: "pointer", color: "#dc2626", padding: "3px 8px", fontWeight: 700, fontSize: 12 }}>
                          ✕
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 16, flexWrap: "wrap" }}>
        <AdminButton variant="outline" onClick={onClose}>Tutup</AdminButton>
        <AdminButton variant="outline" onClick={() => window.print()}>🖨 Print</AdminButton>
        <AdminButton variant="success" onClick={() => downloadAsPDF(`permintaan-detail-print-${item.id}`, `Permintaan-${item.nomorSurat}`)}>💾 Save PDF</AdminButton>
        <AdminButton onClick={() => onShowSurat({ ...item, items: editItems })}>📄 Preview Surat</AdminButton>
        {item.status === "Pending" && (
          <>
            <AdminButton variant="success" onClick={handleSetujui} disabled={activeItems === 0}>Setujui</AdminButton>
            <AdminButton variant="danger" onClick={handleTolak}>Tolak</AdminButton>
          </>
        )}
      </div>
    </Modal>
  );
};

// ─── MAIN ─────────────────────────────────────────────────────────────────────
const PermintaanAdmin = () => {
  const [data, setData] = useState(dummyPermintaan);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Semua");
  const [detailItem, setDetailItem] = useState(null);
  const [showSurat, setShowSurat] = useState(null);

  const filtered = data.filter(d => {
    const matchSearch =
      d.pemohon.nama.toLowerCase().includes(search.toLowerCase()) ||
      d.pemohon.nip.includes(search);
    const matchFilter = filter === "Semua" || d.status === filter;
    return matchSearch && matchFilter;
  });

  const handleUpdate = (updated) => {
    setData(data.map(d => d.id === updated.id ? updated : d));
  };

  const handleSetujuiDirect = (id) => {
    setData(data.map(d => d.id === id ? { ...d, status: "Disetujui" } : d));
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

      {/* Stok */}
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

      {/* Summary */}
      <div style={{ display: "flex", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
        <AdminStatCard value={summary.pending} label="Menunggu Proses" color="#d97706" bg="#fffbeb" />
        <AdminStatCard value={summary.disetujui} label="Disetujui" color="#16a34a" bg="#f0fdf4" />
        <AdminStatCard value={summary.ditolak} label="Ditolak" color="#dc2626" bg="#fef2f2" />
      </div>

      {/* Tabel */}
      <AdminCard>
        <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
          {["Semua", "Pending", "Disetujui", "Ditolak"].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              style={{
                padding: "7px 14px", border: "1.5px solid", borderRadius: 20, cursor: "pointer", fontSize: 12, fontWeight: 600,
                borderColor: filter === f ? "#2563eb" : "#e2e8f0",
                background: filter === f ? "#2563eb" : "#fff",
                color: filter === f ? "#fff" : "#64748b",
              }}>
              {f}
            </button>
          ))}
        </div>

        <AdminTable headers={["No. Surat", "Pemohon", "Unit Kerja", "Jumlah Item", "Tanggal", "Status", "Aksi"]}>
          {filtered.map(d => (
            <tr key={d.id} style={{ borderBottom: "1px solid #f8fafc" }}>
              <td style={{ padding: "12px 16px", fontFamily: "monospace", fontSize: 12, color: "#64748b", textAlign: "left" }}>{d.nomorSurat}</td>
              <td style={{ padding: "12px 16px", textAlign: "left" }}>
                <div style={{ fontWeight: 600, color: "#1e293b" }}>{d.pemohon.nama}</div>
                <div style={{ fontSize: 11, color: "#94a3b8" }}>{d.pemohon.nip}</div>
              </td>
              <td style={{ padding: "12px 16px", color: "#64748b", textAlign: "left" }}>{d.pemohon.unitKerja}</td>
              <td style={{ padding: "12px 16px", color: "#1e293b", textAlign: "left" }}>{d.items.length} item</td>
              <td style={{ padding: "12px 16px", color: "#64748b", textAlign: "left" }}>{d.tanggal}</td>
              <td style={{ padding: "12px 16px", textAlign: "left" }}><StatusBadge status={d.status} /></td>
              <td style={{ padding: "12px 16px", textAlign: "left" }}>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  <AdminButton variant="outline" onClick={() => setDetailItem(d)}><IconEye /> Detail</AdminButton>
                  {d.status === "Pending" && (
                    <AdminButton variant="success" onClick={() => handleSetujuiDirect(d.id)}>Setujui</AdminButton>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </AdminTable>
      </AdminCard>

      {/* Modal Detail */}
      {detailItem && (
        <DetailModal
          item={detailItem}
          onClose={() => setDetailItem(null)}
          onUpdate={handleUpdate}
          onSetujui={() => {}}
          onShowSurat={(itemData) => { setShowSurat(itemData); setDetailItem(null); }}
        />
      )}

      {/* Modal Preview Surat */}
      {showSurat && (
        <PreviewSuratAdmin item={showSurat} onClose={() => setShowSurat(null)} />
      )}
    </div>
  );
};

export default PermintaanAdmin;