import React, { useState } from 'react';
import { Table, Button, Skeleton, Popconfirm, Alert, Input, Checkbox } from 'antd';
import './index.css'
import { Link } from 'react-router-dom';
import { AiOutlinePlus } from 'react-icons/ai';
import { useGetLoaiTourQuery, useRemoveLoaiTourMutation } from '../../../../api/LoaiTourApi';
import { ILoaiTour } from '../../../../interface/loaiTour';

const AdminLoai_tour = (props) => {
    const { data: tourdata, error, isLoading } = useGetLoaiTourQuery();
    const [removeProduct, { isLoading: isRemoveLoading, isSuccess: isRemoveSuccess }] = useRemoveLoaiTourMutation();
    const [searchValue, setSearchValue] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState([]);

    const handleSearchChange = (e) => {
        setSearchValue(e.target.value);
    };

    const handleSearch = () => {
        if (searchValue) {
            const filteredData = tourdata?.data.filter((item) =>
                item.ten_loai_tour.toLowerCase().includes(searchValue.toLowerCase())
            );
            setFilteredDataSource(filteredData);
        } else {
            setFilteredDataSource([]);
        }
    };

    const confirm = (id) => {
        removeProduct(id);
    };

    const tourArray = filteredDataSource.length > 0 ? filteredDataSource : tourdata?.data || [];

    const dataSource = tourArray.map(({ id, image, ten_loai_tour, thoi_gian, trang_thai }) => ({
        key: id,
        image,
        ten_loai_tour,
        thoi_gian,
        trang_thai
    }));

    const columns = [
        {
            title: 'ID loại tour',
            dataIndex: 'key',
            key: 'key',
        },
        {
            title: 'Ảnh loại tour',
            dataIndex: 'image',
            key: 'image',
            render: (image) => (
                <img src={`http://localhost:8000/storage/${image}`} alt="img" style={{ width: '200px', cursor: 'pointer' }} />
            ),
        },
        {
            title: 'Tên loại tour',
            dataIndex: 'ten_loai_tour',
            key: 'ten_loai_tour',
        },
        ,
        {
            title: "Thời gian",
            dataIndex: "thoi_gian",
            key: "thoi_gian",
        },
        {
            title: "Trạng thái",
            dataIndex: "trang_thai",
            key: "trang_thai",
            render: (trang_thai) => (
                <div
                    className="status-circle"
                    style={{ backgroundColor: trang_thai === 1 ? '#00FF00' : '#FF0000' }}
                ></div>
            ),
        },
        {
            title: 'Action',
            render: ({ key: id }) => {
                return (
                    <>
                        {localStorage.getItem('role') === 'admin' ? (
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
                                    <Link to={`/admin/tour/loai_tour/edit/${id}`}>Sửa</Link>
                                </Button>
                            </div>
                        ) : null}
                    </>
                );
            },
        },
    ];

    return (
        <div>
            <header className="mb-4 flex justify-between items-center">
                <h2 className="font-bold text-2xl">Quản lý loại tour</h2>

                {localStorage.getItem("role") === 'admin' ? (
                    <Button type="primary" className="bg-blue-500 p-5 flex justify-center items-center hover:bg-blue-600" >
                        <Link to="/admin/tour/loai_tour/add" className="flex items-center space-x-2">
                            <AiOutlinePlus />
                            Tạo mới loại tour
                        </Link>
                    </Button>
                ) : null}
            </header>
            <div className="flex items-center justify-end mb-4">
                <Input
                    style={{ width: "250px" }}
                    placeholder="Tìm kiếm lịch trình"
                    value={searchValue}
                    onChange={handleSearchChange}
                />
                <Button style={{ backgroundColor: "blue", marginLeft: "5px" }} type="primary" onClick={handleSearch}>
                    Tìm kiếm
                </Button>
            </div>
            {isRemoveSuccess && <Alert message="Success Text" type="success" />}
            {isLoading ? <Skeleton /> : <Table dataSource={dataSource} columns={columns} />}
        </div>
    );
};

export default AdminLoai_tour;