import React, { useEffect, useState } from 'react';
import { Form, Button, Input, Upload } from 'antd';
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from 'react-router-dom';
import { useEditLoaiTourMutation, useGetLoaiTourByIdQuery } from '../../../../api/LoaiTourApi';
import { ILoaiTour } from '../../../../interface/loaiTour';
import axios from 'axios';
import "../../../css.css";

const AdminLoai_tourEdit: React.FC = () => {
  const { idLoaiTour } = useParams<{ idLoaiTour: any }>();
  const { data: LoaiTourData } = useGetLoaiTourByIdQuery(idLoaiTour || "");
  const LoaiTour = LoaiTourData || {};
  const [updateLoaiTour] = useEditLoaiTourMutation();

  const [name, setName] = useState('');
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      hinh: LoaiTour.image,
      ten_loai_tour: LoaiTour.ten_loai_tour,
      thoi_gian: moment(LoaiTour.thoi_gian).format('YYYY-MM-DD'),

    });
  }, [LoaiTour]);

  const navigate = useNavigate();

  const onFinish = async (values: ILoaiTour) => {
    try {
      const formData = new FormData();
      formData.append('image', values.image.fileList[0].originFileObj);
      formData.append('ten_loai_tour', values.ten_loai_tour);

      const response = await axios.post(
        `http://127.0.0.1:8000/api/admin/loaitour/${idLoaiTour}`,
        formData,
        {
          headers: {
            'X-HTTP-Method-Override': 'PUT',
          },
        }
      );

      if (response.status === 200) {
        console.log('Thành công');
        console.log(response);
        window.location.href = 'http://localhost:5173/admin/tour/loai_tour';
      } else {
        console.log('Yêu cầu thất bại');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <header className="mb-4">
        <h2 className="font-bold text-2xl">Chỉnh sửa loại tour</h2>
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
          label="Image"
          name="image"
          rules={[{ required: true, message: "Vui lòng chọn ảnh" }]}
        >
          <div className='upload-image'>
          <Upload
            accept="image/*"
            listType="picture"
            beforeUpload={() => false}
          >
            <Button icon={<UploadOutlined />} type="button">
              Chọn ảnh
            </Button>
          </Upload>
          </div>
         
        </Form.Item>
        <Form.Item
          label="Tên loại tour"
          name="ten_loai_tour"
          rules={[
            { required: true, message: 'Vui lòng nhập tên loại tour!' },
            { min: 3, message: 'Tên tour ít nhất 3 ký tự' },
          ]}
        >
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <div className='btn-button-sub'>
          <Button type="primary" htmlType="submit" className='submit-click'>
            Sửa
          </Button>
          <Button
            type="default"
            className="ml-2"
            onClick={() => navigate('/admin/tour')}
          >
            Quay lại
          </Button>
          </div>
         
        </Form.Item>
      </Form>
    </div>
  );
};

export default AdminLoai_tourEdit;