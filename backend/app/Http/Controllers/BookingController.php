<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Schedule;
use App\Traits\HttpResponses;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BookingController extends Controller
{
    use HttpResponses;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $booking = Booking::where();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    // public function store(Request $request)
    // {
    //     $request->validate([
    //         'schedule_id' => 'required|exists:schedules,id',
    //     ]);
    //     $user = Auth::user();
    //     $scheduleId = $request->input('schedule_id');
    //     $schedule = Schedule::find($scheduleId);

    //     $booking = Booking::create([
    //         'user_id' => $user->id, // Menggunakan ID pengguna yang terotentikasi
    //         'schedule_id' => $scheduleId,
    //         'status' => 'confirmed', // Atau 'confirmed' tergantung alur bisnis Anda
    //     ]);

    //     // Set 'available' pada schedule menjadi f3alse
    //     $schedule->available = false;
    //     $schedule->save();
    //     return response()->json([
    //         'message' => 'Booking created successfully!',
    //         'booking' => $booking->load('user', 'schedule'), // Load relasi untuk respons
    //     ], 201);
    // }
    public function store(Request $request)
{
    $request->validate([
        'schedule_id' => 'required|exists:schedules,id',
    ]);

    $user = Auth::user();
    if (!$user) {
        return response()->json(['message' => 'Unauthorized'], 401);
    }

    $scheduleId = $request->input('schedule_id');
    $schedule = Schedule::find($scheduleId);

    if (!$schedule) {
        return response()->json(['message' => 'Schedule not found'], 404);
    }

    if (!$schedule->available) {
        return response()->json(['message' => 'Schedule not available'], 400);
    }

    $booking = Booking::create([
        'user_id' => $user->id,
        'schedule_id' => $scheduleId,
        'status' => 'confirmed',
    ]);

    $schedule->available = false;
    $schedule->save();

    return response()->json([
        'message' => 'Booking created successfully!',
        'booking' => $booking->load('user', 'schedule'),
    ], 201);
}

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
