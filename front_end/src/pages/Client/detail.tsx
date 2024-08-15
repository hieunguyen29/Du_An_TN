import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import moment from "moment";
import "./css/style.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  FaBeer,
  FaFlag,
  FaCarSide,
  FaLongArrowAltDown,
  FaRegHeart,
  FaStar,
} from "react-icons/fa";
import logo from "./img/logo.jpg";
import {
  useGetTourByIdQuery,
  useGetdetailTourByIdQuery,
} from "../../api/TourApi";
import "../css.css";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

type Props = {};
const formatCurrency = (value) => {
  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  return formatter.format(value);
};
const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true, // Tự động chuyển đổi
  autoplaySpeed: 3000, // Thời gian giữa các chuyển đổi (miliseconds)
};

const DetailPage = (props: Props) => {
  const radius = {
    borderRadius: "10px",
    height: "545px",
    width: "685px",
  };
  const radius3 = {
    borderRadius: "10px",
    height: "160px",
    width: "232px",
  };
  const radius1 = {
    borderRadius: "10px",
    height: "200px",
  };
  const radius2 = {
    borderRadius: "10px",
    height: "325px",
    width: "638px",
  };
  const img1 = {
    borderRadius: "5px",
    height: "210px",
    width: "309px  ",
  };
  const [isContentVisible, setIsContentVisible] = useState(false);

  const toggleContent = () => {
    setIsContentVisible(!isContentVisible);
  };
  const { idTour } = useParams<{ idTour: any }>();
  const { data: Tourdata } = useGetdetailTourByIdQuery(idTour || "");

  const datatourArray = Tourdata?.data || [];
  console.log(datatourArray);
  const locationString = datatourArray?.ten_tour || "";
  const locations = locationString.split(" - ");
  const formattedString = locations.join(", ");
  const images = datatourArray?.image_path || [];
  console.log(images);
  // đanh giá
  const [selectedStars, setSelectedStars] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/so_sao_tour",
          { id_tour: datatourArray?.id }
        );
        setSelectedStars(response.data);
     
      } catch (error) {
        console.error(error);
      }
    };

    if (datatourArray?.id !== undefined && Tourdata?.data) {
      fetchData();
    }
  }, [datatourArray?.id, Tourdata?.data]);

  const colorArray = ['96EFFF', '#6DA4AA', '#FAEF9B', '#43766C', '#FF004D', '#F3CCF3'];

  const getRandomColor = () => {
    // Chọn ngẫu nhiên một màu từ mảng
    const randomIndex = Math.floor(Math.random() * colorArray.length);
    return colorArray[randomIndex];
  };
  const [showEvaluate, setshowEvaluate] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/admin/evaluate/showDanhGiaOnlyTour",
          {
            id: datatourArray?.id,
          }
        );
        setshowEvaluate(response.data.result);
      } catch (error) {
        console.log(error);
      }
    };

    if (datatourArray?.id != undefined) {
      fetchData();
    }
  }, [datatourArray?.id]);


  return (
    <div className=" mb-[1900px]">
      <div className=" mx-auto box-border">
        <div className="Menu  h-10 "></div>
        {/* Header trên ội dung dưới*/}
        <div className="Detail  bg-repeat-x h-[1500px]">
          <div className=" ">
            <div className="bg-[#f9f9f9] pb-8">
              <div className="mx-auto container-detail box-border mb-8">
                <div className="Title flex justify-between py-10">
                  <div className="title w-1/3">
                    <p className="text-[26px] text-[#2D4271] font-bold">
                      {datatourArray?.ten_tour}
                    </p>
                    <div className="rate  mb-5  flex gap-2">
                      {selectedStars > 0 && (
                        <div>
                          {Array.from({ length: selectedStars }).map((_, index) => (
                            <span className="text-[30px]" key={index} style={{ color: 'gold' }}>&#9733;</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="price  buy flex gap-5 ">
                    <p className="text-[26px] text-red-500 font-bold">
                      {formatCurrency(datatourArray?.gia_nguoilon)}
                    </p>
                    <p className="mt-2">/khách</p>
                    <div></div>
                    <button
                      type="button"
                      className=" text-white h-[50px] w-[230px] bg-[#fe2214] hover:bg-white hover:text-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 text-center inline-flex items-center justify-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      <svg
                        className="w-3.5 h-3.5 mr-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 18 21"
                      >
                        <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
                      </svg>
                      <Link className="font-bold" to={`/booktour/${idTour}`}>
                        Đặt ngay
                      </Link>
                    </button>
                  </div>
                </div>

                <div className="Image   gap-5 flex">
                  {images && images.length > 0 ? (
                    <div className="max-h-[535px]">
                      <img
                        className="h-[545px]"
                        style={radius}
                        src={`http://localhost:8000/storage/${images[0]}`}
                      />
                    </div>
                  ) : (
                    <p>Không có hình ảnh cho tour này.</p>
                  )}
                  {images && images.length > 0 ? (
                    <div>
                      {" "}
                      <div className="flex gap-5">
                        {" "}
                        <img
                          style={radius1}
                          src={`http://localhost:8000/storage/${images[1]}`}
                          alt=""
                        />
                        <img
                          style={radius1}
                          src={`http://localhost:8000/storage/${images[2]}`}
                          alt=""
                        />{" "}
                      </div>
                      <div className="mt-5">
                        <img
                          src={`http://localhost:8000/storage/${images[1]}`}
                          style={radius2}
                        />
                      </div>
                    </div>
                  ) : (
                    <p>Không có hình ảnh cho tour này.</p>
                  )}
                </div>
                <div className="Description justify-between flex gap-20   mt-5 py-4">
                  <div className="Desc w-3/6 text-[#2D4271] text-[15px]">
                  <p className="max-w-[500px]" dangerouslySetInnerHTML={{ __html: datatourArray?.mo_ta }}>{ }</p>
                    <div className="h-[230px] w-[2/3] border rounded-md mt-3 bg-white py-5 px-5">
                      <p className="mt-1 flex gap-2 text-[#2D4271] text-[16px] font-medium">
                        Khởi hành:{" "}
                        <p className="font-bold text-[#2D4271]">
                          {datatourArray?.lich_khoi_hanh}
                        </p>
                      </p>

                      <p className="mt-1 flex gap-2 text-[#2D4271] text-[16px] font-medium">
                        Thời gian:
                        {datatourArray?.lich_khoi_hanh && (
                          <>
                            <div className="font-bold">
                              {moment(datatourArray.ngay_ket_thuc).diff(
                                datatourArray.lich_khoi_hanh,
                                "days"
                              )}{" "}
                              ngày
                            </div>
                          </>
                        )}
                      </p>
                      <p className="mt-1 flex text-[#2D4271] text-[16px] font-medium">
                        Nơi khởi hành:{" "}
                        <p className="font-bold">{datatourArray?.diem_di}</p>
                      </p>
                      <p className="mt-1 flex  gap-2 text-[#2D4271] text-[16px] font-medium">
                        Số lượng:{" "}
                        <p className="font-bold"> {datatourArray?.soluong}</p>
                      </p>
                    </div>
                  </div>
                  <div className="grid w-2/3 grid-cols-4 gap-5  border-b-[2px] border-b-black pr-4">
                    <div className="">
                      <h2 className="text-blue-600">
                        <FaFlag />
                      </h2>
                      <p className="font-bold text-[#2d4271] text-base mt-1">
                        Thời gian
                      </p>
                      <p className="text-sm font-normal text-left mt-1">
                        3 ngày 2 đêm
                      </p>
                    </div>
                    <div className="">
                      <h2 className="text-blue-600">
                        <FaFlag />
                      </h2>
                      <p className="whitespace-nowrap font-bold text-[#2d4271] text-base mt-1">
                        Phương tiện di chuyển
                      </p>
                      <p>
                        {datatourArray &&
                          datatourArray.phuong_tien &&
                          datatourArray.phuong_tien.map((item, index) => (
                            <div
                              key={index}
                              className="text-sm font-normal text-left mt-1"
                            >
                              {item.loai_phuong_tien}
                            </div>
                          ))}
                      </p>
                    </div>
                    <div className="">
                      <h2 className="text-blue-600">
                        <FaFlag />
                      </h2>
                      <p className="font-bold text-[#2d4271] text-base mt-1">
                        Điểm tham quan
                      </p>
                      <p className="text-sm font-normal text-left mt-1">
                        {formattedString}
                      </p>
                    </div>
                    <div className="">
                      <h2 className="text-blue-600">
                        <FaFlag />
                      </h2>
                      <p className="font-bold text-[#2d4271] text-base mt-1">
                        Ẩm thực{" "}
                      </p>
                      <p className="text-sm font-normal text-left mt-1">
                        Buffet sáng, Theo thực đơn
                      </p>
                    </div>
                    <div className="">
                      <h2 className="text-blue-600">
                        <FaFlag />
                      </h2>
                      <p className="font-bold text-[#2d4271] text-base mt-1">
                        Khách sạn
                      </p>
                      <p>
                        {datatourArray &&
                          datatourArray.khach_san &&
                          datatourArray.khach_san.map((item, index) => (
                            <div
                              key={index}
                              className="text-sm font-normal text-left mt-1"
                            >
                              Khách Sạn {item.loai_khach_san}
                              <br />
                            </div>
                          ))}
                      </p>
                    </div>
                    <div className="">
                      <h2 className="text-blue-600">
                        <FaFlag />
                      </h2>
                      <p className="font-bold text-[#2d4271] text-base mt-1">
                        Thời gian lý tưởng
                      </p>
                      <p className="text-sm font-normal text-left mt-1">
                        Quanh năm{" "}
                      </p>
                    </div>
                    <div className="">
                      <h2 className="text-blue-600">
                        <FaFlag />
                      </h2>
                      <p className="font-bold text-[#2d4271] text-base mt-1">
                        Đối tượng thích hợp
                      </p>
                      <p className="text-sm font-normal text-left mt-1">
                        Người lớn tuổi, Cặp đôi, Gia đình nhiều thế hệ, Thanh
                        niên
                      </p>
                    </div>
                    <div className="">
                      <h2 className="text-blue-600">
                        <FaFlag />
                      </h2>
                      <p className="font-bold text-[#2d4271] text-base mt-1">
                        Ưu đãi
                      </p>
                      <p className="text-sm font-normal text-left mt-1">
                        Ưu đãi trực tiếp vào giá tour
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="imgae container mx-auto box-border mt-8">
              <div className="text-center font-bold text-[#2D4271] text-[25px] py-5">
                <h2>Những địa điểm tham quan</h2>
              </div>
              <div className="">
                {images && images.length > 0 ? (
                  <div className="h-[200px] justify-center mt-5 gap-5 flex">
                    {images.map((image, index) => (
                      <img
                        key={index + 1}
                        style={radius3}
                        src={`http://localhost:8000/storage/${image}`}
                        alt={`Image ${image.id}`}
                      />
                    ))}
                  </div>
                ) : (
                  <p>Không có hình ảnh cho tour này.</p>
                )}
              </div>
            </div>
            <div className="bg-white container-detail mx-auto box-border">
              <div className="text-center font-bold text-[#2D4271] text-[25px] py-5">
                <h2>Lịch trình</h2>
              </div>
              <div className=" flex gap-2  lichtring max-h-[2000px]  bg-white rounded-[6px] border-gray-300 ">
                <div className="w-2/3">
                  <div className="max-w-full">
                    <ul className="mb-4 font-medium text-[#2D4271] text-[16px] py-5 p-8 pt-12 text-left list-disc describe">
                      {datatourArray && datatourArray.lich_t_rinh ? (
                        datatourArray.lich_t_rinh.map((tieude) => (
                          <li key={tieude.id} dangerouslySetInnerHTML={{ __html: tieude.noi_dung }}></li>

                        ))
                      ) : (
                        <p>Không có lịch trình.</p>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="bg-white container-detail mx-auto box-border">
                <div className="text-center font-bold text-[#2D4271] text-[25px] py-5">
                  <h2>Đánh giá</h2>
                  <div>
                    {/* Check if showEvaluate is not empty before rendering */}
                    {showEvaluate && showEvaluate.length > 0 && (
                      <div className="mt-5">
                        {showEvaluate && showEvaluate.length > 0 && (
                          <Slider {...sliderSettings}>
                            {/* Loop through each evaluation in showEvaluate */}
                            {showEvaluate.map((evaluation) => (
                              <div className=" " key={evaluation.id}>
                                <div className="flex items-center justify-center">
                                  <img
                                    className="rounded-full"
                                    src={`http://localhost:8000/storage/${evaluation.id_user.image}`}
                                    alt="Customer Avatar"
                                    style={{ width: "50px", height: "50px" }}
                                  />

                                </div>

                                <p className="text-sm">{evaluation.noi_dung}</p>
                                <p style={{ color: getRandomColor() }} className="ml-2  text-sm">
                                  {evaluation.id_user.name}
                                </p>
                              </div>
                            ))}
                          </Slider>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className=" chitiet mx-auto container-detail box-border mt-10">
                <div className="flex-row gap-[48px] flex justify-between">
                  <div className=" w-1/2">
                    <h2 className="mb-4 font-bold text-[#2D4271] text-[25px] py-5">
                      Chi tiết tour
                    </h2>
                    <div className="h-[350px] bg-[#f9f9f9]   rounded-[6px] p-4">
                      <p className="font-semibold text-[#2D4271] text-[20px] pt-8 px-4">
                        {" "}
                        Thông tin hãng Xe
                      </p>
                      <div className="flex flex-row gap-4">
                        {" "}
                        <p className="text-red-500 px-4 mt-4 text-base ">
                          <span className="text-base font-semibold text-[#2D4271]">
                            Ngày đi :{" "}
                          </span>{" "}
                          {datatourArray?.lich_khoi_hanh}{" "}
                        </p>{" "}
                        <p className="mt-4">|</p>{" "}
                        <p className="text-red-500 px-4 mt-4 text-base  ">
                          {" "}
                          <span className="text-base font-semibold text-[#2D4271]">
                            Ngày về :{" "}
                          </span>{" "}
                          {datatourArray?.ngay_ket_thuc}{" "}
                        </p>
                      </div>
                      <div className="flex  items-center">
                        <div className="text-blue-700 px-4 mt-4 flex gap-2 ">
                          Điểm đi :<h2 className="mt-1"></h2>{" "}
                          {datatourArray?.diem_di}{" "}
                        </div>
                        <div className="mt-4">
                          <FaCarSide />
                        </div>
                        <div className="text-blue-700 px-4 mt-4 flex gap-2 ">
                          Điểm đến :<h2 className="mt-1"></h2>{" "}
                          {datatourArray?.diem_den}{" "}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="  w-1/2">
                    <h2 className="mb-4  font-bold text-[#2D4271] text-[25px] py-5">
                      Giá tour & phụ thu phòng đơn
                    </h2>
                    <div className="h-[350px] bg-[#f9f9f9]  rounded-md p-4">
                      <div className="flex justify-between gap-2">
                        <p className="font-semibold text-[#2D4271] text-[20px] pt-8 px-4">
                          {" "}
                          Loại khách
                        </p>{" "}
                        <p className="font-semibold text-[#2D4271] text-[20px] pt-8 px-4">
                          {" "}
                          Giá tour
                        </p>
                        {/* <p className="font-semibold text-[#2D4271] text-[20px] pt-8 px-4">
                        {" "}
                        Land tour
                      </p> */}
                      </div>
                      <div className="flex justify-between">
                        {" "}
                        <p className="text-[#2D4271] px-4 mt-4 ">
                          Người lớn (Từ 12 tuổi trở lên){" "}
                        </p>{" "}
                        <p className="mt-4 px-4">
                          {formatCurrency(datatourArray?.gia_nguoilon)}
                        </p>{" "}
                        {/* <p className="text-[#2D4271] px-4 mt-4 mr-[150px] ">
                        {" "}
                        499,000 đ
                      </p> */}
                      </div>
                      <div className="flex justify-between">
                        {" "}
                        <p className="text-[#2D4271] px-4 mt-4 ">
                          Trẻ em{" "}
                        </p>{" "}
                        <p className="mt-4 text-red-500 ml-10 px-4">
                          {formatCurrency(datatourArray?.gia_treem)}
                        </p>{" "}
                        {/* <p className=" px-4 mt-4 mr-[150px] ml-5 text-red-500">
                        {" "}
                        299,000 đ
                      </p> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-[300px] container-detail mx-auto bg-white">
              <p className="title font-bold text-[#2D4271] text-[25px] text-center py-5 px-5 my-4">
                Những thông tin cần lưu ý
              </p>
              <div className="">
                <div className="flex gap-12">
                  <div className="flex flex-col w-1/2">
                    {" "}
                    <button
                      className={`bg-gray-300 justify-between hover:bg-gray-400 text-[#2D4271] text-center font-bold py-2 px-4 rounded inline-flex items-center ${isContentVisible ? "open" : ""
                        }`}
                      onClick={toggleContent}
                    >
                      <span>Giá tour bao gồm</span>
                      <h2>
                        <FaLongArrowAltDown />
                      </h2>
                      {isContentVisible && (
                        <div className="hidden-content">
                          {/* Nội dung bạn muốn hiển thị */}
                          <p>Some hidden content here...</p>
                        </div>
                      )}
                    </button>
                    <button className="mt-5 bg-gray-300  justify-between hover:bg-gray-400 text-[#2D4271] text-center font-bold py-2 px-4 rounded inline-flex items-center">
                      <span>Giá tour bao gồm</span>
                      <h2>
                        <FaLongArrowAltDown />
                      </h2>
                    </button>
                    <button className="bg-gray-300 mt-5  justify-between hover:bg-gray-400 text-[#2D4271] text-center font-bold py-2 px-4 rounded inline-flex items-center">
                      <span>Giá tour bao gồm</span>
                      <h2>
                        <FaLongArrowAltDown />
                      </h2>
                    </button>
                  </div>
                  <div className="w-1/2 flex flex-col">
                    {" "}
                    <button className=" bg-gray-300 justify-between hover:bg-gray-400 text-[#2D4271] text-center font-bold py-2 px-4 rounded inline-flex items-center">
                      <span>Giá tour bao gồm</span>
                      <h2>
                        <FaLongArrowAltDown />
                      </h2>
                    </button>
                    <button className="bg-gray-300 mt-5  justify-between hover:bg-gray-400 text-[#2D4271] text-center font-bold py-2 px-4 rounded inline-flex items-center">
                      <span>Giá tour bao gồm</span>
                      <h2>
                        <FaLongArrowAltDown />
                      </h2>
                    </button>
                    <button className="bg-gray-300  mt-5 justify-between hover:bg-gray-400 text-[#2D4271] text-center font-bold py-2 px-4 rounded inline-flex items-center">
                      <span>Giá tour bao gồm</span>
                      <h2>
                        <FaLongArrowAltDown />
                      </h2>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="Cate bg-[#f9f9f9] pt-8">
              <p className=" font-bold text-[#2D4271] text-[25px] text-center ">
                Có thể quý khách sẽ thích
              </p>
              <div className="container-detail grid grid-cols-4 py-5 mx-auto">
                <div className="bg-[#ffffff] rounded-lg px-2 item h-[500px] w-[310px] pt-2   ">
                  <div className="img img-container">
                    <img
                      className="image"
                      style={img1}
                      src="https://media.travel.com.vn/destination/tf_230620051651_690667_Bai%20Bien.jpg"
                      alt=""
                    />
                    <div className="icon-overlay">
                      {/* Chèn icon ở đây */}
                      <a href="">
                        <h2>
                          <FaRegHeart />
                        </h2>
                      </a>
                    </div>
                  </div>
                  <div className=" ml-[5px] py-3 text-[#2D4271] ">
                    <div className="border px-3 py-1 w-2/3 text-sm bg-blue-500 text-white rounded-md mb-2">
                      {" "}
                      26/10/2023 - Giờ đi: 05:00
                    </div>
                    <p className="font-semibold text-base hover:text-blue-500 mb-1">
                      Phan Thiết - Mũi Né - Hòn Rơm - Đồi Cát Bay{" "}
                    </p>
                    <p>Nơi khởi hành TP. Hồ Chí Minh</p>
                    <p className="mt-4 text-red-500 text-lg font-semibold">
                      499,000 ₫
                    </p>
                    <div className="flex justify-between items-center">
                      <button
                        type="button"
                        className="text-white  bg-red-500 hover:bg-white hover:text-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        <svg
                          className="w-3.5 h-3.5 mr-2"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 18 21"
                        >
                          <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
                        </svg>
                        Đặt ngay
                      </button>
                      <div className="border px-5 py-2.5 rounded-lg bg-white">
                        <a href="">Xem chi tiết</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
