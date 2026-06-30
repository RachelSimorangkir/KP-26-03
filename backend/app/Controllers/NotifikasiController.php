<?php

namespace App\Controllers;

use App\Models\NotifikasiModel;

class NotifikasiController extends BaseController
{
    protected $notifikasiModel;

    public function __construct()
    {
        $this->notifikasiModel = new NotifikasiModel();
    }

    public function readAll($nip)
{
    $this->notifikasiModel
        ->where("nip", $nip)
        ->set([
            "status" => "read"
        ])
        ->update();

    return $this->response->setJSON([
        "success" => true
    ]);
}

    // Ambil semua notifikasi user
    public function index($nip)
    {
        $data = $this->notifikasiModel
            ->where('nip', $nip)
            ->orderBy('created_at', 'DESC')
            ->findAll();

        return $this->response->setJSON($data);
    }

    // Tandai notifikasi sudah dibaca
    public function read($id)
    {
        $this->notifikasiModel->update($id, [
            'status' => 'read'
        ]);

        return $this->response->setJSON([
            'success' => true
        ]);
    }
}