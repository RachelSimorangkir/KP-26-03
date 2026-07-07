import { useState } from "react";
import { NavLink, Link, Outlet } from "react-router-dom";
import "./Kepegawaian.css";

function Kepegawaian() {
  const [collapsed, setCollapsed] = useState(false);

  const menus = [
    {
      title: "Rekomendasi",
      path: "/kepegawaian/rekomendasi",
    },
    {
      title: "Cuti",
      path: "/kepegawaian/cuti",
    },
    {
      title: "SKBT",
      path: "/kepegawaian/skbt",
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
            MENU KEPEGAWAIAN
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

export default Kepegawaian;