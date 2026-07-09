import { useState, useEffect } from "react";
import { currentUser } from "./dummyData";
import { Modal, inputStyle, FormGroup, BarcodeNIP, downloadAsPDF, AdminHeaderCard, AdminCard, AdminButton } from "./components";

const API_URL = "http://localhost:8080/api";

const generateNomor = () => {
  const now = new Date();
  return `PML-${now.getFullYear()}-${String(Math.floor(Math.random() * 900) + 100)}`;
};

const FormPemeliharaan = ({ barangTerpilih, keteranganMap, nip, onClose, onSubmit }) => {
  const nomorSurat = generateNomor();
  const today = new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });

  return (
    <Modal title="Form Pemeliharaan Barang" onClose={onClose} wide>
      <div id="surat-pemeliharaan-print" style={{ border: "1.5px solid #e2e8f0", borderRadius: 8, padding: 24, background: "#fff", fontFamily: "serif", fontSize: 13, lineHeight: 1.7, color: "#1e293b" }}>

        {/* KOP SURAT */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, paddingBottom: 10 }}>
            <img
              src="/logo-kemenag.png"
              alt="Logo Kemenag"
              style={{ width: 150, height: "auto", objectFit: "contain", flexShrink: 0 }}
            />
            <div style={{ flex: 1, textAlign: "center" }}>
              <div style={{ fontWeight: 800, fontSize: 16, color: "#000" }}>KEMENTERIAN AGAMA REPUBLIK INDONESIA</div>
              <div style={{ fontWeight: 800, fontSize: 14, color: "#000", marginBottom: 4 }}>DIREKTORAT JENDERAL BIMBINGAN MASYARAKAT KRISTEN</div>
              <div style={{ fontSize: 11, color: "#000", marginBottom: 2 }}>Jalan M.H Thamrin Nomor 6 Jakarta 10340</div>
              <div style={{ fontSize: 11, color: "#000", marginBottom: 2 }}>
                Telepon (021) 31924509, 31930565, 3920774, 3920739, 3920791, Pest 465, 496,234, 487
              </div>
              <div style={{ fontSize: 11, color: "#000", marginBottom: 2 }}>
                Telepon Langsung/Fax. : (021) 3812583, 3846832, 3920626, 3920628 Tromol Pos 3690
              </div>
              <div style={{ fontSize: 11, color: "#000" }}>
                Website : https://www.bimaskristen.kemenag.go.id, Email : bimaskristen@kemenag.go.id
              </div>
            </div>
          </div>
          {/* garis di bawah SELURUH blok kop, bukan cuma sejajar logo */}
          <div style={{ borderBottom: "3px solid #000", marginTop: 6 }} />
        </div>

        <div style={{ textAlign: "center", marginBottom: 16 }}>
          <div style={{ fontWeight: 700, fontSize: 14, textDecoration: "underline", letterSpacing: 1 }}>FORM PEMELIHARAAN BARANG</div>
          <div style={{ fontSize: 12 }}>Nomor: {nomorSurat}</div>
        </div>

        <p style={{ textAlign: "justify", marginBottom: 4 }}>
          Permohonan pemeliharaan barang atas
        </p>
        <table style={{ marginLeft: 16, marginBottom: 8, fontSize: 13, borderCollapse: "collapse" }}>
          <tbody>
            <tr>
              <td style={{ paddingRight: 12, color: "#475569" }}>Nama</td>
              <td style={{ paddingRight: 8 }}>:</td>
              <td style={{ fontWeight: 700 }}>{currentUser.nama}</td>
            </tr>
            <tr>
              <td style={{ paddingRight: 12, color: "#475569" }}>NIP</td>
              <td style={{ paddingRight: 8 }}>:</td>
              <td style={{ fontWeight: 700 }}>{nip}</td>
            </tr>
          </tbody>
        </table>
        <p style={{ textAlign: "justify", marginBottom: 10 }}>
          dengan ini mengajukan permohonan pemeliharaan terhadap barang milik negara sebagai berikut:
        </p>

        <table style={{ width: "100%", borderCollapse: "collapse", margin: "10px 0", fontSize: 12 }}>
          <thead>
            <tr style={{ background: "#f8fafc" }}>
              <th style={{ border: "1px solid #cbd5e1", padding: "6px 8px", textAlign: "left" }}>No.</th>
              <th style={{ border: "1px solid #cbd5e1", padding: "6px 8px", textAlign: "left" }}>Nama Barang</th>
              <th style={{ border: "1px solid #cbd5e1", padding: "6px 8px", textAlign: "left" }}>NUP</th>
              <th style={{ border: "1px solid #cbd5e1", padding: "6px 8px", textAlign: "left" }}>Keterangan Permasalahan</th>
            </tr>
          </thead>
          <tbody>
            {barangTerpilih.map((b, i) => (
              <tr key={b.nup}>
                <td style={{ border: "1px solid #cbd5e1", padding: "6px 8px", textAlign: "left" }}>{i + 1}</td>
                <td style={{ border: "1px solid #cbd5e1", padding: "6px 8px", textAlign: "left" }}>{b.nama}</td>
                <td style={{ border: "1px solid #cbd5e1", padding: "6px 8px", textAlign: "left", fontFamily: "monospace" }}>{b.nup}</td>
                <td style={{ border: "1px solid #cbd5e1", padding: "6px 8px", textAlign: "left" }}>{keteranganMap[b.nup] || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <p style={{ textAlign: "justify", marginTop: 14 }}>
          Demikian permohonan ini saya buat dengan sebenar-benarnya untuk dapat diproses oleh Admin BMN.
        </p>

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 24, alignItems: "flex-end" }}>
          <div style={{ textAlign: "center", width: "auto", whiteSpace: "nowrap" }}>
            <div>Jakarta, {today}</div>
            <div>Pemohon,</div>
            <div style={{ marginTop: 12, display: "inline-block", overflow: "hidden", height: 80 }}>
              <BarcodeNIP value={nip} />
            </div>
            <div style={{ marginTop: 6, fontWeight: 700 }}>{currentUser.nama}</div>
            <div>NIP. {nip}</div>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 16, flexWrap: "wrap" }}>
        <AdminButton variant="outline" onClick={onClose}>Kembali Edit</AdminButton>
        <AdminButton variant="outline" onClick={() => window.print()}>🖨 Print</AdminButton>
        <AdminButton variant="success" onClick={() => downloadAsPDF("surat-pemeliharaan-print", "form-pemeliharaan")}>💾 Save PDF</AdminButton>
        <AdminButton onClick={onSubmit}>Kirim ke Admin</AdminButton>
      </div>
    </Modal>
  );
};

/* ------------------------------------------------------------------ */
/* Komponen satu baris barang — dipisah agar state-nya terisolasi      */
/* ------------------------------------------------------------------ */
const BarangRow = ({ barang, index, isChecked, keterangan, onToggle, onKeteranganChange }) => {
  return (
    <div>
      {/* Baris barang */}
      <div style={{
        display: "flex",
        alignItems: "center",
        padding: "10px 14px",
        border: "1.5px solid",
        borderColor: isChecked ? "#2563eb" : "#e2e8f0",
        background: isChecked ? "#eff6ff" : "#fff",
        borderRadius: isChecked ? "6px 6px 0 0" : "6px",
        userSelect: "none",
        textAlign: "left",
      }}>
        {/* Nomor bulat */}
        <div style={{
          width: 22, height: 22, borderRadius: "50%",
          background: isChecked ? "#2563eb" : "#e2e8f0",
          color: isChecked ? "#fff" : "#64748b",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 11, fontWeight: 700, flexShrink: 0,
        }}>
          {index + 1}
        </div>

        {/* Nama + NUP — lebar tetap agar selalu sejajar */}
        <div style={{ flex: 1, minWidth: 0, marginLeft: 10 }}>
          <div style={{
            fontSize: 12, fontWeight: 600, color: "#1e293b",
            lineHeight: 1.4,
          }}>
            {barang.nama}
          </div>
          <div style={{
            fontSize: 10, color: "#94a3b8",
            fontFamily: "monospace", marginTop: 2,
          }}>
            {barang.nup}
          </div>
        </div>

        {/* Checkbox di kanan — satu-satunya trigger toggle */}
        <input
          type="checkbox"
          checked={isChecked}
          onChange={onToggle}
          style={{
            width: 16, height: 16,
            accentColor: "#2563eb",
            flexShrink: 0, cursor: "pointer",
            marginLeft: 12,
          }}
        />
      </div>

      {/* Box keterangan — muncul hanya jika barang ini dicentang */}
      {isChecked && (
        <div style={{
          border: "1.5px solid #2563eb",
          borderTop: "none",
          borderRadius: "0 0 6px 6px",
          background: "#f0f6ff",
          padding: "10px 14px",
        }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: "#2563eb", marginBottom: 5 }}>
            Keterangan Permasalahan — {barang.nama}
          </div>
          <textarea
            style={{
              ...inputStyle,
              minHeight: 60,
              resize: "vertical",
              background: "#fff",
              fontSize: 12,
              border: "1px solid #bfdbfe",
              width: "100%",
              boxSizing: "border-box",
            }}
            value={keterangan}
            onChange={e => onKeteranganChange(e.target.value)}
            placeholder={`Jelaskan kerusakan atau masalah pada ${barang.nama}...`}
          />
        </div>
      )}
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Komponen utama                                                       */
/* ------------------------------------------------------------------ */
const PemeliharaanUser = () => {
  const [myDBR, setMyDBR] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selected, setSelected] = useState([]);
  const [keteranganMap, setKeteranganMap] = useState({});
  const [nipConfirm, setNipConfirm] = useState("");
  const [setuju, setSetuju] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchDBR = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/pegawai/nip/${currentUser.nip}`);
        if (!res.ok) {
          if (res.status === 404) { setMyDBR(null); return; }
          throw new Error("Gagal mengambil data DBR");
        }
        const data = await res.json();
        setMyDBR({
          nama: data.nama,
          nip: data.nip,
          jabatan: data.jabatan,
          ruangan: data.ruangan || "Belum ditentukan",
          barang: (data.barang || []).map((b,i) => ({
            id:i,
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
      </div>
    );
  }

  if (!myDBR) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 320 }}>
        <div style={{ fontSize: 36, marginBottom: 12 }}>🔧</div>
        <div style={{ fontSize: 15, fontWeight: 700, color: "#1e293b", marginBottom: 6 }}>DBR Belum Tersedia</div>
        <div style={{ color: "#64748b", textAlign: "center", maxWidth: 320, fontSize: 12 }}>
          Anda belum memiliki DBR. Hubungi Admin BMN untuk pembuatan DBR sebelum mengajukan pemeliharaan.
        </div>
      </div>
    );
  }

  const handleToggle = (b) => {
    const sudahAda = selected.find(s => s.nup === b.nup);
    if (sudahAda) {
      setSelected(prev => prev.filter(s => s.nup !== b.nup));
      setKeteranganMap(prev => {
        const next = { ...prev };
        delete next[b.nup];
        return next;
      });
    } else {
      setSelected(prev => [...prev, b]);
    }
  };

  const handleKeterangan = (nup, val) => {
    setKeteranganMap(prev => ({ ...prev, [nup]: val }));
  };

  const allKeteranganFilled = selected.length > 0 && selected.every(b => (keteranganMap[b.nup] || "").trim());
  const isValid = allKeteranganFilled && setuju && nipConfirm === currentUser.nip;

  if (submitted) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 320 }}>
        <div style={{ fontSize: 36, marginBottom: 12 }}>✅</div>
        <div style={{ fontSize: 16, fontWeight: 700, color: "#1e293b", marginBottom: 6 }}>Permohonan Pemeliharaan Terkirim!</div>
        <div style={{ color: "#64748b", marginBottom: 18, fontSize: 12 }}>Admin BMN akan segera memproses permohonan Anda.</div>
        <AdminButton onClick={() => {
          setSubmitted(false); setSelected([]); setKeteranganMap({});
          setNipConfirm(""); setSetuju(false);
        }}>
          Ajukan Pemeliharaan Lain
        </AdminButton>
      </div>
    );
  }

  return (
    <div>
      <AdminHeaderCard title="Pemeliharaan Barang" subtitle="Ajukan pemeliharaan untuk barang yang terdaftar di DBR Anda" />

      <AdminCard>
        {/* Judul & subtitle justify */}
        <div style={{ fontWeight: 700, color: "#1e293b", fontSize: 13, marginBottom: 4, textAlign: "justify" }}>
          Pilih Barang yang Bermasalah
        </div>
        <div style={{ fontSize: 11, color: "#64748b", marginBottom: 12, textAlign: "justify" }}>
          Ruangan: {myDBR.ruangan} — centang satu atau lebih barang
        </div>

        {/* Daftar barang */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
          {myDBR.barang.map((b, i) => (
            <BarangRow
              key={b.nup}
              barang={b}
              index={i}
              isChecked={!!selected.find(s => s.nup === b.nup)}
              keterangan={keteranganMap[b.nup] || ""}
              onToggle={() => handleToggle(b)}
              onKeteranganChange={(val) => handleKeterangan(b.nup, val)}
            />
          ))}
        </div>

        {/* Persetujuan */}
        <div style={{ background: "#f8fafc", borderRadius: 8, padding: 12, marginTop: 4 }}>
          <div style={{ fontWeight: 700, color: "#1e293b", fontSize: 12, marginBottom: 8 }}>Persetujuan Pemohon</div>
          <label style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10, fontSize: 12, cursor: "pointer" }}>
            <input
              type="checkbox"
              checked={setuju}
              onChange={e => setSetuju(e.target.checked)}
              style={{ width: 14, height: 14, marginTop: 2, accentColor: "#2563eb" }}
            />
            <span>
              Saya, <strong>{currentUser.nama}</strong>, menyatakan setuju untuk mengajukan permohonan
              pemeliharaan terhadap barang yang dipilih di atas.
            </span>
          </label>
          <FormGroup label="Konfirmasi NIP Anda">
            <input
              style={inputStyle}
              value={nipConfirm}
              onChange={e => setNipConfirm(e.target.value)}
              placeholder="Masukkan NIP untuk konfirmasi"
            />
          </FormGroup>
          {nipConfirm && nipConfirm !== currentUser.nip && (
            <div style={{ fontSize: 11, color: "#dc2626", marginTop: -6 }}>
              NIP tidak sesuai dengan akun Anda.
            </div>
          )}
        </div>

        <button
          onClick={() => isValid && setShowForm(true)}
          disabled={!isValid}
          style={{
            width: "100%", marginTop: 16, padding: "9px 0",
            background: isValid ? "#2563eb" : "#94a3b8",
            color: "#fff", border: "none", borderRadius: 6,
            fontWeight: 700, fontSize: 12,
            cursor: isValid ? "pointer" : "not-allowed",
          }}>
          📄 Buat Form Pemeliharaan
        </button>
      </AdminCard>

      {showForm && (
        <FormPemeliharaan
          barangTerpilih={selected}
          keteranganMap={keteranganMap}
          nip={nipConfirm}
          onClose={() => setShowForm(false)}
          onSubmit={() => { setShowForm(false); setSubmitted(true); }}
        />
      )}
    </div>
  );
};

export default PemeliharaanUser;