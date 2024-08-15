import React, { useEffect, useState } from 'react';
import { Form, Button, Input, Select } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import moment from 'moment';
import axios from 'axios';
import { useGetLichTrinhIdQuery, useEditLichTrinhMutation } from '../../../../api/LichTrinhApi';
import { useGetTourQuery } from '../../../../api/TourApi';
import { ILichTrinh } from '../../../../interface/lichtrinh';

const { Option } = Select;

const Admin_LichtrinhEdit: React.FC = () => {
  const { idlt } = useParams<{ idlt: string }>();
  const [editorData, setEditorData] = useState<string>('');
  const [form] = Form.useForm();
  const [postData, setPostData] = useState<ILichTrinh | null>(null);
  const navigate = useNavigate();
  const [editLichTrinh] = useEditLichTrinhMutation();
  const { data: postDataResponse } = useGetLichTrinhIdQuery(idlt);
  const { data: tourData } = useGetTourQuery();

  const tourArray = tourData?.data || [];
  console.log(tourArray);

  useEffect(() => {
    if (postDataResponse) {
      setPostData(postDataResponse);
      setEditorData(postDataResponse.noi_dung);
      form.setFieldsValue({
        tieu_de: postDataResponse.tieu_de,
        noi_dung: postDataResponse.noi_dung,
        thoi_gian: moment(postDataResponse.thoi_gian).format('YYYY-MM-DD'),
        id_tour: postDataResponse.id_tour,
      });

    }
  }, [postDataResponse, form]);
  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setEditorData(data);
  };
  console.log(editorData);

  const onFinish = async (values: ILichTrinh) => {

    try {
      const formData = new FormData();
      formData.append("tieu_de", values.tieu_de);
      formData.append("noi_dung", editorData);
      formData.append("thoi_gian", moment().format());
      formData.append("id_tour", values.id_tour);

      const response = await axios.post(
        `http://127.0.0.1:8000/api/admin/lichtrinh/${idlt}`, // Replace with your API endpoint
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'X-HTTP-Method-Override': 'PUT',
          },
        }
      );

      if (response.status === 200) {

        window.location.href = 'http://localhost:5173/admin/tour/lich_trinh';

      } else {
        console.log('Update failed');
      }
    } catch (error) {
      console.error('Error updating:', error);
    }
  };



  return (
    <div className="container">
      <header className="mb-4">
        <h2 className="font-bold text-2xl">Edit Lichtrinh</h2>
      </header>
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinish}
      >

        <Form.Item label="Description" name="noi_dung" rules={[{ required: true, message: 'Please enter description!' }]}>
          <CKEditor
            editor={ClassicEditor}
            data={editorData}
            onChange={handleEditorChange}
          />
        </Form.Item>
        <Form.Item label="Publish Date" name="thoi_gian" rules={[{ required: true, message: 'Please enter publish date!' }]}>
          <Input type="date" />
        </Form.Item>
        <Form.Item label="Tour" name="id_tour" rules={[{ required: true, message: 'Please select tour!' }]}>
          <Select defaultValue="Select" style={{ width: 400 }}>
            {tourArray.map((option) => (
              <Option key={option.id} value={option.id}>{option.ten_tour}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
          <Button type="default" className="ml-2" onClick={() => navigate("/your-cancel-route")}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Admin_LichtrinhEdit;
