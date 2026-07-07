import "./DetailPengajuan.css";
import {
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useState, useEffect } from "react";

export default function DetailPengajuan() {
  const navigate = useNavigate();
  const location = useLocation();
  const [suratRespon, setSuratRespon] = useState(null);

  const formatLabel = (text) => {
  return text
    .replace(/([A-Z])/g, " $1")
    .replace(/_/g, " ")
    .replace(/^./, (str) => str.toUpperCase());
};

  const [data, setData] = useState(location.state);
  useEffect(() => {

    if (!data?.id) return;

    const loadData = () => {

        fetch(`http://localhost:8080/api/pengajuan/detail/${data.id}`)
            .then((res) => res.json())
            .then((result) => {

                setData(result);

            })
            .catch(console.error);

    };

    loadData();

    const interval = setInterval(loadData, 5000);

    return () => clearInterval(interval);

}, [data?.id]);

  console.log("DATA =", data);
  console.log("LINK DRIVE =", data?.link_drive);
  console.log(JSON.parse(data.data_pengajuan));

  const detail =
  data?.data_pengajuan
    ? JSON.parse(data.data_pengajuan)
    : {};
  
  const dokumen = [];

Object.keys(detail).forEach((key) => {
  const value = detail[key];

  if (
    typeof value === "string" &&
    (
      value.endsWith(".pdf") ||
      value.endsWith(".jpg") ||
      value.endsWith(".jpeg") ||
      value.endsWith(".png")
    )
  ) {
    dokumen.push({
      nama: value.split("/").pop(),
      file: `http://localhost:8080/${value}`
    });
  }
});
  
  console.log(data);
  console.log(detail);
  
  const formData = data?.data_pengajuan
  ? JSON.parse(data.data_pengajuan)
  : {};

  console.log("ID =", data.id);
  console.log("STATUS SEKARANG =", data.status);

  const updateStatus = async (
    statusBaru,
    catatan=""
)=>{

  console.log("========== UPDATE ==========");
  console.log("ID =", data.id);
  console.log("UPDATE KE =", statusBaru);
  console.log(
    "URL =",
    `http://localhost:8080/api/pengajuan/${data.id}`
  );

    const formData = new FormData();

    formData.append(
        "status",
        statusBaru
    );

    formData.append(
        "catatan_admin",
        catatan
    );

    if(suratRespon){

        formData.append(
            "file_respon",
            suratRespon
        );

    }
    console.log("ID =", data.id);
console.log("STATUS =", status);

    const response=await fetch(

        `http://localhost:8080/api/pengajuan/${data.id}`,

        {

            method:"POST",

            body:formData

        }
        

    );
    console.log(response.status);
    console.log("HTTP =", response.status);

const result = await response.json();

console.log(result);

if (!result.success) {
    alert(result.error || result.message);
    return;
}
console.log(result);

setStatus(statusBaru);
setCatatanAdmin(catatan);

const res = await fetch(
    `http://localhost:8080/api/pengajuan/detail/${data.id}`
);

const terbaru = await res.json();

setData(terbaru);

alert("Status berhasil diperbarui.");

}

  const [status, setStatus] = useState(
    data?.status || "Menunggu"
  );
  useEffect(() => {
  if (data) {
    setStatus(data.status);
    setCatatanAdmin(data.catatan_admin || "");
  }
}, [data]);

  const [catatanAdmin, setCatatanAdmin] =
    useState("");

  if (!data) {
    return (
      <div className="detail-page">

        <div className="detail-card">

          <h2>
            Data pengajuan tidak ditemukan
          </h2>

          <button
            className="back-btn"
          >
            <img
      src="/logo-back.png"
      alt="Back"
      className="back-icon"
    />
          </button>

        </div>

      </div>
    );
  }

const handleApprove = async () => {

    console.log("TOMBOL SELESAI DIKLIK");

    if (!suratRespon) {

        alert("Silakan upload surat balasan.");

        return;

    }

    await updateStatus(
        "Selesai",
        catatanAdmin
    );

};


const handleProcess = async () => {

  await updateStatus(
      "Diproses",
      catatanAdmin
  );

};

const handleReject = async () => {

  if(window.confirm("Tolak pengajuan ini?")){

    await updateStatus(
      "Ditolak",
      catatanAdmin
    );

  }

};

  return (
    <div className="detail-page">

      <div className="detail-card">

        {/* HEADER */}
{/* HEADER */}

<button
  className="back-btn"
  onClick={() => navigate(-1)}
>
  ← Kembali
</button>

<div className="detail-header">

  <div className="header-content">

    <div className="profile-section">

      <div className="avatar-circle">
        {data.nama?.charAt(0)}
      </div>

      <div className="header-info">

        <h1>Detail Pengajuan</h1>

        <h2>{data.nama}</h2>

        <p>
          {data.unit_kerja || "-"} • {data.tanggal_pengajuan || "-"}
        </p>

      </div>

    </div>

    <div className="status-section">

      <span
        className={`status-badge ${
          status === "Menunggu"
            ? "pending"
            : status === "Diproses"
            ? "process"
            : status === "Selesai"
            ? "approved"
            : "rejected"
        }`}
      >
        {status}
      </span>

    </div>

  </div>

</div>

{/* TIMELINE */}
<div className="detail-section">

  <h3>📌 Status Pengajuan</h3>

  <div className="timeline">

    <div className="timeline-item">
      <div className="timeline-dot"></div>

      <div className="timeline-content">
        <h4>Pengajuan Dikirim</h4>
        <p>
          Pengajuan telah masuk ke sistem.
        </p>
      </div>
    </div>

    {(status === "Diproses" ||
      status === "Selesai") && (
      <div className="timeline-item">
        <div className="timeline-dot"></div>

        <div className="timeline-content">
          <h4>Diproses Admin</h4>
          <p>
            Pengajuan sedang diverifikasi.
          </p>
        </div>
      </div>
    )}

    {status === "Selesai" && (
      <div className="timeline-item">
        <div className="timeline-dot"></div>

        <div className="timeline-content">
          <h4>Selesai</h4>
          <p>
            Pengajuan telah Selesai.
          </p>
        </div>
      </div>
    )}

    {status === "Ditolak" && (
      <div className="timeline-item">
        <div
          className="timeline-dot"
          style={{
            background: "#dc2626",
          }}
        ></div>

        <div className="timeline-content">
          <h4>Ditolak</h4>
          <p>
            Pengajuan ditolak oleh admin.
          </p>
        </div>
      </div>
    )}

  </div>

</div>

<div className="detail-section">

<h3>💬 Catatan Admin</h3>

<textarea
rows="5"
value={catatanAdmin}
onChange={(e)=>
setCatatanAdmin(e.target.value)
}
placeholder="Tulis catatan..."
></textarea>

</div>

        {/* DATA PEGAWAI */}
        <div className="detail-section">

          <h3>👤 Data Pegawai</h3>

          <div className="detail-grid">

            <div>
              <label>Nama Pegawai</label>
              <p>{data.nama}</p>
            </div>

            <div>
              <label>NIP</label>
              <p>
                {data.nip || "-"}
              </p>
            </div>

            <div>
              <label>Unit Kerja</label>
              <p>
                {data.unit_kerja || "-"}
              </p>
            </div>

            <div>
              <label>Jabatan</label>
              <p>
                {data.jabatan || "-"}
              </p>
            </div>

          </div>

        </div>

        {/* PENGAJUAN */}
        <div className="detail-section">

          <h3>📋 Informasi Pengajuan</h3>

          <div className="detail-grid">

            <div>
              <label>Jenis Layanan</label>
              <p>{data.layanan}</p>
            </div>

            <div>
              <label>Tanggal Pengajuan</label>
              <p>
{
data.tanggal_pengajuan
? new Date(data.tanggal_pengajuan)
    .toLocaleString("id-ID")
: "-"
}
</p>
            </div>

          </div>
          <div className="detail-section">


<div className="detail-section">

  <h3>📝 Data Pengajuan</h3>

  <div className="detail-grid">

    {Object.entries(formData).map(([key, value]) => {

      if (
        key === "dataPengajuan"
      ) {

        return Object.entries(value).map(([k, v]) => (

          <div key={k}>

            <label>
              {formatLabel(k)}
            </label>

            <p>
              {String(v)}
            </p>

          </div>

        ));

      }

      if (
        [
          "nama",
          "nip",
          "status",
          "layanan",
          "jabatan",
          "unit_kerja"
        ].includes(key)
      ) {
        return null;
      }

      if (
        value === "" ||
        value === null
      ) {
        return null;
      }

      return (

        <div key={key}>

          <label>
            {formatLabel(key)}
          </label>

          <p>
            {String(value)}
          </p>

        </div>

      );

    })}

  </div>

</div>
</div>

        </div>

        {/* DOKUMEN */}
<div className="detail-section">

  <h3>📄 Surat Permohonan</h3>

  {
    data.surat_permohonan ? (

      <div className="document-card">

        <div className="document-info">

          <div className="document-icon">
            📄
          </div>

          <div>

            <h4>Surat Permohonan</h4>

            <p>
              File yang diunggah oleh pemohon
            </p>

          </div>

        </div>

        <div className="document-actions">

          <a
            href={`http://localhost:8080/${data.surat_permohonan}`}
            target="_blank"
            rel="noreferrer"
            className="view-doc-btn"
          >
            👁 Lihat
          </a>

          <a
            href={`http://localhost:8080/${data.surat_permohonan}`}
            download
            className="download-doc-btn"
          >
            ⬇ Download
          </a>

        </div>

      </div>

    ) : (

      <p>Tidak ada surat permohonan.</p>

    )
  }

</div>

<div className="detail-section">

  <h3>📂 Dokumen Pendukung</h3>

  {
    data.link_drive? (

      <a

        href={data.link_drive}

        target="_blank"

        rel="noreferrer"

        className="drive-button"

      >

        📁 Buka Folder Google Drive

      </a>

    ) : (

      <p>
        Tidak ada link Google Drive.
      </p>

    )

  }

</div>

        {/* CATATAN PEMOHON */}
<div className="detail-section">

  <h3>📝 Catatan Pemohon</h3>

  <div className="note-box">

    <strong>
      Keterangan:
    </strong>

    <br />

    Pengajuan layanan
    {" "}
    {data.layanan}
    {" "}
    untuk kebutuhan administrasi
    kepegawaian.

  </div>

</div>

        {/* CATATAN ADMIN */}
        {catatanAdmin && (
          <div className="detail-section">

            <h3>💬 Catatan Admin</h3>

            <div className="admin-note">
              {catatanAdmin}
            </div>

          </div>
        )}

        <div className="response-upload">

<h3>📄 Surat Balasan Admin</h3>

<label
className="upload-response"
>

<input
type="file"
accept=".pdf"
hidden
onChange={(e)=>
setSuratRespon(
e.target.files[0]
)
}
/>

📤 Upload Surat Balasan

</label>

{
suratRespon && (

<p className="response-name">

✅ {suratRespon.name}

</p>

)
}

</div>

        {/* AKSI */}
<div className="action-buttons">

  <button
    className="reject-btn"
    onClick={handleReject}
    disabled={status === "Ditolak"}
  >
    ❌ Tolak
  </button>

  <button
    className="process-btn"
    onClick={handleProcess}
    disabled={status === "Diproses"}
  >
    ⏳ Proses
  </button>

  <button
    className="approve-btn"
    onClick={handleApprove}
    disabled={status === "Selesai"}
  >
    ✅ Selesai
  </button>

</div>

      </div>

    </div>
  )}