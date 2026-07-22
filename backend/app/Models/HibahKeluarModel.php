<?php
namespace App\Models;
use CodeIgniter\Model;
class HibahKeluarModel extends Model
{
    protected $table = 'hibah_keluar';
    protected $primaryKey = 'id';
    protected $allowedFields = [
        'no_surat', 'tanggal', 'pemeriksa',
        'penerima_nama', 'penerima_nip', 'penerima_unit_kerja',
        'tujuan', 'status',
        'nama_barang', 'kategori', 'jumlah', 'kondisi', 'keterangan'
    ];
}