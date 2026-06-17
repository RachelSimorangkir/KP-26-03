import { useState } from "react";
import { dummyDBR, currentUser } from "./dummyData";
import { Modal, inputStyle, FormGroup, BarcodeNIP, downloadAsPDF } from "./components";

const generateNomor = () => {
  const now = new Date();
  return `PML-${now.getFullYear()}-${String(Math.floor(Math.random() * 900) + 100)}`;
};

// Preview / Form Cetak Pemeliharaan
const FormPemeliharaan = ({ barangTerpilih, keterangan, nip, onClose, onSubmit }) => {
  const nomorSurat = generateNomor();
  const today = new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });

  return (
    <Modal title="Form Pemeliharaan Barang" onClose={onClose} wide>
      <div id="surat-pemeliharaan-print" style={{ border: "1.5px solid #e2e8f0", borderRadius: 8, padding: 32, background: "#fff", fontFamily: "serif", fontSize: 14, lineHeight: 1.8, color: "#1e293b" }}>
        {/* Kop */}
        <div style={{ textAlign: "center", borderBottom: "3px double #1e3a5f", paddingBottom: 12, marginBottom: 20 }}>
          <div style={{ fontWeight: 800, fontSize: 15, letterSpacing: 1 }}>KEMENTERIAN AGAMA REPUBLIK INDONESIA</div>
          <div style={{ fontSize: 12 }}>DIREKTORAT JENDERAL BIMBINGAN MASYARAKAT KRISTEN</div>
          <div style={{ fontSize: 12 }}>Jalan M.H. Thamrin Nomor 6 Jakarta 10340</div>
        </div>

        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <div style={{ fontWeight: 700, fontSize: 15, textDecoration: "underline", letterSpacing: 1 }}>FORM PEMELIHARAAN BARANG</div>
          <div style={{ fontSize: 13 }}>Nomor: {nomorSurat}</div>
        </div>

        <p>
          Permohonan pemeliharaan barang atas nama <strong>{currentUser.nama}</strong>, NIP <strong>{nip}</strong>,
          dengan ini mengajukan permohonan pemeliharaan terhadap barang milik negara sebagai berikut:
        </p>

        <table style={{ width: "100%", borderCollapse: "collapse", margin: "12px 0", fontSize: 13 }}>
          <thead>
            <tr style={{ background: "#f8fafc" }}>
              <th style={{ border: "1px solid #cbd5e1", padding: "6px 10px", textAlign: "left" }}>No.</th>
              <th style={{ border: "1px solid #cbd5e1", padding: "6px 10px", textAlign: "left" }}>Nama Barang</th>
              <th style={{ border: "1px solid #cbd5e1", padding: "6px 10px", textAlign: "left" }}>NUP</th>
            </tr>
          </thead>
          <tbody>
            {barangTerpilih.map((b, i) => (
              <tr key={i}>
                <td style={{ border: "1px solid #cbd5e1", padding: "6px 10px" }}>{i + 1}</td>
                <td style={{ border: "1px solid #cbd5e1", padding: "6px 10px" }}>{b.nama}</td>
                <td style={{ border: "1px solid #cbd5e1", padding: "6px 10px", fontFamily: "monospace" }}>{b.nup}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <p style={{ marginBottom: 4 }}><strong>Keterangan Permasalahan:</strong></p>
        <div style={{ border: "1px solid #cbd5e1", borderRadius: 6, padding: "10px 14px", background: "#f8fafc", marginBottom: 16, fontSize: 13 }}>
          {keterangan}
        </div>

        <p>
          Demikian permohonan ini saya buat dengan sebenar-benarnya untuk dapat diproses oleh Admin BMN.
        </p>

        {/* TTD + Barcode */}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 32, alignItems: "flex-end" }}>
          <div style={{ textAlign: "center", width: 220 }}>
            <div>Jakarta, {today}</div>
            <div>Pemohon,</div>
            <div style={{ marginTop: 16 }}>
              <BarcodeNIP value={nip} />
            </div>
            <div style={{ marginTop: 6, fontWeight: 700 }}>{currentUser.nama}</div>
            <div>NIP. {nip}</div>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 20, flexWrap: "wrap" }}>
        <button onClick={onClose} style={{ padding: "10px 18px", border: "1.5px solid #e2e8f0", borderRadius: 8, background: "#fff", cursor: "pointer", fontWeight: 600, color: "#64748b", fontSize: 13 }}>
          Kembali Edit
        </button>
        <button onClick={() => window.print()} style={{ padding: "10px 18px", border: "1.5px solid #1d4ed8", borderRadius: 8, background: "#fff", cursor: "pointer", fontWeight: 600, color: "#1d4ed8", fontSize: 13 }}>
          🖨 Print
        </button>
        <button onClick={() => downloadAsPDF("surat-pemeliharaan-print", "form-pemeliharaan")} style={{ padding: "10px 18px", border: "1.5px solid #16a34a", borderRadius: 8, background: "#fff", cursor: "pointer", fontWeight: 600, color: "#16a34a", fontSize: 13 }}>
          💾 Save PDF
        </button>
        <button onClick={onSubmit} style={{ padding: "10px 18px", background: "#1d4ed8", color: "#fff", border: "none", borderRadius: 8, fontWeight: 600, cursor: "pointer", fontSize: 13 }}>
          Kirim ke Admin
        </button>
      </div>
    </Modal>
  );
};

const PemeliharaanUser = () => {
  const myDBR = dummyDBR.find(d => d.nip === currentUser.nip);
  const [selected, setSelected] = useState([]);
  const [keterangan, setKeterangan] = useState("");
  const [nipConfirm, setNipConfirm] = useState("");
  const [setuju, setSetuju] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!myDBR) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 400 }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🔧</div>
        <div style={{ fontSize: 18, fontWeight: 700, color: "#1e3a5f", marginBottom: 8 }}>DBR Belum Tersedia</div>
        <div style={{ color: "#64748b", textAlign: "center", maxWidth: 360 }}>
          Anda belum memiliki DBR. Hubungi Admin BMN untuk pembuatan DBR sebelum mengajukan pemeliharaan.
        </div>
      </div>
    );
  }

  const toggleBarang = (b) => {
    if (selected.find(s => s.nup === b.nup)) {
      setSelected(selected.filter(s => s.nup !== b.nup));
    } else {
      setSelected([...selected, b]);
    }
  };

  const isValid = selected.length > 0 && keterangan.trim() && setuju && nipConfirm === currentUser.nip;

  if (submitted) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 400 }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
        <div style={{ fontSize: 20, fontWeight: 700, color: "#1e3a5f", marginBottom: 8 }}>Permohonan Pemeliharaan Terkirim!</div>
        <div style={{ color: "#64748b", marginBottom: 24 }}>Admin BMN akan segera memproses permohonan Anda.</div>
        <button onClick={() => { setSubmitted(false); setSelected([]); setKeterangan(""); setNipConfirm(""); setSetuju(false); }}
          style={{ padding: "10px 24px", background: "#1d4ed8", color: "#fff", border: "none", borderRadius: 8, fontWeight: 600, cursor: "pointer" }}>
          Ajukan Pemeliharaan Lain
        </button>
      </div>
    );
  }

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: "#1e3a5f" }}>Pemeliharaan Barang</h2>
        <p style={{ margin: "4px 0 0", color: "#64748b", fontSize: 14 }}>Ajukan pemeliharaan untuk barang yang terdaftar di DBR Anda</p>
      </div>

      <div style={{ background: "#fff", borderRadius: 10, border: "1px solid #e2e8f0", padding: 24 }}>
        {/* Daftar Barang DBR */}
        <div style={{ fontWeight: 700, color: "#1e3a5f", fontSize: 15, marginBottom: 6 }}>Pilih Barang yang Bermasalah</div>
        <div style={{ fontSize: 12, color: "#64748b", marginBottom: 14 }}>Ruangan: {myDBR.ruangan} — centang satu atau lebih barang</div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 22 }}>
          {myDBR.barang.map((b, i) => {
            const isChecked = !!selected.find(s => s.nup === b.nup);
            return (
              <label key={i} style={{
                display: "flex", alignItems: "center", gap: 10, padding: "12px 14px",
                border: "1.5px solid", borderColor: isChecked ? "#1d4ed8" : "#e2e8f0",
                background: isChecked ? "#eff6ff" : "#fff", borderRadius: 8, cursor: "pointer",
              }}>
                <input type="checkbox" checked={isChecked} onChange={() => toggleBarang(b)} style={{ width: 18, height: 18, accentColor: "#1d4ed8" }} />
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#1e293b" }}>{b.nama}</div>
                  <div style={{ fontSize: 11, color: "#94a3b8", fontFamily: "monospace" }}>{b.nup}</div>
                </div>
              </label>
            );
          })}
        </div>

        {/* Keterangan */}
        <FormGroup label="Keterangan Permasalahan Barang">
          <textarea
            style={{ ...inputStyle, minHeight: 90, resize: "vertical" }}
            value={keterangan}
            onChange={e => setKeterangan(e.target.value)}
            placeholder="Jelaskan kerusakan atau masalah pada barang yang dipilih..."
          />
        </FormGroup>

        {/* Persetujuan */}
        <div style={{ background: "#f8fafc", borderRadius: 8, padding: 16, marginTop: 16 }}>
          <div style={{ fontWeight: 700, color: "#1e3a5f", fontSize: 14, marginBottom: 10 }}>Persetujuan Pemohon</div>
          <label style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 14, fontSize: 13, cursor: "pointer" }}>
            <input type="checkbox" checked={setuju} onChange={e => setSetuju(e.target.checked)} style={{ width: 16, height: 16, marginTop: 2, accentColor: "#1d4ed8" }} />
            <span>Saya, <strong>{currentUser.nama}</strong>, menyatakan setuju untuk mengajukan permohonan pemeliharaan terhadap barang yang dipilih di atas.</span>
          </label>
          <FormGroup label="Konfirmasi NIP Anda">
            <input style={inputStyle} value={nipConfirm} onChange={e => setNipConfirm(e.target.value)} placeholder="Masukkan NIP untuk konfirmasi" />
          </FormGroup>
          {nipConfirm && nipConfirm !== currentUser.nip && (
            <div style={{ fontSize: 12, color: "#dc2626", marginTop: -8 }}>NIP tidak sesuai dengan akun Anda.</div>
          )}
        </div>

        <button
          onClick={() => isValid && setShowForm(true)}
          disabled={!isValid}
          style={{ width: "100%", marginTop: 20, padding: "11px 0", background: isValid ? "#1d4ed8" : "#94a3b8", color: "#fff", border: "none", borderRadius: 8, fontWeight: 700, fontSize: 14, cursor: isValid ? "pointer" : "not-allowed" }}>
          📄 Buat Form Pemeliharaan
        </button>
      </div>

      {showForm && (
        <FormPemeliharaan
          barangTerpilih={selected}
          keterangan={keterangan}
          nip={nipConfirm}
          onClose={() => setShowForm(false)}
          onSubmit={() => { setShowForm(false); setSubmitted(true); }}
        />
      )}
    </div>
  );
};

export default PemeliharaanUser;