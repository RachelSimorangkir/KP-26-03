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

  // Set data user yang sedang login (dari hasil API login) agar dipakai
  // oleh semua halaman lain (Peminjaman, Permintaan, DBR, Pemeliharaan)
  // tanpa perlu ubah satu-satu import currentUser di file-file tersebut.
  setCurrentUserOverride({
    nama: user.nama,
    nip: user.nip,
    jabatan: user.jabatan,
    unitKerja: user.unitKerja || "Bimas Kristen",
  });

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
      userName={user.nama}
      onBack={onBack}
      onLogout={onLogout}
    >
      {renderPage()}
    </SidebarLayout>
  );
};

export default BMNUser;