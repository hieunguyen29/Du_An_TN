type Props = {};

// import { IProduct } from "@/interfaces/product";
import { Table, Button, Skeleton, Popconfirm, Alert } from "antd";
import { Link } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";


const Admin_Lichtrinh = (props: Props) => {

   
   
    
 
    
    const columns = [

        {
            title: "Tiêu đề",
            dataIndex:"tieu_de",
            key: "tieu_de",
        },
        {
            title: "Nội dung",
            dataIndex:"noi_dung",
            key: "noi_dung",
        },
        {
            title: "Thời gian",
            dataIndex:"thoi_gian",
            key: "thoi_gian",
        },
        {
            title: "ID tour tương ứng",
            dataIndex:"id_tour",
            key: "id_tour",
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
                                <Link to={`/admin/tour/lich_trinh/edit/${id}`}>Sửa</Link>
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
                <h2 className="font-bold text-2xl">Quản lý lịch trình</h2>
                <Button type="primary" danger>
                    <Link to="/admin/tour/lich_trinh/add" className="flex items-center space-x-2">
                        <AiOutlinePlus />
                        Tạo mới lịch trình
                    </Link>
                </Button>
            </header>
         
        </div>
    );
};

export default Admin_Lichtrinh;
