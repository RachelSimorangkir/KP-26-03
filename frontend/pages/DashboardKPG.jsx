import "./DashboardKPG.css";

function DashboardKPG() {
  return (
    <div className="welcome-container">

      <div className="welcome-badge">
        Portal Internal BMBPSDM
      </div>

      <h1 className="welcome-title">
        Selamat Datang di Layanan
        <br />
        Kepegawaian & SDM
      </h1>

      <p className="welcome-desc">
        Portal ini digunakan untuk mendukung pengelolaan layanan
        administrasi kepegawaian secara terintegrasi di lingkungan
        Balai Manajemen dan Pengembangan Sumber Daya Manusia
        Kementerian Agama Republik Indonesia.
      </p>

      <div className="info-card">
        <h3>Informasi</h3>

        <p>
          Silakan memilih layanan yang dibutuhkan melalui menu
          navigasi di sebelah kiri. Pastikan seluruh dokumen
          persyaratan telah dipersiapkan sebelum melakukan
          pengajuan layanan.
        </p>
      </div>

    </div>
  );
}

export default DashboardKPG;