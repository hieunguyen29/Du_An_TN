type Props = {};

// import { IProduct } from "@/interfaces/product";
import { Table, Button, Skeleton, Popconfirm, Alert } from "antd";
import { Link } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";


const AdminLoai_tour = (props: Props) => {

   
   
    
 
    
    const columns = [
        {
            title: "ID loại tour",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Tên loại tour",
            dataIndex:"ten_loai_tour",
            key: "anh",
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
                                <Link to={`/admin/tour/loai_tour/edit/${id}`}>Sửa</Link>
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
                <h2 className="font-bold text-2xl">Quản lý loại tour</h2>
                <Button type="primary" danger>
                    <Link to="/admin/tour/loai_tour/add" className="flex items-center space-x-2">
                        <AiOutlinePlus />
                        Tạo mới loại tour
                    </Link>
                </Button>
            </header>
         
        </div>
    );
};

export default AdminLoai_tour;
