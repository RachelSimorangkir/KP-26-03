<?php
namespace App\Models;
use CodeIgniter\Model;
class MasterBarangModel extends Model
{
    protected $table = 'master_barang';
    protected $primaryKey = 'id';
    protected $allowedFields = [
        'kode_barang', 'nup', 'nama_barang', 'kategori',
        'merk', 'tipe', 'kondisi', 'status_bmn',
        'lokasi', 'unit_kerja', 'stok'
    ];
}