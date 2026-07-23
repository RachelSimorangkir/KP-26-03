<?php
namespace App\Models;
use CodeIgniter\Model;
class DbrModel extends Model
{
    protected $table = 'dbr_lt10';
    protected $primaryKey = 'id';
    protected $allowedFields = [
        'nama', 'nip', 'jabatan', 'unit_organisasi',
        'fungsi', 'no', 'bmn', 'nup', 'kondisi'
    ];
}