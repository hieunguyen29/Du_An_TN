import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  FaStar,
  FaPhoneAlt,
  FaMailBulk,
  FaRegCalendarAlt,
  FaRegCalendarTimes,
  FaQrcode,
  FaMoneyBill,
  FaMoneyCheckAlt,
} from "react-icons/fa";
import { useDattourMutation, useGetDattourbyIdQuery } from "../../api/dattour";
import { Tour } from "antd";
import { Dattour } from "../../interface/Dattour";
import logo from "./img/logo.jpg";
import axios from "axios";
import "./css/style.css";
import { width } from "@fortawesome/free-brands-svg-icons/fa42Group";
type Props = {};
const formatCurrency = (value) => {
  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  return formatter.format(value);
};
const img = {
  borderRadius: "10px",
  witdh: "100px",
  height: "66px",
};
const initialFormData = {
  ten_khach_hang: "",
  email: "",
  sdt: "",
  dia_chi: "",
  cccd: "",
  ngay_dat: "",
  so_luong_khach: 1,
  ma_khach_hang: "",
};

const BookTour = () => {
  // check radio content , tiền mặt chuyển khoản
  const [isChecked, setIsChecked] = useState(true); // tiền mặt

  const handleRadioChange = () => {
    setIsChecked(!isChecked);
    setIsChecked(true);
    setIsChecked1(false);
  };
  // giảm giá
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const [showMore, setShowMore] = useState(false);

  const handleShowMore = (event) => {
    event.stopPropagation();// Ngăn chặn sự kiện onClick lan ra và kích hoạt onclick
    event.preventDefault();
    setShowMore(!showMore);

  };
  const [isChecked1, setIsChecked1] = useState(false); // chuyển khoản

  const handleRadioChange1 = () => {
    setIsChecked1(!isChecked1);
    setIsChecked1(true);
    setIsChecked(false);

  };
  // check điều khoản
  const [isAgreed, setIsAgreed] = useState(false);

  const handleAgreeToggle = () => {
    setIsAgreed(!isAgreed);
  };
  const validateQuantity = (newQuantity: number, newQuantity2: number) => {
    const totalGuests = newQuantity + newQuantity2;
    if (totalGuests > datatourArray?.soluong) {
      alert("Bạn đã nhập quá số lượng cho phép");
      return false;
    }
    return true;
  };
  // gia ng lon
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    if (validateQuantity(quantity + 1, quantity2)) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    } else {
      alert("tối thiểu số hành khách là 1");
      setQuantity(1);
    }
  };

  // gia tre em
  const [quantity2, setQuantity2] = useState(0);

  const handleIncrement2 = () => {
    if (validateQuantity(quantity, quantity2 + 1)) {
      setQuantity2(quantity2 + 1);
    }
  };

  const handleDecrement2 = () => {
    if (quantity2 > 0) {
      setQuantity2(quantity2 - 1);
    }
  };
  const [soLuongKhach, setSoLuongKhach] = useState(1);
  useEffect(() => {
    const newSoLuongKhach = quantity + quantity2;
    if (newSoLuongKhach !== 1) {
      setSoLuongKhach(newSoLuongKhach);
      setFormData({
        ...formData,
        so_luong_khach: newSoLuongKhach,
      });
    }
  }, [quantity, quantity2]);

  const { idTour } = useParams<{ idTour: any }>();
  const { data: Tourdata } = useGetDattourbyIdQuery(idTour || "");

  const datatourArray = Tourdata?.data || [];
  const image = datatourArray?.image_dd || [];


  // Lấy token từ localStorage
  const [userData, setUserData] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [formData, setFormData] = useState({
    initialFormData,
    id_tour: idTour,
  });
  const [responseMessage, setResponseMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [addTour] = useDattourMutation(); // Sử dụng hàm addTour từ API
  useEffect(() => {
    // Lấy thông tin người dùng từ token và điền vào formData
    const token = localStorage.getItem("token");
    if (token) {
      // Gửi yêu cầu API để lấy thông tin người dùng từ token
      fetch("http://localhost:8000/api/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((userData) => {
          setFormData({
            ...formData,
            ten_khach_hang: userData.name,
            email: userData.email,
            sdt: userData.sdt,
            dia_chi: userData.dia_chi,

            ma_khach_hang: userData.id,
            id_tour: idTour,
          });
          console.log(userData);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setFormData({
        ...formData,
        ma_khach_hang: null, // hoặc có thể là ""
      });
    }
  }, []);
  // tính tổng tiền
  const [selectedValue, setSelectedValue] = useState(0);
  const [radioValue, setradioValue] = useState(0);
  const handlegiamgia = (event) => {
    const gialon = datatourArray?.gia_nguoilon;
    const gianho = datatourArray?.gia_treem;
    let giamgiaressult = (quantity * gialon + quantity2 * gianho)
    if (parseInt(event.target.value) > 100) {

      giamgiaressult -= parseInt(event.target.value);
    } else if (parseInt(event.target.value) < 100) {
      giamgiaressult = (giamgiaressult * (100 - parseInt(event.target.value))) / 100;
    }
    setradioValue(parseInt(event.target.value));
    console.log('234', radioValue);

    setSelectedValue(giamgiaressult);
    console.log('123', selectedValue);

  };
  const [couponData, setCouponData] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Gửi yêu cầu HTTP POST đến API
    axios
      .post("http://localhost:8000/api/check_coupon", {
        name_coupon: inputValue,
        tourid: idTour,
      })
      .then((response) => {
        // Xử lý phản hồi từ server
        setError(response.data.message); // lỗi từ serve
        setCouponData(response.data.session.coupon);
        // Tiếp tục xử lý dữ liệu phản hồi từ server
      })
      .catch((error) => {
        // Xử lý lỗi nếu có
        console.error(error); // Hiển thị thông tin lỗi từ phản hồi của server
      });
    if (inputValue === "") {
      setCouponData("");
    }
  }, [inputValue]);

  const [InputNhapMagiamGia, setInputNhapMagiamGia] = useState(0);
  const calculateTotalPrice = () => {
    const gialon = datatourArray?.gia_nguoilon;
    const gianho = datatourArray?.gia_treem;
    let totalPrice = (quantity * gialon + quantity2 * gianho);
    if (couponData.length > 0) {
      couponData.map((item) => {
        if (item.discount_condition == 1) {
          // tính theo k
          totalPrice -= item.percentage;
        } else {
          // tính theo %
          totalPrice = (totalPrice * (100 - item.percentage)) / 100;
        }
      });
      if (radioValue > 100) {
        totalPrice -= radioValue;
      } else if (radioValue < 100) {
        totalPrice = (totalPrice * (100 - radioValue)) / 100;

      }

    }

    return totalPrice;
  };

  const images = datatourArray?.images || [];
  // console.log(images);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const [paymentResult, setPaymentResult] = useState(null);
  const [IdDatTour, setIdDatTour] = useState("");

  //  khi bấm đặt hàng thì nó thực thi handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);


    if (isChecked) {
      // tiền mặt
      try {
        const addTourResponse = await addTour(formData).unwrap();
        setIsLoading(false);
        setResponseMessage(addTourResponse.message);
        // Xử lý kết quả thành công

        let requestData = {
          vnp_Amount: couponData.length > 0 ? calculateTotalPrice() : selectedValue ? selectedValue : calculateTotalPrice(),
          payment_method: "cash",
        };

        const paymentResponse = await axios.post(
          "http://localhost:8000/api/cash",
          requestData
        );
        setPaymentResult(paymentResponse.data);
        alert("Đặt tour bằng tiền mặt thành công");
        window.location.href = `/bookingtour/${paymentResponse.data.id_dat_tour}`;
      } catch (error) {
        setIsLoading(false);
        setResponseMessage("Lỗi trong quá trình gửi yêu cầu.");
        // Xử lý lỗi
        console.error(error);
      }
    } else if (isChecked1) {
      // thanh toán vnpay
      // vào bảng đặt tour
      const addTourResponse = await addTour(formData).unwrap();
      setIsLoading(false);
      setResponseMessage(addTourResponse.message);
      await setIdDatTour(addTourResponse.createDatTour.id);

      if (addTourResponse.createDatTour.id) {
        const requestData = {
          redirect: true,
          vnp_TxnRef: Math.floor(Math.random() * 1000000).toString(),
          vnp_OrderInfo: "mô tả",
          vnp_OrderType: "atm",
          vnp_Amount: couponData.length > 0 ? calculateTotalPrice() * 100 : selectedValue ? selectedValue * 100 : calculateTotalPrice() * 100,
          id_dat_tour: addTourResponse.createDatTour.id,
        };

        try {
          const response = await axios.post(
            "http://localhost:8000/api/vnpay_payment",
            requestData
          );
          window.location.href = response.data.data;
        } catch (error) {
          console.error(error);
        }
      }
    }


  };
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


  // giảm giá  option
  const [inputGiamGia, setinputGiamGia] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/admin/discount/filterDicscount', { price_tour: datatourArray?.gia_nguoilon });
        setinputGiamGia(response.data.data);

      } catch (error) {
        console.error(error);
      }
    };
    if (datatourArray?.gia_nguoilon !== undefined && Tourdata?.data) {
      fetchData();
    }
  }, [datatourArray?.gia_nguoilon, Tourdata?.data]);


  return (

    <div className=" mx-auto  ">
      {/* header trên thôn tin dưới */}
      <div className="info mx-auto  mt-14 w-10/12  ">
        <div className="max-h-[300px] hh gap-4 flex bg-[#f9f9f9]">

          {image && image.length > 0 ? (

            <img
              className="min-h-[300px] w-1/3 rounded-l-lg"
              key={image.id}

              src={`http://localhost:8000/storage/${image}`}
              alt={`Image ${image.id}`}
            />

          ) : (
            <p>Không có hình ảnh cho tour này.</p>
          )}


          <div className="infoo">
            <div className="h-[300px] w-[530]  rounded-md  py-5 px-5">
              <div className="rate    flex gap-2">
                {selectedStars > 0 && (
                  <div>
                    {Array.from({ length: selectedStars }).map((_, index) => (
                      <span className="text-[30px]" key={index} style={{ color: 'gold' }}>&#9733;</span>
                    ))}
                  </div>
                )}
              </div>
              <div className=" font-bold text-[#2D4271] text-[20px] py-5">
                <h2>{datatourArray?.ten_tour}</h2>
              </div>
              <p className="mt-1 text-[#2D4271] text-[16px] font-medium">
                Mã Tour: {datatourArray?.id}
              </p>
              <p className="mt-1 text-[#2D4271] text-[16px] font-medium">
                Khởi hành: {datatourArray?.lich_khoi_hanh}
              </p>
              <p className="mt-1 text-[#2D4271] text-[16px] font-medium">
                Ngày kết thúc {datatourArray?.ngay_ket_thuc}
              </p>
              <p className="mt-1 text-[#2D4271] text-[16px] font-medium">
                Nơi khởi hành: {datatourArray?.diem_di}
              </p>
              <p className="mt-1   text-[#2D4271] text-[16px] font-medium">
                Số chỗ còn nhận: {datatourArray?.soluong}
              </p>
              <p className="mt-1   text-[#2D4271] text-[16px] font-medium">
                Dịch vụ tùy chọn:
                {datatourArray &&
                  datatourArray.phuong_tien &&
                  datatourArray.phuong_tien.map(
                    (item) => item.loai_phuong_tien
                  )}{" "}
                + Khách Sạn
                {datatourArray &&
                  datatourArray.khach_san &&
                  datatourArray.khach_san.map((item) => item.loai_khach_san)}
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
        <form >
          <div className="thontin2 flex gap-1 mt-12">
            <div className="ttlienlac  w-2/3  ">
              <input
                className="h-[35px] w-[350px] border border-gray-300 rounded-md"
                type="hidden"
                value={formData.ma_khach_hang}
                onChange={handleChange}
              />
              <input
                className="h-[35px] w-[350px] border border-gray-300 rounded-md"
                type="hidden"
                value={formData.id_tour}
                name="id_tour"
                onChange={handleChange}
              />
              <div className="flex justify-center h-[200px] rounded  bg-[#f9f9f9]">
                <div className=" py-10 px-5">
                  <p className="text-[#2D4271] mb-1">Họ tên</p>
                  <input
                    type="text"
                    id="ten_khach_hang"
                    className="h-[35px] w-[350px] border border-gray-300 rounded-md"
                    name="ten_khach_hang"
                    value={formData.ten_khach_hang}
                    onChange={handleChange}
                    defaultValue={token ? formData.ten_khach_hang : ""}
                  />
                  <p className="text-[#2D4271] mb-1">Số điện thoại</p>
                  <input
                    className="h-[35px] w-[350px] border border-gray-300 rounded-md"
                    type="number"
                    value={formData.sdt}
                    name="sdt"
                    id="sdt"
                    onChange={handleChange}
                  />
                </div>
                <div className=" py-10 px-5">
                  <p className="text-[#2D4271] mb-1">Email </p>
                  <input
                    className="h-[35px] w-[350px] border border-gray-300 rounded-md"
                    type="text"
                    value={formData.email}
                    name="email"
                    id="email"
                    onChange={handleChange}
                  />
                  <p className="text-[#2D4271] mb-1">Địa chỉ</p>
                  <input
                    className="h-[35px] w-[350px] border border-gray-300 rounded-md"
                    type="text"
                    value={formData.dia_chi}
                    name="dia_chi"
                    id="dia_chi"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <div>
                  <p className="mt-5 text-[#2D4271] text-[22px] font-bold">
                    Hành khách
                  </p>
                  <div className="text-[#2D4271] flex justify-between">
                    <div className="flex h-[50px] border items-center p-3 rounded-[10px] w-[400px] justify-between">
                      <label htmlFor="quantity">Người lớn</label>
                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={handleIncrement}
                          className="icon-button"
                        >
                          +
                        </button>
                        <input
                          type="text"
                          className="w-[10px]"
                          name="quantity"
                          id="quantity"
                          value={quantity}
                          readOnly
                        />
                        <button
                          type="button"
                          onClick={handleDecrement}
                          className="icon-button"
                        >
                          -
                        </button>
                      </div>
                    </div>
                    <input
                      type="hidden"
                      name="so_luong_khach"
                      className="w-[10px]"
                      id="so_luong_khach"
                      value={soLuongKhach}
                      onChange={handleChange}
                      readOnly
                    />
                    <div className="flex h-[50px] border items-center p-3 rounded-[10px] w-[400px] justify-between">
                      <label htmlFor="quantity2">Trẻ em</label>
                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={handleIncrement2}
                          className="icon-button"
                        >
                          +
                        </button>
                        <input
                          type="text"
                          className="w-[10px]"
                          name="quantity2"
                          id="quantity2"
                          value={quantity2}
                          readOnly
                        />
                        <button
                          type="button"
                          onClick={handleDecrement2}
                          className="icon-button"
                        >
                          -
                        </button>
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
                      <div className="flex items-center gap-2">
                        {" "}
                        <h2 className="text-[40px] text-[#2D4271]">
                          <FaMoneyBill />
                        </h2>{" "}
                        <p className="text-[#2D4271] text-[15px]">Tiền mặt</p>{" "}
                        <input
                          className="r-0"
                          type="radio"
                          // tiền mặt
                          checked={isChecked}
                          onChange={handleRadioChange}
                        />
                      </div>

                      <span onClick={handleRadioChange}>
                        {isChecked
                          ? "Quý khách vui lòng thanh toán tại bất kỳ văn phòng Vietravel trên toàn quốc và các chi nhánh tại nước ngoài. Xem chi tiết."
                          : ""}
                      </span>
                    </label>
                  </div>
                  <div className="py-5 flex items-center px-6 w-[400px] max-h-[300px] rounded bg-[#f9f9f9]">
                    <label>
                      <div className="flex items-center gap-2">
                        {" "}
                        <h2 className="text-[40px] text-[#2D4271]">
                          <FaMoneyCheckAlt />
                        </h2>{" "}
                        <p className="text-[#2D4271] text-[15px]">
                          Chuyền khoản
                        </p>{" "}
                        <input
                          className="r-0"
                          type="radio"
                          checked={isChecked1}
                          onChange={handleRadioChange1}
                        />
                      </div>

                      <span onClick={handleRadioChange1}>
                        {isChecked1
                          ? "Quý khách sau khi thực hiện việc chuyển khoản vui lòng gửi email đến contactcenter@vietravel.com hoặc gọi tổng đài 19001839 để được xác nhận từ công ty chúng tôi. Tên Tài Khoản : Công ty CP Du lịch và Tiếp thị GTVT Việt Nam – VietravelTên tài khoản viết tắt : VIETRAVELSố Tài khoản : 111 6977 27979Ngân hàng : Vietinbank - Chi nhánh 7"
                          : ""}
                      </span>
                    </label>
                  </div>
                </div>
              </div>

            </div>
            <div className="h-[950px] w-1/3 border py-6 px-4 ">
              <p className="mt-1 text-[#2D4271] text-[22px] font-bold">
                Tóm tắt chuyến đi
              </p>
              <p className=" text-[#2D4271] text-base font-semibold">
                Dịch vụ tùy chọn:
                {datatourArray &&
                  datatourArray.phuong_tien &&
                  datatourArray.phuong_tien.map(
                    (item) => item.loai_phuong_tien
                  )}{" "}
                + Khách Sạn
                {datatourArray &&
                  datatourArray.khach_san &&
                  datatourArray.khach_san.map(
                    (item) => item.loai_khach_san
                  )}{" "}
              </p>
              <p className=" text-[#2D4271] text-base font-semibold">
                Tour trọn gói ({datatourArray?.soluong} khách){" "}
              </p>

              <div className="name flex gap-3 mt-4">
                {image && image.length > 0 ? (
                  <div>
                    {/* {images.map((image) => ( */}
                    <img
                      key={image[0].id}
                      style={img}
                      src={`http://localhost:8000/storage/${image}`}
                    />
                    {/* ))} */}
                  </div>
                ) : (
                  <p>Không có hình ảnh cho tour này.</p>
                )}
                <p className=" text-[#2D4271] text-base font-semibold">
                  {datatourArray?.ten_tour}
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
                      {datatourArray?.lich_khoi_hanh}
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
                      {datatourArray?.ngay_ket_thuc}
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
                  <p className="text-red-400">
                    {" "}
                    {quantity} x  {formatCurrency(datatourArray?.gia_nguoilon)}
                  </p>
                </div>
                <div className="flex mt-6 justify-between">
                  <p className=" text-[#2D4271] text-base font-normal">
                    Trẻ em
                  </p>
                  <p className="text-red-400">
                    {quantity2} x   {formatCurrency(datatourArray?.gia_treem)}
                  </p>
                </div>
                {/* input giảm giá */}
                {/* <input
                  type="text"
                  placeholder="Nhập mã giảm giá "
                  value={inputValue}
                  onChange={handleInputChange}
                  style={{
                    padding: "8px",
                    fontSize: "14px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    width: "380px",
                    marginTop: "10px",
                  }}
                /> */}
               
                <h1>Áp dụng mã giảm giá:</h1>
                <div>
                  <div className="radio-container">
                    {inputGiamGia.length > 0 && inputGiamGia.map((item, index) => (
                      <>
                        {index === 0 && (
                          <div className="radio-item">
                            <input
                              type="radio"
                              name="radio"
                              value={item.percentage}
                              onChange={handlegiamgia}
                            />
                            <div>
                              <h1>{item.percentage }{item.percentage < 100 ? " %":" vnđ"} {item.discount_code}</h1>

                              <p className="text-gray-400 text-xs"> HSD {new Date(item.expiry_date).toLocaleDateString()}</p>

                            </div>
                          </div>
                        )}
                        {showMore && index !== 0 && (
                          <>
                            <div className="radio-item">
                              <input
                                type="radio"
                                name="radio"
                                value={item.percentage}
                                onChange={handlegiamgia}
                              />
                              <div>
                                <h1>{item.percentage }{item.percentage < 100 ? " %":" vnđ"}  {item.discount_code}</h1>
                                <p className="text-gray-400 text-xs"> HSD {new Date(item.expiry_date).toLocaleDateString()}</p>
                              </div>
                            </div>
                          </>
                        )}
                      </>
                    ))}
                  </div>
                  <button id="show-more-button " className="border-2 border-black px-4 mt-3 rounded-md hover:border-blue-500 " onClick={handleShowMore}>
                    {showMore ? 'Thu gọn' : 'Xem thêm'}
                  </button>
                </div>


                <p className="mx-auto mt-5">
                  <hr />
                </p>
                {couponData.length > 0
                  ? couponData.map((item, index) => (
                    <div className="flex mt-6 justify-between">
                      <p className="text-[#2D4271] text-[15px] font-semibold">
                        Tên Giảm Giá:
                      </p>
                      <p key={index} className="text-red-400 text-[14px]">
                        {item.discount_name}
                      </p>
                    </div>
                  ))
                  : ""}
                {couponData.length > 0
                  ? couponData.map((item, index) => (
                    <div className="flex mt-6 justify-between">
                      <p className="text-[#2D4271] text-[15px] font-semibold">
                        Số Tiền Giảm:
                      </p>
                      <p key={index} className="text-red-400 text-[14px]">
                        {item.discount_condition == 1
                          ? item.percentage + "K"
                          : item.percentage + "%"}
                      </p>
                    </div>
                  ))
                  : ""}
                <div className="flex mt-6 justify-between">
                  <p className="text-[#2D4271] text-[28px] font-semibold">
                    Tổng cộng
                  </p>
                  {/* mỗi input giảm giá */}
                  {couponData.length > 0 ? (
                    <p className="text-red-400 text-[28px]">
                      {calculateTotalPrice()} VNĐ
                    </p>
                  ) : selectedValue ? (
                    <p className="text-red-400 text-[28px]">
                      {selectedValue} VNĐ
                    </p>
                  ) : (
                    <p className="text-red-400 text-[28px]">
                      {quantity * datatourArray?.gia_nguoilon + quantity2 * datatourArray?.gia_treem} VNĐ
                    </p>
                  )}



                </div>
                <button
                  className=" mx-auto text-center hover:bg-red-600 align-middle mt-5 bg-red-500 rounded-[10px] h-[50px] w-[390px] font-medium text-white items-center text-[22px]"
                  type="submit" onClick={handleSubmit}
                >
                  Đặt ngay
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookTour;
