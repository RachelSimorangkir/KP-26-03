<?php

namespace App\Controllers;

use App\Models\PegawaiModel;

class PegawaiController extends BaseController
{
    protected $pegawaiModel;

    public function __construct()
    {
        $this->pegawaiModel = new PegawaiModel();
    }

    public function getPegawaiByNip($nip)
    {
        $pegawai = $this->pegawaiModel
            ->where('nip', $nip)
            ->first();

        return $this->response->setJSON($pegawai);
    }
}