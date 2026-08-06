<?php

namespace App\Models;

use CodeIgniter\Model;

class DIPModel extends Model
{
    protected $table = 'dip_upload';

    protected $primaryKey = 'id';

    protected $returnType = 'array';

    protected $useSoftDeletes = false;

    protected $allowedFields = [

        // Nomor Upload
        'nomor_upload',

        // Data Pengaju
        'nip_pengaju',
        'nama_pengaju',
        'unit_pengaju',

        // Periode
        'tahun',

        // Dokumen
        'nama_file',
        'file_path',

        // Catatan User
        'catatan_pengirim',

        // Proses Admin
        'status',
        'catatan_admin',
        'validated_by',
        'validated_at',

    ];

    protected bool $allowEmptyInserts = false;

    protected bool $updateOnlyChanged = true;

    protected $useTimestamps = true;

    protected $dateFormat = 'datetime';

    protected $createdField = 'created_at';

    protected $updatedField = 'updated_at';

    protected $validationRules = [];

    protected $validationMessages = [];

    protected $skipValidation = false;

    protected $cleanValidationRules = true;

    public function dashboard()
{
    $tahun = date('Y');

    //-------------------------------------------------
    // Total bidang yang wajib upload
    //-------------------------------------------------
    $totalBidang = 9;

    //-------------------------------------------------
    // Bidang yang sudah upload tahun ini
    //-------------------------------------------------
    $sudahUpload = $this
        ->select('unit_pengaju')
        ->where('tahun', $tahun)
        ->groupBy('unit_pengaju')
        ->findAll();

    $jumlahUpload = count($sudahUpload);

    //-------------------------------------------------
    // Daftar seluruh bidang
    //-------------------------------------------------
    $semuaBidang = [
        "Keuangan",
        "Perencanaan",
        "Humas",
        "Data",
        "Evaluasi",
        "Sistem Informasi",
        "Ortala Kepegawaian",
        "Umum",
        "BMN"
    ];

    //-------------------------------------------------
    // Bidang yang sudah upload
    //-------------------------------------------------
    $uploaded = array_column($sudahUpload, 'unit_pengaju');

    //-------------------------------------------------
    // Bidang yang belum upload
    //-------------------------------------------------
    $belumUpload = array_values(
        array_diff($semuaBidang, $uploaded)
    );

    return [
    "tahun" => $tahun,
    "total_bidang" => $totalBidang,
    "sudah_upload" => $jumlahUpload,
    "belum_upload" => $totalBidang - $jumlahUpload
];
}
}