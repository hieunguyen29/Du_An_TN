import React from "react";
import { Form, Button, Input, DatePicker, Select, Upload } from "antd";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useAddpostdmMutation } from "../../../../api/postdm";
import { Ipostdm } from "../../../../interface/postdm";

const { Option } = Select;

type FieldType = {
  id: number;
  image: string;

  ten_dm: string;
};

const Admin_DanhmucADD: React.FC = () => {
  const [addLoaiTour] = useAddpostdmMutation();
  const navigate = useNavigate();

  const onFinish = (values: Ipostdm) => {
    const formData = new FormData();
    formData.append("hinh", values.hinh.fileList[0].originFileObj);
    formData.append("ten_dm", values.ten_dm); // Thêm các trường dữ liệu khác vào formData (nếu cần)

    addLoaiTour(formData)
      .unwrap()
      .then(() => navigate("/admin/post/danhmuc_post"))
      .catch((error) => {
        console.log(error);
        // Xử lý lỗi (nếu có)
      });

    console.log(values);
  };
  return (
    <div className="container">
      <header className="mb-4">
        <h2 className="font-bold text-2xl">Tạo mới danh mục</h2>
      </header>
      <Form
        className="tour-form"
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        autoComplete="off"
      >

        <Form.Item
          label="Tên danh mục"
          name="ten_dm"
          rules={[
            { required: true, message: "Vui lòng nhập tên loại tour!" },
            { min: 3, message: "Tên tour ít nhất 3 ký tự" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Image"
          name="hinh"
          rules={[{ required: true, message: "Vui lòng chọn ảnh" }]}
        >
          <Upload
            accept="image/*"
            listType="picture"
            beforeUpload={() => false}
          >
            <Button icon={<UploadOutlined />} type="button">
              Chọn ảnh
            </Button>
          </Upload>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Thêm
          </Button>
          <Button
            type="default"
            className="ml-2"
            onClick={() => navigate("/admin/post/danhmuc_post")}
          >
            Quay lại
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Admin_DanhmucADD;
