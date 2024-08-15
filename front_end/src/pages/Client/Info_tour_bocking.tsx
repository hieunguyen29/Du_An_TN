
import { FaQrcode, FaRegCalendarAlt, FaRegCalendarTimes } from "react-icons/fa";
import { Link, useParams } from 'react-router-dom';
import logo from "./img/logo.jpg"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useGetCheckbooktourQuery } from "../../api/Check";
import { data } from "autoprefixer";
type Props = {};

const Info_tour_bocking = () => {
  const img = {
    borderRadius: "10px",
    witdh: "100px",
    height: "66px",
  };
  // const data = [
  //   { id: 1, name: 'Name', dob: '1990-01-01', gender: 'Nam', address: 'Hà Nội', age: 31, room: '101' },

  //   // Add more data as needed
  // ];
  const [paymentResult, setPaymentResult] = useState(null);
  const [alertShown, setAlertShown] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    // Kiểm tra nếu trạng thái đã được lưu trong localStorage
    if (urlParams.get('vnp_ResponseCode') && !localStorage.getItem('paymentSuccess')) {
      alert('Thanh toán VNPAY thành công');
      setAlertShown(true);
    }
    const paymentData = {
      vnp_Amount: urlParams.get('vnp_Amount'), // tiền 
      vnp_BankCode: urlParams.get('vnp_BankCode'), // ngân hàng 
      vnp_PayDate: urlParams.get('vnp_PayDate'), // ngày thanh toán 
      vnp_ResponseCode: urlParams.get('vnp_ResponseCode'), // trạng thái 
      vnp_TxnRef: urlParams.get('vnp_TxnRef'),
    };

    axios.get('http://localhost:8000/api/showResult', { params: paymentData })
      .then(response => {
        setPaymentResult(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });

    axios.post('http://localhost:8000/api/paymentresult', paymentData)
      .then(response => {
        setPaymentResult(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (alertShown) {
      console.log('Alert shown:', paymentResult);
    }
  }, [alertShown, paymentResult]);
  ////
  const { id } = useParams<{ id: any }>();
  const { data: Data } = useGetCheckbooktourQuery(id || "");
  const DataCheck = Data?.data || [];
  console.log('Daata:', DataCheck);
  const DataTour = DataCheck.tours
  // console.log(DataTour);
  const DataThanhtoan = DataCheck.thanh_toan
  // console.log(DataThanhtoan.tong_tien_tt);
  console.log(DataTour);



  return (


    <div className="w-[80%] max-h-max  mx-auto ">


      <div className="flex gap-3">
        <div className="w-2/3 ">
          {" "}
          <div className="thongtinlienlac border py-5 px-5  max-h-[1000px] bg-white rounded">
            <p className="text-[22px]  text-red-500 font-bold">
              THÔNG TIN LIÊN LẠC
              <p className="mt-5">
                <hr />
              </p>
            </p>
            <div className="grid grid-cols-3 mt-5   ">
              <div className="py-5">
                <p className="text-gray-400 text-[16px]">Họ tên</p>
                <p className="text-[16px] text-[#2D4271] font-bold">{DataCheck.ten_khach_hang}</p>
              </div>
              <div className="py-5">
                <p className="text-gray-400 text-[16px]">Email</p>
                <p className="text-[16px] text-[#2D4271] font-bold">
                  {DataCheck.email}
                </p>
              </div>
              <div className="py-5">
                <p className="text-gray-400 text-[16px]">Địa chỉ</p>
                <p className="text-[16px] text-[#2D4271] font-bold">{DataCheck.dia_chi}</p>
              </div>
              <div>
                <p className="text-gray-400 text-[16px]">Di động</p>
                <p className="text-[16px] text-[#2D4271] font-bold">
                  {DataCheck.sdt}
                </p>
              </div>

              <div>
                <p className="text-gray-400 text-[16px]">Ghi chú</p>
                <p className="text-[16px] text-[#2D4271] font-bold">
                  Booking từ travel.com.vn.
                </p>
              </div>
            </div>
          </div>
          <div className="thongtinlienlac border mt-5 py-5 px-5   max-h-[1000px] bg-white rounded-lg">
            <p className="text-[22px]  text-red-500 font-bold">
              CHI TIẾT BOOKING
              <p className="mt-5">
                <hr />
              </p>
            </p>
            <div className="chitiet mt-5">
              <div className="flex gap-5 mt-5">
                <p className="text-[16px] text-[#2D4271] font-bold">
                  Số booking
                </p>
                <p>
                {DataThanhtoan && <p>{DataThanhtoan?.ma_giao_dich} </p>}
                {paymentResult && <p>{paymentResult?.ma_giao_dich} </p>} (Quý khách vui lòng nhớ số booking để thuận tiện
                  cho các giao dịch sau này)
                </p>
              </div>
              <div className="flex gap-5 mt-5">
                <p className="text-[16px] text-[#2D4271] font-bold">
                  Trị giá booking
                </p>
                {DataThanhtoan && <p>{DataThanhtoan?.tong_tien_tt} đ</p>}
                {paymentResult && <p>{paymentResult?.tong_tien_tt} đ</p>}
              </div>
              <div className="flex gap-5 mt-5">
                <p className="text-[16px] text-[#2D4271] font-bold">
                  Số tiền đã thanh toán
                </p>
                {DataThanhtoan && <p>{DataThanhtoan?.tong_tien_tt} đ</p>}
                {paymentResult && <p>{paymentResult?.tong_tien_tt} đ</p>}
              </div>
              <div className="flex gap-5 mt-5">
                <p className="text-[16px] text-[#2D4271] font-bold">
                  Trạng thái
                </p>
                {paymentResult ? (
                  <p>{paymentResult?.ma_phan_hoi === "00" ? "Đã thanh toán" : "Chưa thanh toán"}</p>
                ) : (
                  <p>{DataCheck && DataCheck?.trang_thai === 0 ? "Chưa thanh toán" : "Đã thanh toán"}</p>
                )}
              </div>
              <div className="flex gap-5 mt-5">
                <p className="text-[16px] text-[#2D4271] font-bold">
                  Ngày đăng ký
                </p>
                {paymentResult && (
                  <p>{(paymentResult?.updated_at)}</p>
                )}
                <p>{DataThanhtoan?.ngay_thanh_toan}</p>
              </div>
              <div className="flex gap-5 mt-5">
                <p className="text-[16px] text-[#2D4271] font-bold">
                  Hình thức thanh toán
                </p>
                {paymentResult && <p>{paymentResult?.pttt} </p>}
                <p>{DataThanhtoan?.pttt}</p>
              </div>
              <div className="flex gap-5 mt-5">
                <p className="text-[16px] text-[#2D4271] font-bold">
                  Tình trạng
                </p>
                <p>
                  Booking của quý khách đã được chúng tôi xác nhận thành công
                </p>
              </div>
              <div className="flex gap-5 mt-5">
                <p className="text-[16px] text-[#2D4271] font-bold">
                  Thời hạn thanh toán
                </p>
                <p>
                  07/10/23 17:59:12 (Theo giờ Việt Nam. Booking sẽ tự động hủy
                  nếu quá thời hạn thanh toán trên)
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-h-[900px] w-1/3 border rounded-lg py-6 px-4 ">
          <p className="mt-1 text-red-500 text-[22px] font-bold">
            PHIẾU XÁC NHẬN BOOKING
            <br />
            <p className="mt-3"></p> <hr />
          </p>
          <p className=" text-[#2D4271] text-base mt-5 font-semibold">
            {DataTour?.ten_tour}
          </p>
          <p className=" text-[#2D4271] text-base font-semibold">
            Số booking: 231007278935
            <p className="mt-3"></p> <hr />
            <p className=" text-[#2D4271] text-base mt-5 font-semibold">
              Mã tour: NDTUPV59160-009-121023VU
            </p>
          </p>

          <div className="time mt-8 ">
            <div className="flex gap-5 items-center">
              <h2 className="text-blue-500 text-[24px]">
                <FaRegCalendarAlt />
              </h2>
              <div>
                <p>Bắt đầu chuyến đi</p>
                <p className=" text-[#2D4271] text-base font-semibold">
                  {DataTour?.lich_khoi_hanh}
                </p>
              </div>
            </div>
          </div>
          <div className="time mt-8 ">
            <div className="flex gap-5 items-center">
              <h2 className="text-blue-500 text-[24px]">
                <FaRegCalendarTimes />
              </h2>
              <div>
                <p>Kết thúc chuyến đi</p>
                <p className=" text-[#2D4271] text-base font-semibold">
                  {DataTour?.ngay_ket_thuc}
                </p>
              </div>
            </div>
            <p className=" text-[#2D4271] text-base mt-5 font-semibold">
              Nơi khởi hành {DataTour?.diem_khoi_hanh}
            </p>
            <p className="text-center items-center ml-[50px] text-[200px]">
              <FaQrcode />
            </p>
            <p className=" text-[#2D4271] text-base mt-5 font-normal">
              Để xem thông tin chương trình tour mới nhất Quý khách có thể dùng
              điện thoại để quét mã QR bên cạnh để truy cập vào website. Để cài
              phần mềm quét mã QR Code quý khách có thể tìm trong kho ứng dụng
              của điện thoại với từ khóa sau: QRCode Scanner, QRCode Reader,..
            </p>
          </div>
        </div>
      </div>
      <div className="border py-5  px-5 rounded-md max-h-100px mt-14 bg-white w-full">
        <p className="text-[22px]  text-red-500 font-bold">
          DANH SÁCH HÀNH KHÁCH
          <p className="mt-5">
            <hr />
          </p>
        </p>
        <div>
          <table className="min-w-full text-center bg-white border border-gray-300">
            <thead className=" text-[#2D4271] bg-gray-200">
              <tr>
                <th className="py-2 px-4 border-b">Họ tên</th>
                <th className="py-2 px-4 border-b">Ngày sinh</th>
                <th className="py-2 px-4 border-b">Giới tính</th>
                <th className="py-2 px-4 border-b">Địa chỉ</th>
                <th className="py-2 px-4 border-b">Độ tuổi</th>
                <th className="py-2 px-4 border-b">Phòng đơn</th>
              </tr>
            </thead>
            <tbody>

              <tr key={DataCheck.id}>
                <td className="py-2 px-4 border-b">{DataCheck.ten_khach_hang}</td>

              </tr>

            </tbody>
          </table>
        </div>
      </div>
      <div className="border py-5  px-5 rounded-md max-h-100px mt-14 bg-white w-full">
        <p className="text-[22px]  text-red-500 font-bold">
          DANH SÁCH PHIẾU THU
          <p className="mt-5">
            <hr />
          </p>
        </p>
        <div>

        </div>
      </div>
    </div>
  );
};

export default Info_tour_bocking;
