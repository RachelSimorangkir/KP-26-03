import { useState } from "react";
import { AdminSidebarLayout, IconBox, IconClipboard, IconTruck, IconList, IconTool } from "../user/bmn/components";
import PeminjamanAdmin from "./PeminjamanAdmin";
import PermintaanAdmin from "./PermintaanAdmin";
import BarangMasukAdmin from "./BarangMasuk";
import DBRAdmin from "./DBRAdmin";
import PemeliharaanAdmin from "./PemeliharaanAdmin";

const menuItems = [
  { key: "peminjaman",   icon: <IconBox />,       label: "Proses Peminjaman" },
  { key: "permintaan",   icon: <IconClipboard />, label: "Permintaan Barang" },
  { key: "masuk",        icon: <IconTruck />,     label: "Proses Barang Masuk" },
  { key: "dbr",          icon: <IconList />,      label: "DBR" },
  { key: "pemeliharaan", icon: <IconTool />,      label: "Pemeliharaan Barang" },
];

const BMNAdmin = ({ user, onBack, onLogout }) => {
  const [activePage, setActivePage] = useState("peminjaman");

  const renderPage = () => {
    switch (activePage) {
      case "peminjaman":  return <PeminjamanAdmin />;
      case "permintaan":  return <PermintaanAdmin />;
      case "masuk":       return <BarangMasukAdmin />;
      case "dbr":         return <DBRAdmin />;
      case "pemeliharaan": return <PemeliharaanAdmin />;
      default:            return <PeminjamanAdmin />;
    }
  };

  return (
    <AdminSidebarLayout
      menuItems={menuItems}
      activePage={activePage}
      setActivePage={setActivePage}
      userName={user?.nama || "Admin BMN"}
      onBack={onBack}
      onLogout={onLogout}
    >
      {renderPage()}
    </AdminSidebarLayout>
  );
};

export default BMNAdmin;