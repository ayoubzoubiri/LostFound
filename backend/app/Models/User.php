<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory;

    // Fields that can be filled
    protected $fillable = ['name', 'email', 'password', 'role'];

    // Fields hidden from JSON
    protected $hidden = ['password', 'remember_token'];

    // Auto hash password
    protected $casts = [
        'password' => 'hashed',
    ];

    // User has many items
    public function items()
    {
        return $this->hasMany(Item::class);
    }

    // Check if user is admin
    public function isAdmin()
    {
        return $this->role === 'admin';
    }
}
