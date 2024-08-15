import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

type Props = {};

interface Tour {
  id: number;
  ten_tour: string;
  diem_di: string;
  diem_den: string;
  lich_khoi_hanh: string;
  ngay_ket_thuc: string;
  diem_khoi_hanh: string;
  gia_tour: number;
  mo_ta: string;
  soluong: number;
}

function TestPage({ }: Props) {
  const [searchResults, setSearchResults] = useState<Tour[]>([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedDepartureDate, setSelectedDepartureDate] = useState('');
  const [selectedDestination, setSelectedDestination] = useState('');
  const [selectedDeparture, setSelectedDeparture] = useState('');
  const [matchedResults, setMatchedResults] = useState<Tour[]>([]);
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/admin/tour/', {
        params: {
          ngayDen: selectedDate,
          lichKhoiHanh: selectedDepartureDate,
          diemDen: selectedDestination,
          diemDi: selectedDeparture
        }
      });

      setSearchResults(response.data.data);

      const filteredResults = response.data.data.filter((tour: Tour) =>
        tour.ngay_ket_thuc.includes(selectedDate) &&
        tour.lich_khoi_hanh.includes(selectedDepartureDate) &&
        tour.diem_den === selectedDestination &&
        tour.diem_di === selectedDeparture
      );

      setMatchedResults(filteredResults);

      if (filteredResults.length > 0) {
        // Chuyển trang khi có kết quả tìm kiếm chính xác
        navigate('/tt', { state: { matchedResults: filteredResults } });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (

    <div
      className="bg-white box-shadow rounded-lg  p-9 mx-auto hidden lg:block "
      style={{ maxWidth: "1200px", position: "relative", left: 0, top: "-110px" }}
    >
      <h1 className="font-medium text-2xl mb-10 text-blue-500 border-b border-blue-500 pb-4">PolyTour Trong Nước</h1>
      <div className="tour-form mt-2 flex items-center">
        <div className="flex items-center mr-4">
          <div className="flex hover:border-blue-500 icon-sheach items-center  px-4 py-2 border-[#ffc709] rounded-lg border-[4px] form-banner">
            <img
              src="https://cdn-icons-png.flaticon.com/128/61/61469.png"
              alt=""
              width={"20px"}
            />

            <div className="flex flex-col ml-3">
              <label htmlFor="departureDate" className="mr-2 text-[#2d4271] font-medium">
                Ngày đi:
              </label>
              <div className="relative">
                <label
                  htmlFor="departureDate"
                  className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400">
                </label>
                <input
            
                  type="date"
                  id="departureDate"

                  value={selectedDepartureDate}
                  onChange={(e) => setSelectedDepartureDate(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center mr-4">
          <div className="flex icon-sheach items-center hover:border-blue-500  px-4 py-2 border-[#ffc709] rounded-lg border-[4px] form-banner">
            <img src="https://cdn-icons-png.flaticon.com/128/61/61469.png" alt="" width={"20px"} />

            <div className="flex flex-col ml-3">
              <label htmlFor="arrivalDate" className="mr-2 text-[#2d4271] font-medium">
                Số ngày
              </label>
              <select name="" id="" className="h-[26px] text-[#2d4271] font-bold">
                <option value="1">1 ngày</option>
                <option value="3">3 ngày</option>
                <option value="5">5 ngày</option>
                <option value="7">7 ngày</option>
              </select>
            </div>
          </div>
        </div>
        <div className="flex items-center mr-4">
          <div className="flex icon-sheach items-center hover:border-blue-500  px-4 py-2 border-[#ffc709] rounded-lg border-[4px] form-banner">
            <img
              src="https://cdn-icons-png.flaticon.com/128/447/447031.png"
              alt=""
              width={"20px"}
            />
            <div className="flex flex-col ml-3">
              <label htmlFor="destination" className="mr-2 text-[#2d4271] font-medium">
                Điểm đi :
              </label>
              <select

            id="depeparture"
             
            value={selectedDeparture}
            onChange={(e) => setSelectedDeparture(e.target.value)}
          >
                <option value="Hà Nội"> Hà Nội</option>
                <option value="Đà Nẵng">Đà Nẵng</option>
                <option value="Hcm">Hồ Chí Minh </option>
                <option value="Hải Phòng">Hải Phòng</option>

                <option value="Cần Thơ">Cần Thơ</option>
                <option value="An Giang">An Giang</option>
                <option value="Bà Rịa">Bà Rịa - Vũng Tàu</option>
                <option value="Bắc Giang">Bắc Giang</option>
                <option value="Bắc Kạn">Bắc Kạn</option>
                <option value="Bạc Liêu">Bạc Liêu</option>
                <option value="Bắc Ninh">Bắc Ninh</option>
                <option value="Bến Tre">Bến Tre</option>
                <option value="Bình Định">Bình Định</option>
                <option value="Bình Dương">Bình Dương</option>
                <option value="Bình Phước">Bình Phước</option>
                <option value="Bình Thuận">Bình Thuận</option>
                <option value="Cà Mau">Cà Mau</option>
                <option value="Cao Bằng">Cao Bằng</option>
                <option value="Đắk Lắk">Đắk Lắk</option>
                <option value="Đắk Nông">Đắk Nông</option>
                <option value="Điện Biên">Điện Biên</option>
                <option value="Đồng Nai">Đồng Nai</option>
                <option value="Đồng Tháp">Đồng Tháp</option>
                <option value="Gia Lai">Gia Lai</option>
                <option value="Hà Giang">Hà Giang</option>
                <option value="Hà Nam">Hà Nam</option>
                <option value="Hà Tĩnh">Hà Tĩnh</option>
                <option value="Hải Dương">Hải Dương</option>
                <option value="Hậu Giang">Hậu Giang</option>
                <option value="Hòa Bình">Hòa Bình</option>
                <option value="Hưng Yên">Hưng Yên</option>
                <option value="Khánh Hòa">Khánh Hòa</option>
                <option value="Kiên Giang">Kiên Giang</option>
                <option value="Kon Tum">Kon Tum</option>
                <option value="Lai Châu">Lai Châu</option>
                <option value="Lâm Đồng">Lâm Đồng</option>
                <option value="Lạng Sơn">Lạng Sơn</option>
                <option value="Lào Cai">Lào Cai</option>
                <option value="Long An">Long An</option>
                <option value="Nam Định">Nam Định</option>
                <option value="Nghệ An">Nghệ An</option>
                <option value="Ninh Bình">Ninh Bình</option>
                <option value="Ninh Thuận">Ninh Thuận</option>
                <option value="Phú Thọ">Phú Thọ</option>
                <option value="Phú Yên">Phú Yên</option>
                <option value="Quảng Bình">Quảng Bình</option>
                <option value="Quảng Nam">Quảng Nam</option>
                <option value="Quảng Ngãi">Quảng Ngãi</option>
                <option value="Quảng Ninh">Quảng Ninh</option>
                <option value="Quảng Trị">Quảng Trị</option>
                <option value="Sóc Trăng">Sóc Trăng</option>
                <option value="Sơn La">Sơn La</option>
              </select>
            </div>
          </div>
        </div>
        <div className="tuongduong">
          <img src="https://cdn-icons-png.flaticon.com/128/5519/5519832.png" alt="" />
        </div>

        <div className="flex items-center mr-4">
          <div className="flex icon-sheach items-center hover:border-blue-500  px-4 py-2 border-[#ffc709] rounded-lg border-[4px] form-banner">
            <img
              src="https://cdn-icons-png.flaticon.com/128/447/447031.png"
              alt=""
              width={"20px"}
            />

            <div className="flex flex-col ml-3">
              <label htmlFor="destination" className="mr-2 text-[#2d4271] font-medium">
                Điểm đến :
              </label>
              <select
      
            id="destination"

            value={selectedDestination}
            onChange={(e) => setSelectedDestination(e.target.value)}
          >
                <option value="Hà Nội"> Hà Nội</option>
                <option value="Miền Tây">MT </option>
                <option value="Hcm">Hồ Chí Minh </option>
                <option value="Hải Phòng">Hải Phòng</option>
                <option value="Đà Nẵng">Đà Nẵng</option>
                <option value="Cần Thơ">Cần Thơ</option>
                <option value="An Giang">An Giang</option>
                <option value="Bà Rịa">Bà Rịa - Vũng Tàu</option>
                <option value="Bắc Giang">Bắc Giang</option>
                <option value="Bắc Kạn">Bắc Kạn</option>
                <option value="Bạc Liêu">Bạc Liêu</option>
                <option value="Bắc Ninh">Bắc Ninh</option>
                <option value="Bến Tre">Bến Tre</option>
                <option value="Bình Định">Bình Định</option>
                <option value="Bình Dương">Bình Dương</option>
                <option value="Bình Phước">Bình Phước</option>
                <option value="Bình Thuận">Bình Thuận</option>
                <option value="Cà Mau">Cà Mau</option>
                <option value="Cao Bằng">Cao Bằng</option>
                <option value="Đắk Lắk">Đắk Lắk</option>
                <option value="Đắk Nông">Đắk Nông</option>
                <option value="Điện Biên">Điện Biên</option>
                <option value="Đồng Nai">Đồng Nai</option>
                <option value="Đồng Tháp">Đồng Tháp</option>
                <option value="Gia Lai">Gia Lai</option>
                <option value="Hà Giang">Hà Giang</option>
                <option value="Hà Nam">Hà Nam</option>
                <option value="Hà Tĩnh">Hà Tĩnh</option>
                <option value="Hải Dương">Hải Dương</option>
                <option value="Hậu Giang">Hậu Giang</option>
                <option value="Hòa Bình">Hòa Bình</option>
                <option value="Hưng Yên">Hưng Yên</option>
                <option value="Khánh Hòa">Khánh Hòa</option>
                <option value="Kiên Giang">Kiên Giang</option>
                <option value="Kon Tum">Kon Tum</option>
                <option value="Lai Châu">Lai Châu</option>
                <option value="Lâm Đồng">Lâm Đồng</option>
                <option value="Lạng Sơn">Lạng Sơn</option>
                <option value="Lào Cai">Lào Cai</option>
                <option value="Long An">Long An</option>
                <option value="Nam Định">Nam Định</option>
                <option value="Nghệ An">Nghệ An</option>
                <option value="Ninh Bình">Ninh Bình</option>
                <option value="Ninh Thuận">Ninh Thuận</option>
                <option value="Phú Thọ">Phú Thọ</option>
                <option value="Phú Yên">Phú Yên</option>
                <option value="Quảng Bình">Quảng Bình</option>
                <option value="Quảng Nam">Quảng Nam</option>
                <option value="Quảng Ngãi">Quảng Ngãi</option>
                <option value="Quảng Ninh">Quảng Ninh</option>
                <option value="Quảng Trị">Quảng Trị</option>
                <option value="Sóc Trăng">Sóc Trăng</option>
                <option value="Sơn La">Sơn La</option>
              </select>
            </div>
          </div>
        </div>

        <button
          className="hover:bg-blue-500 bg-[#ffc709] text-white py-3 px-5 rounded ml-2 max-w-[150px] w-full  h-[72px]"
          onClick={handleSearch}
        >
          Tìm kiếm
        </button>
      </div>
    </div>

  );
}

export default TestPage;