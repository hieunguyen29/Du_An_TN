<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Resources\LoaiKhachSanResoure;
use App\Models\LoaiKhachSanModel;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class ApiLoaiKhachSanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // lấy ra toàn bộ danh sách
        $khachsan = LoaiKhachSanModel::all();
        // trả về danh sách dưới dạng json

        return LoaiKhachSanResoure::collection($khachsan);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $loaiKS = $request->all();
        if ($request->hasFile('hinh') && $request->file('hinh')->isValid()) {
            $imagePath = uploadFile('hinh', $request->file('hinh'));
        } else {
            return response()->json(['error' => 'Invalid file or file upload failed'], 500);
        }
        // Kiểm tra trước khi thêm
        $existingRecord = DB::table('loai_khach_san')
            ->where('ten_khach_san', $loaiKS['ten_khach_san'])
            ->whereNotNull('deleted_at')
            ->first();

        if ($existingRecord) {
            // Bản ghi đã tồn tại và đã bị xóa, bạn có thể khôi phục nó
            DB::table('loai_khach_san')
                ->where('id', $existingRecord->id)
                ->update(['deleted_at' => null]);

            return response()->json(['message' => 'Khôi phục bản ghi thành công']);
        } else {
            // Bản ghi không tồn tại hoặc chưa bị xóa, bạn có thể tạo một bản ghi mới
            return LoaiKhachSanModel::create(
                [
                    'image' => $imagePath,
                    'ten_khach_san' => $request->ten_khach_san,
                    'dia_chi'=> $request->dia_chi,
                    'so_sao'=>$request->so_sao
                ]
            );
        }
    }

    /**
     * Display the specified resource.
     */
    //sửa
    public function show(string $id)
    {
        $khachsan = LoaiKhachSanModel::find($id);
        if ($khachsan) {
            return new LoaiKhachSanResoure($khachsan);
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
        $loaiks = LoaiKhachSanModel::find($id);
    
        if (!$loaiks) {
            return response()->json(['message' => 'Không tìm thấy đối tượng LoaiTourModel'], 404);
        }
    
        // Kiểm tra xem có tệp tin ảnh được gửi lên hay không
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            
            // Xóa ảnh hiện tại nếu có
            if ($loaiks->image) {
                Storage::disk('public')->delete($loaiks->image);
            }
            
            // Lưu trữ ảnh mới
            $imagePath = $image->store('hinh', 'public');
    
            // Cập nhật đường dẫn ảnh trong cơ sở dữ liệu
            $loaiks->image = $imagePath;
        }
        
        // Cập nhật các trường dữ liệu khác
        $loaiks->ten_khach_san = $request->input('ten_khach_san');
        $loaiks->dia_chi = $request->input('dia_chi');
        $loaiks->so_sao = $request->input('so_sao');
        // Lưu các thay đổi
        $loaiks->save();
    
        return response()->json(['message' => 'Cập nhật thành công']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $khachsan = LoaiKhachSanModel::find($id);
        if ($khachsan) {
            $khachsan->delete();
            return  response()->json([
                'message' => 'Xóa Thành Công'
            ], 201);
        } else {
            return  response()->json([
                'message' => 'Không tìm thấy thông tin'
            ], 404);
        }
    }
}