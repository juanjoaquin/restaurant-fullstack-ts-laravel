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
        Schema::create('pedidos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('mesa_id')->constrained()->onDelete('cascade'); // Relación con la mesa
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // Relación con el mozo
            $table->foreignId('cliente_id')->nullable()->constrained()->onDelete('set null'); // Relación con cliente (opcional)
            $table->boolean('esta_pagado')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pedidos');
    }
};
