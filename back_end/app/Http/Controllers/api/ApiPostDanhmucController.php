<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\PostDmModel;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class ApiPostDanhmucController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $loaiTour = PostDmModel::all();
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
        $loaiTour = $request->all();
        if ($request->hasFile('hinh') && $request->file('hinh')->isValid()) {
            $imagePath = uploadFile('hinh', $request->file('hinh'));
        } else {
            return response()->json(['error' => 'Invalid file or file upload failed'], 500);
        }
        // Kiểm tra trước khi thêm
        $existingRecord = DB::table('post_danhmuc')
            ->where('ten_dm', $loaiTour['ten_dm'])
            ->whereNotNull('deleted_at')
            ->first();

        if ($existingRecord) {
            // Bản ghi đã tồn tại và đã bị xóa, bạn có thể khôi phục nó
            DB::table('post_danhmuc')
                ->where('id', $existingRecord->id)
                ->update(['deleted_at' => null]);

            return response()->json(['message' => 'Khôi phục bản ghi thành công']);
        } else {
            // Bản ghi không tồn tại hoặc chưa bị xóa, bạn có thể tạo một bản ghi mới
            return PostDmModel::create(
                [
                    'image' => $imagePath,
                    'ten_dm' => $request->ten_dm
                ]
            );
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {

        $postdmModel = PostDmModel::find($id);

        if (!$postdmModel) {
            return response()->json(['message' => 'Không tìm thấy đối tượng LoaiTourModel'], 404);
        }

        return response()->json($postdmModel);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $postdmModel = PostDmModel::find($id);

        if (!$postdmModel) {
            return response()->json(['message' => 'Không tìm thấy đối tượng PostDmModel'], 404);
        }

        // Kiểm tra và xử lý nếu có file ảnh được gửi lên
        if ($request->hasFile('image')) {
            $image = $request->file('image');

            // Xóa ảnh hiện tại nếu có
            if ($postdmModel->image) {
                Storage::disk('public')->delete($postdmModel->image);
            }

            // Lưu trữ ảnh mới vào thư mục 'images' trong 'public'
            $imagePath = $image->store('images', 'public');

            // Cập nhật đường dẫn ảnh trong cơ sở dữ liệu
            $postdmModel->image = $imagePath;
        }

        // Cập nhật các trường dữ liệu khác nếu có
        $postdmModel->ten_dm = $request->ten_dm;

        // Lưu các thay đổi vào cơ sở dữ liệu
        $postdmModel->save();

        return response()->json(['message' => 'Cập nhật thành công']);
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        $postdmModel = PostDmModel::find($id);
        if (!$postdmModel) {
            return response()->json(['message' => 'Không tìm thấy đối tượng LoaiTourModel'], 404);
        }
        return $postdmModel->delete();
    }
}
