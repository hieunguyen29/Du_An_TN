import { Button, Layout, Menu, theme } from "antd";
import { Badge, Popover, List } from 'antd';
import { useEffect, useState } from "react";
import { IoNotificationsOutline } from "react-icons/io5";


import {
  AiOutlineMenuFold,
  AiOutlineMenuUnfold,
  AiOutlineUser,
  AiOutlineVideoCamera,
  AiFillFund,
  AiOutlineMenu,
  AiFillSchedule,
} from "react-icons/ai";
import {
  MdCategory,
  MdDiscount,
  MdFeedback,
  MdPermMedia,
} from "react-icons/md";
import { TfiWrite } from "react-icons/tfi";

import {
  FaBook,
  FaCar,
  FaHotel,
  FaLuggageCart,
  FaNewspaper,
  FaPowerOff,
  FaShoppingCart,
  FaSuitcase,
  FaUser,
  FaUserCheck,
  FaUserTag,
  FaWindowClose,
} from "react-icons/fa";
import { Link, Outlet } from "react-router-dom";
import axios from "axios";
import { useGetnotificationQuery } from "../../api/notification";
import { width } from "@fortawesome/free-brands-svg-icons/fa42Group";


const { Header, Sider, Content } = Layout;

const LayoutAdmin = () => {
  const [visible, setVisible] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const token = localStorage.getItem("token");
  const [usersId, setUserId] = useState("");
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
  }, [token]);
  // console.log(usersId);
  const handleLogout = async (e) => {
    e.preventDefault();
    const confirmLogout = window.confirm("Bạn chắc chắn muốn đăng xuất?");

    if (!confirmLogout) {
      return;
    }
    try {
      const token = localStorage.getItem("token");
      await axios.delete("http://127.0.0.1:8000/api/logout", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      localStorage.removeItem("token");
      localStorage.removeItem("id");
      localStorage.removeItem("role");
      localStorage.removeItem('avatar')
      // Display a success message
      alert("Đăng xuất thành công!");
      alert("Bạn không có quyền truy cập");
      window.location.replace("http://localhost:5173");

    } catch (error) {
      console.error("Lỗi khi đăng xuất:", error);
    }
  };

  const { data: notificationData, refetch } = useGetnotificationQuery();
  if (!notificationData) {
    // Xử lý trường hợp khi notificationData không tồn tại
    return null;
  }
  const unreadCount = notificationData.count || 0;
  console.log(notificationData);
  const handleNotificationClick = async () => {
    try {
      const response = await axios.put('http://127.0.0.1:8000/api/admin/notification/updateStatusNotification');
      refetch()
      // Sau khi thành công, bạn có thể thực hiện các xử lý bổ sung (ví dụ: cập nhật trạng thái thông báo trong giao diện).
      console.log('Cập nhật trạng thái thành công:', response.data);

      // Điều này có thể được sử dụng để cập nhật trạng thái thông báo trong giao diện của bạn, ví dụ:
      // setCập nhật trạng thái thông báo ở đây
    } catch (error) {
      console.error('Lỗi khi cập nhật trạng thái thông báo:', error);
    }
  };
  const formatTimeAgo = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    const currentTime = new Date();
    const timeDifference = currentTime - dateTime;

    if (timeDifference < 60000) { // Less than 1 minute
      return 'vài giây trước';
    } else if (timeDifference < 3600000) { // Less than 1 hour
      const minutesAgo = Math.floor(timeDifference / 60000);
      return `${minutesAgo} phút trước`;
    } else if (timeDifference < 86400000) { // Less than 1 day
      const hoursAgo = Math.floor(timeDifference / 3600000);
      return `${hoursAgo} giờ trước`;
    } else {
      const daysAgo = Math.floor(timeDifference / 86400000);
      return `${daysAgo} ngày trước`;
    }
  };

  const reversedNotifications = [...notificationData.notification].reverse();
  const content = (
    <div className="notification-list-container" style={{ width: '250px', maxHeight: '380px', overflowY: 'auto' }}>
      <List
        itemLayout="horizontal"
        dataSource={reversedNotifications}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              title={`${item.body} : ${item.tours.ten_tour}`}
              description={formatTimeAgo(item.ngay_gio)}
            />
          </List.Item>
        )}
      />
    </div>
  );

  return (
    <div>
      <Layout className="max-h-fit ">
        <Sider width={250} trigger={null} collapsible collapsed={collapsed}>
          <div className=" demo-logo-vertical" />
          <div className="  flex">
            <p className="ml-11 text-white font-medium text-lg font-sans">
              Poly Tour
            </p>
          </div>
          <Menu className="h-screen" theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item className="ml-[-10px]" key="1" icon={<AiFillFund />}>
              <Link to="/admin/dashboard">Thống kê</Link>
            </Menu.Item>
            <Menu.SubMenu key="2" icon={<FaLuggageCart />} title="Tour du lịch">
              <Menu.Item icon={<FaSuitcase />} key="2-1">
                <Link to="/admin/tour">Tất cả các tour</Link>
              </Menu.Item>
              <Menu.Item icon={<MdCategory />} key="2-2">
                <Link to="/admin/tour/loai_tour">Danh mục tour</Link>
              </Menu.Item>
              {/* <Menu.Item key="2-a3">
                              <Link to="/admin/tour/diadiem">Địa điểm tour</Link>
                          </Menu.Item> */}
              <Menu.Item icon={<AiFillSchedule />} key="2-4">
                <Link to="/admin/tour/lich_trinh">Lịch trình tour</Link>
              </Menu.Item>
             
              <Menu.Item icon={<MdFeedback />} key="2-8">
                <Link to="/admin/evaluate">Đánh Giá</Link>
              </Menu.Item>

              <Menu.SubMenu className="ml-[-30px]"
                icon={<MdDiscount />}
                key="2-9"
                title="Mã giảm giá"
              >
                <Menu.Item key="2-9-1">
                  <Link to="/admin/tour/discount/">Danh sách mã </Link>
                </Menu.Item>
               
              </Menu.SubMenu>

              <Menu.SubMenu className="ml-[-30px]"
                icon={<FaShoppingCart />}
                key="3"
                title={
                  <Link to="/admin/tour/dat_tour">
                    <span>Quản lý tour</span>
                  </Link>
                }
              >
                <Menu.Item className="ml-[-5px]" icon={<FaWindowClose />} key="3-1">
                  <Link to="/admin/tour/tour_chuathanhtoan">
                    Tour chưa thanh toán
                  </Link>
                </Menu.Item>
                <Menu.Item icon={<FaUserCheck />} key="3-2">
                  <Link to="/admin/tour/tour_dathanhtoan">
                    Tour đã thanh toán
                  </Link>
                </Menu.Item>
              </Menu.SubMenu>
            </Menu.SubMenu>
            <Menu.SubMenu key="4" icon={<AiOutlineUser />} title="Tài khoản">
              <Menu.Item icon={<FaUser />} key="4-1">
                <Link to="/admin/customer_account">Tài khoản </Link>
              </Menu.Item>
            
            </Menu.SubMenu>
            <Menu.SubMenu key="5" icon={<MdPermMedia />} title="Truyền thông ">
              <Menu.SubMenu icon={<FaNewspaper />} key="5-1" title="Bài viết">
                <Menu.Item icon={<TfiWrite />} key="5-1-1">
                  <Link to="/admin/post/danhmuc_post">Danh mục bài viết</Link>
                </Menu.Item>
                <Menu.Item icon={<FaBook />} key="5-1-2">
                  <Link to="/admin/post/bai_viet">Danh sách bài viết</Link>
                </Menu.Item>
              </Menu.SubMenu>
            </Menu.SubMenu>
            <Menu.Item>
                <Link to={'/admin/banner_logo'}>Quản lý banner</Link>
              </Menu.Item>
            <Menu.Item icon={<FaPowerOff />} key="5-1-2">
              <button onClick={handleLogout}>Đăng xuất</button>
            </Menu.Item>
          </Menu>
        </Sider>

        <Layout>
          <Header
            className="flex justify-between "
            style={{ padding: 0, background: colorBgContainer }}
          >
            <Button
              type="text"
              icon={collapsed ? <AiOutlineMenu /> : <AiOutlineMenu />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />


            {usersId && (
              <div className="flex gap-3 items-center">
                {/* Hiển thị thông tin người dùng */}
                <Popover

                  content={content}
                  title="Thông báo"
                  trigger="click"
                  visible={visible}
                  onVisibleChange={setVisible}
                >
                  <Badge count={unreadCount} onClick={handleNotificationClick}>
                    <div className="text-[25px]"><IoNotificationsOutline /></div>
                  </Badge>
                </Popover>




                <div className="relative">
                  <img
                    className="w-[30px] h-[30px] rounded-full cursor-pointer"
                    src={`http://localhost:8000/storage/${usersId.image}`}
                    alt="img"
                  />
                </div>
                <p className="mr-5 font-medium">{usersId.name}</p>

              </div>
            )}

          </Header>
          <Content
            style={{
              maxHeight: 2000,
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default LayoutAdmin;