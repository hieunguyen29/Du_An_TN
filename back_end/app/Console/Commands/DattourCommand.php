<?php

namespace App\Console\Commands;

use App\Models\DatTour;
use Illuminate\Console\Command;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
class DattourCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:dattour-command';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        
        $currentDate = Carbon::now()->toDateString(); // Lấy ngày hiện tại
        $tours = DatTour::all(); // Lấy danh sách các tour

        foreach ($tours as $tour) {
            $tourdetail = DB::table('tour')->where('id', $tour->id_tour)->first();

            // dd($tourdetail->soluong); // số lượng khách 
            $expirationDate = $tour->ngay_het_han;
            echo $expirationDate < $currentDate;
            if ($expirationDate < $currentDate && $tour->trang_thai == 0) {
                //  $tourdetail->update(['soluong'=>$tourdetail->soluong + $tour->so_luong_khach]);
                $affected = DB::table('tour')
                    ->where('id', $tour->id_tour)
                    ->update(['soluong' =>  DB::raw('soluong + ' . $tour->so_luong_khach)]);
                if ($tour->ThanhToan) {
                    $tour->ThanhToan->delete();
                }


                // Xóa tour
                $tour->delete();
            }
        }

        return 'Xóa các tour hết hạn thành công';
    
    }
}
