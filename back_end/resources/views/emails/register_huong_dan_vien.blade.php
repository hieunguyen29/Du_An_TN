<x-mail::message>
# Chúng tôi đã đăng kí cho bạn tài khoản làm hướng dẫn viên.
Kính chào {{$huongdanvien->ten_hd}}, <br>
THÔNG TIN TÀI KHOẢN <br>
Tên đăng nhập: {{$huongdanvien->email}} <br>
Password: {{$password}} <br>

<x-mail::button :url="'http://localhost:5173/signup'">
Đăng nhập
</x-mail::button>

Thanks,{{$huongdanvien->ten_hd}}<br>
{{ config('app.name') }}
</x-mail::message>
