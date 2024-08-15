<x-mail::message>
# {{$data->loai_thong_tin}}  <br>
Họ tên: {{$data->ho_ten}} <br>
Email: {{$data->email}} <br>
Số điện thoại: {{$data->sdt}} <br>
{{$data->noi_dung}}



Thanks, {{$data->ho_ten}}<br>
{{ config('app.name') }}
</x-mail::message>
