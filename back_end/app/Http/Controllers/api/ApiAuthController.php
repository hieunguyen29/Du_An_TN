<?php

namespace App\Http\Controllers\Api;

use App\Http\Resources\UserResources;
use Illuminate\Http\Request;
use App\Models\UsersModel;

use App\Models\User;
use App\Mail\RegisterUser;
use App\Http\Controllers\Controller;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class ApiAuthController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $user = User::all();
        return response()->json([
            'code' => 200,
            'data' => $user
        ]);
    }
    public function registers(Request $request)
    {

        if ($request->hasFile('hinh') && $request->file('hinh')->isValid()) {
            $imagePath = uploadFile('hinh', $request->file('hinh'));
        } else {
            return response()->json(['error' => 'Invalid file or file upload failed'], 500);
        }

        $user = User::create([
            'name' => $request->name,
            'image' => $imagePath,
            'dia_chi' => $request->dia_chi,
            'email' => $request->email,
            'sdt' => $request->sdt,
            'cccd' => $request->cccd,
            'password' => Hash::make($request->password),
        ]);

        // Gán vai trò cho tài khoản đăng ký
        $role = Role::where('name', 'khach_hang')->where('guard_name', 'web')->first();
        $user->roles()->sync([$role->id]);
        Mail::to($user->email)->send(new RegisterUser($user));

        return response()->json(['message' => 'Đăng ký tài khoản thành công!!']);
    }
    public function edit_information(Request $request)
    {
        $userId = Auth::id();
        $user = User::where('id', $userId)->first();
        if ($request->hasFile('hinh') && $request->file('hinh')->isValid()) {
            $imagePath = uploadFile('hinh', $request->file('hinh'));
        } else {
            return response()->json(['error' => 'Invalid file or file upload failed'], 500);
        }
        $success = $user->update([
            'name' => $request->name,
            'image' => $imagePath,
            'dia_chi' => $request->dia_chi,
            'email' => $request->email,
            'sdt' => $request->sdt,
            'cccd' => $request->cccd,
        ]);

        if ($success) {
            return response()->json([
                'message' => 'Thay đổi password thành công'
            ], 200);
        } else {
            return response()->json([
                'message' => 'Không thể cập nhật password'
            ], 500);
        }


        return response()->json(['data' => $user], 200);
    }
    ///////
    public function updateUser(Request $request)
    {
        $user = User::find($request->input('id'));
        if (!$user) {
            return response()->json([
                'message' => 'Người dùng không tồn tại',
            ], 404);
        }
    
        $user->update([
            'name' => $request->input('name'),
            'dia_chi' => $request->input('dia_chi'),
            'email' =>  $request->input('email'),
            'sdt' => $request->input('sdt'),
            'cccd' => $request->input('cccd'),
        ]);
    
        return response()->json([
            'message' => 'Thông tin người dùng đã được cập nhật.',
            'data' => $user
        ]);
    }
}
