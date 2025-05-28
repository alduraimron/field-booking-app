<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Field extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'name',
        'description',
        'address',
        'rules',
        'facilities',
    ];

    protected $casts = [
        'rules' => 'array',
        'facilities' => 'array',
    ];

    public function courts(): HasMany
    {
        return $this->hasMany(Court::class);
    }
}
