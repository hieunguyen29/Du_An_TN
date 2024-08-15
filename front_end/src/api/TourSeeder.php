<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TourSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('tour')->insert([
            'ten_tour' => "Buôn Ma Thuột - Pleiku - Kon Tum - Khu Du Lịch Măng Đen - Hồ Lăk",
            'image_path' => json_encode(['a.jpg', 'b.jpg', 'c.jpg']),
            'diem_di' => 'Đà Nẵng',
            'diem_den' => 'Hà Nội',
            'lich_khoi_hanh' => '2023/12/10',
            'ngay_ket_thuc' => '2023/12/15',
            'diem_khoi_hanh' => 'Đà Nẵng',
            'gia_nguoilon' => 1000,
            'gia_treem' => 600,
            // 'gia_khuyen_mai' => 999,
            'mo_ta' => 'tour ok chưa bro',
            'soluong' =>  3,
            'trang_thai' => '0',
            'ma_loai_tour' => '1',

        ]);
    }
}
