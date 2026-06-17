/* eslint-disable no-undef */
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";
import HalamanUtama from "../pages/HalamanUtama";
import Kepegawaian from "../pages/Kepegawaian";
import DashboardKepegawaian from "../pages/DashboardKepegawaian";
import KenaikanPangkat from "../pages/KenaikanPangkat";
import TugasBelajar from "../pages/TugasBelajar";
import HumasData from "../pages/HumasData";
import HumasPublish from "../pages/HumasPublish";
import HumasAdminPenyetuju from "../pages/HumasAdminPenyetuju";
import HumasAdminVerifikator from "../pages/HumasAdminVerifikator";
import DataRequest from "../pages/DataRequest";
import HumasDataRequest from "../pages/HumasDataRequest";
import Helpdesk from "../pages/Helpdesk";
import PPIDRequest from "../pages/PPIDRequest";
import DIPUpload from "../pages/DIPUpload";
import DIPStatus from "../pages/DIPStatus";
import PPIDAdminDashboard from "../pages/PPIDAdminDashboard";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <Routes>

        {/* Portal Utama */}
        <Route
          path="/"
          element={<HalamanUtama />}
        />

        {/* Modul Kepegawaian */}
        <Route
          path="/kepegawaian"
          element={<Kepegawaian />}
        >
          {/* Halaman Default */}
          <Route
            index
            element={<DashboardKepegawaian />}
          />

          {/* layanan kenaikan pangkat*/}
          <Route
            path="kenaikan-pangkat"
            element={<KenaikanPangkat />}
          />

          {/* layanan tugas belajar */}
          <Route
            path="tugas-belajar"
            element={<TugasBelajar />}
          />

          <Route
            path="gelar-akademik"
            element={<h2>Gelar Akademik</h2>}
          />

          <Route
            path="pensiun"
            element={<h2>Pensiun</h2>}
          />

          <Route
            path="satya-lencana"
            element={<h2>Satya Lencana</h2>}
          />

          <Route
            path="perubahan-jabatan"
            element={<h2>Perubahan Jabatan</h2>}
          />

          <Route
            path="daftar-pelantikan"
            element={<h2>Daftar Pelantikan</h2>}
          />

          <Route
            path="pmk"
            element={<h2>PMK</h2>}
          />

          <Route
            path="ujikom-jf"
            element={<h2>Ujikom JF</h2>}
          />

          <Route
            path="mutasi-internal"
            element={<h2>Mutasi Internal</h2>}
          />

          <Route
            path="mutasi-antar-instansi"
            element={<h2>Mutasi Antar Instansi</h2>}
          />

          <Route
            path="cuti-pegawai"
            element={<h2>Cuti Pegawai</h2>}
          />

        </Route>

        <Route 
          path="/humas-data" 
          element={<HumasData />} 
        />
        <Route
          path="/humas/publikasi"
          element={<HumasPublish />}
        />
        <Route
          path="/humas/admin/penyetuju"
          element={<HumasAdminPenyetuju />}
        />
        <Route
          path="/humas/admin/verifikator"
          element={<HumasAdminVerifikator />}
        />
        <Route
          path="/humas/data-request"
          element={<HumasDataRequest />}
        />
        <Route
          path="/data/request"
          element={<DataRequest />}
        />
        <Route
          path="/helpdesk"
          element={<Helpdesk />}
        />
        <Route
          path="/ppid/request"
          element={<PPIDRequest />}
        />
        <Route
          path="/ppid/dip/upload"
          element={<DIPUpload />}
        />
        <Route
          path="/ppid/dip/status"
          element={<DIPStatus />}
        />
        <Route
          path="/ppid/admin/dip"
          element={<PPIDAdminDashboard />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;