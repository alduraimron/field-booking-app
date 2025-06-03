<?php

return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'],

    'allowed_methods' => ['*'],

    'allowed_origins' => ['http://localhost:5173', 'http://192.168.1.14:5173', 'seport-alb-469424020.us-east-1.elb.amazonaws.com'], // Jangan pakai '*'

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => false, // Ubah ke true kalau pakai cookie auth
];

