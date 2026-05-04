<?php

return [
    'paths' => ['api/*', 'sanctum/csrf-cookie', 'login', 'logout', '*'],
    'allowed_methods' => ['*'],
    'allowed_origins' => [
        'https://ccs-department-profiling.vercel.app',
        'http://localhost:5173',
    ],
    'allowed_origins_patterns' => [
        'https://.*-vercel\.app',
        'https://ccs-department-profiling-.*\.vercel\.app',
    ],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => true,
];
