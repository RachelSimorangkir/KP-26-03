<?php
namespace App\Models;
use CodeIgniter\Model;
class DbrEselonModel extends Model
{
    protected $table = 'dbr_eselon';
    protected $primaryKey = 'id';
    protected $allowedFields = ['nama', 'label', 'warna', 'warna_bg', 'urutan'];
}