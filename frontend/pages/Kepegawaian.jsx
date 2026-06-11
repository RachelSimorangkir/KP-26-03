import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "./Kepegawaian.css";

function Kepegawaian() {
  const [collapsed, setCollapsed] = useState(false);

  const menus = [
    {
      icon: "📄",
      title: "Rekomendasi",
      path: "/kepegawaian/rekomendasi",
    },
    {
      icon: "🏖️",
      title: "Cuti",
      path: "/kepegawaian/cuti",
    },
    {
      icon: "📋",
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

        <div className="menu-title">
          {!collapsed && "MENU KEPEGAWAIAN"}
        </div>

        <nav className="menu-list">
          {menus.map((menu, index) => (
            <Link
              key={index}
              to={menu.path}
            >
              <span className="icon">
                {menu.icon}
              </span>

              {!collapsed && (
                <span className="text">
                  {menu.title}
                </span>
              )}
            </Link>
          ))}
        </nav>

      </aside>

      <main className="content">
        <Outlet />
      </main>

    </div>
  );
}

export default Kepegawaian;