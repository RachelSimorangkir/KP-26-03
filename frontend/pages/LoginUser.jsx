import { useNavigate } from "react-router-dom";
import "./LoginUser.css";

function LoginUser() {
  const navigate = useNavigate();

  const handleLogin = () => {

    // SIMULASI LOGIN
    localStorage.setItem(
      "isLoggedIn",
      "true"
    );

    localStorage.setItem(
      "userRole",
      "pegawai"
    );

    localStorage.setItem(
      "userName",
      "Rachel Simorangkir"
    );

    localStorage.setItem(
      "nip",
      "120123456789"
    );

    // KEMBALI KE BERANDA
    navigate("/");
  };

  return (
    <div className="login-user-page">

      <div className="login-user-container">

        {/* KIRI */}
        <div className="login-user-left">

          <div className="icon-box">
            👤
          </div>

          <h1>Login Pegawai</h1>

          <p>
            Portal Layanan Internal
            <br />
            Direktorat Jenderal
            <br />
            Bimbingan Masyarakat Kristen
          </p>

        </div>

        {/* KANAN */}
        <div className="login-user-right">

          <form
            className="login-form"
            onSubmit={(e) => e.preventDefault()}
          >

            <h2>Masuk ke Sistem</h2>

            <div className="form-group">
              <label>NIP</label>

              <input
                type="text"
                placeholder="Masukkan NIP"
              />
            </div>

            <div className="form-group">
              <label>Password</label>

              <input
                type="password"
                placeholder="Masukkan Password"
              />
            </div>

            <button
              type="button"
              className="login-submit"
              onClick={handleLogin}
            >
              Masuk Sebagai Pegawai
            </button>

            <button
              type="button"
              className="back-btn"
              onClick={() => navigate("/login")}
            >
              ← Kembali
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default LoginUser;