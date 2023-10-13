type Props = {};

// import { IProduct } from "@/interfaces/product";
import { Table, Button, Skeleton, Popconfirm, Alert } from "antd";
import { Link } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { ITour } from "../../../../interface/tour";
import { useGetProductsQuery } from "../../../../api/TourApi";

const AdminProduct = (props: Props) => {
    const { data: tourdata, error, isLoading } = useGetProductsQuery();
    // const [removeProduct, { isLoading: isRemoveLoading, isSuccess: isRemoveSuccess }] =
    //     useRemoveProductMutation();

    // const confirm = (_id: number) => {
    //     removeProduct(_id);
    // };
    console.log(tourdata);
    const tourArray = tourdata?.data || [];
    
    const dataSource = tourArray.map(({ id, ten_tour, soluong, anh, diem_khoi_hanh, diem_den, diem_di, lich_khoi_hanh, thoi_gian, trang_thai, ma_loai_tour, ma_hdv }: ITour) => ({
        key: id,
        soluong,
        ten_tour,
        anh,
        diem_khoi_hanh,
        diem_den,
        diem_di,
        lich_khoi_hanh,
        thoi_gian,
        trang_thai,
        ma_loai_tour,
        ma_hdv
    }));
    
    const columns = [
        {
            title: "Tour du lịch",
            dataIndex: "ten_tour",
            key: "ten_tour",
        },
        {
            title: "Điểm đến",
            dataIndex: "diem_den",
            key: "diem_den",
        },
        {
            title: "Điểm đi",
            dataIndex:"diem_di",
            key: "diem_di",
        },
        {
            title: "Điểm đi",
            dataIndex:"diem_di",
            key: "diem_di",
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
                <h2 className="font-bold text-2xl">Quản lý tour</h2>
                <Button type="primary" danger>
                    <Link to="/admin/tour/add" className="flex items-center space-x-2">
                        <AiOutlinePlus />
                        Tạo mới tour
                    </Link>
                </Button>
            </header>
            {/* {isRemoveSuccess && <Alert message="Success Text" type="success" />} */}
            {isLoading ? <Skeleton /> : <Table dataSource={dataSource} columns={columns} />}
        </div>
    );
};

export default AdminProduct;
