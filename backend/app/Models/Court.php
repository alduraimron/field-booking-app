<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Court extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'name',
        'description',
        'image_id',
    ];

    public function field():BelongsTo
    {
        return $this->belongsTo(Field::class);
    }

    public function schedules(): HasMany
    {
        return $this->hasMany(Schedule::class);
    }
}
