/* eslint-disable no-undef */
import "./App.css";
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

/* ADMIN */
import AdminDashboard from "./admin/AdminDashboard";
import DetailPengajuan from "./admin/DetailPengajuan";
import HumasData from "../pages/HumasData";
import HumasPublish from "../pages/HumasPublish";
import HumasAdminPenyetuju from "../pages/HumasAdminPenyetuju";
import HumasAdminVerifikator from "../pages/HumasAdminVerifikator";
import HumasMySubmissions from "../pages/HumasMySubmissions";
import DataRequest from "../pages/DataRequest";
import HumasDataRequest from "../pages/HumasDataRequest";
import Helpdesk from "../pages/Helpdesk";
import PPIDRequest from "../pages/PPIDRequest";
import DIPUpload from "../pages/DIPUpload";
import DIPStatus from '../pages/DIPStatus';
import PPIDAdminDashboard from "../pages/PPIDAdminDashboard";

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

        <Route 
          path="/humas-data" 
          element={<HumasData />} 
        />
        <Route
          path="/humas/publikasi"
          element={<HumasPublish />}
        />
        <Route
          path="/humas/my-submissions"
          element={<HumasMySubmissions />}
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

      </Routes>
    </BrowserRouter>
  );
}

export default App;