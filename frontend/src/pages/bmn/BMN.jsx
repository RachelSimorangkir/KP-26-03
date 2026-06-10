import { useState } from "react";
import { IconBox, IconClipboard, IconTruck, IconList } from "./components";
import Dashboard from "./Dashboard";
import PeminjamanBarang from "./PeminjamanBarang";
import PermintaanBarang from "./PermintaanBarang";
import BarangMasuk from "./BarangMasuk";
import DBR from "./DBR";

const menuItems = [
  { key: "dashboard",  icon: <IconBox />,       label: "Dashboard BMN" },
  { key: "peminjaman", icon: <IconBox />,        label: "Proses Peminjaman Barang" },
  { key: "permintaan", icon: <IconClipboard />,  label: "Permintaan Barang" },
  { key: "masuk",      icon: <IconTruck />,      label: "Proses Barang Masuk" },
  { key: "dbr",        icon: <IconList />,       label: "DBR (Daftar Barang Ruang)" },
];

const BMN = () => {
  const [activePage, setActivePage] = useState("dashboard");

  const renderPage = () => {
    switch (activePage) {
      case "dashboard":  return <Dashboard setActivePage={setActivePage} />;
      case "peminjaman": return <PeminjamanBarang />;
      case "permintaan": return <PermintaanBarang />;
      case "masuk":      return <BarangMasuk />;
      case "dbr":        return <DBR />;
      default:           return <Dashboard setActivePage={setActivePage} />;
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "'Segoe UI', sans-serif", background: "#f1f5f9" }}>
      {/* Sidebar */}
      <aside style={{ width: 240, background: "#fff", borderRight: "1.5px solid #e2e8f0", display: "flex", flexDirection: "column", flexShrink: 0 }}>
        <div style={{ padding: "24px 20px 16px", borderBottom: "1px solid #e2e8f0" }}>
          <div style={{ fontWeight: 800, fontSize: 16, color: "#1e3a5f" }}>Portal</div>
          <div style={{ fontSize: 12, color: "#64748b" }}>Layanan Internal</div>
        </div>
        <nav style={{ padding: "12px 12px 0" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", padding: "8px 8px 4px", letterSpacing: 1 }}>MENU BMN</div>
          {menuItems.map(m => (
            <button key={m.key} onClick={() => setActivePage(m.key)}
              style={{
                display: "flex", alignItems: "center", gap: 10, width: "100%",
                padding: "10px 12px", border: "none", borderRadius: 8, cursor: "pointer",
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

      {/* Main Content */}
      <main style={{ flex: 1, padding: 32, overflowY: "auto" }}>
        {renderPage()}
      </main>
    </div>
  );
};

export default BMN;