<?php

namespace App\Controllers;

use App\Models\DataInternalModel;
use CodeIgniter\RESTful\ResourceController;
use Config\Services;

class DataInternalController extends ResourceController
{
    protected $dataInternalModel;
    protected $format = 'json';

    public function __construct()
    {
        $this->dataInternalModel = new DataInternalModel();
    }

    /**
     * GET /api/data-internal
     * Mengambil semua data internal
     */
    public function index()
    {
        try {
            $data = $this->dataInternalModel
                ->orderBy('submitted_at', 'DESC')
                ->findAll();
            
            return $this->respond([
                'status' => true,
                'message' => 'Data internal berhasil diambil',
                'data' => $data
            ]);
        } catch (\Throwable $e) {
            return $this->respond([
                'status' => false,
                'message' => $e->getMessage(),
                'line' => $e->getLine(),
                'file' => $e->getFile()
            ], 500);
        }
    }

    /**
     * GET /api/data-internal/{id}
     * Mengambil 1 data internal berdasarkan ID
     */
    public function show($id = null)
    {
        try {
            $data = $this->dataInternalModel->find($id);
            
            if (!$data) {
                return $this->failNotFound('Data internal tidak ditemukan');
            }
            
            return $this->respond([
                'status' => true,
                'message' => 'Detail data internal berhasil diambil',
                'data' => $data
            ]);
        } catch (\Throwable $e) {
            return $this->respond([
                'status' => false,
                'message' => $e->getMessage(),
                'line' => $e->getLine(),
                'file' => $e->getFile()
            ], 500);
        }
    }

    /**
     * POST /api/data-internal
     * Membuat pengajuan data internal baru (dari React Form)
     */
    public function create()
    {
        try {
            // Gunakan getPost() karena frontend mengirim FormData
            $input = $this->request->getPost();

if (empty($input)) {
    $input = $this->request->getJSON(true);
}

if (empty($input)) {
    $input = $this->request->getRawInput();
}

            
            // Validasi field yang dikirim React
            $validation = Services::validation();
            $validation->setRules([
                'cakupanWilayah'           => 'required',
                'periodeDari'              => 'required|valid_date',
                'periodeSampai'            => 'required|valid_date',
                'tujuanPenggunaanKategori' => 'required',
                'tujuanPenggunaanDetail'   => 'required',
                'tingkatUrgensi'           => 'required',
                'jenisData' => 'required',
            ]);

            if (strtotime($input['periodeSampai']) < strtotime($input['periodeDari'])) {
                return $this->failValidationErrors([
                'periodeSampai' => 'Periode sampai harus setelah periode dari.']);
            }

            if (!$validation->run($input)) {
                return $this->failValidationErrors($validation->getErrors());
            }

            // PERBAIKAN 1: Konversi array jenisData menjadi string (comma-separated)
            $jenisDataRaw = $input['jenisData'] ?? [];
            $jenisDataStr = is_array($jenisDataRaw) ? implode(',', $jenisDataRaw) : (string)$jenisDataRaw;

            // PERBAIKAN 5: user_id default ke null jika tidak dikirim dari React
            $userId      = !empty($input['user_id']) ? (int)$input['user_id'] : null;
            $nipPemohon  = $input['nip_pemohon'] ?? 'UNKNOWN';
            $namaPemohon = $input['nama_pemohon'] ?? 'Unknown User';
            $jabatan     = $input['jabatan'] ?? '-';
            $unitKerja   = $input['unit_kerja'] ?? '-';

            // PERBAIKAN 3: Pastikan folder upload ada sebelum memindahkan file
            $uploadPath = WRITEPATH . 'uploads/data_internal';
            if (!is_dir($uploadPath)) {
                mkdir($uploadPath, 0777, true);
            }

            // PERBAIKAN 2: Nama file disesuaikan persis dengan formData.append("memoFile", ...) di React
            $memoFile = null;
            $file = $this->request->getFile('memoFile');
            
            if ($file && $file->isValid() && !$file->hasMoved()) {
                $allowedTypes = ['pdf', 'doc', 'docx'];
                $ext = strtolower($file->getClientExtension());
                
                if (!in_array($ext, $allowedTypes)) {
                    return $this->failValidationErrors(['memoFile' => 'Hanya file PDF, DOC, atau DOCX yang diizinkan.']);
                }
                
                if ($file->getSize() > 10 * 1024 * 1024) {
                    return $this->failValidationErrors(['memoFile' => 'Ukuran file maksimal 10MB.']);
                }
                
                $newName = $file->getRandomName();
                $file->move($uploadPath, $newName);
                $memoFile = 'uploads/data_internal/' . $newName;
            }

            // Insert ke database dengan nama kolom yang sesuai
            $dataId = $this->dataInternalModel->insert([
                'user_id'                 => $userId,
                'nip_pemohon'             => $nipPemohon,
                'nama_pemohon'            => $namaPemohon,
                'jabatan'                 => $jabatan,
                'unit_kerja'              => $unitKerja,
                'jenis_data'              => $jenisDataStr, // Disimpan sebagai string "A,B,C"
                'cakupan_wilayah'         => $input['cakupanWilayah'],
                'periode_dari'            => $input['periodeDari'],
                'periode_sampai'          => $input['periodeSampai'],
                'tujuan_kategori'         => $input['tujuanPenggunaanKategori'],
                'tujuan_detail'           => $input['tujuanPenggunaanDetail'],
                'tingkat_urgensi'         => $input['tingkatUrgensi'],
                'memo_file'               => $memoFile,
                'status'                  => 'menunggu',
                'submitted_at'            => date('Y-m-d H:i:s')
            ]);

            return $this->respondCreated([
                'status' => true,
                'message' => 'Permintaan data internal berhasil diajukan! Menunggu verifikasi admin.',
                'data' => [
                    'id' => $dataId,
                    'nip_pemohon' => $nipPemohon,
                    'status' => 'menunggu'
                ]
            ]);

        } catch (\Throwable $e) {
            return $this->respond([
                'status' => false,
                'message' => $e->getMessage(),
                'line' => $e->getLine(),
                'file' => $e->getFile()
            ], 500);
        }
    }

    /**
     * PUT /api/data-internal/{id}
     * Update status dan tindakan admin pada data internal
     */
    public function update($id = null)
    {
        log_message('error', '===== MASUK UPDATE =====');
        try {
            // 🔴 PERBAIKAN 7: Ambil input dengan fallback yang mendukung multipart/form-data (untuk upload response_file nanti)
            $input = $this->request->getPost(); // Cek POST (multipart) dulu
            log_message('error', json_encode($input));


            // Cari data terlebih dahulu
            $data = $this->dataInternalModel->find($id);
            if (!$data) {
                return $this->failNotFound('Data internal tidak ditemukan');
            }

            // Validasi status
            $validation = Services::validation();
            $validation->setRules([
                'status' => 'required|in_list[menunggu,diproses,selesai,ditolak]'
            ]);

            if (!$validation->run($input)) {
                return $this->failValidationErrors($validation->getErrors());
            }

            // Validasi tambahan: Catatan wajib jika ditolak
            if ($input['status'] === 'ditolak' && empty($input['catatan_admin'])) {
                return $this->failValidationErrors([
                    'catatan_admin' => 'Catatan wajib diisi saat status ditolak.'
                ]);
            }

            // Siapkan $dataUpdate dasar
            $dataUpdate = [
                'status'        => $input['status'],
                'catatan_admin' => !empty($input['catatan_admin']) ? $input['catatan_admin'] : null,
            ];

            // 🔴 PERBAIKAN 5 (lanjutan): processed_by harus INTEGER (ID Admin)
            $adminUserId = !empty($input['processed_by'])
              ? (int)$input['processed_by']
              : null;

            // Tambahkan field pemrosesan jika status berubah dari 'menunggu'
            if (in_array($input['status'], ['diproses', 'selesai', 'ditolak'])) {
                $dataUpdate['processed_at'] = date('Y-m-d H:i:s');
                $dataUpdate['processed_by'] = $adminUserId; 
            }

            // Handle upload response_file (opsional, mendukung multipart/form-data)
            $file = $this->request->getFile('response_file');
            log_message('error', $file ? 'FILE ADA' : 'FILE TIDAK ADA');
            log_message('error', print_r($file, true));
            
            if ($file && $file->isValid() && !$file->hasMoved()) {
                $uploadPath = WRITEPATH . 'uploads/data_internal';
                if (!is_dir($uploadPath)) {
                    mkdir($uploadPath, 0777, true);
                }

                $allowedTypes = ['pdf', 'doc', 'docx', 'jpg', 'png'];
                $ext = strtolower($file->getClientExtension());
                
                if (in_array($ext, $allowedTypes) && $file->getSize() <= 10 * 1024 * 1024) {
                    $newName = 'response_' . $file->getRandomName();
                    $file->move($uploadPath, $newName);
                    $dataUpdate['response_file'] = 'uploads/data_internal/' . $newName;
                    log_message('error', print_r($dataUpdate, true));
                }
            }

            // Eksekusi update ke database
            log_message('error', 'MASUK UPDATE');
            log_message('error', json_encode($dataUpdate));
            $this->dataInternalModel->update($id, $dataUpdate);

            return $this->respond([
                'status' => true,
                'message' => 'Status data internal berhasil diperbarui',
                'data' => $this->dataInternalModel->find($id)
            ]);

        } catch (\Throwable $e) {

    log_message('error', $e);

    return $this->respond([
        'status'=>false,
        'message'=>$e->getMessage(),
        'line'=>$e->getLine(),
        'file'=>$e->getFile()
    ],500);
}
    }

    

    /**
     * DELETE /api/data-internal/{id}
     * Hapus data internal
     */
    public function delete($id = null)
    {
        try {
            $data = $this->dataInternalModel->find($id);
            if (!$data) {
                return $this->failNotFound('Data internal tidak ditemukan');
            }

            $this->dataInternalModel->delete($id);
            
            return $this->respondDeleted([
                'status' => true,
                'message' => 'Data internal berhasil dihapus'
            ]);
        } catch (\Throwable $e) {
            return $this->respond([
                'status' => false,
                'message' => $e->getMessage(),
                'line' => $e->getLine(),
                'file' => $e->getFile()
            ], 500);
        }
    }

    /**
     * GET /api/data-internal/user/{nip}
     * Mengambil riwayat pengajuan data internal berdasarkan NIP pemohon
     */
    public function getByUser($nip = null)
    {
        try {
            if (!$nip) {
                return $this->failValidationErrors(['nip' => 'NIP wajib disertakan']);
            }

            $data = $this->dataInternalModel
                ->where('nip_pemohon', $nip)
                ->orderBy('submitted_at', 'DESC')
                ->findAll();

            return $this->respond([
                'status' => true,
                'message' => 'Riwayat pengajuan berhasil diambil',
                'data' => $data
            ]);
        } catch (\Throwable $e) {
            return $this->respond([
                'status' => false,
                'message' => $e->getMessage(),
                'line' => $e->getLine(),
                'file' => $e->getFile()
            ], 500);
        }
    }

    /**
     * GET /api/data-internal/count-menunggu
     * Untuk jumlah data internal yang menunggu verifikasi admin
     */
    public function countMenunggu()
    {
        try {
            $jumlah = $this->dataInternalModel
                ->where('status', 'menunggu')
                ->countAllResults();

            return $this->respond([
                'status' => true,
                'message' => 'Jumlah data menunggu berhasil dihitung',
                'jumlah' => $jumlah
            ]);
        } catch (\Throwable $e) {
            return $this->respond([
                'status' => false,
                'message' => $e->getMessage(),
                'line' => $e->getLine(),
                'file' => $e->getFile()
            ], 500);
        }
    }

    //tambahan helper function
    public function getByNip($nip)
    {
     return $this->dataInternalModel
                ->where('nip_pemohon', $nip)
                ->orderBy('submitted_at', 'DESC')
                ->findAll();
    }


    //untuk download file balasan
    public function download($id)
   {
    // Ambil data berdasarkan ID
    $data = $this->dataInternalModel->find($id);

    if (!$data) {
        return $this->failNotFound('Data permintaan tidak ditemukan.');
    }

    // Pastikan file balasan ada
    if (empty($data['response_file'])) {
        return $this->failNotFound('File balasan belum tersedia.');
    }

    // Lokasi file
    $filePath = WRITEPATH . $data['response_file'];

    // Pastikan file benar-benar ada
    if (!file_exists($filePath)) {
        return $this->failNotFound('File tidak ditemukan di server.');
    }

    // Download file
    return $this->response->download($filePath, null);
    }
}