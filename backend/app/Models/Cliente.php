<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cliente extends Model
{
    use HasFactory;

    protected $fillable = ['nombre', 'telefono', 'cantidad_personas'];

    public function pedidos()
    {
        return $this->hasMany(Pedido::class);
    }

    public function mesas()
    {
        return $this->hasMany(Mesa::class);
    }
}
