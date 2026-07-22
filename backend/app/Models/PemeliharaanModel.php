<?php
namespace App\Models;
use CodeIgniter\Model;
class PemeliharaanModel extends Model
{
    protected $table = 'pemeliharaan_barang';
    protected $primaryKey = 'id';
    protected $allowedFields = [
        'request_id', 'nomor_surat', 'nip_pelapor', 'nama_pelapor',
        'jabatan_pelapor', 'barang_nama', 'barang_nup', 'keterangan',
        'tanggal', 'status', 'catatan_admin'
    ];
}