import React, { useEffect } from "react";
import { Table, Button, Popconfirm, Alert } from "antd";
import { Link } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { Ipostdm } from "../../../../interface/postdm";
import { useGetpostdmQuery, useRemovepostdmMutation } from "../../../../api/postdm";

const Admin_Danhmuc_baiviet = () => {
  const { data: tourdata } = useGetpostdmQuery();
  const [removePostdm, { isLoading: isRemoveLoading, isSuccess: isRemoveSuccess }] = useRemovepostdmMutation();
  const navigate = useNavigate();

  const tourArray = tourdata?.data || [];
  const dataSource = tourArray.map(({ id, image, ten_dm }: Ipostdm) => ({
    key: id,
    image,
    ten_dm
  }));

  const columns = [
    {
      title: "ID loại bài việt",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Tên danh mục",
      dataIndex: "ten_dm",
      key: "ten_dm",
    },
    {
      title: "Ảnh danh mục",
      dataIndex: "image",
      key: "image",
      render: (image: string) => (
        <img
          src={`http://localhost:8000/storage/${image}`}
          alt="img"
          style={{ width: '200px', cursor: 'pointer' }}
        />
      ),
    },
    {
      title: "Action",
      render: ({ key: id }: any) => (
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
            <Link to={`/admin/post/edit_danhmuc/${id}`}>Sửa</Link>
          </Button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    if (isRemoveSuccess) {
      setTimeout(() => {
        navigate("/admin/post/danhmuc_post", { replace: true });
        window.location.reload(); // Load lại trang sau 1 giây
      }, 1000);
    }
  }, [isRemoveSuccess, navigate]);

  const confirm = (id: any) => {
    removePostdm(id);
  };

  return (
    <div>
      <header className="mb-4 flex justify-between items-center">
        <h2 className="font-bold text-2xl">Quản lý danh mục bài viết</h2>
        <Button type="primary" danger>
          <Link to="/admin/post/add_danhmuc" className="flex items-center space-x-2">
            <AiOutlinePlus />
            Tạo mới danh mục bài viết
          </Link>
        </Button>
      </header>
      {isRemoveSuccess && (
        <Alert
          message="Xóa thành công"
          type="success"
          showIcon
          style={{ marginBottom: '16px' }}
        />
      )}
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
};

export default Admin_Danhmuc_baiviet;