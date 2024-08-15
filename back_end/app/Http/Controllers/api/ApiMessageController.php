<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Message;
use Carbon\Carbon;

class ApiMessageController extends Controller
{
    public function findNameRole(){
        $adminAccountId = User::whereHas('roles', function ($query) {
            $query->where('name', 'customer_feedback');
        })->pluck('id')->first();
        return response()->json($adminAccountId);
    }
    public function showuser()
    {
       
        $user   = User::with('roles', 'roles.permissions')->get();
        return response()->json($user);
    }
    public function showMessage()
    {
        $messages = Message::orderBy('created_at', 'asc')->get();
        return response()->json($messages);
    }
    public function store(Request $request)
    {
        // Lấy ID của người gửi từ người dùng đã đăng nhập
        $senderId = $request->input('userid');
        // Lấy ID của người nhận từ request
        $receiverId = $request->input('receiver');
        $content = $request->input('content'); // nội dung
        if ($senderId) {
            // kiểm tra xem có phải tin nhắn đầu tiên hay không nếu
            // là tin đầu tiên thì gửi lại phản hôi luôn
            $isFirstMessage = false;
            $previousMessage = Message::where('sender_id', $senderId)->orderBy('created_at', 'desc')->first();
            if (!$previousMessage) {
                $isFirstMessage = true;
            }
            $adminReplyAccount = User::with('roles', 'roles.permissions')->find($senderId);
            if ($adminReplyAccount &&  $adminReplyAccount->roles->pluck('name')->implode(', ') == 'customer_feedback') {
                // Gửi tin nhắn từ admin đến khách hàng ban đầu
                $adminReplyMessage = new Message();
                $adminReplyMessage->sender_id = $senderId;
                $adminReplyMessage->receiver_id = $receiverId;
                $adminReplyMessage->content = $content;
                $adminReplyMessage->created_at = Carbon::now();
                $adminReplyMessage->save();
                $isFirstMessage = false;
            } else {
                // gửi đến tài khoản user có vai trò là admin
                $adminAccountId = User::whereHas('roles', function ($query) {
                    $query->where('name', 'customer_feedback');
                })->pluck('id')->first();
                $message = new Message();
                $message->sender_id = $senderId;
                $message->receiver_id = $adminAccountId;
                $message->content = $content;
                $message->created_at = Carbon::now(); // Lưu thời gian tạo tin nhắn
                $message->save();
                // Xóa các tin nhắn cũ
                $cutoffTime = Carbon::now()->subDays(7); // Giới hạn là 7 ngày trước
                Message::where('created_at', '<', $cutoffTime)->delete();
            }

            // check nếu chưa có tin nhắn cũ thì phản hồi lại luôn lần đầu
            if ($isFirstMessage) {
                // Phản hồi tin nhắn đầu tiên
                $adminAccountId = User::whereHas('roles', function ($query) {
                    $query->where('name', 'customer_feedback');
                })->pluck('id')->first();
                    $responseMessage = new Message();
                    $responseMessage->sender_id = $adminAccountId;
                    $responseMessage->receiver_id = $senderId;
                    $responseMessage->content = "Em chào Anh, cảm ơn Anh đã quan tâm đến các chương trình du lịch của Poly Tour.
                                                Anh đang cần tư vấn thông tin tour đi khu vực nào & khởi hành từ đâu ạ?";
                    $responseMessage->created_at = Carbon::now();
                    $responseMessage->save();
                    $cutoffTime = Carbon::now()->subDays(7); // Giới hạn là 7 ngày trước
                    Message::where('created_at', '<', $cutoffTime)->delete();
                
            }
            return response()->json($message, 201);
        } else {
            // chưa đăng nhập
            $adminAccountId = User::whereHas('roles', function ($query) {
                $query->where('name', 'customer_feedback');
            })->pluck('id')->first();
            $message = new Message();
            $message->sender_id = gethostbyname(gethostname()); // thay bằng null cũng được 
            $message->receiver_id = $adminAccountId;
            $message->content = $content;
            $message->created_at = Carbon::now(); // Lưu thời gian tạo tin nhắn
            $message->save();
            // Xóa các tin nhắn cũ
            $cutoffTime = Carbon::now()->subDays(7); // Giới hạn là 7 ngày trước
            Message::where('created_at', '<', $cutoffTime)->delete();

            return response()->json($message, 201);
        }
    }
}