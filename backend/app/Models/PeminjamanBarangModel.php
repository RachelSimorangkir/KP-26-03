<?php

namespace App\Models;

use CodeIgniter\Model;

class PeminjamanBarangModel extends Model
{
    protected $table = "peminjaman_barang";

    protected $primaryKey = "id";

    protected $returnType = "array";

    protected $useAutoIncrement = true;

    protected $allowedFields = [

    "barang_id",

    "nama_barang",

    "kode_barang",

    "nip",

    "nama",

    "jabatan",

    "unit_kerja",

    "lokasi_penggunaan",

    "tanggal_pinjam",

    "tanggal_kembali",

    "keperluan",

    "status"

];

    protected $useTimestamps = true;

    protected $createdField = "created_at";

    protected $updatedField = "updated_at";
}