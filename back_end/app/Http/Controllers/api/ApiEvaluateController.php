<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\DatTour;
use App\Models\Evaluate;
use App\Models\LoaiTourModel;
use App\Models\TourModel;
use App\Models\User;
use Illuminate\Http\Request;

class ApiEvaluateController extends Controller
{
    //add
    public function addDanhGia(Request $request)
    {
        $user = auth()->user()->id;
        $so_sao = $request->input('so_sao');
        $id_tour = $request->input('id_tour');
        $noi_dung = $request->input('noi_dung');
        $version = $request->input('version');
        $badWords = ['cặc', 'lồn', 'buồi', 'fuck you'];
        $hasSensitiveWords = false;
        foreach ($badWords as $badWord) {
            if (stripos($noi_dung, $badWord) !== false) {
                $hasSensitiveWords = true;
                break;
            }
        }
        if (!$hasSensitiveWords) {
            $existingEvaluation = Evaluate::where('id_user', $user)
                ->where('id_tour', $id_tour)
                ->first();

            if ($existingEvaluation) {


                // Tìm version mới nhất của tour đó
                $latestVersion = Evaluate::where('id_tour', $id_tour)
                    ->max('version');


                $danhgia = Evaluate::create([
                    'id_user' => $user,
                    'so_sao' => $so_sao,
                    'id_tour' => $id_tour,
                    'noi_dung' => $noi_dung,
                    'version' => $version,
                ]);
            } else {
                // Nếu chưa có đánh giá, bạn có thể tạo mới đánh giá trong cơ sở dữ liệu
                $danhgia = Evaluate::create([
                    'id_user' => $user,
                    'so_sao' => $so_sao,
                    'id_tour' => $id_tour,
                    'noi_dung' => $noi_dung,
                    'version' => $version,
                ]);
            }

            return response()->json($danhgia, 200);
        } else {
            return response()->json(['error' => "Nội dung chứa những từ ngữ nhạy cảm "], 404);
        }
    }
    public function findDanhGia(Request $request)
    {
        $user = auth()->user()->id;
        $evaluation = Evaluate::where('id_user', $user)->get();
        $dattour = DatTour::where('trang_thai', 1)->where('ma_khach_hang', $user)->get();
        $tours = TourModel::all();
        $loaitour = LoaiTourModel::all();
        // lấy đánh giá của tour
        $result = [];
        foreach ($dattour as $item) {
            foreach ($evaluation as $as) {

                if ((int)$item->id == (int)$as->version) {
                    $item['danh_gia'] = $as; // Thêm $as vào thuộc tính "ketqua" của $item
                }
            }
            $result[] = $item; // Thêm $item vào mảng $result
        }
        // return response()->json([
            
        //     "danh_gia"=>$dattour,
        // ]);
        // lấy tên tour và các thông tin của nó 
        $newResult = [];
        foreach ($result as $res) {
            foreach ($tours as $tour) {
                if ((int)$res->id_tour === (int)$tour->id) {
                    $res['tour'] = $tour;
                }
            }
            $newResult[] = $res;
        }
        // lấy tên của các miền vào mảng $result
        $success = [];
        foreach ($result as $res) {
            foreach ($loaitour as $loai) {
                if ((int)$res['tour']->ma_loai_tour === (int)$loai->id) {
                    $res['ten_loai_tour'] = $loai;
                }
            }
            $success[] = $res;
        }


        if ($evaluation) {
            return response()->json([
                "tour" => $success,
                "danh_gia"=>$result,
            ]);
        } else {
            return response()->json(['message' => 'Chưa có đánh giá'], 404);
        }
    }
    // tính trung bình số sao của tour
    public function so_sao(Request $request)
    {
        $so_sao = $request->input('id_tour');
        $result =   Evaluate::where('id_tour', $so_sao)->avg('so_sao');
        return response()->json($result, 200);
    }
    //phần  quản lý 
    public function showDanhGia()
    {
        // id và tên khách hàng 
        $users = User::select('id', 'name')->get();
        // tên tour 
        $name_tour = TourModel::select('id', 'ten_tour')->get();
        $evaluates = Evaluate::all();
        // tạo 1 mảng rỗng 
        $result = [];
        foreach ($evaluates as $evaluate) {

            foreach ($users as $user) {
                if ($evaluate->id_user == $user->id) {
                    $result['id_user'] = $user->name;
                }
            }

            foreach ($name_tour as $tour) {
                if ($evaluate->id_tour == $tour->id) {
                    $result['id_tour'] = $tour->ten_tour;
                }
            }
            $evaluate->id_user = $result['id_user'] ?? $evaluate->id_user;
            $evaluate->id_tour = $result['id_tour'] ?? $evaluate->id_tour;
        }

        return response([
            'danhgia' => $evaluates,
        ], 200);
    }
    // delete
    public function deleteDanhGia($id)
    {
        $tourDiscount = Evaluate::find($id);

        if (!$tourDiscount) {
            return response()->json(['message' => 'Tour discount not found'], 404);
        }

        $tourDiscount->delete();

        return response()->json(['message' => 'Tour discount deleted successfully']);
    }
    // hiển thị ra dánh giá cho từng tour 
    public function showDanhGiaOnlyTour(Request $request)
    {
        $users = User::select('id', 'name', 'image')->get();
        $evaluate = Evaluate::where('id_tour', '=', $request->input('id'))->get();

        $result = [];
        foreach ($evaluate as $item) {
            foreach ($users as $user) {
                if ($user['id'] == $item['id_user']) {
                    $userDetails = [
                        'name' => $user['name'],
                        'image' => $user['image']
                    ];
                    $item['id_user'] = $userDetails;
                }
            }
            $result[] = $item;
        }

        return response()->json(['result' => $evaluate]);
    }
}
