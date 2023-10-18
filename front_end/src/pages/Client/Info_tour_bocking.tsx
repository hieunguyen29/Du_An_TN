import React from "react";
import { FaQrcode, FaRegCalendarAlt, FaRegCalendarTimes } from "react-icons/fa";
import { Link } from 'react-router-dom';
import logo from "./img/logo.jpg"

type Props = {};

const Info_tour_bocking = (props: Props) => {
  const img = {
    borderRadius: "10px",
    witdh: "100px",
    height: "66px",
  };
  const data = [
    { id: 1, name: 'Name', dob: '1990-01-01', gender: 'Nam', address: 'Hà Nội', age: 31, room: '101' },
   
    // Add more data as needed
  ];

  return (
    
    
    <div className="w-[80%] max-h-max  mx-auto ">
      
      <div className="menu flex items-center justify-between">
      <div className='flex'>
          <img src={logo} alt="logo" width="70px" />
          <nav className='font-semibold p-4 pt-6 pl-18'>
          <ul className='flex text-[#2D4271] gap-12'>
              <a href="/">PolyTour</a>
              <a href="/tour">Tour</a>
              <a href="/">Tin tức</a>
              <a href="">Khuyến mãi</a>
              <a href="/contact">Liên hệ</a>
            </ul>
          </nav>
          </div>
        <div className="search flex items-center">
  <input type="text" placeholder="Search..." className="border-yellow-300
border-[3px] px-2 py-2  rounded" />
  <button className="bg-blue-500 text-white py-2 px-3 rounded ml-2">Search</button>

  
<div className="ml-2">
  <Link to="/signup">
    <button className="bg-green-500 text-white py-1 px-3 rounded">
      <i className="fas fa-user"></i>
    </button>
  </Link>
</div>
</div></div>
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
                <p className="text-[16px] text-[#2D4271] font-bold">Name</p>
              </div>
              <div className="py-5">
                <p className="text-gray-400 text-[16px]">Email</p>
                <p className="text-[16px] text-[#2D4271] font-bold">
                  aa@gmail.com
                </p>
              </div>
              <div className="py-5">
                <p className="text-gray-400 text-[16px]">Địa chỉ</p>
                <p className="text-[16px] text-[#2D4271] font-bold">hà nội</p>
              </div>
              <div>
                <p className="text-gray-400 text-[16px]">Di động</p>
                <p className="text-[16px] text-[#2D4271] font-bold">
                  0*********0
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-[16px]">Điện thoại</p>
                <p className="text-[16px] text-[#2D4271] font-bold">
                  0*********0
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
                  231007399973 (Quý khách vui lòng nhớ số booking để thuận tiện
                  cho các giao dịch sau này)
                </p>
              </div>
              <div className="flex gap-5 mt-5">
                <p className="text-[16px] text-[#2D4271] font-bold">
                  Trị giá booking
                </p>
                <p>7,290,000₫</p>
              </div>
              <div className="flex gap-5 mt-5">
                <p className="text-[16px] text-[#2D4271] font-bold">
                  Số tiền đã thanh toán
                </p>
                <p>0₫</p>
              </div>
              <div className="flex gap-5 mt-5">
                <p className="text-[16px] text-[#2D4271] font-bold">
                  Số tiền còn lại
                </p>
                <p>7,290,000₫</p>
              </div>
              <div className="flex gap-5 mt-5">
                <p className="text-[16px] text-[#2D4271] font-bold">
                  Ngày đăng ký
                </p>
                <p>07/10/2023 16:59:12</p>
              </div>
              <div className="flex gap-5 mt-5">
                <p className="text-[16px] text-[#2D4271] font-bold">
                  Hình thức thanh toán
                </p>
                <p>Tiền mặt</p>
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
            Quy Nhơn: Vé máy bay khứ hồi + Phòng tại L'Amor Boutique Quy Nhơn 4
            sao ( Đã bao gồm ăn sáng)
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
                  T6, 6 Tháng 10, 2023
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
                  T6, 6 Tháng 10, 2023
                </p>
              </div>
            </div>
            <p className=" text-[#2D4271] text-base mt-5 font-semibold">
              Nơi khởi hành TP. Hồ Chí Minh
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
        {data.map((item) => (
          <tr key={item.id}>
            <td className="py-2 px-4 border-b">{item.name}</td>
            <td className="py-2 px-4 border-b">{item.dob}</td>
            <td className="py-2 px-4 border-b">{item.gender}</td>
            <td className="py-2 px-4 border-b">{item.address}</td>
            <td className="py-2 px-4 border-b">{item.age}</td>
            <td className="py-2 px-4 border-b">{item.room}</td>
          </tr>
        ))}
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
