import React, { useState } from "react";
import {
  Form,
  Button,
  Input,
  DatePicker,
  Select,
  message,
  Alert,
  Upload,
} from "antd";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import {
  useAddKhachSanMutation,
  useRemoveKhachSanMutation,
} from "../../../../api/KhachSanApi";
import { IKhachSan } from "../../../../interface/khachsan";
const { Option } = Select;
import "../../../css.css";

type FieldType = {
  id: number;
  image: string;
  ten_khach_san: string;
  dia_chi: string;
  so_sao: string;
};

const ADmin_KhachsanADD: React.FC = () => {
  const [imageButtonClass, setImageButtonClass] = useState("");
  const [ButtonImage, setButtonImage] = useState("");
  const [addKhachsan] = useAddKhachSanMutation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const handleButtonClick = () => {
    // Thêm class mới khi button được click
    setImageButtonClass("new-class");
    setButtonImage("add-class");
  };
  const onFinish = (values: IKhachSan) => {
    const formData = new FormData();
    formData.append("hinh", values.hinh.fileList[0].originFileObj);
    formData.append("ten_khach_san", values.ten_khach_san);
    formData.append("dia_chi", values.dia_chi);
    formData.append("so_sao", values.so_sao);
    addKhachsan(formData)
      .unwrap()
      .then(() => navigate("/admin/tour/loai_khach_san"))
      // Handle form submission logic here
      .catch((error) => {
        setErrors(error.data.message);
        setLoading(false);
      });
  };

  return (
    <div className="container">
      <header className="mb-4">
        <h2 className="font-bold text-2xl">Tạo mới khách sạn </h2>
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
          label="Tên khách sạn"
          name="ten_khach_san"
          rules={[
            { required: true, message: "Vui lòng nhập tên khách sạn!" },
            { min: 3, message: " Khách sạn ít nhất 3 ký tự" },
          ]}
          validateStatus={errors ? "error" : ""}
          help={errors}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Địa chỉ"
          name="dia_chi"
          rules={[
            { required: true, message: "Vui lòng nhập địa chỉ khách sạn!" },
            { min: 3, message: " Khách sạn ít nhất 3 ký tự" },
          ]}
          validateStatus={errors ? "error" : ""}
          help={errors}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Số sao"
          name="so_sao"
          rules={[
            { required: true, message: "Vui lòng nhập số sao khách sạn!" },
          ]}
          validateStatus={errors ? "error" : ""}
          help={errors}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Image"
          name="hinh"
          rules={[{ required: true, message: "Vui lòng chọn ảnh" }]}
        >
          <div className="upload">
            <Upload
              accept="image/*"
              listType="picture"
              beforeUpload={() => false}
            >
              <Button icon={<UploadOutlined />} type="button" onClick={handleButtonClick} className={imageButtonClass}>
                Chọn ảnh
              </Button>
            </Upload>
          </div>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <div className="btn-button-sub">
            <Button type="primary" htmlType="submit" className="submit-click">
              Thêm
            </Button>
            <Button
              type="default"
              className="ml-2"
              onClick={() => navigate("/admin/tour/loai_tour")}
            >
              Quay lại
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ADmin_KhachsanADD;