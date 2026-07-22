<?php
namespace App\Controllers;
use App\Models\HibahMasukModel;
class HibahMasukController extends BaseController
{
    protected HibahMasukModel $model;
    public function __construct()
    {
        $this->model = new HibahMasukModel();
    }

    // GET /api/hibah-masuk — dikelompokkan per No. Pengadaan
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
                    "asalHibah"   => $r['asal_hibah'],
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

    // POST /api/hibah-masuk
    public function create()
    {
        try {
            $json = $this->request->getJSON(true);
            $this->simpanItems($json["noPengadaan"], $json);

            return $this->response->setJSON(["success" => true, "message" => "Hibah masuk berhasil dicatat."]);

        } catch (\Throwable $e) {
            return $this->response->setStatusCode(500)->setJSON(["success" => false, "error" => $e->getMessage()]);
        }
    }

    // PUT /api/hibah-masuk/{id}
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
            return $this->response->setJSON(["success" => true, "message" => "Hibah masuk berhasil diperbarui."]);
        } catch (\Throwable $e) {
            return $this->response->setStatusCode(500)->setJSON(["success" => false, "error" => $e->getMessage()]);
        }
    }

    // DELETE /api/hibah-masuk/{id}
    public function delete(int $id)
    {
        try {
            $existing = $this->model->find($id);
            if (!$existing) {
                return $this->response->setStatusCode(404)->setJSON(["success" => false, "error" => "Data tidak ditemukan."]);
            }
            $this->model->where('no_pengadaan', $existing['no_pengadaan'])->delete();
            return $this->response->setJSON(["success" => true, "message" => "Hibah masuk berhasil dihapus."]);
        } catch (\Throwable $e) {
            return $this->response->setStatusCode(500)->setJSON(["success" => false, "error" => $e->getMessage()]);
        }
    }

    private function simpanItems(string $noPengadaan, array $json): void
    {
        foreach ($json["items"] as $item) {
            $hargaBersih = preg_replace('/[^0-9]/', '', $item["hargaUnit"] ?? '0');
            $this->model->insert([
                "no_pengadaan" => $noPengadaan,
                "tanggal"      => $json["tanggal"],
                "pemeriksa"    => $json["pemeriksa"],
                "asal_hibah"   => $json["asalHibah"],
                "nama_barang"  => $item["nama"],
                "kategori"     => $item["kategori"],
                "jumlah"       => $item["jumlah"],
                "kondisi"      => $item["kondisi"],
                "harga_unit"   => $hargaBersih !== '' ? (int) $hargaBersih : 0,
            ]);
        }
    }
}