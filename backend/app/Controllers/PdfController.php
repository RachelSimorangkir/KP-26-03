<?php

namespace App\Controllers;

use CodeIgniter\Controller;
use setasign\Fpdi\Fpdi;

use App\Models\PengajuanModel;
use App\Models\PegawaiModel;

class PdfController extends Controller
{

    public function cuti($id)
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

        $durasi =
            $pengajuan["durasi"];

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


        //=========================================
        // IV. LAMANYA CUTI
        //=========================================

        $pdf->SetXY(57,201.5);
        $pdf->Cell(18,5,$durasi);

        $pdf->SetXY(217,201.5);
        $pdf->Cell(28,5,$tanggalMulai);

        $pdf->SetXY(265,201.5);
        $pdf->Cell(28,5,$tanggalSelesai);


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

}