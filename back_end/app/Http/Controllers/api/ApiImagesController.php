<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ImageResource;
use App\Models\ImageModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;

class ApiImagesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function getImage()
    {
        $files = Storage::files('public/hinh');
        $imageData = [];
        foreach ($files as $file) {
            $url = Storage::url($file); // Lấy URL truy cập tới tệp tin
            // Kiểm tra URL có tồn tại trong cơ sở dữ liệu hay không
            $data = DB::table('images')
                ->whereRaw("CONCAT('/storage/', image_path) = ?", [$url])->first();

            if ($data) {
                // Nếu URL tồn tại, lấy ID từ cơ sở dữ liệu
                $id = $data->id;
                // Lưu ID và URL vào mảng
                $imageData[] = [
                    'id' => $id,
                    'url' => $url
                ];
            }
        }

        return response()->json($imageData);
    }
    public function index()
    {

        $images = ImageModel::all();
        return ImageResource::collection($images);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $image = []; // Initialize the $image variable

        if ($request->hasFile('hinh') && $request->file('hinh')->isValid()) {
            $imagePath = uploadFile('hinh', $request->file('hinh'));
            $image['image_path'] = $imagePath;
        } else {
            return response()->json(['error' => 'Invalid file or file upload failed'], 500);
        }

        $createdImage = ImageModel::create($image);

        if (!$createdImage) {
            return response()->json(['error' => 'Không thể thêm ảnh'], 500);
        }

        return $createdImage;
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $image = ImageModel::find($id);
        if ($image) {
            return new ImageResource($image);
        } else {
            return  response()->json([
                'message' => 'Không tìm thấy thông tin'
            ], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $image = ImageModel::findOrFail($id);
    
        if (!$request->hasFile('hinh') && !$request->file('hinh')) {
            $uploadedImage = $request->file('hinh');
            $imagePath = uploadFile('hinh', $uploadedImage);
            $image->image_path = $imagePath;
        }else{
            return response()->json(['message' => 'không thành công ' ]);
        }
        $image->save();
    
        return response()->json(['message' => 'Ảnh đã được cập nhật thành công', 'image' => $image]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $image = ImageModel::find($id);
        if ($image) {
            $image->delete();
            Storage::delete('/public/' . $image->image_path);
            return  response()->json([
                'message' => 'Xóa Thành Công '
            ], 201);
        } else {
            return  response()->json([
                'message' => 'Không tìm thấy thong tin'
            ], 404);
        }
    }
}