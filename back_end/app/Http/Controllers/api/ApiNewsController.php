<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\NewsModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;


class ApiNewsController extends Controller
{
    //
    public function index()
    {
        $news = NewsModel::all();
        return response()->json($news);
    }
    public function store(Request $request)
    {
        if ($request->hasFile('hinh') && $request->file('hinh')->isValid()) {
            $imagePath = uploadFile('hinh', $request->file('hinh'));
        } else {
            return response()->json(['error' => 'không thể thêm ảnh'], 500);
        }
        $news = NewsModel::create([
            'tieu_de' => $request->tieu_de,
            'image' => $imagePath,
            'noi_dung' => $request->noi_dung,
            'ngay_dang' => $request->ngay_dang,
        ]);
        return response()->json(['message' => 'Thêm tin tức thành công']);
    }
    public function show(string $id)
    {
        $news = NewsModel::find($id);
        if (!$news) {
            return response()->json($news);
        }
        return response()->json($news);
    }

    public function update(Request $request, string $id)
    {
        $news = NewsModel::find($id);
       
        $news->tieu_de = $request->input('tieu_de');
        $news->noi_dung = $request->input('noi_dung');
        $news->ngay_dang = $request->input('ngay_dang');
        if ($request->hasFile('hinh')) {
            $image = $request->file('hinh');

            // Xóa ảnh hiện tại nếu có
            if ($news->hinh) {
                Storage::disk('public')->delete($news->image);
            }

            // Lưu trữ ảnh mới
            $imagePath = $image->store('hinh', 'public');

            // Cập nhật đường dẫn ảnh trong cơ sở dữ liệu
            $news->image = $imagePath;
        }
     
        // Lưu các thay đổi
        $news->save();
        return response()->json(['message' => 'Cập nhật thành công']);

        if ($news) {
            $news->update($request->all());
        } else {
            return  response()->json([
                'message' => 'Không tìm thấy thong tin'
            ], 404);
        }
    }
    public function destroy(string $id){
        $news=NewsModel::find($id);
        if(!$news){
            return response()->json([
                'message'=>'Không tìm thấy tin tức'
            ],404);
        }
        return $news->delete();


    }
}