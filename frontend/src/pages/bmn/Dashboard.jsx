import { IconBox, IconClipboard, IconTruck, IconList } from "./components";

const Dashboard = ({ setActivePage }) => {
  const stats = [
    { icon: <IconBox />, value: "1.247", label: "Total Barang", sub: "unit terdaftar", color: "#1d4ed8" },
    { icon: <IconTruck />, value: "23", label: "Peminjaman Aktif", sub: "sedang dipinjam", color: "#16a34a" },
    { icon: <IconClipboard />, value: "8", label: "Permintaan Pending", sub: "menunggu persetujuan", color: "#a16207" },
    { icon: <IconList />, value: "45", label: "Barang Masuk Bulan Ini", sub: "unit diterima", color: "#dc2626" },
  ];

  const menus = [
    { key: "peminjaman", icon: <IconBox />, label: "Proses Peminjaman Barang", desc: "Kelola data peminjaman barang milik negara" },
    { key: "permintaan", icon: <IconClipboard />, label: "Permintaan Barang", desc: "Pengajuan permintaan barang dari pegawai" },
    { key: "masuk", icon: <IconTruck />, label: "Proses Barang Masuk", desc: "Penerimaan dan pencatatan barang pengadaan" },
    { key: "dbr", icon: <IconList />, label: "DBR (Daftar Barang Ruang)", desc: "Inventaris barang per pegawai dan ruangan" },
  ];

  return (
    <div>
      {/* Welcome Banner */}
      <div style={{ background: "linear-gradient(135deg, #1e3a5f 0%, #2563eb 100%)", borderRadius: 12, padding: "28px 32px", marginBottom: 28, color: "#fff" }}>
        <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>Selamat Datang di Sistem BMN</div>
        <div style={{ fontSize: 14, opacity: 0.85 }}>Bimas Kristen — Kementerian Agama Republik Indonesia</div>
        <div style={{ fontSize: 13, opacity: 0.7, marginTop: 6 }}>
          {new Date().toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 28 }}>
        {stats.map((s, i) => (
          <div key={i} style={{ background: "#fff", borderRadius: 10, padding: "20px 24px", border: "1px solid #e2e8f0" }}>
            <div style={{ color: s.color, marginBottom: 8 }}>{s.icon}</div>
            <div style={{ fontSize: 28, fontWeight: 800, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#1e293b" }}>{s.label}</div>
            <div style={{ fontSize: 12, color: "#94a3b8" }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Menu Cards */}
      <h3 style={{ fontSize: 16, fontWeight: 700, color: "#1e3a5f", marginBottom: 14 }}>Pilih Layanan BMN</h3>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        {menus.map((m) => (
          <div key={m.key} onClick={() => setActivePage(m.key)}
            style={{ background: "#fff", border: "1.5px solid #e2e8f0", borderRadius: 10, padding: 20, cursor: "pointer" }}
            onMouseEnter={e => e.currentTarget.style.borderColor = "#2563eb"}
            onMouseLeave={e => e.currentTarget.style.borderColor = "#e2e8f0"}
          >
            <div style={{ color: "#16a34a", marginBottom: 10 }}>{m.icon}</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#1e3a5f", marginBottom: 4 }}>{m.label}</div>
            <div style={{ fontSize: 12, color: "#64748b" }}>{m.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;