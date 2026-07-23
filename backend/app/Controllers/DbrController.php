<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Models\DbrModel;

class DbrController extends ResourceController
{
    protected $format = "json";
    protected $model;

    public function __construct()
    {
        $this->model = new DbrModel();
    }

    public function show($nip = null)
    {
        $rows = $this->model
            ->where("nip", $nip)
            ->findAll();

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