const ServiceSelection = ({ user, onSelectBMN, onLogout }) => {
  const isAdmin = user.role === "admin";

  const services = [
    {
      key: "kepegawaian",
      icon: "👥",
      title: "Kepegawaian & SDM",
      desc: "Kenaikan Pangkat, Mutasi, Cuti, Pensiun, dan Pengembangan SDM.",
      active: false,
    },
    {
      key: "bmn",
      icon: "🏢",
      title: "Barang Milik Negara",
      desc: "Inventaris Barang, Peminjaman, Mutasi, dan Pengelolaan Aset.",
      active: true,
    },
    {
      key: "data",
      icon: "📊",
      title: "Humas & Data",
      desc: "Berita, Publikasi, Statistik, Dokumentasi dan Pelaporan Data.",
      active: false,
    },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#f1f5f9", fontFamily: "'Segoe UI', sans-serif" }}>
      {/* Navbar */}
      <nav style={{ background: "#fff", borderBottom: "1px solid #e2e8f0", padding: "14px 32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 22 }}>🏛️</span>
          <div>
            <div style={{ fontWeight: 800, fontSize: 15, color: "#1e3a5f" }}>Portal Layanan Internal</div>
            <div style={{ fontSize: 11, color: "#64748b" }}>Bimas Kristen — Kementerian Agama RI</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#1e293b" }}>{user.nama}</div>
            <div style={{ fontSize: 11, color: "#64748b" }}>
              {isAdmin ? "👤 Admin" : "👤 Pegawai"} · NIP {user.nip}
            </div>
          </div>
          <button onClick={onLogout} style={{ padding: "8px 16px", border: "1.5px solid #fee2e2", borderRadius: 8, background: "#fff", color: "#dc2626", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>
            Keluar
          </button>
        </div>
      </nav>

      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg, #1e3a5f 0%, #2563eb 100%)", padding: "48px 32px", textAlign: "center", color: "#fff" }}>
        <div style={{ fontSize: 13, opacity: 0.8, marginBottom: 8 }}>Selamat datang,</div>
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 800 }}>{user.nama}</h1>
        <p style={{ margin: "8px 0 0", opacity: 0.85, fontSize: 14 }}>{user.jabatan}</p>
        <p style={{ margin: "20px 0 0", opacity: 0.7, fontSize: 13 }}>Pilih bidang layanan yang ingin diakses</p>
      </div>

      {/* Service Cards */}
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "40px 32px" }}>
        <h2 style={{ textAlign: "center", fontSize: 22, fontWeight: 800, color: "#1e3a5f", marginBottom: 28 }}>
          Pilih Menu Layanan
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
          {services.map((s) => (
            <div
              key={s.key}
              onClick={() => s.active && s.key === "bmn" && onSelectBMN()}
              style={{
                background: "#fff", borderRadius: 14, padding: "32px 24px", textAlign: "center",
                border: "1.5px solid #e2e8f0", cursor: s.active ? "pointer" : "not-allowed",
                opacity: s.active ? 1 : 0.55, transition: "all 0.15s",
              }}
              onMouseEnter={(e) => { if (s.active) e.currentTarget.style.borderColor = "#2563eb"; }}
              onMouseLeave={(e) => { if (s.active) e.currentTarget.style.borderColor = "#e2e8f0"; }}
            >
              <div style={{ fontSize: 40, marginBottom: 14 }}>{s.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 16, color: "#1e3a5f", marginBottom: 8 }}>{s.title}</div>
              <div style={{ fontSize: 13, color: "#64748b", lineHeight: 1.5 }}>{s.desc}</div>
              {!s.active && (
                <div style={{ marginTop: 14, fontSize: 11, color: "#94a3b8", fontStyle: "italic" }}>Segera tersedia</div>
              )}
              {s.active && isAdmin && s.key === "bmn" && (
                <div style={{ marginTop: 14, display: "inline-block", background: "#fef3c7", color: "#92400e", padding: "4px 10px", borderRadius: 12, fontSize: 11, fontWeight: 700 }}>
                  Mode Admin
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceSelection;