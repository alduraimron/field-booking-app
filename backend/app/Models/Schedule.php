<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Schedule extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'date',
        'start_time',
        'end_time',
        'price',
    ];

    protected $casts = [
        'date' => 'date',
        'start_time' => 'string',
        'end_time' => 'string',
        'price' => 'integer',
        'available' => 'boolean',
    ];

    public function court(): BelongsTo
    {
        return $this->belongsTo(Court::class);
    }

    public function booking(): HasOne
    {
        return $this->hasOne(Booking::class);
    }
}
