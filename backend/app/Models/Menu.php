<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Menu extends Model
{
    use HasFactory;


    protected $fillable = [
        'nombre',
        'precio',
        'descripcion',
    ];

    // Relación muchos a muchos con Pedido
    public function pedidos()
    {
        return $this->belongsToMany(Pedido::class, 'pedidos_menu')
            ->withPivot('cantidad', 'notas') // Campos adicionales en la tabla pivote
            ->withTimestamps();
    }
}
