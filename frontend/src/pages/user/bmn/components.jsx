// ─── ICONS ────────────────────────────────────────────────────────────────────
export const IconBox = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
  </svg>
);
export const IconClipboard = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
    <rect x="8" y="2" width="8" height="4" rx="1"/>
  </svg>
);
export const IconTruck = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
    <circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
  </svg>
);
export const IconList = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/>
    <line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
  </svg>
);
export const IconPlus = () => (
  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);
export const IconSearch = () => (
  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);
export const IconDoc = () => (
  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
  </svg>
);
export const IconTrash = () => (
  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/>
    <path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>
  </svg>
);
export const IconEye = () => (
  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
  </svg>
);
export const IconCheck = () => (
  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
export const IconX = () => (
  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);
export const IconReturn = () => (
  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <polyline points="9 14 4 9 9 4"/><path d="M20 20v-7a4 4 0 0 0-4-4H4"/>
  </svg>
);

// ─── STATUS BADGE ─────────────────────────────────────────────────────────────
export const StatusBadge = ({ status }) => {
  const map = {
    "Dipinjam":      { bg: "#dbeafe", color: "#1d4ed8" },
    "Dikembalikan":  { bg: "#dcfce7", color: "#16a34a" },
    "Diajukan":      { bg: "#fef9c3", color: "#a16207" },
    "Disetujui":     { bg: "#dcfce7", color: "#16a34a" },
    "Ditolak":       { bg: "#fee2e2", color: "#dc2626" },
    "Pending":       { bg: "#fef9c3", color: "#a16207" },
    "Baik":          { bg: "#dcfce7", color: "#16a34a" },
    "Rusak Ringan":  { bg: "#fef9c3", color: "#a16207" },
    "Rusak Berat":   { bg: "#fee2e2", color: "#dc2626" },
  };
  const s = map[status] || { bg: "#f1f5f9", color: "#475569" };
  return (
    <span style={{ background: s.bg, color: s.color, padding: "3px 10px", borderRadius: 20, fontSize: 12, fontWeight: 600, whiteSpace: "nowrap" }}>
      {status}
    </span>
  );
};

// ─── MODAL ────────────────────────────────────────────────────────────────────
export const Modal = ({ title, onClose, children, wide }) => (
  <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
    <div style={{ background: "#fff", borderRadius: 12, padding: 32, width: wide ? 720 : 520, maxWidth: "95vw", maxHeight: "90vh", overflowY: "auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h3 style={{ margin: 0, color: "#1e3a5f", fontSize: 18, fontWeight: 700 }}>{title}</h3>
        <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer", color: "#64748b" }}>×</button>
      </div>
      {children}
    </div>
  </div>
);

// ─── FORM HELPERS ─────────────────────────────────────────────────────────────
export const inputStyle = {
  width: "100%", padding: "9px 12px", border: "1.5px solid #e2e8f0", borderRadius: 8,
  fontSize: 13, outline: "none", boxSizing: "border-box", color: "#1e293b", background: "#fff",
};

export const FormGroup = ({ label, children, half }) => (
  <div style={{ marginBottom: 14, ...(half ? { flex: 1 } : {}) }}>
    <label style={{ display: "block", marginBottom: 5, fontSize: 12, fontWeight: 600, color: "#374151" }}>{label}</label>
    {children}
  </div>
);

// ─── STOK CARD ────────────────────────────────────────────────────────────────
export const StokCard = ({ items, title = "Informasi Stok" }) => (
  <div style={{ background: "#fff", borderRadius: 10, border: "1px solid #e2e8f0", padding: 20, marginBottom: 20 }}>
    <div style={{ fontWeight: 700, color: "#1e3a5f", fontSize: 14, marginBottom: 14 }}>{title}</div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 10 }}>
      {items.map((s, i) => (
        <div key={i} style={{ background: s.stok === 0 ? "#fee2e2" : s.stok <= 2 ? "#fef9c3" : "#f8fafc", borderRadius: 8, padding: "10px 12px", textAlign: "center" }}>
          <div style={{ fontSize: 11, color: "#64748b", marginBottom: 4, lineHeight: 1.3 }}>{s.nama}</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: s.stok === 0 ? "#dc2626" : s.stok <= 2 ? "#a16207" : "#1d4ed8" }}>{s.stok}</div>
          <div style={{ fontSize: 11, color: "#94a3b8" }}>{s.satuan || "Unit"}</div>
        </div>
      ))}
    </div>
  </div>
);

// ─── SIDEBAR LAYOUT ───────────────────────────────────────────────────────────
export const SidebarLayout = ({ menuItems, activePage, setActivePage, role, userName, children }) => (
  <div style={{ display: "flex", minHeight: "100vh", fontFamily: "'Segoe UI', sans-serif", background: "#f1f5f9" }}>
    <aside style={{ width: 240, background: "#fff", borderRight: "1.5px solid #e2e8f0", display: "flex", flexDirection: "column", flexShrink: 0 }}>
      <div style={{ padding: "20px 20px 14px", borderBottom: "1px solid #e2e8f0" }}>
        <div style={{ fontWeight: 800, fontSize: 15, color: "#1e3a5f" }}>Portal BMN</div>
        <div style={{ fontSize: 11, color: "#64748b" }}>Bimas Kristen — Kemenag RI</div>
        <div style={{ marginTop: 10, background: role === "admin" ? "#fef3c7" : "#eff6ff", borderRadius: 6, padding: "6px 10px" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: role === "admin" ? "#92400e" : "#1d4ed8" }}>{role === "admin" ? "👤 Admin BMN" : "👤 User"}</div>
          <div style={{ fontSize: 12, color: "#374151", fontWeight: 600 }}>{userName}</div>
        </div>
      </div>
      <nav style={{ padding: "10px 10px 0", flex: 1 }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", padding: "8px 8px 4px", letterSpacing: 1 }}>
          {role === "admin" ? "MENU ADMIN BMN" : "MENU LAYANAN BMN"}
        </div>
        {menuItems.map(m => (
          <button key={m.key} onClick={() => setActivePage(m.key)}
            style={{
              display: "flex", alignItems: "center", gap: 10, width: "100%",
              padding: "9px 10px", border: "none", borderRadius: 8, cursor: "pointer",
              fontSize: 13, fontWeight: 600, textAlign: "left", marginBottom: 2,
              background: activePage === m.key ? "#eff6ff" : "transparent",
              color: activePage === m.key ? "#1d4ed8" : "#374151",
            }}>
            <span style={{ color: activePage === m.key ? "#1d4ed8" : "#94a3b8" }}>{m.icon}</span>
            {m.label}
          </button>
        ))}
      </nav>
    </aside>
    <main style={{ flex: 1, padding: 28, overflowY: "auto" }}>
      {children}
    </main>
  </div>
);

// ─── ICON TAMBAHAN ────────────────────────────────────────────────────────────
export const IconTool = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
  </svg>
);

// ─── BARCODE SVG SEDERHANA (Code128-like visual, bukan scannable resmi) ─────
export const BarcodeNIP = ({ value }) => {
  // Generate pola batang dari digit NIP, untuk tampilan visual saja
  const bars = value.split("").map((digit, i) => {
    const width = (parseInt(digit) % 3) + 1;
    return { width, gap: i % 2 === 0 ? 1 : 2 };
  });
  let x = 0;
  const barElements = [];
  bars.forEach((b, i) => {
    barElements.push(<rect key={i} x={x} y={0} width={b.width} height={40} fill="#1e293b" />);
    x += b.width + b.gap;
  });
  return (
    <div style={{ textAlign: "center" }}>
      <svg width={x} height={40} viewBox={`0 0 ${x} 40`} style={{ maxWidth: "100%" }}>
        {barElements}
      </svg>
      <div style={{ fontFamily: "monospace", fontSize: 12, letterSpacing: 2, color: "#1e293b", marginTop: 4 }}>{value}</div>
    </div>
  );
};

// ─── DOWNLOAD AS PDF ──────────────────────────────────────────────────────────
// Memerlukan html2canvas & jsPDF dimuat lewat CDN (lihat loadPdfLibs).
// Cara pakai: bungkus area surat dengan id unik, lalu panggil downloadAsPDF(id, filename)
let pdfLibsPromise = null;

const loadPdfLibs = () => {
  if (pdfLibsPromise) return pdfLibsPromise;
  pdfLibsPromise = new Promise((resolve, reject) => {
    const s1 = document.createElement("script");
    s1.src = "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";
    s1.onload = () => {
      const s2 = document.createElement("script");
      s2.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
      s2.onload = resolve;
      s2.onerror = reject;
      document.body.appendChild(s2);
    };
    s1.onerror = reject;
    document.body.appendChild(s1);
  });
  return pdfLibsPromise;
};

export const downloadAsPDF = async (elementId, filename = "dokumen") => {
  try {
    await loadPdfLibs();
    const el = document.getElementById(elementId);
    if (!el) return;
    const canvas = await window.html2canvas(el, { scale: 2, backgroundColor: "#ffffff" });
    const imgData = canvas.toDataURL("image/png");
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const imgWidth = pageWidth - 20;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
    pdf.save(`${filename}.pdf`);
  } catch (err) {
    console.error("Gagal membuat PDF:", err);
    alert("Gagal membuat PDF. Coba gunakan tombol Print sebagai alternatif.");
  }
};