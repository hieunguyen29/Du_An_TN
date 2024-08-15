<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\BannerLogoModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class BannerLogoController extends Controller
{
    //
    public function index(){
        $banner_logo=BannerLogoModel::all();
        return response()->json($banner_logo);
    }
    public function store(Request $request)
    {
        if ($request->hasFile('hinh_banner') && $request->file('hinh_banner')->isValid()) {
            $imageBanner = uploadFile('hinh_banner', $request->file('hinh_banner'));
        } else {
            return response()->json(['error' => 'không thể thêm ảnh'], 500);
        }
        if ($request->hasFile('hinh_logo') && $request->file('hinh_logo')->isValid()) {
            $imageLogo = uploadFile('hinh_logo', $request->file('hinh_logo'));
        } else {
            return response()->json(['error' => 'không thể thêm ảnh'], 500);
        }
        $update_banner = BannerLogoModel::create([
            'link_banner' => $request->link_banner,
            'image_banner' => $imageBanner,
            'image_logo' => $imageLogo,
            
        ]);
        return response()->json(['message' => 'Thêm ảnh và logo thành công']);
    }
    public function show(string $id){
        $banner_logo=BannerLogoModel::find($id);
        if (!$banner_logo) {
            return response()->json($banner_logo);
        }
        return response()->json($banner_logo);
    }

    
    public function update(Request $request, string $id)
    {
        $banner_logo=BannerLogoModel::find($id);
    
        // Kiểm tra xem có tệp tin ảnh được gửi lên hay không
        if ($request->hasFile('image_banner')) {
            $image = $request->file('image_banner');
            
            // Xóa ảnh hiện tại nếu có
            if ($banner_logo->image) {
                Storage::disk('public')->delete($banner_logo->image);
            }
            
            // Lưu trữ ảnh mới
            $image_banner = $image->store('hinh_banner', 'public');
    
            // Cập nhật đường dẫn ảnh trong cơ sở dữ liệu
            $banner_logo->image = $image_banner;
            
        }
       
        // Cập nhật các trường dữ liệu khác
        $banner_logo->fresh();
        $banner_logo->link_banner = $request->input('link_banner');
        
        dd($banner_logo);
        // Lưu các thay đổi
       $banner_logo->save();
    
        return response()->json(['message' => 'Cập nhật thành công']);
    }
    public function destroy(string $id){
        $delete_banner=BannerLogoModel::find($id);
        if(!$delete_banner){
            return response()->json([
                'message'=>'Không tìm thấy '
            ],404);
        }
        return $delete_banner->delete();


    }

    
}

