<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Item;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\StoreItemRequest;
use App\Http\Requests\UpdateItemRequest;

class ItemController extends Controller
{
    public function index(Request $request)
    {
        $query = Item::with('user:id,name');

        if ($request->type) { $query->where('type', $request->type);}

        if ($request->location) { $query->where('location', 'like', '%' . $request->location . '%');}

        $items = $query->orderBy('created_at', 'desc')->get();

        return response()->json(['data' => $items]); 
    }

    public function store(StoreItemRequest $request)
    {
        $imagePath = $request->file('image')->store('items', 'public');

        $item = $request->user()->items()->create([
            'title' => $request->title,
            'description' => $request->description,
            'type' => $request->type,
            'location' => $request->location,
            'date' => $request->date,
            'image' => $imagePath,
        ]);

        return response()->json($item, 201);
    }

    public function show(Item $item)
    {
        return response()->json($item->load('user:id,name'));
    }

    public function update(UpdateItemRequest $request, Item $item)
    {
        if ($item->user_id !== $request->user()->id ) { return response()->json(['message' => 'Not authorized'], 403); }

        $data = $request->only(['title', 'description', 'type', 'location', 'date']);

        if ($request->hasFile('image')) {
            Storage::disk('public')->delete($item->image);
            $data['image'] = $request->file('image')->store('items', 'public');
        }

        $item->update($data);

        return response()->json($item);
    }

    public function destroy(Request $request, Item $item)
    {
        if ($item->user_id !== $request->user()->id ) {
            return response()->json(['message' => 'Not authorized'], 403);
        }

        Storage::disk('public')->delete($item->image);
        $item->delete();

        return response()->json(['message' => 'Item deleted']);
    }

    public function myItems(Request $request)
    {
        $items = $request->user()->items()->orderBy('created_at', 'desc')->get();

        return response()->json($items);
    }
}
