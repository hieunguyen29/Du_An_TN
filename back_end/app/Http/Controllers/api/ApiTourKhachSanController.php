<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Resources\TourKhachSanResoure;
use App\Models\TourKhachSanModel;

use Illuminate\Http\Request;

class ApiTourKhachSanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // lấy ra toàn bộ danh sách
        $tourkhachsan = TourKhachSanModel::all();
        // trả về danh sách dưới dạng json

        return TourKhachSanResoure::collection($tourkhachsan);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // tạo loại phương tiện mới
        $tourkhachsan = TourKhachSanModel::create($request->all());
        // trả về thông tin vừa thêm
        return new TourKhachSanResoure($tourkhachsan);
    }

    /**
     * Display the specified resource.
     */
    //sửa
    public function show(string $id)
    {
        $tourkhachsan = TourKhachSanModel::find($id);
        if ($tourkhachsan) {
            return new TourKhachSanResoure($tourkhachsan);
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
        $tourkhachsan = TourKhachSanModel::find($id);
        if ($tourkhachsan) {
            $tourkhachsan->update($request->all());
            return new TourKhachSanResoure($tourkhachsan);
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
        $tourkhachsan = TourKhachSanModel::find($id);
        if ($tourkhachsan) {
            $tourkhachsan->delete();
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
