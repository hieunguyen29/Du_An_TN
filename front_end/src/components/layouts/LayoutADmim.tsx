import { Button, Layout, Menu, theme } from "antd";
import { useState } from "react";
import {
    AiOutlineMenuFold,
    AiOutlineMenuUnfold,
    AiOutlineUser,
    AiOutlineVideoCamera,
    AiFillFund,
    AiOutlineMenu
} from "react-icons/ai";
import {FaLuggageCart} from "react-icons/fa"
import { Link, Outlet } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const LayoutAdmin = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <div>
           <div className="bg-white border-b-2 border-black">
            <img src="https://img.fcbayern.com/image/upload/t_cms-2x1/f_auto/w_1600,c_fill/q_auto/v1694938726/cms/public/images/fcbayern-com/homepage/Saison-23-24/Gegner/Manchester%20United/160812-manchester-united-logo-ima-169.jpg" height={50} width={50} alt="" />
            </div>
                 <Layout className="h-screen">
       
       <Sider trigger={null} collapsible collapsed={collapsed}>
           <div className="demo-logo-vertical" />
         
            <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
        >
            <Menu.Item key="1" icon={<AiFillFund />}>
                <Link to="/admin/dashboard">Thống kê</Link>
            </Menu.Item>
            <Menu.SubMenu key="2" icon={<FaLuggageCart />}  title="Tour du lịch">
                <Menu.Item key="2-1">
                    <Link  to="/admin/tour">Tất cả các tour</Link>
                </Menu.Item>
                <Menu.Item    key="2-2">
                    <Link to="/admin/tour/loai_tour">Danh mục tour</Link>
                </Menu.Item>
                <Menu.Item key="2-3">
                    <Link to="/admin/tour/dia_diem">Địa điểm tour</Link>
                </Menu.Item>
                <Menu.Item key="2-4">
                    <Link to="/admin/tour/lich_trinh">Lịch trình tour</Link>
                </Menu.Item>
                <Menu.Item key="2-5">
                    <Link to="/admin/tour/loai_khach_san">Khách sạn tour</Link>
                </Menu.Item>
                <Menu.Item key="2-6">
                    <Link to="/admin/tour/loai_phuong_tien">Phương tiện tour</Link>
                </Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu key="3" icon={<AiOutlineUser />}  title="Tài khoản">
                <Menu.Item key="3-2">
                    <Link to="/admin/customer_account">Tài khoản khách</Link>
                </Menu.Item>
                <Menu.Item key="3-3">
                    <Link to="/admin/account_huongdanvien">Hướng dẫn viên</Link>
                </Menu.Item>
           
            </Menu.SubMenu>
     
        </Menu>
      
       </Sider>
       <Layout>
           <Header style={{ padding: 0, background: colorBgContainer }}>
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
        
           </Header>
           <Content
           
               style={{
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
