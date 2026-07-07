import "./SKBTOrganisasi.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";


function SKBTOrganisasi() {
  const navigate = useNavigate();

  const [submitted, setSubmitted] = useState(false);
  const [nip, setNip] = useState("");
const [nama, setNama] = useState("");
const [jabatan, setJabatan] = useState("");
const [pangkat, setPangkat] = useState("");
const [unitOrganisasi, setUnitOrganisasi] = useState("");
const [status, setStatus] = useState("Menunggu");
const [email, setEmail] = useState("");
const [noHp, setNoHp] = useState("");
const [keperluan, setKeperluan] = useState("");
  const handleSubmit = async () => {

    const formData = new FormData();

formData.append("nip", nip);
formData.append("nama", nama);
formData.append("jabatan", jabatan);
formData.append("unitKerja", unitKerja);

formData.append("layanan","SKBT Organisasi");

formData.append("status","Menunggu");

formData.append("linkDrive", linkDrive);

formData.append("suratPermohonan", suratPermohonan);


  try {
    const response = await fetch(
      "http://localhost:8080/api/pengajuan",
      {
        method: "POST",
        body:formData
        },
    );

    const result = await response.json();

    if (result.success) {
  setSubmitted(true);
  setStatus("Menunggu");

  Swal.fire({
    icon: "success",
    title: "Berhasil!",
    text: "Pengajuan SKBT Organisasi berhasil dikirim.",
    confirmButtonColor: "#2563eb",
  });
}
  } catch (error) {
    console.error(error);
    Swal.fire({
      icon: "error",
      title: "Gagal!",
      text: "Pengajuan gagal dikirim.",
      confirmButtonColor: "#dc2626",
    });
  }
};

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
      setPangkat(data.pangkat_golongan || "");
      setUnitOrganisasi(data.unit_organisasi || "");
    }
  } catch (error) {
    console.error(error);
  }
};

  return (
    <div className="skbt-organisasi-page">

      <button
        className="back-button"
        onClick={() => navigate("/kepegawaian/skbt")}
      >
        <img
      src="/logo-back.png"
      alt="Back"
      className="back-icon"
    />
      </button>

      {/* HEADER */}
      <div className="page-header">

        <div className="header-text">
          <h1>Pengajuan SKBT Organisasi</h1>

          <p>
            Lengkapi data berikut untuk mengajukan
            Surat Keterangan Bebas Temuan (SKBT).
          </p>
        </div>

      </div>

      {!submitted ? (
  <>

      {/* DATA PEGAWAI */}
      <div className="form-card">

        <h2>Data Pegawai</h2>

        <div className="form-grid">

          <div className="form-group">
            <label>NIP</label>
            <input
  type="text"
  placeholder="Masukkan NIP"
  value={nip}
  onChange={handleNipChange}
/>
          </div>

          <div className="form-group">
            <label>Nama Pegawai</label>
            <input
  type="text"
  value={nama}
  readOnly
/>
          </div>

          <div className="form-group">
            <label>Unit Kerja</label>
            <input
  type="text"
  value={unitOrganisasi}
  readOnly
/>
          </div>

          <div className="form-group">
            <label>Jabatan</label>
            <input
  type="text"
  value={jabatan}
  readOnly
/>
          </div>

          <div className="form-group">
  <label>Pangkat / Golongan</label>

  <input
    type="text"
    value={pangkat}
    readOnly
  />
</div>

          <div className="form-group">
            <label>Email</label>
            <input
  type="email"
  placeholder="Masukkan Email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>
          </div>

          <div className="form-group">
            <label>Nomor HP</label>
            <input
  type="text"
  placeholder="Masukkan Nomor HP"
  value={noHp}
  onChange={(e) => setNoHp(e.target.value)}
/>
          </div>

        </div>

      </div>

      {/* KEPERLUAN */}
      <div className="form-card">

        <h2>Keperluan Pengajuan</h2>

        <div className="form-group">

          <label>Keperluan SKBT</label>

          <textarea
  rows="5"
  placeholder="Jelaskan keperluan pengajuan SKBT"
  value={keperluan}
  onChange={(e) => setKeperluan(e.target.value)}
/>

        </div>

      </div>

      {/* UPLOAD */}
      <div className="form-card">

        <h2>Upload Dokumen</h2>

        <div className="upload-grid">

          <div className="upload-box">
            <label>SK Pengangkatan</label>
            <input type="file" />
          </div>

          <div className="upload-box">
            <label>Surat Permohonan</label>
            <input type="file" />
          </div>

          <div className="upload-box">
            <label>Dokumen Pendukung</label>
            <input type="file" />
          </div>

        </div>

      </div>

      {/* BUTTON */}
      <div className="button-group">

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
  <h2>Status Pengajuan SKBT Organisasi</h2>

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
            ? "Permohonan telah selesai"
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

export default SKBTOrganisasi;