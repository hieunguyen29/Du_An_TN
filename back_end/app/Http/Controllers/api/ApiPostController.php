<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\PostModel;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Carbon;

class ApiPostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $post = PostModel::all();
        return response()->json([
            'code' => 200,
            'data' => $post
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // $loaiTour = $request->all();
        if ($request->hasFile('hinh') && $request->file('hinh')->isValid()) {
            $imagePath = uploadFile('hinh', $request->file('hinh'));
        } else {
            return response()->json(['error' => 'Invalid file or file upload failed'], 500);
        }
        $ngay_dang   = Carbon::parse($request->ngay_dang)->format('Y-m-d');
        $requestData = $request->all();
        $requestData['image'] = $imagePath;
        $requestData['ngay_dang'] = $ngay_dang;
        return PostModel::create($requestData);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {

        $postdmModel = PostModel::find($id);

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
        $postdmModel = PostModel::find($id);

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

        $ngay_dang = Carbon::parse($request->ngay_dang)->format('Y-m-d');
        $requestData = $request->all();
        $requestData['image'] = $imagePath;
        $requestData['ngay_dang'] = $ngay_dang;

        // Cập nhật thông tin của postdmModel với dữ liệu mới từ request
        $postdmModel->update($requestData);

        return response()->json(['message' => 'Cập nhật thành công']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        $postdmModel = PostModel::find($id);
        if (!$postdmModel) {
            return response()->json(['message' => 'Không tìm thấy đối tượng LoaiTourModel'], 404);
        }
        return $postdmModel->delete();
    }
}
