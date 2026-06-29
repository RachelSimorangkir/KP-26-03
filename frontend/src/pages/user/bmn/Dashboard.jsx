import { IconBox, IconClipboard, IconTruck, IconList, IconTool } from "./components";

// Icon Hibah Masuk
const IconHibahMasuk = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M12 3v13"/>
    <polyline points="5 13 12 20 19 13"/>
    <path d="M5 3h14"/>
  </svg>
);

// Icon Hibah Keluar
const IconHibahKeluar = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M12 21V8"/>
    <polyline points="5 11 12 4 19 11"/>
    <path d="M5 21h14"/>
  </svg>
);

const Dashboard = ({ setActivePage }) => {
  const stats = [
    { icon: <IconBox />,         value: "1.247", label: "Total Barang",           sub: "unit terdaftar",        color: "#1d4ed8" },
    { icon: <IconTruck />,       value: "23",    label: "Peminjaman Aktif",        sub: "sedang dipinjam",       color: "#16a34a" },
    { icon: <IconClipboard />,   value: "8",     label: "Permintaan Pending",      sub: "menunggu persetujuan",  color: "#a16207" },
    { icon: <IconTruck />,       value: "45",    label: "Barang Masuk Bulan Ini",  sub: "unit diterima",         color: "#7c3aed" },
    { icon: <IconHibahMasuk />,  value: "3",     label: "Hibah Masuk Bulan Ini",   sub: "unit diterima hibah",   color: "#0891b2" },
    { icon: <IconHibahKeluar />, value: "2",     label: "Hibah Keluar Bulan Ini",  sub: "unit dihibahkan",       color: "#b45309" },
  ];

  const menus = [
    { key: "peminjaman",   icon: <IconBox />,         label: "Proses Peminjaman Barang",  desc: "Kelola data peminjaman barang milik negara",               color: "#1d4ed8" },
    { key: "permintaan",   icon: <IconClipboard />,   label: "Permintaan Barang",         desc: "Pengajuan permintaan barang dari pegawai",                 color: "#a16207" },
    { key: "masuk",        icon: <IconTruck />,       label: "Proses Barang Masuk",       desc: "Penerimaan dan pencatatan barang pengadaan",               color: "#7c3aed" },
    { key: "hibah-masuk",  icon: <IconHibahMasuk />,  label: "Hibah Masuk",               desc: "Pencatatan barang masuk melalui hibah dari instansi lain", color: "#0891b2" },
    { key: "hibah-keluar", icon: <IconHibahKeluar />, label: "Hibah Keluar",              desc: "Pencatatan barang yang dihibahkan ke instansi lain",        color: "#b45309" },
    { key: "dbr",          icon: <IconList />,        label: "DBR (Daftar Barang Ruang)", desc: "Inventaris barang per pegawai dan ruangan",                color: "#16a34a" },
    { key: "pemeliharaan", icon: <IconTool />,        label: "Pemeliharaan Barang",       desc: "Laporan dan tindak lanjut perbaikan barang",               color: "#0891b2" },
  ];

  return (
    <div>
      {/* Welcome Banner */}
      <div style={{ background: "linear-gradient(135deg, #1e3a5f 0%, #2563eb 100%)", borderRadius: 10, padding: "20px 24px", marginBottom: 20, color: "#fff" }}>
        <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 3 }}>Selamat Datang di Sistem BMN</div>
        <div style={{ fontSize: 12, opacity: 0.85 }}>Bimas Kristen — Kementerian Agama Republik Indonesia</div>
        <div style={{ fontSize: 11, opacity: 0.7, marginTop: 4 }}>
          {new Date().toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
        {stats.map((s, i) => (
          <div key={i} style={{ background: "#fff", borderRadius: 8, padding: "14px 18px", border: "1px solid #e2e8f0" }}>
            <div style={{ color: s.color, marginBottom: 6 }}>{s.icon}</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#1e293b" }}>{s.label}</div>
            <div style={{ fontSize: 11, color: "#94a3b8" }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Menu Cards */}
      <h3 style={{ fontSize: 13, fontWeight: 700, color: "#1e3a5f", marginBottom: 10, marginTop: 0 }}>Pilih Layanan BMN</h3>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {menus.map((m) => (
          <div
            key={m.key}
            onClick={() => setActivePage(m.key)}
            style={{ background: "#fff", border: "1.5px solid #e2e8f0", borderRadius: 8, padding: "14px 16px", cursor: "pointer", transition: "border-color 0.15s" }}
            onMouseEnter={e => e.currentTarget.style.borderColor = m.color}
            onMouseLeave={e => e.currentTarget.style.borderColor = "#e2e8f0"}
          >
            <div style={{ color: m.color, marginBottom: 7 }}>{m.icon}</div>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#1e3a5f", marginBottom: 3 }}>{m.label}</div>
            <div style={{ fontSize: 11, color: "#64748b" }}>{m.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;