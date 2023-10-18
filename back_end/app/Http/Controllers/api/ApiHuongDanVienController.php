<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\HuongDanVienModel;
use Illuminate\Http\Request;

class ApiHuongDanVienController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $huongdanvien = HuongDanVienModel::all();
        return response()->json([
            'code'=>200,
            'data'=> $huongdanvien
        ]);
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    { 
        $huongdanvien= $request->all();
        //
         
        return HuongDanVienModel::create($huongdanvien);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        $huongdanvien = HuongDanVienModel::find($id);
        if(!$huongdanvien){
            return response()->json(['message'=>'Không tìm thấy hướng dẫn viên !!'],404);
        }
        return response()->json($huongdanvien);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
        $huongdanvien = HuongDanVienModel::find($id);
        if(!$huongdanvien){
            return response()->json(['message'=>'Không tìm thấy hướng dẫn viên !!'],404);
        }
        return $huongdanvien->update($request->all());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        $huongdanvien = HuongDanVienModel::find($id);
        if(!$huongdanvien){
            return response()->json(['message'=>'Không tìm thấy hướng dẫn viên !!'],404);
        }
        return $huongdanvien->delete();
    }
}
