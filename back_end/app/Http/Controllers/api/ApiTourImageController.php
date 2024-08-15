<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\TourImagesModel;

use Illuminate\Http\Request;

class ApiTourImageController extends Controller
{
   
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tourImages = TourImagesModel::all();
        return response()->json($tourImages);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // $request->validate([
        //     'tour_id' => 'required|exists:tour,id',
        //     'image_path' => 'required|string',
        // ]);
        $existingRecord = TourImagesModel::where('tour_id', $request->tour_id)
            ->where('image_id', $request->image_id)
            ->first();
        if ($existingRecord) {
            return response()->json(['message' => 'Ảnh đã có trong tour này'], 404);
        }
        $tourImage = TourImagesModel::create($request->all());
        return response()->json($tourImage, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $tourImage = TourImagesModel::find($id);
        if (!$tourImage) {
            return response()->json(['message' => 'Tour image not found'], 404);
        }
        return response()->json($tourImage);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $tourImage = TourImagesModel::find($id);
        if ($tourImage) {
            $existingRecord = TourImagesModel::where('tour_id', $request->tour_id)
                ->where('image_id', $request->image_id)
                ->first();
            if ($existingRecord) {
                return response()->json([
                    'message' => 'Ảnh Tour đã tồn tại'
                ], 404);
            } else {
                $tourImage->update($request->all());
                return response()->json($tourImage);
            }
        }else{
            return response()->json([
                'message' => 'Không tìm thấy thông tin'
            ], 404);
        }

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $tourImage = TourImagesModel::find($id);
        if (!$tourImage) {
            return response()->json(['message' => 'Tour image not found'], 404);
        }

        $tourImage->delete();
        return response()->json(['message' => 'Tour image deleted']);
    }
}