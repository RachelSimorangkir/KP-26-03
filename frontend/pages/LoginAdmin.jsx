import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginAdmin.css";
import logo from "../src/assets/logo-kemenag.png";

function LoginAdmin() {
  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] =
    useState("");

  const [nip, setNip] =
    useState("");

  const [password, setPassword] =
    useState("");

  const adminAccounts = [
    {
      nip: "adminkpg",
      password: "admin123",
      division: "kepegawaian",
      name: "Admin Kepegawaian",
    },
    {
      nip: "adminbmn",
      password: "admin123",
      division: "bmn",
      name: "Admin BMN",
    },
    {
      nip: "adminhumas",
      password: "admin123",
      division: "humas",
      name: "Admin Humas & Data",
    },
  ];

const handleLogin = () => {
  const admin = adminAccounts.find(
    (item) =>
      item.nip === nip &&
      item.password === password &&
      item.division === selectedRole
  );

  if (admin) {
    localStorage.setItem(
      "isLoggedIn",
      "true"
    );

    localStorage.setItem(
      "userRole",
      "admin"
    );

    localStorage.setItem(
      "adminDivision",
      admin.division
    );

    localStorage.setItem(
      "userName",
      admin.name
    );

    localStorage.setItem(
      "userNIP",
      admin.nip
    );

    navigate("/admin");
  } else {
    alert(
      "NIP atau Password salah!"
    );
  }
};

  const getRoleTitle = () => {
    switch (selectedRole) {
      case "kepegawaian":
        return "Admin Kepegawaian";
      case "bmn":
        return "Admin BMN";
      case "humas":
        return "Admin Humas & Data";
      default:
        return "";
    }
  };

  return (
    <div className="login-admin-page">
      <div className="login-admin-container">

        {/* KIRI */}
        <div className="login-left">
        
            <img
                src={logo}
                alt="Logo Kementerian Agama"
                className="login-logo"
            />
        

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

          {!selectedRole ? (

            <div className="role-selection">

              <h2>
                Pilih Divisi Admin
              </h2>

              <button
                className="role-btn"
                onClick={() =>
                  setSelectedRole(
                    "kepegawaian"
                  )
                }
              >
                Admin Kepegawaian
              </button>

              <button
                className="role-btn"
                onClick={() =>
                  setSelectedRole(
                    "bmn"
                  )
                }
              >
                Admin BMN
              </button>

              <button
                className="role-btn"
                onClick={() =>
                  setSelectedRole(
                    "humas"
                  )
                }
              >
                Admin Humas & Data
              </button>

{/* BUTTON KEMBALI */}
<div className="back-home-wrapper">
  <button
    className="back-home-btn"
    onClick={() => navigate("/")}
  >
    <img
      src="/logo-back.png"
      alt="Back"
      className="back-icon"
    />
    <span>Kembali ke Beranda</span>
  </button>
</div>

            </div>

          ) : (

            <form
              className="login-form"
              onSubmit={(e) => {
                e.preventDefault();
                handleLogin();
              }}
            >

              <h2>
                {getRoleTitle()}
              </h2>

              <div className="form-group">

                <label>
                  NIP
                </label>

                <input
                  type="text"
                  placeholder="Masukkan Username"
                  value={nip}
                  onChange={(e) =>
                    setNip(
                      e.target.value
                    )
                  }
                />

              </div>

              <div className="form-group">

                <label>
                  Password
                </label>

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
                Login
              </button>

              <button
                type="button"
                className="back-btn"
                onClick={() => {
                  setSelectedRole("");
                  setNip("");
                  setPassword("");
                }}
              >
                
                Ganti Divisi
              </button>

            </form>

          )}

        </div>

      </div>
    </div>
  );
}

export default LoginAdmin;