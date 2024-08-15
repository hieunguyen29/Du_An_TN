import React from 'react'
import qrVN from '../img/qrVN.jpg'

const Footer = () => {
    return (
        <div className='bg-gray-50'>
            <div className='container mx-auto grid grid-cols-4 py-4 p-4'>
                <div className='p-4'>
                    <p className='py-3'><a className=' text-xl font-bold text-sky-900 hover:text-blue-600' href="">Du lịch trong nước</a></p>
                    <div className='container mx-auto flex gap-10'>
                        <div className='text-sm text-left text-cyan-800'>
                            <p className='py-2'>Hà Nội</p>
                            <p>Hạ Long</p>
                            <p className='py-2'>Huế</p>
                            <p>Quảng Bình</p>
                            <p className='py-2'>Đà Nẵng</p>
                            <p>Quảng Nam</p>
                            <p className='py-2'>Nha Trang</p>
                            <p>Đà Lạt</p>
                        </div>
                        <div className='text-sm text-cyan-800'>
                            <p className='py-2'>Hà Nội</p>
                            <p>Hạ Long</p>
                            <p className='py-2'>Huế</p>
                            <p>Quảng Bình</p>
                            <p className='py-2'>Đà Nẵng</p>
                            <p>Quảng Nam</p>
                            <p className='py-2'>Nha Trang</p>
                            <p>Đà Lạt</p>
                        </div>
                        <div></div>
                    </div>
                </div>
                <div className='p-4'>
                    <p className='py-3'><a className=' text-xl font-bold text-sky-900 hover:text-blue-600' href="">Du lịch nước ngoài</a></p>
                    <div className='container mx-auto flex gap-10'>
                        <div className='text-sm text-left text-cyan-800'>
                            <p className='py-2'>Hà Nội</p>
                            <p>Hạ Long</p>
                            <p className='py-2'>Huế</p>
                            <p>Quảng Bình</p>
                            <p className='py-2'>Đà Nẵng</p>
                            <p>Quảng Nam</p>
                            <p className='py-2'>Nha Trang</p>
                            <p>Đà Lạt</p>
                        </div>
                        <div className='text-sm text-cyan-800'>
                            <p className='py-2'>Hà Nội</p>
                            <p>Hạ Long</p>
                            <p className='py-2'>Huế</p>
                            <p>Quảng Bình</p>
                            <p className='py-2'>Đà Nẵng</p>
                            <p>Quảng Nam</p>
                            <p className='py-2'>Nha Trang</p>
                            <p>Đà Lạt</p>
                        </div>
                        <div></div>
                    </div>
                </div>
                <div className='p-4'>
                    <p className='py-3'><a className='text-xl font-bold text-sky-900 hover:text-blue-600' href="">Dòng tour</a></p>
                    <div className='container mx-auto text-sm text-cyan-800 text-left'>
                        <p className='py-2'>Cao cấp</p>
                        <p>Tiêu chuẩn</p>
                        <p className='py-2'>Tiết kiệm</p>
                        <p>Giá tốt</p>
                    </div>
                </div>
                <div className='p-4'>
                    <p className='py-3'><a href="" className='text-xl font-bold text-sky-900 hover:text-blue-600'>Ứng dụng di động</a></p>
                    <div className='grid grid-cols-2 mx-auto py-1'>
                        <img src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/playstore.png" className='w-32' alt="" />
                        <img src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/appstore.png" className='w-32' alt="" />
                    </div>
                    <div className='grid grid-cols-2 mx-auto py-3'>
                        <p>Androi</p>
                        <p>IOS</p>
                    </div>
                    <div className='grid grid-cols-2 mx-auto'>
                        <img src="https://travel.com.vn/Content/Theme/images/image42.webp" alt="qrVn" />
                        <img src="https://travel.com.vn/Content/Theme/images/image42.webp" alt="" />
                    </div>
                </div>
            </div>
            <div className='container mx-auto grid grid-cols-4 py-4 px-7 p-4'>
                <div>
                    <p className='py-3'><a href="" className='text-xl font-bold text-sky-900 hover:text-blue-600'>Liên Hệ</a></p>
                    <div>
                        <p className='text-left text-sm text-cyan-800'>190 Pasteur, Phường Võ Thị Sáu, Quận 3, <br /> TPHCM</p>
                        <p className='text-cyan-800 text-sm text-left py-3'>(+84 28) 3822 8898</p>
                        <p className='text-cyan-800 text-sm text-left'>(+84 28) 3829 9142</p>
                        <p className='text-cyan-800 text-sm text-left py-3'>info@poly.com</p>
                        <p className='text-xl font-bold text-sky-900 hover:text-blue-600'>Mạng xã hội</p>
                        <div className='flex gap-4 mt-3'>
                            <i className="fa-brands fa-facebook"></i>
                            <i className="fa-brands fa-instagram"></i>
                            <i className="fa-brands fa-viber"></i>
                            <i className="fa-regular fa-envelope"></i>
                            <i className="fa-brands fa-youtube"></i>
                        </div>
                        <button className='flex gap-2 px-6 py-3 bg-red-500 rounded-lg mt-5'>
                            <i className="fa-solid fa-phone mt-2"></i>
                            <p className='text-xl font-bold text-white'>1900 1839</p>
                        </button>
                        <p className='text-cyan-800 text-sm text-left py-3'>Từ 8:00 - 22:00 hàng ngày</p>
                    </div>
                </div>
                <div className='px-[5px]'>
                    <p className='py-3 '><a href="" className='text-xl font-bold text-sky-900 hover:text-blue-600'>Thông tin</a></p>
                    <div>
                        <p className='text-cyan-800 text-sm text-left'>Tạp chí du lịch</p>
                        <p className='text-cyan-800 text-sm text-left py-3'>cẩm nang du lịch</p>
                        <p className='text-cyan-800 text-sm text-left'>Tin tức</p>
                        <p className='text-cyan-800 text-sm text-left py-3'>Sitemap</p>
                        <p className='text-cyan-800 text-sm text-left'>FAQs</p>
                        <p className='text-cyan-800 text-sm text-left py-3'>Chính sách riêng tư</p>
                        <p className='text-cyan-800 text-sm text-left'>Thỏa thuận sử dụng</p>
                    </div>
                </div>
                <div className='px-[5px]'>
                    <p className='py-3'><a href="" className='text-xl font-bold text-sky-900 hover:text-blue-600'>Newsletter</a></p>
                    <div className='border border-blue-700 rounded-lg flex gap-5'>
                        <input type="text" placeholder='Email của quý khách' className='px-2 text-cyan-800 py-2 w-72 rounded-tl-lg rounded-bl-lg border border-r-blue-600' name="" id="" />
                        <svg xmlns="http://www.w3.org/2000/svg" className='mt-1' height="2em" viewBox="0 0 512 512"><path d="M64 112c-8.8 0-16 7.2-16 16v22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1V128c0-8.8-7.2-16-16-16H64zM48 212.2V384c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V212.2L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64H448c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z" /></svg>
                    </div>
                    <p className='py-3'><a href="" className='text-xl font-bold text-sky-900 hover:text-blue-600'>Tìm kiếm thông tin</a></p>
                    <div className='border border-blue-700 rounded-lg flex gap-5'>
                        <input type="text" placeholder='Tour du lịch, điểm đến...' className='px-2 text-cyan-800 py-2 w-72 rounded-tl-lg rounded-bl-lg border border-r-blue-600' name="" id="" />
                        <svg xmlns="http://www.w3.org/2000/svg" className='mt-2' height="1.5em" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" /></svg>
                    </div>
                    <div className='flex gap-4'>
                        <div>
                            <p className='py-3 '><a href="" className=' font-bold text-sky-900'>Chứng nhận</a></p>
                            <img src="https://travel.com.vn/Content/Theme/images/image39.webp" alt="" />
                            <img src="https://travel.com.vn/Content/Theme/images/image40.webp" alt="" />
                        </div>
                        <div>
                            <div>
                                <p className='py-3 '><a href="" className='text-[15px] font-bold text-sky-900'>Chấp nhận thanh toán</a></p>
                                <div>
                                    <div className='flex gap-3'>
                                        <img src="https://travel.com.vn/Content/Theme/images/image41.webp" alt="" />
                                        <img src="https://travel.com.vn/Content/Theme/images/vnpay_qr1_1.webp" alt="" />
                                        <img src="https://travel.com.vn/Content/Theme/images/vs.webp" alt="" />
                                    </div>
                                    <div className='flex gap-3 py-5'>
                                        <img src="https://travel.com.vn/Content/Theme/images/mtc.webp" alt="" />
                                        <img src="https://travel.com.vn/Content/Theme/images/jcb.webp" alt="" />
                                        <img src="https://travel.com.vn/Content/Theme/images/vrvs.webp" alt="" />
                                    </div>
                                    <div className='flex gap-10 py-5'>
                                        <img src="https://travel.com.vn/Content/Theme/images/shopeepay.webp" alt="" />
                                        <img src="" alt="" />
                                        <img src="https://travel.com.vn/Content/Theme/images/msb.webp" alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container mx-auto p-4 pt-8'>
                <p className='text-cyan-800 text-sm text-left'>Bản quyền của Polytour ® 2016. Bảo lưu mọi quyền.</p>
                <p className='text-cyan-800 text-sm text-left'>Ghi rõ nguồn "www.poly.com.vn" ® khi sử dụng lại thông tin từ website này.</p>
                <p className='text-cyan-800 text-sm text-left'>Số giấy phép kinh doanh lữ hành Quốc tế: 79-234/2014/TCDL-GP LHQT</p>
            </div>
        </div>
    )
}

export default Footer