import React, { useState } from 'react';
import { Table, Button, Skeleton, Popconfirm, Alert, Input } from 'antd';
import { Link } from 'react-router-dom';
import { AiOutlinePlus } from 'react-icons/ai';
import { useGetKhachSanQuery, useRemoveKhachSanMutation } from '../../../../api/KhachSanApi';
import { IKhachSan } from '../../../../interface/khachsan';

const AdminKhachSan = (props) => {
    const { data: khachsandata, error, isLoading } = useGetKhachSanQuery();
    const [removeProduct, { isLoading: isRemoveLoading, isSuccess: isRemoveSuccess }] = useRemoveKhachSanMutation();
    const [searchValue, setSearchValue] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState([]);

    const handleSearchChange = (e) => {
        setSearchValue(e.target.value);
    };

    const handleSearch = () => {
        if (searchValue) {
            const filteredData = khachsandata?.data.filter((item) =>
                item.ten_khach_san.toLowerCase().includes(searchValue.toLowerCase())
            );
            setFilteredDataSource(filteredData);
        } else {
            setFilteredDataSource([]);
        }
    };

    const confirm = (id) => {
        removeProduct(id);
    };

    const khachsanArray = filteredDataSource.length > 0 ? filteredDataSource : khachsandata?.data || [];

    const dataSource = khachsanArray.map(({ id, image, ten_khach_san, dia_chi, so_sao }: IKhachSan) => ({
        key: id,
        image,
        ten_khach_san,
        dia_chi,
        so_sao
    }));

    const columns = [
        {
            title: 'ID',
            dataIndex: 'key',
            key: 'key',
        },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: (image) => (
                <img src={`http://localhost:8000/storage/${image}`} alt="img" style={{ width: '200px', cursor: 'pointer' }} />
            ),
        },
        {
            title: 'Tên khách sạn',
            dataIndex: 'ten_khach_san',
            key: 'ten_khach_san',
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'dia_chi',
            key: 'dia_chi',
        },
        {
            title: 'Số sao',
            dataIndex: 'so_sao',
            key: 'so_sao',
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
                                    <Link to={`/admin/tour/loai_khach_san/edit/${id}`}>Sửa</Link>
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
                <h2 className="font-bold text-2xl">Quản lý khách sạn</h2>
                <Button type="primary" danger>
                    <Link to="/admin/tour/loai_khach_san/add" className="flex items-center space-x-2">
                        <AiOutlinePlus />
                        Tạo mới loại khách sạn
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

export default AdminKhachSan