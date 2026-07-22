import { useState, useEffect } from "react";
import {
  Modal, StatusBadge, inputStyle, FormGroup, IconPlus, IconDoc, IconTrash,
  downloadAsPDF, AdminHeaderCard, AdminButton,
} from "../user/bmn/components";

const API_URL = "http://localhost:8080/api";

const WARNA_PILIHAN = [
  { warna: "#b91c1c", warnaBg: "#fef2f2" },
  { warna: "#1d4ed8", warnaBg: "#eff6ff" },
  { warna: "#7c3aed", warnaBg: "#faf5ff" },
  { warna: "#16a34a", warnaBg: "#f0fdf4" },
  { warna: "#d97706", warnaBg: "#fffbeb" },
  { warna: "#0891b2", warnaBg: "#ecfeff" },
];

const emptyEselonForm = () => ({ id: null, nama: "", label: "", warna: WARNA_PILIHAN[0].warna, warnaBg: WARNA_PILIHAN[0].warnaBg });
const emptyBagianForm = () => ({ id: null, eselonId: null, nama: "" });
const emptyTambahDBR = () => ({ bagianId: "", nama: "", nip: "", jabatan: "", barang: [{ nama: "", nup: "", kondisi: "Baik" }] });

// Kumpulkan semua pegawai unik (berdasarkan NIP) dari seluruh struktur, buat mode pencarian.
const getAllPegawai = (struktur) => {
  const map = new Map();
  struktur.forEach((es) => {
    es.bagian.forEach((bg) => {
      bg.barang.forEach((b) => {
        if (!b.nip) return;
        if (!map.has(b.nip)) {
          map.set(b.nip, {
            nip: b.nip, nama: b.pegawai, jabatan: b.jabatan || "",
            eselonId: es.id, eselonNama: es.nama,
            bagianId: bg.id, bagianNama: bg.nama,
            warna: es.warna, warnaBg: es.warnaBg,
            barang: [],
          });
        }
        map.get(b.nip).barang.push(b);
      });
    });
  });
  return Array.from(map.values());
};

const totalBarangEselon = (es) => es.bagian.reduce((s, b) => s + b.barang.length, 0);

const DBRAdmin = () => {
  const [struktur, setStruktur] = useState([]);
  const [loading, setLoading] = useState(true);

  const [activeEselonId, setActiveEselonId] = useState(null);
  const [detailBagian, setDetailBagian] = useState(null);
  const [detailPegawai, setDetailPegawai] = useState(null);

  const [search, setSearch] = useState("");

  const [showEselonModal, setShowEselonModal] = useState(false);
  const [formEselon, setFormEselon] = useState(emptyEselonForm());

  const [showBagianModal, setShowBagianModal] = useState(false);
  const [formBagian, setFormBagian] = useState(emptyBagianForm());

  const [showTambahDBR, setShowTambahDBR] = useState(false);
  const [formTambahDBR, setFormTambahDBR] = useState(emptyTambahDBR());

  const [pegawaiQuery, setPegawaiQuery] = useState("");
  const [pegawaiHasil, setPegawaiHasil] = useState([]);
  const [cariLoading, setCariLoading] = useState(false);

  const today = new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });

  // ── Load data dari backend ────────────────────────────────────────────────────
  const loadStruktur = async () => {
    try {
      const res = await fetch(`${API_URL}/dbr-struktur`);
      const data = await res.json();

      const transformed = data.map(es => ({
        id: es.id, nama: es.nama, label: es.label, warna: es.warna, warnaBg: es.warnaBg,
        bagian: es.bagian.map(bg => ({
          id: bg.id,
          nama: bg.nama,
          pegawaiList: bg.pegawai,
          barang: bg.pegawai.flatMap(p =>
            p.barang.map(b => ({ ...b, nip: p.nip, pegawai: p.nama, jabatan: p.jabatan }))
          ),
        })),
      }));

      setStruktur(transformed);
    } catch (err) {
      console.error("Gagal memuat struktur DBR:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadStruktur(); }, []);

  const activeEselon = struktur.find(e => e.id === activeEselonId) || null;

  useEffect(() => {
    if (detailBagian) {
      const es = struktur.find(e => e.id === detailBagian.eselon.id);
      const bg = es?.bagian.find(b => b.id === detailBagian.bagian.id);
      if (es && bg) setDetailBagian({ eselon: es, bagian: bg });
      else setDetailBagian(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [struktur]);

  // ── CRUD Eselon ───────────────────────────────────────────────────────────────
  const bukaTambahEselon = () => { setFormEselon(emptyEselonForm()); setShowEselonModal(true); };
  const bukaEditEselon = (es) => { setFormEselon({ id: es.id, nama: es.nama, label: es.label, warna: es.warna, warnaBg: es.warnaBg }); setShowEselonModal(true); };

  const simpanEselon = async () => {
    if (!formEselon.nama.trim()) return;
    try {
      if (formEselon.id) {
        await fetch(`${API_URL}/dbr-struktur/eselon/${formEselon.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(formEselon) });
      } else {
        await fetch(`${API_URL}/dbr-struktur/eselon`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(formEselon) });
      }
      setShowEselonModal(false);
      loadStruktur();
    } catch (err) { console.error(err); alert("Gagal menyimpan Eselon."); }
  };

  const hapusEselon = async (id) => {
    if (!window.confirm("Hapus Eselon ini beserta semua Bagian di dalamnya?")) return;
    try {
      await fetch(`${API_URL}/dbr-struktur/eselon/${id}`, { method: "DELETE" });
      if (activeEselonId === id) setActiveEselonId(null);
      loadStruktur();
    } catch (err) { console.error(err); alert("Gagal menghapus Eselon."); }
  };

  // ── CRUD Bagian ───────────────────────────────────────────────────────────────
  const bukaTambahBagian = (eselonId) => { setFormBagian({ id: null, eselonId, nama: "" }); setShowBagianModal(true); };
  const bukaEditBagian = (bg, eselonId) => { setFormBagian({ id: bg.id, eselonId, nama: bg.nama }); setShowBagianModal(true); };

  const simpanBagian = async () => {
    if (!formBagian.nama.trim()) return;
    try {
      if (formBagian.id) {
        await fetch(`${API_URL}/dbr-struktur/bagian/${formBagian.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ nama: formBagian.nama }) });
      } else {
        await fetch(`${API_URL}/dbr-struktur/bagian`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ eselonId: formBagian.eselonId, nama: formBagian.nama }) });
      }
      setShowBagianModal(false);
      loadStruktur();
    } catch (err) { console.error(err); alert("Gagal menyimpan Bagian."); }
  };

  const hapusBagian = async (id) => {
    if (!window.confirm("Hapus Bagian ini?")) return;
    try {
      await fetch(`${API_URL}/dbr-struktur/bagian/${id}`, { method: "DELETE" });
      setDetailBagian(null);
      loadStruktur();
    } catch (err) { console.error(err); alert("Gagal menghapus Bagian."); }
  };

  // ── Kelola Pegawai via NIP (data dari dbr_lt10) ───────────────────────────────
  const cariPegawai = async (q) => {
    setPegawaiQuery(q);
    if (!q.trim()) { setPegawaiHasil([]); return; }
    setCariLoading(true);
    try {
      const res = await fetch(`${API_URL}/dbr-struktur/cari-pegawai?q=${encodeURIComponent(q)}`);
      setPegawaiHasil(await res.json());
    } catch (err) { console.error(err); } finally { setCariLoading(false); }
  };

  const tambahPegawaiKeBagian = async (bagianId, nip) => {
    try {
      const res = await fetch(`${API_URL}/dbr-struktur/bagian/${bagianId}/pegawai`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ nip }) });
      const result = await res.json();
      if (!result.success) { alert(result.message); return; }
      loadStruktur();
    } catch (err) { console.error(err); alert("Gagal menambahkan pegawai."); }
  };

  const hapusPegawaiDariBagian = async (bagianId, nip) => {
    try {
      await fetch(`${API_URL}/dbr-struktur/bagian/${bagianId}/pegawai/${nip}`, { method: "DELETE" });
      loadStruktur();
    } catch (err) { console.error(err); alert("Gagal menghapus pegawai dari bagian."); }
  };

  // ── Tambah DBR manual ─────────────────────────────────────────────────────────
  const bukaTambahDBR = (bagianId = "") => { setFormTambahDBR({ ...emptyTambahDBR(), bagianId }); setShowTambahDBR(true); };

  const tambahBarisBarang = () => setFormTambahDBR(f => ({ ...f, barang: [...f.barang, { nama: "", nup: "", kondisi: "Baik" }] }));
  const hapusBarisBarang = (idx) => setFormTambahDBR(f => ({ ...f, barang: f.barang.filter((_, i) => i !== idx) }));
  const updateBarisBarang = (idx, field, val) => setFormTambahDBR(f => ({
    ...f, barang: f.barang.map((b, i) => i === idx ? { ...b, [field]: val } : b)
  }));

  const simpanTambahDBR = async () => {
    if (!formTambahDBR.bagianId || !formTambahDBR.nama.trim() || !formTambahDBR.nip.trim()) {
      alert("Pilih Bagian, isi nama, dan NIP pegawai dulu.");
      return;
    }
    const barangValid = formTambahDBR.barang.filter(b => b.nama.trim());
    if (barangValid.length === 0) {
      alert("Isi minimal 1 nama barang.");
      return;
    }
    try {
      const res = await fetch(`${API_URL}/dbr-struktur/bagian/${formTambahDBR.bagianId}/barang`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nama: formTambahDBR.nama, nip: formTambahDBR.nip, jabatan: formTambahDBR.jabatan, barang: barangValid }),
      });
      const result = await res.json();
      if (!result.success) { alert(result.error || "Gagal menyimpan."); return; }
      setShowTambahDBR(false);
      loadStruktur();
    } catch (err) { console.error(err); alert("Gagal menyimpan DBR."); }
  };

  // ── Pencarian global (pegawai / bagian) ───────────────────────────────────────
  const q = search.trim().toLowerCase();
  const allPegawai = q ? getAllPegawai(struktur) : [];
  const hasilPegawai = q ? allPegawai.filter(p => p.nama.toLowerCase().includes(q) || p.nip.includes(q)) : [];
  const semuaBagianFlat = struktur.flatMap(es => es.bagian.map(bg => ({ eselon: es, bagian: bg })));
  const hasilFungsi = q ? semuaBagianFlat.filter(({ eselon, bagian }) =>
    bagian.nama.toLowerCase().includes(q) || eselon.nama.toLowerCase().includes(q)
  ) : [];

  // Semua bagian (buat dropdown di modal Tambah DBR)
  const semuaBagianUntukDropdown = struktur.flatMap(es => es.bagian.map(bg => ({ id: bg.id, label: `${es.nama} — ${bg.nama}` })));

  // ── Breadcrumb ────────────────────────────────────────────────────────────────
  const Breadcrumb = () => (
    <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 16, color: "#64748b", marginBottom: 8, flexWrap: "wrap" }}>
      <button onClick={() => setActiveEselonId(null)}
        style={{ background: "none", border: "none", cursor: "pointer", color: activeEselon ? "#2563eb" : "#1e293b", fontWeight: activeEselon ? 600 : 700, padding: 0, fontSize: 14 }}>
        Ditjen Bimas Kristen
      </button>
      {activeEselon && (<><span>›</span><span style={{ color: "#1e293b", fontWeight: 700 }}>{activeEselon.nama}</span></>)}
    </div>
  );

  // ── KotakCard ─────────────────────────────────────────────────────────────────
  const KotakCard = ({ title, label, subtitle, badge, warna = "#2563eb", warnaBg = "#eff6ff", onClick, onEdit, onDelete }) => (
    <div
      onClick={onClick}
      style={{ background: "#fff", border: "1.5px solid #e2e8f0", borderRadius: 12, padding: "18px 20px", cursor: "pointer", transition: "box-shadow 0.15s, border-color 0.15s, transform 0.15s", position: "relative" }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 4px 16px ${warna}22`; e.currentTarget.style.borderColor = warna; e.currentTarget.style.transform = "translateY(-2px)"; }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.transform = "translateY(0)"; }}
    >
      {(onEdit || onDelete) && (
        <div style={{ position: "absolute", top: 10, right: 10, display: "flex", gap: 4 }} onClick={e => e.stopPropagation()}>
          {onEdit && <button onClick={onEdit} title="Edit" style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 6, cursor: "pointer", fontSize: 11, padding: "3px 6px", color: "#475569" }}>✎</button>}
          {onDelete && <button onClick={onDelete} title="Hapus" style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 6, cursor: "pointer", fontSize: 11, padding: "3px 6px", color: "#dc2626" }}>✕</button>}
        </div>
      )}
      {label && <div style={{ fontSize: 12, fontWeight: 700, color: warna, background: warnaBg, padding: "2px 8px", borderRadius: 20, display: "inline-block", marginBottom: 8, letterSpacing: 0.5 }}>{label}</div>}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: 14, color: "#1e293b", marginBottom: 3, paddingRight: onEdit ? 44 : 0 }}>{title}</div>
          {subtitle && <div style={{ fontSize: 14, color: "#64748b", marginTop: 2 }}>{subtitle}</div>}
        </div>
        <div style={{ color: warna, flexShrink: 0, marginLeft: 10 }}><IconDoc /></div>
      </div>
      {badge !== undefined && <div style={{ background: warnaBg, color: warna, padding: "3px 10px", borderRadius: 6, fontSize: 12, fontWeight: 700, display: "inline-block"}}>{badge}</div>}
    </div>
  );

  const TabelBarang = ({ barang }) => (
    barang.length === 0 ? (
      <div style={{ textAlign: "center", padding: "24px 0", color: "#94a3b8", fontSize: 13 }}>Belum ada barang yang terdaftar.</div>
    ) : (
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, marginBottom: 16 }}>
        <thead>
          <tr style={{ background: "#f8fafc" }}>
            {["No", "Nama Barang", "NUP", "Kondisi"].map(h => (
              <th key={h} style={{ padding: "8px 12px", textAlign: "left", fontWeight: 700, color: "#374151", borderBottom: "1.5px solid #e2e8f0" }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {barang.map((b, i) => (
            <tr key={b.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
              <td style={{ padding: "8px 12px", color: "#64748b" }}>{i + 1}</td>
              <td style={{ padding: "8px 12px", color: "#1e293b", fontWeight: 600 }}>{b.nama}</td>
              <td style={{ padding: "8px 12px", color: "#64748b" }}>{b.nup}</td>
              <td style={{ padding: "8px 12px" }}><StatusBadge status={b.kondisi} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  );

  // ── Modal Detail Bagian ───────────────────────────────────────────────────────
  const renderDetailBagian = () => {
    if (!detailBagian) return null;
    const { eselon, bagian } = detailBagian;
    return (
      <Modal title={`DBR — ${bagian.nama}`} onClose={() => setDetailBagian(null)} wide>
        <div id="dbr-detail-print">
          <div style={{ textAlign: "center", borderBottom: "2px solid #1e293b", paddingBottom: 10, marginBottom: 16 }}>
            <div style={{ fontWeight: 800, fontSize: 14 }}>KEMENTERIAN AGAMA REPUBLIK INDONESIA</div>
            <div style={{ fontSize: 12, color: "#64748b" }}>Direktorat Jenderal Bimbingan Masyarakat Kristen</div>
            <div style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}>{eselon.nama}</div>
            <div style={{ fontWeight: 700, fontSize: 14, marginTop: 8, letterSpacing: 0.5 }}>DAFTAR BARANG RUANGAN (DBR)</div>
          </div>
          <div style={{ background: "#f8fafc", borderRadius: 8, padding: 14, marginBottom: 14, fontSize: 14 }}>
            {[["Unit (Eselon)", eselon.nama], ["Bagian / Fungsi", bagian.nama], ["Tanggal Cetak", today]].map(([k, v]) => (
              <div key={k} style={{ display: "flex", gap: 8, marginBottom: 4 }}>
                <span style={{ fontWeight: 600, width: 140, flexShrink: 0, color: "#475569" }}>{k}</span>
                <span style={{ flexShrink: 0, color: "#475569" }}>:</span>
                <span style={{ color: "#1e293b", fontWeight: 600 }}>{v}</span>
              </div>
            ))}
          </div>
          <TabelBarang barang={bagian.barang} />
        </div>

        <div className="dbr-no-print" style={{ borderTop: "1px solid #e2e8f0", paddingTop: 14, marginBottom: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: "#1e293b" }}>Kelola Pegawai (dari data DBR yang sudah ada)</div>
            <AdminButton onClick={() => bukaTambahDBR(bagian.id)}><IconPlus /> Tambah DBR Manual</AdminButton>
          </div>

          {bagian.pegawaiList.length > 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 12 }}>
              {bagian.pegawaiList.map(p => (
                <div key={p.nip} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#f8fafc", borderRadius: 8, padding: "8px 12px" }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#1e293b" }}>{p.nama}</div>
                    <div style={{ fontSize: 12, color: "#94a3b8" }}>{p.nip} · {p.barang.length} barang</div>
                  </div>
                  <button onClick={() => hapusPegawaiDariBagian(bagian.id, p.nip)}
                    style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 6, cursor: "pointer", fontSize: 12, padding: "4px 10px", color: "#dc2626", fontWeight: 600 }}>
                    Hapus dari Bagian
                  </button>
                </div>
              ))}
            </div>
          )}

          <FormGroup label="Cari pegawai (yang sudah punya data DBR Lantai 10) — nama atau NIP">
            <input style={inputStyle} value={pegawaiQuery} onChange={e => cariPegawai(e.target.value)} placeholder="Ketik nama atau NIP..." />
          </FormGroup>

          {cariLoading && <div style={{ fontSize: 12, color: "#94a3b8" }}>Mencari...</div>}

          {!cariLoading && pegawaiQuery && (
            <div style={{ maxHeight: 180, overflowY: "auto", border: "1px solid #e2e8f0", borderRadius: 8 }}>
              {pegawaiHasil.length === 0 ? (
                <div style={{ padding: 10, fontSize: 14, color: "#94a3b8" }}>Tidak ditemukan.</div>
              ) : pegawaiHasil.map(p => {
                const sudahAda = bagian.pegawaiList.some(x => x.nip === p.nip);
                return (
                  <div key={p.nip} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 12px", borderBottom: "1px solid #f1f5f9" }}>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: "#1e293b" }}>{p.nama}</div>
                      <div style={{ fontSize: 12, color: "#94a3b8" }}>{p.nip} · {p.jabatan}</div>
                    </div>
                    <button disabled={sudahAda} onClick={() => tambahPegawaiKeBagian(bagian.id, p.nip)}
                      style={{ background: sudahAda ? "#f1f5f9" : "#8e9eb3", border: "1px solid", borderColor: sudahAda ? "#e2e8f0" : "#bfdbfe", borderRadius: 6, cursor: sudahAda ? "not-allowed" : "pointer", fontSize: 11, padding: "4px 10px", color: sudahAda ? "#94a3b8" : "#2563eb", fontWeight: 600 }}>
                      {sudahAda ? "Sudah ada" : "+ Tambah"}
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", flexWrap: "wrap" }}>
          <AdminButton variant="outline" onClick={() => hapusBagian(bagian.id)} style={{ background: "#fef2f2", color: "#dc2626" }}><IconTrash /> Hapus Bagian</AdminButton>
          <AdminButton variant="outline" onClick={() => setDetailBagian(null)}>Tutup</AdminButton>
          <AdminButton variant="outline" onClick={() => window.print()}>🖨 Print</AdminButton>
          <AdminButton variant="success" onClick={() => downloadAsPDF("dbr-detail-print", `DBR-${bagian.nama}`)}>💾 Simpan PDF</AdminButton>
        </div>
      </Modal>
    );
  };

  const renderDetailPegawai = () => {
    if (!detailPegawai) return null;
    const p = detailPegawai;
    return (
      <Modal title={`DBR Pegawai — ${p.nama}`} onClose={() => setDetailPegawai(null)} wide>
        <div id="dbr-pegawai-print">
          <div style={{ textAlign: "center", borderBottom: "2px solid #1e293b", paddingBottom: 10, marginBottom: 16 }}>
            <div style={{ fontWeight: 800, fontSize: 13 }}>KEMENTERIAN AGAMA REPUBLIK INDONESIA</div>
            <div style={{ fontSize: 11, color: "#64748b" }}>Direktorat Jenderal Bimbingan Masyarakat Kristen</div>
            <div style={{ fontWeight: 700, fontSize: 13, marginTop: 8, letterSpacing: 0.5 }}>DAFTAR BARANG RUANGAN (DBR) — REKAP PER PEGAWAI</div>
          </div>
          <div style={{ background: "#f8fafc", borderRadius: 8, padding: 14, marginBottom: 14, fontSize: 13 }}>
            {[["Nama Pegawai", p.nama], ["NIP", p.nip], ["Jabatan", p.jabatan || "-"], ["Unit / Bagian", `${p.eselonNama} — ${p.bagianNama}`], ["Tanggal Cetak", today]].map(([k, v]) => (
              <div key={k} style={{ display: "flex", gap: 8, marginBottom: 4 }}>
                <span style={{ fontWeight: 600, width: 140, flexShrink: 0, color: "#475569" }}>{k}</span>
                <span style={{ flexShrink: 0, color: "#475569" }}>:</span>
                <span style={{ color: "#1e293b", fontWeight: 600 }}>{v}</span>
              </div>
            ))}
          </div>
          <TabelBarang barang={p.barang} />
        </div>
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", flexWrap: "wrap" }}>
          <AdminButton variant="outline" onClick={() => setDetailPegawai(null)}>Tutup</AdminButton>
          <AdminButton variant="outline" onClick={() => window.print()}>🖨 Print</AdminButton>
          <AdminButton variant="success" onClick={() => downloadAsPDF("dbr-pegawai-print", `DBR-${p.nama}`)}>💾 Simpan PDF</AdminButton>
        </div>
      </Modal>
    );
  };

  const renderEselonModal = () => (
    <Modal title={formEselon.id ? "Edit Eselon" : "Tambah Eselon"} onClose={() => setShowEselonModal(false)}>
      <FormGroup label="Nama Eselon">
        <input style={inputStyle} value={formEselon.nama} onChange={e => setFormEselon(f => ({ ...f, nama: e.target.value }))} placeholder="Contoh: Direktorat Pendidikan Kristen" />
      </FormGroup>
      <FormGroup label="Label (opsional)">
        <input style={inputStyle} value={formEselon.label} onChange={e => setFormEselon(f => ({ ...f, label: e.target.value }))} placeholder="Contoh: Eselon II" />
      </FormGroup>
      <FormGroup label="Warna">
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {WARNA_PILIHAN.map(w => (
            <button key={w.warna} type="button" onClick={() => setFormEselon(f => ({ ...f, warna: w.warna, warnaBg: w.warnaBg }))}
              style={{ width: 32, height: 32, borderRadius: "50%", background: w.warna, border: formEselon.warna === w.warna ? "3px solid #1e293b" : "2px solid #fff", cursor: "pointer", boxShadow: "0 0 0 1px #e2e8f0" }} />
          ))}
        </div>
      </FormGroup>
      <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 10 }}>
        <AdminButton variant="outline" onClick={() => setShowEselonModal(false)}>Batal</AdminButton>
        <AdminButton onClick={simpanEselon}>Simpan</AdminButton>
      </div>
    </Modal>
  );

  const renderBagianModal = () => (
    <Modal title={formBagian.id ? "Edit Bagian" : "Tambah Bagian"} onClose={() => setShowBagianModal(false)}>
      <FormGroup label="Nama Bagian / Fungsi">
        <input style={inputStyle} value={formBagian.nama} onChange={e => setFormBagian(f => ({ ...f, nama: e.target.value }))} placeholder="Contoh: Subdit Pendidikan Dasar" />
      </FormGroup>
      <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 10 }}>
        <AdminButton variant="outline" onClick={() => setShowBagianModal(false)}>Batal</AdminButton>
        <AdminButton onClick={simpanBagian}>Simpan</AdminButton>
      </div>
    </Modal>
  );

  // ── Modal Tambah DBR manual ───────────────────────────────────────────────────
  const renderTambahDBRModal = () => (
    <Modal title="Tambah DBR" onClose={() => setShowTambahDBR(false)} wide>
      <FormGroup label="Bagian / Ruangan">
        <select style={inputStyle} value={formTambahDBR.bagianId} onChange={e => setFormTambahDBR(f => ({ ...f, bagianId: e.target.value }))}>
          <option value="">-- Pilih Bagian --</option>
          {semuaBagianUntukDropdown.map(b => <option key={b.id} value={b.id}>{b.label}</option>)}
        </select>
      </FormGroup>

      <div style={{ display: "flex", gap: 10 }}>
        <FormGroup label="Nama Pegawai">
          <input style={inputStyle} value={formTambahDBR.nama} onChange={e => setFormTambahDBR(f => ({ ...f, nama: e.target.value }))} placeholder="Nama pegawai penanggung jawab" />
        </FormGroup>
        <FormGroup label="NIP">
          <input style={inputStyle} value={formTambahDBR.nip} onChange={e => setFormTambahDBR(f => ({ ...f, nip: e.target.value }))} placeholder="NIP" />
        </FormGroup>
      </div>
      <FormGroup label="Jabatan">
        <input style={inputStyle} value={formTambahDBR.jabatan} onChange={e => setFormTambahDBR(f => ({ ...f, jabatan: e.target.value }))} placeholder="Jabatan pegawai" />
      </FormGroup>

      <div style={{ fontWeight: 700, fontSize: 14, color: "#1e293b", margin: "14px 0 8px" }}>Daftar Barang</div>
      {formTambahDBR.barang.map((b, i) => (
        <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8, alignItems: "center" }}>
          <input style={{ ...inputStyle, flex: 2 }} value={b.nama} onChange={e => updateBarisBarang(i, "nama", e.target.value)} placeholder="Nama barang" />
          <input style={{ ...inputStyle, flex: 1 }} value={b.nup} onChange={e => updateBarisBarang(i, "nup", e.target.value)} placeholder="NUP" />
          <select style={{ ...inputStyle, flex: 1 }} value={b.kondisi} onChange={e => updateBarisBarang(i, "kondisi", e.target.value)}>
            <option>Baik</option><option>Rusak Ringan</option><option>Rusak Berat</option>
          </select>
          <button onClick={() => hapusBarisBarang(i)} disabled={formTambahDBR.barang.length === 1}
            style={{ background: "none", border: "none", cursor: formTambahDBR.barang.length === 1 ? "not-allowed" : "pointer", color: "#dc2626", opacity: formTambahDBR.barang.length === 1 ? 0.3 : 1, fontSize: 16 }}>✕</button>
        </div>
      ))}
      <button onClick={tambahBarisBarang} style={{ display: "flex", alignItems: "center", gap: 5, border: "1.5px dashed #2563eb", borderRadius: 6, background: "#eff6ff", color: "#2563eb", padding: "6px 14px", fontWeight: 600, fontSize: 14, cursor: "pointer", marginBottom: 14 }}>
        <IconPlus /> Tambah Baris Barang
      </button>

      <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
        <AdminButton variant="outline" onClick={() => setShowTambahDBR(false)}>Batal</AdminButton>
        <AdminButton onClick={simpanTambahDBR}>Simpan DBR</AdminButton>
      </div>
    </Modal>
  );

  const renderHeader = () => (
    <AdminHeaderCard
      title="DBR — Daftar Barang Ruangan"
      subtitle="Inventaris barang per bagian/fungsi & per pegawai — Ditjen Bimbingan Masyarakat Kristen"
      search={search}
      onSearchChange={v => { setSearch(v); setActiveEselonId(null); }}
      searchPlaceholder="Cari nama/NIP pegawai, atau nama fungsi..."
      rightAction={
        <div style={{ display: "flex", gap: 8 }}>
          <AdminButton onClick={() => bukaTambahDBR()} style={{ background: "#fff", color: "#2563eb", whiteSpace: "nowrap" }}><IconPlus /> Tambah DBR</AdminButton>
          {activeEselon ? (
            <AdminButton onClick={() => bukaTambahBagian(activeEselon.id)} style={{ background: "#fff", color: "#2563eb", whiteSpace: "nowrap" }}><IconPlus /> Tambah Bagian</AdminButton>
          ) : (
            <AdminButton onClick={bukaTambahEselon} style={{ background: "#fff", color: "#2563eb", whiteSpace: "nowrap" }}><IconPlus /> Tambah Eselon</AdminButton>
          )}
        </div>
      }
    />
  );

  if (loading) {
    return <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: 300 }}><div style={{ fontSize: 12, color: "#64748b" }}>Memuat struktur DBR...</div></div>;
  }

  if (q) {
    const adaHasil = hasilPegawai.length > 0 || hasilFungsi.length > 0;
    return (
      <div>
        {renderHeader()}
        {hasilPegawai.length > 0 && (
          <div style={{ marginBottom: hasilFungsi.length > 0 ? 26 : 0 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#374151", marginBottom: 10 }}>👤 Berdasarkan Pegawai — {hasilPegawai.length} ditemukan</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              {hasilPegawai.map(p => (
                <KotakCard key={p.nip} label={p.jabatan || undefined} title={p.nama} subtitle={`${p.eselonNama} — ${p.bagianNama}`} badge={`${p.barang.length} barang`} warna={p.warna} warnaBg={p.warnaBg} onClick={() => setDetailPegawai(p)} />
              ))}
            </div>
          </div>
        )}
        {hasilFungsi.length > 0 && (
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#374151", marginBottom: 10 }}>🗂 Berdasarkan Bagian / Fungsi — {hasilFungsi.length} ditemukan</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              {hasilFungsi.map(({ eselon, bagian }) => (
                <KotakCard key={bagian.id} title={bagian.nama} subtitle={eselon.nama} badge={`${bagian.barang.length} barang`} warna={eselon.warna} warnaBg={eselon.warnaBg} onClick={() => setDetailBagian({ eselon, bagian })} />
              ))}
            </div>
          </div>
        )}
        {!adaHasil && <div style={{ color: "#94a3b8", fontSize: 13, textAlign: "center", padding: 30 }}>Tidak ada pegawai maupun bagian/fungsi yang cocok dengan "{search}".</div>}
        {detailPegawai && renderDetailPegawai()}
        {detailBagian && renderDetailBagian()}
        {showEselonModal && renderEselonModal()}
        {showBagianModal && renderBagianModal()}
        {showTambahDBR && renderTambahDBRModal()}
      </div>
    );
  }

  if (activeEselon) {
    return (
      <div>
        {renderHeader()}
        <Breadcrumb />
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, }}>
          <AdminButton variant="outline" onClick={() => bukaEditEselon(activeEselon)}>✎ Edit Eselon</AdminButton>
          <AdminButton variant="outline" onClick={() => hapusEselon(activeEselon.id)} style={{ color: "#dc2626" }}><IconTrash /> Hapus Eselon</AdminButton>
        </div>
        {activeEselon.bagian.length === 0 ? (
          <div style={{ color: "#94a3b8", fontSize: 13, textAlign: "center", padding: 30 }}>Belum ada Bagian di Eselon ini. Klik "Tambah Bagian" di atas.</div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            {activeEselon.bagian.map(bg => (
              <KotakCard key={bg.id} title={bg.nama} badge={`${bg.barang.length} barang terdaftar`} warna={activeEselon.warna} warnaBg={activeEselon.warnaBg}
                onClick={() => setDetailBagian({ eselon: activeEselon, bagian: bg })} onEdit={() => bukaEditBagian(bg, activeEselon.id)} />
            ))}
          </div>
        )}
        {detailBagian && renderDetailBagian()}
        {showEselonModal && renderEselonModal()}
        {showBagianModal && renderBagianModal()}
        {showTambahDBR && renderTambahDBRModal()}
      </div>
    );
  }

  return (
    <div>
      {renderHeader()}
      <div style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", marginBottom: 12, letterSpacing: 0.8 }}>
        DIREKTORAT JENDERAL BIMBINGAN MASYARAKAT KRISTEN — KEMENTERIAN AGAMA RI
      </div>
      {struktur.length === 0 ? (
        <div style={{ color: "#94a3b8", fontSize: 13, textAlign: "center", padding: 30 }}>Belum ada Eselon. Klik "Tambah Eselon" di atas buat mulai.</div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: 14 }}>
          {struktur.map(es => (
            <KotakCard key={es.id} label={es.label} title={es.nama} subtitle={`${es.bagian.length} bagian/fungsi`} badge={`${totalBarangEselon(es)} barang terdaftar`}
              warna={es.warna} warnaBg={es.warnaBg} onClick={() => setActiveEselonId(es.id)} onEdit={() => bukaEditEselon(es)} onDelete={() => hapusEselon(es.id)} />
          ))}
        </div>
      )}
      {detailBagian && renderDetailBagian()}
      {showEselonModal && renderEselonModal()}
      {showBagianModal && renderBagianModal()}
      {showTambahDBR && renderTambahDBRModal()}
    </div>
  );
};

export default DBRAdmin;