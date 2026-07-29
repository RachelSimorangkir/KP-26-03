<?php
namespace App\Controllers;
use App\Models\MasterBarangModel;
class MasterBarangController extends BaseController
{
    protected MasterBarangModel $model;
    public function __construct()
    {
        $this->model = new MasterBarangModel();
    }
    public function index()
    {
        $data = $this->model
            ->where('status_bmn', 'Aktif')
            ->whereIn('kondisi', ['Baik', 'Rusak Ringan'])
            ->orderBy('nama_barang', 'ASC')
            ->findAll();
        return $this->response->setJSON($data);
    }
}