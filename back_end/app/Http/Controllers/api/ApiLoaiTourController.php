<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoaiTourRequest;
use App\Models\LoaiTourModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;

// {

//     "ten_tour": "tour 1",
//     "diem_di":"ha noi",
//     "diem_den":"ho chi minh",
//     "lich_khoi_hanh":"2023-10-08",
//     "thoi_gian":"6 ngày",
//     "diem_khoi_hanh":"ha noi",
//     "anh":"hinh/1.jpg",
//     "soluong":"1",
//     "trang_thai":0,
//     "ma_loai_tour":1,
//     "ma_hdv":1
// }
class ApiLoaiTourController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function ShowLoaiTour()
    {
        $results = DB::select("
        SELECT dia_diem.ten_dia_diem, loai_tour.ten_loai_tour
        FROM dia_diem
        INNER JOIN loai_tour ON dia_diem.ma_loai_tour = loai_tour.id
                                    ");

        $groupedData = [];
        foreach ($results as $result) {
            $tenLoaiTour = $result->ten_loai_tour;
            $tenDiaDiem = $result->ten_dia_diem;

            if (!isset($groupedData[$tenLoaiTour])) {
                $groupedData[$tenLoaiTour] = [
                    'ten_loai_tour' => $tenLoaiTour,
                    'dia_diem' => []
                ];
            }

            $groupedData[$tenLoaiTour]['dia_diem'][] = $tenDiaDiem;
        }

        $formattedData = [];
        foreach ($groupedData as $key => $value) {
            $formattedData[] = $value;
        }

        return response()->json([
            'code' => 200,
            'data' => $formattedData
        ]);
    }
    public function index()
    {
        //
        $loaiTour = LoaiTourModel::all();
        return response()->json([
            'code' => 200,
            'data' => $loaiTour
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Kiểm tra xem request có chứa thời gian không và chuyển đổi nó về định dạng mong muốn
        $thoi_gian = Carbon::parse($request->thoi_gian)->format('Y-m-d');

        // Tạo một mảng dữ liệu từ request
        $loaiTourData = [
            'ten_loai_tour' => $request->ten_loai_tour,
            'trang_thai' => $request->trang_thai,
            'thoi_gian' => $thoi_gian,
        ];

        // Kiểm tra xem có file hình ảnh trong request không và nếu có, lưu file và lấy đường dẫn
        if ($request->hasFile('hinh') && $request->file('hinh')->isValid()) {
            $imagePath = uploadFile('hinh', $request->file('hinh'));
            $loaiTourData['image'] = $imagePath;
        } else {
            return response()->json(['error' => 'Invalid file or file upload failed'], 500);
        }

        // Tìm bản ghi đã bị xóa với tên_loai_tour tương tự (nếu có)
        $existingRecord = LoaiTourModel::where('ten_loai_tour', $loaiTourData['ten_loai_tour'])
            ->whereNotNull('deleted_at')
            ->first();

        if ($existingRecord) {
            // Nếu bản ghi đã tồn tại và đã bị xóa, khôi phục nó
            $existingRecord->update(['deleted_at' => null]);
            return response()->json(['message' => 'Khôi phục bản ghi thành công']);
        } else {
            // Nếu bản ghi không tồn tại hoặc chưa bị xóa, tạo một bản ghi mới
            $newRecord = LoaiTourModel::create($loaiTourData);
            return response()->json($newRecord, 201);
        }
    }


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {

        $loaiTourModel = LoaiTourModel::find($id);

        if (!$loaiTourModel) {
            return response()->json(['message' => 'Không tìm thấy đối tượng LoaiTourModel'], 404);
        }

        return response()->json($loaiTourModel);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $loaiTourModel = LoaiTourModel::find($id);

        if (!$loaiTourModel) {
            return response()->json(['message' => 'Không tìm thấy đối tượng LoaiTourModel'], 404);
        }

        // Kiểm tra và lưu trữ đường dẫn hình ảnh (nếu có)
        if ($request->hasFile('image') && $request->file('image')->isValid()) {
            $imagePath = $request->file('image')->store('images', 'public');

            // Xóa ảnh cũ nếu tồn tại
            if ($loaiTourModel->image) {
                Storage::disk('public')->delete($loaiTourModel->image);
            }

            // Cập nhật đường dẫn ảnh trong model
            $loaiTourModel->image = $imagePath;
        }

        // Cập nhật các trường dữ liệu khác từ request
        $loaiTourModel->ten_loai_tour = $request->input('ten_loai_tour');
        $loaiTourModel->trang_thai = $request->input('trang_thai'); // Sửa tại đây
        $loaiTourModel->thoi_gian = Carbon::parse($request->input('thoi_gian'))->format('Y-m-d');

        // Lưu các thay đổi vào cơ sở dữ liệu
        $loaiTourModel->save();

        return response()->json(['message' => 'Cập nhật thành công']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        $loaiTourModel = LoaiTourModel::find($id);
        if (!$loaiTourModel) {
            return response()->json(['message' => 'Không tìm thấy đối tượng LoaiTourModel'], 404);
        }
        return $loaiTourModel->delete();
    }
    public function getMenuPhanCap()
    {
        $loaiTours = LoaiTourModel::all();

        $menuPhanCap = $loaiTours->map(function ($loaiTour) {
            $diemDens = $loaiTour->tours->pluck('diem_den')->unique();
            $uniqueDiemDen = [];
            foreach ($diemDens as $value) {
                $lowerValue = strtolower($value);
                $found = false;

                foreach ($uniqueDiemDen as $uniqueValue) {

                    if (strtolower($uniqueValue) === $lowerValue) {
                        $found = true;
                        break;
                    }
                }

                if (!$found) {
                    $uniqueDiemDen[] = $value;
                }
            }

            return [
                'loaiTour' => $loaiTour->only(['id', 'ten_loai_tour']),
                'diemDens' => $uniqueDiemDen,
            ];
        });

        return response()->json(['menuPhanCap' => $menuPhanCap], 200);
    }
}