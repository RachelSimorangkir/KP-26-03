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
import BMNAdmin from "./pages/admin/BMNAdmin";
import BMN from "./pages/user/bmn/BMN";
import DashboardUser from "./pages/user/bmn/DashboardUser";
import PeminjamanUser from "./pages/user/bmn/PeminjamanUser";
import PermintaanUser from "./pages/user/bmn/PermintaanUser";
import DBRUser from "./pages/user/bmn/DBRUser";
import PemeliharaanUser from "./pages/user/bmn/PemeliharaanUser";
import DashboardCuti from "./admin/DashboardCuti";
import AdminDashboard from "./admin/AdminDashboard";

/* ADMIN */
import DetailPengajuan from "./admin/DetailPengajuan";
import DataRequest from "../pages/DataRequest";
import PPIDRequest from "../pages/PPIDRequest";
import PPIDAdminDashboard from "../pages/PPIDAdminDashboard";
import HumasLayout from "./admin/HumasLayout";
import HumasAdmin from "./admin/HumasAdmin";


/*Humas */
import HumasData from "../pages/Humas/HumasData";
import DashboardHumas from "../pages/Humas/DashboardHumas";
import Publikasi from "../pages/Humas/Publikasi";
import DaftarPengajuan from "../pages/Humas/DaftarPengajuan";
import FormPengajuan from "../pages/Humas/FormPengajuan";
import PermintaanData from "../pages/Humas/PermintaanData";
import DataInternal from "../pages/Humas/DataInternal";
import StatusData from "../pages/Humas/StatusData";
import Helpdesk from "../pages/Humas/Helpdesk";
import FormHelpdesk from "../pages/Humas/FormHelpdesk";
import StatusHelpdesk from "../pages/Humas/StatusHelpdesk";
import PPID from "../pages/Humas/PPID";
import Permohonan from "../pages/Humas/Permohonan";
import StatusPermohonan from "../pages/Humas/StatusPermohonan";
import BeritaMasuk from "../pages/Humas/BeritaMasuk";
import DataPermintaan from "../pages/Humas/DataPermintaan";
import UploadDip from "../pages/Humas/UploadDip";
import Tiket from "../pages/Humas/Tiket";
import Keberatan from "../pages/Humas/Keberatan";
import Rekap from "../pages/Humas/Rekap";
import Dip from "../pages/Humas/Dip";

const currentUser = JSON.parse(
  localStorage.getItem("currentUser") || "null"
);


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

        {/* ADMIN KEPEGAWAIAN */}
<Route
  path="/admin-kepegawaian"
  element={<AdminDashboard />}
/>

{/* ADMIN BMN */}
<Route
  path="/admin-bmn"
  element={<BMNAdmin />}
/>

<Route
  path="/admin-kepegawaian/cuti"
  element={<DashboardCuti />}
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

        {/* COMMENT OUT SEMUA ROUTE YANG KOMPONENNYA BELUM ADA */}
        {/* 
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
          path="/humas/admin-humas/penyetuju"
          element={<HumasAdminPenyetuju />}
        />
        <Route
          path="/humas/admin-humas/verifikator"
          element={<HumasAdminVerifikator />}
        />
        <Route
          path="/humas/data-request"
          element={<HumasDataRequest />}
        />
        */}

        <Route
          path="/data/request"
          element={<DataRequest />}
        />

        {/* 
        <Route
          path="/helpdesk"
          element={<Helpdesk />}
        />
        */}

        <Route
          path="/ppid/request"
          element={<PPIDRequest />}
        />

        {/* 
        <Route
          path="/ppid/dip/upload"
          element={<DIPUpload />}
        />
        <Route
          path="/ppid/dip/status"
          element={<DIPStatus />}
        />
        */}

        <Route
          path="/ppid/admin-humas/dip"
          element={<PPIDAdminDashboard />}
        />

        <Route path="/bmn" element={<DashboardUser />}>

  <Route
    path="peminjaman"
    element={<PeminjamanUser />}
  />

  <Route
    path="permintaan"
    element={<PermintaanUser />}
  />

  <Route
    path="dbr"
    element={<DBRUser />}
  />

  <Route
    path="pemeliharaan"
    element={<PemeliharaanUser />}
  />

</Route>

        
        {/* HUMAS - PARENT ROUTE DENGAN SIDEBAR */} 
        <Route path="/humasdata" element={<HumasData />}>
          {/* Default: DashboardHumas saat akses /humasdata */}
          <Route index element={<DashboardHumas />} />
  
          {/* Publikasi */}
          <Route path="publikasi" element={<Publikasi />} />
          <Route path="publikasi/form-pengajuan" element={<FormPengajuan />} />
          <Route path="publikasi/daftar-pengajuan" element={<DaftarPengajuan />} />
  
          {/* Permintaan Data Internal */}
          <Route path="PermintaanData" element={<PermintaanData/>} />
          <Route path="PermintaanData/DataInternal" element={<DataInternal />} />
          <Route path="PermintaanData/StatusData" element={<StatusData />} />
  
          {/* HelpDesk */}
          <Route path="helpdesk" element={<Helpdesk />} />
          <Route path="helpdesk/FormHelpdesk" element={<FormHelpdesk />} />
          <Route path="helpdesk/StatusHelpdesk" element={<StatusHelpdesk />} />

          {/* Permohonan/Keberatan */}
          <Route path="PPID" element={<PPID />} />
          <Route path="PPID/Permohonan" element={<Permohonan />} />
          <Route path="PPID/StatusPermohonan" element={<StatusPermohonan />} />
          

          <Route path="/humasdata/dip" element={<Dip />} />
        </Route>


        <Route
  path="/admin-kepegawaian"
  element={<AdminDashboard />}
/>

<Route
  path="/admin-kepegawaian/cuti"
  element={<DashboardCuti />}
/>

<Route
  path="/admin-kepegawaian/detail-pengajuan"
  element={<DetailPengajuan />}
/>

<Route
  path="/admin-bmn"
  element={<BMNAdmin />}
/>

<Route path="/admin-humas" element={<HumasLayout />}>
  <Route index element={<HumasAdmin />} />
  <Route path="berita-masuk" element={<BeritaMasuk />} />
  <Route path="permintaan-data" element={<DataPermintaan />} />
  <Route path="upload-dip" element={<UploadDip />} />
  <Route path="tiket-helpdesk" element={<Tiket />} />
  <Route path="keberatan-ppid" element={<Keberatan />} />
  <Route path="laporan" element={<Rekap />} />
</Route>
         


      </Routes>
    </BrowserRouter>
  );
}

export default App;