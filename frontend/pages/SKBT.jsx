import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SKBT.css";

function SKBT() {
  const navigate = useNavigate();

  const [selectedService, setSelectedService] =
    useState("");

  return (
    <div className="skbt-page">

      {/* BACK */}
      <button
        className="back-button"
        onClick={() => navigate("/kepegawaian")}
      >
        <img
      src="/logo-back.png"
      alt="Back"
      className="back-icon"
    />
      </button>

      {/* HEADER */}
      <div className="page-header">

        <div>
          <h1>
            Surat Keterangan Bebas Temuan (SKBT)
          </h1>

          <p>
            Pilih jenis pengajuan SKBT sesuai
            kebutuhan pegawai maupun organisasi.
          </p>
        </div>

      </div>

      {/* INFO */}
      <div className="info-card">

        <h2>Tentang Layanan</h2>

        <p>
          SKBT merupakan surat yang menerangkan
          bahwa pegawai maupun organisasi tidak
          memiliki temuan pemeriksaan yang belum
          diselesaikan. Silakan pilih jenis
          pengajuan sesuai kebutuhan.
        </p>

      </div>

      {/* PILIH LAYANAN */}
      <div className="service-selector">

        <h2>Pilih Jenis Layanan</h2>

        <select
          value={selectedService}
          onChange={(e) =>
            setSelectedService(e.target.value)
          }
        >
          <option value="">
            -- Pilih Layanan SKBT --
          </option>

          <option value="mandiri">
            SKBT Mandiri
          </option>

          <option value="organisasi">
            SKBT Organisasi
          </option>
        </select>

      </div>

      {/* DETAIL LAYANAN */}
      {selectedService && (

        <div className="service-detail">

          {selectedService === "mandiri" && (
            <>
              <div className="detail-icon">
              </div>

              <h2>SKBT Mandiri</h2>

              <p>
                Pengajuan Surat Keterangan Bebas
                Temuan yang diajukan langsung oleh
                pegawai untuk kebutuhan pribadi,
                administrasi maupun persyaratan
                tertentu.
              </p>

              <button
                className="service-btn"
                onClick={() =>
                  navigate(
                    "/kepegawaian/skbt/mandiri"
                  )
                }
              >
                Lanjutkan Pengajuan
              </button>
            </>
          )}

          {selectedService ===
            "organisasi" && (
            <>
              <div className="detail-icon">
              </div>

              <h2>SKBT Organisasi</h2>

              <p>
                Pengajuan Surat Keterangan Bebas
                Temuan atas nama unit kerja,
                satker maupun organisasi untuk
                kebutuhan administrasi secara
                resmi.
              </p>

              <button
                className="service-btn"
                onClick={() =>
                  navigate(
                    "/kepegawaian/skbt/organisasi"
                  )
                }
              >
                Lanjutkan Pengajuan
              </button>
            </>
          )}

        </div>

      )}

    </div>
  );
}

export default SKBT;