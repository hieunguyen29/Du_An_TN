<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\LichTrinhModel;
use Illuminate\Http\Request;
use Carbon\Carbon;

class ApiLichTrinhController extends Controller
{
    //
    public function index()
    {
        $lichtrinh = LichTrinhModel::all();
        return response()->json([
            'code' => 200,
            'date' => $lichtrinh
        ]);
    }
    public function show(string $id)
    {
        $lichtrinh = LichTrinhModel::find($id);

        if (!$lichtrinh) {
            return response()->json(['message' => 'Không tìm thấy đối tượng LoaiTourModel'], 404);
        }

        return response()->json($lichtrinh);
    }
    public function store(Request $request)
    {
        $thoi_gian = Carbon::parse($request->thoi_gian)->format('Y-m-d');
        $requestData = $request->all();
        $requestData['thoi_gian'] = $thoi_gian;

        // Tìm xem có lịch trình nào có thời gian giống nhau không
        $existingLichTrinh = LichTrinhModel::where('thoi_gian', $thoi_gian)->first();

        if ($existingLichTrinh) {
            // Nếu đã tồn tại lịch trình có thời gian giống nhau, thì cập nhật dữ liệu của lịch trình đó
            $existingLichTrinh->update($requestData);
            return response()->json(['message' => 'Đã cập nhật lịch trình'], 200);
        } else {
            // Nếu không có lịch trình nào có thời gian giống nhau, tạo lịch trình mới
            $newLichTrinh = LichTrinhModel::create($requestData);
            return response()->json(['message' => 'Đã tạo mới lịch trình'], 201);
        }
    }

    public function update(Request $request, string $id)
    {
        $lichtrinh = LichTrinhModel::find($id);

        if (!$lichtrinh) {
            return response()->json(['message' => 'Không tìm thấy lịch trình'], 404);
        }

        // Cập nhật dữ liệu của lịch trình dựa trên request được gửi đến
        $thoi_gian = Carbon::parse($request->thoi_gian)->format('Y-m-d');
        $requestData = $request->all();
        $requestData['thoi_gian'] = $thoi_gian;

        $lichtrinh->update($requestData);

        return response()->json(['message' => 'Đã cập nhật lịch trình'], 200);
    }
    public function delete(string $id)
    {
        $lichtrinh = LichTrinhModel::find($id);

        if (!$lichtrinh) {
            return response()->json(['message' => 'Không tìm thấy lịch trình'], 404);
        }

        $lichtrinh->delete();

        return response()->json(['message' => 'Đã xóa lịch trình'], 200);
    }

    public function updateStatusSchedule($id){
        $schedule = LichTrinhModel::find($id);
        if($schedule->status==1){
            $schedule->status=0;
            $schedule->save();
            return response()->json(['message'=>'Ẩn lịch trình thành công !!'],200);
        }else{
            $schedule->status=1;
            $schedule->save();  
            return response()->json(['message'=>'Hiện lịch trình thành công !!'],200);
        }
        return response()->json(['message'=>'lỗi không thể thay đổi trạng thái '],404);
     
    }
}
