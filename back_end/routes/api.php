<?php

use App\Http\Controllers\Api\ApiAuthLoginController;
use App\Http\Controllers\Api\ApiDatTourController;
use App\Http\Controllers\Api\ApiHuongDanVienController;
use App\Http\Controllers\Api\ApiLoaiTourController;
use App\Http\Controllers\Api\ApiLoaiPhuongTienController;
use App\Http\Controllers\Api\ApiDiaDiemController;
use App\Http\Controllers\api\ApiImagesController;
use App\Http\Controllers\api\ApiLichTrinhController;
use App\Http\Controllers\Api\ApiTourController;
use App\Http\Controllers\api\ApiTourImageController;
use App\Http\Controllers\api\ApiTourPhuongTienController;
use App\Http\Controllers\api\ApiLoaiKhachSanController;
use App\Http\Controllers\api\ApiTourKhachSanController;
use App\Http\Controllers\api\ApiPermissionsController;
use App\Http\Controllers\api\ApiPaymentController;
use App\Http\Controllers\api\ApiMessageController;
use App\Http\Controllers\api\ApiDiscountController;
use App\Http\Controllers\Api\ApiSearchController;
use App\Http\Controllers\Api\ApiFavoriteController;
use App\Http\Controllers\Api\ApiAuthController;
use App\Http\Controllers\Api\ApiContactController;
use App\Http\Controllers\Api\ApiHuongDanVienTourController;
use App\Http\Controllers\Api\ApiEvaluateController;
use App\Http\Controllers\Api\BannerLogoController;
use App\Models\LoaiTourModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\API\ApiNewsController;

use App\Http\Controllers\Api\ApiNotificationController;
use App\Http\Controllers\Api\ApiStatisticalController;
use App\Models\DatTour;
use App\Models\TourModel;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Mews\Purifier\Facades\Purifier;
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

// api demo
Route::get('a', [ApiDatTourController::class, 'demo']);
Route::get('demo', function () {
    $currentDateTime = Carbon::now()->setTimezone('Asia/Ho_Chi_Minh')->format('Y-m-d H:i:s');
    // chuyển sang múi giờ chuẩn giờ hiện tại
    $expiredDiscounts = DB::table('discounts')
        ->where('expiry_date', '<', $currentDateTime)
        ->get();

    foreach ($expiredDiscounts as $discount) {

        DB::table('discounts')
            ->where('id', $discount->id)
            ->update(['trang_thai' => 0]);
    }
    $expiredDiscounts1 = DB::table('discounts')
    ->where('expiry_date', '>', $currentDateTime)
    ->get();

foreach ($expiredDiscounts1 as $discount) {
    DB::table('discounts')
        ->where('id', $discount->id)
        ->update(['trang_thai' => 1]); // Sửa giá trị 0 thành 1
}
});



//end api demo

// đánh giá về số sao cho tour đó 
Route::post('/so_sao_tour', [ApiEvaluateController::class, 'so_sao']);
// đếm tour đã đi thành công 
Route::get('CountTour', [ApiDatTourController::class, 'CountTour']);

// api mã giảm giá 
Route::post('check_coupon',[ApiDiscountController::class,'check_coupon']);
// api show user và vai trò của nó 
Route::get('/showuser', [ApiMessageController::class, 'showuser']);
// api hiển thị  message
Route::get('/messages', [ApiMessageController::class, 'showMessage']);
// them tin nhắn 
Route::post('/messages', [ApiMessageController::class, 'store']);
// lấy ra id của tài khoản có vai trò phản hồi tin nhắn 
Route::get('/findNameRole', [ApiMessageController::class, 'findNameRole']);
//route payment
Route::post('/vnpay_payment', [ApiPaymentController::class, 'vnpay_payment'])->name('vnpay_payment');
// lưu kết quả thanh toán vnpay vào DB
Route::post('/paymentresult', [ApiPaymentController::class, 'CreatePayment']);
// lưu thanh toán tiền mặt vào DB
Route::post('/cash', [ApiPaymentController::class, 'CreatePaymentCash']);
// hiển thị  kết quả thanh toán 
Route::get('/showResult', [ApiPaymentController::class, 'getPaymentData']);

Route::post('/login', [ApiAuthLoginController::class, 'login'])->name('login');

//api chi tiet tour
Route::get('getDatTour/{id}', [ApiDatTourController::class, 'getDatTour']);
Route::get('showDattour', [ApiDatTourController::class, 'indexDat']);
Route::post('postDattour', [ApiDatTourController::class, 'createDatTour']);

Route::get('bookingtour/{id}', [ApiPaymentController::class, 'getBookingTour']);
//api list ra danh sách menu
Route::get('menu-phan-cap', [ApiLoaiTourController::class, 'getMenuPhanCap']);
// api show tour theo cái menu ở trên có cả đếm xem có bao nhiêu tour
Route::get('/getToursByDestination', [ApiTourController::class, 'getToursByDestination']);

//api láy all điểm đến của tour làm chức năng search
Route::get('/getListDiemDen', [ApiSearchController::class, 'getListDiemDen']);
//api láy all điểm đi của tour làm chức năng search
Route::get('/getListDiemDi', [ApiSearchController::class, 'getListDiemDi']);
//api search
Route::get('/searchTour', [ApiSearchController::class, 'searchTour']);
// api List tour kM
Route::get('/listtourKM', [ApiTourController::class, 'getlisttourKM']);
// api contact
Route::get('/getcontact', [ApiContactController::class, 'getcontact']);
Route::post('/contact', [ApiContactController::class, 'sendContactForm'])->name('contact');
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
 Route::put('updateUser', [ApiAuthController::class, 'updateUser']);
Route::group(['middleware' => ['auth:sanctum']], function () {
   
    Route::get('/deltailuser', [ApiAuthLoginController::class, 'delailUser']);
    Route::delete('logout', [ApiAuthLoginController::class, 'logout'])->name('logout');
    Route::put('/change_password', [ApiAuthLoginController::class, 'changePassword'])->name('changePassword');
    Route::put('/forgotPassword', [ApiAuthLoginController::class, 'forgotPassword'])->name('forgotPassword');
    Route::get('/ToursByUserId', [ApiAuthLoginController::class, 'getToursByUserId']);
    Route::prefix('hdvtour')->group(function(){
        Route::get('/getListHDVTour', [ApiHuongDanVienTourController::class, 'getListHDVTour']);
        Route::put('/updateStatustourhdv/{id}', [ApiHuongDanVienTourController::class, 'updateStatustourhdv']);
    });

});

Route::prefix('register')->group(function () {
    Route::get('/', [ApiAuthController::class, 'index']);
    Route::post('/dk', [ApiAuthController::class, 'registers']);
    Route::put('/edit_information', [ApiAuthController::class, 'edit_information']);
});
// show chỗ đoạn menu
Route::get('/ShowLoaiTour', [ApiLoaiTourController::class, 'ShowLoaiTour']);
Route::group(['middleware' => ['auth:sanctum']], function () {
   // add sản phẩm yêu thích 
   Route::get('/favorites', [ApiFavoriteController::class, 'index']);
   Route::post('/favorites', [ApiFavoriteController::class, 'store']);
   // đánh giá 
   Route::post('/evaluate', [ApiEvaluateController::class, 'addDanhGia']);
   Route::get('/find_evaluate', [ApiEvaluateController::class, 'findDanhGia']);
});
Route::group(['middleware' => ['auth:sanctum', 'role:admin|nhan_vien']], function () {
    Route::prefix('admin')->group(function () {
        Route::prefix('loaitour')->group(function () {
            Route::get('/', [ApiLoaiTourController::class, 'index']);
            Route::post('/', [ApiLoaiTourController::class, 'store']);
            Route::get('/{id}', [ApiLoaiTourController::class, 'show']);
            Route::put('/{id}', [ApiLoaiTourController::class, 'update']);
            Route::delete('/{id}', [ApiLoaiTourController::class, 'destroy']);
        });
    });
 
});
// api giảm giá 
Route::prefix('admin')->group(function () {
    // phân hướng dẫn viên cho tour đó 
    Route::prefix('hdvtour')->group(function(){
        Route::post('/', [ApiHuongDanVienTourController::class, 'store']);
        Route::get('/', [ApiHuongDanVienTourController::class, 'allHuongDanVienTOur']);
        Route::post('/handleHuongDanVien', [ApiHuongDanVienTourController::class, 'handleHuongDanVien']);
        Route::get('/getListHDVTour', [ApiHuongDanVienTourController::class, 'getListHDVTour']);
    });

    
    Route::prefix('discount')->group(function () {
        Route::get('/', [ApiDiscountController::class, 'showDiscount']);
        Route::post('/', [ApiDiscountController::class, 'store']);
        Route::post('/filterDicscount', [ApiDiscountController::class, 'filterDicscount']); // lọc giảm giá theo giá tour
        Route::get('/{id}', [ApiDiscountController::class, 'show']);
        Route::put('update/{id}', [ApiDiscountController::class, 'update']);
        Route::delete('/{id}', [ApiDiscountController::class, 'destroy']);
    });
    Route::prefix('tour_discount')->group(function () {
        Route::get('/', [ApiDiscountController::class, 'tour_discount']);
        Route::post('/', [ApiDiscountController::class, 'tour_discount_add']);
        Route::get('/{id}', [ApiDiscountController::class, 'tour_discount_show']);
        Route::put('update/{id}', [ApiDiscountController::class, 'tour_discount_update']);
        Route::delete('/{id}', [ApiDiscountController::class, 'tour_discount_delete']);
    });
    Route::prefix('evaluate')->group(function () {
        Route::get('/', [ApiEvaluateController::class, 'showDanhGia']);
        Route::delete('/{id}', [ApiEvaluateController::class, 'deleteDanhGia']);
        Route::post('/showDanhGiaOnlyTour', [ApiEvaluateController::class, 'showDanhGiaOnlyTour']);
    });
    Route::prefix('user')->group(function () {
        Route::get('/', [ApiPermissionsController::class, 'index']);
        Route::get('/phanvaitro/{id}', [ApiPermissionsController::class, 'PhanVaiTro']);
        Route::get('/phanquyen/{id}', [ApiPermissionsController::class, 'PhanQuyen']);
        Route::post('/add_role', [ApiPermissionsController::class, 'add_role'])->name('add_role');
        Route::post('/add_permission', [ApiPermissionsController::class, 'add_permission'])->name('add_permission');
        Route::post('insert_roles/{id}', [ApiPermissionsController::class, 'InsertRoles'])->name('user.insertroles');
        Route::post('insert_permission/{id}', [ApiPermissionsController::class, 'InsertPermission'])->name('user.insert_permission');
        Route::post('/',[ApiPermissionsController::class,'store']);
        Route::get('/{id}',[ApiPermissionsController::class,'show']);
        Route::put('/{id}',[ApiPermissionsController::class,'update']);
        Route::delete('/{id}',[ApiPermissionsController::class,'destroy']);
        
        
        
    });

    Route::prefix('images')->group(function () {
        Route::get('/images', [ApiImagesController::class, 'getImage']);
        Route::get('/', [ApiImagesController::class, 'index']); // lấy ra danh sách
        Route::post('/', [ApiImagesController::class, 'store']); //  thêm 1 phương tiện mới
        Route::get('/{id}', [ApiImagesController::class, 'show']); // lấy ra  id muốn sửa
        Route::put('edit/{id}', [ApiImagesController::class, 'update']); // sủa theo id
        Route::delete('/{id}', [ApiImagesController::class, 'destroy']); // xóa theo id
    });

    Route::prefix('tour-images')->group(function () {
        Route::get('/', [ApiTourImageController::class, 'index']); // lấy ra danh sách
        Route::post('/', [ApiTourImageController::class, 'store']); //  thêm 1 phương tiện mới
        Route::get('/{id}', [ApiTourImageController::class, 'show']); // lấy ra  id muốn sửa
        Route::put('/{id}', [ApiTourImageController::class, 'update']); // sủa theo id
        Route::delete('/{id}', [ApiTourImageController::class, 'destroy']); // xóa theo id

    });
    Route::prefix('phuongtien')->group(function () {
        Route::get('/', [ApiLoaiPhuongTienController::class, 'index']); // lấy ra danh sách
        Route::post('/', [ApiLoaiPhuongTienController::class, 'store']); //  thêm 1 phương tiện mới
        Route::get('/{id}', [ApiLoaiPhuongTienController::class, 'show']); // lấy ra  id muốn sửa
        Route::put('/{id}', [ApiLoaiPhuongTienController::class, 'update']); // sủa theo id
        Route::delete('/{id}', [ApiLoaiPhuongTienController::class, 'destroy']); // xóa theo id
    });


    Route::prefix('diadiem')->group(function () {
        Route::get('/', [ApiDiaDiemController::class, 'index']);
        Route::post('/', [ApiDiaDiemController::class, 'store']);
        Route::get('/{id}', [ApiDiaDiemController::class, 'show']);
        Route::put('/{id}', [ApiDiaDiemController::class, 'update']);
        Route::delete('/{id}', [ApiDiaDiemController::class, 'destroy']);
    });
    Route::prefix('loaitour')->group(function () {
        Route::get('/', [ApiLoaiTourController::class, 'index']);
        Route::post('/', [ApiLoaiTourController::class, 'store']);
        Route::get('/{id}', [ApiLoaiTourController::class, 'show']);
        Route::put('/{id}', [ApiLoaiTourController::class, 'update']);
        Route::delete('/{id}', [ApiLoaiTourController::class, 'destroy']);
    });
    Route::prefix('tour')->group(function () {
        Route::get('/{id}', [ApiTourController::class, 'ShowTour']);
        Route::get('/', [ApiTourController::class, 'index']);
        Route::post('/', [ApiTourController::class, 'store']);
        // Route::get('/{id}', [ApiTourController::class, 'show']);
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
    Route::prefix('news')->group(function () {
        Route::get('/', [ApiNewsController::class, 'index']);
        Route::post('/', [ApiNewsController::class, 'store']);
        Route::get('/{id}', [ApiNewsController::class, 'show']);
        Route::put('/{id}', [ApiNewsController::class, 'update']);
        Route::delete('/{id}', [ApiNewsController::class, 'destroy']);
    });

    // api thông báo
    Route::prefix('notification')->group(function () {
        Route::get('/', [ApiNotificationController::class, 'getlistNotification']);
        Route::put('/updateStatusNotification', [ApiNotificationController::class, 'updateStatusNotification']);
    });

    // api thống kê
    Route::prefix('statistical')->group(function () {
        // đếm để thống kê doanh thu trang web
        Route::get('/', [ApiStatisticalController::class, 'getStatistical']);
        Route::get('/tourStatusStatistics', [ApiStatisticalController::class, 'tourStatusStatistics']);
        Route::get('/getStatisticalDate', [ApiStatisticalController::class, 'getStatisticalDate']);
        Route::get('/columnChart/{year?}', [ApiStatisticalController::class, 'columnChart']);
        Route::get('/years', function () {
            // Lấy danh sách các năm từ 1900 đến năm hiện tại
            $currentYear = date('Y');
            $years = range($currentYear, 2000);
        
            return response()->json(['years' => $years], 200);
        });
        Route::get('/topFiveTours', [ApiStatisticalController::class, 'topFiveTours']);
        Route::get('/topAddress', [ApiStatisticalController::class, 'topAddress']);
    });

    Route::prefix('dattour')->group(function () {
        //list all BookingTour
        Route::get('/getListBookingTour', [ApiDatTourController::class, 'getListBookingTour']);
        //list BookingTour chưa thanh toán
        Route::get('/getListBookingTourUnpaid', [ApiDatTourController::class, 'getListBookingTourUnpaid']);
        //list BookingTour đã thanh toán
        Route::get('/getListBookingTourPaid', [ApiDatTourController::class, 'getListBookingTourPaid']);
        // Chi tiết booking tour
        Route::get('/getBookingTourDeltail/{id}', [ApiDatTourController::class, 'getBookingTourDeltail']);
        Route::put('/updateStatus/{id}', [ApiDatTourController::class, 'updateStatus']);
        Route::put('/updateConfirm/{idConfirm}', [ApiDatTourController::class, 'updateConfirm']);
    });
    Route::prefix('bannerlogo')->group(function(){
        Route::get('/', [BannerLogoController::class, 'index']);
        Route::post('/', [BannerLogoController::class, 'store']);
        Route::get('/{id}', [BannerLogoController::class, 'show']);
        Route::put('/{id}', [BannerLogoController::class, 'update']);
        Route::delete('/{id}', [BannerLogoController::class, 'destroy']);
    });

    
});