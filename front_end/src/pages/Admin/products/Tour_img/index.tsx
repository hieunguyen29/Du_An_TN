import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useState } from "react";
import { Table, Button, Skeleton, Popconfirm, Alert, Modal, Form, Select } from "antd";
import { Link } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import {
    useGetTourImagesQuery,
    useRemoveTourImagesMutation,
} from "../../../../api/TourImagesApi";
import { ITourImages } from "../../../../interface/tourimages";
import { useGetImagesQuery } from "../../../../api/ImagesApi";
import { useGetTourQuery } from "../../../../api/TourApi";
import { useEffect } from "react";
const { Option } = Select;
const Admin_TourImg = () => {

    const { data: imagesdata, error, isLoading } = useGetTourImagesQuery();
    const { data: dataimg } = useGetImagesQuery();
    const { data: datatour } = useGetTourQuery();
    const [removeImage, { isLoading: isRemoveLoading, isSuccess: isRemoveSuccess }] =
        useRemoveTourImagesMutation();

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState("");

    const confirm = (id: any) => {
        removeImage(id);
    };

    const openModal = (imagePath: string) => {
        setSelectedImage(imagePath);
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
    };

    const tourArray = imagesdata || []; // hiển thị all in tour_image


    const dataimgArray = dataimg || [];
    const datatourArray = datatour || [];





    const dataSource = tourArray.map(({ id, tour_id, image_id }: ITourImages) => ({
        key: id,
        tour_id: tour_id,
        image_id: image_id,
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
            title: "Ảnh Tour",
            dataIndex: "image_id",
            key: "image_id",
            render: (image_id: number) => {
                const img = dataimgArray?.find((item: { id: number }) => item.id === image_id);
                return img ? (
                    <img
                        src={`http://localhost:8000${img.url}`}
                        alt="img"
                        style={{ width: "50px", cursor: "pointer" }}
                        onClick={() => openModal(`http://localhost:8000${img.url}`)}
                    />
                ) : (
                    "Không xác định"
                );
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
                                    <Link to={`/admin/tour/image_tour/edit/${id}`}>Sửa</Link>
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
                <h2 className="font-bold text-2xl">Quản lý hình ảnh tour</h2>
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
                <Button type="primary" danger>
                    <Link to="/admin/tour/image_tour/add" className="flex items-center space-x-2">
                        <AiOutlinePlus />
                        Thêm ảnh mới
                    </Link>
                </Button>
            </header>
            {isRemoveSuccess && <Alert message="Success Text" type="success" />}
            {isLoading ? (
                <Skeleton />
            ) : (
                <Table dataSource={filteredDataSource} columns={columns} />
            )}

            <Modal visible={isModalVisible} onCancel={closeModal} footer={null}>
                <img src={selectedImage} alt="img" style={{ width: "100%" }} />
            </Modal>
        </div>
    );
};

export default Admin_TourImg;