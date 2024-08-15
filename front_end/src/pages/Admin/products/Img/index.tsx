import React, { useState } from 'react';
import { Table, Button, Skeleton, Popconfirm, Alert, Modal } from 'antd';
import { Link } from 'react-router-dom';
import { AiOutlinePlus } from 'react-icons/ai';
import { useGetImagesQuery, useRemoveImagesMutation } from '../../../../api/ImagesApi';

const AdminImage = () => {
  const { data: imagesdata, error, isLoading } = useGetImagesQuery();
  const [removeImage, { isLoading: isRemoveLoading, isSuccess: isRemoveSuccess }] = useRemoveImagesMutation();


  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

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

  const tourArray = imagesdata || [];

  
  
  const dataSource = tourArray.map(({ id, url }) => ({
    key: id,
    image_path: url,
  }));

  const columns = [
    {
      title: 'ID ảnh',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: 'Ảnh',
      dataIndex: 'image_path',
      key: 'image_path',
      render: (imagePath: string) => (
        <img
          src={`http://localhost:8000${imagePath}`}
          alt="img"
          style={{ width: '50px', cursor: 'pointer' }}
          onClick={() => openModal(imagePath)}
        />
      ),
    },
    {
      title: 'Action',
      render: ({ key: id }: any) => {
        return (
          <>
         {  localStorage.getItem("role") == 'admin' ? <div className="flex space-x-2">
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
                <Link to={`/admin/tour/image/edit/${id}`}>Sửa</Link>
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
        <h2 className="font-bold text-2xl">Danh Sách Ảnh</h2>
        <Button type="primary" danger>
          <Link to="/admin/tour/image/add" className="flex items-center space-x-2">
            <AiOutlinePlus />
            Thêm Ảnh Mới
          </Link>
        </Button>
      </header>
      {isRemoveSuccess && <Alert message="Success Text" type="success" />}
      {isLoading ? (
        <Skeleton />
      ) : (
        <Table dataSource={dataSource} columns={columns} />
      )}

      <Modal
        visible={isModalVisible}
        onCancel={closeModal}
        footer={null}
      >
        <img
          src={`http://localhost:8000${selectedImage}`}
          alt="img"
          style={{ width: '100%' }}
        />
      </Modal>
    </div>
  );
};

export default AdminImage;