import React from 'react';
import { Form, Button, Input, DatePicker, Select,Upload } from 'antd';
import { AiOutlineLoading3Quarters,AiOutlineUpload } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

type FieldType = {
    id: number;
    ten_hd: string;
    email: string;
    dia_chi: string;
    sdt: string;
    image:File | null
};

const Admin_Account_huongdanvienEdit: React.FC = () => {
  const navigate = useNavigate();

  const onFinish = (values: FieldType) => {
 
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
  label="Hướng dẫn viên" 
  name="ten_hd"
  rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
>
  <Input />
</Form.Item>
<Form.Item
  label="Email"
  name="email"
  rules={[
    { required: true, message: 'Vui lòng nhập email!' },
    { type: 'email', message: 'Email không hợp lệ' },
  ]}
>
  <Input />
</Form.Item>
<Form.Item
  label="Ảnh"
  name="image"
  rules={[{ required: true, message: 'Vui lòng chọn ảnh!' }]}
  valuePropName="fileList"
  getValueFromEvent={(event) => {
    if (Array.isArray(event)) {
      return event;
    }
    return event && event.fileList;
  }}
>
  <Upload 
    name="image" 
    listType="picture"
    beforeUpload={() => false}
  >
    <Button icon={<AiOutlineUpload />}>Chọn ảnh</Button>
  </Upload>
</Form.Item>
<Form.Item
  label="Địa chỉ"
  name="dia_chi"
  rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
>
  <Input />
</Form.Item>
<Form.Item
  label="Số điện thoại"
  name="sdt"
  rules={[
    { required: true, message: 'Vui lòng nhập số điện thoại!' },
    { pattern: /^[0-9]+$/, message: 'Số điện thoại chỉ gồm các chữ số' },
  ]}
>
  <Input />
</Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Sửa thông tin
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

export default Admin_Account_huongdanvienEdit;
