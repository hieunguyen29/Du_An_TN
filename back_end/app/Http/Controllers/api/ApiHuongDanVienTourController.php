<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\HuongDanVienTour;
use App\Models\TourModel;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\DB;



class ApiHuongDanVienTourController extends Controller
{
    // lọc ra những id hướng dẫn viên chưa có tour đó 
    public function store(Request $request)
    {
        $startDate = $request->input('start_date');
        $endDate = $request->input('end_date');
        $id_tour = $request->input('id_tour');
        // Tạo một đối tượng Carbon từ ngày bắt đầu
        $currentDate = \Carbon\Carbon::parse($startDate);
        // Khởi tạo mảng để lưu trữ các ngày
        $dateArray = [];
        // Lặp qua từng ngày trong khoảng thời gian và thêm vào mảng
        while ($currentDate <= \Carbon\Carbon::parse($endDate)) {
            $dateArray[] = $currentDate->toDateString();
            $currentDate->addDay();
        }

        $isresult = DB::table('hdv_tour')
            ->where('start_date', $startDate)
            ->where('end_date', $endDate)
            ->where('tour_id',$id_tour)
            ->get();

        $result = DB::table('hdv_tour')
            ->whereNotIn('start_date', $dateArray)
            ->whereNotIn('end_date', $dateArray)
            ->get();

        $results = DB::table('hdv_tour')->get();
        // tất cả hướng dẫn viên
        $permissions = User::whereHas('roles', function ($query) {
            $query->where('name', 'huong_dan_vien');
        })->with('roles', 'roles.permissions')->get();

        $matchedPermissions = [];
        $matchedRecords  = [];
        foreach ($result as $hdv) {
            $hdvId = $hdv->hdv_id;
            foreach ($permissions as $user) {
                if ($user->id == $hdvId) {
                    $matchedPermissions[] = $user;
                }
            }
        }
        $is_array = [];
        foreach ($permissions as $item) {
            foreach ($isresult as $is) {
                if ($is->hdv_id == $item->id) {
                    $is_array[] = $item;
                }
            }
        }
        foreach ($permissions as $user) {
            $found = false;
            foreach ($results as $hdv) {
                if ($user->id == $hdv->hdv_id) {
                    $found = true;
                    break;
                }
            }
            if (!$found) {
                $matchedRecords[] = $user;
            }
        }

        $uniquePermissions = array_unique($matchedPermissions);
        $matchedRecords  = array_unique($matchedRecords);
        $hdv_abc = collect($uniquePermissions)->concat($matchedRecords)->unique()->all();

        return response()->json([
            'hdv_duoc_chon'=>$is_array,
            'hdv_abc' => $hdv_abc,
        ]);
    }

    public function handleHuongDanVien(Request $request)
    {
        $id_tour = $request->input('id');
        $id_hdv = $request->input('selectedValue');
        $start_date = $request->input('lichKhoiHanh');
        $end_date = $request->input('ngayKetThuc');
        // kiểm tra nếu có thì xóa đi sau đó mới thêm vào 
        DB::table('hdv_tour')
            ->where('start_date', $start_date)
            ->where('end_date', $end_date)
            ->where('tour_id', $id_tour)
            ->delete();

        DB::table('hdv_tour')->insert([
            'tour_id' => $id_tour,
            'hdv_id' => $id_hdv,
            'start_date' => $start_date,
            'end_date' => $end_date
        ]);


        return response()->json(['message' => "Thêm thành công"]);
    }
    public function allHuongDanVienTOur()
    {
        $hdv_tour =  HuongDanVienTour::all();

        return response()->json(['hdv' => $hdv_tour]);
    }

    // list huong dan vien
    public function getListHDVTour(){
        $user = Auth::user();
        if($user){
            $hdvTour = HuongDanVienTour::where('hdv_id', $user->id)->get();
            $hdvTours = [];
           
            foreach($hdvTour as $tourhdv){
                $tour = TourModel::where('id', $tourhdv->tour_id)->first();
                $tourhdv->ten_tour = $tour->ten_tour; // Thêm trường "ten_tour" vào đối tượng $tourhdv
                $tourhdv->lich_khoi_hanh = $tour->lich_khoi_hanh;
                $tourhdv->ngay_ket_thuc = $tour->ngay_ket_thuc;
                $tourhdv->ten_hdv = $user->name;
                $hdvTours[] = $tourhdv;
            }
          
            return response()->json(['hdvtour' => $hdvTours], 200);
        }
    }

    public function updateStatustourhdv($id)
    {
        $updateStatus = HuongDanVienTour::find($id);
        // dd($updateStatus->status);
        if($updateStatus->status==0){
            $updateStatus->status = 1;
            $updateStatus->save();
            return response()->json(['message'=>'Cập nhật trạng thái thành công!!'],201);
        }else if($updateStatus->status==1){
            $updateStatus->status = 0;
            $updateStatus->save();
            return response()->json(['message'=>'Cập nhật trạng thái thành công!!'],201);
        }else{
            return response()->json(['message'=>'Lỗi không thể cập nhật'],404);
        }
    }
  


}