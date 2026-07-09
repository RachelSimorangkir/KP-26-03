import { useState } from "react";
import { setCurrentUserOverride } from "./dummyData";
import { SidebarLayout, IconBox, IconClipboard, IconList, IconTool } from "./components";
import PeminjamanUser from "./PeminjamanUser";
import PermintaanUser from "./PermintaanUser";
import DBRUser from "./DBRUser";
import PemeliharaanUser from "./PemeliharaanUser";

const menuItems = [
  { key: "peminjaman",   icon: <IconBox />,       label: "Peminjaman Barang" },
  { key: "permintaan",   icon: <IconClipboard />, label: "Permintaan Barang" },
  { key: "dbr",          icon: <IconList />,      label: "DBR Saya" },
  { key: "pemeliharaan", icon: <IconTool />,       label: "Pemeliharaan Barang" },
];

const BMNUser = ({ user, onBack, onLogout }) => {
  const [activePage, setActivePage] = useState("peminjaman");

  // User sementara kalau belum login
  const currentUser = user ?? {
    nama: "Pegawai",
    nip: "000000000",
    jabatan: "Staff",
    unitKerja: "Bimas Kristen",
  };

  setCurrentUserOverride(currentUser);

  const renderPage = () => {
    switch (activePage) {
      case "peminjaman": return <PeminjamanUser />;
      case "permintaan": return <PermintaanUser />;
      case "dbr":        return <DBRUser />;
      case "pemeliharaan": return <PemeliharaanUser />;
      default:           return <PeminjamanUser />;
    }
  };

  return (
    <SidebarLayout
      menuItems={menuItems}
      activePage={activePage}
      setActivePage={setActivePage}
      role="user"
      userName={currentUser.nama}
      onBack={onBack}
      onLogout={onLogout}
    >
      {renderPage()}
    </SidebarLayout>
  );
};

export default BMNUser;