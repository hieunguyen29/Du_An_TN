<?php

namespace App\Http\Controllers\api;

use App\Models\Discount;
use App\Http\Controllers\Controller;
use App\Models\TourDiscount;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\DB;

class ApiDiscountController extends Controller
{
    // demo làm xóa đặt tour nếu không thanh toán trc ngày đó 
    // public function abc()  {
    //     $a = Carbon::now()->toDateString();
    //     $date = Carbon::parse($a);
    //     $nextDay = $date->addDay()->toDateString(); // hoặc $date->addDays(1);
    //     return response()->json(compact('a','nextDay'));
    // }
    // hiển thị tất cả mã giảm giá 
    public function  showDiscount()
    {
        $discount = Discount::all();
        return  response()->json($discount);
    }
    // thêm giảm giá
    public function store(Request $request)
    {
        // Kiểm tra và xác thực dữ liệu đầu vào
        $validatedData = $request->validate([
            'discount_name' => 'required|unique:discounts',
            'discount_condition' => 'required|integer',
            'discount_code' => 'required|unique:discounts',
            'percentage' => 'required|integer',
            'expiry_date' => 'required|date',
            'minprice' => 'required',
            
        ]);

        // Kiểm tra điều kiện discount_condition và percentage
        if ($validatedData['discount_condition'] == 2 && $validatedData['percentage'] >= 100) {
            return response()->json(['message' => 'phẩn trăm giảm giá không phù hợp'], 400);
        }

        if ($validatedData['discount_condition'] == 1 && $validatedData['percentage'] <= 100) {
            return response()->json(['message' => 'phẩn trăm giảm giá không phù hợp'], 400);
        }

        // Tạo một đối tượng Discount mới
        $discount = new Discount;
        $discount->discount_name = $validatedData['discount_name'];
        $discount->discount_condition = $validatedData['discount_condition'];
        $discount->discount_code = $validatedData['discount_code'];
        $discount->expiry_date = $validatedData['expiry_date'];
        $discount->percentage = $validatedData['percentage'];
        $discount->minprice = $validatedData['minprice'];
        $discount->trang_thai = 1;
        $discount->save();

        // Trả về kết quả thành công
        return response()->json(['message' => 'Mã giảm giá đã được thêm thành công'], 201);
    }
    // show ra giam giá muỗn sửa
    public function show(string $id)
    {
        $discount = Discount::find($id);
        if ($discount) {
            return  response()->json($discount);
        } else {
            return  response()->json([
                'message' => 'Không tìm thấy thong tin'
            ], 404);
        }
    }
    //cập nhật 
    public function update(Request $request, $id)
    {
        // Kiểm tra và xác thực dữ liệu đầu vào
        $validatedData = $request->validate([
            'discount_name' => 'required|unique:discounts,discount_name,' . $id,
            'discount_condition' => 'required|integer',
            'discount_code' => 'required|unique:discounts,discount_code,' . $id,
            'percentage' => 'required|integer',
            'expiry_date' => 'required|date',
            'minprice' => 'required',
        ]);

        // Kiểm tra điều kiện discount_condition và percentage
        if ($validatedData['discount_condition'] == 2 && $validatedData['percentage'] >= 100) {
            return response()->json(['message' => 'Lỗi: percentage phải nhỏ hơn 100 khi discount_condition là 2'], 400);
        }

        if ($validatedData['discount_condition'] == 1 && $validatedData['percentage'] <= 100) {
            return response()->json(['message' => 'Lỗi: percentage phải lớn hơn 100 khi discount_condition là 1'], 400);
        }

        // Tìm đối tượng Discount cần sửa đổi trong cơ sở dữ liệu
        $discount = Discount::findOrFail($id);

        // Cập nhật thông tin Discount
        $discount->discount_name = $validatedData['discount_name'];
        $discount->discount_condition = $validatedData['discount_condition'];
        $discount->discount_code = $validatedData['discount_code'];
        $discount->percentage = $validatedData['percentage'];
        $discount->expiry_date = $validatedData['expiry_date'];
        $discount->minprice = $validatedData['minprice'];
        $discount->save();

        // Trả về kết quả thành công
        return response()->json(['message' => 'Mã giảm giá đã được cập nhật thành công'], 200);
    }
    // xóa giảm giá
    public function destroy(string $id)
    {
        $discount = Discount::find($id);
        if ($discount) {
            $discount->delete();
            return  response()->json([
                'message' => 'Xóa Thành Công'
            ], 201);
        } else {
            return  response()->json([
                'message' => 'Không tìm thấy thông tin'
            ], 404);
        }
    }
    // hiển thị giảm giá trong bảng trung gian(tour_discount)
    public function tour_discount()
    {
        $tour_discount = TourDiscount::all();
        return response()->json($tour_discount);
    }
    // thêm 
    public function tour_discount_add(Request $request)
    {
        $validatedData = $request->validate([
            'tour_id' => 'required',
            'discount_id' => 'required',
        ]);

        $tourDiscount = new TourDiscount;
        $isResultDiscount = TourDiscount::where('tour_id', $request->input('tour_id'))
            ->where('discount_id', $request->input('discount_id'))->first();

        if (!$isResultDiscount) {
            $tourDiscount->tour_id = $request->input('tour_id');
            $tourDiscount->discount_id = $request->input('discount_id');
            $tourDiscount->save();
            return response()->json(['message' => 'Tour discount added successfully']);
        }
        return response()->json(['error' => 'Tour discount added error']);
    }
    // cập nhật
    public function tour_discount_update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'tour_id' => 'required',
            'discount_id' => 'required',
        ]);

        $tourDiscount = TourDiscount::find($id);
        if (!$tourDiscount) {
            return response()->json(['message' => 'Tour discount not found'], 404);
        }

        $result = TourDiscount::where('tour_id', $request->input('tour_id'))
            ->where('discount_id', $request->input('discount_id'))->first();
        if (!$result) {
            $tourDiscount->tour_id = $request->input('tour_id');
            $tourDiscount->discount_id = $request->input('discount_id');
            $tourDiscount->save();
            return response()->json(['message' => 'Tour discount added successfully']);
        }
        return response()->json(['error' => 'Tour discount already exists']);
    }
    // show ra tour discount muốn sửa 
    public function tour_discount_show($id)
    {
        $tourdiscount = TourDiscount::find($id);
        if ($tourdiscount) {
            return response()->json($tourdiscount);
        } else {
            return  response()->json([
                'message' => 'Không tìm thấy thong tin'
            ], 404);
        }
    }

    public function tour_discount_delete($id)
    {
        $tourDiscount = TourDiscount::find($id);

        if (!$tourDiscount) {
            return response()->json(['message' => 'Tour discount not found'], 404);
        }

        $tourDiscount->delete();

        return response()->json(['message' => 'Tour discount deleted successfully']);
    }
    public function check_coupon(Request $request)
    {
        $data = $request->all();
        $coupon = Discount::where('discount_code', $data['name_coupon'])->first();

        if ($coupon) {
            $tourId = $data['tourid']; // ID của sản phẩm được chọn
            // Kiểm tra sự khớp nối giữa mã giảm giá và sản phẩm trong bảng trung gian
            $isLinked = DB::table('tour_discount')
                ->where('tour_id', $tourId)
                ->where('discount_id', $coupon->id)
                ->exists();
            if ($isLinked) {
                //  $this->deleteExpiredCoupons(); // thêm cái này thì không cần dùng task scheduling
                // Mã giảm giá hợp lệ cho sản phẩm được chọn
                $count_session = Session::get('coupon');

                if ($count_session == true) {
                    $is_available = 0;
                    if ($is_available == 0) {
                        $cou[] = [
                            'coupon_code' => $coupon->discount_code,
                            'percentage' => $coupon->percentage,
                            'discount_name' => $coupon->discount_name,
                            'discount_condition' => $coupon->discount_condition,
                            'expiry_date' => $coupon->expiry_date->toDateString(),
                        ];
                        Session::put('coupon', $cou);
                    }
                } else {
                    $cou[] = [
                        'coupon_code' => $coupon->discount_code,
                        'percentage' => $coupon->percentage,
                        'discount_name' => $coupon->discount_name,
                        'discount_condition' => $coupon->discount_condition,
                        'expiry_date' => $coupon->expiry_date->toDateString(),
                    ];
                    Session::put('coupon', $cou);
                }
                Session::save();

                $sessionData = Session::all(); // Lấy thông tin phiên làm việc

                return response()->json(['status' => 'success', 'message' => 'Coupon applied successfully', 'session' => $sessionData]);
            } else {
                Session::forget('coupon');
                return response()->json(['status' => 'error', 'message' => 'Invalid coupon code for this product']);
            }
        } else {
            Session::forget('coupon');
            return response()->json(['status' => 'error', 'message' => 'Invalid coupon code']);
        }
    }
    public function deleteExpiredCoupons()
    {
        $currentDate = Carbon::now()->toDateString();
        DB::table('discounts')
            ->whereDate('expiry_date', '<', $currentDate)
            ->delete();

        return response()->json(['status' => 'success']);
    }
    public function filterDicscount(Request $request) {
        $result = Discount::where('minprice', '<', $request->input('price_tour'))
        ->where('trang_thai', '!=', 0) // Kiểm tra trạng thái khác 0
        ->get();

    return response()->json(['data' => $result]);
    }
}
