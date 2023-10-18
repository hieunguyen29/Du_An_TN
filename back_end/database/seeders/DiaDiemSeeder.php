<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DiaDiemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('dia_diem')->insert(
            [
                [
                    'ten_dia_diem' => "Hà Nội",
                    'mo_ta' => "Hà Nội là thủ đô ngàn năm văn hiến, còn lưu dấu nhiều di tích như Hồ Gươm, Cầu Thê Húc, Chùa Quán Sứ, Hồ Tây, 36 phố phường. Hà Nội có bốn mùa, luôn mang đến nhiều hoài niệm khó phai, mỗi mùa một vẻ, xuân lễ hội, hạ tươi thắm, thu quyến rũ và đông ấn tượng. Món ngon có Phở, Chả cá Lã Vọng, bánh tôm Hồ Tây.

                    Đăng ký tour Hà Nội cùng Vietravel, Quý khách có thể đến khám phá các điểm đến nổi bật sau: Hồ Hoàn Kiếm, Đền Ngọc Sơn, Văn Miếu, Chùa Trấn Quốc, Lăng Hồ Chủ Tịch, Bảo tàng Hồ Chí Minh, Nhà Sàn Bác Hồ, Chùa Một Cột, Hoàng Thành Thăng Long, Cầu Thê Húc, Vườn Quốc Gia Ba Vì, Làng Cổ Đường Lâm, Chùa Hương,
                    
                    Để hiểu hơn về Hà Nội Mời Quý khách tham khảo Kinh nghiệm du lịch Hà Nội",
                    'ma_loai_tour' => 1

                ]
            ]
        );
    }
}
