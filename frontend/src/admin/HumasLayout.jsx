import { useState } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import "./HumasLayout.css";

export default function HumasLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    {
      group: "RINGKASAN",
      items: [
        { label: "Ringkasan", path: "/admin-humas", icon: "📝" },
      ],
    },
    {
      group: "HUMAS",
      items: [
        { label: "Berita masuk", path: "/admin-humas/berita-masuk", badge: 5, icon: "📥" },
        { label: "Berita terbit", path: "/admin-humas/berita-terbit", icon: "📤" },
      ],
    },
    {
      group: "DATA",
      items: [
        { label: "Permintaan data", path: "/admin-humas/permintaan-data", badge: 3, icon: "📋" },
        { label: "Upload DIP tahunan", path: "/admin-humas/upload-dip", icon: "📁" },
      ],
    },
    {
      group: "SISTEM INFORMASI",
      items: [
        { label: "Tiket helpdesk", path: "/admin-humas/tiket-helpdesk", badge: 8, icon: "🛠️" },
      ],
    },
    {
      group: "PPID",
      items: [
        { label: "Keberatan informasi", path: "/admin-humas/keberatan-ppid", badge: 2, icon: "⚖️" },
      ],
    },
    {
      group: "LAINNYA",
      items: [
        { label: "Laporan & rekap", path: "/admin-humas/laporan", icon: "📈" },
      ],
    },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="admin-layout">
      <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
        {/* Header Sidebar */}
        <div className="sidebar-header">
          {!collapsed && (
            <div className="portal-info">
              <h1 className="portal-title">Bimas Kristen</h1>
              <p className="user-role">Admin terpusat</p>
            </div>
          )}
          <button
            className="toggle-btn"
            onClick={() => setCollapsed(!collapsed)}
            title={collapsed ? "Buka sidebar" : "Tutup sidebar"}
          >
            {collapsed ? "☰" : "✕"}
          </button>
        </div>

        {/* Menu */}
        <nav className="sidebar-nav">
          {menuItems.map((group, groupIdx) => (
            <div key={groupIdx} className="menu-group">
              {!collapsed && (
                <h3 className="menu-group-title">{group.group}</h3>
              )}
              <div className="menu-items-list">
                {group.items.map((item, itemIdx) => (
                  <button
                    key={itemIdx}
                    className={`menu-item ${isActive(item.path) ? "active" : ""}`}
                    onClick={() => navigate(item.path)}
                    title={collapsed ? item.label : ""}
                  >
                    <div className="menu-icon-box">
                      <span className="menu-icon">{item.icon}</span>
                    </div>
                    {!collapsed && <span className="menu-label">{item.label}</span>}
                    {!collapsed && item.badge && (
                      <span className="menu-badge">{item.badge}</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </aside>

      <main className={`main-content ${collapsed ? "expanded" : ""}`}>
        <Outlet />
      </main>
    </div>
  );
}