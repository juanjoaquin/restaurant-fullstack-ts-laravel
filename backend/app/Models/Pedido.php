<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pedido extends Model
{
    use HasFactory;

    protected $fillable = ['mesa_id', 'user_id', 'cliente_id', 'esta_pagado'];

    public function mesa()
    {
        return $this->belongsTo(Mesa::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function cliente()
    {
        return $this->belongsTo(Cliente::class);
    }

    public function pagos()
    {
        return $this->hasMany(Pago::class);
    }

    public function menus()
    {
        return $this->belongsToMany(Menu::class, 'pedidos_menu')
            ->withPivot('cantidad', 'notas') // Campos adicionales en la tabla pivote
            ->withTimestamps();
    }
}
