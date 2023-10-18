import React from 'react';
import { Form, Button, Input, DatePicker, Select } from 'antd';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

type FieldType = {
  id: number;
  ten_loai_tour: string;

};

const AdminLoai_tourADD: React.FC = () => {
  const navigate = useNavigate();

  const onFinish = (values: FieldType) => {
    // Handle form submission logic here
    console.log('Form values:', values);
  };

  return (
    <div className="container">
      <header className="mb-4">
        <h2 className="font-bold text-2xl">Tạo mới tour</h2>
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
          label="Tên loại tour"
          name="ten_loai tour"
          rules={[
            { required: true, message: 'Vui lòng nhập tên loại tour!' },
            { min: 3, message: 'Tên tour ít nhất 3 ký tự' },
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

export default AdminLoai_tourADD;
