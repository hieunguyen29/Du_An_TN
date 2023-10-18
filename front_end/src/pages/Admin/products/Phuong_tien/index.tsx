type Props = {};

// import { IProduct } from "@/interfaces/product";
import { Table, Button, Skeleton, Popconfirm, Alert } from "antd";
import { Link } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";


const ADmin_Phuontien = (props: Props) => {

   
   
    
 
    
    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Loại phương tiện",
            dataIndex:"loai_phuong_tien",
            key: "loai_phuong_tien",
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
                                <Link to={`/admin/tour/loai_phuong_tien/edit/${id}`}>Sửa</Link>
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
                <h2 className="font-bold text-2xl">Quản lý phương tiện</h2>
                <Button type="primary" danger>
                    <Link to="/admin/tour/loai_phuong_tien/add" className="flex items-center space-x-2">
                        <AiOutlinePlus />
                      Tạo mới phương tiện
                    </Link>
                </Button>
            </header>
         
        </div>
    );
};

export default ADmin_Phuontien;
