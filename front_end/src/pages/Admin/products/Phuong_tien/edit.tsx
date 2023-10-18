import React from 'react';
import { Form, Button, Input, DatePicker, Select } from 'antd';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

type FieldType = {
  id: number;
  loai_phuont_tien: string;
};

const ADmin_Phuongtienedit: React.FC = () => {
  const navigate = useNavigate();

  const onFinish = (values: FieldType) => {
  
    console.log('Form values:', values);
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
        style={{ maxWidth: 600 }}
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
        >
          <Input />
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

export default ADmin_Phuongtienedit;
