import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  return (
    <div className="login-page">

      <div className="login-container">

        {/* KIRI */}
        <div className="login-left">

          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Logo_Kementerian_Agama.svg/512px-Logo_Kementerian_Agama.svg.png"
            alt="logo"
          />

          <h1>Portal Layanan Internal</h1>

          <p>
            Direktorat Jenderal
            <br />
            Bimbingan Masyarakat
            <br />
            Kristen
          </p>

        </div>

        {/* KANAN */}
        <div className="login-right">

          <div className="login-content">

            <h2>Masuk ke Sistem</h2>

            <div className="login-choice">

              <div
                className="login-card"
                onClick={() => navigate("/login-user")}
              >
                <div className="icon">👤</div>

                <h3>Login Pegawai</h3>

                <p>
                  Akses layanan kepegawaian,
                  BMN dan humas.
                </p>

              </div>

              <div
                className="login-card"
                onClick={() => navigate("/login-admin")}
              >
                <div className="icon">🔐</div>

                <h3>Login Admin</h3>

                <p>
                  Kelola seluruh layanan
                  dan data sistem.
                </p>

              </div>

            </div>

            {/* BUTTON KEMBALI */}
            <div className="back-home-wrapper">

              <button
                className="back-home-btn"
                onClick={() => navigate("/")}
              >
                ← Kembali ke Beranda
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;