<?php

namespace App\Models;

use CodeIgniter\Model;

class BeritaModel extends Model
{
    protected $table            = 'berita';
    protected $primaryKey       = 'id';
    protected $useAutoIncrement = true;
    protected $returnType       = 'array';
    protected $useSoftDeletes   = false;
    
    // Field yang boleh diisi/diubah
    protected $allowedFields    = [
        'user_id', 'nip_pengusul', 'nama_pengusul', 'satuan_kerja',
        'judul', 'slug', 'kategori_id', 'tanggal_kegiatan', 'lokasi_kegiatan', 
        'isi_berita', 'foto_utama', 'status', 'catatan_admin', 
        'tanggal_terbit', 'kanal_publikasi', 'viewed_count', 'edited_by_admin',
        'submitted_at', 'approved_at', 'published_at'
    ];

    // Fungsi untuk mengambil semua berita beserta nama kategorinya
    public function getBeritaWithKategori()
    {
        return $this->select('berita.*, kategori_berita.nama_kategori')
                    ->join('kategori_berita', 'kategori_berita.id = berita.kategori_id', 'left')
                    ->orderBy('berita.created_at', 'DESC')
                    ->findAll();
    }

    // Fungsi untuk mencari 1 berita berdasarkan ID
    public function getBeritaById($id)
    {
        return $this->find($id);
    }
}