import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useState } from "react";
import { Table, Button, Skeleton, Popconfirm, Alert, Modal, Form, Select } from "antd";
import { Link } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import {
    useGetTourDiscountQuery,
    useRemoveTourDiscountMutation,
} from "../../../../api/TourDiscountApi";
import { ITourDiscount } from "../../../../interface/tourdiscount";
import { useGetTourQuery } from "../../../../api/TourApi";
import { useGetDiscountQuery } from "../../../../api/discountApi";
import { useEffect } from "react";
const { Option } = Select;
const Admin_TourDiscount = () => {

    const { data: imagesdata, error, isLoading } = useGetTourDiscountQuery();
    const { data: discountdata } = useGetDiscountQuery();
    const { data: datatour } = useGetTourQuery();
    const tourArray = imagesdata || []; // hiển thị all in tour_image


    const discountdataArray = discountdata || [];
    const datatourArray = datatour || [];
    const [removeImage, { isLoading: isRemoveLoading, isSuccess: isRemoveSuccess }] =
        useRemoveTourDiscountMutation();

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState("");

    const confirm = (id: any) => {
        removeImage(id);
    };

    // const openModal = (imagePath: string) => {
    //     setSelectedImage(imagePath);
    //     setIsModalVisible(true);
    // };

    // const closeModal = () => {
    //     setIsModalVisible(false);
    // };







    const dataSource = tourArray.map(({ id, tour_id, discount_id }: ITourDiscount) => ({
        key: id,
        tour_id: tour_id,
        discount_id: discount_id,
    }));


    const columns = [
        {
            title: "ID",
            dataIndex: "key",
            key: "key",
        },
        {
            title: "Tên Tour",
            dataIndex: "tour_id",
            key: "tour_id",
            render: (tour_id: number) => {
                const tour = datatourArray.data?.find((item: { id: number }) => item.id === tour_id);
                return tour ? tour.ten_tour : "Không xác định";
            },
        },

        {
            title: "Tên mã giảm giá ",
            dataIndex: "discount_id",
            key: "discount_id",
            render: (discount_id: number) => {
                const discount = discountdataArray?.find((item: { id: number }) => item.id === discount_id);
                return discount ? discount.discount_name : "Không xác định";
            },
        },
        {
            title: "Mã giảm giá ",
            dataIndex: "discount_id",
            key: "discount_id",
            render: (discount_id: number) => {
                const discount = discountdataArray?.find((item: { id: number }) => item.id === discount_id);
                return discount ? discount.discount_code : "Không xác định";
            },
        },
        {
            title: "Action",
            render: ({ key: id }: any) => {
                return (
                    <>
                        {
                            localStorage.getItem("role") == 'admin' ? <div className="flex space-x-2">
                                <Popconfirm
                                    title="Bạn có muốn xóa?"
                                    onConfirm={() => confirm(id)}
                                    okText="Yes"
                                    className="text-black"
                                    cancelText="No"
                                >
                                    <Button type="primary" danger>
                                        Xóa
                                    </Button>
                                </Popconfirm>

                                <Button type="primary" danger>
                                    <Link to={`/admin/tour/tour_discount/edit/${id}`}>Sửa</Link>
                                </Button>
                            </div> : ""
                        }
                    </>
                );
            },
        },
    ];
    const [selectedImageId, setSelectedImageId] = useState("all"); // State để lưu trữ giá trị đã chọn
    useEffect(() => {
        if (selectedImageId === "all") {
            setSelectedImageId("all");
        } else {
            setSelectedImageId(selectedImageId);
        }
    }, [selectedImageId]);
    const handleImageChange = (value) => {
        setSelectedImageId(value); // Cập nhật giá trị đã chọn
        console.log(value); // In giá trị ra console hoặc thực hiện các xử lý khác
        console.log(value === dataSource[0].tour_id);

    };

    // Render danh sách các phần tử <Option> dựa trên datatourArray.data
    const renderTourOptions = () => {
        return datatourArray.data?.map((item) => (
            <Option key={item.id} value={item.id}>
                {item.ten_tour}
            </Option>
        ));
    };
    const filteredDataSource = selectedImageId === "all"
        ? dataSource : dataSource.filter((item): boolean => item.tour_id === selectedImageId
        );

    return (
        <div>
            <header className="mb-4 flex justify-between items-center">
                <h2 className="font-bold text-2xl">Quản lý mã giảm giá cho từng tour</h2>
                <Form>
                    <Form.Item
                        name="image_id"
                    >
                        <Select
                            defaultValue="all"
                            style={{ width: 400 }}
                            onChange={handleImageChange} // Gọi hàm khi lựa chọn thay đổi
                        >
                            <Option key="all" value="all">Hiển thị tất cả</Option>
                            {renderTourOptions()}
                        </Select>
                    </Form.Item>

                </Form>
                {localStorage.getItem("role") === 'admin' ? (
                    <Button type="primary" danger>
                        <Link to="/admin/tour/tour_discount/add" className="flex items-center space-x-2">
                            <AiOutlinePlus />
                            Thêm mã giảm giá vào tour
                        </Link>
                    </Button>
                ) : null}
            </header>
            {isRemoveSuccess && <Alert message="Success Text" type="success" />}
            {isLoading ? (
                <Skeleton />
            ) : (
                <Table dataSource={filteredDataSource} columns={columns} />
            )}


        </div>
    );
};

export default Admin_TourDiscount;