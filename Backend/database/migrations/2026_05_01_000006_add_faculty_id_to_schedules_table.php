<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Only add the foreign key if both tables exist
        if (Schema::hasTable('schedules') && Schema::hasTable('faculty')) {
            Schema::table('schedules', function (Blueprint $table) {
                if (!Schema::hasColumn('schedules', 'faculty_id')) {
                    $table->foreignId('faculty_id')->nullable()->after('room_id')->constrained('faculty');
                }
            });
        }
    }

    public function down(): void
    {
        if (Schema::hasTable('schedules') && Schema::hasColumn('schedules', 'faculty_id')) {
            Schema::table('schedules', function (Blueprint $table) {
                $table->dropForeign(['faculty_id']);
                $table->dropColumn('faculty_id');
            });
        }
    }
};
