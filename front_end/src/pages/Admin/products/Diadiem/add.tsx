import React from 'react';
import { Form, Button, Input, DatePicker, Select } from 'antd';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

type FieldType = {
  id: number;
  ten_dia_diem: string;
mo_ta:string
};

const AdminDiadiem_ADD: React.FC = () => {
  const navigate = useNavigate();

  const onFinish = (values: FieldType) => {
    // Handle form submission logic here
    console.log('Form values:', values);
  };

  return (
    <div className="container">
      <header className="mb-4">
        <h2 className="font-bold text-2xl">Tạo mới địa điểm </h2>
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
          label="Tên địa điểm"
          name="ten_loai_tour"
          rules={[
            { required: true, message: 'Vui lòng nhập tên địa điểm!' },
            { min: 3, message: 'Đại điểm tour ít nhất 3 ký tự' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Mô tả"
          name="mo_ta"
          rules={[
            { required: true, message: 'Vui lòng mô tả' },
            { min: 3, message: 'Mô tả ít nhất 3 ký tự' },
          ]}
        >
          <Input />
        </Form.Item>
       
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Thêm
          </Button>
          <Button
            type="default"
            className="ml-2"
            onClick={() => navigate('/admin/tour')}
          >
            Quay lại
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AdminDiadiem_ADD;
