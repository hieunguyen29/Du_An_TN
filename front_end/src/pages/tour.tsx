import React, { useState, useEffect } from "react";
import axios from "axios";

// import { IPour } from "../interface/home";
import { Link, Route, useParams } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import star from "../img/star.png"
import line from "../img/line.png"
import anh5 from "../img/anh5.png"
import ticket from "../img/ticket.png"
import shopping from "../img/shopping.png"
import anh6 from "../img/anh6.png"
import anh7 from "../img/anh7.png"
import anh8 from "../img/anh8.jpg"
import anh14 from '../img/anh14.jpg'
import anh15 from "../img/anh15.jpg"
import { useNavigate } from 'react-router-dom';

const rounded = { borderRadius: '25px' };

import { useLocation } from "react-router-dom"
import image from "antd/es/image";
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

const TourPage: React.FC = () => {
  const location = useLocation();
  const matchedResults: Tour[] = location.state?.matchedResults || [];

  useEffect(() => {
    // Thực hiện bất kỳ tác vụ nào bạn muốn với matchedResults
  }, [matchedResults]);
  const [budget, setBudget] = useState(0);


  const formatCurrency = (value) => {
    const formatter = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    });
    return formatter.format(value);
  };

  const handleBudgetChange = (event) => {
    const newBudget = event.target.value;
    setBudget(newBudget);
  };

  function calculateNumberOfDays(start, end) {
    const startDate = new Date(start);
    const endDate = new Date(end);

    const timeDifference = Math.abs(endDate - startDate);
    const numberOfDays = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    return numberOfDays;
  }

  const [tourdiemden, setTour] = useState([]);
  const { diem_den } = useParams<{ diem_den: any }>();
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/getToursByDestination?diem_den=${diem_den}`)
      .then((response) => {
        console.log(response.data.tourdiemden);
        setTour(response.data.tourdiemden);
      })
    if (diem_den === undefined) {
      axios
        .get(`http://127.0.0.1:8000/api/getToursByDestination?diem_den`)
        .then((response) => {
          console.log('123jhgkjg', response.data.tourdiemden);
          setTour(response.data.tourdiemden);
        })
    }
    console.log(`Tham số diem_den đã thay đổi thành: ${diem_den}`);
    // Cập nhật nội dung tương ứng với tham số mới
  }, [diem_den]);


  const [filteredTours, setFilteredTours] = useState([]);
  const [selectedDayRange, setSelectedDayRange] = useState(null);

  const handleButtonClick = (dayRange) => {
    // Đặt phạm vi ngày đã chọn
    setSelectedDayRange(dayRange);

    // Lọc các chuyến tham quan dựa trên phạm vi ngày đã chọn
    const filteredTours = tourdiemden.filter((tour) => {
      const numberOfDays = calculateNumberOfDays(tour.lich_khoi_hanh, tour.ngay_ket_thuc);

      if (dayRange === '1-3' && numberOfDays >= 1 && numberOfDays <= 3) {
        return true;
      } else if (dayRange === '4-7' && numberOfDays >= 4 && numberOfDays <= 7) {
        return true;
      } else if (dayRange === '8-14' && numberOfDays >= 8 && numberOfDays <= 14) {
        return true;
      } else if (dayRange === '14+' && numberOfDays > 14) {
        return true;
      }

      return false;
    });


    // Đặt các chuyến tham quan đã lọc
    setFilteredTours(filteredTours);
  };


  const [selectedNumberOfPeople, setSelectedNumberOfPeople] = useState(null);
  const filterToursByNumberOfPeople = (tour, selectedNumberOfPeople) => {
    if (!selectedNumberOfPeople) {
      return true; // No number of people selected, so the tour should be included
    }

    if (selectedNumberOfPeople === 1 && tour.soluong === 1) {
      return true;
    } else if (selectedNumberOfPeople === 2 && tour.soluong === 2) {
      return true;
    } else if (selectedNumberOfPeople === '3-5' && tour.soluong >= 3 && tour.soluong <= 5) {
      return true;
    } else if (selectedNumberOfPeople === 999 && tour.soluong > 5) {
      return true;
    }

    return false;
  };

  const handleNumberOfPeopleClick = (numberOfPeople) => {
    // Đặt số lượng người đã chọn
    console.log(numberOfPeople)
    setSelectedNumberOfPeople(numberOfPeople);

    // Lọc các chuyến tham quan dựa trên số lượng người đã chọn
    const filteredTours = tourdiemden.filter((tour) =>
      filterToursByNumberOfPeople(tour, numberOfPeople)
    );

    // Đặt các chuyến tham quan đã lọc
    setFilteredTours(filteredTours);
  };

  //SẢN PHẨM YÊU THÍCH
  //Thêm tour vào yêu thích
  const addToFavorites = (tourId) => {
    const token = localStorage.getItem('token');

    axios.post('http://127.0.0.1:8000/api/favorites', { tour_id: tourId }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        // Xử lý kết quả thành công
        console.log(response.data);
      })
      .catch(error => {
        // Xử lý lỗi
        console.error(error);
        alert("Bạn chưa đăng nhập!");
      });
  };

  const reloadTour = (e) => {
    e.preventDefault();
    window.location.reload();
  };

  console.log("selectedDayRange:", selectedDayRange);
  console.log("selectedNumberOfPeople:", selectedNumberOfPeople);
  console.log("matchedResults:", matchedResults);
  console.log("filteredTours:", filteredTours);
  console.log("tourdiemden:", tourdiemden);




  return (
    <div className=''>
      {/*  */}

      {/*  */}

      <div className='flex container mx-auto px-10 gap-11 pt-5'>
        {/* Conten left*/}
        <aside style={{ borderRadius: '10px' }} className=' left w-1/4 bg-white shadow-xl h-[1250px]'>
          <h1 className='font-medium text-3xl p-4'>Lọc kết quả</h1>
          <h2 className='bg-blue-600 text-2xl ct font-medium text-white px-4 py-1'>Poly Tour</h2>
          <div className='text-center p-2 py-4 '>
            <select className='rounded-md border border-black'>
              <option value="1">Du lịch</option>
              <option value="2">Trong Nước</option>
            </select>
          </div>
          <div className='text-center'>
            <button className='bg-white px-4 py-2 rounded-lg shadow-xl'>Trong nước</button>
          </div>
          <p className='px-3 py-3 text-xl font-medium'>Loại Hình Tour</p>
          <div className='px-3 text-center py-1'>
            <select name="" className='rounded-md border border-black w-72 h-9' id="">
              <option value="1">-- Tất cả --</option>
              <option value="2">Du lịch sinh thái.</option>
              <option value="2">Du lịch văn hóa.</option>
              <option value="2">Du lịch nghỉ dưỡng.</option>
              <option value="2">Du lịch giải trí</option>
              <option value="2">Du lịch thể thao.</option>
              <option value="2">Du lịch khám phá</option>
              <option value="2">Du lịch mạo hiểm</option>
              <option value="2">Du lịch kết hợp</option>
            </select>
          </div>
          <p className='px-3 text-lg font-medium py-1'>Điểm đi</p>
          <div className='px-3 text-center py-1'>
            <select name="" className='rounded-md border border-black w-72 h-9' id="">
              <option value="">Chọn Điểm đi</option>
              <option value="Hà Nội">Hà Nội</option>
              <option value="Hồ Chí Minh">Hồ Chí Minh (TP.HCM)</option>
              <option value="Hải Phòng">Hải Phòng</option>
              <option value="Đà Nẵng">Đà Nẵng</option>
              <option value="Cần Thơ">Cần Thơ</option>
              <option value="An Giang">An Giang</option>
              <option value="Bà Rịa - Vũng Tàu">Bà Rịa - Vũng Tàu</option>
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
          <p className='px-3 text-lg font-medium py-1'>Điểm đến</p>
          <div className='px-3 text-center py-1'>
            <select name="" className='rounded-md border border-black w-72 h-9' id="">
              <option value="">Chọn Điểm đến</option>
              <option value="Hà Nội">Hà Nội</option>
              <option value="Hồ Chí Minh">Hồ Chí Minh (TP.HCM)</option>
              <option value="Hải Phòng">Hải Phòng</option>
              <option value="Đà Nẵng">Đà Nẵng</option>
              <option value="Cần Thơ">Cần Thơ</option>
              <option value="An Giang">An Giang</option>
              <option value="Bà Rịa - Vũng Tàu">Bà Rịa - Vũng Tàu</option>
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

          <p className='px-3 text-lg font-medium pt-1'>Số ngày</p>
          <div className='flex gap-2 py-2 container justify-center'>
            <div className=''>
              <button onClick={() => handleButtonClick('1-3')} className='w-36 bg-white px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white shadow-xl'>1 đến 3 ngày</button>
            </div>
            <div className=''>
              <button onClick={() => handleButtonClick('4-7')} className='w-36 bg-white px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white shadow-xl'>4 đến 7 ngày</button>
            </div>
          </div>
          <div className='flex gap-2 py-2 container justify-center'>
            <div className=''>
              <button onClick={() => handleButtonClick('8-14')} className='w-36 bg-white px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white shadow-xl'>8 đến 14 ngày</button>
            </div>
            <div className=''>
              <button onClick={() => handleButtonClick('14+')} className='w-36 bg-white px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white shadow-xl'>trên 14 ngày</button>
            </div>
          </div>
          <p className='px-3 text-lg font-medium py-1'>Ngày đi</p>
          <div className='text-center'>
            <input className='pl-7 pr-12 w-56 h-10 rounded-lg' type="date" name="date" id="" />
          </div>
          <p className='px-3 text-lg font-medium py-1'>Số người</p>
          <div className='flex gap-2 py-2 container justify-center'>
            <div className=''>
              <button onClick={() => handleNumberOfPeopleClick(1)} className='w-32 bg-white px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white shadow-xl'>1 người</button>
            </div>
            <div className=''>
              <button onClick={() => handleNumberOfPeopleClick(2)} className='w-32 bg-white px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white shadow-xl'>2 người</button>
            </div>
          </div>
          <div className='flex gap-2 container justify-center'>
            <div className=''>
              <button onClick={() => handleNumberOfPeopleClick('3-5')} className='w-32 bg-white px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white shadow-xl'>3 - 5 người</button>
            </div>
            <div className=''>
              <button onClick={() => handleNumberOfPeopleClick(999)} className='w-32 bg-white px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white shadow-xl'>5+ người</button>
            </div>
          </div>
          <p className='px-3 text-lg font-medium py-3 mt-3'>Bộ lọc tìm kiếm___________</p>
          <h1 className='font-medium text-3xl p-4'>Lọc kết quả</h1>

          <p className='px-3 text-lg font-medium py-1'>Ngân sách của quý khách: {formatCurrency(budget)}</p>
          <div className='px-3 pt-1'>
            <input className='w-60' type="range" min="0" max="200000000" onChange={handleBudgetChange} />
          </div>
          <p className='px-3'>0đ - {formatCurrency(200000000)}</p>
          <p className='px-3 text-lg font-medium py-1'>Thông tin vận chuyển</p>
          <div className='flex gap-3 py-1 pt-2 container justify-center'>
            <div className=''>
              <button className='w-32 bg-white px-4 py-2 rounded-lg border border-black shadow-xl'>Máy bay</button>
            </div>
            <div className=''>
              <button className='w-32 bg-white px-4 py-2 rounded-lg border border-black shadow-xl'>Ô tô</button>
            </div>
          </div>

        </aside>

        {/*conten-right*/}
        <article className='w-3/4'>
          <p className='text-center text-2xl font-semibold'>Kết quả tìm kiếm tour du lịch</p>
          <div className='py-5 mb-3'><hr className='bg-black h-[1px]' /></div>
          <div className='grid grid-cols-3 gap-7 container mx-auto'>
            {(selectedDayRange || selectedNumberOfPeople
              ? filteredTours
              : matchedResults
            ).slice(0, 3).map((items) => (
              <div key={items.id} className="relative hover:transform hover:-translate-y-2 hover:transition-transform hover:duration-300">
                {/* ... (your existing code) */}
                <div className=' bg-white rounded-t-lg shadow-xl'>

                  <div className="relative">
                    <div className="py-2 absolute top-0 left-1">
                      <Link
                        to={``}  // Cập nhật thuộc tính 'to' để điều hướng đến trang yêu thích
                        className='mega-menu-items flex items-center'
                        onClick={() => addToFavorites(items.id)} // Sử dụng trực tiếp items.id thay vì hoveredItemId
                      >
                        {/* Thêm vào sản phẩm yêu thích */}
                        <i className="far text-2xl mr-2 text-white bg-transparent hover:text-red-500 transition duration-300">&#xf004;</i>
                      </Link>
                    </div>

                  </div>
                  {items.image_dd && (
                    <img
                      className="mt-4 rounded-lg w-full h-60 object-cover"
                      src={`http://localhost:8000/storage/${items.image_dd}`}
                      alt={`Ảnh ${items.ten_tour}`}
                    />
                  )}
                  <p className="px-2">{items.lich_khoi_hanh} - {calculateNumberOfDays(items.lich_khoi_hanh, items.ngay_ket_thuc)} ngày - Giờ đi: 05:20</p>
                  <Link to={`/tours/${items.id}`}><p className='font-bold py-2 px-2'>{items.ten_tour}</p></Link>
                  <p className='font-bold py-2 px-2'>Số lượng: {items.soluong} </p>
                  <div className='flex gap-2 py-2 px-4'>
                    <p className='text-sm'>Nơi khởi hành: </p>
                    <p className='font-medium text-sm'>{items.diem_di}</p>
                  </div>
                  <p className='text-base pt-1 px-4 text-blue-950 font-semibold'>Giá trẻ em: {formatCurrency(items.gia_treem)} </p>
                  <div className='grid grid-cols-2 justify-between px-4 p-1'>
                    <p className='text-xl font-bold text-red-500'>{formatCurrency(items.gia_nguoilon)} </p>
                    <div className='bg-yellow-300 py-2 text-center font-semibold rounded-xl text-white shadow-xl'>10% Giảm</div>
                  </div>
                  <div className="px-3 py-4 grid grid-cols-2 gap-7">
                    <button className="bg-red-500 hover:bg-red-900 px-4 py-2 rounded-lg text-white shadow-xl">Đặt Ngay</button>
                    <button className="border border-blue-600 px-5 py-2 rounded-lg hover:bg-slate-300 hover:text-white shadow-xl"><a href="" className="text-blue-600">Xem chi tiết</a></button>
                  </div>
                </div>
              </div>
            ))}
          </div>







          <div className='ml-auto py-4 pt-6'>
            <button className='py-2 px-3 border border-blue-400 rounded-lg hover:bg-teal-500 shadow-lg shadow-slate-400'>Xem tất cả</button>
          </div>
          <div className='py-5'><hr className='bg-black h-[2px]' /></div>

          <div className='py-3'>
            <div className='w-[860px] bg-gray-100 rounded-lg flex'>
              <img src="/src/img/sl.webp" alt="anh4" className='w-1/3 rounded-lg' />
              <div className='w-2/3 flex'>
                <div className='w-2/3 px-2'>
                  <div className='py-2'>
                    <p className='w-40 bg-blue-400 rounded-lg hover:bg-red-500 py-2 text-center text-white text-sm'>Vé máy bay - khách sạn</p>
                  </div>
                  <p className='text-sm font-medium'>
                    Đà Nẵng: Dịch vụ vé máy bay + 2 đêm nghỉ dưỡng tại Khách sạn
                    Grand Tourane 5 sao ( Đã bao gồm ăn sáng )
                  </p>
                  <div className='flex gap-1 py-2'>
                    <img src={star} alt="star" className='w-5' />
                    <img src={star} alt="star" className='w-5' />
                    <img src={star} alt="star" className='w-5' />
                    <img src={star} alt="star" className='w-5' />
                    <img src={star} alt="star" className='w-5' />
                  </div>
                  <p className='text-xs font-normal'>Bay Vietravel Airlines - Phòng Superior city view - Ăn sáng</p>
                  <p className='text-xs font-normal py-2 pt-5'>252 Võ Nguyên Giáp, Phước Mỹ, Sơn Trà, Đà Nẵng</p>
                </div>
                <div className='flex gap-3'>
                  <img src={line} alt="line" className='w-1 h-auto' />
                  <div className='pt-16'>
                    <p>Giá chỉ từ</p>
                    <div className='flex'>
                      <p className='text-xl text-red-500 font-medium'>2,590,000₫</p>
                      <p className='py-1'>/khách
                        Ngày đi 27/09/2023
                      </p>
                    </div>
                    <div className='flex gap-11'>
                      <button className='py-2 px-4 border border-blue-400 text-xs rounded-lg shadow-xl'>
                        Ngày khác
                      </button>
                      <button className='py-2 px-4 bg-red-500 text-xs rounded-lg text-white shadow-xl'>
                        Đặt ngay
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='py-3'>
            <div className='w-[860px] bg-gray-100 rounded-lg flex'>
              <img src={anh14} alt="anh14" className='w-1/3 rounded-lg' />
              <div className='w-2/3 flex'>
                <div className='w-2/3 px-2'>
                  <div className='py-2'>
                    <p className='w-40 bg-blue-400 rounded-lg hover:bg-red-500 py-2 text-center text-white text-sm'>Vé máy bay - khách sạn</p>
                  </div>
                  <p className='text-sm font-medium'>
                    Đà Nẵng: Dịch vụ vé máy bay + 2 đêm nghỉ dưỡng tại Khách sạn
                    Grand Tourane 5 sao ( Đã bao gồm ăn sáng )
                  </p>
                  <div className='flex gap-1 py-2'>
                    <img src={star} alt="star" className='w-5' />
                    <img src={star} alt="star" className='w-5' />
                    <img src={star} alt="star" className='w-5' />
                    <img src={star} alt="star" className='w-5' />
                    <img src={star} alt="star" className='w-5' />
                  </div>
                  <p className='text-xs font-normal'>Bay Vietravel Airlines - Phòng Superior city view - Ăn sáng</p>
                  <p className='text-xs font-normal py-2 pt-5'>252 Võ Nguyên Giáp, Phước Mỹ, Sơn Trà, Đà Nẵng</p>
                </div>
                <div className='flex gap-3'>
                  <img src={line} alt="line" className='w-1 h-auto' />
                  <div className='pt-16'>
                    <p>Giá chỉ từ</p>
                    <div className='flex'>
                      <p className='text-xl text-red-500 font-medium'>2,590,000₫</p>
                      <p className='py-1'>/khách
                        Ngày đi 27/09/2023
                      </p>
                    </div>
                    <div className='flex gap-11'>
                      <button className='py-2 px-4 border border-blue-400 text-xs rounded-lg'>
                        Ngày khác
                      </button>
                      <button className='py-2 px-4 bg-red-500 text-xs rounded-lg text-white'>
                        Đặt ngay
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='py-3'>
            <div className='w-[860px] bg-gray-100 rounded-lg flex'>
              <img src={anh15} alt="anh15" className='w-1/3 rounded-lg' />
              <div className='w-2/3 flex'>
                <div className='w-2/3 px-2'>
                  <div className='py-2'>
                    <p className='w-40 bg-blue-400 rounded-lg hover:bg-red-500 py-2 text-center text-white text-sm'>Vé máy bay - khách sạn</p>
                  </div>
                  <p className='text-sm font-medium'>
                    Đà Nẵng: Dịch vụ vé máy bay + 2 đêm nghỉ dưỡng tại Khách sạn
                    Grand Tourane 5 sao ( Đã bao gồm ăn sáng )
                  </p>
                  <div className='flex gap-1 py-2'>
                    <img src={star} alt="star" className='w-5' />
                    <img src={star} alt="star" className='w-5' />
                    <img src={star} alt="star" className='w-5' />
                    <img src={star} alt="star" className='w-5' />
                    <img src={star} alt="star" className='w-5' />
                  </div>
                  <p className='text-xs font-normal'>Bay Vietravel Airlines - Phòng Superior city view - Ăn sáng</p>
                  <p className='text-xs font-normal py-2 pt-5'>252 Võ Nguyên Giáp, Phước Mỹ, Sơn Trà, Đà Nẵng</p>
                </div>
                <div className='flex gap-3'>
                  <img src={line} alt="line" className='w-1 h-auto' />
                  <div className='pt-16'>
                    <p>Giá chỉ từ</p>
                    <div className='flex'>
                      <p className='text-xl text-red-500 font-medium'>2,590,000₫</p>
                      <p className='py-1'>/khách
                        Ngày đi 27/09/2023
                      </p>
                    </div>
                    <div className='flex gap-11'>
                      <button className='py-2 px-4 border border-blue-400 text-xs rounded-lg'>
                        Ngày khác
                      </button>
                      <button className='py-2 px-4 bg-red-500 text-xs rounded-lg text-white'>
                        Đặt ngay
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='py-4'>
            <p className='text-xl font-medium'>Các tour đang tìm phổ biến</p>
            <div className='flex gap-5 py-4'>
              <button className='w-36 px-4 py-2 hover:bg-slate-300 shadow-lg shadow-slate-600 rounded-md'>Đà Lạt</button>
              <button className='w-36 px-4 py-2 hover:bg-slate-300 shadow-lg shadow-slate-600 rounded-md'>Hạ long</button>
              <button className='w-36 px-4 py-2 hover:bg-slate-300 shadow-lg shadow-slate-600 rounded-md'>Phan thiết</button>
              <button className='w-36 px-4 py-2 hover:bg-slate-300 shadow-lg shadow-slate-600 rounded-md'>Du lịch đà nẵng</button>
            </div>
          </div>
          <p className='text-xl font-medium pb-4'>Các điểm đến ưa chuộng</p>
          <div className='grid grid-cols-4 gap-8 py-5'>
            <img src={anh5} alt="anh5" className='w-max rounded-lg' />
            <img src={anh6} alt="anh6" className='w-max rounded-lg' />
            <img src={anh7} alt="anh7" className='w-max rounded-lg' />
            <img src={anh8} alt="anh8" className='w-max rounded-lg' />
          </div>
        </article>
      </div>

      {/* Footer */}

    </div>
  )
}

export default TourPage