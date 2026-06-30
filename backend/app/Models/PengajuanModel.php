<?php

namespace App\Models;

use CodeIgniter\Model;

class PengajuanModel extends Model
{
    protected $table = "pengajuan";

    protected $primaryKey = "id";

    protected $returnType = "array";

    protected $useAutoIncrement = true;

    protected $allowedFields = [

        "nip",
        "nama",
        "jabatan",
        "unit_kerja",
        "layanan",
        "status",
        "tanggal_pengajuan",
        "data_pengajuan",
        "drive_link",
        "surat_permohonan",
        "catatan_admin",
        "file_respon",
    ];

    protected $useTimestamps = false;
}