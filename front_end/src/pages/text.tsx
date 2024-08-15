import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

function Test() {
    function calculateNumberOfDays(start, end) {
        const startDate = new Date(start);
        const endDate = new Date(end);

        const timeDifference = Math.abs(endDate - startDate);
        const numberOfDays = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

        return numberOfDays;
    }

    const [tourdiemden, setTour] = useState([]);
    const { diem_den } = useParams<{ diem_den: any }>();
    useEffect(() => {
        axios
            .get(`http://127.0.0.1:8000/api/getToursByDestination?diem_den=${diem_den}`)
            .then((response) => {
                console.log(response.data.tourdiemden);
                setTour(response.data.tourdiemden);
            })
        if (diem_den === undefined) {
            axios
                .get(`http://127.0.0.1:8000/api/getToursByDestination?diem_den`)
                .then((response) => {
                    console.log('123jhgkjg', response.data.tourdiemden);
                    setTour(response.data.tourdiemden);
                })
        }
        console.log(`Tham số diem_den đã thay đổi thành: ${diem_den}`);
        // Cập nhật nội dung tương ứng với tham số mới
    }, [diem_den]);

    const [filteredTours, setFilteredTours] = useState([]);
    const [selectedDayRange, setSelectedDayRange] = useState(null);

    const handleButtonClick = (dayRange) => {
        // Đặt phạm vi ngày đã chọn
        setSelectedDayRange(dayRange);

        // Lọc các chuyến tham quan dựa trên phạm vi ngày đã chọn
        const filteredTours = tourdiemden.filter((tour) => {
            const numberOfDays = calculateNumberOfDays(tour.lich_khoi_hanh, tour.ngay_ket_thuc);

            if (dayRange === '1-3' && numberOfDays >= 1 && numberOfDays <= 3) {
                return true;
            } else if (dayRange === '4-7' && numberOfDays >= 4 && numberOfDays <= 7) {
                return true;
            } else if (dayRange === '8-14' && numberOfDays >= 8 && numberOfDays <= 14) {
                return true;
            } else if (dayRange === '14+' && numberOfDays > 14) {
                return true;
            }

            return false;
        });


        // Đặt các chuyến tham quan đã lọc
        setFilteredTours(filteredTours);
    };


    const [selectedNumberOfPeople, setSelectedNumberOfPeople] = useState(null);
    const filterToursByNumberOfPeople = (tour, selectedNumberOfPeople) => {
        if (!selectedNumberOfPeople) {
            return true; // No number of people selected, so the tour should be included
        }

        if (selectedNumberOfPeople === 1 && tour.soluong === 1) {
            return true;
        } else if (selectedNumberOfPeople === 2 && tour.soluong === 2) {
            return true;
        } else if (selectedNumberOfPeople === '3-5' && tour.soluong >= 3 && tour.soluong <= 5) {
            return true;
        } else if (selectedNumberOfPeople === 999 && tour.soluong > 5) {
            return true;
        }

        return false;
    };

    const handleNumberOfPeopleClick = (numberOfPeople) => {
        // Đặt số lượng người đã chọn
        console.log(numberOfPeople)
        setSelectedNumberOfPeople(numberOfPeople);

        // Lọc các chuyến tham quan dựa trên số lượng người đã chọn
        const filteredTours = tourdiemden.filter((tour) =>
            filterToursByNumberOfPeople(tour, numberOfPeople)
        );

        // Đặt các chuyến tham quan đã lọc
        setFilteredTours(filteredTours);
    };


    //lọc ra những tour có cả ngày và người được trọn
    // const filterToursByDayRangeAndNumberOfPeople = (tour, selectedDayRange, selectedNumberOfPeople) => {
    //     // Add your existing day range and number of people filtering logic here

    //     // Check if there is a selected day range
    //     const hasSelectedDayRange =
    //         selectedDayRange && filterToursByDayRange(tour, selectedDayRange);

    //     // Check if there is a selected number of people
    //     const hasSelectedNumberOfPeople =
    //         selectedNumberOfPeople && filterToursByNumberOfPeople(tour, selectedNumberOfPeople);

    //     // Return true if at least one condition is satisfied
    //     return hasSelectedDayRange || hasSelectedNumberOfPeople;
    // };

    // const [selectedDepartureLocation, setSelectedDepartureLocation] = useState(null);
    // const [tourdiemdi, setTourdiemdi] = useState([]);
    // const [error, setError] = useState<string | null>(null);

    // const handleDepartureLocationChange = (event) => {
    //     const selectedLocation = event.target.value;
    //     setSelectedDepartureLocation(selectedLocation);
    //     setError(null); // Reset error state

    //     // Fetch tours for the selected departure location
    //     if (selectedLocation) {
    //         axios
    //             .get(`http://127.0.0.1:8000/api/getToursByDeparture?diem_di=${selectedLocation}`)
    //             .then((response) => {
    //                 console.log(response.data.tourdiemdi);
    //                 setTourdiemdi(response.data.tourdiemdi);
    //             })
    //             .catch((error) => {
    //                 handleAxiosError(error);
    //             });
    //     } else {
    //         // If no location is selected, show all tours
    //         setTourdiemdi([]); // Clear tourdiemdi
    //     }
    // };

    // const handleAxiosError = (error: AxiosError) => {
    //     console.error("Axios Error:", error);
    //     if (error.response) {
    //         // The request was made and the server responded with a status code
    //         // that falls out of the range of 2xx
    //         console.error("Response data:", error.response.data);
    //         console.error("Response status:", error.response.status);
    //         console.error("Response headers:", error.response.headers);
    //         setError(`Request failed with status code ${error.response.status}`);
    //     } else if (error.request) {
    //         // The request was made but no response was received
    //         console.error("No response received:", error.request);
    //         setError("No response received from the server");
    //     } else {
    //         // Something happened in setting up the request that triggered an Error
    //         console.error("Error setting up the request:", error.message);
    //         setError("Error setting up the request");
    //     }
    // };

    // useEffect(() => {
    //     // Update filtered tours when tourdiemdi changes
    //     if (selectedDepartureLocation) {
    //         setFilteredTours(tourdiemdi);
    //     } else {
    //         setFilteredTours(tourdiemden);
    //     }
    // }, [tourdiemdi, selectedDepartureLocation]);


    const token = localStorage.getItem("token");
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

    // const addToCart = (id) => {
    //     // Your addToCart logic
    //     console.log(`ID các chuyến tour ${id} to the cart`);
    //   };

    const addToCart = (id) => {

        // Kiểm tra xem người dùng đã đăng nhập chưa (có token chưa)
        const token = localStorage.getItem("token");

        if (!token) {
            // Nếu chưa đăng nhập, chuyển hướng đến trang đăng nhập
            // Thay thế '/login' bằng đường dẫn thực tế của trang đăng nhập của bạn
            alert("bạn chưa đăng nhập hãy đăng nhập để thêm chuyến tour vào mục yêu thích !")
            window.location.href = "/signup";
            return;
        }

        // Người dùng đã đăng nhập, tiến hành logic thêm vào giỏ hàng
        console.log(`ID các chuyến tour ${id} to the cart`);
        // Dữ liệu mẫu, điều chỉnh theo yêu cầu của máy chủ của bạn
        const payload = {
            tourId: id,
            userId: getUserIdFromToken(), // Bạn cần triển khai một hàm để lấy ID người dùng từ token
        };
        addToFavorites(tourId)

        axios.post('http://127.0.0.1:8000/api/favorites', { tour_id: tourId }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                // Xử lý khi thành công, ví dụ: hiển thị thông báo thành công
                console.log("Đã thêm vào giỏ hàng thành công:", response.data);
            })
            .catch((error) => {
                // Xử lý khi có lỗi, ví dụ: hiển thị thông báo lỗi
                console.error("Lỗi khi thêm vào giỏ hàng:", error);
            });

    };

    // Bạn cần triển khai một hàm để lấy ID người dùng từ token
    const getUserIdFromToken = () => {
        // Triển khai logic để trích xuất ID người dùng từ token
        // Bạn có thể cần giải mã token JWT hoặc sử dụng ID người dùng được cung cấp bởi hệ thống xác thực của bạn
        // Trả về ID người dùng
        return /* ID người dùng */;
    };

    const addToFavorites = (tourId) => {
        const token = localStorage.getItem('token'); // Thay YOUR_AUTH_TOKEN bằng token xác thực lưu trữ trong ứng dụng của bạn
        axios.post('http://127.0.0.1:8000/api/favorites', { tour_id: tourId }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => {
                // Xử lý kết quả thành công
                console.log(response.data);
            })
            .catch(error => {
                // Xử lý lỗi
                console.error(error);
            });
    };


    return (
        <div>
            <p className='px-3 text-lg font-medium py-1'>Điểm đi</p>
            <div className='px-3 text-center py-1'>
                <select name="destination" className='rounded-md border border-black w-72 h-9'
                    value="" id="">
                    <option value="">Chọn Điểm đi</option>
                    <option value="Hà Nội">Hà Nội</option>
                    <option value="Hồ Chí Minh">Hồ Chí Minh (TP.HCM)</option>
                    <option value="Hải Phòng">Hải Phòng</option>
                    <option value="Đà Nẵng">Đà Nẵng</option>
                    <option value="Cần Thơ">Cần Thơ</option>
                    <option value="An Giang">An Giang</option>
                    <option value="Bà Rịa - Vũng Tàu">Bà Rịa - Vũng Tàu</option>
                    <option value="Bắc Giang">Bắc Giang</option>
                    <option value="Bắc Kạn">Bắc Kạn</option>
                    <option value="Bạc Liêu">Bạc Liêu</option>
                    <option value="Bắc Ninh">Bắc Ninh</option>
                    <option value="Bến Tre">Bến Tre</option>
                    <option value="Bình Định">Bình Định</option>
                    <option value="Bình Dương">Bình Dương</option>
                    <option value="Bình Phước">Bình Phước</option>
                    <option value="Bình Thuận">Bình Thuận</option>
                    <option value="Cà Mau">Cà Mau</option>
                    <option value="Cao Bằng">Cao Bằng</option>
                    <option value="Đắk Lắk">Đắk Lắk</option>
                    <option value="Đắk Nông">Đắk Nông</option>
                    <option value="Điện Biên">Điện Biên</option>
                    <option value="Đồng Nai">Đồng Nai</option>
                    <option value="Đồng Tháp">Đồng Tháp</option>
                    <option value="Gia Lai">Gia Lai</option>
                    <option value="Hà Giang">Hà Giang</option>
                    <option value="Hà Nam">Hà Nam</option>
                    <option value="Hà Tĩnh">Hà Tĩnh</option>
                    <option value="Hải Dương">Hải Dương</option>
                    <option value="Hậu Giang">Hậu Giang</option>
                    <option value="Hòa Bình">Hòa Bình</option>
                    <option value="Hưng Yên">Hưng Yên</option>
                    <option value="Khánh Hòa">Khánh Hòa</option>
                    <option value="Kiên Giang">Kiên Giang</option>
                    <option value="Kon Tum">Kon Tum</option>
                    <option value="Lai Châu">Lai Châu</option>
                    <option value="Lâm Đồng">Lâm Đồng</option>
                    <option value="Lạng Sơn">Lạng Sơn</option>
                    <option value="Lào Cai">Lào Cai</option>
                    <option value="Long An">Long An</option>
                    <option value="Nam Định">Nam Định</option>
                    <option value="Nghệ An">Nghệ An</option>
                    <option value="Ninh Bình">Ninh Bình</option>
                    <option value="Ninh Thuận">Ninh Thuận</option>
                    <option value="Phú Thọ">Phú Thọ</option>
                    <option value="Phú Yên">Phú Yên</option>
                    <option value="Quảng Bình">Quảng Bình</option>
                    <option value="Quảng Nam">Quảng Nam</option>
                    <option value="Quảng Ngãi">Quảng Ngãi</option>
                    <option value="Quảng Ninh">Quảng Ninh</option>
                    <option value="Quảng Trị">Quảng Trị</option>
                    <option value="Sóc Trăng">Sóc Trăng</option>
                    <option value="Sơn La">Sơn La</option>
                </select>
            </div>

            <p className='px-3 text-lg font-medium pt-1'>Số ngày</p>
            <div className='flex gap-2 py-2 container justify-center'>
                <div className=''>
                    <button onClick={() => handleButtonClick('1-3')} className='w-36 bg-white px-4 py-2 rounded-lg border border-black'>1 đến 3 ngày</button>
                </div>
                <div className=''>
                    <button onClick={() => handleButtonClick('4-7')} className='w-36 bg-white px-4 py-2 rounded-lg border border-black'>4 đến 7 ngày</button>
                </div>
            </div>
            <div className='flex gap-2 py-2 container justify-center'>
                <div className=''>
                    <button onClick={() => handleButtonClick('8-14')} className='w-36 bg-white px-4 py-2 rounded-lg border border-black'>8 đến 14 ngày</button>
                </div>
                <div className=''>
                    <button onClick={() => handleButtonClick('14+')} className='w-36 bg-white px-4 py-2 rounded-lg border border-black'>trên 14 ngày</button>
                </div>
            </div>
            <p className='px-3 text-lg font-medium py-1'>Ngày đi</p>
            <div className='text-center'>
                <input className='pl-7 pr-12 w-56 h-10 rounded-lg' type="date" name="date" id="" />
            </div>
            <p className='px-3 text-lg font-medium py-1'>Số người</p>
            <div className='flex gap-2 py-2 container justify-center'>
                <div className=''>
                    <button onClick={() => handleNumberOfPeopleClick(1)} className='w-32 bg-white px-4 py-2 rounded-lg border border-black'>1 người</button>
                </div>
                <div className=''>
                    <button onClick={() => handleNumberOfPeopleClick(2)} className='w-32 bg-white px-4 py-2 rounded-lg border border-black'>2 người</button>
                </div>
            </div>
            <div className='flex gap-2 container justify-center'>
                <div className=''>
                    <button onClick={() => handleNumberOfPeopleClick('3-5')} className='w-32 bg-white px-4 py-2 rounded-lg border border-black'>3 - 5 người</button>
                </div>
                <div className=''>
                    <button onClick={() => handleNumberOfPeopleClick(999)} className='w-32 bg-white px-4 py-2 rounded-lg border border-black'>5+ người</button>
                </div>
            </div>

            <div className='grid grid-cols-3 gap-7 container mx-auto'>
                {(selectedDayRange || selectedNumberOfPeople
                    ? filteredTours
                    : tourdiemden
                ).map((items) => (
                    <div key={items.id}>
                        {/* ... (your existing code) */}
                        <div className='py-4 bg-neutral-100 rounded-lg'>
                            {/* ... (your existing code) */}
                            <img src={items.image_path} alt="" />
                            <p className='font-bold py-2 px-1'>Số lượng: {items.soluong} </p>
                            <p>Điểm đi: {items.diem_di}</p>
                            <p className="px-1">{items.lich_khoi_hanh} - {calculateNumberOfDays(items.lich_khoi_hanh, items.ngay_ket_thuc)} ngày - Giờ đi: 05:20</p>
                            {/* ... (your existing code) */}
                        </div>
                        <button className='bg-blue-500 text-white px-4 py-2 rounded-lg mt-2 buttonHover'>
                            <Link
                                to={``}  // Update the 'to' prop to navigate to the favorite page
                                className='mega-menu-items'
                                onClick={() => addToFavorites(items.id)} // Use items.id directly instead of hoveredItemId
                            // Optionally, you can add additional logic for navigating to the favorite page if needed
                            >
                                Thêm vào sản phẩm yêu thích
                            </Link>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default Test;
function setUserId(userData: any) {
    throw new Error('Function not implemented.');
}

