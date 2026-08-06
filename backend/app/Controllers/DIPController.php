<?php

namespace App\Controllers;

use App\Models\DIPModel;
use CodeIgniter\RESTful\ResourceController;

class DIPController extends ResourceController
{
    protected $dipModel;

    public function __construct()
    {
        $this->dipModel = new DIPModel();
    }

    /*
    |--------------------------------------------------------------------------
    | GET /api/dip
    |--------------------------------------------------------------------------
    | Daftar seluruh upload (Admin)
    */
    public function index()
    {
        try {
            $data = $this->dipModel
                ->orderBy('created_at', 'DESC')
                ->findAll();

            return $this->respond([
                'status'  => true,
                'message' => 'Data DIP berhasil diambil.',
                'data'    => $data
            ]);

        } catch (\Throwable $e) {
            return $this->respond([
                'status'  => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /*
    |--------------------------------------------------------------------------
    | GET /api/dip/{id}
    |--------------------------------------------------------------------------
    | Detail upload
    */
    public function show($id = null)
    {
        $data = $this->dipModel->find($id);

        if (!$data) {
            return $this->failNotFound("Data tidak ditemukan.");
        }

        return $this->respond([
            'status' => true,
            'data'   => $data
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | GET /api/dip/user/{nip}
    |--------------------------------------------------------------------------
    | Riwayat upload user
    */
    public function getByUser($nip)
    {
        try {
            $data = $this->dipModel
                ->where('nip_pengaju', $nip)
                ->orderBy('created_at', 'DESC')
                ->findAll();

            return $this->respond([
                'status' => true,
                'data'   => $data
            ]);

        } catch (\Throwable $e) {
            return $this->respond([
                'status'  => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /*
    |--------------------------------------------------------------------------
    | POST /api/dip
    |--------------------------------------------------------------------------
    | Upload dokumen DIP
    */
    public function create()
    {
        //----------------------------------------------------
        // VALIDASI
        //----------------------------------------------------
        $rules = [
            'nip_pengaju' => [
                'rules' => 'required|max_length[30]',
                'errors' => ['required' => 'NIP wajib diisi.']
            ],
            'nama_pengaju' => [
                'rules' => 'required|max_length[150]',
                'errors' => ['required' => 'Nama pengaju wajib diisi.']
            ],
            'unit_pengaju' => [
                'rules' => 'required|max_length[200]',
                'errors' => ['required' => 'Unit kerja wajib diisi.']
            ],
            'tahun' => [
                'rules' => 'required|integer',
                'errors' => ['required' => 'Tahun wajib diisi.']
            ]
        ];

        if (!$this->validate($rules)) {
            return $this->respond([
                'status' => false,
                'message' => 'Validasi gagal.',
                'errors' => $this->validator->getErrors()
            ], 400);
        }

        try {
            //----------------------------------------------------
            // DATA FORM
            //----------------------------------------------------
            $data = [
                'nip_pengaju'      => $this->request->getPost('nip_pengaju'),
                'nama_pengaju'     => $this->request->getPost('nama_pengaju'),
                'unit_pengaju'     => $this->request->getPost('unit_pengaju'),
                'tahun'            => $this->request->getPost('tahun'),
                'catatan_pengirim' => $this->request->getPost('catatan_pengirim'),
                'status'           => 'Menunggu Validasi'
            ];

            //----------------------------------------------------
            // FILE
            //----------------------------------------------------
            $file = $this->request->getFile('file');

            if (!$file || !$file->isValid()) {
                return $this->respond([
                    'status' => false,
                    'message' => 'File wajib diupload.'
                ], 400);
            }

            //----------------------------------------------------
            // MAX 5 MB
            //----------------------------------------------------
            if ($file->getSize() > (5 * 1024 * 1024)) {
                return $this->respond([
                    'status' => false,
                    'message' => 'Ukuran file maksimal 5 MB.'
                ], 400);
            }

            //----------------------------------------------------
            // FORMAT
            //----------------------------------------------------
            $allowed = [
                'application/pdf',
                'application/msword',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            ];

            if (!in_array($file->getMimeType(), $allowed)) {
                return $this->respond([
                    'status' => false,
                    'message' => 'Format file tidak didukung.'
                ], 400);
            }

            //----------------------------------------------------
            // FOLDER
            //----------------------------------------------------
            $uploadPath = FCPATH . 'uploads/dip';

            if (!is_dir($uploadPath)) {
                mkdir($uploadPath, 0777, true);
            }

            //----------------------------------------------------
            // UPLOAD
            //----------------------------------------------------
            $newName = $file->getRandomName();
            $file->move($uploadPath, $newName);

            $data['nama_file'] = $file->getClientName();
            $data['file_path'] = 'uploads/dip/' . $newName;

            //----------------------------------------------------
            // GENERATE NOMOR UPLOAD (Sebelum Insert)
            //----------------------------------------------------
            $last = $this->dipModel
                ->orderBy('id', 'DESC')
                ->first();

            $nextId = $last ? $last['id'] + 1 : 1;

            $data['nomor_upload'] = 
                "DIP-" . 
                date('Y') . "-" . 
                str_pad($nextId, 4, "0", STR_PAD_LEFT);

            //----------------------------------------------------
            // SIMPAN
            //----------------------------------------------------
            if (!$this->dipModel->insert($data)) {
                return $this->respond([
                    'status' => false,
                    'errors' => $this->dipModel->errors()
                ], 400);
            }

            $id = $this->dipModel->getInsertID();
            $upload = $this->dipModel->find($id);

            return $this->respondCreated([
                'status'  => true,
                'message' => 'Dokumen DIP berhasil diupload.',
                'data'    => $upload
            ]);

        } catch (\Throwable $e) {
            return $this->failServerError($e->getMessage());
        }
    }

    /*
    |--------------------------------------------------------------------------
    | PUT /api/dip/{id}
    |--------------------------------------------------------------------------
    | Validasi admin
    */
    public function update($id = null)
    {
        if (!$id) {
            return $this->failNotFound("ID tidak ditemukan.");
        }

        $existingData = $this->dipModel->find($id);
        if (!$existingData) {
            return $this->failNotFound("Data tidak ditemukan.");
        }

        //----------------------------------------------------
        // VALIDASI
        //----------------------------------------------------
        $data = $this->request->getJSON(true);

if (!$data) {
    $data = $this->request->getRawInput();
}

if (empty($data['status'])) {
    return $this->respond([
        'status' => false,
        'message' => 'Status wajib diisi.'
    ],400);
}

        try {
            //----------------------------------------------------
            // DATA UPDATE (Hanya field validasi admin)
            //----------------------------------------------------
            $updateData = [

            'status' => $data['status'],

            'catatan_admin' => $data['catatan_admin'] ?? null,

            'validated_by' => $data['validated_by'] ?? null,

            'validated_at' => date('Y-m-d H:i:s')

      ];

            //----------------------------------------------------
            // SIMPAN
            //----------------------------------------------------
            if (!$this->dipModel->update($id, $updateData)) {
                return $this->respond([
                    'status' => false,
                    'errors' => $this->dipModel->errors()
                ], 400);
            }

            $upload = $this->dipModel->find($id);

            return $this->respond([
                'status'  => true,
                'message' => 'Dokumen DIP berhasil divalidasi.',
                'data'    => $upload
            ]);

        } catch (\Throwable $e) {
            return $this->failServerError($e->getMessage());
        }
    }

    public function dashboard()
{
    try {

        $dashboard = $this->dipModel->dashboard();

        return $this->respond([
            'status'  => true,
            'message' => 'Dashboard DIP berhasil diambil.',
            'data'    => $dashboard
        ]);

    } catch (\Throwable $e) {

        return $this->failServerError(
            $e->getMessage()
        );

    }
}
}