import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminSidebarLayout, IconBox, IconClipboard, IconTruck, IconList, IconTool } from "../user/bmn/components";
import PeminjamanAdmin from "./PeminjamanAdmin";
import PermintaanAdmin from "./PermintaanAdmin";
import BarangMasukAdmin from "./BarangMasuk";
import DBRAdmin from "./DBRAdmin";
import PemeliharaanAdmin from "./PemeliharaanAdmin";
import HibahMasukAdmin from "./HibahMasuk";
import HibahKeluarAdmin from "./HibahKeluar";

// Icon Hibah Masuk (panah ke bawah + garis)
const IconHibahMasuk = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M12 3v13"/>
    <polyline points="5 13 12 20 19 13"/>
    <path d="M5 3h14"/>
  </svg>
);

// Icon Hibah Keluar (panah ke atas + garis)
const IconHibahKeluar = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M12 21V8"/>
    <polyline points="5 11 12 4 19 11"/>
    <path d="M5 21h14"/>
  </svg>
);

const menuItems = [
  { key: "peminjaman",   icon: <IconBox />,          label: "Proses Peminjaman" },
  { key: "permintaan",   icon: <IconClipboard />,    label: "Permintaan Barang" },
  { key: "masuk",        icon: <IconTruck />,        label: "Proses Barang Masuk" },
  { key: "hibah-masuk",  icon: <IconHibahMasuk />,   label: "Hibah Masuk" },
  { key: "hibah-keluar", icon: <IconHibahKeluar />,  label: "Hibah Keluar" },
  { key: "dbr",          icon: <IconList />,         label: "DBR" },
  { key: "pemeliharaan", icon: <IconTool />,         label: "Pemeliharaan Barang" },
];

const BMNAdmin = ({ user, onBack, onLogout }) => {
  const [activePage, setActivePage] = useState("peminjaman");
  const navigate = useNavigate();

  // Kalau parent (route/App) belum ngasih onLogout, pakai logout bawaan ini
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
    navigate("/login-admin");
  };

  const renderPage = () => {
    switch (activePage) {
      case "peminjaman":   return <PeminjamanAdmin />;
      case "permintaan":   return <PermintaanAdmin />;
      case "masuk":        return <BarangMasukAdmin />;
      case "hibah-masuk":  return <HibahMasukAdmin />;
      case "hibah-keluar": return <HibahKeluarAdmin />;
      case "dbr":          return <DBRAdmin />;
      case "pemeliharaan": return <PemeliharaanAdmin />;
      default:             return <PeminjamanAdmin />;
    }
  };

  return (
    <AdminSidebarLayout
      menuItems={menuItems}
      activePage={activePage}
      setActivePage={setActivePage}
      userName={user?.nama || "Admin BMN"}
      onBack={onBack}
      onLogout={onLogout || handleLogout}
    >
      {renderPage()}
    </AdminSidebarLayout>
  );
};

export default BMNAdmin;