type Props = {};

// import { IProduct } from "@/interfaces/product";
import { Table, Button, Skeleton, Popconfirm, Alert } from "antd";
import { Link } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { useGetDiaDiemQuery, useRemoveDiaDiemMutation } from "../../../../api/DiaDiemApi";
import { IDiaDiem } from "../../../../interface/diadiem";

import { useGetLoaiTourQuery} from "../../../../api/LoaiTourApi";
import { useEffect } from "react";
const AdminDiadiem = (props: Props) => {

    const { data: diadiemdata, error, isLoading } = useGetDiaDiemQuery();

    const { data: loaitourdata } = useGetLoaiTourQuery();

    const [removeDiaDiem, { isLoading: isRemoveLoading, isSuccess: isRemoveSuccess }] =
        useRemoveDiaDiemMutation();

    const confirm = (id: any) => {
        removeDiaDiem(id);
    };
    // const navigate = useNavigate();
    const tourArray = diadiemdata?.data || [];

    const loaitourArrary = loaitourdata?.data || [];
   
    
    const dataSource = tourArray.map(({ id, ten_dia_diem, mo_ta, ma_loai_tour }: IDiaDiem) => ({
        key: id,
        ten_dia_diem,
        mo_ta,
        ma_loai_tour

    }));
    const columns = [
        {
            title: "ID địa điểm",
            dataIndex: "key",
            key: "key",
        },
        {
            title: "Tên địa điểm",
            dataIndex: "ten_dia_diem",
            key: "ten_dia_diem",
        },
        {
            title: "Mô tả",
            dataIndex: "mo_ta",
            key: "mo_ta",
        },
        {
            title: "Mã Loại Tour",
            dataIndex: "ma_loai_tour",
            key: "ma_loai_tour",
            render: (ma_loai_tour: number) => {
                const loaiTour = loaitourArrary.find((item) => item.id === ma_loai_tour);
                return loaiTour ? loaiTour.ten_loai_tour : "Không xác định";
                
              }
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
                                <Link to={`/admin/tour/diadiem/edit/${id}`}>Sửa</Link>
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
                    <Link to="/admin/tour/diadiem/add" className="flex items-center space-x-2">
                        <AiOutlinePlus />
                        Tạo mới địa điểm
                    </Link>
                </Button>
            </header>
            {isRemoveSuccess && <Alert message="Success Text" type="success" />}
            {isLoading ? <Skeleton /> : <Table dataSource={dataSource} columns={columns} />}
        </div>
    );
};

export default AdminDiadiem;
