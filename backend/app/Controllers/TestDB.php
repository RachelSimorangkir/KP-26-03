<?php

namespace App\Controllers;

class TestDb extends BaseController
{
    public function index()
    {
        try {
            $db = \Config\Database::connect();

            if ($db->connID) {
                return $this->response->setJSON([
                    'status' => true,
                    'message' => 'Koneksi PostgreSQL berhasil'
                ]);
            }

            return $this->response->setJSON([
                'status' => false,
                'message' => 'Koneksi gagal'
            ]);
        } catch (\Exception $e) {
            return $this->response->setJSON([
                'status' => false,
                'error' => $e->getMessage()
            ]);
        }
    }
}