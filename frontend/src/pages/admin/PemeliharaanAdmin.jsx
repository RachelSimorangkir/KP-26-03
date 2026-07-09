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
    const matchSearch =
      d.pemohon.nama.toLowerCase().includes(search.toLowerCase()) ||
      d.pemohon.nip.includes(search) ||
      d.barang.some(b => b.nama.toLowerCase().includes(search.toLowerCase()));
    const matchFilter = filter === "Semua" || d.status === filter;
    return matchSearch && matchFilter;
  });

  const summary = {
    diajukan: data.filter(d => d.status === "Diajukan").length,
    diproses: data.filter(d => d.status === "Diproses").length,
    selesai:  data.filter(d => d.status === "Selesai").length,
  };

  const handleMulaiProses = (id) => {
    setData(data.map(d => d.id === id ? { ...d, status: "Diproses" } : d));
  };

  const handleSelesaikan = () => {
    setData(data.map(d =>
      d.id === showProsesModal.id ? { ...d, status: "Selesai", catatanAdmin: catatan } : d
    ));
    setShowProsesModal(null);
    setCatatan("");
  };

  // Badge warna sesuai status pemeliharaan
  const statusBadge = (status) => {
    const map = {
      "Diajukan": { bg: "#fef9c3", color: "#a16207" },
      "Diproses": { bg: "#dbeafe", color: "#1d4ed8" },
      "Selesai":  { bg: "#dcfce7", color: "#16a34a" },
    };
    const s = map[status] || { bg: "#f1f5f9", color: "#475569" };
    return (
      <span style={{ background: s.bg, color: s.color, padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600, whiteSpace: "nowrap" }}>
        {status}
      </span>
    );
  };

  const tdBase = { padding: "12px 14px", textAlign: "left", borderBottom: "1px solid #f1f5f9", verticalAlign: "middle" };

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
        <AdminStatCard value={summary.diproses} label="Sedang Diproses"  color="#2563eb" bg="#eff6ff" />
        <AdminStatCard value={summary.selesai}  label="Selesai"          color="#16a34a" bg="#f0fdf4" />
      </div>

      <AdminCard>
        {/* Filter */}
        <div style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>
          {["Semua", "Diajukan", "Diproses", "Selesai"].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              style={{
                padding: "5px 14px", borderRadius: 20, fontSize: 12, fontWeight: 600, cursor: "pointer",
                border: "none",
                background: filter === f ? "#2563eb" : "#f1f5f9",
                color:      filter === f ? "#fff"    : "#64748b",
              }}>
              {f}
            </button>
          ))}
        </div>

        {/* Tabel — urutan: No. Surat, Tanggal, Pemohon, Barang, Status, Aksi */}
        <AdminTable headers={["No. Surat", "Tanggal", "Pemohon", "Barang", "Status", "Aksi"]}>
          {filtered.map(d => (
            <tr key={d.id} style={{ borderBottom: "1px solid #f8fafc" }}>
              {/* No. Surat */}
              <td style={{ ...tdBase, fontFamily: "monospace", fontSize: 12, color: "#64748b" }}>
                {d.nomorSurat}
              </td>
              {/* Tanggal */}
              <td style={{ ...tdBase, color: "#64748b", whiteSpace: "nowrap" }}>
                {d.tanggal}
              </td>
              {/* Pemohon */}
              <td style={tdBase}>
                <div style={{ fontWeight: 600, color: "#1e293b" }}>{d.pemohon.nama}</div>
                <div style={{ fontSize: 11, color: "#94a3b8" }}>{d.pemohon.nip}</div>
              </td>
              {/* Barang */}
              <td style={tdBase}>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {d.barang.map((b, i) => (
                    <div key={i}>
                      <div style={{ fontSize: 12, fontWeight: 600, color: "#1e293b" }}>{b.nama}</div>
                      <div style={{ fontSize: 11, color: "#94a3b8", fontFamily: "monospace" }}>{b.nup}</div>
                    </div>
                  ))}
                </div>
              </td>
              {/* Status */}
              <td style={tdBase}>
                {statusBadge(d.status)}
              </td>
              {/* Aksi */}
              <td style={tdBase}>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  <AdminButton variant="outline" onClick={() => setDetailItem(d)}>
                    <IconEye /> Detail
                  </AdminButton>
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

      {/* ── Modal Detail — tampilan Surat Pemeliharaan (sama seperti sisi user) ── */}
      {detailItem && (
        <Modal title={`Detail Pemeliharaan — ${detailItem.nomorSurat}`} onClose={() => setDetailItem(null)} wide>
          <div
            id="pemeliharaan-detail-print"
            style={{ border: "1.5px solid #e2e8f0", borderRadius: 8, padding: 24, background: "#fff", fontFamily: "serif", fontSize: 13, lineHeight: 1.7, color: "#1e293b" }}
          >
            {/* KOP SURAT */}
            <div style={{ marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16, paddingBottom: 10 }}>
                <img
                  src="/logo-kemenag.png"
                  alt="Logo Kemenag"
                  style={{ width: 150, height: "auto", objectFit: "contain", flexShrink: 0 }}
                />
                <div style={{ flex: 1, textAlign: "center" }}>
                  <div style={{ fontWeight: 800, fontSize: 16, color: "#000" }}>KEMENTERIAN AGAMA REPUBLIK INDONESIA</div>
                  <div style={{ fontWeight: 800, fontSize: 14, color: "#000", marginBottom: 4 }}>DIREKTORAT JENDERAL BIMBINGAN MASYARAKAT KRISTEN</div>
                  <div style={{ fontSize: 11, color: "#000", marginBottom: 2 }}>Jalan M.H Thamrin Nomor 6 Jakarta 10340</div>
                  <div style={{ fontSize: 11, color: "#000", marginBottom: 2 }}>
                    Telepon (021) 31924509, 31930565, 3920774, 3920739, 3920791, Pest 465, 496,234, 487
                  </div>
                  <div style={{ fontSize: 11, color: "#000", marginBottom: 2 }}>
                    Telepon Langsung/Fax. : (021) 3812583, 3846832, 3920626, 3920628 Tromol Pos 3690
                  </div>
                  <div style={{ fontSize: 11, color: "#000" }}>
                    Website : https://www.bimaskristen.kemenag.go.id, Email : bimaskristen@kemenag.go.id
                  </div>
                </div>
              </div>
              {/* garis di bawah SELURUH blok kop, bukan cuma sejajar logo */}
              <div style={{ borderBottom: "3px solid #000", marginTop: 6 }} />
            </div>

            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontWeight: 700, fontSize: 14, textDecoration: "underline", letterSpacing: 1 }}>FORM PEMELIHARAAN BARANG</div>
              <div style={{ fontSize: 12 }}>Nomor: {detailItem.nomorSurat}</div>
            </div>

            <p style={{ textAlign: "justify", marginBottom: 4 }}>
              Permohonan pemeliharaan barang atas
            </p>
            <table style={{ marginLeft: 16, marginBottom: 8, fontSize: 13, borderCollapse: "collapse" }}>
              <tbody>
                <tr>
                  <td style={{ paddingRight: 12, color: "#475569" }}>Nama</td>
                  <td style={{ paddingRight: 8 }}>:</td>
                  <td style={{ fontWeight: 700 }}>{detailItem.pemohon.nama}</td>
                </tr>
                <tr>
                  <td style={{ paddingRight: 12, color: "#475569" }}>NIP</td>
                  <td style={{ paddingRight: 8 }}>:</td>
                  <td style={{ fontWeight: 700 }}>{detailItem.pemohon.nip}</td>
                </tr>
                <tr>
                  <td style={{ paddingRight: 12, color: "#475569" }}>Jabatan</td>
                  <td style={{ paddingRight: 8 }}>:</td>
                  <td style={{ fontWeight: 700 }}>{detailItem.pemohon.jabatan || "-"}</td>
                </tr>
              </tbody>
            </table>
            <p style={{ textAlign: "justify", marginBottom: 10 }}>
              dengan ini mengajukan permohonan pemeliharaan terhadap barang milik negara sebagai berikut:
            </p>

            <table style={{ width: "100%", borderCollapse: "collapse", margin: "10px 0", fontSize: 12 }}>
              <thead>
                <tr style={{ background: "#f8fafc" }}>
                  <th style={{ border: "1px solid #cbd5e1", padding: "6px 8px", textAlign: "left" }}>No.</th>
                  <th style={{ border: "1px solid #cbd5e1", padding: "6px 8px", textAlign: "left" }}>Nama Barang</th>
                  <th style={{ border: "1px solid #cbd5e1", padding: "6px 8px", textAlign: "left" }}>NUP</th>
                  <th style={{ border: "1px solid #cbd5e1", padding: "6px 8px", textAlign: "left" }}>Keterangan Permasalahan</th>
                </tr>
              </thead>
              <tbody>
                {detailItem.barang.map((b, i) => (
                  <tr key={b.nup || i}>
                    <td style={{ border: "1px solid #cbd5e1", padding: "6px 8px", textAlign: "left" }}>{i + 1}</td>
                    <td style={{ border: "1px solid #cbd5e1", padding: "6px 8px", textAlign: "left" }}>{b.nama}</td>
                    <td style={{ border: "1px solid #cbd5e1", padding: "6px 8px", textAlign: "left", fontFamily: "monospace" }}>{b.nup}</td>
                    <td style={{ border: "1px solid #cbd5e1", padding: "6px 8px", textAlign: "left" }}>{detailItem.keterangan || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Catatan admin — hanya tampil kalau sudah ada (status Selesai) */}
            {detailItem.catatanAdmin && (
              <div style={{ marginTop: 12 }}>
                <div style={{ fontWeight: 700, fontSize: 12, marginBottom: 4 }}>Catatan Hasil Pemeliharaan:</div>
                <div style={{ background: "#f0fdf4", border: "1px solid #86efac", borderRadius: 6, padding: "8px 12px", fontSize: 12, color: "#14532d" }}>
                  {detailItem.catatanAdmin}
                </div>
              </div>
            )}

            <p style={{ textAlign: "justify", marginTop: 14 }}>
              Demikian permohonan ini saya buat dengan sebenar-benarnya untuk dapat diproses oleh Admin BMN.
            </p>

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 24, alignItems: "flex-end" }}>
              <div style={{ textAlign: "center", width: 200 }}>
                <div>Jakarta, {detailItem.tanggal}</div>
                <div>Pemohon,</div>
                <div style={{ marginTop: 12, display: "inline-block", overflow: "hidden", height: 80 }}>
                  <BarcodeNIP value={detailItem.pemohon.nip} />
                </div>
                <div style={{ marginTop: 6, fontWeight: 700 }}>{detailItem.pemohon.nama}</div>
                <div>NIP. {detailItem.pemohon.nip}</div>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, flexWrap: "wrap", marginTop: 16 }}>
            <AdminButton variant="outline" onClick={() => setDetailItem(null)}>Tutup</AdminButton>
            <AdminButton variant="outline" onClick={() => window.print()}>🖨 Print</AdminButton>
            <AdminButton variant="success" onClick={() => downloadAsPDF("pemeliharaan-detail-print", `Pemeliharaan-${detailItem.nomorSurat}`)}>
              💾 Save PDF
            </AdminButton>
            {detailItem.status === "Diajukan" && (
              <AdminButton onClick={() => { handleMulaiProses(detailItem.id); setDetailItem(null); }}>
                Mulai Proses
              </AdminButton>
            )}
          </div>
        </Modal>
      )}

      {/* ── Modal Selesaikan ── */}
      {showProsesModal && (
        <Modal title="Selesaikan Pemeliharaan" onClose={() => setShowProsesModal(null)}>
          <div style={{ background: "#f8fafc", borderRadius: 8, padding: 14, marginBottom: 16, fontSize: 13 }}>
            <div style={{ fontWeight: 600, color: "#1e293b", marginBottom: 4 }}>{showProsesModal.pemohon.nama}</div>
            <div style={{ color: "#64748b" }}>{showProsesModal.barang.map(b => b.nama).join(", ")}</div>
          </div>
          <FormGroup label="Catatan Hasil Pemeliharaan">
            <textarea
              style={{ ...inputStyle, minHeight: 80, resize: "vertical" }}
              value={catatan}
              onChange={e => setCatatan(e.target.value)}
              placeholder="Contoh: Sudah diperbaiki, komponen diganti, dll."
            />
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