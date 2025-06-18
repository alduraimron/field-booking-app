<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'Admin User',
                'password' => Hash::make('password'),
                'role' => 'admin',
            ]
        );
        User::updateOrCreate(
            ['email' => 'guest@example.com'],
            [
                'name' => 'Guest User',
                'password' => Hash::make('password'), // Ganti dengan password yang kuat
                'role' => 'user', // Ini yang penting!
            ]
        );
    }
}
