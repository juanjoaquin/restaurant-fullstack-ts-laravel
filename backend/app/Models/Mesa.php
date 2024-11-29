<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mesa extends Model
{
    use HasFactory;

    protected $fillable = ['sillas_disponibles', 'esta_disponible', 'user_id', 'cliente_id', 'cantidad_mesas'];

    public function user() 
    {
        return $this->belongsTo(User::class); 
    }

    public function pedidos()
    {
        return $this->hasMany(Pedido::class);
    }
}
