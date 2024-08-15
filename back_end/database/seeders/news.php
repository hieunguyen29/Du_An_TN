<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class news extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        DB::table('news')->insert(

            [
                [
                    'tieu_de'=>"Tận hưởng kỳ nghỉ trọn vẹn tại những khách sạn
                    sang chảnh ở Đà Nẵng",
                    'image'=>'hinh.jpg',
                    'noi_dung'=>'du lịch muôn phương',
                    'ngay_dang'=>'2023/12/10'
                ]
            ]
        );
    }
}
