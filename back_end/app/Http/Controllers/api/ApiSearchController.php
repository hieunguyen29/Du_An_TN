<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\TourModel;
use Illuminate\Http\Request;

class ApiSearchController extends Controller
{
    //
    public function getListDiemDen()
    {
        $diemDen = TourModel::pluck('diem_den');
        $uniqueDiemDen = [];
    
        foreach ($diemDen as $value) {
            $lowerValue = strtolower($value);
            $found = false;
           
            foreach ($uniqueDiemDen as $uniqueValue) {
                
                if (strtolower($uniqueValue) === $lowerValue) {
                    $found = true;
                    break;   
                }
            }
            
            if (!$found) {
                $uniqueDiemDen[] = $value;
            }
        }
    
        return response()->json(['data' => $uniqueDiemDen], 200);
    }

    public function getListDiemDi(){
        $diemDi = TourModel::pluck('diem_di');
        $uniqueDiemDi = [];
    
        foreach ($diemDi as $value) {
            $lowerValue = strtolower($value);
            $found = false;
           
            foreach ($uniqueDiemDi as $uniqueValue) {
                
                if (strtolower($uniqueValue) === $lowerValue) {
                    $found = true;
                    break;   
                }
            }
            
            if (!$found) {
                $uniqueDiemDi[] = $value;
            }
        }
    
        return response()->json(['data' => $uniqueDiemDi], 200);
    }

    public function searchTour(Request $request) {
        $query = TourModel::query();
        // dd($query);
        if($request->has('diem_di')){
            $diem_di = $request->input('diem_di');
            $query->where('diem_di',$diem_di);
        }
        $tour = $query->get();
        return response()->json(['data'=>$tour],200);
    }
}