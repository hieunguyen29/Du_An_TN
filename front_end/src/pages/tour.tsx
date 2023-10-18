import React from 'react'
import AiOutlineShoppingCart from 'react-icons'
import logo from '../img/logo.jpg'
import anh1 from '../img/anh1.jpg'
import anh2 from '../img/anh2.jpg'
import anh3 from '../img/anh3.jpg'
import ticket from "../img/ticket.png"
import shopping from "../img/shopping.png"
import anh4 from "../img/anh4.jpg"
import star from "../img/star.png"
import line from "../img/line.png"
import anh5 from "../img/anh5.png"
import anh6 from "../img/anh6.png"
import anh7 from "../img/anh7.png"
import anh8 from "../img/anh8.jpg"
import anh14 from '../img/anh14.jpg'
import anh15 from "../img/anh15.jpg"


const rounded = {
  borderRadius: '25px',
};
const TourPage = () => {
  // const images = [
  //     {
  //         id: 1,
  //         name:'product-1',
  //         imagePath: qq
  //     }
  // ]
  return (
    <div className=''>
      <header>
        <div className='flex'>
          <img style={rounded} src={logo} alt="logo" width="100px" />
          <nav className='p-4 pt-6 pl-20'>

            <ul className='flex gap-12'>
              <a href="">Du lịch</a>
              <a href="">Vận chuyển</a>
              <a href="">Tin tức</a>
              <a href="">Khuyến mãi</a>
              <a href="">Liên hệ</a>
            </ul>
          </nav>
          <div className='p-4 pt-6 ml-auto'>
            <input className='border border-blue-400 rounded-md w-64' type="text" placeholder='Bắt đầu tìm kiếm...' name="" id="" />
          </div>
          <button className='pr-5'>
            <svg xmlns="http://www.w3.org/2000/svg" height="1.4em" viewBox="0 0 448 512"><path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z" />
            </svg>
          </button>
        </div>
      </header>
      <p className='container mx-auto py-1'>Du lịch -- Tìm kiếm tour du lịch</p>

      
      <div className='flex container mx-auto gap-11 pt-5'>
        {/* Conten left*/}
        <aside className='w-1/4 bg-gray-100 h-[1300px]'>
          <h1 className='font-medium text-3xl p-4'>Lọc kết quả</h1>
          <h2 className='bg-blue-600 text-2xl font-medium text-white px-4 py-1'>Tour</h2>
          <div className='text-center p-2 py-4 '>
            <select className='rounded-md border border-black'>
              <option value="1">Du lịch</option>
              <option value="2">Trong Nước</option>
            </select>
          </div>
          <div className='text-center'>
            <button className='bg-white px-4 py-2 rounded-lg border border-black'>Trong nước</button>
          </div>
          <p className='px-3 py-1 text-xl font-medium'>Loại Hình Tour</p>
          <div className='px-3 text-center py-1'>
            <select name="" className='rounded-md border border-black w-72 h-9' id="">
              <option value="1">-- Tất cả --</option>
              <option value="2">okok</option>
            </select>
          </div>
          <p className='px-3 text-lg font-medium py-1'>Điểm đi</p>
          <div className='px-3 text-center py-1'>
            <select name="" className='rounded-md border border-black w-72 h-9' id="">
              <option value="1">-- Tất cả --</option>
              <option value="2">okok</option>
            </select>
          </div>
          <p className='px-3 text-lg font-medium py-1'>Điểm đến</p>
          <div className='px-3 text-center py-1'>
            <select name="" className='rounded-md border border-black w-72 h-9' id="">
              <option value="1">-- Chọn điểm đến --</option>
              <option value="2">okok</option>
            </select>
          </div>
          <p className='px-3 text-lg font-medium pt-1'>Số ngày</p>
          <div className='flex gap-2 py-2 px-11'>
            <div className=''>
              <button className='w-36 bg-white px-4 py-2 rounded-lg border border-black'>1 đến 3 ngày</button>
            </div>
            <div className=''>
              <button className='w-36 bg-white px-4 py-2 rounded-lg border border-black'>4 đến 7 ngày</button>
            </div>
          </div>
          <div className='flex gap-2 py-2 px-11'>
            <div className=''>
              <button className='w-36 bg-white px-4 py-2 rounded-lg border border-black'>8 đến 14 ngày</button>
            </div>
            <div className=''>
              <button className='w-36 bg-white px-4 py-2 rounded-lg border border-black'>trên 14 ngày</button>
            </div>
          </div>
          <p className='px-3 text-lg font-medium py-1'>Ngày đi</p>
          <div className='text-center'>
            <input className='pl-7 pr-12 w-56 h-10 rounded-lg' type="date" name="date" id="" />
          </div>
          <p className='px-3 text-lg font-medium py-1'>Số người</p>
          <div className='flex gap-2 py-2 px-14'>
            <div className=''>
              <button className='w-32 bg-white px-4 py-2 rounded-lg border border-black'>1 người</button>
            </div>
            <div className=''>
              <button className='w-32 bg-white px-4 py-2 rounded-lg border border-black'>2 người</button>
            </div>
          </div>
          <div className='flex gap-2 px-14'>
            <div className=''>
              <button className='w-32 bg-white px-4 py-2 rounded-lg border border-black'>3 - 5 người</button>
            </div>
            <div className=''>
              <button className='w-32 bg-white px-4 py-2 rounded-lg border border-black'>5+ người</button>
            </div>
          </div>
          <p className='px-3 text-lg font-medium py-1'>Dòng Tour</p>
          <div className='flex gap-2 py-2 px-14'>
            <div className=''>
              <button className='w-32 bg-white px-4 py-2 rounded-lg border border-black'>Cao cấp</button>
            </div>
            <div className=''>
              <button className='w-32 bg-white px-4 py-2 rounded-lg border border-black'>Tiêu chuẩn</button>
            </div>
          </div>
          <div className='flex gap-2 px-14'>
            <div className=''>
              <button className='w-32 bg-white px-4 py-2 rounded-lg border border-black'>Tiết kiệm</button>
            </div>
            <div className=''>
              <button className='w-32 bg-white px-4 py-2 rounded-lg border border-black'>Giá tốt</button>
            </div>
          </div>
          <p className='px-3 text-lg font-medium py-2'>Bộ lọc tìm kiếm______________________________</p>
          <p className='px-3 text-lg font-medium py-1'>Ngân sách của quý khách</p>
          <div className='px-3 pt-1'>
            <input className='w-60' type="range" />
          </div>
          <p className='px-3'>0đ - 200.000.000đ</p>
          <p className='px-3 text-lg font-medium py-1'>Thông tin vận chuyển</p>
          <div className='flex gap-3 py-1 pt-2 px-14'>
            <div className=''>
              <button className='w-32 bg-white px-4 py-2 rounded-lg border border-black'>Máy bay</button>
            </div>
            <div className=''>
              <button className='w-32 bg-white px-4 py-2 rounded-lg border border-black'>Ô tô</button>
            </div>
          </div>
          <h2 className='px-3 text-lg font-medium py-1'>Hiển Thị những chuyến đi có</h2>
          <div className='px-3 pb-5'>
            <input type="radio" value="" name="" id="" />Khuyến mãi
            <br />
            <input type="radio" value="" name="" id="" />Còn chỗ
          </div>
        </aside>

        {/*conten-right*/}

        <article className='w-3/4'>
          <p className='text-center text-2xl font-semibold'>Kết quả tìm kiếm tour du lịch</p>
          <div className='py-5'><hr className='bg-black h-[1.5px]'/></div>
          <div className='grid grid-cols-3 gap-7'>
            <div className='py-4 bg-neutral-100 rounded-lg'>

              <img src={anh1} alt="anh1" className='h-[315px] w-max rounded-lg' />
              <p className='px-1'>22/09/2023 - 5N4Đ - Giờ đi: 05:20</p>
              <p className='font-bold py-2 px-1'>ĐÀ NẴNG - HUẾ - ĐẦM LẬP AN - LA VÀNG - ĐỘNG PHONG NHA & THIÊN ĐƯỜNG - KDL BÀ NÀ - CẦU VÀNG...</p>
              <p className='px-4'>MÃ TOUR :</p>
              <div className='flex gap-3 px-4'>
                <img src={ticket} className='w-10' alt="ticket" />
                <p className='text-sm pt-3 font-medium'>NDSGN3398-140-220923VU-F</p>
              </div>
              <div className='flex gap-2 py-2 px-4'>
                <p className='text-sm'>Nơi khởi hành: </p>
                <p className='font-medium text-sm'>TP.Hồ Chí Minh</p>
              </div>
              <p className='text-base font-medium pt-1 px-4'>Giá cũ: 7,990,000₫</p>
              <div className='flex gap-16 justify-between px-4 p-1'>
                <p className='text-lg font-semibold text-red-500'>7,190,000₫</p>
                <div className='bg-red-400 py-2 px-5 rounded-xl text-white'>10% Giảm</div>
              </div>
              <div className='flex justify-between px-4 gap-10 pt-3'>
                <button className=' flex gap-2 hover:bg-teal-500 bg-red-400 py-2 px-3 rounded-xl'>
                  <img src={shopping} alt="shopping" className='w-5' />
                  <p className='text-white text-sm'>Đặt ngay</p>
                </button>
                <button className='border border-sky-500 py-2 px-5 rounded-xl'>
                  <p className='text-sm'>Xem chi tiết</p>
                </button>
              </div>
            </div>
            <div className='py-4 bg-neutral-100 rounded-lg'>

              <img src={anh2} alt="anh2" className='h-[315px] w-max rounded-lg' />
              <p className='px-1'>22/09/2023 - 5N4Đ - Giờ đi: 05:20</p>
              <p className='font-bold py-2 px-1'>Huế - La Vang - Động Thiên Đường -
                KDL Bà Nà - Cầu Vàng - Hội An - Đà Nẵng - Thưởng Thức Ca Hò Huế trên...</p>
              <p className='px-4'>MÃ TOUR :</p>
              <div className='flex gap-3 px-4'>
                <img src={ticket} className='w-10' alt="ticket" />
                <p className='text-sm pt-3 font-medium'>NDSGN3398-140-225423VU-V</p>
              </div>
              <div className='flex gap-2 py-2 px-4'>
                <p className='text-sm'>Nơi khởi hành: </p>
                <p className='font-medium text-sm'>TP.Hồ Chí Minh</p>
              </div>
              <p className='text-base font-medium px-4 pt-1'>Giá cũ: 7,990,000₫</p>
              <div className='flex gap-16 justify-between px-4 pb-1'>
                <p className='text-lg font-semibold text-red-500'>7,190,000₫</p>
                <div className='bg-red-400 py-2 px-5 rounded-xl text-white'>10% Giảm</div>
              </div>
              <div className='flex justify-between px-4 gap-10 pt-3'>
                <button className=' flex gap-2 hover:bg-teal-500 bg-red-400 py-2 px-3 rounded-xl'>
                  <img src={shopping} alt="shopping" className='w-5' />
                  <p className='text-white text-sm'>Đặt ngay</p>
                </button>
                <button className='border border-sky-500 py-2 px-5 rounded-xl'>
                  <p className='text-sm'>Xem chi tiết</p>
                </button>
              </div>
            </div>
            <div className='py-4 bg-neutral-100 rounded-lg'>

              <img src={anh3} alt="anh3" className='h-[315px] w-max rounded-lg' />
              <p className='px-1'>23/09/2023 - Trong ngày - Giờ đi: 16:00</p>
              <p className='font-bold py-2 px-1'>Trải nghiệm đặc sản: Tour xuyên rừng - KDL Đất Mũi Cà Mau - Áp dụng cho nhóm 6 khách trở lên </p>
              <p className='px-4'>MÃ TOUR :</p>
              <div className='flex gap-3 px-4'>
                <img src={ticket} className='w-10' alt="ticket" />
                <p className='text-sm pt-3 font-medium'>NDSGN4568-140-220923VU-V</p>
              </div>
              <div className='flex gap-2 py-2 px-4'>
                <p className='text-sm'>Nơi khởi hành: </p>
                <p className='font-medium text-sm'>TP.Hồ Chí Minh</p>
              </div>
              {/* <p className='text-base font-medium pt-1'>Giá cũ: 7,990,000₫</p> */}
              {/* <div className='flex gap-16 pb-1'> */}

              <p className='text-lg font-semibold text-red-500 px-4'>1,190,000₫</p>
              {/* <div className='bg-red-400 py-2 px-5 rounded-xl text-white'>10% Giảm</div> */}
              {/* </div> */}
              <div className='flex justify-between px-4 gap-10 pt-3'>
                <button className=' flex gap-2 hover:bg-teal-500 bg-red-400 py-2 px-3 rounded-xl'>
                  <img src={shopping} alt="shopping" className='w-5' />
                  <p className='text-white text-sm'>Đặt ngay</p>
                </button>
                <button className='border border-sky-500 py-2 px-5 rounded-xl'>
                  <p className='text-sm'>Xem chi tiết</p>
                </button>
              </div>
            </div>
          </div>
          <div className='ml-auto py-4 pt-6'>
            <button className='py-2 px-3 border border-blue-400 rounded-lg hover:bg-teal-500 shadow-lg shadow-slate-400'>Xem tất cả</button>
          </div>
          <div className='py-5'><hr className='bg-black h-[2px]'/></div>

          <div className='py-3'>
            <div className='w-[860px] bg-gray-100 rounded-lg flex'>
              <img src={anh4} alt="anh4" className='w-1/3 rounded-lg' />
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
            <img src={anh5} alt="anh5" className='w-max rounded-lg'/>
            <img src={anh6} alt="anh6" className='w-max rounded-lg'/>
            <img src={anh7} alt="anh7" className='w-max rounded-lg'/>
            <img src={anh8} alt="anh8" className='w-max rounded-lg'/>
          </div>
        </article>
      </div>

      {/* Footer */}
      <footer></footer>
    </div>
  )
}

export default TourPage