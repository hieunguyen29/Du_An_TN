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
            'ten_tour' => "Hà Nội - Bái Đính - Khu Du Lịch Tràng An - Bái Đính - Hạ Long - Yên Tử",
            'diem_di' => 'Đà Nẵng',
            'diem_den' => 'Hà Nội',
            'lich_khoi_hanh' => '2023/12/10',
            'thoi_gian' => '4 ngày',
            'diem_khoi_hanh' => 'Đà Nẵng',
            'anh' => 'Abc.jpg',
            'soluong' => ' 3',
            'trang_thai' => '0',
            'ma_loai_tour' => '1',
            'ma_hdv' => '1',
        ]);
    }
}
