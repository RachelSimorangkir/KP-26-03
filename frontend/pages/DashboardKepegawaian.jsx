import "./DashboardKepegawaian.css";

function DashboardKepegawaian() {
  return (
    <div className="dashboard-home">

      <div className="welcome-section">

        <div className="welcome-badge">
          Portal Internal BMBPSDM
        </div>

        <h1>
          Selamat Datang di Layanan
          <span> Kepegawaian & SDM</span>
        </h1>

        <p>
          Portal ini digunakan untuk mendukung pengelolaan layanan
          administrasi kepegawaian secara terintegrasi di lingkungan
          Balai Manajemen dan Pengembangan Sumber Daya Manusia
          Kementerian Agama Republik Indonesia.
        </p>

      </div>

      <div className="info-box">

        <h3>Informasi</h3>

        <p>
          Silakan memilih layanan yang dibutuhkan melalui menu navigasi
          di sebelah kiri. Pastikan seluruh dokumen persyaratan telah
          dipersiapkan sebelum melakukan pengajuan.
        </p>

      </div>

    </div>
  );
}

export default DashboardKepegawaian;