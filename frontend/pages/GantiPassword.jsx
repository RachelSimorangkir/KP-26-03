import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./GantiPassword.css";
import Swal from "sweetalert2";

export default function GantiPassword() {

  const navigate = useNavigate();

  const [passwordLama, setPasswordLama] = useState("");
  const [passwordBaru, setPasswordBaru] = useState("");
  const [konfirmasi, setKonfirmasi] = useState("");

  const [showPassword, setShowPassword] = useState(false);

const handleSubmit = async (e) => {

    e.preventDefault();

    if (passwordBaru !== konfirmasi) {

        alert("Konfirmasi password tidak sama.");

        return;

    }

    const nip =
        localStorage.getItem("userNIP");

    const response = await fetch(

        "http://localhost:8080/api/ganti-password",

        {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                nip,

                passwordLama,

                passwordBaru

            })

        }

    );

const result = await response.json();

if (result.status) {

    await Swal.fire({

        icon: "success",

        title: "Password Berhasil Diubah",

        text: "Silakan login kembali menggunakan password baru.",

        confirmButtonText: "Login",

        confirmButtonColor: "#2563eb",

        timer: 2500,

        timerProgressBar: true

    });

    localStorage.clear();

    navigate("/login-user");

} else {

    Swal.fire({

        icon: "error",

        title: "Gagal",

        text: result.message,

        confirmButtonColor: "#dc2626"

    });

}

};

  return (
    <div className="ganti-page">

      <div className="ganti-card">

        <button
          className="back-btn"
          onClick={() => navigate(-1)}
        >
          ← Kembali
        </button>

        <h1>Ganti Password</h1>

        <p className="subtitle">
          Silakan ubah password akun Anda.
        </p>

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Password Lama</label>

            <input
              type={showPassword ? "text" : "password"}
              value={passwordLama}
              onChange={(e) =>
                setPasswordLama(e.target.value)
              }
              placeholder="Masukkan password lama"
            />
          </div>

          <div className="form-group">
            <label>Password Baru</label>

            <input
              type={showPassword ? "text" : "password"}
              value={passwordBaru}
              onChange={(e) =>
                setPasswordBaru(e.target.value)
              }
              placeholder="Masukkan password baru"
            />
          </div>

          <div className="form-group">
            <label>Konfirmasi Password</label>

            <input
              type={showPassword ? "text" : "password"}
              value={konfirmasi}
              onChange={(e) =>
                setKonfirmasi(e.target.value)
              }
              placeholder="Ulangi password baru"
            />
          </div>

          <div className="show-password">

            <input
              type="checkbox"
              checked={showPassword}
              onChange={() =>
                setShowPassword(!showPassword)
              }
            />

            <span>Tampilkan Password</span>

          </div>

          <button
            className="save-btn"
            type="submit"
          >
            Simpan Password
          </button>

        </form>

      </div>

    </div>
  );
}