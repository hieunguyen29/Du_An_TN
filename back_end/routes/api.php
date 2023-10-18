<?php

use App\Http\Controllers\Api\ApiHuongDanVienController;
use App\Http\Controllers\Api\ApiLoaiTourController;
use App\Http\Controllers\Api\ApiLoaiPhuongTienController;
use App\Http\Controllers\Api\ApiDiaDiemController;
use App\Http\Controllers\api\ApiLichTrinhController;
use App\Http\Controllers\Api\ApiTourController;
use App\Http\Controllers\api\ApiTourPhuongTienController;
use App\Models\LoaiTourModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//api phương tiện
Route::prefix('admin')->group(function () {
    Route::prefix('phuongtien')->group(function () {
        Route::get('/', [ApiLoaiPhuongTienController::class, 'index']); // lấy ra danh sách
        Route::post('/', [ApiLoaiPhuongTienController::class, 'store']); //  thêm 1 phương tiện mới
        Route::get('/{id}', [ApiLoaiPhuongTienController::class, 'show']); // lấy ra  id muốn sửa
        Route::put('/{id}', [ApiLoaiPhuongTienController::class, 'update']); // sủa theo id
        Route::delete('/{id}', [ApiLoaiPhuongTienController::class, 'destroy']); // xóa theo id
    });
    Route::prefix('loaitour')->group(function () {
        Route::get('/', [ApiLoaiTourController::class, 'index']);
        Route::post('/', [ApiLoaiTourController::class, 'store']);
        Route::get('/{id}', [ApiLoaiTourController::class, 'show']);
        Route::put('/{id}', [ApiLoaiTourController::class, 'update']);
        Route::delete('/{id}', [ApiLoaiTourController::class, 'destroy']);
    });
    Route::prefix('huongdanvien')->group(function () {
        Route::get('/', [ApiHuongDanVienController::class, 'index']);
        Route::post('/', [ApiHuongDanVienController::class, 'store']);
        Route::get('/{id}', [ApiHuongDanVienController::class, 'show']);
        Route::put('/{id}', [ApiHuongDanVienController::class, 'update']);
        Route::delete('/{id}', [ApiHuongDanVienController::class, 'destroy']);
    });
    Route::prefix('diadiem')->group(function () {
        Route::get('/', [ApiDiaDiemController::class, 'index']);
        Route::post('/', [ApiDiaDiemController::class, 'store']);
        Route::get('/{id}', [ApiDiaDiemController::class, 'show']);
        Route::put('/{id}', [ApiDiaDiemController::class, 'update']);
        Route::delete('/{id}', [ApiDiaDiemController::class, 'destroy']);
    });
    Route::prefix('tour')->group(function () {
        Route::get('/', [ApiTourController::class, 'index']);
        Route::post('/', [ApiTourController::class, 'store']);
        Route::get('/{id}', [ApiTourController::class, 'show']);
        Route::put('/{id}', [ApiTourController::class, 'update']);
        Route::delete('/{id}', [ApiTourController::class, 'destroy']);
    });
    //api khách sạn
    Route::prefix('khachsan')->group(function () {
        Route::get('/', [ApiLoaiKhachSanController::class, 'index']); // lấy ra danh sách
        Route::post('/', [ApiLoaiKhachSanController::class, 'store']); //  thêm 1 khách sạn mới
        Route::get('/{id}', [ApiLoaiKhachSanController::class, 'show']); // lấy ra  id muốn sửa
        Route::put('/{id}', [ApiLoaiKhachSanController::class, 'update']); // sủa theo id
        Route::delete('/{id}', [ApiLoaiKhachSanController::class, 'destroy']); // xóa theo id
    });
    //api Tour khách sạn
    Route::prefix('tourkhachsan')->group(function () {
        Route::get('/', [ApiTourKhachSanController::class, 'index']); // lấy ra danh sách
        Route::post('/', [ApiTourKhachSanController::class, 'store']); //  thêm 1 tour khách sạn mới
        Route::get('/{id}', [ApiTourKhachSanController::class, 'show']); // lấy ra  id muốn sửa
        Route::put('/{id}', [ApiTourKhachSanController::class, 'update']); // sủa theo id
        Route::delete('/{id}', [ApiTourKhachSanController::class, 'destroy']); // xóa theo id
    });
    Route::prefix('lichtrinh')->group(function () {
        Route::get('/', [ApiLichTrinhController::class, 'index']); 
        Route::post('/', [ApiLichTrinhController::class, 'store']); 
        Route::get('/{id}', [ApiLichTrinhController::class, 'show']); 
        Route::put('/{id}', [ApiLichTrinhController::class, 'update']); 
        Route::delete('/{id}', [ApiLichTrinhController::class, 'destroy']); 
    });
    Route::prefix('tourphuongtien')->group(function () {
        Route::get('/', [ApiTourPhuongTienController::class, 'index']); 
        Route::post('/', [ApiTourPhuongTienController::class, 'store']); 
        Route::get('/{id}', [ApiTourPhuongTienController::class, 'show']); 
        Route::put('/{id}', [ApiTourPhuongTienController::class, 'update']); 
        Route::delete('/{id}', [ApiTourPhuongTienController::class, 'destroy']); 
    });
    
});


