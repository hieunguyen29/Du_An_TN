<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class bannerLogoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        DB::table('banner_logo')->insert([
            'image_banner'=>"hình 1",
            'image_logo'=>'hinh logo',
            'link_banner'=>'abc',
        ]);
    }
}
