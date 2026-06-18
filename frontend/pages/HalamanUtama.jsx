import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HalamanUtama.css";

export default function HalamanUtama() {
  const navigate = useNavigate();

  const [showProfileMenu, setShowProfileMenu] =
    useState(false);

  const [showNotif, setShowNotif] =
    useState(false);

  const notifications = [
    {
      id: 1,
      title: "Pengajuan Cuti Disetujui",
      time: "2 jam yang lalu",
      icon: "📄",
      path: "/kepegawaian/cuti",
    },
    {
      id: 2,
      title: "SKBT Sedang Diproses",
      time: "Kemarin",
      icon: "📋",
      path: "/kepegawaian/skbt",
    },
    {
      id: 3,
      title: "Usulan Kenaikan Pangkat Diverifikasi",
      time: "3 hari yang lalu",
      icon: "🎉",
      path:
        "/kepegawaian/rekomendasi/kenaikan-jenjang",
    },
  ];

  const isLoggedIn =
    localStorage.getItem("isLoggedIn") === "true";

  const userName =
    localStorage.getItem("userName") || "Pegawai";

  const handleAccess = (path) => {
    if (!isLoggedIn) {
      alert(
        "Silakan login terlebih dahulu untuk mengakses layanan."
      );
      return;
    }

    navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");

    navigate("/");
    window.location.reload();
  };

  const handleNotificationClick = (
    notif
  ) => {
    setShowNotif(false);

    navigate(notif.path);
  };

  return (
    <div className="home-page">

      {/* NAVBAR */}
      <nav className="navbar">

        <div className="logo-section">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Logo_Kementerian_Agama.svg/512px-Logo_Kementerian_Agama.svg.png"
            alt="logo"
          />

          <h2>Portal Layanan Internal</h2>
        </div>

        <div className="menu">

          <a href="/">Beranda</a>

          <a
  href="#kontak"
  onClick={(e) => {
    e.preventDefault();

    document
      .getElementById("kontak")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  }}
>
  Kontak
</a>

          {!isLoggedIn ? (
            <button
              className="login-btn"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          ) : (
            <div className="user-section">

              {/* NOTIFIKASI */}
<div className="notif-wrapper">

  <div
    className="notif-icon"
    onClick={() =>
      setShowNotif(!showNotif)
    }
  >
    🔔

    <span className="notif-badge">
      {notifications.length}
    </span>
  </div>

  {showNotif && (
    <div className="notif-dropdown">

      <div className="notif-header">
        🔔 Notifikasi
      </div>

      {notifications.map((notif) => (
        <div
          key={notif.id}
          className="notif-item"
          onClick={() =>
            handleNotificationClick(
              notif
            )
          }
        >
          <div className="notif-title">

            <span className="notif-item-icon">
              {notif.icon}
            </span>

            <span className="notif-item-text">
              {notif.title}
            </span>

          </div>

          <div className="notif-time">
            {notif.time}
          </div>
        </div>
      ))}

    </div>
  )}

</div>

              {/* PROFILE */}
              <div className="profile-wrapper">

                <div
                  className="profile-chip"
                  onClick={() =>
                    setShowProfileMenu(
                      !showProfileMenu
                    )
                  }
                >
                  👤 {userName}
                </div>

                {showProfileMenu && (
                  <div className="profile-dropdown">

                    <button
                      onClick={handleLogout}
                    >
                      🚪 Logout
                    </button>

                  </div>
                )}

              </div>

            </div>
          )}

        </div>

      </nav>

      {/* HERO */}
      <section className="hero">

        <div className="hero-content">

          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Logo_Kementerian_Agama.svg/512px-Logo_Kementerian_Agama.svg.png"
            alt="logo"
          />

          <h1>PORTAL LAYANAN INTERNAL</h1>

          <p>
            Sistem Informasi Terintegrasi
            Kementerian Agama Republik Indonesia
          </p>

          <span>
            Pilih bidang layanan yang ingin diakses
          </span>

        </div>

      </section>

      {/* MENU */}
      <section className="services">

        <h2>Pilih Menu Layanan</h2>

        <div className="service-grid">

          <div
            className="service-card"
            onClick={() =>
              handleAccess("/kepegawaian")
            }
          >
            <div className="service-icon">
              👥
            </div>

            <h3>Kepegawaian & SDM</h3>

            <p>
              Layanan Rekomendasi,
              Cuti Pegawai,
              dan SKBT.
            </p>
          </div>

          <div
            className="service-card"
            onClick={() =>
              handleAccess("/bmn")
            }
          >
            <div className="service-icon">
              🏢
            </div>

            <h3>Barang Milik Negara</h3>

            <p>
              Inventaris Barang,
              Peminjaman,
              dan Pengelolaan Aset.
            </p>
          </div>

          <div
            className="service-card"
            onClick={() =>
              handleAccess("/humas-data")
            }
          >
            <div className="service-icon">
              📊
            </div>

            <h3>Humas & Data</h3>

            <p>
              Publikasi,
              Dokumentasi,
              dan Statistik Data.
            </p>
          </div>

        </div>

      </section>

{/* FOOTER */}
<footer
  className="footer"
  id="kontak"
>

  <h3>Portal Layanan Internal</h3>

  <p>
    Kementerian Agama Republik Indonesia
  </p>

  <p>
    Sistem Informasi Terintegrasi
  </p>

  <div className="footer-contact">

    <h4>Kontak</h4>

    <p>
      📍 Jl. M.H. Thamrin No. 6 Lt. 10–11,
      Jakarta Pusat
    </p>

    <p>
      ☎️ TU Dirjen: 021-3812583 |
      TU Sekretariat: 021-3846832
    </p>

    <p>
      ☎️ TU Dir. Urag Kristen: 021-3920628 |
      TU Dir. PAK: 021-3920626
    </p>

    <p>
      ✉️ bimaskristen@kemenag.go.id
    </p>

    <p>
      🌐 bimaskristen.kemenag.go.id
    </p>

  </div>

      </footer>
    </div>
  );
}


