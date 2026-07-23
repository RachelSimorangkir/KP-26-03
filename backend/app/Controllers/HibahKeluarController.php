<?php
namespace App\Controllers;
use App\Models\HibahKeluarModel;
class HibahKeluarController extends BaseController
{
    protected HibahKeluarModel $model;
    public function __construct()
    {
        $this->model = new HibahKeluarModel();
    }

    // GET /api/hibah-keluar — dikelompokkan per No. Surat
    public function index()
    {
        $rows = $this->model->orderBy('created_at', 'DESC')->orderBy('id', 'ASC')->findAll();
        $grouped = [];
        foreach ($rows as $r) {
            $key = $r['no_surat'];
            if (!isset($grouped[$key])) {
                $grouped[$key] = [
                    "id"       => $r['id'],
                    "noSurat"  => $r['no_surat'],
                    "tanggal"  => $r['tanggal'],
                    "pemeriksa"=> $r['pemeriksa'],
                    "penerima" => [
                        "nama"      => $r['penerima_nama'],
                        "nip"       => $r['penerima_nip'],
                        "unitKerja" => $r['penerima_unit_kerja'],
                    ],
                    "tujuan"   => $r['tujuan'],
                    "status"   => $r['status'],
                    "items"    => [],
                ];
            }
            $grouped[$key]["items"][] = [
                "nama"       => $r['nama_barang'],
                "kategori"   => $r['kategori'],
                "jumlah"     => $r['jumlah'],
                "kondisi"    => $r['kondisi'],
                "keterangan" => $r['keterangan'],
            ];
        }

        return $this->response->setJSON(array_values($grouped));
    }

    // POST /api/hibah-keluar
    public function create()
    {
        try {
            $json = $this->request->getJSON(true);
            $this->simpanItems($json["noSurat"], $json);
            return $this->response->setJSON(["success" => true, "message" => "Hibah keluar berhasil dicatat."]);
        } catch (\Throwable $e) {
            return $this->response->setStatusCode(500)->setJSON(["success" => false, "error" => $e->getMessage()]);
        }
    }

    // PUT /api/hibah-keluar/{id}
    public function update(int $id)
    {
        try {
            $existing = $this->model->find($id);
            if (!$existing) {
                return $this->response->setStatusCode(404)->setJSON(["success" => false, "error" => "Data tidak ditemukan."]);
            }
            $noSuratLama = $existing['no_surat'];
            $json = $this->request->getJSON(true);
            $this->model->where('no_surat', $noSuratLama)->delete();
            $this->simpanItems($json["noSurat"], $json);
            return $this->response->setJSON(["success" => true, "message" => "Hibah keluar berhasil diperbarui."]);
        } catch (\Throwable $e) {
            return $this->response->setStatusCode(500)->setJSON(["success" => false, "error" => $e->getMessage()]);
        }
    }

    // DELETE /api/hibah-keluar/{id}
    public function delete(int $id)
    {
        try {
            $existing = $this->model->find($id);
            if (!$existing) {
                return $this->response->setStatusCode(404)->setJSON(["success" => false, "error" => "Data tidak ditemukan."]);
            }
            $this->model->where('no_surat', $existing['no_surat'])->delete();
            return $this->response->setJSON(["success" => true, "message" => "Hibah keluar berhasil dihapus."]);
        } catch (\Throwable $e) {
            return $this->response->setStatusCode(500)->setJSON(["success" => false, "error" => $e->getMessage()]);
        }
    }

    private function simpanItems(string $noSurat, array $json): void
    {
        foreach ($json["items"] as $item) {
            $this->model->insert([
                "no_surat"            => $noSurat,
                "tanggal"             => $json["tanggal"],
                "pemeriksa"           => $json["pemeriksa"],
                "penerima_nama"       => $json["penerima"]["nama"],
                "penerima_nip"        => $json["penerima"]["nip"] ?? '',
                "penerima_unit_kerja" => $json["penerima"]["unitKerja"],
                "tujuan"              => $json["tujuan"],
                "status"              => $json["status"],
                "nama_barang"         => $item["nama"],
                "kategori"            => $item["kategori"],
                "jumlah"              => $item["jumlah"],
                "kondisi"             => $item["kondisi"],
                "keterangan"          => $item["keterangan"] ?? '',
            ]);
        }
    }
}