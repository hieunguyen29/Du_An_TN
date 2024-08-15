import React, { useState, useContext, createContext } from 'react';
import axios from 'axios';
import logo from '../img/logo.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';
import { useStateContext } from '../context/ContextProvider';
import { Avatar } from 'antd';


const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({}); // Thêm state để lưu trữ các lỗi
  // const {setUser, setToken} = useStateContext();
  const rounded = {
    borderRadius: '50%',
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const validateForm = () => {
    let isValid = true;
    const errors = {};

    // Kiểm tra email
    if (!email) {
      errors.email = 'Vui lòng nhập email';
      isValid = false;
    }

    // Kiểm tra password
    if (!password) {
      errors.password = 'Vui lòng nhập mật khẩu';
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login', {
        email,
        password,
      });
      if (response.status === 200) {
        console.log(response.data)
        const token = response.data.access_token;
        const role = response.data.role;
      
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        localStorage.setItem("id", response.data.data.id);
        // authContext.storeAuthData(token,role);
        //  setUser(response.data.role);
        alert("Đăng nhập thành công");
        if(localStorage.getItem("role") === 'admin'){
 
          window.location.href = 'http://localhost:5173/admin';
        }else{
          window.location.href = 'http://localhost:5173/';
        }
        


      }
    } catch (error) {
      console.log('Đã xảy ra lỗi', error);

      // Xử lý lỗi đăng nhập không thành công
      alert("Tài khoản hoặc mật khẩu không chính xác. Vui lòng thử lại.");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">


      <div className="signup-form mt-4 flex flex-col items-center">
        <div className="hello mt-10 mb-10">
          <h1 className="text-2xl text-center font-bold mb-4">Chào Mừng Bạn Đến Với
            <br /> PoLyTour</h1>
        </div>
        <div className="flex flex-col">
          <div>
            <form onSubmit={handleLogin}>
              {/* Hiển thị lỗi cho email */}
              {errors.email && <p className="text-red-500">{errors.email}</p>}
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
                className="form-input"
              />
              <br />
              {/* Hiển thị lỗi cho password */}
              {errors.password && <p className="text-red-500">{errors.password}</p>}
              <input
                type="password"
                placeholder="Mật khẩu"
                value={password}
                onChange={handlePasswordChange}
                className="form-input mt-4"
              />
              <br />
              <a href="#" className="text-blue-500 text-sm mt-3">
                Quên mật khẩu?
              </a>
              <br />
              <button
                type="submit"
                className="bg-blue-500 text-white py-1 px-3 rounded mt-7"
                style={{ width: '300px' }}
              >
                Đăng Nhập
              </button>
            </form>
          </div>

          <a href="/signin">
            <button className="bg-red-500 text-white py-1 px-3 rounded mt-7 " style={{ width: '300px' }}>
              Đăng Ký
            </button>
          </a>
        </div>
        <div className="flex justify-center mt-10">
          <button className="flex items-center bg-blue-500 text-white py-2 px-4 rounded mr-2">
            <FontAwesomeIcon icon={faFacebook} className="mr-2" />
            Facebook
          </button>
          <button className="flex items-center bg-red-500 text-white py-2 px-4 rounded ml-2">
            <FontAwesomeIcon icon={faGoogle} className="mr-2" />
            Google
          </button>
        </div>
        <footer className="mt-8 text-center text-gray-500">
          &copy; {new Date().getFullYear()} Your Website. All rights reserved.
        </footer>
      </div>{' '}
    </div>
  );
};

export default Login;