import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ScrollToTop from "../components/ScrollToTop";

import HalamanUtama from "../pages/HalamanUtama";
import Kepegawaian from "../pages/Kepegawaian";

import DashboardKepegawaian from "../pages/DashboardKepegawaian";
import KenaikanPangkat from "../pages/KenaikanPangkat";
import TugasBelajar from "../pages/TugasBelajar";

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

          {/* Layanan */}
          <Route
            path="kenaikan-pangkat"
            element={<KenaikanPangkat />}
          />

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

        {/* Placeholder Divisi Lain */}
        <Route
          path="/bmn"
          element={<h2>Halaman BMN Sedang Dikembangkan</h2>}
        />

        <Route
          path="/humas-data"
          element={<h2>Halaman Humas & Data Sedang Dikembangkan</h2>}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;