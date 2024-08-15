import React, { useEffect, useState } from "react";
import { Form, Button, Input, DatePicker, Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import {
  useEditLoaiPhuongTienMutation,
  useGetLoaiPhuongTienByIdQuery,
} from "../../../../api/LoaiPhuongTienApi";
import { ILoaiPhuongTien } from "../../../../interface/loaiphuongtien";

const ADmin_Phuongtienedit: React.FC = () => {
  const { idPhuongTien } = useParams<{ idPhuongTien: any }>();
  const { data: LoaiPhuongTienData } = useGetLoaiPhuongTienByIdQuery(
    idPhuongTien || ""
  );
  const LoaiPhuongTien = LoaiPhuongTienData || {};
  const [updateLoaiPhuongTien] = useEditLoaiPhuongTienMutation();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    if (LoaiPhuongTien.data && LoaiPhuongTien.data.loai_phuong_tien) {
      form.setFieldsValue({
        loai_phuong_tien: LoaiPhuongTien.data.loai_phuong_tien,
      });
    }
  }, [LoaiPhuongTien]);

  const navigate = useNavigate();

  const onFinish = (values: ILoaiPhuongTien) => {
    updateLoaiPhuongTien({ ...values, id: idPhuongTien })
      .unwrap()
      .then(() => navigate("/admin/tour/loai_phuong_tien"))
      .catch((error) => {
        setErrors(error.data.message);
        setLoading(false);
      });
  };

  return (
    <div className="container">
      <header className="mb-4">
        <h2 className="font-bold text-2xl">Sửa phương tiện </h2>
      </header>
      <Form
        className="tour-form"
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: "100%" }}
        onFinish={onFinish}
        autoComplete="off"
        form={form}
      >
        <Form.Item
          label="Phương tiện"
          name="loai_phuong_tien"
          rules={[
            { required: true, message: "Vui lòng nhập loại phương tiện!" },
            { min: 3, message: " Phương tiện ít nhất 3 ký tự" },
          ]}
          validateStatus={errors ? "error" : ""}
          help={errors}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <div className="btn-button-sub-pt">
            <Button type="primary" htmlType="submit" className="submit-click">
              Sửa
            </Button>
            <Button
              type="default"
              className="ml-2"
              onClick={() => navigate("/admin/tour/loai_phuong_tien")}
            >
              Quay lại
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ADmin_Phuongtienedit;