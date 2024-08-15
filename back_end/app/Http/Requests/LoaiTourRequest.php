<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LoaiTourRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules()
    {
        return [
            'ten_loai_tour' => 'required|unique:loai_tour,ten_loai_tour,' . $this->route('id'),
            // Các quy tắc khác...
        ];
    }
    public function validationData()
    {
        return array_merge($this->all(), [
            'id' => $this->route('id'),
        ]);
    }
    public function messages(): array
    {
        return [
            'ten_loai_tour.unique' => 'Tên loai đã tồn tại!!',
        ];
    }
}
