import React, { useState, useEffect } from "react";
import { Table, Button, Input, Skeleton, Popconfirm, Alert } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import {
    useGetLoaiPhuongTienQuery,
    useRemoveLoaiPhuongTienMutation,
} from "../../../../api/LoaiPhuongTienApi";
import { ILoaiPhuongTien } from "../../../../interface/loaiphuongtien";

const ADmin_Phuontien = () => {
    const [searchValue, setSearchValue] = useState("");
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const navigate = useNavigate();

    const { data: phuongtiendata, error, isLoading } = useGetLoaiPhuongTienQuery();
    const [removeProduct, { isLoading: isRemoveLoading, isSuccess: isRemoveSuccess }] =
        useRemoveLoaiPhuongTienMutation();

    const handleSearchChange = (e) => {
        setSearchValue(e.target.value);
    };

    const handleSearch = () => {
        // Lọc dữ liệu dựa trên giá trị tìm kiếm
        const filteredData = phuongtiendata?.data.filter((item) =>
            item.loai_phuong_tien.toLowerCase().includes(searchValue.toLowerCase())
        );
        setFilteredDataSource(filteredData);
    };

    const confirm = (id: any) => {
        if (!window.confirm("Bạn có muốn xóa?")) {
            return;
        }
        removeProduct(id);
    };

    useEffect(() => { }, [navigate]);

    const tourArray = filteredDataSource.length > 0 ? filteredDataSource : phuongtiendata?.data || [];

    const dataSource = tourArray.map(({ id, loai_phuong_tien }: ILoaiPhuongTien) => ({
        key: id,
        loai_phuong_tien,
    }));

    const columns = [
        {
            title: "ID",
            dataIndex: "key",
            key: "key",
        },
        {
            title: "Loại phương tiện",
            dataIndex: "loai_phuong_tien",
            key: "loai_phuong_tien",
        },
        {
            title: "Action",
            render: ({ key: id }: any) => (
                <>
                    {localStorage.getItem("role") === "admin" && (
                        <div className="flex space-x-2">
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
                                <Link to={`/admin/tour/loai_phuong_tien/edit/${id}`}>Sửa</Link>
                            </Button>
                        </div>
                    )}
                </>
            ),
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
            <div className="flex items-center justify-end mb-4">
  <Input
    style={{ width: "250px" }}
    placeholder="Tìm kiếm lịch trình"
    value={searchValue}
    onChange={handleSearchChange}
  />
  <Button style={{ backgroundColor: "blue" , marginLeft:"5px"}} type="primary" onClick={handleSearch}>
    Tìm kiếm
  </Button>
</div>
            {isRemoveSuccess && <Alert message="Success Text" type="success" />}
            {isLoading ? <Skeleton /> : <Table dataSource={dataSource} columns={columns} />}
        </div>
    );
};

export default ADmin_Phuontien;