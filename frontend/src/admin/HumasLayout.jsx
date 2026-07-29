import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import "./HumasLayout.css";


export default function HumasLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [jumlahBerita, setJumlahBerita] = useState(0);

  const loadJumlahBerita = async () => {
  try {
    const res = await axios.get(
      "http://localhost:8080/api/berita/count/menunggu"
    );

    setJumlahBerita(res.data.jumlah);
  } catch (err) {
    console.error("Gagal mengambil jumlah berita:", err);
  }
};

useEffect(() => {
  loadJumlahBerita();
}, []);

  const menuItems = [
    {
      group: "RINGKASAN",
      items: [
        { label: "Ringkasan", path: "/admin-humas", },
      ],
    },
    {
      group: "HUMAS",
      items: [
        { label: "Berita masuk", path: "/admin-humas/berita-masuk", badge: jumlahBerita,},
      ],
    },
    {
      group: "DATA",
      items: [
        { label: "Permintaan data", path: "/admin-humas/permintaan-data", badge: 3,},
        { label: "Upload DIP tahunan", path: "/admin-humas/upload-dip", },
      ],
    },
    {
      group: "SISTEM INFORMASI",
      items: [
        { label: "Tiket helpdesk", path: "/admin-humas/tiket-helpdesk", badge: 8,},
      ],
    },
    {
      group: "PPID",
      items: [
        { label: "Keberatan informasi", path: "/admin-humas/keberatan-ppid", badge: 2, },
      ],
    },
    {
      group: "LAINNYA",
      items: [
        { label: "Laporan & rekap", path: "/admin-humas/laporan", },
      ],
    },
  ];

  const isActive = (path) => location.pathname === path;
  const handleLogout = () => {
  localStorage.clear();
  sessionStorage.clear();

  navigate("/login-admin");
};

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
        <div className="sidebar-footer">
  <button
    className="menu-item logout-item"
    onClick={handleLogout}
    title={collapsed ? "Logout" : ""}
  >
    {!collapsed && <span className="menu-label">Logout</span>}
  </button>
</div>
      </aside>

      <main className={`main-content ${collapsed ? "expanded" : ""}`}>
        <Outlet />
      </main>
    </div>
  );
}