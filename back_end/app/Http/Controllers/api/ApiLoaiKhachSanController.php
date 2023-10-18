<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Resources\LoaiKhachSanResoure;
use App\Models\LoaiKhachSanModel;

use Illuminate\Http\Request;

class ApiLoaiKhachSanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // lấy ra toàn bộ danh sách
        $khachsan = LoaiKhachSanModel::all();
        // trả về danh sách dưới dạng json

        return LoaiKhachSanResoure::collection($khachsan);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // tạo loại phương tiện mới
        $khachsans = LoaiKhachSanModel::create($request->all());
        // trả về thông tin vừa thêm
        return new LoaiKhachSanResoure($khachsans);
    }

    /**
     * Display the specified resource.
     */
    //sửa
    public function show(string $id)
    {
        $khachsan = LoaiKhachSanModel::find($id);
        if ($khachsan) {
            return new LoaiKhachSanResoure($khachsan);
        } else {
            return  response()->json([
                'message' => 'Không tìm thấy thong tin'
            ], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $khachsan = LoaiKhachSanModel::find($id);
        if ($khachsan) {
            $khachsan->update($request->all());
            return new LoaiKhachSanResoure($khachsan);
        } else {
            return  response()->json([
                'message' => 'Không tìm thấy thông tin'
            ], 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $khachsan = LoaiKhachSanModel::find($id);
        if ($khachsan) {
            $khachsan->delete();
            return  response()->json([
                'message' => 'Xóa Thành Công'
            ], 201);
        } else {
            return  response()->json([
                'message' => 'Không tìm thấy thông tin'
            ], 404);
        }
    }
}
