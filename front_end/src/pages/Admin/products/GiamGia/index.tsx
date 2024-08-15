type Props = {};

// import { IProduct } from "@/interfaces/product";
import { useEffect } from "react";
import { Table, Button, Skeleton, Popconfirm, Alert } from "antd";
import { Link } from "react-router-dom";
import useNavigate from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { useGetDiscountQuery,useRemoveDiscountMutation } from "../../../../api/discountApi";
import { IDiscount } from "../../../../interface/discount";



const AdminGiam_Gia = (props: Props) => {
    const { data: discountdata, error, isLoading } = useGetDiscountQuery();
    const [removeProduct, { isLoading: isRemoveLoading, isSuccess: isRemoveSuccess }] =
     useRemoveDiscountMutation();
    const confirm = (id: any) => {
        removeProduct(id);
    };
  
 //   const navigate = useNavigate();
    const tourArray = discountdata || [];
    const dataSource = tourArray.map((
    { 
        id,
        discount_name,
        discount_condition,
        discount_code,
        percentage,
        expiry_date,
        minprice,trang_thai
    
    }: IDiscount) => ({
        key: id,
        discount_name,
        discount_condition,
        discount_code,
        percentage,
        expiry_date,
        minprice,trang_thai
    }));
    const columns = [
        {
            title: "ID",
            dataIndex: "key",
            key: "key",
        },
        {
            title: "Tên Giảm giá",
            dataIndex: "discount_name",
            key: "discount_name",
        },
       
        {
            title: "Mã Giảm giá",
            dataIndex: "discount_code",
            key: "discount_code",
           
        },
        {
            title: "Tổng phần trăm(%) / tiền(K) ",
            dataIndex: "percentage",
            key: "percentage",
            render: (percentage: number) => {
                return percentage >= 100 ?  `${percentage}K` : `${percentage}%`;
            }
        },
        {
            title: "Điều kiện giảm giá",
            dataIndex: "minprice",
            key: "minprice",
           
        },
        {
            title: "Loại Giảm giá",
            dataIndex: "discount_condition",
            key: "discount_condition",
            render: (discount_condition: number) => {
                return discount_condition == 1 ? "giảm giá theo (K)" : "giảm giá theo (%)";
            }
        },
        {
            title: "Ngày Hết Hạn",
            dataIndex: "expiry_date",
            key: "expiry_date",
            render: (expiry_date: string) => {
                const date = new Date(expiry_date);
                const formattedDate = date.toLocaleDateString();
                return formattedDate;
            },
        },
        {
            title: "Trạng thái",
            dataIndex: "trang_thai",
            key: "trang_thai",
            render: (trang_thai: number) => {
                if (trang_thai == 1) {
                    return "Hoạt động";
                } else {
                    return "Ngừng hoạt động";
                 
                }
            },
        },
        {
            title: "Action",
            render: ({ key: id }: any) => {
                return (
                    <>
                     {  localStorage.getItem("role") == 'admin' ? <div className="flex space-x-2">
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
                                <Link to={`/admin/tour/discount/edit/${id}`}>Sửa</Link>
                            </Button>
                        </div>:""}   
                    </>
                );
            },
        },
    ];
   
    return (
        <div>
            <header className="mb-4 flex justify-between items-center">
                <h2 className="font-bold text-2xl">Quản lý Mã giảm giá</h2>
                <Button type="primary" danger>
                    <Link to="/admin/tour/discount/add" className="flex items-center space-x-2">
                        <AiOutlinePlus />
                        Thêm Mã giảm giá 
                    </Link>
                </Button>
            </header>
           {isRemoveSuccess && <Alert message="Success Text" type="success" />}
            {isLoading ? <Skeleton /> : <Table dataSource={dataSource} columns={columns} />}
        </div>
    );
};

export default AdminGiam_Gia;
