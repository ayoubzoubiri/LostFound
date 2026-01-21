<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateItemRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => 'string|max:255',
            'description' => 'string',
            'type' => 'in:lost,found',
            'location' => 'string|max:255',
            'date' => 'date',
            'image' => 'image|max:2048',
        ];
    }
}
