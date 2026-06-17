import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";

import HalamanUtama from "../pages/HalamanUtama";

import Login from "../pages/Login";
import LoginUser from "../pages/LoginUser";
import LoginAdmin from "../pages/LoginAdmin";

import DashboardPegawai from "../pages/DashboardPegawai";

import Kepegawaian from "../pages/Kepegawaian";
import DashboardKPG from "../pages/DashboardKPG";

import Rekomendasi from "../pages/Rekomendasi";
import PengaktifanKembali from "../pages/PengaktifanKembali";
import KenaikanJenjang from "../pages/KenaikanJenjang";
import MutasiPromosi from "../pages/MutasiPromosi";
import MutasiInternal from "../pages/MutasiInternal";
import MutasiAntarInstansi from "../pages/MutasiAntarInstansi";
import AlihFungsi from "../pages/AlihFungsi";

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

        {/* LOGIN */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* LOGIN USER */}
        <Route
          path="/login-user"
          element={<LoginUser />}
        />

        {/* LOGIN ADMIN */}
        <Route
          path="/login-admin"
          element={<LoginAdmin />}
        />

        {/* DASHBOARD PEGAWAI */}
        <Route
          path="/dashboard-pegawai"
          element={<DashboardPegawai />}
        />

        {/* KEPEGAWAIAN */}
        <Route
          path="/kepegawaian"
          element={<Kepegawaian />}
        >

          {/* DASHBOARD */}
          <Route
            index
            element={<DashboardKPG />}
          />

          {/* REKOMENDASI */}
          <Route
            path="rekomendasi"
            element={<Rekomendasi />}
          />

          {/* PENGAKTIFAN KEMBALI */}
          <Route
            path="rekomendasi/pengaktifan-kembali"
            element={<PengaktifanKembali />}
          />

          {/* KENAIKAN JENJANG */}
          <Route
            path="rekomendasi/kenaikan-jenjang"
            element={<KenaikanJenjang />}
          />

          {/* MUTASI / PROMOSI */}
          <Route
            path="rekomendasi/mutasi-promosi"
            element={<MutasiPromosi />}
          />

          {/* MUTASI INTERNAL */}
          <Route
            path="rekomendasi/mutasi-internal"
            element={<MutasiInternal />}
          />

          {/* MUTASI ANTAR INSTANSI */}
          <Route
            path="rekomendasi/mutasi-antar-instansi"
            element={<MutasiAntarInstansi />}
          />

          {/* ALIH FUNGSI */}
          <Route
            path="rekomendasi/alih-fungsi"
            element={<AlihFungsi />}
          />

          {/* CUTI */}
          <Route
            path="cuti"
            element={<Cuti />}
          />

          {/* SKBT */}
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