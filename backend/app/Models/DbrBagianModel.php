<?php
namespace App\Models;
use CodeIgniter\Model;
class DbrBagianModel extends Model
{
    protected $table = 'dbr_bagian';
    protected $primaryKey = 'id';
    protected $allowedFields = ['eselon_id', 'nama', 'urutan'];
}