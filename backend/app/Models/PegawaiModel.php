<?php

namespace App\Models;

use CodeIgniter\Model;

class PegawaiModel extends Model
{
    protected $table = 'pegawai';
    protected $primaryKey = 'nip';
    protected $useAutoIncrement = false;

    protected $allowedFields = [
        'nama',
        'nip',
        'jabatan',
        'pangkat_golongan',
        'unit_organisasi',
        'password'
    ];
}