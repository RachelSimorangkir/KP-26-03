<?php

namespace App\Models;

use CodeIgniter\Model;

class PengajuanModel extends Model
{
    protected $table = 'pengajuan';

    protected $allowedFields = [
        'nip',
        'nama',
        'layanan',
        'status',
        'data_pengajuan'
    ];

    protected $useTimestamps = false;
}