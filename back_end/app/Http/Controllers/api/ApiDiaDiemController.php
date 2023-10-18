<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\DiaDiemResoure;
use App\Models\DiaDiemModel;
use Illuminate\Http\Request;

class ApiDiaDiemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
      $diadiem = DiaDiemModel::all();
      return DiaDiemResoure::collection($diadiem);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $diadiem = DiaDiemModel::create($request->all());
        // trả về thông tin vừa thêm
        return new DiaDiemResoure($diadiem);
    }   

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $diadiem = DiaDiemModel::find($id);
        if ($diadiem) {
            return new DiaDiemResoure($diadiem);
        } else {
            return  response()->json([
                'message' => 'Không tìm thấy thong tin'
            ], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $diadiem = DiaDiemModel::find($id);
        if ($diadiem) {
          $diadiem->update($request->all());
          return new DiaDiemResoure($diadiem);
        } else {
            return  response()->json([
                'message' => 'Không tìm thấy thong tin'
            ], 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $diadiem = DiaDiemModel::find($id);
        if ($diadiem) {
          $diadiem->delete();
          return  response()->json([
            'message' => 'Xóa Thành Công '
        ], 201);
        } else {
            return  response()->json([
                'message' => 'Không tìm thấy thong tin'
            ], 404);
        }
    }
}
