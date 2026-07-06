import "./AdminDashboard.css";
import {
  Navigate,
  useNavigate,
} from "react-router-dom";

import {
  useState,
  useEffect,
} from "react";

export default function DashboardCuti() {

  const navigate = useNavigate();

  const isLoggedIn =
    localStorage.getItem("isLoggedIn") === "true";

  const role =
    localStorage.getItem("userRole");

  if (!isLoggedIn || role !== "admin") {
    return <Navigate to="/login-admin" />;
  }

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login-admin");
  };

  const [search,setSearch]=useState("");

  const [cuti,setCuti]=useState([]);

  useEffect(() => {

  fetch("http://localhost:8080/api/pengajuan")
    .then((res) => res.json())
    .then((data) => {

      const hasil = data.filter(
        (item) => item.layanan === "Cuti"
      );

      setCuti(hasil);

    })
    .catch((err) => {

      console.error(err);

    });

}, []);

const filtered = cuti.filter(

item =>

item.nama
.toLowerCase()
.includes(search.toLowerCase())

||

item.jenis_cuti
?.toLowerCase()
.includes(search.toLowerCase())

);

return(

<div className="admin-page">

<aside className="sidebar">

<div className="sidebar-header">

<h2>Admin Panel</h2>

<p>BMBPSDM</p>

</div>

<ul>

<li
onClick={()=>navigate("/admin")}
>

📥 Semua Pengajuan

</li>

<li className="active-menu">

🌴 Pengajuan Cuti

</li>

<li
className="logout-menu"
onClick={handleLogout}
>

🚪 Logout

</li>

</ul>

</aside>

<main className="main-content">

<div className="page-header">

<div>

<h1>Dashboard Cuti</h1>

<p>
Monitoring pegawai yang sedang cuti
</p>

</div>

<input

className="search-box"

placeholder="Cari pegawai..."

value={search}

onChange={(e)=>setSearch(e.target.value)}

/>

</div>

<div className="table-card">

<table>

<thead>

<tr>

<th>Nama</th>

<th>Jenis Cuti</th>

<th>Mulai</th>

<th>Selesai</th>

<th>Sisa Hak Cuti</th>

<th>Status</th>

</tr>

</thead>

<tbody>

{
filtered.map((item,index)=>(

<tr key={index}>

<td>{item.nama}</td>

<td>{item.jenis_cuti}</td>

<td>{item.tanggal_mulai}</td>

<td>{item.tanggal_selesai}</td>

<td>
    <span
        className={
            item.sisa_cuti <= 3
                ? "pending"
                : item.sisa_cuti <= 6
                ? "process"
                : "approved"
        }
    >
        {item.sisa_cuti} Hari
    </span>
</td>

<td>
    <span
        className={`status ${
            item.status === "Menunggu"
                ? "pending"
                : item.status === "Diproses"
                ? "process"
                : "approved"
        }`}
    >
        {item.status}
    </span>
</td>

</tr>

))

}

</tbody>

</table>

</div>

</main>

</div>

);

}
