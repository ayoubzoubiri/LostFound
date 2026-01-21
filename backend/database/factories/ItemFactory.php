<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ItemFactory extends Factory
{
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'title' => fake()->sentence(3),
            'description' => fake()->paragraph(),
            'type' => fake()->randomElement(['lost', 'found']),
            'location' => fake()->randomElement(['Library', 'Cafeteria', 'Main Hall', 'Parking Lot', 'Classroom A', 'Gym']),
            'date' => fake()->dateTimeBetween('-30 days', 'now'),
            'image' => 'items/' . fake()->uuid() . '.jpg',
            'status' => fake()->randomElement(['active', 'resolved']),
        ];
    }

    public function lost(): static
    {
        return $this->state(fn (array $attributes) => ['type' => 'lost']);
    }

    public function found(): static
    {
        return $this->state(fn (array $attributes) => ['type' => 'found']);
    }
}
