import { useState } from "react";
import "./HumasPublish.css";

export default function HumasAdminPenyetuju() {
  const [items, setItems] = useState([
    { id: 1, judul: "Kegiatan A", satker: "Kanwil", status: "Menunggu" },
    { id: 2, judul: "Kegiatan B", satker: "Kab-Kota", status: "Menunggu" },
  ]);

  function updateStatus(id, next) {
    setItems((s) => s.map((it) => (it.id === id ? { ...it, status: next } : it)));
  }

  return (
    <div className="humas-admin-layout">
      <header className="hp-header">
        <h1>Admin - Persetujuan Atasan Satker</h1>
        <p>Daftar pengajuan yang menunggu persetujuan atasan satker.</p>
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
                  <button onClick={() => updateStatus(it.id, 'Disetujui')}>Disetujui</button>
                  <button onClick={() => updateStatus(it.id, 'Ditolak')}>Tolak</button>
                  <button onClick={() => updateStatus(it.id, 'Revisi')}>Minta Revisi</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
