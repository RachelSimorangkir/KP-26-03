<?php

namespace App\Controllers;

use App\Models\HelpdeskModel;
use CodeIgniter\RESTful\ResourceController;

class HelpdeskController extends ResourceController
{
    protected $helpdeskModel;

    public function __construct()
    {
        $this->helpdeskModel = new HelpdeskModel();
    }

public function create()
{
    try {

        $data = [
            'user_id' => $this->request->getPost('user_id'),

            'nip_pelapor' => $this->request->getPost('nip_pelapor'),
            'nama_pelapor' => $this->request->getPost('nama_pelapor'),
            'unit_kerja' => $this->request->getPost('unit_kerja'),

            'email' => $this->request->getPost('email'),
            'no_hp' => $this->request->getPost('no_hp'),

            'nama_aplikasi' => $this->request->getPost('nama_aplikasi'),
            'kategori' => $this->request->getPost('kategori'),
            'tingkat_urgensi' => $this->request->getPost('tingkat_urgensi'),

            'judul_masalah' => $this->request->getPost('judul_masalah'),
            'deskripsi_masalah' => $this->request->getPost('deskripsi_masalah'),

            'status' => 'baru'
        ];

        // Upload lampiran
        $file = $this->request->getFile('lampiran');

        if ($file && $file->isValid() && !$file->hasMoved()) {

            $newName = $file->getRandomName();

            $file->move(
                FCPATH . 'uploads/helpdesk',
                $newName
            );

            $data['lampiran'] = 'uploads/helpdesk/' . $newName;
        }

        // Simpan tiket
        if (!$this->helpdeskModel->insert($data)) {

            return $this->respond([
                'status' => false,
                'errors' => $this->helpdeskModel->errors()
            ],400);

        }

        // Ambil ID tiket
        $id = $this->helpdeskModel->getInsertID();

        // Buat nomor tiket
        $nomor = "TKT-" . date('Y') . "-" . str_pad($id,4,'0',STR_PAD_LEFT);

        // Simpan nomor tiket
        $this->helpdeskModel->update($id,[
            'nomor_tiket' => $nomor
        ]);

        return $this->respondCreated([
            'status'=>true,
            'message'=>'Tiket berhasil dibuat',
            'nomor_tiket'=>$nomor
        ]);

    } catch(\Throwable $e){

        return $this->failServerError($e->getMessage());

    }
}

public function dashboard()
{
    $today = date('Y-m-d');

    $baru = $this->helpdeskModel
        ->where('status', 'baru')
        ->countAllResults();

    $diproses = $this->helpdeskModel
        ->where('status', 'diproses')
        ->countAllResults();

    $selesaiHariIni = $this->helpdeskModel
        ->where('status', 'selesai')
        ->where('DATE(updated_at)', $today)
        ->countAllResults();

    $tickets = $this->helpdeskModel
        ->whereIn('status', ['baru', 'diproses'])
        ->findAll();

    $terlambat = 0;

    foreach ($tickets as $tiket) {

        $hari = 5;

        switch (strtolower($tiket['tingkat_urgensi'])) {

            case 'kritis':
                $hari = 1;
                break;

            case 'tinggi':
                $hari = 2;
                break;

            case 'sedang':
                $hari = 3;
                break;

            case 'rendah':
                $hari = 5;
                break;
        }

        $deadline = strtotime($tiket['created_at'] . " +{$hari} days");

        if (time() > $deadline) {
            $terlambat++;
        }
    }

    return $this->respond([
        "status" => true,
        "data" => [
            "baru" => $baru,
            "diproses" => $diproses,
            "terlambat" => $terlambat,
            "selesai_hari_ini" => $selesaiHariIni
        ]
    ]);
}

    public function index()
{
    try {

        $data = $this->helpdeskModel
            ->orderBy('created_at', 'DESC')
            ->findAll();

        return $this->respond([
            'status'  => true,
            'message' => 'Data helpdesk berhasil diambil',
            'data'    => $data
        ]);

    } catch (\Throwable $e) {

        return $this->respond([
            'status'  => false,
            'message' => $e->getMessage()
        ], 500);

    }

}
public function update($id = null)
{
    try {

        $data = [

            'petugas_pj' => $this->request->getPost('petugas_pj'),

            'status' => strtolower(
                $this->request->getPost('status')
            ),

            'tanggapan' => $this->request->getPost('tanggapan'),

            'catatan_internal' => $this->request->getPost('catatan_internal'),

            'processed_at' => date('Y-m-d H:i:s')

        ];

        $this->helpdeskModel->update($id, $data);

        return $this->respond([

            'status' => true,

            'message' => 'Tiket berhasil diperbarui'

        ]);

    } catch (\Throwable $e) {

        return $this->respond([

            'status' => false,

            'message' => $e->getMessage()

        ],500);

    }
}


    public function getByUser($nip)
{
    try {

        $data = $this->helpdeskModel
            ->where('nip_pelapor', $nip)
            ->orderBy('created_at', 'DESC')
            ->findAll();

        return $this->respond([
            'status' => true,
            'message' => 'Riwayat tiket berhasil diambil',
            'data' => $data
        ]);

    } catch (\Throwable $e) {

        return $this->respond([
            'status' => false,
            'message' => $e->getMessage()
        ],500);

    }

}

public function countBaru()
{
    try {

        $jumlah = $this->helpdeskModel
            ->where('status', 'baru')
            ->countAllResults();

        return $this->respond([
            'status' => true,
            'jumlah' => $jumlah
        ]);

    } catch (\Throwable $e) {

        return $this->respond([
            'status' => false,
            'message' => $e->getMessage()
        ], 500);

    }
}

public function show($id = null)
{
    $data = $this->helpdeskModel->find($id);

    if (!$data) {
        return $this->failNotFound("Tiket tidak ditemukan");
    }

    return $this->respond([
        "status" => true,
        "data" => $data
    ]);
}

}

