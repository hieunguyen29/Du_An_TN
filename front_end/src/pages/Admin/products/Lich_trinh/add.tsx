import React, { useState } from 'react';
import { Form, Button, Input, DatePicker, Select } from 'antd';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useNavigate } from 'react-router-dom';
import { useGetTourQuery } from '../../../../api/TourApi';
import { useAddLichTrinhMutation } from '../../../../api/LichTrinhApi';
import { ILichTrinh } from '../../../../interface/lichtrinh';
import "../../../css.css"

const { Option } = Select;

const Admin_LichtrinhADD: React.FC = () => {
  const [editorData, setEditorData] = useState('');

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setEditorData(data);
  };

  const navigate = useNavigate();
  const { data: tourdata } = useGetTourQuery();
  const tourArray = tourdata?.data || [];
  const [addLichTrinh] = useAddLichTrinhMutation();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const disabledDate = (current) => {
    const currentDate = new Date();
    return current && current < currentDate.setHours(0, 0, 0, 0);
  };

  const onFinish = (values: ILichTrinh) => {
    values.noi_dung = editorData;
    addLichTrinh(values)
      .unwrap()
      .then(() => navigate("/admin/tour/lich_trinh"))
      .catch((error) => {
        setErrors(error.data.message);
        setLoading(false);
      });
  };

  return (
    <div className="container">
      <header className="mb-4">
        <h2 className="font-bold text-2xl">Tạo mới lịch trình </h2>
      </header>
      <Form
        className="tour-form"
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: "100%"  }}
        onFinish={onFinish}
        autoComplete="off"
      >
        {/* <Form.Item
          label="Tiêu đề"
          name="tieu_de"
          rules={[
            { required: true, message: 'Vui lòng nhập tiêu đề ' },
            { min: 3, message: 'Tiêu đề tour ít nhất 3 ký tự' },
          ]}
        >
          <Input />
        </Form.Item> */}
        <Form.Item
          label="Nội dung"
          name="noi_dung"
        >
          <div className=''>
             <CKEditor
            editor={ClassicEditor}
            data={editorData}
            onChange={handleEditorChange}
            
          />
          </div>
         
        </Form.Item>
        <Form.Item
          label="Thời gian"
          name="lich_khoi_hanh"
          rules={[{ required: true, message: 'Vui lòng nhập lịch khởi hành!' }]}
        >
          <DatePicker style={{ width: '100%' }} disabledDate={disabledDate} />
        </Form.Item>
        <Form.Item
          label="Tour"
          name="id_tour"
          rules={[{ required: true, message: 'Vui lòng chọn ID Tour!' }]}
        >
          <Select defaultValue="Chọn" style={{ }}>
            {tourArray.map((option) => (
              <Option key={option.id} value={option.id}>{option.ten_tour}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }} >
          <div className="btn-button-sub">
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

export default Admin_LichtrinhADD;