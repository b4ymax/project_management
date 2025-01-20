<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;  // Add this import line

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@example.com', // Ensure this email is unique
            'password' => bcrypt('admin'), // Set your desired password
            'role' => 'admin', // Set role to admin
        ]);
    }
}
