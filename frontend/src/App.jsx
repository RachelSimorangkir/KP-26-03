import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ScrollToTop from "../components/ScrollToTop";

import HalamanUtama from "../pages/HalamanUtama";

import Kepegawaian from "../pages/Kepegawaian";
import DashboardKPG from "../pages/DashboardKPG";

import Rekomendasi from "../pages/Rekomendasi";
import Cuti from "../pages/Cuti";
import SKBT from "../pages/SKBT";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <Routes>

        <Route
          path="/"
          element={<HalamanUtama />}
        />

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

          <Route
            path="skbt"
            element={<SKBT />}
          />
        </Route>

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