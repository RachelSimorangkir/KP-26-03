import { useState, useEffect } from "react";
import { currentUser } from "./dummyData";
import { StatusBadge, IconDoc, downloadAsPDF, AdminHeaderCard, AdminCard, AdminButton } from "./components";

const API_URL = "http://localhost:8080/api";

const DBRUser = () => {
  const [myDBR, setMyDBR] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDBR = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/pegawai/nip/${currentUser.nip}`);
        if (!res.ok) {
          if (res.status === 404) {
            setMyDBR(null);
            return;
          }
          throw new Error("Gagal mengambil data DBR");
        }
        const data = await res.json();
        setMyDBR({
          nama: data.nama,
          nip: data.nip,
          jabatan: data.jabatan,
          ruangan: data.ruangan || "Belum ditentukan",
          barang: (data.barang || []).map((b, i) => ({
            no: i + 1,
            nama: b.nama_barang,
            nup: b.nup,
            kondisi: b.kondisi,
          })),
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDBR();
  }, []);

  const today = new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });

  if (loading) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 320 }}>
        <div style={{ fontSize: 12, color: "#64748b" }}>Memuat data DBR...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 320 }}>
        <div style={{ fontSize: 36, marginBottom: 12 }}>⚠️</div>
        <div style={{ fontSize: 15, fontWeight: 700, color: "#dc2626", marginBottom: 6 }}>Gagal Memuat Data</div>
        <div style={{ color: "#64748b", textAlign: "center", maxWidth: 320, fontSize: 12 }}>{error}</div>
        <div style={{ color: "#94a3b8", fontSize: 11, marginTop: 6 }}>Pastikan server backend (php spark serve) sedang berjalan.</div>
      </div>
    );
  }

  if (!myDBR) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 320 }}>
        <div style={{ fontSize: 36, marginBottom: 12 }}>📋</div>
        <div style={{ fontSize: 15, fontWeight: 700, color: "#1e293b", marginBottom: 6 }}>DBR Belum Tersedia</div>
        <div style={{ color: "#64748b", textAlign: "center", maxWidth: 320, fontSize: 12 }}>
          Daftar Barang Ruang (DBR) Anda belum dibuat. Silakan hubungi Admin BMN untuk pembuatan DBR.
        </div>
      </div>
    );
  }

  return (
    <div>
      <AdminHeaderCard title="DBR Saya" subtitle="Daftar Barang Ruang yang menjadi tanggung jawab Anda" />

      {/* Info Card */}
      <div style={{ background: "linear-gradient(135deg, #1e293b, #2563eb)", borderRadius: 10, padding: "14px 18px", color: "#fff", marginBottom: 14, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700 }}>{myDBR.nama}</div>
          <div style={{ fontSize: 11, opacity: 0.85 }}>{myDBR.jabatan}</div>
          <div style={{ fontSize: 11, opacity: 0.85 }}>NIP. {myDBR.nip}</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ background: "rgba(255,255,255,0.2)", borderRadius: 6, padding: "4px 10px", fontSize: 11, fontWeight: 600 }}>{myDBR.ruangan}</div>
          <div style={{ fontSize: 10, opacity: 0.7, marginTop: 4 }}>{myDBR.barang.length} barang terdaftar</div>
        </div>
      </div>

      {/* Tabel DBR */}
      <AdminCard>
        <div id="dbr-saya-print">
          <div style={{ textAlign: "center", borderBottom: "2px solid #1e293b", paddingBottom: 10, marginBottom: 16 }}>
            <div style={{ fontWeight: 800, fontSize: 13 }}>KEMENTERIAN AGAMA REPUBLIK INDONESIA</div>
            <div style={{ fontSize: 11, color: "#64748b" }}>DIREKTORAT JENDERAL BIMBINGAN MASYARAKAT KRISTEN</div>
            <div style={{ fontWeight: 700, fontSize: 13, marginTop: 6, letterSpacing: 0.5 }}>DAFTAR BARANG RUANGAN (DBR)</div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginBottom: 16, fontSize: 12 }}>
            {[
              ["Nama", myDBR.nama],
              ["NIP", myDBR.nip],
              ["Jabatan", myDBR.jabatan],
              ["Ruangan", myDBR.ruangan],
            ].map(([k, v]) => (
              <div key={k} style={{ display: "flex", gap: 8 }}>
                <span style={{ fontWeight: 600, width: 70, flexShrink: 0 }}>{k}</span>
                <span>: {v}</span>
              </div>
            ))}
          </div>

          {myDBR.barang.length === 0 ? (
            <div style={{ textAlign: "center", padding: "20px 0", color: "#94a3b8", fontSize: 12 }}>
              Belum ada barang yang terdaftar untuk pegawai ini.
            </div>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, marginBottom: 16 }}>
              <thead>
                <tr style={{ background: "#f8fafc" }}>
                  {["No.", "Nama Barang", "NUP", "Kondisi"].map(h => (
                    <th key={h} style={{ padding: "8px 12px", textAlign: "left", fontWeight: 700, color: "#374151", border: "1px solid #cbd5e1" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {myDBR.barang.map((b, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid #f1f5f9", textAlign: "left" }}>
                    <td style={{ padding: "8px 12px", border: "1px solid #e2e8f0", textAlign: "left", color: "#64748b" }}>{b.no}</td>
                    <td style={{ padding: "8px 12px", border: "1px solid #e2e8f0", fontWeight: 600, color: "#1e293b" }}>{b.nama}</td>
                    <td style={{ padding: "8px 12px", border: "1px solid #e2e8f0", fontFamily: "monospace", fontSize: 11, color: "#64748b" }}>{b.nup}</td>
                    <td style={{ padding: "8px 12px", border: "1px solid #e2e8f0" }}><StatusBadge status={b.kondisi} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginTop: 14 }}>
            <div style={{ textAlign: "center", width: 180 }}>
              <div style={{ fontWeight: 600 }}>Mengetahui,</div>
              <div style={{ fontSize: 11, color: "#64748b" }}>Kasubbag Perlengkapan dan BMN</div>
              <div style={{ height: 40 }} />
              <div style={{ borderTop: "1.5px solid #1e293b", paddingTop: 6 }}>
                <div style={{ color: "#94a3b8" }}>(________________________)</div>
                <div style={{ color: "#64748b" }}>NIP. .............................</div>
              </div>
            </div>
            <div style={{ textAlign: "center", width: 200 }}>
              <div>Jakarta, {today}</div>
              <div style={{ fontWeight: 600 }}>Yang Bertanggung Jawab,</div>
              <div style={{ height: 40 }} />
              <div style={{ borderTop: "1.5px solid #1e293b", paddingTop: 6 }}>
                <div style={{ fontWeight: 700 }}>{myDBR.nama}</div>
                <div style={{ color: "#64748b" }}>NIP. {myDBR.nip}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="dbr-no-print" style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 16 }}>
          <AdminButton variant="outline" onClick={() => window.print()}><IconDoc /> Cetak DBR</AdminButton>
          <AdminButton variant="success" onClick={() => downloadAsPDF("dbr-saya-print", `DBR-${myDBR.nama}`)}><IconDoc /> Save PDF</AdminButton>
        </div>
      </AdminCard>

      <style>{`
        @media print {
          body * { visibility: hidden; }
          #dbr-saya-print, #dbr-saya-print * { visibility: visible; }
          #dbr-saya-print { position: absolute; left: 0; top: 0; width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default DBRUser;