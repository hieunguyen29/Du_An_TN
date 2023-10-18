import React from 'react';
import logo from '../img/logo.jpg';
import { Link } from 'react-router-dom';
const Signup = () => {
  const rounded = {
    borderRadius: '50%',
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="banner">
        <h1 className="text-2xl text-center font-bold mb-4">Welcome to PolyTour</h1>
      </div>
      <div className="menu flex items-center justify-between">
      <div className='flex'>
          <img style={rounded} src={logo} alt="logo" width="70px" />
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

</div>
      </div>

      <div className="banner">
        <h2 style={{color:'blue'}} className="text-2xl text-center mt-20 font-bold mb-4">Đăng Ký Hội Viên</h2>
      </div>
      <div style={{marginLeft:'133px',}}>Để hoàn tất đăng ký Hội viên POlyTourPlus, quý khách vui lòng điền đầy đủ thông tin vào mẫu dưới đây và nhấn vào nút đăng ký. Xin chân thành cảm ơn quý khách hàng.</div>
      <form className="mt-8 " style={{width:"80%" ,marginLeft:'135px'}}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="fullName" className="block font-bold mb-2">
              Họ tên (*)
            </label>
            <input
              type="text"
              id="fullName"
              className="border border-gray-400 px-3 py-2 rounded w-full"
            />
          </div>
          <div>
            <label htmlFor="mobile" className="block font-bold mb-2">
              Di động (*)
            </label>
            <input
              type="text"
              id="mobile"
              className="border border-gray-400 px-3 py-2 rounded w-full"
            />
          </div>
          <div>
            <label htmlFor="dob" className="block font-bold mb-2">
              Ngày sinh
            </label>
            <input
              type="text"
              id="dob"
              className="border border-gray-400 px-3 py-2 rounded w-full"
            />
          </div>
          <div>
            <label htmlFor="gender" className="block font-bold mb-2">
              Giới tính
            </label>
            <select
              id="gender"
              className="border border-gray-400 px-3 py-2 rounded w-full"
            >
              <option value="">Chọn giới tính</option>
              <option value="male">Nam</option>
              <option value="female">Nữ</option>
            </select>
          </div>
          <div>
            <label htmlFor="idCard" className="block font-bold mb-2">
              CMND
            </label>
            <input
              type="text"
              id="idCard"
              className="border border-gray-400 px-3 py-2 rounded w-full"
            />
          </div>
          
          <div>
            <label htmlFor="passport" className="block font-bold mb-2">
              Passport
            </label>
            <input
              type="text"
              id="passport"
              className="border border-gray-400 px-3 py-2 rounded w-full"
            />
          </div>
          <div>
            <label htmlFor="passportDate" className="block font-bold mb-2">
              Ngày cấp
            </label>
            <input
              type="text"
              id="passportDate"
              className="border border-gray-400 px-3 py-2 rounded w-full"
            />
          </div>
          <div>
            <label htmlFor="passportExpDate" className="block font-bold mb-2">
              Ngày hết hạn
            </label>
            <input
              type="text"
              id="passportExpDate"
              className="border border-gray-400 px-3 py-2 rounded w-full"
            />
          </div>
     
          <div>
            <label htmlFor="city" className="block font-bold mb-2">
              Tỉnh/TP
            </label>
            <select
              id="city"
              className="border border-gray-400 px-3 py-2 rounded w-full"
            >
              <option value="">Hà Nội</option>
              <option value="">Hà Nam</option>
              <option value="">TP HCM</option>
              <option value="">Quảng Bình</option>
              <option value="">Nam Định</option>
              <option value="">Nghệ An</option>
              <option value="">Hà Tĩnh</option>
              <option value="">Đà Lạt</option>
              <option value="">Quảng Nam </option>
              <option value="">Bình Định</option>
              <option value="">Bình Phước </option>
              <option value="">Bình Dương</option>
              <option value="">Thanh Hóa</option>
              <option value="">Bà Rịa Vũng tàu</option>
              <option value="">Bà Rịa Vũng tàu</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="address" className="block font-bold mb-2">
              Địa chỉ
            </label>
            <input
              type="text"
              id="address"
              className="border border-gray-400 px-3 py-2 rounded w-full"
            />
          </div>
          <div>
            <label htmlFor="refCode" className="block font-bold mb-2">
              Mã giới thiệu
            </label>
            <input
              type="text"
              id="refCode"
              className="border border-gray-400 px-3 py-2 rounded w-full"
            />
          </div>
          <div>
            <label htmlFor="password" className="block font-bold mb-2">
              Mật khẩu (*)
            </label>
            <input
              type="password"
              id="password"
              className="border border-gray-400 px-3 py-2 rounded w-full"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block font-bold mb-2">
              Nhập lại (*)
            </label>
            <input style={{minWidth:"1190px",}}
              type="password"
              id="confirmPassword"
              className="border border-gray-400 px-3 py-2 rounded "
            />
          </div>
        </div>

        <div className="text-center mt-6">
        <button className="bg-red-500 text-white mb-10 py-1 px-3 rounded mt-7  " style={{ width: '300px' }}>
          Đăng Ký
        </button>  
          <div style={{textAlign:'left'}}>
  - Hội viên đăng ký chương trình cung cấp đúng các thông tin về số điện thoại, địa chỉ liên hệ, địa chỉ email của Hội viên. Khi có thay đổi, Hội viên có thể tự cập nhật vào tài khoản tại POlyTourPlus.com hoặc liên hệ thông báo trực tiếp với nhân viên POlyTour và yêu cầu cập nhật. <br />

  - Hội viên tham gia chương trình được cộng điểm Vàng và điểm Thưởng sau khi sử dụng dịch vụ tại POlyTour theo hệ số cộng điểm và theo các quy định về điểm thưởng khác được công bố tại từng thời điểm.<br />

  - POlyTour có quyền thay đổi các điều kiện và điều khoản của chương trình Khách hàng thân thiết bất kỳ thời điểm nào có (hoặc không) báo trước và sẽ công bố chính thức trên POlyTourPlus.com.<br />

  - POlyTour có quyền sửa đổi cách thức của chương trình hoặc những quyền lợi có được từ chương trình tại bất kỳ thời điểm nào, có (hoặc không) báo trước và sẽ công bố chính thức trên POlyTourPlus.com.<br />

  - POlyTour có quyền tạm ngừng hoặc chấm dứt toàn bộ chương trình Khách hàng thân thiết tại bất kỳ thời điểm nào, có (hoặc không) báo trước.<br />

  - POlyTour được miễn trừ chịu trách nhiệm nếu Hội viên không nhận được các ưu đãi và lợi ích từ chương trình do số điện thoại, email Hội viên có thay đổi mà không cập nhật vào hồ sơ hội viên hoặc do gửi ấn phẩm, thư tín qua đường bưu điện đến Hội viên bị thất lạc.<br />

  - Mọi khiếu nại, yêu cầu bồi thường của Hội viên liên quan đến chương trình sẽ do POlyTour giải quyết. Sự giải quyết của POlyTour có giá trị áp dụng sau cùng.<br />

  - POlyTour được phép sử dụng những thông tin của Hội viên trong các trường hợp: phục vụ cho việc nghiên cứu thị trường, lên kế hoạch kinh doanh nhằm phục vụ Hội viên tốt hơn của POlyTour hoặc đối tác chương trình, gửi phần thưởng hay các ấn phẩm đến Hội viên mà không cần sự đồng ý của Hội viên hoặc các trường hợp khác được Hội viên cho phép.<br />

  - Hội viên được khuyến khích đọc kỹ và được xem như chấp nhận nội dung chương trình Khách hàng thân thiết POlyTourPlus trước khi đăng ký trở thành Hội viên
</div>
        </div>
      </form>
      <footer className="mt-8 text-center text-gray-500">
    &copy; {new Date().getFullYear()} Your Website. All rights reserved.
  </footer>
    </div>
  );
};

export default Signup;