<?php

namespace App\Models;

use CodeIgniter\Model;

class NotifikasiModel extends Model
{
    protected $table = 'notifikasi';

    protected $primaryKey = 'id';

    protected $allowedFields = [

    "nip",

    "layanan",

    "judul",

    "pesan",

    "status",

    "created_at",

    "pengajuan_id"

];

    protected $useTimestamps = false;
}