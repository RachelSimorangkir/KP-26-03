<?php

namespace App\Filters;

use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use CodeIgniter\Filters\FilterInterface;

class Cors implements FilterInterface
{
    public function before(
        RequestInterface $request,
        $arguments = null
    ) {
        header(
            'Access-Control-Allow-Origin: *'
        );

        header(
            'Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization'
        );

        header(
            'Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS'
        );

        if ($request->getMethod() === 'OPTIONS') {
            exit();
        }
    }

    public function after(
        RequestInterface $request,
        ResponseInterface $response,
        $arguments = null
    ) {
    }
}