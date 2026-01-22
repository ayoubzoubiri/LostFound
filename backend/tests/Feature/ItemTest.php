<?php

namespace Tests\Feature;

use App\Models\Item;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ItemTest extends TestCase
{
    use RefreshDatabase;

    public function test_items(): void
    {
        $user = User::factory()->create();
        Item::factory()->count(5)->create(['user_id' => $user->id]);

        $response = $this->getJson('/api/items');

        $response->assertStatus(200)
            ->assertJsonStructure(['data']);
    }

    public function test_create_item(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->postJson('/api/items', [
            'title' => 'Lost Wallet',
            'description' => 'Black leather wallet',
            'type' => 'lost',
            'location' => 'Library',
            'date' => '2024-01-15',
        ]);

        $response->assertStatus(201);
        $this->assertDatabaseHas('items', ['title' => 'Lost Wallet']);
    }



    public function test_update_item(): void
    {
        $user = User::factory()->create();
        $item = Item::factory()->create(['user_id' => $user->id]);

        $response = $this->actingAs($user)->putJson("/api/items/{$item->id}", [
            'status' => 'resolved',
        ]);

        $response->assertStatus(200);
        $this->assertDatabaseHas('items', ['id' => $item->id, 'status' => 'resolved']);
    }


    public function test_delete_item(): void
    {
        $user = User::factory()->create();
        $item = Item::factory()->create(['user_id' => $user->id]);

        $response = $this->actingAs($user)->deleteJson("/api/items/{$item->id}");

        $response->assertStatus(200);
        $this->assertDatabaseMissing('items', ['id' => $item->id]);
    }


}
