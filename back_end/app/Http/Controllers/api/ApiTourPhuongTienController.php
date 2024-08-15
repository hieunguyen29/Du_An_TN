<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\TourPhuongTienModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redis;

class ApiTourPhuongTienController extends Controller
{
    //
    public function index(){
        $tourPhuongTien=TourPhuongTienModel::all();
        return response()->json([
            'code'=>200,
            'date'=>$tourPhuongTien
        ]);

    }
    public function store(Request $request){
        $tourPhuongTien=$request->all();
        return TourPhuongTienModel::created($tourPhuongTien);
    }
    public function show(string $id){
        $tourPhuongTien=TourPhuongTienModel::find($id);
        if(!$tourPhuongTien){
            return response()->json($tourPhuongTien);
        }
        return response()->json($tourPhuongTien);
    }
    public function update(Request $request ,string $id){
        $tourPhuongTien=TourPhuongTienModel::find($id);
        if(!$tourPhuongTien){
            return response()->json([
                'message'=>'không có loại phương tiện'
            ],404);
        }
        return $tourPhuongTien->update($request->all());
    }
    public function destroy(string $id){
        $tourPhuongTien=TourPhuongTienModel::find($id);
        if(!$tourPhuongTien){
            return response()->json([
                'message'=>'không tìm thấy loại phương tiện '
            ],404);
        }
        return $tourPhuongTien->delete();
    }
}