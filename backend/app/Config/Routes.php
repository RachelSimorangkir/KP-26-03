<?php

use CodeIgniter\Router\RouteCollection;

/** @var RouteCollection $routes */
$routes->get('/', 'Home::index');
$routes->post('register', 'Auth::register');
$routes->options('login', static function () {
    return service('response')
        ->setStatusCode(200);
});
$routes->post('login', 'Auth::login');
$routes->get('pegawai', 'Pegawai::index');
$routes->get(
    'pegawai/profile/(:any)',
    'Pegawai::profile/$1'
);
$routes->get(
    'api/pegawai/(:segment)',
    'PegawaiController::getPegawaiByNip/$1'
);
$routes->options('api/(:any)', static function () {
    return service('response')->setStatusCode(200);
});
$routes->group('api', ['filter' => 'cors'], function($routes){

    $routes->post('pengajuan','PengajuanController::create');

    $routes->put('notifikasi/read/(:num)','NotifikasiController::read/$1');

    $routes->get('pegawai/(:segment)','Pegawai::getPegawaiByNip/$1');

});
$routes->options(
    'api/(:any)',
    static function () {
        return service('response')
            ->setStatusCode(200);
    }
);
$routes->get(
    'api/pengajuan',
    'PengajuanController::index'
);
$routes->post(
    'api/pengajuan/(:num)',
    'PengajuanController::updateStatus/$1'
);
$routes->get(
    'api/notifikasi/(:segment)',
    'NotifikasiController::index/$1'
);
$routes->put(
    'api/notifikasi/read/(:num)',
    'NotifikasiController::read/$1'
);

$routes->get(
    'api/pengajuan/detail/(:num)',
    'PengajuanController::detail/$1'
);
$routes->options(
    'api/notifikasi/read/(:num)',
    static function () {
        return service('response')->setStatusCode(200);
    }
);

$routes->options(
    'api/pengajuan/detail/(:num)',
    static function () {
        return service('response')->setStatusCode(200);
    }
);

$routes->options(
    'api/pengajuan/(:num)',
    static function () {
        return service('response')->setStatusCode(200);
    }
);
$routes->put(
    'api/notifikasi/read-all/(:segment)',
    'NotifikasiController::readAll/$1'
);
$routes->get('pdf/test', 'PdfController::test');
$routes->get('pdf/cuti/(:num)', 'PdfController::cuti/$1');
$routes->post(
    "api/ganti-password",
    "Auth::gantiPassword"
);

// ==========================
// BMN - PEMINJAMAN BARANG
// ==========================

$routes->group('api', ['filter' => 'cors'], function ($routes) {

    $routes->post(
        'peminjaman',
        'PeminjamanBarangController::create'
    );

    $routes->get(
        'peminjaman',
        'PeminjamanBarangController::index'
    );

    $routes->get(
        'peminjaman/(:num)',
        'PeminjamanBarangController::detail/$1'
    );

    $routes->put(
        'peminjaman/(:num)',
        'PeminjamanBarangController::updateStatus/$1'
    );
    $routes->get(
        'master-barang',
        'MasterBarangController::index'
    );
    $routes->get(
    'persediaan',
    'PersediaanController::index'
    );
    $routes->get('pemeliharaan', 'PemeliharaanController::index');
    $routes->post('pemeliharaan', 'PemeliharaanController::create');
    $routes->put('pemeliharaan/(:segment)', 'PemeliharaanController::updateStatus/$1');

    $routes->get('dbr-struktur', 'DbrStrukturController::index');
$routes->get('dbr-struktur/cari-pegawai', 'DbrStrukturController::searchPegawai');

$routes->post('dbr-struktur/eselon', 'DbrStrukturController::storeEselon');
$routes->put('dbr-struktur/eselon/(:num)', 'DbrStrukturController::updateEselon/$1');
$routes->delete('dbr-struktur/eselon/(:num)', 'DbrStrukturController::deleteEselon/$1');

$routes->post('dbr-struktur/bagian', 'DbrStrukturController::storeBagian');
$routes->put('dbr-struktur/bagian/(:num)', 'DbrStrukturController::updateBagian/$1');
$routes->delete('dbr-struktur/bagian/(:num)', 'DbrStrukturController::deleteBagian/$1');

$routes->post('dbr-struktur/bagian/(:num)/pegawai', 'DbrStrukturController::addPegawai/$1');
$routes->delete('dbr-struktur/bagian/(:num)/pegawai/(:segment)', 'DbrStrukturController::removePegawai/$1/$2');

$routes->post('dbr-struktur/bagian/(:num)/barang', 'DbrStrukturController::storeBarang/$1');
$routes->delete('dbr-struktur/barang/(:num)', 'DbrStrukturController::deleteBarang/$1');

// Barang Masuk — tambahin PUT & DELETE 
$routes->get('barang-masuk', 'BarangMasukController::index');
$routes->post('barang-masuk', 'BarangMasukController::create');
$routes->put('barang-masuk/(:num)', 'BarangMasukController::update/$1');
$routes->delete('barang-masuk/(:num)', 'BarangMasukController::delete/$1');

// Hibah Masuk 
$routes->get('hibah-masuk', 'HibahMasukController::index');
$routes->post('hibah-masuk', 'HibahMasukController::create');
$routes->put('hibah-masuk/(:num)', 'HibahMasukController::update/$1');
$routes->delete('hibah-masuk/(:num)', 'HibahMasukController::delete/$1');

// Hibah Keluar 
$routes->get('hibah-keluar', 'HibahKeluarController::index');
$routes->post('hibah-keluar', 'HibahKeluarController::create');
$routes->put('hibah-keluar/(:num)', 'HibahKeluarController::update/$1');
$routes->delete('hibah-keluar/(:num)', 'HibahKeluarController::delete/$1');

$routes->get('admin-bmn', 'AdminUserController::listAdminBmn');
});

$routes->get(
    'api/permintaan',
    'PermintaanBarangController::index'
);

$routes->post(
    'api/permintaan',
    'PermintaanBarangController::create'
);

$routes->put(
    'api/permintaan/(:num)',
    'PermintaanBarangController::update/$1'
);

$routes->get(
    'api/permintaan/(:num)',
    'PermintaanBarangController::show/$1'
);

$routes->get(
    'api/dbr/(:segment)',
    'DbrController::show/$1'
);

$routes->get('api/cuti/sisa/(:segment)', 'PengajuanController::getSisaCuti/$1');
// Routes untuk Fitur Berita
$routes->get('berita', 'BeritaController::index');
$routes->get('berita/tambah', 'BeritaController::create');
$routes->post('berita/simpan', 'BeritaController::store');
$routes->get('login', 'Auth::index');
$routes->get('login', 'LoginController::index');

// ========================================
// API ROUTES UNTUK BERITA
// ========================================
$routes->group('api', ['filter' => 'cors'], function($routes) {
    $routes->get('berita', 'BeritaController::index');
    $routes->get('berita/(:num)', 'BeritaController::show/$1');
    $routes->post('berita', 'BeritaController::create');
    $routes->put('berita/(:num)', 'BeritaController::update/$1');
    $routes->delete('berita/(:num)', 'BeritaController::delete/$1');
});

// Route untuk mengambil kategori (untuk dropdown form)
$routes->get('api/kategori', function() {
    $db = \Config\Database::connect();
    $kategori = $db->table('kategori_berita')->get()->getResult();
    
    return service('response')
        ->setStatusCode(200)
        ->setJSON([
            'status' => true,
            'message' => 'Kategori berhasil diambil',
            'data' => $kategori
        ]);
});

$routes->get('reset_password', 'AuthController::resetPassword');
$routes->post('reset_password', 'AuthController::processResetPassword');

// ========================================
// ROUTE LOGIN & AUTH (Diperbaiki untuk CORS & React)
// ========================================
$routes->options('api/login', static function () {
    return service('response')
        ->setStatusCode(200)
        ->setHeader('Access-Control-Allow-Origin', '*')
        ->setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
        ->setHeader('Access-Control-Allow-Headers', 'Content-Type');
});

$routes->post('api/login', 'Auth::login');
$routes->post('api/register', 'Auth::registerZN');
$routes->post('api/ganti-password', 'Auth::gantiPassword');

// ========================================
// API ROUTES UNTUK BERITA & LAINNYA
// ========================================
$routes->group('api', ['filter' => 'cors'], function($routes) {
    // ... route berita, peminjaman, dll tetap di sini ...
    $routes->get('berita', 'BeritaController::index');
    $routes->post('berita', 'BeritaController::create');
    
    $routes->get('kategori', function() {
        $db = \Config\Database::connect();
        $kategori = $db->table('kategori_berita')->get()->getResult();
        return service('response')->setJSON(['status' => true, 'data' => $kategori]);
    });
});

$routes->post('login-admin', 'Auth::loginAdmin');

$routes->options('login-admin', static function () {
    return service('response')
        ->setStatusCode(200)
        ->setHeader('Access-Control-Allow-Origin', '*')
        ->setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
        ->setHeader('Access-Control-Allow-Headers', 'Content-Type');
});

$routes->post('login-admin', 'Auth::loginAdmin');

$routes->get('init-password-pegawai', 'Auth::initPasswordPegawai');

// Humas
$routes->get(
    'api/berita/user/(:any)',
    'BeritaController::getByUser/$1'
);
$routes->get('api/berita/count/menunggu', 'BeritaController::countMenunggu');//untuk menghitung jumlah berita dengan status menunggu
