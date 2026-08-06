<?php

namespace App\Models;

use CodeIgniter\Model;

class HelpdeskModel extends Model
{
    protected $table            = 'helpdesk';
    protected $primaryKey       = 'id';

    protected $returnType       = 'array';
    protected $useSoftDeletes   = false;

    protected $allowedFields = [
        'nomor_tiket',
        'user_id',
        'nip_pelapor',
        'nama_pelapor',
        'unit_kerja',
        'email',
        'no_hp',

        'nama_aplikasi',
        'kategori',
        'tingkat_urgensi',

        'judul_masalah',
        'deskripsi_masalah',

        'lampiran',

        'status',

        'petugas_pj',
        'tanggapan',
        'catatan_internal',

        'processed_by',
        'processed_at'
    ];

    protected bool $allowEmptyInserts = false;

    protected bool $updateOnlyChanged = true;

    protected $useTimestamps = true;

    protected $dateFormat = 'datetime';

    protected $createdField = 'created_at';

    protected $updatedField = 'updated_at';

    protected $deletedField = '';

    protected $validationRules = [];

    protected $validationMessages = [];

    protected $skipValidation = false;

    protected $cleanValidationRules = true;
}