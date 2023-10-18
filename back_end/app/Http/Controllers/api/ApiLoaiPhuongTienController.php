<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Resources\LoaiPhuongTienResoure;
use App\Models\LoaiPhuongTienModel;
use Illuminate\Http\Request;

class ApiLoaiPhuongTienController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // lấy ra toàn bộ danh sách
        $phuongtien = LoaiPhuongTienModel::all();
        // trả về danh sách dưới dạng json
        return LoaiPhuongTienResoure::collection($phuongtien);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // tạo loại phương tiện mới
        $student = LoaiPhuongTienModel::create($request->all());
        // trả về thông tin vừa thêm
        return new LoaiPhuongTienResoure($student);
    }

    /**
     * Display the specified resource.
     */
    //sửa
    public function show(string $id)
    {
        $phuongtien = LoaiPhuongTienModel::find($id);
        if ($phuongtien) {
            return new LoaiPhuongTienResoure($phuongtien);
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
        $phuongtien = LoaiPhuongTienModel::find($id);
        if ($phuongtien) {
            $phuongtien->update($request->all());
            return new LoaiPhuongTienResoure($phuongtien);
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
        $phuongtien = LoaiPhuongTienModel::find($id);
        if ($phuongtien) {
            $phuongtien->delete();
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
