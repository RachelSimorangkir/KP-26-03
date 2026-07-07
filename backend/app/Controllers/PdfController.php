<?php

namespace App\Controllers;

use CodeIgniter\Controller;
use setasign\Fpdi\Fpdi;

use App\Models\PengajuanModel;
use App\Models\PegawaiModel;

class PdfController extends Controller
{

    /*
    |--------------------------------------------------------------------------
    | ROUTER CUTI
    |--------------------------------------------------------------------------
    */

    public function cuti($id)
    {
        $model = new PengajuanModel();

        $pengajuan = $model->find($id);

        if (!$pengajuan) {
            return "Data pengajuan tidak ditemukan.";
        }

        if ($pengajuan["status_kepegawaian"] == "PNS") {
            return $this->cutiPNS($id);
        }

        return $this->cutiPPPK($id);
    }



    /*
    |--------------------------------------------------------------------------
    | FORM CUTI PNS
    |--------------------------------------------------------------------------
    */

    public function cutiPNS($id)
    {
        //==============================
        // MODEL
        //==============================

        $pengajuanModel = new PengajuanModel();
        $pegawaiModel   = new PegawaiModel();

        //==============================
        // AMBIL DATA PENGAJUAN
        //==============================

        $pengajuan = $pengajuanModel->find($id);

        if (!$pengajuan) {
            return "Data pengajuan tidak ditemukan.";
        }

        //==============================
        // AMBIL DATA PEGAWAI
        //==============================

        $pegawai = $pegawaiModel
            ->where("nip", $pengajuan["nip"])
            ->first();


        if (!$pegawai) {

            return "Data pegawai tidak ditemukan.";

        }


        //==============================
        // VARIABEL
        //==============================

        $nama = $pengajuan["nama"];

        $nip = $pengajuan["nip"];

        $jabatan = $pengajuan["jabatan"];

        $unitKerja = $pegawai["unit_organisasi"];

        $pangkat = $pegawai["pangkat_golongan"];

        $statusKepegawaian =
            $pengajuan["status_kepegawaian"];

        $jenisCuti =
            $pengajuan["jenis_cuti"];

        $alasan =
            $pengajuan["alasan_cuti"];

        $tanggalMulai =
            date(
                "d-m-Y",
                strtotime(
                    $pengajuan["tanggal_mulai"]
                )
            );

        $tanggalSelesai =
            date(
                "d-m-Y",
                strtotime(
                    $pengajuan["tanggal_selesai"]
                )
            );

        $durasi      = $pengajuan["durasi"];
$lamaCuti    = $pengajuan["lama_cuti"];
$satuanCuti  = strtolower($pengajuan["satuan_cuti"]);

        $alamat =
            $pengajuan["alamat_cuti"];

        $noHp =
            $pengajuan["no_hp"];



        //==============================
        // PDF
        //==============================

        $pdf = new Fpdi();
        //==============================
        // PILIH TEMPLATE
        //==============================

        if ($statusKepegawaian == "PNS") {

            $template = WRITEPATH . "templates/pns.pdf";

        } else {

            $template = WRITEPATH . "templates/pppk.pdf";

        }


        //==============================
        // LOAD TEMPLATE
        //==============================
        

        $pageCount = $pdf->setSourceFile($template);

        $tpl = $pdf->importPage(1);

        $size = $pdf->getTemplateSize($tpl);


        //==============================
        // BUAT HALAMAN PDF
        //==============================

        $pdf->AddPage(

            $size["orientation"],

            [$size["width"], $size["height"]]

        );


        //==============================
        // GUNAKAN TEMPLATE
        //==============================

        $pdf->useTemplate($tpl);


        //==============================
        // FONT
        //==============================

        $pdf->SetFont("Arial", "", 13);



        //=========================================
        // I. DATA PEGAWAI
        //=========================================

        // Nama
        $pdf->SetXY(57,98);
        $pdf->Cell(75,4,$nama);

        // NIP
        $pdf->SetXY(216,98);
        $pdf->Cell(50,4,$nip);

        // Jabatan
        $pdf->SetXY(57,105);
        $pdf->Cell(75,4,$jabatan);

        // Pangkat / Golongan
        $pdf->SetXY(216.5,105.5);
        $pdf->Cell(45,4,$pangkat);

        // Unit Kerja
        $pdf->SetXY(57,112);

        $pdf->MultiCell(
            135,
            4,
            $unitKerja
        );

        //=========================================
// TANGGAL SURAT
//=========================================

// Mengubah tanggal mulai menjadi format Indonesia
$bulan = [
    1 => "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember"
];

$tanggalSurat = date(
    "j",
    strtotime($pengajuan["tanggal_pengajuan"])
);

$bulanSurat = $bulan[
    date(
        "n",
        strtotime($pengajuan["tanggal_pengajuan"])
    )
];

$tahunSurat = date(
    "Y",
    strtotime($pengajuan["tanggal_pengajuan"])
);

$pdf->SetFont("Arial","",15);

// Sesuaikan koordinat nanti
$pdf->SetXY(227,42);

$pdf->Cell(
    60,
    5,
    $tanggalSurat . " " . $bulanSurat . " " . $tahunSurat
);



        //==============================
        // GANTI KE FONT CENTANG
        //==============================

        $pdf->SetFont(
            "ZapfDingbats",
            "",
            12
        );
                //=========================================
        // II. JENIS CUTI
        //=========================================

        switch ($jenisCuti) {

            case "Cuti Tahunan":
                $pdf->SetXY(150,129); //150,129
                $pdf->Cell(5,5,"4");
                break;

            case "Cuti Besar":
                $pdf->SetXY(289,129);
                $pdf->Cell(5,5,"4");
                break;

            case "Cuti Sakit":
                $pdf->SetXY(150,137);
                $pdf->Cell(5,5,"4");
                break;

            case "Cuti Melahirkan":
                $pdf->SetXY(289,137);
                $pdf->Cell(5,5,"4");
                break;

            case "Cuti Karena Alasan Penting":
                $pdf->SetXY(150,147);
                $pdf->Cell(5,5,"4");
                break;

            case "Cuti di Luar Tanggungan Negara":
                $pdf->SetXY(290,147);
                $pdf->Cell(5,5,"4");
                break;
        }

        // Kembali ke font biasa
        $pdf->SetFont("Arial","",13);


        //=========================================
        // III. ALASAN CUTI
        //=========================================

        $pdf->SetXY(20.5,170);

        $pdf->MultiCell(
            150,
            5,
            $alasan
        );

        $lama = $pengajuan["durasi"];
$satuan = "Hari";

// Contoh sederhana
if ($lama >= 365) {
    $lama = round($lama / 365);
    $satuan = "tahun";
} elseif ($lama >= 30) {
    $lama = round($lama / 30);
    $satuan = "bulan";
}


        //=========================================
        // IV. LAMANYA CUTI
        //=========================================
        $pdf->SetXY(217,201.5);
        $pdf->Cell(28,5,$tanggalMulai);

        $pdf->SetXY(265,201.5);
        $pdf->Cell(28,5,$tanggalSelesai);

        $pdf->SetXY(57,201.5);
        $pdf->Cell(18,5,$lama);

       $lama = $lamaCuti;

$pdf->SetDrawColor(255,0,0);
$pdf->SetLineWidth(0.6);

switch (ucfirst($satuanCuti)) {

    case "Hari":

        // Coret BULAN
        $pdf->Line(115,203.5,129,203.5);

        // Coret TAHUN
        $pdf->Line(130,203.5,146,203.5);

        break;

    case "Bulan":

        // Coret HARI
        $pdf->Line(103,203.5,114,203.5);

        // Coret TAHUN
        $pdf->Line(130,203.5,146,203.5);

        break;

    case "Tahun":

        // Coret HARI
        $pdf->Line(100,203.5,114,203.5);

        // Coret BULAN
        $pdf->Line(115,203.5,129,203.5);

        break;
}


        //=========================================
        // VI. ALAMAT SELAMA CUTI
        //=========================================

        $pdf->SetXY(20.5,268);

        $pdf->MultiCell(
            90,
            4,
            $alamat
        );

        $pdf->SetXY(217,267);

        $pdf->Cell(
            40,
            4,
            $noHp
        );


        //=========================================
        // TANDA TANGAN PEMOHON
        //=========================================

        $pdf->SetXY(228,289);

        $pdf->Cell(
            45,
            5,
            $nama,
            0,
            0,
            "C"
        );

        $pdf->SetXY(228,296);

        $pdf->Cell(
            45,
            5,
            $nip,
            0,
            0,
            "C"
        );


        //=========================================
        // OUTPUT PDF
        //=========================================

        return $this->response
            ->setHeader("Content-Type","application/pdf")
            ->setBody($pdf->Output("S"));

    }

    public function cutiPPPK($id)
{
    //==============================
    // MODEL
    //==============================

    $pengajuanModel = new PengajuanModel();
    $pegawaiModel = new PegawaiModel();

    //==============================
    // AMBIL DATA PENGAJUAN
    //==============================

    $pengajuan = $pengajuanModel->find($id);

    if (!$pengajuan) {
        return "Data pengajuan tidak ditemukan.";
    }

    //==============================
    // AMBIL DATA PEGAWAI
    //==============================

    $pegawai = $pegawaiModel
        ->where("nip", $pengajuan["nip"])
        ->first();

    if (!$pegawai) {
        return "Data pegawai tidak ditemukan.";
    }

    //==============================
    // VARIABEL
    //==============================

    $nama = $pengajuan["nama"];

    $nip = $pengajuan["nip"];

    $jabatan = $pengajuan["jabatan"];

    $unitKerja = $pegawai["unit_organisasi"];

    // PPPK menggunakan Masa Kerja
    $masaKerja = $pegawai["masa_kerja"] ?? "-";

    $jenisCuti = $pengajuan["jenis_cuti"];

    $alasan = $pengajuan["alasan_cuti"];

    $tanggalMulai = date(
        "d-m-Y",
        strtotime($pengajuan["tanggal_mulai"])
    );

    $tanggalSelesai = date(
        "d-m-Y",
        strtotime($pengajuan["tanggal_selesai"])
    );
    $mulai = new DateTime($pengajuan["tanggal_mulai"]);
$selesai = new DateTime($pengajuan["tanggal_selesai"]);

$interval = $mulai->diff($selesai);

$lama = $pengajuan["durasi"];

if ($interval->y > 0){

    $satuan = "Tahun";
    $lama = $interval->y;

}
elseif($interval->m > 0){

    $satuan = "Bulan";
    $lama = $interval->m;

}
else{

    $satuan = "Hari";

}

    $durasi = $pengajuan["durasi"];

    $lamaCuti = $pengajuan["lama_cuti"];

    $satuanCuti = strtolower($pengajuan["satuan_cuti"]);

    $alamat = $pengajuan["alamat_cuti"];

    $noHp = $pengajuan["no_hp"];

    //==============================
    // PDF
    //==============================

    $pdf = new Fpdi();

    $template = WRITEPATH . "templates/pppk.pdf";

    $pageCount = $pdf->setSourceFile($template);

    $tpl = $pdf->importPage(1);

    $size = $pdf->getTemplateSize($tpl);

    $pdf->AddPage(
        $size["orientation"],
        [$size["width"], $size["height"]]
    );

    $pdf->useTemplate($tpl);

    $pdf->SetFont("Arial", "", 11);

    //=========================================
// TANGGAL SURAT
//=========================================

$bulan = [
    1 => "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember"
];

$tanggalSurat = date(
    "j",
    strtotime($pengajuan["tanggal_pengajuan"])
);

$bulanSurat = $bulan[
    date(
        "n",
        strtotime($pengajuan["tanggal_pengajuan"])
    )
];

$tahunSurat = date(
    "Y",
    strtotime($pengajuan["tanggal_pengajuan"])
);

$pdf->SetFont("Arial","",11);

// Sesuaikan nanti jika kurang pas
$pdf->SetXY(137,58);

$pdf->Write(
    5,
    "Jakarta, " .
    $tanggalSurat .
    " " .
    $bulanSurat .
    " " .
    $tahunSurat
);

//=========================================
// TUJUAN SURAT
//=========================================

$pdf->SetFont("Arial", "", 11);

// Kepada Yth.
$pdf->SetXY(133,70.5);

$pdf->MultiCell(
    90,     // lebar dibuat kecil supaya turun ke bawah
    6,      // tinggi tiap baris
    "Sekretaris Direktorat Jenderal\nBimbingan Masyarakat Kristen"
);

// "di"
$pdf->SetXY(129,83.4);

$pdf->Cell(
    10,
    5,
    "Jakarta"
);


//=========================================
// I. DATA PEGAWAI
//=========================================

$pdf->SetFont("Arial","",10);

// Nama
$pdf->SetXY(48.5,105.5);
$pdf->Write(5,$nama);

// NIP
$pdf->SetXY(150,105.5);
$pdf->Write(5,$nip);

// Jabatan
$pdf->SetXY(48.5,110);
$pdf->Write(5,$jabatan);

// Masa Kerja
$pdf->SetXY(205,91);
$pdf->Write(5,$masaKerja);

// Unit Kerja
$pdf->SetXY(48.5,114);

$pdf->MultiCell(
    200,
    5,
    $unitKerja
);

    //=========================================
// II. JENIS CUTI
//=========================================

$pdf->SetFont("ZapfDingbats","",10);

switch ($jenisCuti) {

    case "Cuti Tahunan":
        $pdf->SetXY(178,127); //178,127
        $pdf->Cell(5,5,"4");
        break;

    case "Cuti Sakit":
        $pdf->SetXY(178,131); //178,131
        $pdf->Cell(5,5,"4");
        break;

    case "Cuti Melahirkan":
        $pdf->SetXY(178,135); //178,129
        $pdf->Cell(5,5,"4");
        break;
}

$pdf->SetFont("Arial","",10);

//=========================================
// III. ALASAN CUTI
//=========================================

$pdf->SetXY(23.5,149);

$pdf->MultiCell(
    170,
    5,
    $alasan
);

//=========================================
// IV. LAMA CUTI
//=========================================

$pdf->SetXY(41,168.7);
$pdf->Cell(20,5,$lamaCuti);

$pdf->SetXY(73,168.7);
$pdf->Cell(30,5,$satuanCuti);

$pdf->SetXY(129,168.7);
$pdf->Cell(35,5,$tanggalMulai);

$pdf->SetXY(170,168.7);
$pdf->Cell(35,5,$tanggalSelesai);

//=========================================
// V. ALAMAT
//=========================================

$pdf->SetXY(23.5,208);

$pdf->MultiCell(
    100,
    5,
    $alamat
);

$pdf->SetXY(160,203);

$pdf->Cell(
    50,
    5,
    $noHp
);

//=========================================
// TANDA TANGAN
//=========================================

$pdf->SetXY(128.5,219);

$pdf->Cell(
    55,
    5,
    $nama
);

$pdf->SetXY(145,224);

$pdf->Cell(
    55,
    5,
    $nip
);

//=========================================
// OUTPUT
//=========================================

return $this->response
    ->setHeader("Content-Type","application/pdf")
    ->setBody($pdf->Output("S"));
}
}