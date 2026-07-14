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
