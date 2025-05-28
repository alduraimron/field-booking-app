<?php

namespace App\Http\Controllers;

use App\Models\Court;
use App\Traits\HttpResponses;
use Illuminate\Http\Request;

class CourtController extends Controller
{
    use HttpResponses;
    /**
     * Display a listing of the resource.
     */
    public function index(int $field_id)
    {
        $courts = Court::where('field_id', $field_id)->get();

        return $this->success([$courts]);
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
    public function store(Request $request)
    {
        //
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
