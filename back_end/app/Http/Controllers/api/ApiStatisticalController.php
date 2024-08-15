<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\DatTour;
use App\Models\Evaluate;
use App\Models\HoaDon;
use App\Models\NewsModel;
use App\Models\ThanhToan;
use App\Models\ThanhToanDetail;
use App\Models\TourModel;
use App\Models\User;
use Illuminate\Http\Request;
use PHPUnit\Metadata\Uses;
use Illuminate\Support\Facades\DB;

class ApiStatisticalController extends Controller
{
    //
    public function getStatistical()
    {
        $statistical = [];
        $totalTours = TourModel::where('trang_thai', 1)->count();
        $totalToursbooked = DatTour::count();
        $totalUser = User::whereHas('roles', function ($query) {
            $query->where('name', 'khach_hang');
        })->with('roles', 'roles.permissions')->count();
        $totalNews = NewsModel::count();
        $currentDate = date('Y-m-d');
        $currentMonth = date('m');
        $currentYear = date('Y');

        $totalRevenueToday = ThanhToanDetail::whereDate('ngay_thanh_toan', $currentDate)->sum('tong_tien_tt');
        $totalRevenueThisMonth = ThanhToanDetail::whereYear('ngay_thanh_toan', $currentYear)
            ->whereMonth('ngay_thanh_toan', $currentMonth)
            ->sum('tong_tien_tt'); 
        $totalRevenueThisYear = ThanhToanDetail::whereYear('ngay_thanh_toan', $currentYear)->sum('tong_tien_tt');
        $statistical['totalTours'] = $totalTours;
        $statistical['totalToursbooked'] = $totalToursbooked;
        $statistical['totalUser'] = $totalUser;
        $statistical['totalNews'] = $totalNews;
        $statistical['totalRevenueToday'] = $totalRevenueToday;
        $statistical['totalRevenueThisMonth'] = $totalRevenueThisMonth;
        $statistical['totalRevenueThisYear'] = $totalRevenueThisYear;
        return response()->json(['statistical' => $statistical]);
    }

    public function columnChart($year = null)
    {
        if ($year === null) {
            $year = date('Y'); // Sử dụng năm hiện tại nếu $year là null
        }
    
        $totalRevenueByMonth = [];
    
        for ($month = 1; $month <= 12; $month++) {
            $totalRevenue = ThanhToanDetail::whereYear('ngay_thanh_toan', $year)
                ->whereMonth('ngay_thanh_toan', $month)
                ->sum('tong_tien_tt');
            $totalRevenueByMonth[] = intval($totalRevenue); // Chuyển đổi thành số nguyên
        }
    
        return response()->json(['doanhthu' => $totalRevenueByMonth], 200);
    }
    
    // thống kê trạng thái tour

    public function tourStatusStatistics(){
        $statisticalStatus = [];
        $totalToursPaid = ThanhToanDetail::count();
        $totalToursUnpaid = ThanhToan::count();
        $totalToursCancelled = DatTour::withTrashed()->whereNotNull('deleted_at')->count();
        $statisticalStatus['totalToursPaid'] = $totalToursPaid;
        $statisticalStatus['totalToursUnpaid'] = $totalToursUnpaid;
        $statisticalStatus['totalToursCancelled'] = $totalToursCancelled;
        return response()->json(['statisticalStatus'=> $statisticalStatus]);
    }
    

    public function getStatisticalDate(Request $request)
    {
        $startDate = $request->input('start_date');
        $endDate = $request->input('end_date');
        $totalMoneys = [];
    
        // Xử lý logic lọc dữ liệu dựa trên khoảng ngày
    
        // Ví dụ: Lấy dữ liệu từ database trong khoảng ngày đã cho
        $filteredDatas = ThanhToanDetail::whereBetween('ngay_thanh_toan', [$startDate, $endDate])->get();
    
        foreach ($filteredDatas as $filteredData) {
            $totalMoney = $filteredData->tong_tien_tt;
            $paymentDate = $filteredData->ngay_thanh_toan;
    
            // Check nếu ngày đã tồn tại trong mảng $totalMoneys
            if (isset($totalMoneys[$paymentDate])) {
                // Cộng tổng tiền hiện tại với giá trị mới
                $totalMoneys[$paymentDate] += $totalMoney;
            } else {
                // Thêm ngày vào mảng $totalMoneys và gán tổng tiền
                $totalMoneys[$paymentDate] = $totalMoney;
            }
        }
    
        // Trả về dữ liệu đã lọc
        return response()->json(['data' => $totalMoneys]);
    }
    // thống kê top 5 tour đánh giá cao nhất
    public function topFiveTours()
    {
        $topFiveTours = Evaluate::select('id_tour', DB::raw('AVG(so_sao) as average_rating'))
            ->groupBy('id_tour')
            ->orderByRaw('average_rating DESC')
            ->limit(5)
            ->get();
        $name_tour = TourModel::select('id', 'ten_tour')->get();

        // Duyệt qua từng kết quả trong mảng $topFiveTours
        foreach ($topFiveTours as $tour) {
            // Tìm tên_tour tương ứng với id_tour
            $matchingTour = $name_tour->where('id', $tour->id_tour)->first();

            // Thay thế id_tour bằng tên_tour nếu có kết quả tương ứng
            if ($matchingTour) {
                $tour->id_tour = $matchingTour->ten_tour;
            }
        }

        return response()->json($topFiveTours, 200);
    }
     // thống kê top 5 tour được đặt nhiều nhất 
     public function topAddress()
     {
        $countArray = DB::table('dat_tours')
        ->select('id_tour', DB::raw('COUNT(*) as count'))
        ->groupBy('id_tour')
        ->orderByDesc('count')
        ->take(5)
        ->get();
        $tourArray = TourModel::select('id', 'ten_tour')->get();
        // tọa 1 mảng rỗng 
        $result = [];
        $countArray = json_decode(json_encode($countArray), true);
        foreach ($countArray as $countItem) {
            foreach ($tourArray as $tourItem) {
                if ($countItem['id_tour'] === $tourItem['id']) {
                    $result[] = [
                        'ten' => $tourItem['ten_tour'],
                        'id' => $countItem['id_tour'],
                    ];
                    break;
                }
            }
        }
        return response()->json([ 'result' => $result]);
     }
//     axios.get('http://localhost:8000/api/admin/statistical/demo')
//   .then(response => {
//     // Xử lý dữ liệu trả về khi yêu cầu thành công
//     console.log(response.data);
//   })
//   .catch(error => {
//     // Xử lý lỗi khi yêu cầu thất bại
//     console.error(error);
//   });

}
