import { useState } from "react";
import {
  NavLink,
  Link,
  Outlet,
  useLocation,
} from "react-router-dom";
import "./DashboardUser.css";

function BMNUser() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const menus = [
    {
      title: "Peminjaman Barang",
      path: "/bmn/peminjaman",
    },
    {
      title: "Permintaan Barang",
      path: "/bmn/permintaan",
    },
    {
      title: "DBR Saya",
      path: "/bmn/dbr",
    },
    {
      title: "Pemeliharaan Barang",
      path: "/bmn/pemeliharaan",
    },
  ];

  return (
    <div className="dashboard">
      <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
        <div className="sidebar-header">
          {!collapsed && (
            <Link to="/" className="portal-link">
  <div className="logo-text">
    <h2>Portal</h2>
    <span>Layanan Internal</span>
  </div>
</Link>
          )}

          <button
            className="toggle-btn"
            onClick={() => setCollapsed(!collapsed)}
          >
            ☰
          </button>
        </div>

        {!collapsed && (
          <div className="menu-title">
            MENU LAYANAN BMN
          </div>
        )}

        <nav className="menu-list">
          {menus.map((menu, index) => (
            <NavLink
              key={index}
              to={menu.path}
              className={({ isActive }) =>
                isActive ? "menu-item active" : "menu-item"
              }
            >
              {!collapsed && (
                <span className="text">
                  {menu.title}
                </span>
              )}
            </NavLink>
          ))}
        </nav>
      </aside>

      <main
  className={`content ${
    collapsed ? "content-expanded" : "content-normal"
  }`}
>

  {location.pathname === "/bmn" ? (

    <div className="dashboard-user">

      <div className="welcome-container">

        <div className="welcome-badge">
          Portal Internal BMBPSDM
        </div>

        <h1 className="welcome-title">
          Selamat Datang di Layanan
          <br />
          Barang Milik Negara
        </h1>

        <p className="welcome-desc">
          Portal ini digunakan untuk mendukung pengelolaan Barang Milik Negara
          secara terintegrasi di lingkungan Balai Manajemen dan Pengembangan
          Sumber Daya Manusia Kementerian Agama Republik Indonesia.
        </p>

      </div>

    </div>

  ) : (

    <Outlet />

  )}

</main>
    </div>
  );
}

export default BMNUser;