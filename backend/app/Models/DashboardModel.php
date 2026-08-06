<?php

namespace App\Models;

use CodeIgniter\Model;
use App\Models\BeritaModel;
use App\Models\PPIDModel;
use App\Models\HelpdeskModel;
use App\Models\DataInternalModel;
use App\Models\DIPModel;

class DashboardModel extends Model
{

    public function aktivitas()
    {
        $beritaModel = new BeritaModel();
        $ppidModel = new PPIDModel();
        $helpdeskModel = new HelpdeskModel();
        $dataInternalModel = new DataInternalModel();
        $dipModel = new DIPModel();

        $berita = $beritaModel
            ->select('id, judul, status, submitted_at, created_at')
            ->orderBy('created_at', 'DESC')
            ->findAll(5);

        $ppid = $ppidModel
           ->select('id, nomor_registrasi, status, created_at')
           ->orderBy('created_at', 'DESC')
           ->findAll(5);

        $helpdesk = $helpdeskModel
          ->select('id, nomor_tiket, status, created_at')
          ->orderBy('created_at', 'DESC')
          ->findAll(5);

        $permintaanData = $dataInternalModel
          ->select('id, nama_pemohon, status, submitted_at, created_at')
          ->orderBy('created_at', 'DESC')
          ->findAll(5);

        $dip = $dipModel
          ->select('id, nomor_upload, status, created_at')
          ->orderBy('created_at', 'DESC')
          ->findAll(5);


        $aktivitas = [];

        foreach ($berita as $item) {

            switch ($item['status']) {

                case 'menunggu':
                    $statusText = "menunggu verifikasi";
                    break;

                case 'terbit':
                    $statusText = "telah diterbitkan";
                    break;

                case 'ditolak':
                    $statusText = "ditolak";
                    break;

                default:
                    $statusText = $item['status'];
            }

            $aktivitas[] = [

                "id" => "berita_" . $item['id'],

                "tipe" => "berita",

                "icon" => "📰",

                "judul" => 'Berita "' . $item['judul'] . '" ' . $statusText,

                "waktu" => $item['submitted_at'] ?? $item['created_at']

            ];
        }

        // ✅ PERBAIKAN: foreach PPID dengan switch statement sendiri
        foreach ($ppid as $item) {

            // ✅ Kesalahan 2: Switch statement untuk PPID (tidak pakai $statusText dari berita)
            switch ($item['status']) {

                case 'baru':
                    $statusText = "baru diajukan";
                    break;

                case 'diproses':
                    $statusText = "sedang diproses";
                    break;

                case 'selesai':
                    $statusText = "telah selesai";
                    break;

                case 'ditolak':
                    $statusText = "ditolak";
                    break;

                default:
                    $statusText = $item['status'];
            }

            $aktivitas[] = [

                "id" => "ppid_" . $item['id'],

                "tipe" => "ppid",

                "icon" => "⚖️",

                // ✅ Judul diubah menjadi lebih natural
                "judul" => 'Keberatan informasi "' . $item['nomor_registrasi'] . '" ' . $statusText,

                // ✅ Kesalahan 3: Langsung pakai created_at (tidak ada submitted_at di PPID)
                "waktu" => $item['created_at']

            ];
        }

        foreach ($permintaanData as $item) {


            switch ($item['status']) {


             case 'menunggu':
                $statusText = "menunggu diproses";
                break;


            case 'diproses':
               $statusText = "sedang diproses";
               break;


            case 'selesai':
               $statusText = "telah selesai";
               break;


            case 'ditolak':
               $statusText = "ditolak";
               break;


            default:
               $statusText = $item['status'];

            }


            $aktivitas[] = [

                "id" => "data_" . $item['id'],

                "tipe" => "data",

                "icon" => "📊",

                "judul" =>
                   'Permintaan data dari "'
                . $item['nama_pemohon'] ?: 'pemohon'
                . '" '
                . $statusText,


                "waktu" =>
                   $item['submitted_at'] ?? $item['created_at']

           ];

}

        foreach ($helpdesk as $item) {

            switch ($item['status']) {

                case 'baru':
                    $statusText = "baru diajukan";
                    break;

                case 'diproses':
                    $statusText = "sedang diproses";
                    break;

                case 'selesai':
                    $statusText = "telah selesai";
                    break;

                case 'ditolak':
                    $statusText = "ditolak";
                    break;

                default:
                    $statusText = $item['status'];
            }

            $aktivitas[] = [

                "id" => "helpdesk_" . $item['id'],

                "tipe" => "helpdesk",

                "icon" => "🛠️",

                // ✅ Judul diubah menjadi lebih natural
                "judul" => 'Tiket Helpdesk "' . $item['nomor_tiket'] . '" ' . $statusText,

                // ✅ Kesalahan 3: Langsung pakai created_at (tidak ada submitted_at di Helpdesk)
                "waktu" => $item['created_at']

            ];
        }

        foreach ($dip as $item) {


    switch ($item['status']) {


        case 'Menunggu Validasi':
            $statusText = "menunggu validasi";
            break;


        case 'Revisi':
            $statusText = "memerlukan revisi";
            break;


        case 'Disetujui':
            $statusText = "telah divalidasi";
            break;


        case 'Ditolak':
            $statusText = "ditolak";
            break;


        default:
            $statusText = strtolower($item['status']);

    }


    $aktivitas[] = [

        "id" => "dip_" . $item['id'],

        "tipe" => "dip",

        "icon" => "📂",

        "judul" =>
            'Upload DIP "' .
            $item['nomor_upload'] .
            '" ' .
            $statusText,


        "waktu" => $item['created_at']

    ];

}

        usort($aktivitas, function ($a, $b) {

        return strtotime($b['waktu']) - strtotime($a['waktu']);

        });

        $aktivitas = array_slice($aktivitas,0,10);

        return $aktivitas;
    }
}