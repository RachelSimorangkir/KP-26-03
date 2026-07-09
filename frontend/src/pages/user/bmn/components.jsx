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
        <h3 style={{ margin: 0, color: "#1e3a5f", fontSize: 18, fontWeight: 700, textAlign: "left" }}>{title}</h3>
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
    <label style={{ display: "block", marginBottom: 5, fontSize: 12, fontWeight: 600, color: "#374151", textAlign: "left" }}>{label}</label>
    {children}
  </div>
);

// ─── STOK CARD ────────────────────────────────────────────────────────────────
export const StokCard = ({ items, title = "Informasi Stok" }) => (
  <div style={{ background: "#fff", borderRadius: 10, border: "1px solid #e2e8f0", padding: 20, marginBottom: 20 }}>
    <div style={{ fontWeight: 700, color: "#1e3a5f", fontSize: 14, marginBottom: 14, textAlign: "left" }}>{title}</div>
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
export const SidebarLayout = ({ menuItems, activePage, setActivePage, role, userName, onBack, onLogout, children }) => (
  <div style={{ display: "flex", minHeight: "100vh", fontFamily: "'Segoe UI', sans-serif", background: "#f1f5f9" }}>
    <aside style={{ width: 200, background: "#1e293b", display: "flex", flexDirection: "column", flexShrink: 0, position: "sticky", top: 0, height: "100vh", overflowY: "auto" }}>
      <div style={{ padding: "18px 16px 12px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ fontWeight: 800, fontSize: 14, color: "#fff", textAlign: "left" }}>Portal BMN</div>
        <div style={{ fontSize: 10, color: "#94a3b8", textAlign: "left" }}>Bimas Kristen — Kemenag RI</div>
      </div>
      <nav style={{ padding: "12px 10px 0", flex: 1 }}>
        <div style={{ fontSize: 9, fontWeight: 700, color: "#64748b", padding: "4px 8px 6px", letterSpacing: 1, textAlign: "left" }}>
          {role === "admin" ? "MENU ADMIN BMN" : "MENU LAYANAN BMN"}
        </div>
        {menuItems.map(m => (
          <button key={m.key} onClick={() => setActivePage(m.key)}
            style={{
              display: "flex", alignItems: "center", gap: 8, width: "100%",
              padding: "8px 10px", border: "none", borderRadius: 6, cursor: "pointer",
              fontSize: 12, fontWeight: 600, textAlign: "left", marginBottom: 3,
              background: activePage === m.key ? "#2563eb" : "transparent",
              color: activePage === m.key ? "#fff" : "#cbd5e1",
              transition: "background 0.15s",
            }}
            onMouseEnter={e => { if (activePage !== m.key) e.currentTarget.style.background = "rgba(255,255,255,0.06)"; }}
            onMouseLeave={e => { if (activePage !== m.key) e.currentTarget.style.background = "transparent"; }}
          >
            <span style={{ color: activePage === m.key ? "#fff" : "#94a3b8", display: "flex" }}>{m.icon}</span>
            {m.label}
          </button>
        ))}
      </nav>
      {(onBack || onLogout) && (
        <div style={{ padding: 10, borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          {onBack && (
            <button onClick={onBack} style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "8px 10px", border: "none", borderRadius: 6, cursor: "pointer", fontSize: 12, fontWeight: 600, textAlign: "left", color: "#cbd5e1", background: "transparent", marginBottom: 2 }}>
              ← Kembali ke Menu
            </button>
          )}
          {onLogout && (
            <button onClick={onLogout} style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "8px 10px", border: "none", borderRadius: 6, cursor: "pointer", fontSize: 12, fontWeight: 600, textAlign: "left", color: "#f87171", background: "transparent" }}>
              ⏻ Keluar
            </button>
          )}
        </div>
      )}
    </aside>
    <main style={{ flex: 1, padding: 20, overflowY: "auto", fontSize: 13, textAlign: "left" }}>
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

// ─── QR CODE NIP ─────────────────────────────────────────────────────────────
import React from "react";
import QRCode from "qrcode";

export const BarcodeNIP = ({ value }) => {
  const [dataUrl, setDataUrl] = React.useState("");

  React.useEffect(() => {
    QRCode.toDataURL(value, { width: 80, margin: 1, color: { dark: "#1e293b", light: "#ffffff" } })
      .then(url => setDataUrl(url));
  }, [value]);

  return (
    <div style={{ textAlign: "center" }}>
      {dataUrl && <img src={dataUrl} alt="QR NIP" style={{ width: 80, height: 80 }} />}
      <div style={{ fontFamily: "monospace", fontSize: 12, letterSpacing: 2, color: "#1e293b", marginTop: 4 }}>{value}</div>
    </div>
  );
};

// ─── DOWNLOAD AS PDF ──────────────────────────────────────────────────────────
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

// ─── ADMIN SIDEBAR LAYOUT ─────────────────────────────────────────────────────
export const AdminSidebarLayout = ({ menuItems, activePage, setActivePage, userName, onBack, onLogout, children }) => (
  <div style={{ display: "flex", minHeight: "100vh", fontFamily: "'Segoe UI', sans-serif", background: "#f1f5f9" }}>
    <aside style={{ width: 200, background: "#1e293b", display: "flex", flexDirection: "column", flexShrink: 0, position: "sticky", top: 0, height: "100vh", overflowY: "auto" }}>
      <div style={{ padding: "18px 16px 12px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ fontWeight: 800, fontSize: 14, color: "#fff", textAlign: "left" }}>Portal BMN</div>
        <div style={{ fontSize: 10, color: "#94a3b8", textAlign: "left" }}>Bimas Kristen — Kemenag RI</div>
      </div>
      <nav style={{ padding: "12px 10px 0", flex: 1 }}>
        <div style={{ fontSize: 9, fontWeight: 700, color: "#64748b", padding: "4px 8px 6px", letterSpacing: 1, textAlign: "left" }}>
          MENU ADMIN BMN
        </div>
        {menuItems.map(m => (
          <button key={m.key} onClick={() => setActivePage(m.key)}
            style={{
              display: "flex", alignItems: "center", gap: 8, width: "100%",
              padding: "8px 10px", border: "none", borderRadius: 6, cursor: "pointer",
              fontSize: 12, fontWeight: 600, textAlign: "left", marginBottom: 3,
              background: activePage === m.key ? "#2563eb" : "transparent",
              color: activePage === m.key ? "#fff" : "#cbd5e1",
              transition: "background 0.15s",
            }}
            onMouseEnter={e => { if (activePage !== m.key) e.currentTarget.style.background = "rgba(255,255,255,0.06)"; }}
            onMouseLeave={e => { if (activePage !== m.key) e.currentTarget.style.background = "transparent"; }}
          >
            <span style={{ color: activePage === m.key ? "#fff" : "#94a3b8", display: "flex" }}>{m.icon}</span>
            {m.label}
          </button>
        ))}
      </nav>
      {(onBack || onLogout) && (
        <div style={{ padding: 10, borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          {onBack && (
            <button onClick={onBack} style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "8px 10px", border: "none", borderRadius: 6, cursor: "pointer", fontSize: 12, fontWeight: 600, textAlign: "left", color: "#cbd5e1", background: "transparent", marginBottom: 2 }}>
              ← Kembali ke Menu
            </button>
          )}
          {onLogout && (
            <button onClick={onLogout} style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "8px 10px", border: "none", borderRadius: 6, cursor: "pointer", fontSize: 12, fontWeight: 600, textAlign: "left", color: "#f87171", background: "transparent" }}>
              ⏻ Keluar
            </button>
          )}
        </div>
      )}
    </aside>
    <main style={{ flex: 1, padding: 20, overflowY: "auto", fontSize: 13, textAlign: "left" }}>
      {children}
    </main>
  </div>
);

// ─── ADMIN HEADER CARD ────────────────────────────────────────────────────────
export const AdminHeaderCard = ({ title, subtitle, search, onSearchChange, searchPlaceholder, rightAction }) => (
  <div style={{
    background: "linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)",
    borderRadius: 10, padding: "18px 22px", marginBottom: 18,
    display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12,
  }}>
    {/* ← textAlign: left ditambahkan di sini agar judul & subtitle tidak center */}
    <div style={{ textAlign: "left" }}>
      <h2 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: "#fff" }}>{title}</h2>
      {subtitle && <p style={{ margin: "4px 0 0", color: "rgba(255,255,255,0.8)", fontSize: 12 }}>{subtitle}</p>}
    </div>
    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
      {onSearchChange && (
        <input
          value={search}
          onChange={e => onSearchChange(e.target.value)}
          placeholder={searchPlaceholder || "Cari..."}
          style={{
            padding: "8px 12px", borderRadius: 8, border: "none", fontSize: 12,
            width: 200, outline: "none", boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        />
      )}
      {rightAction}
    </div>
  </div>
);

// ─── ADMIN CARD ───────────────────────────────────────────────────────────────
export const AdminCard = ({ children, style }) => (
  <div style={{ background: "#fff", borderRadius: 10, padding: 16, boxShadow: "0 1px 3px rgba(0,0,0,0.06)", border: "1px solid #f1f5f9", textAlign: "left", ...style }}>
    {children}
  </div>
);

// ─── ADMIN STAT CARD ──────────────────────────────────────────────────────────
export const AdminStatCard = ({ value, label, color = "#2563eb", bg = "#eff6ff" }) => (
  <div style={{ background: bg, borderRadius: 8, padding: "12px 16px", flex: 1 }}>
    <div style={{ fontSize: 20, fontWeight: 800, color, textAlign: "left" }}>{value}</div>
    <div style={{ fontSize: 11, color, fontWeight: 600, marginTop: 1, textAlign: "left" }}>{label}</div>
  </div>
);

// ─── ADMIN TABLE ──────────────────────────────────────────────────────────────
export const AdminTable = ({ headers, children }) => (
  <div style={{ overflowX: "auto" }}>
    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
      <thead>
        <tr>
          {headers.map(h => (
            <th key={h} style={{ padding: "8px 12px", textAlign: "left", fontWeight: 700, color: "#64748b", fontSize: 11, letterSpacing: 0.3, borderBottom: "2px solid #f1f5f9", whiteSpace: "nowrap" }}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  </div>
);

// ─── ADMIN BUTTON ─────────────────────────────────────────────────────────────
export const AdminButton = ({ children, onClick, variant = "primary", style }) => {
  const variants = {
    primary:   { bg: "#2563eb", color: "#fff" },
    success:   { bg: "#16a34a", color: "#fff" },
    danger:    { bg: "#dc2626", color: "#fff" },
    outline:   { bg: "#fff", color: "#2563eb", border: "1.5px solid #2563eb" },
  };
  const v = variants[variant] || variants.primary;
  return (
    <button onClick={onClick} style={{
      display: "flex", alignItems: "center", gap: 5, padding: "6px 12px",
      background: v.bg, color: v.color, border: v.border || "none",
      borderRadius: 6, fontWeight: 600, fontSize: 12, cursor: "pointer", ...style,
    }}>
      {children}
    </button>
  );
};