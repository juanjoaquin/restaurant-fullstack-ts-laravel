<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pago extends Model
{
    use HasFactory;

    protected $fillable = ['monto', 'metodo_pago', 'pedido_id'];


    public function pedido()
    {
        return $this->belongsTo(Pedido::class);
    }
}
