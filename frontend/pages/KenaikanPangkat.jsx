import { useNavigate } from "react-router-dom";
import "./KenaikanPangkat.css";

export default function KenaikanPangkat() {
  const navigate = useNavigate();

  return (
    <div className="kp-page">

      <button
        className="back-button"
        onClick={() => navigate("/kepegawaian")}
      >
        ← Kembali
      </button>

      {/* HEADER */}
      <div className="service-banner">
        <div>
          <h1>Usul Kenaikan Pangkat</h1>
          <p>Sekretariat SDM Kementerian Agama RI</p>
        </div>

      </div>

      {/* PANDUAN */}
      <div className="guide-card">

        <h3>Panduan Pengajuan Kenaikan Pangkat</h3>

        <ol>
          <li>Pengajuan dilakukan satu bulan sebelum periode kenaikan</li>
          <li>Siapkan dokumen persyaratan dalam format PDF, lalu jadikan satu dalam file RAR</li>
          <li>Isi form di bawah dengan lengkap, lalu upload file RAR</li>
        </ol>

      </div>

      {/* PENJELASAN */}
      <div className="description-card">

        <p>
          Kenaikan pangkat adalah penghargaan yang diberikan atas prestasi
          kerja dan pengabdian Pegawai Negeri Sipil terhadap Negara,
          serta sebagai dorongan kepada Pegawai Negeri Sipil untuk lebih
          meningkatkan prestasi kerja dan pengabdiannya.
        </p>

        <a href="#">
          Surat Pemberitahuan Kenaikan Pangkat 2024
        </a>

      </div>

      {/* PERSYARATAN */}
      <div className="requirement-card">

        <h2>
          Persyaratan Kenaikan Pangkat Pegawai adalah sebagai berikut:
        </h2>

        <div className="requirement-content">

          <h4>A. Kenaikan Pangkat Jabatan Pelaksana:</h4>

          <ul>
            <li>Surat Pengantar dari pimpinan unit kerja masing-masing;</li>
            <li>SK Pangkat/Golongan Terakhir;</li>
            <li>SK Jabatan Pelaksana yang terakhir; dan</li>
            <li>SKP 2 (dua) Tahun terakhir (menggunakan Aplikasi e-Kinerja BKN).</li>
          </ul>

          <h4>B. Kenaikan Pangkat Jabatan Struktural:</h4>

          <ul>
            <li>Surat Pengantar dari pimpinan unit kerja masing-masing;</li>
            <li>SK Pangkat/Golongan Terakhir;</li>
            <li>SK Jabatan struktural yang terakhir;</li>
            <li>SPMT, SPMJ, SPP dan Berita Acara Pelantikan; dan</li>
            <li>SKP 2 (dua) Tahun terakhir (menggunakan Aplikasi e-Kinerja BKN).</li>
          </ul>

          <h4>C. Kenaikan Pangkat Jabatan Fungsional:</h4>

          <ul>
            <li>Surat Pengantar dari pimpinan unit kerja masing-masing;</li>
            <li>SK Pangkat/Golongan Terakhir;</li>
            <li>SK Jabatan Fungsional yang terakhir;</li>
            <li>Penetapan Angka Kredit (PAK) yang sudah diintegrasi; dan</li>
            <li>SKP 2 (dua) Tahun terakhir (menggunakan Aplikasi e-Kinerja BKN).</li>
          </ul>

          <h4>D. Kenaikan Pangkat Pejabat Fungsional (Khusus):</h4>

          <p>
            Untuk Pejabat Fungsional yang tidak dapat diangkat dalam
            jenjang jabatan setingkat lebih tinggi karena tidak tersedia
            kebutuhan jabatan maka dapat diusulkan Kenaikan Pangkat
            setingkat lebih tinggi paling banyak 1 (satu) kali setelah
            memenuhi persyaratan:
          </p>

          <ul>
            <li>Memenuhi angka kredit kumulatif;</li>
            <li>Lulus Uji Kompetensi;</li>
            <li>Tersedia Peta Jabatan;</li>
            <li>Kualifikasi Pendidikan Sesuai dengan Persyaratan Jabatan;</li>
            <li>SKP 2 (dua) Tahun terakhir (menggunakan Aplikasi e-Kinerja BKN);</li>
            <li>Telah 2 (dua) Tahun dalam Pangkat Terakhir; dan</li>
            <li>Memenuhi Persyaratan Kenaikan Pangkat sesuai dengan ketentuan peraturan perundang-undangan.</li>
          </ul>

        </div>

      </div>

      {/* FORM */}
      <div className="kp-card">

        <h2>Formulir Pengajuan</h2>

        <div className="form-grid">

          <div className="form-group">
            <label>NIP</label>
            <input type="text" placeholder="Masukkan NIP" />
          </div>

          <div className="form-group">
            <label>Nama Pegawai</label>
            <input type="text" placeholder="Masukkan Nama Pegawai" />
          </div>

          <div className="form-group">
            <label>Pangkat Lama</label>
            <input type="text" placeholder="Pangkat Lama" />
          </div>

          <div className="form-group">
            <label>Pangkat Baru</label>
            <input type="text" placeholder="Pangkat Baru" />
          </div>

          <div className="form-group">
            <label>Unit Kerja</label>
            <input type="text" placeholder="Unit Kerja" />
          </div>

          <div className="form-group">
            <label>TMT Pangkat Baru</label>
            <input type="date" />
          </div>

        </div>

        <div className="upload-section">

          <h3>Upload Dokumen Persyaratan</h3>

          <div className="upload-box">
            <input type="file" />
            <p>Format PDF • Maksimal 10 MB</p>
          </div>

        </div>

        <button className="submit-button">
          Kirim Pengajuan
        </button>

      </div>

    </div>
  );
}