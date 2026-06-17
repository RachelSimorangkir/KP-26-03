import { useNavigate } from "react-router-dom";
import "./LoginAdmin.css";

function LoginAdmin() {
  const navigate = useNavigate();

  return (
    <div className="login-admin-page">

      <div className="login-admin-container">

        {/* KIRI */}
        <div className="login-admin-left">

          <div className="icon-box">
            🔐
          </div>

          <h1>Login Admin</h1>

          <p>
            Portal Layanan Internal
            <br />
            Direktorat Jenderal
            <br />
            Bimbingan Masyarakat Kristen
          </p>

        </div>

        {/* KANAN */}
        <div className="login-admin-right">

          <form className="login-form">

            <h2>Masuk Sebagai Admin</h2>

            <div className="form-group">
              <label>Username</label>

              <input
                type="text"
                placeholder="Masukkan Username"
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
            >
              Login Admin
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

export default LoginAdmin;