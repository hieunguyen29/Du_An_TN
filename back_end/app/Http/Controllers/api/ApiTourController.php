<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\TourResoure;

use App\Models\LoaiTourModel;
use App\Models\TourModel;

use App\Models\DatTour;
use App\Models\HoaDon;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\Storage;

use Illuminate\Support\Facades\DB;

class ApiTourController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function ShowTour(string $id)
    {
        $tour = TourModel::with('images', 'phuongTien', 'khachSan', 'lichTRinh')->find($id);

        if (!$tour) {
            return response()->json(['message' => 'Tour not found'], 404);
        }

        return response()->json(['data' => $tour]);
    }

    public function getToursByDestination(Request $request)
    {
        $query = $request->input('diem_den');
        $tourdiemden = TourModel::with('images')->where('diem_den', 'like', "%{$query}%")->get();
        foreach ($tourdiemden as $tourdiemdens) {

            $tourttcount = DatTour::where('trang_thai', 1)
                ->where('id_tour', $tourdiemdens->id)
                ->count();
            $tourdiemdens->tourttcount = $tourttcount;
        }

        $tourdiemdencout = $tourdiemden->count();
        return response()->json(['tourdiemden' => $tourdiemden, 'tourdiemdencout' => $tourdiemdencout], 200);
    }

    public function index()
    {

        $tours = TourModel::with('images', 'phuongTien', 'khachSan', 'lichTRinh')->get();
        if ($tours->isEmpty()) {
            return response()->json(['message' => 'No tours found'], 404);
        }
        return response()->json(['data' => $tours]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $uploadedImages = [];

        if ($request->hasFile('hinh')) {
            foreach ($request->file('hinh') as $file) {
                if ($file->isValid()) {
                    $imagePath = uploadFile('hinh', $file);
                    $uploadedImages[] = $imagePath;
                } else {
                    return response()->json(['error' => 'Invalid file or file upload failed'], 500);
                }
            }
        } else {
            return response()->json(['error' => 'No files were uploaded'], 500);
        }

        $image_dd = null;

        if ($request->hasFile('image') && $request->file('image')->isValid()) {
            $image_dd = uploadFile('image', $request->file('image'));
        } else {
            return response()->json(['error' => 'Invalid file or file upload failed for image_dd'], 500);
        }

        $lich_khoi_hanh = Carbon::parse($request->lich_khoi_hanh)->format('Y-m-d');
        $ngay_ket_thuc = Carbon::parse($request->ngay_ket_thuc)->format('Y-m-d');

        $requestData = $request->all();
        $requestData['lich_khoi_hanh'] = $lich_khoi_hanh;
        $requestData['ngay_ket_thuc'] = $ngay_ket_thuc;
        $requestData['image_dd'] = $image_dd; // Assigning single image to 'image_dd' field
        $requestData['image_path'] = $uploadedImages; // Assigning multiple uploaded images

        $tour = TourModel::create($requestData);

        return new TourResoure($tour);
    }


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $tour = TourModel::find($id);
        if ($tour) {
            return new TourResoure($tour);
        } else {
            return  response()->json([
                'message' => 'Không tìm thấy thong tin'
            ], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $tour = TourModel::find($id);

        if (!$tour) {
            return response()->json(['message' => 'Không tìm thấy đối tượng LoaiTourModel'], 404);
        }

        // Kiểm tra xem có tệp tin ảnh được gửi lên hay không
        if ($request->hasFile('image_path')) {
            $image = $request->file('image_path');

            // Xóa ảnh hiện tại nếu có
            if ($tour->image_path) {
                Storage::disk('public')->delete($tour->image_path);
            }

            // Lưu trữ ảnh mới
            $imagePath = $this->uploadFile('images', $image);

            // Cập nhật đường dẫn ảnh trong cơ sở dữ liệu
            $tour->image_path = $imagePath;
        }

        // Cập nhật thông tin tour
        $tour->fill($request->only([
            'ten_tour',
            'diem_di',
            'diem_den',
            'lich_khoi_hanh',
            'ngay_ket_thuc',
            'diem_khoi_hanh',
            'gia_nguoilon',
            'gia_treem',
            'mo_ta',
            'soluong',
            'ma_loai_tour',
        ]));

        // Lưu thay đổi
        $tour->save();

        return response()->json(['message' => 'Cập nhật thành công', 'tour' => $tour]);
    }


    public function updatef(Request $request, string $id)
    {
        $loaiTourModel = LoaiTourModel::find($id);

        if (!$loaiTourModel) {
            return response()->json(['message' => 'Không tìm thấy đối tượng LoaiTourModel'], 404);
        }

        // Kiểm tra xem có tệp tin ảnh được gửi lên hay không
        if ($request->hasFile('image')) {
            $image = $request->file('image');

            // Xóa ảnh hiện tại nếu có
            if ($loaiTourModel->image) {
                Storage::disk('public')->delete($loaiTourModel->image);
            }

            // Lưu trữ ảnh mới
            $imagePath = $image->store('images', 'public');

            // Cập nhật đường dẫn ảnh trong cơ sở dữ liệu
            $loaiTourModel->image = $imagePath;
        }

        // Cập nhật các trường dữ liệu khác
        $loaiTourModel->ten_loai_tour = $request->input('ten_loai_tour');

        // Lưu các thay đổi
        $loaiTourModel->save();

        return response()->json(['message' => 'Cập nhật thành công']);
    }



    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $tour = TourModel::find($id);
        if ($tour) {
            $tour->delete();
            return  response()->json([
                'message' => 'Xóa Thành Công'
            ], 201);
        } else {
            return  response()->json([
                'message' => 'Không tìm thấy thông tin'
            ], 404);
        }
    }

    public function getlisttourKM()
    {
        $tourKM = TourModel::with('discounts', 'images')->where('trang_thai', 1)->get();
        $tourKMWithDiscounts = [];

        foreach ($tourKM as $tour) {
            if ($tour->discounts->isNotEmpty()) {
                $expiryDates = $tour->discounts->pluck('expiry_date');
                $maxExpiryDate = $expiryDates->max();
                $now = Carbon::now();
                $expiryDate = Carbon::parse($maxExpiryDate);
                $countdown = $expiryDate->diffInSeconds($now);
                $tour->max_expiry_date = $maxExpiryDate;

                $tourKMWithDiscounts[] = $tour;
            }
        }

        foreach ($tourKMWithDiscounts as $tourKMs) {

            $tourttcount = DatTour::where('trang_thai', 1)
                ->where('id_tour', $tourKMs->id)
                ->count();
            $tourKMs->tourttcount = $tourttcount;
        }
        $responseData = [
            'code' => 200,
            'data' => $tourKMWithDiscounts,
        ];

        return response()->json($responseData, 200);
    }
}
