<?php
namespace App\Controllers;
use App\Models\UserModel;
class AdminUserController extends BaseController
{
    // GET /api/admin-bmn — daftar pegawai yang role-nya admin_bmn
    public function listAdminBmn()
    {
        $model = new UserModel();
        $data = $model
            ->select('nip, nama')
            ->where('role', 'admin_bmn')
            ->orderBy('nama', 'ASC')
            ->findAll();
        return $this->response->setJSON($data);
    }
}