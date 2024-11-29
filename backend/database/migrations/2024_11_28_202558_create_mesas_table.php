<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('mesas', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('sillas_disponibles');
            $table->boolean('esta_disponible')->default(true);
            $table->bigInteger('cantidad_mesas')->nullable();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade'); 
            $table->foreignId('cliente_id')->nullable()->constrained('clientes')->onDelete('set null'); 
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mesas');
    }
};
