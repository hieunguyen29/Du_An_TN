import React from 'react';
import '../promo.css';
import dl from '../img/DL.jpg';
import qn from '../img/qn.jpg';
import dn from '../img/dn.jpg';
const PromotionPage = () => {
  const promotions = [
    {
      id: 1,
      title: 'Đà Nẵng',
      description: 'Thành phố đáng sống nhất Việt Nam',
      imageUrl: dn,
    },
    {
      id: 2,
      title: 'Đà lạt',
      description: 'Khu vườn mộng mơ và quyến rủ',
      imageUrl: dl,
    },
    {
      id: 3,
      title: 'Quy Nhơn',
      description: 'Những bãi biển đẹp thơ mộng',
      imageUrl:qn,
    },
  ];

  return (
    <div className="promotion-page ">
      
      <h2 style={{color:'red',fontWeight:'600'}} className="promotion-page__title">Khuyến Mãi Fpoly</h2>
      <p className="promotion-page__description">
        Đón nhận những ưu đãi hấp dẫn từ chúng tôi!
      </p>
      <div className="promotion-list">
        {promotions.map((promotion) => (
          <div
            key={promotion.id}
            className="promotion-item"
            style={{ backgroundImage: `url(${promotion.imageUrl})` }}
          >
            <div className="promotion-item__overlay">
              <h3 className="promotion-item__title">{promotion.title}</h3>
              <p className="promotion-item__description">
                {promotion.description}
              </p>
              <a href="#" className="promotion-item__button">Xem chi tiết</a>
            </div>
          </div>
          
        ))}
      </div>
      <div className="promotion-block">
  <h3>Khuyến mãi PolyTour:</h3>
  <ul>
    <li>PolyTour & Sacombank: Quẹt thẻ liền tay - Giảm ngay 1 triệu đồng</li>
    <li>Khuyến mại Hè 2023 “Hè vui như hội – Gấp bội yêu thương”: PolyTour ưu đãi “Thanh toán thẻ JCB – Tặng vali cao cấp”</li>
    <li>PolyTour triển khai chương trình ưu đãi cùng VNPAY “Trúng deal to – Du lịch chẳng lo”</li>
    <li>PolyTour & JCB tung ưu đãi “Thanh toán liền tay - Nhận ngay deal xịn”</li>
    <li>Deal hot tour Hè tại PolyTour cùng VPBank x Mastercard với ưu đãi lên tới 500.000 đồng</li>
    <li>PolyTour & Sacombank tung ưu đãi “Tiền về đầy ví - Du hí thả ga”</li>
    <li>Du lịch thật dễ dàng và tiết kiệm cùng PolyTour - BIDV</li>
    <li>Cùng PolyTour “Thanh toán tiện lợi – Du lịch giá hời” nhận ngay ưu đãi hấp dẫn qua App Mb bank</li>
  </ul>
</div>
      <footer style={{marginTop:'25px'}} className="   text-center bg-gray-100">
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
    
  );
};

export default PromotionPage;