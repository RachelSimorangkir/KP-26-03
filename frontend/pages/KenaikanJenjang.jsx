import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./KenaikanJenjang.css";

function KenaikanJenjang() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
const [status, setStatus] = useState("Menunggu");

const [nip, setNip] = useState("");
const [nama, setNama] = useState("");
const [jabatan, setJabatan] = useState("");
const [pangkat, setPangkat] = useState("");
const [unitKerja, setUnitKerja] = useState("");
useEffect(() => {
  const nipLogin = localStorage.getItem("nip");

  console.log("NIP LOGIN =", nipLogin);

  if (!nipLogin) return;

  fetch(`http://localhost:8080/api/pegawai/${nipLogin}`)
    .then((res) => res.json())
    .then((data) => {
      console.log("DATA PEGAWAI =", data);

      setNip(data.nip || "");
      setNama(data.nama || "");
      setJabatan(data.jabatan || "");
      setPangkat(data.pangkat_golongan || "");
      setUnitKerja(data.unit_organisasi || "");
    });
}, []);

const [suratPermohonan, setSuratPermohonan] =
  useState(null);

const [linkDrive, setLinkDrive] = useState("");
const [klasifikasiJabatan, setKlasifikasiJabatan] = useState("");
const [tempatLahir, setTempatLahir] = useState("");
const [tanggalLahir, setTanggalLahir] = useState("");
const [pendidikan, setPendidikan] = useState("");
const [predikatSKP, setPredikatSKP] = useState("");
const [jabatanTujuan, setJabatanTujuan] = useState("");
const [jenjangUsulan, setJenjangUsulan] = useState("");
const [nomorHP, setNomorHP] = useState("");
console.log("STATE UNIT KERJA =", unitKerja);
const handleNipChange = async (e) => {
  const value = e.target.value;

  setNip(value);

  if (value.length < 5) return;

  try {
    const response = await fetch(
      
      `http://localhost:8080/api/pegawai/${value}`
    );

    const data = await response.json();
    console.log("DATA =", data);
    console.log("UNIT ORGANISASI =", data.unit_organisasi);

    if (data) {
      setNama(data.nama || "");
      setJabatan(data.jabatan || "");
      setPangkat(
        data.pangkat_golongan || ""
      );
      setUnitKerja(
        data.unit_organisasi || ""
      );
      console.log("SET UNIT =", data.unit_organisasi);
    }
  } catch (error) {
    console.error(error);
  }
};
const handleSubmit = async () => {

  if (!suratPermohonan) {
    Swal.fire({
      icon: "warning",
      title: "Dokumen belum diupload",
      text: "Upload Surat Permohonan terlebih dahulu."
    });
    return;
  }

  try {

    console.log("UNIT KERJA STATE =", unitKerja);
console.log("LINK DRIVE STATE =", linkDrive);

    const formData = new FormData();

    formData.append("nip", nip);
    formData.append("nama", nama);
    formData.append("jabatan", jabatan);
    formData.append("pangkat", pangkat);
    formData.append("unit_kerja", unitKerja);

    formData.append("layanan", "Rekomendasi");
    formData.append(
      "subLayanan",
      "Kenaikan Jenjang Jabatan"
    );

    formData.append("status", "Menunggu");

    formData.append(
      "dataPengajuan",
      JSON.stringify({

        klasifikasiJabatan,
        tempatLahir,
        tanggalLahir,
        pendidikan,
        predikatSKP,
        jabatanTujuan,
        jenjangUsulan,
        nomorHP

      })
    );

    formData.append(
      "link_drive",
      linkDrive
    );

    if (suratPermohonan) {
      formData.append(
        "suratPermohonan",
        suratPermohonan
      );
    }
    console.log("===== FORM DATA =====");

for (const pair of formData.entries()) {
  console.log(pair[0], "=", pair[1]);
}

    const response = await fetch(
      "http://localhost:8080/api/pengajuan",
      {
        method: "POST",
        body: formData
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || result.message);
    }

    setSubmitted(true);
    setStatus("Menunggu");

    await Swal.fire({
      icon: "success",
      title: "Berhasil",
      text: result.message
    });

  } catch (error) {

    console.error(error);

    Swal.fire({
      icon: "error",
      title: "Gagal",
      text: error.message
    });

  }

};

  return (
    <div className="kenaikan-page">

      {/* BACK BUTTON */}
      <button
        className="back-button"
        onClick={() => navigate("/kepegawaian/rekomendasi")}
      >
        <img
      src="/logo-back.png"
      alt="Back"
      className="back-icon"
    />
      </button>

      {/* HEADER */}
<div className="page-header">
  <div className="header-icon">📈</div>

  <div className="header-content">
    <h1>
      Kenaikan Jenjang Jabatan &
      Perpindahan Dari Jabatan Lain
    </h1>

    <p>
      Pengajuan kenaikan jenjang jabatan
      fungsional dan perpindahan dari
      jabatan lain secara elektronik.
    </p>
  </div>
</div>

{!submitted ? (
  <>

      {/* PERSYARATAN */}
      <div className="requirement-card">

        <h2>Persyaratan Umum</h2>

        <ol>
          <li>Surat Pengantar dari Pimpinan Unit Kerja.</li>
          <li>Sertifikat Uji Kompetensi Kenaikan Jenjang Jabatan.</li>
          <li>SPTJM (Surat Pernyataan Pertanggungjawaban Mutlak) dari Pimpinan.</li>
          <li>PAK Konversi.</li>
          <li>SKP 1 (Satu) Tahun Terakhir.</li>
          <li>Surat Pernyataan Tidak Sedang Hukuman Disiplin.</li>
          <li>Surat Pernyataan Tidak Sedang Tugas Belajar.</li>
          <li>Surat Rekomendasi Persetujuan dari Unit Pembina.</li>
          <li>SK Pangkat Terakhir.</li>
          <li>SK Jabatan Terakhir.</li>
        </ol>

      </div>

      {/* FORM */}
      <div className="form-card">

        <h2>Formulir Pengajuan</h2>

        <div className="form-grid">

          {/* NIP */}
          <div className="form-group full">
            <label>NIP *</label>

            <div className="nip-search">
              <input
  type="text"
  placeholder="Masukkan NIP"
  value={nip}
  onChange={handleNipChange}
/>
            </div>
          </div>

          {/* DATA PEGAWAI */}
          <div className="form-group">
            <label>Nama *</label>
            <input
  type="text"
  value={nama}
  readOnly
/>
          </div>

          <div className="form-group">
            <label>Jabatan Terakhir *</label>
            <input
  type="text"
  value={jabatan}
  readOnly
/>
          </div>

          <div className="form-group">
            <label>Klasifikasi Jabatan *</label>

            <select>
              <option>Pilih Klasifikasi Jabatan</option>
              <option>Jabatan Struktural</option>
              <option>Jabatan Fungsional</option>
              <option>Jabatan Fungsional Umum / Pelaksana</option>
            </select>
          </div>

          <div className="form-group">
            <label>Pangkat / Golongan *</label>
            <input
  type="text"
  value={pangkat}
  readOnly
/>
          </div>

          <div className="form-group">
            <label>Tempat Lahir *</label>
            <input
type="text"
value={tempatLahir}
onChange={(e)=>
setTempatLahir(e.target.value)
}
/>
          </div>

          <div className="form-group">
            <label>Tanggal Lahir *</label>
            <input
type="date"
value={tanggalLahir}
onChange={(e)=>
setTanggalLahir(e.target.value)
}
/>
          </div>

          <div className="form-group">
            <label>Pendidikan Terakhir *</label>

<input
type="text"
value={pendidikan}
onChange={(e)=>
setPendidikan(e.target.value)
}
/>
          </div>

          <div className="form-group">
            <label>Predikat SKP *</label>

           <input
type="text"
value={predikatSKP}
onChange={(e)=>
setPredikatSKP(e.target.value)
}
/>
          </div>

          <div className="form-group">
            <label>Jabatan Fungsional Yang Dituju *</label>

<select
  value={klasifikasiJabatan}
  onChange={(e) =>
    setKlasifikasiJabatan(e.target.value)
  }
>
              <option>Pilih Jabatan Fungsional</option>
              <option>JF Widyaiswara</option>
              <option>JF Pranata Komputer</option>
              <option>JF Perencana</option>
              <option>JF Analis Kebijakan</option>
              <option>JF Pustakawan</option>
              <option>JF Auditor</option>
              <option>JF Pranata Humas</option>
              <option>Lainnya</option>
            </select>
          </div>

          <div className="form-group">
            <label>Jenjang Yang Diusulkan *</label>

           <input
type="text"
value={jenjangUsulan}
onChange={(e)=>
setJenjangUsulan(e.target.value)
}
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
            <label>Nomor WhatsApp *</label>

            <input
  type="text"
  placeholder="08xxxxxxxxxx"
  value={nomorHP}
  onChange={(e) =>
    setNomorHP(e.target.value)
  }
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

    {
      suratPermohonan && (
        <div className="uploaded-file">
          ✅ {suratPermohonan.name}
        </div>
      )
    }

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
      value={linkDrive}
      onChange={(e) =>
        setLinkDrive(
          e.target.value
        )
      }
      placeholder="https://drive.google.com/drive/folders/..."
    />

  </div>

  <div className="drive-note">

    <strong>Catatan:</strong>

    Upload seluruh dokumen
    persyaratan ke Google Drive
    kemudian tempelkan link folder
    di atas.

  </div>

</div>

  </>
) : (

<div className="tracking-card">

  <h2>Status Pengajuan</h2>

  <div className="timeline">

    {/* STEP 1 */}
    <div className="timeline-item completed">

      <div className="timeline-dot"></div>

      <div className="timeline-content">

        <h4>Pengajuan Dikirim</h4>

        <span>
          {new Date().toLocaleString("id-ID")}
        </span>

      </div>

    </div>

    {/* STEP 2 */}
    <div
      className={`timeline-item ${
        status === "Menunggu"
          ? "current"
          : status === "Diproses" || status === "Selesai"
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
            ? "Sedang diproses admin"
            : "Verifikasi selesai"}
        </span>

      </div>

    </div>

    {/* STEP 3 */}
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
            ? "Permohonan telah selesai"
            : "Menunggu penyelesaian"}
        </span>

      </div>

    </div>

  </div>

</div>

)}
      {/* SUBMIT */}
{!submitted && (
  <button
    type="button"
    className="submit-btn"
    onClick={handleSubmit}
  >
    Ajukan Permohonan
  </button>
)}
    </div> 

    
  );
} 


export default KenaikanJenjang;