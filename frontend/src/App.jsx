import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ScrollToTop from "../components/ScrollToTop";

import HalamanUtama from "../pages/HalamanUtama";

import Kepegawaian from "../pages/Kepegawaian";
import DashboardKPG from "../pages/DashboardKPG";

import Rekomendasi from "../pages/Rekomendasi";
import Cuti from "../pages/Cuti";

import SKBT from "../pages/SKBT";
import SKBTMandiri from "../pages/SKBTMandiri";
import SKBTOrganisasi from "../pages/SKBTOrganisasi";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <Routes>

        {/* HALAMAN UTAMA */}
        <Route
          path="/"
          element={<HalamanUtama />}
        />

        {/* KEPEGAWAIAN */}
        <Route
          path="/kepegawaian"
          element={<Kepegawaian />}
        >
          <Route
            index
            element={<DashboardKPG />}
          />

          <Route
            path="rekomendasi"
            element={<Rekomendasi />}
          />

          <Route
            path="cuti"
            element={<Cuti />}
          />

          {/* HALAMAN PILIHAN SKBT */}
          <Route
            path="skbt"
            element={<SKBT />}
          />

          {/* SKBT MANDIRI */}
          <Route
            path="skbt/mandiri"
            element={<SKBTMandiri />}
          />

          {/* SKBT ORGANISASI */}
          <Route
            path="skbt/organisasi"
            element={<SKBTOrganisasi />}
          />

        </Route>

        {/* BMN */}
        <Route
          path="/bmn"
          element={
            <h2>
              Halaman BMN Sedang Dikembangkan
            </h2>
          }
        />

        {/* HUMAS & DATA */}
        <Route
          path="/humas-data"
          element={
            <h2>
              Halaman Humas & Data Sedang Dikembangkan
            </h2>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;