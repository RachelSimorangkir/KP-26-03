import "./AdminDashboard.css";
import {
  Navigate,
  useNavigate,
} from "react-router-dom";

import { useState } from "react";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [search, setSearch] =
  useState("");

  const isLoggedIn =
    localStorage.getItem("isLoggedIn") === "true";

  const role =
    localStorage.getItem("userRole");

  if (!isLoggedIn || role !== "admin") {
    return <Navigate to="/login-admin" />;
  }

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login-admin");
  };

  const pengajuan = [
    {
      nama: "Rachel Simorangkir",
      layanan: "SKBT",
      tanggal: "17 Juni 2026",
      status: "Menunggu",
      nip: "1987654321",
      unitKerja: "BMBPSDM",
      jabatan: "Analis Kepegawaian",
    },
    {
      nama: "Budi Santoso",
      layanan: "Cuti Tahunan",
      tanggal: "17 Juni 2026",
      status: "Diproses",
      nip: "1987654322",
      unitKerja: "Ditjen Bimas Kristen",
      jabatan: "Staf Kepegawaian",
    },
    {
      nama: "Sinta Lestari",
      layanan: "Kenaikan Pangkat",
      tanggal: "16 Juni 2026",
      status: "Disetujui",
      nip: "1987654323",
      unitKerja: "BMBPSDM",
      jabatan: "Analis SDM",
    },
    {
      nama: "Andi Wijaya",
      layanan: "PMK",
      tanggal: "15 Juni 2026",
      status: "Menunggu",
      nip: "1987654324",
      unitKerja: "Sekretariat",
      jabatan: "Pelaksana",
    },
    {
      nama: "Maria Hutagalung",
      layanan: "Mutasi Internal",
      tanggal: "15 Juni 2026",
      status: "Diproses",
      nip: "1987654325",
      unitKerja: "BMBPSDM",
      jabatan: "Analis Organisasi",
    },
  ];

  const filteredPengajuan = pengajuan.filter(
  (item) =>
    item.nama
      .toLowerCase()
      .includes(search.toLowerCase()) ||
    item.layanan
      .toLowerCase()
      .includes(search.toLowerCase())
);

  return (
    <div className="admin-page">

      <aside className="sidebar">

  <div className="sidebar-header">
    <h2>Admin Panel</h2>
    <p>BMBPSDM</p>
  </div>

  <ul>

    <li className="active-menu">
      📥 Semua Pengajuan
    </li>

    <li
      className="logout-menu"
      onClick={handleLogout}
    >
      🚪 Logout
    </li>

  </ul>

</aside>

      <main className="main-content">

        <div className="page-header">

          <div>
            <h1>Semua Pengajuan</h1>

            <p>
              Daftar seluruh pengajuan layanan
              pegawai yang masuk ke sistem
            </p>
          </div>

          <input
  type="text"
  placeholder="Cari nama pegawai atau layanan..."
  className="search-box"
  value={search}
  onChange={(e) =>
    setSearch(e.target.value)
  }
/>

        </div>

        <div className="table-card">

          <table>

            <thead>
              <tr>
                <th>Nama Pegawai</th>
                <th>Jenis Layanan</th>
                <th>Tanggal</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>

            <tbody>

  {filteredPengajuan.length > 0 ? (

    filteredPengajuan.map(
      (item, index) => (
        <tr key={index}>

          <td>{item.nama}</td>

          <td>{item.layanan}</td>

          <td>{item.tanggal}</td>

          <td>

            <span
              className={`status ${
                item.status === "Menunggu"
                  ? "pending"
                  : item.status === "Diproses"
                  ? "process"
                  : "approved"
              }`}
            >
              {item.status}
            </span>

          </td>

          <td>

            <button
              className="detail-btn"
              onClick={() =>
                navigate(
                  "/admin/detail-pengajuan",
                  {
                    state: item,
                  }
                )
              }
            >
              Detail
            </button>

          </td>

        </tr>
      )
    )

  ) : (

    <tr>

      <td
        colSpan="5"
        style={{
          textAlign: "center",
          padding: "30px",
          color: "#64748b",
          fontWeight: "500",
        }}
      >
        Tidak ada data yang ditemukan
      </td>

    </tr>

  )}

</tbody>

          </table>

        </div>

      </main>

    </div>
  );
}