<?php
namespace App\Models;
use CodeIgniter\Model;
class BarangMasukModel extends Model
{
    protected $table = 'barang_masuk';
    protected $primaryKey = 'id';
    protected $allowedFields = [
        'no_pengadaan', 'tanggal', 'pemeriksa',
        'nama_barang', 'kategori', 'jumlah', 'kondisi', 'harga_unit'
    ];
}