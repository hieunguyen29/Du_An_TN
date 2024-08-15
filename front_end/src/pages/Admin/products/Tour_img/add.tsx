import React ,{useState}from 'react';
import { Form, Button, Input, DatePicker, Select } from 'antd';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

import { useGetTourQuery } from "../../../../api/TourApi";
import { useGetImagesQuery } from '../../../../api/ImagesApi';
import { useAddTourImagesMutation } from '../../../../api/TourImagesApi';
import { ITourImages } from '../../../../interface/tourimages';
const { Option } = Select;

type FieldType = {
  id: number;
 tour_id:number,
 image_id:number
};



const Admin_TourImgADD: React.FC = () => {

  const navigate = useNavigate();
  const { data: tourdata } = useGetTourQuery();
  const tourArrary = tourdata?.data || [];
  const { data: imgdata } = useGetImagesQuery();
  const imgArrary = imgdata || [];

  const [addTourImage] = useAddTourImagesMutation();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const onFinish = (values: ITourImages) => {
    addTourImage(values)
        .unwrap()
        .then(() => navigate("/admin/tour/image_tour"))
        .catch((error) => {
          setErrors(error.data.message);
          setLoading(false);
          
        });
  };

  return (
    <div className="container">
      <header className="mb-4">
        <h2 className="font-bold text-2xl">Thêm ảnh cho một tour </h2>
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
          label="Image"
          name="image_id"
          rules={[
            { required: true, message: 'Vui lòng chọn ảnh' },
          ]}
          validateStatus={errors ? 'error' : ''}
          help={errors}
        >
        <Select defaultValue="Chọn" style={{ width: 400,}}>
          {imgArrary.map((option) => (
              <Option key={option.id} value={option.id}>{option.id}</Option>
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
        <Select defaultValue="Chọn" style={{ width: 400,}}>
          {tourArrary.map((option) => (
              <Option key={option.id} value={option.id}>{option.ten_tour}</Option>
          ))}
        </Select>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Thêm
          </Button>
          <Button
            type="default"
            className="ml-2"
            onClick={() => navigate('/admin/tour/image_tour')}
          >
            Quay lại
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Admin_TourImgADD;
