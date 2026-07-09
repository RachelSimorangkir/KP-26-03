import { useState } from "react";
import {
  Modal, StatusBadge, inputStyle, FormGroup, IconPlus, IconDoc, IconTrash,
  downloadAsPDF, AdminHeaderCard, AdminButton,
} from "../user/bmn/components";

// ─── STRUKTUR ORGANISASI BIMAS KRISTEN ────────────────────────────────────────
// Level 1: Eselon II (3 unit)
// Level 2: Bagian / Subdit — tiap bagian langsung punya daftar barang
const initialStruktur = [
  {
    id: "sekretariat",
    nama: "Sekretariat Ditjen Bimas Kristen",
    label: "Eselon II",
    warna: "#1d4ed8",
    warnaBg: "#eff6ff",
    bagian: [
      {
        id: "umum-bmn",
        nama: "Umum dan BMN",
        barang: [
          { id: 1,  no: 1, nama: "Meja Kerja",   nup: "3.04.01.01.001.001", kondisi: "Baik", pegawai: "Kepala Subbag",       nip: "197001011995031001" },
          { id: 2,  no: 2, nama: "Kursi Kerja",  nup: "3.04.01.02.001.001", kondisi: "Baik", pegawai: "Kepala Subbag",       nip: "197001011995031001" },
          { id: 3,  no: 3, nama: "Komputer PC",  nup: "3.16.02.01.003.001", kondisi: "Baik", pegawai: "Olin Mawar Kristianty", nip: "199001012015032001" },
        ],
      },
      { id: "evaluasi",    nama: "Evaluasi dan Pelaporan",        barang: [{ id: 4,  no: 1, nama: "Laptop", nup: "3.16.02.09.001.001", kondisi: "Baik", pegawai: "Staf Evaluasi", nip: "199201012018031001" }] },
      { id: "ortala",      nama: "Ortala",                        barang: [] },
      { id: "perencanaan", nama: "Perencanaan",                   barang: [] },
      { id: "keuangan",    nama: "Keuangan",                      barang: [] },
      { id: "hukum",       nama: "Hukum",                         barang: [] },
      { id: "sdm",         nama: "SDM",                           barang: [] },
      { id: "humas-si",    nama: "Humas dan Sistem Informasi",    barang: [] },
    ],
  },
  {
    id: "urusan-agama",
    nama: "Direktorat Urusan Agama Kristen",
    label: "Eselon II",
    warna: "#16a34a",
    warnaBg: "#f0fdf4",
    bagian: [
      { id: "kelembagaan", nama: "Kelembagaan", barang: [] },
      { id: "pupb",        nama: "PUPB (Pemberdayaan Umat & Pelayanan Bimbingan)", barang: [] },
      { id: "penyuluh",    nama: "Penyuluh",    barang: [] },
    ],
  },
  {
    id: "pendidikan-kristen",
    nama: "Direktorat Pendidikan Kristen",
    label: "Eselon II",
    warna: "#7c3aed",
    warnaBg: "#faf5ff",
    bagian: [
      { id: "subdit-dasar",    nama: "Subdit Pendidikan Dasar",    barang: [] },
      { id: "subdit-menengah", nama: "Subdit Pendidikan Menengah", barang: [] },
      { id: "subdit-tinggi",   nama: "Subdit Pendidikan Tinggi",   barang: [] },
    ],
  },
];

// ─── HELPERS ──────────────────────────────────────────────────────────────────
const totalBarangEselon = (es) => es.bagian.reduce((s, b) => s + b.barang.length, 0);

const emptyForm = () => ({
  eselonId: "", bagianId: "",
  pegawai: "", nip: "",
  barang: [{ nama: "", nup: "", kondisi: "Baik" }],
});

// ─── KOMPONEN UTAMA ───────────────────────────────────────────────────────────
const DBRAdmin = () => {
  const [struktur, setStruktur] = useState(initialStruktur);

  const [activeEselonId, setActiveEselonId] = useState(null); // null = root
  const [detailBagian,   setDetailBagian]   = useState(null); // { eselon, bagian }

  const [search,          setSearch]          = useState("");
  const [showTambahModal, setShowTambahModal] = useState(false);
  const [form,            setForm]            = useState(emptyForm());

  const today = new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });

  const activeEselon = struktur.find(e => e.id === activeEselonId) || null;

  // Derived untuk form
  const eselonForm = struktur.find(e => e.id === form.eselonId) || null;
  const bagianForm = eselonForm ? eselonForm.bagian.find(b => b.id === form.bagianId) : null;

  // ── Form helpers ─────────────────────────────────────────────────────────────
  const tambahBarangForm = () => setForm(f => ({ ...f, barang: [...f.barang, { nama: "", nup: "", kondisi: "Baik" }] }));
  const hapusBarangForm  = (i) => { if (form.barang.length === 1) return; setForm(f => ({ ...f, barang: f.barang.filter((_, idx) => idx !== i) })); };
  const updateBarangForm = (i, field, val) => setForm(f => ({ ...f, barang: f.barang.map((b, idx) => idx === i ? { ...b, [field]: val } : b) }));

  // ── Submit ────────────────────────────────────────────────────────────────────
  const handleSubmit = () => {
    if (!form.eselonId || !form.bagianId || !form.pegawai || !form.nip) return;
    const valid = form.barang.filter(b => b.nama && b.nup);
    if (valid.length === 0) return;

    setStruktur(prev => prev.map(es => {
      if (es.id !== form.eselonId) return es;
      return {
        ...es,
        bagian: es.bagian.map(bg => {
          if (bg.id !== form.bagianId) return bg;
          const nextId = Math.max(0, ...prev.flatMap(e => e.bagian.flatMap(b => b.barang.map(br => br.id)))) + 1;
          const tambahan = valid.map((b, i) => ({
            id: nextId + i,
            no: bg.barang.length + i + 1,
            nama: b.nama, nup: b.nup, kondisi: b.kondisi,
            pegawai: form.pegawai, nip: form.nip,
          }));
          return { ...bg, barang: [...bg.barang, ...tambahan] };
        }),
      };
    }));

    setShowTambahModal(false);
    setForm(emptyForm());
  };

  // ── Pencarian global ──────────────────────────────────────────────────────────
  const semuaBagianFlat = struktur.flatMap(es =>
    es.bagian.map(bg => ({ eselon: es, bagian: bg }))
  );
  const hasilCari = search.trim()
    ? semuaBagianFlat.filter(({ eselon, bagian }) =>
        bagian.nama.toLowerCase().includes(search.toLowerCase()) ||
        eselon.nama.toLowerCase().includes(search.toLowerCase()) ||
        bagian.barang.some(b =>
          b.nama.toLowerCase().includes(search.toLowerCase()) ||
          (b.pegawai || "").toLowerCase().includes(search.toLowerCase())
        )
      )
    : null;

  // ── Breadcrumb ────────────────────────────────────────────────────────────────
  const Breadcrumb = () => (
    <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#64748b", marginBottom: 14, flexWrap: "wrap" }}>
      <button
        onClick={() => setActiveEselonId(null)}
        style={{ background: "none", border: "none", cursor: "pointer", color: activeEselon ? "#2563eb" : "#1e293b", fontWeight: activeEselon ? 600 : 700, padding: 0, fontSize: 12 }}
      >
        Ditjen Bimas Kristen
      </button>
      {activeEselon && (
        <>
          <span>›</span>
          <span style={{ color: "#1e293b", fontWeight: 700 }}>{activeEselon.nama}</span>
        </>
      )}
    </div>
  );

  // ── KotakCard ─────────────────────────────────────────────────────────────────
  const KotakCard = ({ title, label, subtitle, badge, warna = "#2563eb", warnaBg = "#eff6ff", onClick }) => (
    <div
      onClick={onClick}
      style={{
        background: "#fff", border: "1.5px solid #e2e8f0", borderRadius: 12,
        padding: "18px 20px", cursor: "pointer",
        transition: "box-shadow 0.15s, border-color 0.15s, transform 0.15s",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = `0 4px 16px ${warna}22`;
        e.currentTarget.style.borderColor = warna;
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.borderColor = "#e2e8f0";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {label && (
        <div style={{ fontSize: 10, fontWeight: 700, color: warna, background: warnaBg, padding: "2px 8px", borderRadius: 20, display: "inline-block", marginBottom: 8, letterSpacing: 0.5 }}>
          {label}
        </div>
      )}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: 14, color: "#1e293b", marginBottom: 3 }}>{title}</div>
          {subtitle && <div style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}>{subtitle}</div>}
        </div>
        <div style={{ color: warna, flexShrink: 0, marginLeft: 10 }}><IconDoc /></div>
      </div>
      {badge !== undefined && (
        <div style={{ background: warnaBg, color: warna, padding: "3px 10px", borderRadius: 6, fontSize: 11, fontWeight: 700, display: "inline-block", marginTop: 10 }}>
          {badge}
        </div>
      )}
    </div>
  );

  // ── Modal Detail Bagian (lihat & cetak barang) ────────────────────────────────
  const renderDetailBagian = () => {
    if (!detailBagian) return null;
    const { eselon, bagian } = detailBagian;
    return (
      <Modal title={`DBR — ${bagian.nama}`} onClose={() => setDetailBagian(null)} wide>
        <div id="dbr-detail-print">
          <div style={{ textAlign: "center", borderBottom: "2px solid #1e293b", paddingBottom: 10, marginBottom: 16 }}>
            <div style={{ fontWeight: 800, fontSize: 13 }}>KEMENTERIAN AGAMA REPUBLIK INDONESIA</div>
            <div style={{ fontSize: 11, color: "#64748b" }}>Direktorat Jenderal Bimbingan Masyarakat Kristen</div>
            <div style={{ fontSize: 11, color: "#64748b", marginTop: 2 }}>{eselon.nama}</div>
            <div style={{ fontWeight: 700, fontSize: 13, marginTop: 8, letterSpacing: 0.5 }}>
              DAFTAR BARANG RUANGAN (DBR)
            </div>
          </div>

          <div style={{ background: "#f8fafc", borderRadius: 8, padding: 14, marginBottom: 14, fontSize: 13 }}>
            {[
              ["Unit (Eselon II)", eselon.nama],
              ["Bagian / Subdit",  bagian.nama],
              ["Tanggal Cetak",    today],
            ].map(([k, v]) => (
              <div key={k} style={{ display: "flex", gap: 8, marginBottom: 4 }}>
                <span style={{ fontWeight: 600, width: 140, flexShrink: 0, color: "#475569" }}>{k}</span>
                <span style={{ flexShrink: 0, color: "#475569" }}>:</span>
                <span style={{ color: "#1e293b", fontWeight: 600 }}>{v}</span>
              </div>
            ))}
          </div>

          {bagian.barang.length === 0 ? (
            <div style={{ textAlign: "center", padding: "24px 0", color: "#94a3b8", fontSize: 13 }}>
              Belum ada barang yang terdaftar di bagian ini.
            </div>
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
                {bagian.barang.map((b, i) => (
                  <tr key={b.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                    <td style={{ padding: "8px 12px", color: "#64748b" }}>{b.no || i + 1}</td>
                    <td style={{ padding: "8px 12px", color: "#1e293b", fontWeight: 600 }}>{b.nama}</td>
                    <td style={{ padding: "8px 12px", color: "#64748b", fontFamily: "monospace", fontSize: 12, whiteSpace: "nowrap" }}>{b.nup || "-"}</td>
                    <td style={{ padding: "8px 12px" }}><StatusBadge status={b.kondisi} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginTop: 8, marginBottom: 14 }}>
            <div style={{ textAlign: "center", minWidth: 200 }}>
              <div style={{ fontWeight: 600 }}>Mengetahui,</div>
              <div style={{ fontSize: 12, color: "#64748b" }}>Kasubbag Perlengkapan dan BMN</div>
              <div style={{ height: 52 }} />
              <div style={{ borderTop: "1.5px solid #1e293b", paddingTop: 6 }}>
                <div style={{ color: "#94a3b8" }}>(________________________)</div>
                <div style={{ color: "#64748b", fontSize: 12 }}>NIP. .............................</div>
              </div>
            </div>
            <div style={{ textAlign: "center", minWidth: 220 }}>
              <div>Jakarta, {today}</div>
              <div style={{ fontWeight: 600 }}>Penanggung Jawab Ruangan,</div>
              <div style={{ height: 52 }} />
              <div style={{ borderTop: "1.5px solid #1e293b", paddingTop: 6 }}>
                <div style={{ color: "#94a3b8" }}>(________________________)</div>
                <div style={{ color: "#64748b", fontSize: 12 }}>NIP. .............................</div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", flexWrap: "wrap" }}>
          <AdminButton variant="outline" onClick={() => setDetailBagian(null)}>Tutup</AdminButton>
          <AdminButton variant="outline" onClick={() => window.print()}>🖨 Print</AdminButton>
          <AdminButton variant="success" onClick={() => downloadAsPDF("dbr-detail-print", `DBR-${bagian.nama}`)}>💾 Simpan PDF</AdminButton>
        </div>
      </Modal>
    );
  };

  // ── Modal Tambah DBR ──────────────────────────────────────────────────────────
  const renderTambahModal = () => (
    <Modal title="Tambah DBR" onClose={() => { setShowTambahModal(false); setForm(emptyForm()); }} wide>
      <div style={{ fontSize: 13, fontWeight: 700, color: "#2563eb", marginBottom: 12, paddingBottom: 8, borderBottom: "1px solid #e2e8f0" }}>
        Lokasi Bagian
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 4 }}>
        <FormGroup label="Unit (Eselon II)">
          <select style={inputStyle} value={form.eselonId}
            onChange={e => setForm(f => ({ ...f, eselonId: e.target.value, bagianId: "" }))}>
            <option value="">Pilih unit...</option>
            {struktur.map(es => <option key={es.id} value={es.id}>{es.nama}</option>)}
          </select>
        </FormGroup>
        <FormGroup label="Bagian / Subdit">
          <select style={inputStyle} value={form.bagianId} disabled={!eselonForm}
            onChange={e => setForm(f => ({ ...f, bagianId: e.target.value }))}>
            <option value="">Pilih bagian...</option>
            {eselonForm?.bagian.map(bg => <option key={bg.id} value={bg.id}>{bg.nama}</option>)}
          </select>
        </FormGroup>
      </div>

      <div style={{ fontSize: 13, fontWeight: 700, color: "#2563eb", margin: "16px 0 12px", paddingBottom: 8, borderBottom: "1px solid #e2e8f0" }}>
        Data Pegawai (Penanggung Jawab Barang)
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        <FormGroup label="Nama Pegawai">
          <input style={inputStyle} value={form.pegawai}
            onChange={e => setForm(f => ({ ...f, pegawai: e.target.value }))}
            placeholder="Nama lengkap pegawai" />
        </FormGroup>
        <FormGroup label="NIP">
          <input style={inputStyle} value={form.nip}
            onChange={e => setForm(f => ({ ...f, nip: e.target.value }))}
            placeholder="Nomor Induk Pegawai" />
        </FormGroup>
      </div>

      <div style={{ fontSize: 13, fontWeight: 700, color: "#2563eb", margin: "16px 0 12px", paddingBottom: 8, borderBottom: "1px solid #e2e8f0" }}>
        Daftar Barang
      </div>
      {form.barang.map((b, i) => (
        <div key={i} style={{ display: "grid", gridTemplateColumns: "2fr 1.5fr 1fr auto", gap: 10, marginBottom: 10, alignItems: "flex-end" }}>
          <FormGroup label={i === 0 ? "Nama Barang" : ""}>
            <input style={inputStyle} value={b.nama}
              onChange={e => updateBarangForm(i, "nama", e.target.value)}
              placeholder="Nama barang" />
          </FormGroup>
          <FormGroup label={i === 0 ? "NUP" : ""}>
            <input style={inputStyle} value={b.nup}
              onChange={e => updateBarangForm(i, "nup", e.target.value)}
              placeholder="3.XX.XX.XX.XXX.XXX" />
          </FormGroup>
          <FormGroup label={i === 0 ? "Kondisi" : ""}>
            <select style={inputStyle} value={b.kondisi}
              onChange={e => updateBarangForm(i, "kondisi", e.target.value)}>
              <option>Baik</option>
              <option>Rusak Ringan</option>
              <option>Rusak Berat</option>
            </select>
          </FormGroup>
          <button onClick={() => hapusBarangForm(i)} disabled={form.barang.length === 1}
            style={{ padding: "9px 10px", border: "1.5px solid #fee2e2", borderRadius: 8, background: "#fff", cursor: form.barang.length === 1 ? "not-allowed" : "pointer", color: "#dc2626", opacity: form.barang.length === 1 ? 0.3 : 1, marginBottom: 14 }}>
            <IconTrash />
          </button>
        </div>
      ))}

      <button onClick={tambahBarangForm}
        style={{ display: "flex", alignItems: "center", gap: 6, border: "1.5px dashed #2563eb", borderRadius: 8, background: "#eff6ff", color: "#2563eb", padding: "8px 16px", fontWeight: 600, fontSize: 13, cursor: "pointer", width: "100%", justifyContent: "center", marginBottom: 14 }}>
        <IconPlus /> Tambah Barang
      </button>

      <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
        <AdminButton variant="outline" onClick={() => { setShowTambahModal(false); setForm(emptyForm()); }}>Batal</AdminButton>
        <AdminButton onClick={handleSubmit}>Simpan DBR</AdminButton>
      </div>
    </Modal>
  );

  // ── Header ────────────────────────────────────────────────────────────────────
  const renderHeader = () => (
    <AdminHeaderCard
      title="DBR — Daftar Barang Ruangan"
      subtitle="Inventaris barang per bagian — Ditjen Bimbingan Masyarakat Kristen"
      search={search}
      onSearchChange={v => { setSearch(v); setActiveEselonId(null); }}
      searchPlaceholder="Cari bagian, unit, barang, pegawai..."
      rightAction={
        <AdminButton onClick={() => setShowTambahModal(true)} style={{ background: "#fff", color: "#2563eb", whiteSpace: "nowrap" }}>
          + Tambah DBR
        </AdminButton>
      }
    />
  );

  // ── TAMPILAN: Hasil Pencarian ─────────────────────────────────────────────────
  if (search.trim()) {
    return (
      <div>
        {renderHeader()}
        <div style={{ fontSize: 12, color: "#64748b", marginBottom: 12 }}>
          {hasilCari.length} bagian ditemukan
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          {hasilCari.map(({ eselon, bagian }) => (
            <KotakCard
              key={bagian.id}
              title={bagian.nama}
              subtitle={eselon.nama}
              badge={`${bagian.barang.length} barang`}
              warna={eselon.warna}
              warnaBg={eselon.warnaBg}
              onClick={() => setDetailBagian({ eselon, bagian })}
            />
          ))}
          {hasilCari.length === 0 && (
            <div style={{ color: "#94a3b8", fontSize: 13, gridColumn: "1/-1", textAlign: "center", padding: 30 }}>
              Tidak ada bagian yang cocok.
            </div>
          )}
        </div>
        {detailBagian && renderDetailBagian()}
        {showTambahModal && renderTambahModal()}
      </div>
    );
  }

  // ── TAMPILAN: Level Bagian (sudah pilih eselon) ───────────────────────────────
  if (activeEselon) {
    return (
      <div>
        {renderHeader()}
        <Breadcrumb />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          {activeEselon.bagian.map(bg => (
            <KotakCard
              key={bg.id}
              title={bg.nama}
              badge={`${bg.barang.length} barang terdaftar`}
              warna={activeEselon.warna}
              warnaBg={activeEselon.warnaBg}
              onClick={() => setDetailBagian({ eselon: activeEselon, bagian: bg })}
            />
          ))}
        </div>
        {detailBagian && renderDetailBagian()}
        {showTambahModal && renderTambahModal()}
      </div>
    );
  }

  // ── TAMPILAN: Root — 3 Eselon II ─────────────────────────────────────────────
  return (
    <div>
      {renderHeader()}
      <div style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", marginBottom: 12, letterSpacing: 0.8 }}>
        DIREKTORAT JENDERAL BIMBINGAN MASYARAKAT KRISTEN — KEMENTERIAN AGAMA RI
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
        {struktur.map(es => (
          <KotakCard
            key={es.id}
            label={es.label}
            title={es.nama}
            subtitle={`${es.bagian.length} bagian/subdit`}
            badge={`${totalBarangEselon(es)} barang terdaftar`}
            warna={es.warna}
            warnaBg={es.warnaBg}
            onClick={() => setActiveEselonId(es.id)}
          />
        ))}
      </div>
      {detailBagian && renderDetailBagian()}
      {showTambahModal && renderTambahModal()}
    </div>
  );
};

export default DBRAdmin;