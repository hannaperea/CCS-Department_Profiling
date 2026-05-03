<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Database\Schema\Blueprint;
use Doctrine\DBAL\Types\Type;

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
    }
}
