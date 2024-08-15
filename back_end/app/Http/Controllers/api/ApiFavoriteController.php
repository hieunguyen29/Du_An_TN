<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Favorite;
use App\Models\TourModel;
use Illuminate\Http\Request;

class ApiFavoriteController extends Controller
{

    public function index(Request $request)
    {
        $userId = auth()->user()->id;
        $userFavorites = Favorite::where('user_id', $userId)->get();
        $tours = TourModel::with('images', 'phuongTien', 'khachSan', 'lichTRinh')->get();
        $Favorite = [];
        foreach($tours as $tour){
            foreach($userFavorites as $item){
                if($tour->id == $item->tour_id){
                   $Favorite[] = $tour;
                }
            }
        }
        return response()->json($Favorite, 200);
    }
    public function store(Request $request)
    {
        $user = auth()->user();
        $tourId = $request->input('tour_id');
        $existingFavorite = Favorite::where('user_id', $user->id)->where('tour_id', $tourId)->first();
        // kiểm tra có trong db hay chưa
        if ($existingFavorite) {
            // Nếu sản phẩm đã tồn tại, thực hiện xóa khỏi danh sách yêu thích
            $existingFavorite->delete();
            return response()->json(['message' => 'Sản phẩm đã được xóa khỏi danh sách yêu thích.'], 200);
        } else {
            // Nếu sản phẩm chưa tồn tại, thực hiện thêm vào danh sách yêu thích
            $userFavorite = Favorite::create([
                'user_id' => $user->id,
                'tour_id' => $tourId,
            ]);

            return response()->json($userFavorite, 201);
        }
    }
    // Hàm đăng ký sự kiện thêm sản phẩm vào yêu thích
    // const addToFavorites = (tourId) => {
    //     const token = 'YOUR_AUTH_TOKEN'; // Thay YOUR_AUTH_TOKEN bằng token xác thực lưu trữ trong ứng dụng của bạn

    //     axios.post('/api/user-favorites', { tour_id: tourId }, {
    //     headers: {
    //     Authorization: Bearer ${token},
    //     },
    //     })
    //     .then(response => {
    //     // Xử lý kết quả thành công
    //     console.log(response.data);
    //     })
    //     .catch(error => {
    //     // Xử lý lỗi
    //     console.error(error);
    //     });
    //     }; đây đúng không
}