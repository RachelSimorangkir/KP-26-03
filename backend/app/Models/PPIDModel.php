<?php

namespace App\Models;

use CodeIgniter\Model;

class PPIDModel extends Model
{
    protected $table            = 'ppid_internal';
    protected $primaryKey       = 'id';

    protected $returnType       = 'array';
    protected $useSoftDeletes   = false;

    protected $allowedFields = [

        // Nomor registrasi
        'nomor_registrasi',

        // Data pengaju
        'user_id',
        'nip_pengaju',
        'nama_pengaju',
        'unit_pengaju',
        'email',
        'no_hp',

        // Data permohonan
        'jenis_permohonan',
        'referensi_permohonan',
        'uraian_permohonan',
        'unit_tujuan',
        'tingkat_urgensi',

        // Lampiran
        'lampiran',

        // Diproses admin
        'status',
        'petugas_ppid',
        'tanggapan',
        'catatan_internal',
        'processed_at',
        'surat_balasan',
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