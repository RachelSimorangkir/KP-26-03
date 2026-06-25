<?php

namespace App\Controllers;

use App\Models\UserModel;

class Auth extends BaseController
{
    public function register()
    {
        $model = new UserModel();

        $data = $this->request->getJSON(true);

        $user = [
    'nama'     => $data['nama'],
    'nip'      => $data['nip'],
    'email'    => $data['email'],
    'password' => password_hash(
        $data['password'],
        PASSWORD_DEFAULT
    ),
    'role'     => $data['role']
];

        $model->insert($user);

        return $this->response->setJSON([
            'status' => true,
            'message' => 'User berhasil dibuat'
        ]);
    }

    public function login()
    {
        $model = new UserModel();

        $data = $this->request->getJSON(true);

        $user = $model
            ->where('nip', $data['nip'])
            ->first();

        if (!$user) {
            return $this->response->setStatusCode(401)
                ->setJSON([
                    'status' => false,
                    'message' => 'NIP tidak ditemukan'
                ]);
        }

        if (!password_verify(
            $data['password'],
            $user['password']
        )) {
            return $this->response->setStatusCode(401)
                ->setJSON([
                    'status' => false,
                    'message' => 'Password salah'
                ]);
        }

        unset($user['password']);

        return $this->response->setJSON([
            'status' => true,
            'message' => 'Login berhasil',
            'user' => $user
        ]);
    }
}