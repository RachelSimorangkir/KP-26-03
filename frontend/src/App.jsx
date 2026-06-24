import { useState } from "react";
import Login from "./pages/auth/Login";
import ServiceSelection from "./pages/auth/ServiceSelection";
import BMNUser from "./pages/user/bmn/BMNUser";
import BMNAdmin from "./pages/admin/BMNAdmin";

// Tahapan alur aplikasi:
// "login"   -> halaman login (input NIP)
// "select"  -> halaman pilih layanan (Kepegawaian/BMN/Data)
// "bmn"     -> halaman BMN (otomatis User atau Admin sesuai role)
function App() {
  const [stage, setStage] = useState("login");
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setStage("select");
  };

  const handleLogout = () => {
    setUser(null);
    setStage("login");
  };

  const handleSelectBMN = () => {
    setStage("bmn");
  };

  const handleBackToSelection = () => {
    setStage("select");
  };

  if (stage === "login") {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  if (stage === "select") {
    return (
      <ServiceSelection
        user={user}
        onSelectBMN={handleSelectBMN}
        onLogout={handleLogout}
      />
    );
  }

  if (stage === "bmn") {
    // Routing otomatis berdasarkan role yang didapat dari database
    return user.role === "admin" ? (
      <BMNAdmin user={user} onBack={handleBackToSelection} onLogout={handleLogout} />
    ) : (
      <BMNUser user={user} onBack={handleBackToSelection} onLogout={handleLogout} />
    );
  }

  return null;
}

export default App;