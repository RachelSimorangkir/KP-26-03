import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginAdmin.css";

function LoginAdmin() {
  const navigate = useNavigate();

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleLogin = () => {

    if (
      username === "admin" &&
      password === "admin123"
    ) {

      localStorage.setItem(
        "isLoggedIn",
        "true"
      );

      localStorage.setItem(
        "userRole",
        "admin"
      );

      localStorage.setItem(
        "userName",
        "Administrator"
      );

      navigate("/admin");

    } else {

      alert(
        "Username atau Password salah!"
      );

    }
  };

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

          <form
            className="login-form"
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >

            <h2>Masuk Sebagai Admin</h2>

            <div className="form-group">

              <label>Username</label>

              <input
                type="text"
                placeholder="Masukkan Username"
                value={username}
                onChange={(e) =>
                  setUsername(
                    e.target.value
                  )
                }
              />

            </div>

            <div className="form-group">

              <label>Password</label>

              <input
                type="password"
                placeholder="Masukkan Password"
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
              />

            </div>

            <button
              type="submit"
              className="login-submit"
            >
              Login Admin
            </button>

            <button
              type="button"
              className="back-btn"
              onClick={() =>
                navigate("/login")
              }
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