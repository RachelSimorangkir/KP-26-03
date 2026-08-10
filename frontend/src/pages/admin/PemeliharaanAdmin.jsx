import { useState, useEffect } from "react";
import { Modal, StatusBadge, inputStyle, FormGroup, IconEye, BarcodeNIP, downloadAsPDF, AdminHeaderCard, AdminCard, AdminStatCard, AdminTable, AdminButton } from "../user/bmn/components";

const PemeliharaanAdmin = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Semua");
  const [detailItem, setDetailItem] = useState(null);
  const [showProsesModal, setShowProsesModal] = useState(null);
  const [catatan, setCatatan] = useState("");

  // Normalisasi 1 baris data dari backend jadi bentuk yang dipakai Admin.
  // Menerima baik bentuk yang sudah dibungkus (pemohon/barang) maupun bentuk
  // mentah persis seperti yang dikirim PemeliharaanUser.jsx saat submit
  // (nip, nama, jabatan, nomorSurat, items) — jadi tetap nyambung berapapun
  // bentuk balikan backend-nya.
  const normalisasiPemeliharaan = (d) => ({
    id: d.id,
    nomorSurat: d.nomorSurat || d.nomor_surat || "-",
    tanggal: d.tanggal || (d.created_at ? d.created_at.substring(0, 10) : "-"),
    status: d.status || "Diajukan",
    catatanAdmin: d.catatanAdmin || d.catatan_admin || "",
    pemohon: d.pemohon || {
      nama: d.nama,
      nip: d.nip,
      jabatan: d.jabatan,
    },
    barang: (d.barang || d.items || []).map((b) => ({
      nama: b.nama,
      nup: b.nup,
      keterangan: b.keterangan,
    })),
  });

  const fetchData = () => {
    setLoading(true);
    fetch("http://localhost:8080/api/pemeliharaan")
      .then((res) => res.json())
      .then((json) => {
        const arr = Array.isArray(json) ? json : [];
        setData(arr.map(normalisasiPemeliharaan));
      })
      .catch((err) => console.error("Gagal ambil data pemeliharaan:", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filtered = data.filter(d => {
    const q = search.toLowerCase();
    const matchSearch =
      (d.pemohon.nama || "").toLowerCase().includes(q) ||
      (d.pemohon.nip || "").includes(search) ||
      d.barang.some(b => (b.nama || "").toLowerCase().includes(q));
    const matchFilter = filter === "Semua" || d.status === filter;
    return matchSearch && matchFilter;
  });

  const summary = {
    diajukan: data.filter(d => d.status === "Diajukan").length,
    diproses: data.filter(d => d.status === "Diproses").length,
    selesai:  data.filter(d => d.status === "Selesai").length,
  };

  const handleMulaiProses = async (id) => {
    try {
      await fetch(`http://localhost:8080/api/pemeliharaan/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Diproses" }),
      });
      fetchData();
    } catch (err) {
      console.error(err);
      alert("Gagal memperbarui status.");
    }
  };

  const handleSelesaikan = async () => {
    try {
      await fetch(`http://localhost:8080/api/pemeliharaan/${showProsesModal.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Selesai", catatanAdmin: catatan }),
      });
      setShowProsesModal(null);
      setCatatan("");
      fetchData();
    } catch (err) {
      console.error(err);
      alert("Gagal menyelesaikan pemeliharaan.");
    }
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
      <span style={{ background: s.bg, color: s.color, padding: "3px 10px", borderRadius: 20, fontSize: 14, fontWeight: 600, whiteSpace: "nowrap" }}>
        {status}
      </span>
    );
  };

  const tdBase = { padding: "12px 14px", textAlign: "left", borderBottom: "1px solid #f1f5f9", verticalAlign: "middle" };

  if (loading) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 320 }}>
        <div style={{ fontSize: 12, color: "#64748b" }}>Memuat data pemeliharaan...</div>
      </div>
    );
  }

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
                padding: "5px 14px", borderRadius: 20, fontSize: 16, fontWeight: 600, cursor: "pointer",
                border: "none",
                background: filter === f ? "#2563eb" : "#f1f5f9",
                color:      filter === f ? "#fff"    : "#64748b",
              }}>
              {f}
            </button>
          ))}
        </div>

        {/* Tabel — urutan: No. Surat, Tanggal, Pemohon, Barang, Status, Aksi */}
        <div style={{ overflowX: "auto" }}>
          <AdminTable headers={["No. Surat", "Tanggal", "Pemohon", "Barang", "Status", "Aksi"]}>
            {filtered.map(d => (
              <tr key={d.id} style={{ borderBottom: "1px solid #f8fafc" }}>
                {/* No. Surat */}
                <td style={{ ...tdBase, fontFamily: "monospace", fontSize: 14, color: "#64748b", whiteSpace: "nowrap" }}>
                  {d.nomorSurat}
                </td>
                {/* Tanggal */}
                <td style={{ ...tdBase, color: "#64748b", whiteSpace: "nowrap" }}>
                  {d.tanggal}
                </td>
                {/* Pemohon */}
                <td style={{ ...tdBase, whiteSpace: "nowrap" }}>
                  <div style={{ fontWeight: 600, color: "#1e293b" }}>{d.pemohon.nama}</div>
                  <div style={{ fontSize: 14, color: "#94a3b8" }}>{d.pemohon.nip}</div>
                </td>
                {/* Barang */}
                <td style={{ ...tdBase, whiteSpace: "nowrap" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    {d.barang.map((b, i) => (
                      <div key={i} style={{ fontSize: 14, color: "#1e293b", whiteSpace: "nowrap" }}>
                        {b.nama}
                        <div style={{ fontSize: 12, color: "#94a3b8", fontFamily: "monospace", marginLeft: 4 }}>
                          {b.nup}
                        </div>
                      </div>
                    ))}
                  </div>
                </td>
                {/* Status */}
                <td style={{ ...tdBase, whiteSpace: "nowrap" }}>
                  {statusBadge(d.status)}
                </td>
                {/* Aksi */}
                <td style={{ ...tdBase, whiteSpace: "nowrap" }}>
                  <div style={{ display: "flex", gap: 6, flexWrap: "nowrap" }}>
                    <AdminButton variant="info" onClick={() => setDetailItem(d)}>
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
        </div>
      </AdminCard>

      {/* ── Modal Detail — tampilan Surat Pemeliharaan (sama seperti sisi user) ── */}
      {detailItem && (
        <Modal title={`Detail Pemeliharaan — ${detailItem.nomorSurat}`} onClose={() => setDetailItem(null)} wide>
          <div
            id="pemeliharaan-detail-print"
            style={{ border: "1.5px solid #e2e8f0", borderRadius: 8, padding: 24, background: "#fff", fontFamily: "serif", fontSize: 13, lineHeight: 1.7, color: "#1e293b" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 16, borderBottom: "3px double #1e293b", paddingBottom: 10, marginBottom: 16 }}>
              <div style={{ flex: 1, textAlign: "center" }}>
                <div style={{ fontWeight: 800, fontSize: 15 }}>KEMENTERIAN AGAMA REPUBLIK INDONESIA</div>
                <div style={{ fontWeight: 800, fontSize: 13 }}>DIREKTORAT JENDERAL BIMBINGAN MASYARAKAT KRISTEN</div>
                <div style={{ fontSize: 10.5, color: "#374151" }}>Jalan M.H Thamrin Nomor 6 Jakarta 10340</div>
                <div style={{ fontSize: 10.5, color: "#374151" }}>
                  Telepon (021) 31924509, 31930565, 3920774, 3920739, 3920791, Pest 465, 496,234, 487
                </div>
                <div style={{ fontSize: 10.5, color: "#374151" }}>
                  Telepon Langsung/Fax. : (021) 3812583, 3846832, 3920626, 3920628 Tromol Pos 3690
                </div>
                <div style={{ fontSize: 10.5, color: "#374151" }}>
                  Website : https://www.bimaskristen.kemenag.go.id, Email : bimaskristen@kemenag.go.id
                </div>
              </div>
            </div>

            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontWeight: 700, fontSize: 14, textDecoration: "underline", letterSpacing: 1 }}>FORM PEMELIHARAAN BARANG</div>
              <div style={{ fontSize: 12 }}>Nomor: {detailItem.nomorSurat}</div>
            </div>

            <p style={{ textAlign: "justify", marginBottom: 4 }}>
              Permohonan pemeliharaan barang atas
            </p>
            <table style={{ marginLeft: 16, marginBottom: 10, fontSize: 13, textAlign: "left", borderCollapse: "collapse" }}>
              <tbody>
                <tr>
                  <td style={{ padding: "2px 10px 2px 0", width: 110, textAlign: "left", verticalAlign: "top", color: "#475569" }}>Nama</td>
                  <td style={{ padding: "2px 6px 2px 0", textAlign: "left", verticalAlign: "top" }}>:</td>
                  <td style={{ padding: "2px 0", textAlign: "left" }}><strong>{detailItem.pemohon.nama}</strong></td>
                </tr>
                <tr>
                  <td style={{ padding: "2px 10px 2px 0", width: 110, textAlign: "left", verticalAlign: "top", color: "#475569" }}>NIP</td>
                  <td style={{ padding: "2px 6px 2px 0", textAlign: "left", verticalAlign: "top" }}>:</td>
                  <td style={{ padding: "2px 0", textAlign: "left" }}><strong>{detailItem.pemohon.nip}</strong></td>
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
                    <td style={{ border: "1px solid #cbd5e1", padding: "6px 8px", textAlign: "left" }}>{b.keterangan || "-"}</td>
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

            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 24 }}>
              <div style={{ textAlign: "center", width: 200 }}>
                <div>Jakarta, {detailItem.tanggal}</div>
                <div>Pemohon,</div>
                <div style={{ marginTop: 12, marginLeft: 65, display: "inline-block", overflow: "hidden", height: 80 }}>
                  <BarcodeNIP value={detailItem.pemohon.nip} />
                </div>
                <div style={{ marginTop: 6, fontWeight: 700 }}>{detailItem.pemohon.nama}</div>
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