<?php

namespace App\Controllers;

use App\Models\PengajuanModel;
use App\Models\NotifikasiModel;

class PengajuanController extends BaseController
{
    protected $pengajuanModel;
    protected $notifikasiModel;

    public function __construct()
    {
        $this->pengajuanModel = new PengajuanModel();
        $this->notifikasiModel = new NotifikasiModel();
    }
    public function detail($id)
{
    $data = $this->pengajuanModel->find($id);

    if (!$data) {
        return $this->response
            ->setStatusCode(404)
            ->setJSON([
                'success' => false,
                'message' => 'Pengajuan tidak ditemukan.'
            ]);
    }

    return $this->response->setJSON($data);
}

    // Menampilkan seluruh pengajuan
    public function index()
    {
        $data = $this->pengajuanModel
            ->orderBy('id', 'DESC')
            ->findAll();

        return $this->response->setJSON($data);
    }

    // Membuat pengajuan baru
public function create()
{
    try {

        $data = $this->request->getPost();

        $file = $this->request->getFile("suratPermohonan");

        $filePath = "";

        if ($file && $file->isValid() && !$file->hasMoved()) {

            $namaBaru = $file->getRandomName();

            $file->move(
                FCPATH . "uploads/permohonan",
                $namaBaru
            );

            $filePath = "uploads/permohonan/" . $namaBaru;
        }

        $this->pengajuanModel->insert([

            'nip' => $data['nip'] ?? '',

            'nama' => $data['nama'] ?? '',

            'jabatan' => $data['jabatan'] ?? '',

            'unit_kerja' => $data['unitKerja'] ?? '',

            'layanan' => $data['layanan'] ?? '',

            'status' => 'Menunggu',

            'tanggal_pengajuan' => date("Y-m-d H:i:s"),

            'surat_permohonan' => $filePath,

            'drive_link' => $data['linkDrive'] ?? "",

            'data_pengajuan' => $data['dataPengajuan'] ?? "",

            'pangkat' => $data['pangkat'] ?? ''

        ]);

        return $this->response->setJSON([
            "success" => true,
            "message" => "Pengajuan berhasil dikirim"
        ]);

    } catch (\Throwable $e) {

        return $this->response
            ->setStatusCode(500)
            ->setJSON([
                "success" => false,
                "error" => $e->getMessage(),
                "line" => $e->getLine()
            ]);
    }
}

    // Update status pengajuan oleh admin
public function updateStatus($id)
{
    try {

        // Ambil data FormData
        $status = $this->request->getPost('status');
        $catatan = $this->request->getPost('catatan_admin');

        // Cari data pengajuan
        $pengajuan = $this->pengajuanModel->find($id);

        if (!$pengajuan) {
            return $this->response
                ->setStatusCode(404)
                ->setJSON([
                    'success' => false,
                    'message' => 'Data pengajuan tidak ditemukan.'
                ]);
        }

        // Upload file PDF
        $filePath = $pengajuan['file_respon'] ?? null;

        $file = $this->request->getFile("file_respon");

if($file && $file->isValid()){

    $namaBaru = $file->getRandomName();

    $file->move(
        FCPATH."uploads/respon",
        $namaBaru
    );

    $filePath = "uploads/respon/".$namaBaru;

}

        // Update database
        $this->pengajuanModel->update($id, [

            'status' => $status,

            'catatan_admin' => $catatan,

            'file_respon' => $filePath

        ]);

        // Simpan notifikasi
       $this->notifikasiModel->insert([

    "nip" => $pengajuan["nip"],

    "layanan" => $pengajuan["layanan"],

    "judul" => "Status Pengajuan",

    "pesan" => "Pengajuan {$pengajuan["layanan"]} sekarang berstatus {$status}",

    "status" => "unread",

    "pengajuan_id" => $id

]);
        return $this->response->setJSON([

            'success' => true,

            'message' => 'Pengajuan berhasil diperbarui.'

        ]);

    } catch (\Throwable $e) {

        return $this->response
            ->setStatusCode(500)
            ->setJSON([

                'success' => false,

                'error' => $e->getMessage(),

                'line' => $e->getLine()

            ]);
    }
}
}