import "./DetailPengajuanUser.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function DetailPengajuanUser() {

    const location = useLocation();
    const navigate = useNavigate();

    const [data, setData] = useState(location.state);

    useEffect(() => {

        if (!data?.id) return;

        const loadData = () => {

            fetch(
                `http://localhost:8080/api/pengajuan/detail/${data.id}`
            )
            .then(res => res.json())
            .then(result => {

                setData(result);

                console.log(result.status);

            });

        };

        loadData();

        const interval = setInterval(loadData, 5000);

        return () => clearInterval(interval);

    }, [data?.id]);

if (!data) {
    return (
        <div className="detail-user-page">
            <div className="detail-user-card">
                <h2>Data pengajuan tidak ditemukan</h2>

                <button
                    className="back-btn"
                    onClick={() => navigate("/")}
                >
                    Kembali
                </button>
            </div>
        </div>
    );
}

  return (

  <div className="detail-user-page">

    <div className="detail-user-card">

      <button
        className="back-btn"
        onClick={() => navigate("/")}
      >
        ← Kembali
      </button>

      {/* HEADER */}
      <div className="detail-header">

        <div className="avatar">
          {data.nama?.charAt(0)}
        </div>

        <div>

          <h1>Detail Pengajuan</h1>

          <h2>{data.nama}</h2>

          <p>{data.layanan}</p>

        </div>

      </div>

      {/* PROGRESS */}
      <div className="status-wrapper">

        <div className="progress-card">

          <div className="progress-step active">

            <div className="circle">
              ✓
            </div>

            <span>Pengajuan</span>

          </div>

          <div className="line"></div>

          <div
            className={`progress-step ${
              data.status !== "Menunggu"
                ? "active"
                : ""
            }`}
          >

            <div className="circle">
              ✓
            </div>

            <span>Diproses</span>

          </div>

          <div className="line"></div>

          <div
            className={`progress-step ${
              data.status === "Selesai"
                ? "active"
                : ""
            }`}
          >

            <div className="circle">
              ✓
            </div>

            <span>Selesai</span>

          </div>

        </div>

      </div>

      {/* STATUS */}
      <div className="status-box">

        <h3>Status Pengajuan</h3>

        <span
          className={`status ${
            data.status === "Menunggu"
              ? "pending"
              : data.status === "Diproses"
              ? "process"
              : data.status === "Selesai"
              ? "approved"
              : "rejected"
          }`}
        >
          {data.status}
        </span>

      </div>

      {/* DATA PEGAWAI */}
      <div className="detail-grid">

        <div>

          <label>Nama</label>

          <p>{data.nama}</p>

        </div>

        <div>

          <label>NIP</label>

          <p>{data.nip}</p>

        </div>

        <div>

          <label>Unit Kerja</label>

          <p>{data.unit_kerja || "-"}</p>

        </div>

        <div>

          <label>Jabatan</label>

          <p>{data.jabatan || "-"}</p>

        </div>

        <div>

          <label>Jenis Layanan</label>

          <p>{data.layanan}</p>

        </div>

        <div>

          <label>Tanggal Pengajuan</label>

          <p>
            {data.tanggal_pengajuan
              ? new Date(
                  data.tanggal_pengajuan
                ).toLocaleString("id-ID")
              : "-"}
          </p>

        </div>

      </div>

      {/* TIMELINE */}
      <div className="timeline-box">

        <h3>Timeline</h3>

        <ul>

<li className="done">
✔ Pengajuan berhasil dikirim
</li>

<li
className={
data.status==="Diproses" ||
data.status==="Selesai"
? "done"
: ""
}
>

{
data.status==="Menunggu"
?
"⏳ Menunggu verifikasi admin"
:
"✔ Sedang diproses admin"
}

</li>

<li
className={
data.status==="Selesai"
?
"done"
:
""
}
>

{
data.status==="Selesai"
?
"✔ Pengajuan telah selesai"
:
"Menunggu penyelesaian"
}

</li>

{data.status==="Ditolak" && (

<li className="reject">

✖ Pengajuan ditolak

</li>

)}

</ul>
      </div>

      {/* SURAT PERMOHONAN */}
      {data.surat_permohonan && (

        <div className="detail-section">

          <h3>
            📄 Surat Permohonan
          </h3>

          <a
            href={`http://localhost:8080/${data.surat_permohonan}`}
            target="_blank"
            rel="noopener noreferrer"
            className="download-btn"
          >
            👁 Lihat Surat Permohonan
          </a>

        </div>

      )}

      {/* DOKUMEN PENDUKUNG */}
      {data.link_drive && (

        <div className="detail-section">

          <h3>
            📂 Dokumen Pendukung
          </h3>

          <a
            href={data.link_drive}
            target="_blank"
            rel="noopener noreferrer"
            className="download-btn"
          >
            🔗 Buka Folder Google Drive
          </a>

        </div>

      )}

      {/* CATATAN ADMIN */}
{data.catatan_admin && (

<div className="detail-section">

<h3>
💬 Catatan Admin
</h3>

<p>
{data.catatan_admin}
</p>

</div>

)}

      {/* SURAT BALASAN */}
      {data.status==="Selesai" &&
data.file_respon && (

        <div className="detail-section">

          <h3>
            📄 Surat Balasan
          </h3>

          <a
            href={`http://localhost:8080/${data.file_respon}`}
            target="_blank"
            rel="noopener noreferrer"
            className="download-btn"
          >
            ⬇ Download Surat Balasan
          </a>

        </div>

      )}

    </div>

  </div>

);
}