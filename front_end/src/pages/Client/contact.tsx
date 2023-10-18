import React, { useState } from "react";
import logo from "./img/logo.jpg"
type Props = {};
import { Link } from "react-router-dom";

const Contact = (props: Props) => {
  //select
  const [selectedOption, setSelectedOption] = useState("");

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };
  //text
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
//capcha
  const [isChecked, setIsChecked] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitted(true);

    if (isChecked) {
      alert('Submit successful!');
    } else {
      alert('bạn chưa xác nhận');
    }
  };
  return (
    <div className="w-[85%] h-[1000px] bg-white mx-auto">
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
      <div className="container tittle ml-[100px]">
        <p className="text-[26px] px-5 py-5 text-red-500 font-semibold">
          Liên hệ
        </p>
        <p className="text-[#6c757d] ml-[15px] text-base">
          Để có thể đáp ứng được các yêu cầu và các ý kiến đóng góp của quý vị
          một cách nhanh chóng xin vui lòng liên hệ
        </p>
      </div>
   
      <div className="w-full mt-6 flex gap-3">
        <div className="w-2/3 max-h-max ">
        <p className="text-[26px] px-5 py-5 text-red-500 font-semibold">
        Gửi thông tin
      </p>
          <form  onSubmit={handleSubmit} action="">
          <div className="grid grid-cols-3 gap-2">
            <div className="select mt-[4px]">
              <p className="text-[#2D4271]">Loại thông tin(*) </p>
            <select className="border h-11 w-[230px] rounded" value={selectedOption} onChange={handleSelectChange}>
              <option value="">Chọn một lựa chọn</option>
              <option value="option1">Du lịch</option>
              <option value="option2">Chăm sóc khách hàng</option>
              <option value="option2">Liên hệ thông tin khác</option>
            </select>
            </div>
            <div className="">
            <p className="text-[#2D4271] mb-1">Họ tên</p>
                <input
                  className="h-11 w-[230px] border border-gray-300 rounded-md"
                  type="text"
                />
             
            
            </div>
            <div className="">
            <p className="text-[#2D4271] mb-1">Email(*)</p>
                <input
                  className="h-11 w-[230px] border border-gray-300 rounded-md"
                  type="text"
                />
             
          
            </div>
            <div className="">
            <p className="text-[#2D4271] mb-1">Điện thoại(*)</p>
                <input
                  className="h-11 w-[230px] border border-gray-300 rounded-md"
                  type="text"
                />
             
        
            </div>
            <div className="">
            <p className="text-[#2D4271] mb-1">Số khách</p>
                <input
                  className="h-11 w-[230px] border border-gray-300 rounded-md"
                  type="text"
                />
             
          
            </div>
            <div className="">
            <p className="text-[#2D4271] mb-1">Tên công ty</p>
                <input
                  className="h-11 w-[230px] border border-gray-300 rounded-md"
                  type="text"
                />
             
           
            </div>
            
         
          </div>
          <div>
          <p className="text-[#2D4271] mb-1">Địa chỉ</p>
                <input
                  className="h-11 w-[94%] border border-gray-300 rounded-md"
                  type="text"
                />
            <p className="text-[#2D4271] mb-1">Tiêu đề(*)</p>
                <input
                  className="h-11 w-[94%] border border-gray-300 rounded-md" 
                  type="text"
                />    
          <p className="text-[#2D4271] mt-2">Nội dung(*)</p>       
    <textarea className="border mt-5"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Nhập văn bản..."
        style={{ width: '94%', height: '100px' }} 
      />    
          </div>
          <div>
          <label>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          Tôi không phải người máy
        </label>
      
          </div>
          <div className="text-center mt-4" >   <button className="bg-red-500 text-center items-center justify-center rounded-md w-[100px] text-white h-10"  type="submit">Gửi đi</button></div>
      
      
          </form>
        </div>

        <div className="w-1/3 max-h-max">
        <p className="text-[26px] px-5 py-5 text-red-500 font-semibold">
        Mạng lưới chi nhánh    </p>
        <div className="max-h-max bg-[#f9f9f9] ">
        <p className="text-[28px] px-5 py-5 text-[#2D4271] font-medium">
        Khu vực Hà Nội  </p>
        <p className="text-[28px] px-5 py-5 text-[#2D4271] font-medium">
        TRỤ SỞ CHÍNH </p>
        <p className=" px-5 py-5">Cao đẳng Fpt</p>
        </div>
  
        </div>
      </div>
  
    </div>
    
  );
};

export default Contact;
