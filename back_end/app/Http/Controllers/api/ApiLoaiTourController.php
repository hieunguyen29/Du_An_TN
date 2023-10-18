<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\LoaiTourModel;
use Illuminate\Http\Request;
// {
        
//     "ten_tour": "tour 1",
//     "diem_di":"ha noi",
//     "diem_den":"ho chi minh",
//     "lich_khoi_hanh":"2023-10-08",
//     "thoi_gian":"6 ngày",
//     "diem_khoi_hanh":"ha noi",
//     "anh":"hinh/1.jpg",
//     "soluong":"1",
//     "trang_thai":0,
//     "ma_loai_tour":1,
//     "ma_hdv":1
// }
class ApiLoaiTourController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $loaiTour = LoaiTourModel::all();
        return response()->json([
            'code' => 200,
            'data' => $loaiTour
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $loaiTour = $request->all();
        return LoaiTourModel::create($loaiTour);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {

        $loaiTourModel = LoaiTourModel::find($id);

        if (!$loaiTourModel) {
            return response()->json(['message' => 'Không tìm thấy đối tượng LoaiTourModel'], 404);
        }

        return response()->json($loaiTourModel);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request,string $id)
    {
        //
        $loaiTourModel = LoaiTourModel::find($id);
        if (!$loaiTourModel) {
            return response()->json(['message' => 'Không tìm thấy đối tượng LoaiTourModel'], 404);
        }
        return $loaiTourModel->update($request->all());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        $loaiTourModel = LoaiTourModel::find($id);
        if (!$loaiTourModel) {
            return response()->json(['message' => 'Không tìm thấy đối tượng LoaiTourModel'], 404);
        }
        return $loaiTourModel->delete();
    }
}
