import React, { useEffect, useState } from 'react';
import logo from '../img/logo.jpg'
import { AiOutlineSearch } from 'react-icons/ai';
import axios from 'axios'; // Import Axios
import { Link } from "react-router-dom";
import "./css.css"
import { FaStar } from 'react-icons/fa';
import Item from 'antd/es/list/Item';

const rounded = {
    borderRadius: '25px',
};
const Giohanguser = () => {
    const token = localStorage.getItem("token");
    const [usersId, setUserId] = useState("");
    const [data, setUserTours] = useState([]);
    const Td = JSON.parse(localStorage.getItem('id'));
    const role = localStorage.getItem('role');
    useEffect(() => {
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
                    setUserId(userData);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [token])

    const handleLogout = async (e) => {
        e.preventDefault();
        const confirmLogout = window.confirm("Bạn chắc chắn muốn đăng xuất?");

        if (!confirmLogout) {
            return;
        }
        try {
            const token = localStorage.getItem("token");
            await axios.delete('http://127.0.0.1:8000/api/logout', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            localStorage.removeItem('token');
            localStorage.removeItem('id');
            localStorage.removeItem('role');
            // Display a success message
            alert("Đăng xuất thành công!");
            window.location.href = 'http://localhost:5173';
        } catch (error) {
            console.error('Lỗi khi đăng xuất:', error);
        }
    };
    const calculateDaysDifference = (ngayKetThuc, lichKhoiHanh) => {
        const ngayKetThucDate = new Date(ngayKetThuc);
        const lichKhoiHanhDate = new Date(lichKhoiHanh);
        const millisecondsPerDay = 1000 * 60 * 60 * 24; // Số milliseconds trong một ngày
        const timeDifference = ngayKetThucDate.getTime() - lichKhoiHanhDate.getTime();
        const daysDifference = Math.round(timeDifference / millisecondsPerDay);

        return daysDifference;
        // console.log(data);
    };
    const showAlert = (tourId) => {
        const inputContainer = document.getElementById(`inputContainer-${tourId}`);
        const isInputVisible = !inputContainer.classList.contains("hidden");

        if (isInputVisible) {
            inputContainer.classList.add("hidden");
        } else {
            inputContainer.classList.remove("hidden");
        }
    };
    
    // lấy số sao đánh giá
    const [selectedStars, setSelectedStars] = useState(0);
    const handleStarClick = (rating) => {
        setSelectedStars(rating);
        console.log('132',selectedStars);
        
    };
    //  nội dung đánh giá 
    const [inputValue, setInputValue] = useState('');
    // xử lý đánh giá 
  
    // 

    const [evaluations, setEvaluations] = useState([]);


    useEffect(() => {
        findEvaluate();
    }, [])
    const findEvaluate = () => {
        axios.get('http://127.0.0.1:8000/api/find_evaluate', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => {
                // Xử lý kết quả thành công
                console.log(response.data);
                setEvaluations(response.data.tour);
            })
            .catch(error => {
                // Xử lý lỗi
                console.error(error);
            });
    };
    const addToFavorites = (id,version) => {
        const token = localStorage.getItem('token');
        axios.post('http://127.0.0.1:8000/api/evaluate', { so_sao: selectedStars, noi_dung: inputValue, id_tour: id,version:version }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => {
                // Xử lý kết quả thành công
                console.log(response.data);
                setInputValue("")
                findEvaluate();
            })
            .catch(error => {
                alert('Nội dung chứa từ ngữ nhạy cảm')
                console.error(error);
            });
    };
    return (
        <div>
            <br /><br /><br /><br />
            <div className='container mx-auto' >
                <div className='flex gap-10'>
                    <aside className='w-1/5 container mx-auto'>
                        <div className='border border-gray-300 rounded-lg container mx-auto'>
                            <div className='px-4 py-7 flex gap-1'>
                                <img
                                    src={`http://localhost:8000/storage/${usersId.image}`}
                                    alt="img"
                                    style={{
                                        width: '50px',
                                        height: '50px',
                                        borderRadius: '50%', // Đặt border-radius thành 50% để làm cho hình ảnh tròn
                                        border: '2px solid #fff', // Đặt border với màu và độ rộng tùy chọn
                                    }}
                                />
                                <div className='p-2'>
                                    <h1 className='font-medium p-1'>{usersId.name}</h1>
                                    <p className='text-sm px-1 text-left'>{usersId.email}</p>
                                </div>
                            </div>
                            <hr className='mx-5 h-[2px] bg-slate-900' />
                            <div className='py-3'>
                                <h2 className='px-5 font-medium py-2'>Tài khoản</h2>
                                <div className='px-10'>
                                    <a href="/profile"><p className='text-sm text-red-500 py-1'>Thông tin cá nhân</p></a>
                                    <a href="/changeMk"> <p className='text-gray-500 text-sm py-1 hover:text-red-500'>Đổi mật khẩu</p></a>
                                    <a href="#" onClick={handleLogout}>
                                        <p className='text-gray-500 text-sm py-1 hover:text-red-500'>Đăng xuất</p>
                                    </a>

                                </div>
                            </div>
                            <a href="/giohanguser"><h3 className='px-5 py-1 font-medium hover:text-red-500'>Tour đã đặt</h3></a>
                            <a href=""><h3 className='px-5 py-1 font-medium hover:text-red-500'>Đánh giá của quý khách</h3></a>
                            <a href="/favorite"><h3 className='px-5 py-1 pb-10 font-medium hover:text-red-500'>Yêu thích đã lưu</h3></a>
                        </div>
                    </aside>
                    <article className='w-4/5 container'  >
                        <div className='flex border justify-between px-10 py-5 rounded-lg'>
                            <a href="/giohanguser">Tất cả</a>
                            <a href="/giohanguser1">Chưa thanh toánn</a>
                            <a href="giohanguser2">Đã Thanh toán</a>
                        </div>
                        <div className='py-5'>
                            <div className='flex border gap-5 px-10 py-5 rounded-lg'>
                                <div className='pt-1'>
                                    <AiOutlineSearch />
                                </div>
                                <input type="text" className='overflow-hidden w-96' placeholder='Tìm kiếm theo tên tour/tourCode hoặc số booking' name="" id="" />
                            </div>
                        </div>
                        {evaluations.map((item) => (
                            <div key={item}>
                                  
                                <div className='px-2'>
                                    <h1 className='text-2xl font-medium'> {item.ten_loai_tour.ten_loai_tour}</h1>
                                </div>
                                <div>
                                    <p className='py-3'>{item.tour.lich_khoi_hanh} - {item.tour.ngay_ket_thuc}</p>
                                    <br />
                                    <div className='flex border gap-5 px-10 py-5 rounded-lg'>
                                        <div>
                                            <div className='flex gap-4'>
                                                <img
                                                    src={`http://localhost:8000/storage/${item.tour.image_path}`}
                                                    style={{
                                                        width: '200px',
                                                        height: '250px',
                                                    }}
                                                    className='w-1/3 rounded-lg'
                                                    alt={item.tour.ten_tour}
                                                />
                                                <div>
                                                    <Link to={`http://localhost:5173/bookingtour/${item.tour.id}`}>
                                                        <h2 className='text-2xl font-medium'>{item.tour.ten_tour}</h2>
                                                    </Link>
                                                    <div className='mb-2'>
                                                        <p className='py-1 font-medium'>Tuyệt vời</p>
                                                        <p>358 Quan tâm</p>
                                                        <div className='flex justify-between'>
                                                            <div>
                                                                <p className='text-xl text-red-500 font-medium'> {item.trang_thai === 0 ? 'Chưa thanh toán' : 'Đã thanh toán'}</p>
                                                                {/* <p className='text-xl text-red-500 font-medium'>{item.thanh_toan ? `tt ${user.thanh_toan.tong_tien_tt}₫` : ''}</p> */}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <p className='mb-2'>{item.so_luong_khach}người {calculateDaysDifference(item.tour.ngay_ket_thuc, item.tour.lich_khoi_hanh)}đêm</p>
                                                    </div>
                                                 
                                                    {item.danh_gia && item.danh_gia.version == item.id ? (

                                                        <>
                                                            <p className='flex items-center text-base font-semibold'>Đánh giá: {item.danh_gia.so_sao} <span className='ml-1'><img src="https://cdn-icons-png.flaticon.com/128/2107/2107957.png" alt="" width={'16px'} height={'16px'} /></span> </p>
                                                            <p className='text-base font-semibold'>Nội dung: <span className='text-red-500'>{item.danh_gia.noi_dung}</span> </p>
                                                        </>
                                                    ) : (
                                                        <div>
                                                            <button className='border rounded-xl px-3 py-1 bg-blue-500 text-white' onClick={() => showAlert(item.id)}>Viết đánh giá</button>
                                                            <br />
                                                            <div id={`inputContainer-${item.id}`} className="hidden ">
                                                                <div className=' flex flex-col'>
                                                                <div className="rate  mb-5 mt-3 flex gap-2">
                                                                    <h2  style={{ color: selectedStars >= 1 ? 'yellow' : 'gray' }} className={`text-${selectedStars >= 1 ? 'yellow' : 'gray'}-300 text-[25px]`}>
                                                                        <FaStar onClick={() => handleStarClick(1)} />
                                                                    </h2>
                                                                    <h2 style={{ color: selectedStars >= 2 ? 'yellow' : 'gray' }} className={`text-${selectedStars >= 2 ? 'yellow' : 'gray'}-300 text-[25px]`}>
                                                                        <FaStar onClick={() => handleStarClick(2)} />
                                                                    </h2>
                                                                    <h2 style={{ color: selectedStars >= 3 ? 'yellow' : 'gray' }} className={`text-${selectedStars >= 3 ? 'yellow' : 'gray'}-300 text-[25px]`}>
                                                                        <FaStar onClick={() => handleStarClick(3)} />
                                                                    </h2>
                                                                    <h2 style={{ color: selectedStars >= 4 ? 'yellow' : 'gray' }} className={`text-${selectedStars >= 4 ? 'yellow' : 'gray'}-300 text-[25px]`}>
                                                                        <FaStar onClick={() => handleStarClick(4)} />
                                                                    </h2>
                                                                    <h2 style={{ color: selectedStars >= 5 ? 'yellow' : 'gray' }}className={`text-${selectedStars >= 5 ? 'yellow' : 'gray'}-300 text-[25px]`}>
                                                                        <FaStar onClick={() => handleStarClick(5)} />
                                                                    </h2>
                                                                </div>
                                                                <div>
                                                                    <input className='w-[500px] input-rate h-8 px-3 py-1 rounded-tl-md rounded-bl-md ' type="text" value={inputValue} onChange={e => setInputValue(e.target.value)} style={{ border: "1px solid" }} />
                                                                <button className='px-3 py-1 h-8 rounded-tr-md rounded-br-md' style={{ background: "green", color: "white" }} onClick={() => addToFavorites(item.id_tour,item.id)}>Đánh giá </button> 
                                                                </div>
                                                                </div>
                                                               
                                                               
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        ))}

                    </article>

                </div>
            </div >

        </div >
    )
}

export default Giohanguser