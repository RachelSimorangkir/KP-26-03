<?php
namespace App\Models;
use CodeIgniter\Model;
class HibahMasukModel extends Model
{
    protected $table = 'hibah_masuk';
    protected $primaryKey = 'id';
    protected $allowedFields = [
        'no_pengadaan', 'tanggal', 'pemeriksa', 'asal_hibah',
        'nama_barang', 'kategori', 'jumlah', 'kondisi', 'harga_unit'
    ];
}