<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Restaurant extends Model
{
    protected $table = 'restaurants';
    public $incrementing = false; // because we insert ID from JSON (101..)
    protected $keyType = 'int';
    protected $fillable = ['id', 'name', 'location', 'cuisine'];

    public function orders(): HasMany
    {
        return $this->hasMany(Order::class, 'restaurant_id', 'id');
    }
}
