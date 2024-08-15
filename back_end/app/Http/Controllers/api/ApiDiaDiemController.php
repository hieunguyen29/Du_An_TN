<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\DiaDiemResoure;
use App\Models\DiaDiemModel;
use Illuminate\Http\Request;

class ApiDiaDiemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
      $diadiem = DiaDiemModel::orderBy('created_at', 'desc')->get();
      return DiaDiemResoure::collection($diadiem);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $result = DiaDiemModel::withTrashed()->where('ten_dia_diem', $request->ten_dia_diem)->first();
        if ($result) {
            if ($result->trashed()) {
                $result->restore();
                 $result->update($request->all());
                return new DiaDiemResoure($result); 
            }
            return response()->json([
                'message' => 'Địa Điểm đã tồn tại'
            ], 404);
        } else {
            $diadiem = DiaDiemModel::create($request->all());
    
            $diadiemList = DiaDiemModel::orderBy('created_at', 'desc')->get();
             $diadiemList->prepend($diadiem);

        // Trả về danh sách địa điểm đã cập nhật
        return DiaDiemResoure::collection($diadiemList);
        }
    }   

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $diadiem = DiaDiemModel::find($id);
        if ($diadiem) {
            return new DiaDiemResoure($diadiem);
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

    $diadiem = DiaDiemModel::find($id);
    if ($diadiem) {
        $result = DiaDiemModel::where('ten_dia_diem', $request->ten_dia_diem)->first();
        if ($result && $result->id !== $diadiem->id) {
            return response()->json([
                'message' => 'Địa Điểm đã tồn tại trong bảng'
            ], 404);
        } else {
            $diadiem->update($request->all());
            return new DiaDiemResoure($diadiem);
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
        $diadiem = DiaDiemModel::find($id);
        if ($diadiem) {
          $diadiem->delete();
          return  response()->json([
            'message' => 'Xóa Thành Công '
        ], 201);
        } else {
            return  response()->json([
                'message' => 'Không tìm thấy thong tin'
            ], 404);
        }
    }
}