import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Rekap.css";

export default function Rekap() {
  const navigate = useNavigate();

  // State filter
  const [filterBulan, setFilterBulan] = useState("2024-06");
  const [filterLayanan, setFilterLayanan] = useState(["humas", "data", "si", "ppid"]);

  // Mock data metric per layanan
  const metricData = {
    humas: {
      nama: "Humas",
      baru: 12,
      diproses: 8,
      selesai: 45,
      ditolak: 3,
      total: 68,
      avgSLA: 3.2,
    },
    data: {
      nama: "Permintaan Data",
      baru: 5,
      diproses: 12,
      selesai: 28,
      ditolak: 2,
      total: 47,
      avgSLA: 4.5,
    },
    si: {
      nama: "Tiket Helpdesk (SI)",
      baru: 8,
      diproses: 15,
      selesai: 62,
      ditolak: 5,
      total: 90,
      avgSLA: 2.1,
    },
    ppid: {
      nama: "PPID / Keberatan",
      baru: 3,
      diproses: 4,
      selesai: 18,
      ditolak: 1,
      total: 26,
      avgSLA: 5.8,
    },
  };

  // Mock data grafik tren bulanan (6 bulan terakhir)
  const trenBulanan = [
    { bulan: "Jan", humas: 45, data: 32, si: 68, ppid: 18 },
    { bulan: "Feb", humas: 52, data: 38, si: 75, ppid: 22 },
    { bulan: "Mar", humas: 48, data: 41, si: 82, ppid: 19 },
    { bulan: "Apr", humas: 61, data: 35, si: 71, ppid: 25 },
    { bulan: "Mei", humas: 58, data: 44, si: 88, ppid: 21 },
    { bulan: "Jun", humas: 68, data: 47, si: 90, ppid: 26 },
  ];

  // Mock data rata-rata SLA per layanan
  const slaData = [
    { layanan: "Humas", avgHari: 3.2, target: 5, status: "Baik" },
    { layanan: "Permintaan Data", avgHari: 4.5, target: 7, status: "Baik" },
    { layanan: "Tiket Helpdesk", avgHari: 2.1, target: 3, status: "Baik" },
    { layanan: "PPID / Keberatan", avgHari: 5.8, target: 30, status: "Sangat Baik" },
  ];

  // Mock data bidang belum patuh DIP
  const bidangBelumPatuh = [
    { bidang: "Ortala Kepegawaian", status: "Belum Upload", terakhirReminder: "2024-06-20", hariTerlambat: 12 },
    { bidang: "BMN", status: "Belum Upload", terakhirReminder: "2024-06-20", hariTerlambat: 12 },
    { bidang: "Evaluasi", status: "Revisi", terakhirReminder: "2024-06-18", hariTerlambat: 5 },
  ];

  // Toggle layanan filter
  const toggleLayanan = (layanan) => {
    if (filterLayanan.includes(layanan)) {
      setFilterLayanan(filterLayanan.filter((l) => l !== layanan));
    } else {
      setFilterLayanan([...filterLayanan, layanan]);
    }
  };

  // Hitung total dari filter
  const getFilteredMetrics = () => {
    let totalBaru = 0, totalDiproses = 0, totalSelesai = 0, totalDitolak = 0, totalAll = 0;
    filterLayanan.forEach((l) => {
      const m = metricData[l];
      if (m) {
        totalBaru += m.baru;
        totalDiproses += m.diproses;
        totalSelesai += m.selesai;
        totalDitolak += m.ditolak;
        totalAll += m.total;
      }
    });
    return { totalBaru, totalDiproses, totalSelesai, totalDitolak, totalAll };
  };

  const metrics = getFilteredMetrics();

  // Max value untuk chart
  const maxChartValue = Math.max(...trenBulanan.map((t) => Math.max(t.humas, t.data, t.si, t.ppid)));

  // Handle export
  const handleExport = (format) => {
    alert(`Laporan berhasil diexport dalam format ${format.toUpperCase()}!\n\nPeriode: ${filterBulan}\nLayanan: ${filterLayanan.join(", ")}`);
  };

  return (
    <div className="rekap-page">
      {/* BACK BUTTON */}
      <div className="page-header">
  <div className="page-header-content">
    <h1>Laporan dan Rekap</h1>
    <p>Ringkasan kinerja layanan Humas & Data per periode</p>
  </div>
</div>
//Ringkasan kinerja layanan Humas & Data per periode
      {/* FILTER SECTION */}
      <div className="filter-section">
        <div className="filter-row">
          <div className="filter-group">
            <label>Periode Laporan</label>
            <input
              type="month"
              value={filterBulan}
              onChange={(e) => setFilterBulan(e.target.value)}
            />
          </div>

          <div className="filter-group filter-group-large">
            <label>Filter Layanan</label>
            <div className="layanan-filter">

    <button
        type="button"
        className={`layanan-chip ${filterLayanan.includes("humas") ? "active" : ""}`}
        onClick={() => toggleLayanan("humas")}
    >
        Humas
    </button>

    <button
        type="button"
        className={`layanan-chip ${filterLayanan.includes("data") ? "active" : ""}`}
        onClick={() => toggleLayanan("data")}
    >
        Permintaan Data
    </button>

    <button
        type="button"
        className={`layanan-chip ${filterLayanan.includes("si") ? "active" : ""}`}
        onClick={() => toggleLayanan("si")}
    >
        Sistem Informasi
    </button>

    <button
        type="button"
        className={`layanan-chip ${filterLayanan.includes("ppid") ? "active" : ""}`}
        onClick={() => toggleLayanan("ppid")}
    >
        PPID
    </button>

</div>
          </div>

          <div className="filter-group export-group">
            <label>Export Laporan</label>
            <div className="export-buttons">
              <button className="btn-export btn-excel" onClick={() => handleExport("excel")}>
                📊 Excel
              </button>
              <button className="btn-export btn-pdf" onClick={() => handleExport("pdf")}>
                📄 PDF
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* METRIC CARDS - JUMLAH PER STATUS */}
      <div className="section-title">
        <h2>Jumlah Tiket per Status</h2>
        <p className="section-subtitle">Ringkasan volume kerja per layanan (periode: {filterBulan})</p>
      </div>

      <div className="metrics-grid">
        <div className="metric-card metric-total">
          <div className="metric-icon"></div>
          <div className="metric-content">
            <span className="metric-label">Total Tiket</span>
            <span className="metric-value">{metrics.totalAll}</span>
          </div>
        </div>

        <div className="metric-card metric-baru">
          <div className="metric-icon"></div>
          <div className="metric-content">
            <span className="metric-label">Baru</span>
            <span className="metric-value">{metrics.totalBaru}</span>
          </div>
        </div>

        <div className="metric-card metric-diproses">
          <div className="metric-icon"></div>
          <div className="metric-content">
            <span className="metric-label">Diproses</span>
            <span className="metric-value">{metrics.totalDiproses}</span>
          </div>
        </div>

        <div className="metric-card metric-selesai">
          <div className="metric-icon">✅</div>
          <div className="metric-content">
            <span className="metric-label">Selesai</span>
            <span className="metric-value">{metrics.totalSelesai}</span>
          </div>
        </div>

        <div className="metric-card metric-ditolak">
          <div className="metric-icon"></div>
          <div className="metric-content">
            <span className="metric-label">Ditolak</span>
            <span className="metric-value">{metrics.totalDitolak}</span>
          </div>
        </div>
      </div>

      {/* DETAIL PER LAYANAN */}
      <div className="section-title">
        <h2>Detail per Layanan</h2>
      </div>

      <div className="layanan-grid">
        {filterLayanan.map((key) => {
          const m = metricData[key];
          if (!m) return null;
          return (
            <div key={key} className="layanan-card">
              <div className="layanan-header">
                <h3>{m.nama}</h3>
                <span className="layanan-total">{m.total} tiket</span>
              </div>
              <div className="layanan-stats">
                <div className="stat-row">
                  <span className="stat-label">Baru</span>
                  <span className="stat-value stat-baru">{m.baru}</span>
                </div>
                <div className="stat-row">
                  <span className="stat-label">Diproses</span>
                  <span className="stat-value stat-diproses">{m.diproses}</span>
                </div>
                <div className="stat-row">
                  <span className="stat-label">Selesai</span>
                  <span className="stat-value stat-selesai">{m.selesai}</span>
                </div>
                <div className="stat-row">
                  <span className="stat-label">Ditolak</span>
                  <span className="stat-value stat-ditolak">{m.ditolak}</span>
                </div>
              </div>
              <div className="layanan-progress">
                <div className="progress-bar-bg">
                  <div
                    className="progress-bar-fill"
                    style={{ width: `${(m.selesai / m.total) * 100}%` }}
                  ></div>
                </div>
                <span className="progress-label">
                  {Math.round((m.selesai / m.total) * 100)}% selesai
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* GRAFIK TREN BULANAN */}
      <div className="section-title">
        <h2>Grafik Tren Bulanan</h2>
        <p className="section-subtitle">Volume tiket 6 bulan terakhir per layanan</p>
      </div>

      <div className="chart-container">
        <div className="chart-legend">
          {filterLayanan.map((key) => {
            const colors = { humas: "#2563eb", data: "#10b981", si: "#f59e0b", ppid: "#8b5cf6" };
            return (
              <div key={key} className="legend-item">
                <span className="legend-color" style={{ background: colors[key] }}></span>
                <span>{metricData[key].nama}</span>
              </div>
            );
          })}
        </div>

        <div className="bar-chart">
          {trenBulanan.map((item, idx) => (
            <div key={idx} className="chart-group">
              <div className="chart-bars">
                {filterLayanan.includes("humas") && (
                  <div
                    className="chart-bar bar-humas"
                    style={{ height: `${(item.humas / maxChartValue) * 100}%` }}
                    title={`Humas: ${item.humas}`}
                  ></div>
                )}
                {filterLayanan.includes("data") && (
                  <div
                    className="chart-bar bar-data"
                    style={{ height: `${(item.data / maxChartValue) * 100}%` }}
                    title={`Data: ${item.data}`}
                  ></div>
                )}
                {filterLayanan.includes("si") && (
                  <div
                    className="chart-bar bar-si"
                    style={{ height: `${(item.si / maxChartValue) * 100}%` }}
                    title={`SI: ${item.si}`}
                  ></div>
                )}
                {filterLayanan.includes("ppid") && (
                  <div
                    className="chart-bar bar-ppid"
                    style={{ height: `${(item.ppid / maxChartValue) * 100}%` }}
                    title={`PPID: ${item.ppid}`}
                  ></div>
                )}
              </div>
              <span className="chart-label">{item.bulan}</span>
            </div>
          ))}
        </div>
      </div>

      {/* RATA-RATA SLA */}
      <div className="section-title">
        <h2>Rata-rata Waktu Penyelesaian (SLA)</h2>
        <p className="section-subtitle">Evaluasi kinerja per layanan (dalam hari)</p>
      </div>

      <div className="sla-grid">
        {slaData.map((item, idx) => {
          const persentase = (item.avgHari / item.target) * 100;
          const statusClass =
            persentase <= 50 ? "status-sangat-baik" :
            persentase <= 80 ? "status-baik" :
            persentase <= 100 ? "status-cukup" : "status-buruk";

          return (
            <div key={idx} className="sla-card">
              <div className="sla-header">
                <h3>{item.layanan}</h3>
                <span className={`sla-badge ${statusClass}`}>{item.status}</span>
              </div>
              <div className="sla-metric">
                <span className="sla-value">{item.avgHari}</span>
                <span className="sla-unit">hari</span>
              </div>
              <div className="sla-bar-container">
                <div className="sla-bar-bg">
                  <div
                    className={`sla-bar-fill ${statusClass}`}
                    style={{ width: `${Math.min(persentase, 100)}%` }}
                  ></div>
                </div>
                <div className="sla-target-line" style={{ left: "100%" }}></div>
              </div>
              <div className="sla-info">
                <span>Target: {item.target} hari</span>
                <span>{Math.round(persentase)}% dari target</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* DAFTAR BIDANG BELUM PATUH DIP */}
      <div className="section-title">
        <h2>Daftar Bidang Belum Patuh (DIP)</h2>
        <p className="section-subtitle">Bidang yang belum upload atau masih revisi DIP Tahunan</p>
      </div>

      <div className="alert-list">
        {bidangBelumPatuh.map((item, idx) => (
          <div key={idx} className={`alert-item alert-${item.status.toLowerCase().replace(" ", "-")}`}>
            <div className="alert-icon">
              {item.status === "Belum Upload" ? "" : "🟡"}
            </div>
            <div className="alert-content">
              <div className="alert-header">
                <h3>{item.bidang}</h3>
                <span className={`alert-badge ${item.status === "Belum Upload" ? "badge-danger" : "badge-warning"}`}>
                  {item.status}
                </span>
              </div>
              <div className="alert-details">
                <span>Terakhir diingatkan: {new Date(item.terakhirReminder).toLocaleDateString("id-ID")}</span>
                {item.hariTerlambat > 0 && (
                  <span className="alert-terlambat">⏰ {item.hariTerlambat} hari terlambat</span>
                )}
              </div>
            </div>
            <button className="btn-reminder" onClick={() => alert(`Reminder dikirim ke bidang ${item.bidang}`)}>
              Kirim Reminder
            </button>
          </div>
        ))}
      </div>

      {/* FOOTER EXPORT */}
      <div className="export-footer">
        <div className="export-info">
          <p>Periode: <strong>{filterBulan}</strong></p>
          <p>Layanan: <strong>{filterLayanan.map((l) => metricData[l].nama).join(", ")}</strong></p>
        </div>
        <div className="export-actions">
          <button className="btn-export btn-excel" onClick={() => handleExport("excel")}>
            📊 Export Excel
          </button>
          <button className="btn-export btn-pdf" onClick={() => handleExport("pdf")}>
            📄 Export PDF
          </button>
        </div>
      </div>
    </div>
  );
}