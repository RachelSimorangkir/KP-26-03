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

  function getCountdown(mulai, selesai){

  if(!mulai || !selesai){

    return{
      text:"-",
      className:"pending"
    }

  }

  const sekarang=new Date();

  const tMulai=new Date(mulai);

  const tSelesai=new Date(selesai);

  if(sekarang<tMulai){

    const hari=Math.ceil(
      (tMulai-sekarang)/(1000*60*60*24)
    );

    return{

      text:`Mulai ${hari} hari lagi`,
      className:"process"

    }

  }

  if(sekarang>=tMulai && sekarang<=tSelesai){

    const sisa=Math.ceil(
      (tSelesai-sekarang)/(1000*60*60*24)
    );

    return{

      text:`Sedang cuti (${sisa} hari lagi)`,

      className:"approved"

    }

  }

  return{

    text:"Cuti selesai",

    className:"pending"

  }

}

const filtered=cuti.filter(

item=>

item.nama
.toLowerCase()
.includes(search.toLowerCase())

||

item.jenisCuti
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

<th>Countdown</th>

<th>Status</th>

</tr>

</thead>

<tbody>

{
filtered.map((item,index)=>(

<tr key={index}>

<td>{item.nama}</td>

<td>{item.jenisCuti}</td>

<td>{item.tanggalMulai}</td>

<td>{item.tanggalSelesai}</td>

<td>

<span
className={
getCountdown(
item.tanggalMulai,
item.tanggalSelesai
).className
}
>

{
getCountdown(
item.tanggalMulai,
item.tanggalSelesai
).text
}

</span>

</td>

<td>

<span
className={`status ${
item.status==="Menunggu"
?"pending"
:item.status==="Diproses"
?"process"
:"approved"
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
