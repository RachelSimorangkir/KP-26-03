<?php
namespace App\Controllers;
use App\Models\PeminjamanBarangModel;
use App\Models\MasterBarangModel;
class PeminjamanBarangController extends BaseController
{
    protected PeminjamanBarangModel $model;
    public function __construct()
    {
        $this->model = new PeminjamanBarangModel();
    }

    public function index()
    {
        $data = $this->model
            ->orderBy("id","DESC")
            ->findAll();
        return $this->response->setJSON($data);
    }

    public function detail(int $id)
    {
        return $this->response->setJSON(
            $this->model->find($id)
        );
    }
    public function create()
    {
        try{
            $json = $this->request->getJSON(true);
            $insert = [
    "barang_id"        => $json["barang_id"],
    "nama_barang"      => $json["nama_barang"],
    "kode_barang"      => $json["kode_barang"],
    "nip"              => $json["nip"],
    "nama"             => $json["nama"],
    "jabatan"          => $json["jabatan"],
    "unit_kerja"       => $json["unit_kerja"],
    "lokasi_penggunaan"=> $json["lokasi_penggunaan"],
    "tanggal_pinjam"   => $json["tanggal_pinjam"],
    "tanggal_kembali"  => $json["tanggal_kembali"],
    "keperluan"        => $json["keperluan"],
    "status"           => "Menunggu"
];
            $this->model->insert($insert);
            return $this->response->setJSON([
                "success"=>true,
                "message"=>"Pengajuan berhasil"
            ]);
        }catch(\Throwable $e){
            return $this->response
                ->setStatusCode(500)
                ->setJSON([
                    "success"=>false,
                    "error"=>$e->getMessage()
                ]);
        }
    }

    public function updateStatus(int $id)
    {
        $json = $this->request->getJSON(true);
        $updateData = [
            "status" => $json["status"]
        ];
        if (isset($json["kondisi_kembali"])) {
            $updateData["kondisi_kembali"] = $json["kondisi_kembali"];
        }
        if (isset($json["catatan_kembali"])) {
            $updateData["catatan_kembali"] = $json["catatan_kembali"];
        }
        $this->model->update($id, $updateData);
        if (
            $json["status"] === "Dikembalikan" &&
            ($json["kondisi_kembali"] ?? "") !== "Rusak Berat"
        ) {
            $item = $this->model->find($id);
            if ($item && $item["barang_id"]) {
                $masterModel = new MasterBarangModel();
                $barang = $masterModel->find($item["barang_id"]);
                if ($barang) {
                    $masterModel->update($item["barang_id"], [
                        "stok" => $barang["stok"] + 1
                    ]);
                }
            }
        }
        return $this->response->setJSON([
            "success"=>true
        ]);
    }
}