<?php

namespace App\Controllers;

use App\Models\PeminjamanBarangModel;

class PeminjamanBarangController extends BaseController
{
    protected $model;

    public function __construct()
    {
        $this->model = new PeminjamanBarangModel();
    }

    /*
    ====================================
    LIST DATA
    ====================================
    */

    public function index()
    {
        $data = $this->model
            ->orderBy("id","DESC")
            ->findAll();

        return $this->response->setJSON($data);
    }

    /*
    ====================================
    DETAIL
    ====================================
    */

    public function detail($id)
    {
        return $this->response->setJSON(
            $this->model->find($id)
        );
    }

    /*
    ====================================
    CREATE
    ====================================
    */

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

    /*
    ====================================
    UPDATE STATUS
    ====================================
    */

    public function updateStatus($id)
    {

        $json = $this->request->getJSON(true);

        $this->model->update($id,[

            "status"=>$json["status"]

        ]);

        return $this->response->setJSON([

            "success"=>true

        ]);

    }

}