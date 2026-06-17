import { useState } from "react";
import { dummyPeminjaman, stokBarang } from "../user/bmn/dummyData";
import { Modal, StatusBadge, StokCard, inputStyle, FormGroup, IconSearch, IconEye, IconReturn, downloadAsPDF } from "../user/bmn/components";

const PeminjamanAdmin = () => {
  const [data, setData] = useState(dummyPeminjaman);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Semua");
  const [detailItem, setDetailItem] = useState(null);
  const [showKembali, setShowKembali] = useState(null);
  const [kondisi, setKondisi] = useState("Baik");
  const [catatan, setCatatan] = useState("");
  const [stok, setStok] = useState(stokBarang);

  const filtered = data.filter(d => {
    const matchSearch = d.peminjam.nama.toLowerCase().includes(search.toLowerCase()) ||
      d.peminjam.nip.includes(search) || d.barang.nama.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "Semua" || d.status === filter;
    return matchSearch && matchFilter;
  });

  const handleSetujui = (id) => {
    setData(data.map(d => d.id === id ? { ...d, status: "Dipinjam" } : d));
  };

  const handleTolak = (id) => {
    setData(data.map(d => d.id === id ? { ...d, status: "Ditolak" } : d));
  };

  const handleKembali = () => {
    // Update status peminjaman
    setData(data.map(d => d.id === showKembali.id ? { ...d, status: "Dikembalikan", kondisiKembali: kondisi } : d));
    // Update stok jika kondisi baik/rusak ringan (tetap bisa dipakai)
    if (kondisi !== "Rusak Berat") {
      setStok(stok.map(s => s.id === showKembali.barang.id ? { ...s, stok: s.stok + 1 } : s));
    }
    setShowKembali(null);
    setKondisi("Baik");
    setCatatan("");
  };

  const summary = {
    diajukan: data.filter(d => d.status === "Diajukan").length,
    dipinjam: data.filter(d => d.status === "Dipinjam").length,
    dikembalikan: data.filter(d => d.status === "Dikembalikan").length,
  };

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: "#1e3a5f" }}>Proses Peminjaman Barang</h2>
        <p style={{ margin: "4px 0 0", color: "#64748b", fontSize: 14 }}>Kelola permohonan peminjaman, pengembalian, dan stok barang</p>
      </div>

      {/* Stok Barang */}
      <StokCard items={stok} title="Stok Barang Saat Ini" />

      {/* Summary */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginBottom: 20 }}>
        {[
          { label: "Menunggu Persetujuan", value: summary.diajukan, bg: "#fef9c3", color: "#a16207" },
          { label: "Sedang Dipinjam", value: summary.dipinjam, bg: "#dbeafe", color: "#1d4ed8" },
          { label: "Sudah Dikembalikan", value: summary.dikembalikan, bg: "#dcfce7", color: "#16a34a" },
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
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Cari nama, NIP, atau barang..." style={{ ...inputStyle, paddingLeft: 34 }} />
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            {["Semua", "Diajukan", "Dipinjam", "Dikembalikan", "Ditolak"].map(f => (
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
                {["No. Surat", "Peminjam", "Barang", "Lokasi", "Tgl Pinjam", "Tgl Kembali", "Status", "Aksi"].map(h => (
                  <th key={h} style={{ padding: "10px 12px", textAlign: "left", fontWeight: 700, color: "#374151", borderBottom: "1.5px solid #e2e8f0", whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(d => (
                <tr key={d.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                  <td style={{ padding: "10px 12px", fontFamily: "monospace", fontSize: 12, color: "#64748b" }}>{d.nomorSurat}</td>
                  <td style={{ padding: "10px 12px" }}>
                    <div style={{ fontWeight: 600, color: "#1e293b" }}>{d.peminjam.nama}</div>
                    <div style={{ fontSize: 11, color: "#94a3b8" }}>{d.peminjam.nip}</div>
                  </td>
                  <td style={{ padding: "10px 12px", color: "#1e293b" }}>{d.barang.nama}</td>
                  <td style={{ padding: "10px 12px", color: "#64748b" }}>{d.lokasi}</td>
                  <td style={{ padding: "10px 12px", color: "#64748b" }}>{d.tglPinjam}</td>
                  <td style={{ padding: "10px 12px", color: "#64748b" }}>{d.tglKembali}</td>
                  <td style={{ padding: "10px 12px" }}><StatusBadge status={d.status} /></td>
                  <td style={{ padding: "10px 12px" }}>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      <button onClick={() => setDetailItem(d)} style={{ display: "flex", alignItems: "center", gap: 4, background: "#f1f5f9", border: "none", borderRadius: 6, padding: "5px 10px", fontSize: 12, cursor: "pointer", color: "#475569" }}>
                        <IconEye /> Detail
                      </button>
                      {d.status === "Diajukan" && (
                        <>
                          <button onClick={() => handleSetujui(d.id)} style={{ background: "#16a34a", color: "#fff", border: "none", borderRadius: 6, padding: "5px 10px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Setujui</button>
                          <button onClick={() => handleTolak(d.id)} style={{ background: "#dc2626", color: "#fff", border: "none", borderRadius: 6, padding: "5px 10px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Tolak</button>
                        </>
                      )}
                      {d.status === "Dipinjam" && (
                        <button onClick={() => setShowKembali(d)} style={{ display: "flex", alignItems: "center", gap: 4, background: "#7c3aed", color: "#fff", border: "none", borderRadius: 6, padding: "5px 10px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
                          <IconReturn /> Kembalikan
                        </button>
                      )}
                      {d.status === "Dikembalikan" && d.kondisiKembali && (
                        <StatusBadge status={d.kondisiKembali} />
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
        <Modal title="Detail Peminjaman" onClose={() => setDetailItem(null)}>
          <div id="peminjaman-detail-print">
          <div style={{ background: "#f8fafc", borderRadius: 8, padding: 16, marginBottom: 16 }}>
            <div style={{ fontWeight: 700, color: "#1e3a5f", marginBottom: 10 }}>Data Peminjam</div>
            {[["Nama", detailItem.peminjam.nama], ["NIP", detailItem.peminjam.nip], ["Jabatan", detailItem.peminjam.jabatan], ["Unit Kerja", detailItem.peminjam.unitKerja]].map(([k, v]) => (
              <div key={k} style={{ display: "flex", gap: 8, fontSize: 13, marginBottom: 4 }}>
                <span style={{ fontWeight: 600, width: 80, flexShrink: 0 }}>{k}</span>
                <span>: {v}</span>
              </div>
            ))}
          </div>
          <div style={{ background: "#f8fafc", borderRadius: 8, padding: 16 }}>
            <div style={{ fontWeight: 700, color: "#1e3a5f", marginBottom: 10 }}>Detail Barang</div>
            {[["Barang", detailItem.barang.nama], ["Kode", detailItem.barang.kode], ["Lokasi", detailItem.lokasi], ["Tgl Pinjam", detailItem.tglPinjam], ["Tgl Kembali", detailItem.tglKembali], ["Keperluan", detailItem.keperluan], ["Status", detailItem.status]].map(([k, v]) => (
              <div key={k} style={{ display: "flex", gap: 8, fontSize: 13, marginBottom: 4 }}>
                <span style={{ fontWeight: 600, width: 100, flexShrink: 0 }}>{k}</span>
                <span>: {k === "Status" ? <StatusBadge status={v} /> : v}</span>
              </div>
            ))}
          </div>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 16, flexWrap: "wrap" }}>
            <button onClick={() => setDetailItem(null)} style={{ padding: "10px 18px", border: "1.5px solid #e2e8f0", borderRadius: 8, background: "#fff", cursor: "pointer", fontWeight: 600, color: "#64748b", fontSize: 13 }}>Tutup</button>
            <button onClick={() => window.print()} style={{ padding: "10px 18px", border: "1.5px solid #1d4ed8", borderRadius: 8, background: "#fff", cursor: "pointer", fontWeight: 600, color: "#1d4ed8", fontSize: 13 }}>🖨 Print</button>
            <button onClick={() => downloadAsPDF("peminjaman-detail-print", `Peminjaman-${detailItem.nomorSurat}`)} style={{ padding: "10px 18px", border: "1.5px solid #16a34a", borderRadius: 8, background: "#fff", cursor: "pointer", fontWeight: 600, color: "#16a34a", fontSize: 13 }}>💾 Save PDF</button>
          </div>
        </Modal>
      )}

      {/* Modal Pengembalian */}
      {showKembali && (
        <Modal title="Proses Pengembalian Barang" onClose={() => setShowKembali(null)}>
          <div style={{ background: "#f8fafc", borderRadius: 8, padding: 14, marginBottom: 16, fontSize: 13 }}>
            <div style={{ fontWeight: 700, color: "#1e3a5f", marginBottom: 6 }}>Barang yang Dikembalikan</div>
            <div><strong>{showKembali.barang.nama}</strong></div>
            <div style={{ color: "#64748b" }}>Dipinjam oleh: {showKembali.peminjam.nama}</div>
            <div style={{ color: "#64748b" }}>Tgl kembali: {showKembali.tglKembali}</div>
          </div>
          <FormGroup label="Kondisi Barang Saat Dikembalikan">
            <select style={inputStyle} value={kondisi} onChange={e => setKondisi(e.target.value)}>
              <option>Baik</option>
              <option>Rusak Ringan</option>
              <option>Rusak Berat</option>
            </select>
          </FormGroup>
          <FormGroup label="Catatan (opsional)">
            <textarea style={{ ...inputStyle, minHeight: 64, resize: "vertical" }} value={catatan} onChange={e => setCatatan(e.target.value)} placeholder="Catatan kondisi barang..." />
          </FormGroup>
          {kondisi === "Rusak Berat" && (
            <div style={{ background: "#fee2e2", border: "1px solid #fca5a5", borderRadius: 8, padding: "10px 14px", fontSize: 13, color: "#dc2626", marginBottom: 14 }}>
              ⚠️ Stok barang <strong>tidak akan bertambah</strong> karena kondisi rusak berat.
            </div>
          )}
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <button onClick={() => setShowKembali(null)} style={{ padding: "10px 20px", border: "1.5px solid #e2e8f0", borderRadius: 8, background: "#fff", cursor: "pointer", fontWeight: 600, color: "#64748b" }}>Batal</button>
            <button onClick={handleKembali} style={{ padding: "10px 24px", background: "#7c3aed", color: "#fff", border: "none", borderRadius: 8, fontWeight: 700, cursor: "pointer" }}>Konfirmasi Pengembalian</button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default PeminjamanAdmin;