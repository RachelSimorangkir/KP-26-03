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
$routes->post(
    'api/pengajuan',
    'PengajuanController::create'
);
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