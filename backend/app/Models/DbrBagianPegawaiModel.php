<?php
namespace App\Models;
use CodeIgniter\Model;
class DbrBagianPegawaiModel extends Model
{
    protected $table = 'dbr_bagian_pegawai';
    protected $primaryKey = 'id';
    protected $allowedFields = ['bagian_id', 'nip'];
}