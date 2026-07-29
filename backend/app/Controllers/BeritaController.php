<?php

namespace App\Controllers;

use App\Models\BeritaModel;
use CodeIgniter\RESTful\ResourceController;
use Config\Services;

class BeritaController extends ResourceController
{
    protected $beritaModel;
    protected $format = 'json';

    public function __construct()
    {
        $this->beritaModel = new BeritaModel();
    }

    /**
     * GET /api/berita
     * Mengambil semua berita
     */
    public function index()
    {
        try {
            $berita = $this->beritaModel->getBeritaWithKategori();
            
            return $this->respond([
                'status' => true,
                'message' => 'Data berita berhasil diambil',
                'data' => $berita
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
     * GET /api/berita/{id}
     * Mengambil 1 berita berdasarkan ID
     */
    public function show($id = null)
    {
        try {
            $berita = $this->beritaModel->getBeritaById($id);
            
            if (!$berita) {
                return $this->failNotFound('Berita tidak ditemukan');
            }
            
            return $this->respond([
                'status' => true,
                'message' => 'Detail berita berhasil diambil',
                'data' => $berita
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
     * POST /api/berita
     * Membuat berita baru (dari React FormPengajuan.jsx)
     */
    public function create()
    {
        try {
            // ✅ PERBAIKAN 1: Gunakan getPost() karena frontend mengirim FormData
            $input = $this->request->getPost();
            
            // ✅ PERBAIKAN 2: Validasi TANPA field 'status' (karena status otomatis 'menunggu')
            $validation = Services::validation();
            $validation->setRules([
                'judul'             => 'required',
                'kategori_id'       => 'required|integer',
                'tanggal_kegiatan'  => 'required|valid_date',
                'lokasi_kegiatan'   => 'required',
                'isi_berita'        => 'required',
            ]);

            if (!$validation->run($input)) {
                return $this->failValidationErrors($validation->getErrors());
            }

            // Ambil data user dari header (atau fallback ke default)
            $userId      = $this->request->getHeader('X-User-Id') ? (int)$this->request->getHeader('X-User-Id')->getValue() : 1;
            $userNip     = $this->request->getHeader('X-User-Nip') ? $this->request->getHeader('X-User-Nip')->getValue() : 'ADMIN001';
            $userName    = $this->request->getHeader('X-User-Name') ? $this->request->getHeader('X-User-Name')->getValue() : 'Administrator Humas';
            $satuanKerja = $this->request->getHeader('X-User-SatuanKerja') ? $this->request->getHeader('X-User-SatuanKerja')->getValue() : 'Ditjen Bimas Kristen';

            // Handle upload file
            $fotoUtama = null;
            $lampiranData = [];
            
            if ($this->request->getFile('foto')) {
                $files = $this->request->getFileMultiple('foto') ?? [$this->request->getFile('foto')];
                
                foreach ($files as $index => $file) {
                    if ($file && $file->isValid() && !$file->hasMoved()) {
                        if ($file->getSize() > 8 * 1024 * 1024) {
                            return $this->failValidationErrors(['foto' => 'Ukuran file maksimal 8MB']);
                        }
                        
                        $newName = $file->getRandomName();
                        $file->move(WRITEPATH . 'uploads/berita', $newName);
                        
                        $filePath = 'uploads/berita/' . $newName;
                        
                        if ($index === 0) {
                            $fotoUtama = $filePath;
                        }
                        
                        $lampiranData[] = [
                            'file_path' => $filePath,
                            'file_name' => $file->getClientName(),
                            'file_size' => $file->getSize(),
                            'file_type' => $file->getClientMimeType(),
                            'jenis'     => strpos($file->getClientMimeType(), 'video') !== false ? 'video' : 'foto',
                            'urutan'    => $index
                        ];
                    }
                }
            }

            // Simpan data berita (Status dipaksa 'menunggu')
            $beritaId = $this->beritaModel->insert([
                'user_id'           => $userId,
                'nip_pengusul'      => $userNip,
                'nama_pengusul'     => $userName,
                'satuan_kerja'      => $satuanKerja,
                'judul'             => $input['judul'],
                'slug'              => url_title($input['judul'], '-', true),
                'kategori_id'       => $input['kategori_id'],
                'tanggal_kegiatan'  => $input['tanggal_kegiatan'],
                'lokasi_kegiatan'   => $input['lokasi_kegiatan'],
                'isi_berita'        => $input['isi_berita'],
                'foto_utama'        => $fotoUtama,
                'status'            => 'menunggu',
                'submitted_at'      => date('Y-m-d H:i:s')
            ]);

            // Simpan lampiran
            if (!empty($lampiranData) && $beritaId) {
                $db = \Config\Database::connect();
                foreach ($lampiranData as $lampiran) {
                    $db->table('berita_lampiran')->insert(array_merge($lampiran, [
                        'berita_id'   => $beritaId,
                        'uploaded_by' => $userId
                    ]));
                }
            }

            return $this->respondCreated([
                'status' => true,
                'message' => 'Berita berhasil diajukan! Menunggu verifikasi admin.',
                'data' => [
                    'id' => $beritaId,
                    'judul' => $input['judul'],
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

    //untuk jumlah berita yang menunggu verifikasi admin
    public function countMenunggu()
    {
      $jumlah = $this->beritaModel
        ->where('status', 'menunggu')
        ->countAllResults();

    return $this->respond([
        "status" => true,
        "jumlah" => $jumlah
     ]);
   }

    /**
     * PUT /api/berita/{id}
     * Update status berita oleh Admin
     */
    public function update($id = null)
    {
        try {
            // ✅ PERBAIKAN 3: Ambil input, dan cek empty SEBELUM mengakses array-nya
            $input = $this->request->getJSON(true);
            if (empty($input)) {
                $input = $this->request->getRawInput();
            }

            // ✅ PERBAIKAN 6: Cari berita berdasarkan ID terlebih dahulu
            $berita = $this->beritaModel->find($id);
            if (!$berita) {
                return $this->failNotFound('Berita tidak ditemukan');
            }

            // ✅ PERBAIKAN 5: Validasi status di update()
            $validation = Services::validation();
            $validation->setRules([
                'status' => 'required|in_list[menunggu,disetujui,revisi,ditolak,terbit]'
            ]);

            if (!$validation->run($input)) {
                return $this->failValidationErrors($validation->getErrors());
            }

            // Validasi tambahan: Catatan wajib jika revisi/ditolak
            if (in_array($input['status'], ['revisi', 'ditolak']) && empty($input['catatan_admin'])) {
                return $this->failValidationErrors([
                    'catatan_admin' => 'Catatan wajib diisi saat status revisi atau ditolak.'
                ]);
            }

            // ✅ PERBAIKAN 4: Buat $dataUpdate dasar TERLEBIH DAHULU
            $dataUpdate = [
            'status' => $input['status'],
            'catatan_admin' => !empty($input['catatan_admin']) ? $input['catatan_admin'] : null,
            ];

            // Tambahkan timestamp sesuai kondisi
            if ($input['status'] === 'terbit') {

             $dataUpdate['tanggal_terbit'] = $input['tanggal_terbit'];

             $dataUpdate['kanal_publikasi'] = $input['kanal_publikasi'];

             $dataUpdate['published_at'] = date('Y-m-d H:i:s');

           }
            if ($input['status'] === 'disetujui') {
                $dataUpdate['approved_at'] = date('Y-m-d H:i:s');
            }

            if ($input['status'] === 'terbit') {
                $dataUpdate['published_at'] = date('Y-m-d H:i:s');
            }

            // Eksekusi update ke database
            $this->beritaModel->update($id, $dataUpdate);

            return $this->respond([
                'status' => true,
                'message' => 'Status berita berhasil diperbarui',
                'data' => $this->beritaModel->find($id)
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
     * DELETE /api/berita/{id}
     * Hapus berita
     */
    public function delete($id = null)
    {
        try {
            $berita = $this->beritaModel->find($id);
            if (!$berita) {
                return $this->failNotFound('Berita tidak ditemukan');
            }

            // Opsional: Hapus file fisik di sini jika diperlukan
            
            $this->beritaModel->delete($id);
            
            return $this->respondDeleted([
                'status' => true,
                'message' => 'Berita berhasil dihapus'
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
     * GET /api/berita/user/{nip}
     * Mengambil riwayat pengajuan berita berdasarkan NIP user
     */
    public function getByUser($nip = null)
    {
        try {
            if (!$nip) {
                return $this->failValidationErrors(['nip' => 'NIP wajib disertakan']);
            }

            $data = $this->beritaModel
                ->where('nip_pengusul', $nip)
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
}