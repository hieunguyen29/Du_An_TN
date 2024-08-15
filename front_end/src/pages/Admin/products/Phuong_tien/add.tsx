import React, { useState } from 'react';
import { Form, Button, Input, DatePicker, Select, message, Alert } from 'antd';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { useAddLoaiPhuongTienMutation, useRemoveLoaiPhuongTienMutation } from "../../../../api/LoaiPhuongTienApi";
import { ILoaiPhuongTien } from "../../../../interface/loaiphuongtien";

const { Option } = Select;

type FieldType = {
  id: number;
  loai_phuont_tien: string;
};

const ADmin_PhuontiengADD: React.FC = () => {
  const [addLoaiPhuongTien] = useAddLoaiPhuongTienMutation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const onFinish = (values: ILoaiPhuongTien) => {
    addLoaiPhuongTien(values)
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
        <h2 className="font-bold text-2xl">Tạo mới phương tiện </h2>
      </header>

      <Form
        className="tour-form"
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: '100%' }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Phương tiện"
          name="loai_phuong_tien"
          rules={[
            { required: true, message: 'Vui lòng nhập loại phương tiện!' },
            { min: 3, message: ' Phương tiện ít nhất 3 ký tự' },

          ]}
          validateStatus={errors ? 'error' : ''}
          help={errors}
        >
          <Input />
        </Form.Item>
   
       
        <Form.Item wrapperCol={{ offset: 8, span: 16 }} >
          <div className="btn-button-sub-pt">
          <Button type="primary" htmlType="submit" className="submit-click" >
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

export default ADmin_PhuontiengADD;