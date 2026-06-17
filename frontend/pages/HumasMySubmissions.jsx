import { useState } from "react";
import { Link } from "react-router-dom";
import "./HumasPublish.css";

export default function HumasMySubmissions() {
  const [items, setItems] = useState([
    { id: 1, judul: "Publikasi Kegiatan Sosial", statusAtasan: "Menunggu", statusHumas: "Menunggu", tanggalPengajuan: "2026-06-15T10:00", tanggalTerbit: null, catatanRevisi: "" },
    { id: 2, judul: "Seminar Pendidikan", statusAtasan: "Revisi", statusHumas: "Revisi", tanggalPengajuan: "2026-06-10T09:00", tanggalTerbit: null, catatanRevisi: "Perbaiki narasi pada paragraf 2." },
    { id: 3, judul: "Kegiatan Keagamaan", statusAtasan: "Disetujui", statusHumas: "Diterima", tanggalPengajuan: "2026-05-30T08:30", tanggalTerbit: "2026-06-01T12:00", catatanRevisi: "" },
  ]);

  function handleEdit(id) {
    // navigate to HumasPublish with prefilled data in a real app
    alert('Aksi: Edit & Ajukan Ulang untuk id: ' + id + '. (Implementasikan navigasi ke form pengajuan)');
  }

  return (
    <div className="humas-publish-layout">
      <header className="hp-header">
        <h1>Daftar & Status Pengajuan Saya</h1>
        <p>Riwayat pengajuan publikasi berita kegiatan Anda.</p>
      </header>

      <div className="hp-form">
        <div style={{marginBottom:12}}>
          <strong>Legenda:</strong>
          <span style={{marginLeft:10}}><span className="badge">Menunggu</span> Menunggu</span>
          <span style={{marginLeft:10}}><span className="badge badge-success">Diterima/Disetujui</span> Disetujui</span>
          <span style={{marginLeft:10}}><span className="badge badge-warning">Revisi</span> Revisi</span>
          <span style={{marginLeft:10}}><span className="badge badge-danger">Ditolak</span> Ditolak</span>
          <span style={{marginLeft:10}}><span className="badge badge-primary">Terbit</span> Terbit</span>
        </div>

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
                <td>
                  {it.statusAtasan === 'Menunggu' && <span className="badge">Menunggu</span>}
                  {it.statusAtasan === 'Disetujui' && <span className="badge badge-success">Disetujui</span>}
                  {it.statusAtasan === 'Diterima' && <span className="badge badge-success">Diterima</span>}
                  {it.statusAtasan === 'Revisi' && <span className="badge badge-warning">Revisi</span>}
                  {it.statusAtasan === 'Ditolak' && <span className="badge badge-danger">Ditolak</span>}
                </td>
                <td>
                  {it.statusHumas === 'Menunggu' && <span className="badge">Menunggu</span>}
                  {it.statusHumas === 'Diterima' && <span className="badge badge-success">Diterima</span>}
                  {it.statusHumas === 'Terbit' && <span className="badge badge-primary">Terbit</span>}
                  {it.statusHumas === 'Revisi' && <span className="badge badge-warning">Revisi</span>}
                  {it.statusHumas === 'Ditolak' && <span className="badge badge-danger">Ditolak</span>}
                </td>
                <td><div className="truncate" title={it.catatanRevisi}>{it.catatanRevisi || '-'}</div></td>
                <td>{new Date(it.tanggalPengajuan).toLocaleString('id-ID')}</td>
                <td>{it.tanggalTerbit ? new Date(it.tanggalTerbit).toLocaleString('id-ID') : '-'}</td>
                <td>
                  {(it.statusAtasan === 'Revisi' || it.statusHumas === 'Revisi') ? (
                    <button onClick={() => handleEdit(it.id)} className="btn-edit">Edit & Ajukan Ulang</button>
                  ) : (
                    <button onClick={() => alert('Lihat detail untuk: ' + it.id)} className="btn-view">Lihat</button>
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
