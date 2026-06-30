import "./MutasiInternal.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";

function MutasiInternal() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
const [status, setStatus] = useState("Menunggu");

const [suratPermohonan, setSuratPermohonan] =
  useState(null);

const [driveLink, setDriveLink] =
  useState("");

  const formData = new FormData();

formData.append("nip", nip);
formData.append("nama", nama);
formData.append("jabatan", jabatan);
formData.append("unitKerja", unitKerja);

formData.append("layanan","Cuti");

formData.append("jenisCuti", jenisCuti);

formData.append("tanggalMulai", tanggalMulai);

formData.append("tanggalSelesai", tanggalSelesai);

formData.append("status","Menunggu");

formData.append("driveLink", driveLink);

formData.append("suratPermohonan", suratPermohonan);

  const handleSubmit = async () => {

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

    setSubmitted(true);
    setStatus("Menunggu");

    Swal.fire({
      icon: "success",
      title: "Berhasil",
      text:
        "Pengajuan Mutasi Internal berhasil dikirim.",
    });

  } catch (error) {

    Swal.fire({
      icon: "error",
      title: "Gagal",
      text:
        "Pengajuan gagal dikirim.",
    });

  }
};
const [nip, setNip] = useState("");
const [nama, setNama] = useState("");
const [jabatan, setJabatan] = useState("");
const [unitKerja, setUnitKerja] = useState("");

const handleNipChange = async (e) => {
  const value = e.target.value;

  setNip(value);

  if (value.length < 5) return;

  try {
    const response = await fetch(
    "http://localhost:8080/api/pengajuan",
    {
        method:"POST",
        body:formData
    }
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
    <div className="mutasiinternal-page">

      <button
        className="back-button"
        onClick={() =>
          navigate("/kepegawaian/rekomendasi/mutasi-promosi")
        }
      >
        ← Kembali
      </button>

      {/* HEADER */}

      <div className="page-header">

        <div className="header-icon">
          🏢
        </div>

        <div>
          <h1>Mutasi Antar Instansi</h1>

          <p>
            Pengajuan perpindahan pegawai antar unit kerja
            dalam lingkungan Kementerian Agama.
          </p>
        </div>

      </div>
      
      {!submitted ? (
<>

      {/* PERSYARATAN */}
<div className="info-card">

  <h2>Persyaratan Umum</h2>

<ol className="number-list">
  <li>
    Surat Pengantar dari Pimpinan Unit Kerja Tujuan
    ke Kepala Badan Litbang dan Diklat.
  </li>

  <li>
    Surat Permohonan dari Pegawai yang mutasi ke
    Pimpinan Unit Kerja Penerima dengan menyebutkan
    jabatan dan alasan usul mutasi.
  </li>

  <li>
    ANJAB dan ABK yang ditandatangani oleh
    Pimpinan Unit Kerja Penerima.
  </li>

  <li>
    SPTJM yang ditandatangani oleh
    Pimpinan Unit Kerja Penerima.
  </li>

  <li>
    Surat Pernyataan Persetujuan dari Pimpinan.
  </li>

  <li>
    ANJAB dan ABK dari Pimpinan Unit Kerja Yang Melepas
    (Minimal Eselon 2).
  </li>

  <li>
    SPTJM dari Kanwil Riau.
  </li>

  <li>
    Surat Pernyataan Persetujuan dari Pimpinan Unit Kerja
    Yang Melepas (Minimal Eselon 2).
  </li>

  <li>
    Surat Keterangan Bebas Temuan yang diterbitkan
    Inspektorat Jenderal dimana PNS berasal.
  </li>

  <li>
    SK Pangkat Terakhir.
  </li>

  <li>
    SK Jabatan Terakhir.
  </li>

  <li>
    SKP 2 (dua) Tahun Terakhir dari e-Kinerja BKN.
  </li>

  <li>
    Surat Pernyataan Tidak Sedang Proses atau Menjalani
    Hukuman Disiplin dan atau Proses Peradilan yang
    ditandatangani oleh Pimpinan Unit Kerja Yang Melepas
    (Minimal Eselon 2).
  </li>

  <li>
    Surat Pernyataan Tidak Sedang Menjalani Tugas Belajar
    atau Ikatan Dinas yang ditandatangani oleh Pimpinan
    Unit Kerja Yang Melepas (Minimal Eselon 2).
  </li>

  <li>
    Surat Keterangan Bebas Temuan yang diterbitkan
    Inspektorat Jenderal dimana PNS berasal.
  </li>
</ol>

</div>
</>

) : (

<div className="tracking-card">

  <h2>Status Pengajuan Mutasi Internal</h2>

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
          Menunggu verifikasi admin
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
          Menunggu penyelesaian
        </span>
      </div>
    </div>

  </div>

</div>

)}

      {/* FORM DATA PEGAWAI */}
<div className="form-card">

  <h2>Data Pegawai</h2>

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
      <label>Jabatan *</label>

     <input
  type="text"
  value={jabatan}
  readOnly
/>
    </div>

    <div className="form-group">
      <label>Unit / Satuan Kerja Asal *</label>

      <input
  type="text"
  value={unitKerja}
  readOnly
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
    mutasi internal ke Google Drive,
    kemudian tempelkan link folder di atas.

  </div>

</div>

      <div className="submit-wrapper">

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

        <button
  className="submit-btn"
  onClick={handleSubmit}
>
  Ajukan Permohonan
</button>

      </div>

    </div>
  );
}

export default MutasiInternal;