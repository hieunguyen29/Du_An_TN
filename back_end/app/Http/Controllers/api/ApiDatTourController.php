<?php

namespace App\Http\Controllers\Api;

use Illuminate\Support\Str;
use App\Http\Controllers\Controller;
use App\Http\Controllers\api\ApiPaymentController;
use App\Mail\DatHang;
use App\Models\DatTour;
use App\Models\HoaDon;
use App\Models\NotificationModel;
use App\Models\ThanhToan;
use App\Models\ThanhToanDetail;
use App\Models\TourModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;

class ApiDatTourController extends Controller
{
    //
    public function getDatTour(Request $request, $id)
    {
        $tour = TourModel::with('images', 'phuongTien', 'khachSan',)->find($id);;
        $user = null;
        if ($tour) {
            if (Auth::guard('sanctum')->check()) {
                $user = Auth::guard('sanctum')->user();
            }
            $response = [
                'data' => $tour,
                'user' => $user,
            ];
            return response()->json($response);
        } else {
            return response()->json(['message' => 'Không tìm thấy tour'], 404);
        }
    }

    public function createDatTour(Request $request)
    {
        // Kiểm tra xem người dùng đã đăng nhập hay chưa
        $datTour = $request->all();
        // $datTour['ngay_dat'] = now(); // Gắn mặc định ngày đặt là ngày hiện tại
        $datTour['ngay_dat'] = Carbon::today(); // Lấy ngày tháng năm hiện tại
        $datTour['ngay_het_han'] = Carbon::today()->addDay(); // Thêm 1 ngày vào ngày hiện tại
        if ($request->has('so_luong_khach')) {
            $soLuongKhach = $request->input('so_luong_khach');
        } else {
            $soLuongKhach = 1;
        }
        $tourone = TourModel::find($datTour['id_tour']);
        if ($soLuongKhach <= $tourone->soluong) {
            $createDatTour = DatTour::create($datTour);
            // dd($createDatTour->ten_khach_hang);
            $soluong = $tourone->soluong - $soLuongKhach;
            if ($createDatTour) {
                $tourone->soluong = $soluong;
                $tourone->save();
            }
            // thông báo khi đặt hàng thành công gửi về admin
            $notification = new NotificationModel();
            $notification->name_user = $createDatTour->ten_khach_hang;
            $notification->body = "Có đơn đặt hàng mới!!";
            $notification->ngay_gio = Date(now());
            $notification->loai_thong_bao = "Đặt tour";
            $notification->id_tour = $datTour['id_tour'];
            $notification->save();
            Mail::to($datTour['email'])->send(new DatHang($createDatTour, $tourone));
            return response()->json(['createDatTour' => $createDatTour]);
        } else {
            return response()->json(['message' => 'Đặt tour thất bại vì quá số lượng'], 404);
        }
    }
    public function indexDat()
    {
        $dattour = DatTour::all();
        return response()->json(['code' => 200, 'dattour' => $dattour]);
    }


    public function demo()
    {
        $currentDate = Carbon::now()->toDateString(); // Lấy ngày hiện tại
        $tours = DatTour::all(); // Lấy danh sách các tour

        foreach ($tours as $tour) {
            $tourdetail = DB::table('tour')->where('id', $tour->id_tour)->first();

            // dd($tourdetail->soluong); // số lượng khách 
            $expirationDate = $tour->ngay_het_han;
            echo $expirationDate < $currentDate;
            if ($expirationDate < $currentDate && $tour->trang_thai == 0) {
                //  $tourdetail->update(['soluong'=>$tourdetail->soluong + $tour->so_luong_khach]);
                $affected = DB::table('tour')
                    ->where('id', $tour->id_tour)
                    ->update(['soluong' =>  DB::raw('soluong + ' . $tour->so_luong_khach)]);

                if ($tour->ThanhToan) {
                    $tour->ThanhToan->delete();
                }


                // Xóa tour
                $tour->delete();
            }
        }

        return 'Xóa các tour hết hạn thành công';
    }

    public function getListBookingTour()
    {

        $bookings = DatTour::with('ThanhToan', 'tours.images')->get();
        return response()->json(['data' => $bookings], 200);
    }

    public function getListBookingTourUnpaid()
    {

        $bookingsUnpaid = DatTour::with('ThanhToan', 'tours.images')
            ->where('trang_thai', 0)
            ->get();
        return response()->json(['data' => $bookingsUnpaid], 200);
    }

    public function getListBookingTourPaid()
    {

        $bookingsUnpaid = DatTour::with('ThanhToan', 'tours.images')
            ->where('trang_thai', 1)
            ->get();
        return response()->json(['data' => $bookingsUnpaid], 200);
    }

    public function getBookingTourDeltail($id)
    {
        $bookingtour = DatTour::find($id);
        if ($bookingtour) {
            $bookings = DatTour::with('ThanhToan', 'tours.images')->find($id);
            return response()->json(['data' => $bookings], 200);
        }
        // return response()->json(['booking'=>$bookingtour],200);
        return response()->json(['message' => 'Không tìm thấy booking tour'], 404);
    }

    public function updateStatus($id)
    {
        $updateStatus = DatTour::find($id);
        if ($updateStatus->trang_thai == 0) {
            $thantoandata = ThanhToan::where('id_dat_tour', $id)->first();
            if ($thantoandata) {
                ThanhToanDetail::create([
                    'ma_giao_dich' => $thantoandata->ma_giao_dich,
                    'tong_tien_tt' => $thantoandata->tong_tien_tt,
                    'pttt' => $thantoandata->pttt,
                    'ma_phan_hoi' => null,
                    'ghi_chu' => null,
                    'ma_ngan_hang' => null,
                    'ngay_thanh_toan' => date('Y-m-d H:i:s'),
                    'id_dat_tour' =>  $id,
                ]);
                HoaDon::create([
                    'ma_hoa_don' => Str::random(10),
                    'tong_tien' => $thantoandata->tong_tien_tt,
                    'ngay_tao_hoa_don' => date('Y-m-d H:i:s'),
                    'id_dat_tour' => $id,
                ]);
                $thantoandata->delete();

                // Cập nhật trạng thái của đơn đặt tour
                $updateStatus->trang_thai = 1;
                $updateStatus->save();

                return response()->json(['message' => 'Xác nhận đơn đặt tour thành công'], 200);
            }
              // Cập nhật trạng thái của đơn đặt tour
              $updateStatus->trang_thai = 1;
              $updateStatus->save();

              return response()->json(['message' => 'Xác nhận đơn đặt tour thành công'], 200);
        } else if ($updateStatus->trang_thai == 1) {
            $thantoandata = ThanhToanDetail::where('id_dat_tour', $id)->first();
            $hoadondata = HoaDon::where('id_dat_tour', $id)->first();
            if ($thantoandata) {
                ThanhToan::create([
                    'ma_giao_dich' => $thantoandata->ma_giao_dich,
                    'tong_tien_tt' => $thantoandata->tong_tien_tt,
                    'pttt' => $thantoandata->pttt,
                    'ma_phan_hoi' => null,
                    'ghi_chu' => null,
                    'ma_ngan_hang' => null,
                    'ngay_thanh_toan' => date('Y-m-d H:i:s'),
                    'id_dat_tour' =>  $id,
                ]);
                $hoadondata->delete();
                $thantoandata->delete();

                // Cập nhật trạng thái của đơn đặt tour
                $updateStatus->trang_thai = 0;
                $updateStatus->save();
                return response()->json(['message' => 'Cập nhập chưa thanh toán thành công!!'], 200);
            }
        }
        // return response()->json(['message' => 'Đơn hàng đã thanh toán rồi'], 404);
    }

    public function updateConfirm ($idConfirm) {
        $updateConfirm = DatTour::find($idConfirm);
        // dd($updateConfirm->xac_nhan);
        if($updateConfirm->xac_nhan==0){
            $updateConfirm->xac_nhan=1;
            $updateConfirm->save();
            return response()->json(['message' => 'Xác nhận đơn hàng thành công!!'], 200);
        }else{
            return response()->json(['message' => 'Xác nhận đơn hàng không thành công!!'], 404);
        }
    }
    public function CountTour(Request $request)
    {
        $countTour = DatTour::where('ma_khach_hang', $request->input('id'))->where('trang_thai', 1)->count();
        return response()->json(['count' => $countTour]);
    }
}