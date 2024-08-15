import React, { useEffect, useState } from "react";
import { Form, Button, Input, DatePicker, Select, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import {
  useEditKhachSanMutation,
  useGetKhachSanByIdQuery,
} from "../../../../api/KhachSanApi";
import { IKhachSan } from "../../../../interface/khachsan";
import axios from "axios";

const ADmin_KhachsanEdit: React.FC = () => {
  const { idkhachsan } = useParams<{
    idkhachsan: any;
  }>();
  const { data: LoaiKhachSanData } = useGetKhachSanByIdQuery(idkhachsan || "");
  const LoaiKhachSan = LoaiKhachSanData || {};
  const [updateLoaiKhachSan] = useEditKhachSanMutation();
  const [imageButtonClass, setImageButtonClass] = useState("");
  const [ButtonImage, setButtonImage] = useState("");
  const handleButtonClick = () => {
    // Thêm class mới khi button được click
    setImageButtonClass("new-class");
    setButtonImage("add-class");
  };
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [form] = Form.useForm();
  useEffect(() => {
    if (
      LoaiKhachSan.data &&
      LoaiKhachSan.data.ten_khach_san &&
      LoaiKhachSan.data.image &&
      LoaiKhachSan.data.dia_chi &&
      LoaiKhachSan.data.so_sao
    ) {
      form.setFieldsValue({
        tieu_de: LichTrinh.date.tieu_de,
        noi_dung: LichTrinh.data.noi_dung,
        thoi_gian: LichTrinh.data.thoi_gian,
        id_tour: LichTrinh.data.id_tour,
      });
    }
  }, [LoaiKhachSan]);
  // debugger;
  const navigate = useNavigate();

  const onFinish = async (values: IKhachSan) => {
    try {
      const formData = new FormData();
      formData.append("image", values.image.fileList[0].originFileObj);
      formData.append("ten_khach_san", values.ten_khach_san);
      formData.append("dia_chi", values.dia_chi);
      formData.append("so_sao", values.so_sao);
      const response = await axios.post(
        `http://127.0.0.1:8000/api/admin/khachsan/${idkhachsan}`,
        formData,
        {
          headers: {
            "X-HTTP-Method-Override": "PUT",
          },
        }
      );

      if (response.status === 200) {
        console.log("Thành công");
        console.log(response);
        window.location.href =
          "http://localhost:5173/admin/tour/loai_khach_san";
      } else {
        console.log("Yêu cầu thất bại");
      }
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className="container">
      <header className="mb-4">
        <h2 className="font-bold text-2xl">Sửa lịch trình lịch trình </h2>
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
          name="image"
          rules={[{ required: true, message: "Vui lòng chọn ảnh" }]}
        >
          <Upload
            accept="image/*"
            listType="picture"
            beforeUpload={() => false}
          >
           <Button icon={<UploadOutlined />} type="button" onClick={handleButtonClick} className={imageButtonClass}>
                Chọn ảnh
              </Button>
          </Upload>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <div className="btn-button-sub">
            <Button type="primary" htmlType="submit" className="submit-click">
              Sửa
            </Button>
            <Button
              type="default"
              className="ml-2"
              onClick={() => navigate("/admin/tour/loai_khach_san")}
            >
              Quay lại
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Admin_LichtrinhEDit;