<?php

namespace App\Models;

use CodeIgniter\Model;

class DataInternalModel extends Model
{
    protected $table = 'permintaan_data_internal';

    protected $primaryKey = 'id';

    protected $returnType = 'array';

    protected $useAutoIncrement = true;

    protected $allowedFields = [

        'nomor_tiket',

        'user_id',

        'nip_pemohon',

        'nama_pemohon',

        'jabatan',

        'unit_kerja',

        'jenis_data',

        'cakupan_wilayah',

        'periode_dari',

        'periode_sampai',

        'tujuan_kategori',

        'tujuan_detail',

        'tingkat_urgensi',

        'memo_file',

        'status',

        'catatan_admin',

        'response_note',

        'response_file',

        'processed_by',

        'processed_at',

        'submitted_at'

    ];

    protected $useTimestamps = true;

    protected $createdField = 'created_at';

    protected $updatedField = 'updated_at';
}