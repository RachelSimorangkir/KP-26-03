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
import DetailPengajuanUser from "../pages/DetailPengajuanUser";

/* ADMIN */
import AdminDashboard from "./admin/AdminDashboard";
import DetailPengajuan from "./admin/DetailPengajuan";
import DashboardCuti from "./admin/DashboardCuti";

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

          <Route
            index
            element={<DashboardKPG />}
          />

          <Route
            path="rekomendasi"
            element={<Rekomendasi />}
          />

          <Route
            path="rekomendasi/pengaktifan-kembali"
            element={<PengaktifanKembali />}
          />

          <Route
            path="rekomendasi/kenaikan-jenjang"
            element={<KenaikanJenjang />}
          />

          <Route
            path="rekomendasi/mutasi-promosi"
            element={<MutasiPromosi />}
          />

          <Route
            path="rekomendasi/mutasi-internal"
            element={<MutasiInternal />}
          />

          <Route
            path="rekomendasi/mutasi-antar-instansi"
            element={<MutasiAntarInstansi />}
          />

          <Route
            path="rekomendasi/alih-fungsi"
            element={<AlihFungsi />}
          />

          <Route
            path="cuti"
            element={<Cuti />}
          />

          <Route
            path="skbt"
            element={<SKBT />}
          />

          <Route
            path="skbt/mandiri"
            element={<SKBTMandiri />}
          />

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

        {/* HUMAS */}
        <Route
          path="/humas-data"
          element={
            <h2>
              Halaman Humas & Data Sedang Dikembangkan
            </h2>
          }
        />

        {/* ADMIN */}
        <Route
          path="/admin"
          element={<AdminDashboard />}
        />

        <Route
          path="/admin/detail-pengajuan"
          element={<DetailPengajuan />}
        />

        <Route
          path="/admin/cuti"
          element={<DashboardCuti />}
        />

        <Route
          path="/kepegawaian/detail-pengajuan"
          element={<DetailPengajuanUser />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;