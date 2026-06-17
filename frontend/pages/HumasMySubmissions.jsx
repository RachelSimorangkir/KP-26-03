import { useState } from "react";
import { Link } from "react-router-dom";
import "./HumasPublish.css";

export default function HumasMySubmissions() {
  const [items, setItems] = useState([
    { id: 1, judul: "Publikasi Kegiatan Sosial", status: "Menunggu", tanggalPengajuan: "2026-06-15T10:00", tanggalTerbit: null, catatanRevisi: "" },
    { id: 2, judul: "Seminar Pendidikan", status: "Revisi", tanggalPengajuan: "2026-06-10T09:00", tanggalTerbit: null, catatanRevisi: "Perbaiki narasi pada paragraf 2." },
    { id: 3, judul: "Kegiatan Keagamaan", status: "Diterima", tanggalPengajuan: "2026-05-30T08:30", tanggalTerbit: "2026-06-01T12:00", catatanRevisi: "" },
  ]);

  function handleEdit(id) {
    // navigate to HumasPublish with prefilled data in a real app
    alert('Fungsi edit dipanggil untuk id: ' + id + '. Implement navigasi ke form edit.');
  }

  return (
    <div className="humas-publish-layout">
      <header className="hp-header">
        <h1>Daftar & Status Pengajuan Saya</h1>
        <p>Riwayat pengajuan publikasi berita kegiatan Anda.</p>
      </header>

      <div className="hp-form">
        <table className="my-submissions">
          <thead>
            <tr>
              <th>Judul Berita</th>
              <th>Status Persetujuan Atasan</th>
              <th>Status Verifikasi Humas</th>
              <th>Catatan Revisi</th>
              <th>Tanggal Pengajuan</th>
              <th>Tanggal Terbit</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {items.map((it) => (
              <tr key={it.id}>
                <td>{it.judul}</td>
                <td>{it.status === 'Revisi' ? <span className="badge badge-warning">Revisi</span> : it.status === 'Menunggu' ? <span className="badge">Menunggu</span> : <span className="badge badge-success">{it.status}</span>}</td>
                <td>{it.status === 'Diterima' ? <span className="badge badge-success">Diterima</span> : it.status === 'Terbit' ? <span className="badge badge-primary">Terbit</span> : <span className="badge">{it.status}</span>}</td>
                <td><div className="truncate" title={it.catatanRevisi}>{it.catatanRevisi || '-'}</div></td>
                <td>{new Date(it.tanggalPengajuan).toLocaleString('id-ID')}</td>
                <td>{it.tanggalTerbit ? new Date(it.tanggalTerbit).toLocaleString('id-ID') : '-'}</td>
                <td>
                  {it.status === 'Revisi' ? (
                    <button onClick={() => handleEdit(it.id)} className="btn-primary">Edit & Ajukan Ulang</button>
                  ) : (
                    <button onClick={() => alert('Lihat detail untuk: ' + it.id)}>Lihat</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{marginTop:20}}>
        <Link to="/humas/publikasi" className="btn-secondary">Kembali ke Form Pengajuan</Link>
      </div>
    </div>
  );
}
