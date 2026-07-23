<?php
namespace App\Models;
use CodeIgniter\Model;
class PersediaanModel extends Model
{
    protected $table = 'persediaan';
    protected $primaryKey = 'id';
    protected $allowedFields = [
        'kode', 'uraian', 'jumlah_awal', 'nilai_awal',
        'masuk', 'keluar', 'jumlah_akhir', 'nilai_akhir', 'rupiah'
    ];
}