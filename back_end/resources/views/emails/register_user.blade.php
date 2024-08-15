<x-mail::message>
    # Chúng tôi đã đăng kí cho bạn tài khoản
    Kính chào {{$user->name}},
    THÔNG TIN TÀI KHOẢN
    Tên đăng nhập: {{$user->email}}
    Password: {{$user->password}}

    <x-mail::button :url="'http://localhost:5173/signup'">
        Đăng nhập
    </x-mail::button>

    Thanks,{{$user->name}}<br>
    {{ config('app.name') }}
</x-mail::message>