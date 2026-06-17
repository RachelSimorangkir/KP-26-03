import { useState } from "react";
import "./HumasPublish.css";

export default function HumasAdminVerifikator() {
  const [items, setItems] = useState([
    { id: 1, judul: "Kegiatan A", satker: "Kanwil", status: "Masuk" },
  ]);

  function verify(id, next) {
    setItems((s) => s.map((it) => (it.id === id ? { ...it, status: next } : it)));
  }

  return (
    <div className="humas-admin-layout">
      <header className="hp-header">
        <h1>Admin - Humas Pusat (Verifikator / Editor)</h1>
        <p>Daftar berita yang sudah disetujui atasan, siap untuk verifikasi/editorial.</p>
      </header>

      <div className="hp-form">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Judul</th>
              <th>Satker</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {items.map((it) => (
              <tr key={it.id}>
                <td>{it.judul}</td>
                <td>{it.satker}</td>
                <td>{it.status}</td>
                <td>
                  <button onClick={() => verify(it.id, 'Diterima')}>Terima</button>
                  <button onClick={() => verify(it.id, 'Revisi')}>Minta Revisi</button>
                  <button onClick={() => verify(it.id, 'Ditolak')}>Tolak</button>
                  <button onClick={() => verify(it.id, 'Terbit')}>Terbitkan</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
