<?php

namespace App\Controllers;

use App\Models\PPIDModel;
use CodeIgniter\RESTful\ResourceController;

class PPIDController extends ResourceController
{
    protected $ppidModel;

    public function __construct()
    {
        $this->ppidModel = new PPIDModel();
    }

    /*
    |--------------------------------------------------------------------------
    | GET /api/ppid
    |--------------------------------------------------------------------------
    */
    public function index()
    {
        try {
            $data = $this->ppidModel
            ->orderBy('created_at', 'DESC')
            ->findAll();

            foreach ($data as &$item) {

            $item['sla'] = $this->hitungSLA($item);}

            return $this->respond([
                'status'  => true,
                'message' => 'Data PPID berhasil diambil',
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
    | GET /api/ppid/{id}
    |--------------------------------------------------------------------------
    */
    public function show($id = null)
    {
        $data = $this->ppidModel->find($id);

        $data['sla'] = $this->hitungSLA($data);

        if (!$data) {
            return $this->failNotFound("Permohonan tidak ditemukan");
        }

        return $this->respond([
            'status' => true,
            'data'   => $data
        ]);
    }

    //Update

    
    public function update($id = null)
{
    try {

        $data = [

            'petugas_ppid' => $this->request->getPost('petugas_ppid'),

            'status' => strtolower(
                $this->request->getPost('status')
            ),

            'tanggapan' => $this->request->getPost('tanggapan'),

            'catatan_internal' => $this->request->getPost('catatan_internal'),

            'processed_at' => date('Y-m-d H:i:s')

        ];

        $file = $this->request->getFile('surat_balasan');

if ($file && $file->isValid() && !$file->hasMoved()) {

    if ($file->getSize() > (5 * 1024 * 1024)) {

        return $this->respond([
            'status' => false,
            'message' => 'Ukuran surat balasan maksimal 5 MB.'
        ],400);

    }

    $status = strtolower($this->request->getPost('status'));

    $file = $this->request->getFile('surat_balasan');

if (
    in_array($status, ['selesai', 'ditolak']) &&
    (!$file || !$file->isValid())
) {

    return $this->respond([
        'status' => false,
        'message' => 'Surat balasan wajib diupload.'
    ], 400);

}

    $allowed = [

        'application/pdf',

        'application/msword',

        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'

    ];

    if (!in_array($file->getMimeType(), $allowed)) {

        return $this->respond([
            'status' => false,
            'message' => 'Format surat balasan tidak didukung.'
        ],400);

    }

    $uploadPath = FCPATH . 'uploads/ppid/balasan';

    if (!is_dir($uploadPath)) {

        mkdir($uploadPath,0777,true);

    }

    $newName = $file->getRandomName();

    $file->move($uploadPath,$newName);

    $data['surat_balasan'] =
        'uploads/ppid/balasan/' . $newName;

}

        if (!$this->ppidModel->update($id, $data)) {

            return $this->respond([
                'status' => false,
                'errors' => $this->ppidModel->errors()
            ], 400);

        }

        $dataBaru = $this->ppidModel->find($id);
        $dataBaru['sla'] =$this->hitungSLA($dataBaru);

        return $this->respond([

            'status' => true,

            'message' => 'Permohonan berhasil diperbarui.',

            'data' => $dataBaru

        ]);

    } catch (\Throwable $e) {

        return $this->respond([

            'status' => false,

            'message' => $e->getMessage()

        ], 500);

    }
}

    /*
    |--------------------------------------------------------------------------
    | GET /api/ppid/user/{nip}
    |--------------------------------------------------------------------------
    */
    public function getByUser($nip)
    {
        try {
            $data = $this->ppidModel
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

    public function countBaru()
{
    try {

        $jumlah = $this->ppidModel
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

    public function dashboard()
{
    try {

        $baru = $this->ppidModel
            ->where('status', 'baru')
            ->countAllResults();

        $diproses = $this->ppidModel
            ->where('status', 'diproses')
            ->countAllResults();

        $selesai = $this->ppidModel
            ->where('status', 'selesai')
            ->countAllResults();

        $ditolak = $this->ppidModel
            ->where('status', 'ditolak')
            ->countAllResults();

        return $this->respond([

            'status' => true,

            'data' => [

                'baru' => $baru,

                'diproses' => $diproses,

                'selesai' => $selesai,

                'ditolak' => $ditolak

            ]

        ]);

    } catch (\Throwable $e) {

        return $this->respond([

            'status' => false,

            'message' => $e->getMessage()

        ],500);

    }
}

    /*
    |--------------------------------------------------------------------------
    | POST /api/ppid
    |--------------------------------------------------------------------------
    */
    public function create()
    {
        //----------------------------------------------------
        // 1. VALIDASI
        //----------------------------------------------------
        $rules = [
            'nip_pengaju' => [
                'rules'  => 'required|max_length[30]',
                'errors' => ['required' => 'NIP wajib diisi.']
            ],
            'nama_pengaju' => [
                'rules'  => 'required|max_length[150]',
                'errors' => ['required' => 'Nama pengaju wajib diisi.']
            ],
            'jenis_permohonan' => [
                'rules'  => 'required',
                'errors' => ['required' => 'Jenis permohonan wajib dipilih.']
            ],
            'unit_tujuan' => [
                'rules'  => 'required',
                'errors' => ['required' => 'Unit tujuan wajib dipilih.']
            ],
            'uraian_permohonan' => [
                'rules'  => 'required|min_length[20]',
                'errors' => [
                    'required'   => 'Uraian permohonan wajib diisi.',
                    'min_length' => 'Uraian minimal 20 karakter.'
                ]
            ],
            'tingkat_urgensi' => [
                'rules'  => 'required',
                'errors' => ['required' => 'Tingkat urgensi wajib dipilih.']
            ], // ✅ REV 1 & 2: Ditambahkan penutup array ], yang sebelumnya hilang
            
            'unit_pengaju' => [
                'rules'  => 'required',
                'errors' => ['required' => 'Unit kerja wajib diisi.']
            ],
            'email' => [ // ✅ REV 5: Ditambahkan validasi email
                'rules'  => 'permit_empty|valid_email',
                'errors' => ['valid_email' => 'Format email tidak valid.']
            ]
        ];

        if (!$this->validate($rules)) {
            return $this->respond([
                'status'  => false,
                'message' => 'Validasi gagal.',
                'errors'  => $this->validator->getErrors()
            ], 400);
        }

        try {
            //----------------------------------------------------
            // 2. Data Form
            //----------------------------------------------------
            $data = [
                'user_id'              => $this->request->getPost('user_id'),
                'nip_pengaju'          => $this->request->getPost('nip_pengaju'),
                'nama_pengaju'         => $this->request->getPost('nama_pengaju'),
                'unit_pengaju'         => $this->request->getPost('unit_pengaju'),
                'email'                => $this->request->getPost('email'),
                'no_hp'                => $this->request->getPost('no_hp'),
                'jenis_permohonan'     => $this->request->getPost('jenis_permohonan'),
                'referensi_permohonan' => $this->request->getPost('referensi_permohonan'),
                'uraian_permohonan'    => $this->request->getPost('uraian_permohonan'),
                'unit_tujuan'          => $this->request->getPost('unit_tujuan'),
                'tingkat_urgensi'      => strtolower($this->request->getPost('tingkat_urgensi')),
                'status'               => 'baru'
            ];

            //----------------------------------------------------
            // 3. Upload Lampiran
            //----------------------------------------------------
            $file = $this->request->getFile('lampiran');

            if ($file && $file->isValid() && !$file->hasMoved()) {
                // Maksimum 5 MB
                if ($file->getSize() > (5 * 1024 * 1024)) {
                    return $this->respond([
                        'status'  => false,
                        'message' => 'Ukuran lampiran maksimal 5 MB.'
                    ], 400);
                }

                // Format file
                $allowed = [
                    'application/pdf',
                    'application/msword',
                    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                    'image/jpeg',
                    'image/png'
                ];

                if (!in_array($file->getMimeType(), $allowed)) {
                    return $this->respond([
                        'status'  => false,
                        'message' => 'Format file tidak didukung.'
                    ], 400);
                }

                $newName = $file->getRandomName();
                $uploadPath = FCPATH . 'uploads/ppid';

                // ✅ REV 3: Buat folder jika belum ada untuk mencegah error
                if (!is_dir($uploadPath)) {
                    mkdir($uploadPath, 0777, true);
                }

                $file->move($uploadPath, $newName);
                $data['lampiran'] = 'uploads/ppid/' . $newName;
            }

            //----------------------------------------------------
            // 4. Simpan ke Database
            //----------------------------------------------------
            if (!$this->ppidModel->insert($data)) {
                return $this->respond([
                    'status' => false,
                    'errors' => $this->ppidModel->errors()
                ], 400);
            }

            //----------------------------------------------------
            // 5. Generate Nomor Registrasi
            //----------------------------------------------------
            $id = $this->ppidModel->getInsertID();
            $nomor = "PPID-" . date("Y") . "-" . str_pad($id, 4, "0", STR_PAD_LEFT);

            $this->ppidModel->update($id, [
                'nomor_registrasi' => $nomor
            ]);

            // ✅ REV 4: Ambil data lengkap yang baru saja disimpan
            $dataBaru = $this->ppidModel->find($id);

            //----------------------------------------------------
            // 6. Response Sukses
            //----------------------------------------------------
            return $this->respondCreated([
                'status'  => true,
                'message' => 'Permohonan berhasil dikirim.',
                'data'    => $dataBaru // Mengembalikan seluruh data, bukan hanya id dan status
            ]);

        } catch (\Throwable $e) {
            return $this->failServerError($e->getMessage());
        }
    }

    private function hitungSLA($permohonan)
{
    if (
    in_array(
        strtolower($permohonan['status']),
        ['selesai','ditolak']
    )
){
    return [
        'label'=>'Selesai',
        'class'=>'sla-selesai'
    ];
}

    switch (strtolower($permohonan['tingkat_urgensi'])) {

        case 'sangat segera':
            $hari = 3;
            break;

        case 'segera':
            $hari = 7;
            break;

        default:
            $hari = 14;
            break;
    }

    $deadline = strtotime($permohonan['created_at'] . " +{$hari} days");

    $selisih = floor(($deadline - time()) / 86400);

    if ($selisih > 0) {

        return [
            'label' => "Tersisa {$selisih} hari",
            'class' => 'sla-aman'
        ];

    } elseif ($selisih == 0) {

        return [
            'label' => "Hari ini",
            'class' => 'sla-warning'
        ];

    } else {

        return [
            'label' => "Terlambat " . abs($selisih) . " hari",
            'class' => 'sla-terlambat'
        ];

    }
}
}