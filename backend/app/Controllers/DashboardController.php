<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Models\DashboardModel;

class DashboardController extends ResourceController
{
    protected $dashboardModel;

    public function __construct()
    {
        $this->dashboardModel = new DashboardModel();
    }

    public function aktivitas()
{
    return $this->respond([
        "status" => true,
        "message" => "Aktivitas berhasil diambil.",
        "data" => $this->dashboardModel->aktivitas()
    ]);
}
}