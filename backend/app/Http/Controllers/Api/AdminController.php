<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Item;
use Illuminate\Http\Request;
use App\Http\Requests\UpdateItemStatusRequest;

class AdminController extends Controller
{
    // Get all items for admin
    public function items(Request $request)
    {
        $query = Item::with('user:id,name,email');

        if ($request->has('type')) {
            $query->where('type', $request->type);
        }

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        $items = $query->orderBy('created_at', 'desc')->paginate(15);

        return response()->json($items);
    }

    // Update item status
    public function updateStatus(UpdateItemStatusRequest $request, Item $item)
    {
        $item->update($request->validated());

        return response()->json($item);
    }

    // Delete item
    public function deleteItem(Item $item)
    {
        $item->delete();

        return response()->json(['message' => 'Item deleted successfully']);
    }
}
