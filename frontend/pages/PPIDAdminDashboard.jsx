import { useEffect, useState } from "react";
import "./DIP.css";

const FIELDS = [
  'Keuangan','Perencanaan','Humas','Data','Evaluasi','Sistem Informasi','Ortala Kepegawaian','Umum','BMN'
];

function getUploads() {
  try { return JSON.parse(localStorage.getItem('dip_uploads') || '[]'); } catch { return []; }
}

function saveUploads(list) { localStorage.setItem('dip_uploads', JSON.stringify(list)); }

function getReminders() {
  try { return JSON.parse(localStorage.getItem('dip_reminders') || '{}'); } catch { return {}; }
}

export default function PPIDAdminDashboard() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [uploads, setUploads] = useState([]);
  const [reminders, setReminders] = useState({});
  const [validateTarget, setValidateTarget] = useState(null);
  const [validateNote, setValidateNote] = useState('');
  const [validateResult, setValidateResult] = useState('selesai');

  useEffect(() => {
    setUploads(getUploads());
    setReminders(getReminders());
  }, []);

  function findByField(field) {
    return uploads.find(u => u.bidang === field && Number(u.tahun) === Number(year));
  }

  function openFile(u) {
    if (!u || !u.fileData) return alert('Tidak ada file');
    const w = window.open();
    if (!w) return alert('Popup diblokir');
    w.document.write(`<iframe style="width:100%;height:100%;border:none" src="${u.fileData}"></iframe>`);
  }

  function showValidate(field) {
    const u = findByField(field);
    if (!u) return alert('Tidak ada dokumen untuk divalidasi');
    setValidateTarget(u);
    setValidateNote(u.validationNote || '');
    setValidateResult(u.status || 'menunggu');
  }

  function applyValidation() {
    if (!validateTarget) return;
    const all = getUploads();
    const idx = all.findIndex(x => x.id === validateTarget.id);
    if (idx === -1) return alert('Data tidak ditemukan');
    all[idx].status = validateResult;
    all[idx].validationNote = validateNote;
    all[idx].validatedAt = new Date().toISOString();
    saveUploads(all);
    setUploads(all);
    setValidateTarget(null);
    setValidateNote('');
    setValidateResult('selesai');
  }

  function sendReminder(field) {
    const r = getReminders();
    r[field] = new Date().toISOString();
    localStorage.setItem('dip_reminders', JSON.stringify(r));
    setReminders(r);
  }

  function sendReminderAll() {
    const r = getReminders();
    const t = new Date().toISOString();
    FIELDS.forEach(f => r[f] = t);
    localStorage.setItem('dip_reminders', JSON.stringify(r));
    setReminders(r);
  }

  function exportCSV() {
    const rows = [];
    rows.push(['Bidang','Tahun','Status','File','Tanggal Upload','Catatan Validasi']);
    FIELDS.forEach(f => {
      const u = findByField(f);
      rows.push([f, year, u ? u.status : 'belum', u ? u.fileName : '', u ? u.uploadedAt : '', u ? (u.validationNote || '') : '']);
    });
    const csv = rows.map(r => r.map(c => '"'+String(c).replace(/"/g,'""')+'"').join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `rekap_dip_${year}.csv`; a.click();
    URL.revokeObjectURL(url);
  }

  const total = FIELDS.length;
  const counts = { selesai:0, menunggu:0, revisi:0, belum:0 };
  FIELDS.forEach(f => {
    const u = findByField(f);
    if (!u) counts.belum++; else counts[u.status] = (counts[u.status]||0)+1;
  });
  const completed = counts.selesai;
  const pct = Math.round((completed/total)*100);

  return (
    <div className="dip-layout">
      <header className="dip-header">
        <h1>Admin PPID — Monitoring Upload DIP Tahunan</h1>
        <p>Ringkasan status upload per bidang dan aksi validasi / reminder.</p>
      </header>

      <div className="dip-admin-controls">
        <label>
          Tahun: <select value={year} onChange={e => setYear(Number(e.target.value))}>
            {[2023,2024,2025,2026].map(y => <option key={y} value={y}>{y}</option>)}
          </select>
        </label>
        <button className="btn-secondary" onClick={sendReminderAll}>Kirim Reminder Semua</button>
        <button className="btn-secondary" onClick={exportCSV}>Export CSV</button>
      </div>

      <div className="dip-summary">
        <div className="progress">
          <div className="progress-bar"><div className="progress-fill" style={{width: pct + '%'}}/></div>
          <div className="progress-text">{completed} dari {total} bidang selesai ({pct}%)</div>
        </div>

        <div className="counters">
          <div className="counter">Selesai: <strong>{counts.selesai}</strong></div>
          <div className="counter">Menunggu Validasi: <strong>{counts.menunggu}</strong></div>
          <div className="counter">Revisi: <strong>{counts.revisi}</strong></div>
          <div className="counter">Belum Upload: <strong>{counts.belum}</strong></div>
        </div>
      </div>

      <table className="dip-table">
        <thead>
          <tr><th>Bidang</th><th>Status</th><th>File</th><th>Tanggal Upload</th><th>Aksi</th></tr>
        </thead>
        <tbody>
          {FIELDS.map((f) => {
            const u = findByField(f);
            return (
              <tr key={f}>
                <td>{f}</td>
                <td>{u ? (u.status === 'selesai' ? '✅ Selesai' : u.status === 'menunggu' ? '⏳ Menunggu Validasi' : u.status === 'revisi' ? '🟡 Revisi' : '❌ '+u.status) : '🔴 Belum Upload'}</td>
                <td>{u ? u.fileName : '—'}</td>
                <td>{u ? new Date(u.uploadedAt).toLocaleDateString() : '—'}</td>
                <td>
                  {u && <button className="btn-secondary" onClick={() => openFile(u)}>Lihat</button>}
                  {u && <button className="btn-secondary" onClick={() => showValidate(f)}>Validasi</button>}
                  {!u && <button className="btn-primary" onClick={() => sendReminder(f)}>Kirim Reminder</button>}
                  <div className="reminder-meta">Last reminder: {reminders[f] ? new Date(reminders[f]).toLocaleString() : '—'}</div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {validateTarget && (
        <div className="modal">
          <div className="modal-content">
            <h3>Validasi Dokumen — {validateTarget.bidang} ({validateTarget.tahun})</h3>
            <div className="modal-row"><label>Preview</label><div><button className="btn-secondary" onClick={() => openFile(validateTarget)}>Buka Dokumen</button></div></div>
            <div className="modal-row"><label>Hasil Validasi</label>
              <select value={validateResult} onChange={e => setValidateResult(e.target.value)}>
                <option value="selesai">Selesai</option>
                <option value="revisi">Revisi</option>
                <option value="ditolak">Ditolak</option>
              </select>
            </div>
            <div className="modal-row"><label>Catatan Validasi</label>
              <textarea value={validateNote} onChange={e => setValidateNote(e.target.value)} rows={4} />
            </div>
            <div className="modal-actions">
              <button className="btn-primary" onClick={applyValidation}>Simpan</button>
              <button className="btn-secondary" onClick={() => setValidateTarget(null)}>Batal</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
