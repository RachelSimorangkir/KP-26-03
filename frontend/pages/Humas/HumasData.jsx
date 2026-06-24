import { useState } from "react";
import { NavLink, Link, Outlet } from "react-router-dom";
import "./HumasData.css";

function HumasData() {
  const [collapsed, setCollapsed] = useState(false);

  const menus = [
    {
      icon: "📰",
      title: " Publikasi Berita Kegiatan",
      path: "/humasdata/publikasi",
    },
    {
      icon: "📊",
      title: "Permintaan Data Internal",
      path: "/humasdata/permintaan",
    },
    {
      icon: "🛠️",
      title: "Helpdesk",
      path: "/humasdata/helpdesk",
    },
    {
      icon: "📨",
      title: "Permohonan/Keberatan",
      path: "/humasdata/permohonan",
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
            MENU HUMAS & DATA
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
              <span className="icon">
                {menu.icon}
              </span>

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
        <Outlet />
      </main>
    </div>
  );
}

export default HumasData;