<?php

namespace App\Controllers;

use App\Models\PermintaanBarangModel;
use CodeIgniter\RESTful\ResourceController;

class PermintaanBarangController extends ResourceController
{
    protected $modelName = PermintaanBarangModel::class;
    protected $format = "json";

    // ==========================
    // GET /api/permintaan
    // ==========================
    public function index()
{
    $model = new \App\Models\PermintaanBarangModel();

    $data = $model
        ->orderBy("created_at", "DESC")
        ->findAll();

    return $this->respond($data);
}

    // ==========================
    // POST /api/permintaan
    // ==========================
    public function create()
    {
        $body = $this->request->getJSON(true);

        if (!$body) {
            return $this->fail("Data tidak ditemukan.");
        }

        $this->model->insert([

            "nip"          => $body["nip"] ?? "",

            "nama"         => $body["nama"] ?? "",

            "jabatan"      => $body["jabatan"] ?? "",

            "unit_kerja"   => $body["unit_kerja"] ?? "",

            "nama_barang"  => $body["nama_barang"] ?? "",

            "jumlah"       => $body["jumlah"] ?? 0,

            "alasan"       => $body["alasan"] ?? "",

            "status"       => "Pending"

        ]);

        return $this->respond([

            "success" => true,

            "message" => "Permintaan berhasil dikirim."

        ]);
    }

    // ==========================
    // PUT /api/permintaan/{id}
    // ==========================
    public function update($id = null)
    {
        $body = $this->request->getJSON(true);

        if (!$this->model->find($id)) {

            return $this->failNotFound("Data tidak ditemukan.");

        }

        $this->model->update($id, [

            "status" => $body["status"]

        ]);

        return $this->respond([

            "success" => true,

            "message" => "Status berhasil diperbarui."

        ]);
    }

    // ==========================
    // GET /api/permintaan/{id}
    // ==========================
    public function show($id = null)
    {
        $data = $this->model->find($id);

        if (!$data) {

            return $this->failNotFound("Data tidak ditemukan.");

        }

        return $this->respond($data);
    }

    // ==========================
    // DELETE /api/permintaan/{id}
    // ==========================
    public function delete($id = null)
    {
        if (!$this->model->find($id)) {

            return $this->failNotFound("Data tidak ditemukan.");

        }

        $this->model->delete($id);

        return $this->respond([

            "success" => true,

            "message" => "Data berhasil dihapus."

        ]);
    }
}