<!DOCTYPE html>
<html>
  <head>
    <style>
        .m_-412003603614206739chitietbooking td {
            border: 1px solid rgb(240, 240, 240);
            width: 50px;
        }
        
    
        .m_-412003603614206739td-left {
            background-color: #f2f2f2;
            width: 225px;
            border: 1px solid rgb(240, 240, 240);
        }
    
    .m_-412003603614206739thongtinlienlac td {
        border: 1px solid rgb(240, 240, 240);
        padding: 5px;
    }
    
    .m_-412003603614206739td-left {
        background-color: #f2f2f2;
        font-weight: bold;
    }
    
    .m_-412003603614206739td-right {
        text-align: left;
    }
    </style>
  </head>
  <body>
   
<div>
    <table cellpadding="0" cellspacing="0" width="760" border="0">
        <tbody><tr>
            <td colspan="2">
                <div style="height:70px;width:760px">
                    <div style="float:left;width:380px;margin-top:10px">
                        <img>

                    </div>
                    <div style="float:left;width:380px;margin-top:10px">
                        <div style="margin-left:260px;text-align:left">
                            <span style="color:#c50000;font-weight:bold;font-size:20px">1900 1839</span><br>
                            <span style="color:#333;font-size:11px">cước gọi 1000đ/phút</span>
                        </div>
                        
                    </div>
                </div>
            </td>
        </tr>
        <tr>
            <td colspan="2">
                <div style="text-align:center;font-weight:bold;text-transform:uppercase;color:#000;font-size:24px;padding-top:20px;padding-bottom:20px;border-bottom:1px dotted #ccc;border-top:1px dotted #ccc;margin-bottom:30px">Booking của quý khách</div>
            </td>
        </tr>
        <tr>
            <td colspan="2">
                <div style="font-weight:bold;text-transform:uppercase;color:#c50000;margin-bottom:10px;font-size:16px">I. Phiếu xác nhận booking:</div>
                <div style="background:#f1f1f1;padding:15px;height:auto;margin-bottom:20px">
                    <div style="width:100%;float:left">
                        <div style="padding:0 15px 0 15px">
                            <div style="font-size:16px;text-align:justify;line-height:18px;color:#025da6;margin-bottom:10px">{{$tourone->ten_tour}}</div>
                            <div style="float:left;width:100%;margin-bottom:7px">
                                <div style="float:left;width:20%;font-weight:bold;color:#333">Mã tour:</div>
                                <div style="float:left;width:80%">{{$tourone->id}}</div>
                            </div>
                            <div style="float:left;width:100%;margin-bottom:7px">
                                <div style="float:left;width:20%;font-weight:bold;color:#333">Hành trình:</div>
                                <div style="float:left;width:80%">{{$tourone->diem_di}} //  {{$tourone->diem_den}}</div>
                            </div>
                            <div style="float:left;width:100%;margin-bottom:7px">
                                <div style="float:left;width:20%;font-weight:bold;color:#333">Ngày đi:</div>
                                <div style="float:left;width:30%">{{$tourone->lich_khoi_hanh}}</div>
                                <div style="float:left;width:20%;font-weight:bold;color:#333">Ngày về:</div>
                                <div style="float:left;width:30%">{{$tourone->ngay_ket_thuc}}</div>
                            </div>
                            <div style="float:left;width:100%;margin-bottom:7px">
                                <div style="float:left;width:20%;font-weight:bold;color:#333">Nơi tập trung:</div>
                                <div style="float:left;width:30%">05:00 sáng tại Trụ sở Poly tour - Trịnh Văn Bô-Nam Từ Liêm- Hà Nội</div>
                                <div style="float:left;width:20%;font-weight:bold;color:#333">Điểm khởi hành:</div>
                                <div style="float:left;width:30%">{{$tourone->diem_khoi_hanh}}</div>
                            </div>
                        </div>
                    </div>
                    <div style="clear:both"></div>
                </div>
            </td>
        </tr>
        <tr>
            <td colspan="2" class="m_-412003603614206739chitietbooking">
                <div style="font-weight:bold;text-transform:uppercase;color:#c50000;margin-bottom:10px;font-size:16px">II. Chi tiết booking:</div>
                <table width="100%" style="margin-bottom:20px ;">
                    <tbody><tr>
                        <td class="m_-412003603614206739td-left">Mã booking:</td>
                        <td class="m_-412003603614206739td-right">
                            <span style="font-weight:bold"></span>&nbsp;&nbsp;<a href="https://travel.com.vn/confirm-booking/231214210285" style="font-style:italic;color:#306eb7" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://travel.com.vn/confirm-booking/231214210285&amp;source=gmail&amp;ust=1702627682308000&amp;usg=AOvVaw2nuoWRFmFJleraaWbS2ocm">(Xem chi tiết)</a><br>
                            <span style="font-style:italic">Quý khách vui lòng nhớ số booking (Booking No) để thuận tiện cho các giao dịch sau này.</span>
                        </td>
                    </tr>
                    <tr>
                        <td class="m_-412003603614206739td-left">Trị giá booking:</td>
                        <td class="m_-412003603614206739td-right">
                            <span style="font-weight:bold;color:#c50000">5.890.000 đ</span>
                        </td>
                    </tr>
                    <tr>
                        <td class="m_-412003603614206739td-left">Ngày đăng ký:</td>
                        <td class="m_-412003603614206739td-right">
                            <span>14/12/2023 15:00:04 (Theo giờ Việt Nam) </span>
                        </td>
                    </tr>
                    <tr>
                        <td class="m_-412003603614206739td-left">Hình thức thanh toán:</td>
                        <td class="m_-412003603614206739td-right">
                            <span></span>
                        </td>
                    </tr>
                    <tr>
                        <td class="m_-412003603614206739td-left">Thời hạn thanh toán:</td>
                        <td class="m_-412003603614206739td-right">
                            14/12/2023 16:00:04 (Theo giờ Việt Nam)<br>
                            <span style="font-style:italic">Nếu quá thời hạn trên mà quý khách chưa thanh toán, Vietravel sẽ hủy booking này.</span>
                        </td>
                    </tr>
                    <tr>
                        <td class="m_-412003603614206739td-left">Tình trạng:</td>
                        <td class="m_-412003603614206739td-right" style="color:#c50000;font-weight:bold">
                            Booking của quý khách đã được chúng tôi xác nhận thành công
                        </td>
                    </tr>
                </tbody></table>
            </td>
        </tr>
        <tr>
            <td colspan="2" class="m_-412003603614206739thongtinlienlac">
                <div style="font-weight:bold;text-transform:uppercase;color:#c50000;margin-bottom:10px;font-size:16px">III. Thông tin liên lạc:</div>
                <table width="100%" style="margin-bottom:20px;">
                    <tbody><tr>
                        <td class="m_-412003603614206739td-left">Họ và tên:</td>
                        <td class="m_-412003603614206739td-right">
                            {{$createDatTour->ten_khach_hang}}
                        </td>
                    </tr>
                    <tr>
                        <td class="m_-412003603614206739td-left">Địa chỉ:</td>
                        <td class="m_-412003603614206739td-right">
                            {{$createDatTour->dia_chi}}
                        </td>
                    </tr>
                    <tr>
                        <td class="m_-412003603614206739td-left">Điện thoại:</td>
                        <td class="m_-412003603614206739td-right">
                            {{$createDatTour->sdt}}
                        </td>
                    </tr>
                    <tr>
                        <td class="m_-412003603614206739td-left">Di động:</td>
                        <td class="m_-412003603614206739td-right">
                            
                        </td>
                    </tr>
                    <tr>
                        <td class="m_-412003603614206739td-left">Email:</td>
                        <td class="m_-412003603614206739td-right">
                            <a href="mailto:namntph26026@fpt.edu.vn" style="color:#306eb7;font-style:italic" target="_blank"> {{$createDatTour->email}}</a>
                        </td>
                    </tr>
                    <tr>
                        <td class="m_-412003603614206739td-left">Ghi chú:</td>
                        <td class="m_-412003603614206739td-right">
                             (Tour giờ chót -200.000 ₫/1 khách). 
                        </td>
                    </tr>
                    <tr>
                        <td class="m_-412003603614206739td-left">Lưu ý:</td>
                        <td class="m_-412003603614206739td-right" style="font-weight:bold">
                            Số ghế trên xe được hệ thống tự động sắp xếp dựa trên thứ tự Quý khách đăng ký và thanh toán tour. <br>
                            <i>(Áp dụng đối với dịch vụ tour trọn gói)</i>
                        </td>
                    </tr>
                    <tr>
                        <td class="m_-412003603614206739td-left">Tổng số khách:</td>
                        <td class="m_-412003603614206739td-right">
                            <span style="float:left;color:#c50000;font-weight:bold">
                                {{$createDatTour->so_luong_khach}}
                            </span>
                            <span style="float:left;font-weight:bold;color:#333">
                                &nbsp; &nbsp; &nbsp; Người lớn:
                            </span>
                            <span style="float:left">
                                1
                            </span>
                            <span style="float:left;font-weight:bold;color:#333">
                                &nbsp; &nbsp; &nbsp; Trẻ em:
                            </span>
                            <span style="float:left">
                                0
                            </span>
                            <span style="float:left;font-weight:bold;color:#333">
                                &nbsp; &nbsp; &nbsp;   Trẻ nhỏ:
                            </span>
                            <span style="float:left">
                                0
                            </span>
                            <span style="float:left;font-weight:bold;color:#333">
                                &nbsp; &nbsp; &nbsp;   Em bé:
                            </span>
                            <span style="float:left">
                                0
                            </span>
                        </td>
                    </tr>
                </tbody></table>
            </td>
        </tr>
        <tr>
            <td colspan="2" style="font-weight: bold;">
                <div style="margin-bottom:15px">
                    Chúc quý khách 1 chuyến du lịch thật vui vẻ và bổ ích!
                </div>
            </td>
        </tr>
        <tr>
            <td colspan="2">
                Quý khách vui lòng <a href="https://travel.com.vn/confirm-booking/231214210285" style="color:#306eb7;font-style:italic" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://travel.com.vn/confirm-booking/231214210285&amp;source=gmail&amp;ust=1702627682308000&amp;usg=AOvVaw2nuoWRFmFJleraaWbS2ocm">click vào đây</a> để xem chi tiết booking.
                Điều khoản đăng ký online. Quý khách vui lòng <a href="https://travel.com.vn/cam-ket-online-noi-dia.aspx" style="color:#306eb7;font-style:italic" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://travel.com.vn/cam-ket-online-noi-dia.aspx&amp;source=gmail&amp;ust=1702627682308000&amp;usg=AOvVaw0yA-hTUH02s8qGH5-XPFOv">click vào đây</a>.
            </td>
        </tr>
        <tr>
            <td colspan="2">&nbsp;</td>
        </tr>
        <tr>
            <td colspan="2" style="height:40px !important;text-align:center;background:#306eb7;padding-top:15px;padding-bottom:15px;color:#fff">
                <div style="margin-bottom:5px"> 190 Pasteur, District 3, Ho Chi Minh City, Viet Nam</div>
                <div><span>Điện thoại:</span> (+84 28) 38 22 8898 - <span>Fax:</span> (+84 28) 3829 9142 - <span>Email:</span><a href="mailto:info@vietravel.com" target="_blank">info@vietravel.com</a></div>
            </td>
        </tr>
    </tbody>
</table>
  </body>
</html>
