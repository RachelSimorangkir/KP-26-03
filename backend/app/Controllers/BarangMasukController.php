<?php
namespace App\Controllers;
use App\Models\BarangMasukModel;
class BarangMasukController extends BaseController
{
    protected BarangMasukModel $model;
    public function __construct()
    {
        $this->model = new BarangMasukModel();
    }

    // GET /api/barang-masuk — dikelompokkan per No. Pengadaan
    public function index()
    {
        $rows = $this->model->orderBy('created_at', 'DESC')->orderBy('id', 'ASC')->findAll();
        $grouped = [];
        foreach ($rows as $r) {
            $key = $r['no_pengadaan'];
            if (!isset($grouped[$key])) {
                $grouped[$key] = [
                    "id"          => $r['id'],
                    "noPengadaan" => $r['no_pengadaan'],
                    "tanggal"     => $r['tanggal'],
                    "pemeriksa"   => $r['pemeriksa'],
                    "items"       => [],
                ];
            }
            $grouped[$key]["items"][] = [
                "nama"      => $r['nama_barang'],
                "kategori"  => $r['kategori'],
                "jumlah"    => $r['jumlah'],
                "kondisi"   => $r['kondisi'],
                "hargaUnit" => "Rp " . number_format((float) $r['harga_unit'], 0, ',', '.'),
            ];
        }
        return $this->response->setJSON(array_values($grouped));
    }

    // POST /api/barang-masuk
    public function create()
    {
        try {
            $json = $this->request->getJSON(true);
            $this->simpanItems($json["noPengadaan"], $json);
            return $this->response->setJSON(["success" => true, "message" => "Barang masuk berhasil dicatat."]);
        } catch (\Throwable $e) {
            return $this->response->setStatusCode(500)->setJSON(["success" => false, "error" => $e->getMessage()]);
        }
    }

    // PUT /api/barang-masuk/{id}
    public function update(int $id)
    {
        try {
            $existing = $this->model->find($id);
            if (!$existing) {
                return $this->response->setStatusCode(404)->setJSON(["success" => false, "error" => "Data tidak ditemukan."]);
            }

            $noPengadaanLama = $existing['no_pengadaan'];
            $json = $this->request->getJSON(true);
            $this->model->where('no_pengadaan', $noPengadaanLama)->delete();
            $this->simpanItems($json["noPengadaan"], $json);
            return $this->response->setJSON(["success" => true, "message" => "Barang masuk berhasil diperbarui."]);
        } catch (\Throwable $e) {
            return $this->response->setStatusCode(500)->setJSON(["success" => false, "error" => $e->getMessage()]);
        }
    }

    // DELETE /api/barang-masuk/{id}
    public function delete(int $id)
    {
        try {
            $existing = $this->model->find($id);
            if (!$existing) {
                return $this->response->setStatusCode(404)->setJSON(["success" => false, "error" => "Data tidak ditemukan."]);
            }
            $this->model->where('no_pengadaan', $existing['no_pengadaan'])->delete();
            return $this->response->setJSON(["success" => true, "message" => "Barang masuk berhasil dihapus."]);
        } catch (\Throwable $e) {
            return $this->response->setStatusCode(500)->setJSON(["success" => false, "error" => $e->getMessage()]);
        }
    }

    // Helper: insert semua item dalam 1 pengadaan
    private function simpanItems(string $noPengadaan, array $json): void
    {
        foreach ($json["items"] as $item) {
            $hargaBersih = preg_replace('/[^0-9]/', '', $item["hargaUnit"] ?? '0');
            $this->model->insert([
                "no_pengadaan" => $noPengadaan,
                "tanggal"      => $json["tanggal"],
                "pemeriksa"    => $json["pemeriksa"],
                "nama_barang"  => $item["nama"],
                "kategori"     => $item["kategori"],
                "jumlah"       => $item["jumlah"],
                "kondisi"      => $item["kondisi"],
                "harga_unit"   => $hargaBersih !== '' ? (int) $hargaBersih : 0,
            ]);
        }
    }
}