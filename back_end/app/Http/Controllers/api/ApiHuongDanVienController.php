<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Mail\RegisterHuongDanVien;
use App\Models\HuongDanVienModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Mail;

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
            'code' => 200,
            'data' => $huongdanvien
        ]);
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'ten_hd' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:huong_dan_vien'],
            'dia_chi' => ['required', 'string', 'max:255'],
            'sdt' => ['required', 'string', 'max:255'],
        ]);

        $password = Str::random(10);

        $huongdanvien =  HuongDanVienModel::create([
            'ten_hd'     => $request->get('ten_hd'),
            'email'    => $request->get('email'),
            'password' => Hash::make($password),
            'dia_chi' => $request->get('dia_chi'),
            'sdt' => $request->get('sdt')
        ]);

        Mail::to($huongdanvien->email)->send(new RegisterHuongDanVien($huongdanvien, $password));
        return response()->json(['message' => 'Đăng ký tài khoản thành công!!']);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        $huongdanvien = HuongDanVienModel::find($id);
        if (!$huongdanvien) {
            return response()->json(['message' => 'Không tìm thấy hướng dẫn viên !!'], 404);
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
        if (!$huongdanvien) {
            return response()->json(['message' => 'Không tìm thấy hướng dẫn viên !!'], 404);
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
        if (!$huongdanvien) {
            return response()->json(['message' => 'Không tìm thấy hướng dẫn viên !!'], 404);
        }
        return $huongdanvien->delete();
    }

    // public function testMail(){
    //     Mail::to('namntph26026@fpt.edu.vn')->send(new RegisterHuongDanVien('namntph26026'));
    //     return response()->json(['message' => 'Đăng kí tài khoản thành công !!']);
    // }
}
