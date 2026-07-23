<?php
namespace App\Models;
use CodeIgniter\Model;
class DbrBarangModel extends Model
{
    protected $table = 'dbr_barang';
    protected $primaryKey = 'id';
    protected $allowedFields = ['bagian_id', 'nama_pegawai', 'nip', 'jabatan', 'nama_barang', 'nup', 'kondisi'];
}