<?php

namespace App\Controllers;

use App\Models\PengajuanModel;

class PengajuanController extends BaseController
{
    protected $pengajuanModel;

    public function __construct()
    {
        $this->pengajuanModel = new PengajuanModel();
    }

    public function index()
    {
        $data = $this->pengajuanModel
            ->orderBy('id', 'DESC')
            ->findAll();

        return $this->response->setJSON($data);
    }

public function create()
{
    try {

        $data = $this->request->getJSON(true);

        $this->pengajuanModel->insert([
            'nip' => $data['nip'] ?? '',
            'nama' => $data['nama'] ?? '',
            'layanan' => $data['layanan'] ?? '',
            'status' => $data['status'] ?? 'Menunggu',
            'data_pengajuan' => json_encode($data),
        ]);

        return $this->response->setJSON([
            'success' => true
        ]);

    } catch (\Throwable $e) {

        return $this->response
            ->setStatusCode(500)
            ->setJSON([
                'success' => false,
                'error' => $e->getMessage(),
                'line' => $e->getLine(),
                'file' => $e->getFile()
            ]);
    }
}
}