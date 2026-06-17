import { useState } from "react";
import { dummyPemeliharaan } from "../user/bmn/dummyData";
import { Modal, StatusBadge, inputStyle, FormGroup, IconSearch, IconEye, BarcodeNIP, downloadAsPDF } from "../user/bmn/components";

const PemeliharaanAdmin = () => {
  const [data, setData] = useState(dummyPemeliharaan);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Semua");
  const [detailItem, setDetailItem] = useState(null);
  const [showProsesModal, setShowProsesModal] = useState(null);
  const [catatan, setCatatan] = useState("");

  const filtered = data.filter(d => {
    const matchSearch = d.pemohon.nama.toLowerCase().includes(search.toLowerCase()) ||
      d.pemohon.nip.includes(search) ||
      d.barang.some(b => b.nama.toLowerCase().includes(search.toLowerCase()));
    const matchFilter = filter === "Semua" || d.status === filter;
    return matchSearch && matchFilter;
  });

  const summary = {
    diajukan: data.filter(d => d.status === "Diajukan").length,
    diproses: data.filter(d => d.status === "Diproses").length,
    selesai: data.filter(d => d.status === "Selesai").length,
  };

  const handleMulaiProses = (id) => {
    setData(data.map(d => d.id === id ? { ...d, status: "Diproses" } : d));
  };

  const handleSelesaikan = () => {
    setData(data.map(d => d.id === showProsesModal.id ? { ...d, status: "Selesai", catatanAdmin: catatan } : d));
    setShowProsesModal(null);
    setCatatan("");
  };

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: "#1e3a5f" }}>Pemeliharaan Barang</h2>
        <p style={{ margin: "4px 0 0", color: "#64748b", fontSize: 14 }}>Kelola permohonan pemeliharaan barang dari pegawai</p>
      </div>

      {/* Summary */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginBottom: 20 }}>
        {[
          { label: "Menunggu Diproses", value: summary.diajukan, bg: "#fef9c3", color: "#a16207" },
          { label: "Sedang Diproses",   value: summary.diproses, bg: "#dbeafe", color: "#1d4ed8" },
          { label: "Selesai",           value: summary.selesai,  bg: "#dcfce7", color: "#16a34a" },
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
            {["Semua", "Diajukan", "Diproses", "Selesai"].map(f => (
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
                {["No. Surat", "Pemohon", "Barang", "Tanggal", "Status", "Aksi"].map(h => (
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
                  <td style={{ padding: "10px 12px", color: "#1e293b" }}>
                    {d.barang.map(b => b.nama).join(", ")}
                  </td>
                  <td style={{ padding: "10px 12px", color: "#64748b" }}>{d.tanggal}</td>
                  <td style={{ padding: "10px 12px" }}><StatusBadge status={d.status === "Diajukan" ? "Diajukan" : d.status === "Diproses" ? "Dipinjam" : "Disetujui"} /></td>
                  <td style={{ padding: "10px 12px" }}>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      <button onClick={() => setDetailItem(d)} style={{ display: "flex", alignItems: "center", gap: 4, background: "#f1f5f9", border: "none", borderRadius: 6, padding: "5px 10px", fontSize: 12, cursor: "pointer", color: "#475569" }}>
                        <IconEye /> Detail
                      </button>
                      {d.status === "Diajukan" && (
                        <button onClick={() => handleMulaiProses(d.id)} style={{ background: "#1d4ed8", color: "#fff", border: "none", borderRadius: 6, padding: "5px 10px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
                          Mulai Proses
                        </button>
                      )}
                      {d.status === "Diproses" && (
                        <button onClick={() => setShowProsesModal(d)} style={{ background: "#16a34a", color: "#fff", border: "none", borderRadius: 6, padding: "5px 10px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
                          Selesaikan
                        </button>
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
        <Modal title={`Detail Pemeliharaan — ${detailItem.nomorSurat}`} onClose={() => setDetailItem(null)} wide>
          <div id="pemeliharaan-detail-print">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 16 }}>
            <div>
              <div style={{ background: "#f8fafc", borderRadius: 8, padding: 14, fontSize: 13 }}>
                <div style={{ fontWeight: 700, color: "#1e3a5f", marginBottom: 8 }}>Data Pemohon</div>
                <div style={{ marginBottom: 4 }}><strong>{detailItem.pemohon.nama}</strong></div>
                <div style={{ color: "#64748b" }}>NIP: {detailItem.pemohon.nip}</div>
                <div style={{ color: "#64748b" }}>Tanggal: {detailItem.tanggal}</div>
              </div>

              <div style={{ marginTop: 16 }}>
                <div style={{ fontWeight: 700, color: "#1e3a5f", marginBottom: 8, fontSize: 13 }}>Barang Bermasalah</div>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                  <thead>
                    <tr style={{ background: "#f8fafc" }}>
                      <th style={{ border: "1px solid #e2e8f0", padding: "6px 10px", textAlign: "left" }}>Nama Barang</th>
                      <th style={{ border: "1px solid #e2e8f0", padding: "6px 10px", textAlign: "left" }}>NUP</th>
                    </tr>
                  </thead>
                  <tbody>
                    {detailItem.barang.map((b, i) => (
                      <tr key={i}>
                        <td style={{ border: "1px solid #e2e8f0", padding: "6px 10px" }}>{b.nama}</td>
                        <td style={{ border: "1px solid #e2e8f0", padding: "6px 10px", fontFamily: "monospace" }}>{b.nup}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div style={{ marginTop: 16 }}>
                <div style={{ fontWeight: 700, color: "#1e3a5f", marginBottom: 8, fontSize: 13 }}>Keterangan Masalah</div>
                <div style={{ background: "#fef9c3", border: "1px solid #fde68a", borderRadius: 8, padding: "10px 14px", fontSize: 13, color: "#78350f" }}>
                  {detailItem.keterangan}
                </div>
              </div>

              {detailItem.catatanAdmin && (
                <div style={{ marginTop: 16 }}>
                  <div style={{ fontWeight: 700, color: "#1e3a5f", marginBottom: 8, fontSize: 13 }}>Catatan Admin</div>
                  <div style={{ background: "#dcfce7", border: "1px solid #86efac", borderRadius: 8, padding: "10px 14px", fontSize: 13, color: "#14532d" }}>
                    {detailItem.catatanAdmin}
                  </div>
                </div>
              )}
            </div>

            <div style={{ background: "#f8fafc", borderRadius: 8, padding: 16, textAlign: "center" }}>
              <div style={{ fontWeight: 700, color: "#1e3a5f", marginBottom: 12, fontSize: 13 }}>Verifikasi NIP Pemohon</div>
              <BarcodeNIP value={detailItem.pemohon.nip} />
              <div style={{ marginTop: 12, fontSize: 12, color: "#64748b" }}>Disetujui oleh: <strong>{detailItem.pemohon.nama}</strong></div>
            </div>
          </div>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, flexWrap: "wrap" }}>
            <button onClick={() => setDetailItem(null)} style={{ padding: "10px 18px", border: "1.5px solid #e2e8f0", borderRadius: 8, background: "#fff", cursor: "pointer", fontWeight: 600, color: "#64748b", fontSize: 13 }}>Tutup</button>
            <button onClick={() => window.print()} style={{ padding: "10px 18px", border: "1.5px solid #1d4ed8", borderRadius: 8, background: "#fff", cursor: "pointer", fontWeight: 600, color: "#1d4ed8", fontSize: 13 }}>🖨 Print</button>
            <button onClick={() => downloadAsPDF("pemeliharaan-detail-print", `Pemeliharaan-${detailItem.nomorSurat}`)} style={{ padding: "10px 18px", border: "1.5px solid #16a34a", borderRadius: 8, background: "#fff", cursor: "pointer", fontWeight: 600, color: "#16a34a", fontSize: 13 }}>💾 Save PDF</button>
          </div>
        </Modal>
      )}

      {/* Modal Selesaikan */}
      {showProsesModal && (
        <Modal title="Selesaikan Pemeliharaan" onClose={() => setShowProsesModal(null)}>
          <div style={{ background: "#f8fafc", borderRadius: 8, padding: 14, marginBottom: 16, fontSize: 13 }}>
            <div><strong>{showProsesModal.pemohon.nama}</strong> — {showProsesModal.barang.map(b => b.nama).join(", ")}</div>
          </div>
          <FormGroup label="Catatan Hasil Pemeliharaan">
            <textarea style={{ ...inputStyle, minHeight: 80, resize: "vertical" }} value={catatan} onChange={e => setCatatan(e.target.value)} placeholder="Contoh: Sudah diperbaiki, komponen diganti, dll." />
          </FormGroup>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <button onClick={() => setShowProsesModal(null)} style={{ padding: "10px 20px", border: "1.5px solid #e2e8f0", borderRadius: 8, background: "#fff", cursor: "pointer", fontWeight: 600, color: "#64748b" }}>Batal</button>
            <button onClick={handleSelesaikan} style={{ padding: "10px 20px", background: "#16a34a", color: "#fff", border: "none", borderRadius: 8, fontWeight: 700, cursor: "pointer" }}>Tandai Selesai</button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default PemeliharaanAdmin;