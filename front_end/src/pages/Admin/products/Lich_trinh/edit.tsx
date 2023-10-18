import React from 'react';
import { Form, Button, Input, DatePicker, Select } from 'antd';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

type FieldType = {
  id: number;
  tieu_de: string;
    thoi_gian:Date,
    noi_dung:string,
    id_tour:bigint
};

const Admin_LichtrinhEDit: React.FC = () => {
  const navigate = useNavigate();

  const onFinish = (values: FieldType) => {
    // Handle form submission logic here
    console.log('Form values:', values);
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
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Tiêu đề"
          name="tieu_de"
          rules={[
            { required: true, message: 'Vui lòng nhập tiêu đề ' },
            { min: 3, message: 'Tiêu đề tour ít nhất 3 ký tự' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Nội dung"
          name="noi_dung"
          rules={[
            { required: true, message: 'Vui lòng nhập nội dung' },
            { min: 3, message: 'Nội dung ít nhất 3 ký tự' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Thời gian"
          name="thời gian"
          rules={[{ required: true, message: 'Vui lòng chọn thời gian!' }]}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          label="ID Tour"
          name="id_tour"
          rules={[{ required: true, message: 'Vui lòng chọn ID Tour!' }]}
        >
          <Select>
            <Option value={1}>Tour 1</Option>
            <Option value={2}>Tour 2</Option>
          
          </Select>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Sửa
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

export default Admin_LichtrinhEDit;
