import React, { useEffect, useState } from 'react';
import logo from '../img/logo.jpg'
import { AiOutlineSearch } from 'react-icons/ai';
import axios from 'axios'; // Import Axios
import { Link } from "react-router-dom";
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
    // useEffect(() => {
    //     if (token) {
    //         fetch('http://127.0.0.1:8000/api/ToursByUserId', {
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //             },
    //         })
    //             .then(response => response.json())
    //             .then(result => {
    //                 setUserTours(result.data);

    //             })
    //             .catch(error => {
    //                 console.log(error);
    //             });
    //     }
    // }, [token])
    useEffect(() => {
        const token = localStorage.getItem("token");

        // Fetch data from the API
        fetch('http://127.0.0.1:8000/api/ToursByUserId', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network response was not ok.');
            })
            .then(data => {
                setUserTours(data.data); // Assuming the data is under the 'data' key in the response
            })
            .catch(error => {
                console.error('There was an error fetching the data:', error);
            });
    }, []);
    const calculateDaysDifference = (ngayKetThuc, lichKhoiHanh) => {
        const ngayKetThucDate = new Date(ngayKetThuc);
        const lichKhoiHanhDate = new Date(lichKhoiHanh);

        const millisecondsPerDay = 1000 * 60 * 60 * 24; // Số milliseconds trong một ngày
        const timeDifference = ngayKetThucDate.getTime() - lichKhoiHanhDate.getTime();
        const daysDifference = Math.round(timeDifference / millisecondsPerDay);

        return daysDifference;
        // console.log(data);
    };
    const [toursByLoaiTour, setToursByLoaiTour] = useState([]);

    useEffect(() => {
        // Lọc và nhóm các tours đã đặt theo loại tour và trạng thái
        const toursByLoaiTourData = {};
        data.forEach((user) => {
            if (user.trang_thai === 0) {
                const loaiTour = user.tours.loai_tours.ten_loai_tour;
                if (!toursByLoaiTourData[loaiTour]) {
                    toursByLoaiTourData[loaiTour] = [];
                }
                toursByLoaiTourData[loaiTour].push(user);
            }
        });
        setToursByLoaiTour(toursByLoaiTourData);
    }, [data]); // Chạy lại khi data thay đổi
    // console.log(toursByLoaiTour);




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
                            <a href="/giohanguser2">Đã Thanh toán</a>
                        </div>
                        <div className='py-5'>
                            <div className='flex border gap-5 px-10 py-5 rounded-lg'>
                                <div className='pt-1'>
                                    <AiOutlineSearch />
                                </div>
                                <input type="text" className='overflow-hidden w-96' placeholder='Tìm kiếm theo tên tour/tourCode hoặc số booking' name="" id="" />
                            </div>
                        </div>

                        {/* {data.map((user) => ( */}
                        {Object.keys(toursByLoaiTour).map((loaiTour) => (
                            <div key={loaiTour}>
                                <div className='px-2'>

                                    <h1 className='text-2xl font-medium'> {loaiTour}</h1>

                                </div>

                                {toursByLoaiTour[loaiTour].map((user) => (
                                    <div key={user.id}><p className='py-3'>{user.tours.lich_khoi_hanh} - {user.tours.ngay_ket_thuc}</p><br />
                                        < div className='flex border gap-5 px-10 py-5 rounded-lg'  >

                                            <div>
                                                <div className='flex gap-4'>
                                                    {user.tours.images.map((image, imgIndex) => (
                                                        <img src={`http://localhost:8000/storage/${image.image_path}`} style={{
                                                            width: '200px',
                                                            height: '250px',

                                                        }} className='w-1/3 rounded-lg' alt="" />
                                                    ))}
                                                    <div>
                                                        <Link to={`http://localhost:5173/bookingtour/${user.id}`} >
                                                            <h2 className='text-2xl font-medium'>{user.tours.ten_tour}</h2>
                                                        </Link>
                                                        <div className='py-4'>
                                                            <p className='py-1 font-medium'>Tuyệt vời</p>
                                                            <p>358 Quan tâm</p>
                                                            <div className='flex justify-between'>
                                                                {/* <p className='py-3'>Số booking: 2HBNDFSBV43476</p> */}

                                                                <div>
                                                                    <p className='text-xl text-red-500 font-medium'> {user.trang_thai === 0 ? 'Chưa thanh toán' : 'Đã thanh toán'}</p>

                                                                    {/* <p className='text-xl text-red-500 font-medium'>{user.thanh_toan.tong_tien_tt} </p> */}

                                                                </div>

                                                            </div>
                                                        </div>
                                                        <div>
                                                            <p className='py-4'>{user.so_luong_khach}người {calculateDaysDifference(user.tours.ngay_ket_thuc, user.tours.lich_khoi_hanh)}đêm</p>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                            <div />


                                        </div></div>
                                ))}
                            </div>

                        ))}

                    </article>

                </div>
            </div >

        </div >
    )
}

export default Giohanguser