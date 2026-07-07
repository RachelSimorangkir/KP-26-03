<?php

namespace App\Models;

use CodeIgniter\Model;

class PengajuanModel extends Model
{
    protected $table = "pengajuan";

    protected $primaryKey = "id";

    protected $returnType = "array";

    protected $useAutoIncrement = true;

    protected $allowedFields = [

    "nip",

    "nama",

    "jabatan",

    "unit_kerja",

    "layanan",

    "status",

    "tanggal_pengajuan",

    "surat_permohonan",

    "link_drive",

    "catatan_admin",

    "file_respon",

    //====================
    // CUTI
    //====================

    "status_kepegawaian",

    "jenis_cuti",

    "alasan_cuti",

    "tanggal_mulai",

    "tanggal_selesai",

    "durasi",

    'lama_cuti',

    'satuan_cuti',

    

    "alamat_cuti",

    "no_hp"

];
    protected $useTimestamps = false;
}