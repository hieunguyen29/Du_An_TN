import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    sdt: '',
    cccd: '',
    email: '',
    dia_chi: '',
    password: '',
    confirmPassword: '',
    hinh: null,
    previewURL: null,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    if (e.target.name === 'hinh') {
      const file = e.target.files[0];
      setFormData({
        ...formData,
        hinh: file,
        previewURL: URL.createObjectURL(file),
      });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const validateForm = () => {
    let isValid = true;
    const errors = {};

    // Kiểm tra mật khẩu
    if (!formData.password) {
      errors.password = 'Vui lòng nhập mật khẩu';
      isValid = false;
    }

    // Kiểm tra xác nhận mật khẩu
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Mật khẩu không khớp';
      isValid = false;
    }

    // Thêm các kiểm tra khác nếu cần

    setErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const formDataWithFile = new FormData();
    formDataWithFile.append('name', formData.name);
    formDataWithFile.append('sdt', formData.sdt);
    formDataWithFile.append('cccd', formData.cccd);
    formDataWithFile.append('email', formData.email);
    formDataWithFile.append('dia_chi', formData.dia_chi);
    formDataWithFile.append('password', formData.password);
    formDataWithFile.append('hinh', formData.hinh);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/register/dk', {
        method: 'POST',
        body: formDataWithFile,
      });
      const data = await response.json();
      console.log(data);

      // Lưu thông tin đăng nhập vào trạng thái ứng dụng
      const userData = {
        username: data.email,
        token: data.password,
      };
      localStorage.setItem('userData', JSON.stringify(userData));

      // Đăng nhập tự động sau khi đăng ký thành công
      const loginResponse = await axios.post('http://127.0.0.1:8000/api/login', {
        email: formData.email,
        password: formData.password,
      });

      if (loginResponse.status === 200) {
        const token = loginResponse.data.access_token;
        localStorage.setItem('token', token);
        alert('Đăng Ký Tài Khoản thành công');
        // Chuyển hướng đến trang sau khi đăng nhập thành công
        window.location.href = 'http://localhost:5173/';
      } else {
        console.log('Đăng nhập không thành công');
      }
    } catch (error) {
      console.error('Đăng ký không thành công:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="banner">
        <h2 style={{ color: 'blue' }} className="text-2xl text-center mt-20 font-bold mb-4">
          Đăng Ký Hội Viên
        </h2>
      </div>
      <div style={{ marginLeft: '133px' }}>
        Để hoàn tất đăng ký Hội viên POlyTourPlus, quý khách vui lòng điền đầy đủ thông tin vào mẫu dưới đây và nhấn vào nút đăng ký. Xin chân thành cảm ơn quý khách hàng.
      </div>
      <form className="mt-8" style={{ width: '80%', marginLeft: '135px' }} onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block font-bold mb-2">
              Họ tên (*)
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border border-gray-400 px-3 py-2 rounded w-full"
              required
            />
          </div>
          <div>
            <label htmlFor="hinh">Ảnh đại diện:</label>
            <input type="file" id="hinh" name="hinh" onChange={handleChange} />
            {formData.previewURL && (
              <div className="ml-64 w-48 h-48 flex items-center justify-center bg-gray-200 rounded-full">
                <img
                  src={formData.previewURL}
                  alt="Ảnh đại diện"
                  className="rounded-full w-44 h-44 border-4 border-white"
                />
              </div>
            )}
          </div>
          <div>
            <label htmlFor="sdt" className="block font-bold mb-2">
              Di động (*)
            </label>
            <input
              type="text"
              id="sdt"
              name="sdt"
              value={formData.sdt}
              onChange={handleChange}
              className="border border-gray-400 px-3 py-2 rounded w-full"
              required
            />
          </div>
          <div>
            <label htmlFor="cccd" className="block font-bold mb-2">
              CMND
            </label>
            <input
              type="text"
              id="cccd"
              name="cccd"
              value={formData.cccd}
              onChange={handleChange}
              className="border border-gray-400 px-3 py-2 rounded w-full"
            />
          </div>
          <div>
            <label htmlFor="email" className="block font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border border-gray-400 px-3 py-2 rounded w-full"
            />
          </div>
          <div>
            <label htmlFor="dia_chi" className="block font-bold mb-2">
              Địa chỉ
            </label>
            <input
              type="text"
              id="dia_chi"
              name="dia_chi"
              value={formData.dia_chi}
              onChange={handleChange}
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
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`border ${errors.password ? 'border-red-500' : 'border-gray-400'} px-3 py-2 rounded w-full`}
              required
            />
            {errors.password && <p className="text-red-500">{errors.password}</p>}
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block font-bold mb-2">
              Nhập lại (*)
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-400'} px-3 py-2 rounded w-full`}
              required
            />
            {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword}</p>}
          </div>
        </div>
        <div className="text-center mt-6">
          <button className="bg-red-500 text-white mb-10 py-1 px-3 rounded mt-7" style={{ width: '300px' }}>
            Đăng Ký
          </button>
        </div>
      </form>
      <div style={{ textAlign: 'left' }}>
        - Hội viên đăng ký chương trình cung cấp đúng các thông tin về số điện thoại, địa chỉ liên hệ, địa chỉ email của Hội viên. Khi có thay đổi, Hội viên có thể tự cập nhật vào tài khoản tại POlyTourPlus.com hoặc liên hệ thông báo trực tiếp với nhân viên POlyTour và yêu cầu cập nhật. <br />
      </div>
      <footer className="mt-8 text-center text-gray-500">
        &copy; {new Date().getFullYear()} Your Website. All rights reserved.
      </footer>
    </div>
  );
};

export default Signup;
