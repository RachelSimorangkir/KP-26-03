import { useState } from "react";

const API_URL = "http://localhost:8080/api";

const Login = ({ onLoginSuccess }) => {
  const [nip, setNip] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!nip.trim()) {
      setError("NIP wajib diisi.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nip: nip.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.messages?.error || data.message || "NIP tidak ditemukan.");
        return;
      }

      // Simpan data user yang berhasil login, kirim ke parent component
      onLoginSuccess(data.user);
    } catch (err) {
      setError("Gagal terhubung ke server. Pastikan backend sedang berjalan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      background: "linear-gradient(135deg, #1e3a5f 0%, #2563eb 100%)", fontFamily: "'Segoe UI', sans-serif",
      padding: 16,
    }}>
      <div style={{ background: "#fff", borderRadius: 16, padding: "40px 36px", width: 400, maxWidth: "100%", boxShadow: "0 20px 60px rgba(0,0,0,0.25)" }}>
        {/* Logo / Header */}
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{
            width: 64, height: 64, borderRadius: "50%", background: "#eff6ff",
            display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px",
            fontSize: 28,
          }}>
            🏛️
          </div>
          <div style={{ fontWeight: 800, fontSize: 18, color: "#1e3a5f" }}>Portal Layanan Internal</div>
          <div style={{ fontSize: 13, color: "#64748b", marginTop: 2 }}>Bimas Kristen — Kementerian Agama RI</div>
        </div>

        <form onSubmit={handleLogin}>
          <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>
            Nomor Induk Pegawai (NIP)
          </label>
          <input
            type="text"
            value={nip}
            onChange={(e) => setNip(e.target.value)}
            placeholder="Masukkan NIP Anda"
            style={{
              width: "100%", padding: "12px 14px", border: "1.5px solid #e2e8f0", borderRadius: 8,
              fontSize: 14, outline: "none", boxSizing: "border-box", marginBottom: 16,
            }}
            disabled={loading}
            autoFocus
          />

          {error && (
            <div style={{ background: "#fee2e2", color: "#dc2626", padding: "10px 14px", borderRadius: 8, fontSize: 13, marginBottom: 16 }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%", padding: "12px 0", background: loading ? "#94a3b8" : "#1d4ed8", color: "#fff",
              border: "none", borderRadius: 8, fontWeight: 700, fontSize: 14, cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Memproses..." : "Masuk"}
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: 20, fontSize: 12, color: "#94a3b8" }}>
          Sistem akan mendeteksi otomatis hak akses Anda (Pegawai/Admin)
        </div>
      </div>
    </div>
  );
};

export default Login;