import React from 'react';
import { Form, Button, Input, DatePicker, Select } from 'antd';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

type FieldType = {
  id: number;
  ten_tour: string;
  diem_di: string;
  diem_den: string;
  lich_khoi_hanh: string;
  thoi_gian: string;
  diem_khoi_hanh: string;
  anh: string;
  soluong: number;
  trang_thai: number;
  ma_loai_tour: number;
  ma_hdv: number;
};

const AdminTourAdd: React.FC = () => {
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
          label="Tên tour"
          name="ten_tour"
          rules={[
            { required: true, message: 'Vui lòng nhập tên tour!' },
            { min: 3, message: 'Tên tour ít nhất 3 ký tự' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Điểm khởi hành"
          name="diem_khoi_hanh"
          rules={[{ required: true, message: 'Vui lòng chọn điểm khởi hành!' }]}
        >
          <Select>
            <Option value="diem1">Hà Nội</Option>
            <Option value="diem2">Phú Thọ</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Điểm đi"
          name="diem_di"
          rules={[{ required: true, message: 'Vui lòng chọn điểm đi!' }]}
        >
          <Select>
            <Option value="diem1">Hà Nội</Option>
            <Option value="diem2">Phú Thọ</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Điểm đến"
          name="diem_den"
          rules={[{ required: true, message: 'Vui lòng chọn điểm đến!' }]}
        >
          <Select>
            <Option value="diem1">Hà Nội</Option>
            <Option value="diem2">Phú Thọ</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Lịch khởi hành"
          name="lich_khoi_hanh"
          rules={[{ required: true, message: 'Vui lòng nhập lịch khởi hành!' }]}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          label="Thời gian"
          name="thoi_gian"
          rules={[{ required: true, message: 'Vui lòng nhập thời gian!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Trạng thái"
          name="trang_thai"
          rules={[{ required: true, message: 'Vui lòng nhập trạng thái!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Mã loại tour"
          name="ma_loai_tour"
          rules={[{ required: true, message: 'Vui lòng nhập mã loại tour!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Mã hướng dẫn viên"
          name="ma_hdv"
          rules={[{ required: true, message: 'Vui lòng nhập mã hướng dẫn viên!' }]}
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
            onClick={() => navigate('/admin/product')}
          >
            Quay lại
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AdminTourAdd;
