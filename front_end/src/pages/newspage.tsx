
import logo from "../img/logo.jpg"
import anh16 from "../img/anh16.png"
import anh5 from "../img/anh5.png"
import anh18 from "../img/anh18.png"
import anh6 from "../img/anh6.png"
import anh20 from "../img/anh20.jpg"
import anh21 from "../img/anh21.jpg"
import anh22 from "../img/anh22.jpg"
import anh10 from "../img/ảnh 10.jpg"
import anh23 from "../img/anh23.png"
import anh24 from "../img/anh24.png"

import React, { useEffect } from "react";
import { Table, Button, Popconfirm, Alert } from "antd";
import { Link } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { Ipostdm } from "../interface/postdm";
import { Ipost } from "../interface/post"
import { useGetpostdmQuery, useRemovepostdmMutation } from "../api/postdm";
import { useGetpostQuery, useRemovepostMutation } from "../api/post";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


const rounded = {
  borderRadius: '25px',
};

const News = () => {
  const { data: tourdata } = useGetpostQuery();
  const [removePost, { isSuccess: isRemoveSuccess }] = useRemovepostMutation();
  const navigate = useNavigate();



  const tourArray = tourdata?.data || [];
  const dataSource = tourArray.map(({ id,
    ten_post,
    image,
    mo_ta,
    ngay_dang, }: Ipost) => ({
      key: id,
      ten_post,
      image,
      mo_ta,
      ngay_dang,
    }));
  return (
    <div>


      <div>
        <article  className=' container mx-auto px-20 gap-11 pt-5'>
          <h1 className='text-center text-red-500 font-semibold text-3xl py-3'>Tin tức PolyTour</h1>
          <div className='flex gap-72 py-2 container justify-center'>
            <p className='font-medium'>Tin tức du lịch</p>
            <p className='font-medium'>Cẩm nang du lịch</p>
            <p className='font-medium'>Kinh nghiệm du lịch</p>
          </div>
          <h1 className='text-xl font-medium py-3'>Tin tức du lịch</h1>

          <div className='flex gap-5'>
            <div className='w-3/5'>
              {dataSource.length > 0 && ( // Check if dataSource is not empty
                <>
                  <div>
                    <Link to={`/post/${dataSource[0].key}`} className='w-auto rounded-xl'>
                      <img src={`http://localhost:8000/storage/${dataSource[0].image}`} className='w-[900px] h-[550px] rounded-xl' />
                    </Link>
                  </div>
                  <p className='py-4 px-3 text-red-500 font-medium'>Tin tức dữ liệu</p>
                  <Link to={`/post/${dataSource[0].key}`} className='w-auto rounded-xl'>
                    <h2 className='px-3 font-semibold text-4xl'>{dataSource[0].ten_post}</h2>
                  </Link>
                  <p className='text-sm px-3 py-4'>{dataSource[0].ngay_dang}</p>
                </>
              )}
            </div>

            <div className='w-2/5'>
              {dataSource.map(item => (
                <div className='flex gap-3 pb-3' key={item.key}>
                  <Link to={`/post/${item.key}`} >
                    <img src={`http://localhost:8000/storage/${item.image}`} alt={`Image ${item.key}`} className='w-[250px] h-[175px] rounded-lg' /></Link>
                  <div>
                    <p className='text-red-500 font-medium text-lg'>Tin Tức Dữ Liệu</p>
                    <Link to={`/post/${item.key}`} >
                      <p className='font-medium py-4 text-lg'>{item.ten_post}</p></Link>
                    <p className='font-medium'>{item.ngay_dang}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
          <div className='container'>
            <div className='container flex mb-3 px-5 justify-between align-items-center'>
              <h2 className='py-4 text-xl font-semibold'>Cẩm nang du lịch</h2>
              <a href="" className='fw-bold py-4 font-medium'>Xem tất cả</a>
            </div>
            <div className='grid grid-cols-3 gap-14'>
              <img src={anh20} alt="anh20" className='rounded-xl w-auto' />
              <img src={anh21} alt="anh21" className='rounded-xl w-auto' />
              <img src={anh22} alt="anh22" className='rounded-xl w-auto' />
            </div>
          </div>
          <div>
            <div className='container flex mb-3 px-5 py-3 justify-between align-items-center'>
              <h2 className='py-4 text-xl font-semibold'>Cẩm nang du lịch</h2>
              <a href="" className='fw-bold py-4 font-medium'>Xem tất cả</a>
            </div>
            <div className='grid grid-cols-3 gap-14'>
              <div>
                <img src={anh10} alt="anh10" className='rounded-xl w-auto' />
                <p className='text-red-500 py-3 px-1 font-medium'>Kinh nghiệm du lịch</p>
              </div>
              <div>
                <img src={anh23} alt="anh23" className='rounded-xl w-auto' />
                <p className='text-red-500 py-3 px-1 font-medium'>Kinh nghiệm du lịch</p>
              </div>
              <div>
                <img src={anh24} alt="anh24" className='rounded-xl w-auto' />
                <p className='text-red-500 py-3 px-1 font-medium'>Kinh nghiệm du lịch</p>
              </div>
            </div>
          </div>
        </article>
      </div>
 
      <footer className="mt-15  text-center bg-gray-100">
        <div className="flex flex-wrap justify-center">
          <div className="w-full md:w-1/2 lg:w-1/5">
            <h3 style={{ color: '#2d4271' }} className="mt-5 text-lg font-semibold mb-4 ">Điểm đến</h3>
            <ul className="list-disc pl-4">
              <li>Hà Nội</li>
              <li>Hồ Chí Minh</li>
              <li>Đà Nẵng</li>
              <li>Hội An</li>
              <li>Nha Trang</li>
              <li>Phú Quốc</li>
              <li>Đà Lạt</li>
              <li>Sapa</li>
              <li>Phan Thiết</li>
              <li>Hạ Long</li>
              <li>Vũng Tàu</li>
            </ul>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/5">
            <h3 style={{ color: '#2d4271' }} className="mt-5 text-lg font-semibold mb-4">Liên hệ</h3>
            <p>Email: Polytour@gmail.com</p>
            <p>Tìm kiếm thông tin</p>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/5">
            <h3 style={{ color: '#2d4271' }} className="mt-5 text-lg font-semibold mb-4">Hỗ trợ</h3>
            <p>Mạng xã hội</p>
            <p>037 763 8662</p>
            <p>Từ 8:00 - 22:00 hàng ngày</p>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/5">
            <h3 style={{ color: '#2d4271' }} className="mt-5 text-lg font-semibold mb-4">Thông tin</h3>
            <ul className="list-disc pl-4">
              <li>Tạp chí du lịch</li>
              <li>Cẩm nang du lịch</li>
              <li>Tin tức</li>
              <li>Sitemap</li>
              <li>FAQs</li>
              <li>Chính sách riêng tư</li>
              <li>Thỏa thuận sử dụng</li>
            </ul>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/5">
            <h3 style={{ color: '#2d4271' }} className="mt-5 text-lg font-semibold mb-4">Dòng tour</h3>
            <ul className="list-disc pl-4">
              <li>Cao cấp</li>
              <li>Tiêu chuẩn</li>
              <li>Tiết kiệm</li>
              <li>Giá tốt</li>
            </ul>
          </div>
        </div>
        <div className="flex flex-wrap mt-8">
          <div className="w-full md:w-1/2 lg:w-1/3">
            <h3 style={{ color: '#2d4271' }} className="text-lg font-semibold mb-4">Liên kết</h3>
            <ul className="list-disc pl-4">
              <li><a href="/">Trang chủ</a></li>
              <li><a href="/about">Giới thiệu</a></li>
              <li><a href="/services">Dịch vụ</a></li>
              <li><a href="/contact">Liên hệ</a></li>
            </ul>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3">
            <h3 style={{ color: '#2d4271' }} className="text-lg font-semibold mb-4">Theo dõi chúng tôi</h3>
            <ul className="flex justify-center mb-4">
              <li className="mr-4"><a href="#"><i className="fab fa-facebook-f"></i></a></li>
              <li className="mr-4"><a href="#"><i className="fab fa-twitter"></i></a></li>
              <li className="mr-4"><a href="#"><i className="fab fa-instagram"></i></a></li>
              <li className="mr-4"><a href="#"><i className="fab fa-youtube"></i></a></li>
            </ul>
            <p className="text-sm">Theo dõi chúng tôi để cập nhật thông tin mới nhất về du lịch.</p>
          </div>
          <div className="w-fullmd:w-1/2 lg:w-1/3">
            <h3 style={{ color: '#2d4271' }} className="text-lg font-semibold mb-4">Đăng ký nhận tin</h3>
            <p>Đăng ký để nhận thông tin du lịch, khuyến mãi và tin tức mới nhất.</p>
            <form className="mt-4 mr-5">
              <input type="email" placeholder="Nhập địa chỉ email" className="w-full py-2 px-4  rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500" />
              <button type="submit" className="mt-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none">Đăng ký</button>
            </form>
          </div>
        </div>
        <div className="mt-8">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Your Website. All rights reserved
          </p>
        </div>
      </footer>
    </div>
  )
}

export default News