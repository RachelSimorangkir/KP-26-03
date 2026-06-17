import { useEffect, useState } from "react";
import "./DIP.css";

const USER = { nip: "197001011990031001", nama: "Nama Pengunggah", bidang: "Humas" };

function getUploads() {
  try { return JSON.parse(localStorage.getItem('dip_uploads') || '[]'); } catch { return []; }
}

const STATUS_LABEL = {
  belum: { icon: '🔴', text: 'Belum Upload' },
  menunggu: { icon: '⏳', text: 'Menunggu Validasi' },
  selesai: { icon: '✅', text: 'Selesai' },
  revisi: { icon: '🟡', text: 'Revisi' },
  ditolak: { icon: '❌', text: 'Ditolak' },
};

export default function DIPStatus() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [upload, setUpload] = useState(null);

  useEffect(() => {
    const all = getUploads();
    const id = `${USER.bidang}_${year}`;
    setUpload(all.find(x => x.id === id) || null);
  }, [year]);

  function openFile() {
    if (!upload || !upload.fileData) return alert('Tidak ada file');
    const w = window.open();
    if (!w) return alert('Popup diblokir');
    w.document.write(`<iframe style="width:100%;height:100%;border:none" src="${upload.fileData}"></iframe>`);
  }

  const deadline = new Date(`${year}-01-31T23:59:59`);
  const now = new Date();
  const daysLeft = Math.ceil((deadline - now) / (1000 * 60 * 60 * 24));
  const showBanner = !upload && daysLeft <= 14 && daysLeft >= 0;

  const statusKey = upload ? (upload.status || 'menunggu') : 'belum';
  const statusMeta = STATUS_LABEL[statusKey] || STATUS_LABEL.belum;

  return (
    <div className="dip-layout">
      <header className="dip-header">
        <h1>Status Upload Dokumen Saya</h1>
        <p>Ringkasan status upload untuk bidang Anda.</p>
      </header>

      {showBanner && (
        <div className="alert danger">Anda belum mengupload dokumen DIP Tahun {year}. Batas waktu: 31 Januari {year}</div>
      )}

      <div className="dip-status-card">
        <div className="status-row">
          <div className="status-year">
            <label>Tahun</label>
            <select value={year} onChange={e => setYear(Number(e.target.value))}>
              {[2023,2024,2025,2026].map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>

          <div className="status-info">
            <div className="status-item">
              <div className="label">Bidang</div>
              <div className="value">{USER.bidang}</div>
            </div>

            <div className="status-item status-with-button">
              <div className="label">Status Upload</div>
              <div className="value status-with-icon">{statusMeta.icon} {statusMeta.text}</div>
            </div>

            {upload && (
              <>
                <div className="status-item">
                  <div className="label">Nama File & Tanggal Upload</div>
                  <div className="value">{upload.fileName} — {new Date(upload.uploadedAt).toLocaleString()}</div>
                </div>
                
              </>
            )}

          </div>

          <div className="status-col-actions">
            {(statusKey === 'belum' || statusKey === 'revisi') ? (
              <a className="btn-primary" href="/ppid/dip/upload">Upload Dokumen</a>
            ) : (
              upload && <button className="btn-secondary" onClick={openFile}>Lihat Dokumen</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
