import {  useState } from "react";
import {
  FaStar,
  FaPhoneAlt,
  FaMailBulk,
  FaRegCalendarAlt,
  FaRegCalendarTimes,
  FaQrcode,
  FaMoneyBill,
  FaMoneyCheckAlt
} from "react-icons/fa";
type Props = {};

const img = {
  borderRadius: "10px",
  witdh: "100px",
  height: "66px",
};

const BookTour = () => {
 

  // check radio content , tiền mặt chuyển khoản
  const [isChecked, setIsChecked] = useState(false);

  const handleRadioChange = () => {
    setIsChecked(!isChecked);
    setIsChecked(true);
    setIsChecked1(false)
  };
  const [isChecked1, setIsChecked1] = useState(false);

  const handleRadioChange1 = () => {
    setIsChecked1(!isChecked1);
    setIsChecked1(true);
    setIsChecked(false)
  };
    // check điều khoản
  const [isAgreed, setIsAgreed] = useState(false);

  const handleAgreeToggle = () => {
    setIsAgreed(!isAgreed);
  };
// số lượng hành khách
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };
  const [count1, setCount1] = useState(0);

  const increment1 = () => {
    setCount1(count1 + 1);
  };

  const decrement1 = () => {
    setCount1(count1 - 1);
  };
  return (
    <div className="container mx-auto">
      {/* header trên thôn tin dưới */}
      <div className="info mx-auto w-10/12 ">
        <div className="max-h-[300px] hh gap-4 flex bg-[#f9f9f9]">
          <div className="img-book w-1/3">
            <img
              className="rounded-image"
              src="https://media.travel.com.vn/tour/tfd_220701022713_187185.jpg"
              alt=""
            />
          </div>
          <div className="infoo">
            <div className="h-[300px] w-[530]  rounded-md mt-3  py-5 px-5">
              <div className="rate   flex gap-2">
                <h2 className="text-yellow-300 text-[20px]">
                  <FaStar />
                </h2>
                <h2 className="text-yellow-300 text-[20px]">
                  <FaStar />
                </h2>
                <h2 className="text-yellow-300 text-[20px]">
                  <FaStar />
                </h2>
                <h2 className="text-yellow-300 text-[20px]">
                  <FaStar />
                </h2>
                <h2 className="text-yellow-300 text-[20px]">
                  <FaStar />
                </h2>
              </div>
              <div className=" font-bold text-[#2D4271] text-[25px] py-5">
                <h2>
                  Phú Quốc - Thiên đường giải trí VinWonders - Vinpearl Safari
                </h2>
              </div>
              <p className="mt-1 text-[#2D4271] text-[16px] font-medium">
                Mã Tour: NDHPH103-011-061023XE
              </p>
              <p className="mt-1 text-[#2D4271] text-[16px] font-medium">
                Khởi hành 04/10/2023 - Giờ đi: 06:00
              </p>
              <p className="mt-1 text-[#2D4271] text-[16px] font-medium">
                Tập trung 05:30 ngày 04/10/2023
              </p>
              <p className="mt-1 text-[#2D4271] text-[16px] font-medium">
                Thời gian 3 ngày
              </p>
              <p className="mt-1 text-[#2D4271] text-[16px] font-medium">
                {" "}
                Nơi khởi hành TP. Hồ Chí Minh
              </p>
              <p className="mt-1   text-[#2D4271] text-[16px] font-medium">
                Số chỗ còn nhận 4
              </p>
            </div>
          </div>
        </div>
        <div className="thontin mt-12">
          <div className="tittle phone flex justify-between">
            <h1 className="font-bold text-[#2D4271] text-[28px]">
              Tổng quan về chuyến đi
            </h1>
            <div className="mr-[100px]">
              <p className="text-[#2D4271] text-[16px]">
                Quý khách cần hỗ trợ?
              </p>
              <div className="flex h-[55px] w-[350px] border border-blue-500  rounded ">
                <button className="w-1/2 text-center justify-center items-center text-white bg-blue-500 flex  rounded">
                  {" "}
                  <h2>
                    <FaPhoneAlt />
                  </h2>{" "}
                  <p>Gọi miễn phí qua internet</p>{" "}
                </button>
                <button className="w-1/2 text-center justify-center items-center text-blue-500 bg-white flex  rounded">
                  {" "}
                  <h2>
                    <FaMailBulk />
                  </h2>{" "}
                  <p>Gửi yêu cầu hỗ trợ</p>{" "}
                </button>
              </div>
            </div>
          </div>
        </div>
        <p className="mt-1 text-[#2D4271] text-[22px] font-bold">
          Thông tin liên lạc
        </p>
        <div className="thontin2 flex gap-1 mt-12">
          <div className="ttlienlac  w-2/3  ">
            <div className="flex justify-center h-[200px] rounded  bg-[#f9f9f9]">
              <div className=" py-10 px-5">
                <p className="text-[#2D4271] mb-1">Họ tên</p>
                <input
                  className="h-[35px] w-[350px] border border-gray-300 rounded-md"
                  type="text"
                />
                <p className="text-[#2D4271] mb-1">Số điện thoại</p>
                <input
                  className="h-[35px] w-[350px] border border-gray-300 rounded-md"
                  type="number"
                />
              </div>
              <div className=" py-10 px-5">
                <p className="text-[#2D4271] mb-1">Email </p>
                <input
                  className="h-[35px] w-[350px] border border-gray-300 rounded-md"
                  type="text"
                />
                <p className="text-[#2D4271] mb-1">Địa chỉ</p>
                <input
                  className="h-[35px] w-[350px] border border-gray-300 rounded-md"
                  type="text"
                />
              </div>
            </div>
            <div>
              <p className="mt-5 text-[#2D4271] text-[22px] font-bold">
                Hành khách
              </p>
              <div className="flex justify-between">
                <div className="flex h-[50px] border items-center p-3 rounded-[10px] w-[400px] justify-between">
                  <p className=" text-[#2D4271] text-base font-normal">
                    Người lớn
                  </p>
                  <div className="flex h-[50px] mr-[-15px] rounded gap-1 text-black">
                    <div className="button-container flex justify-between w-20 bg-white rounded border text-black text-center items-center align-middle">
                      <button className="" onClick={increment}>
                        +
                      </button>
                      <span>{count}</span>
                      <button onClick={decrement}>-</button>
                    </div>
                  </div>
                </div>
                <div className="flex h-[50px] border items-center p-3 rounded-[10px] w-[400px] justify-between">
                  <p className=" text-[#2D4271] text-base font-normal">
                    Trẻ em
                  </p>
                  <div className="flex h-[50px] mr-[-15px] rounded gap-1 text-black">
                    <div className="button-container flex justify-between w-20 bg-white rounded border text-black text-center items-center align-middle">
                      <button className="" onClick={increment1}>
                        +
                      </button>
                      <span>{count1}</span>
                      <button onClick={decrement1}>-</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="thanhstoan mt-10"> 
               <p className="mt-5 text-[#2D4271] text-[28px] font-bold">
                Thanh toán
              </p>
              <p className="mt-5 text-[#2D4271] text-[22px] font-bold">
              Các hình thức thanh toán
              </p>
              <div className="grid grid-cols-2 gap-10">
                <div className="py-5 flex items-center px-6 w-[400px] max-h-[300px] rounded bg-[#f9f9f9]">
                <label>
               <div className="flex items-center gap-2">  <h2 className="text-[40px] text-[#2D4271]"><FaMoneyBill/></h2>  <p className="text-[#2D4271] text-[15px]">Tiền mặt</p>   <input className="r-0"
          type="radio"
          checked={isChecked}
          onChange={handleRadioChange}
        /></div> 
     
      <span  onClick={handleRadioChange}>{isChecked ? 'Quý khách vui lòng thanh toán tại bất kỳ văn phòng Vietravel trên toàn quốc và các chi nhánh tại nước ngoài. Xem chi tiết.' : ''}</span>  
     
      </label> 
      
                </div>
                <div className="py-5 flex items-center px-6 w-[400px] max-h-[300px] rounded bg-[#f9f9f9]">
                <label>
               <div className="flex items-center gap-2">  <h2 className="text-[40px] text-[#2D4271]"><FaMoneyCheckAlt/></h2>  <p className="text-[#2D4271] text-[15px]">Chuyền khoản</p>   <input className="r-0"
          type="radio"
          checked={isChecked1}
          onChange={handleRadioChange1}
        /></div> 
     
      <span  onClick={handleRadioChange1}>{isChecked1 ? 'Quý khách sau khi thực hiện việc chuyển khoản vui lòng gửi email đến contactcenter@vietravel.com hoặc gọi tổng đài 19001839 để được xác nhận từ công ty chúng tôi. Tên Tài Khoản : Công ty CP Du lịch và Tiếp thị GTVT Việt Nam – VietravelTên tài khoản viết tắt : VIETRAVELSố Tài khoản : 111 6977 27979Ngân hàng : Vietinbank - Chi nhánh 7' : ''}</span>  
     
      </label> 
      
                </div>
              </div>

            </div>
            <div className="dieukhoan scroll-text ">
            <p className="mt-5 text-[#2D4271] text-[22px] font-bold">
            Điều khoản bắt buộc khi đăng ký online
        </p>
        <div className="w-full mt-5 max-h-[200px] overflow-y-auto border rounded"> 
        <div className="scrollingText ">
        <p>
          This is a long piece of text that will scroll within a fixed height
          container. This is a long piece of text that will scroll within a
          fixed height container. This is a long piece of text that will scroll
          within a fixed height container.
          This is a long piece of text that will scroll within a fixed height
          container. This is a long piece of text that will scroll within a
          fixed height container. This is a long piece of text that will scroll
          within a fixed height container.
          This is a long piece of text that will scroll within a fixed height
          container. This is a long piece of text that will scroll within a
          fixed height container. This is a long piece of text that will scroll
          within a fixed height container.
          This is a long piece of text that will scroll within a fixed height
          container. This is a long piece of text that will scroll within a
          fixed height container. This is a long piece of text that will scroll
          within a fixed height container.
          This is a long piece of text that will scroll within a fixed height
          container. This is a long piece of text that will scroll within a
          fixed height container. This is a long piece of text that will scroll
          within a fixed height container.
          This is a long piece of text that will scroll within a fixed height
          container. This is a long piece of text that will scroll within a
          fixed height container. This is a long piece of text that will scroll
          within a fixed height container.
          This is a long piece of text that will scroll within a fixed height
          container. This is a long piece of text that will scroll within a
          fixed height container. This is a long piece of text that will scroll
          within a fixed height container.
          This is a long piece of text that will scroll within a fixed height
          container. This is a long piece of text that will scroll within a
          fixed height container. This is a long piece of text that will scroll
          within a fixed height container.
          This is a long piece of text that will scroll within a fixed height
          container. This is a long piece of text that will scroll within a
          fixed height container. This is a long piece of text that will scroll
          within a fixed height container.
          This is a long piece of text that will scroll within a fixed height
          container. This is a long piece of text that will scroll within a
          fixed height container. This is a long piece of text that will scroll
          within a fixed height container.
          This is a long piece of text that will scroll within a fixed height
          container. This is a long piece of text that will scroll within a
          fixed height container. This is a long piece of text that will scroll
          within a fixed height container.
          This is a long piece of text that will scroll within a fixed height
          container. This is a long piece of text that will scroll within a
          fixed height container. This is a long piece of text that will scroll
          within a fixed height container.This is a long piece of text that will scroll within a fixed height
          container. This is a long piece of text that will scroll within a
          fixed height container. This is a long piece of text that will scroll
          within a fixed height container.
          This is a long piece of text that will scroll within a fixed height
          container. This is a long piece of text that will scroll within a
          fixed height container. This is a long piece of text that will scroll
          within a fixed height container.This is a long piece of text that will scroll within a fixed height
          container. This is a long piece of text that will scroll within a
          fixed height container. This is a long piece of text that will scroll
          within a fixed height container.
          This is a long piece of text that will scroll within a fixed height
          container. This is a long piece of text that will scroll within a
          fixed height container. This is a long piece of text that will scroll
          within a fixed height container.This is a long piece of text that will scroll within a fixed height
          container. This is a long piece of text that will scroll within a
          fixed height container. This is a long piece of text that will scroll
          within a fixed height container.
          This is a long piece of text that will scroll within a fixed height
          container. This is a long piece of text that will scroll within a
          fixed height container. This is a long piece of text that will scroll
          within a fixed height container.This is a long piece of text that will scroll within a fixed height
          container. This is a long piece of text that will scroll within a
          fixed height container. This is a long piece of text that will scroll
          within a fixed height container.
          This is a long piece of text that will scroll within a fixed height
          container. This is a long piece of text that will scroll within a
          fixed height container. This is a long piece of text that will scroll
          within a fixed height container.This is a long piece of text that will scroll within a fixed height
          container. This is a long piece of text that will scroll within a
          fixed height container. This is a long piece of text that will scroll
          within a fixed height container.
          This is a long piece of text that will scroll within a fixed height
          container. This is a long piece of text that will scroll within a
          fixed height container. This is a long piece of text that will scroll
          within a fixed height container.
        </p>
      </div>
        </div>
        <div>
        <label className="flex mt-5">
        <input
          type="checkbox"
          checked={isAgreed}
          onChange={handleAgreeToggle}
        />
   <p className="text-[#2D4271] text-[16px] font-medium"> Tôi đồng ý với các điều kiện trên</p>  
      </label>
        </div>
            </div>
          </div>
          <div className="h-[950px] w-1/3 border py-6 px-4 ">
            <p className="mt-1 text-[#2D4271] text-[22px] font-bold">
              Tóm tắt chuyến đi
            </p>
            <p className=" text-[#2D4271] text-base font-semibold">
              Dịch vụ tùy chọn Option 1{" "}
            </p>
            <p className=" text-[#2D4271] text-base font-semibold">
              Tour trọn gói (? khách){" "}
            </p>
            <div className="name flex gap-3 mt-4">
              <img
                src="https://media.travel.com.vn/tour/tfd_221208112659_971842.jpg"
                style={img}
                alt=""
              />
              <p className=" text-[#2D4271] text-base font-semibold">
                Phú Quốc - Thiên đường giải trí{" "}
              </p>
            </div>
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
            </div>
            <div className="khach mt-6">
              <p className=" text-[#2D4271] text-base font-semibold">
                Hành khách
              </p>
              <div className="flex mt-6 justify-between">
                <p className=" text-[#2D4271] text-base font-normal">
                  Người lớn
                </p>
                <p className="text-red-400">1 x 3,560,000₫</p>
              </div>
              <div className="flex mt-6 justify-between">
                <p className=" text-[#2D4271] text-base font-normal">Trẻ em</p>
                <p className="text-red-400">0</p>
              </div>
              <div className="flex mt-6 justify-between">
                <p className=" text-[#2D4271] text-base font-normal">
                  Mã giảm giá
                </p>
                <div className="flex gap-1 text-black">
                  <input
                    type="text"
                    placeholder="Thêm mã.."
                    className="text-center text-black h-[35px] w-[100px] rounded border "
                    name=""
                    id=""
                  />
                  <button
                    type="submit"
                    className="h-[35px] text-white w-[100px] rounded hover:bg-green-700 bg-green-600"
                  >
                    Áp dụng
                  </button>
                </div>
              </div>
              <p className="mx-auto mt-5">
                <hr />
              </p>
              <div className="flex mt-6 justify-between">
                <p className=" text-[#2D4271] text-[28px] font-semibold">
                  Tổng cộng
                </p>
                <p className="text-red-400 text-[28px]   "> 3,560,000₫</p>
              </div>
              <p className="text-[200px] ml-10">
                <FaQrcode />
              </p>
              <button
                className=" mx-auto text-center hover:bg-red-600 align-middle mt-5 bg-red-500 rounded-[10px] h-[50px] w-[390px] font-medium text-white items-center text-[22px]"
                type="submit"
              >
                Đặt ngay
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookTour;
