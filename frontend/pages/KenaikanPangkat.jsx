import "./KenaikanPangkat.css";
import { useNavigate } from "react-router-dom";

export default function KenaikanPangkat() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        padding: "40px",
        background: "#f5f7fb",
        minHeight: "100vh",
      }}
    >
      <button
        onClick={() => navigate("/")}
        style={{
          padding: "10px 20px",
          background: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        ← Kembali
      </button>

      <h1 style={{ marginTop: "30px" }}>
        Usul Kenaikan Pangkat
      </h1>

      <p>
        Direktorat Jenderal Bimbingan Masyarakat Kristen
      </p>

      <div
        style={{
          marginTop: "30px",
          padding: "20px",
          background: "white",
          borderRadius: "12px",
        }}
      >
        <h2>Data Pegawai</h2>

        <input
          placeholder="Masukkan NIP"
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "10px",
          }}
        />
      </div>
    </div>
  );
}