<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use Config\Database;

class DbrController extends ResourceController
{
    protected $format = "json";

    public function show($nip = null)
    {
        $db = Database::connect();

        $rows = $db->table("dbr_data_lt10")
                   ->where("nip", $nip)
                   ->get()
                   ->getResultArray();

        if (empty($rows)) {
            return $this->failNotFound("DBR tidak ditemukan");
        }

        $pegawai = $rows[0];

        $barang = [];

        foreach ($rows as $row) {

            $barang[] = [
                "nama_barang" => $row["bmn"],
                "nup"         => $row["nup"],
                "kondisi"     => $row["kondisi"]
            ];

        }

        return $this->respond([
            "nama"    => $pegawai["nama"],
            "nip"     => $pegawai["nip"],
            "jabatan" => $pegawai["jabatan"],
            "ruangan" => "Lantai 10",
            "barang"  => $barang
        ]);
    }
}