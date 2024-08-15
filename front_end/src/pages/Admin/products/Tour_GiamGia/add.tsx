import React, { useState } from 'react';
import { Form, Button, Input, DatePicker, Select } from 'antd';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

import {
  useAddTourDiscountMutation,

} from "../../../../api/TourDiscountApi";
import { ITourDiscount } from "../../../../interface/tourdiscount";
import { useGetTourQuery } from "../../../../api/TourApi";
import { useGetDiscountQuery } from "../../../../api/discountApi";
const { Option } = Select;

type FieldType = {
  id: number;
  tour_id: number,
  image_id: number
};



const Admin_TourDiscountADD: React.FC = () => {

  const navigate = useNavigate();
  const { data: tourdata } = useGetTourQuery();
  const tourArrary = tourdata?.data || [];
  const { data: discountdata } = useGetDiscountQuery();
  const discountArrary = discountdata || [];
  const [addTourDiscount] = useAddTourDiscountMutation();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const onFinish = (values: ITourDiscount) => {
    addTourDiscount(values)
      .unwrap()
      .then(() => navigate("/admin/tour/tour_discount"))
      .catch((error) => {
        setErrors(error.data.message);
        setLoading(false);

      });
  };

  return (
    <div className="container">
      <header className="mb-4">
        <h2 className="font-bold text-2xl">Thêm mã giảm giá cho một tour </h2>
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
          label="Tên mã giảm giá"
          name="discount_id"
          rules={[
            { required: true, message: 'Vui lòng chọn mã giảm giá ' },
          ]}
          validateStatus={errors ? 'error' : ''}
          help={errors}
        >
        <Select defaultValue="Chọn" style={{ width: "100%",}}>
          {discountArrary.map((option) => (
              <Option key={option.id} value={option.id}>{option.discount_name}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Tour"
          name="tour_id"
          rules={[
            { required: true, message: 'Vui lòng chọn tour ' },
          ]}
        >
        <Select defaultValue="Chọn" style={{ width: "100%",}}>
          {tourArrary.map((option) => (
              <Option key={option.id} value={option.id}>{option.ten_tour}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <div className='btn-button-sub'>
          <Button type="primary" htmlType="submit" className='submit-click'>
            Thêm
          </Button>
          <Button
            type="default"
            className="ml-2"
            onClick={() => navigate('/admin/tour/tour_discount')}
          >
            Quay lại
          </Button>
          </div>
         
        </Form.Item>
      </Form>
    </div>
  );
};

export default Admin_TourDiscountADD;