import "./Cuti.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

function Cuti() {

  const navigate = useNavigate();

  // ===========================
  // STATE
  // ===========================

  const [submitted, setSubmitted] = useState(false);

  const [pengajuanId, setPengajuanId] = useState(null);

  const [status, setStatus] = useState("Menunggu");

  //==========================
  // DATA PEGAWAI
  //==========================

  const [nip, setNip] = useState("");
  const [nama, setNama] = useState("");
  const [jabatan, setJabatan] = useState("");
  const [unitKerja, setUnitKerja] = useState("");

  //==========================
  // CUTI
  //==========================

  const [statusKepegawaian, setStatusKepegawaian] =
    useState("");

  const [jenisCuti, setJenisCuti] =
    useState("");

  const [alasanCuti, setAlasanCuti] =
    useState("");

  const [tanggalMulai, setTanggalMulai] =
    useState("");

  const [tanggalSelesai, setTanggalSelesai] =
    useState("");

  const [durasi, setDurasi] =
    useState("");
  const [lamaCuti, setLamaCuti] = useState("");
  const [satuanCuti, setSatuanCuti] = useState("");

  const [alamatCuti, setAlamatCuti] =
    useState("");

  const [noHp, setNoHp] =
    useState("");

  //==========================
  // DOKUMEN
  //==========================

  const [suratPermohonan, setSuratPermohonan] =
    useState(null);

  const [linkDrive, setLinkDrive] =
    useState("");

      //==========================
  // JENIS CUTI
  //==========================

  const jenisCutiOptions = {

    PNS: [

      "Cuti Tahunan",

      "Cuti Besar",

      "Cuti Sakit",

      "Cuti Melahirkan",

      "Cuti Karena Alasan Penting",

      "Cuti di Luar Tanggungan Negara"

    ],

    PPPK: [

      "Cuti Tahunan",

      "Cuti Sakit",

      "Cuti Melahirkan"

    ]

  };

    //==========================
  // HITUNG DURASI OTOMATIS
  //==========================

  useEffect(() => {

    if (!tanggalMulai || !tanggalSelesai) {
        setDurasi("");
        setLamaCuti("");
        setSatuanCuti("");
        return;
    }

    const mulai = new Date(tanggalMulai);
    const selesai = new Date(tanggalSelesai);

    if (selesai < mulai) return;

    // Total hari
    const totalHari =
        Math.floor((selesai - mulai) / (1000 * 60 * 60 * 24)) + 1;

    setDurasi(totalHari);

    // Hitung tahun, bulan, hari
    let tahun = selesai.getFullYear() - mulai.getFullYear();
    let bulan = selesai.getMonth() - mulai.getMonth();
    let hari = selesai.getDate() - mulai.getDate();

    if (hari < 0) {
        bulan--;
    }

    if (bulan < 0) {
        tahun--;
        bulan += 12;
    }

    if (tahun >= 1 && bulan === 0 && hari === 0) {

        setLamaCuti(tahun);
        setSatuanCuti("Tahun");

    }
    else if (bulan >= 1 && hari === 0) {

        setLamaCuti(bulan);
        setSatuanCuti("Bulan");

    }
    else {

        setLamaCuti(totalHari);
        setSatuanCuti("Hari");

    }

}, [tanggalMulai, tanggalSelesai]);

    //========================================
  // AMBIL DATA PEGAWAI BERDASARKAN NIP
  //========================================

  const handleNipChange = async (e) => {

    const value = e.target.value;

    setNip(value);

    if (value.length < 5) {

      setNama("");
      setJabatan("");
      setUnitKerja("");

      return;
    }

    try {

      const response = await fetch(
        `http://localhost:8080/api/pegawai/${value}`
      );

      const data = await response.json();

      if (data) {

        setNama(data.nama || "");

        setJabatan(data.jabatan || "");

        setUnitKerja(
          data.unit_organisasi || ""
        );

      }

    } catch (err) {

      console.error(err);

    }

  };

    //========================================
  // SUBMIT PENGAJUAN
  //========================================

  const handleSubmit = async () => {

    //========================
    // VALIDASI
    //========================

    if (!nip) {

      Swal.fire(
        "Peringatan",
        "Masukkan NIP terlebih dahulu.",
        "warning"
      );

      return;

    }

    if (!statusKepegawaian) {

      Swal.fire(
        "Peringatan",
        "Pilih Status Kepegawaian.",
        "warning"
      );

      return;

    }

    if (!jenisCuti) {

      Swal.fire(
        "Peringatan",
        "Pilih Jenis Cuti.",
        "warning"
      );

      return;

    }

    if (!alasanCuti) {

      Swal.fire(
        "Peringatan",
        "Isi Alasan Cuti.",
        "warning"
      );

      return;

    }

    if (!tanggalMulai || !tanggalSelesai) {

      Swal.fire(
        "Peringatan",
        "Pilih tanggal cuti.",
        "warning"
      );

      return;

    }

    if (!suratPermohonan) {

      Swal.fire(
        "Peringatan",
        "Upload Surat Permohonan.",
        "warning"
      );

      return;

    }

    if (!linkDrive) {

      Swal.fire(
        "Peringatan",
        "Masukkan Link Google Drive.",
        "warning"
      );

      return;

    }

    try {

      const formData = new FormData();

            formData.append("nip", nip);

      formData.append("nama", nama);

      formData.append("jabatan", jabatan);

      formData.append(
        "unit_kerja",
        unitKerja
      );

      formData.append(
        "layanan",
        "Cuti"
      );

      formData.append(
        "status_kepegawaian",
        statusKepegawaian
      );

      formData.append(
        "jenis_cuti",
        jenisCuti
      );

      formData.append(
        "alasan_cuti",
        alasanCuti
      );

      formData.append(
        "tanggal_mulai",
        tanggalMulai
      );

      formData.append(
        "tanggal_selesai",
        tanggalSelesai
      );

      formData.append("durasi", durasi);
      formData.append("lama_cuti", lamaCuti);
      formData.append("satuan_cuti", satuanCuti);

      formData.append(
        "alamat_cuti",
        alamatCuti
      );

      formData.append(
        "no_hp",
        noHp
      );

      formData.append(
        "link_drive",
        linkDrive
      );

      formData.append(
        "suratPermohonan",
        suratPermohonan
      );
            const response = await fetch(

        "http://localhost:8080/api/pengajuan",

        {

          method: "POST",

          body: formData

        }

      );

      const result = await response.json();

      if (result.success) {

        setPengajuanId(result.id);

        setSubmitted(true);

        Swal.fire({

          icon: "success",

          title: "Berhasil",

          text: "Pengajuan berhasil dikirim."

        });

      } else {

        Swal.fire({

          icon: "error",

          title: "Gagal",

          text: result.message

        });

      }

    } catch (err) {

      console.error(err);

      Swal.fire({

        icon: "error",

        title: "Error",

        text: "Terjadi kesalahan."

      });

    }

  };

    //========================================
  // RENDER
  //========================================

  return (

    <div className="cuti-page">

      <button
        className="back-button"
        onClick={() => navigate("/kepegawaian")}
      >
        <img
      src="/logo-back.png"
      alt="Back"
      className="back-icon"
    />
      </button>

      {/* ================= HEADER ================= */}

      <div className="page-header">

        <div>

          <h1>Pengajuan Cuti</h1>

          <p>

            Pengajuan cuti pegawai secara elektronik
            melalui Portal Layanan Internal BMBPSDM.

          </p>

        </div>

      </div>

      {!submitted ? (

      <>

      {/* ================= PANDUAN ================= */}

      <div className="guide-card">

        <h2>Panduan Pengajuan</h2>

        <ol className="guide-list">

          <li>Isi data pegawai.</li>

          <li>Masukkan NIP.</li>

          <li>Data pegawai akan terisi otomatis.</li>

          <li>Pilih Status Kepegawaian.</li>

          <li>Pilih Jenis Cuti.</li>

          <li>Lengkapi seluruh data.</li>

          <li>Upload Surat Permohonan.</li>

          <li>Masukkan Link Google Drive.</li>

          <li>Klik Ajukan Permohonan.</li>

        </ol>

      </div>

      {/* ================= DATA PEGAWAI ================= */}

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

            <select

              value={statusKepegawaian}

              onChange={(e)=>{

                setStatusKepegawaian(e.target.value);

                setJenisCuti("");

              }}

            >

              <option value="" disabled hidden>

                Pilih Status Kepegawaian

              </option>

              <option value="PNS">

                PNS

              </option>

              <option value="PPPK">

                PPPK

              </option>

            </select>

          </div>

        </div>

      </div>
            {/* ================= DETAIL CUTI ================= */}

      <div className="form-card">

        <h2>Detail Cuti</h2>

        <div className="form-grid">

          {/* Jenis Cuti */}

          <div className="form-group full-width">

            <label>Jenis Cuti *</label>

            <select
              value={jenisCuti}
              onChange={(e) => setJenisCuti(e.target.value)}
              disabled={!statusKepegawaian}
            >

              <option value="" disabled hidden>

                {
                  statusKepegawaian
                    ? "Pilih Jenis Cuti"
                    : "Pilih Status Kepegawaian terlebih dahulu"
                }

              </option>

              {
                statusKepegawaian &&
                jenisCutiOptions[statusKepegawaian].map((item) => (

                  <option
                    key={item}
                    value={item}
                  >

                    {item}

                  </option>

                ))
              }

            </select>

          </div>


          {/* Alasan */}

          <div className="form-group full-width">

            <label>Alasan Cuti *</label>

            <textarea

              rows="4"

              value={alasanCuti}

              onChange={(e)=>

                setAlasanCuti(e.target.value)

              }

            />

          </div>


          {/* Tanggal Mulai */}

          <div className="form-group">

            <label>Tanggal Mulai *</label>

            <input

              type="date"

              value={tanggalMulai}

              onChange={(e)=>

                setTanggalMulai(e.target.value)

              }

            />

          </div>


          {/* Tanggal Selesai */}

          <div className="form-group">

            <label>Tanggal Selesai *</label>

            <input

              type="date"

              value={tanggalSelesai}

              onChange={(e)=>

                setTanggalSelesai(e.target.value)

              }

            />

          </div>


          {/* Durasi */}

<div className="form-group">

    <label>Total Hari</label>

    <input
        type="number"
        value={durasi}
        readOnly
    />

</div>

<div className="form-group">

    <label>Lama Cuti</label>

    <input
        type="number"
        value={lamaCuti}
        readOnly
    />

</div>

<div className="form-group">

    <label>Satuan</label>

    <input
        type="text"
        value={satuanCuti}
        readOnly
    />

</div>


          {/* Alamat */}

          <div className="form-group full-width">

            <label>

              Alamat Selama Menjalankan Cuti *

            </label>

            <textarea

              rows="4"

              value={alamatCuti}

              onChange={(e)=>

                setAlamatCuti(e.target.value)

              }

            />

          </div>


          {/* Nomor HP */}

          <div className="form-group">

            <label>No. HP *</label>

            <input

              type="text"

              placeholder="08xxxxxxxxxx"

              value={noHp}

              onChange={(e)=>

                setNoHp(e.target.value)

              }

            />

          </div>

        </div>

      </div>
            {/* ================= SURAT PERMOHONAN ================= */}

      <div className="form-card">

        <h2>Surat Permohonan</h2>

        <div className="upload-area">

          <label htmlFor="surat">

            Upload Surat Permohonan

          </label>

          <input

            id="surat"

            type="file"

            accept=".pdf"

            onChange={(e)=>

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

          <span>

            Format PDF (maksimal 10 MB)

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

            value={linkDrive}

            onChange={(e)=>

              setLinkDrive(e.target.value)

            }

          />

        </div>

        <div className="drive-note">

          <strong>Catatan</strong>

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

          <input type="checkbox" required />

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

        {/* ================= DOWNLOAD PDF ================= */}

        <div className="download-box">

          <button

            className="download-btn"

            onClick={() =>

              window.open(

                `http://localhost:8080/pdf/cuti/${pengajuanId}`,

                "_blank"

              )

            }

          >

            📄 Download Formulir Cuti

          </button>

        </div>

        {/* ================= TIMELINE ================= */}

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

                {

                  status === "Menunggu"

                    ? "Menunggu verifikasi admin"

                    : status === "Diproses"

                    ? "Sedang diverifikasi"

                    : "Verifikasi selesai"

                }

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

                {

                  status === "Selesai"

                    ? "Pengajuan cuti telah selesai"

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

export default Cuti;