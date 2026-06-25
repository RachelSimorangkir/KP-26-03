import "./Cuti.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";

function Cuti() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
const [status, setStatus] = useState("Menunggu");

const [suratPermohonan, setSuratPermohonan] =
  useState(null);

const [driveLink, setDriveLink] =
  useState("");
const handleSubmit = async () => {
  console.log("Tombol Ajukan diklik");

  if (!suratPermohonan) {
    Swal.fire({
      icon: "warning",
      title: "Surat Permohonan Belum Diupload",
      text:
        "Silakan upload Surat Permohonan terlebih dahulu.",
    });

    return;
  }

  if (!driveLink) {
    Swal.fire({
      icon: "warning",
      title: "Link Google Drive Kosong",
      text:
        "Silakan masukkan link folder Google Drive.",
    });

    return;
  }

try {

  const response = await fetch(
    "http://localhost:8080/api/pengajuan",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({

        nip,
        nama,
        jabatan,
        unitKerja,

        layanan: "Cuti",

        jenisCuti,

        tanggalMulai,

        tanggalSelesai,

        status: "Menunggu",

        driveLink,

      }),
    }
  );

  const result = await response.json();

  if (result.success) {

    setSubmitted(true);

    setStatus("Menunggu");

    Swal.fire({
      icon: "success",
      title: "Berhasil",
      text: "Pengajuan cuti berhasil dikirim.",
    });

  }

} catch (error) {

  console.error(error);

  Swal.fire({
    icon: "error",
    title: "Gagal",
    text: "Pengajuan gagal dikirim.",
  });

}
};
const [nip, setNip] = useState("");
const [nama, setNama] = useState("");
const [jabatan, setJabatan] = useState("");
const [unitKerja, setUnitKerja] = useState("");
const [jenisCuti, setJenisCuti] = useState("");

const [tanggalMulai, setTanggalMulai] = useState("");

const [tanggalSelesai, setTanggalSelesai] = useState("");
const handleNipChange = async (e) => {
  const value = e.target.value;

  setNip(value);

  if (value.length < 5) return;

  try {
    const response = await fetch(
      `http://localhost:8080/api/pegawai/${value}`
    );

    const data = await response.json();

    if (data) {
      setNama(data.nama || "");
      setJabatan(data.jabatan || "");
      setUnitKerja(data.unit_organisasi || "");
    }
  } catch (error) {
    console.error(error);
  }
};

  return (
    <div className="cuti-page">

      <button
        className="back-button"
        onClick={() => navigate("/kepegawaian")}
      >
        ← Kembali
      </button>

      {/* ================= HEADER ================= */}

<div className="page-header">

  <div className="header-icon">
    🏖️
  </div>

  <div>

    <h1>Pengajuan Cuti</h1>

    <p>
      Pengajuan cuti pegawai secara elektronik
      melalui Portal Layanan Internal BMBPSDM.
    </p>

  </div>

</div>

{/* ================= FORM / TIMELINE ================= */}

{!submitted ? (

<>

{/* ================= PANDUAN ================= */}

<div className="guide-card">

  <h2>Panduan Penggunaan Sistem Pengajuan Cuti</h2>

  <ol className="guide-list">

    <li>
      Klik <strong>Download Template</strong> untuk
      mengunduh form cuti.
    </li>

    <li>
      Upload dokumen cuti pada aplikasi
      <strong> Srikandi </strong>
      beserta lampirannya.
    </li>

    <li>
      Isi data pegawai.
    </li>

    <li>
      Ketik <strong>NIP</strong>, maka data pegawai
      akan terisi otomatis.
    </li>

    <li>
      Pilih jenis cuti, tanggal mulai,
      tanggal selesai serta durasi cuti.
    </li>

    <li>
      Upload Surat Permohonan yang sudah
      ditandatangani.
    </li>

    <li>
      Tempel link Google Drive yang berisi
      seluruh dokumen pendukung.
    </li>

  </ol>

</div>

{/* ================= DATA PEGAWAI ================= */}

<div className="form-card">

  <h2>Data Pegawai</h2>

  <div className="tips-box">

    Isi data pegawai sebelum melakukan
    pengajuan cuti.

  </div>

  <div className="form-grid">

    <div className="form-group">

      <label>NIP *</label>

      <input
        type="text"
        placeholder="Masukkan NIP"
        value={nip}
        onChange={handleNipChange}
      />

    </div>

    <div className="form-group">

      <label>Nama Pegawai *</label>

      <input
        type="text"
        value={nama}
        readOnly
      />

    </div>

    <div className="form-group">

      <label>Jabatan *</label>

      <input
        type="text"
        value={jabatan}
        readOnly
      />

    </div>

    <div className="form-group">

      <label>Unit Kerja *</label>

      <input
        type="text"
        value={unitKerja}
        readOnly
      />

    </div>

    <div className="form-group full-width">

      <label>Status Kepegawaian *</label>

      <select>

        <option>Pilih Status Kepegawaian</option>

        <option>PNS</option>

        <option>PPPK</option>

      </select>

    </div>

  </div>

</div>

{/* ================= DETAIL CUTI ================= */}

<div className="form-card">

  <h2>Detail Cuti</h2>

  <div className="form-grid">

    <div className="form-group full-width">

      <label>Jenis Cuti *</label>

      <select>

        <option>Pilih Jenis Cuti</option>

        <option>Cuti Tahunan</option>

        <option>Cuti Besar</option>

        <option>Cuti Sakit</option>

        <option>Cuti Melahirkan</option>

        <option>Cuti Karena Alasan Penting</option>

        <option>Cuti di Luar Tanggungan Negara</option>

      </select>

    </div>

    <div className="form-group">

      <label>Tanggal Mulai *</label>

      <input type="date" />

    </div>

    <div className="form-group">

      <label>Tanggal Selesai *</label>

      <input type="date" />

    </div>

    <div className="form-group">

      <label>Durasi Cuti *</label>

      <input
        type="number"
        placeholder="Jumlah Hari"
      />

    </div>

  </div>

</div>
{/* ================= SURAT PERMOHONAN ================= */}

<div className="form-card">

  <h2>Surat Permohonan</h2>

  <div className="upload-area">

    <div className="upload-icon">
      📄
    </div>

    <label htmlFor="surat">
      Upload Surat Permohonan
    </label>

    <input
      id="surat"
      type="file"
      accept=".pdf"
      onChange={(e) =>
        setSuratPermohonan(
          e.target.files[0]
        )
      }
    />

    {suratPermohonan && (

      <div className="uploaded-file">

        ✅ {suratPermohonan.name}

      </div>

    )}

    <span>

      PDF Maksimal 10 MB

    </span>

  </div>

</div>

{/* ================= DOKUMEN PENDUKUNG ================= */}

<div className="form-card">

  <h2>Dokumen Pendukung</h2>

  <div className="form-group">

    <label>

      Link Folder Google Drive

    </label>

    <input
      type="text"
      placeholder="https://drive.google.com/drive/folders/..."
      value={driveLink}
      onChange={(e) =>
        setDriveLink(e.target.value)
      }
    />

  </div>

  <div className="drive-note">

    <strong>Catatan :</strong>

    <br /><br />

    Upload seluruh dokumen pendukung
    ke dalam satu folder Google Drive.

    <br /><br />

    Pastikan akses folder adalah

    <strong>

      {" "}
      "Siapa saja yang memiliki link dapat melihat"

    </strong>

  </div>

</div>

{/* ================= PERNYATAAN ================= */}

<div className="form-card">

  <label className="checkbox-wrapper">

    <input type="checkbox" />

    <span>

      Saya menyatakan bahwa seluruh data
      dan dokumen yang saya unggah adalah
      benar dan dapat dipertanggungjawabkan.

    </span>

  </label>

</div>

{/* ================= BUTTON ================= */}

<div className="cuti-actions">

  <button
    className="submit-btn"
    onClick={handleSubmit}
  >

    Ajukan Permohonan

  </button>

</div>

</>

) : (

<div className="tracking-card">

  <h2>Status Pengajuan Cuti</h2>

  <div className="timeline">

    <div className="timeline-item completed">

      <div className="timeline-dot"></div>

      <div className="timeline-content">

        <h4>Pengajuan Dikirim</h4>

        <span>
          {new Date().toLocaleString("id-ID")}
        </span>

      </div>

    </div>

    <div
      className={`timeline-item ${
        status === "Menunggu"
          ? "current"
          : status === "Diproses" ||
            status === "Selesai"
          ? "completed"
          : "pending"
      }`}
    >

      <div className="timeline-dot"></div>

      <div className="timeline-content">

        <h4>Sedang Diproses</h4>

        <span>

          {status === "Menunggu"
            ? "Menunggu verifikasi admin"
            : status === "Diproses"
            ? "Sedang diverifikasi"
            : "Verifikasi selesai"}

        </span>

      </div>

    </div>

    <div
      className={`timeline-item ${
        status === "Selesai"
          ? "completed"
          : "pending"
      }`}
    >

      <div className="timeline-dot"></div>

      <div className="timeline-content">

        <h4>Selesai</h4>

        <span>

          {status === "Selesai"
            ? "Pengajuan cuti telah selesai"
            : "Menunggu penyelesaian"}

        </span>

      </div>

    </div>

  </div>

</div>

)}

</div>

  );
}

export default Cuti;


     