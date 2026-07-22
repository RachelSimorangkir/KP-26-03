<?php
namespace App\Controllers;
use App\Models\PersediaanModel;
class PersediaanController extends BaseController
{
    protected PersediaanModel $model;
    public function __construct()
    {
        $this->model = new PersediaanModel();
    }
    public function index()
    {
        $data = $this->model->orderBy('uraian', 'ASC')->findAll();
        return $this->response->setJSON($data);
    }
}