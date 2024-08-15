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
        
        $result = LoaiPhuongTienModel::withTrashed()->where('loai_phuong_tien', $request->loai_phuong_tien)->first();
    
        if ($result) {
           
            if ($result->trashed()) {
                $result->restore();
                return new LoaiPhuongTienResoure($result);
            }
    
            return response()->json([
                'message' => 'Phương tiện đã tồn tại'
            ], 404);
        } else {
            $loaiPhuongTien = LoaiPhuongTienModel::create($request->all());
    
            // Trả về thông tin vừa thêm
            return new LoaiPhuongTienResoure($loaiPhuongTien);
        }
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
        $result = LoaiPhuongTienModel::where('loai_phuong_tien', $request->loai_phuong_tien)->first();
        if ($result && $result->id !== $phuongtien->id) {
            return response()->json([
                'message' => 'Phương tiện đã tồn tại trong bảng'
            ], 404);
        } else {
            // Thực hiện cập nhật giá trị ban đầu nếu không có sự thay đổi
            if ($phuongtien->loai_phuong_tien === $request->loai_phuong_tien) {
                $phuongtien->update(['loai_phuong_tien' => $phuongtien->loai_phuong_tien]);
            } else {
                $phuongtien->update($request->all());
            }

            return new LoaiPhuongTienResoure($phuongtien);
        }
    } else {
        return response()->json([
            'message' => 'Không tìm thấy thông tin'
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