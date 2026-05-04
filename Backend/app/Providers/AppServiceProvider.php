<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Database\Schema\Blueprint;
use Doctrine\DBAL\Types\Type;
use Illuminate\Http\Response;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Register enum type for Doctrine DBAL
        if (class_exists('Doctrine\DBAL\Types\Type')) {
            if (!Type::hasType('enum')) {
                Type::addType('enum', 'Doctrine\DBAL\Types\StringType');
            }
        }

        // Add CORS headers to all responses
        Response::macro('cors', function ($content = '', $status = 200, $headers = []) {
            $corsHeaders = [
                'Access-Control-Allow-Origin' => '*',
                'Access-Control-Allow-Methods' => 'GET, POST, PUT, DELETE, OPTIONS, PATCH',
                'Access-Control-Allow-Headers' => 'Content-Type, Authorization, X-Requested-With, Accept, Origin, Cache-Control',
                'Access-Control-Max-Age' => '86400'
            ];
            
            $response = response($content, $status);
            foreach (array_merge($headers, $corsHeaders) as $key => $value) {
                $response->header($key, $value);
            }
            
            return $response;
        });
    }
}
