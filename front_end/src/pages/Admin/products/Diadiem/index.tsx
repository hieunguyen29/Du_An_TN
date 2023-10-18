type Props = {};

// import { IProduct } from "@/interfaces/product";
import { Table, Button, Skeleton, Popconfirm, Alert } from "antd";
import { Link } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";


const AdminDiadiem = (props: Props) => {

   
   
    
 
    
    const columns = [
        {
            title: "ID địa điểm",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Tên địa điểm",
            dataIndex:"ten_dia_diem",
            key: "ten_dia_diem",
        },
          {
            title: "Mô tả",
            dataIndex:"mo_ta",
            key: "mo_ta",
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
                                okText="Yes" className="text-black"
                                cancelText="No"
                            >
                                <Button type="primary" danger>
                                    Xóa
                                </Button>
                            </Popconfirm>

                            <Button type="primary" danger>
                                <Link to={`/admin/tour/dia_diem/edit/${id}`}>Sửa</Link>
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
                <h2 className="font-bold text-2xl">Quản lý địa điểm</h2>
                <Button type="primary" danger>
                    <Link to="/admin/tour/dia_diem/add" className="flex items-center space-x-2">
                        <AiOutlinePlus />
                      Tạo mới địa điểm
                    </Link>
                </Button>
            </header>
         
        </div>
    );
};

export default AdminDiadiem;
