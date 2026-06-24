import { useState } from "react";
import { dummyPemeliharaan } from "../user/bmn/dummyData";
import { Modal, StatusBadge, inputStyle, FormGroup, IconEye, BarcodeNIP, downloadAsPDF, AdminHeaderCard, AdminCard, AdminStatCard, AdminTable, AdminButton } from "../user/bmn/components";

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
      <AdminHeaderCard
        title="Pemeliharaan Barang"
        subtitle="Kelola permohonan pemeliharaan barang dari pegawai"
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Cari nama, NIP, atau barang..."
      />

      <div style={{ display: "flex", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
        <AdminStatCard value={summary.diajukan} label="Menunggu Diproses" color="#d97706" bg="#fffbeb" />
        <AdminStatCard value={summary.diproses} label="Sedang Diproses" color="#2563eb" bg="#eff6ff" />
        <AdminStatCard value={summary.selesai} label="Selesai" color="#16a34a" bg="#f0fdf4" />
      </div>

      <AdminCard>
        <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
          {["Semua", "Diajukan", "Diproses", "Selesai"].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              style={{ padding: "7px 14px", border: "1.5px solid", borderRadius: 20, cursor: "pointer", fontSize: 12, fontWeight: 600,
                borderColor: filter === f ? "#2563eb" : "#e2e8f0",
                background: filter === f ? "#2563eb" : "#fff",
                color: filter === f ? "#fff" : "#64748b" }}>
              {f}
            </button>
          ))}
        </div>

        <AdminTable headers={["No. Surat", "Pemohon", "Barang", "Tanggal", "Status", "Aksi"]}>
          {filtered.map(d => (
            <tr key={d.id} style={{ borderBottom: "1px solid #f8fafc" }}>
              <td style={{ padding: "12px 16px", fontFamily: "monospace", fontSize: 12, color: "#64748b" }}>{d.nomorSurat}</td>
              <td style={{ padding: "12px 16px" }}>
                <div style={{ fontWeight: 600, color: "#1e293b" }}>{d.pemohon.nama}</div>
                <div style={{ fontSize: 11, color: "#94a3b8" }}>{d.pemohon.nip}</div>
              </td>
              <td style={{ padding: "12px 16px", color: "#1e293b" }}>{d.barang.map(b => b.nama).join(", ")}</td>
              <td style={{ padding: "12px 16px", color: "#64748b" }}>{d.tanggal}</td>
              <td style={{ padding: "12px 16px" }}>
                <StatusBadge status={d.status === "Diajukan" ? "Diajukan" : d.status === "Diproses" ? "Dipinjam" : "Disetujui"} />
              </td>
              <td style={{ padding: "12px 16px" }}>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  <AdminButton variant="outline" onClick={() => setDetailItem(d)}><IconEye /> Detail</AdminButton>
                  {d.status === "Diajukan" && (
                    <AdminButton onClick={() => handleMulaiProses(d.id)}>Mulai Proses</AdminButton>
                  )}
                  {d.status === "Diproses" && (
                    <AdminButton variant="success" onClick={() => setShowProsesModal(d)}>Selesaikan</AdminButton>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </AdminTable>
      </AdminCard>

      {/* Modal Detail */}
      {detailItem && (
        <Modal title={`Detail Pemeliharaan — ${detailItem.nomorSurat}`} onClose={() => setDetailItem(null)} wide>
          <div id="pemeliharaan-detail-print">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 16 }}>
              <div>
                <div style={{ background: "#f8fafc", borderRadius: 8, padding: 14, fontSize: 13 }}>
                  <div style={{ fontWeight: 700, color: "#1e293b", marginBottom: 8 }}>Data Pemohon</div>
                  <div style={{ marginBottom: 4 }}><strong>{detailItem.pemohon.nama}</strong></div>
                  <div style={{ color: "#64748b" }}>NIP: {detailItem.pemohon.nip}</div>
                  <div style={{ color: "#64748b" }}>Tanggal: {detailItem.tanggal}</div>
                </div>

                <div style={{ marginTop: 16 }}>
                  <div style={{ fontWeight: 700, color: "#1e293b", marginBottom: 8, fontSize: 13 }}>Barang Bermasalah</div>
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
                  <div style={{ fontWeight: 700, color: "#1e293b", marginBottom: 8, fontSize: 13 }}>Keterangan Masalah</div>
                  <div style={{ background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 8, padding: "10px 14px", fontSize: 13, color: "#92400e" }}>
                    {detailItem.keterangan}
                  </div>
                </div>

                {detailItem.catatanAdmin && (
                  <div style={{ marginTop: 16 }}>
                    <div style={{ fontWeight: 700, color: "#1e293b", marginBottom: 8, fontSize: 13 }}>Catatan Admin</div>
                    <div style={{ background: "#f0fdf4", border: "1px solid #86efac", borderRadius: 8, padding: "10px 14px", fontSize: 13, color: "#14532d" }}>
                      {detailItem.catatanAdmin}
                    </div>
                  </div>
                )}
              </div>

              <div style={{ background: "#f8fafc", borderRadius: 8, padding: 16, textAlign: "center" }}>
                <div style={{ fontWeight: 700, color: "#1e293b", marginBottom: 12, fontSize: 13 }}>Verifikasi NIP Pemohon</div>
                <BarcodeNIP value={detailItem.pemohon.nip} />
                <div style={{ marginTop: 12, fontSize: 12, color: "#64748b" }}>Disetujui oleh: <strong>{detailItem.pemohon.nama}</strong></div>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, flexWrap: "wrap" }}>
            <AdminButton variant="outline" onClick={() => setDetailItem(null)}>Tutup</AdminButton>
            <AdminButton variant="outline" onClick={() => window.print()}>🖨 Print</AdminButton>
            <AdminButton variant="success" onClick={() => downloadAsPDF("pemeliharaan-detail-print", `Pemeliharaan-${detailItem.nomorSurat}`)}>💾 Save PDF</AdminButton>
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
            <AdminButton variant="outline" onClick={() => setShowProsesModal(null)}>Batal</AdminButton>
            <AdminButton variant="success" onClick={handleSelesaikan}>Tandai Selesai</AdminButton>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default PemeliharaanAdmin;