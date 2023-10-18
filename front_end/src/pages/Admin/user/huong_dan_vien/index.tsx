type Props = {};

// import { IProduct } from "@/interfaces/product";
import { Table, Button, Skeleton, Popconfirm, Alert } from "antd";
import { Link } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { ITour } from "../../../../interface/tour";


const Admin_Account_huongdanvien = (props: Props) => {

   
    

    
    const columns = [
        {
            title: "Họ tên",
            dataIndex: "ten_hd",
            key: "ten_hd",
        },
        {
            title: "Ảnh đại diện",
            dataIndex:"image",
            key: "image",
        },
        {
            title: "Địa chỉ",
            dataIndex:"dia_chi",
            key: "dia_chi",
        },
        {
            title: "Email",
            dataIndex:"email",
            key: "email",
        },
        {
            title: "Số điện thoại",
            dataIndex:"sdt",
            key: "sdt",
        },

        {
            title: "Action",
            render: ({ key: id }: any) => {
                return (
                    <>
                        <div className="flex space-x-2">
                            <Popconfirm
                                title="Bạn có muốn xóa?"
                                onConfirm={() => confirm(id)}
                                okText="Yes"
                                cancelText="No"
                            >
                                <Button type="primary" danger>
                                    Xóa
                                </Button>
                            </Popconfirm>

                            <Button type="primary" danger>
                                <Link to={`/admin/tour/edit/${id}`}>Sửa</Link>
                            </Button>
                        </div>
                    </>
                );
            },
        },
    ];

    return (
        <div>
            <header className="mb-4 flex justify-between items-center">
                <h2 className="font-bold text-2xl">Quản lý hướng dẫn viên</h2>
               
            </header>
          
        </div>
    );
};

export default Admin_Account_huongdanvien;
