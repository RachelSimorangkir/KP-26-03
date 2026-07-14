<?php

namespace App\Models;

use CodeIgniter\Model;

class PermintaanBarangModel extends Model
{
    protected $table = "permintaan_barang";

    protected $primaryKey = "id";

    protected $returnType = "array";

    protected $allowedFields = [

    "request_id",

    "nip",

    "nama",

    "jabatan",

    "unit_kerja",

    "nama_barang",

    "jumlah",

    "alasan",

    "status"

];

    protected $useTimestamps = true;

    protected $createdField = "created_at";

    protected $updatedField = "updated_at";
}