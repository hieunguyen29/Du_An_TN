import React, { useEffect, useState } from "react";
import { Form, Button, Input, DatePicker, Select } from "antd";
import { AiOutlineLoading3Quarters, AiOutlineUpload } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import { IUser } from "../../../../interface/user";
import { useAddUserMutation } from "../../../../api/UserApi";
import { Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
const { Option } = Select;

type FieldType = {
  id: number;
  name: string;

  email: string;
  dia_chi: string;
  sdt: string;
  cccd: string;
  password: string;
  image: string;
};

const Admin_Account_huongdanvienAdd: React.FC = () => {
  const [addHuongDanVien] = useAddUserMutation();
  const navigate = useNavigate();
  const [imageButtonClass, setImageButtonClass] = useState("");
  const [ButtonImage, setButtonImage] = useState("");
  const handleButtonClick = () => {
    // Thêm class mới khi button được click
    setImageButtonClass("new-class");
    setButtonImage("add-class");
  };
  const onFinish = (values: IUser) => {
    const formData = new FormData();
    formData.append("hinh", values.hinh.fileList[0].originFileObj);
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("dia_chi", values.dia_chi);
    formData.append("sdt", values.sdt);
    formData.append("cccd", values.cccd);
    formData.append("password", values.password);

    addHuongDanVien(formData)
      .unwrap()
      .then(() => navigate("/admin/account_huongdanvien"));
  };

  return (
    <div className="container">
      <header className="mb-4">
        <h2 className="font-bold text-2xl">Thêm hướng dẫn viên</h2>
      </header>
      <Form
        className="tour-form"
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: "100%" }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Hướng dẫn viên"
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Vui lòng nhập email!" },
            { type: "email", message: "Email không hợp lệ" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Địa chỉ"
          name="dia_chi"
          rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Số điện thoại"
          name="sdt"
          rules={[
            { required: true, message: "Vui lòng nhập số điện thoại!" },
            {
              pattern: /^[0-9]+$/,
              message: "Số điện thoại chỉ gồm các chữ số",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Cccd"
          name="cccd"
          rules={[
            { required: true, message: "Vui lòng nhập số cccd!" },
            {
              pattern: /^[0-9]+$/,
              message: "Số điện thoại chỉ gồm các chữ số",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Hình ảnh"
          name="hinh"
          rules={[{ required: true, message: "Vui lòng chọn ảnh" }]}
        >
          <Upload
            accept="image/*" // Chỉ chấp nhận các định dạng ảnh
            listType="picture"
            beforeUpload={() => false} // Ngăn chặn việc tự động tải lên trước đó
          >
            <Button
              onClick={handleButtonClick}
              className={ButtonImage}
              icon={<UploadOutlined />}
              type="button"
            >
              Chọn ảnh
            </Button>
          </Upload>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <div className="btn-button-sub-hdv">
            <Button type="primary" htmlType="submit" className="submit-click">
              Thêm hướng dẫn viên
            </Button>
            <Button
              type="default"
              className="ml-2"
              onClick={() => navigate("/admin/product")}
            >
              Quay lại
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Admin_Account_huongdanvienAdd;
