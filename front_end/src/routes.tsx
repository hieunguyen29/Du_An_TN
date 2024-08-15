import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/homepage";
import TourPage from "./pages/tour";
import News from "./pages/newspage";
import Posts from "./pages/post";
// import TitelPage from "./pages/TitelPage";
import Signup from "./auth/signup";
import SignIn from "./auth/signin";
import DetailPage from "./pages/Client/detail";
import BookTour from "./pages/Client/Book_tour";
import Contact from "./pages/Client/contact";

import LayoutAdmin from "./components/layouts/LayoutADmim";
import { Navigate } from "react-router-dom";
import Dashboard from "./pages/dashboard/dashboard";
import AdminTourAdd from "./pages/Admin/products/tour/add";
import AdminTourEdit from "./pages/Admin/products/tour/edit";
import AdminLoai_tour from "./pages/Admin/products/Danhmuc";
import AdminLoai_tourADD from "./pages/Admin/products/Danhmuc/add";
import AdminLoai_tourEdit from "./pages/Admin/products/Danhmuc/edit";
import AdminDiadiem from "./pages/Admin/products/Diadiem";
import AdminDiadiem_ADD from "./pages/Admin/products/Diadiem/add";
import AdminDiadiem_Edit from "./pages/Admin/products/Diadiem/edit";
import Admin_Lichtrinh from "./pages/Admin/products/Lich_trinh";
import Admin_LichtrinhADD from "./pages/Admin/products/Lich_trinh/add";
import Admin_LichtrinhEDit from "./pages/Admin/products/Lich_trinh/edit";
import ADmin_khachsan from "./pages/Admin/products/Khach_san";
import ADmin_KhachsanADD from "./pages/Admin/products/Khach_san/add";
import ADmin_KhachsanEdit from "./pages/Admin/products/Khach_san/edit";
import ADmin_Phuontien from "./pages/Admin/products/Phuong_tien";
import ADmin_PhuontiengADD from "./pages/Admin/products/Phuong_tien/add";
import ADmin_Phuongtienedit from "./pages/Admin/products/Phuong_tien/edit";
import Admin_Khachhang from "./pages/Admin/user/khach_hang";

import Admin_Acountkhachhang_Roles from "./pages/Admin/user/khach_hang/roles";
import Admin_Account_huongdanvien from "./pages/Admin/user/huong_dan_vien";
import Admin_Account_huongdanvienEdit from "./pages/Admin/user/huong_dan_vien/edit";
import Admin_Account_huongdanvienAdd from "./pages/Admin/user/huong_dan_vien/add";
import AdminImage from "./pages/Admin/products/Img";
import AdmidImageADD from "./pages/Admin/products/Img/add";
import Admin_ImageEdit from "./pages/Admin/products/Img/edit";
import Admin_TourImg from "./pages/Admin/products/Tour_img";
import Admin_TourImgADD from "./pages/Admin/products/Tour_img/add";
import Admin_TourImgEDit from "./pages/Admin/products/Tour_img/edit";
import ADmin_Hoadon from "./pages/Admin/products/Hoa_don";
import ADmin_DatTour from "./pages/Admin/products/Dat_tour";
import AdminProduct from "./pages/Admin/products/tour";
import QLuser from "./pages/qluser"
import { Route, Routes } from "react-router-dom";
import Admin_Acountkhachhang_Permisssions from "./pages/Admin/user/khach_hang/permissions";
import LayoutWebsite from "./components/layouts/LayoutWebsite";
import ChatComponent from "./pages/Admin/products/Message/ChatBox";
import { ContextProvider } from "./context/ContextProvider";
import AdminGiam_Gia from "./pages/Admin/products/GiamGia";
import AdminGiam_GiaADD from "./pages/Admin/products/GiamGia/add";
import AdminGiam_GiaEdit from "./pages/Admin/products/GiamGia/edit";
import AdminDanhGia from "./pages/Admin/products/DanhGia/index";
import Admin_TourDiscount from "./pages/Admin/products/Tour_GiamGia";
import Admin_TourDiscountADD from "./pages/Admin/products/Tour_GiamGia/add";
import Admin_TourDiscountEDIT from "./pages/Admin/products/Tour_GiamGia/edit";
import ADmin_Qlytourchuathanhtoan from "./pages/Admin/products/Dat_tour/index2";
import ADmin_Qlytourdathanhtoan from "./pages/Admin/products/Dat_tour/index3";
import Info_tour_bocking from "./pages/Client/Info_tour_bocking";
import Giohanguser from "./pages/giohanguser";
import Giohanguser1 from "./pages/giohanguser1";
import Giohanguser2 from "./pages/giohanguser2";
import Dmkuser from "./pages/changeMk";
import Test from "./pages/text";
import Favorite from "./pages/favorite";
import Admin_Danhmuc_baiviet from "./pages/Admin/Post/danh_muc";
import Admin_DanhmucADD from "./pages/Admin/Post/danh_muc/add";

import Admin_baiviet from "./pages/Admin/Post/bai_viet";
import ADmin_postADD from "./pages/Admin/Post/bai_viet/add";

import Admin_DanhmucEdit from "./pages/Admin/Post/danh_muc/edit";
import EDitbaivien from "./pages/Admin/Post/bai_viet/edit";
import Banner_logo from "./pages/Admin/products/Banner_logo";
import Add_Banner from "./pages/Admin/products/Banner_logo/add";
import Edit_banner from "./pages/Admin/products/Banner_logo/edit";
export const router = createBrowserRouter([

  {
    path: "/",
    element: <LayoutWebsite />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "news",
        element: <News />,
      },
      {
        path: "post/:idpost",
        element: <Posts />,
      },
      {
        path: "tour",
        element: <TourPage />,
    },
     
     
      {
        path: "favorite",
        element: <Favorite />,
      },
      {
        path: "test",
        element: <Test />,
      },
      {
        path: "tour/:diem_den",
        element: <TourPage />,
      },
      {
        path: "signin",
        element: <SignIn />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "tours/:idTour",
        element: <DetailPage />,
      },
      {
        path: "booktour/:idTour",
        element: <BookTour />,
      },
      
      {
        path: "booktour",
        element: <BookTour />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "bookingtour/:id",
        element: <Info_tour_bocking />,
      },
      {
        path: "profile",
        element: <QLuser />,
      },
      {
        path: "profile",
        element: <QLuser />
      },
      {
        path: "/giohanguser",
        element: <Giohanguser />
      },
      {
        path: "/giohanguser1",
        element: <Giohanguser1 />
      },
      {
        path: "/giohanguser2",
        element: <Giohanguser2 />
      },
      {
        path: "/changeMk",
        element: <Dmkuser />
      },
    ],
  },

  {
    path: "/admin",
    element: localStorage.getItem("role") === 'admin' ||
      localStorage.getItem("role") === 'nhan_vien' ||
      localStorage.getItem("role") === 'customer_feedback' ||
      localStorage.getItem("role") === 'huong_dan_vien' ? <LayoutAdmin /> : <Navigate to="/" />,

    children: [
      { index: true, element: <Navigate to="dashboard" /> },
      {
        path: "dashboard",
        element: localStorage.getItem("role") === 'admin' ? <Dashboard />:<AdminLoai_tour />,
      },
      {
        path: "tour",
        element: <AdminProduct />,
      },
      {
        path: "tour/add",
        element: <AdminTourAdd />,
      },
      {
        path: "tour/edit/:idtour",
        element: <AdminTourEdit />,
      },
      {
        path: "tour/loai_tour",
        element: <AdminLoai_tour />,
      },
      {
        path: "tour/loai_tour/add",
        element: <AdminLoai_tourADD />,
      },
      {
        path: "tour/loai_tour/edit/:idLoaiTour",
        element: <AdminLoai_tourEdit />,
      },
      {
        path: "tour/diadiem/",
        element: <AdminDiadiem />,
      },
      {
        path: "tour/diadiem/add",
        element: <AdminDiadiem_ADD />,
      },
      {
        path: "tour/diadiem/edit/:iddiadiem",
        element: <AdminDiadiem_Edit />,
      },
      {
        path: "tour/lich_trinh",
        element: <Admin_Lichtrinh />,
      },
      {
        path: "tour/lich_trinh/add",
        element: <Admin_LichtrinhADD />,
      },
      {
        path: "tour/lich_trinh/edit/:idlt",
        element: <Admin_LichtrinhEDit />,
      },
      // {
      //   path: "tour/loai_khach_san",
      //   element: <ADmin_khachsan />,
      // },
      // {
      //   path: "tour/loai_khach_san/add",
      //   element: <ADmin_KhachsanADD />,
      // },
      // {
      //   path: "tour/loai_khach_san/edit/:idkhachsan",
      //   element: <ADmin_KhachsanEdit />,
      // },
      // {
      //   path: "tour/loai_phuong_tien",
      //   element: <ADmin_Phuontien />,
      // },
      // {
      //   path: "tour/loai_phuong_tien/add",
      //   element: <ADmin_PhuontiengADD />,
      // },
      // {
      //   path: "tour/loai_phuong_tien/edit/:idPhuongTien",
      //   element: <ADmin_Phuongtienedit />,
      // },

      {
        path: "banner_logo",
        element: <Banner_logo/>
      },
      {
        path: "add_banner",
        element: <Add_Banner/>
      },
      {
        path: "edit_banner",
        element: <Edit_banner/>
      },
      {
        path: "customer_account",
        element: <Admin_Khachhang />,
      },
      {
        path: 'customer_feedback',
        element: <ChatComponent />
      },
      
      {
        path: "customer_account/edit/:idrole",
        element: <Admin_Acountkhachhang_Roles />,
      },
      {
        path: "customer_account/permissions/:idpermission",
        element: <Admin_Acountkhachhang_Permisssions />,
      },
      {
        path: "account_huongdanvien",
        element: <Admin_Account_huongdanvien />,
      },
      {
        path: "account_huongdanvien/add",
        element: <Admin_Account_huongdanvienAdd />,
      },
      {
        path: "account_huongdanvien/edit/:idhdv",
        element: <Admin_Account_huongdanvienEdit />,
      },
      {
        path: "tour/image_tour",
        element: <Admin_TourImg />,
      },
      {
        path: "tour/image_tour/add",
        element: <Admin_TourImgADD />,
      },
      {
        path: "tour/image_tour/edit/:idtourimage",
        element: <Admin_TourImgEDit />,
      },

      // images
      {
        path: "tour/image/",
        element: <AdminImage />,
      },
      {
        path: "tour/image/add",
        element: <AdmidImageADD />,
      },
      {
        path: "tour/image/edit/:idimage",
        element: <Admin_ImageEdit />,
      },
      {
        path: "tour/hoa_don",
        element: <ADmin_Hoadon />,
      },
      {
        path: "tour/dat_tour",
        element: <ADmin_DatTour />,
      },
      // giảm giá 
      {
        path: "tour/discount/",
        element: <AdminGiam_Gia />,
      },
      {
        path: "tour/discount/add",
        element: <AdminGiam_GiaADD />,
      },
      {
        path: "tour/discount/edit/:iddiscount",
        element: <AdminGiam_GiaEdit />,
      },
      // tour_discount
      {
        path: "tour/tour_discount/",
        element: <Admin_TourDiscount />,
      },
      {
        path: "tour/tour_discount/add",
        element: <Admin_TourDiscountADD />,
      },
      {
        path: "tour/tour_discount/edit/:idtourdiscount",
        element: <Admin_TourDiscountEDIT />,
      },
      {
        path: "tour/tour_chuathanhtoan",
        element: <ADmin_Qlytourchuathanhtoan />,
      },
      {
        path: "tour/tour_dathanhtoan",
        element: <ADmin_Qlytourdathanhtoan />,
      },
      {
        path: "post/danhmuc_post",
        element: <Admin_Danhmuc_baiviet />,
      },
      {
        path: "post/add_danhmuc",
        element: <Admin_DanhmucADD />,
      },
      {
        path: "post/edit_danhmuc/:iddm",
        element: <Admin_DanhmucEdit />,
      },

      {
        path: "post/bai_viet",
        element: <Admin_baiviet />,
      },
      {
        path: "post/add_baiviet",
        element: <ADmin_postADD />,
      },
      
      {
        path: "post/edit_baiviet/:idbv",
        element: <EDitbaivien />,
      },
      // đánh giá
      {
        path: "evaluate",
        element: <AdminDanhGia />,
      },
    ],
  },
]);
