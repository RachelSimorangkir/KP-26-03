import { useState, useEffect } from "react";
import { Modal, StatusBadge, inputStyle, FormGroup, IconEye, IconReturn, downloadAsPDF, AdminHeaderCard, AdminCard, AdminStatCard, AdminTable, AdminButton } from "../user/bmn/components";

// ─── PREVIEW SURAT (Admin view) ───────────────────────────────────────────────
const PreviewSuratAdmin = ({ item, onClose }) => {
  const tglPinjam = new Date(item.tglPinjam).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
  const tglKembali = new Date(item.tglKembali).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
  const today = new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });

  return (
    <Modal title="Preview Surat Peminjaman" onClose={onClose} wide>
      <div id={`surat-admin-print-${item.id}`} style={{ border: "1.5px solid #e2e8f0", borderRadius: 8, padding: 24, background: "#fff", fontFamily: "serif", fontSize: 14, lineHeight: 1.7, color: "#1e293b" }}>
        {/* Kop Surat */}
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

        {/* Judul */}
        <div style={{ textAlign: "center", marginBottom: 16 }}>
          <div style={{ fontWeight: 700, fontSize: 14, textDecoration: "underline", letterSpacing: 1 }}>SURAT PEMINJAMAN BARANG</div>
          <div style={{ fontSize: 12 }}>Nomor: {item.nomorSurat}</div>
        </div>

        {/* Isi surat */}
        <p style={{ textAlign: "justify" }}>Yang bertanda tangan di bawah ini:</p>
        <table style={{ marginLeft: 16, marginBottom: 10, fontSize: 14, textAlign: "left", borderCollapse: "collapse" }}>
          <tbody>
            {[
              ["Nama", item.peminjam.nama],
              ["NIP", item.peminjam.nip],
              ["Jabatan", item.peminjam.jabatan],
              ["Unit Kerja", item.peminjam.unitKerja],
            ].map(([k, v]) => (
              <tr key={k}>
                <td style={{ padding: "2px 10px 2px 0", width: 110, textAlign: "left", verticalAlign: "top" }}>{k}</td>
                <td style={{ padding: "2px 6px 2px 0", textAlign: "left", verticalAlign: "top" }}>:</td>
                <td style={{ padding: "2px 0", textAlign: "left" }}><strong>{v}</strong></td>
              </tr>
            ))}
          </tbody>
        </table>

        <p style={{ textAlign: "justify" }}>Dengan ini mengajukan permohonan peminjaman barang milik negara sebagai berikut:</p>
        <table style={{ marginLeft: 16, marginBottom: 10, fontSize: 13, textAlign: "left", borderCollapse: "collapse" }}>
          <tbody>
            {[
              ["Nama Barang", item.barang.nama],
              ["Kode Barang", item.barang.kode],
              ["Lokasi Penggunaan", item.lokasi],
              ["Tanggal Pinjam", tglPinjam],
              ["Tanggal Kembali", tglKembali],
              ["Keperluan", item.keperluan],
            ].map(([k, v]) => (
              <tr key={k}>
                <td style={{ padding: "2px 10px 2px 0", width: 140, textAlign: "left", verticalAlign: "top" }}>{k}</td>
                <td style={{ padding: "2px 6px 2px 0", textAlign: "left", verticalAlign: "top" }}>:</td>
                <td style={{ padding: "2px 0", textAlign: "left" }}><strong>{v}</strong></td>
              </tr>
            ))}
          </tbody>
        </table>

        <p style={{ textAlign: "justify" }}>
          Demikian surat peminjaman barang ini saya buat dengan sebenar-benarnya dan saya bertanggung jawab
          penuh atas keamanan dan kondisi barang yang dipinjam. Barang akan dikembalikan dalam kondisi baik
          sesuai batas waktu yang telah ditentukan.
        </p>

        {/* TTD */}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 24 }}>
          <div style={{ textAlign: "center", width: 180, whiteSpace: "nowrap" }}>
            <div>Mengetahui,</div>
            <div>Kasubbag Perlengkapan dan BMN</div>
            <div style={{ marginTop: 40, borderTop: "1px solid #000", paddingTop: 4 }}>
              <div>(__________________________)</div>
              <div>NIP. ................................</div>
            </div>
          </div>
          <div style={{ textAlign: "center", width: 180 }}>
            <div style={{ whiteSpace: "nowrap" }}>Jakarta, {today}</div>
            <div style={{ whiteSpace: "nowrap" }}>Yang Meminjam,</div>
            <div style={{ marginTop: 40, borderTop: "1px solid #000", paddingTop: 4 }}>
              <div style={{ wordBreak: "break-word" }}><strong>{item.peminjam.nama}</strong></div>
              <div style={{ whiteSpace: "nowrap" }}>NIP. {item.peminjam.nip}</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 16, flexWrap: "wrap" }}>
        <AdminButton variant="outline" onClick={onClose}>Tutup</AdminButton>
        <AdminButton variant="outline" onClick={() => window.print()}>🖨 Print</AdminButton>
        <AdminButton variant="success" onClick={() => downloadAsPDF(`surat-admin-print-${item.id}`, `Surat-Peminjaman-${item.nomorSurat}`)}>💾 Save PDF</AdminButton>
      </div>
    </Modal>
  );
};

// ─── MAIN ─────────────────────────────────────────────────────────────────────
const PeminjamanAdmin = () => {

  const [data, setData] = useState([]);
  const [stok, setStok] = useState([]);

  const loadData = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/peminjaman");
      const result = await response.json();

      const dataBaru = result.map(item => ({
        id: item.id,
        nomorSurat: `PMJ-${String(item.id).padStart(4, "0")}`,
        peminjam: {
          nama: item.nama,
          nip: item.nip,
          jabatan: item.jabatan,
          unitKerja: item.unit_kerja
        },
        barang: {
          id: item.barang_id,
          nama: item.nama_barang,
          kode: item.kode_barang
        },
        lokasi: item.lokasi_penggunaan,
        tglPinjam: item.tanggal_pinjam,
        tglKembali: item.tanggal_kembali,
        keperluan: item.keperluan,
        status: item.status === "Menunggu" ? "Diajukan" : item.status,
        kondisiKembali: item.kondisi_kembali,
      }));

      setData(dataBaru);
    } catch (err) {
      console.log(err);
    }
  };

  // Stok barang — fetch asli dari master-barang, bukan dummy lagi
  const loadStok = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/master-barang");
      const result = await response.json();

      const stokBaru = result.map(item => ({
        id: item.id,
        nama: item.nama_barang,
        stok: item.stok,
      }));

      setStok(stokBaru);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadData();
    loadStok();
  }, []);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Semua");
  const [detailItem, setDetailItem] = useState(null);
  const [showSurat, setShowSurat] = useState(null);
  const [showKembali, setShowKembali] = useState(null);
  const [kondisi, setKondisi] = useState("Baik");
  const [catatan, setCatatan] = useState("");

  const filtered = data.filter(d => {
    const matchSearch =
      d.peminjam.nama.toLowerCase().includes(search.toLowerCase()) ||
      d.peminjam.nip.includes(search) ||
      d.barang.nama.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "Semua" || d.status === filter;
    return matchSearch && matchFilter;
  });

  const getStokBarang = (barangId) => {
    const s = stok.find(s => s.id === barangId);
    return s ? s.stok : 0;
  };

  const handleSetujui = async (id) => {
    try {
      await fetch(`http://localhost:8080/api/peminjaman/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Dipinjam" }),
      });
      loadData();
    } catch (err) {
      console.log(err);
    }
  };

  const handleTolak = async (id) => {
    try {
      await fetch(`http://localhost:8080/api/peminjaman/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Ditolak" }),
      });
      loadData();
    } catch (err) {
      console.log(err);
    }
  };

  const handleKembali = async () => {
    try {
      await fetch(`http://localhost:8080/api/peminjaman/${showKembali.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: "Dikembalikan",
          kondisi_kembali: kondisi,
          catatan_kembali: catatan,
        }),
      });

      setShowKembali(null);
      setKondisi("Baik");
      setCatatan("");

      // Muat ulang data peminjaman & stok (stok otomatis nambah di backend kalau bukan Rusak Berat)
      loadData();
      loadStok();
    } catch (err) {
      console.log(err);
      alert("Gagal memproses pengembalian.");
    }
  };

  const summary = {
    diajukan: data.filter(d => d.status === "Diajukan").length,
    dipinjam: data.filter(d => d.status === "Dipinjam").length,
    dikembalikan: data.filter(d => d.status === "Dikembalikan").length,
  };

  return (
    <div>
      <AdminHeaderCard
        title="Proses Peminjaman Barang"
        subtitle="Kelola permohonan peminjaman, pengembalian, dan stok barang"
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Cari nama, NIP, atau barang..."
      />

      {/* Stok Barang */}
      <AdminCard style={{ marginBottom: 14 }}>
        <div style={{ fontWeight: 700, color: "#1e293b", fontSize: 22, marginBottom: 12 }}>Stok Barang Saat Ini</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: 10 }}>
          {stok.map((s, i) => (
            <div key={i} style={{ background: s.stok === 0 ? "#fef2f2" : s.stok <= 2 ? "#fffbeb" : "#f8fafc", borderRadius: 10, padding: "12px 14px", textAlign: "center" }}>
              <div style={{ fontSize: 13, color: "#64748b", marginBottom: 5, lineHeight: 1.3 }}>{s.nama}</div>
              <div style={{ fontSize: 22, fontWeight: 700, color: s.stok === 0 ? "#dc2626" : s.stok <= 2 ? "#d97706" : "#2563eb" }}>{s.stok}</div>
              <div style={{ fontSize: 12, color: "#94a3b8" }}>Unit</div>
            </div>
          ))}
        </div>
      </AdminCard>

      {/* Summary */}
      <div style={{ display: "flex", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
        <AdminStatCard value={summary.diajukan} label="Menunggu Persetujuan" color="#d97706" bg="#fffbeb" />
        <AdminStatCard value={summary.dipinjam} label="Sedang Dipinjam" color="#2563eb" bg="#eff6ff" />
        <AdminStatCard value={summary.dikembalikan} label="Sudah Dikembalikan" color="#16a34a" bg="#f0fdf4" />
      </div>

      {/* Table */}
      <AdminCard>
        <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
          {["Semua", "Diajukan", "Dipinjam", "Dikembalikan", "Ditolak"].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              style={{
                padding: "7px 14px", border: "1.5px solid", borderRadius: 20, cursor: "pointer", fontSize: 16, fontWeight: 600,
                borderColor: filter === f ? "#2563eb" : "#e2e8f0",
                background: filter === f ? "#2563eb" : "#fff",
                color: filter === f ? "#fff" : "#64748b",
              }}>
              {f}
            </button>
          ))}
        </div>

        <AdminTable headers={["No. Surat", "Peminjam", "Barang", "Lokasi", "Tgl Pinjam", "Tgl Kembali", "Status", "Aksi"]}>
          {filtered.map(d => (
            <tr key={d.id} style={{ borderBottom: "1px solid #f8fafc" }}>
              <td style={{ padding: "12px 16px", fontFamily: "monospace", fontSize: 16, color: "#64748b", textAlign: "left", whiteSpace: "nowrap" }}>{d.nomorSurat}</td>
              <td style={{ padding: "12px 16px", textAlign: "left", whiteSpace: "nowrap" }}>
                <div style={{ fontWeight: 600, color: "#1e293b" }}>{d.peminjam.nama}</div>
                <div style={{ fontSize: 14, color: "#94a3b8" }}>{d.peminjam.nip}</div>
              </td>
              <td style={{ padding: "12px 16px", color: "#1e293b", textAlign: "left", whiteSpace: "nowrap" }}>{d.barang.nama}</td>
              <td style={{ padding: "12px 16px", color: "#64748b", textAlign: "left", whiteSpace: "nowrap" }}>{d.lokasi}</td>
              <td style={{ padding: "12px 16px", color: "#64748b", textAlign: "left", whiteSpace: "nowrap" }}>{d.tglPinjam}</td>
              <td style={{ padding: "12px 16px", color: "#64748b", textAlign: "left", whiteSpace: "nowrap" }}>{d.tglKembali}</td>
              <td style={{ padding: "12px 16px", textAlign: "left", whiteSpace: "nowrap" }}><StatusBadge status={d.status} /></td>
              <td style={{ padding: "12px 16px", textAlign: "left", whiteSpace: "nowrap" }}>
                <div style={{ display: "flex", gap: 6, flexWrap: "nowrap" }}>
                  <AdminButton variant="info" onClick={() => setDetailItem(d)}><IconEye /> Detail</AdminButton>
                  {d.status === "Diajukan" && (
                    <>
                      <AdminButton variant="success" onClick={() => handleSetujui(d.id)}>Setujui</AdminButton>
                      {/* Tolak hanya ditampilkan kalau stok barang = 0 */}
                      {getStokBarang(d.barang.id) === 0 && (
                        <AdminButton variant="danger" onClick={() => handleTolak(d.id)}>Tolak</AdminButton>
                      )}
                    </>
                  )}
                  {d.status === "Dipinjam" && (
                    <AdminButton onClick={() => setShowKembali(d)} style={{ background: "#7c3aed" }}><IconReturn /> Kembalikan</AdminButton>
                  )}
                  {d.status === "Dikembalikan" && d.kondisiKembali && <StatusBadge status={d.kondisiKembali} />}
                </div>
              </td>
            </tr>
          ))}
        </AdminTable>
      </AdminCard>

      {/* Modal Detail */}
      {detailItem && (
        <Modal title="Detail Peminjaman" onClose={() => setDetailItem(null)}>
          <div id={`peminjaman-detail-print-${detailItem.id}`}>
            {/* Data Peminjam */}
            <div style={{ background: "#f8fafc", borderRadius: 8, padding: 16, marginBottom: 12 }}>
              <div style={{ fontWeight: 700, color: "#1e293b", marginBottom: 10, textAlign: "center", fontSize: 13 }}>Data Peminjam</div>
              {[
                ["Nama", detailItem.peminjam.nama],
                ["NIP", detailItem.peminjam.nip],
                ["Jabatan", detailItem.peminjam.jabatan],
                ["Unit Kerja", detailItem.peminjam.unitKerja],
              ].map(([k, v]) => (
                <div key={k} style={{ display: "flex", gap: 8, fontSize: 13, marginBottom: 4, textAlign: "justify" }}>
                  <span style={{ fontWeight: 600, width: 90, flexShrink: 0, textAlign: "left" }}>{k}</span>
                  <span style={{ flexShrink: 0 }}>:</span>
                  <span style={{ flex: 1, textAlign: "left" }}>{v}</span>
                </div>
              ))}
            </div>

            {/* Detail Barang */}
            <div style={{ background: "#f8fafc", borderRadius: 8, padding: 16, marginBottom: 12 }}>
              <div style={{ fontWeight: 700, color: "#1e293b", marginBottom: 10, textAlign: "center", fontSize: 13 }}>Detail Barang</div>
              {[
                ["Barang", detailItem.barang.nama],
                ["Kode", detailItem.barang.kode],
                ["Lokasi", detailItem.lokasi],
                ["Tgl Pinjam", detailItem.tglPinjam],
                ["Tgl Kembali", detailItem.tglKembali],
                ["Keperluan", detailItem.keperluan],
                ["Status", detailItem.status],
              ].map(([k, v]) => (
                <div key={k} style={{ display: "flex", gap: 8, fontSize: 13, marginBottom: 4, textAlign: "justify" }}>
                  <span style={{ fontWeight: 600, width: 90, flexShrink: 0, textAlign: "left" }}>{k}</span>
                  <span style={{ flexShrink: 0 }}>:</span>
                  <span style={{ flex: 1, textAlign: "left" }}>{k === "Status" ? <StatusBadge status={v} /> : v}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 16, flexWrap: "wrap" }}>
            <AdminButton variant="outline" onClick={() => setDetailItem(null)}>Tutup</AdminButton>
            <AdminButton variant="outline" onClick={() => window.print()}>🖨 Print</AdminButton>
            <AdminButton variant="success" onClick={() => downloadAsPDF(`peminjaman-detail-print-${detailItem.id}`, `Peminjaman-${detailItem.nomorSurat}`)}>💾 Save PDF</AdminButton>
            <AdminButton onClick={() => { setShowSurat(detailItem); setDetailItem(null); }}>📄 Preview Surat</AdminButton>
          </div>
        </Modal>
      )}

      {/* Modal Preview Surat */}
      {showSurat && (
        <PreviewSuratAdmin item={showSurat} onClose={() => setShowSurat(null)} />
      )}

      {/* Modal Pengembalian */}
      {showKembali && (
        <Modal title="Proses Pengembalian Barang" onClose={() => setShowKembali(null)}>
          <div style={{ background: "#f8fafc", borderRadius: 8, padding: 14, marginBottom: 16, fontSize: 13 }}>
            <div style={{ fontWeight: 700, color: "#1e293b", marginBottom: 6 }}>Barang yang Dikembalikan</div>
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
            <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 8, padding: "10px 14px", fontSize: 13, color: "#dc2626", marginBottom: 14 }}>
              ⚠️ Stok barang <strong>tidak akan bertambah</strong> karena kondisi rusak berat.
            </div>
          )}
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <AdminButton variant="outline" onClick={() => setShowKembali(null)}>Batal</AdminButton>
            <AdminButton style={{ background: "#7c3aed" }} onClick={handleKembali}>Konfirmasi Pengembalian</AdminButton>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default PeminjamanAdmin;