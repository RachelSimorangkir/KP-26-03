<?php

namespace App\Filters;

use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use CodeIgniter\Filters\FilterInterface;

class Cors implements FilterInterface
{
public function before(RequestInterface $request, $arguments = null)
{
    $response = service('response');

    $response->setHeader('Access-Control-Allow-Origin', '*');
    $response->setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    $response->setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, DELETE, OPTIONS'
    );

    if ($request->getMethod() === 'OPTIONS') {
        return $response->setStatusCode(200);
    }

    return null;
}

    public function after(
        RequestInterface $request,
        ResponseInterface $response,
        $arguments = null
    ) {
    }
}