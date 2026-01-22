<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Item;
use Illuminate\Http\Request;
use App\Http\Requests\UpdateItemStatusRequest;

class AdminController extends Controller
{
    
    public function updateStatus(UpdateItemStatusRequest $request, Item $item)
    {
        $item->update($request->validated());

        return response()->json($item);
    }

    public function deleteItem(Item $item)
    {
        $item->delete();

        return response()->json(['message' => 'Item deleted successfully']);
    }
}
