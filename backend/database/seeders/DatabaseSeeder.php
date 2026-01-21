<?php

namespace Database\Seeders;

use App\Models\Item;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Create admin user
        $admin = User::create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
        ]);

        // Create regular users
        $users = User::factory(5)->create();

        // Create items for users
        foreach ($users as $user) {
            Item::factory(3)->create(['user_id' => $user->id]);
        }

        // Create some items for admin
        Item::factory(2)->create(['user_id' => $admin->id]);
    }
}
