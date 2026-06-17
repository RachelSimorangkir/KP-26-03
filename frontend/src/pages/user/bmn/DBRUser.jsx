import { dummyDBR, currentUser } from "./dummyData";
import { StatusBadge, IconDoc } from "./components";

const DBRUser = () => {
  // Hanya tampilkan DBR milik user yang login
  const myDBR = dummyDBR.find(d => d.nip === currentUser.nip);

  if (!myDBR) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 400 }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>📋</div>
        <div style={{ fontSize: 18, fontWeight: 700, color: "#1e3a5f", marginBottom: 8 }}>DBR Belum Tersedia</div>
        <div style={{ color: "#64748b", textAlign: "center", maxWidth: 360 }}>
          Daftar Barang Ruang (DBR) Anda belum dibuat. Silakan hubungi Admin BMN untuk pembuatan DBR.
        </div>
      </div>
    );
  }

  const today = new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: "#1e3a5f" }}>DBR Saya</h2>
        <p style={{ margin: "4px 0 0", color: "#64748b", fontSize: 14 }}>Daftar Barang Ruang yang menjadi tanggung jawab Anda</p>
      </div>

      {/* Info Card */}
      <div style={{ background: "linear-gradient(135deg, #1e3a5f, #2563eb)", borderRadius: 10, padding: "20px 24px", color: "#fff", marginBottom: 24, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontSize: 18, fontWeight: 700 }}>{myDBR.nama}</div>
          <div style={{ fontSize: 13, opacity: 0.85 }}>{myDBR.jabatan}</div>
          <div style={{ fontSize: 13, opacity: 0.85 }}>NIP. {myDBR.nip}</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ background: "rgba(255,255,255,0.2)", borderRadius: 8, padding: "6px 14px", fontSize: 13, fontWeight: 600 }}>{myDBR.ruangan}</div>
          <div style={{ fontSize: 12, opacity: 0.7, marginTop: 6 }}>{myDBR.barang.length} barang terdaftar</div>
        </div>
      </div>

      {/* Tabel DBR */}
      <div style={{ background: "#fff", borderRadius: 10, border: "1px solid #e2e8f0", padding: 24 }}>
        {/* Kop */}
        <div style={{ textAlign: "center", borderBottom: "2px solid #1e3a5f", paddingBottom: 12, marginBottom: 20 }}>
          <div style={{ fontWeight: 800, fontSize: 14 }}>KEMENTERIAN AGAMA REPUBLIK INDONESIA</div>
          <div style={{ fontSize: 12, color: "#64748b" }}>DIREKTORAT JENDERAL BIMBINGAN MASYARAKAT KRISTEN</div>
          <div style={{ fontWeight: 700, fontSize: 14, marginTop: 8, letterSpacing: 0.5 }}>DAFTAR BARANG RUANGAN (DBR)</div>
        </div>

        {/* Info Pegawai */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 20, fontSize: 13 }}>
          {[
            ["Nama", myDBR.nama],
            ["NIP", myDBR.nip],
            ["Jabatan", myDBR.jabatan],
            ["Ruangan", myDBR.ruangan],
          ].map(([k, v]) => (
            <div key={k} style={{ display: "flex", gap: 8 }}>
              <span style={{ fontWeight: 600, width: 80, flexShrink: 0 }}>{k}</span>
              <span>: {v}</span>
            </div>
          ))}
        </div>

        {/* Tabel Barang */}
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, marginBottom: 24 }}>
          <thead>
            <tr style={{ background: "#f8fafc" }}>
              {["No.", "Nama Barang", "NUP", "Kondisi"].map(h => (
                <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontWeight: 700, color: "#374151", border: "1px solid #cbd5e1" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {myDBR.barang.map((b, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #f1f5f9" }}>
                <td style={{ padding: "10px 14px", border: "1px solid #e2e8f0", textAlign: "center", color: "#64748b" }}>{b.no}</td>
                <td style={{ padding: "10px 14px", border: "1px solid #e2e8f0", fontWeight: 600, color: "#1e293b" }}>{b.nama}</td>
                <td style={{ padding: "10px 14px", border: "1px solid #e2e8f0", fontFamily: "monospace", fontSize: 12, color: "#64748b" }}>{b.nup}</td>
                <td style={{ padding: "10px 14px", border: "1px solid #e2e8f0" }}><StatusBadge status={b.kondisi} /></td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* TTD */}
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginTop: 16 }}>
          <div style={{ textAlign: "center", width: 200 }}>
            <div style={{ fontWeight: 600 }}>Mengetahui,</div>
            <div style={{ fontSize: 12, color: "#64748b" }}>Kasubbag Perlengkapan dan BMN</div>
            <div style={{ height: 50 }} />
            <div style={{ borderTop: "1.5px solid #1e293b", paddingTop: 6 }}>
              <div style={{ color: "#94a3b8" }}>(________________________)</div>
              <div style={{ color: "#64748b" }}>NIP. .............................</div>
            </div>
          </div>
          <div style={{ textAlign: "center", width: 220 }}>
            <div>Jakarta, {today}</div>
            <div style={{ fontWeight: 600 }}>Yang Bertanggung Jawab,</div>
            <div style={{ height: 50 }} />
            <div style={{ borderTop: "1.5px solid #1e293b", paddingTop: 6 }}>
              <div style={{ fontWeight: 700 }}>{myDBR.nama}</div>
              <div style={{ color: "#64748b" }}>NIP. {myDBR.nip}</div>
            </div>
          </div>
        </div>

        {/* Cetak */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
          <button onClick={() => window.print()} style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 20px", border: "1.5px solid #7c3aed", borderRadius: 8, background: "#fff", color: "#7c3aed", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>
            <IconDoc /> Cetak DBR
          </button>
        </div>
      </div>
    </div>
  );
};

export default DBRUser;