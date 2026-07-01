import "./AlihFungsi.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";


function AhliFungsi() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
const [status, setStatus] = useState("Menunggu");

const [suratPermohonan, setSuratPermohonan] =
  useState(null);

const [driveLink, setDriveLink] =
  useState("");

const handleSubmit = async () => {
  const formData = new FormData();

formData.append("nip", nip);
formData.append("nama", nama);
formData.append("jabatan", jabatan);
formData.append("unitKerja", unitKerja);

formData.append(
  "layanan",
  "Alih Fungsi"
);

formData.append("status","Menunggu");

formData.append(
  "driveLink",
  driveLink
);

formData.append(
  "dataPengajuan",
  JSON.stringify({
    pendidikan,
    nomorHP,
    jabatanTujuan,
    alasan,
  })
);

formData.append(
  "suratPermohonan",
  suratPermohonan
);

  if (!suratPermohonan) {
    Swal.fire({
      icon: "warning",
      title: "Surat Permohonan Belum Diupload",
      text: "Silakan upload Surat Permohonan terlebih dahulu.",
    });
    return;
  }

  if (!driveLink) {
    Swal.fire({
      icon: "warning",
      title: "Link Google Drive Kosong",
      text: "Silakan masukkan link Google Drive.",
    });
    return;
  }

  try {

    const response = await fetch(
    "http://localhost:8080/api/pengajuan",
    {
        method:"POST",
        body:formData
    }
);

    const result = await response.json();

    if (result.success) {

      setSubmitted(true);
      setStatus("Menunggu");

      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Pengajuan Alih Fungsi berhasil dikirim.",
      });

    } else {

      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: result.message,
      });

    }

  } catch (error) {

    console.error(error);

    Swal.fire({
      icon: "error",
      title: "Server Error",
      text: "Tidak dapat terhubung ke server.",
    });

  }

};

const [nip, setNip] = useState("");
const [nama, setNama] = useState("");
const [jabatan, setJabatan] = useState("");
const [unitKerja, setUnitKerja] = useState("");

const [pendidikan, setPendidikan] = useState("");
const [nomorHP, setNomorHP] = useState("");
const [jabatanTujuan, setJabatanTujuan] = useState("");
const [alasan, setAlasan] = useState("");
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
    <div className="alihfungsi-page">

      {/* BACK BUTTON */}
      <button
        className="back-button"
        onClick={() => navigate("/kepegawaian/rekomendasi")}
      >
        ← Kembali
      </button>

      {/* HEADER */}
<div className="page-header">
  <div className="header-icon">🧩</div>

  <div className="header-content">
    <h1>Alih Fungsi</h1>

    <p>
      Pengajuan alih fungsi jabatan pegawai sesuai
      kebutuhan organisasi dan ketentuan yang berlaku.
    </p>
  </div>
</div>

      {/* FORM */}
      {!submitted ? (
<>
      <div className="form-card">

        <h2>🧩 Formulir Pengajuan Alih Fungsi</h2>

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
            <label>Nama + Gelar Akademik *</label>

           <input
  type="text"
  value={nama}
  readOnly
/>
          </div>

          <div className="form-group">
            <label>Jabatan Saat Ini *</label>

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

          <div className="form-group">
            <label>Pendidikan Terakhir *</label>

            <input
  type="text"
  value={pendidikan}
  onChange={(e)=>setPendidikan(e.target.value)}
  placeholder="Contoh: S1 Sistem Informasi"
/>
          </div>

          <div className="form-group">
            <label>Nomor WhatsApp *</label>

           <input
  type="text"
  value={nomorHP}
  onChange={(e)=>setNomorHP(e.target.value)}
  placeholder="08xxxxxxxxxx"
/>
          </div>

          <div className="form-group full-width">
            <label>Jabatan / Fungsi Yang Dituju *</label>

            <input
  type="text"
  value={jabatanTujuan}
  onChange={(e)=>setJabatanTujuan(e.target.value)}
  placeholder="Masukkan Jabatan atau Fungsi Yang Dituju"
/>
          </div>

          <div className="form-group full-width">
            <label>Alasan Pengajuan Alih Fungsi *</label>

            <textarea
  rows="5"
  value={alasan}
  onChange={(e)=>setAlasan(e.target.value)}
  placeholder="Jelaskan alasan pengajuan alih fungsi..."
/>
          </div>

        </div>

      </div>

      {/* UPLOAD */}
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

    <span>PDF Maks. 10 MB</span>

  </div>

</div>

<div className="form-card">

  <h2>Dokumen Pendukung</h2>

  <div className="form-group">

    <label>
      Link Folder Google Drive
    </label>

    <input
      type="text"
      value={driveLink}
      onChange={(e) =>
        setDriveLink(e.target.value)
      }
      placeholder="https://drive.google.com/drive/folders/..."
    />

  </div>

  <div className="drive-note">

    <strong>Catatan:</strong>

    Upload seluruh dokumen persyaratan
    alih fungsi ke Google Drive,
    kemudian tempelkan link folder di atas.

  </div>

</div>

<div className="form-card">

  <label className="checkbox-wrapper">

    <input type="checkbox" />

    <span>
      Saya menyatakan bahwa data dan
      dokumen yang diunggah adalah benar
      dan dapat dipertanggungjawabkan.
    </span>

  </label>

</div>

      {/* SUBMIT */}
      {!submitted && (

<div className="submit-wrapper">

    <button
        className="submit-btn"
        onClick={handleSubmit}
    >
        Ajukan Permohonan
    </button>

</div>

)}

      </>

) : (

<div className="tracking-card">

  <h2>Status Pengajuan Alih Fungsi</h2>

 <div className="timeline">

  <div className="timeline-item completed">

    <div className="timeline-dot"></div>

    <div className="timeline-content">

      <h4>Pengajuan Dikirim</h4>

      <span>
        {new Date().toLocaleString("id-ID")}
      </span>

      <p>
        {
          status==="Menunggu"
          ? "Menunggu verifikasi admin"
          : status==="Diproses"
          ? "Sedang diverifikasi"
          : "Verifikasi selesai"
        }
      </p>

    </div>

  </div>

  <div
    className={`timeline-item ${
      status==="Menunggu"
      ? "current"
      : status==="Diproses" || status==="Selesai"
      ? "completed"
      : "pending"
    }`}
  >

    <div className="timeline-dot"></div>

    <div className="timeline-content">

      <h4>Sedang Diproses</h4>

      <span>
        {
          status==="Menunggu"
          ? "Menunggu verifikasi admin"
          : "Sedang diproses admin"
        }
      </span>

    </div>

  </div>

  <div
    className={`timeline-item ${
      status==="Selesai"
      ? "completed"
      : "pending"
    }`}
  >

    <div className="timeline-dot"></div>

    <div className="timeline-content">

      <h4>Selesai</h4>

      <span>
        {
          status==="Selesai"
          ? "Permohonan telah selesai"
          : "Menunggu penyelesaian"
        }
      </span>

    </div>

  </div>

</div>

</div>

)}

    </div>
  );
}

export default AhliFungsi;