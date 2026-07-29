<?php
namespace App\Controllers;
use App\Models\PemeliharaanModel;
class PemeliharaanController extends BaseController
{
    protected PemeliharaanModel $model;
    public function __construct()
    {
        $this->model = new PemeliharaanModel();
    }

    // GET /api/pemeliharaan — dipakai Admin, data dikelompokkan per surat
    public function index()
    {
        $rows = $this->model->orderBy('tanggal', 'DESC')->findAll();
        $grouped = [];
        foreach ($rows as $row) {
            $rid = $row['request_id'];
            if (!isset($grouped[$rid])) {
                $grouped[$rid] = [
                    "id"           => $rid,
                    "nomorSurat"   => $row['nomor_surat'],
                    "tanggal"      => $row['tanggal'],
                    "status"       => $row['status'],
                    "catatanAdmin" => $row['catatan_admin'],
                    "pemohon" => [
                        "nama"    => $row['nama_pelapor'],
                        "nip"     => $row['nip_pelapor'],
                        "jabatan" => $row['jabatan_pelapor'],
                    ],
                    "barang" => [],
                ];
            }

            $grouped[$rid]["barang"][] = [
                "nama"       => $row['barang_nama'],
                "nup"        => $row['barang_nup'],
                "keterangan" => $row['keterangan'],
            ];
        }
        return $this->response->setJSON(array_values($grouped));
    }

    // POST /api/pemeliharaan — dipakai User
    public function create()
    {
        try {
            $json = $this->request->getJSON(true);
            $requestId  = uniqid("pml_", true);
            $nomorSurat = $json["nomorSurat"] ?? ("PML-" . date("Y") . "-" . rand(100, 999));
            $tanggal    = date("Y-m-d");
            foreach ($json["items"] as $item) {
                $this->model->insert([
                    "request_id"      => $requestId,
                    "nomor_surat"     => $nomorSurat,
                    "nip_pelapor"     => $json["nip"],
                    "nama_pelapor"    => $json["nama"],
                    "jabatan_pelapor" => $json["jabatan"] ?? "",
                    "barang_nama"     => $item["nama"],
                    "barang_nup"      => $item["nup"],
                    "keterangan"      => $item["keterangan"],
                    "tanggal"         => $tanggal,
                    "status"          => "Diajukan",
                ]);
            }
            return $this->response->setJSON([
                "success" => true,
                "message" => "Permohonan pemeliharaan berhasil dikirim."
            ]);
        } catch (\Throwable $e) {
            return $this->response
                ->setStatusCode(500)
                ->setJSON(["success" => false, "error" => $e->getMessage()]);
        }
    }

    // PUT /api/pemeliharaan/{request_id} — dipakai Admin (ubah status semua barang dalam 1 surat)
    public function updateStatus($requestId = null)
    {
        $json = $this->request->getJSON(true);
        $updateData = ["status" => $json["status"]];
        if (isset($json["catatanAdmin"])) {
            $updateData["catatan_admin"] = $json["catatanAdmin"];
        }
        $this->model->where("request_id", $requestId)->set($updateData)->update();
        return $this->response->setJSON(["success" => true]);
    }
}